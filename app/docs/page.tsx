// app/docs/page.tsx
import { getAllDocs } from './getDocs';
import DocsClient from './DocsClient';
import * as React from 'react';

export const dynamic = 'force-dynamic';

export default async function page() {
  const docs = await getAllDocs();
  return <DocsClient docs={docs} />;
}