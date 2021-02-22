import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'

prefix.reg(log)

prefix.apply(log, {
  format(level, name, timestamp) {
    return `[${timestamp}] ${level.toUpperCase()} ${name}:`
  },
})

export class PrefixLogger {
  public static getInstance(name?: string) {
    if (name) {
      return log.getLogger(name)
    }

    return log
  }
  public static enableAll() {
    log.enableAll()
  }
  public static disableAll() {
    log.disableAll()
  }
}
