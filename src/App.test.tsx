import { kToF } from "./App"

test("Conversion from Kelvin to F works", () => {
  expect(kToF(0)).toBe("-460")
  expect(kToF(298)).toBe("77")
})
