<template>
  <div class="home-recommends">
    <div v-for="item in recommends" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .home-recommends {
    display: flex;
    width: 100%;
    font-size: 12px;
    text-align: center;
    padding: 10px 0 15px;
    border-bottom: 6px solid #eee;
  }
  .recommends-item {
    flex: 1;
  }
  .recommends-item img {
    width: 90%;
    border-radius: 50%;
    margin-bottom: 5px;
  }
</style>
