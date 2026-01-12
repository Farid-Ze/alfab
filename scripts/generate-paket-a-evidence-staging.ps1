#!/usr/bin/env pwsh
# Generate Paket A PASS + Evidence against a remote site (staging/prod) WITHOUT starting a local Next.js server.
#
# What it does:
# - Runs Playwright smoke tests against PLAYWRIGHT_BASE_URL
# - Stores HTML report + test artifacts under artifacts/paket-a/evidence-pack/02-uat/
# - Writes a short evidence markdown summary (like the local generator)
#
# Safety:
# - By default, lead submission is mocked in Playwright (no real writes).
# - To allow real test lead submission, pass -AllowRealLeadSubmit.

[CmdletBinding()]
param(
	# If omitted, the script will try to resolve it from env/config.
	[string]$BaseUrl = "",
	[ValidateSet('staging', 'production')][string]$Environment = 'staging',
	[string]$RunDate = "", # default: yyyy-MM-dd
	[switch]$AllowRealLeadSubmit,
	[string]$RunId = "", # default: unix ms
	[switch]$SkipUatIndexUpdate,
	[switch]$SkipHttpChecks
)

$ErrorActionPreference = 'Stop'

function Get-RepoRoot {
	return Split-Path -Parent $PSScriptRoot
}

function Ensure-Dir([string]$Path) {
	if (-not (Test-Path $Path)) {
		New-Item -ItemType Directory -Force -Path $Path | Out-Null
	}
}

function New-UniqueDir([string]$BasePath) {
	if (-not (Test-Path $BasePath)) {
		New-Item -ItemType Directory -Force -Path $BasePath | Out-Null
		return $BasePath
	}
	for ($i = 2; $i -le 99; $i++) {
		$p = "${BasePath}_${i}"
		if (-not (Test-Path $p)) {
			New-Item -ItemType Directory -Force -Path $p | Out-Null
			return $p
		}
	}
	throw "unable_to_create_unique_dir:$BasePath"
}

function Try-GetGitCommit([string]$RepoRoot) {
	try {
		$commit = (& git -C $RepoRoot rev-parse --short HEAD 2>$null) | Select-Object -First 1
		if ($commit) { return $commit.Trim() }
		return ""
	} catch {
		return ""
	}
}

function Get-HttpText([
	[string]$Url,
	[int]$TimeoutSec = 15
) {
	# UseBasicParsing for Windows PowerShell compatibility.
	$resp = Invoke-WebRequest -Uri $Url -Method GET -UseBasicParsing -TimeoutSec $TimeoutSec
	return [ordered]@{
		status = [int]$resp.StatusCode
		url = [string]$resp.BaseResponse.ResponseUri.AbsoluteUri
		content_type = [string]$resp.Headers['content-type']
		body = [string]$resp.Content
	}
}

function Test-HttpStatus([
	[string]$Url,
	[int]$ExpectedStatus,
	[int]$TimeoutSec = 15
) {
	try {
		$resp = Invoke-WebRequest -Uri $Url -Method GET -UseBasicParsing -TimeoutSec $TimeoutSec
		if ([int]$resp.StatusCode -ne $ExpectedStatus) {
			return [ordered]@{
				pass = $false
				status = [int]$resp.StatusCode
				url = [string]$resp.BaseResponse.ResponseUri.AbsoluteUri
				content_type = [string]$resp.Headers['content-type']
				note = "unexpected_status"
			}
		}
		return [ordered]@{
			pass = $true
			status = [int]$resp.StatusCode
			url = [string]$resp.BaseResponse.ResponseUri.AbsoluteUri
			content_type = [string]$resp.Headers['content-type']
			note = ""
		}
	} catch {
		# Many servers throw on non-2xx; attempt to capture status code from the exception if possible.
		$sc = $null
		try {
			$sc = $_.Exception.Response.StatusCode.value__
		} catch {
			$sc = $null
		}
		if ($sc -ne $null -and [int]$sc -eq $ExpectedStatus) {
			return [ordered]@{
				pass = $true
				status = [int]$sc
				url = $Url
				content_type = ""
				note = ""
			}
		}
		return [ordered]@{
			pass = $false
			status = if ($sc -ne $null) { [int]$sc } else { -1 }
			url = $Url
			content_type = ""
			note = "request_failed: $($_.Exception.Message)"
		}
	}
}

function Update-UatIndex {
	param(
		[Parameter(Mandatory = $true)][string]$IndexPath,
		[Parameter(Mandatory = $true)][string]$Environment,
		[Parameter(Mandatory = $true)][string]$RunDate,
		[Parameter(Mandatory = $true)][string]$EvidenceRelLink,
		[string]$Commit = "",
		[switch]$MarkUat07,
		[switch]$MarkUat09,
		[switch]$MarkUat14
	)

	if (-not (Test-Path $IndexPath)) {
		throw "uat_index_not_found:$IndexPath"
	}

	$content = Get-Content -Path $IndexPath -Raw -Encoding UTF8
	$bt = [char]96 # backtick

	$row05 = "| UAT-A-05 | PASS | $RunDate | $Environment | $bt$EvidenceRelLink$bt | Playwright smoke: WhatsApp CTA always works |"
	$row06 = "| UAT-A-06 | PASS | $RunDate | $Environment | $bt$EvidenceRelLink$bt | Playwright smoke: Become Partner lead path |"

	$content = [regex]::Replace(
		$content,
		"(?m)^\|\s*UAT-A-05\s*\|.*$",
		[System.Text.RegularExpressions.MatchEvaluator]{ param($m) $row05 }
	)
	$content = [regex]::Replace(
		$content,
		"(?m)^\|\s*UAT-A-06\s*\|.*$",
		[System.Text.RegularExpressions.MatchEvaluator]{ param($m) $row06 }
	)

	if ($MarkUat07) {
		$row07 = "| UAT-A-07 | PASS | $RunDate | $Environment | $bt$EvidenceRelLink$bt | HTTP proof: /education reachable (staging/prod) |"
		$content = [regex]::Replace(
			$content,
			"(?m)^\|\s*UAT-A-07\s*\|.*$",
			[System.Text.RegularExpressions.MatchEvaluator]{ param($m) $row07 }
		)
	}
	if ($MarkUat09) {
		$row09 = "| UAT-A-09 | PASS | $RunDate | $Environment | $bt$EvidenceRelLink$bt | HTTP proof: robots.txt + sitemap.xml reachable (staging/prod) |"
		$content = [regex]::Replace(
			$content,
			"(?m)^\|\s*UAT-A-09\s*\|.*$",
			[System.Text.RegularExpressions.MatchEvaluator]{ param($m) $row09 }
		)
	}
	if ($MarkUat14) {
		$row14 = "| UAT-A-14 | PASS | $RunDate | $Environment | $bt$EvidenceRelLink$bt | HTTP proof: 404 returned for unknown route |"
		$content = [regex]::Replace(
			$content,
			"(?m)^\|\s*UAT-A-14\s*\|.*$",
			[System.Text.RegularExpressions.MatchEvaluator]{ param($m) $row14 }
		)
	}

	if (-not [string]::IsNullOrWhiteSpace($Commit)) {
		$content = [regex]::Replace($content, "(?m)^- Version/commit:.*$", "- Version/commit: $Commit")
	}

	$runner = "$env:USERNAME@$env:COMPUTERNAME"
	$content = [regex]::Replace($content, "(?m)^- Runner:.*$", "- Runner: $runner")

	Set-Content -Path $IndexPath -Value $content -Encoding UTF8
}

function Resolve-BaseUrl([
	[string]$InputBaseUrl,
	[string]$Environment,
	[string]$RepoRoot
) {
	if (-not [string]::IsNullOrWhiteSpace($InputBaseUrl)) {
		return $InputBaseUrl.Trim()
	}

	# Prefer explicit env used by Playwright.
	if (-not [string]::IsNullOrWhiteSpace($env:PLAYWRIGHT_BASE_URL)) {
		return $env:PLAYWRIGHT_BASE_URL.Trim()
	}

	# Convenience env vars.
	if ($Environment -eq 'staging' -and -not [string]::IsNullOrWhiteSpace($env:STAGING_BASE_URL)) {
		return $env:STAGING_BASE_URL.Trim()
	}
	if ($Environment -eq 'production' -and -not [string]::IsNullOrWhiteSpace($env:PRODUCTION_BASE_URL)) {
		return $env:PRODUCTION_BASE_URL.Trim()
	}

	# Optional local config file.
	$configPath = Join-Path $RepoRoot 'artifacts\paket-a\environment_urls.json'
	if (Test-Path $configPath) {
		try {
			$raw = Get-Content -Path $configPath -Raw -Encoding UTF8
			$obj = $raw | ConvertFrom-Json
			if ($Environment -eq 'staging' -and $obj.staging) {
				return ([string]$obj.staging).Trim()
			}
			if ($Environment -eq 'production' -and $obj.production) {
				return ([string]$obj.production).Trim()
			}
		} catch {
			throw "unable_to_parse_environment_urls_json:$configPath"
		}
	}

	$hint = @()
	$hint += "Base URL is required to run Playwright against staging/prod. Provide one of:"
	$hint += "- -BaseUrl https://<your-staging-site>"
	$hint += "- env:PLAYWRIGHT_BASE_URL=https://<your-staging-site>"
	$hint += "- env:STAGING_BASE_URL or env:PRODUCTION_BASE_URL"
	$hint += "- artifacts/paket-a/environment_urls.json (see artifacts/paket-a/environment_urls.example.json)"
	$hint += ""
	$hint += "If you deploy the frontend on Vercel, the staging URL is typically the 'Preview' deployment URL shown in Vercel Dashboard → Project → Deployments."
	throw ($hint -join "`n")
}

$repoRoot = Get-RepoRoot
$frontendDir = Join-Path $repoRoot 'frontend'
$evidenceRoot = Join-Path $repoRoot 'artifacts\paket-a\evidence-pack'
$uatDir = Join-Path $evidenceRoot '02-uat'

$BaseUrl = Resolve-BaseUrl -InputBaseUrl $BaseUrl -Environment $Environment -RepoRoot $repoRoot

if ([string]::IsNullOrWhiteSpace($RunDate)) {
	$RunDate = Get-Date -Format 'yyyy-MM-dd'
}
if ([string]::IsNullOrWhiteSpace($RunId)) {
	$RunId = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds().ToString()
}

if (-not (Test-Path $frontendDir)) { throw "frontend directory not found at: $frontendDir" }
if (-not (Test-Path $uatDir)) { throw "evidence dir not found at: $uatDir" }
Ensure-Dir $uatDir

$commit = Try-GetGitCommit $repoRoot

$reportDirBase = Join-Path $uatDir ("{0}_playwright-report_{1}" -f $RunDate, $Environment)
$resultsDirBase = Join-Path $uatDir ("{0}_playwright-test-results_{1}" -f $RunDate, $Environment)

$reportDir = New-UniqueDir $reportDirBase
$resultsDir = New-UniqueDir $resultsDirBase

$logPath = Join-Path $uatDir ("{0}_playwright_smoke_{1}.log" -f $RunDate, $Environment)
if (Test-Path $logPath) {
	$logPath = Join-Path $uatDir ("{0}_playwright_smoke_{1}_{2}.log" -f $RunDate, $Environment, (Get-Date -Format 'HHmmss'))
}

$evidenceMd = Join-Path $uatDir ("{0}_playwright_smoke_{1}.md" -f $RunDate, $Environment)

Write-Host "[e2e] running Playwright smoke against: $BaseUrl ($Environment)" -ForegroundColor Cyan

$origCI = $env:CI
$origHtml = $env:PLAYWRIGHT_HTML_REPORT_DIR
$origOut = $env:PLAYWRIGHT_OUTPUT_DIR
$origReuse = $env:PLAYWRIGHT_REUSE_EXISTING_SERVER
$origSkip = $env:PLAYWRIGHT_SKIP_WEBSERVER
$origBaseUrl = $env:PLAYWRIGHT_BASE_URL
$origAllowReal = $env:PLAYWRIGHT_ALLOW_REAL_LEAD_SUBMIT
$origRunId = $env:PLAYWRIGHT_E2E_RUN_ID

try {
	$env:CI = '1'
	$env:PLAYWRIGHT_HTML_REPORT_DIR = $reportDir
	$env:PLAYWRIGHT_OUTPUT_DIR = $resultsDir
	$env:PLAYWRIGHT_REUSE_EXISTING_SERVER = 'true'
	$env:PLAYWRIGHT_SKIP_WEBSERVER = 'true'
	$env:PLAYWRIGHT_BASE_URL = $BaseUrl
	$env:PLAYWRIGHT_E2E_RUN_ID = $RunId
	if ($AllowRealLeadSubmit) {
		$env:PLAYWRIGHT_ALLOW_REAL_LEAD_SUBMIT = 'true'
	}

	$cmd = "npm --prefix `"$frontendDir`" run test:e2e"
	"[cmd] $cmd" | Out-File -FilePath $logPath -Encoding UTF8
	"[env] PLAYWRIGHT_BASE_URL=$BaseUrl" | Out-File -FilePath $logPath -Append -Encoding UTF8
	"[env] PLAYWRIGHT_SKIP_WEBSERVER=true" | Out-File -FilePath $logPath -Append -Encoding UTF8
	"[env] PLAYWRIGHT_ALLOW_REAL_LEAD_SUBMIT=$($AllowRealLeadSubmit.IsPresent)" | Out-File -FilePath $logPath -Append -Encoding UTF8
	"[env] PLAYWRIGHT_E2E_RUN_ID=$RunId" | Out-File -FilePath $logPath -Append -Encoding UTF8

	& $env:ComSpec /c $cmd 2>&1 | Tee-Object -FilePath $logPath -Append
	if ($LASTEXITCODE -ne 0) {
		throw "playwright_failed:$LASTEXITCODE (see log: $logPath)"
	}
} finally {
	$env:CI = $origCI
	$env:PLAYWRIGHT_HTML_REPORT_DIR = $origHtml
	$env:PLAYWRIGHT_OUTPUT_DIR = $origOut
	$env:PLAYWRIGHT_REUSE_EXISTING_SERVER = $origReuse
	$env:PLAYWRIGHT_SKIP_WEBSERVER = $origSkip
	$env:PLAYWRIGHT_BASE_URL = $origBaseUrl
	$env:PLAYWRIGHT_ALLOW_REAL_LEAD_SUBMIT = $origAllowReal
	$env:PLAYWRIGHT_E2E_RUN_ID = $origRunId
}

@"
# Evidence - Playwright smoke (Paket A)

- **Date:** $RunDate
- **Environment:** $Environment
- **Base URL:** $BaseUrl
- **Spec ref:** docs-paket-a/paket-a.md -> UAT-A-05 (WhatsApp CTA) + UAT-A-06 (Become Partner lead path)
- **Version/commit:** $commit
- **Run ID:** $RunId

## Artifacts
- HTML report: $reportDir (open index.html)
- Test results: $resultsDir (screenshots/videos on failure)
- Command log: $logPath

## Notes
- Default behavior is safe: lead submission is mocked unless -AllowRealLeadSubmit is provided.
- If -AllowRealLeadSubmit is used, ensure the environment has an agreed cleanup process for test leads.
"@ | Set-Content -Path $evidenceMd -Encoding UTF8

Write-Host "[e2e] PASS. Evidence markdown: $evidenceMd" -ForegroundColor Green

# --- Optional: safe HTTP checks (no writes) to support staging/prod UAT evidence ---
$httpChecks = [ordered]@{}
$httpChecksPass = [ordered]@{ uat07 = $false; uat09 = $false; uat14 = $false }

if (-not $SkipHttpChecks) {
	Write-Host "[http] running read-only checks (education + SEO basics + 404)..." -ForegroundColor Cyan

	# UAT-A-07 (minimal): Education page reachable.
	$edu = Test-HttpStatus -Url ("{0}/education" -f $BaseUrl.TrimEnd('/')) -ExpectedStatus 200
	$httpChecks['education'] = $edu
	$httpChecksPass.uat07 = [bool]$edu.pass

	# UAT-A-09 (minimal): robots.txt and sitemap.xml reachable.
	$robots = Test-HttpStatus -Url ("{0}/robots.txt" -f $BaseUrl.TrimEnd('/')) -ExpectedStatus 200
	$sitemap = Test-HttpStatus -Url ("{0}/sitemap.xml" -f $BaseUrl.TrimEnd('/')) -ExpectedStatus 200
	$httpChecks['robots_txt'] = $robots
	$httpChecks['sitemap_xml'] = $sitemap
	$httpChecksPass.uat09 = [bool]($robots.pass -and $sitemap.pass)

	# UAT-A-14 (minimal): unknown route returns 404.
	$missingPath = "missing-uat14-$RunId"
	$notFound = Test-HttpStatus -Url ("{0}/{1}" -f $BaseUrl.TrimEnd('/'), $missingPath) -ExpectedStatus 404
	$httpChecks['not_found'] = $notFound
	$httpChecksPass.uat14 = [bool]$notFound.pass
}

# Append HTTP proof section (if any) to the evidence markdown for audit trail.
if (-not $SkipHttpChecks) {
	$mdAppend = @()
	$mdAppend += ""
	$mdAppend += "## Read-only HTTP checks (staging/prod proof)"
	$mdAppend += "- **Spec ref:** docs-paket-a/paket-a.md -> UAT-A-07 + UAT-A-09 + UAT-A-14"
	$mdAppend += "- **Safety:** GET-only (no writes)"
	$mdAppend += ""
	$mdAppend += "~~~json"
	$mdAppend += ($httpChecks | ConvertTo-Json -Depth 6)
	$mdAppend += "~~~"

	Add-Content -Path $evidenceMd -Value ($mdAppend -join "`n") -Encoding UTF8
}

# Update UAT index for this environment (optional).
if (-not $SkipUatIndexUpdate) {
	$uatIndex = Join-Path $uatDir 'index.md'
	$evidenceRelLink = "02-uat/" + (Split-Path -Leaf $evidenceMd)
	Update-UatIndex -IndexPath $uatIndex -Environment $Environment -RunDate $RunDate -EvidenceRelLink $evidenceRelLink -Commit $commit `
		-MarkUat07:([bool]$httpChecksPass.uat07) -MarkUat09:([bool]$httpChecksPass.uat09) -MarkUat14:([bool]$httpChecksPass.uat14)
	Write-Host "[evidence] updated: $uatIndex" -ForegroundColor Green
}
