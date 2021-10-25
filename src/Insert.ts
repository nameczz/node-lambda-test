import elasticSearchClient from "./common/Client";

export async function handler(data: any) {
  const { index, fileId, content, metadata = {} } = data;
  if (!index || !fileId) {
    throw new Error("Must index and fileId.");
  }
  try {
    // Check document exist or not
    let isIdOrIndexExist = false;
    try {
      const existRes = await elasticSearchClient.exists({
        id: fileId,
        index,
      });
      console.log("---- exist ---", existRes);
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
      console.log("----update---", res);
      return res;
    } catch (e: any) {
      throw new Error(e.meta ? e.meta.body.error.reason : "error");
    }
  } catch (error) {
    console.log("---error---", error);
  }
}
