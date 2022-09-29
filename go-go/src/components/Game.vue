<template>
  <div class="background-box">
    <div class="game-zone">
      <div class="card" v-for="item in card" :key="item.id" :style="{left: item.left,top: item.top}">
        <img :src="item.img">
      </div>
    </div>
    <audio ref="GoAudio" :src="GoAudio" loop autoplay></audio>
    <transition class="animate__animated animate__pulse" leave-active-class="animate__fadeOut">
      <el-button
          ref="button"
          v-if="buttonExist"
          class="begin-button"
          type="primary"
          @click.once="AudioOn"
      >Start</el-button>
    </transition>
  </div>
</template>

<script>
import ak47 from "../assets/img/ak47.png";
import awp from "../assets/img/awp.png";
import eagle from "../assets/img/eagle.png";
import m4a1 from "../assets/img/m4a1.png";
import p250 from "../assets/img/p250.png";
import r8 from "../assets/img/r8.png";
import usp from "../assets/img/usp.png";
import GoAudio from "../assets/audio/work-hard,play-hard.mp3";
import nanoid from 'nano-id';
import { ElButton } from 'element-plus';
import 'animate.css';

export default {
  name: "Game",
  components: { ElButton },
  data(){
    return {
      card:[
        {id:nanoid(),img:ak47,name:"ak47"},
        {id:nanoid(),img:awp,name:"awp"},
        {id:nanoid(),img:eagle,name:"eagle"},
        {id:nanoid(),img:m4a1,name:"m4a1"},
        {id:nanoid(),img:p250,name:"p250"},
        {id:nanoid(),img:r8,name:"r8"},
        {id:nanoid(),img:usp,name:"usp"},
      ],
      GoAudio,
      buttonExist:true
    }
  },methods:{
    AudioOn(){
      this.$refs.GoAudio.play();
      this.buttonExist = false;
    }
  }
/*  这个方法自动循环播放不好使
    methods:{
    AudioOn(){
      let musicGo = new Audio(GoAudio);
      musicGo.onload;
      musicGo.play();
    }
  }*/
  /*不能直接用定时器去自动播放音频
  mounted() {
    setTimeout(()=>{
      music.src = GoAudio;
      music.play();
    })
  }*/

}


</script>

<style scoped>
  .background-box {
    width: 100%;
    height: calc(100vh);
    background: url("https://images4.alphacoders.com/347/34758.jpg");
    background-size:cover;
    marin: 0 auto;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .game-zone {
    width: 30rem;
    height: 40rem;
    background-color:transparent;
    border: #FFCC99 solid 0.2rem;
    border-radius: 2rem;
  }
  .card {
    width: 3rem;
    height: 4rem;
    border-radius: 0.2rem;
    border: pink solid 0.1rem;
    background: gray;
  }
  .begin-button{
    position: absolute;
    top:85%;
    background: linear-gradient(270deg, #3A85F7 0%, #7D1FF9 100%);
    width: 6rem;
    height: 3rem;
    border-style: none;
    border-radius: 0.5rem;
    text-align: center;
    font-size: 2rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.3);
  }
  .begin-button:active{
    background: rgba(125, 31, 249, 1);;
  }
  .begin-button:hover{
    cursor: pointer;
  }
  img {
    width: 3rem;
    height: 4rem;
  }
</style>