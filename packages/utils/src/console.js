const COLORS = {
  info: ['#1E88E5', '#90CAF9'],
  success: ['#388E3C', '#A5D6A7'],
  error: ['#E53935', '#EF9A9A'],
  warning: ['#F4511E', '#FFAB91']
}

const print = Object.entries(COLORS).reduce(
  (api, [name, colors]) => ({
    [name]: (shortLabel, longerMessage, optionalSuffix = '') =>
      console.log(
        `%c${shortLabel}%c${longerMessage}%c${optionalSuffix}`,
        `background-color: ${colors[0]}; color: #fff; padding: 2px 4px; font-weight: bold;`,
        `background-color: ${colors[1]}; color: #000; padding: 2px 4px;`,
        optionalSuffix !== ''
          ? `background-color: ${colors[0]}; color: #fff; padding: 2px 4px; font-weight: bold;`
          : ''
      ),
    ...api
  }), {}
)

export default print
