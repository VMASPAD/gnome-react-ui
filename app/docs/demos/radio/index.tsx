"use client";

import * as React from "react";
import { Radio } from "@/app/components/radio";
import { RadioGroup } from "@/app/components/radio-group";

// ─── Shared styles ────────────────────────────────────────────────────────────

const rootCls =
  "relative flex size-4 shrink-0 items-center justify-center rounded-full border border-border bg-background " +
  "outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 " +
  "transition-colors duration-150 cursor-pointer " +
  "data-[checked]:border-primary data-[checked]:bg-primary " +
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

const indicatorCls =
  "size-1.5 rounded-full bg-primary-foreground " +
  "data-[unchecked]:hidden";

const labelRowCls =
  "flex cursor-pointer items-center gap-2.5 text-sm text-foreground " +
  "has-[span[data-disabled]]:cursor-not-allowed has-[span[data-disabled]]:opacity-50";

// ─── 1. RadioGroupBasic ───────────────────────────────────────────────────────
// Grupo simple con defaultValue

export function RadioGroupBasic() {
  return (
    <RadioGroup
      defaultValue="system"
      aria-label="Theme"
      className="flex flex-col gap-2"
    >
      <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Theme
      </p>
      {[
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
        { value: "system", label: "System" },
      ].map(({ value, label }) => (
        <label key={value} className={labelRowCls}>
          <Radio.Root value={value} className={rootCls}>
            <Radio.Indicator className={indicatorCls} />
          </Radio.Root>
          {label}
        </label>
      ))}
    </RadioGroup>
  );
}

// ─── 2. RadioGroupWithDescriptions ───────────────────────────────────────────
// Cada opción tiene título + descripción — patrón tipo "plan selector"

const plans = [
  {
    value: "free",
    label: "Free",
    description: "For personal projects and experimentation.",
  },
  {
    value: "pro",
    label: "Pro",
    description: "For professionals who need more power and storage.",
  },
  {
    value: "team",
    label: "Team",
    description: "For teams collaborating on multiple projects.",
  },
];

export function RadioGroupWithDescriptions() {
  return (
    <RadioGroup
      defaultValue="pro"
      aria-label="Billing plan"
      className="flex flex-col gap-2 w-72"
    >
      <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Billing plan
      </p>
      {plans.map(({ value, label, description }) => (
        <label
          key={value}
          className={
            "flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-3 " +
            "transition-colors duration-150 hover:bg-accent " +
            "has-[span[data-checked]]:border-primary has-[span[data-checked]]:bg-primary/5"
          }
        >
          <Radio.Root value={value} className={rootCls + " mt-0.5"}>
            <Radio.Indicator className={indicatorCls} />
          </Radio.Root>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground leading-none mb-1">
              {label}
            </p>
            <p className="text-xs text-muted-foreground leading-snug">
              {description}
            </p>
          </div>
        </label>
      ))}
    </RadioGroup>
  );
}

// ─── 3. RadioGroupControlled ──────────────────────────────────────────────────
// Controlled con value/onValueChange + opción disabled

const notifications = [
  { value: "all", label: "All activity" },
  { value: "mentions", label: "Mentions only" },
  { value: "none", label: "None", disabled: true },
];

export function RadioGroupControlled() {
  const [value, setValue] = React.useState("mentions");

  return (
    <div className="flex flex-col gap-4 w-64">
      <RadioGroup
        value={value}
        onValueChange={(v) => setValue(v as string)}
        aria-label="Notifications"
        className="flex flex-col gap-2"
      >
        <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Notifications
        </p>
        {notifications.map(({ value: v, label, disabled }) => (
          <label
            key={v}
            className={
              "flex cursor-pointer items-center gap-2.5 text-sm text-foreground " +
              (disabled ? "cursor-not-allowed opacity-50" : "")
            }
          >
            <Radio.Root value={v} disabled={disabled} className={rootCls}>
              <Radio.Indicator className={indicatorCls} />
            </Radio.Root>
            {label}
          </label>
        ))}
      </RadioGroup>

      <p className="text-xs text-muted-foreground border-t border-border pt-3">
        Selected:{" "}
        <span className="font-medium text-foreground">{value}</span>
      </p>
    </div>
  );
}