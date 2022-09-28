<template>
  <div class="background-box">
    <div class="game-zone">
      <div class="card" v-for="item in card" :key="item.id" :style="{left: item.left,top: item.top}">

      </div>
    </div>
  </div>
</template>

<script>
import nanoid from 'nano-id';
export default {
  name: "Game",
  data(){
    return {
      card:[
        {id:nanoid(),img:"../img/ak47.jpeg",name:"ak47"},
        {id:nanoid(),img:"../img/awp.jpeg",name:"awp"},
        {id:nanoid(),img:"../img/eagle.jpeg",name:"eagle"},
        {id:nanoid(),img:"../img/m4a1.jpeg",name:"m4a1"},
        {id:nanoid(),img:"../img/p250.jpeg",name:"p250"},
        {id:nanoid(),img:"../img/r8.jpeg",name:"r8"},
        {id:nanoid(),img:"../img/usp.jpeg",name:"usp"},
      ],
    }
  },
  methods:{
    createItem(src){
      
    }
  }
}


</script>

<style scoped>
  .background-box {
    width: 100%;
    height: 40rem;
    background: aqua;
    marin: 0 auto;
  }
  .game-zone {
    width: 30rem;
    height: 30rem;
    background: antiquewhite;
    margin: 0 auto;
  }
</style>