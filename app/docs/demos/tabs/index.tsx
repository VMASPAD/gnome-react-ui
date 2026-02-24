"use client";

import * as React from "react";
import { Tabs } from "@/app/components/tabs";
import {
  User,
  FolderOpen,
  Bell,
  Settings,
  CreditCard,
  Shield,
  Palette,
  Globe,
} from "lucide-react";

// ─── Shared tab/list styles ───────────────────────────────────────────────────

const tabBaseCls =
  "relative cursor-pointer whitespace-nowrap text-sm outline-none transition-colors duration-150 " +
  "focus-visible:rounded focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-40";

// ─── 1. TabsUnderline ─────────────────────────────────────────────────────────
// Tabs con indicador animado de subrayado — el patrón más común.
// Tabs.Indicator va DENTRO de Tabs.List y usa CSS variables del componente.

export function TabsUnderline() {
  return (
    <Tabs.Root defaultValue="overview" className="w-[400px]">
      <Tabs.List className="relative flex border-b border-border">
        {[
          { value: "overview", label: "Overview", icon: User },
          { value: "projects", label: "Projects", icon: FolderOpen },
          { value: "notifications", label: "Notifications", icon: Bell },
          { value: "settings", label: "Settings", icon: Settings },
        ].map(({ value, label, icon: Icon }) => (
          <Tabs.Tab
            key={value}
            value={value}
            className={
              tabBaseCls +
              " flex items-center gap-1.5 px-4 py-2.5 text-muted-foreground " +
              "data-[active]:text-foreground hover:text-foreground"
            }
          >
            <Icon className="size-3.5 shrink-0" />
            {label}
          </Tabs.Tab>
        ))}
        {/* Indicator animated underline */}
        <Tabs.Indicator
          className={
            "absolute bottom-0 h-0.5 rounded-full bg-primary " +
            "transition-[left,width] duration-200 ease-out"
          }
          style={{
            left: "var(--active-tab-left)",
            width: "var(--active-tab-width)",
          }}
        />
      </Tabs.List>

      <Tabs.Panel value="overview" className="p-4 outline-none">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your profile overview, recent activity, and key metrics at a glance.
        </p>
      </Tabs.Panel>
      <Tabs.Panel value="projects" className="p-4 outline-none">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Manage your projects, repositories, and collaborative workspaces.
        </p>
      </Tabs.Panel>
      <Tabs.Panel value="notifications" className="p-4 outline-none">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Configure notification preferences and review recent alerts.
        </p>
      </Tabs.Panel>
      <Tabs.Panel value="settings" className="p-4 outline-none">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Account settings, privacy controls, and security options.
        </p>
      </Tabs.Panel>
    </Tabs.Root>
  );
}

// ─── 2. TabsPill ─────────────────────────────────────────────────────────────
// Tabs estilo pill/badge — fondo sólido en el tab activo, sin Indicator

export function TabsPill() {
  return (
    <Tabs.Root defaultValue="month" className="w-72">
      <Tabs.List className="flex rounded-xl bg-muted p-1 gap-1">
        {[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
          { value: "year", label: "Year" },
        ].map(({ value, label }) => (
          <Tabs.Tab
            key={value}
            value={value}
            className={
              tabBaseCls +
              " flex-1 rounded-md px-3 py-1.5 text-center text-muted-foreground " +
              "data-[active]:bg-card data-[active]:text-foreground data-[active]:shadow-sm " +
              "hover:text-foreground"
            }
          >
            {label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {["day", "week", "month", "year"].map((v) => (
        <Tabs.Panel key={v} value={v} className="mt-4 outline-none">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Revenue ({v})
            </p>
            <p className="text-2xl font-semibold text-foreground tabular-nums">
              {v === "day"
                ? "$1,240"
                : v === "week"
                ? "$8,430"
                : v === "month"
                ? "$34,720"
                : "$412,900"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to previous {v}
            </p>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}

// ─── 3. TabsVertical ─────────────────────────────────────────────────────────
// Tabs con orientación vertical — sidebar de configuración

const settingsTabs = [
  { value: "general", label: "General", icon: Settings },
  { value: "appearance", label: "Appearance", icon: Palette },
  { value: "billing", label: "Billing", icon: CreditCard },
  { value: "security", label: "Security", icon: Shield },
  { value: "integrations", label: "Integrations", icon: Globe },
];

const settingsContent: Record<string, { title: string; description: string }> = {
  general: {
    title: "General",
    description: "Manage your account name, email address, and language preferences.",
  },
  appearance: {
    title: "Appearance",
    description: "Customize the look and feel — choose a theme, font size, and accent color.",
  },
  billing: {
    title: "Billing",
    description: "View your current plan, invoices, and payment methods.",
  },
  security: {
    title: "Security",
    description: "Configure two-factor authentication, active sessions, and API keys.",
  },
  integrations: {
    title: "Integrations",
    description: "Connect third-party services, webhooks, and OAuth applications.",
  },
};

export function TabsVertical() {
  return (
    <Tabs.Root
      defaultValue="general"
      orientation="vertical"
      className="flex gap-0 w-[480px] rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Sidebar */}
      <Tabs.List className="relative flex flex-col w-48 shrink-0 border-r border-border bg-muted/30 p-2 gap-0.5">
        {settingsTabs.map(({ value, label, icon: Icon }) => (
          <Tabs.Tab
            key={value}
            value={value}
            className={
              tabBaseCls +
              " flex items-center gap-2.5 rounded-md px-3 py-2 text-muted-foreground text-left " +
              "data-[active]:bg-background data-[active]:text-foreground data-[active]:shadow-sm " +
              "hover:bg-background/70 hover:text-foreground"
            }
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Tabs.Tab>
        ))}
        {/* Vertical indicator — tracks active tab on the right edge */}
        <Tabs.Indicator
          className={
            "absolute right-0 w-0.5 rounded-full bg-primary " +
            "transition-[top,height] duration-200 ease-out"
          }
          style={{
            top: "var(--active-tab-top)",
            height: "var(--active-tab-height)",
          }}
        />
      </Tabs.List>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {settingsTabs.map(({ value }) => (
          <Tabs.Panel key={value} value={value} className="p-6 outline-none h-full">
            <h3 className="text-base font-semibold text-foreground mb-1">
              {settingsContent[value].title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {settingsContent[value].description}
            </p>
          </Tabs.Panel>
        ))}
      </div>
    </Tabs.Root>
  );
}