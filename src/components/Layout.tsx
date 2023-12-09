import { ReactNode, FC } from "react"

interface Props {
    children: ReactNode
}
const Layout: FC<Props> = ({children}) => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-12 bg-slate-950 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
    </div>
  )
}

export default Layout