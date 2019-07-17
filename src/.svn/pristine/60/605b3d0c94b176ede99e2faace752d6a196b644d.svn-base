<template>
  <div class="parent main">
   
      <Loading v-if="isloading"></Loading>
      <div class="header">
        <div class="top">
          <Back class="left"><i class="iconfont">&#xe613;</i></Back>详情
        </div>
      </div>
          <myScroller :style="$store.state.isBrowser?'padding:1.39rem 0 0;':'padding:2.29rem 0 0;'" :noDataText="noDataText" :infinite="infinite" :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" ref="myScroller" :showbg="showbg">
		  <div class="myscoll">
		  <div class="content">
            <div class="title">
              <i class="iconfont">&#xe61e;</i>精选评论
            </div>
            <div class="content" v-if="comments">
             <div v-for="item,index in comments" :key="item.id" class="commentItem">
               <div :style="{'background-image':'url('+getFullPath(item.user.headimgAttachmentId)+')'}"></div>
               <div>
                 <div>
                   <p>
                     <span>{{item.user.aliasName}}</span>
                     <!--<span><i class="iconfont">{{item.sex==0?'&#xe605;':'&#xe64a;'}}</i>{{item.age}} </span>
                     <span>{{item.vipType}}</span>
                     <span>保证金<i>{{item.deposit}}</i></span>
                     <span><i class="iconfont">&#xe612;</i>{{item.praise}} </span>-->
                   </p>
                   <!--<p>
                     <a :class="{demanda:item.demand.idcard}"> <img :src="imgs.idcard"/></a>
                     <a :class="{demanda:item.demand.car}"> <img :src="imgs.car"/></a>
                     <a :class="{demanda:item.demand.house}" ><img :src="imgs.house"/></a>
                     <a :class="{demanda:item.demand.health}" ><img :src="imgs.health"/></a>
                   </p>-->
                 </div>
                 <div>
                   {{item.content}}
                 </div>
                 <div class="allnum" v-if="item.comments">
					<p v-for="val,ind in item.comments" v-if="ind<4"><span>{{val.user.aliasName}}:</span><span>{{val.content}}</span></p>
					<p v-if="item.replyCount>4" @click="linkTo('/userComment/main',item.id)">查看全部{{item.replyCount}}条回复</p>
                 </div>
                 <div class="replay">
                   <span>{{messageTimeFromNow(item.createDate)}}</span>
                   <span @click="toComment(item.id,index)"><i class="iconfont">&#xe650;</i>回复 </span>
                 </div>
               </div>
             </div>
            </div>
			</div>
			</div>
          </myScroller>
      <div class="detailFooter">
        <span @click="toComment('','')">发表评论</span>
        <span>发送</span>
      </div>
    
    <transition enter-active-class="slideInUp" leave-active-class="slideOutUp">
      <comment-on @childMethod="sendComment" v-if="pagerouter=='commenton'" :title="replayTitle" class="comment-on" ref="commenton"></comment-on>
    </transition>
  </div>
</template>
<script>
 // import car from '@/images/car.png';
 // import idcard from '@/images/idcard.png';
//  import house from '@/images/house.png';
//  import health from '@/images/health.png';
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import CommentOn from './commentOn';
  import myScroller from '@other/myScroller.vue';
  export default {
    name: 'comments',
    data () {
      return {
        isloading:false,
       // imgs:{car:car,idcard:idcard,house:house,health:health},
        pagerouter:'',
        toplineId:11,
        comments:null,
		pageNo:1,
		isRead:false,
		isEnd:false,
		loadRefresh:true,//下拉刷新
		loadInfinite:true, //上拉加载
		isRefresh:false,
		noDataText:"",
		replay:false,//是否回复
		replayTitle:'',
		replayIndex:'',
		showbg:true,
      }
    },
    components: {
      Loading,
      CommentOn,
      myScroller,
	  Back,
    },
    beforeRouteUpdate (to, from, next) {
      
      this.pagerouter = to.params.pagerouter;
	  next();
    },

	watch:{
		isEnd(val){
			const t=this;
			if(val){
				t.$refs.myScroller.finishInfinite(true);
			}else{
				//t.$refs.myScroller.scrollTo(1);
				t.$refs.myScroller.finishInfinite(false);
			}
		},
	},
    mounted () {
		$("body").addClass("fullscreen");
    },
	destroyed(){
		$("body").removeClass("fullscreen");
	},
    methods :{
		toComment(id,index){
			const t=this;
			if(id){
				t.replay=true;
				t.replayTitle=t.comments[index].user.aliasName;
				
			}else{
				t.replay=false;
				id=t.$route.query.id;
				t.replayTitle='';
			}
			t.replayIndex=index;
			t.$router.push({name:'comments',params:{pagerouter:'commenton'},query:{id:id}});
		},
		async sendComment(content){
			const t=this;
			console.log("评论:"+content)
			try{
				const result=await t.$server.postComment({
					businessType:t.replay?9:4,
					objectId:t.$route.query.id,
					content:content
				})
				t.showTextarea=0;
					t.$vux.toast.show({
					type:"text",
					text: "评论成功",
					position:"bottom",
					width:"auto",
				});
				if(!result.data.data.user.aliasName){
					result.data.data.user.aliasName=t.$store.state.userInfo.aliasName;
					result.data.data.user.headimgAttachmentId=t.$store.state.userInfo.headimgAttachmentId;
				}
				if(t.replay){
					if(!t.comments[t.replayIndex].comments){
						t.comments[t.replayIndex].comments=[];
					}
					if(t.comments[t.replayIndex].replyCount<4){
						t.comments[t.replayIndex].comments.push(result.data.data);
					}
					t.comments[t.replayIndex].replyCount++;
				}else{
					if(t.isEnd){
						t.comments.push(result.data.data);
					}
				}
				
				t.$router.go(-1);
				/*let obj=t.$utils.deepCopy(t.dynamic);
				if(t.commentObj.replay){//回复中的回复
					;(function getComment(comment){
						let re=null;
						for(let i=comment.length;i--;){
							if(comment[i].id==t.commentObj.replay.id){
								re= comment[i];
								if(!comment[i].comments){
									comment[i].comments=[];
								}
								comment[i].comments.push(result.data.data);
								break;
							}
							if(comment[i].comments&&!re){
								getComment(comment[i].comments)
							}
						}
					}(obj.comments))
				}else{//第一层回复
					if(!obj.comments){
						obj.comments=[];
					}
					obj.comments.push(result.data.data);
				}
				t.$set(t.dynamic,"comments",obj.comments)*/
			}catch(e){
				console.log(e);
			}
		},
		async getData(){
			const t=this;
			if(t.isRead){
				return false;
			}
			t.isRead=true;
			t.noDataText='正在加载...';
			if(t.isRefresh){
				t.pageNo=1;
			}
			try{
				let isRefresh={};
				if(t.isRefresh){
					isRefresh={isRefresh:true};
				}
				const result =await t.$server.commentList({
					businessType:4,
					objectId:t.$route.query.id,
					page: t.pageNo,
					rows: t.$store.state.pageSize
				});
				if(!t.comments||t.isRefresh){
					t.comments=[];
				}
				if(result.data.list){
					t.showbg=false;
					t.comments.push(...result.data.list);	
				}
				if(result.data.count<=t.$store.state.pageSize*t.pageNo||result.data.list.length<t.$store.state.pageSize){//判断是否最后一页
					t.noDataText='已加载全部数据';
					t.isEnd=true;
				}else{
					t.isEnd=false;
					//t.$refs.myScroller.finishInfinite(false);
				}
				t.pageNo++;
			}catch(e){
				t.noDataText="加载异常,请重试";
				t.isEnd=true;
				t.isRefresh=false;	
				console.log(e.toString())
			}
			t.isRead=false;
			t.isloading=false;
			t.isRefresh=false;	
		},
		infinite(done) {//上拉加载(防止初始内容不满一屏会无限加载)
			const t=this;
			if(t.isEnd){
				done(true);
				return false;
			}
			//if(t.isRead){
			//	return false;
			//}
			console.log("加载");
			t.getData().then(()=>{
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
			t.getData().then((res)=>{
				done();
			});
		},
      messageTimeFromNow(publishTime){
        return this.$utils.getMessageTimeFromNow(publishTime,new Date());
      },
      linkTo(link,id){
        let query = null;
        if(link==='/userComment/main'){
          query = {
            id:id
          }
        }
        this.$router.push({
          path:link,
          query: query
        })
      },
      getFullPath(path){
        return this.$utils.getFullPath(path);
      },
    }
  }
</script>
<style scoped lang="scss">
  @keyframes slideInUp {
    from {
      transform: translate3d(0, 100%, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes slideOutUp {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, 100%, 0);
    }
  }
  .slideInUp{
    animation-name: slideInUp;
  }
  .slideOutUp{
    animation-name: slideOutUp;
  }
  .slideOutUp,.slideInUp{
    animation-duration: 0.3s;
  }
  .parent{
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .main{
    padding-bottom:0;
    box-sizing: border-box;
    background-color:#fff ;
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
    .myscoll{
     
      &>.content{
        padding:0 0.4rem;
        .title{
          height: 1.35rem;
          line-height: 1.35rem;
          text-align: center;
          font-size: 0.46rem;
          font-weight: 500;
          i{
            color:#b9853e;
            margin-right: 0.2rem;
          }
        }
        .content{
          .commentItem{
            border-bottom: 1px solid #f2f2f2;
            margin-bottom: 0.25rem;
            display: flex;
            justify-content: space-between;
            &>div:first-child{
              width:1.2rem;
              height: 1.2rem;
              border-radius: 50%;
              background-size: cover;
              background-position:center;
              background-color: #999;
            }
            &>div:last-child{
              width:8.6rem;
              i{
                font-size: 0.28rem;
              }
              div:first-child{
                p:first-child{
                  position: relative;
                  height:0.6rem;
                  line-height: 0.6rem;
                  span{
                    height:0.4rem;
                    line-height: 0.4rem;
                    display: inline-block;
                    margin-right: 0.2rem;
                    color:#FFF;
                    padding:0 0.2rem;
                    border-radius: 0.2rem;
                    font-size: 0.28rem;
                  }
                  span:first-child{
                    font-size: 0.36rem;
                    border-radius: 0;
                    padding:0 0;
                    color:#c09254;
                  }
                  span:nth-of-type(2){
                    background-color: #83c3dc;
                  }
                  span:nth-of-type(3){
                    background-color: #ffb400;
                  }
                  span:nth-of-type(4){
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
                  span:nth-of-type(5){
                    color:#cdcdcd;
                    font-size: 0.32rem;
                    position: absolute;
                    right:0;
                    top:0.1rem;
                    border-radius: 0;
                    padding:0 0;
                    margin: 0;
                    i{
                      font-size: 0.4rem;
                    }
                  }
                }
                p:last-child{
                  height: 0.5rem;
                  line-height: 0.5rem;
                  font-size: 0;
                  .demanda{
                    background-color: #ffa800;
                  }
                  a{
                    display: inline-block;
                    width:0.5rem;
                    height: 0.5rem;
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
              }
              div:nth-of-type(2){
                margin: 0.3rem 0;
              }
              .allnum{
                padding:0.2rem 0.2rem;
                background-color: #f3f3f3;
                border-radius: 5px;
                p{
                  color:#6e81ac;
                  span:last-child{
                    color:#9f9f9f;
                  }
                }

              }
              .replay{
                display: flex;
                justify-content: space-between;
                color:#cdcdcd;
                margin: 0.2rem 0;
                span:first-child{
                  font-size: 0.3rem;
                  height: 0.6rem;
                  line-height: 0.6rem;
                }
                span:last-child{
                  font-size: 0.3rem;
                  i{
                    font-size: 0.4rem;
                    margin-right: 0.2rem;
                  }
                }
              }
            }
          }
        }
      }
    }
    .detailFooter{
      position: fixed;
      bottom: 0;
      width:100%;
      height:1.28rem;
      padding:0 0.4rem;
      box-sizing: border-box;
      line-height:1.28rem;
      background-color: #ededed;
      font-size: 0.4rem;
      span{
        display: inline-block;
        i{
          font-size: 0.5rem;
          margin-right: 0.15rem;
        }
      }
      span:first-child{
        height:0.87rem;
        width:7.8rem;
        line-height:0.87rem;
        padding-left:0.2rem;
        background-color: #fff;
        color:#bfbfbf;
      }
      span:last-child{
        margin-left: 0.2rem;
        width: 1.6rem;
        text-align: center;
        background-color: #cccccc;
        height:0.87rem;
        line-height:0.87rem;
        border-radius: 3px;
        color:#FFF;
      }
    }
  }
  .comment-on{
    position: fixed;
    top:0;
    left:0;
    z-index: 100;
  }
</style>

