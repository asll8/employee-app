import store from '../store/store.js';

export const connect = (BaseElement) =>
    class extends BaseElement {
      constructor() {
        super();
        this.state = store.getState();
      }
  
      connectedCallback() {
        super.connectedCallback();
        this.unsubscribe = store.subscribe(() => {
          this.state = store.getState();
          console.log('Redux state updated:', this.state); // For debugging
          this.requestUpdate();
        });
      }
  
      disconnectedCallback() {
        if (this.unsubscribe) {
          this.unsubscribe();
        }
        super.disconnectedCallback();
      }
    };
