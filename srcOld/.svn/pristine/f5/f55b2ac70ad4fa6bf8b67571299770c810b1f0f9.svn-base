<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left" v-if="!datingId"><i class="iconfont">&#xe613;</i></Back>
        <a v-else class="left" @click="hiddenInfo"><i class="iconfont">&#xe613;</i></a>
        <a class="right"></a>对我好感
      </div>
    </div>
    <myScroller :style="$store.state.isBrowser?'padding:1.39rem 0 0;':'padding:2.14rem 0 0;'" :infinite="infinite" :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" ref="myScroller">
      <div class="myscoll">
        <div class="content">
          <template v-if="listArr">
            <template v-if="listArr.length>0">
              <div v-for="(item,index) in listArr" :key="index" @click.stop="getUserInfo(item.id)">
                <div :style="{'background-image':'url('+getFullPath(item.headimgAttachmentId)+')'}"></div>
                <div class="userinfo">
                  <p>{{item.aliasName}}</p>
                  <p>{{item.selfLabel}}</p>
                </div>
                <div>
                  <!--<span v-if="item.isFollow==0" @click="followFriend(item.id,index)"> +关注 </span>
                  <span v-else @click="unfollowFriend(item.id,index)"> 取消关注</span>-->
                </div>
              </div>
            </template>
            <template v-else>
              <div class="no-data" style="display: block;height: 0.44rem;line-height: 0.44rem;border-bottom: none;">暂无数据</div>
            </template>
          </template>
          <!--<div v-for="item in people" :key="item.id">-->
            <!--<div :style="{'background-image':'url('+item.icon+')'}"></div>-->
            <!--<div>-->
              <!--<p>{{item.name}}<img v-if="item.level!=null" :src="'../../../static/img/V'+item.level+'.png'"/></p>-->
              <!--<p>{{item.signs}}</p>-->
            <!--</div>-->
            <!--<div>-->
              <!--<span v-if="item.attentioned==0"> +关注 </span><span v-else> 取消关注 </span>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </myScroller>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import myScroller from '@other/myScroller.vue';

  let fontsize = parseInt(document.documentElement.style.fontSize);
  export default {
    name: 'recentVisit',
    components: {
      Loading,
      myScroller,
      Back,
    },
	props: ['datingId'],
    data () {
      return {
        active:1,
        isloading:false,
        listArr: [],
        //分页参数
        pageNo: 1,
        isRead: false,
        isEnd: false,
        loadRefresh:true,//下拉刷新
        loadInfinite:true, //上拉加载
      }
    },
    computed: {
      underlineLeft:function(){
        if(this.active==1){
          return  document.body.clientWidth*0.5/4 +'px'
        }else{
          return document.body.clientWidth*0.63 +'px'
        }
      },
    },
    created (){

    },
    destroyed () {
    },
    mounted () {
		this.datingId&&this.getList();
	},
    methods :{
		hiddenInfo() {
        this.$emit('hiddenInfo');
      },
      getFullPath (path) {
        return this.$utils.getFullPath(path)
      },
	  getUserInfo(id){
		this.$emit('getUserInfo',id);
	  },
      async getList(active,flag){
        const _this = this;
        if (_this.isRead) {
          return false;
        }
        _this.isRead = true;
        if (_this.isRefresh || flag || _this.active!=active) {
          _this.pageNo = 1;
          if (flag) {
            _this.isloading = true;
          }
        }
        try {
          let data = {
            datingActivityId: _this.datingId,
            page: _this.pageNo,
            rows: _this.$store.state.pageSize
          };
          if (!_this.listArr || _this.isRefresh || flag || _this.active != active ) {
            _this.$refs.myScroller.scrollTo(1);
            _this.listArr = [];
            _this.active = active;
          }
          let result = await _this.$server.getGoodList(data);
          if(result.data.data){
            _this.listArr.push(...result.data.data);
          }
          if (!result.data.count||result.data.count <= _this.$store.state.pageSize * _this.pageNo || result.data.data.length < _this.$store.state.pageSize|| result.data.data.length < _this.$store.state.pageSize) {//判断是否最后一页
            _this.isEnd = true;
          } else {
            _this.isEnd = false;
            _this.$refs.myScroller.finishInfinite(false);
          }
		  this.datingId && this.$emit('openWin');
        }catch (e) {
          console.log(e)
		  this.datingId && this.$emit('openWin',true);
        }
        _this.isRead = false;
        _this.isloading = false;
        _this.isRefresh = false;
        _this.pageNo++;
      },
      infinite(done) {//上拉加载(防止初始内容不满一屏会无限加载)
        const t=this;
        if(t.isEnd){
          done(true);
          return false;
        }
        console.log("加载");
        t.getList(this.active).then(()=>{
          if(t.isEnd){
            done(true);
          }else{
            done();
          }
        });
      },
      refresh(done) {//下拉刷新
        const t=this;
        console.log("刷新");
        t.isRefresh=true;
        t.getList(this.active).then((res)=>{
          done();
        });
      },
    }
  }
</script>
<style scoped lang="scss">
  .main{
    padding-bottom:0;
    &:before{
      background-color:#3a3845 ;
    }
    .header{
      position: fixed;
      width: 100%;
      z-index: 10;
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
    .title{
      width: 100%;
      font-size: 0;
      margin-top: 1.39rem;
      padding:0.28rem 0 0;
      height: 1.32rem;
      line-height: 1.32rem;
      background-color: #f2f2f2;
      z-index: 11;
      position: fixed;
      .underline{
        position: absolute;
        width: 25%;
        top: 0.62rem;
        height: auto;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0);
        -webkit-transition: 0.2s all linear;
        transition: 0.2s all linear;
        &:before{
          content: "";
          margin-top: -6px;
          width: 25%;
          height: auto;
          display: inline-block;
          border-bottom: 2px solid #ff4300;
        }
      }
      div{
        position: relative;
        font-size: 0.44rem;
        display: inline-block;
        color: #9a9a9d;
        box-sizing: border-box;
        width: 50%;
        text-align: center;
        background-color: #fff;
        overflow: hidden;
        /*position: relative;*/
        /*font-size: 0.44rem;*/
        /*display: inline-block;*/
        /*color:#9a9a9d;*/
        /*box-sizing: border-box;*/
        /*width: 50%;*/
        /*text-align: center;*/
        /*background-color: #fff;*/
        /*overflow: hidden;*/
        /*&::before {*/
          /*content: "";*/
          /*position: absolute;*/
          /*bottom: 6px;*/
          /*left: 100%;*/
          /*width: 15%;*/
          /*height: 0;*/
          /*border-bottom: 2px solid #ff4300;*/
          /*transition: 0.2s all linear;*/
        /*}*/
      }
      div.active{
        /*&::before {*/
          /*left: 42.5%;*/
          /*transition-delay: 0.1s;*/
        /*}*/
        color:#000;
      }
      /*div.active ~ div{
        &::before {
          left: -18%;
        }
      }*/
    }
    .myscoll{
      background-color: #ffffff;
      .content{
        padding:0 0.3rem;
        &>div{
          position:relative;
          display: flex;
          align-items: center;
          height: 2rem;
          line-height: 2rem;
          border-bottom: 1px solid #f2f2f2;
          &>div:first-child{
            width: 1.4rem;
            height: 1.4rem;
            background-size: cover;
            background-position: center;
            border-radius: 50%;
          }
          &>div:nth-of-type(2){
            width: 6rem;
            p{
              line-height: 2;
              padding:0 0 0 0.2rem;
              font-size: 0.48rem;
              img{
                margin-left: 0.1rem;
                width: 0.35rem;
                height: 0.35rem;
              }
            }
            p:last-child{
              font-size: 0.36rem;
              color:#9a9a9d;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
          &>div:last-child{
            position: absolute;
            right: 0;
            width: 1.8rem;
            text-align: center;
            color:#ffa443;
            font-size: 0.36rem;
            span{
              border: 1px solid #ffa443;
              display: inline-block;
              width: 100%;
              height: 0.7rem;
              line-height: 0.7rem;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
</style>

