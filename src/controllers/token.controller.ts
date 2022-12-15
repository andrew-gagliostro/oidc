import express from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Controller, Get, Query, Request, Route, SuccessResponse, Post , FormField} from "tsoa";
import TokenService from "../services/token.services";
import { token } from "../models/jwt.model";

@Route("/")
export class TokenController extends Controller {

  private tokenService: TokenService = new TokenService();

  /**
   * @summary Endpoint for client to retreive JWT for authentication with Identity Provider
   * @param code Authorization code that client retrieved through /authorization endpoint
   * @param code_verifier Code verifier that is to match code challenge associated with 'code' according to the PKCE S256 Code Challenge method
   * @returns 
   */
  @Post("/token")
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  public async getAuthorization(
    @Request() request: express.Request,
    @FormField() code: string,
    @FormField() code_verifier: string,
    @FormField() grant_type?: string,
    @FormField() redirect_uri?: string
  ): Promise<token> {
    let token: string = await this.tokenService.generateToken(code, code_verifier);
    return {id_token: token}
  }
}