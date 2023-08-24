import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import './pages/app-home';
import './components/header';
import './components/bottom-navigation';
import './styles/global.css';
import { router } from './router';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

// Get the base URL from Vite's environment variables
const base_path = import.meta.env.BASE_PATH || '/';
console.log('base_path', base_path);

// Set the base path dynamically based on the base_path
setBasePath(`${base_path}node_modules/@shoelace-style/shoelace/dist/`);

@customElement('app-index')
export class AppIndex extends LitElement {
  static get styles() {
    return css`
      main {
        padding-left: 16px;
        padding-right: 16px;
        padding-bottom: 16px;
      }
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    router.addEventListener('route-changed', () => {
      if ('startViewTransition' in document) {
        return (document as any).startViewTransition(() => {
          this.requestUpdate();
        });
      } else {
        this.requestUpdate();
      }
    });
  }

  render() {
    // router config can be round in src/router.ts
    return router.render();
  }
}

