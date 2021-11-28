import sys
import json
from AlgorithmVisualizer import Tracer, LogTracer
code = sys.argv[1]
logger = LogTracer()
def println(string):
    logger.println(string)
exec(code)
res = {
    'commands':Tracer.commands,
}
print(json.dumps(res))