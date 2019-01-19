import React from 'react'
import Link from 'next/link'

export interface ILink {
  as?: string,
  href: string,
  children: React.ReactNode
}

export default ({ children, ...rest }: ILink) => {
  return (
    <Link {...rest}>
      <a>{ children }</a>
    </Link>
  )
}
