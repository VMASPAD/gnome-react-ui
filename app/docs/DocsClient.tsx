"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { MDXRemote } from "next-mdx-remote";
import * as Accordion from "@/app/docs/demos/accordion/index";
import * as AccordionParts from "@/app/components/accordion/index.parts";
import * as AlertDialog from "../components/alert-dialog/index.parts";
import * as Tabs from "../components/tabs/index.parts";
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
import {
  ChevronRight,
  Menu as MenuIcon,
  X,
  Search,
  BookOpen,
  PanelLeft,
  Copy,
  Check,
  Link as LinkIcon,
} from "lucide-react";
import * as Icons from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";
import { AnimatedThemeToggler } from "../ui/AnimatedThemeToggler";

/* ─── types ──────────────────────────────────────────────────────────────── */
interface DocEntry {
  slug: string;
  label: string;
  content: any;
  raw: string;
}
interface Heading {
  id: string;
  text: string;
  level: number;
}

/* ─── helpers ────────────────────────────────────────────────────────────── */
function extractHeadings(md: string): Heading[] {
  const headings: Heading[] = [];
  const idCount = new Map<string, number>();
  const stripped = md.replace(/```[\s\S]*?```/g, "");
  const re = /^(#{1,3})\s+(.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(stripped)) !== null) {
    const text = m[2].trim();
    const baseId = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    const count = idCount.get(baseId) ?? 0;
    idCount.set(baseId, count + 1);
    headings.push({ id: count === 0 ? baseId : `${baseId}-${count + 1}`, text, level: m[1].length });
  }
  return headings;
}

function decodeHtmlEntities(text: string): string {
  if (typeof text !== "string") return text;
  return text
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    .replace(/&#123;/g, "{").replace(/&#125;/g, "}").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function decodeChildren(children: React.ReactNode): React.ReactNode {
  if (typeof children === "string") return decodeHtmlEntities(children);
  if (React.isValidElement(children)) {
    const cp = children.props as { children?: React.ReactNode };
    return React.cloneElement(children, { ...(typeof children.props === "object" ? children.props : {}) }, decodeChildren(cp.children));
  }
  if (Array.isArray(children)) return children.map((c, i) => <React.Fragment key={i}>{decodeChildren(c)}</React.Fragment>);
  return children;
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) return extractText((node.props as any).children);
  return "";
}

/* ─── CodeBlock ──────────────────────────────────────────────────────────── */
function CodeBlock({ className, children }: { className?: string; children?: React.ReactNode }) {
  const [copied, setCopied] = React.useState(false);
  const match = /language-(\w+)/.exec(className ?? "");
  const language = match ? match[1] : "text";
  const code = String(children).replace(/\n$/, "");

  return (
    <div className="my-5 overflow-hidden rounded-lg border border-border bg-[oklch(0.16_0.02_330)]">
      <div className="flex items-center justify-between border-b border-white/8 bg-[oklch(0.19_0.02_330)] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[oklch(0.65_0.18_20)]" />
          <span className="h-2 w-2 rounded-full bg-[oklch(0.72_0.18_80)]" />
          <span className="h-2 w-2 rounded-full bg-[oklch(0.65_0.18_150)]" />
          <span className="ml-2 font-mono text-[10px] font-medium uppercase tracking-widest text-white/30">{language}</span>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-[11px] text-white/40 transition-colors hover:bg-white/8 hover:text-white/80"
        >
          {copied ? <Check size={11} className="text-[oklch(0.65_0.18_150)]" /> : <Copy size={11} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ margin: 0, padding: "1.125rem 1rem", background: "transparent", fontSize: "0.8rem", lineHeight: "1.75", borderRadius: 0 }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

/* ─── AnchoredHeading — copies URL#id on click ───────────────────────────── */
function AnchoredHeading({ as: Tag, className, children, ...props }: {
  as: "h1" | "h2" | "h3" | "h4";
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  const [copied, setCopied] = React.useState(false);
  const id = props.id ?? extractText(children).toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  function copyLink() {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Tag id={id} className={`group relative scroll-mt-20 ${className ?? ""}`} {...props}>
      {children}
      <button
        onClick={copyLink}
        aria-label="Copy link to section"
        title="Copy link"
        className="ml-2 inline-flex items-center opacity-0 transition-opacity duration-100 group-hover:opacity-50 hover:!opacity-100"
      >
        {copied
          ? <Icons.Check size={13} className="inline -mt-0.5 text-[oklch(0.65_0.18_150)]" />
          : <Icons.Hash size={13} className="inline -mt-0.5 text-primary" />
        }
      </button>
    </Tag>
  );
}

/* ─── ApiTable — MDX table → Accordion ──────────────────────────────────── */
function ApiTable({ children }: { children: React.ReactNode }) {
  const childArray = React.Children.toArray(children);

  // Find thead and tbody by iterating children
  let theadNode: React.ReactElement | null = null;
  let tbodyNode: React.ReactElement | null = null;
  for (const child of childArray) {
    if (!React.isValidElement(child)) continue;
    const name = typeof child.type === "string" ? child.type : (child.type as any)?.displayName ?? (child.type as any)?.name ?? "";
    if (name === "thead") theadNode = child as React.ReactElement;
    if (name === "tbody") tbodyNode = child as React.ReactElement;
  }

  // Fallback: render as plain table if we can't parse
  if (!theadNode || !tbodyNode) {
    return (
      <div className="my-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    );
  }

  // Parse column headers
  const headerCells: string[] = [];
  const headerRow = React.Children.toArray((theadNode.props as any).children)[0];
  if (React.isValidElement(headerRow)) {
    React.Children.forEach((headerRow.props as any).children, (cell: any) => {
      headerCells.push(extractText(cell).toLowerCase().trim());
    });
  }

  const propIdx = headerCells.indexOf("prop");
  const typeIdx = headerCells.indexOf("type");
  const defaultIdx = headerCells.indexOf("default");
  const descIdx = headerCells.indexOf("description");

  // Parse body rows
  const rows = React.Children.toArray((tbodyNode.props as any).children);

  const getCell = (cells: React.ReactNode[], idx: number) =>
    idx >= 0 ? decodeChildren((cells[idx] as any)?.props?.children) : null;

  return (
    <AccordionParts.Root
      multiple
      className="my-6 flex flex-col overflow-hidden rounded-lg border border-border"
    >
      {rows.map((row, i) => {
        if (!React.isValidElement(row)) return null;
        const cells = React.Children.toArray((row.props as any).children);

        const propCell    = getCell(cells, propIdx);
        const typeCell    = getCell(cells, typeIdx);
        const defaultCell = getCell(cells, defaultIdx);
        const descCell    = getCell(cells, descIdx);

        const defaultText = extractText(defaultCell ?? null);
        const hasDefault  = defaultText && defaultText !== "—" && defaultText !== "";
        const itemValue   = `prop-${i}-${extractText(propCell ?? null)}`;

        return (
          <AccordionParts.Item
            key={itemValue}
            value={itemValue}
            className="border-b border-border last:border-b-0"
          >
            <AccordionParts.Header>
              <AccordionParts.Trigger className="group flex w-full items-center gap-3 bg-background px-4 py-3 text-left transition-colors hover:bg-muted/40 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
                {/* Prop name */}
                <span className="min-w-[8rem] shrink-0 font-mono text-[13px] font-semibold text-foreground">
                  {propCell}
                </span>

                {/* Type badge — hidden on mobile */}
                {typeCell && (
                  <span className="hidden shrink-0 truncate rounded-md border border-blue-500/20 bg-blue-500/8 px-1.5 py-0.5 font-mono text-[11px] text-blue-600 dark:text-blue-400 sm:inline-block max-w-[14rem]">
                    {typeCell}
                  </span>
                )}

                {/* Default badge — hidden on small screens */}
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
                {/* Description */}
                {descCell && (
                  <p className="text-sm leading-relaxed text-muted-foreground">{descCell}</p>
                )}

                {/* Type — shown in full on all screen sizes inside panel */}
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

                {/* Default */}
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

/* ─── DocsClient ─────────────────────────────────────────────────────────── */
export default function DocsClient({ docs }: { docs: DocEntry[] }) {
  const [activeSlug, setActiveSlug]     = React.useState(docs[0]?.slug ?? "");
  const [sidebarOpen, setSidebarOpen]   = React.useState(false);
  const [search, setSearch]             = React.useState("");
  const [activeHeading, setActiveHeading] = React.useState("");

  const activeDoc    = docs.find((d) => d.slug === activeSlug) ?? docs[0];
  const headings     = activeDoc ? extractHeadings(activeDoc.raw) : [];
  const filteredDocs = docs.filter((d) => d.label.toLowerCase().includes(search.toLowerCase()));

  // Intersection observer for TOC highlight
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) { setActiveHeading(e.target.id); break; } } },
      { rootMargin: "-80px 0px -60% 0px" },
    );
    document.querySelectorAll("h1[id],h2[id],h3[id],h4[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeSlug]);

  function navigate(slug: string) {
    setActiveSlug(slug);
    setSidebarOpen(false);
    setActiveHeading("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/30 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ─── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[17rem] flex-col border-r border-border bg-sidebar transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0 lg:z-auto`}>
        {/* Logo */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <Image
                src="/icon.svg"
                alt="GnomeUI Logo"
                width={24}
                height={24}
              />
            </div>
            <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">GnomeUI</span>
          </a>
          <button className="rounded-md p-1 text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="shrink-0 px-3 pt-3 pb-2">
          <div className="relative">
            <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sidebar-foreground/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components…"
              className="w-full rounded-md border border-sidebar-border bg-background py-1.5 pl-8 pr-3 text-xs text-sidebar-foreground placeholder:text-sidebar-foreground/40 outline-none transition-shadow focus:ring-2 focus:ring-ring/30"
            />
          </div>
        </div>

        <div className="shrink-0 px-4 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
          Components
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-6">
          <ul className="space-y-px">
            {filteredDocs.map((doc) => {
              const isActive = activeSlug === doc.slug;
              return (
                <li key={doc.slug}>
                  <button
                    onClick={() => navigate(doc.slug)}
                    className={`group flex w-full items-center justify-between rounded-md px-3 py-1.5 text-[13px] transition-colors duration-100 ${isActive ? "bg-sidebar-accent font-medium text-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}
                  >
                    <span>{doc.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </button>
                </li>
              );
            })}
            {filteredDocs.length === 0 && (
              <li className="px-3 py-8 text-center text-xs text-sidebar-foreground/40">No components found</li>
            )}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-sidebar-border px-4 py-3">
          <p className="text-[10px] text-sidebar-foreground/30">{docs.length} components · v1.0.0</p>
        </div>
      </aside>

      {/* ─── Main ────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur lg:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="-ml-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden">
              <MenuIcon size={18} />
            </button>
            <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
              <span className="text-muted-foreground">Docs</span>
              <ChevronRight size={13} className="text-border" />
              <span className="font-medium text-foreground">{activeDoc?.label}</span>
            </nav>
          </div>
<div className="flex items-center gap-2">
          <AnimatedThemeToggler />
          <a
            href="https://github.com/VMASPAD/gnome-react-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            GitHub
          </a></div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Article */}
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl px-6 py-10 lg:px-10 lg:py-12">
              {activeDoc && (
                <MDXRemote
                  {...activeDoc.content}
                  components={{
                    Accordion,
                    Alert,
                    Autocomplete,
                    Icons,
                    Tabs,
                    Tab,
                    Avatar,
                    Button,
                    Checkbox,
                    Drawer,
                    Dialog,
                    Collapsible,
                    Combobox,
                    Field,
                    Form,
                    Fieldset,
                    Input,
                    Menu,
                    Menubar,
                    Meter,
                    Navigation,
                    Popover,
                    Number,
                    PreviewCard,
                    Progress,
                    Radio,
                    ScrollArea,
                    Select,
                    Separator,
                    Toast,
                    Slider,
                    Switch,
                    Toggle,
                    Toolbar,
                    Tooltip,
                    Card,
                    Badge,
                    BreadcrumbDemo,
                    PaginationDemo,

                    Subtitle: ({ children }: any) => (
                      <p className="mb-8 mt-1 text-base leading-relaxed text-muted-foreground">{children}</p>
                    ),
                    Meta: () => null,

                    /* headings */
                    h1: (props: any) => <AnchoredHeading as="h1" className="mb-1 mt-0 text-3xl font-bold tracking-tight text-foreground" {...props} />,
                    h2: (props: any) => <AnchoredHeading as="h2" className="mb-3 mt-12 border-t border-border pt-8 text-xl font-semibold tracking-tight text-foreground first:mt-0 first:border-t-0 first:pt-0" {...props} />,
                    h3: (props: any) => {
                      if (typeof props.children === "string" && props.children.toLowerCase() === "metadata") return null;
                      return <AnchoredHeading as="h3" className="mb-2 mt-8 text-base font-semibold text-foreground" {...props} />;
                    },
                    h4: (props: any) => <AnchoredHeading as="h4" className="mb-2 mt-6 text-sm font-semibold text-foreground" {...props} />,

                    /* inline */
                    p:      (props: any) => <p className="my-4 text-sm leading-7 text-muted-foreground" {...props} />,
                    strong: (props: any) => <strong className="font-semibold text-foreground" {...props} />,
                    em:     (props: any) => <em className="italic text-muted-foreground" {...props} />,
                    del:    (props: any) => <del className="line-through text-muted-foreground/60" {...props} />,
                    a: ({ href, children, ...props }: any) => (
                      <a href={href} className="font-medium text-primary underline underline-offset-4 decoration-primary/40 transition-colors hover:decoration-primary" target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined} {...props}>
                        {children}
                      </a>
                    ),

                    /* lists */
                    ul: (props: any) => <ul className="my-4 ml-4 space-y-1.5 text-sm text-muted-foreground [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-2.5 [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-primary/60 [&>li]:before:content-['']" {...props} />,
                    ol: (props: any) => <ol className="my-4 ml-5 list-decimal space-y-1.5 text-sm text-muted-foreground marker:font-medium marker:text-primary/70" {...props} />,
                    li: (props: any) => <li className="leading-7" {...props} />,

                    blockquote: (props: any) => <blockquote className="my-5 rounded-r-md border-l-2 border-primary bg-primary/5 py-3 pl-4 pr-4 text-sm italic text-muted-foreground [&>p]:my-0" {...props} />,

                    code: ({ className, children, ...props }: any) => {
                      if (/language-/.test(className ?? "")) return <CodeBlock className={className} {...props}>{children}</CodeBlock>;
                      return <code className="rounded-md border border-border/60 bg-muted px-1.5 py-0.5 font-mono text-[0.78em] text-foreground" {...props}>{children}</code>;
                    },
                    pre: ({ children }: any) => <>{children}</>,

                    hr: () => <hr className="my-10 h-px border-none bg-gradient-to-r from-transparent via-border to-transparent" />,

                    img: ({ src, alt, ...props }: any) => (
                      <span className="my-6 block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={alt ?? ""} className="h-auto max-w-full rounded-lg border border-border shadow-sm" {...props} />
                        {alt && <span className="mt-2 block text-center text-xs italic text-muted-foreground">{alt}</span>}
                      </span>
                    ),

                    /* table → ApiTable accordion */
                    table: (props: any) => {
                      const isMeta = props.children?.props?.children?.some((child: any) => {
                        const fc = child?.props?.children?.[0]?.props?.children;
                        return typeof fc === "string" && (fc.toLowerCase() === "key" || fc.toLowerCase() === "tags");
                      });
                      if (isMeta) return null;
                      return <ApiTable>{props.children}</ApiTable>;
                    },
                    /* Fallbacks (used if table bypass happens) */
                    thead: (props: any) => <thead className="border-b border-border bg-muted/50" {...props} />,
                    tbody: (props: any) => <tbody className="divide-y divide-border/60" {...props} />,
                    th:    (props: any) => <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-foreground" {...props} />,
                    td:    (props: any) => <td className="px-4 py-3 align-top text-sm text-muted-foreground">{props.children}</td>,
                    tr:    ({ children, ...props }: any) => <tr className="transition-colors hover:bg-muted/40" {...props}>{children}</tr>,
                  }}
                />
              )}
            </div>
          </main>

          {/* TOC */}
          <aside className="hidden w-56 shrink-0 overflow-y-auto border-l border-border bg-background py-10 pl-5 pr-4 xl:block">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">On this page</p>
            <nav>
              <ul className="space-y-0.5">
                {headings.map((h) => {
                  const isActive = activeHeading === h.id;
                  return (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`block rounded py-1 text-xs leading-relaxed transition-colors duration-100 ${h.level === 3 ? "pl-3" : "pl-0"} ${isActive ? "font-medium text-primary" : "text-muted-foreground/70 hover:text-foreground"}`}
                      >
                        {h.level === 3 && <ChevronRight size={10} className="mr-1 inline-block -mt-px opacity-40" />}
                        {h.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}