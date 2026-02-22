"use client";
import { ComponentProps, ReactNode, useState } from "react";
import {
  Accordion,
  AlertDialog,
  Avatar,
  Button,
  Checkbox,
  CheckboxGroup,
  Collapsible,
  Combobox,
  ContextMenu,
  Dialog,
  DrawerPreview as Drawer,
  Field,
  Fieldset,
  Form,
  Input,
  Menu,
  Meter,
  NavigationMenu,
  NumberField,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  Select,
  Separator,
  Slider,
  Switch,
  Tabs,
  Toast,
  Toggle,
  ToggleGroup,
  Toolbar,
  Tooltip,
} from "@/app/components/";

// ─── Toast manager ──────────────────────────────────────────────────────────
const toastManager = Toast.createToastManager();

// ─── Toast inner components (must be inside Toast.Provider) ─────────────────
function ToastTrigger() {
  const { add } = Toast.useToastManager();
  return (
    <button
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
      onClick={() =>
        add({
          title: "Success!",
          description: "Your changes have been saved.",
        })
      }
    >
      Show toast
    </button>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return (
    <>
      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          toast={toast}
          className="bg-card text-card-foreground border border-border rounded-xl shadow-xl p-4 flex items-start gap-3 animate-in slide-in-from-right-4 fade-in duration-300"
        >
          <div className="flex-1">
            <Toast.Title className="text-sm font-semibold" />
            <Toast.Description className="text-xs text-muted-foreground" />
          </div>
          <Toast.Close
            render={
              <button className="text-muted-foreground hover:text-foreground text-lg leading-none transition-colors duration-150">
                ×
              </button>
            }
          />
        </Toast.Root>
      ))}
    </>
  );
}

// ─── Helper ────────────────────────────────────────────────────────────────
function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4 text-foreground border-b border-border pb-2">
        {title}
      </h2>
      <div className="flex flex-wrap gap-4 items-start">{children}</div>
    </section>
  );
}
function PlusIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
      {" "}
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />{" "}
    </svg>
  );
}
export default function Page() {
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [sliderValue, setSliderValue] = useState([40]);
  const [activeTab, setActiveTab] = useState<string | null>("tab1");
  const [toggleActive, setToggleActive] = useState(false);
  const [toggleGroupValue, setToggleGroupValue] = useState<string[]>([]);
  const [comboboxValue, setComboboxValue] = useState<string | null>(null);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [numberValue, setNumberValue] = useState(0);
  const [radioValue, setRadioValue] = useState<string | null>(null);

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-10 text-foreground">
        Component Gallery
      </h1>

      {/* ── ACCORDION ─────────────────────────────────────────────────── */}
      <Section title="Accordion">
        <Accordion.Root className="w-full max-w-sm border border-border rounded-lg overflow-hidden" multiple>
          {["Item one", "Item two", "Item three"].map((label, i) => (
            <Accordion.Item key={i} value={`item${i + 1}`}>
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex justify-between px-4 py-3 text-left font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-150">
                  {label}
                  <span>+</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="px-4 py-3 text-sm text-muted-foreground border-t border-border animate-in slide-in-from-top-1 fade-in duration-200">
                Content for {label.toLowerCase()}.
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
        <Accordion.Root className="flex w-96 max-w-[calc(100vw-8rem)] flex-col justify-center text-gray-900">
          {" "}
          <Accordion.Item className="border-b border-gray-200">
            {" "}
            <Accordion.Header>
              {" "}
              <Accordion.Trigger className="group relative flex w-full items-baseline justify-between gap-4 bg-gray-50 py-2 pr-1 pl-3 text-left font-medium hover:bg-gray-100 focus-visible:z-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800">
                {" "}
                What is Base UI?{" "}
                <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45" />{" "}
              </Accordion.Trigger>{" "}
            </Accordion.Header>{" "}
            <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-base text-gray-600 transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
              {" "}
              <div className="p-3">
                {" "}
                Base UI is a library of high-quality unstyled React components
                for design systems and web apps.{" "}
              </div>{" "}
            </Accordion.Panel>{" "}
          </Accordion.Item>
          <Accordion.Item className="border-b border-gray-200">
            {" "}
            <Accordion.Header>
              {" "}
              <Accordion.Trigger className="group relative flex w-full items-baseline justify-between gap-4 bg-gray-50 py-2 pr-1 pl-3 text-left font-medium hover:bg-gray-100 focus-visible:z-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800">
                {" "}
                How do I get started?{" "}
                <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45" />{" "}
              </Accordion.Trigger>{" "}
            </Accordion.Header>{" "}
            <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-base text-gray-600 transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
              {" "}
              <div className="p-3">
                {" "}
                Head to the “Quick start” guide in the docs. If you’ve used
                unstyled libraries before, you’ll feel at home.{" "}
              </div>{" "}
            </Accordion.Panel>{" "}
          </Accordion.Item>
          <Accordion.Item className="border-b border-gray-200">
            {" "}
            <Accordion.Header>
              {" "}
              <Accordion.Trigger className="group relative flex w-full items-baseline justify-between gap-4 bg-gray-50 py-2 pr-1 pl-3 text-left font-medium hover:bg-gray-100 focus-visible:z-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800">
                {" "}
                Can I use it for my project?{" "}
                <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45" />{" "}
              </Accordion.Trigger>{" "}
            </Accordion.Header>{" "}
            <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-base text-gray-600 transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
              {" "}
              <div className="p-3">
                Of course! Base UI is free and open source.
              </div>{" "}
            </Accordion.Panel>{" "}
          </Accordion.Item>{" "}
        </Accordion.Root>
      </Section>

      {/* ── ALERT DIALOG ─────────────────────────────────────────────── */}
      <Section title="Alert Dialog">
        <AlertDialog.Root>
          <AlertDialog.Trigger
            render={
              <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors duration-200">
                Delete account
              </button>
            }
          />
          <AlertDialog.Portal>
            <AlertDialog.Backdrop className="fixed inset-0 bg-foreground/40 animate-in fade-in duration-200" />
            <AlertDialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card text-card-foreground rounded-lg shadow-xl p-6 w-80 animate-in fade-in zoom-in-95 duration-200">
              <AlertDialog.Title className="text-lg font-semibold mb-2">
                Are you sure?
              </AlertDialog.Title>
              <AlertDialog.Description className="text-sm text-muted-foreground mb-4">
                This action cannot be undone.
              </AlertDialog.Description>
              <div className="flex gap-2 justify-end">
                <AlertDialog.Close
                  render={
                    <button className="px-3 py-1.5 border border-border rounded-md text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-150">
                      Cancel
                    </button>
                  }
                />
                <AlertDialog.Close
                  render={
                    <button className="px-3 py-1.5 bg-destructive text-destructive-foreground rounded-md text-sm hover:bg-destructive/90 transition-colors duration-150">
                      Delete
                    </button>
                  }
                />
              </div>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </Section>

      {/* ── AVATAR ───────────────────────────────────────────────────── */}
      <Section title="Avatar">
        <Avatar.Root className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center ring-2 ring-border">
          <Avatar.Image
            src="https://i.pravatar.cc/48"
            alt="User"
            className="w-full h-full object-cover"
          />
          <Avatar.Fallback className="text-muted-foreground text-sm font-medium">
            JD
          </Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root className="w-12 h-12 rounded-full overflow-hidden bg-secondary flex items-center justify-center ring-2 ring-border">
          <Avatar.Image src="/broken.jpg" alt="Broken" />
          <Avatar.Fallback className="text-secondary-foreground text-sm font-medium">
            AB
          </Avatar.Fallback>
        </Avatar.Root>
      </Section>

      {/* ── BUTTON ───────────────────────────────────────────────────── */}
      <Section title="Button">
        <Button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-200 disabled:opacity-50">
          Primary
        </Button>
        <Button className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200">
          Secondary
        </Button>
        <Button
          disabled
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md opacity-50 cursor-not-allowed"
        >
          Disabled
        </Button>
      </Section>

      {/* ── CHECKBOX ─────────────────────────────────────────────────── */}
      <Section title="Checkbox">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <Checkbox.Root
            checked={checked}
            onCheckedChange={setChecked}
            className="w-5 h-5 border-2 border-input rounded flex items-center justify-center transition-colors duration-150 data-checked:bg-primary data-checked:border-primary"
          >
            <Checkbox.Indicator className="text-primary-foreground text-xs animate-in zoom-in-75 duration-150">
              ✓
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className="text-sm text-foreground">Accept terms</span>
        </label>
      </Section>

      {/* ── CHECKBOX GROUP ───────────────────────────────────────────── */}
      <Section title="Checkbox Group">
        <CheckboxGroup defaultValue={["react"]} className="flex flex-col gap-2">
          {["react", "vue", "svelte"].map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox.Root
                name={item}
                className="w-5 h-5 border-2 border-input rounded flex items-center justify-center transition-colors duration-150 data-checked:bg-primary data-checked:border-primary"
              >
                <Checkbox.Indicator className="text-primary-foreground text-xs animate-in zoom-in-75 duration-150">
                  ✓
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span className="text-sm text-foreground capitalize">{item}</span>
            </label>
          ))}
        </CheckboxGroup>
      </Section>

      {/* ── COLLAPSIBLE ──────────────────────────────────────────────── */}
      <Section title="Collapsible">
        <Collapsible.Root className="w-full max-w-sm border border-border rounded-lg">
          <Collapsible.Trigger className="w-full flex justify-between px-4 py-3 font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-150">
            Toggle details <span>▾</span>
          </Collapsible.Trigger>
          <Collapsible.Panel className="px-4 py-3 text-sm text-muted-foreground border-t border-border animate-in slide-in-from-top-2 fade-in duration-200">
            Hidden details revealed when toggled.
          </Collapsible.Panel>
        </Collapsible.Root>
      </Section>

      {/* ── COMBOBOX ─────────────────────────────────────────────────── */}
      <Section title="Combobox">
        <div className="relative w-56">
          <Combobox.Root value={comboboxValue} onValueChange={setComboboxValue}>
            <Combobox.Input
              placeholder="Search fruit…"
              className="w-full border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150 placeholder:text-muted-foreground"
            />
            <Combobox.Portal>
              <Combobox.Positioner sideOffset={4}>
                <Combobox.Popup className="bg-popover text-popover-foreground border border-border rounded-lg shadow-md py-1 min-w-56 animate-in fade-in zoom-in-95 duration-150">
                  <Combobox.List>
                    {["Apple", "Banana", "Cherry", "Date", "Elderberry"].map(
                      (fruit) => (
                        <Combobox.Item
                          key={fruit}
                          value={fruit}
                          className="px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer data-highlighted:bg-accent data-highlighted:text-accent-foreground transition-colors duration-100"
                        >
                          {fruit}
                        </Combobox.Item>
                      ),
                    )}
                  </Combobox.List>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>
        </div>
      </Section>

      {/* ── CONTEXT MENU ─────────────────────────────────────────────── */}
      <Section title="Context Menu">
        <ContextMenu.Root>
          <ContextMenu.Trigger
            render={
              <div className="border-2 border-dashed border-border rounded-lg px-10 py-6 text-sm text-muted-foreground cursor-context-menu select-none hover:bg-accent transition-colors duration-150">
                Right-click here
              </div>
            }
          />
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup className="bg-popover text-popover-foreground border border-border rounded-lg shadow-xl py-1 min-w-40 animate-in fade-in zoom-in-95 duration-150">
                <Menu.Item className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-100">
                  Open
                </Menu.Item>
                <Menu.Item className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-100">
                  Copy link
                </Menu.Item>
                <Menu.Separator className="my-1 border-t border-border" />
                <Menu.Item className="px-4 py-2 text-sm text-destructive hover:bg-accent cursor-pointer transition-colors duration-100">
                  Delete
                </Menu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      </Section>

      {/* ── DIALOG ───────────────────────────────────────────────────── */}
      <Section title="Dialog">
        <Dialog.Root>
          <Dialog.Trigger
            render={
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
                Open dialog
              </button>
            }
          />
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 bg-foreground/40 animate-in fade-in duration-200" />
            <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card text-card-foreground rounded-xl shadow-2xl p-6 w-80 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-200">
              <Dialog.Title className="text-lg font-semibold mb-1">
                Edit profile
              </Dialog.Title>
              <Dialog.Description className="text-sm text-muted-foreground mb-4">
                Make changes to your profile.
              </Dialog.Description>
              <Input
                placeholder="Display name"
                className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
              />
              <div className="flex justify-end gap-2">
                <Dialog.Close
                  render={
                    <button className="px-3 py-1.5 border border-border rounded-md text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-150">
                      Cancel
                    </button>
                  }
                />
                <Dialog.Close
                  render={
                    <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors duration-150">
                      Save
                    </button>
                  }
                />
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </Section>

      {/* ── DRAWER ───────────────────────────────────────────────────── */}
      <Section title="Drawer">
        <Drawer.Root>
          <Drawer.Trigger
            render={
              <button className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                Open drawer
              </button>
            }
          />
          <Drawer.Portal>
            <Drawer.Backdrop className="fixed inset-0 bg-foreground/40 animate-in fade-in duration-200" />
            <Drawer.Popup className="fixed bottom-0 left-0 right-0 bg-card text-card-foreground rounded-t-2xl shadow-2xl p-6 max-h-[80vh] animate-in slide-in-from-bottom duration-300">
              <Drawer.Title className="text-lg font-semibold mb-2">
                Drawer
              </Drawer.Title>
              <Drawer.Description className="text-sm text-muted-foreground mb-4">
                Drag down or click outside to dismiss.
              </Drawer.Description>
              <Drawer.Close
                render={
                  <button className="px-4 py-2 border border-border rounded-md text-sm text-foreground hover:bg-accent transition-colors duration-150">
                    Close
                  </button>
                }
              />
            </Drawer.Popup>
          </Drawer.Portal>
        </Drawer.Root>
        <Drawer.Root>
          {" "}
          <Drawer.Trigger className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
            {" "}
            Open bottom drawer{" "}
          </Drawer.Trigger>{" "}
          <Drawer.Portal>
            {" "}
            <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:duration-0 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute" />{" "}
            <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
              {" "}
              <Drawer.Popup className="-mb-[3rem] w-full max-h-[calc(80vh+3rem)] rounded-t-2xl bg-gray-50 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+3rem)] pt-4 text-gray-900 outline outline-1 outline-gray-200 overflow-y-auto overscroll-contain touch-auto [transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:select-none data-[ending-style]:[transform:translateY(calc(100%-3rem))] data-[starting-style]:[transform:translateY(calc(100%-3rem))] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] dark:outline-gray-300">
                {" "}
                <div className="w-12 h-1 mx-auto mb-4 rounded-full bg-gray-300" />{" "}
                <Drawer.Content className="mx-auto w-full max-w-[32rem]">
                  {" "}
                  <Drawer.Title className="mb-1 text-lg font-medium text-center">
                    {" "}
                    Notifications{" "}
                  </Drawer.Title>{" "}
                  <Drawer.Description className="mb-6 text-base text-gray-600 text-center">
                    {" "}
                    You are all caught up. Good job!{" "}
                  </Drawer.Description>{" "}
                  <div className="flex justify-center gap-4">
                    {" "}
                    <Drawer.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                      {" "}
                      Close{" "}
                    </Drawer.Close>{" "}
                  </div>{" "}
                </Drawer.Content>{" "}
              </Drawer.Popup>{" "}
            </Drawer.Viewport>{" "}
          </Drawer.Portal>{" "}
        </Drawer.Root>
      </Section>

      {/* ── FIELD ────────────────────────────────────────────────────── */}
      <Section title="Field">
        <Field.Root className="flex flex-col gap-1 w-56">
          <Field.Label className="text-sm font-medium text-foreground">
            Email
          </Field.Label>
          <Field.Control
            render={
              <input
                type="email"
                placeholder="you@example.com"
                className="border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150 placeholder:text-muted-foreground"
              />
            }
          />
          <Field.Description className="text-xs text-muted-foreground">
            We&apos;ll never share your email.
          </Field.Description>
        </Field.Root>
      </Section>

      {/* ── FIELDSET ─────────────────────────────────────────────────── */}
      <Section title="Fieldset">
        <Fieldset.Root className="border border-border rounded-lg p-4 w-56">
          <Fieldset.Legend className="text-sm font-semibold px-1 text-foreground">
            Personal info
          </Fieldset.Legend>
          <div className="flex flex-col gap-2 mt-2">
            <Input
              placeholder="First name"
              className="border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150 placeholder:text-muted-foreground"
            />
            <Input
              placeholder="Last name"
              className="border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150 placeholder:text-muted-foreground"
            />
          </div>
        </Fieldset.Root>
      </Section>

      {/* ── FORM ─────────────────────────────────────────────────────── */}
      <Section title="Form">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form submitted!");
          }}
          className="flex flex-col gap-3 w-56"
        >
          <Input
            name="username"
            placeholder="Username"
            required
            className="border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150 placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors duration-200"
          >
            Submit
          </Button>
        </Form>
      </Section>

      {/* ── INPUT ────────────────────────────────────────────────────── */}
      <Section title="Input">
        <Input
          placeholder="Default input"
          className="border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150 placeholder:text-muted-foreground"
        />
        <Input
          disabled
          placeholder="Disabled input"
          className="border border-input bg-muted text-muted-foreground rounded-md px-3 py-2 text-sm w-48 opacity-50 cursor-not-allowed"
        />
      </Section>

      {/* ── MENU ─────────────────────────────────────────────────────── */}
      <Section title="Menu">
        <Menu.Root>
          <Menu.Trigger
            render={
              <button className="px-4 py-2 border border-border rounded-md text-foreground flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                Options <span>▾</span>
              </button>
            }
          />
          <Menu.Portal>
            <Menu.Positioner sideOffset={4}>
              <Menu.Popup className="bg-popover text-popover-foreground border border-border rounded-lg shadow-xl py-1 min-w-40 animate-in fade-in zoom-in-95 duration-150">
                <Menu.Item className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-100">
                  Profile
                </Menu.Item>
                <Menu.Item className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-100">
                  Settings
                </Menu.Item>
                <Menu.Separator className="my-1 border-t border-border" />
                <Menu.Item className="px-4 py-2 text-sm text-destructive hover:bg-accent cursor-pointer transition-colors duration-100">
                  Sign out
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </Section>

      {/* ── METER ────────────────────────────────────────────────────── */}
      <Section title="Meter">
        <div className="flex flex-col gap-3 w-64">
          {[25, 60, 90].map((val) => (
            <Meter.Root key={val} value={val} className="flex flex-col gap-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <Meter.Label>Usage</Meter.Label>
                <Meter.Value>{(formatted) => `${formatted}`}</Meter.Value>
              </div>
              <Meter.Track className="h-2 bg-muted rounded-full overflow-hidden">
                <Meter.Indicator
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${val}%` }}
                />
              </Meter.Track>
            </Meter.Root>
          ))}
        </div>
      </Section>

      {/* ── NAVIGATION MENU ──────────────────────────────────────────── */}
      <Section title="Navigation Menu">
        <NavigationMenu.Root className="relative">
          <NavigationMenu.List className="flex gap-1 list-none p-1 rounded-lg bg-muted border border-border">
            {["Home", "About", "Blog"].map((label) => (
              <NavigationMenu.Item key={label}>
                <NavigationMenu.Link
                  href="#"
                  className="block px-3 py-2 text-sm text-foreground rounded-md hover:bg-background hover:shadow-sm transition-all duration-150"
                >
                  {label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="px-3 py-2 text-sm text-foreground rounded-md flex items-center gap-1 hover:bg-background hover:shadow-sm transition-all duration-150">
                More <span>▾</span>
              </NavigationMenu.Trigger>
              <NavigationMenu.Portal>
                <NavigationMenu.Positioner>
                  <NavigationMenu.Content className="bg-popover text-popover-foreground border border-border rounded-lg shadow-xl p-4 w-48 animate-in fade-in zoom-in-95 duration-150">
                    <ul className="flex flex-col gap-1 text-sm">
                      <li>
                        <a
                          href="#"
                          className="text-foreground hover:text-primary transition-colors duration-150"
                        >
                          Careers
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-foreground hover:text-primary transition-colors duration-150"
                        >
                          Press
                        </a>
                      </li>
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Positioner>
              </NavigationMenu.Portal>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </Section>

      {/* ── NUMBER FIELD ─────────────────────────────────────────────── */}
      <Section title="Number Field">
        <NumberField.Root
          value={numberValue}
          onValueChange={setNumberValue}
          className="flex flex-col gap-1"
        >
          <NumberField.Group className="flex border border-input rounded-md overflow-hidden">
            <NumberField.Decrement className="px-3 py-2 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground text-lg select-none cursor-pointer transition-colors duration-150">
              −
            </NumberField.Decrement>
            <NumberField.Input className="w-16 text-center text-sm py-2 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150" />
            <NumberField.Increment className="px-3 py-2 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground text-lg select-none cursor-pointer transition-colors duration-150">
              +
            </NumberField.Increment>
          </NumberField.Group>
        </NumberField.Root>
      </Section>

      {/* ── POPOVER ──────────────────────────────────────────────────── */}
      <Section title="Popover">
        <Popover.Root>
          <Popover.Trigger
            render={
              <button className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                More info
              </button>
            }
          />
          <Popover.Portal>
            <Popover.Positioner sideOffset={8}>
              <Popover.Popup className="bg-popover text-popover-foreground border border-border rounded-xl shadow-xl p-4 w-56 animate-in fade-in zoom-in-95 duration-150">
                <Popover.Title className="font-semibold text-sm mb-1">
                  Popover title
                </Popover.Title>
                <Popover.Description className="text-xs text-muted-foreground">
                  This is a popover with additional information.
                </Popover.Description>
                <Popover.Arrow className="fill-popover" />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </Section>

      {/* ── PROGRESS ─────────────────────────────────────────────────── */}
      <Section title="Progress">
        <div className="flex flex-col gap-3 w-64">
          {[30, 65, 100].map((val) => (
            <Progress.Root
              key={val}
              value={val}
              className="flex flex-col gap-1"
            >
              <div className="flex justify-between text-xs text-muted-foreground">
                <Progress.Label>Loading</Progress.Label>
                <Progress.Value>{(formatted) => `${formatted}`}</Progress.Value>
              </div>
              <Progress.Track className="h-2 bg-muted rounded-full overflow-hidden">
                <Progress.Indicator
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${val}%` }}
                />
              </Progress.Track>
            </Progress.Root>
          ))}
        </div>
      </Section>

      {/* ── RADIO / RADIO GROUP ──────────────────────────────────────── */}
      <Section title="Radio / Radio Group">
        <RadioGroup
          value={radioValue}
          onValueChange={setRadioValue}
          className="flex flex-col gap-2"
        >
          {["Small", "Medium", "Large"].map((size) => (
            <label
              key={size}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Radio.Root
                value={size.toLowerCase()}
                className="w-5 h-5 rounded-full border-2 border-input flex items-center justify-center transition-colors duration-150 data-checked:border-primary"
              >
                <Radio.Indicator className="w-2.5 h-2.5 rounded-full bg-primary hidden data-checked:block animate-in zoom-in-75 duration-150" />
              </Radio.Root>
              <span className="text-sm text-foreground">{size}</span>
            </label>
          ))}
        </RadioGroup>
      </Section>

      {/* ── SCROLL AREA ──────────────────────────────────────────────── */}
      <Section title="Scroll Area">
        <ScrollArea.Root className="h-32 w-48 border border-border rounded-lg">
          <ScrollArea.Viewport className="h-full w-full p-3 overflow-hidden">
            <ScrollArea.Content>
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} className="text-sm text-muted-foreground py-0.5">
                  List item {i + 1}
                </p>
              ))}
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="flex w-2 p-0.5"
          >
            <ScrollArea.Thumb className="flex-1 bg-border rounded-full hover:bg-muted-foreground transition-colors duration-150" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Section>

      {/* ── SELECT ───────────────────────────────────────────────────── */}
      <Section title="Select">
        <Select.Root value={selectValue} onValueChange={setSelectValue}>
          <Select.Trigger className="flex items-center justify-between border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm w-48 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-150">
            <Select.Value placeholder="Select a color…" />
            <Select.Icon className="text-muted-foreground">▾</Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner sideOffset={4}>
              <Select.Popup className="bg-popover text-popover-foreground border border-border rounded-lg shadow-xl py-1 min-w-48 animate-in fade-in zoom-in-95 duration-150">
                <Select.List>
                  {["Red", "Green", "Blue", "Yellow"].map((color) => (
                    <Select.Item
                      key={color}
                      value={color.toLowerCase()}
                      className="px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center gap-2 data-highlighted:bg-accent data-highlighted:text-accent-foreground transition-colors duration-100"
                    >
                      <Select.ItemText>{color}</Select.ItemText>
                      <Select.ItemIndicator className="ml-auto text-primary">
                        ✓
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.List>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      </Section>

      {/* ── SEPARATOR ────────────────────────────────────────────────── */}
      <Section title="Separator">
        <div className="w-64 flex flex-col gap-3 text-sm text-muted-foreground">
          <span>Above the separator</span>
          <Separator className="border-t border-border" />
          <span>Below the separator</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground h-10">
          <span>Left</span>
          <Separator
            orientation="vertical"
            className="h-full border-l border-border"
          />
          <span>Right</span>
        </div>
      </Section>

      {/* ── SLIDER ───────────────────────────────────────────────────── */}
      <Section title="Slider">
        <Slider.Root
          value={sliderValue}
          onValueChange={setSliderValue}
          min={0}
          max={100}
          className="w-64 flex flex-col gap-1"
        >
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Volume</span>
            <span>{sliderValue[0]}</span>
          </div>
          <Slider.Control className="relative flex items-center h-5">
            <Slider.Track className="h-2 w-full bg-muted rounded-full">
              <Slider.Indicator className="h-full bg-primary rounded-full" />
            </Slider.Track>
            <Slider.Thumb
              index={0}
              className="absolute w-5 h-5 bg-background border-2 border-primary rounded-full shadow focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
            />
          </Slider.Control>
        </Slider.Root>
      </Section>

      {/* ── SWITCH ───────────────────────────────────────────────────── */}
      <Section title="Switch">
        <label className="flex items-center gap-3 cursor-pointer">
          <Switch.Root
            checked={switchOn}
            onCheckedChange={setSwitchOn}
            className="relative w-11 h-6 rounded-full transition-colors duration-200 bg-input data-checked:bg-primary"
          >
            <Switch.Thumb className="absolute top-0.5 left-0.5 w-5 h-5 bg-background rounded-full shadow transition-transform duration-200 data-checked:translate-x-5" />
          </Switch.Root>
          <span className="text-sm text-foreground">
            {switchOn ? "On" : "Off"}
          </span>
        </label>
      </Section>

      {/* ── TABS ─────────────────────────────────────────────────────── */}
      <Section title="Tabs">
        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-sm"
        >
          <Tabs.List className="flex border-b border-border">
            {["tab1", "tab2", "tab3"].map((id, i) => (
              <Tabs.Tab
                key={id}
                value={id}
                className="px-4 py-2 text-sm font-medium text-muted-foreground border-b-2 border-transparent transition-colors duration-150 hover:text-foreground data-selected:border-primary data-selected:text-foreground"
              >
                Tab {i + 1}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {["tab1", "tab2", "tab3"].map((id, i) => (
            <Tabs.Panel
              key={id}
              value={id}
              className="py-4 text-sm text-muted-foreground animate-in fade-in duration-200"
            >
              Content for Tab {i + 1}.
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </Section>

      {/* ── TOAST ────────────────────────────────────────────────────── */}
      <Section title="Toast">
        <Toast.Provider toastManager={toastManager}>
          <ToastTrigger />
          <Toast.Portal>
            <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-72 z-50">
              <ToastList />
            </Toast.Viewport>
          </Toast.Portal>
        </Toast.Provider>
      </Section>

      {/* ── TOGGLE ───────────────────────────────────────────────────── */}
      <Section title="Toggle">
        <Toggle
          pressed={toggleActive}
          onPressedChange={setToggleActive}
          className="px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground transition-all duration-150 hover:bg-accent hover:text-accent-foreground data-pressed:bg-primary data-pressed:text-primary-foreground data-pressed:border-primary"
        >
          Bold
        </Toggle>
      </Section>

      {/* ── TOGGLE GROUP ─────────────────────────────────────────────── */}
      <Section title="Toggle Group">
        <ToggleGroup
          value={toggleGroupValue}
          onValueChange={setToggleGroupValue}
          multiple
          className="flex border border-border rounded-md overflow-hidden"
        >
          {["Left", "Center", "Right"].map((align) => (
            <Toggle
              key={align}
              value={align.toLowerCase()}
              className="px-4 py-2 text-sm font-medium text-foreground border-r border-border last:border-r-0 hover:bg-accent hover:text-accent-foreground transition-colors duration-150 data-pressed:bg-primary data-pressed:text-primary-foreground"
            >
              {align}
            </Toggle>
          ))}
        </ToggleGroup>
      </Section>

      {/* ── TOOLBAR ──────────────────────────────────────────────────── */}
      <Section title="Toolbar">
        <Toolbar.Root className="flex items-center gap-1 p-1 border border-border rounded-lg bg-muted">
          <Toolbar.Button className="px-3 py-1.5 text-sm text-foreground rounded-md hover:bg-background hover:shadow-sm transition-all duration-150 font-bold">
            B
          </Toolbar.Button>
          <Toolbar.Button className="px-3 py-1.5 text-sm text-foreground rounded-md hover:bg-background hover:shadow-sm transition-all duration-150 italic">
            I
          </Toolbar.Button>
          <Toolbar.Button className="px-3 py-1.5 text-sm text-foreground rounded-md hover:bg-background hover:shadow-sm transition-all duration-150 underline">
            U
          </Toolbar.Button>
          <Toolbar.Separator className="w-px h-5 bg-border mx-1" />
          <Toolbar.Button className="px-3 py-1.5 text-sm text-foreground rounded-md hover:bg-background hover:shadow-sm transition-all duration-150">
            Link
          </Toolbar.Button>
        </Toolbar.Root>
      </Section>

      {/* ── TOOLTIP ──────────────────────────────────────────────────── */}
      <Section title="Tooltip">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger
              render={
                <button className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                  Hover me
                </button>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={8}>
                <Tooltip.Popup className="bg-foreground text-background text-xs px-2 py-1 rounded-md shadow animate-in fade-in zoom-in-90 duration-150">
                  Helpful tooltip text
                  <Tooltip.Arrow className="fill-foreground" />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </Section>
    </main>
  );
}
