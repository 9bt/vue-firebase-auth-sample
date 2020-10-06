import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';

import router from '@/router';

const app = new Koa();
(async () => {
  app.use(router.routes());
})();

app.use(bodyParser());
app.use(
  async (ctx: Context, next: Function): Promise<void> => {
    try {
      await next();
    } catch (err) {
      console.error(err);
      ctx.status = err.statusCode || 500;
      ctx.body = err.message;
    }
  }
);
app.listen(process.env.PORT || 7777);
