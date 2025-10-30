// app/(public)/catalog/page.tsx
import CatalogList from '@/components/CatalogList';

const CatalogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CatalogList />
    </div>
  );
};

export default CatalogPage;