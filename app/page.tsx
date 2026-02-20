'use client';

import * as React from 'react';
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
} from './components';

// ─── Toast manager ──────────────────────────────────────────────────────────
const toastManager = Toast.createToastManager();

// ─── Toast inner components (must be inside Toast.Provider) ─────────────────
function ToastTrigger() {
  const { add } = Toast.useToastManager();
  return (
    <button
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      onClick={() =>
        add({
          title: 'Success!',
          description: 'Your changes have been saved.',
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
          className="bg-white border rounded-xl shadow-xl p-4 flex items-start gap-3"
        >
          <div className="flex-1">
            <Toast.Title className="text-sm font-semibold" />
            <Toast.Description className="text-xs text-gray-500" />
          </div>
          <Toast.Close
            render={
              <button className="text-gray-400 hover:text-gray-600 text-lg leading-none">
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
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
        {title}
      </h2>
      <div className="flex flex-wrap gap-4 items-start">{children}</div>
    </section>
  );
}

export default function Home() {
  const [checked, setChecked] = React.useState(false);
  const [switchOn, setSwitchOn] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState([40]);
  const [activeTab, setActiveTab] = React.useState<string | null>('tab1');
  const [toggleActive, setToggleActive] = React.useState(false);
  const [toggleGroupValue, setToggleGroupValue] = React.useState<string[]>([]);
  const [comboboxValue, setComboboxValue] = React.useState<string | null>(null);
  const [selectValue, setSelectValue] = React.useState<string | null>(null);
  const [numberValue, setNumberValue] = React.useState(0);
  const [radioValue, setRadioValue] = React.useState<string | null>(null);

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-10 text-gray-900">
        Component Gallery
      </h1>

      {/* ── ACCORDION ─────────────────────────────────────────────────── */}
      <Section title="Accordion">
        <Accordion.Root className="w-full max-w-sm border rounded-lg overflow-hidden">
          {['Item one', 'Item two', 'Item three'].map((label, i) => (
            <Accordion.Item key={i} value={`item${i + 1}`}>
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex justify-between px-4 py-3 text-left font-medium hover:bg-gray-50 transition-colors">
                  {label}
                  <span>+</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="px-4 py-3 text-sm text-gray-600 border-t">
                Content for {label.toLowerCase()}.
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Section>

      {/* ── ALERT DIALOG ─────────────────────────────────────────────── */}
      <Section title="Alert Dialog">
        <AlertDialog.Root>
          <AlertDialog.Trigger
            render={
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete account
              </button>
            }
          />
          <AlertDialog.Portal>
            <AlertDialog.Backdrop className="fixed inset-0 bg-black/40" />
            <AlertDialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-80">
              <AlertDialog.Title className="text-lg font-semibold mb-2">
                Are you sure?
              </AlertDialog.Title>
              <AlertDialog.Description className="text-sm text-gray-600 mb-4">
                This action cannot be undone.
              </AlertDialog.Description>
              <div className="flex gap-2 justify-end">
                <AlertDialog.Close
                  render={
                    <button className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100">
                      Cancel
                    </button>
                  }
                />
                <AlertDialog.Close
                  render={
                    <button className="px-3 py-1.5 bg-red-500 text-white rounded text-sm hover:bg-red-600">
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
        <Avatar.Root className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          <Avatar.Image
            src="https://i.pravatar.cc/48"
            alt="User"
            className="w-full h-full object-cover"
          />
          <Avatar.Fallback className="text-gray-500 text-sm font-medium">
            JD
          </Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root className="w-12 h-12 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
          <Avatar.Image src="/broken.jpg" alt="Broken" />
          <Avatar.Fallback className="text-indigo-600 text-sm font-medium">
            AB
          </Avatar.Fallback>
        </Avatar.Root>
      </Section>

      {/* ── BUTTON ───────────────────────────────────────────────────── */}
      <Section title="Button">
        <Button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50">
          Primary
        </Button>
        <Button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
          Secondary
        </Button>
        <Button
          disabled
          className="px-4 py-2 bg-indigo-600 text-white rounded opacity-50 cursor-not-allowed"
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
            className="w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center data-checked:bg-indigo-600 data-checked:border-indigo-600"
          >
            <Checkbox.Indicator className="text-white text-xs">✓</Checkbox.Indicator>
          </Checkbox.Root>
          <span className="text-sm">Accept terms</span>
        </label>
      </Section>

      {/* ── CHECKBOX GROUP ───────────────────────────────────────────── */}
      <Section title="Checkbox Group">
        <CheckboxGroup defaultValue={['react']} className="flex flex-col gap-2">
          {['react', 'vue', 'svelte'].map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer">
              <Checkbox.Root
                name={item}
                className="w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center data-checked:bg-indigo-600 data-checked:border-indigo-600"
              >
                <Checkbox.Indicator className="text-white text-xs">✓</Checkbox.Indicator>
              </Checkbox.Root>
              <span className="text-sm capitalize">{item}</span>
            </label>
          ))}
        </CheckboxGroup>
      </Section>

      {/* ── COLLAPSIBLE ──────────────────────────────────────────────── */}
      <Section title="Collapsible">
        <Collapsible.Root className="w-full max-w-sm border rounded-lg">
          <Collapsible.Trigger className="w-full flex justify-between px-4 py-3 font-medium hover:bg-gray-50">
            Toggle details <span>▾</span>
          </Collapsible.Trigger>
          <Collapsible.Panel className="px-4 py-3 text-sm text-gray-600 border-t">
            Hidden details revealed when toggled.
          </Collapsible.Panel>
        </Collapsible.Root>
      </Section>

      {/* ── COMBOBOX ─────────────────────────────────────────────────── */}
      <Section title="Combobox">
        <div className="relative w-56">
        <Combobox.Root
          value={comboboxValue}
          onValueChange={setComboboxValue}
        >
          <Combobox.Input
            placeholder="Search fruit…"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <Combobox.Portal>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup className="bg-white border rounded-lg shadow-md py-1 min-w-56">
                <Combobox.List>
                  {['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'].map(
                    (fruit) => (
                      <Combobox.Item
                        key={fruit}
                        value={fruit}
                        className="px-3 py-2 text-sm hover:bg-indigo-50 cursor-pointer data-highlighted:bg-indigo-50"
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg px-10 py-6 text-sm text-gray-500 cursor-context-menu select-none">
                Right-click here
              </div>
            }
          />
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup className="bg-white border rounded-lg shadow-xl py-1 min-w-40">
                <Menu.Item className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  Open
                </Menu.Item>
                <Menu.Item className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  Copy link
                </Menu.Item>
                <Menu.Separator className="my-1 border-t" />
                <Menu.Item className="px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer">
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
              <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Open dialog
              </button>
            }
          />
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 bg-black/40" />
            <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-80">
              <Dialog.Title className="text-lg font-semibold mb-1">
                Edit profile
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500 mb-4">
                Make changes to your profile.
              </Dialog.Description>
              <Input
                placeholder="Display name"
                className="w-full border rounded px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <div className="flex justify-end gap-2">
                <Dialog.Close
                  render={
                    <button className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100">
                      Cancel
                    </button>
                  }
                />
                <Dialog.Close
                  render={
                    <button className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
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
              <button className="px-4 py-2 border rounded hover:bg-gray-50">
                Open drawer
              </button>
            }
          />
          <Drawer.Portal>
            <Drawer.Backdrop className="fixed inset-0 bg-black/40" />
            <Drawer.Popup className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-6 max-h-[80vh]">
              <Drawer.Title className="text-lg font-semibold mb-2">
                Drawer
              </Drawer.Title>
              <Drawer.Description className="text-sm text-gray-500 mb-4">
                Drag down or click outside to dismiss.
              </Drawer.Description>
              <Drawer.Close
                render={
                  <button className="px-4 py-2 border rounded text-sm">
                    Close
                  </button>
                }
              />
            </Drawer.Popup>
          </Drawer.Portal>
        </Drawer.Root>
      </Section>

      {/* ── FIELD ────────────────────────────────────────────────────── */}
      <Section title="Field">
        <Field.Root className="flex flex-col gap-1 w-56">
          <Field.Label className="text-sm font-medium text-gray-700">
            Email
          </Field.Label>
          <Field.Control
            render={
              <input
                type="email"
                placeholder="you@example.com"
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            }
          />
          <Field.Description className="text-xs text-gray-500">
            We&apos;ll never share your email.
          </Field.Description>
        </Field.Root>
      </Section>

      {/* ── FIELDSET ─────────────────────────────────────────────────── */}
      <Section title="Fieldset">
        <Fieldset.Root className="border border-gray-300 rounded-lg p-4 w-56">
          <Fieldset.Legend className="text-sm font-semibold px-1 text-gray-700">
            Personal info
          </Fieldset.Legend>
          <div className="flex flex-col gap-2 mt-2">
            <Input
              placeholder="First name"
              className="border rounded px-3 py-2 text-sm"
            />
            <Input
              placeholder="Last name"
              className="border rounded px-3 py-2 text-sm"
            />
          </div>
        </Fieldset.Root>
      </Section>

      {/* ── FORM ─────────────────────────────────────────────────────── */}
      <Section title="Form">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Form submitted!');
          }}
          className="flex flex-col gap-3 w-56"
        >
          <Input
            name="username"
            placeholder="Username"
            required
            className="border rounded px-3 py-2 text-sm"
          />
          <Button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
          >
            Submit
          </Button>
        </Form>
      </Section>

      {/* ── INPUT ────────────────────────────────────────────────────── */}
      <Section title="Input">
        <Input
          placeholder="Default input"
          className="border border-gray-300 rounded px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <Input
          disabled
          placeholder="Disabled input"
          className="border border-gray-300 rounded px-3 py-2 text-sm w-48 opacity-50 cursor-not-allowed"
        />
      </Section>

      {/* ── MENU ─────────────────────────────────────────────────────── */}
      <Section title="Menu">
        <Menu.Root>
          <Menu.Trigger
            render={
              <button className="px-4 py-2 border rounded flex items-center gap-2 hover:bg-gray-50">
                Options <span>▾</span>
              </button>
            }
          />
          <Menu.Portal>
            <Menu.Positioner sideOffset={4}>
              <Menu.Popup className="bg-white border rounded-lg shadow-xl py-1 min-w-40">
                <Menu.Item className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  Profile
                </Menu.Item>
                <Menu.Item className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  Settings
                </Menu.Item>
                <Menu.Separator className="my-1 border-t" />
                <Menu.Item className="px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer">
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
              <div className="flex justify-between text-xs text-gray-600">
                <Meter.Label>Usage</Meter.Label>
                <Meter.Value>{(formatted) => `${formatted}`}</Meter.Value>
              </div>
              <Meter.Track className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <Meter.Indicator
                  className="h-full bg-indigo-500 rounded-full"
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
          <NavigationMenu.List className="flex gap-1 list-none p-1 rounded-lg bg-gray-50 border">
            {['Home', 'About', 'Blog'].map((label) => (
              <NavigationMenu.Item key={label}>
                <NavigationMenu.Link
                  href="#"
                  className="block px-3 py-2 text-sm rounded hover:bg-white hover:shadow-sm transition-all"
                >
                  {label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="px-3 py-2 text-sm rounded flex items-center gap-1 hover:bg-white hover:shadow-sm">
                More <span>▾</span>
              </NavigationMenu.Trigger>
              <NavigationMenu.Portal>
                <NavigationMenu.Positioner>
                  <NavigationMenu.Content className="bg-white border rounded-lg shadow-xl p-4 w-48">
                    <ul className="flex flex-col gap-1 text-sm">
                      <li>
                        <a href="#" className="hover:text-indigo-600">
                          Careers
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-indigo-600">
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
          <NumberField.Group className="flex border border-gray-300 rounded overflow-hidden">
            <NumberField.Decrement className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-lg select-none cursor-pointer">
              −
            </NumberField.Decrement>
            <NumberField.Input className="w-16 text-center text-sm py-2 focus:outline-none" />
            <NumberField.Increment className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-lg select-none cursor-pointer">
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
              <button className="px-4 py-2 border rounded hover:bg-gray-50">
                More info
              </button>
            }
          />
          <Popover.Portal>
            <Popover.Positioner sideOffset={8}>
              <Popover.Popup className="bg-white border rounded-xl shadow-xl p-4 w-56">
                <Popover.Title className="font-semibold text-sm mb-1">
                  Popover title
                </Popover.Title>
                <Popover.Description className="text-xs text-gray-500">
                  This is a popover with additional information.
                </Popover.Description>
                <Popover.Arrow className="fill-white" />
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
              <div className="flex justify-between text-xs text-gray-600">
                <Progress.Label>Loading</Progress.Label>
                <Progress.Value>{(formatted) => `${formatted}`}</Progress.Value>
              </div>
              <Progress.Track className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <Progress.Indicator
                  className="h-full bg-indigo-500 rounded-full transition-all"
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
          {['Small', 'Medium', 'Large'].map((size) => (
            <label
              key={size}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Radio.Root
                value={size.toLowerCase()}
                className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center data-checked:border-indigo-600"
              >
                <Radio.Indicator className="w-2.5 h-2.5 rounded-full bg-indigo-600 hidden data-checked:block" />
              </Radio.Root>
              <span className="text-sm">{size}</span>
            </label>
          ))}
        </RadioGroup>
      </Section>

      {/* ── SCROLL AREA ──────────────────────────────────────────────── */}
      <Section title="Scroll Area">
        <ScrollArea.Root className="h-32 w-48 border rounded-lg">
          <ScrollArea.Viewport className="h-full w-full p-3 overflow-hidden">
            <ScrollArea.Content>
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} className="text-sm text-gray-600 py-0.5">
                  List item {i + 1}
                </p>
              ))}
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="flex w-2 p-0.5"
          >
            <ScrollArea.Thumb className="flex-1 bg-gray-300 rounded-full" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Section>

      {/* ── SELECT ───────────────────────────────────────────────────── */}
      <Section title="Select">
        <Select.Root value={selectValue} onValueChange={setSelectValue}>
          <Select.Trigger className="flex items-center justify-between border border-gray-300 rounded px-3 py-2 text-sm w-48 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <Select.Value placeholder="Select a color…" />
            <Select.Icon>▾</Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner sideOffset={4}>
              <Select.Popup className="bg-white border rounded-lg shadow-xl py-1 min-w-48">
                <Select.List>
                  {['Red', 'Green', 'Blue', 'Yellow'].map((color) => (
                    <Select.Item
                      key={color}
                      value={color.toLowerCase()}
                      className="px-3 py-2 text-sm hover:bg-indigo-50 cursor-pointer flex items-center gap-2 data-highlighted:bg-indigo-50"
                    >
                      <Select.ItemText>{color}</Select.ItemText>
                      <Select.ItemIndicator className="ml-auto text-indigo-600">
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
        <div className="w-64 flex flex-col gap-3 text-sm text-gray-600">
          <span>Above the separator</span>
          <Separator className="border-t border-gray-300" />
          <span>Below the separator</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 h-10">
          <span>Left</span>
          <Separator
            orientation="vertical"
            className="h-full border-l border-gray-300"
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
          <div className="flex justify-between text-xs text-gray-600">
            <span>Volume</span>
            <span>{sliderValue[0]}</span>
          </div>
          <Slider.Control className="relative flex items-center h-5">
            <Slider.Track className="h-2 w-full bg-gray-200 rounded-full">
              <Slider.Indicator className="h-full bg-indigo-500 rounded-full" />
            </Slider.Track>
            <Slider.Thumb
              index={0}
              className="absolute w-5 h-5 bg-white border-2 border-indigo-500 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="relative w-11 h-6 rounded-full transition-colors bg-gray-300 data-checked:bg-indigo-600"
          >
            <Switch.Thumb className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform data-checked:translate-x-5" />
          </Switch.Root>
          <span className="text-sm">{switchOn ? 'On' : 'Off'}</span>
        </label>
      </Section>

      {/* ── TABS ─────────────────────────────────────────────────────── */}
      <Section title="Tabs">
        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-sm"
        >
          <Tabs.List className="flex border-b">
            {['tab1', 'tab2', 'tab3'].map((id, i) => (
              <Tabs.Tab
                key={id}
                value={id}
                className="px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent data-selected:border-indigo-600 data-selected:text-indigo-600"
              >
                Tab {i + 1}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {['tab1', 'tab2', 'tab3'].map((id, i) => (
            <Tabs.Panel
              key={id}
              value={id}
              className="py-4 text-sm text-gray-600"
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
          className="px-4 py-2 border rounded text-sm font-medium transition-colors data-pressed:bg-indigo-600 data-pressed:text-white data-pressed:border-indigo-600 hover:bg-gray-50"
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
          className="flex border rounded overflow-hidden"
        >
          {['Left', 'Center', 'Right'].map((align) => (
            <Toggle
              key={align}
              value={align.toLowerCase()}
              className="px-4 py-2 text-sm font-medium border-r last:border-r-0 data-pressed:bg-indigo-600 data-pressed:text-white hover:bg-gray-50 transition-colors"
            >
              {align}
            </Toggle>
          ))}
        </ToggleGroup>
      </Section>

      {/* ── TOOLBAR ──────────────────────────────────────────────────── */}
      <Section title="Toolbar">
        <Toolbar.Root className="flex items-center gap-1 p-1 border rounded-lg bg-gray-50">
          <Toolbar.Button className="px-3 py-1.5 text-sm rounded hover:bg-white hover:shadow-sm transition-all font-bold">
            B
          </Toolbar.Button>
          <Toolbar.Button className="px-3 py-1.5 text-sm rounded hover:bg-white hover:shadow-sm transition-all italic">
            I
          </Toolbar.Button>
          <Toolbar.Button className="px-3 py-1.5 text-sm rounded hover:bg-white hover:shadow-sm transition-all underline">
            U
          </Toolbar.Button>
          <Toolbar.Separator className="w-px h-5 bg-gray-300 mx-1" />
          <Toolbar.Button className="px-3 py-1.5 text-sm rounded hover:bg-white hover:shadow-sm transition-all">
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
                <button className="px-4 py-2 border rounded hover:bg-gray-50">
                  Hover me
                </button>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={8}>
                <Tooltip.Popup className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow">
                  Helpful tooltip text
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </Section>
    </main>
  );
}
