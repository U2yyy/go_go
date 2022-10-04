<template>
  <div class="background-box">
    <div class="game-zone">
      <div class="card" v-for="item in table" :key="item.id" :style="{left: item.left,top: item.top}">
        {{item.id}}
        <img :src="item.imgSrc" alt="">
      </div>
    </div>
    <audio ref="GoAudio" :src="GoAudio" loop autoplay></audio>
    <transition class="animate__animated animate__pulse" leave-active-class="animate__fadeOut">
      <el-button
          ref="button"
          v-if="buttonExist"
          class="begin-button"
          type="primary"
          @click.once="GameStart"
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
import { ElButton } from 'element-plus';
import 'animate.css';

const CardWidth = 3;
const CardHeight = 4;

export default {
  name: "Game",
  components: { ElButton },
  data(){
    return {
      img:[ak47,awp,eagle,m4a1,p250,r8,usp],
      table:[],
      cards:[],
      selectedCards:[],
      GoAudio,
      buttonExist:true,
    }
  },methods:{
    AudioOn(){
      this.$refs.GoAudio.play();
      this.buttonExist = false;
    },
    initTable(){
      let k = 1;
      let left = 0;
      let top = 0;
      for(let i=1;i<=10;i++){
        left = 0;
        for(let j=1;j<=10;j++){
          let id = (i-1)*10 + j;
          let isExist = false;
          let isCovered = false;
          let index = k;
          let imgSrc ='';
          this.table.push({id,index,isCovered,isExist,imgSrc,left:left+'rem',top:top+'rem'});
          left += CardWidth;
        }
      top += CardHeight;
      }
      left = 1.5;
      top = 2;
      for(let i=1;i<=9;i++){
        left = 1.5;
        for(let j=1;j<=9;j++){
          let id = (i-1)*10 + j;
          let isExist = false;
          let isCovered = false;
          let index = k;
          let imgSrc ='';
          this.table.push({id,index,isCovered,isExist,imgSrc,left:left+'rem',top:top+'rem'});
          left += CardWidth;
        }
        top += CardHeight;
      }
    },
    initCard: function (num) {
      while (num >= 0) {
        for (let n = 0; n < 3; n++) {
          let imgNum = Math.floor(Math.random() * 8), imgSrc = this.img[imgNum], i = Math.floor(Math.random() * 2) + 1,
              j, tar;
          do {
            if (i % 2 === 0) {
              j = Math.floor(Math.random() * 81) + 1;
            } else {
              j = Math.floor(Math.random() * 100) + 1;
            }
            tar = this.table.find(({id, index}) => {
              return (id === j && index === i);
            })
            console.log(tar);
          } while (tar.isExist)
          tar.isExist = true;
          tar.imgSrc = imgSrc;
        }
        num--;
      }
    },
    GameStart(){
      let num = 50;
      this.initCard(num);
      this.AudioOn();
    }
  },
  mounted() {
    this.initTable();
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
    position: relative;
    width: 30rem;
    height: 40rem;
    background-color:transparent;
    border: #FFCC99 solid 0.2rem;
    border-radius: 2rem;
  }
  .card {
    position: absolute;
    width: 3rem;
    height: 4rem;
    border-radius: 0.2rem;
    border: pink solid 0.1rem;
    background: transparent;
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