<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <game-board></game-board>
  </div>
</template>

<script>
  import Board from './gameBoard.vue';

  export default {
    components: {
      'game-board': Board,
    },
    data() {
      return {
        title: 'Matching game',
      };
    },
  };
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  #app {
    position: relative;
    h1 {
      text-align: center;
    }
  }
  body {
    color: #443600;
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    width: 100vw;
    margin: 0;
    // min-width: 300px;
  }
  .btn-default {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.125rem;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.87);
    background-color: #fff;
    transition: all 0.2s ease-in-out;
    display: inline-block;
    height: 2.25rem;
    padding: 0 1.625rem;
    margin: 0.375rem 0;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    touch-action: manipulation;
    background-image: none;
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
    animation-duration: 0.0001s;
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.6;
      box-shadow: none;
    }
    &:focus:hover {
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.2);
    }
  }
</style>
