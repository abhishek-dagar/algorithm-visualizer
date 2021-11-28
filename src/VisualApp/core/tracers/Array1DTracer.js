import Array2DTracer from "./Array2DTracer";
import { Array1DRenderer } from "VisualApp/core/renderers";

class Array1DTracer extends Array2DTracer {
  getRendererClass() {
    return Array1DRenderer;
  }

  init() {
    super.init();
    this.chartTracer = null;
  }

  set(array1d = []) {
    const array2d = [array1d];
    super.set(array2d);
    this.syncChartTracer();
  }

  patch(x, v) {
    super.patch(0, x, v);
  }

  depatch(x) {
    super.depatch(0, x);
  }

  select(sx, ex = sx) {
    super.select(0, sx, 0, ex);
  }
  
  deselect(sx, ex = sx) {
    super.deselect(0, sx, 0, ex);
  }

  selectTrue(sx, ex = sx) {
    super.selectTrue(0, sx, 0, ex);
  }
  deselectTrue(sx, ex = sx) {
    super.deselectTrue(0, sx, 0, ex);
  }


  chart(key) {
    this.chartTracer = key ? this.getObject(key) : null;
    this.syncChartTracer();
  }

  syncChartTracer() {
    if (this.chartTracer) this.chartTracer.data = this.data;
  }
}

export default Array1DTracer;
