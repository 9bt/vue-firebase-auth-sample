import Koa, { Context } from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import bearerToken from 'koa-bearer-token';
import * as admin from 'firebase-admin';

import router from '@/router';

admin.initializeApp({
  projectId: FIREBASE_PROJECT_ID,
  credential: admin.credential.applicationDefault(),
});

const app = new Koa();
app.use(bodyParser());
app.use(bearerToken());
app.use(cors({
  origin: CLIENT_BASE_PATH,
  credentials: true,
}));
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

(async () => {
  app.use(router.routes());
})();

app.listen(process.env.PORT || 7777);
