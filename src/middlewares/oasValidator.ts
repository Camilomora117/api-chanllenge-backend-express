import { OpenApiValidator } from "express-openapi-validate";
import fs from "fs";
import path from "path";

export default class OpenApiValidatorProvider {
  private static validatorInstance: OpenApiValidator;

  /**
   * Retorna una instancia de OpenApiValidator cargando el OAS JSON.
   * Usa Singleton para evitar múltiples lecturas del archivo JSON.
   */
  public static getValidator(): OpenApiValidator {
    if (!this.validatorInstance) {
      const openApiSpecificationFile = path.join(__dirname, "../utils/files/oas_api.json");
      const openApiSpecification = fs.readFileSync(openApiSpecificationFile, "utf-8");
      const openApiDocument = JSON.parse(openApiSpecification);
      this.validatorInstance = new OpenApiValidator(openApiDocument);
    }
    return this.validatorInstance;
  }
}