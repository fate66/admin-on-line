import filterFN from './fileter'

const fs = require('fs')
const path = require('path')
const koaRouterApp = require('koa-router')()

const routerFiles = fs.readdirSync(path.resolve(__dirname, 'api'))

const catchFN = async (obj, ctx, next) => {
  try {
    await filterFN(obj, ctx, next)
  } catch (e) {
    ctx.response.status = ctx.$consts.STATE_CODE.SERVER_ERROR
    ctx.response.body = ctx.parsebody('', ctx.$consts.STATE_CODE.SERVER_ERROR, e)
  }
}
routerFiles.map(item => {
  const filesList = fs.readdirSync(`${__dirname}/api/${item}`)
  const files = filesList.filter(item => {
    if (item.endsWith('.js')) {
      return item
    }
  })
  files.forEach(secItem => {
    let file = require(`./api/${item}/${secItem}`).default
    for (let key in file) {
      let obj = file[key]
      switch (obj.type) {
        case 'GET': {
          koaRouterApp.get(obj.url, async (ctx, next) => {
            await catchFN(obj, ctx, next)
            await next()
          })
          break
        }
        case 'POST': {
          koaRouterApp.post(obj.url, async (ctx, next) => {
            await catchFN(obj, ctx, next)
            await next()
          })
          break
        }
      }
    }
  })
})
export default koaRouterApp
