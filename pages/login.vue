<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { AuthActions } from "@/stores/enums/enum-auth";

import type { ComputedRef } from "vue";

import type { UserType } from "@/types/user-types";
import type { AuthTypes } from "@/types/auth-types";

const authStore = useAuthStore();
const router = useRouter();

const user: UserType = reactive({
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

const isSubmitting: ComputedRef<AuthTypes["isSubmitting"]> = computed(() => {
  return authStore.isSubmitting;
});

const loginUser = async (): Promise<void> => {
  await authStore[AuthActions.login](user).then(() =>
    router.push({ name: "index" })
  );
};
</script>

<template>
  <section id="login-page" class="login-page">
    <div class="wrapper-50">
      <form @submit.prevent="loginUser" class="login-form">
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
            autocomplete="current-password"
            :class="{ empty: inputError.includes('password') }"
          />
        </div>
        <button :disabled="isSubmitting" class="btn">Sign In</button>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../assets/styles/config/config" as *;

.login-page {
  height: 100%;
  margin: 7rem 0 0;

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0 auto;
    min-width: 50%;

    .input-box {
      input {
        box-sizing: border-box;
        padding: 0.75rem 1.5rem;
        font-size: 1.5rem;
        border-radius: 8px;
        border: 1px solid $third_60;
        outline: none;
        width: 100%;

        &:focus {
          border: 1px solid $primary;

          &::placeholder {
            color: $primary_50;
          }
        }

        &.empty {
          border: 1px solid red;
        }
      }
    }

    .btn {
      margin-left: auto;
    }
  }
}
</style>
