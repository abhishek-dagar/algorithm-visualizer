// import visualization libraries {
const {
  Tracer,
  Array1DTracer,
  LogTracer,
  Layout,
  VerticalLayout,
} = require("algorithm-visualizer");
// }

const N = 30;
const a = [];
for (let i = 1; i <= N; i++) {
  a.push(i);
}

// define tracer variables {
const tracer = new Array1DTracer("Prime Number");
tracer.set(a);
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, logger]));
Tracer.delay();
// }

logger.println("1 is not prime So it marked red");
// visualize {
tracer.patch(0);
Tracer.delay();
// }
for (let i = 2; i <= N; i++) {
  logger.println(`Checking ${i}`);
  // visualize {
  tracer.select(i - 1);
  Tracer.delay();
  // }
  let flag = true;
  for (let j = 2; j * j <= i; j++) {
    if (i % j === 0) {
      flag = false;
    }
  }
  // visualize {
  tracer.deselect(i - 1);
  // }
  if (flag) {
    logger.println(`Marked Green, So ${i} is a prime Number`);
    // visualize {
    tracer.selectTrue(i - 1);
    Tracer.delay();
    // }
  } else {
    logger.println(`Marked red, So ${i} is not a prime Number`);
    // visualize {
    tracer.patch(i - 1);
    Tracer.delay();
    // }
  }
}
logger.println(`The Green marked numbers are the prime numbers from 1 to ${N}`);
