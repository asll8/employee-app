import { LitElement, html, css } from "lit";
import { localize } from '../localization/localize.js';
import "./employee-list.js"
import "./add-new-employee.js"


class EmployeeApp extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;
                font-family: Arial, sans-serif;
                text-align: center;
                color: #333;
            }

            .app-container {
                max-width: 800px;
                margin: auto;
                padding: 40px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                background-color: #f8f9fa;
            }

            h1 {
                font-size: 2em;
                margin-bottom: 1em;
                color: #ff6d00;
            }

            nav ul {
                list-style: none;
                padding: 0;
            }

            nav ul li {
                margin: 10px 0;
            }

            nav a {
                color: #787878;
                text-decoration: none;
                font-size: 1.2em;
                font-weight: bold;
            }

            nav a:hover {
                text-decoration: underline;
                color: #3e3e3f;
            }
        `;
    }

    static properties = {
        employees: { type: Array },
        menuItems: { type: Array },
    };

    constructor() {
        super();
        this.menuItems = [
            { label: localize("employees"), path: "/dev/employees" },
            { label: localize("addEmployeeHeader"), path: "/dev/employees/new" },
        ];
        this.employees = [];
    }

    render() {
        return html`
            <div class="app-container">
                <h1>${localize("employeeAppHeader") || ""}</h1>
                <nav>
                    <ul>
                    ${this.menuItems.map(
                        item => html`
                            <li>
                                <a href="${item.path}" @click="${this.handleNavigation}">
                                    ${item.label}
                                </a>
                            </li>`
                    )}
                    </ul>
                </nav>
            </div>
        `;
    }

    handleNavigation(event) {
        event.preventDefault();
        const path = event.target.getAttribute('href');
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }
}

window.customElements.define('employee-app', EmployeeApp);
