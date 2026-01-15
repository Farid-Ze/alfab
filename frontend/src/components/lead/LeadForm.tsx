"use client";

import { useCallback, useMemo, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { t } from "@/lib/i18n";
import { getCurrentPageUrl, getInitialPageUrl } from "@/lib/telemetry";

import { useLocale } from "@/components/i18n/LocaleProvider";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import WhatsAppLink from "@/components/site/WhatsAppLink";
import { getButtonClassName } from "@/components/ui/Button";

type Result =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; id?: string }
  | { kind: "error"; message: string };

type FieldErrors = {
  businessName?: string;
  contactName?: string;
  phoneWhatsApp?: string;
  city?: string;
  salonType?: string;
  consent?: string;
};

function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconAlertCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export default function LeadForm() {
  const { locale } = useLocale();
  const tx = t(locale);

  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneWhatsApp, setPhoneWhatsApp] = useState("");
  const [city, setCity] = useState("");
  const [salonType, setSalonType] = useState<"SALON" | "BARBER" | "BRIDAL" | "UNISEX" | "OTHER" | "">("");
  const [consent, setConsent] = useState(false);

  const [chairCount, setChairCount] = useState<string>("");
  const [specialization, setSpecialization] = useState("");
  const [currentBrandsUsed, setCurrentBrandsUsed] = useState("");
  const [monthlySpendRange, setMonthlySpendRange] = useState("");

  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [result, setResult] = useState<Result>({ kind: "idle" });
  const [idemKey, setIdemKey] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showErrors, setShowErrors] = useState(false);

  // Field-level validation
  const fieldErrors = useMemo<FieldErrors>(() => {
    const errors: FieldErrors = {};
    if (businessName.trim().length < 2) {
      errors.businessName = tx.leadForm.validation.businessNameRequired;
    }
    if (contactName.trim().length < 2) {
      errors.contactName = tx.leadForm.validation.contactNameRequired;
    }
    if (phoneWhatsApp.trim().length < 8) {
      errors.phoneWhatsApp = tx.leadForm.validation.phoneRequired;
    }
    if (city.trim().length < 2) {
      errors.city = tx.leadForm.validation.cityRequired;
    }
    if (!salonType) {
      errors.salonType = tx.leadForm.validation.salonTypeRequired;
    }
    if (!consent) {
      errors.consent = tx.leadForm.validation.consentRequired;
    }
    return errors;
  }, [businessName, contactName, phoneWhatsApp, city, salonType, consent, tx]);

  const canSubmit = useMemo(() => {
    return Object.keys(fieldErrors).length === 0 && result.kind !== "submitting";
  }, [fieldErrors, result.kind]);

  const markTouched = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  function nextIdempotencyKey(): string {
    if (idemKey) return idemKey;
    const next =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setIdemKey(next);
    return next;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowErrors(true);

    if (!canSubmit) {
      // Focus first error field
      const firstErrorField = Object.keys(fieldErrors)[0];
      if (firstErrorField) {
        const fieldMap: Record<string, string> = {
          businessName: "business_name",
          contactName: "contact_name",
          phoneWhatsApp: "phone_whatsapp",
          city: "city",
          salonType: "salon_type",
        };
        const el = document.getElementById(fieldMap[firstErrorField] || firstErrorField);
        el?.focus();
      }
      return;
    }

    setResult({ kind: "submitting" });

    const chairCountValue = chairCount.trim();
    const chairCountInt = chairCountValue ? Number.parseInt(chairCountValue, 10) : undefined;
    const chairCountNormalized =
      Number.isFinite(chairCountInt) && (chairCountInt as number) > 0 ? (chairCountInt as number) : undefined;

    const body = {
      business_name: businessName.trim(),
      contact_name: contactName.trim(),
      email: email.trim() || undefined,
      phone_whatsapp: phoneWhatsApp.trim(),
      city: city.trim(),
      salon_type: salonType,
      consent,
      chair_count: chairCountNormalized,
      specialization: specialization.trim() || undefined,
      current_brands_used: currentBrandsUsed.trim() || undefined,
      monthly_spend_range: monthlySpendRange.trim() || undefined,
      message: message.trim() || undefined,
      page_url_initial: getInitialPageUrl(),
      page_url_current: getCurrentPageUrl(),
      company: company.trim() || undefined,
    };

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": nextIdempotencyKey(),
      },
      body: JSON.stringify(body),
    }).catch(() => null);

    if (!res) {
      trackEvent("lead_submit_error", { reason: "network" });
      setResult({ kind: "error", message: tx.leadForm.errors.network });
      return;
    }

    if (res.status === 202) {
      let id: string | undefined;
      try {
        const json = (await res.json()) as { id?: string };
        id = json.id;
      } catch {
        // honeypot spam path can be 202 with no body.
      }

      trackEvent("lead_submit_success", { id });
      setResult({ kind: "success", id });
      return;
    }

    if (res.status === 429) {
      trackEvent("lead_submit_error", { reason: "rate_limited" });
      setResult({ kind: "error", message: tx.leadForm.errors.rateLimited });
      return;
    }

    let msg: string = tx.leadForm.errors.submitFailed;
    try {
      const json = (await res.json()) as { error?: string };
      if (json.error) msg = json.error;
    } catch {
      // ignore
    }

    trackEvent("lead_submit_error", { reason: "server", status: res.status, message: msg });
    setResult({ kind: "error", message: msg });
  }

  // Success state - more engaging with clear next steps
  if (result.kind === "success") {
    return (
      <div className="ui-fade-in space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-bg">
          <IconCheck className="h-8 w-8 text-success" />
        </div>
        <div className="space-y-2">
          <h3 className="type-h3">{tx.leadForm.success.title}</h3>
          <p className="type-body max-w-md mx-auto">{tx.leadForm.success.body}</p>
        </div>
        {result.id ? (
          <p className="type-data text-muted-strong">{tx.leadForm.success.ref}: {result.id}</p>
        ) : null}
        <div className="pt-2">
          <WhatsAppLink
            className={getButtonClassName({ variant: "primary", size: "md" })}
            prefill={tx.leadForm.success.whatsappPrefill}
          >
            {tx.leadForm.success.whatsappCta}
          </WhatsAppLink>
        </div>
      </div>
    );
  }

  const shouldShowError = (field: keyof FieldErrors) =>
    (showErrors || touched[field]) && fieldErrors[field];

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Business Name - Required */}
      <div className="space-y-1.5">
        <label className="block type-data-strong" htmlFor="business_name">
          {tx.leadForm.fields.businessName} <span className="text-error">*</span>
        </label>
        <Input
          id="business_name"
          className="w-full"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          onBlur={() => markTouched("businessName")}
          error={!!shouldShowError("businessName")}
          aria-describedby={shouldShowError("businessName") ? "business_name_error" : undefined}
          required
          minLength={2}
          maxLength={120}
        />
        {shouldShowError("businessName") && (
          <p id="business_name_error" className="type-data text-error flex items-center gap-1.5">
            <IconAlertCircle className="h-3.5 w-3.5 shrink-0" />
            {fieldErrors.businessName}
          </p>
        )}
      </div>

      {/* Contact Name - Required */}
      <div className="space-y-1.5">
        <label className="block type-data-strong" htmlFor="contact_name">
          {tx.leadForm.fields.contactName} <span className="text-error">*</span>
        </label>
        <Input
          id="contact_name"
          className="w-full"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          onBlur={() => markTouched("contactName")}
          error={!!shouldShowError("contactName")}
          aria-describedby={shouldShowError("contactName") ? "contact_name_error" : undefined}
          required
          minLength={2}
          maxLength={80}
        />
        {shouldShowError("contactName") && (
          <p id="contact_name_error" className="type-data text-error flex items-center gap-1.5">
            <IconAlertCircle className="h-3.5 w-3.5 shrink-0" />
            {fieldErrors.contactName}
          </p>
        )}
      </div>

      {/* Email (Optional) + WhatsApp (Required) */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block type-data-strong" htmlFor="email">
            {tx.leadForm.fields.emailOptional}
          </label>
          <Input
            id="email"
            type="email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={254}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block type-data-strong" htmlFor="phone_whatsapp">
            {tx.leadForm.fields.whatsAppNumber} <span className="text-error">*</span>
          </label>
          <Input
            id="phone_whatsapp"
            className="w-full"
            value={phoneWhatsApp}
            onChange={(e) => setPhoneWhatsApp(e.target.value)}
            onBlur={() => markTouched("phoneWhatsApp")}
            error={!!shouldShowError("phoneWhatsApp")}
            aria-describedby={shouldShowError("phoneWhatsApp") ? "phone_whatsapp_error" : undefined}
            required
            maxLength={20}
          />
          {shouldShowError("phoneWhatsApp") && (
            <p id="phone_whatsapp_error" className="type-data text-error flex items-center gap-1.5">
              <IconAlertCircle className="h-3.5 w-3.5 shrink-0" />
              {fieldErrors.phoneWhatsApp}
            </p>
          )}
        </div>
      </div>

      {/* City + Salon Type - Both Required */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block type-data-strong" htmlFor="city">
            {tx.leadForm.fields.city} <span className="text-error">*</span>
          </label>
          <Input
            id="city"
            className="w-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onBlur={() => markTouched("city")}
            error={!!shouldShowError("city")}
            aria-describedby={shouldShowError("city") ? "city_error" : undefined}
            required
            minLength={2}
            maxLength={80}
          />
          {shouldShowError("city") && (
            <p id="city_error" className="type-data text-error flex items-center gap-1.5">
              <IconAlertCircle className="h-3.5 w-3.5 shrink-0" />
              {fieldErrors.city}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="block type-data-strong" htmlFor="salon_type">
            {tx.leadForm.fields.salonType} <span className="text-error">*</span>
          </label>
          <Select
            id="salon_type"
            className="w-full"
            value={salonType}
            onChange={(e) => {
              const v = e.target.value;
              if (
                v === "SALON" ||
                v === "BARBER" ||
                v === "BRIDAL" ||
                v === "UNISEX" ||
                v === "OTHER" ||
                v === ""
              ) {
                setSalonType(v);
                markTouched("salonType");
              }
            }}
            onBlur={() => markTouched("salonType")}
            error={!!shouldShowError("salonType")}
            aria-describedby={shouldShowError("salonType") ? "salon_type_error" : undefined}
            required
          >
            <option value="">{tx.leadForm.fields.salonTypePlaceholder}</option>
            <option value="SALON">{tx.leadForm.salonTypes.salon}</option>
            <option value="BARBER">{tx.leadForm.salonTypes.barber}</option>
            <option value="BRIDAL">{tx.leadForm.salonTypes.bridal}</option>
            <option value="UNISEX">{tx.leadForm.salonTypes.unisex}</option>
            <option value="OTHER">{tx.leadForm.salonTypes.other}</option>
          </Select>
          {shouldShowError("salonType") && (
            <p id="salon_type_error" className="type-data text-error flex items-center gap-1.5">
              <IconAlertCircle className="h-3.5 w-3.5 shrink-0" />
              {fieldErrors.salonType}
            </p>
          )}
        </div>
      </div>

      {/* Additional Details - Collapsible */}
      <details className="group border border-border bg-panel transition-colors hover:border-muted-strong">
        <summary className="cursor-pointer px-5 py-4 type-body-strong text-foreground select-none flex items-center justify-between">
          <span>{tx.leadForm.additionalDetails.summary}</span>
          <svg
            className="h-4 w-4 text-muted transition-transform group-open:rotate-180"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </summary>
        <div className="px-5 pb-5 space-y-4 border-t border-border">
          <div className="pt-4 space-y-1.5">
            <label className="block type-data-strong" htmlFor="chair_count">
              {tx.leadForm.additionalDetails.chairCount}
            </label>
            <Input
              id="chair_count"
              inputMode="numeric"
              className="w-full"
              value={chairCount}
              onChange={(e) => setChairCount(e.target.value)}
              placeholder={tx.leadForm.additionalDetails.chairCountPlaceholder}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block type-data-strong" htmlFor="specialization">
              {tx.leadForm.additionalDetails.specialization}
            </label>
            <Input
              id="specialization"
              className="w-full"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder={tx.leadForm.additionalDetails.specializationPlaceholder}
              maxLength={200}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block type-data-strong" htmlFor="current_brands_used">
              {tx.leadForm.additionalDetails.currentBrandsUsed}
            </label>
            <Input
              id="current_brands_used"
              className="w-full"
              value={currentBrandsUsed}
              onChange={(e) => setCurrentBrandsUsed(e.target.value)}
              maxLength={200}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block type-data-strong" htmlFor="monthly_spend_range">
              {tx.leadForm.additionalDetails.monthlySpendRange}
            </label>
            <Input
              id="monthly_spend_range"
              className="w-full"
              value={monthlySpendRange}
              onChange={(e) => setMonthlySpendRange(e.target.value)}
              placeholder={tx.leadForm.additionalDetails.monthlySpendRangePlaceholder}
              maxLength={80}
            />
          </div>
        </div>
      </details>

      {/* Honeypot field: hidden from real users (Lead API anti-spam) */}
      <div className="hidden" aria-hidden="true">
        <label className="block type-data-strong" htmlFor="company">
          {tx.leadForm.honeypot.companyLabel}
        </label>
        <Input
          id="company"
          tabIndex={-1}
          autoComplete="off"
          className="w-full"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          maxLength={200}
        />
      </div>

      {/* Message - Optional */}
      <div className="space-y-1.5">
        <label className="block type-data-strong" htmlFor="message">
          {tx.leadForm.fields.messageOptional}
        </label>
        <Textarea
          id="message"
          className="w-full"
          rows={4}
          maxLength={2000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Consent Checkbox with validation */}
      <div className="space-y-1.5">
        <label className="flex items-start gap-3 type-data cursor-pointer group">
          <input
            type="checkbox"
            className={`mt-0.5 h-4 w-4 accent-foreground transition-colors ${
              shouldShowError("consent") ? "outline outline-2 outline-error" : ""
            }`}
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              markTouched("consent");
            }}
            required
          />
          <span className="group-hover:text-foreground transition-colors">{tx.leadForm.consent}</span>
        </label>
        {shouldShowError("consent") && (
          <p className="type-data text-error flex items-center gap-1.5 pl-7">
            <IconAlertCircle className="h-3.5 w-3.5 shrink-0" />
            {fieldErrors.consent}
          </p>
        )}
      </div>

      {/* Error Alert */}
      {result.kind === "error" && (
        <div role="alert" className="ui-alert-error flex items-start gap-3">
          <IconAlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{result.message}</span>
        </div>
      )}

      {/* Submit Button with loading state */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={result.kind === "submitting"}
        disabled={!canSubmit && result.kind !== "submitting"}
        className="w-full"
      >
        {tx.leadForm.actions.submit}
      </Button>
    </form>
  );
}
