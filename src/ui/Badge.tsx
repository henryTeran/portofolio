export default function Badge({children}:{children:string|React.ReactNode}){
  return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs border border-white/10 bg-white/5">{children}</span>;
}
