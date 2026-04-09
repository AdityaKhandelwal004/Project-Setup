/* eslint-disable */
import { routes, featureLevel, put } from "../utils/index.ts";
import { Right } from "../auth/index.ts";

export default () => {
  put(
    featureLevel.development,
    Right.general.TEST_API,
    routes.test.TEST_ACTION,
    async () => {
      return {
        message: "ok",
      };
    }
  );
};
