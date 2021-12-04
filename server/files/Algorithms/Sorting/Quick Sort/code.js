// import visualization libraries {
const {
  Tracer,
  Array1DTracer,
  ChartTracer,
  LogTracer,
  Randomize,
  Layout,
  VerticalLayout,
} = require("algorithm-visualizer");
// }

// define tracer variables {
const chart = new ChartTracer();
const tracer = new Array1DTracer();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([chart, tracer, logger]));
const array = Randomize.Array1D({ N: 15 });
tracer.set(array);
tracer.chart(chart);
Tracer.delay();
// }

// logger {
logger.println(`original array = [${array.join(", ")}]`);
// }

function swap(array, ind1, ind2) {
  let temp = array[ind1];
  array[ind1] = array[ind2];
  array[ind2] = temp;
  return array;
}

function quickSort(array, low, high) {
  if (array.length === 0 || array.length === 1) {
    return;
  }
  if (low < high) {
    tracer.select(low, high);
    logger.println(`select from ${low} to ${high}`);
    Tracer.delay();
    tracer.deselect(low, high);

    let i = low - 1;
    let pivot = array[high];
    tracer.select(high);
    Tracer.delay();

    for (let j = low; j < high; j++) {
      logger.println(`checking ${i} and ${j}`);

      if (array[j] <= pivot) {
        i += 1;
        array = swap(array, i, j);

        tracer.patch(i, array[i]);
        tracer.patch(j, array[j]);
        Tracer.delay();
        tracer.depatch(i);
        tracer.depatch(j);
      }
    }
    array = swap(array, i + 1, high);

    tracer.patch(i + 1, array[i + 1]);
    tracer.patch(high, array[high]);
    Tracer.delay();
    tracer.depatch(high);
    tracer.deselect(high);
    tracer.depatch(i + 1);

    i += 1;
    quickSort(array, low, i - 1);
    quickSort(array, i + 1, high);
  }
}

quickSort(array, 0, array.length - 1);
for (let i = 0; i < array.length; i++) {
  tracer.selectTrue(i);
  Tracer.delay();
}
// logger {
logger.println(`sorted array = [${array.join(", ")}]`);
// }
