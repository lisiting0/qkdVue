<template>
  <div>
    <div class="addMoment-cls">
      <div class="header">
        <div class="top">
          <a class="left" @click="goback"><i class="iconfont">取消</i></a>
          <a class="right" style="color: #0bb20c;"><i class="iconfont" @click="postFeed">确定</i></a>
        </div>
      </div>
      <div class="comment">
        <textarea rows="6" v-model="feedContent" placeholder="此刻你在想些什么..."></textarea>
        <div class="photo-cls">
          <ul class="jy_auth_up jy_feed_img">
            <li v-for="(item,index) in feedImg"><i :style="'background-image:url('+$utils.getFullPath(item)+');'"></i>
            </li>
            <selectPhoto v-if="feedMaxImg-feedImg.length>0" :amount="feedMaxImg-feedImg.length" :cutting="false" @fileBack="fileBack">
              <li class="noUploadPhoto"></li>
            </selectPhoto>
          </ul>
        </div>
        <div class="text-cls">
          <!--<div><i class="iconfont">&#xe677;</i><span>所在位置</span><i class="iconfont">&#xe702;</i></div>-->
          <!--<div @click="showSel=true"><i
            class="iconfont">&#xea59;</i><span>谁可以看</span><span>{{viewRole[viewIndex]}}</span><i class="iconfont">&#xe702;</i>
          </div>-->
          <!-- <div><i class="iconfont">&#xe826;</i><span>提醒谁看</span><i class="iconfont">&#xe702;</i></div>-->
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="showSel" position="bottom" :popup-style="{zIndex:596}" :should-scroll-top-on-show="true">
        <div class="jy_bond_block">
          <p class="jy_qb_tit">查看权限</p>
          <ul class="jy_qb_pay_list">
            <li v-for="item,index in viewRole" :class="index==viewIndex?'cur':''" @click="viewIndex=index">{{item}}</li>
          </ul>
          <p class="jy_auth_btn" @click="showSel=false">确定</p>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import {Previewer, Popup, TransferDom} from 'vux'
  import selectPhoto from '../plugs/selectPhoto'
  //import newSelectPhoto from '../plugs/newSelectPhoto'

  export default {
    name: 'addMoment',
    directives: {
      TransferDom
    },
    components: {
      Loading,
      Back,
      selectPhoto,
      Popup,
     // newSelectPhoto,
    },
    data() {
      return {
        isloading: false,
        viewRole: ["公开", "私密", "好友"],
        viewIndex: 0,
        showSel: false,
        feedMaxImg: 6,//发布最大图片数量
        feedContent: '',//发布内容
        feedImg: [],//发布图片

      }
    },
    async mounted() {
      const t = this;
      if (this.$route.query.to == "photo") {
        for (let i = t.$store.state.fileImg.length; i--;) {
          let param = new FormData() //创建form对象
          param.append('file', t.$store.state.fileImg[i], t.$store.state.fileImg[i].name) //单个图片 ，多个用循环 append 添加
		  param.append('dataSources','addSquareMoment');
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
    methods: {
      goback(){
        this.$router.go(-1);
      },
      async postFeed() {//发布动态
        const t = this;
        try {
			let location = await t.$store.dispatch("getMylocation");
			let pos={};
			if(location.lat){
				pos={
					longitude:location.lon,
					latitude:location.lat
				}
			}
			//console.log(pos);
         // console.log("图片:" + t.feedImg.join(","));
          const result = await t.$server.feedPublish({
            feedContent: t.feedContent,
            feedType: t.feedImg.length > 0 ? 1 : 2,
            feedAttachment: t.feedImg.join(","),
            viewRoleType: t.viewIndex,
            isTransferredUrl: 0,
			...pos,
          });
          t.feedContent = '';
          t.feedImg = [];
          t.$vux.toast.show({
            type: "success",
            text: result.data.message,
            position: "middle",
            width: "auto",
          });
          // if (!result.data.data.uploadingPerson.aliasName) {
          //   result.data.data.uploadingPerson.aliasName = t.$store.state.userInfo.aliasName;
          // }
          //if (!result.data.data.uploadingPerson.headimgAttachmentId) {
          //  result.data.data.uploadingPerson.headimgAttachmentId = t.$store.state.userInfo.headimgAttachmentId;
          //}
          // t.artList.unshift(result.data.data);
          t.$router.replace({name: 'squareMoments'});
        } catch (e) {
          console.log(e.toString());
        }
      },
      async fileBack(obj) {
        const t = this
        if (obj.serverId) {
          for (let i = 0; i < obj.serverId.length; i++) {
            let result = await t.$server.wxMpMedia({
              mediaId: obj.serverId[i],
			  dataSources:'addSquareMoment'
            })
            t.feedImg.push(result.data.data && result.data.data.path);
          }
        } else {
          t.file = obj.file//提交的图片
          if (t.file) {
            for (let i = t.file.length; i--;) {
              let param = new FormData() //创建form对象
              param.append('file', t.file[i], t.file[i].name) //单个图片 ，多个用循环 append 添加
			  param.append('dataSources','addSquareMoment');
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
        i {
          font-size: 0.42rem;
        }
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
      margin: 1.39rem 0.9rem 0;
      textarea {
        font-size: 0.48rem;
        resize: none;
        width: 100%;
        outline: none;
        border: 0;
        padding: 0.5rem 0 0;
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
