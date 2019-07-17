<template>
  <div class="page" ref="scrollTop" @scroll="scroll">
    <div class="user-div">
      <Loading v-if="isloading"></Loading>
      <div class="user_top" :class="{userTop:userTop}">
        <div ref="header" class="header">
          <div class="top">
            <Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right"></a>签到
          </div>
        </div>
        <div class="content">
          <p><span>累签乾坤币</span><i class="iconfont">&#xe682;</i></p>
          <p>
            <!--<img src="../../images/coin.png"/>-->
            <span>{{totalCoins}}</span>
            <span>
              <i v-if="ifSigned">已签到</i>
              <i v-else @click="showSign">点击签到</i>
            </span>
          </p>
        </div>
      </div>
      <div class="rili">
        <div>
          <div>{{title}}</div>
          <div><i>日</i><i>一</i><i>二</i><i>三</i><i>四</i><i>五</i><i>六</i></div>
          <div>
            <i v-for="item in dateArr" :class="{cicle:item.type===1}">{{item.value}}</i>
          </div>
        </div>
      </div>
      <div class="rili3">
        <p>累计签到奖励：
          <!--<i class="iconfont" @click="showRules=true">&#xe682;</i>-->
        </p>
        <div>
          <!--<img src="../../images/rili2.png"/>-->
            <div><p :style="{width:parseInt(signOnList.length/5)*20+'%'}"></p></div>
            <ul>
              <li :class="{active:signOnList.length>=5}"><span>5天<i></i></span><p><i>乾坤币+5</i><i>活跃+5</i></p></li>
              <li :class="{active:signOnList.length>=10}"><span>10天<i></i></span><p><i>乾坤币+10</i><i>活跃+10</i></p></li>
              <li :class="{active:signOnList.length>=15}"><span>15天<i></i></span><p><i>乾坤币+15</i><i>活跃+15</i></p></li>
              <li :class="{active:signOnList.length>=20}"><span>20天<i></i></span><p><i>乾坤币+20</i><i>活跃+20</i></p></li>
              <li :class="{active:signOnList.length>=25}"><span>25天<i></i></span><p><i>乾坤币+25</i><i>活跃+25</i></p></li>
            </ul>
          <!--<div>-->
            <!--<i>{{signOnList.length}}</i>/{{MaxDayOfDate}}-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <div class="shade" @touchmove.prevent  v-if="showSigned">
      <div>
        <i @click="showSigned=false" class="iconfont">&#xe622;</i>
        <p>今日签到排名</p>
        <p>{{signedRank}}</p>
        <p><img src="../../images/coin.png"/><span>乾坤币</span>
          <span>+{{addCoins}}</span>
        </p>
        <p>连续签到
          <span>3、7、30天</span>
        </p>
        <p>奖励翻倍哦！</p>
        <p><span>邀请好友得乾坤币</span></p>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showRules" hide-on-blur class="dialog-attention"
                :dialog-style="{'max-width': '100%', width: '100%','padding': '20px 0', 'background-color': 'transparent'}">
        <div class="attention">
          <p>签到增加活跃度规则<i class="iconfont" @click="showRules=false">&#xe67c;</i></p>
          <div>
            <p>
              1、非连续签到+6活跃度
            </p><p>
              2、连续签到额外+2活跃度
            </p><p>
              3、当月满5、15、25天分别额外+10、15、20活跃度
            </p>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import signOn from './signOn.data'
  import {XDialog, TransferDomDirective as TransferDom} from 'vux'
  export default {
    name: 'signOn',
    data () {
      return {
        isloading:false,
        ifSigned:false,
        signOnList:[],
        title:'',
        MaxDayOfDate:0,
        showSigned:false,
        showRules:false,
        userTop:false,
        currentDate:null,
        signedRank:0,
        addCoins:0,
        totalCoins:0,
      }
    },
    computed:{
      dateArr(){
        if(this.currentDate){
          let ary = this.$utils.toArray(this.currentDate);
          let relativeDate = (new Date(ary[0],ary[1],1));
          let arr = [];
          for(let i=0;i<relativeDate.getDay();i++){
            arr.push({type:0,value:null})
          }
          let arr2 = this.signOnList.map(item=>{
            return new Date(Date.parse(item.signDate.replace(/-/g,"/")));
          })
          for(let i=1;i<this.MaxDayOfDate+1;i++){
            let result = arr2.some(value=>{
              return value.getTime() == new Date(ary[0],ary[1],i).getTime()
            })
            if(result){
              arr.push({type:1,value:i})
            }else{
              arr.push({type:0,value:i})
            }
          }
          return arr;
        }else{
          return [];
        }

      }
    },
    watch:{
      signOnList(newValue){
        this.ifSigned = newValue.some(item=>{
          return item.signDate == this.$utils.format(this.currentDate,'yyyy-MM-dd')
        })
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Loading,
	  Back,
      XDialog
    },

    async mounted(){
      this.isloading=true;
      let resultdate = await this.$server.sysdate();
      let date = this.$utils.format(new Date(Date.parse(resultdate.data.data.replace(/-/g,"/"))),'yyyy-MM-dd')
      this.currentDate=new Date(Date.parse(date.replace(/-/g,"/")));
      this.MaxDayOfDate = this.$utils.MaxDayOfDate(this.currentDate)
      this.title=(this.currentDate.getMonth()+1)+'月签到日历'
      let result = await this.$server.recordSigninList();
      if(result.data.list){
        this.signOnList = result.data.list;
      }
      if(result.data.data&&result.data.data.reward){
        this.totalCoins = result.data.data.reward;
      }
      this.isloading=false;
    },
    methods:{
      async showSign(){
        this.$vux.loading.show();
        let result = await this.$server.signin();
        this.$vux.loading.hide();
        if(result.data.data.records){
          this.signOnList = result.data.data.records;
        }
        this.signedRank = result.data.data.ranking
        this.addCoins = result.data.data.reward
        this.totalCoins = parseInt(this.totalCoins)+parseInt(this.addCoins);
        this.showSigned = true;
      },
      scroll(){
        if(this.$refs.scrollTop.scrollTop>10){
          this.$refs.header.style.backgroundColor="#f48f38";
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
    position:relative;
  }
  .user-div{
  }
  .userTop{
    &::before{
      background-color: #f48f38;
    }
  }
  .user_top{
    padding-top:0.75rem;
    background:url(../../images/signon.jpg);
    background-size:cover;
    background-position:center;
    &::before{
      content:"";
      position:fixed;
      display:block;
      z-index:99;
      left:0;
      top:0;
      width:100%;
      height:0.8rem;
      background-size:100%;
    }
    .header{
      position: fixed;
      width: 100%;
      z-index: 10;
      background:none;
      border-bottom: none !important;
      .top{
        color:#FFF !important;
        font-size: 0.52rem;
        position: relative;
        background-color: rgba(0,0,0,0) !important;
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
      height:3.2rem;
      padding:0 0.65rem;
      color:#FFF;
      p:first-child{
        height:0.6rem;
        line-height: 0.6rem;
        span{
          float: left;
          font-size: 0.36rem;
          margin-left: 0.3rem;
        }
        text-align: right;
        i{
          font-size: 0.6rem;
        }
      }
      p:last-child{
        display: flex;
        align-items: center;
        position: relative;
        img{
          height: 1.12rem;
          width: 1.12rem;
        }
        span:nth-of-type(1){
          font-size: 0.9rem;
          font-weight: 500;
          margin-left: 0.3rem;
        }
        span:last-child{
          height: 1.06rem;
          line-height: 1.06rem;
          font-size: 0.48rem;
          position:absolute;
          right: 0.6rem;
          width: 3.7rem;
          border-radius: 0.58rem;
          text-align: center;
          border:3px solid rgba(255,255,255,0.2);
          i{
            display: inline-block;
            width: 100%;
            height: 100%;
            background-color: #FFF;
            border-radius: 0.5rem;
            color:#f29e87;
          }
        }
      }
    }
  }
  .rili{
    margin-top: 0.15rem;
    background-color: #f69535;
    padding:0.8rem 0.4rem;
    box-sizing: border-box;
    &>div{
      background: url("../../images/rili.png");
      background-size:cover;
      background-position:center;
      height: 100%;
      overflow: hidden;
      &>div:first-child{
        margin-top: 1.12rem;
        text-align: center;
        font-size: 0.4rem;
        font-weight: 500;
      }
      &>div:nth-of-type(2){
        margin-top: 0.45rem;
        display: flex;
        padding: 0 0.8rem;
        i{
          flex-grow: 1;
          text-align: center;
          color:#b7b7b7;
          font-size: 0.36rem;
        }
      }
      &>div:nth-of-type(3){
        margin-top: 0.4rem;
        display: flex;
        padding: 0 0.8rem;
        flex-wrap:wrap;
        i{
          display: inline-block;
          width:0.86rem;
          height:0.86rem;
          line-height: 0.86rem;
          margin:0.165rem;
          text-align: center;
          font-size: 0.36rem;
        }
        .cicle{
          border:1px solid #ff8b19;
          border-radius: 50%;
          box-sizing: border-box;
        }
      }
    }
  }
  .rili2{
    background-color: #FFF;
    padding:0 0.4rem;
    &>p{
      font-size: 0.36rem;
      font-weight: 500;
      height: 0.9rem;
      line-height: 0.9rem;
      .iconfont{
        float: right;
        color:#57bcff;
      }
    }
    &>div{
      display: flex;
      align-items: center;
      padding:0.2rem 0 0.3rem;
      img{
        height: 1rem;
        width: 1rem;
      }
      div:nth-of-type(1){
        flex-grow: 1;
        margin-left: 0.3rem;
        font-size: 0.32rem;
        p:first-child>span{
          color:#f69535;
        }
        p:last-child>span{
          color:#57bcff;
        }
      }
      div:last-child{
        width: 1.2rem;
        text-align: right;
        color:#b7b7b7;
        i{
          color:#f69535;
        }
      }
    }
  }
  .rili3{
    background-color: #FFF;
    padding:0 0.4rem;
    height: 3rem;
    &>p{
      font-size: 0.36rem;
      font-weight: 500;
      height: 0.9rem;
      line-height: 0.9rem;
      .iconfont{
        float: right;
        color:#57bcff;
      }
    }
    &>div{
      padding:0.31rem 0 0.3rem;
      position: relative;
      &>div{
        width: 100%;
        height: 3px;
        border-radius: 1px;
        background-color: #bfbfbf;
        p{
          height: 3px;
          background-color: #f69535;
        }
      }
      ul{
        position: absolute;
        top:0;
        width: 100%;
        padding: 0 0.2rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        li{
          font-size: 0.28rem;
          color:#bfbfbf;
          span{
            display: block;
            width: 100%;
            text-align: center;
            line-height: 0.7;
            i{display: block;

            }
            i:before {
              content: "\a0"; /*不换行空格*/
              display: inline-block;
              vertical-align: middle;
              font-size: 0.4rem;
              width: 0.6em;
              height: 0.6em;
              border-radius: 50%;
              border: 2px solid rgba(255, 255, 255, 1);
              line-height: 1;
              background-clip: content-box;
              background-color: #bfbfbf;
            }
          }
          p{
            border: 1px solid #bfbfbf;
            border-radius: 3px;
            padding: 0 0.1rem;
            margin-top: 0.25rem;
            i{
              display: block;
              text-align: center;
            }
          }
        }
        li.active{
          color:#f69535;
          span{
            i:before{
              background-color: #f69535;
            }
          }
          p{
            border: 1px solid #f69535;
          }
        }
      }
    }
  }
  .shade{
    position: absolute;
    top:0;
    left:0;
    height: 100%;
    width:100%;
    z-index: 11;
    background-color: rgba(0,0,0,0.4);
    &>div{
      position:relative;
      height: 9.35rem;
      width:8.1rem;
      margin: 3.16rem auto;
      background: url(../../images/signed-bg.png);
      background-size: cover;
      background-position: center;
      background-color: #fff;
      border-radius: 5px;
      border:4px solid rgba(175,175,175,0.7);
      &>i:first-child{
        background-color: #FFF;
        text-align: center;
        font-size: 0.4rem;
        width: 0.9rem;
        height: 0.9rem;
        line-height: 0.9rem;
        position: absolute;
        right: -0.55rem;
        top:-0.55rem;
        border-radius: 50%;
        color:#ff6c78;
        border:4px solid rgba(175,175,175,0.7);
      }
      p:nth-of-type(1){
        margin:0.67rem 0 0 2.1rem;
        font-size: 0.38rem;
        color:#8d3434;
      }
      p:nth-of-type(2){
        text-align: center;
        color:#ff6c78;
        font-size: 1.38rem;
        font-weight: 500;
      }
      p:nth-of-type(3){
        margin: 0.2rem 0 0.7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 0.415rem;
          height: 0.415rem;
        }
        span{
          margin-left: 0.3rem;
          font-size: 0.52rem;
        }
        span:last-child{
          color:#ff6c78;
        }
      }
      p:nth-of-type(4),p:nth-of-type(5){
        font-size: 0.4rem;
        text-align: center;
        margin-bottom: 0.3rem;
        span{
          color:#8b3333;
        }
      }
      p:nth-of-type(6){
        text-align: center;
        height: 0.85rem;
        line-height: 0.85rem;
        margin-top: 1.1rem;
        span{
          display: inline-block;
          height: 100%;
          width: 4.55rem;
          background-color: #f0544f;
          border-radius: 0.43rem;
          font-size: 0.36rem;
          color:#FFF;
          box-shadow: 0 1px #9e3431;
        }
      }
    }
  }
  .dialog-attention {
    .attention {
      background-color: #FFF;
      height: 4rem;
      width: 9.6rem;
      margin: auto;
      line-height: 1;
      position: relative;
      border-radius: 5px;
      .iconfont {
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 0.6rem;
      }
      &>p{
        padding: 0.6rem 0.2rem;
        font-size: 0.48rem;
        color: #707070;
        font-weight: 600;
      }
      div {
        color: #8e8e8e;
        font-size: 0.36rem;
        line-height: 1.5;
        margin-left: 1rem;
        p{
          text-align: left;
        }
      }
    }
  }
</style>
