export const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText()

  let matchArr, start
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index
    callback(start, start + matchArr[0].length)
  }
}

export const findInBlock = (regex, contentBlock) => {
  const text = contentBlock.getText()
  const ranges = []

  let matchArr
  while ((matchArr = regex.exec(text)) !== null) {
    ranges.push({
      offsetStart: matchArr.index,
      offsetEnd: matchArr.index + matchArr[0].length,
    })
  }

  return ranges
}
