// mdx-components.tsx  — Global MDX component registry for @next/mdx
// This file is required by Next.js App Router for MDX file-based routing.
import type { MDXComponents } from "mdx/types";
import * as React from "react";
import * as Icons from "lucide-react";

// ── Demo component namespaces ──────────────────────────────────────────────
import * as Accordion from "@/app/docs/demos/accordion/index";
import * as AccordionParts from "@/app/components/accordion/index.parts";
import * as Tabs from "@/app/components/tabs/index.parts";
import * as Alert from "@/app/docs/demos/alert/index";
import * as Autocomplete from "@/app/docs/demos/autocomplete/index";
import * as Avatar from "@/app/docs/demos/avatar/index";
import * as Button from "@/app/docs/demos/button/index";
import * as Checkbox from "@/app/docs/demos/checkbox/index";
import * as Combobox from "@/app/docs/demos/combobox/index";
import * as Collapsible from "@/app/docs/demos/collapsible/index";
import * as Drawer from "@/app/docs/demos/drawer/index";
import * as Dialog from "@/app/docs/demos/dialog/index";
import * as Field from "@/app/docs/demos/field/index";
import * as Form from "@/app/docs/demos/form/index";
import * as Fieldset from "@/app/docs/demos/fieldset/index";
import * as Input from "@/app/docs/demos/input/index";
import * as Menu from "@/app/docs/demos/menu/index";
import * as Menubar from "@/app/docs/demos/menubar/index";
import * as Meter from "@/app/docs/demos/meter/index";
import * as Navigation from "@/app/docs/demos/navigation/index";
import * as Number from "@/app/docs/demos/number/index";
import * as Popover from "@/app/docs/demos/popover/index";
import * as PreviewCard from "@/app/docs/demos/preview/index";
import * as Progress from "@/app/docs/demos/progress/index";
import * as Radio from "@/app/docs/demos/radio/index";
import * as ScrollArea from "@/app/docs/demos/scroll/index";
import * as Select from "@/app/docs/demos/select/index";
import * as Separator from "@/app/docs/demos/separator/index";
import * as Toast from "@/app/docs/demos/toast/index";
import * as Slider from "@/app/docs/demos/slider/index";
import * as Switch from "@/app/docs/demos/switch/index";
import * as Tab from "@/app/docs/demos/tabs/index";
import * as Toggle from "@/app/docs/demos/toggle/index";
import * as Toolbar from "@/app/docs/demos/toolbar/index";
import * as Tooltip from "@/app/docs/demos/tooltip/index";
import * as Card from "@/app/docs/demos/card/index";
import * as Badge from "@/app/docs/demos/badge/index";
import * as BreadcrumbDemo from "@/app/docs/demos/breadcrumb/index";
import * as PaginationDemo from "@/app/docs/demos/pagination/index";

// ── Client islands ─────────────────────────────────────────────────────────
import { CodeBlock, InlineCode } from "@/app/docs/components/CodeBlock";
import { CopyLinkButton } from "@/app/docs/components/CopyLinkButton";

// ── Helpers ────────────────────────────────────────────────────────────────
function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node))
    return extractText((node.props as { children?: React.ReactNode }).children);
  return "";
}

function decodeHtmlEntities(text: string): string {
  if (typeof text !== "string") return text;
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&#123;/g, "{")
    .replace(/&#125;/g, "}")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function decodeChildren(children: React.ReactNode): React.ReactNode {
  if (typeof children === "string") return decodeHtmlEntities(children);
  if (React.isValidElement(children)) {
    const cp = children.props as { children?: React.ReactNode };
    return React.cloneElement(
      children,
      { ...(typeof children.props === "object" ? children.props : {}) },
      decodeChildren(cp.children)
    );
  }
  if (Array.isArray(children))
    return children.map((c, i) => (
      <React.Fragment key={i}>{decodeChildren(c)}</React.Fragment>
    ));
  return children;
}

// ── AnchoredHeading ────────────────────────────────────────────────────────
function AnchoredHeading({
  as: Tag,
  className,
  children,
  ...props
}: {
  as: "h1" | "h2" | "h3" | "h4";
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}) {
  const id =
    (props.id as string) ??
    extractText(children)
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  return (
    <Tag
      id={id}
      className={`group relative scroll-mt-20 ${className ?? ""}`}
      {...(props as React.HTMLAttributes<HTMLHeadingElement>)}
    >
      {children}
      <CopyLinkButton id={id} />
    </Tag>
  );
}

// ── ApiTable  (MDX prop table → accordion) ─────────────────────────────────
function ApiTable({ children }: { children: React.ReactNode }) {
  const childArray = React.Children.toArray(children);
  let theadNode: React.ReactElement | null = null;
  let tbodyNode: React.ReactElement | null = null;

  for (const child of childArray) {
    if (!React.isValidElement(child)) continue;
    const name =
      typeof child.type === "string"
        ? child.type
        : ((child.type as { displayName?: string; name?: string })
            ?.displayName ??
          (child.type as { name?: string })?.name ??
          "");
    if (name === "thead") theadNode = child as React.ReactElement;
    if (name === "tbody") tbodyNode = child as React.ReactElement;
  }

  if (!theadNode || !tbodyNode) {
    return (
      <div className="my-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    );
  }

  const headerCells: string[] = [];
  const headerRow = React.Children.toArray(
    (theadNode.props as { children: React.ReactNode }).children
  )[0];
  if (React.isValidElement(headerRow)) {
    React.Children.forEach(
      (headerRow.props as { children: React.ReactNode }).children,
      (cell) => {
        headerCells.push(extractText(cell as React.ReactNode).toLowerCase().trim());
      }
    );
  }

  const propIdx = headerCells.indexOf("prop");
  const typeIdx = headerCells.indexOf("type");
  const defaultIdx = headerCells.indexOf("default");
  const descIdx = headerCells.indexOf("description");

  const rows = React.Children.toArray(
    (tbodyNode.props as { children: React.ReactNode }).children
  );

  const getCell = (cells: React.ReactNode[], idx: number) =>
    idx >= 0
      ? decodeChildren(
          (cells[idx] as React.ReactElement<{ children?: React.ReactNode }>)
            ?.props?.children
        )
      : null;

  return (
    <AccordionParts.Root
      multiple
      className="my-6 flex flex-col overflow-hidden rounded-lg border border-border"
    >
      {rows.map((row, i) => {
        if (!React.isValidElement(row)) return null;
        const cells = React.Children.toArray(
          (row.props as { children: React.ReactNode }).children
        );
        const propCell = getCell(cells, propIdx);
        const typeCell = getCell(cells, typeIdx);
        const defaultCell = getCell(cells, defaultIdx);
        const descCell = getCell(cells, descIdx);
        const defaultText = extractText(defaultCell ?? null);
        const hasDefault =
          defaultText && defaultText !== "—" && defaultText !== "";
        const itemValue = `prop-${i}-${extractText(propCell ?? null)}`;

        return (
          <AccordionParts.Item
            key={itemValue}
            value={itemValue}
            className="border-b border-border last:border-b-0"
          >
            <AccordionParts.Header>
              <AccordionParts.Trigger className="group flex w-full items-center gap-3 bg-background px-4 py-3 text-left transition-colors hover:bg-muted/40 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
                <span className="min-w-[8rem] shrink-0 font-mono text-[13px] font-semibold text-foreground">
                  {propCell}
                </span>
                {typeCell && (
                  <span className="hidden shrink-0 truncate rounded-md border border-blue-500/20 bg-blue-500/8 px-1.5 py-0.5 font-mono text-[11px] text-blue-600 dark:text-blue-400 sm:inline-block max-w-[14rem]">
                    {typeCell}
                  </span>
                )}
                {hasDefault && (
                  <span className="hidden shrink-0 rounded-md border border-purple-500/20 bg-purple-500/8 px-1.5 py-0.5 font-mono text-[11px] text-purple-600 dark:text-purple-400 md:inline-block">
                    {defaultCell}
                  </span>
                )}
                <Icons.Plus
                  size={13}
                  className="ml-auto mr-1 shrink-0 text-muted-foreground/40 transition-all duration-150 ease-out group-data-[panel-open]:rotate-45 group-data-[panel-open]:text-primary"
                />
              </AccordionParts.Trigger>
            </AccordionParts.Header>
            <AccordionParts.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
              <div className="space-y-3 border-t border-border/50 bg-muted/20 px-4 py-4">
                {descCell && (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {descCell}
                  </p>
                )}
                {typeCell && (
                  <div className="flex items-start gap-3">
                    <span className="w-14 shrink-0 pt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/50">
                      Type
                    </span>
                    <code className="rounded border border-blue-500/20 bg-blue-500/8 px-1.5 py-0.5 font-mono text-[11px] text-blue-600 dark:text-blue-400">
                      {typeCell}
                    </code>
                  </div>
                )}
                {hasDefault && (
                  <div className="flex items-start gap-3">
                    <span className="w-14 shrink-0 pt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/50">
                      Default
                    </span>
                    <code className="rounded border border-purple-500/20 bg-purple-500/8 px-1.5 py-0.5 font-mono text-[11px] text-purple-600 dark:text-purple-400">
                      {defaultCell}
                    </code>
                  </div>
                )}
              </div>
            </AccordionParts.Panel>
          </AccordionParts.Item>
        );
      })}
    </AccordionParts.Root>
  );
}

// ── useMDXComponents ───────────────────────────────────────────────────────
export function useMDXComponents(components: MDXComponents): MDXComponents {
  // We use `as MDXComponents` for the module namespace objects because
  // the MDXComponents type expects mapped component types but our namespaces
  // are NestedMDXComponents (keyed object of components) which is compatible
  // at runtime even though TS is strict about the exact shape.
  return {
    // ── Demo namespaces ──
    Accordion: Accordion as unknown as MDXComponents[string],
    Alert: Alert as unknown as MDXComponents[string],
    Autocomplete: Autocomplete as unknown as MDXComponents[string],
    Avatar: Avatar as unknown as MDXComponents[string],
    Badge: Badge as unknown as MDXComponents[string],
    BreadcrumbDemo: BreadcrumbDemo as unknown as MDXComponents[string],
    Button: Button as unknown as MDXComponents[string],
    Card: Card as unknown as MDXComponents[string],
    Checkbox: Checkbox as unknown as MDXComponents[string],
    Collapsible: Collapsible as unknown as MDXComponents[string],
    Combobox: Combobox as unknown as MDXComponents[string],
    Drawer: Drawer as unknown as MDXComponents[string],
    Dialog: Dialog as unknown as MDXComponents[string],
    Field: Field as unknown as MDXComponents[string],
    Fieldset: Fieldset as unknown as MDXComponents[string],
    Form: Form as unknown as MDXComponents[string],
    Icons: Icons as unknown as MDXComponents[string],
    Input: Input as unknown as MDXComponents[string],
    Menu: Menu as unknown as MDXComponents[string],
    Menubar: Menubar as unknown as MDXComponents[string],
    Meter: Meter as unknown as MDXComponents[string],
    Navigation: Navigation as unknown as MDXComponents[string],
    Number: Number as unknown as MDXComponents[string],
    PaginationDemo: PaginationDemo as unknown as MDXComponents[string],
    Popover: Popover as unknown as MDXComponents[string],
    PreviewCard: PreviewCard as unknown as MDXComponents[string],
    Progress: Progress as unknown as MDXComponents[string],
    Radio: Radio as unknown as MDXComponents[string],
    ScrollArea: ScrollArea as unknown as MDXComponents[string],
    Select: Select as unknown as MDXComponents[string],
    Separator: Separator as unknown as MDXComponents[string],
    Slider: Slider as unknown as MDXComponents[string],
    Switch: Switch as unknown as MDXComponents[string],
    Tab: Tab as unknown as MDXComponents[string],
    Tabs: Tabs as unknown as MDXComponents[string],
    Toast: Toast as unknown as MDXComponents[string],
    Toggle: Toggle as unknown as MDXComponents[string],
    Toolbar: Toolbar as unknown as MDXComponents[string],
    Tooltip: Tooltip as unknown as MDXComponents[string],

    // ── Custom MDX elements ──
    Subtitle: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-8 mt-1 text-base leading-relaxed text-muted-foreground">
        {children}
      </p>
    ),
    Meta: () => null,

    // ── Headings ──
    h1: (props) => (
      <AnchoredHeading
        as="h1"
        className="mb-1 mt-0 text-3xl font-bold tracking-tight text-foreground"
        {...props}
      />
    ),
    h2: (props) => (
      <AnchoredHeading
        as="h2"
        className="mb-3 mt-12 border-t border-border pt-8 text-xl font-semibold tracking-tight text-foreground first:mt-0 first:border-t-0 first:pt-0"
        {...props}
      />
    ),
    h3: (props) => {
      if (
        typeof props.children === "string" &&
        props.children.toLowerCase() === "metadata"
      )
        return null;
      return (
        <AnchoredHeading
          as="h3"
          className="mb-2 mt-8 text-base font-semibold text-foreground"
          {...props}
        />
      );
    },
    h4: (props) => (
      <AnchoredHeading
        as="h4"
        className="mb-2 mt-6 text-sm font-semibold text-foreground"
        {...props}
      />
    ),

    // ── Inline text ──
    p: (props) => (
      <p className="my-4 text-sm leading-7 text-muted-foreground" {...props} />
    ),
    strong: (props) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),
    em: (props) => <em className="italic text-muted-foreground" {...props} />,
    del: (props) => (
      <del className="line-through text-muted-foreground/60" {...props} />
    ),
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        className="font-medium text-primary underline underline-offset-4 decoration-primary/40 transition-colors hover:decoration-primary"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),

    // ── Lists ──
    ul: (props) => (
      <ul
        className="my-4 ml-4 space-y-1.5 text-sm text-muted-foreground [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-2.5 [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-primary/60 [&>li]:before:content-['']"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="my-4 ml-5 list-decimal space-y-1.5 text-sm text-muted-foreground marker:font-medium marker:text-primary/70"
        {...props}
      />
    ),
    li: (props) => <li className="leading-7" {...props} />,

    blockquote: (props) => (
      <blockquote
        className="my-5 rounded-r-md border-l-2 border-primary bg-primary/5 py-3 pl-4 pr-4 text-sm italic text-muted-foreground [&>p]:my-0"
        {...props}
      />
    ),

    // ── Code ──
    code: ({ className, children, ...props }) => {
      if (/language-/.test(className ?? ""))
        return (
          <CodeBlock className={className} {...props}>
            {children}
          </CodeBlock>
        );
      return <InlineCode {...props}>{children}</InlineCode>;
    },
    pre: ({ children }) => <>{children}</>,

    hr: () => (
      <hr className="my-10 h-px border-none bg-gradient-to-r from-transparent via-border to-transparent" />
    ),

    img: ({ src, alt, ...props }) => (
      <span className="my-6 block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? ""}
          className="h-auto max-w-full rounded-lg border border-border shadow-sm"
          {...props}
        />
        {alt && (
          <span className="mt-2 block text-center text-xs italic text-muted-foreground">
            {alt}
          </span>
        )}
      </span>
    ),

    // ── Table → ApiTable accordion ──
    table: (props) => {
      // Detect a "metadata" table (key/tags headers) and suppress it
      const isMeta = Array.isArray(
        (props.children as { props?: { children?: unknown[] } })?.props?.children
      ) &&
        (props.children as { props?: { children?: unknown[] } })?.props
          ?.children?.some((child: unknown) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const fc = (child as any)?.props?.children?.[0]?.props?.children;
            return (
              typeof fc === "string" &&
              (fc.toLowerCase() === "key" || fc.toLowerCase() === "tags")
            );
          });
      if (isMeta) return null;
      return <ApiTable>{props.children}</ApiTable>;
    },
    thead: (props) => (
      <thead className="border-b border-border bg-muted/50" {...props} />
    ),
    tbody: (props) => (
      <tbody className="divide-y divide-border/60" {...props} />
    ),
    th: (props) => (
      <th
        className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-foreground"
        {...props}
      />
    ),
    td: (props) => (
      <td className="px-4 py-3 align-top text-sm text-muted-foreground">
        {props.children}
      </td>
    ),
    tr: ({ children, ...props }) => (
      <tr className="transition-colors hover:bg-muted/40" {...props}>
        {children}
      </tr>
    ),

    // Spread any additional components passed in
    ...components,
  };
}