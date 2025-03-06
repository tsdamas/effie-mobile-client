// Event handler for messages

let listeners = [];

export function addMessageListener(listener) {
  listeners.push(listener);
}

export function removeMessageListener(listener) {
  listeners = listeners.filter(l => l !== listener);
}

export function sendMessage(message) {
  listeners.forEach(listener => listener(message));
}
