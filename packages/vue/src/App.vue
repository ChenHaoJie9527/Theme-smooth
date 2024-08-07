<template>
  <div>
    <h2>Current Theme</h2>
    <button @click="toggleChange">Toggle Theme</button>
    <button
      @click="
        () => {
          themeManager.setTheme('light');
        }
      "
    >
      Light Theme
    </button>
    <button
      @click="
        () => {
          themeManager.setTheme('dark');
        }
      "
    >
      Dark Theme
    </button>

    <input type="number" placeholder="Transition Duration (ms)" />
  </div>
</template>

<script setup lang="ts">
import { ThemeManager } from "@theme-smooth/core";
const themeManager = new ThemeManager({
  transitionEffect: "circle",
  transitionDuration: 500,
});

const toggleChange = async () => {
  await themeManager.toggleTheme();
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
