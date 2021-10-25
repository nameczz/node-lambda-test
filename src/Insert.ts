import elasticSearchClient from "./common/Client";
import { genLambdaResponse } from "./common/Response";
import { ERROR_CODE } from "./types/Error";

export async function handler(data: any) {
  const { index, fileId, content, metadata = {} } = data;
  if (!index || !fileId) {
    return genLambdaResponse(
      ERROR_CODE.BAD_REQUEST,
      "index and fileId are required"
    );
  }
  // Check document exist or not
  let isIdOrIndexExist = false;
  try {
    const existRes = await elasticSearchClient.exists({
      id: fileId,
      index,
    });
    isIdOrIndexExist = existRes.body;
  } catch (error) {
    isIdOrIndexExist = false;
  }

  try {
    let res = null;
    if (isIdOrIndexExist) {
      res = await elasticSearchClient.update({
        id: fileId,
        index,
        body: {
          doc: {
            name: fileId,
            content,
            ...metadata,
          },
        },
      });
      return res;
    }

    res = await elasticSearchClient.index({
      index,
      id: fileId,
      body: {
        name: fileId,
        content,
        ...metadata,
      },
    });
    return genLambdaResponse(ERROR_CODE.SUCCESS, res);
  } catch (e: any) {
    return genLambdaResponse(
      ERROR_CODE.BAD_REQUEST,
      e.meta
        ? e.meta.body.error.reason
        : `${isIdOrIndexExist ? "Update" : "Create"} Failed`
    );
  }
}
