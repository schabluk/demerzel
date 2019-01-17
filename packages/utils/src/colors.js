export default {
  'mA': '#a084be',
  'mB': '#ffde86',
  'mC': '#fbc7c5',
  'mD': '#b9e4e0',
  'mE': '#b4e5fa',
  'mF': '#d7bddd',
  'mG': '#deefc7',
  'mH': '#ffe0bc',
  'mI': '#f7c8de',
  'mJ': '#bee2c7',
  'mK': '#b7caea',
  'mL': '#bbb6dd',
  'mM': '#e2ea95',
  'mN': '#fac6b1',
  'mO': '#f696ab',
  'mP': '#71ccde',
  'mQ': '#75b7e6',
  'mR': '#dbbdc2',
  'mS': '#a1d29b',
  'mT': '#fcab7c',
  'mU': '#f59589',
  'mV': '#7bcab1',
  'mW': '#8091ca',
  'mX': '#a084be',
  'mY': 'white',
  'mZ': 'white'
}

export const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  if (alpha) return `rgba(${r}, ${g}, ${b}, ${alpha})`

  return `rgb(${r}, ${g}, ${b})`
}
