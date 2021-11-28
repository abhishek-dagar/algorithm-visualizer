from .tracer import Tracer
from .types import Serializable, UNDEFINED


class Array2DTracer(Tracer):
    def set(self, array2d):
        self.command("set", array2d)

    def patch(self, x: int, y: int, v: Serializable = UNDEFINED):
        self.command("patch", x, y, v)

    def depatch(self, x: int, y: int):
        self.command("depatch", x, y)

    def select(self, sx: int, sy: int, ex: int = UNDEFINED, ey: int = UNDEFINED):
        self.command("select", sx, sy, ex, ey)

    def selectRow(self, x: int, sy: int, ey: int):
        self.command("selectRow", x, sy, ey)

    def selectCol(self, y: int, sx: int, ex: int):
        self.command("selectCol", y, sx, ex)

    def deselect(self, sx: int, sy: int, ex: int = UNDEFINED, ey: int = UNDEFINED):
        self.command("deselect", sx, sy, ex, ey)

    def deselectRow(self, x: int, sy: int, ey: int):
        self.command("deselectRow", x, sy, ey)

    def deselectCol(self, y: int, sx: int, ex: int):
        self.command("deselectCol", y, sx, ex)
    
    def selectTrue(self, sx: int, sy: int, ex: int = UNDEFINED, ey: int = UNDEFINED):
        self.command("selectTrue", sx, sy, ex, ey)

    def selectRowTrue(self, x: int, sy: int, ey: int):
        self.command("selectRowTrue", x, sy, ey)

    def selectColTrue(self, y: int, sx: int, ex: int):
        self.command("selectColTrue", y, sx, ex)

    def deselectTrue(self, sx: int, sy: int, ex: int = UNDEFINED, ey: int = UNDEFINED):
        self.command("deselectTrue", sx, sy, ex, ey)

    def deselectRowTrue(self, x: int, sy: int, ey: int):
        self.command("deselectRowTrue", x, sy, ey)

    def deselectColTrue(self, y: int, sx: int, ex: int):
        self.command("deselectColTrue", y, sx, ex)
