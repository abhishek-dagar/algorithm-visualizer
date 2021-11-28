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
    min = i
    # visualize {
    tracer.select(i)
    Tracer.delay()
    # }
    for j in range(i+1, len(array)):
        # visualize {
        tracer.select(j)
        Tracer.delay()
        # }
        if array[min] > array[j]:
            tracer.depatch(min)
            min = j
            # visualize {
            tracer.patch(j)
            Tracer.delay()
            # }
        # visualize {
        tracer.deselect(j)
        # }
    println('swap '+str(array[i])+' and '+str(array[min]))
    array[min], array[i] = array[i], array[min]
    # visualize {
    tracer.patch(i, array[i])
    tracer.patch(min, array[min])
    Tracer.delay()
    tracer.depatch(i)
    # }
    # visualize {
    tracer.depatch(min)
    tracer.deselect(i)
    tracer.selectTrue(i)
    # }

string_array = [str(int) for int in array]
println('sorted array = ['+','.join(string_array)+']')