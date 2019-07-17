<template>
  <div class="rankingSignUp">
    <Loading v-if="isloading"></Loading>
    <div class="header" style="background-image:url(http://mis.iceinfo.net:8080/jiaoyou/static/zipai.png)">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right"><i class="iconfont">&#xe679;</i></a>{{user.userName}}
      </div>
      <!--<div class="userLabel">-->
        <!--<p><span>妩媚多情</span></p>-->
        <!--<p><span>36D少女</span></p>-->
        <!--<p><span>蜜桃眼</span></p>-->
        <!--<p><span>粉嫩少妇</span></p>-->
      <!--</div>-->
    </div>
    <div class="wrapper" :style="{height:contentheight+'px'}">
      <div class="userinfo-cls">
        <div><img src="http://mis.iceinfo.net:8080/jiaoyou/static/e2.jpg"/></div>
        <div>
          <div><span><i class="iconfont">&#xe64a;</i> 23</span><span>SVIP3</span><span>保证金<i>1</i></span></div>
          <div>
            <a :class="{demanda:user.demand.idcard}"> <img :src="imgs.idcard"/></a>
            <a :class="{demanda:user.demand.car}"> <img :src="imgs.car"/></a>
            <a :class="{demanda:user.demand.house}" ><img :src="imgs.house"/></a>
            <a :class="{demanda:user.demand.health}" ><img :src="imgs.health"/></a>
          </div>
        </div>
        <div>
          <span><i class="iconfont">&#xe61f;</i> 关注</span>
        </div>
      </div>
      <div class="signature">
        <p>个性签名:</p><p>你知道 就算大雨让这座城市颠倒 ，我会给你怀抱 ，受不了；看见你背 影来到 ，写下我 度秒如年难挨的离骚......</p>
      </div>
      <div class="assess">
        <p>她的评价<i class="iconfont">&#xe702;</i></p>
        <div>
          <p><img src="http://mis.iceinfo.net:8080/jiaoyou/static/e2.jpg"/><span>{{user.userName}}</span></p>
          <p v-if="user.assess.length<55">{{user.assess}}</p>
          <p v-else>
            {{user.assess.substr(0,55)+'...'}}
          </p>
        </div>
        <div>
          <p><img src="http://mis.iceinfo.net:8080/jiaoyou/static/e2.jpg"/><span>{{user.userName}}</span></p>
          <p v-if="user.assess.length<55">{{user.assess}}</p>
          <p v-else>
            {{user.assess.substr(0,55)+'...'}}
          </p>
        </div>
      </div>
      <div class="title">
        <p v-bind:class="{ active: isActive }" @click="event(1)">资料</p>
        <p v-bind:class="{ active: !isActive }" @click="event(0)">相册</p>
      </div>
      <div class="content" v-show="isActive">
        <p>她的动态<span>(116)</span></p>
        <div class="moments-cls" >
          <div v-for="item in moments" :style="{'background-image':'url('+item.img+')'}"><span>{{item.datetime}}</span></div>
          <div><i class="iconfont">&#xe702;</i></div>
        </div>
        <p>她的邀约<span>(6)</span></p>
        <div class="invite-cls">
          <p v-for="item in invite" :key="item.id">{{item.content}}<i class="iconfont">&#xe702;</i></p>
        </div>
      </div>
      <div class="photos" v-show="!isActive">
        <ul>
          <li v-for="item in photos" :key="item.id" >
            <div :style="{'background-image':'url('+item.img+')'}"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import car from '../../images/car.png';
  import idcard from '../../images/idcard.png';
  import house from '../../images/house.png';
  import health from '../../images/health.png';

  let fontsize = parseInt(document.documentElement.style.fontSize);
  export default {
    name: 'userDetail',
    data () {
      return {
        isloading:false,
        isActive:true,
        contentheight:0,
        imgs:{car:car,idcard:idcard,house:house,health:health},
        user:{
          userName:'明早遇见你',
          assess:'美女很有礼貌，优雅，是我喜欢的类型，是很好的聆听者，跟她在一 起会很放松，很轻松，很久没有这样放松过了，期待下次约会。美女很有礼貌，优雅，是我喜欢的类型，是很好的聆听者，跟她在一 起会很放松，很轻松，很久没有这样放松过了，期待下次约会。',
          demand:{
            idcard:1,
            car:1,
            house:0,
            health:1,
          },
        },
        moments:[{
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/zipai.png',
          datetime:'2018-08-09'
        },{
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/e3.jpg',
          datetime:'2018-08-05'
        },{
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/e4.jpg',
          datetime:'2018-08-02'
        },{
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/e2.jpg',
          datetime:'2018-08-01'
        }],
        invite:[{
          id:1,
          content:'周末万达看电影'
        },{
          id:2,
          content:'端午新马泰狂欢'
        },{
          id:3,
          content:'春节南极十日游'
        }],
        photos:[{
          id:3,
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/zipai.png',
        },{
          id:4,
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/e3.jpg',
        },{
          id:5,
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/e4.jpg',
        },{
          id:31,
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/e2.jpg',
        },{
          id:32,
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/zipai.png',
        },{
          id:42,
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/e3.jpg',
        },{
          id:52,
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/e4.jpg',
        },{
          id:313,
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/e2.jpg',
        },{
          id:3132,
          img:'http://mis.iceinfo.net:8080/jiaoyou/static/e2.jpg',
        }]
      }
    },
    components: {
      Loading,
	  Back,
    },

    created (){

    },
    destroyed () {
    },
    mounted () {
      this.contentheight = document.body.clientHeight-$(".header").height()-(0.75)*parseInt(document.documentElement.style.fontSize)-3;
    },
    methods :{
      onChange (val) {
        console.log('val change', val)
      },
      event(index){
        this.isActive=!!index;
      }
    }
  }
</script>
<style scoped lang="scss">
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .rankingSignUp{
    font-weight: normal;
    .wrapper{
      overflow-x: hidden;
      overflow-y: auto;
    }
    .wrapper>div{
      background-color: #FFF;
    }
    .header{
      padding-top:0.75rem;
      width: 100%;
      height:6.45rem;
      position: relative;
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
          left:0.325rem;
        }
        .right{
          right:0.325rem;
        }
      }
      .userLabel{
        position: absolute;
        width: 100%;
        bottom: 0.26rem;
        color:#FFF;
        font-size: 0;
        p{
          display: inline-block;
          width:25%;
          text-align: center;
          span{
            font-size: 0.3rem;
            background-color: rgba(0,0,0,0.3);
            display: inline-block;
            height:0.56rem;
            line-height:0.56rem;
            padding:0 0.26rem;
            border-radius: 0.28rem;
          }
        }
      }
    }
    .userinfo-cls{
      padding:0.4rem;
      position: relative;
      border-bottom: 1px solid #f2f2f2;
      &>div{
        display: inline-block;
        font-size: 0.24rem;
        i{
          font-size: 0.24rem;
        }
      }
      &>div:first-child{
        width:1.2rem;
        height:1.2rem;
        vertical-align: top;
      }
      &>div:nth-of-type(2){
        margin-left: 0.3rem;
        div:first-child{
          padding:0.1rem 0 0.2rem;
          span{
            display: inline-block;
            margin-right: 0.3rem;
            padding:0 0.2rem;
            background-color: #ff84ac;
            color:#FFF;
            border-radius: 0.2rem;
            height:0.4rem;
            line-height: 0.4rem;
          }
          span:nth-of-type(2){
            background-color: #ffb400;
          }
          span:nth-of-type(3){
            background-color: #c37a51;
            position: relative;
            i{
              position: absolute;
              font-size: 0.1rem;
              width: 0.2rem;
              height: 0.2rem;
              line-height: 0.2rem;
              bottom: -0.08rem;
              right: -0.08rem;
              background-color: #c37a51;
              border: 1px solid #FFF;
              border-radius: 0.1rem;
              text-align: center;
            }
          }
        }
        .demanda{
          background-color: #ffa800;
        }
        a{
          font-size: 0;
          display: inline-block;
          width:0.5rem;
          height: 0.5rem;
          line-height: 0.5rem;
          border-radius: 0.25rem;
          text-align: center;
          background-color: #c4c4c4;
          margin-right:0.1rem;
          img{
            width: 65%;
            height:65%;
            vertical-align: middle;
          }
        }
      }
      &>div:nth-of-type(3){
        position: absolute;
        right:0.4rem;
        height: 1.2rem;
        line-height: 1.2rem;
        span{
          padding:0.2rem 0.4rem;
          background-color: #ff5a00;
          color:#FFF;
          border-radius: 0.32rem;
          i{
            margin-right: 0.2rem;
          }
        }
      }
    }
    .signature{
      padding:0.4rem;
      position: relative;
      p{
        font-size: 0.28rem;
        color:#b1b1b7;
      }
      p:first-child{
        position: absolute;
        top:0.4rem;
        left:0.4rem;
      }
      p:last-child{
        margin-left: 1.5rem;
      }
    }
    .assess{
      margin:0.3rem 0 0;
      padding:0 0.4rem 0.4rem;
      &>p{
        font-size: 0.44rem;
        height: 1rem;
        line-height: 1rem;
        position: relative;
        border-bottom: 1px solid #f2f2f2;
        i{
          font-size: 0.44rem;
          position: absolute;
          right:0;
          color:#b1b1b7;
        }
      }
      &>div{
        font-size: 0.32rem;
        p:first-child{
          height: 1rem;
          line-height: 1rem;
          img{
            width:0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            vertical-align: middle;
          }
          span{
            margin-left:0.3rem;
          }
        }
        p:last-child{
          color:#b1b1b7;
        }
      }
    }
    .title{
      margin-top: 0.3rem;
      height:1.42rem;
      width: 100%;
      padding:0 1rem;
      box-sizing: border-box;
      display: flex;
      border-bottom: 1px solid #F2F2F2;
      p{
        height: 1.12rem;
        line-height: 1.12rem;
        text-align: center;
        box-sizing: border-box;
        margin:0.15rem 0;
        flex-grow:1;
        font-size: 0.4rem;
        color:#b1b1b7;
        &.active{
          border-bottom:1px solid #000;
          color:#000;
          font-weight: 500;
        }
      }
    }
    .content{
      padding:0 0.4rem;
      &>p{
        font-size: 0.4rem;
        span{
          font-size: 0.32rem;
          color:#b1b1b7;
          margin: 0 0 0 0.2rem;
        }
      }
      .moments-cls{
        position: relative;
        border-bottom:1px solid #f2f2f2;
        div{
          display: inline-block;
          height: 1.75rem;
          width: 1.75rem;
          background-size: cover;
          background-position:center;
          background-repeat:no-repeat;
          vertical-align: bottom;
          position: relative;
          margin:0.3rem 0 0.3rem 0.3rem;
          span{
            font-size: 0.2rem;
            position: absolute;
            bottom:0;
            z-index: 1;
            width: 100%;
            background-color: rgba(0,0,0,0.3);
            text-align: center;
            color:#FFF;
          }
        }
        div:last-child{
          position: absolute;
          width:0.5rem;
          right:0;
          text-align: right;
          i{
            font-size: 0.44rem;
            color: #b1b1b7;
            height: 1.75rem;
            line-height: 1.75rem;
          }
        }
      }
      .invite-cls{
        padding-bottom: 0.4rem;
        p{
          font-size: 0.4rem;
          color: #b1b1b7;
          position: relative;
          margin-left: 0.3rem;
          height: 1.3rem;
          line-height: 1.3rem;
          border-bottom:1px solid #f2f2f2;
          i{
            font-size: 0.44rem;
            position: absolute;
            right:0;
          }
        }
      }
    }
    .photos{
      padding-top: 0.2rem;
      li{
        width: 20%;
        margin-left: 0.3rem;
        display: inline-block;
        &:nth-of-type(4n+1){
          margin-left: 0.4rem;
        }
        div{
          width: 100%;
          padding-bottom: 100%;
          background-size: cover;
          background-position:center;
          background-repeat:no-repeat;
        }
      }
    }
  }
</style>

