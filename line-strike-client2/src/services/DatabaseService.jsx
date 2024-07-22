export const DatabaseService = {
  load() {
    return fetch("/api/database").then((i) => i.json())
  }
}