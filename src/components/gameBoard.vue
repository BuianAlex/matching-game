<template>
  <div>
    <div class="game-board">
      <div class="game-header">
        <span>{{ gameTime | dateFormat }}</span>
        <span>moves: {{ calcMoves }}</span>
      </div>
      <start-popup v-if="!isGameStarted" @start="startGame" />
      <ul class="cards-list">
        <li
          class="card"
          v-for="(card, index) in gameCards"
          :key="index"
          :class="cardClass"
          @click="showCard(card)"
        >
          <span v-if="!card.isHidden" class="card-content">
            {{ card.value }}
          </span>
        </li>
      </ul>
    </div>
    <div class="restart-wrapper">
      <button class="styled-button" @click="setBoardSize(12)">restart</button>
    </div>
    <h3>Set game bord size</h3>
    <div class="button-wrap">
      <button
        :disabled="boardSize == 12"
        class="styled-button"
        @click="setBoardSize(12)"
      >
        4x3
      </button>
      <button
        :disabled="boardSize == 16"
        class="styled-button"
        @click="setBoardSize(16)"
      >
        4x4
      </button>
      <button
        :disabled="boardSize == 20"
        class="styled-button"
        @click="setBoardSize(20)"
      >
        5x4
      </button>
      <button
        :disabled="boardSize == 30"
        class="styled-button"
        @click="setBoardSize(30)"
      >
        6x5
      </button>
      <button
        :disabled="boardSize == 36"
        class="styled-button"
        @click="setBoardSize(36)"
      >
        6x6
      </button>
      <button
        :disabled="boardSize == 42"
        class="styled-button"
        @click="setBoardSize(42)"
      >
        7x6
      </button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import generator from './../utils/generator';
  import StartPopup from './startPopup';
  import { sizeButtons } from './../config/gameConfig';
  console.log(sizeButtons);

  export default {
    components: {
      'start-popup': StartPopup,
    },
    data() {
      return {
        sizeButtons,
        gameCards: [],
        boardSize: 12,
        cardClass: `card-12`,
        isGameStarted: false,
        gameTime: 0,
        startTime: 0,
        userChoise: [],
        calcMoves: 0,
        sholdBeFind: 0,
        isClickOn: true,
      };
    },
    methods: {
      createCards: function() {
        const gameCardsObjectArray = [];
        const cardNames = generator(this.boardSize);
        this.sholdBeFind = this.boardSize / 2;
        cardNames.forEach((element) => {
          gameCardsObjectArray.push({ value: element, isHidden: true });
        });
        return gameCardsObjectArray;
      },
      setBoardSize: function(size) {
        this.boardSize = size;
        this.setNewGame();
        console.log(this.gameCards);
        this.cardClass = `card-${size}`;
      },
      setNewGame: function() {
        this.isGameStarted = false;
        this.gameTime = 0;
        this.userChoise = [];
        this.calcMoves = 0;
        this.gameCards = this.createCards();
        console.log(this);
      },
      startGame: function() {
        this.isGameStarted = true;
        this.startTime = moment();
        this.timer();
        console.log('start');
      },
      timer: function() {
        if (this.isGameStarted) {
          this.gameTime = moment() - this.startTime;
          setTimeout(this.timer, 1000);
        }
      },
      showCard: function(card) {
        if (this.isClickOn) {
          card.isHidden = false;
          this.userChoise.push(card);
          if (this.userChoise.length === 2) {
            this.isClickOn = false;
            const cardOne = this.userChoise[0];
            const cardTwo = this.userChoise[1];
            if (cardOne.value !== cardTwo.value) {
              setTimeout(() => {
                cardTwo.isHidden = true;
                cardOne.isHidden = true;
                this.isClickOn = true;
              }, 1000);
            } else {
              this.sholdBeFind -= 1;
            }

            this.userChoise = [];
            this.calcMoves += 1;
          }
          if (this.sholdBeFind === 0) {
            this.isGameStarted = false;
          }
          console.log(this.userChoise, this.calcMoves);
        }
      },
    },
    filters: {
      dateFormat: function(t) {
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        // let days = Math.floor(t / (1000 * 60 * 60 * 24));
        return `${String(hours).length === 1 ? `0${hours}` : hours}:${
          String(minutes).length === 1 ? `0${minutes}` : minutes
        }:${String(seconds).length === 1 ? `0${seconds}` : seconds}`;
      },
    },
    beforeMount() {
      this.gameCards = this.createCards();
    },
  };
</script>

<style lang="scss">
  h3 {
    text-align: center;
  }
  .game-board {
    position: relative;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
      width: 50%;
    }
    @media (min-width: 1200px) {
      width: 40%;
    }
  }
  .game-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 1rem 0;
    text-align: center;
    line-height: 2rem;
    font-size: 1.5rem;
  }
  .cards-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0;
    padding-left: 0.5%;
  }

  .card {
    display: block;
    position: relative;
    flex-grow: 1;
    margin: 0.25% 0.5% 0.25% 0;
    border: 1px solid #000;
    border-radius: 4px;
    cursor: pointer;
    background-color: burlywood;
    &-12 {
      width: calc(25% - 0.75% - 8px);
    }
    &-16 {
      width: calc(25% - 0.75% - 8px);
    }
    &-20 {
      width: calc(20% - 1% - 10px);
    }
    &-30 {
      width: calc(18% - 1.25% - 12px);
    }
    &-36 {
      width: calc(18% - 1.25% - 12px);
    }
    &-42 {
      width: calc(17.5% - 1.5% - 14px);
    }
    &:after {
      content: '';
      display: block;
      padding-top: 100%;
    }
    &-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 3rem;
    }
  }
  .card-content {
    // font-size: 3rem;
    color: #fff;
  }
  .button-wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .restart-wrapper {
    margin: 1rem;
    text-align: center;
  }
  .styled-button {
    color: #fff;
    background-color: #2196f3;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.125rem;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    display: inline-block;
    height: 2.25rem;
    padding: 0 1.625rem;
    margin: 0.375rem 1rem;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    text-align: center;
    line-height: 2.25rem;
    vertical-align: middle;
    white-space: nowrap;
    user-select: none;
    font-size: 0.875rem;
    font-family: inherit;
    letter-spacing: 0.03em;
    position: relative;
    overflow: hidden;
    &:hover {
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.2);
      animation-duration: 0.0001s;
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.6;
      box-shadow: none;
    }
  }
</style>
