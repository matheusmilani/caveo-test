const jwt = require('jsonwebtoken'),
    { jwtDecode } = require('jwt-decode');

module.exports = function() { 
    this.allowAccess = function(user, profile) { return (user['cognito:groups'].includes('admin') || user['cognito:groups'].includes(profile)) },
    this.authenticateJWT = (ctx, next) => {
        try {
            const token = ctx.headers.authorization;
    
            if (token) {   
                jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
                        if (err || user == undefined) {
                            ctx.response.status = 400
                            ctx.body = JSON.stringify(err);
                            return;
                        };
    
                        if (jwtDecode(user.username)['cognito:groups'] !== undefined) {
                            ctx.user = user;
                            ctx.response.status = 200
                            return next();
                        };
                        ctx.response.status = 403
                        ctx.body = JSON.stringify({message: "You don't have any group associated. Please add this user to a group: admin, writer or reader."});
                        return;
                        
                    });        
            } else {
                ctx.response.status = 401
                ctx.body = JSON.stringify({ message: "Not Allowed" });
                return;
            }
        } catch (err) {
            ctx.response.status = 400
            ctx.body = JSON.stringify(err);
            return;
        }
    };
}