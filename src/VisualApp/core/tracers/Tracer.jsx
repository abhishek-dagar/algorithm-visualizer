import React from 'react';
import { Renderer } from 'VisualApp/core/renderers';

class Tracer {
  constructor(key, getObject, title) {
    this.key = key;
    this.getObject = getObject;
    this.title = title;
    this.init();
    this.reset();
  }

  getRendererClass() {
    return Renderer;
  }

  init() {
  }

  render(Theme) {
    const RendererClass = this.getRendererClass();
    return (
      <RendererClass key={this.key} title={this.title} data={this} Theme={Theme} />
    );
  }

  set() {
  }

  reset() {
    this.set();
  }
}

export default Tracer;
