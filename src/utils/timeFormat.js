// 格式化时间
const timeFormat = (time) => {
  const timeToFormat = new Date(time)
  const year = timeToFormat.getFullYear()
  const month = timeToFormat.getMonth() + 1
  const day = timeToFormat.getDate()
  // 补0
  function add0(item) {
    return item > 10 ? item : '0' + item
  }
  return year + '-' + add0(month) + '-' + add0(day)
}

export default timeFormat
