<template>
  <div>
    <div class="main jy_all_top jy_new_love jy_state_top">
      <Loading v-if="isloading"></Loading>
      <div class="header">
        <div class="top">
          <Back class="left" v-if="$route.query.nearbydate"><i class="iconfont">&#xe613;</i></Back><a @click="showPopover=!showPopover" class="right"><i class="iconfont">&#xe64d;</i></a><p>{{title}}</p>
        </div>
      </div>
      <div class="jy_new_love_t">
        <ul class="jy_new_love_nav">
          <li class="jy_new_love_n1" :class="{jy_new_love_n1s:activityMethod==null}" @click="getList(datingThemes,null,null,null,null,null,null,null,null,null)"><p>全部</p></li>
          <li class="jy_new_love_n2" :class="{jy_new_love_n2s:activityMethod==1}" @click="getList(datingThemes,null,null,null,null,null,null,null,null,1)"><p>选缘</p></li>
          <li class="jy_new_love_n3" :class="{jy_new_love_n3s:activityMethod==2}" @click="getList(datingThemes,null,null,null,null,null,null,null,null,2)"><p>抢缘</p></li>
          <li class="jy_new_love_n4" :class="{jy_new_love_n4s:activityMethod==3}" @click="getList(datingThemes,null,null,null,null,null,null,null,null,3)"><p>竞缘</p></li>
          <li class="jy_new_love_n5" :class="{jy_new_love_n5s:activityMethod==4}" @click="getList(datingThemes,null,null,null,null,null,null,null,null,4)"><p>中缘</p></li>
          <li class="jy_new_love_n6" :class="{jy_new_love_n6s:activityMethod==5}" @click="getList(datingThemes,null,null,null,null,null,null,null,null,5)"><p>配缘</p></li>
        </ul>
        <ul class="jy_new_love_menu">
          <li :class="{cur:datingThemes==''}" @click="getList('')"><a>全部</a></li>
          <li :class="{cur:datingThemes==2}" @click="getList(2)"><a>吃饭</a></li>
          <li :class="{cur:datingThemes==4}" @click="getList(4)"><a>K歌</a></li>
          <li :class="{cur:datingThemes==1}" @click="getList(1)"><a>旅行</a></li>
          <li :class="{cur:datingThemes==5}" @click="getList(5)"><a>运动</a></li>
          <li :class="{cur:datingThemes==99}" @click="getList(99)"><a>其他</a></li>
        </ul>
      </div>
      <div class="jy_new_love_con">
        <scroll ref="scroll" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" @pullingDown="onPullingDown" @pullingUp="onPullingUp" :ifinit="ifinit" :style="{margin: '0.2rem 0 0 0',height:myScrollerHeight+'px','background-color': '#f5f7f8'}" :probeType="3" :listenScroll="true" @scroll="myscroll" :click="true" >
          <ul class="jy_new_love_list">
            <router-link tag="li" v-for="item,index in showList" :key="index"  :to="{name:'act',query:{id:item.id}}" :class="{jy_new_love_list_oneImg:item.showImg&&item.showImg.length==1}">
              <div class="jy_new_love_list_t">
                <i class="jy_new_love_list_timg" :style="'background-image:url('+$utils.getFullPath(item.jiaoyouUser.headimgAttachmentId)+')'"></i>
                <h4><i>{{$utils.formarDistance(item.distance)}}</i>{{item.jiaoyouUser.aliasName}}</h4>
                <p><em>{{item.payType==0?'AA':item.payType==1?'我买单':item.payType==2?'你买单':''}}</em><i class="jy_auth_age" :class="{jy_auth_age_man:item.jiaoyouUser.sex==2}">{{item.jiaoyouUser.sex==1?'&#xe64a;':'&#xe605;'}}{{item.jiaoyouUser.age}}</i></p>
              </div>
              <div v-if="item.showImg&&item.showImg.length==1" class="jy_new_love_list_b">
                <div class="jy_new_love_list_bimg">
                  <p><i :style="{'background-image':'url('+getFullPath(item.showImg[0])+')'}"></i></p>
                </div>
                <h3><em :class="'jy_new_love_tit_'+item.activityMethod">{{yuan(item.activityMethod)}}</em>一起{{item.datingThemes==1?'去旅行':item.datingThemes==2?'吃饭':item.datingThemes==3?'看电影':item.datingThemes==4?'唱歌':item.datingThemes==5?'运动':''}}{{item.datingThemes==1?item.datingLocation&&' · '+item.datingLocation:item.datingThemes==2?item.datingLocation&&' · '+item.datingLocation:item.datingThemes==3?item.datingTitle&&' · '+item.datingTitle:item.datingThemes==4?item.datingLocation&&' · '+item.datingLocation:item.datingThemes==5?item.datingTitle&&' · '+item.datingTitle:item.datingTitle&&item.datingTitle}}</h3>
                <p class="jy_new_love_list_pos">{{item.datingLocation}}</p>
                <p class="jy_new_love_list_date">{{item.activityStarttime.substr(0,10)}}</p>
                <p class="jy_new_love_list_tip">{{item.datingDesc}}</p>
              </div>
              <div v-else class="jy_new_love_list_b">
                <h3><em :class="'jy_new_love_tit_'+item.activityMethod">{{yuan(item.activityMethod)}}</em>一起{{item.datingThemes==1?'去旅行':item.datingThemes==2?'吃饭':item.datingThemes==3?'看电影':item.datingThemes==4?'唱歌':item.datingThemes==5?'运动':''}}{{item.datingThemes==1?item.datingLocation&&' · '+item.datingLocation:item.datingThemes==2?item.datingLocation&&' · '+item.datingLocation:item.datingThemes==3?item.datingTitle&&' · '+item.datingTitle:item.datingThemes==4?item.datingLocation&&' · '+item.datingLocation:item.datingThemes==5?item.datingTitle&&' · '+item.datingTitle:item.datingTitle&&item.datingTitle}}</h3>
                <div class="jy_new_love_list_bimg" v-if="item.showImg">
                  <p v-for="v,i in item.showImg" :key="i">
                    <i :style="{'background-image':'url('+getFullPath(v)+')'}"></i>
                  </p>
                </div>
                <p class="jy_new_love_list_pos">{{item.datingLocation}}</p>
                <p class="jy_new_love_list_date">{{item.activityStarttime.substr(0,10)}}</p>
                <p class="jy_new_love_list_tip">{{item.datingDesc}}</p>
              </div>
            </router-link>
          </ul>
        </scroll>
      </div>
      <Routerlink></Routerlink>

      <div v-transfer-dom>
        <x-dialog v-model="showChooseThemes" hide-on-blur class="dialog-chooseThemes" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
          <div class="chooseThemes">
            <p>发起邀约</p>
            <div>
              <div><p @click="chooseThemes(1)"><img src="../../images/travel.png"/></p><i>旅行</i></div>
              <div><p @click="chooseThemes(2)"><img src="../../images/eat.png"/></p><i>吃饭</i></div>
              <div><p @click="chooseThemes(3)"><img src="../../images/movie.png"/></p><i>电影</i></div>
              <div><p @click="chooseThemes(4)"><img src="../../images/sing.png"/></p><i>唱歌</i></div>
              <div><p></p></div>
              <div><p @click="chooseThemes(5)"><img src="../../images/sport.png"/></p><i>运动</i></div>
              <div> <p @click="chooseThemes(99)"><img src="../../images/other.png"/></p><i>其他</i></div>
              <div><p></p></div>
            </div>
          </div>
          <div class="arrow"></div>
        </x-dialog>
      </div>
      <div class="publishButton" v-if="!$route.query.nearbydate"  @click.stop="chooseThemes"><i class="iconfont" >&#xe61f;</i></div>
    </div>
    <transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
      <setSort v-show="showPopover" @close="closePopover" @makesure="makesure"></setSort>
    </transition>
  </div>

</template>
<script>
import Back from '@other/back.vue';
import Routerlink from '../routerlink.vue';
import { TransferDom, Popup,XDialog } from 'vux';
import setSort from './setSort'
import Loading from '@other/loading.vue';
import Scroll from '@/components/betterscroll/scroll/scroll.vue'
export default {
	name: 'love',
	data () {
		return {
      isloading:false,
      indexListFixed:false,
	  title:"约会",
      menuFixed:false,
      showChooseThemes:false,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 60,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      ifinit:false,
      myScrollerHeight:0,
      scrollwidth:0,
      parentwidth:0,
      activity:{1:'旅行',2:'吃饭',3:'电影',4:'唱歌',5:'运动',99:'其他' },
      listArr:[],
      datingThemes: '',
      activityMethod:null,
      showPopover:false,
      showShare:false,
      //分页参数
      page:1,
      rows:20,
      searchResult:{
        authentication:{}
      }
		}
	},
  directives: {
    TransferDom
  },
  components: {
    Routerlink,
    Loading,
    Scroll,
    Popup,
    XDialog,
    setSort,
	Back,
  },
  computed: {
	  yuan:function(){
	    return function(index){
	      return ['选','抢','竞','中','配'][index-1]
      }
    },
	  showList:function(){
		const t=this;
	    return this.listArr.map(v=>{
			let item=t.$utils.deepCopy(v);
			if(item.showPic){
				let showPic = item.showPic.split(",").filter((va,i)=>{
						return va!='';
					});
				item.showImg=showPic;
			}
			return item
		})
    },
    pullDownRefreshObj: function () {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop)
      } : false
    },
    pullUpLoadObj: function () {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold)
      } : false
    },
    handleRoute(){
      return this.$store.state.handleRoute;
    },
  },
	watch:{
    handleRoute(newV){
      if(!newV){
        this.showPopover=false;
        this.showShare=false;
        this.showChooseThemes=false;
      }
    },
    showPopover(newV){
      let status = this.showPopover||this.showShare||this.showChooseThemes
      this.$store.commit("CHANGEHANDLEROUTE",status)
    },
    showShare(newV){
      let status = this.showPopover||this.showShare||this.showChooseThemes
      this.$store.commit("CHANGEHANDLEROUTE",status)
    },
    showChooseThemes(newV){
      let status = this.showPopover||this.showShare||this.showChooseThemes
      this.$store.commit("CHANGEHANDLEROUTE",status)
    },
	},
	mounted () {
		const t=this;
		$("body").addClass("gray");
    this.myScrollerHeight = document.body.clientHeight-$(".jy_new_love_t").height()-$(".menu").height()-$(".header").height()-1-(0.2)*parseInt(document.documentElement.style.fontSize);
    if(window.api){
      this.myScrollerHeight = document.body.clientHeight-$(".jy_new_love_t").height()-$(".menu").height()-$(".header").height()-1-(0.95)*parseInt(document.documentElement.style.fontSize);
    }
    this.getList("");
    this.$nextTick(function () {
      this.ifinit = true;
    })
	},
	destroyed () {
		$("body").removeClass("gray");
	},
	methods:{
    myscroll(pos) {
      const newVal = pos.y;
      if (!this.beforeIndexListFixedHeight) {
        this.beforeIndexListFixedHeight = $(".yuan").height()+0.4*parseInt(document.documentElement.style.fontSize);
      }
      if (newVal > -this.beforeIndexListFixedHeight) {
        if(this.indexListFixed){
          $(".yuan").css("display","");
          this.menuFixed = false;
        }
        this.indexListFixed = false
        return
      }
      this.indexListFixed = true
    },
    clickShare() {
      this.showShare = !this.showShare;
    },
    changeShow(val){
      this.showShare=val;
    },
    showFilter(){
      this.showPopover = !this.showPopover;
    },
    closePopover(){
      this.showPopover = false;
    },
    makesure(result){
      this.searchResult = result;
      this.getList(this.datingThemes,null,true,null,null,null,null,null,null);
      this.showPopover = false;
    },
    chooseThemes(index){
      this.$router.push({
        path: '/publishAppointment',
      })
      return false;
      let path = '/publish/main'
      if(index==1){//旅行
        path = '/travel/main'
      }else if(index==2||index==4){

      }else if(index==5||index==99){
        path = '/other/main'
      }else if(index==3){
        path = '/movie/main'
      }
      this.showChooseThemes=false;
      this.$router.push({
        path: path,
        query:{
          datingThemes:index
        }
      })
    },
    getFullPath (path) {
      return this.$utils.getFullPath(path)
    },
    async onPullingDown() {
      // 模拟更新数据
      console.log('下拉刷新')
      this.$refs.scroll.openPullUp()
      let totalPage = await this.getList(this.datingThemes,null,true)
    },
    async onPullingUp() {
      // 更新数据
      console.log('上拉加载')
      let totalPage = await this.getList(this.datingThemes)

    },
    refresh(done) {//下拉刷新
      console.log("刷新 ");
      setTimeout(()=>{
        console.log("刷新完成");
        done();
      },1000);
    },
    infinite(done){
      console.log("加载 ");
      setTimeout(()=>{
        console.log("加载完成");
        done(true);
      },1000);
    },
    toLoveList(index){
      console.log(index)
      this.$router.push({
        path: "/loveList",
        query: {
          listIndex: index
        }
      })
    },
    toListItem(id){
      this.$router.push({
        path: "/act",
        query: {
          id: id
        }
      })
    },
    clickShare() {
      this.showShare = !this.showShare;
    },
    async getList(datingThemes,search,PullingDown,sex,authentication,areaId,datingTime,startDate,endDate,activityMethod){
      try{
        const _this = this;
        if(_this.indexListFixed){
          $(".yuan").css("display","none");
          _this.menuFixed = true;
        }
        if(_this.datingThemes!=datingThemes){
          this.page = 1;
          _this.listArr=[];
          this.$refs.scroll.openPullUp()
          console.log("打开上拉加载")
        }
        if(typeof(activityMethod) == "undefined"){
          activityMethod = _this.activityMethod;
        }
        if(_this.activityMethod!=activityMethod){
          this.page = 1;
          _this.listArr=[];
          this.$refs.scroll.openPullUp()
          console.log("打开上拉加载")
        }
        if(PullingDown){
          this.page = 1;
        }
        _this.datingThemes = datingThemes;
        _this.activityMethod = activityMethod;
        let location = await _this.$store.dispatch("getMylocation");
        let data = Object.assign({
          latitude:location.lat==0?null:location.lat,
          longitude: location.lon==0?null:location.lon,
          datingThemes:_this.datingThemes,
          activityMethod:activityMethod,
          sex:_this.searchResult.sex,
          idStatus:_this.searchResult.authentication.idcard,
          houseStatus:_this.searchResult.authentication.house,
          carStatus:_this.searchResult.authentication.car,
          videoStatus:_this.searchResult.authentication.video,
          areaId:_this.searchResult.areaId,
          beginActivityStarttime:_this.searchResult.beginActivityStarttime?_this.searchResult.beginActivityStarttime+" 00:00:00":null,
          endActivityStarttime:_this.searchResult.endActivityStarttime?_this.searchResult.endActivityStarttime+" 23:59:59":null,
          page:this.page,
          rows:this.rows,
          education:_this.searchResult.education,
          minHeight:_this.searchResult.minHeight,
          minAge:_this.searchResult.minAge,
          maxAge:_this.searchResult.maxAge,
        },search)
        if(_this.searchResult.lat!=null){
          data =  Object.assign({
            latitude1:_this.searchResult.lat,
            longitude1: _this.searchResult.lon,
          },data)
        }
        console.log(JSON.stringify(data));
        this.$vux.loading.show()
        let result = await _this.$server.searchDatingList(data);
        this.page++
        if(PullingDown){
          _this.listArr=[];
        }
        if(result.data.list){
          _this.listArr.push(...result.data.list);
        }
        this.$vux.loading.hide()
        this.$refs.scroll.forceUpdate()
        if(this.page>result.data.totalPage){
          console.log("关闭上拉加载")
          this.$refs.scroll.closePullUp()
        }

        return Promise.resolve(result.data.totalPage)
      }catch (e) {
        console.log(e)
        return Promise.reject("error")
      }
    },
	}
}
</script>
<style scoped lang="scss">
  .dialog-chooseThemes{
    .chooseThemes{
      background-color: #FFF;
      width: 9.96rem;
      margin: auto;
      line-height: 1;
      overflow: hidden;
      border-radius: 10px;
      &>p{
        position: relative;
        padding:0.4rem 0 0.4rem;
        font-size: 0.5rem;
        .iconfont{
          position:absolute;
          right: 5px;
          top:5px;
          font-size: 0.6rem;
        }
      }
      &>div{
        margin: 0.4rem auto 0;
        color:#8e8e8e;
        width: 8.8rem;
        font-size: 0.36rem;
        line-height: 1.2;
        display: flex;
        flex-wrap:wrap;
        justify-content:space-between;
        div{
          margin-bottom: 0.33rem;
          p{
            width: 1.9rem;
            height: 1.9rem;
            img{
              width: 100%;
            }
          }
          i{
            display: inline-block;
            margin: 0.24rem 0;
            font-size: 0.38rem;
          }
        }
      }
    }
    .arrow{
      position: relative;
      &:after{
        content: '';
        z-index: 1002;
        position: absolute;
        top: -0.6rem;
        right:1.6rem;
        border-width:0.6rem;
        border-style:dashed solid dashed dashed;
        border-color:transparent #FFF transparent transparent;
      }
    }
  }
  .publishButton{
    position: fixed;
    bottom: 2.74rem;
    right: 0.4rem;
    width: 1.54rem;
    height: 1.54rem;
    z-index: 5001;
    text-align: center;
    line-height: 1.54rem;
    border: 1px solid #FFF;
    background: linear-gradient(to right, #ff9a63 , #ff5b02); /* 标准的语法 */
    border-radius: 50%;
    color: #FFF;
    transition-duration:0.5s;
    i{
      transition-duration:0.5s;
      transform:rotate(0deg);
      display: inline-block;
    }
    i.rotate{
      transform:rotate(45deg);
    }
    &.active{
      /*bottom: 1.4rem;*/
    }
  }
</style>
