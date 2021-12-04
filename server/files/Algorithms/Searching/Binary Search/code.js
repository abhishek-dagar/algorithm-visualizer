// import visualization libraries {
const {
  Tracer,
  Array1DTracer,
  LogTracer,
  Layout,
  VerticalLayout,
} = require("algorithm-visualizer");
// }

const array = [2, 8, 8, 10, 11, 13, 14, 26, 26, 29, 30, 31, 42, 47, 49];
const ele = 29;

// define tracer variables {
const tracer = new Array1DTracer("Binary Search");
tracer.set(array);
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, logger]));
Tracer.delay();
// }

function binarySearch(array, start, end, element) {
  if (start > end) {
    return false;
  } else {
    tracer.select(start, end);
    logger.println(`Start index ${start} end index ${end}`);
    Tracer.delay();

    mid = Math.ceil(start + (end - start) / 2);

    tracer.patch(mid);
    Tracer.delay();

    if (array[mid] === element) {
      return mid;
    } else if (array[mid] > element) {
      logger.println(`Element is smaller so Going Left <---`);
      Tracer.delay();
      tracer.deselect(start, end);
      tracer.depatch(mid);

      return binarySearch(array, start, mid - 1, element);
    } else {
      logger.println(` Element is greater so Going Left --->`);
      Tracer.delay();
      tracer.deselect(start, end);
      tracer.depatch(mid);

      return binarySearch(array, mid + 1, end, element);
    }
  }
}

const result = binarySearch(array, 0, array.length - 1, ele);
if (result) {
  tracer.selectTrue(mid);
  logger.println(`Element is present at index ${result}`);
} else {
  logger.println(`Element is not present in array`);
}
