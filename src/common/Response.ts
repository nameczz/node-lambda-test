import { ERROR_CODE } from "../types/Error";

export const genLambdaResponse = (status: ERROR_CODE, body: any) => {
  return JSON.stringify({
    statusCode: status,
    body,
  });
};
