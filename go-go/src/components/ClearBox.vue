<template>
  <div class="selection">
    <div v-for="item in store.selectedCards" :key = item.id class="card">

    </div>
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
  }
}
</script>

<style scoped>
  .selection{
    height: 4rem;
    background: #3A85F7;
    border: 1px solid gold;
    position: fixed;
    left: 40%;
    bottom: 1rem;
    width: 22.4rem;
  }
  .card{
    display: inline-block;
    width: 3rem;
    height: 4rem;
    border-radius: 0.2rem;
    border: pink solid 0.1rem;
    background: yellowgreen;
  }
</style>