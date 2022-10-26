<template>
  <div class="background-box">
    <img :src="backgroundImg" style="position:fixed;top:0;right:0;width: 100vw;height: 100vh;z-index:-3">
    <el-row>
      <el-col :xs="0" :sm="5" :md="7" :lg="8" :xl="8">
        <div class="grid-content blank"></div>
      </el-col>
      <el-col :xs="24" :sm="14" :md="10" :lg="8" :xl="8">
        <div class="grid-content center-bar">
          <div v-if="store.gameBegin" class="game-zone">
            <div @click="selected(item,item.id,item.clickable)" :class="{'card':true,'covered':!item.clickable}" v-for="item in existedCards" :key="item.id" :style="{left: item.left + '%',top: item.top +'vh'}">
              <img v-if="item.imgSrc !== ''" :src="item.imgSrc" alt="">
            </div>
          </div>
          <audio ref="GoAudio" :src="GoAudio" loop autoplay></audio>
          <div v-if="!store.gameBegin" class="selection">
            <el-radio-group v-model="level" size="large">
              <el-radio-button label="简单" />
              <el-radio-button label="普通" />
              <el-radio-button label="困难" />
            </el-radio-group>
          </div>
            <button
                ref="button"
                v-if="buttonExist"
                class="begin-button"
                type="primary"
                @click.once="GameStart"
            >Start</button>
        </div>
      </el-col>
      <el-col :xs="0" :sm="5" :md="7" :lg="8" :xl="8">
        <div class="grid-content blank"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import backgroundImg from "../assets/img/csbg.jpg";
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

class table{
  constructor(id,index,clickable,isExist,imgSrc,left,top) {
    this.id = id;
    this.index = index;
    this.clickable = clickable;
    this.isExist = isExist;
    this.imgSrc = imgSrc;
    this.left = left;
    this.top = top;
  }
}

const CardWidth = 14;
const CardHeight = 12;

const indexArr = [];
for(let i=0;i<170;i++){
  indexArr.push(i);
}

export default {
  name: "Game",
  components: {},
  data(){
    return {
      img:[ak47,awp,eagle,m4a1,p250,r8,usp],
      backgroundImg,
      table:[],
      buttonExist:true,
      GoAudio,
      store,
      level:1,
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
      let left = 1;
      let top = 2;
      for(let i=1;i<=7;i++){
        left = 1;
        for(let j=1;j<=7;j++){
          let id = num++;
          let isExist = false;
          let index = k;
          let imgSrc ='';
          let clickable = false;
          this.table.push(new table(id,index,clickable,isExist,imgSrc,left,top));
          left += CardWidth;
        }
      top += CardHeight;
      }
      left = 8;
      top = 8;
      k++;
      for(let i=1;i<=6;i++){
        left = 8;
        for(let j=1;j<=6;j++){
          let id = num++;
          let isExist = false;
          let index = k;
          let imgSrc ='';
          let clickable = false;
          this.table.push(new table(id,index,clickable,isExist,imgSrc,left,top));
          left += CardWidth;
        }
        top += CardHeight;
      }
      k++;
      top = 2;
      for(let i=1;i<=7;i++){
        left = 1;
        for(let j=1;j<=7;j++){
          let id = num++;
          let isExist = false;
          let index = k;
          let imgSrc ='';
          let clickable = false;
          this.table.push(new table(id,index,clickable,isExist,imgSrc,left,top));
          left += CardWidth;
        }
        top += CardHeight;
      }
      left = 8;
      top = 8;
      k++;
      for(let i=1;i<=6;i++){
        left = 8;
        for(let j=1;j<=6;j++){
          let id = num++;
          let isExist = false;
          let index = k;
          let imgSrc ='';
          let clickable = false;
          this.table.push(new table(id,index,clickable,isExist,imgSrc,left,top));
          left += CardWidth;
        }
        top += CardHeight;
      }
    },
    isCovered(){
      this.table.forEach((card)=>{
          if(card.isExist && card.index < 4){
            for (const cardKey in this.table){
              if(this.table[cardKey].isExist && this.table[cardKey].index > card.index){
                let width = this.table[cardKey].left - card.left;
                width = width > 0 ? width : -width;
                let height = this.table[cardKey].top - card.top;
                height = height > 0 ? height : -height;
                console.log(width,height)
                if(width < CardWidth && height < CardHeight){
                  card.clickable = false;
                  break;
                }else{
                  card.clickable = true;
                }
              }
            }
          }
        })
    },
    initCard(level) {
      let cardNum = level*54;
      console.log("Game Start");
      let num = 0;
      indexArr.sort(()=>Math.random() - 0.5);
      while(num < cardNum){
        let imgIndex = Math.floor(Math.random()*7);
        let imgSrc = this.img[imgIndex];
        for (let i = 0; i < 3; i++) {
          if (num < cardNum) {
            this.table[indexArr[num]].imgSrc = imgSrc;
            this.table[indexArr[num]].isExist = true;
            num++;
          }
        }
      }
      console.log(this.table);
      this.table.forEach((card)=>{
        if(card.isExist)
          card.clickable = true;
      });
      this.isCovered();
    },
    GameStart(){
      let GameLevel;
      switch (this.level){
        case "简单": GameLevel = 1;break;
        case "普通": GameLevel = 2;break;
        case "困难": GameLevel = 3;break;
        default:break;
      }
      this.initCard(GameLevel);
      this.AudioOn();
      this.store.gameBegin = true;
    },
    insert(item){
      let index;
      /*这里的length是加入之前的length所以只-1不-2，还是挺坑的，逻辑陷阱吧算是*/
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
        },100);
        this.table.forEach((card)=>{
          card.clickable = false;
        });
      }
    },
    GameWin(){
      if(this.existedCards.length === 0){
        setTimeout(()=>{
          alert("You win!");
        },100);
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
      /*动态判断卡片是否被覆盖*/
      this.isCovered();
      /*判断是否消除*/
      this.removeArr(item,index);
      /*判断游戏是否输掉*/
      setTimeout(()=>{
        this.GameOver();
      },100);
      /*判断游戏是否胜利*/
      setTimeout(()=>{
        this.GameWin();
      },100);
    }
  },
  computed:{
    existedCards(){
      return this.table.filter((card)=>{
        return card.isExist === true;
      })
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
  .game-zone {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 88vh;
    background-color:transparent;
    border: #FFCC99 solid 0.2rem;
    border-radius: 2rem;
  }
  .card {
    position: absolute;
    width: 14%;
    height: 12vh;
    border-radius: 0.2rem;
    background: #e3e3e3;
    box-shadow: 0 0 0 2px #888888;
    & :hover{
      background: #ffffff;
    }
  }
  .covered{
    background: #b9b7b7;
    & :hover{
      background: #b9b7b7;
    }
  }
  .begin-button{
    background: linear-gradient(270deg, #3A85F7 0%, #7D1FF9 100%);
    margin-left: 27.5%;
    width: 45%;
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
    width: 100%;
    height: 12vh;
  }
  .selection{
    width: 100%;
    text-align: center;
    margin: 50vh auto 0;
  }
  .radioBox input{
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    padding: 0;
    background-color: #fff;
    border: 1px solid #c9c9c9;
    border-radius: 50%;
    outline: none;
    margin-right: 22px;
    cursor: pointer;
  }
</style>