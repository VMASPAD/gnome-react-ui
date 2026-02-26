"use client";

import * as React from "react";
import { Toast } from "@/app/components/toast";
import { X, CheckCircle, AlertCircle, Info, Loader2, Undo2 } from "lucide-react";

// ─── Shared styles ────────────────────────────────────────────────────────────

const toastRootCls =
  "relative flex w-80 flex-col rounded-xl border border-border bg-card text-card-foreground shadow-lg " +
  "outline-none overflow-hidden cursor-default select-none " +
  // Stacking
  "transition-[transform,opacity,height] duration-200 ease-out " +
  "[--offset-y:calc(var(--toast-offset-y,0px))] " +
  // Collapsed: scale by index
  "[transform:translateY(calc(var(--toast-index)*-6px))_scale(calc(1-var(--toast-index)*0.04))] " +
  // Expanded: translate to offset
  "data-[expanded]:[transform:translateY(var(--toast-offset-y))] " +
  // Swipe
  "data-[swiping]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+var(--toast-offset-y)))] " +
  // Enter/Exit animations
  "data-[starting-style]:opacity-0 data-[starting-style]:translate-y-4 " +
  "data-[ending-style]:opacity-0 data-[ending-style]:translate-x-full";

// Fixed: removed data-[behind]:opacity-0 so stacked toasts always show their content
const toastContentCls =
  "overflow-hidden transition-opacity duration-200 opacity-100";

const toastCloseCls =
  "flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground " +
  "hover:bg-muted hover:text-foreground transition-colors duration-150 outline-none " +
  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-1";

const viewportCls =
  "fixed bottom-4 right-4 z-50 flex flex-col-reverse items-end gap-2 " +
  // When expanded, toasts stack with offset
  "data-[expanded]:gap-0";

// ─── 1. ToastBasic ────────────────────────────────────────────────────────────

function ToastListBasic() {
  const { toasts } = Toast.useToastManager();
  return (
    <>
      {toasts.map((toast) => (
        <Toast.Root key={toast.id} toast={toast} className={toastRootCls}>
          <Toast.Content className={toastContentCls + " flex items-start gap-3 p-4"}>
            <Info className="size-4 shrink-0 mt-0.5 text-primary" />
            <div className="flex-1 min-w-0">
              <Toast.Title className="text-sm font-medium text-foreground leading-none mb-1" />
              <Toast.Description className="text-xs text-muted-foreground leading-relaxed" />
            </div>
            <Toast.Close className={toastCloseCls} aria-label="Close">
              <X className="size-3.5" />
            </Toast.Close>
          </Toast.Content>
        </Toast.Root>
      ))}
    </>
  );
}

export function ToastBasic() {
  return (
    <Toast.Provider>
      <ToastBasicTrigger />
      <Toast.Portal>
        <Toast.Viewport className={viewportCls}>
          <ToastListBasic />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastBasicTrigger() {
  const toastManager = Toast.useToastManager();
  const [count, setCount] = React.useState(0);

  return (
    <button
      type="button"
      onClick={() => {
        const n = count + 1;
        setCount(n);
        toastManager.add({
          title: "Changes saved",
          description: `Your workspace settings have been updated (${n}).`,
        });
      }}
      className={
        "rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground " +
        "hover:bg-muted transition-colors duration-150 outline-none " +
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
      }
    >
      Save changes
    </button>
  );
}

// ─── 2. ToastWithTypes ────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "warning" | "info";

const typeConfig: Record<
  ToastType,
  { icon: React.ComponentType<{ className?: string }>; iconCls: string; label: string }
> = {
  success: {
    icon: CheckCircle,
    iconCls: "text-green-500",
    label: "File uploaded",
  },
  error: {
    icon: AlertCircle,
    iconCls: "text-red-500",
    label: "Upload failed",
  },
  warning: {
    icon: AlertCircle,
    iconCls: "text-yellow-500",
    label: "Storage almost full",
  },
  info: {
    icon: Info,
    iconCls: "text-blue-500",
    label: "New version available",
  },
};

function ToastListWithTypes() {
  const { toasts } = Toast.useToastManager();
  return (
    <>
      {toasts.map((toast) => {
        const type = (toast.type as ToastType) ?? "info";
        const config = typeConfig[type] ?? typeConfig.info;
        const Icon = config.icon;

        return (
          <Toast.Root key={toast.id} toast={toast} className={toastRootCls}>
            <Toast.Content className={toastContentCls + " p-4"}>
              <div className="flex items-start gap-3">
                <Icon className={"size-4 shrink-0 mt-0.5 " + config.iconCls} />
                <div className="flex-1 min-w-0">
                  <Toast.Title className="text-sm font-medium text-foreground leading-none mb-1" />
                  <Toast.Description className="text-xs text-muted-foreground leading-relaxed" />
                </div>
                <Toast.Close className={toastCloseCls} aria-label="Close">
                  <X className="size-3.5" />
                </Toast.Close>
              </div>
              {/* Action button */}
              {toast.actionProps && (
                <div className="mt-3 flex justify-end">
                  <Toast.Action
                    {...toast.actionProps}
                    className={
                      "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium " +
                      "text-foreground border border-border hover:bg-muted " +
                      "transition-colors duration-150 outline-none " +
                      "focus-visible:outline-2 focus-visible:outline-ring"
                    }
                  />
                </div>
              )}
            </Toast.Content>
          </Toast.Root>
        );
      })}
    </>
  );
}

export function ToastWithTypes() {
  return (
    <Toast.Provider>
      <ToastTypeTriggers />
      <Toast.Portal>
        <Toast.Viewport className={viewportCls}>
          <ToastListWithTypes />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastTypeTriggers() {
  const toastManager = Toast.useToastManager();

  const fire = (type: ToastType) => {
    const cfg = typeConfig[type];
    toastManager.add({
      title: cfg.label,
      description:
        type === "success"
          ? "report-q4.pdf was uploaded successfully."
          : type === "error"
          ? "The file exceeds the 100 MB limit."
          : type === "warning"
          ? "You have used 90% of your 5 GB quota."
          : "v2.4.0 is available. Refresh to update.",
      type,
      actionProps:
        type === "success"
          ? { children: "Undo", onClick: () => {} }
          : undefined,
    });
  };

  const btnCls =
    "rounded-xl border border-border px-3 py-1.5 text-xs font-medium " +
    "hover:bg-muted transition-colors duration-150 outline-none " +
    "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2";

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => fire("success")} className={btnCls + " text-green-600 dark:text-green-400"}>
        Success
      </button>
      <button type="button" onClick={() => fire("error")} className={btnCls + " text-red-600 dark:text-red-400"}>
        Error
      </button>
      <button type="button" onClick={() => fire("warning")} className={btnCls + " text-yellow-600 dark:text-yellow-400"}>
        Warning
      </button>
      <button type="button" onClick={() => fire("info")} className={btnCls + " text-blue-600 dark:text-blue-400"}>
        Info
      </button>
    </div>
  );
}

// ─── 3. ToastPromise ──────────────────────────────────────────────────────────

function ToastListPromise() {
  const { toasts } = Toast.useToastManager();
  return (
    <>
      {toasts.map((toast) => {
        const type = toast.type as "loading" | "success" | "error" | undefined;

        return (
          <Toast.Root key={toast.id} toast={toast} className={toastRootCls}>
            <Toast.Content className={toastContentCls + " flex items-start gap-3 p-4"}>
              {type === "loading" ? (
                <Loader2 className="size-4 shrink-0 mt-0.5 text-muted-foreground animate-spin" />
              ) : type === "success" ? (
                <CheckCircle className="size-4 shrink-0 mt-0.5 text-green-500" />
              ) : type === "error" ? (
                <AlertCircle className="size-4 shrink-0 mt-0.5 text-red-500" />
              ) : (
                <Info className="size-4 shrink-0 mt-0.5 text-primary" />
              )}
              <div className="flex-1 min-w-0">
                <Toast.Title className="text-sm font-medium text-foreground leading-none mb-1" />
                <Toast.Description className="text-xs text-muted-foreground leading-relaxed" />
              </div>
              {type !== "loading" && (
                <Toast.Close className={toastCloseCls} aria-label="Close">
                  <X className="size-3.5" />
                </Toast.Close>
              )}
            </Toast.Content>
          </Toast.Root>
        );
      })}
    </>
  );
}

export function ToastPromise() {
  return (
    <Toast.Provider>
      <ToastPromiseTrigger />
      <Toast.Portal>
        <Toast.Viewport className={viewportCls}>
          <ToastListPromise />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastPromiseTrigger() {
  const toastManager = Toast.useToastManager();
  const [pending, setPending] = React.useState(false);

  const runPromise = async () => {
    if (pending) return;
    setPending(true);
    try {
      await toastManager.promise(
        new Promise<string>((resolve, reject) => {
          setTimeout(() => {
            Math.random() > 0.3 ? resolve("data-export.csv") : reject(new Error("Server timeout"));
          }, 2000);
        }),
        {
          loading: { title: "Exporting…", description: "Preparing your data export." },
          success: (filename) => ({
            title: "Export ready",
            description: `${filename} is ready to download.`,
          }),
          error: (err) => ({
            title: "Export failed",
            description: err instanceof Error ? err.message : "Something went wrong.",
          }),
        }
      );
    } catch {
      /* handled by toastManager.promise */
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={runPromise}
      disabled={pending}
      className={
        "rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground " +
        "hover:bg-muted transition-colors duration-150 outline-none " +
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 " +
        "disabled:opacity-50 disabled:cursor-not-allowed"
      }
    >
      {pending ? "Exporting…" : "Export data"}
    </button>
  );
}