const isAuthorized = (req) => {
  if(req.query.ok) return true
  return false
}

module.exports = {
  isAuthorized
}