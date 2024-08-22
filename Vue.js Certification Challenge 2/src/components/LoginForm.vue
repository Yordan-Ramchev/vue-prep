<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const name = ref('')
const password = ref('')

watch(props, (newValue) => {
    name.value = newValue.modelValue.username
    password.value = newValue.modelValue.password
  },
{ immediate: true, deep: true}
)

function submit() {
  const modelValue = { username: name.value , password: password.value}
  emit('update:modelValue', modelValue)
}
</script>

<template>
  <form @submit.prevent="submit">
    <h1>Login</h1>
    <label>
      <span>Username</span>
      <input type="text" v-model="name" />
    </label>

    <label>
      <span>Password</span>
      <input type="password" v-model="password"  />
    </label>

    <button type="submit">Login</button>
  </form>
</template>
