from AlgorithmVisualizer import Tracer, Array1DTracer, LogTracer, Layout, VerticalLayout, ChartTracer, randomize

# define tracer variables {
chart = ChartTracer("Selection Sort - Graph")
tracer = Array1DTracer("Selection Sort - Array")
logger = LogTracer()
Layout.setRoot(VerticalLayout([chart, tracer, logger]))
array = randomize.Array1D(15).array
tracer.set(array)
tracer.chart(chart)
Tracer.delay()
# }

string_array = [str(int) for int in array]
println('original array = ['+','.join(string_array)+']')

for i in range(len(array)):
    key = array[i]
    println('insert '+str(key))
    # visualize {
    tracer.select(i)
    Tracer.delay()
    # }
    j=i-1
    while(j>=0 and array[j]>key):
        array[j+1]=array[j]
        # visualize {
        tracer.patch(j + 1, array[j + 1])
        Tracer.delay()
        tracer.depatch(j+1)
        # }
        j-=1
    array[j+1] = key
    # visualize {
    tracer.patch(j+1,array[j+1])
    Tracer.delay()
    tracer.depatch(j+1)
    tracer.deselect(i)
    # }
# visualize {
for i in range(len(array)):
    tracer.selectTrue(i)
    Tracer.delay()
# }

string_array = [str(int) for int in array]
println('sorted array = ['+','.join(string_array)+']')