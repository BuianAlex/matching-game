<template>
  <div id="app">
    <h1>{{title}}</h1>
    <game-board></game-board>
  </div>
</template>

<script>
import Board from './components/gameBoard.vue';

export default {
  components: {
    'game-board':  Board,
  },
   data(){
     return{
       title:  'Matching game'
    }
  }
}
</script>

<style>
  body{
    color: #5f6368;
  }
  h1{
    text-align: center;
    }
</style>
