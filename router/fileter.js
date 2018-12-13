const tokenFilter = (url) => {
    switch (url) {
        case '/v1/user/userSignFu': {
            return true
        }
        case '/v1/user/regist': {
            return true
        }
        case '/v1/user/login': {
            return true
        }
        case '/v1/features/upload': {
            return true
        }
    }
    return false
}

const filterFN = async (obj, ctx, next) => {
   /* let flag = false
    if (ctx.params.token && ctx.params.userId) {
        let tokenEntity = await ctx.findOne('userToken', {where: {userId: ctx.params.userId}})
        if (ctx.params.token === tokenEntity.token) {
            flag = true
        }
    }
    if (!flag) {
        if (!tokenFilter(ctx.request.url)) {
            ctx.response.status = ctx.$consts.STATE_CODE.LOGIIN
            ctx.response.body = ctx.parsebody('登陆失效', ctx.$consts.STATE_CODE.LOGIIN)
            return
        }
    }*/
    await obj.callback(ctx, next)
}

export default filterFN
