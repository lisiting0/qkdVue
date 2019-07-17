<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right"><i class="iconfont">&#xe679;</i></a>群聊
      </div>
    </div>
    <div class="wrapper" ref="wrapper" :style="{height:myScrollerHeight+'px'}">
      <ul class="content" ref="ul">
        <div class="search">
          <input type="input" placeholder="搜索" @change="search">
        </div>
        <ul>
          <li class="lableList" v-for="item in lableList" :key="item.id">
            <img :src="item.icon"/><span>{{item.title}}</span>
          </li>
        </ul>
        <div class="ulfooter">
          <span>{{lableList.length}}个群聊</span>
        </div>
      </ul>
    </div>

  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import BScroll from 'better-scroll'
  export default {
    name: 'groupChat',
    data () {
      return {
        myScrollerHeight:0,
        isloading:false,
        lableList:[{
          id:1,
          title:"科学城娇友",
          icon:"http://mis.iceinfo.net:8080/jiaoyou/static/e1.jpg"
        },{
          id:2,
          title:"学习小组",
          icon:"http://mis.iceinfo.net:8080/jiaoyou/static/e2.jpg"
        },{
          id:3,
          title:"驴友团",
          icon:"http://mis.iceinfo.net:8080/jiaoyou/static/e3.jpg"
        },{
          id:4,
          title:"一起旅游",
          icon:"http://mis.iceinfo.net:8080/jiaoyou/static/e4.jpg"
        },{
          id:5,
          title:"发现美食",
          icon:"http://mis.iceinfo.net:8080/jiaoyou/static/e5.jpg"
        },{
          id:6,
          title:"宝爸宝妈交流",
          icon:"http://mis.iceinfo.net:8080/jiaoyou/static/e6.jpg"
        },{
          id:7,
          title:"宝爸宝妈交流",
          icon:"http://mis.iceinfo.net:8080/jiaoyou/static/e3.jpg"
        }]

      }
    },
    computed: {

    },
    mounted () {
      this.myScrollerHeight = document.body.clientHeight-$(".header").height()-$(".footer").height()-0.75*parseInt(document.documentElement.style.fontSize)-2;
      this.$nextTick(function () {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType:3,
          click:true
        })
      })
    },
    destroyed () {
    },
    components: {
      Loading,
	  Back,
    },
    methods:{
      search(){

      }
    }
  }
</script>
<style scoped lang="scss">
  .main{
    padding-bottom: 0;
    &:before{
      background-color:#3a3845 ;
    }
    .header{
      .top{
        background-color:#3a3845 ;
        color:#FFF;
        font-size: 0.52rem;
        position: relative;
        i{
          font-size: 0.52rem;
        }
        a{
          position:absolute;
          padding:3px;
        }
        .left{
          left:0.325rem;
        }
        .right{
          right:0.325rem;
        }
      }
    }
    .wrapper{
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
    }
    .content{
      .search{
        color: #01a600;
        background-color: #f7f7f7;
        padding:0.3rem 0;
        i{
          font-size:0.48rem;
        }
      }
      ul{
        padding:0 0.45rem;
      }
      .lableList{
        border-bottom: 1px solid #f6f6f6;
        height: 1.56rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        img{
          border-radius: 5px;
          height: 1rem;
          width:1rem;
        }
        span{
          margin-left: 0.26rem;
          font-size: 0.46rem;
          font-weight: normal;
          color:#000;
        }
      }
      .ulfooter{
        height:1.53rem;
        line-height: 1.53rem;
        font-size:0.36rem;
        text-align: center;
        color:#a1a1a1;
      }
    }


  }
</style>
