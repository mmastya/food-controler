import Koa from "koa";
import Router from "koa-router";
import { getProductRouter } from "./products";
import koaBody from "koa-body";
import { getMealRouter } from "./meals";

export function start(): void {
  const app = new Koa();

  app.use(koaBody());

  const router = new Router();

  const productRouter = getProductRouter();
  const mealRouter = getMealRouter();

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.use(productRouter.routes());
  app.use(productRouter.allowedMethods());

  app.use(mealRouter.routes());
  app.use(mealRouter.allowedMethods());

  app.listen(3000, () => {
    console.log("Наш сервер запустился по адресу http://localhost:3000");
  });
}
