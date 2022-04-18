import { Router } from "express";

const routes = Router();

routes.get("/", (request, response) =>
  response.json({
    message: "Helffffffffffffffffffffffffffffffffffffflo GoStack!!!",
  })
);

export default routes;
