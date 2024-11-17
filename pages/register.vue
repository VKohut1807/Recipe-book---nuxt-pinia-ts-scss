<script setup lang="ts">
import { computed, reactive, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { AuthActions } from "@/stores/enums/enum-auth";

import type { ComputedRef } from "vue";

import type { UserType } from "@/types/user-types";
import type { AuthTypes } from "@/types/auth-types";

const authStore = useAuthStore();

const user: UserType = reactive({
  username: null,
  email: null,
  password: null,
});

const validationErrors: ComputedRef<AuthTypes["validationErrors"]> = computed(
  () => {
    return authStore.validationErrors;
  }
);

const inputError: ComputedRef<string[]> = computed(() =>
  validationErrors.value ? Object.keys(validationErrors.value) : []
);
</script>

<template>
  <section id="register-page" class="register-page">
    <div class="wrapper-50">
      <form
        @submit.prevent="authStore[AuthActions.register]"
        class="register-form"
      >
        <div class="input-box">
          <input
            v-model="user.username"
            type="text"
            placeholder="Username"
            :class="{ empty: inputError.includes('username') }"
          />
        </div>
        <div class="input-box">
          <input
            v-model="user.email"
            type="text"
            placeholder="Email"
            :class="{ empty: inputError.includes('email') }"
          />
        </div>
        <div class="input-box">
          <input
            v-model="user.password"
            type="password"
            placeholder="Password"
            autocomplete="new-password"
            :class="{ empty: inputError.includes('password') }"
          />
        </div>
        <button :disabled="authStore.isSubmitting" class="btn">Sign Up</button>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../assets/styles/config/config" as *;

.register-page {
  width: 100%;
  height: fit-content;
  margin: 7rem 0;

  .register-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .input-box {
      input {
        box-sizing: border-box;
        padding: 0.75rem 1.5rem;
        font-size: 1.5rem;
        border-radius: 8px;
        border: 1px solid $third;
        outline: none;
        width: 100%;
      }
    }

    .btn {
      margin-left: auto;
    }
  }
}
</style>
