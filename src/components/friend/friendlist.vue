<template>
<div class="main">
	<Loading v-if="isloading"></Loading>
  <div class="header">
    <div class="top">
      <Back class="left"><i class="iconfont">&#xe613;</i></Back><a v-if="!$store.state.isBrowser" @click="addFriend" class="right"><i>添加好友</i></a>好友
    </div>
  </div>
  <div class="wrapper" ref="wrapper" :style="{height:scrollHeight+'px'}">
    <ul class="content" ref="ul">
      <div class="search">
        <input type="text" placeholder="搜索" v-model="searchText">
      </div>
      <ul class="friend_list">
        <li @click="toItem(2)">
          <a><i class="icon_newfriend"></i>
            <span>关注</span>
            <span>{{$store.state.userInfo.followCount}}</span>
            <i class="iconfont">&#xe702;</i>
          </a>
        </li>
        <li @click="toItem(3)">
          <a><i class="icon_qun"></i>
            <span>粉丝</span>
            <span>{{$store.state.userInfo.fanCount}}</span>
            <i class="iconfont">&#xe702;</i>
          </a>
        </li>
        <!--<li @click="toItem(4)">-->
          <!--<a><i class="icon_tag"></i>-->
            <!--<span>群聊</span></a>-->
        <!--</li>-->
      </ul>
      <ul class="friend_list friend_list2" v-for="itemArr in friendList" :data-zimu="itemArr[0].zimu">
        <li v-for="item in itemArr">
          <a @click="intoChat(item)"><i @click.stop="toUserInfo(item)" :style="'background-image:url('+$utils.getFullPath(item.jiaoyouUser.headimgAttachmentId)+');'"></i>
            <p>
              <span>{{item.jiaoyouUser.aliasName}}</span>
              <span>{{item.jiaoyouUser.selfLabel}}</span>
            </p>
          </a>
        </li>
      </ul>
    </ul>
    <ul class="zimu">
      <li v-for="(item, index) in scrollitems" :class="{'current': currentIndex === index}" @click="selectIndex(index)">
        {{ item }}
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import e1 from '../../images/e1.jpg';
import e2 from '../../images/e2.jpg';
import e3 from '../../images/e3.jpg';
import e4 from '../../images/e4.jpg';
import e5 from '../../images/e5.jpg';
import e6 from '../../images/e6.jpg';
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
import myScroller from '../scroller/myScroller.vue';
import BScroll from 'better-scroll'
import pinyinUtil from '../../utils/pinyinUtil'

export default {
	name: 'friendlist',
	data () {
		return {
			imgs:{e1:e1,e2:e2,e3:e3,e4:e4,e5:e5,e6:e6},
      scroll:null,
      scrollHeight:0,
      scrollY: 0,
      currentIndex: null,
			isloading:false,
			loadRefresh:true,//下拉刷新
			loadInfinite:false, //上拉加载
      scrollitems:[],
      friendList:[],
      friendListOld:[],
      searchText:'',
		}
	},
  watch: {
    scrollY(newVal) {
      // 向下滑动的时候 newVal 是一个负数，所以当 newVal > 0 时，currentIndex 直接为 0
      if (newVal > 0) {
        this.currentIndex = null;
        return;
      }
      if(this.scrollitems.length===0){
        this.currentIndex = null;
        return;
      }
      // 计算 currentIndex 的值
      let scrollHeight = this.$refs.ul.scrollHeight;
      let scolly = -newVal-$(".search").height()-$(".friend_list").height();
      if(scolly<0){
        this.currentIndex = null;
        return;
      }
      let arr = this.scrollitems.slice(0);
      while(scolly>0){
        scolly = scolly-$("ul[data-zimu='"+arr.shift()+"']").height();
      }
      this.currentIndex = this.scrollitems.length-arr.length-1;
    },
    searchText(newVal){
      if(true){
        this.friendList = this.$utils.deepCopy(this.friendListOld)
        let list={}
        this.friendList.map(item=>{
          if(item.jiaoyouUser.aliasName.indexOf(newVal)!=-1){
            item.zimu = (pinyinUtil.getFirstLetter(item.jiaoyouUser.aliasName.substr(0,1))).toUpperCase();
            if(list[item.zimu]){
              list[item.zimu].push(item)
            }else{
              list[item.zimu]=[item]
            }
          }
        })
        this.scrollitems=[]
        this.friendList=[]
        for (let i in list){
          this.scrollitems.push(i);
          this.friendList.push(list[i])
        }
        this.scrollitems.sort((v1,v2)=>{
          if(v1=="#"){
            v1="~"
          }
          if(v2=="#"){
            v1="~"
          }
          return v1.charCodeAt(0)-v2.charCodeAt(0)
        });
        this.friendList.sort((v1,v2)=>{
          let n1 = v1[0].zimu;
          let n2 = v2[0].zimu;
          if(n1=="#"){
            n1="~"
          }
          if(n2=="#"){
            n2="~"
          }
          return n1.charCodeAt(0)-n2.charCodeAt(0)
        })
      }
    }
  },
  async mounted () {
	  $(".menu .icon_jy").addClass("cur")
    this.scrollHeight = document.body.clientHeight-$(".header").height()-$(".menu").height()-0.75*parseInt(document.documentElement.style.fontSize)-3;
    let data = {
      page:1,
      rows:10000
    }
    let result = await this.$server.myFriendsList(data);
    let list={}
    if(result.data.list){
      this.friendListOld = result.data.list;
      result.data.list.map(item=>{
        item.zimu = (pinyinUtil.getFirstLetter(item.jiaoyouUser.aliasName.substr(0,1))).toUpperCase();
        if(list[item.zimu]){
          list[item.zimu].push(item)
        }else{
          list[item.zimu]=[item]
        }
      })
      for (let i in list){
        this.scrollitems.push(i);
        this.friendList.push(list[i])
      }
      this.scrollitems.sort((v1,v2)=>{
        if(v1=="#"){
          v1="~"
        }
        if(v2=="#"){
          v1="~"
        }
        return v1.charCodeAt(0)-v2.charCodeAt(0)
      });
      this.friendList.sort((v1,v2)=>{
        let n1 = v1[0].zimu;
        let n2 = v2[0].zimu;
        if(n1=="#"){
          n1="~"
        }
        if(n2=="#"){
          n2="~"
        }
        return n1.charCodeAt(0)-n2.charCodeAt(0)
      })
    }
	if(this.$store.state.userId){
		 let userInfo = await this.$server.getUserInfo({userId:this.$store.state.userId});
		this.$store.commit("LOGIN",userInfo.data.data);
	}
   
    this.$nextTick(function () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType:3,
        click:true
      })
      if (this.scroll) {
        this.scroll.on('scroll', (pos) => {
          this.scrollY = pos.y;
        })
      }
    })

  },
  destroyed () {
    this.scroll && this.scroll.destroy()
  },
	components: {
		Loading,
		myScroller,
		Back,
	},
	methods: {
    toUserInfo(item){
      this.$router.push({
        path: "/userInfo",
        query:{id:item.rid}
      })
    },
    intoChat(item){
      let query={
        id:item.rid,
        name:item.jiaoyouUser.aliasName,
      }
      // this.$router.push({
      //   path: "/chatWindow",
      //   query:query
      // })

      if(window.api){
        this.$router.push({
          path: "/chatWindow",
          query:query
        })
      }else{
        this.$router.push({
          path: "/chatWindowWeb",
          query:query
        })
      }


    },
    addFriend(){
      this.$router.push({
        path: "/addFriend"
      })
    },
		refresh(done) {//下拉刷新
			console.log("刷新 ");
			setTimeout(()=>{
				console.log("刷新完成");
				done();
			},1000);
		},
    selectIndex(index){
      let arr = this.scrollitems.slice(0);
      let scolly = -$(".search").height()-$(".friend_list").height()-10;
      for(let i=0;i<index;i++){
        scolly = scolly-$("ul[data-zimu='"+arr.shift()+"']").height();
      }
      console.log(this.scroll.maxScrollY)
      if(this.scroll.maxScrollY>scolly){
        scolly = this.scroll.maxScrollY;
      }
      this.scroll.scrollTo(0,scolly,20,'bounce')
    },
    toItem(type){
      this.$router.push({
        path: "/fansList",
        query:{
          type:type
        }
      })
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
        font-size: 0.6rem;
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
          i{
            font-size: 0.42rem;
          }
        }
      }
    }
    .wrapper{
      position: relative;
      height: 100%;
      box-sizing: border-box;
      background-color: #F7F7F7;
      overflow: hidden;
      .zimu{
        li{
          margin-top: 0.1rem;
          &.current{
            background-color: #16B700;
            color:#FFF;
            border-radius: 0.15rem;
          }
        }
      }
    }
    .friend_list{
      li{
        a{
          &>span:nth-of-type(1){
            margin-left: 0.3rem;
            flex-grow: 1;
            font-size: 0.46rem;
            color: #040404;
          }
          &>span:nth-of-type(2){
            font-size: 0.36rem;
            color: #b1b1b1;
          }
          .iconfont{
            width: 0.7rem;
            height: 1.54rem;
            color: #b4b4b4;
          }
        }
      }
    }
    .friend_list2{
      li{
        a{
          line-height: 1.98rem;
          height: 1.98rem;
          i:first-child{
            display: inline-block;
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 0.7rem;
          }
          p{
            width: 60%;
            margin-left: 0.3rem;
            span{
              display: block;
              line-height: 0.7rem;
              height: 0.7rem;
              overflow: hidden;
              text-overflow:ellipsis;//文本溢出显示省略号
              white-space:nowrap;//文本不会换行（单行文本溢出）
            }
            span:last-child{
              color: #b9b9b9;
              font-size: 0.36rem;
            }
          }
        }
      }
    }
  }
</style>
