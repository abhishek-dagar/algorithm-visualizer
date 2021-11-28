from AlgorithmVisualizer import Tracer, Array1DTracer, LogTracer, Layout, VerticalLayout, ChartTracer, randomize

# define tracer variables {
chart = ChartTracer("Bubble Sort - Graph")
tracer = Array1DTracer("Bubble Sort - Array")
logger = LogTracer()
Layout.setRoot(VerticalLayout([chart, tracer, logger]))
array = randomize.Array1D(15).array
tracer.set(array)
tracer.chart(chart)
Tracer.delay()
# }

string_array = [str(int) for int in array]
println('original array = ['+','.join(string_array)+']')

swapped=True
n=len(array)
while(swapped):
	swapped=False
	# visualize {
	tracer.select(n-1)
	Tracer.delay()
	# }
	for i in range(1,n):
		# visualize {
		tracer.select(i-1,i)
		Tracer.delay()
		# }
		if(array[i-1]>array[i]):
			println('swap '+str(array[i - 1])+ ' and '+ str(array[i]))
			array[i - 1], array[i] = array[i], array[i - 1]
			swapped=True
			# visualize {
			tracer.patch(i - 1, array[i - 1])
			tracer.patch(i, array[i])
			Tracer.delay()
			tracer.depatch(i - 1)
			tracer.depatch(i)
			# }
		# visualize {
		tracer.deselect(i-1,i)
		# }
	# visualize {
	tracer.deselect(n-1)
	tracer.selectTrue(n-1)
	# }
	if not swapped:
		# visualize {
		tracer.selectTrue(0,n - 1)
		# }
	n-=1

string_array = [str(int) for int in array]
println('sorted array = ['+','.join(string_array)+']')