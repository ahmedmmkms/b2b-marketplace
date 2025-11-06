// app/(public)/catalog/page.tsx
import { redirect } from 'next/navigation';

export default function CatalogPage() {
  redirect('/en/catalog');
}
