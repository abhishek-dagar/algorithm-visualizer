from AlgorithmVisualizer import Tracer, Array1DTracer, LogTracer, Layout, VerticalLayout


array = [2, 8, 8, 10, 11, 13, 14, 26, 26, 29, 30, 31, 42, 47, 49]
ele = 29

tracer = Array1DTracer('Prime Number')
tracer.set(array)
logger = LogTracer()
Layout.setRoot(VerticalLayout([tracer, logger]))
Tracer.delay()


def binarySearch(array, start, end, element):
    if (start > end):
        return False
    else:
        tracer.select(start, end)
        println('Start index {} end index {}'.format(start, end))
        Tracer.delay()

        mid = start + (end - start) // 2

        println('Checking element at index {}'.format(mid))
        tracer.patch(mid)
        Tracer.delay()

        if (array[mid] == element):
            return mid
        elif (array[mid] > element):
            println('Element is smaller so Going Left < ---')
            Tracer.delay()
            tracer.deselect(start, end)
            tracer.depatch(mid)

            return binarySearch(array, start, mid - 1, element)
        else:
            println('Element is greater so Going Left --->')
            Tracer.delay()
            tracer.deselect(start, end)
            tracer.depatch(mid)

            return binarySearch(array, mid + 1, end, element)


result = binarySearch(array, 0, len(array) - 1, ele)
if (result):
    tracer.selectTrue(result)
    println('Element is present at index {}'.format(result))
else:
    println('Element is not present in array')
