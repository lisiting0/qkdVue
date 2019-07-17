<template>
  <div class="page" ref="scrollTop" @scroll="scroll">
  <div class="user-div">
    <Loading v-if="isloading"></Loading>
    <div class="user_top" :class="{userTop:userTop}">
      <div ref="header" class="header">
        <div class="top">
          <Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right"><i class="iconfont">&#xe679;</i></a>娇友金屋
        </div>
      </div>
      <div class="content">
        <p>乾坤币</p>
        <p>{{$store.state.userInfo.userMoney}}<span>枚</span></p>
        <ul class="jw_l">
          <li><router-link :to="{name:'recharge'}" class="icon_cz">充值</router-link></li>
          <li><router-link :to="{name:'earnCoin'}" class="icon_jbw">赚乾坤币</router-link></li>
          <li><a class="icon_jyjl">交易记录</a></li>
        </ul>
      </div>
    </div>
    <ul class="jw_l jw_lg">
      <li><a class="icon_shop2">购物</a></li>
      <li><a class="icon_gift">送礼</a></li>
      <li><a class="icon_prize2">抽奖</a></li>
      <li><a class="icon_juan">换劵</a></li>
    </ul>
    <div class="detail">
      <div><p>{{safeHouse.promotionAwards}}<i>枚</i></p><p>推广奖励</p></div>
      <div><p>{{safeHouse.eventAwards}}<i>枚</i></p><p>活动奖励</p></div>
      <div><p>{{safeHouse.livelyAwards}}<i>枚</i></p><p>活跃奖励</p></div>
      <router-link tag="div" :to="{name:'bond'}"><p>{{safeHouse.deposit}}<i>元</i></p><p>交友保证金</p></router-link>
    </div>
    <div class="moment-cls">
      <p>娇友推荐<i class="iconfont">&#xe702;</i></p>
      <p>
        <a v-for="item in safeHouse.recommendList">
          <span  :style="'background-image:url('+getFullPath(item.img)+');'">
      </span>
          <span>{{item.content}}</span>
        </a>
      </p>
    </div>
  </div>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import safeHouse from './safeHouse.data'
  export default {
    name: 'safeHouse',
    data () {
      return {
        isloading:false,
        safeHouse:safeHouse.user,
        userTop:false,
      }
    },
    components: {
      Loading,
	  Back,
    },
	mounted(){
		const t=this;
		t.$store.dispatch("CHECKMONEY");//查询用户当前的乾坤币
	},
    methods:{
      scroll(){
        if(this.$refs.scrollTop.scrollTop>10){
          this.$refs.header.style.backgroundColor="#d343ba";
          this.userTop=true;
        }else{
          this.$refs.header.style.background="none";
          this.userTop=false;
        }
      },
      getFullPath(path){
        return this.$utils.getFullPath(path);
      },
      linkTo(link,id){
        let query = null;
        if(id){
          query = {
            id:id
          }
        }
        this.$router.push({
          path:link,
          query: query
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .page{
    height: 100%;
    overflow: auto;
  }
  .user-div{
  }
  .userTop{
    &::before{
      background-color: #d343ba;
    }
  }
  .user_top{
    padding-top:0.75rem;
    &::before{
      content:"";
      position:fixed;
      display:block;
      z-index:99;
      left:0;
      top:0;
      width:100%;
      height:0.75rem;
      background-size:100%;
    }
    .header{
      position: fixed;
      width: 100%;
      z-index: 10;
      background:none;
      .top{
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
          left:0.25rem;
        }
        .right{
          right:0.25rem;
        }
      }
    }

    .content{
      margin-top: 1.39rem;
      height:5.6rem;
      padding:0 0.65rem;
      color:#FFF;
      p:first-child{
        font-size: 0.52rem;
        line-height: 0.96rem;
      }
      p:nth-of-type(2){
        font-size: 1.6rem;
        text-align: center;
        font-weight: 500;
        line-height: 1;
        span{
          font-size: 0.42rem;
          font-weight: 300;
        }
      }
      .jw_l{
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        li{
          width:1.78rem;
        }
      }
    }
  }
  .detail{
    margin-top: 0.38rem;
    background-color: #FFF;
    font-size: 0;
    padding:0 0.15rem;
    div{
      font-size: 0.44rem;
      display: inline-block;
      width:25%;
      text-align: center;
      i{
        font-size: 0.26rem;
      }
      p:first-child{
        height: 1.85rem;
        display: inline-flex;
        align-items: flex-end;
      }
      p:last-child{
        height: 1.85rem;
        font-size:0.34rem;
        color:#00a2ff;
      }
    }
  }
  .moment-cls{
    margin: 0.34rem 0 0;
    padding: 0 0.4rem 0.35rem;
    background-color: #FFF;
    p:first-child{
      position: relative;
      padding:0.35rem 0;
      font-size: 0.44rem;
      font-weight: 500;
      border-bottom: 1px solid #f2f2f2;
      span{
        font-size: 0.32rem;
        font-weight: 300;
        color:#c5c5c9;
      }
      i{
        position:absolute;
        right: 0;
        color: #c5c5c9;
      }
    }
    p:last-child{
      display: flex;
      justify-content: space-between;
      margin-top: 0.3rem;
      a{
        width:1.8rem;
        line-height: 1.2;
        text-align: center;
        span:first-child{
          display: block;
          height: 1.8rem;
          background-size: cover;
          background-position:center;
        }
        span:last-child{
          font-size: 0.28rem;
        }
      }
    }
  }
</style>
