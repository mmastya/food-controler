import Router from "koa-router";
import Koa from "koa";
import { Product } from "../models/Product";

let products: Product[] = [
  {
    name: "bread",
    calories: 100,
    fat: 100,
    protein: 100,
    carb: 100,
  },
  {
    name: "apple",
    calories: 100,
    fat: 100,
    protein: 100,
    carb: 100,
  },
  {
    name: "milk",
    calories: 100,
    fat: 100,
    protein: 100,
    carb: 100,
  },
  {
    name: "banana",
    calories: 100,
    fat: 100,
    protein: 100,
    carb: 100,
  },
  {
    name: "pepsi",
    calories: 100,
    fat: 100,
    protein: 100,
    carb: 100,
  },
];

export const getProductRouter = (): Router => {
  const router = new Router();

  router.get("/api/products", (ctx: Koa.Context) => {
    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(products);
  });

  router.post("/api/product/:id", (ctx: Koa.Context) => {
    console.log(ctx.params.id);
    console.log(ctx.request.body);

    products[ctx.params.id] = ctx.request.body;

    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(ctx.request.body);
  });

  router.put("/api/product", (ctx: Koa.Context) => {
    products.push(ctx.request.body);

    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(ctx.request.body);
  });

  router.delete("/api/product/:id", (ctx: Koa.Context) => {
    products = products.filter((value, index) => String(index) !== ctx.params.id);

    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(products);
  });

  return router;
};
