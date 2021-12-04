from AlgorithmVisualizer import Tracer, Array1DTracer, LogTracer, Layout, VerticalLayout


array = [30, 26, 10, 47, 2, 8, 31, 14, 42, 29, 8, 49, 11, 13, 26]
ele = 13

tracer = Array1DTracer('Linear Search')
tracer.set(array)
logger = LogTracer()
Layout.setRoot(VerticalLayout([tracer, logger]))
Tracer.delay()


def binarySearch(array, element):
    for i in range(len(array)):
        tracer.select(i)
        println('Checking at index {}'.format(i))
        Tracer.delay()

        if (array[i] == element):
            return i
        else:
            tracer.patch(i)
            println('{} is not equal to {}'.format(array[i], element))
            Tracer.delay()
            tracer.deselect(i)
    return False


result = binarySearch(array, ele)
if (result):
    tracer.selectTrue(result)
    println('Element is present at index {}'.format(result))
else:
    println('Element is not present in array')
