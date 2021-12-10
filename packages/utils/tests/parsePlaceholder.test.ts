import { parsePlaceholder } from "src/config";

it("parses placeholder correctly", async () => {
  const test = (str: string, obj: object, expected: string) => {
    expect(parsePlaceholder(str, obj)).toBe(expected);
  };

  test("123", {}, "123");
  test("123${a}123", {}, "123123");
  test("123${a}123", { a: "4" }, "1234123");
  test("123${a123_4}", { a123_4: "haha " }, "123haha ");
});
