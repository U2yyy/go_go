<template>
  <el-row>
    <el-col :xs="0" :sm="5" :md="7" :lg="8" :xl="8">
      <div class="grid-content blank"></div>
    </el-col>
    <el-col :xs="24" :sm="14" :md="10" :lg="8" :xl="8">
      <div class="grid-content center-bar">
       <div v-if="store.gameBegin" class="selection">
        <transition-group name="card">
          <div v-for="item in store.selectedCards" :key = item.id class="card">
            <img :src="item.imgSrc" alt="">
          </div>
        </transition-group>
      </div>
      </div>
    </el-col>
    <el-col :xs="0" :sm="5" :md="7" :lg="8" :xl="8">
      <div class="grid-content blank"></div>
    </el-col>
  </el-row>
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
    background: transparent;
    box-shadow: 0 0 0 1px blanchedalmond;
    margin: 0.5rem auto;
    width: 80%;
    height: 8vh;
  }
  .card{
    background: #e3e3e3;
    box-shadow: 0 0 0 2px #888888;
    display: inline-block;
    width: 14.2%;
    height: 8vh;
  }
  img {
    width: 100%;
    height: 8vh;
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