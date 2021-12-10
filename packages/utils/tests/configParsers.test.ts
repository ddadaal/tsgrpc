import { parseKeyValue, parsePlaceholder } from "src/config";

it("parses placeholder correctly", async () => {
  const test = (str: string, obj: object, expected: string) => {
    expect(parsePlaceholder(str, obj)).toBe(expected);
  };

  test("123", {}, "123");
  test("123${a}123", {}, "123123");
  test("123${a}123", { a: "4" }, "1234123");
  test("123${a123_4}", { a123_4: "haha " }, "123haha ");
});

it("parses key values correctly", async () => {
  const test = (str: string, expected: object) => {
    expect(parseKeyValue(str)).toEqual(expected);
  };

  test("", {});
  test("test=t", { test: "t" });
  test("t_est=t_123", { t_est: "t_123" });
  test("t_est=t_123,a=b", { t_est: "t_123", a: "b" });
  test("a=b, a=c", { a: "c" });
  test("a=,b=2", { a: "", b: "2" });
  test("  a = bbb   , cc = dddf ", { a: "bbb", cc: "dddf" });
});
