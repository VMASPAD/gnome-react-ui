import { getAllDocs } from './getDocs';
import DocsClient from './DocsClient';
 

export default async function DocsPage() {
  const docs = await getAllDocs();
  return <DocsClient docs={docs} />;
}
