<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class="{active: index === currentIndex}"
             @click="titleClick(index)">{{item}}</div>
      </div>
    </NavBar>
  </div>
</template>

<script>

  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    components: {
      NavBar,

    },
    data() {
      return {
        titles: ['商品','详情','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
      },
      backClick() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
 .title {
   display: flex;
   justify-content: space-around;
   font-size: 15px;
 }
  .active {
    color: var(--color-heigh-text);
  }
  .back img {
    vertical-align: middle;
  }
</style>
