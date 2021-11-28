from AlgorithmVisualizer import Tracer, Array1DTracer, LogTracer, Layout, VerticalLayout
n = 30
a = [i for i in range(1, n+1)]
b = [0 for _ in range(n+1)]

# defining variables {
tracer = Array1DTracer('Sieve')
tracer.set(a)
logger = LogTracer()
Layout.setRoot(VerticalLayout([tracer, logger]))
Tracer.delay()
# }

logger.println("1 is not prime So it marked red")
# visualize {
tracer.patch(0)
Tracer.delay()
# }

for i in range(2, n+1):
    if (b[i] == 0):
        tracer.select(i - 1)
        Tracer.delay()
        tracer.selectTrue(i - 1)
        logger.println(str(i)+' is not marked, so it is prime')
        for j in range(i+i,n+1,i):
            b[j]=1
            # visualize {
            tracer.patch(j - 1)
            Tracer.delay()
            # }
            logger.println(str(j)+' is a multiple of '+str(i)+' so it is marked as red')
logger.println(
    'The Green marked numbers are the prime numbers from 1 to '+str(n))
