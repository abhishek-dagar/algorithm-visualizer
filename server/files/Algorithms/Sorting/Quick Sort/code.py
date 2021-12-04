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

println('original array = {}'.format(array))


def quickSort(array, low, high):
    if len(array) == 0 or len(array) == 1:
        return
    if low < high:

        tracer.select(low, high)
        println('select from {} to {}'.format(low, high))
        Tracer.delay()
        tracer.deselect(low, high)

        i = low-1
        pivot = array[high]
        tracer.select(high)
        Tracer.delay()
        for j in range(low, high):

            println('checking {} and {}'.format(i, j))

            if array[j] <= pivot:
                i += 1
                array[i], array[j] = array[j], array[i]

                tracer.patch(i, array[i])
                tracer.patch(j, array[j])
                Tracer.delay()
                tracer.depatch(i)
                tracer.depatch(j)

        array[i+1], array[high] = array[high], array[i+1]

        tracer.patch(i+1, array[i+1])
        tracer.patch(high, array[high])
        Tracer.delay()
        tracer.depatch(high)
        tracer.deselect(high)
        tracer.depatch(i+1)

        i += 1
        quickSort(array, low, i-1)
        quickSort(array, i+1, high)


quickSort(array, 0, len(array)-1)
for i in range(len(array)):
    tracer.selectTrue(i)
    Tracer.delay()
println('sorted array = {}'.format(array))
