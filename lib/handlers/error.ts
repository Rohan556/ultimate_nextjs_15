import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "../http-errors";
import { ZodError } from "zod";
import logger from "../logger";

export type ResponseType = "api" | "server";

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]>
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

export const handleError = (
  err: unknown,
  responseType: ResponseType = "server"
) => {
  if (err instanceof RequestError) {
    logger.error(
      { err },
      `${responseType.toUpperCase()} ERROR: ${err.message}`
    );
    return formatResponse(
      responseType,
      err.statusCode,
      err.message,
      err.errors
    );
  }

  if (err instanceof ZodError) {
    const validationError = new ValidationError(
      err.flatten().fieldErrors as Record<string, string[]>
    );

    logger.error({ err }, `Validation Error: ${validationError.message}`);

    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  if (err instanceof Error) {
    logger.error(err.message);
    return formatResponse(responseType, 500, err.message);
  }

  logger.error({ err }, "Internal Server Error");

  return formatResponse(responseType, 500, "Internal Server Error");
};
