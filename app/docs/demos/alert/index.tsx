"use client";
import * as React from 'react';
import { AlertDialog } from '@/app/components/alert-dialog';
import { Trash2, LogOut, TriangleAlert, HardDriveUpload, CircleAlert } from 'lucide-react';

export function AlertNormal() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="inline-flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/8 px-4 py-2 text-sm font-medium leading-none text-destructive transition-colors duration-150 hover:bg-destructive/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
        <Trash2 className="size-4 shrink-0" />
        Delete file
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black/40 backdrop-blur-sm transition-all duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 w-[400px] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-xl outline-none transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          <div className=" flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
            <Trash2 className="size-5" />
          </div>
          <AlertDialog.Title className="mb-1 text-base font-semibold text-foreground">
            Delete this file?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-6 text-sm leading-relaxed text-muted-foreground">
            This action cannot be undone. The file will be permanently removed from your system.
          </AlertDialog.Description>
          <div className="flex justify-end gap-2">
            <AlertDialog.Close className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-medium leading-none text-foreground transition-colors duration-150 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
              Cancel
            </AlertDialog.Close>
            <AlertDialog.Close className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-destructive px-4 text-sm font-medium leading-none text-white transition-colors duration-150 hover:bg-destructive/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
              <Trash2 className="size-3.5 shrink-0" />
              Delete
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export function AlertDialogWarning() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 text-sm font-medium leading-none text-foreground transition-colors duration-150 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
        <LogOut className="size-4 shrink-0" />
        Sign out
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black/40 backdrop-blur-sm transition-all duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 w-[380px] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-0 shadow-xl outline-none overflow-hidden transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          <div className="flex items-center gap-3 border-b border-border bg-[oklch(0.97_0.02_80)] px-5 py-4 dark:bg-[oklch(0.25_0.02_80)]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.85_0.1_80)] text-[oklch(0.45_0.15_60)] dark:bg-[oklch(0.35_0.08_80)] dark:text-[oklch(0.85_0.1_80)]">
              <TriangleAlert className="size-4" />
            </div>
            <AlertDialog.Title className="text-sm font-semibold text-foreground">
              Sign out of your account?
            </AlertDialog.Title>
          </div>
          <div className="px-5 py-4">
            <AlertDialog.Description className="text-sm leading-relaxed text-muted-foreground">
              You will be returned to the login screen. Any unsaved changes will be lost.
            </AlertDialog.Description>
          </div>
          <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
            <AlertDialog.Close className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-medium leading-none text-foreground transition-colors duration-150 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
              Cancel
            </AlertDialog.Close>
            <AlertDialog.Close className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-medium leading-none text-primary-foreground transition-colors duration-150 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
              <LogOut className="size-3.5 shrink-0" />
              Sign out
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export function AlertDialogCritical() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="inline-flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/8 px-4 py-2 text-sm font-medium leading-none text-destructive transition-colors duration-150 hover:bg-destructive/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
        <HardDriveUpload className="size-4 shrink-0" />
        Format disk
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black/50 backdrop-blur-sm transition-all duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 w-[400px] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-destructive/20 bg-card shadow-2xl outline-none overflow-hidden transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          <div className="border-b border-destructive/20 bg-destructive/8 px-5 py-5 dark:bg-destructive/12">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/15 text-destructive">
              <CircleAlert className="size-5" />
            </div>
            <AlertDialog.Title className="text-base font-semibold text-foreground">
              Format disk?
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-1 text-sm leading-relaxed text-muted-foreground">
              All data on this drive will be permanently erased. This action cannot be undone.
            </AlertDialog.Description>
          </div>
          <div className="flex items-start gap-3 border-b border-border px-5 py-4">
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Make sure you have backed up any important data before proceeding.
            </p>
          </div>
          <div className="flex justify-end gap-2 px-5 py-3">
            <AlertDialog.Close className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-medium leading-none text-foreground transition-colors duration-150 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
              Cancel
            </AlertDialog.Close>
            <AlertDialog.Close className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-destructive px-4 text-sm font-medium leading-none text-white transition-colors duration-150 hover:bg-destructive/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
              <HardDriveUpload className="size-3.5 shrink-0" />
              Format
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}