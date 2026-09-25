export default function BrandLogo({ className = '' }: { className?: string }) {
  const base = import.meta.env.BASE_URL;
  return <span className={`inline-block ${className}`}>
    <img src={`${base}logo-dark.svg`} alt="Henry Teran" width="180" height="40" className="block h-auto w-full dark:hidden" />
    <img src={`${base}logo-light.svg`} alt="Henry Teran" width="180" height="40" className="hidden h-auto w-full dark:block" />
  </span>;
}
