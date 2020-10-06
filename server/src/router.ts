import Router from 'koa-router';
import * as admin from 'firebase-admin';

async function ensureAuthentication(ctx: any, next: Function): Promise<void> {
  const idToken = ctx.request.token;
  if (!idToken) {
    ctx.status = 401;
    return;
  }

  const user = await admin.auth().verifyIdToken(idToken).catch((e) => {
    return null;
  });

  if (!user) {
    ctx.status = 401;
    return;
  }

  await next();
}

const router = new Router();
router.get('/', (ctx: any) => {});
router.post('/login', ensureAuthentication, (ctx: any) => {
  ctx.status = 204;
});

export default router;
