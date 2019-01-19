import React from 'react'
import Link from 'next/link'

import css from './Navigation.scss'

const Navigation = () => {
  return (
    <div className={css.links}>
      <Link href='/'>
        <a>Main</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
    </div>
  )
}

export default Navigation
