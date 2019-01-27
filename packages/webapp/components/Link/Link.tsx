import Link from 'next/link'
import React from 'react'

export interface ILink {
  as?: string
  href: string
  children: React.ReactNode
}

export default ({ children, ...rest }: ILink) => {
  return (
    <Link {...rest}>
      <a>{children}</a>
    </Link>
  )
}
