<template>
  <div class="jy_exposure" @click.stop="userList=[]">
    <div class="addMoment-cls">
      <div class="header">
        <div class="top">
          <a class="left" @click="goback"><i class="iconfont">&#xe613;</i></a>
          <a class="right" style="color: #0bb20c;"><i class="iconfont" @click="postFeed">发布</i></a>
		  <p>发表曝光</p>
        </div>
      </div>
      <div class="comment">
		<div class="jy_exposure_jyNumber">
			<input class="jy_exp_name"  type="text" v-model="feedName"  @blur="blur($event)" @focus="focus($event)" placeholder="填写被曝光人昵称/乾坤号选择被曝光人">
			<ul class="jy_exposure_userList" v-if="userList.length>0">
				<li v-for="item,index in userList" @click.stop="userList=[];feedName=item.aliasName+' (乾坤号：'+item.jyNumber+')';feedNumber=item.jyNumber;isClick=true;">
					<i :style="'background-image:url('+$utils.getFullPath(item.headimgAttachmentId)+')'"></i>
					<!--<h3>{{item.aliasName}}</h3>-->
					<p>{{item.aliasName}}　<em>乾坤号：{{item.jyNumber}}</em></p>
				</li>
			</ul>
		</div>
        <textarea class="jy_exp_content" rows="6" v-model="feedContent" placeholder="描述"></textarea>
		<p class="jy_exp_anonym">匿名　<inline-x-switch v-model="onOff"></inline-x-switch></p>
        <div class="photo-cls">
          <ul class="jy_auth_up jy_feed_img">
            <li v-for="(item,index) in feedImg"  @click.stop="showImage(index,$event)"><i :style="'background-image:url('+$utils.getFullPath(item)+');'"></i><em @click.stop="deleteImg(index)">&#xe67c;</em>
            </li>
            <selectPhoto v-if="feedMaxImg-feedImg.length>0" :amount="feedMaxImg-feedImg.length" :cutting="false" @fileBack="fileBack">
              <li class="noUploadPhoto" data-tit="最多6张"></li>
            </selectPhoto>
          </ul>
        </div>
      </div>
    </div>
	<div v-transfer-dom>
	  <previewer :list="previmg" :ref="'previewerPhoto'" :options="options" @on-close="closeImg()"></previewer>
	</div>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import { InlineXSwitch,Previewer,TransferDom} from 'vux'
  import selectPhoto from '../plugs/selectPhoto'
 // import newSelectPhoto from '../plugs/newSelectPhoto'
import routerBack from '@/plus/routerBack.js';
	routerBack.init("addExposure",{
		showPhotoStatus:{
			change:'showPhotoStatusChange',
		},
		showBack:{
			fn:'goback'
		},
		
	})
  export default {
    name: 'addExposure',
	mixins:[routerBack],
    components: {
      Loading,
      Back,
      selectPhoto,
     // newSelectPhoto,
      InlineXSwitch,
	  Previewer,
    },
    data() {
      return {
        isloading: false,
        feedMaxImg: 6,//发布最大图片数量
        feedContent: '',//发布内容
		feedName:'',//被曝光人乾坤号
        feedImg: [],//发布图片
		onOff:false,
		nameTimeout:'',
		userList:[],
		isClick:false,
		feedNumber:'',
		showBack:true,
		previmg:[],
		options: {
          fullscreenEl: false,
          getThumbBoundsFn: () => {
            let thumbnail = this._previewer.target
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        },
		showPhotoStatus:false,
      }
    },
	directives: {
      TransferDom
    },
    async mounted() {
      const t = this;
	//t.showBack=true;
	  t.$store.commit("CHANGEHANDLEROUTE",true);//保持页面不被返回
      if (this.$route.query.to == "photo") {
        for (let i = t.$store.state.fileImg.length; i--;) {
          let param = new FormData() //创建form对象
          param.append('file', t.$store.state.fileImg[i], t.$store.state.fileImg[i].name) //单个图片 ，多个用循环 append 添加
		  param.append('dataSources','addExposure');
          try {
            const result = await t.$server.uploadPic(param);
            console.log(JSON.stringify(result.data));
            t.feedImg.push(result.data.data.path);
          } catch (e) {
            console.log(e.toString());
          }
        }
      }
    },
	watch:{
		feedImg(val){
			const t=this;
			let previmg=[];
			val.forEach((v,i)=>{
				previmg.push({src:t.$utils.getFullPath(v)});
			});
			t.previmg=previmg;
		},
		feedName(val) {
			const t=this;
			/*if(val&&typeof val=='string'){
				let feedName=val;
				if(val.charAt(val.length-1)!='.'&&val.charAt(val.length-1)!='0'){
					feedName = val.match(/^\d+\.?\d{0,2}/)&&parseFloat(val.match(/^\d+\.?\d{0,2}/)[0]);
				}else{
					feedName = val.match(/^\d+\.?\d{0,2}/)&&val.match(/^\d+\.?\d{0,2}/)[0];
				}
				t.feedName=feedName;
			}*/
			if(t.isClick){
				t.isClick=false;
				return false;
			}
			clearTimeout(t.nameTimeout);
			t.feedNumber='';
			if(val==''){
				t.userList=[];
				t.$store.dispatch("cancelRequest","取消前面的搜索请求");
			}
			if(/^[1-9]\d*$/.test(val)){//非0开头数字
				if(val>1200000){
					t.nameTimeout=setTimeout(()=>{
						t.getUserList();
					},500);
				}
			}else{//昵称
				t.nameTimeout=setTimeout(()=>{
					t.getUserList();
				},500);
			}
		},
	},
    methods: {
		showPhotoStatusChange(val){
			const t=this;
			if(!val){
				((this.$refs)["previewerPhoto"]).close();
			}
		},
		showImage(index,e) {
			this._previewer = e;
			this.showPhotoStatus=true;
			((this.$refs)["previewerPhoto"]).show(index);
		  },
		async getUserList(){
			const t=this;
			t.$store.dispatch("cancelRequest","取消前面的搜索请求");
			try{
				t.$store.dispatch("getCancelToken");
				const result= await t.$server.getUserByPhoneAndName({
					page: 1,
					rows: 10000,
					isNear:0,
					aliasName: t.feedName
				});
				t.userList=result.data.data.list||[];
			}catch(e){
				console.log(JSON.stringify(e));
			}
		},
		focus(e) {
			return false;
			e.target.setAttribute("type", "text");
		},
		blur(e) {
			return false;
			e.target.setAttribute("type", "number");
		},
		deleteImg(index) {
			this.feedImg.splice(index, 1);
		},
		closeImg(){
			this.showPhotoStatus=false;
		  },
		  goback(){
			const t=this;
			t.$store.commit("CHANGEHANDLEROUTE",true);//保持页面不被返回
			t.$vux.confirm.show({
			  content: '退出此次编辑？',
			  cancelText:'再想一想',
			  onCancel () {
				
			  },
			  onConfirm () {
				t.showBack=false;
				t.$store.commit("CHANGEHANDLEROUTE",false);
				t.$router.back(-1);
			  }
			})
			//this.$router.go(-1);
		  },
      postFeed() {//发布动态
        const t = this;
		if(t.feedNumber==''){
			t.$vux.toast.show({
			  type: 'cancel',
			  text: '请填写被曝光人昵称/乾坤号后选择被曝光人',
			  position: 'middle',
			  width: 'auto',
			})
			return false;
		}
		if(t.feedContent==''){
			t.$vux.toast.show({
			  type: 'cancel',
			  text: '请填写描述',
			  position: 'middle',
			  width: 'auto',
			})
			return false;
		}
		t.$vux.confirm.show({
            title: '温馨提示',
            theme: 'android',
            content: '确认曝光此用户?',
            confirmText: '确认',
            cancelText:'再想一想',
            onCancel() {
             
            },
            async onConfirm() {
             try {
				  const result = await t.$server.lightPublish({
					lightUser: t.feedNumber,
					descript:t.feedContent,
					picture: t.feedImg.join(","),
					anonymous: t.onOff?1:0,
				  });
				  t.$vux.toast.show({
					type: "success",
					text: result.data.message,
					position: "middle",
					width: "auto",
				  });
				 t.$router.push({name: 'exposure'});
				} catch (e) {
				  console.log(e.toString());
				}
            }
          })
      },
      async fileBack(obj) {
        const t = this
        if (obj.serverId) {
          for (let i = 0; i < obj.serverId.length; i++) {
            let result = await t.$server.wxMpMedia({
              mediaId: obj.serverId[i],
			  dataSources:'addExposure'
            })
            t.feedImg.push(result.data.data && result.data.data.path);
          }
        } else {
          t.file = obj.file//提交的图片
          if (t.file) {
            for (let i = t.file.length; i--;) {
              let param = new FormData() //创建form对象
              param.append('file', t.file[i], t.file[i].name) //单个图片 ，多个用循环 append 添加
			  param.append('dataSources','addExposure');
              try {
                const result = await t.$server.uploadPic(param);
                console.log(JSON.stringify(result.data));
                t.feedImg.push(result.data.data.path);
              } catch (e) {
                console.log(e.toString());
              }
            }

          } else {
            t.$vux.toast.show({
              type: "text",
              text: "图片出错",
              position: "bottom",
              width: "2rem",
            });
          }
        }
      },

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
    .myscoll {

      .content {
        background-color: #f2f2f2;
        .momentItem {
          background-color: #fff;
          padding: 0.42rem 0.35rem;
          border-bottom: 1px dashed #f2f2f2;
          display: flex;
          justify-content: space-between;
          & > div:first-child {
            width: 1.5rem;
            height: 1.2rem;
            font-size: 0.32rem;
            word-break: break-word;
            color: #111;
            font-weight: bold;
            text-align: center;
            span.day {
              font-size: 0.5rem;

            }
          }
          & > div:last-child {
            padding: 0.2rem;
            background-color: #f2f2f2;
            border-radius: 0.1rem;
            width: 8rem;
            & > div:first-child {
              p {
                color: #000000;
                font-size: 0.44rem;
                font-weight: 500;
              }
              p:first-child {
                // height: 0.7rem;
                line-height: 0.6rem;
                overflow: hidden;
                // text-overflow: ellipsis; //文本溢出显示省略号
                // white-space: nowrap; //文本不会换行（单行文本溢出）
                font-size: 0.36rem;
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
                margin: 0 0.1rem 0.2rem 0;
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

                line-height: 0.6rem;
              }
              div {
                position: absolute;
                right: 0.55rem;
                top: 0;
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
                  }
                  i {
                    font-size: 0.36rem;
                  }
                }
              }
              & > span:last-child {
                float: right;
                color: #8b98b2;
                i {
                  font-size: 0.45rem;
                }
              }
            }
            .praiseAndComment {
              background-color: #f2f2f2;
              line-height: 0.7rem;
              padding: 0 0.1rem;
              & > div:first-child {
                font-size: 0.4rem;
                color: #667592;
                i {
                  font-size: 0.4rem;
                }
              }
              & > div:nth-of-type(2) {
                font-size: 0.4rem;
                padding: 0.15rem 0;
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
      position: relative;
      margin-top: 0.2rem;
      textarea {
        font-size: 0.4rem;
        background-color: #f2f2f2;
        resize: none;
        width: 80%;
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

  .addMoment-cls {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 499;
    overflow: hidden;
    margin: 0 auto;
    padding-top: 0.75rem;
    box-sizing: border-box;
    height: 100%;
    background-color: #fff;
    &:before {
      content: "";
      position: fixed;
      display: block;
      z-index: 99;
      left: 0;
      top: 0;
      width: 100%;
      height: 0.75rem;
      background-size: 100%;
    }
    .header {
      position: fixed;
      width: 100%;
      z-index: 10;
      border-bottom: 1px solid #f2f2f2;
      background-image: none;
      .top {
        color: #FFF;
        font-size: 0.6rem;
        position: relative;
       
        a {
          position: absolute;
          padding: 0 3px;
        }
        .left {
          left: 0.325rem;
          color: #505050;
        }
        .right {
          right: 0.325rem;
          color: #c0e2c0;
        }
      }
    }
    .comment {
      margin: 1.39rem 0.5rem 0;
      textarea {
        font-size: 0.48rem;
        resize: none;
        width: 100%;
        outline: none;
     
      }
      .photo-cls {
        font-size: 0;
        span {
          display: inline-block;
          width: 2.8rem;
          height: 2.8rem;
          line-height: 2.8rem;
          text-align: center;
          margin: 0.2rem 0 0 0.28rem;
        }
        span:nth-of-type(3n+1) {
          margin-left: 0;
        }
        span.plus {
          background-color: #f2f2f2;
          i {
            font-size: 1rem;
            color: #c0c0c0;
          }
        }
      }
      .text-cls {
        margin-top: 1rem;
        font-size: 0.48rem;
        color: #000;
        font-weight: 500;
        div {
          border-bottom: 1px solid #f2f2f2;
          height: 1.54rem;
          line-height: 1.54rem;
          position: relative;
          span {
            margin-left: 0.58rem;
          }
          span:nth-of-type(2) {
            position: absolute;
            right: 0.68rem;
            color: #9a9a9a;
          }
          i:last-child {
            color: #d7d7db;
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }
</style>
