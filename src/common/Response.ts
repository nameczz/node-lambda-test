import { ERROR_CODE } from "../types/Error";

export const genLambdaResponse = (status: ERROR_CODE, data: any) => {
  return {
    statusCode: status,
    body: JSON.stringify({
      statusCode: status,
      data,
    }),
  };
};
