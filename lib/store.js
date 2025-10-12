// lib/store.js
const store = new Map();

export function saveLink(id, data) {
  store.set(id, { ...data, createdAt: Date.now() });
}

export function getLink(id) {
  return store.get(id);
}
