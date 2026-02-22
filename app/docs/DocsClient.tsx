/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { MDXRemote } from "next-mdx-remote";
import * as Accordion from "../components/accordion/index.parts";
import * as AlertDialog from "../components/alert-dialog/index.parts";
import * as Autocomplete from "../components/autocomplete/index.parts";
import * as Avatar from "../components/avatar/index.parts";
import { Button } from "../components/button";
import * as Checkbox from "../components/checkbox/index.parts";
import * as Collapsible from "../components/collapsible/index.parts";
import * as Combobox from "../components/combobox/index.parts";
import * as ContextMenu from "../components/context-menu/index.parts";
import * as Dialog from "../components/dialog/index.parts";
import * as Drawer from "../components/drawer/index.parts";
import * as Field from "../components/field/index.parts";
import * as Fieldset from "../components/fieldset/index.parts";
import { Form } from "../components/form";
import { Input } from "../components/input";
import * as Menu from "../components/menu/index.parts";
import { Menubar } from "../components/menubar";
import * as Meter from "../components/meter/index.parts";
import * as NavigationMenu from "../components/navigation-menu/index.parts";
import * as NumberField from "../components/number-field/index.parts";
import * as Popover from "../components/popover/index.parts";
import * as PreviewCard from "../components/preview-card/index.parts";
import * as Progress from "../components/progress/index.parts";
import * as Radio from "../components/radio/index.parts";
import { RadioGroup } from "../components/radio-group";
import * as ScrollArea from "../components/scroll-area/index.parts";
import * as Select from "../components/select/index.parts";
import { Separator } from "../components/separator";
import * as Slider from "../components/slider/index.parts";
import * as Switch from "../components/switch/index.parts";
import * as Tabs from "../components/tabs/index.parts";
import * as Toast from "../components/toast/index.parts";
import { Toggle } from "../components/toggle";
import { ToggleGroup } from "../components/toggle-group";
import * as Toolbar from "../components/toolbar/index.parts";
import * as Tooltip from "../components/tooltip/index.parts";
import * as Icons from "lucide-react";
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
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

/* ─── types ────────────────────────────────────────────────────────────── */
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

/* ─── extract headings from markdown for table-of-contents ─────────────── */
function extractHeadings(md: string): Heading[] {
  const headings: Heading[] = [];
  const re = /^(#{1,3})\s+(.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) {
    const text = m[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text, level: m[1].length });
  }
  return headings;
}

/* ─── decode HTML entities ──────────────────────────────────────────────── */
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

/* ─── recursively decode HTML entities in children ─────────────────────── */
function decodeChildren(children: React.ReactNode): React.ReactNode {
  if (typeof children === "string") {
    return decodeHtmlEntities(children);
  }
  if (React.isValidElement(children)) {
    const childProps = children.props as { children?: React.ReactNode };
    return React.cloneElement(
      children,
      {},
      decodeChildren(childProps.children)
    );
  }
  if (Array.isArray(children)) {
    return children.map((child, i) => (
      <React.Fragment key={i}>{decodeChildren(child)}</React.Fragment>
    ));
  }
  return children;
}

/* ─── code block with syntax highlighting + copy button ────────────────── */
function CodeBlock({ className, children }: { className?: string; children?: React.ReactNode }) {
  const [copied, setCopied] = React.useState(false);
  const match = /language-(\w+)/.exec(className ?? "");
  const language = match ? match[1] : "text";
  const code = String(children).replace(/\n$/, "");

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="my-6 rounded-lg border border-border overflow-hidden group">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-white/10">
        <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-zinc-100 transition-colors px-2 py-1 rounded hover:bg-white/10"
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1.25rem 1rem",
          background: "#1a1b26",
          fontSize: "0.8125rem",
          lineHeight: "1.7",
          borderRadius: 0,
        }}
        showLineNumbers={code.split("\n").length > 4}
        lineNumberStyle={{ color: "#4a4b5a", fontSize: "0.7rem", minWidth: "2.5rem" }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

/* ─── heading with anchor link ──────────────────────────────────────────── */
function AnchoredHeading({
  as: Tag,
  className,
  children,
  ...props
}: {
  as: "h1" | "h2" | "h3" | "h4";
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  const id =
    props.id ??
    String(children)
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  return (
    <Tag id={id} className={`group relative ${className ?? ""}`} {...props}>
      {children}
      <a
        href={`#${id}`}
        aria-hidden="true"
        className="ml-2 opacity-0 group-hover:opacity-60 transition-opacity"
      >
        <LinkIcon size={14} className="inline -mt-0.5" />
      </a>
    </Tag>
  );
}

/* ─── component ────────────────────────────────────────────────────────── */
export default function DocsClient({ docs }: { docs: DocEntry[] }) {
  const [activeSlug, setActiveSlug] = React.useState(docs[0]?.slug ?? "");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const activeDoc = docs.find((d) => d.slug === activeSlug) ?? docs[0];
  const headings = activeDoc ? extractHeadings(activeDoc.raw) : [];

  const filteredDocs = docs.filter((d) =>
    d.label.toLowerCase().includes(search.toLowerCase())
  );

  function navigate(slug: string) {
    setActiveSlug(slug);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-background flex flex-col
          transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:z-auto
        `}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0 bg-background/90 backdrop-blur">
          <span className="text-sm font-semibold tracking-tight flex items-center gap-2">
            <BookOpen size={14} className="text-primary" />
            Docs
          </span>
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-3 py-2 shrink-0">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-full pl-8 pr-3 py-2 text-xs bg-background border border-input rounded-md outline-none focus:ring-2 focus:ring-ring/40 placeholder:text-muted-foreground transition-shadow duration-150"
            />
          </div>
        </div>

        <div className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Componentes
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-5">
          <ul className="space-y-0.5">
            {filteredDocs.map((doc) => (
              <li key={doc.slug}>
                <button
                  onClick={() => navigate(doc.slug)}
                  className={`
                    w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors duration-100
                    ${
                      activeSlug === doc.slug
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }
                  `}
                >
                  {doc.label}
                </button>
              </li>
            ))}
            {filteredDocs.length === 0 && (
              <li className="px-3 py-6 text-xs text-muted-foreground text-center">
                No components found.
              </li>
            )}
          </ul>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between h-14 px-4 border-b border-border shrink-0 bg-background/90 backdrop-blur lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 -ml-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors lg:hidden"
          >
            <MenuIcon size={20} />
          </button>
          <div className="flex items-center gap-2 ml-3 lg:ml-0">
            <span className="text-sm font-semibold">{activeDoc?.label}</span>
          </div>
          <span className="hidden sm:inline-block text-xs text-muted-foreground">
            {docs.length} componentes
          </span>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-10 lg:py-8 max-w-none">
            <article className="max-w-4xl mx-auto prose-headings:scroll-mt-24 **:min-w-0">
              {activeDoc && (
                <MDXRemote
                  {...activeDoc.content}
                  components={{
                    Accordion, AlertDialog, Autocomplete, Avatar, Button,
                    Checkbox, Collapsible, Combobox, ContextMenu,
                    Dialog, Drawer, Field, Fieldset, Form, Input,
                    Menu, Menubar, Meter, NavigationMenu, NumberField,
                    Popover, PreviewCard, Progress, Radio, RadioGroup,
                    ScrollArea, Select, Separator, Slider, Switch,
                    Tabs, Toast, Toggle, ToggleGroup, Toolbar, Tooltip,
                    Icons,
                    Subtitle: ({ children }: any) => (
                      <p className="text-sm text-muted-foreground mt-0 mb-6 leading-relaxed">
                        {children}
                      </p>
                    ),
                    Meta: () => null,

                    /* ── headings ── */
                    h1: (props: any) => (
                      <AnchoredHeading
                        as="h1"
                        className="text-3xl font-semibold tracking-tight text-foreground mb-2 mt-0"
                        {...props}
                      />
                    ),
                    h2: (props: any) => (
                      <AnchoredHeading
                        as="h2"
                        className="text-xl font-semibold text-foreground mt-10 mb-3 border-b border-border pb-2"
                        {...props}
                      />
                    ),
                    h3: (props: any) => {
                      if (
                        typeof props.children === "string" &&
                        props.children.toLowerCase() === "metadata"
                      ) {
                        return null;
                      }
                      return (
                        <AnchoredHeading
                          as="h3"
                          className="text-base font-semibold text-foreground mt-7 mb-2"
                          {...props}
                        />
                      );
                    },
                    h4: (props: any) => (
                      <AnchoredHeading
                        as="h4"
                        className="text-sm font-semibold text-foreground mt-5 mb-1.5"
                        {...props}
                      />
                    ),

                    /* ── paragraph & inline ── */
                    p: (props: any) => (
                      <p className="text-sm text-muted-foreground leading-7 mb-4" {...props} />
                    ),
                    strong: (props: any) => (
                      <strong className="font-semibold text-foreground" {...props} />
                    ),
                    em: (props: any) => (
                      <em className="italic text-muted-foreground" {...props} />
                    ),
                    // Soporte para tachado (GFM)
                    del: (props: any) => (
                      <del className="line-through text-muted-foreground" {...props} />
                    ),
                    a: ({ href, children, ...props }: any) => (
                      <a
                        href={href}
                        className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors duration-100"
                        target={href?.startsWith("http") ? "_blank" : undefined}
                        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        {...props}
                      >
                        {children}
                      </a>
                    ),

                    /* ── lists ── */
                    ul: (props: any) => (
                      <ul
                        className="my-4 ml-5 space-y-1.5 list-disc marker:text-primary/70 text-sm text-muted-foreground"
                        {...props}
                      />
                    ),
                    ol: (props: any) => (
                      <ol
                        className="my-4 ml-5 space-y-1.5 list-decimal marker:text-primary/70 marker:font-medium text-sm text-muted-foreground"
                        {...props}
                      />
                    ),
                    li: (props: any) => <li className="leading-7 pl-1" {...props} />,

                    /* ── blockquote ── */
                    blockquote: (props: any) => (
                      <blockquote
                        className="my-5 pl-4 border-l-2 border-primary/60 bg-primary/5 rounded-r-md py-3 pr-4 text-sm text-muted-foreground italic [&>p]:mb-0"
                        {...props}
                      />
                    ),

                    /* ── code ── */
                    code: ({ className, children, ...props }: any) => {
                      const isBlock = /language-/.test(className ?? "");
                      if (isBlock) {
                        return (
                          <CodeBlock className={className} {...props}>
                            {children}
                          </CodeBlock>
                        );
                      }
                      return (
                        <code
                          className="rounded-md bg-muted border border-border/60 px-1.5 py-0.5 font-mono text-[0.8em] text-foreground"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }: any) => <>{children}</>,

                    /* ── horizontal rule ── */
                    hr: () => (
                      <hr className="my-8 border-none h-px bg-linear-to-r from-transparent via-border to-transparent" />
                    ),

                    /* ── image ── */
                    img: ({ src, alt, ...props }: any) => (
                      <span className="block my-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={alt ?? ""}
                          className="rounded-lg border border-border max-w-full h-auto shadow-sm"
                          {...props}
                        />
                        {alt && (
                          <span className="block text-center text-xs text-muted-foreground mt-2 italic">
                            {alt}
                          </span>
                        )}
                      </span>
                    ),

                    /* ── table (GFM Support) ── */
                    table: (props: any) => {
                      const isMetadataTable = props.children?.props?.children?.some(
                        (child: any) => {
                          const firstCell = child?.props?.children?.[0]?.props?.children;
                          return (
                            typeof firstCell === "string" &&
                            (firstCell.toLowerCase() === "key" ||
                              firstCell.toLowerCase() === "tags")
                          );
                        }
                      );

                      if (isMetadataTable) {
                        return null;
                      }

                      return (
                        <div className="my-6 overflow-x-auto rounded-lg border-2 border-primary/20 shadow-sm">
                          <table className="w-full border-collapse text-sm" {...props} />
                        </div>
                      );
                    },
                    thead: (props: any) => (
                      <thead
                        className="bg-linear-to-r from-primary/10 via-primary/5 to-accent/10 backdrop-blur"
                        {...props}
                      />
                    ),
                    // Añadido soporte para tbody que usa GFM
                    tbody: (props: any) => (
                      <tbody className="divide-y divide-border/30" {...props} />
                    ),
                    th: (props: any) => {
                      const text = typeof props.children === "string" ? props.children : "";
                      let colorClass = "text-foreground";

                      if (text.toLowerCase() === "type") colorClass = "text-blue-600 dark:text-blue-400";
                      else if (text.toLowerCase() === "required") colorClass = "text-orange-600 dark:text-orange-400";
                      else if (text.toLowerCase() === "default") colorClass = "text-purple-600 dark:text-purple-400";
                      else if (text.toLowerCase() === "prop") colorClass = "text-green-600 dark:text-green-400";

                      return (
                        <th
                          className={`border-b-2 border-primary/30 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide ${colorClass}`}
                          {...props}
                        />
                      );
                    },
                    td: (props: any) => (
                      <td
                        className="px-4 py-3 align-top text-sm text-muted-foreground"
                        {...props}
                      >
                        {decodeChildren(props.children)}
                      </td>
                    ),
                    tr: ({ children, ...props }: any) => (
                      <tr
                        className="transition-all hover:bg-primary/5 hover:shadow-sm even:bg-muted/30"
                        {...props}
                      >
                        {children}
                      </tr>
                    ),
                  }}
                />
              )}
            </article>
          </main>

          <aside className="hidden xl:block w-64 shrink-0 border-l border-border overflow-y-auto py-8 pr-5 pl-6 bg-background">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 sticky top-0 bg-background py-2">
              On this page
            </p>
            <nav>
              <ul className="space-y-1">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className={`
                        block text-xs leading-relaxed transition-colors duration-100 rounded-md px-2 py-1
                        hover:text-foreground hover:bg-accent
                        ${h.level === 1 ? "font-semibold text-foreground" : ""}
                        ${h.level === 2 ? "pl-0 text-muted-foreground" : ""}
                        ${h.level === 3 ? "pl-3 text-muted-foreground/70" : ""}
                      `}
                    >
                      {h.level === 3 && (
                        <ChevronRight size={10} className="inline-block mr-1 -mt-px opacity-40" />
                      )}
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}