import Koa from "koa";
import Router from "koa-router";

export function start(): void {
  const app = new Koa();
  const router = new Router();

  router.get("/hhh", (ctx: Koa.Context) => {
    ctx.status = 404;
    ctx.type = "html";
    ctx.body = "Hello World2019";
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(3000, () => {
    console.log("Наш сервер запустился по адресу http://localhost:3000");
  });
}
