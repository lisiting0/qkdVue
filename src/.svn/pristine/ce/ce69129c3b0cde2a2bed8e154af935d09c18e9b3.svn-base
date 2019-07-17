<template>
<div class="main">
	<Loading v-if="isloading"></Loading>
  <div class="header">
    <div class="top">
      <a class="left"></a>发现
    </div>
  </div>

	<div class="search_list" :style="{height:contentheight+'px'}">
    <ul>
      <li>
        <a @click="linkTo('moments')"><i class="icon_jydt"></i>
          <p><em class="icon_go"></em>乾坤动态
		  <span v-if="newFeed" class="monent-sp news-sp" :style="'background-image:url('+$utils.getFullPath(newFeed.uploadingPerson.headimgAttachmentId)+');'"></span>

		  </p></a>
      </li>
	  <li>
			<a @click="linkTo('exposure','')"><i class="iconfont fjdr">&#xe617;</i>
			<p><em class="icon_go"></em>曝光台</p></a>
		</li>
    </ul>
		<!--<ul v-if="0">
			<li>
				<a @click="linkTo('rankingList')"><i class="icon_zm"></i>
				<p><em class="icon_go"></em>最美娇友</p></a>
			</li>
		</ul>-->

		<ul>
			<li>
				<a @click="linkTo('nearbyPeople','nearbyPeople')"><i class="iconfont fjdr">&#xe616;</i>
				<p><em class="icon_go"></em>附近的人</p></a>
			</li>
			<li>
				<a @click="linkTo('love','love')"><i class="icon_fjyy"></i>
				<p><em class="icon_go"></em>附近约会</p></a>
			</li>
			
		</ul>
		<!--<ul>-->
			<!--<li>-->
				<!--<a @click="linkTo('nearbyPeople','VIPnearbyPeople')"><i class="icon_dsj"></i>-->
				<!--<p><em class="icon_go"></em>大数据荐友<span class="right">VIP推荐</span></p></a>-->
			<!--</li>-->
			<!--<li>-->
				<!--<a @click="linkTo('nearbydate','VIPnearbydate')"><i class="icon_dsjy"></i>-->
				<!--<p><em class="icon_go"></em>大数据荐约<span class="right">VIP推荐</span></p></a>-->
			<!--</li>-->
		<!--</ul>-->
    <!--<ul v-if="0">
      <li>
        <a @click="linkTo('headline')"><i class="iconfont toutiao">&#xe621;</i>
          <p><em class="icon_go"></em>娇友头条</p></a>
      </li>
    </ul>-->
	</div>
</div>
</template>
<script>
import p4 from '../../images/p4.jpg';
import Loading from '@other/loading.vue';
export default {
	name: 'search',
	data () {
		return {
			imgs:{p4:p4},
			isloading:false,
			contentheight:0,
			newFeed:null,
		}
	},
	activated(){
		const t=this;
		if(t.$store.state.isLogin){
			t.getNewFeed();
		}
	},
	mounted(){
		const t=this;
		this.contentheight = document.body.clientHeight-$(".header").height()-(0.75)*parseInt(document.documentElement.style.fontSize)-3-$(".menu").height();
		if(t.$store.state.isLogin){
			t.getNewFeed();
		}
	},
	components: {
		Loading
	},
  methods:{
	async getNewFeed(){
		const t=this;
		try{
			const result=await t.$server.getNewFeed({

			});
			t.newFeed=result.data.data;
		}catch(e){
			console.log(e);
		}
	},
    linkTo(link,type){
      let query = null;
      if(type==='love'){

      }else if(type==='VIPnearbydate'){
        query = {
          title:"VIP大数据荐约",
          type:type
        }
      }else if(type==='nearbyPeople'){
        query = {
          title:"附近的人",
          type:type
        }
      }else if(type==='VIPnearbyPeople'){
        query = {
          title:"VIP大数据荐友",
          type:type
        }
      }
      this.$router.push({
        path:link,
        query: query
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .main {
    &:before {
      background-color: #3a3845;
    }
    .header {
      .top {
        background-color: #3a3845;
        color: #FFF;
        font-size: 0.6rem;
        position: relative;
        i {
          font-size: 0.52rem;
        }
        a {
          position: absolute;
          padding: 3px;
        }
        .left {
          left: 0.325rem;
        }
        .right {
          right: 0.325rem;
        }
      }
    }
    li .toutiao{
      color:#f05353;
    }
    li .fjdr{
      font-size: 0.75rem;
      line-height: 1.2;
      color:#faa505;
    }
    li .right{
      color:#b3b3b3;
      font-size: 0.32rem;
      top:0.1rem;
      right:0.5rem;
      display: inline-block;
      position: absolute;
    }
    li span.news-sp{
      img{
        vertical-align: middle;
        height: 100%;
      }
      height: 0.8rem;
      position: absolute;
      right:0.5rem;
      &:before{
        content: "";
        position: absolute;
        right: -0.16rem;
        top: -0.07rem;
        border-radius: 50%;
        width: 0.24rem;
        height: 0.24rem;
        background-color: #ff3600;
      }
    }
    .monent-sp{
      width: 0.8rem;
      background-size: cover;
      background-position:center;
      background-repeat:no-repeat;
    }
    .search_list{
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
