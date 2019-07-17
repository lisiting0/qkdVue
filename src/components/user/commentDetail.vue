<template>
    <div :class="'main jy_commentDetail '+($store.state.isWeixin?'jy_isWeixin':'')+($store.state.isBrowser?' jy_isBrowser':'')" @click="windowClick">
      <Loading v-if="isloading"></Loading>
      <div class="header">
        <div class="top">  
		  <Back class="left" v-if="!dynamicDes"><i class="iconfont">&#xe613;</i></Back>
			<a v-else class="left" @click="hiddenInfo"><i class="iconfont">&#xe613;</i></a>
		  {{momentTitle}}
        </div>
      </div>
      <div class="myscoll">

          <div class="content">
            <!--<template v-if="moment">-->
              <template v-if="dynamic">
                <div class="momentItem">
                  <div><span  class="headImg" :style="{'background-image':'url('+$utils.getFullPath(dynamic.uploadingPerson.headimgAttachmentId)+')'}"></span></div>
                  <div>
                    <div>
                      <p>{{dynamic.uploadingPerson.aliasName}}</p>
                      <p v-if="dynamic.feedContent.length>50&&!dynamic.openContent">
                        {{dynamic.feedContent.substr(0,50)}}...
                        <span @click="function(){dynamic.openContent=true;}">展开</span>
                      </p>
                      <p v-if="dynamic.feedContent.length<=50||dynamic.openContent">
                        {{dynamic.feedContent}}
                        <span v-show="dynamic.feedContent.length>50" @click="function(){dynamic.openContent=false; }">收起</span>
                      </p>
                    </div>
                    <div @click="showImage(0,dynamic.id,$event)" v-if="dynamic.feedAttachment&&dynamic.feedAttachment.split(',').length==1" class="one-cls" :class="'previewer-'+dynamic.id">
                      <div><img :src="getFullPath(dynamic.feedAttachment.split(',')[0])"/>
                      </div>
                    </div>
                    <div v-else-if="dynamic.feedAttachment" class="img-cls" :class="'previewer-'+dynamic.id">
                      <div v-for="imgItem ,imgIndex in dynamic.feedAttachment.split(',')" @click="showImage(imgIndex,dynamic.id,$event)" :style="{'background-image':'url('+getFullPath(imgItem)+')'}">
                        <i v-if="imgItem.type===1" class="iconfont" :style="{'background-image':'url('+getFullPath(imgItem.src)+')'}"></i>
                        <img class="filterimg" v-if="imgItem.type===1" :src="imgs.payfor"/>
                      </div>
                    </div>
                    <div v-transfer-dom>
                      <previewer :list="getImage(dynamic.feedAttachment.split(','))" :ref="'previewer'+dynamic.id" :options="options" @on-close="closeImg"></previewer>
                    </div>
                    <!--<p v-if="dynamic.location">定位</p>-->
                    <div class="publish-cls">
                      <!--<span v-if="dynamic.longitude">定位</span>-->{{dynamic.createDate}}<span v-if="dynamic.uploadingPerson.id==$store.state.userInfo.id" style="margin-left: 0.2rem;" @click="delDynamic(dynamic.id)">删除</span>
                      <div :ref="dynamic.id">
                        <transition v-on:before-enter="beforeEnter(dynamic.id,1)"
                                    v-on:before-leave="beforeEnter(dynamic.id,1)" v-on:after-enter="afterEnter(dynamic.id,1)"
                                    v-on:after-leave="afterEnter(dynamic.id,1)" enter-active-class="slideInRight"
                                    leave-active-class="slideOutRight">
                        <span v-show="showCommentIndex==dynamic.id">
							<span>
							  <transition enter-active-class="slideInUp" leave-active-class="slideOutUp">
								<span v-show="showPraiseIndex==dynamic.id"><i @click="setFabulous(0)">公开</i><i @click="setFabulous(1)">私密?</i></span>
							  </transition>
							</span>
							<span v-if="dynamic.isFabulous==1" @click.stop="deleteFabulous()"><i
                          class="iconfont">&#xe619;</i> 取消</span>
							<span v-else @click.stop="setFabulous(0)"><i
                          class="iconfont">&#xe619;</i> 赞</span>
                        <!--<span><i class="iconfont">&#xe629;</i> 打赏</span>-->
							<span @click.stop="showComment(dynamic.id)"><i class="iconfont">&#xe618;</i> 评论</span>
						</span>
                        </transition>
                      </div>
                      <span @click.stop="showCommentIndex==dynamic.id?showCommentIndex=0:showCommentIndex=dynamic.id"><i
                        class="iconfont">&#xe679;</i></span>
                    </div>
                  </div>
                </div>
                <div class="reviewComment">
                  <div class="popularity" v-if="dynamic.fabulous&&dynamic.fabulous.length>0">
                    <i class="iconfont">&#xe619; </i>
                    <span v-for="item,index in dynamic.fabulous" class="headImg" :style="{'background-image':'url('+$utils.getFullPath(item.user.headimgAttachmentId)+')'}"></span>
                  </div>
                  <div class="response" :class={cur:showTextarea} v-if="dynamic.comments&&dynamic.comments.length>0">
                    <i class="iconfont">&#xe650;</i>
                    <div class="responser">
                      <div class="comment-content" v-for="item,index in dynamic.comments" :key="item.id" @click.stop="showComment(dynamic.id,item)">
                        <i :style="{'background-image':'url('+$utils.getFullPath(item.user.headimgAttachmentId)+')'}"></i>
                        <div class="right-content">
                          <p class="username"><em>{{item.createDate}}</em>{{item.user.aliasName}}</p>
                          <p>{{item.content}}</p>
                        </div>
						    <replayDetail @showComment="showComment" v-if="item.comments" :comment="item" :parentId="dynamic.id"></replayDetail>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="showTextarea" class="commentAdd" @click.stop>
                  <textarea :ref="'textarea'"  v-model="commentObj.comment" :placeholder="commentObj.replay?'回复'+commentObj.replay.user.aliasName:'请输入...'" :style="{height:textareaheight+'px'}"/>
                  <div @click.stop="sendComment()">发送</div>
                </div>
              </template>
              <!--<tmeplate v-else>-->
                <!--<div class="no-data">暂无数据</div>-->
              <!--</tmeplate>-->
            <!--</template>-->
          </div>

      </div>
    </div>
</template>

<script>
  import payfor from '../../images/payfor.png'
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import Vue from 'vue';

  import {Previewer, TransferDom,ConfirmPlugin} from 'vux'
	Vue.use(ConfirmPlugin)
	import replayDetail  from './replayDetail';
  let fontsize = parseInt(document.documentElement.style.fontSize)
  export default {
    name: 'commentDetail',
	props: ['dynamicDes','isMy'],
    data() {
      return {
       // pullDownRefresh: true,
       // pullDownRefreshThreshold: 60,
       // pullDownRefreshStop: 40,
       // pullUpLoad: true,
       // pullUpLoadThreshold: 0,
       // ifinit: false,
      //  myScrollerHeight: 0,
        textareaheight: 0,
        showPopover: false,
        imgs: {payfor: payfor},
        isloading: false,
        now: Math.floor(new Date().getTime() / 1000),
        showPraiseIndex: 0,
        showCommentIndex: 0,
        showTextarea: 0,
        commentObj: {
          momentId: null,
          replay: null,
          userId: null,
          comment: null
        },
        options: {
          fullscreenEl: false,
          getThumbBoundsFn: () => {
            let thumbnail = this._previewer.target
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        },
        momentTitle: '动态详情',
        dynamic:null,
        month:["一","二","三","四","五","六","七","八","九","十","十一","十二"]
      }
    },

    components: {
      Loading,
      Previewer,
      Back,
	  replayDetail,
    },
    directives: {
      TransferDom
    },

    beforeRouteUpdate(to, from, next) {
      next()
      this.pagerouter = to.params.pagerouter
    },
    created() {

    },
    destroyed() {
    },
    mounted() {
		const t=this;
	if(!t.dynamicDes){
		this.getData();
	}else{
		t.dynamic=t.dynamicDes;
		this.$emit('openWin');
	}

      
     // this.myScrollerHeight = document.body.clientHeight - $('.header').height() - (0.75) * parseInt(document.documentElement.style.fontSize) - 1
     /* const timer = setInterval(() => {
        this.now = Math.floor(new Date().getTime() / 1000)
        console.log('定时器执行')
        // 某些定时器操作
      }, 3000)
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
        console.log('定时器清楚')
        clearInterval(timer)
      })*/
     /* this.$nextTick(function () {
        this.ifinit = true
      })*/
    },
    watch: {},
    methods: {	
		hiddenInfo(){
			this.$emit('hiddenInfo',this.dynamic);
		},
		delDynamic(id){
			const t=this;
			t.$vux.confirm.show({
				title:"删除动态",
				content:"确定删除该条动态吗?",
				cancelText:'再想一想',
				maskZIndex:98,
				onCancel () {
					
				},
				onConfirm () {
					t.delToDynamic(id);
				}
			});
		},
		async delToDynamic(id){
			const t=this;
			try{
				const result =await t.$server.delDynamic(id);
				if(t.dynamicDes){
					this.$emit('editInfo',null);
				}else{
					this.$router.go(-1);
				}
				t.$vux.toast.show({
					type:"text",
					text: result.data.message,
					position:"bottom",
					width:"auto",
				});
			}catch(e){
				console.log(e);
			}
		},
		  async deleteFabulous(){
			const t=this;
			t.showCommentIndex=0;
			try{
				let fabulous=t.dynamic.fabulous.filter(item=>{
					return item.user.id==t.$store.state.userInfo.id;
				});
				const result =await t.$server.delFabulous(fabulous[0].id);

				/*t.$vux.toast.show({
					type:"text",
					text: result.data.message,
					position:"bottom",
					width:"auto",
				});*/
				//let obj=t.$utils.deepCopy(t.artList[index]);
				fabulous=t.dynamic.fabulous.filter(item=>{
					return item.user.id!=t.$store.state.userInfo.id;
				});

				t.dynamic.fabulous=fabulous;
				t.dynamic.isFabulous=0;
				//t.$set(t.artList,index,obj)
				this.$emit('editInfo',t.dynamic);
			}catch(e){
				console.log(JSON.stringify(e))
			}
		},
      async sendComment(){
        const t=this;
        console.log("评论:"+t.commentObj.comment)
        try{
          const result=await t.$server.postComment({
            businessType:t.commentObj.replay?9:3,
            objectId:t.commentObj.replay?t.commentObj.replay.id:t.commentObj.momentId,
            content:t.commentObj.comment
          })
          t.showTextarea=0;
         /* t.$vux.toast.show({
            type:"text",
            text: "评论成功",
            position:"bottom",
            width:"auto",
          });*/
          if(!result.data.data.user.aliasName){
            result.data.data.user.aliasName=t.$store.state.userInfo.aliasName;
            result.data.data.user.headimgAttachmentId=t.$store.state.userInfo.headimgAttachmentId;
          }
          let obj=t.$utils.deepCopy(t.dynamic);
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
				  comment[i].commentLegth+=1;
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
			obj.commentLegth+=1;
            obj.comments.push(result.data.data);
          }
		  t.$set(t.dynamic,"commentLegth",obj.commentLegth)
          t.$set(t.dynamic,"comments",obj.comments)
		  this.$emit('editInfo',t.dynamic);
        }catch(e){
          console.log(e);
        }
      },
      async setFabulous(flag){//点赞
			const t=this;
			let result;
			try{
				if(flag==0){
					result = await t.$server.fabulousPublic({
						commentId:t.dynamic.id
					})
				}else{
					result = await t.$server.fabulousPrivate({
						commentId:t.dynamic.id
					})
				}
				//console.log(JSON.stringify(result));
				/*t.$vux.toast.show({
					type:"text",
					text: "点赞成功",
					position:"bottom",
					width:"auto",
				});*/
				//let obj=t.$utils.deepCopy(t.artList[index]);
				if(!t.dynamic.fabulous){
					t.dynamic.fabulous=[];
				}
				if(!result.data.data.user.aliasName){
					result.data.data.user.aliasName=t.$store.state.userInfo.aliasName;
				}
				t.dynamic.fabulous.push(result.data.data);
				t.dynamic.isFabulous=1;
				this.$emit('editInfo',t.dynamic);
				//t.$set(t.artList,index,obj)
			}catch(e){

			}
		},
      /*changeHeight(id, e) {
        let arr2 = this.commentObj.comment&&this.commentObj.comment.match(/\r|\n/g);
        console.log(this.commentObj.comment)
        let pid = 'textarea'
        let obj = (this.$refs)[pid];
        if (obj.scrollHeight > obj.clientHeight) {
          this.textareaheight = obj.scrollHeight
          this.$nextTick(function () {
            this.refreshScroll()
          })
        }
      },*/
      showComment(momentId, replay) {
        this.showPraiseIndex = 0
        this.showCommentIndex = 0
        let obj = {
          momentId: null,
          replay: null,
          userId: null,
          comment: null
        }
        obj.momentId = momentId
        obj.replay = replay ? replay : null
        this.textareaheight = 1.5 * fontsize
        this.commentObj = obj
        this.showTextarea = momentId
        let pid = 'textarea' ;
        this.$nextTick(function () {
          $((this.$refs)[pid]).focus()
          //this.refreshScroll()
        })
      },
      windowClick() {
        this.showPraiseIndex = 0
        this.showCommentIndex = 0
        if (this.showTextarea != 0) {
          this.showTextarea = 0
         // this.$nextTick(function () {
           // this.refreshScroll()
          //})
        }
      },
      getImage(imageArr) {
        return imageArr.map((item) => {
          return {
            src: this.getFullPath(item)
          }
        })
      },
	  
	  closeImg(){
		this.$emit("toggleImgWin",null);
	  },
	  colseWin(id){
		 let pid = 'previewer' + id;
		 this.$refs[pid].close();
	  },
      showImage(index, id, e) {
        let pid = 'previewer' + id
        this._previewer = e;
		this.$emit("toggleImgWin",id);
        ((this.$refs)[pid]).show(index)
      },
      beforeEnter(id) {
        $((this.$refs)[id]).addClass('hidden')
      },
      afterEnter(id) {
        $((this.$refs)[id]).removeClass('hidden')
      },
      getMessageTimeFromNow(datetime) {
        return this.$utils.getMessageTimeFromNow(datetime, new Date(), this.now)
      },
      getImgHeight(width, height) {
        let base = fontsize * 5
        if (width > height) {
          if (width < base) {
            return height
          } else {
            return base * height / width
          }
        } else {
          return height
        }
      },
      getFullPath(path) {
        return this.$utils.getFullPath(path)
      },
      async getData(flag) {
        const t = this
        if(t.isRead){
          return false;
        }
        t.isRead=true;
        if(t.isRefresh||flag){
          if(flag){
            t.isloading=true;
          }
        }
        try{
          if(!t.isRefresh){
            t.isloading=true;
          }
          let data = {
            isMy:t.isMy||t.$route.query.isMy
          }
          const result =await t.$server.getFeedInfo(t.$route.query.id,data);
          t.dynamic=result.data.data;
        }catch(e){

        }
        t.isRead=false;
        t.isloading=false;
        t.isRefresh=false;
      }
    }
  }
</script>
<style scoped lang="scss">
  body > div:first-child {
    height: 100%;
  }

  @keyframes slideInRight {
    from {
      transform: translate3d(100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(100%, 0, 0);
    }
  }

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

  .slideInUp {
    animation-name: slideInUp;
  }

  .slideOutUp {
    animation-name: slideOutUp;
  }

  .slideInRight {
    animation-name: slideInRight;
  }

  .slideOutRight {
    animation-name: slideOutRight;
  }

  .slideInRight, .slideOutRight, .slideOutUp, .slideInUp {
    animation-duration: 0.3s;
  }

  .hidden {
    overflow: hidden;
  }

  .main {
    padding-bottom: 0;
    &:before {
      background-color: #3a3845;
    }
    .header {
      position: fixed;
      width: 100%;
      z-index: 10;
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
        }
        .left {
          left: 0.325rem;
        }
        .right {
          top: 0.48rem;
          right: 0.325rem;
          font-size: 0.4rem;
        }
      }
    }
	.response{
		margin-bottom:0.3rem;
		&.cur{
			margin-bottom:1.9rem;
		}
	}
    .myscoll {
      margin-top: 1.39rem;
      .content {
        /*background-color: #f2f2f2;*/
        background-color: #FFFFFF;
		overflow:hidden;
        .momentItem {
          background-color: #fff;
          padding: 0.42rem 0.35rem;
          display: flex;
          justify-content: space-between;
          & > div:first-child {
            width: 1.2rem;
            height: 1.2rem;
            font-size: 0.5rem;
            word-break: break-word;
            color: #9b9ba3;
            text-align: center;
            span.day{
              font-size: 0.6rem;
              font-weight: 500;
            }
          }
          & > div:last-child {
            width: 8.6rem;
            & > div:first-child {
              p {
                color: #000000;
                font-size: 0.44rem;
                font-weight: 500;
              }
              p:first-child {
                height: 0.7rem;
                line-height: 0.6rem;
                overflow: hidden;
                text-overflow: ellipsis; //文本溢出显示省略号
                white-space: nowrap; //文本不会换行（单行文本溢出）
                font-size: 0.36rem;
				min-height:1rem;
                color: #71717c;
                font-weight: 500;
              }
              p:last-child {
                span {
                  display: block;
                  color: #667592;
                }
              }
            }
            .one-cls {
              margin: 0.3rem 0 0.1rem;
              width: 7.5rem;
              div {
                font-size: 0;
                display: inline-block;
                position: relative;
                overflow: hidden;
                i {
                  position: absolute;
                  line-height: 1;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  right: 0;
                  text-align: right;
                  background-size: cover;
                  background-position: center;
                  filter: blur(5px);
                }
                img.filterimg {
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 1.3rem;
                  height: 1.3rem;
                  line-height: 1;
                  background-color: rgba(255, 255, 255, 0);
                }
                img:first-child {
                  max-height: 5rem;
                  max-width: 5rem;
                  background-color: #999;
                }
              }
            }
            .img-cls {
              margin: 0.3rem 0 0.1rem;
              display: flex;
               // justify-content: space-between;
              flex-wrap: wrap;
              width: 7.5rem;
              div {
                width: 2.3rem;
                height: 2.3rem;
                background-size: cover;
                background-position: center;
                background-color: #999;
                margin:0 0.1rem  0.2rem 0;
                overflow: hidden;
                position: relative;
                i {
                  position: absolute;
                  line-height: 1;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  right: 0;
                  text-align: right;
                  background-size: cover;
                  background-position: center;
                  filter: blur(5px);
                }
                img.filterimg {
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 1.3rem;
                  height: 1.3rem;
                  line-height: 1;
                  background-color: rgba(255, 255, 255, 0);
                }
              }
            }
            .publish-cls {
              position: relative;
              span {
                font-size: 0.32rem;
                height: 0.9rem;
                line-height: 0.9rem;
                color: #667592;
              }
              div {
                position: absolute;
                right: 1.15rem;
                top: -0.05rem;
                & > span {
                  display: inline-block;
                  background-color: #4c5254;
                  color: #FFF;
                  font-size: 0.36rem;
                  border-radius: 3px;
                  & > span:first-child {
                    padding: 0 !important;
                    overflow: hidden;
                    height: 1.8rem;
                    top: -2.1rem;
                    overflow: hidden;
                    position: absolute;
                    span {
                      height: 1.8rem;
                      background-color: #4c5254;
                      border-radius: 3px;
                      display: block;
                      padding: 0 0.35rem;

                    }
                    i {
                      display: block;
                      font-size: 0.36rem;
                    }
                  }
                  & > span {
                    padding: 0 0.35rem;
					color: #FFF;
                  }
                  i {
                    font-size: 0.36rem;
					color: #FFF;
                  }
                }
              }
              & > span:last-child {
                position: absolute;
                right: 0;
                color: #8b98b2;
                i {
                  font-size: 0.5rem;width:1.1rem;height:0.7rem;line-height:0.7rem;background-color:#c4c4c4;text-align:center;border-radius:3px;display:inline-block;color:#fff;
                }
              }
            }
            .praiseAndComment {
              background-color: #f2f2f2;
              line-height: 0.7rem;
              & > div:first-child {
                font-size: 0.4rem;
                color: #667592;
                border-bottom: 1px solid #D1D1D1;
                i {
                  font-size: 0.4rem;
                }
              }
              & > div:nth-of-type(2) {
                font-size: 0.4rem;
                i {
                  color: #667592;
                }
              }
            }
          }
        }
      }
    }
    .commentAdd {
      position: fixed;
      left: 0;
	  width:100%;
	  bottom:0;
	  border-top:1px solid #ccc;
	  background-color:#fff;
      padding: 0.2rem;
      textarea {
		padding:0.1rem;
		-webkit-box-sizing:border-box;
		box-sizing:border-box;
        font-size: 0.4rem;
        background-color: #f2f2f2;
        resize: none;
        width: 77.5%;
        outline: none;
        border: 0;
        vertical-align: top;
      }
      div {
        height: 1.5rem;
        line-height: 1.5rem;
        display: inline-block;
        width: 16%;
        text-align: center;
        background-color: #f2f2f2;
        border-radius: 5px;
      }
    }
  }
</style>
