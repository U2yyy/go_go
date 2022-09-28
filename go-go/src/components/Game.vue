<template>
  <div>
    <div class="background">
      <div id="game">

      </div>
      <button @click.once="InitGame">开始游戏</button>
    </div>
  </div>
</template>

<script>
import {ItemGame} from "core/game";

export default {
  name: "Game",

}


</script>

<style scoped>

</style>