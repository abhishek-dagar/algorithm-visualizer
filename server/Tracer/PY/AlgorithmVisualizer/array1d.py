# from . import chart
from .array2d import Array2DTracer
from .types import Serializable, UNDEFINED


class Array1DTracer(Array2DTracer):
    def set(self, array1d):
        self.command("set", array1d)

    def patch(self, x: int, v: Serializable = UNDEFINED):
        self.command("patch", x, v)

    def depatch(self, x: int):
        self.command("depatch", x)

    def select(self, sx: int, ex: int = UNDEFINED):
        self.command("select", sx, ex)

    def deselect(self, sx: int, ex: int = UNDEFINED):
        self.command("deselect", sx, ex)
    
    def selectTrue(self, sx: int, ex: int = UNDEFINED):
        self.command("selectTrue", sx, ex)

    def deselectTrue(self, sx: int, ex: int = UNDEFINED):
        self.command("deselectTrue", sx, ex)

    def chart(self, chartTracer: "chart.ChartTracer"):
        self.command("chart", chartTracer.key)
