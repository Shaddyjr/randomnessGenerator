import GenerateRandom from "../src/generateRandom/generateRandom";
import { assert } from "chai";

describe('GenerateRandom', function() {
  const generateRandom = new GenerateRandom;
  xdescribe('.name()', function() {
    xit('should return an array', function() {
      assert(Array.isArray(generateRandom.names()));
    });
  });
});