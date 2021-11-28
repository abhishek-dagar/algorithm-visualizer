import { MarkdownRenderer } from 'VisualApp/core/renderers';
import Tracer from './Tracer';

class MarkdownTracer extends Tracer {
  getRendererClass() {
    return MarkdownRenderer;
  }

  set(markdown = '') {
    this.markdown = markdown;
    super.set();
  }
}

export default MarkdownTracer;
