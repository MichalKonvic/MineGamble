import React, { FC } from 'react'
interface Props {
    params: {
        id: string
    }
}
const page:FC<Props> = ({params}) => {
  return (
    <div>
        {params.id}
    </div>
  )
}

export default page