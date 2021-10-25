import { Client } from "@elastic/elasticsearch";
import { ES_URL } from "../const";
import { ERROR_CODE } from "../types/Error";
import { genLambdaResponse } from "./Response";

let esClient: unknown = null;
async function GenClient() {
  try {
    esClient = new Client({
      node: ES_URL,
    });
  } catch (e: any) {
    return genLambdaResponse(ERROR_CODE.BAD_REQUEST, "Connect to ES failed");
  }
}

if (!esClient) {
  GenClient();
}

export default esClient as Client;
