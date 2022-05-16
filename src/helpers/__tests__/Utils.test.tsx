import { capitalize, encodeObjToQuery } from "../Utils";

test("capitalize works properly", async () => {
  const res1 = capitalize("one");
  const res2 = capitalize("TWO");
  const res3 = capitalize("3");

  expect(res1).toEqual("One");
  expect(res2).toEqual("TWO");
  expect(res3).toEqual("3");
});

test("encodeObjToQuery works properly", async () => {
  expect(encodeObjToQuery({ a: "a", b: "1", c: "true" })).toEqual(
    "a=a&b=1&c=true"
  );
});
