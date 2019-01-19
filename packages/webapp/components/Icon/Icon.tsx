import React from 'react'

export declare type IconSize =
  'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '5x' | '7x' | '10x'

export declare type IconType =
  'fas' | // solid
  'far' | // regular
  'fal' | // light
  'fab' // brands

export interface InterfaceIcon {
  name: string,
  type?: IconType,
  size?: IconSize,
  title?: string
}

const Icon = ({ name, type = 'fas', size = '1x', title = 'icon' }: InterfaceIcon) => {
  return (
    <i className={`${type} fa-${name} fa-${size} fa-fw`} title={title} />
  )
}

export default Icon
