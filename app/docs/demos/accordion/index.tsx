"use client";

import { Accordion } from '@/package/src/components/accordion';
import { ChevronUpIcon, FolderIcon, PlusIcon } from 'lucide-react';
import React from 'react'

export function SideBarAccordion() {
  return (
    <Accordion.Root
      multiple
      defaultValue={['home', 'documents']}
      orientation="horizontal"
      className="w-[520px] max-w-[calc(100vw-2rem)] rounded-xl overflow-hidden border border-border bg-card shadow-sm"
    >

      <Accordion.Item value="home" className="flex border-b border-border last:border-b-0">
        <Accordion.Header className="w-44 shrink-0 border-r border-sidebar-border bg-sidebar">
          <Accordion.Trigger className="group flex w-full items-center gap-2.5 px-3 py-3 text-left text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring data-[panel-open]:bg-sidebar-accent">
            <FolderIcon className="size-4 shrink-0 text-muted-foreground group-data-[panel-open]:text-sidebar-primary transition-colors duration-150" />
            <span className="flex-1 text-sm font-medium truncate">Home</span>
            <span className="mr-1 size-1.5 rounded-full bg-primary opacity-0 group-data-[panel-open]:opacity-100 transition-opacity duration-150" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel keepMounted className="flex-1 h-[var(--accordion-panel-height)] overflow-hidden transition-[height] ease-out data-[starting-style]:h-0 data-[ending-style]:h-0">
          <div className="mx-3 my-3 rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold text-foreground mb-1">Home Folder</p>
            <p className="text-xs text-muted-foreground leading-relaxed">Your personal home directory.</p>
            <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
              <span className="text-[11px] text-muted-foreground">Path</span>
              <span className="text-[11px] font-mono text-foreground">/home/ubuntu</span>
              <span className="text-[11px] text-muted-foreground">Free</span>
              <span className="text-[11px] font-mono text-foreground">68.4 GB</span>
            </div>
          </div>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="documents" className="flex border-b border-border last:border-b-0">
        <Accordion.Header className="w-44 shrink-0 border-r border-sidebar-border bg-sidebar">
          <Accordion.Trigger className="group flex w-full items-center gap-2.5 px-3 py-3 text-left text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring data-[panel-open]:bg-sidebar-accent">
            <FolderIcon className="size-4 shrink-0 text-muted-foreground group-data-[panel-open]:text-sidebar-primary transition-colors duration-150" />
            <span className="flex-1 text-sm font-medium truncate">Documents</span>
            <span className="mr-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/15 px-1 text-[10px] font-medium text-primary">3</span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel keepMounted className="flex-1 h-[var(--accordion-panel-height)] overflow-hidden transition-[height] ease-out data-[starting-style]:h-0 data-[ending-style]:h-0">
          <div className="mx-3 my-3 rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold text-foreground mb-1">Documents</p>
            <p className="text-xs text-muted-foreground leading-relaxed">Store your personal files and PDFs.</p>
            <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
              <span className="text-[11px] text-muted-foreground">Items</span>
              <span className="text-[11px] font-mono text-foreground">3</span>
              <span className="text-[11px] text-muted-foreground">Size</span>
              <span className="text-[11px] font-mono text-foreground">2.1 MB</span>
            </div>
          </div>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="trash" className="flex border-b border-border last:border-b-0">
        <Accordion.Header className="w-44 shrink-0 border-r border-sidebar-border bg-sidebar">
          <Accordion.Trigger className="group flex w-full items-center gap-2.5 px-3 py-3 text-left text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring data-[panel-open]:bg-sidebar-accent">
            <FolderIcon className="size-4 shrink-0 text-muted-foreground group-data-[panel-open]:text-sidebar-primary transition-colors duration-150" />
            <span className="flex-1 text-sm font-medium truncate">Trash</span>
            <span className="mr-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/15 px-1 text-[10px] font-medium text-primary">12</span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel keepMounted className="flex-1 h-[var(--accordion-panel-height)] overflow-hidden transition-[height] ease-out data-[starting-style]:h-0 data-[ending-style]:h-0">
          <div className="mx-3 my-3 rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold text-foreground mb-1">Trash</p>
            <p className="text-xs text-muted-foreground leading-relaxed">Files remain here until you empty the trash.</p>
            <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
              <span className="text-[11px] text-muted-foreground">Items</span>
              <span className="text-[11px] font-mono text-foreground">12 files</span>
              <span className="text-[11px] text-muted-foreground">Size</span>
              <span className="text-[11px] font-mono text-foreground">84.7 MB</span>
            </div>
          </div>
        </Accordion.Panel>
      </Accordion.Item>

    </Accordion.Root>
  )
}


export function CompactAccordion() {
  return (
    <Accordion.Root defaultValue="appearance" className="flex flex-col divide-y divide-border">

        <Accordion.Item value="appearance">
          <Accordion.Header>
            <Accordion.Trigger className="group relative flex w-full items-center gap-3 px-4 py-3 text-left bg-card text-foreground hover:bg-accent transition-colors duration-150 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring data-[panel-open]:bg-primary/8">
              <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-primary scale-y-0 group-data-[panel-open]:scale-y-100 transition-transform duration-200 ease-out origin-center" />
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary text-base leading-none">🎨</span>
              <span className="flex-1 text-sm font-medium">Appearance</span>
              <ChevronUpIcon className="mr-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-data-[panel-open]:rotate-180 group-data-[panel-open]:text-primary" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] ease-out data-[starting-style]:h-0 data-[ending-style]:h-0">
            <div className="px-4 pb-4 pt-2 pl-[3.75rem] text-sm leading-relaxed text-muted-foreground">
              Choose between Light, Dark, and High-Contrast themes.
            </div>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="display">
          <Accordion.Header>
            <Accordion.Trigger className="group relative flex w-full items-center gap-3 px-4 py-3 text-left bg-card text-foreground hover:bg-accent transition-colors duration-150 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring data-[panel-open]:bg-primary/8">
              <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-primary scale-y-0 group-data-[panel-open]:scale-y-100 transition-transform duration-200 ease-out origin-center" />
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary text-base leading-none">🖥️</span>
              <span className="flex-1 text-sm font-medium">Displays</span>
              <ChevronUpIcon className="mr-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-data-[panel-open]:rotate-180 group-data-[panel-open]:text-primary" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] ease-out data-[starting-style]:h-0 data-[ending-style]:h-0">
            <div className="px-4 pb-4 pt-2 pl-[3.75rem] text-sm leading-relaxed text-muted-foreground">
              Configure resolution, refresh rate, and multi-monitor layout.
            </div>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="sound">
          <Accordion.Header>
            <Accordion.Trigger className="group relative flex w-full items-center gap-3 px-4 py-3 text-left bg-card text-foreground hover:bg-accent transition-colors duration-150 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring data-[panel-open]:bg-primary/8">
              <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-primary scale-y-0 group-data-[panel-open]:scale-y-100 transition-transform duration-200 ease-out origin-center" />
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary text-base leading-none">🔊</span>
              <span className="flex-1 text-sm font-medium">Sound</span>
              <ChevronUpIcon className="mr-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-data-[panel-open]:rotate-180 group-data-[panel-open]:text-primary" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] ease-out data-[starting-style]:h-0 data-[ending-style]:h-0">
            <div className="px-4 pb-4 pt-2 pl-[3.75rem] text-sm leading-relaxed text-muted-foreground">
              Adjust output volume and choose audio devices.
            </div>
          </Accordion.Panel>
        </Accordion.Item>

      </Accordion.Root>
  )
} 

export function NormalAccordion() {
  return (
    <Accordion.Root
      multiple
      className="flex w-96 max-w-[calc(100vw-8rem)] flex-col justify-center text-gray-900"
    >
          <Accordion.Item className="border-b border-gray-200">
            <Accordion.Header>
              <Accordion.Trigger className="group relative flex w-full items-baseline justify-between gap-4 bg-gray-50 py-2 pr-1 pl-3 text-left font-medium hover:bg-gray-100 focus-visible:z-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800">
            What is Base UI?
            <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45" />
          </Accordion.Trigger>
        </Accordion.Header>
            <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-base text-gray-600 transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
              <div className="p-3">
            Base UI is a library of high-quality unstyled React components for design systems and
            web apps.
          </div>
        </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className="border-b border-gray-200">
            <Accordion.Header>
              <Accordion.Trigger className="group relative flex w-full items-baseline justify-between gap-4 bg-gray-50 py-2 pr-1 pl-3 text-left font-medium hover:bg-gray-100 focus-visible:z-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800">
            How do I get started?
            <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45" />
          </Accordion.Trigger>
        </Accordion.Header>
            <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-base text-gray-600 transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
              <div className="p-3">
            Head to the “Quick start” guide in the docs. If you’ve used unstyled libraries before,
            you’ll feel at home.
          </div>
        </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className="border-b border-gray-200">
            <Accordion.Header>
              <Accordion.Trigger className="group relative flex w-full items-baseline justify-between gap-4 bg-gray-50 py-2 pr-1 pl-3 text-left font-medium hover:bg-gray-100 focus-visible:z-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800">
            Can I use it for my project?
            <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45" />
          </Accordion.Trigger>
        </Accordion.Header>
            <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-base text-gray-600 transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
          <div className="p-3">Of course! Base UI is free and open source.</div>
        </Accordion.Panel>
      </Accordion.Item>
        </Accordion.Root>
  )
}
