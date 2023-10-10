import CategoryDropdown from '@/components/Dropdowns/CategoryDropdown';
import PromoSection from '@/components/PromoSection';

export default function Home() {
  return (
    <div className="mt-2">
      <CategoryDropdown />
      <div className="w-full">
        <PromoSection />
      </div>
    </div>
  );
}
