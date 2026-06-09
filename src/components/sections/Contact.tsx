import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdWarning, MdCameraAlt, MdCheck, MdCheckCircle, MdExpandMore, MdAssignmentTurnedIn, MdImage, MdPhone, MdVerifiedUser, MdFileUpload, MdBuild, MdClose } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import { CONTACT, FORM_OPTIONS } from "../../constants";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import { trackCall, trackEvent } from "../../utils/analytics";
import ScrollReveal from "../ui/ScrollReveal";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  suburb: string;
  propertyType: string;
  serviceType: string;
  serviceFor: string;
  garageDoorType: string;
  gateType: string;
  message: string;
  company: string;
}

const ENDPOINT = import.meta.env.VITE_QUOTE_FORM_ENDPOINT || "/quote-submit.php";
const TURNSTILE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const TURNSTILE_PLACEHOLDER = "replace-with-cloudflare-turnstile-site-key";
const HAS_TURNSTILE = Boolean(TURNSTILE_KEY && TURNSTILE_KEY !== TURNSTILE_PLACEHOLDER);
const ELEMENTOR = {
  action: "elementor_pro_forms_send_form",
  post_id: "7",
  form_id: "2372f6b",
  queried_id: "7",
};

interface DropdownProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  error?: string;
}

function Dropdown({ label, value, options, onChange, error }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const id = useRef(`dd-${Math.random().toString(36).slice(2)}`);

  // Close on outside click
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Scroll focused item into view
  useEffect(() => {
    if (!open) return;
    const item = listRef.current?.children[focused] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [focused, open]);

  const select = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setFocused(value ? options.indexOf(value) : 0);
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") { e.preventDefault(); setOpen(false); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setFocused((f) => Math.min(f + 1, options.length - 1)); return; }
    if (e.key === "ArrowUp")   { e.preventDefault(); setFocused((f) => Math.max(f - 1, 0)); return; }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(options[focused]); return; }
    if (e.key === "Home") { e.preventDefault(); setFocused(0); return; }
    if (e.key === "End")  { e.preventDefault(); setFocused(options.length - 1); return; }
  };

  const listId = `${id.current}-list`;

  return (
    <div className="relative" ref={ref}>
      <label className="field-label" id={`${id.current}-label`}>{label}</label>
      <button
        type="button"
        onClick={() => { setFocused(value ? options.indexOf(value) : 0); setOpen((v) => !v); }}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id.current}-label`}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${id.current}-opt-${focused}` : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id.current}-err` : undefined}
        className={`flex w-full items-center justify-between rounded-xl border bg-surface px-4 py-3 text-left ${
          error ? "border-accent" : "border-line"
        }`}
      >
        <span className={value ? "text-ink" : "text-slate-400"}>{value || "Select..."}</span>
        <MdExpandMore
          size={18}
          className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={`${id.current}-label`}
          className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-line bg-surface py-1 shadow-2xl"
        >
          {options.map((option, i) => (
            <li
              key={option}
              id={`${id.current}-opt-${i}`}
              role="option"
              aria-selected={value === option}
              className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm ${
                i === focused ? "bg-brand-tint text-ink" : "text-ink hover:bg-brand-tint"
              }`}
              onMouseEnter={() => setFocused(i)}
              onClick={() => select(option)}
            >
              {option}
              {value === option ? <MdCheck size={16} className="text-brand-deep" aria-hidden="true" /> : null}
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p id={`${id.current}-err`} className="field-error" role="alert">{error}</p> : null}
    </div>
  );
}

interface ChipsProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

function Chips({ label, value, options, onChange }: ChipsProps) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                active
                  ? "border-brand bg-brand-tint text-brand-deep"
                  : "border-line text-ink hover:border-brand/40"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact({ config }: { config: NetworkConfig }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      suburb: "",
      propertyType: "",
      serviceType: "",
      serviceFor: "",
      garageDoorType: "",
      gateType: "",
      message: "",
      company: "",
    },
  });
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => Math.floor(Date.now() / 1000));
  const fileRef = useRef<HTMLInputElement | null>(null);
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const serviceFor = watch("serviceFor");

  useEffect(() => {
    if (!HAS_TURNSTILE) {
      return;
    }

    if (!document.querySelector("script[data-turnstile]")) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.setAttribute("data-turnstile", "true");
      document.head.appendChild(script);
    }

    const interval = window.setInterval(() => {
      if (window.turnstile && turnstileRef.current && widgetId.current === null) {
        widgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_KEY,
          theme: "light",
          callback: () => setSubmitError(""),
          "expired-callback": () => setSubmitError("Please complete the spam protection check again."),
          "error-callback": () => setSubmitError("Spam protection could not load. Please refresh and try again."),
        });
        window.clearInterval(interval);
      }
    }, 300);

    return () => window.clearInterval(interval);
  }, []);

  const onFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : "");
  };

  const removeFile = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setFileName("");
  };

  const onSubmit = async (data: FormValues) => {
    if (data.company) {
      return;
    }

    setSubmitError("");

    if (!HAS_TURNSTILE) {
      setStatus("error");
      setSubmitError("Spam protection is not configured yet. Add the Cloudflare Turnstile site key before live submissions.");
      return;
    }

    const token = (
      document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement | null
    )?.value;
    if (!token) {
      setStatus("error");
      setSubmitError("Please complete the spam protection check before sending.");
      return;
    }

    setStatus("submitting");

    try {
      const form = new FormData();
      form.append("action", ELEMENTOR.action);
      form.append("post_id", ELEMENTOR.post_id);
      form.append("form_id", ELEMENTOR.form_id);
      form.append("queried_id", ELEMENTOR.queried_id);
      form.append("form_fields[name]", data.name);
      form.append("form_fields[email]", data.email);
      form.append("form_fields[phone]", data.phone);
      form.append("form_fields[suburb]", data.suburb);
      form.append("form_fields[property_type]", data.propertyType);
      form.append("form_fields[service_type]", data.serviceType);
      form.append("form_fields[service_for]", data.serviceFor);
      form.append("form_fields[door_type]", data.garageDoorType || data.gateType);
      form.append("form_fields[message]", data.message);
      form.append("company", data.company);
      form.append("_form_started_at", String(formStartedAt));
      form.append("cf-turnstile-response", token);

      const file = fileRef.current?.files?.[0];
      if (file) {
        form.append("form_fields[photo]", file);
      }

      const response = await fetch(ENDPOINT, { method: "POST", body: form });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || `HTTP ${response.status}`);
      }

      setStatus("success");
      trackEvent("quote_form_submit", { service: data.serviceType || "unknown" });
      reset();
      setFileName("");

      if (HAS_TURNSTILE && window.turnstile && widgetId.current) {
        window.turnstile.reset(widgetId.current);
      }
    } catch (error) {
      setStatus("error");
      setSubmitError(error instanceof Error ? error.message : "Something went wrong.");
      setFormStartedAt(Math.floor(Date.now() / 1000));
      if (HAS_TURNSTILE && window.turnstile && widgetId.current) {
        window.turnstile.reset(widgetId.current);
      }
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <ScrollReveal>
          <span className="eyebrow mb-4">Get a quote</span>
          <h2 className="h-section">Request your free quote.</h2>
          <p className="mt-3 text-muted">
            Tell us about your Merlin opener and we will get back to you fast. Prefer to
            talk? Call us any time.
          </p>
          <div className="mt-6 space-y-3">
            <a
              href={`tel:${config.contact.emergency.tel}`}
              onClick={() => trackCall("emergency")}
              className="flex items-center gap-3 text-ink hover:text-brand-deep"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-tint text-accent">
                <MdPhone size={18} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-slate-500">
                  24/7 emergency
                </span>
                {config.contact.emergency.number}
              </span>
            </a>
            <a
              href={`tel:${config.contact.business.tel}`}
              onClick={() => trackCall("business")}
              className="flex items-center gap-3 text-ink hover:text-brand-deep"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand-deep">
                <MdPhone size={18} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-slate-500">
                  Business hours
                </span>
                {config.contact.business.number}
              </span>
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            {CONTACT.address} | {CONTACT.hours}
          </p>

          <div className="mt-10 rounded-3xl border border-line bg-surface p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/10 text-brand-deep">
                <MdAssignmentTurnedIn size={22} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  What helps us quote faster
                </h3>
                <p className="text-sm text-slate-500">A few details can save a callback.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-muted">
              <div className="flex gap-3 rounded-2xl border border-line bg-canvas p-4">
                <MdCameraAlt className="mt-0.5 shrink-0 text-brand-deep" size={18} />
                <span>Upload a photo of the opener, remote, or warning light.</span>
              </div>
              <div className="flex gap-3 rounded-2xl border border-line bg-canvas p-4">
                <MdBuild className="mt-0.5 shrink-0 text-brand-deep" size={18} />
                <span>Tell us if it clicks, hums, opens halfway, or will not respond.</span>
              </div>
              <div className="flex gap-3 rounded-2xl border border-line bg-canvas p-4">
                <MdVerifiedUser className="mt-0.5 shrink-0 text-brand-deep" size={18} />
                <span>We will confirm repair-first options before recommending replacement.</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left">
          {status === "success" ? (
            <div className="card flex flex-col items-center justify-center gap-3 py-16 text-center">
              <MdCheckCircle size={48} className="text-brand" />
              <h3 className="font-display text-xl font-semibold text-ink">Thanks, we have it.</h3>
              <p className="text-sm text-muted">
                We will be in touch shortly. For urgent issues, call{" "}
                {config.contact.emergency.number}.
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-2">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    className="field-input"
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-err" : undefined}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name ? <p id="name-err" className="field-error" role="alert">{errors.name.message}</p> : null}
                </div>
                <div>
                  <label className="field-label" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    className="field-input"
                    placeholder="04xx xxx xxx"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-err" : undefined}
                    {...register("phone", { required: "Phone is required" })}
                  />
                  {errors.phone ? <p id="phone-err" className="field-error" role="alert">{errors.phone.message}</p> : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className="field-input"
                    placeholder="you@email.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-err" : undefined}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Enter a valid email" },
                    })}
                  />
                  {errors.email ? <p id="email-err" className="field-error" role="alert">{errors.email.message}</p> : null}
                </div>
                <div>
                  <label className="field-label" htmlFor="suburb">
                    Suburb
                  </label>
                  <input
                    id="suburb"
                    className="field-input"
                    placeholder="e.g. Glen Waverley"
                    aria-invalid={Boolean(errors.suburb)}
                    aria-describedby={errors.suburb ? "suburb-err" : undefined}
                    {...register("suburb", { required: "Suburb is required" })}
                  />
                  {errors.suburb ? <p id="suburb-err" className="field-error" role="alert">{errors.suburb.message}</p> : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Dropdown
                  label="Property type"
                  value={watch("propertyType")}
                  options={FORM_OPTIONS.propertyTypes}
                  onChange={(value) => setValue("propertyType", value)}
                />
                <Dropdown
                  label="Service type"
                  value={watch("serviceType")}
                  options={FORM_OPTIONS.serviceTypes}
                  onChange={(value) => setValue("serviceType", value)}
                />
              </div>

              <Chips
                label="What's it for?"
                value={serviceFor}
                options={FORM_OPTIONS.serviceFor}
                onChange={(value) => setValue("serviceFor", value)}
              />

              {serviceFor === "Gate" ? (
                <Dropdown
                  label="Gate type"
                  value={watch("gateType")}
                  options={FORM_OPTIONS.gateTypes}
                  onChange={(value) => setValue("gateType", value)}
                />
              ) : (
                <Dropdown
                  label="Garage door type"
                  value={watch("garageDoorType")}
                  options={FORM_OPTIONS.garageDoorTypes}
                  onChange={(value) => setValue("garageDoorType", value)}
                />
              )}

              <div>
                <label className="field-label" htmlFor="message">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="field-input resize-none"
                  placeholder="Describe the fault or what you need..."
                  {...register("message")}
                />
              </div>

              <div>
                <label className="field-label">Photo (optional)</label>
                <div className="rounded-2xl border border-dashed border-line bg-canvas p-3 transition-colors hover:border-brand/40">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-surface px-4 py-3 text-left shadow-card transition hover:bg-brand-tint"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand-deep">
                        {fileName ? <MdImage size={18} /> : <MdFileUpload size={18} />}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-ink">
                          {fileName || "Upload a photo of your opener"}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          JPG, PNG, HEIC, or WebP helps us quote faster.
                        </span>
                      </span>
                    </button>
                    {fileName ? (
                      <button
                        type="button"
                        onClick={removeFile}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent/30 px-4 py-3 text-sm font-semibold text-accent transition hover:bg-accent/10"
                      >
                        <MdClose size={16} /> Remove
                      </button>
                    ) : null}
                  </div>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
              </div>

              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                {...register("company")}
              />

              {HAS_TURNSTILE ? (
                <div ref={turnstileRef} className="cf-turnstile min-h-[65px]" />
              ) : (
                <p className="rounded-xl border border-accent/30 bg-accent-tint px-4 py-3 text-sm text-accent">
                  Add your Cloudflare Turnstile site key in .env.local before live submissions.
                </p>
              )}

              <button type="submit" disabled={status === "submitting"} className="btn-primary w-full text-base">
                {status === "submitting" ? (
                  <>
                    <ImSpinner8 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Request free quote"
                )}
              </button>

              {status === "error" ? (
                <p className="flex items-center gap-2 text-sm text-accent">
                  <MdWarning size={16} /> {submitError || "Something went wrong."} Please call{" "}
                  {config.contact.emergency.number} if urgent.
                </p>
              ) : null}
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
