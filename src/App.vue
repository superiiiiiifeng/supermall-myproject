<template>
  <div id="app">
   <keep-alive>
     <router-view/>
   </keep-alive>
    <MainTabBar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabBar/MainTabBar'
  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
