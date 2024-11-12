import { LitElement, html, css } from 'lit';
import { localize } from '../localization/localize.js';

class HomeButton extends LitElement {
    static get styles() {
        return css`
            .tooltip-button {
                position: relative;
                display: inline-block;
                padding: 10px 15px;
                font-size: 16px;
                color: #ff6d00;
                text-decoration: none;
                cursor: pointer;
            }

            .tooltip-button:hover {
                visibility: visible;
                opacity: 1;
                text-decoration: underline;
            }
        `;
    }
  render() {
    return html`
        <a href="/dev/" class="tooltip-button">
            <p> < ${localize("backToHome")}</p>
        </a>
    `;
  }

  goHome() {
    window.history.pushState({}, '', '/dev/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

window.customElements.define('home-button', HomeButton);
