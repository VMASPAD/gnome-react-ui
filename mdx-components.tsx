
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

// ── Demo component namespaces ──────────────────────────────────────────────
import * as Accordion from "./data/docs/demos/accordion/index";
import * as AccordionParts from "./data/components/accordion/index.parts";
import * as Tabs from "./data/components/tabs/index.parts";
import * as Alert from "./data/docs/demos/alert/index";
import * as Autocomplete from "./data/docs/demos/autocomplete/index";
import * as Avatar from "./data/docs/demos/avatar/index";
import * as Button from "./data/docs/demos/button/index";
import * as Checkbox from "./data/docs/demos/checkbox/index";
import * as Combobox from "./data/docs/demos/combobox/index";
import * as Collapsible from "./data/docs/demos/collapsible/index";
import * as Drawer from "./data/docs/demos/drawer/index";
import * as Dialog from "./data/docs/demos/dialog/index";
import * as Field from "./data/docs/demos/field/index";
import * as Form from "./data/docs/demos/form/index";
import * as Fieldset from "./data/docs/demos/fieldset/index";
import * as Input from "./data/docs/demos/input/index";
import * as Menu from "./data/docs/demos/menu/index";
import * as Menubar from "./data/docs/demos/menubar/index";
import * as Meter from "./data/docs/demos/meter/index";
import * as Navigation from "./data/docs/demos/navigation/index";
import * as Number from "./data/docs/demos/number/index";
import * as Popover from "./data/docs/demos/popover/index";
import * as PreviewCard from "./data/docs/demos/preview/index";
import * as Progress from "./data/docs/demos/progress/index";
import * as Radio from "./data/docs/demos/radio/index";
import * as ScrollArea from "./data/docs/demos/scroll/index";
import * as Select from "./data/docs/demos/select/index";
import * as Separator from "./data/docs/demos/separator/index";
import * as Toast from "./data/docs/demos/toast/index";
import * as Slider from "./data/docs/demos/slider/index";
import * as Switch from "./data/docs/demos/switch/index";
import * as Tab from "./data/docs/demos/tabs/index";
import * as Toggle from "./data/docs/demos/toggle/index";
import * as Toolbar from "./data/docs/demos/toolbar/index";
import * as Tooltip from "./data/docs/demos/tooltip/index";
import * as CardDemo from "./data/docs/demos/card/index";
import * as Badge from "./data/docs/demos/badge/index";
import * as BreadcrumbDemo from "./data/docs/demos/breadcrumb/index";
import * as PaginationDemo from "./data/docs/demos/pagination/index";
import * as Textarea from "./data/docs/demos/textarea/index";
import * as Label from "./data/docs/demos/label/index";
import * as ContextMenuDemo from "./data/docs/demos/contextMenu";
import * as ContextMenuParts from "./data/components/context-menu/index.parts";
import { MdxCode, MdxPre } from '@/components/mdx/code-block';

import InstallationCommands from "@/components/installation-commands";
import ComponentPreview from "@/components/component-preview";

const ContextMenu = {
  ...ContextMenuParts,
  ...ContextMenuDemo,
};

const toPlainObject = <T extends Record<string, unknown>>(value: T) => ({ ...value });

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    code: MdxCode as unknown as MDXComponents[string],
    pre: MdxPre as unknown as MDXComponents[string],
    // Provide globally so MDX files don't need excessive imports
    Accordion: toPlainObject(Accordion) as unknown as MDXComponents[string],
    Alert: toPlainObject(Alert) as unknown as MDXComponents[string],
    Autocomplete: toPlainObject(Autocomplete) as unknown as MDXComponents[string],
    Avatar: toPlainObject(Avatar) as unknown as MDXComponents[string],
    Badge: toPlainObject(Badge) as unknown as MDXComponents[string],
    BreadcrumbDemo: toPlainObject(BreadcrumbDemo) as unknown as MDXComponents[string],
    Button: toPlainObject(Button) as unknown as MDXComponents[string],
    CardDemo: toPlainObject(CardDemo) as unknown as MDXComponents[string],
    Checkbox: toPlainObject(Checkbox) as unknown as MDXComponents[string],
    Collapsible: toPlainObject(Collapsible) as unknown as MDXComponents[string],
    Combobox: toPlainObject(Combobox) as unknown as MDXComponents[string],
    ContextMenu: ContextMenu as unknown as MDXComponents[string],
    Drawer: toPlainObject(Drawer) as unknown as MDXComponents[string],
    Dialog: toPlainObject(Dialog) as unknown as MDXComponents[string],
    Field: toPlainObject(Field) as unknown as MDXComponents[string],
    Fieldset: toPlainObject(Fieldset) as unknown as MDXComponents[string],
    Form: toPlainObject(Form) as unknown as MDXComponents[string],
    Input: toPlainObject(Input) as unknown as MDXComponents[string],
    Menu: toPlainObject(Menu) as unknown as MDXComponents[string],
    Menubar: toPlainObject(Menubar) as unknown as MDXComponents[string],
    Meter: toPlainObject(Meter) as unknown as MDXComponents[string],
    Navigation: toPlainObject(Navigation) as unknown as MDXComponents[string],
    Number: toPlainObject(Number) as unknown as MDXComponents[string],
    PaginationDemo: toPlainObject(PaginationDemo) as unknown as MDXComponents[string],
    Popover: toPlainObject(Popover) as unknown as MDXComponents[string],
    PreviewCard: toPlainObject(PreviewCard) as unknown as MDXComponents[string],
    Progress: toPlainObject(Progress) as unknown as MDXComponents[string],
    Radio: toPlainObject(Radio) as unknown as MDXComponents[string],
    ScrollArea: toPlainObject(ScrollArea) as unknown as MDXComponents[string],
    Select: toPlainObject(Select) as unknown as MDXComponents[string],
    Separator: toPlainObject(Separator) as unknown as MDXComponents[string],
    Slider: toPlainObject(Slider) as unknown as MDXComponents[string],
    Switch: toPlainObject(Switch) as unknown as MDXComponents[string],
    Tab: toPlainObject(Tab) as unknown as MDXComponents[string],
    Tabs: toPlainObject(Tabs) as unknown as MDXComponents[string],
    Toast: toPlainObject(Toast) as unknown as MDXComponents[string],
    Toggle: toPlainObject(Toggle) as unknown as MDXComponents[string],
    Toolbar: toPlainObject(Toolbar) as unknown as MDXComponents[string],
    Tooltip: toPlainObject(Tooltip) as unknown as MDXComponents[string],
    Textarea: toPlainObject(Textarea) as unknown as MDXComponents[string],
    Label: toPlainObject(Label) as unknown as MDXComponents[string],
    InstallationCommands: InstallationCommands as unknown as MDXComponents[string],
    ComponentPreview: ComponentPreview as unknown as MDXComponents[string],
  };
}
