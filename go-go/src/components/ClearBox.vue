<template>
  <div class="selection">
    <transition-group name="card">
      <div v-for="item in store.selectedCards" :key = item.id class="card">
        <img :src="item.imgSrc" alt="">
      </div>
    </transition-group>
  </div>
</template>

<script>
import {store} from "@/store";

export default {
  name: "ClearBox",
  data(){
    return{
      store
    }
  },
}
</script>

<style scoped>
  .selection{
    height: 4rem;
    background: transparent;
    box-shadow: 0 0 0 1px blanchedalmond;
    position: fixed;
    left: 41%;
    bottom: 1rem;
    width: 21rem;
  }
  .card{
    background: #828a82;
    box-shadow: 0 0 0 1px #625353;
    display: inline-block;
    width: 3rem;
    height: 4rem;
  }
  img {
    width: 3rem;
    height: 4rem;
  }
  .card-move,
  .card-enter-active,
  .card-leave-active {
    transition: all 0.5s ease;
  }
  .card-enter-from{
    opacity: 0;
    transform: translateY(-30px);
  }
  .card-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-leave-active {
    position: absolute;
  }
</style>