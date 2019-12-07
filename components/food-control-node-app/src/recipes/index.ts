import Router from "koa-router";
import Koa from "koa";
import { Recipe } from "../models/Recipe";

let recipes: Recipe[] = [];

export const getRecipeRouter = (): Router => {
  const router = new Router();

  router.get("/api/recipes", (ctx: Koa.Context) => {
    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(recipes);
  });

  router.post("/api/recipe/:id", (ctx: Koa.Context) => {
    recipes[ctx.params.id] = ctx.request.body;

    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = ctx.request.body;
  });

  router.put("/api/recipe", (ctx: Koa.Context) => {
    recipes.push(ctx.request.body);

    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(ctx.request.body);
  });

  router.delete("/api/recipe/:id", (ctx: Koa.Context) => {
    recipes = recipes.filter((value, index) => String(index) !== ctx.params.id);

    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(recipes);
  });

  return router;
};
