
import type { DevToolbarApp } from "astro";

export function createWindowElement(content: string) {
	const windowElement = document.createElement('astro-dev-toolbar-window');
	windowElement.innerHTML = content;
	return windowElement;
}

export default {
  id: 'i18n-helper',
  name: 'Astro docs i18n helper',
  icon: 'astro:logo',
  init(canvas, eventTarget) {
    const content = `
      <p>i18n-helper</p>
      <astro-dev-toolbar-button id="click-button" buttonStyle="purple">Click me!!!</astro-dev-toolbar-button>
    `
    const windowComponent = createWindowElement(content)

    const clickButton =
    windowComponent.querySelector('#click-button');

    clickButton?.addEventListener('click', () => {
      if (import.meta.hot) {
        import.meta.hot.send(`i18n-helper:open-file`, {
          state: true,
          fileName: 'lunaria/components.ts:5:1'
        });
      }
    });

    canvas.appendChild(windowComponent)
  }
} satisfies DevToolbarApp;
