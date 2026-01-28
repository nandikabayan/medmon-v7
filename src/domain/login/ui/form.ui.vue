<script setup lang="ts">
import { useHook } from '@/app/hooks/useHook';

const { loading, error, result, loginModel } = useHook('login');
const form_data = ref({
  username: '',
  password: '',
  remember_me: false,
});

async function handleLogin() {
    loading.value = true;

    const payload = {
        username: form_data.value.username,
        password: form_data.value.password,
        remember_me: form_data.value.remember_me ? '1' : '0',
    };

  await loginModel(payload);

   if (result.value) {
       alert(`Login successful: ${JSON.stringify(result.value)}`);
   } else if (error.value) {
       alert(`Login error: ${JSON.stringify(error.value)}`);
   }
}
</script>

<template>
    <div>
        <VCard>
            <VCardText class="text-h4 text-center">
                <VForm>
                    <VTextField placeholder="Username" v-model="form_data.username" />
                    <VTextField placeholder="Password" v-model="form_data.password" />
                    <VBtn text="Login" @click="handleLogin" :loading="loading" />
                </VForm>
            </VCardText>
        </VCard>
    </div>
</template>