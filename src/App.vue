<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <game-board></game-board>
  </div>
</template>

<script>
  import Board from './components/gameBoard.vue';

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

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  #app {
    position: relative;
  }
  body {
    color: #5f6368;
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    min-width: 300px;
  }
  h1 {
    text-align: center;
  }
</style>
