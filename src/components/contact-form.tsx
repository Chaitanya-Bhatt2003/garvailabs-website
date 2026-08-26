"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check, Copy, Mail, MailOpen } from "lucide-react";

type Fields = { name: string; email: string; company: string; focus: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const INBOX = "garvailabs@gmail.com";

const focuses = [
  "AI automation & agents",
  "Software development",
  "Mobile app development",
  "Website development",
  "SEO",
  "GEO (answer-engine visibility)",
  "Not sure yet",
];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Tell us who we are meeting.";
  if (!emailRe.test(f.email.trim())) e.email = "That email does not look right.";
  if (f.company.trim().length < 2) e.company = "Company or team name, please.";
  if (f.message.trim().length < 15) e.message = "A sentence or two about the workflow helps us prepare.";
  return e;
}

/**
 * There is no backend. Rather than fake a confirmation for a request nobody
 * receives, the form writes the email and hands it to the visitor's own mail
 * client, then says plainly that sending it is what delivers it.
 */
function compose(f: Fields) {
  const subject = `Enquiry — ${f.company.trim()}`;
  const body = [
    `Name: ${f.name.trim()}`,
    `Company: ${f.company.trim()}`,
    `Email: ${f.email.trim()}`,
    `Focus: ${f.focus}`,
    "",
    "Workflow:",
    f.message.trim(),
  ].join("\n");
  return { body, href: `mailto:${INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}

const fieldClass =
  "h-14 w-full rounded-card border bg-soft/50 px-4 text-base placeholder:text-muted/55 transition-[border-color,box-shadow,background-color] duration-200 focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_var(--accent-soft)]";

export function ContactForm() {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    company: "",
    focus: focuses[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const summary = useRef<HTMLDivElement>(null);

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((p) => ({ ...p, [k]: e.target.value }));
      setErrors((p) => ({ ...p, [k]: undefined }));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    window.location.href = compose(fields).href;
    setDone(true);
  };

  if (done) {
    const draft = compose(fields);
    return (
      <div className="rounded-lg border border-line bg-surface p-6 shadow-[var(--shadow-md)] sm:p-8 md:p-10" role="status" aria-live="polite">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent-text">
          <MailOpen size={19} aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-3xl">Almost sent, {fields.name.split(" ")[0]}.</h2>
        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted">
          Your email app should have opened with the request already written.{" "}
          <span className="text-text">Press send there</span> and it reaches us — this page has no
          backend, so nothing leaves your browser until you do.
        </p>

        <div className="mt-7 rounded-card border border-line bg-soft p-5">
          <p className="text-sm font-medium">If nothing opened</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Email{" "}
            <a href={`mailto:${INBOX}`} className="text-accent-text underline underline-offset-4">
              {INBOX}
            </a>{" "}
            and paste this in:
          </p>
          <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap break-words rounded-card border border-line bg-surface p-3 text-xs leading-relaxed text-muted">
            {draft.body}
          </pre>
          <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(draft.body);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2200);
                } catch {
                  setCopied(false);
                }
              }}
              className="press inline-flex min-h-12 items-center gap-2 text-sm font-medium text-accent-text hover:underline"
            >
              {copied ? (
                <>
                  <Check size={14} strokeWidth={2.6} aria-hidden="true" /> Copied
                </>
              ) : (
                <>
                  <Copy size={14} aria-hidden="true" /> Copy the details
                </>
              )}
            </button>
            <a
              href={draft.href}
              className="press inline-flex min-h-12 items-center gap-2 text-sm font-medium text-muted hover:text-accent-text"
            >
              <Mail size={14} aria-hidden="true" /> Open my email app again
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setFields({ name: "", email: "", company: "", focus: focuses[0], message: "" });
            setDone(false);
          }}
          className="press mt-7 inline-flex min-h-12 items-center text-base font-medium text-accent-text hover:underline"
        >
          Write a different request
        </button>
      </div>
    );
  }

  const list = (Object.keys(errors) as (keyof Fields)[]).filter((k) => errors[k]);

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-line bg-surface p-5 shadow-[var(--shadow-md)] sm:p-7 md:p-9">
      <div
        ref={summary}
        tabIndex={-1}
        aria-live="assertive"
        className={list.length ? "mb-6 rounded-card border border-line bg-soft p-4" : "sr-only"}
      >
        {list.length > 0 && (
          <>
            <p className="text-sm font-medium">
              {list.length === 1 ? "One field needs a fix:" : `${list.length} fields need a fix:`}
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {list.map((k) => (
                <li key={k}>{errors[k]}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          id="name"
          label="Your name"
          value={fields.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
          autoCapitalize="words"
          placeholder="Ananya Sharma"
        />
        <Field
          id="email"
          label="Work email"
          type="email"
          value={fields.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
          inputMode="email"
          enterKeyHint="next"
          placeholder="you@company.in"
        />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field
          id="company"
          label="Company"
          value={fields.company}
          onChange={set("company")}
          error={errors.company}
          autoComplete="organization"
          placeholder="Company or team name"
        />
        <div>
          <label htmlFor="focus" className="mb-2 block text-sm font-medium">
            What do you need?
          </label>
          <select
            id="focus"
            value={fields.focus}
            onChange={set("focus")}
            className={`${fieldClass} appearance-none`}
          >
            {focuses.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          What is the workflow?
        </label>
        <textarea
          id="message"
          rows={5}
          value={fields.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          enterKeyHint="done"
          placeholder="e.g. Four people answer the same delivery questions every morning from three different systems."
          className={`w-full resize-y rounded-card border bg-soft/50 px-4 py-3.5 text-base leading-relaxed transition-[border-color,box-shadow,background-color] duration-200 focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_var(--accent-soft)] ${
            errors.message ? "border-line-strong" : "border-line"
          }`}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-muted">
            {errors.message}
          </p>
        )}
      </div>

      <div className="cta-stack mt-8">
        <button
          type="submit"
          className="btn-primary press inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent px-7 text-base font-semibold text-on-accent shadow-[var(--shadow-sm)] transition-[background-color,box-shadow] hover:bg-accent-hover max-[480px]:w-full"
        >
          Write my request
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <p className="text-center text-sm text-muted sm:text-left">
          Opens your email app with the details filled in.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  ...rest
}: { id: string; label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClass} ${error ? "border-line-strong" : "border-line"}`}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-muted">
          {error}
        </p>
      )}
    </div>
  );
}
