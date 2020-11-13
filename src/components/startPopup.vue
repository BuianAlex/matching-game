<template>
  <li class="popup">
    <button class="styled-button" @click="startGame">start</button>
  </li>
</template>

<script>
console.log(this);
export default {
  methods: {
    startGame: function (){
      this.$emit('start');
    }
  },
}
</script>
<style lang="scss">
  .popup{
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
    button{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20%;
      height: 20%;
      font-size: 1.5rem;
    }
  }
</style>

