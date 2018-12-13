export default (res, code = 0, msg = '') => {
  let cbp = {
    result: res,
    status: {
      status_code: code,
      status_reason: msg,
      unid: global.uuid
    }
  }
  global.infoLog.info('请求返回的参数--1----', res)
  global.infoLog.info('请求返回的参数--2----', cbp)
  global.infoLog.info(`-------end--------${global.uuid}---------------`)
  return cbp
}
