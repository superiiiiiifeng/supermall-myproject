<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        bscroll: null
      }
    },
    mounted() {
      this.bscroll = new BScroll(this.$refs.wrapper,{
        probeType: this.probeType, //设置为1/2/3时，实时派发scroll 事件以便侦测滚动到的位置
        click: true ,//better-scroll 默认会阻止浏览器的原生 click 事件, button按钮的点击事件除外。当设置为 true，better-scroll 会派发一个 click 事件
        // pullUpLoad: true, //这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载
        pullUpLoad: this.pullUpLoad
      });
      // console.log(this.$refs.wrapper);
      // console.log(this.probeType);//注意：一旦pullUpLoad生效，probeType也一定生效，因为此时默认会实时派发scroll事件
      // 监听滚动的位置
      if(this.probeType !== 0) {
        this.bscroll.on('scroll',(position) => {
          // console.log(position);
          this.$emit('scroll',position)
        });
      }
      // 上拉加载更多
      if (this.pullUpLoad) {
        this.bscroll.on('pullingUp',() => {
          this.$emit('pullingUp');
          // console.log('触发时机：在一次上拉加载的动作后，这个时机一般用来去后端请求数据');
          //当上拉加载数据加载完毕后，需要执行 finishPullUp 方法
          // this.bscroll.finishPullUp(); //作用：当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载,此时才能继续监听pullingUp事件
          // setTimeout(() => {
          //   this.bscroll.finishPullUp()
          // },2000) //延时2s再监听上拉加载事件，防止重复调用，导致重复向后台请求数据
        });
      }
    },
    methods: {
      refresh() {
        this.bscroll && this.bscroll.refresh()
      },
      finishPullUp() {
        this.bscroll && this.bscroll.finishPullUp()
      }
    }
  }

  /*
    better-scroll可滚动区域的问题：
      scrollerHeight属性为content内容的高度
      但是，下拉加载更多的时候，图片还未加载，因此计算scrollerHeight属性时并不会将图片高度计算在内
      因此，后来图片加载出来以后，撑大了content的高度，但是scrollerHeight属性并不会立即更新
      所以，滚动就会出现卡顿
      调用scroll的refresh()函数可以解决此问题
      何时调用呢？在图片加载后调用
      但是，每张图片加载后都refresh会导致刷新频繁，造成性能恶化
      可进行防抖操作组织频繁刷新(防抖debounce和节流throttle常用于搜索框优化)

   */
</script>

<style scoped>

</style>
