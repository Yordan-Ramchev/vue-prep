<script setup>
import { useAuthUserStore } from "@/stores/AuthUserStore.js";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const { login } = useAuthUserStore();

const error = ref("");

const form = ref({
  username: "",
  password: "",
});

async function handleSubmit() {
  try {
    await login({ ...form.value });
    await router.push("/");
  } catch (err) {
    error.value = err.message;
  }
}
</script>
<template>
  <form class="card" @submit.prevent="handleSubmit">
    <div class="card-body">
      <h2 class="card-title">Login to Your Account</h2>

      <label>
        <div class="label">Username</div>
        <input type="text" v-model="form.username" />
      </label>
      <label>
        <div class="label">Password</div>
        <input type="password" v-model="form.password" />
      </label>

      <div class="card-actions">
        <div
          class="text-error"
          :class="{
            invisible: !error,
          }"
        >
          {{ error }}
        </div>
        <button class="btn btn-primary" type="submit">Login</button>
      </div>
    </div>
  </form>
</template>
