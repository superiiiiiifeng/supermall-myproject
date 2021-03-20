<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  .tab-bar {
    width: 100%;
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    box-shadow: -2px 3px 10px rgba(155,17,17,.3);
    z-index: 9999;
  }
</style>
