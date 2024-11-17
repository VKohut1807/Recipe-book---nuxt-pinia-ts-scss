<script setup lang="ts"></script>

<template>
  <section class="default-layout">
    <h1>Layout default</h1>

    <slot />
  </section>
</template>

<style lang="scss">
@use "../assets/styles/config/config" as *;

.default-layout {
  display: flex;
  flex-direction: column;
  background-color: $secondary_20;
  width: 100%;
  min-height: 100%;
}
</style>
