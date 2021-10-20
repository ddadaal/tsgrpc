import { ensureNotUndefined } from "@ddadaal/tsgrpc-utils";
import * as grpc from "@grpc/grpc-js";

it("checks for undefined value", () => {
  interface TestInterface {
    a: string;
    b?: number;
  }

  const obj: TestInterface = { a: "12" };

  let ex;
  try {
    ensureNotUndefined(obj, ["a", "b"]);
  } catch (e) {
    ex = e;
  }

  expect(ex.code).toBe(grpc.status.INVALID_ARGUMENT);
});
