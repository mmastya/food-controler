import Koa from "koa";
import Router from "koa-router";
import { products, meal } from "./seed-data";

export function start(): void {
  const app = new Koa();
  const router = new Router();

  router.get("/api/products", (ctx: Koa.Context) => {
    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(products);
  });

  router.get("/api/meal", (ctx: Koa.Context) => {
    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(meal);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(3000, () => {
    console.log("Наш сервер запустился по адресу http://localhost:3000");
  });
}
