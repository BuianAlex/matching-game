<template>
  <div class="wonPopup">
    <div class="wonPopup-message">
      <h1>Congratulations! You have won!</h1>
      <p>
        Your result: <b>{{ result.calcMoves }}</b> moves in
        <b>{{ result.gameTime | dateFormat }}</b>
      </p>
      <p v-if="!result.compareRecults.isRecord">
        Your best score is:
        <b>{{ result.compareRecults.oldRecord.moves }}</b> moves by
        <b>{{ result.compareRecults.oldRecord.time | dateFormat }}</b>
      </p>
      <p v-else>NEW RECORD!!!</p>
    </div>
  </div>
</template>

<script>
  import { dateFormat } from './../utils';

  export default {
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
    h1 {
      text-align: center;
    }
    &-message {
      position: absolute;
      width: 90%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #665100;
      text-align: center;
    }
  }
</style>
