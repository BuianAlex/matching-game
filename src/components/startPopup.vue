<template>
  <div class="popup">
    <button class="btn-default" @click="startGame">start</button>
  </div>
</template>

<script>
  export default {
    methods: {
      startGame: function() {
        this.$emit('start');
      },
    },
  };
</script>
<style lang="scss">
  .popup {
    position: absolute;
    right: 0;
    width: 100%;
    height: calc(100% - 4rem);
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    z-index: 10;
    button {
      position: absolute;
      top: 48%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #2196f3;
      color: #fff;
    }
  }
</style>
