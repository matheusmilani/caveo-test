const Koa = require('koa'),
      authenticate_routes = require('./routes/authenticate.js'),
      root_routes = require('./routes/root.js'),
      dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(authenticate_routes.routes())
    .use(authenticate_routes.allowedMethods())
    .use(root_routes.routes())
    .use(root_routes.allowedMethods());

app.listen(process.env.PORT);