import { ComponentProps, FC } from 'react'
const Button:FC<ComponentProps<"button">> = ({children, className,...rest}) => {
  return (
    <button {...rest} className={`px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-300 duration-100 ${className? className:""}`}>
        {children}
    </button>
  )
}

export default Button