export default class Features {
    constructor() {

    }
    uploadFiles(ctx) {
        var execSync = require('child_process').execSync;
        var cmdNpm = 'npm run build'
        let res = execSync(cmdNpm, {cwd: '/Users/ft/Desktop/code/myproject/web-admin'})
        let str = `<div style="white-space: pre-wrap;">${res.toString()}</div>`
        ctx.response.body = str
    }
}
