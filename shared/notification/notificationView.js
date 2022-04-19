export function errorMessageView(message) {
  return `
    <div class="notification error">
      <span>${message}</span>
      <button>❌</button>
    </div>
  `;
}

export function successMessageView(message) {
  return `
    <div class="notification success">
      <span>${message}</span>
      <button>❌</button>
    </div>
  `;
}
