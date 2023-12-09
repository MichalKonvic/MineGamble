import { ComponentProps, FC } from 'react'
const NumberInput:FC<ComponentProps<"input">> = ({id,placeholder,...rest}) => {
  return (
    <div className='flex flex-col gap-1'>
        <label htmlFor={id} className='text-white text-xs'>
            {placeholder}
        </label>
        <input {...rest} id={id} className='px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-300 duration-100'/>
    </div>
  )
}

export default NumberInput