// import visualization libraries {
const {
  Tracer,
  Array1DTracer,
  ChartTracer,
  LogTracer,
  Randomize,
  Layout,
  VerticalLayout,
  HorizontalLayout,
} = require("algorithm-visualizer");
// }

// define tracer variables {
const chart = new ChartTracer("Merge Sort - Chart ");
const tracer = new Array1DTracer("Merge Sort - Array ");
const leftarray = new Array1DTracer("Left Array ");
const rightarray = new Array1DTracer("Right Array ");
const Vlayout = new VerticalLayout([leftarray, rightarray]);
const Hlayout = new HorizontalLayout([tracer, Vlayout]);
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([chart, Hlayout, logger]));
const D = Randomize.Array1D({ N: 15 });
tracer.set(D);
tracer.chart(chart);
Tracer.delay();
// }

// logger {
logger.println(`original array = [${D.join(", ")}]`);
// }

function mergeSort(start, end) {
  if (Math.abs(end - start) <= 1) return [];
  const middle = Math.ceil((start + end) / 2);

  mergeSort(start, middle);
  mergeSort(middle, end);

  // logger {
  logger.println(
    `divide left[${start}, ${middle - 1}], right[${middle}, ${end - 1}]`
  );
  // }
  return mergeSort.merge(start, middle, end);
}

mergeSort.merge = (start, middle, end) => {
  const leftSize = middle - start;
  const rightSize = end - middle;
  const maxSize = Math.max(leftSize, rightSize);
  const size = end - start;
  const left = [];
  const right = [];
  let i;
  // setting left and right {
  leftarray.set(left);
  rightarray.set(right);
  // }
  
  for (i = 0; i < maxSize; i++) {
    if (i < leftSize) {
      left.push(D[start + i]);
      // visualize {
      leftarray.set(left);
      tracer.select(start + i);
      logger.println(`insert value into left array[${i}] = ${D[start + i]}`);
      Tracer.delay();
      // }
    }
    if (i < rightSize) {
      right.push(D[middle + i]);
      // visualize {
      rightarray.set(right);
      tracer.select(middle + i);
      logger.println(`insert value into right array[${i}] = ${D[middle + i]}`);
      Tracer.delay();
      // }
    }
  }
  // logger {
  logger.println(
    `left array = [${left.join(", ")}], ` +
      `right array = [${right.join(", ")}]`
  );
  // }

  i = 0;
  while (i < size) {
    if (left[0] && right[0]) {
      if (left[0] > right[0]) {
        rightarray.patch(0);

        D[start + i] = right.shift();
        // logger {
        logger.println(`rewrite from right array[${i}] = ${D[start + i]}`);
        // }
      } else {
        leftarray.patch(0);

        D[start + i] = left.shift();
        // logger {
        logger.println(`rewrite from left array[${i}] = ${D[start + i]}`);
        // }
      }
    } else if (left[0]) {
      leftarray.patch(0);

      D[start + i] = left.shift();
      // logger {
      logger.println(`rewrite from left array[${i}] = ${D[start + i]}`);
      // }
    } else {
      rightarray.patch(0);
      D[start + i] = right.shift();
      // logger {
      logger.println(`rewrite from right array[${i}] = ${D[start + i]}`);
      // }
    }

    // visualize {
    tracer.deselect(start + i);
    tracer.patch(start + i, D[start + i]);
    Tracer.delay();
    rightarray.set(right);
    leftarray.set(left);
    tracer.depatch(start + i);
    // }
    i++;
  }

  const tempArray = [];
  for (i = start; i < end; i++) tempArray.push(D[i]);
  // logger {
  logger.println(`merged array = [${tempArray.join(", ")}]`);
  // }
};

mergeSort(0, D.length);
// visualize {
for (let i = 0; i < D.length; i++) {
  tracer.selectTrue(i);
  Tracer.delay();
}
// }
logger.println(`sorted array = [${D.join(", ")}]`);
