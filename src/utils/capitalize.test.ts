import capitalize from "./capitalize";

test("capitalize returns a string, capitalizing the first letter of the passed string", () => {
  expect(capitalize("World")).toBe("World");
  expect(capitalize("Richard")).toBe("Richard");
  expect(capitalize("Academy")).toBe("Academy");
  expect(capitalize("academy")).toBe("Academy");
  expect(capitalize("world")).toBe("World");
  expect(capitalize("richard")).toBe("Richard");
});
