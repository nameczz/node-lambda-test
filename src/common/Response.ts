import { ERROR_CODE } from "../types/Error";

export const genLambdaResponse = (status: ERROR_CODE, data: any) => {
  return JSON.stringify({
    statusCode: status,
    body: {
      statusCode: status,
      data,
    },
  });
};
