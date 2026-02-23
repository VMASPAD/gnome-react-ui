<div align="center">

<img src="https://gnome-react-ui.vercel.app/icon.svg" alt="GnomeUI" width="64" height="64" />


# GnomeUI

**Beautifully designed React components inspired by the GNOME Human Interface Guidelines.**

Copy and paste into your app. Accessible. Customizable. Open Source.

[![npm version](https://img.shields.io/npm/v/gnome-react-ui?color=%23E95420&labelColor=%231a1a2e&style=flat-square)](https://www.npmjs.com/package/gnome-ui)
[![License](https://img.shields.io/badge/license-MIT-blue?color=%23E95420&labelColor=%231a1a2e&style=flat-square)](./LICENSE)
[![Built with Base UI](https://img.shields.io/badge/built%20with-Base%20UI-orange?color=%23E95420&labelColor=%231a1a2e&style=flat-square)](https://base-ui.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-native-3178C6?labelColor=%231a1a2e&style=flat-square)](https://www.typescriptlang.org)

[Website](https://gnome-react-ui.vercel.app) · [Documentation](https://gnome-react-ui.vercel.app/docs) · [Report a bug](https://github.com/your-org/gnome-react-ui/issues)

</div>

<img src="./image.png" alt="GnomeUI"  />
---

## What is GnomeUI?

GnomeUI is a component library for React that brings the aesthetics and principles of the [GNOME Human Interface Guidelines](https://developer.gnome.org/hig/) to the web. It is built on top of [Base UI](https://base-ui.com) primitives and styled with Tailwind CSS using the Ubuntu/Yaru color system — Ubuntu Orange as the primary accent, aubergine for dark surfaces, and a clean off-white for light mode.

Components are **not installed as a black-box package** — they are copied directly into your project so you own every line of code.

---
## Roadmap Page

- [] Page Blocks
- [] Page Themes
- [] Card component
- [] Badge component
- [] RTL support

## Features

- **GNOME aesthetics** — follows the GNOME Human Interface Guidelines for a native, consistent look.
- **Modular architecture** — built on Base UI primitives, giving you full control over behavior and accessibility.
- **Accessible by default** — adheres to WAI-ARIA standards for a seamless experience for everyone.
- **TypeScript native** — strictly typed components for a robust and safe development experience.
- **Tailwind CSS** — styled with utility classes and CSS custom properties; easy to customize.
- **Dark mode** — light and dark themes out of the box using OKLCH color tokens.
- **Zero lock-in** — copy the source, own it, change it. No opaque dependencies.

---

## Quick Start

### 1. Initialize your project

```bash
npx gnome-ui@latest init
```

This sets up the required Tailwind config, CSS tokens, and project structure.

### 2. Add components

```bash
npx gnome-ui@latest add button card dialog
```

Components are copied directly into your `components/` directory.

### 3. Use them

```tsx
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';

export function MyPage() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Hello, GNOME</Dialog.Title>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

---

## Requirements

| Dependency | Version |
|---|---|
| React | ≥ 18 |
| Next.js | ≥ 14 (App Router) |
| Tailwind CSS | ≥ 3.4 |
| TypeScript | ≥ 5 (recommended) |

---

## Available Components

| Component | Description |
|---|---|
| **Accordion** | Expandable sections with animated panels |
| **Alert Dialog** | Blocking confirmation dialogs |
| **Autocomplete** | Searchable input with suggestion popups |
| **Avatar** | User image with initials / icon fallback |
| **Button** | Versatile button with loading and disabled states |
| **Checkbox** | Single and grouped checkbox controls |
| **Collapsible** | Animated show/hide panel |
| **Dialog** | Modal and non-modal popup windows |
| **Drawer** | Slide-in panel with snap points and swipe support |
| **Field** | Form field with label, control, and error |
| **Form** | Native form with consolidated validation and error handling |
| **Input** | Styled text input |
| **Menu** | Dropdown and context menus |
| **Menubar** | Application-style menu bar |
| **Meter** | Visual gauge for scalar values |
| **Navigation Menu** | Full navigation bar with dropdowns |
| **Number Field** | Numeric input with increment / decrement |
| **Popover** | Contextual floating panel |
| **Preview Card** | Hover card with rich content preview |
| **Progress** | Linear and indeterminate progress bars |
| **Radio** | Single-select radio group |
| **Scroll Area** | Custom-styled scrollable container |
| **Select** | Native-feeling dropdown selector |
| **Separator** | Visual divider |
| **Slider** | Range and single-value sliders |
| **Switch** | Toggle on/off control |
| **Tabs** | Tabbed navigation with animated indicator |
| **Toast** | Unobtrusive notification system |
| **Toggle** | Stateful icon button |
| **Toggle Group** | Exclusive or multi-select toggle set |
| **Toolbar** | Grouped action button bar |
| **Tooltip** | Hover/focus hint with arrow and rich variant |

---

## Theming

GnomeUI uses CSS custom properties in OKLCH color space. The defaults follow the Ubuntu/Yaru palette:

```css
/* app.css or globals.css */
:root {
  --primary:            oklch(0.61 0.18 35);   /* Ubuntu Orange */
  --primary-foreground: oklch(1.00 0.00 0);
  --background:         oklch(0.99 0.00 0);
  --foreground:         oklch(0.18 0.02 330);
  --card:               oklch(0.98 0.00 0);
  --border:             oklch(0.90 0.01 330);
  --ring:               oklch(0.61 0.18 35);
  --muted:              oklch(0.95 0.005 330);
  --muted-foreground:   oklch(0.55 0.015 330);
  --accent:             oklch(0.95 0.005 330);
  --destructive:        oklch(0.55 0.20 25);
}

.dark {
  --background:  oklch(0.20 0.02 330);   /* Aubergine */
  --foreground:  oklch(0.95 0.01 330);
  --card:        oklch(0.24 0.02 330);
  --border:      oklch(0.30 0.02 330);
}
```

Override any token in your own CSS to customize the entire library at once.

---

## Design principles

GnomeUI follows the same design language as the GNOME desktop:

- **Clarity** — every element serves a purpose. No decoration for its own sake.
- **Consistency** — uniform spacing (`0.5rem` radius base), transition durations (`150–250ms`), and focus rings.
- **Accessibility** — keyboard navigation, focus-visible outlines, ARIA roles, and `data-*` state attributes on every component.
- **Ubuntu Orange** — `oklch(0.61 0.18 35)` as the single accent color for CTAs, focus rings, and active states.

---

## License

MIT © GnomeUI contributors. Built by the community, open source.