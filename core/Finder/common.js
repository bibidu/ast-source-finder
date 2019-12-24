module.exports.hasFinish = (type) => {
  return type === 'Program'
}
module.exports.getParent = (path) => {
  return path.findParent(() => true)
}