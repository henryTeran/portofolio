export default function PillButton({children,href='#'}:{children:React.ReactNode,href?:string}){
  return <a href={href} className="btn">{children}</a>;
}
