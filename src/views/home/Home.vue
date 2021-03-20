<template>
  <div id="home">
    <NavBar class="home-nav-bar">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl :titles="['流行','新款','精选']"
                ref="tabControl1"
                v-show="isTabFixed"
                @tabClick="tabClick"/>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners"/>
      <HomeRecommendView :recommends="recommends"/>
      <HomeFeatureView/>
      <TabControl :titles="['流行','新款','精选']"
                  ref="tabControl2"
                  v-show="!isTabFixed"
                  @tabClick="tabClick"/>
      <GoodsList :goods="showGoods"/>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeatureView from './childComps/HomeFeatureView'

  import {getHomeMultiData,getHomeGoods} from "network/homeRequest"
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pops': {page: 0, list: []},
          'news': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        goodsList: ['pops','news','sell'],
        currentIndex: 0,
        isShowBackTop: false,
        isTabFixed: false,
        tabOffsetTop: 0,
        isFirst: false,
        saveY: 0
      }
    },
    created() {
      this.getHomeMultiData();

      this.getHomeGoods('pops');
      this.getHomeGoods('news');
      this.getHomeGoods('sell');
    },
    mounted() {
      // 刷新scrollHeight
      const refresh = debounce(this.$refs.scroll.refresh,200);
      // 采用$bus事件总线监听item中图片加载完成后刷新，实现跨组件(非父子)通信
      this.$bus.$on('itemImgLoad',() => {
        // console.log(this.$refs.scroll);
        // this.$refs.scroll && this.$refs.scroll.refresh()
        refresh()
      });
      // 此处获取tabControl2组件中元素tab-control的offsetTop属性值不太合适，因为可能图片还未加载
      // console.log(this.$refs.tabControl2.$el.offsetTop);
    },
    methods: {
      // 网络请求数据方法
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          console.log(res);
          this.banners = res.banners;
          this.recommends = res.recommends;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          console.log(res);
          // console.log(res[type]);
          this.goods[type].list.push(...res[type].list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp();
        })
      },
      // 事件监听相关方法
      tabClick(index) {
        // console.log(index);
        this.currentIndex = index;
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        // console.log(this.$refs.scroll.bscroll);
        this.$refs.scroll.bscroll.scrollTo(0,0,500)
      },
      contentScroll(position) {
        // console.log(position);
        // console.log(-position.y);
        // 判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1500;
        // 计算吸顶距离
        if(!this.isFirst) { //节流阀
          // console.log(this.$refs.tabControl2.$el.offsetTop);
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
          this.isFirst = true
        }
        // 判断tabControl2是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
        // 调整可滚动区域高度，解决滚动到最底部的显示问题
        this.$refs.scroll.$el.style.height = this.isShowBackTop?"calc(100vh - 130px)":"calc(100vh - 90px)";

      },
      loadMore() {
        // console.log('loadMore');
        this.getHomeGoods(this.goodsList[this.currentIndex]);
        // 此处采用scroll的refresh()方法解决下拉卡顿问题不太合适，应在GoodsListItem组件中监听每一张图片加载完成即调用refresh函数
        // this.$refs.scroll.bscroll.refresh()
      },

    },
    computed: {
      showGoods() {
        return this.goods[this.goodsList[this.currentIndex]].list
      }
    },
    destroyed() {
      console.log('destroyed');
    },
    activated() {
      // 重新进入Home页面，跳转到上一次滚动位置
      this.$refs.scroll.bscroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 离开Home页面，保存当前滚动位置
      this.saveY = this.$refs.scroll.bscroll.y
    }
  }
</script>

<style scoped>

  #home {
    /*padding-top: 44px;*/
    /*因为采用了滚动插件，以下代码可省略*/
    /*padding-bottom: 49px;*/
  }
  .home-nav-bar {
    background-color: var(--color-tint);
    box-shadow: 0 1px 3px rgba(155, 5, 77, 0.5);
    color: #fff;
  /* 以下属性适用于采用原生滚动
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  */
  }
  img {
    width: 100%;
  }
  /*采用better-scroll插件导致下列吸顶效果属性失效，而且此属性兼容性较差，因此采用别的方式实现吸顶*/
  /*.home-tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  background-color: #fff;*/
  /*  z-index: 999;*/
  /*}*/
  .content {
    height: calc(100vh - 90px);
    overflow: hidden;
  }
  .tab-control {
    position: relative;
    z-index: 999;
  }
</style>
