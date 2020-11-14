<template>
  <div class="wonPopup">
    <div class="wonPopup-message">
      <h1>Congrate you are Won!</h1>
      <p>
        Your result: <b>{{ result.calcMoves }}</b> moves by
        <b>{{ result.gameTime | dateFormat }}</b>
      </p>
    </div>
  </div>
</template>

<script>
  import { dateFormat } from './../utils';

  export default {
    methods: {
      close: function() {
        console.log('close');
      },
    },
    props: {
      result: Object,
    },
    filters: {
      dateFormat: dateFormat,
    },
  };
</script>
<style lang="scss">
  .wonPopup {
    position: absolute;
    top: 48px;
    right: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 48px);
    background-color: #dbfff8;
    z-index: 10;
    &-message {
      position: absolute;
      width: 90%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #665100;
    }
  }
</style>
