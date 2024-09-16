// define your Pinia store here
// use either an options store or a setup store as you prefer
// noinspection DuplicatedCode
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export const useAuthUserStore = defineStore("authUser", () => {
  const user = ref(null);
  const router = useRouter();

  const isLoggedIn = computed(() => !!user.value);

  // This login function is a mock function that checks if the username and password are valid
  // In a real-world application, you would send a request to the server to validate the user
  async function login({ username, password }) {
    const res = await fetch("/api/users.json");
    const users = await res.json();

    user.value = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!user.value) {
      throw new Error("Invalid username or password");
    }
  }

  // Logs out the user and redirects to the login page
  function logout() {
    router.push("/login").then(() => (user.value = undefined));
  }

  return {
    user, // the logged in user data
    isLoggedIn,
    login, // a function to log in the user
    logout, // a function to log out the user
  };
});

// make sure to pass the right store definition, `useAuthUserStore` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot));
}
