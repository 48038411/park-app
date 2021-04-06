// 从基础库2.7.1开始支持
const log = wx.getRealtimeLogManager? wx.getRealtimeLogManager() : null;
module.exports = {
  info() {
    if (!log) return
    log.info.apply(log, arguments)
  },
  warn() {
    if (!log) return
    log.warn.apply(log, arguments)
  },
  error() {
    if (!log) return
    log.error.apply(log, arguments)
  },
  // 从基础库2.7.3开始支持
  setFilterMsg(msg) {
    if (!log || !log.setFilterMsg) return
    if (typeof msg !== 'string') return
    log.setFilterMsg(msg)
  }
}