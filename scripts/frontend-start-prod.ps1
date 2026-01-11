#!/usr/bin/env pwsh
# Start Next.js production server from repo root (Windows-friendly).
# Usage:
#   $env:NEXT_PUBLIC_SITE_URL="http://localhost:3001"; $env:LEAD_API_BASE_URL="http://localhost:8080"; ./scripts/frontend-start-prod.ps1 -Port 3001

[CmdletBinding()]
param(
  [int]$Port = 3001
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$frontendDir = Join-Path $repoRoot 'frontend'

if (-not (Test-Path $frontendDir)) {
  throw "frontend directory not found at: $frontendDir"
}

Write-Host "[frontend] building..." -ForegroundColor Cyan
npm --prefix $frontendDir run build | Out-Host

Write-Host "[frontend] starting on http://localhost:$Port ..." -ForegroundColor Cyan
npm --prefix $frontendDir run start -- -p $Port
