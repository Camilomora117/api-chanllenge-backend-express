import path from "path";
import { middleware as OpenApiValidator } from "express-openapi-validator";
import { Application } from "express";

const oasValidator = (app: Application) => {
  app.use(
    OpenApiValidator({
      apiSpec: path.join(__dirname, '../utils/files/oas_api.json'),
      validateRequests: true,
      validateResponses: false,
    })
  );
};

export default oasValidator;
