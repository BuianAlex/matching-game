<template>
  <div class="wonPopup">
    <div class="wonPopup-message">
      <h1>Congrate you are Won!</h1>
      <p>Your result: <b>10</b> moves by <b>00:00:00</b></p>
      <p>Best result:</p>
      <!-- <div class="wonPopup-btn">
        <button class=" btn-default" @click="close">Play agan</button>
      </div> -->
    </div>
  </div>
</template>

<script>
  console.log(this);
  export default {
    methods: {
      close: function() {
        console.log('close');
      },
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
