<script setup lang="ts">
const recipes = ref([1, 2, 4, 5, 6]);
</script>

<template>
  <ul>
    <li v-for="(recipe, idx) in recipes" :key="idx">
      <NuxtLink :to="`/recipes/${recipe}`">recipe : {{ recipe }}</NuxtLink>
    </li>
  </ul>
  <div></div>
</template>
