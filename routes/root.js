const Router = require('koa-router'),
    cognito = require('../services/aws.js'),
    { jwtDecode } = require('jwt-decode'),
    typeorm = require("typeorm");

require('../helpers/authentication.js')();
const router = new Router();

router.get('/',
    ctx => (ctx.body = 'This route has no authentication. It is free to go.'));

router.get('/checkAccess', authenticateJWT, (ctx) => {
    const decoded = jwtDecode(ctx.user.username);
    ctx.body = JSON.stringify({ message: 'Now you are authenticated. You have access to the groups: ' + decoded['cognito:groups'] });
})

router.get('/writer', authenticateJWT, (ctx) => {
    const decoded = jwtDecode(ctx.user.username);
    if (allowAccess(decoded, 'writer')) {
        ctx.body = JSON.stringify({ message: 'You have access to WRITER authenticated routes.' });
        return;
    }
    ctx.status = 401;
    ctx.body = JSON.stringify({ message: 'You don\'t have access to this route.' });
})

router.get('/reader', authenticateJWT, (ctx) => {
    const decoded = jwtDecode(ctx.user.username);
    if (allowAccess(decoded, 'reader')) {
        ctx.body = JSON.stringify({ message: 'You have access to READER authenticated routes.' });
        return;
    }
    ctx.status = 401;
    ctx.body = JSON.stringify({ message: 'You don\'t have access to this route.' });
})

router.get('/admin', authenticateJWT, (ctx) => {
    const decoded = jwtDecode(ctx.user.username);
    if (allowAccess(decoded, 'admin')) {
        ctx.body = JSON.stringify({ message: 'You have access to ADMIN authenticated routes.' });
        return;
    }
    ctx.status = 401;
    ctx.body = JSON.stringify({ message: 'You don\'t have access to this route.' });
})

module.exports = router;