<template>
  <div class="popup">
    <button class="btn" @click="startGame">start</button>
  </div>
</template>

<script>
  console.log(this);
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
    top: 49px;
    right: 0;
    width: 100%;
    height: calc(100% - 49px);
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10;
    button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20%;
      height: 20%;
      font-size: 1.5rem;
      background-color: #2196f3;
      border: none;
      color: #fff;
    }
    .btn {
      background-color: #2196f3;
      border: none;
      color: #fff;
      text-transform: uppercase;
      transition: all 0.2s ease-in-out;
      border-radius: 2px;
      letter-spacing: 0.03em;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.2);
        animation-duration: 0.0001s;
      }
    }
  }
</style>
