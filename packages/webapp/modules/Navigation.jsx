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
      <Link href='/markdown'>
        <a>Markdown</a>
      </Link>
      <Link href='/editor'>
        <a>Editor</a>
      </Link>
      <Link href='/speech'>
        <a>Speech</a>
      </Link>
      <Link href='/poses'>
        <a>Poses</a>
      </Link>
    </div>
  )
}

export default Navigation
