const log4js = require('log4js')
const path = require('path')
const uuid = require('node-uuid')
const logFN = (app) => {
    // 添加打印日志
    log4js.configure({
        appenders: {
            console: {type: 'console'},
            info: {type: 'dateFile', filename: `log/info.log`},
            err: {type: 'dateFile', filename: `log/err.log`}
        },
        categories: {
            default: {
                appenders: ['console'], level: 'all'
            },
            debug: {
                appenders: ['console'], level: 'debug'
            },
            info: {
                appenders: ['console', 'info'], level: 'info'
            },
            error: {
                appenders: ['console', 'err'], level: 'error'
            }
        }
    })
    // 其他的log
    let otherLog = log4js.getLogger()
    // 错误级别的log
    let errLog = log4js.getLogger('error')
    // debug调试级别的log
    let infoLog = log4js.getLogger('info')
    app.context.errLog = global.errLog = errLog
    app.context.infoLog = global.infoLog = infoLog
    app.context.otherLog = global.otherLog = otherLog
    // debugLogger.debug('我是调试日志')
    // errLogger.error('我是错误日志')
    // otherLogger.info('我是info')
}

const koaBody = {
    multipart: true, // 支持文件上传
    // encoding: 'utf-8',
    formidable: {
        uploadDir: path.join(__dirname, 'static/upload/'), // 设置文件上传目录
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => { // 文件上传前的设置
        }
    }
}

const reqParamsFN = async (ctx, next) => {
    ctx.uuid = global.uuid = uuid.v4()
    ctx.infoLog.info(`-------start--------${ctx.uuid}---------------`)
    let getParams = ctx.query
    let postParams = ctx.request.body
    if (getParams) {
        if (getParams.page) {
            getParams.pageSize = parseInt(getParams.pageSize)
            getParams.limit = getParams.pageSize || 10
            getParams.offset = (getParams.page - 1) * 10
        }
    }
    if (postParams) {
        for (let pk in postParams) {
            postParams[pk] = JSON.parse(postParams[pk])
        }
    }
    ctx.params = Object.keys(getParams).length ? getParams : postParams
    ctx.params.token = ctx.request.header.token
    ctx.params.userId = ctx.request.header.userid
    ctx.infoLog.info(`本次请求的参数----`, ctx.params)
    await next()
}

const staticFN = () => path.join(__dirname, './static')

const indexFN = async (ctx, next) => {
    if (ctx.request.path === '/index' || ctx.request.path === '/index.html') {
        ctx.response.redirect('/')
    } else {
        await next()
    }
}
export default {
    logFN,
    koaBody,
    reqParamsFN,
    staticFN,
    indexFN
}
