import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "../http-errors";
import { ZodError } from "zod";

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

    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  if (err instanceof Error) {
    return formatResponse(responseType, 500, err.message);
  }

  return formatResponse(responseType, 500, "Internal Server Error");
};
