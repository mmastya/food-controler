import Router from "koa-router";
import Koa from "koa";
import { Meal } from "../models/Meal";

export let meals: Meal[] = [
  {
    name: "Chicken soup",
    calories: 150,
    grams: 250,
    vegetarian: "no",
  },
  {
    name: "Vegetable stew",
    calories: 50,
    grams: 100,
    vegetarian: "yes",
  },
  {
    name: "Apple pie",
    calories: 350,
    grams: 100,
    vegetarian: "yes",
  },
  {
    name: "Lasagna",
    calories: 450,
    grams: 250,
    vegetarian: "no",
  },
  {
    name: "Pork knuckle",
    calories: 350,
    grams: 150,
    vegetarian: "no",
  },
];

export const getMealRouter = (): Router => {
  const router = new Router();

  router.get("/api/meals", (ctx: Koa.Context) => {
    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(meals);
  });

  router.post("/api/meal/:id", (ctx: Koa.Context) => {
    console.log(ctx.params.id);
    console.log(ctx.request.body);

    meals[ctx.params.id] = ctx.request.body;

    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(ctx.request.body);
  });

  router.put("/api/meal/", (ctx: Koa.Context) => {
    meals.push(ctx.request.body);

    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(ctx.request.body);
  });

  router.delete("/api/meal/:id", (ctx: Koa.Context) => {
    meals = meals.filter((value, index) => String(index) !== ctx.params.id);

    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(meals);
  });

  return router;
};
