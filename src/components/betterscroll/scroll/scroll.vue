<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content" :style="{'padding-top':topdivheight+'px','min-height':'100%'}">
      <div ref="listWrapper">
        <slot>

        </slot>
      </div>
      <slot name="pullup"
            :pullUpLoad="pullUpLoad"
            :isPullUpLoad="isPullUpLoad"
      >
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <i class="iconfont" v-html="myicon"></i>{{mytext}}</div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="">
            <loading></loading>
          </div>
          <div v-else><span>{{refreshTxt}}</span></div>
        </div>
      </div>
    </slot>
    <!--<div ref="topdiv" class="topdiv" :style="{'top':topdivtop+'px'}">-->
    <div ref="topdiv" class="topdiv" :style="'transition-duration: '+durationTime+'ms;transform: translate(0px,'+topdivtop+'px) scale(1) translateZ(0px)'">
      <slot name="topdiv">

      </slot>
    </div>
  </div>
</template>

<script >
  import BScroll from 'better-scroll'
  import Loading from '../loading/loading.vue'
  import Bubble from '../bubble/bubble.vue'
  import { getRect } from '../js/dom'

  const COMPONENT_NAME = 'scroll'
  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'

  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      listenScrollEnd: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      scrollbar: {
        type: null,
        default: false
      },
      pullDownRefresh: {
        type: null,
        default: false
      },
      pullUpLoad: {
        type: null,
        default: false
      },
      startY: {
        type: Number,
        default: 0
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      freeScroll: {
        type: Boolean,
        default: false
      },
      mouseWheel: {
        type: Boolean,
        default: false
      },
      bounce: {
        default: true
      },
      zoom: {
        default: false
      },
      ifinit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        touchOn:false,
        bturnY:0,
        durationTime:0,
        lastScrollY:0,
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        pullDownStyle: '',
        bubbleY: 0,
        topdivheight:0,
        ifisinit:false,
        mytext:"下拉刷新",
        myicon:"&#xe7aa;",
        topdivtop:0
      }
    },
    computed: {
      pullUpTxt() {
        const moreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) || "加载更多"

        const noMoreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore) || "没有更多数据了"

        return this.pullUpDirty ? moreTxt : noMoreTxt
      },
      refreshTxt() {
        return (this.pullDownRefresh && this.pullDownRefresh.txt) || "刷新成功"
      }
    },
    created() {
      this.pullDownInitTop = -30+this.topdivheight
    },
    updated(){
    },
    mounted() {
      console.log('mounted')
      this.topdivheight = getRect(this.$refs.topdiv).height
      this.pullDownInitTop = -30+this.topdivheight
      this.ifisinit = true;
      if(this.ifinit){
        this.initScroll()
        this.refresh()
      }
    },
    destroyed() {
      this.$refs.scroll && this.$refs.scroll.destroy()
    },
    methods: {
      initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
          this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height - this.topdivheight+1}px`
        }

        let options = {
          probeType: this.probeType,
          click: this.click,
          scrollY: this.freeScroll || this.direction === DIRECTION_V,
          scrollX: this.freeScroll || this.direction === DIRECTION_H,
          scrollbar: this.scrollbar,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          startY: this.startY,
          freeScroll: this.freeScroll,
          mouseWheel: this.mouseWheel,
          bounce: this.bounce,
          zoom: this.zoom
        }

        this.scroll = new BScroll(this.$refs.wrapper, options)

        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        if (this.listenScrollEnd) {
          this.scroll.on('scrollEnd', (pos) => {
            this.$emit('scroll-end', pos)
          })
        }

        if (this.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScrollStart')
          })

          this.scroll.on('scrollStart', () => {
            this.$emit('scroll-start')
          })
        }

        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }

        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        console.log("重新渲染")
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      clickItem(e, item) {
        this.$emit('click', item)
      },
      destroy() {
        this.scroll.destroy()
      },
      closePullUp(){
        this.pullUpDirty = false
        this.scroll.closePullUp()
      },
      openPullUp(){
        this.pullUpDirty = true
        this.scroll.openPullUp()
      },
      forceUpdate(dirty) {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          // this.pullUpDirty = dirty
          this.refresh()
        } else {
          this.refresh()
        }
      },
      _initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false
          this.isPullingDown = true
          this.$emit('pullingDown')
        })

        this.scroll.on('scrollStart', () => {
          this.touchOn=true
        })
        this.scroll.on('touchEnd', () => {
          this.touchOn=false
        })
        this.scroll.on('scrollEnd', (pos) => {
          // console.log("滚动结束")
          this.bturnY=pos.y;
        })

        this.scroll.on('scroll', (pos) => {
          if (!this.pullDownRefresh) {
            return
          }
          if(getRect(this.$refs.topdiv).height>0){
            // console.log(pos.y)
            let newScrollY=pos.y;
            if(newScrollY>0){
              this.durationTime=0;
              this.topdivtop=0;
            }else{
              if(this.touchOn){
                // console.log("手指")
                //手指滑动屏幕时
                if((this.bturnY>newScrollY&&newScrollY>this.lastScrollY)||
                  (this.bturnY<newScrollY&&newScrollY<this.lastScrollY)
                ){//转向
                  this.bturnY=newScrollY;
                }
                if(newScrollY-this.bturnY>20){
                  this.durationTime=300;
                  this.topdivtop=0;
                }else{
                  if(this.topdivtop==0&&newScrollY<-10){
                    if(this.bturnY-newScrollY>20){
                      console.log("收起")
                      this.durationTime=0;
                      this.topdivtop=newScrollY;
                    }
                  }else{
                    this.durationTime=0;
                    this.topdivtop=newScrollY;
                  }
                }
              }else{
                if(this.topdivtop==0){
                  this.topdivtop=0;
                }else{
                  this.durationTime=0;
                  this.topdivtop=newScrollY;
                }
              }
            }
            this.lastScrollY=newScrollY
          }
          if(pos.y>this.pullDownRefresh.threshold){
            this.myicon="&#xe7a8;"
            this.mytext="松开刷新"
          }else{
            this.myicon="&#xe7aa;"
            this.mytext="下拉刷新"
          }
          if (this.beforePullDown) {
            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10+this.topdivheight)}px`
          } else {
            this.bubbleY = 0
          }

          if (this.isRebounding) {
            this.pullDownStyle = `top:${10+this.topdivheight - (this.pullDownRefresh.stop - pos.y)}px`
          }
        })
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
          if(this.pullUpDirty){
            this.isPullUpLoad = true
            this.$emit('pullingUp')
          }
        })
      },
      _reboundPullDown() {
        const {stopTime = 600} = this.pullDownRefresh
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true
            this.scroll.finishPullDown()
            resolve()
          }, stopTime)
        })
      },
      _afterPullDown() {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`
          this.beforePullDown = true
          this.isRebounding = false
          this.refresh()
        }, this.scroll.options.bounceTime)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.forceUpdate(true)
        }, this.refreshDelay)
      },
      ifinit(){
        if(this.ifisinit){
          this.initScroll();
          this.refresh()
        }else{
          this.ifisinit = true;
        }

      }
    },
    components: {
      Loading,
      Bubble
    }
  }
</script>

<style scoped lang="scss">
  .list-wrapper {
    position: relative;
    height: 100%;
    overflow: hidden;
    background: #fff;
    .topdiv{
      position: absolute;
      top:0;
      background-color: #FFF;
      width:100%;
      overflow: hidden;
      z-index: 10;
    }
    .scroll-content {
      position: relative;
      z-index: 1;
      box-sizing: border-box;
    }
    .list-content {
      position: relative;
      z-index: 10;
      background: #fff;
      .list-item {
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        padding-left: 20px;
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }
  .pulldown-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content :center;
    align-items :center;
    transition: all;
    .after-trigger {
      margin-top: 10px;
    }
  }

  .pullup-wrapper {
    width: 100%;
    display: flex;
    justify-content :center;
    align-items :center;
    padding: 16px 0;
  }
</style>
