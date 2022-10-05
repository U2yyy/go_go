<template>
  <div class="background-box">
    <div class="game-zone">
      <div @click="selected(item,item.id,item.clickable)" class="card" v-for="item in table" :key="item.id" :style="{left: item.left,top: item.top}">
        <img v-if="item.imgSrc !== ''" :src="item.imgSrc" alt="">
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
import {store} from "@/store";
import 'animate.css';

const CardWidth = 3;
const CardHeight = 4;

const indexArr = [];
for(let i=0;i<181;i++){
  indexArr.push(i);
}

export default {
  name: "Game",
  components: {},
  data(){
    return {
      img:[ak47,awp,eagle,m4a1,p250,r8,usp],
      table:[],
      cards:[],
      GoAudio,
      buttonExist:true,
      store
    }
  },
  methods:{
    AudioOn(){
      this.$refs.GoAudio.play();
      this.buttonExist = false;
    },
    initTable(){
      let num = 1;
      let k = 1;
      let left = 2;
      let top = 2;
      for(let i=1;i<=10;i++){
        left = 2;
        for(let j=1;j<=10;j++){
          let id = num++;
          let isExist = false;
          let index = k;
          let imgSrc ='';
          let clickable = false;
          this.table.push({id,index,clickable,isExist,imgSrc,left:left+'rem',top:top+'rem'});
          left += CardWidth;
        }
      top += CardHeight;
      }
      left = 3.5;
      top = 4;
      for(let i=1;i<=9;i++){
        left = 3.5;
        for(let j=1;j<=9;j++){
          let id = num++;
          let isExist = false;
          let index = k;
          let imgSrc ='';
          let clickable = false;
          this.table.push({id,index,clickable,isExist,imgSrc,left:left+'rem',top:top+'rem'});
          left += CardWidth;
        }
        top += CardHeight;
      }
    },
    initCard: function () {
      console.log("Game Start");
      let num = 0;
      indexArr.sort(()=>Math.random() - 0.5);
      while(num < 181){
        let imgIndex = Math.floor(Math.random()*7);
        let imgSrc = this.img[imgIndex];
        for (let i = 0; i < 3; i++) {
          if (num < 181) {
            this.table[indexArr[num]].imgSrc = imgSrc;
            num++;
          }
        }
      }
    },
    GameStart(){
      let num = 50;
      this.initCard(num);
      this.AudioOn();
      this.table.forEach((card)=>{
        card.clickable = true;
      })
    },
    insert(item){
      let index;
      /*这里的length使加入之前的length所以只-1不-2，还是挺坑的，逻辑陷阱吧算是*/
      for(let i=0;i<this.store.selectedCards.length || this.store.selectedCards.length === 0;i++){
        if(i === this.store.selectedCards.length - 1 || this.store.selectedCards.length === 0){
          index = this.store.selectedCards.length - 2;
          this.store.selectedCards.push(item);
          break;
        }
        if(this.store.selectedCards[i].imgSrc === item.imgSrc && this.store.selectedCards[i+1].imgSrc !== item.imgSrc){
          index = i-1;
          this.store.selectedCards.splice(i+1,0,item);
          break;
        }
      }
      return index;
    },
    removeArr(item,index){
      let tempArr = this.store.selectedCards.filter((card)=>{
        return card.imgSrc === item.imgSrc;
      })
      console.log(tempArr);
      if(tempArr.length === 3){
        setTimeout(()=>{
          this.store.selectedCards.splice(index, 3);
        },100)
      }
    },
    GameOver(){
      if(this.store.selectedCards.length >= 7){
        setTimeout(()=>{
          alert("Game Over!")
        },100)
        this.table.forEach((card)=>{
          card.clickable = false;
        })
      }
    },
    GameWin(){
      if(this.table.length === 0){
        alert("You win!");
      }
    },
    selected(item,id,clickable){
      if(!clickable)
        return;
/*      console.log(item)
      console.log(this.table)*/
      /*判断插入位置，进行插入卡片操作*/
      let index = this.insert(item);
      console.log(index);
      /*删除在表上的卡片*/
/*      console.log(id)*/
      this.table = this.table.filter((card)=>{
        return card !== item;
      })
      /*判断是否消除*/
      this.removeArr(item,index);
      /*判断游戏是否输掉*/
      setTimeout(()=>{
        this.GameOver();
      },100);
      /*判断游戏是否胜利*/
      this.GameWin();
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

<style lang="scss" scoped>
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
    width: 34rem;
    height: 44rem;
    background-color:transparent;
    border: #FFCC99 solid 0.2rem;
    border-radius: 2rem;
  }
  .card {
    position: absolute;
    width: 3rem;
    height: 4rem;
    border-radius: 0.2rem;
    background: #828a82;
    box-shadow: 0 0 0 1px #625353;
    & :hover{
      background: #98a198;
    }
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
    cursor: pointer;
  }
  img {
    width: 3rem;
    height: 4rem;
  }
</style>