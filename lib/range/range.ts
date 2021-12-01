/* eslint-disable no-param-reassign */
function range(length: number): IterableIterator<number>;
function range(start: number, end: number): IterableIterator<number>;
function range(
  start: number,
  end: number,
  step: number
): IterableIterator<number>;
function* range(start: number, end?: number, step = 1) {
  if (end == null) {
    yield* range(0, start);
    return;
  }

  if (step > 0) {
    while (start < end) {
      yield start;
      start += step;
    }
    return;
  }

  while (start > end) {
    yield start;
    start += step;
  }
}

export default range;
