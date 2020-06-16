import { capitalize } from '@core/utils';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DOMListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const methodName = _getMethodName(listener);

      if (!this[methodName]) {
        const name = this.name || '';
        throw new Error(
            `Method ${ methodName } is not implemented in ${ name } Component`
        );
      }
      this[methodName] = this[methodName].bind(this);
      this.$root.on(listener, this[methodName]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const methodName = _getMethodName(listener);
      this.$root.off(listener, this[methodName]);
    });
  }
}

function _getMethodName(eventName) {
  return `on${ capitalize(eventName) }`;
}
