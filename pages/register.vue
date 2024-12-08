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
  username: null,
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

const registerUser = async (): Promise<void> => {
  await authStore[AuthActions.register](user).then(() =>
    router.push({ name: "index" })
  );
};

onMounted(() => {
  authStore[AuthActions.droppingErrors]();
});
</script>

<template>
  <section id="register-page" class="register-page">
    <div class="wrapper-50">
      <div class="box">
        <h3>Sing Up</h3>

        <router-link :to="{ name: 'login' }" class="register-link">
          Have an account?
        </router-link>

        <rb-validation-errors
          v-if="validationErrors"
          :validation-errors="validationErrors"
        />

        <form @submit.prevent="registerUser" class="register-form">
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
          <button :disabled="isSubmitting" class="btn">Sign Up</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../assets/styles/config/config" as *;

.register-page {
  width: 100%;
  height: fit-content;
  margin: 7rem 0;

  .box {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h3 {
      font-size: 2.5rem;
      font-weight: 500;
      line-height: 1.1;
      text-align: center;
      color: $third_120;
    }

    .register-link {
      color: $primary;
      font-size: 1.5rem;
      line-height: 1.5;
      position: relative;
      width: fit-content;
      margin: 0 auto;

      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 2px;
        background-color: $primary;
        bottom: 0;
        left: 0;
        transition: width 0.3s ease-in-out;
      }

      &:hover::after {
        width: 100%;
      }
    }

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
}
</style>
