import assert from "assert";
import { range } from "@fxts/core";

assert.strict.deepEqual([...range(3)], [0, 1, 2]);
assert.strict.deepEqual([...range(10, 16)], [10, 11, 12, 13, 14, 15]);
assert.strict.deepEqual([...range(0, 10, 1)], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
assert.strict.deepEqual([...range(3, 8, 2)], [3, 5, 7]);
assert.strict.deepEqual([...range(-3, -10, -1)], [-3, -4, -5, -6, -7, -8, -9]);
assert.strict.deepEqual([...range(100, 101, 3)], [100]);
assert.strict.deepEqual([...range(100, -101, 3)], []);
assert.strict.deepEqual([...range(10, 0, 1)], []);
assert.strict.deepEqual([...range(0, 10, -1)], []);
