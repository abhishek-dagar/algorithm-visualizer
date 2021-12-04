// import visualization libraries {
const {
  Tracer,
  Array1DTracer,
  LogTracer,
  Layout,
  VerticalLayout,
} = require("algorithm-visualizer");
// }

const array = [30, 26, 10, 47, 2, 8, 31, 14, 42, 29, 8, 49, 11, 13, 26];
const ele = 13;

// define tracer variables {
const tracer = new Array1DTracer("Linear Search");
tracer.set(array);
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, logger]));
Tracer.delay();
// }

function binarySearch(array, element) {
  for (let i = 0; i < array.length; i++) {
    tracer.select(i);
    logger.println(`Checking at index ${i}`);
    Tracer.delay();

    if (array[i] === element) {
      return i;
    } else {
      tracer.patch(i);
      logger.println(`${array[i]} is not equal to ${element}`);
      Tracer.delay();
    }
    tracer.deselect(i);
  }
  return false;
}

const result = binarySearch(array, ele);
if (result) {
  tracer.selectTrue(result);
  logger.println(`Element is present at index ${result}`);
} else {
  logger.println(`Element is not present in array`);
}
