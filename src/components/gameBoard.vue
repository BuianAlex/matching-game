<template>
  <div>
    <div class="game-board">
      <div class="game-header">
        <span>time: {{ gameTime | dateFormat }}</span>
        <span>moves: {{ calcMoves }}</span>
      </div>
      <start-popup
        v-if="!isGameStarted && sholdBeFind != 0"
        @start="startGame"
      />
      <won-popup
        v-if="sholdBeFind == 0"
        v-bind:result="{ gameTime, calcMoves, compareRecults }"
      />
      <ul class="cards-list">
        <li
          class="card"
          v-for="(card, index) in gameCards"
          :key="index"
          :class="[cardClass, card.isHasPair ? 'card-with-pair' : '']"
          @click="showCard(card)"
        >
          <span v-if="!card.isHidden" class="card-content">
            {{ card.value }}
          </span>
        </li>
      </ul>
    </div>
    <div class="restart-wrapper">
      <button
        class="btn-default"
        @click="setNewGame"
        v-if="isGameStarted || sholdBeFind == 0"
      >
        restart
      </button>
    </div>
    <div class="settings">
      <h2>Game settings</h2>
      <button
        class="btn-default"
        v-for="(btn, index) in sizeButtons"
        :key="index"
        :class="cardClass"
        :disabled="boardSize == btn.size"
        @click="setBoardSize(btn.size)"
      >
        {{ btn.name }}
      </button>
    </div>
  </div>
</template>

<script>
  import { generator, dateFormat } from './../utils';
  import StartPopup from './startPopup';
  import WonPopup from './wonPopup';
  import { sizeButtons, gameSpeed } from './../config/gameConfig';

  export default {
    components: {
      'start-popup': StartPopup,
      'won-popup': WonPopup,
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
        compareRecults: {},
      };
    },
    methods: {
      createCards: function() {
        const gameCardsObjectArray = [];
        const cardNames = generator(this.boardSize);
        this.sholdBeFind = this.boardSize / 2;
        cardNames.forEach((element) => {
          gameCardsObjectArray.push({
            value: element,
            isHidden: true,
            isHasPair: false,
          });
        });
        return gameCardsObjectArray;
      },
      setBoardSize: function(size) {
        this.boardSize = size;
        this.setNewGame();
        this.cardClass = `card-${size}`;
      },
      setNewGame: function() {
        this.isGameStarted = false;
        this.gameTime = 0;
        this.userChoise = [];
        this.calcMoves = 0;
        this.compareRecults = {};
        this.gameCards = this.createCards();
      },
      startGame: function() {
        this.isGameStarted = true;
        this.startTime = Date.now();
        this.timer();
      },
      timer: function() {
        if (this.isGameStarted) {
          this.gameTime = Date.now() - this.startTime;
          setTimeout(this.timer, 1000);
        }
      },
      showCard: function(card) {
        if (this.isClickOn) {
          card.isHidden = false;
          this.userChoise.push(card);
          if (this.userChoise.length === 2) {
            this.isClickOn = false;
            let cardOne = this.userChoise[0];
            let cardTwo = this.userChoise[1];
            if (cardOne.value !== cardTwo.value) {
              setTimeout(() => {
                cardTwo.isHidden = true;
                cardOne.isHidden = true;
                this.isClickOn = true;
              }, gameSpeed);
            } else {
              cardTwo.isHasPair = true;
              cardOne.isHasPair = true;
              this.sholdBeFind -= 1;
              this.isClickOn = true;
            }
            this.userChoise = [];
            this.calcMoves += 1;
          }
          if (this.sholdBeFind === 0) {
            this.saveResult();
            this.isGameStarted = false;
          }
        }
      },
      saveResult: function() {
        const oldRecord = this.$store.state.records[this.boardSize];
        if (oldRecord === undefined) {
          this.compareRecults = { isRecord: true };
          this.$store.commit('addRecord', {
            boardName: this.boardSize,
            result: { time: this.gameTime, moves: this.calcMoves },
          });
        } else {
          console.log();
          if (
            oldRecord.time > this.gameTime &&
            oldRecord.moves > this.calcMoves
          ) {
            this.compareRecults = { isRecord: true };
            this.$store.commit('addRecord', {
              boardName: this.boardSize,
              result: { time: this.gameTime, moves: this.calcMoves },
            });
          } else {
            this.compareRecults = { isRecord: false, oldRecord };
          }
        }
      },
    },
    filters: {
      dateFormat,
    },
    beforeMount() {
      this.gameCards = this.createCards();
    },
  };
</script>

<style lang="scss">
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
    font-size: 1.1rem;
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
    background-color: #2196f3;
    &-12 {
      width: calc(25% - 0.75% - 8px);
    }
    &-16 {
      width: calc(25% - 0.75% - 8px);
    }
    &-20 {
      @media (max-width: 317px) {
        width: calc(21% - 1% - 10px);
      }
      width: calc(20% - 1% - 10px);
    }
    &-30 {
      @media (max-width: 372px) {
        width: calc(21% - 1% - 10px);
      }
      width: calc(18% - 1.25% - 12px);
    }
    &-36 {
      @media (max-width: 372px) {
        width: calc(21% - 1.5% - 14px);
      }
      width: calc(18% - 1.25% - 12px);
    }
    &-42 {
      @media (max-width: 372px) {
        width: calc(18.5% - 1.5% - 14px);
      }
      @media (min-width: 372px) {
        width: calc(17.5% - 1.5% - 14px);
      }
      @media (min-width: 1001px) {
        width: calc(16.5% - 1.5% - 14px);
      }
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
      color: #fff;
      @media (min-width: 576px) {
        font-size: 3rem;
      }
      font-size: 2rem;
    }
    &-with-pair {
      opacity: 0.6;
    }
  }
  .settings {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-color: cornsilk;
    width: 95%;
    margin: 0 auto;
    padding: 50px 0 1rem;
    border-radius: 4px;
    @media (min-width: 768px) {
      width: 50%;
    }
    @media (min-width: 1200px) {
      width: 40%;
    }
    h2 {
      position: absolute;
      top: 0;
      text-transform: uppercase;
      font-size: 0.875rem;
    }
    button {
      min-width: 100px;
      color: #fff;
      background-color: #2196f3;
      margin: 0.375rem 1rem;
    }
  }
  .restart-wrapper {
    margin: 1rem;
    text-align: center;
    button {
      background-color: #2196f3;
      color: #fff;
    }
  }
</style>
