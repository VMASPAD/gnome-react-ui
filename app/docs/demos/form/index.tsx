'use client';
import * as React from 'react';
import { Form } from '@/app/components/form';
import { Field } from '@/app/components/field';
import { Button } from '@/app/components/button';
import { User, Mail, Lock, Globe, Loader2, Check, AlertCircle } from 'lucide-react';

// ─── Shared ───────────────────────────────────────────────────────────────────

const inputCls =
  'h-10 w-full rounded-xl border border-input bg-background pl-9 pr-3.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-150 hover:border-ring/50 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-ring data-[field-invalid]:border-destructive data-[field-invalid]:focus:outline-destructive';

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium leading-none transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50';

const labelCls =
  'text-xs font-semibold uppercase tracking-widest text-muted-foreground';

const errorCls =
  'flex items-center gap-1.5 text-xs text-destructive';

// ─── Default — Login form with server-side error ──────────────────────────────
// validationMode="onSubmit", simulates a server returning an error on the email field

export function FormDefault() {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const data = new FormData(e.currentTarget);
    const email = data.get('email') as string;

    await new Promise((r) => setTimeout(r, 1200));

    if (!email.includes('@ubuntu')) {
      setErrors({ email: 'Only @ubuntu.com accounts are allowed.' });
    } else {
      setErrors({});
      setSuccess(true);
    }
    setLoading(false);
  }

  return (
    <div className="w-80 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-5 py-4">
        <p className="text-base font-semibold text-foreground">Sign in</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Use your Ubuntu account</p>
      </div>

      <Form
        errors={errors}
        onFormSubmit={handleSubmit}
        className="flex flex-col gap-4 px-5 py-5"
      >
        <Field.Root name="email">
          <Field.Label className={labelCls}>Email</Field.Label>
          <div className="relative mt-1.5 flex items-center">
            <Mail className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <Field.Control
              type="email"
              required
              placeholder="you@ubuntu.com"
              className={inputCls}
            />
          </div>
          <Field.Error className={`mt-1.5 ${errorCls}`}>
            <AlertCircle className="size-3.5 shrink-0" />
            <Field.Error match="valueMissing">Email is required.</Field.Error>
            <Field.Error match="typeMismatch">Enter a valid email address.</Field.Error>
          </Field.Error>
        </Field.Root>

        <Field.Root name="password">
          <Field.Label className={labelCls}>Password</Field.Label>
          <div className="relative mt-1.5 flex items-center">
            <Lock className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <Field.Control
              type="password"
              required
              placeholder="••••••••"
              className={inputCls}
            />
          </div>
          <Field.Error className={`mt-1.5 ${errorCls}`}>
            <AlertCircle className="size-3.5 shrink-0" />
            <Field.Error match="valueMissing">Password is required.</Field.Error>
          </Field.Error>
        </Field.Root>

        <Button
          type="submit"
          disabled={loading}
          focusableWhenDisabled
          className={`${btnBase} mt-1 h-10 w-full ${success ? 'bg-[oklch(0.55_0.15_150)] text-white' : 'bg-primary text-primary-foreground hover:brightness-95'} disabled:opacity-100 disabled:brightness-90`}
        >
          {loading && <Loader2 className="size-4 shrink-0 animate-spin" />}
          {success && <Check className="size-4 shrink-0" />}
          {!loading && !success && <User className="size-4 shrink-0" />}
          {loading ? 'Signing in…' : success ? 'Signed in!' : 'Sign in'}
        </Button>
      </Form>
    </div>
  );
}

// ─── On-blur validation — Profile settings form ───────────────────────────────
// validationMode="onBlur", fields validate as user tabs through them

export function FormOnBlur() {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="w-96 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-5 py-4">
        <p className="text-base font-semibold text-foreground">Profile settings</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Validates when you leave each field</p>
      </div>

      <Form
        errors={errors}
        validationMode="onBlur"
        onFormSubmit={handleSubmit}
        className="flex flex-col gap-4 px-5 py-5"
      >
        <div className="flex gap-3">
          <Field.Root name="firstname" className="flex-1">
            <Field.Label className={labelCls}>First name</Field.Label>
            <div className="relative mt-1.5 flex items-center">
              <User className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
              <Field.Control
                required
                placeholder="Elena"
                className={inputCls}
              />
            </div>
            <Field.Error className={`mt-1.5 ${errorCls}`}>
              <AlertCircle className="size-3.5 shrink-0" />
              <Field.Error match="valueMissing">Required.</Field.Error>
            </Field.Error>
          </Field.Root>

          <Field.Root name="lastname" className="flex-1">
            <Field.Label className={labelCls}>Last name</Field.Label>
            <div className="relative mt-1.5 flex items-center">
              <User className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
              <Field.Control
                required
                placeholder="Larsson"
                className={inputCls}
              />
            </div>
            <Field.Error className={`mt-1.5 ${errorCls}`}>
              <AlertCircle className="size-3.5 shrink-0" />
              <Field.Error match="valueMissing">Required.</Field.Error>
            </Field.Error>
          </Field.Root>
        </div>

        <Field.Root name="email">
          <Field.Label className={labelCls}>Email address</Field.Label>
          <div className="relative mt-1.5 flex items-center">
            <Mail className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <Field.Control
              type="email"
              required
              placeholder="elena@example.com"
              className={inputCls}
            />
          </div>
          <Field.Error className={`mt-1.5 ${errorCls}`}>
            <AlertCircle className="size-3.5 shrink-0" />
            <Field.Error match="valueMissing">Email is required.</Field.Error>
            <Field.Error match="typeMismatch">Enter a valid email.</Field.Error>
          </Field.Error>
        </Field.Root>

        <Field.Root name="website">
          <Field.Label className={labelCls}>Website</Field.Label>
          <div className="relative mt-1.5 flex items-center">
            <Globe className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <Field.Control
              type="url"
              placeholder="https://example.com"
              pattern="https?://.*"
              className={inputCls}
            />
          </div>
          <Field.Error className={`mt-1.5 ${errorCls}`}>
            <AlertCircle className="size-3.5 shrink-0" />
            <Field.Error match="patternMismatch">Must start with http:// or https://</Field.Error>
          </Field.Error>
        </Field.Root>

        <Button
          type="submit"
          disabled={loading}
          focusableWhenDisabled
          className={`${btnBase} mt-1 h-10 w-full ${saved ? 'bg-[oklch(0.55_0.15_150)] text-white' : 'bg-primary text-primary-foreground hover:brightness-95'} disabled:opacity-100 disabled:brightness-90`}
        >
          {loading && <Loader2 className="size-4 shrink-0 animate-spin" />}
          {saved && <Check className="size-4 shrink-0" />}
          {!loading && !saved && <Check className="size-4 shrink-0" />}
          {loading ? 'Saving…' : saved ? 'Saved!' : 'Save changes'}
        </Button>
      </Form>
    </div>
  );
}