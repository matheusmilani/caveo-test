const Router = require('koa-router'),
    cognito = require('../services/aws.js'),
    jwt = require('jsonwebtoken'),
    { koaBody } = require('koa-body');

const router = new Router();

router.post('/signup', koaBody(), async (ctx) => {
    const { username, password, email } = ctx.request.body;

    const params = {
        ClientId: process.env.AWS_CLIENT_ID,
        Username: username,
        Password: password,
        UserAttributes: [{
            Name: 'email',
            Value: email
        }]
    };

    try {
        const data = await cognito.signUp(params).promise();
        ctx.body = JSON.stringify({message: "Create! Please confirm with the verificaiton code on your email."});
    } catch (err) {
        ctx.response.status = 400
        ctx.body = JSON.stringify(err);
    }
});


router.post('/confirm', koaBody(), async (ctx) => {
    const { username, confirmationCode } = ctx.request.body;

    const params = {
        ClientId: process.env.AWS_CLIENT_ID,
        Username: username,
        ConfirmationCode: confirmationCode
    }

    try {
        const data = await cognito.confirmSignUp(params).promise();
        ctx.body = JSON.stringify({message: "Confirmed!"});
    } catch (err) {
        ctx.response.status = 400
        ctx.body = JSON.stringify(err);
    }
});

router.post('/signin', koaBody(), async (ctx) => {
    const { username, password } = ctx.request.body;

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.AWS_CLIENT_ID,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password
        }
    };

    try {
        const data = await cognito.initiateAuth(params).promise();
        const token = jwt.sign({ username: data.AuthenticationResult.AccessToken }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_TOKEN_EXPIRATION})
        ctx.body = JSON.stringify({message: token});
    } catch (err) {
        ctx.response.status = 400
        ctx.body = JSON.stringify(err);
    }
});

router.post('/signout', authenticateJWT, async (ctx) => {
    const token  = ctx.request.headers.authorization;

    const params = {
        AccessToken: token
    }

    try {
        await cognito.globalSignOut(params).promise();
        ctx.body = JSON.stringify({message: "Logged out"});
    } catch (err) {
        ctx.response.status = 400
        ctx.body = JSON.stringify(err);
    }
});

router.post('/addToGroup', koaBody(), async (ctx) => {
    const { groupName, username } = ctx.request.body;

    const params = {
        GroupName: groupName,
        UserPoolId: process.env.AWS_USER_POOL_ID,
        Username: username,
    };
    
    try {
        await cognito.adminAddUserToGroup(params).promise();
        ctx.body = JSON.stringify({message: "Added to group " + groupName});
    } catch (err) {
        ctx.response.status = 400
        ctx.body = JSON.stringify(err);
    }
    
});

module.exports = router;