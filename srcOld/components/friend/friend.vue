<template>
<div class="main">
	<Loading v-if="isloading"></Loading>
		<!--<div class="top">-->
			<!--<router-link :to="{name:'friendlist'}" class="friendl"></router-link><a class="add"></a>好友-->
		<!--</div>-->
  <div class="header">
    <div class="top">
      <a class="left" ></a><a class="right"><i class="iconfont" @click="toFriendList">&#xe6a3;</i></a>消息
    </div>
  </div>
  <div style="position: relative">
    <div class="wrapper" ref="wrapper" :style="{height:myScrollerHeight+'px'}">
      <ul class="content" ref="ul">
      <div v-if="!$store.state.isBrowser" class="search">
        <input type="input" v-model="searchText" placeholder="搜索">
      </div>
      <ul class="friend">
        <swipeout v-if="rongConversationList">
          <swipeout-item v-for="item in rongConversationList" :key="item.targetId" ref="swipeoutItem" :right-menu-width="210" :sensitivity="15">
            <div v-if="!$store.state.isBrowser" slot="right-menu">
              <swipeout-button v-if="item.stick==0" @click.native="stickItem(item.targetId,1)" type="primary" :width="100">置顶</swipeout-button>
              <swipeout-button v-else-if="item.stick==1" @click.native="stickItem(item.targetId,0)" type="primary" :width="100">取消置顶</swipeout-button>
              <swipeout-button @click.native="deleteItem(item.targetId)" type="warn" :width="100">删除</swipeout-button>
            </div>

            <div slot="content" :class="{grey:item.stick==1}">
              <li>
                <div v-if="item.type==1" @touchstart="touchstart(item)" class="i" @click="intoItem(item.targetId,item.bname,item.type)">
                  <i :style="'background-image:url('+$utils.getFullPath(item.bicon)+');'"></i>
                  <div>
                    <h3><em>{{datetimes(item.time)}}</em>{{item.bname}}</h3>
                    <p :style="{color:item.id==-1?'#f74c31':'#666'}"><em v-if="item.count!=0&&item.notificationStatus!=='0'">{{item.count}}</em><span v-if="item.count!=0&&item.notificationStatus==='0'">[{{item.count}}条]</span>{{item.text}}<i class="iconfont" v-if="item.notificationStatus==='0'">&#xe647;</i></p>
                  </div>
                </div>
                <div v-else-if="item.type==2" @touchstart="touchstart(item)" class="i" @click="enter(item.activeType,item.targetId)">
                  <i :style="'background-image:url('+$utils.getFullPath(item.icon)+');'"></i>
                  <div>
                    <i class="icon" v-if="item.activeState==3" :style="'background-image:url('+imgs.a3+');'"></i>
                    <i class="icon" v-if="item.activeState==6" :style="'background-image:url('+imgs.a6+');'"></i>
                    <h3><em>{{datetimes(item.time)}}</em>
                      <span class="jy-type xy" v-if="item.activeType==1">选缘</span>
                      <span class="jy-type qy" v-if="item.activeType==2">抢缘</span>
                      <span class="jy-type jy" v-if="item.activeType==3">竞缘</span>
                      <span class="jy-type zy" v-if="item.activeType==4">中缘</span>
                      <span class="jy-type py" v-if="item.activeType==5">配缘</span>
                      <span class="jy-type py" v-if="item.activeType==6">相亲</span>
                      {{item.name}}</h3>
                    <p :style="{color:item.id==-1?'#f74c31':'#666'}"><em v-if="item.count!=0&&item.notificationStatus!=='0'">{{item.count}}</em><span v-if="item.count!=0&&item.notificationStatus==='0'">[{{item.count}}条]</span>{{item.cname}}:{{item.text}}<i class="iconfont" v-if="item.notificationStatus==='0'">&#xe647;</i></p>
                  </div>
                </div>
                <div v-else-if="item.type==5" @touchstart="touchstart(item)" class="i" @click="intoMessage(1)">
                  <i :style="'background-image:url('+imgs.xitong+');'"></i>
                  <div>
                    <h3><em>{{datetimes(item.time)}}</em>系统消息</h3>
                    <p :style="{color:item.id==-1?'#f74c31':'#666'}"><em v-if="item.count!=0">{{item.count}}</em>{{item.text}}<i class="iconfont" v-if="item.notificationStatus==='0'">&#xe647;</i></p>
                  </div>
                </div>
                <div v-else-if="item.type==6" @touchstart="touchstart(item)" class="i" @click="intoMessage(2)">
                  <i :style="'background-image:url('+imgs.hudong+');'"></i>
                  <div>
                    <h3><em>{{datetimes(item.time)}}</em>互动消息</h3>
                    <p :style="{color:item.id==-1?'#f74c31':'#666'}"><em v-if="item.count!=0">{{item.count}}</em>{{item.text}}<i class="iconfont" v-if="item.notificationStatus==='0'">&#xe647;</i> </p>
                  </div>
                </div>
              </li>
            </div>
          </swipeout-item>
        </swipeout>
      </ul>
      </ul>
    </div>
  </div>

	<Routerlink></Routerlink>
</div>
</template>
<script>
  import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import f1 from '../../images/f1.jpg';
import f2 from '../../images/f2.jpg';
import f3 from '../../images/f3.jpg';
import f4 from '../../images/f4.jpg';
import f5 from '../../images/f5.jpg';
import f6 from '../../images/f6.jpg';
import a6 from '../../images/message/6.png';
import a3 from '../../images/message/3.png';
import xitong from '../../images/message/xitong.png';
import hudong from '../../images/message/hudong.png';
import Routerlink from '../routerlink.vue';
import Loading from '@other/loading.vue';
import friend from './friend.data'
import BScroll from 'better-scroll'

export default {
	name: 'friend',
	data () {
		return {
			imgs:{f1:f1,f2:f2,f3:f3,f4:f4,f5:f5,f6:f6,xitong:xitong,hudong:hudong,a6:a6,a3:a3},
      scroll:null,
      myScrollerHeight:0,
			isloading:false,
			loadRefresh:false,//下拉刷新
			loadInfinite:false, //上拉加载
      datetime:"2018-07-01 01:49:34",
      now:Math.floor(new Date().getTime()/1000),
      rongConversationList:[...this.$store.state.rongConversationList,...this.$store.state.webMessageStorage.rongConversationList],
      searchText:''
		}
	},
  computed:{
    datetimes:function(){
      return (datetime)=>{
        return this.$utils.getMessageTimeFromNow(datetime,this.now);
      }
    },
    rongConversationListStore:function(){
      return this.$store.state.rongConversationList;
    },
    webMessageStorageStore:function(){
      return this.$store.state.webMessageStorage;
    },
    longpress:function(){
      return this.$store.state.longpress
    }
  },
  watch:{
    rongConversationListStore(newv){
      if(window.api){
        if(window.api.systemType=='ios'){
          this.rongConversationList = newv;
        }else{
          this.rongConversationList = [];
          this.$nextTick(function () {
            this.rongConversationList = newv;
          })
        }
      }else{
        let arr=[...newv,...this.$store.state.webMessageStorage.rongConversationList];
        this.rongConversationList = arr;
      }
    },
    webMessageStorageStore(newv){
      if(!window.api){
        let arr=[...this.$store.state.rongConversationList,...newv.rongConversationList];
        this.rongConversationList = arr;
      }
    },
    searchText(){
      this.search()
    }
  },
  mounted () {
	  // console.log(JSON.stringify(this.rongConversationList))
    this.myScrollerHeight = document.body.clientHeight-$(".header").height()-$(".menu").height()-0.75*parseInt(document.documentElement.style.fontSize)-3;
    const timer = setInterval(() =>{
      this.now = Math.floor(new Date().getTime()/1000)
      console.log("定时器执行")
      // 某些定时器操作
    }, 30000);
// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {
      console.log("定时器清楚")
      clearInterval(timer);
    })
    this.$nextTick(function () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType:3,
        click:true
      })
    })
  },
  destroyed () {
    this.scroll && this.scroll.destroy()
  },
	components: {
		Routerlink,
		Loading,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
	},
	methods: {
    touchstart(item){
      this.$store.commit("CHANGELONGPRESS",{press:false,pageName:'friend',target:item})
    },
		refresh(done) {//下拉刷新
			console.log("刷新 ");
			setTimeout(()=>{
				console.log("刷新完成");
				done();
			},1000);
		},
    search(){
      this.searchText;
      if(!this.searchText){
        this.rongConversationList = this.$store.state.rongConversationList;
      }else{
        let list = this.$store.state.rongConversationList;
        this.rongConversationList = list.filter(item=>{
          let a = item.name.indexOf(this.searchText)!=-1
          let b = item.bname.indexOf(this.searchText)!=-1
          return a||b;
        })
      }
    },
    toFriendList(){
      // this.$router.push({
      //   path: "/myFocus",
      //   query:{
      //     active:'1'
      //   }
      // })
      this.$router.push({
        path: "/friendlist",
      })
    },
    deleteItem(key){
      this.$db.deleteCount(key,this.$store.state.userId)
      this.$store.dispatch("getConversationList")
    },
    stickItem(key,stick){
      this.$db.stickCount(key,this.$store.state.userId,stick);
      this.$store.dispatch("getConversationList")
    },
    intoItem(id,name){
      if(window.api){
        this.$router.push({
          path: "/chatWindow",
          query:{
            id:id,
            name:name,
          }
        })
      }else{
        this.$router.push({
          path: "/chatWindowWeb",
          query:{
            id:id,
            name:name,
          }
        })
      }
    },
    intoMessage(index){
      this.$router.push({
        path: "/message",
        query:{
          type:index,
        }
      })
    },
    enter(activityMethod,datingId) {
      if(activityMethod==6){
        this.$router.replace({
          path: "/blindDateNew",
          query: {
            id: datingId
          }
        })
      }else{
        this.$router.replace({
          path: "/actSceneNew",
          query: {
            id: activityMethod,
            datingId: datingId
          }
        })
      }

    },
	}
}
</script>
<style scoped lang="scss">
  .main{
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
    .myscrollerdiv{
      overflow-y:auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    .wrapper{
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
    }
    .friend{
      .i{
        line-height: 1.5;
        position: relative;
        .icon{
          position:absolute;
          width: 0.44rem;
          height: 0.44rem;
          top:1.3rem;
          left: 1.3rem;
        }
      }
      .grey{
        background-color: #f6f6f6;
      }
    }
  }
  button{
    outline: 0;
  }
  .jy-type{
    display: inline-block;
  }
</style>
