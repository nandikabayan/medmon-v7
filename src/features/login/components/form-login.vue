<script setup lang="ts">
import { loginService } from "@/features/login/service";
import { encryptPassword } from "@/shared/utils";

const form_data = ref({ 
  username: null,
  password: null,
  remember_me: false,
});
const loading = ref(false);

async function handleLogin() {
  try {
    loading.value = true;
    const user = await loginService({
      username: form_data.value.username,
      password: encryptPassword(form_data.value.password).toString(),
      remember_me: form_data.value.remember_me ? "1" : "0",
    });

    console.log("LOGIN SUCCESS:", user);
  } catch (error) {
    console.error("LOGIN FAILED", error);
  } finally {
    loading.value = false;
  }
}

</script>

<template>
    <VForm>
        <VTextField placeholder="Username" v-model="form_data.username" />
        <VTextField placeholder="Password" v-model="form_data.password" />
        <VBtn text="Login" @click="handleLogin" :loading="loading" />
    </VForm>
</template>