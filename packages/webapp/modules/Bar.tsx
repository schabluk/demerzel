import * as React from 'react'

export interface IBar {
  title: string
  level?: number
}

const Bar = ({ title, level = 0 }: IBar) => (
  <div>
    Hello from {title} on level {level}
  </div>
)

export default Bar
