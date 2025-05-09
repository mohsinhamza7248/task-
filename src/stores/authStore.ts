import { types } from "mobx-state-tree";

export const AuthStore = types
  .model("AuthStore", {
    currentUser: types.maybeNull(types.string),
  })
  .actions((self) => ({
    login(email: string, password: string) {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      if (!users[email] || users[email].password !== password) {
        throw new Error("Invalid email or password");
      }
      self.currentUser = email;
      localStorage.setItem("currentUser", email);
    },
    signup(email: string, password: string) {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      if (users[email]) {
        throw new Error("User already exists");
      }
      users[email] = { email, password };
      localStorage.setItem("users", JSON.stringify(users));
      this.login(email, password);
    },
    logout() {
      localStorage.removeItem("currentUser");
      self.currentUser = null;
    },
    loadFromStorage() {
      if (typeof window !== "undefined") {
        self.currentUser = localStorage.getItem("currentUser");
      }
    },
  }));

// Initialize authStore after checking for client-side (window)
const authStore = AuthStore.create({});
if (typeof window !== "undefined") {
  authStore.loadFromStorage(); // Only runs client-side
}

export { authStore };
