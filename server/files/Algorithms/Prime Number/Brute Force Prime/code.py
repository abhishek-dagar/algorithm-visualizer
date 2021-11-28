from AlgorithmVisualizer import Tracer,Array1DTracer,LogTracer,Layout,VerticalLayout
n=30
a=[i for i in range(1,n+1)]

tracer = Array1DTracer('Prime Number')
tracer.set(a)
logger = LogTracer()
Layout.setRoot(VerticalLayout([tracer,logger]))
Tracer.delay()

logger.println("1 is not prime So it marked red")
# visualize {
tracer.patch(0)
Tracer.delay()
# }

for i in range(2,n+1):
    logger.println("Checking "+str(i))
    # visualize {
    tracer.select(i - 1)
    Tracer.delay()
    # }

    flag = True
    j=2
    while(j**j<=i):
        if (i % j == 0):
            flag = False
        j+=1
    if flag:
        logger.println('Marked Green, So '+str(i)+' is a prime Number')
        # visualize {
        tracer.selectTrue(i - 1)
        Tracer.delay()
        # }
    else:
        logger.println('Marked red, So '+str(i)+' is a prime Number')
        # visualize {
        tracer.patch(i - 1)
        Tracer.delay()
        # }
logger.println('The Green marked numbers are the prime numbers from 1 to '+str(n))