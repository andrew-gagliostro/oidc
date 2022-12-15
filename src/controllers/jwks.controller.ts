import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Controller, Example, Get, Route, SuccessResponse } from "tsoa";
import { jwks, key } from "../models/jwks.model";
import JwksService from "../services/jwks.services";

@Route("/jwks.json")
export class JwksController extends Controller {

  private jwksService: JwksService = new JwksService();
  /**
   * @summary Returns a further JSON document representing the public key of JSON Web Key Set
   */
  @Example<jwks>({
    keys: [
      {
        crv: "P-256",
        ext: true,
        key_ops: ["verify"],
        kty: "EC",
        x: "some-x-val",
        y: "some-y-val",
      },
    ],
  })
  @Get("/")
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async getJwks(): Promise<jwks> {
    return await this.jwksService.getJwks();
  }
}
