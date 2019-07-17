<template>
  <div class="rankingSignUp">
    <Loading v-if="isloading"></Loading>
    <div class="header" :style="'background-image:url('+getFullPath(activeList.picture)+');'">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right"></a>
      </div>
    </div>
    <div class="title">
      <p v-bind:class="{ active: isActive }" @click="event(1)">活动介绍</p>
      <p v-bind:class="{ active: !isActive }" @click="event(0)">报名人数</p>
    </div>

    <div class="content" v-show="isActive" :style="{height:contentheight+'px'}">
      <p>活动简介</p>
      <div>
        <p>报名时间</p>
        <span>{{activeList.scheduleStarttime}}~{{activeList.scheduleEndtime}}</span>
      </div>
      <div>
        <p>报名要求</p>
        <span v-if="activeList.expectSex==1">女</span>
        <span v-if="activeList.expectSex==2">男</span>
        <span v-if="activeList.expectSex==9">不限</span>
      </div>
      <div>
        <p>具体内容</p>
        <span>{{activeList.activityDesc}}</span>
      </div>
    </div>
    <div class="content" v-show="!isActive" :style="{height:contentheight+'px'}">
      <p>报名人数(共计{{joinerList.length}}人)</p>
      <ul>
        <template v-if="joinerList">
          <template v-if="joinerList.length>0">
            <li v-for="item in joinerList" :key="item.id">
              <img :src="getFullPath(item.coverimgAttachmentId)"/>
              <p><span>{{item.aliasName}}</span><i class="iconfont">&#xe610;</i><i class="iconfont">&#xe6c6;</i></p>
            </li>
          </template>
        </template>
      </ul>
    </div>

  <div class="my-footer">
   <div>
     <p @click="followActivity(id)" v-if="activeList.isFollow==0"><i class="iconfont">&#xe61e;</i><i>关注</i></p>
     <p @click="unfollowActivity(id)" v-if="activeList.isFollow==1"><i class="iconfont">&#xe614;</i><i>取消关注</i></p>
     <p><i class="iconfont">&#xe604;</i><i>分享</i></p>
   </div>
    <div @click="baoMing(id)" v-if="activeList.attend==0">立即报名</div>
    <div @click="cancelBaoMing(id)" v-if="activeList.attend==1">取消报名</div>
  </div>
  </div>
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
  let fontsize = parseInt(document.documentElement.style.fontSize);
  export default {
    name: 'rankingSignUp',
    data () {
      return {
        isloading:false,
        id:null,
        activeList:{},
        joinerList:[],
        isActive:true,
        contentheight:0,
        //分页参数
        page:1,
        rows:20,
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
      this.id = this.$route.query.id;
      this.activityInfo(this.id);
      this.activityCandidateInfoList(this.id);
      this.contentheight = document.body.clientHeight-$(".header").height()-$(".my-footer").height()-$(".title").height()-(1.35)*parseInt(document.documentElement.style.fontSize)-3;
    },
    methods :{
      getFullPath (path) {
        return this.$utils.getFullPath(path)
      },
      async onPullingDown() {
        // 模拟更新数据
        console.log('下拉刷新')
        this.$refs.scroll.openPullUp()
        let totalPage = await this.activityCandidateInfoList(this.id,null,true)
      },
      async onPullingUp() {
        // 更新数据
        console.log('上拉加载')
        let totalPage = await this.activityCandidateInfoList(this.id)

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
      event(index){
        this.isActive=!!index;
      },
      async activityInfo(id) {
        const _this = this;
        let result = await _this.$server.activityInfo(id);
        if(result.data.data){
          _this.activeList = result.data.data;
        }
      },
      async activityCandidateInfoList(id,search,PullingDown) {
        try{
          const _this = this;
          if(PullingDown){
            this.page = 1;
          }
          let data = Object.assign({
            page:this.page,
            rows:this.rows
          },search)
          this.$vux.loading.show();
          let result = await _this.$server.activityCandidateInfoList(id);
          this.page++;
          if(result.data.list){
            _this.joinerList = result.data.list;
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
      async baoMing(id){
        const _this = this;
        let result = await _this.$server.activityInfoSign(id);
        this.$vux.toast.show({
          type: 'text',
          text: '报名成功',
          position: 'middle',
          width: 'auto',
        })
        this.$set(this.activeList,"attend",0)
      },
      async cancelBaoMing(id){
        const _this = this;
        let result = await _this.$server.activityInfoSignCancel(id);
        this.$vux.toast.show({
          type: 'text',
          text: '取消报名成功',
          position: 'middle',
          width: 'auto',
        })
        this.$set(this.activeList,"attend",1)
      },
      async followActivity(){ //关注活动接口
        this.$vux.loading.show()
        await this.$server.followZMJYActivity(this.id);
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'text',
          text: '关注成功',
          position: 'middle',
          width: 'auto',
        })
        this.$set(this.activeList,"isFollow",1)
      },
      async unfollowActivity(){ //取消关注活动接口
        this.$vux.loading.show()
        await this.$server.unfollowZMJYActivity(this.id);
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'text',
          text: '取消关注成功',
          position: 'middle',
          width: 'auto',
        })
        this.$set(this.activeList,"isFollow",0)
      },
    }
  }
</script>
<style scoped lang="scss">
  .rankingSignUp{
    font-weight: normal;
    .header{
      padding-top:0.75rem;
      width: 100%;
      height:6.02rem;
      .top{
        background-color: rgba(0,0,0,0) !important;
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
    .title{
      height:1.42rem;
      background-color: #FFF;
      width: 100%;
      display: flex;
      p{
        height: 1.12rem;
        line-height: 1.12rem;
        text-align: center;
        box-sizing: border-box;
        margin:0.15rem 0;
        flex-grow:1;
        font-size: 0.36rem;
        &:first-child{
          border-right: 1px solid #c4c4c4;
        }
      }
    }
    .active{
      color:#ff3ce1;
    }
    .content{
      background-color: #FFF;
      margin-top:0.3rem;
      font-size: 0.36rem;
      overflow-x: hidden;
      overflow-y: auto;
      &>p{
        padding:0 0.445rem;
        height:0.94rem;
        line-height: 0.94rem;
        border-bottom:1px solid #f2f2f2;
      }
      div{
        margin:0.65rem 0.6rem 0;
        span{
          color:#c3c3c3;
          font-size: 0.32rem;
        }
      }
      ul{
        margin:0.32rem 0.92rem 0;
        li{
          display: inline-block;
          width:1.5rem;
          margin-left: 0.25rem;
          &:nth-of-type(5n+1){
            margin-left:0;
          }
          img{
            width:1.5rem;
            height: 1.5rem;
          }
          p{
            span{
              font-size: 0.2rem;
              display: inline-block;
              width:1.6rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              vertical-align: top;
            }
            i{
              font-size: 0.2rem;
              color:#f5b40c;
              vertical-align: top;
            }
          }

        }
      }
    }
    .my-footer{
      height: 1.36rem;
      font-size: 0;
      position: fixed;
      bottom:0;
      width:100%;
      &>div{
        display: inline-block;
        width:50%;
        height: 1.36rem;
        text-align: center;
        vertical-align: bottom;
        &:first-child{
          color:#bababa;
          background-color: #FFF;
          p{
            display: inline-block;
            width:50%;
            height: 1.36rem;
            font-size: 0.28rem;
            padding-top:0.36rem;
            i{
              display: block;
              height: 0.5rem;
              line-height: 1;
              &.iconfont{
              }
            }
          }
        }
        &:last-child{
          font-size: 0.48rem;
          line-height: 1.36rem;
          color:#fff;
          background-color: #ff3ce1;
        }
      }
    }
  }
</style>

