<template>
  <div class="register-page">
    <div class="register-form">
      <h2 class="form-title">Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" id="username" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" />
        </div>
        <button class="submit-button">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "../aut.store";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

const username = ref("");
const password = ref("");

const register = async () => {
  if (!username.value || !password.value) {
    toast.error("fill the form");
  } else {
    await authStore.CHANGE_USERNAME(username.value);
    toast.success(`Welcome  ${authStore.GET_USERNAME}`);
    router.push("/");
  }
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
}

.register-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.form-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

.submit-button {
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #2779bd;
}
</style>
