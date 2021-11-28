import Array1DTracer from './Array1DTracer';
import { ChartRenderer } from 'VisualApp/core/renderers';

class ChartTracer extends Array1DTracer {
  getRendererClass() {
    return ChartRenderer;
  }
}

export default ChartTracer;
