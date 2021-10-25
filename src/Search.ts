import elasticSearchClient from "./common/Client";
import { genLambdaResponse } from "./common/Response";
import { ERROR_CODE } from "./types/Error";

export async function handler(data: any) {
  try {
    const res = await elasticSearchClient.search(data);
    return genLambdaResponse(ERROR_CODE.SUCCESS, res);
  } catch (e: any) {
    return genLambdaResponse(
      ERROR_CODE.BAD_REQUEST,
      e.meta ? e.meta.body.error.reason : "Search Failed"
    );
  }
}
