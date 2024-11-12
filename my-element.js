window.process = { env: { NODE_ENV: 'development' } };

import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import './dev/components/employee-app.js'
import './dev/components/employee-list.js'
import './dev/components/add-new-employee.js'

class MyElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Arial, sans-serif;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
        const outlet = this.shadowRoot.getElementById('outlet');

        if (outlet) {
            const router = new Router(outlet);
            router.setRoutes([
                { path: '/', component: 'employee-app' },
                { path: '/employees', component: 'employee-list' },
                { path: '/employees/new', component: 'add-new-employee' },
                { path: '/employees/edit', component: 'add-new-employee' },
                {
                    path: '(.*)',
                    action: () => {
                        console.error('Page not found');
                    },
                },
            ]);
            window.addEventListener('location-changed', () => {
                router.render(window.location.pathname);
            });
        } else {
            console.error('Outlet element not found');
        }
    });

    this.handleLocationChange = this.handleLocationChange.bind(this);
    window.addEventListener('location-changed', this.handleLocationChange);
}
  
  disconnectedCallback() {
    super.disconnectedCallback();
      window.removeEventListener('location-changed', this.handleLocationChange);
  }
  
  handleLocationChange(event) {
    const { employee, mode } = event.detail || {};
  
    if (window.location.pathname === '/dev/employees/edit') {
      const editForm = this.shadowRoot.querySelector('add-new-employee');
      if (editForm) {
        editForm.mode = mode;
        editForm.selectedEmployee = employee;
      }
    }
  }

  render() {
    return html`
      <div id="outlet"></div>
    `;
  }
}

customElements.define('my-element', MyElement);
