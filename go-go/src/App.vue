<script setup lang="ts">
import Game from "./components/Game.vue";
import ClearBox from "@/components/ClearBox.vue";
</script>

<template>
  <Game></Game>
  <clear-box></clear-box>
</template>

<style>

html, body {
  height: 100%;
  overflow: auto;
  margin: 0;
}
html {
  overflow-y: auto;
}
</style>
