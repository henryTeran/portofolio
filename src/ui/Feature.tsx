import { ReactNode } from 'react';
export default function Feature({icon,title,children}:{icon:ReactNode,title:string,children:ReactNode}){
  return (
    <div className="card hover:-translate-y-0.5 transition">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center">{icon}</div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-[var(--muted)] mt-1">{children}</p>
        </div>
      </div>
    </div>
  );
}
