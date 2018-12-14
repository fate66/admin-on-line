export default class Features {
    constructor() {

    }
    uploadFiles(ctx) {
        var execSync = require('child_process').execSync;
        var cmdNpm = 'npm run build'


        let error = ''
        let res = ''
        try {
            execSync('git pull', {cwd: '/root/web-admin'})
        } catch (e) {
            ctx.infoLog.info(e)
            error = e
        }
        if (!error) {
            try {
                res = execSync(cmdNpm, {cwd: '/root/web-admin'})
            } catch (e) {
                ctx.infoLog.info(e)
                error = e
            }
        }
        if (!error) {
            try {
                execSync('cp -rf /root/web-admin/dist/* /root/admin-server/static')
            } catch (e) {
                ctx.infoLog.info(e)
                error = e
            }
        }
        if (error) {
            let cache = []
            error = JSON.stringify(error, (key, val) => {
                if (val && typeof val === 'object') {
                    if (cache.indexOf(val) !== -1) {
                        try {
                            return JSON.parse(JSON.stringify(val))
                        } catch (e) {
                            return 'Circular'
                        }
                    }
                    cache.push(val)
                }
                return val
            })
            cache = ''
            ctx.response.body = error
        } else {
            ctx.response.body = `<div style="white-space: pre-wrap;">${res.toString()}</div>`
        }
    }
}
