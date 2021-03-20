<template>
  <div id="detail">
    <DetailNavBar/>
  </div>
</template>

<script>

  import DetailNavBar from './childComps/DetailNavBar'
  import {getDetail} from 'network/detailRequest'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,

    },
    data() {
      return {
        id: null,
        type: ''
      }
    },
    activated() { //有页面缓存功能(keep-alive)的不能在created里修改id
      // 1.保存当前商品type和id值
      // console.log(this.$route.query);
      this.type = this.$route.query.type;
      this.id = this.$route.query.id;
      // 2.根据id值请求详情数据
      getDetail(this.type,this.id).then(res => {
        console.log(res);
      })
    }
  }
</script>

<style scoped>

</style>
