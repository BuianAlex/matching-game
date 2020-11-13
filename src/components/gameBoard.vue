<template>
<div>
  <div class="game-header">
    <span>{{gameTime | dateFormat}}</span>
    <span>moves: {{calcMoves}}</span>
  </div>
  <ul class="game-board">
    <start-popup v-if="!isGameStarted" @start="startGame" />
    <li class="card"  v-for="( card, index ) in gameCard" :key="index" :class="cardClass" @click="showCard(card)">
      <span v-if="!card.isHidden" class="card-content">
        {{card.value}}
      </span>
    </li>
  </ul>
  <h3>Set game bord size</h3>
  <div class="button-wrap">
    <button :disabled="boardSize==12" class="styled-button" @click="setBoardSize(12)">4x3</button>
    <button :disabled="boardSize==16" class="styled-button" @click="setBoardSize(16)">4x4</button>
    <button :disabled="boardSize==20" class="styled-button" @click="setBoardSize(20)">5x4</button>
    <button :disabled="boardSize==30"  class="styled-button" @click="setBoardSize(30)">6x5</button>
    <button :disabled="boardSize==42" class="styled-button" @click="setBoardSize(42)">7x6</button>
  </div>
</div>
</template>

<script>
import moment  from 'moment';
import generator from './../utils/generator';
import StartPopup from './startPopup'
export default {
   components: {
    'start-popup':  StartPopup,
  },
   data(){
     return{
       gameCard:  [],
       boardSize: 12,
       cardClass: `card-12`,
       isGameStarted: false,
       gameTime: 0,
       startTime: 0,
       userChoise: [],
       calcMoves: 0,
       sholdBeFind: 0,
    }
  },
  methods: {
    setBoardSize: function (size){
      this.setDefault();
      this.boardSize = size;
      this.gameCard = generator(this.boardSize);
      this.cardClass = `card-${size}`
      console.log(this.boardSize);
    },
    setDefault: function(){
      this.isGameStarted = false;
      this.gameTime = 0;
      this.userChoise = [];
      this.calcMoves = 0;
    },
    startGame: function(){
      this.isGameStarted = true;
      this.startTime = moment();
      this.timer();
      console.log("sdsdds");
    },
    timer: function(){
      if(this.isGameStarted){
        this.gameTime = moment() - this.startTime;
        setTimeout(this.timer, 1000);
      }
    },
    showCard: function(card){
      card.isHidden = false;
      this.userChoise.push(card);
      if(this.userChoise.length ===2){
        const cardOne = this.userChoise[0];
        const cardTwo = this.userChoise[1];
        if(cardOne.value !== cardTwo.value){
          setTimeout(()=>{
            cardTwo.isHidden = true;
            cardOne.isHidden = true;
            }, 1000);
        }
        else{
          this.sholdBeFind -=1;
        }  
        this.userChoise = [];
        this.calcMoves += 1;
      }
      if(this.sholdBeFind === 0){
        this.isGameStarted =  false;
      }
      console.log(this.userChoise, this.calcMoves);
    } 
  },
  filters: {
    dateFormat: function (t) {
      let seconds = Math.floor((t / 1000) % 60);
      let minutes = Math.floor((t / 1000 / 60) % 60);
      let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      // let days = Math.floor(t / (1000 * 60 * 60 * 24));
      return `${String(hours).length === 1 ? `0${hours}`: hours}:${String(minutes).length === 1 ? `0${minutes}`: minutes}:${String(seconds).length === 1 ?  `0${seconds}`: seconds}`;
    }
  },
  beforeMount(){
    const cardNames = generator(this.boardSize);
    this.sholdBeFind = this.boardSize / 2;
    cardNames.forEach(element => {
      this.gameCard.push({value: element, isHidden: true})
    });
 },
 

}
</script>

<style lang="scss">
  h3{
    text-align: center;
    }
  .game-board{
    position: relative;
    width: 80%;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }
  .game-header{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
    text-align: center;
    line-height: 2rem;
    font-size: 1.5rem;
  }
 .card{
    display: block;
    position: relative;
    margin: .25% .5% .25% 0;
    border: 1px solid #000;
    border-radius: 4px;
    cursor: pointer;
    background-color: burlywood;
    &-12{
      width: 24.1686%;
      &:nth-child(4n){
        margin-right: 0;
      }
    }
    &-16{
      width: 24%;
    }
    &-20{
      width: 19.5%;
    }
    &-30{
      width: 16.1%;
    }
    &-36{
      width: 16.1%;
    }
    &-42{
      width: 13.5%;
    }
    &:after {
      content: '';
      display: block;
      padding-top: 100%;
    }
    &-content{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);  
  }
  
}
.button-wrap{
    display: flex;
    justify-content: center;
}
.styled-button{
    color: #FFF;
    background-color: #2196F3;
    font-weight: 500;
    font-size: .875rem;
    line-height: 1.125rem;
    text-transform: uppercase;
    transition: all .2s ease-in-out;
    display: inline-block;
    height: 2.25rem;
    padding: 0 1.625rem;
    margin: .375rem 1rem;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    background-image: none;
    text-align: center;
    line-height: 2.25rem;
    vertical-align: middle;
    white-space: nowrap;
    user-select: none;
    font-size: .875rem;
    font-family: inherit;
    letter-spacing: .03em;
    position: relative;
    overflow: hidden;
    &:hover{
      box-shadow: 0 0 2px rgba(0,0,0,.12), 0 2px 2px rgba(0,0,0,.2);
      animation-duration: 0.0001s;
    }
    &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: .6;
    box-shadow: none;
    }
}
</style>