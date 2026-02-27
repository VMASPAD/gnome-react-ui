// app/docs/page.tsx – redirect to the first doc
import { redirect } from "next/navigation";
import { getDocSlugs } from "./lib/docs";

export default function DocsIndexPage() {
  const slugs = getDocSlugs();
  const first = slugs[0] ?? "Accordion";
  redirect(`/docs/${first}`);
}