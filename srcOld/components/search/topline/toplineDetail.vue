<template>
  <div class="parent main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>
        <a class="right" @click="showPopover=!showPopover"><i class="iconfont">&#xe679;</i></a>详情
      </div>
    </div>
    <Popover :showPopover="showPopover" @close="closePopover">
      <router-link :to="{name:'articlePost'}" tag="li"><i class="iconfont">&#xe627;</i><i>发布</i></router-link>
      <router-link tag="li" :to="{name:'headline',query:{ytpe:'my'}}"><i class="iconfont">&#xe618;</i><i>我的文章</i>
      </router-link>
    </Popover>
    <div class="myscoll" v-if="detail">
      <div class="content">
        <div class="title">{{detail.title}}</div>
        <div class="subhead">
          <span>作者：{{detail.user.aliasName}}</span>
          <span>{{messageTimeFromNow}}</span>
          <span><i class="iconfont">&#xe63b;</i> {{detail.visit}}</span>
        </div>
        <div @click="showBigImg($event)" class="contentDetail" v-html="contentCpt">
        </div>
      </div>
    </div>
    <div class="detailFooter" v-if="detail">
      <span @click="linkTo('/toplineDetail/commenton')">发表评论</span>
      <span @click="linkTo('/comments/main')"><i class="iconfont">&#xe650;</i>{{detail.commentCount}} </span>
      <span><i class="iconfont">&#xe614;</i>{{detail.collectionCount}} </span>
    </div>
    <transition enter-active-class="slideInUp" leave-active-class="slideOutUp">
      <comment-on @touchmove.native.prevent @childMethod="childMethod" v-if="pagerouter=='commenton'" class="comment-on"
                  ref="commenton"></comment-on>
    </transition>
  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import CommentOn from './commentOn';
  import {Previewer, TransferDom} from 'vux'
  import Popover from '@/components/plugs/popover.vue'

  export default {
    name: 'toplineDetail',
    data() {
      return {
        isloading: false,
        pagerouter: '',
        artId: '',//文章id
        detail: null,
        arrImg: [],
        showPopover: false,
        photoBrowser: null,
        showPhotoStatus: false,
      }
    },
    computed: {
      messageTimeFromNow() {
        return this.$utils.getMessageTimeFromNow(this.detail.createDate, new Date());
      },
      contentCpt() {
        const t = this;
        /* let imgArr = this.detail.img.map(item=>{
           return {
             id:(item.id),
             src:this.getFullPath(item.src)
           }
         })*/
        //let content = this.detail.content.replace(/[<>]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
        // content = content.replace(/\r|\n/g,'<br/>');
        /*let imgArr2=content.match(/\[图片\d+\]/g);
        if(imgArr2){
          imgArr2.map(item=>{
            let index = item.match(/\d+/)[0];
            let reg = new RegExp("\\[图片"+index+"\\]",'g');
            imgArr.map(img=>{
              if(img.id==index){
                content = content.replace(reg,'<img data-id="'+img.id+'" class="imgcontent" src="'+img.src+'"/>');
              }
            })
          })
        }*/
        let content = this.detail.content;
        //let content = this.detail.content.replace(/<img src=\"/g,'<img src="'+t.$store.state.imageUrl);
        const imgReg = /<img.*?(?:>|\/>)/gi;
        const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        const arr = this.detail.content.match(imgReg);
        if (arr) {
          let arrImg = [];
          arr.forEach((v, i) => {
            const src = v.match(srcReg)[1];
            arrImg.push({
              id: i,
              src
            });
            let reg = new RegExp('<img src=\"' + src + '\"', 'g');
            content = content.replace(reg, '<img data-id="' + i + '" src="' + t.$utils.getFullPath(src) + '"');
          });
          t.arrImg = arrImg;
        }
        return content;
      },
      handleRoute() {
        return this.$store.state.handleRoute;
      },
    },
    watch: {
      handleRoute(newV) {
        if (!newV) {
          if (this.photoBrowser)
            this.photoBrowser.close()
          this.showPhotoStatus = false;
          this.showPopover = false;
        }
      },
      showPhotoStatus(newV) {
        let status = this.showPhotoStatus || this.showPopover
        this.$store.commit("CHANGEHANDLEROUTE", status)
      },
      showPopover(newV) {
        let status = this.showPhotoStatus || this.showPopover
        this.$store.commit("CHANGEHANDLEROUTE", status)
      }
    },
    components: {
      Loading,
      Previewer,
      CommentOn,
      Back,
      Popover,
    },
    directives: {
      TransferDom
    },
    beforeRouteUpdate(to, from, next) {
      next();
      this.pagerouter = to.params.pagerouter;
    },
    created() {

    },
    destroyed() {
    },
    mounted() {
      const t = this;
      t.artId = t.$route.query.id;
      t.getArtDesc();
    },
    methods: {
      showPhoto(url) {
        if (!window.api) {
          return false;
        }
        let photoBrowser = window.api.require('photoBrowser');
        this.photoBrowser = photoBrowser;
        this.showPhotoStatus = true;
        photoBrowser.open({
          images: [url],
          placeholderImg: 'widget://image/image.png',
          bgColor: '#000'
        }, (ret, err) => {
          if (ret) {
            if (ret.eventType == "show") {
            } else if (ret.eventType == "loadImgSuccess") {
            } else if (ret.eventType == "loadImgFail") {
              window.api.toast({
                msg: '图片下载失败',
                duration: 2000,
                location: 'middle'
              });
            } else if (ret.eventType == "click") {
              photoBrowser.close();
              this.showPhotoStatus = false;
            } else if (ret.eventType == "longPress") {
            }
          }
        });
      },
      closePopover(val) {
        this.showPopover = val;
      },
      async getArtDesc() {
        const t = this;
        const result = await t.$server.getArtDesc(t.artId);
        if (result.data.status == 1) {
          t.detail = result.data.data;
        }
      },
      async childMethod(content) {
        const t = this;
        const result = await t.$server.postComment({
          businessType: 4,
          objectId: t.artId,
          content,
        });
        if (result.data.status == 1) {
          t.$vux.toast.show({
            type: "success",
            text: "发表成功",
            position: "middle",
            width: "2rem",
          });
          t.detail.commentCount++;
          t.$refs.commenton.goback();
        } else {
          t.$vux.toast.show({
            type: "cancel",
            text: "发表出错",
            position: "middle",
            width: "2rem",
          });
        }

      },
      linkTo(link) {
        let query = null;
        if (link === '/comments/main') {
          query = {
            id: this.detail.id
          }
        }
        this.$router.push({
          path: link,
          query: query
        })
      },
      showBigImg(e) {
        if (e.target.nodeName == 'IMG') {
          this.showPhoto(e.target.src)
        }
      },
      getImage(imageArr) {
        return imageArr.map((item) => {
          return {
            src: this.getFullPath(item.src)
          }
        })
      },
      getFullPath(path) {
        return this.$utils.getFullPath(path);
      },
      onChange(val) {
        console.log('val change', val)
      },
      routerTo(link) {
        console.log(link)
      },
      showFilter() {
        this.showPopover = !this.showPopover;
      },
      closePopover(val) {
        this.showPopover = val;
      },
      makesure(sex, authentication) {
        console.log(sex)
        console.log(authentication)
        this.showPopover = false;
      }
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

  .slideInUp {
    animation-name: slideInUp;
  }

  .slideOutUp {
    animation-name: slideOutUp;
  }

  .slideOutUp, .slideInUp {
    animation-duration: 0.3s;
  }

  .parent {
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }

  .main {
    .popover {
      li {
        height: 1.52rem;
        line-height: 1.52rem;
        width: 4.3rem;
        border-bottom: 1px solid #f9f9f9;
        & > i {
          margin-left: 0.46rem;
          font-size: 0.44rem;
        }
        span {
          margin-left: 0.46rem;
          display: inline-block;
          height: 1.52rem;
          line-height: 1.52rem;
          vertical-align: top;
          i {
            display: block;
            font-size: 0.44rem;
            height: 0.76rem;
            line-height: 1.08rem;
          }
          i:last-child {
            font-size: 0.3rem;
            line-height: 0.44rem;
            color: #b0b0b0;
          }
        }
        &:nth-of-type(1) .iconfont, &:nth-of-type(4) .iconfont {
          color: #f6840f;
        }
        &:nth-of-type(2) .iconfont, &:nth-of-type(3) .iconfont {
          color: #1296db;
        }
      }
    }

    padding-bottom: 0;
    box-sizing: border-box;
    background-color: #fff;
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
        font-size: 0.52rem;
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
    .myscoll {
      margin: 1.39rem 0 1.28rem;
      .content {
        padding: 0.47rem 0.42rem;
        .title {
          font-size: 0.54rem;
          font-weight: 500;
          color: #000;
        }
        .subhead {
          margin-top: 0.3rem;
          font-size: 0.32rem;
          color: #cdcdcd;
          span {
            margin-right: 0.5rem;
          }
          i {
            font-size: 0.32rem;
          }
        }
        .contentDetail {
          margin: 0.3rem 0;
          font-size: 0.44rem;
          color: #000;
          font-weight: 400;
          img {
            display: block;
            max-width: 100%;
            margin: 0 auto;
          }
        }

      }
    }
    .detailFooter {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 1.28rem;
      padding: 0 0.4rem;
      box-sizing: border-box;
      line-height: 1.28rem;
      background-color: #ededed;
      font-size: 0.36rem;
      span {
        display: inline-block;
        i {
          font-size: 0.5rem;
          margin-right: 0.15rem;
        }
      }
      span:first-child {
        height: 0.87rem;
        width: 6.4rem;
        line-height: 0.87rem;
        padding-left: 0.2rem;
        background-color: #fff;
        color: #bfbfbf;
        border-radius: 5px;
      }
      span:nth-of-type(2) {
        margin-left: 0.2rem;
        i {
          color: #ff6600;
        }
      }
      span:last-child {
        margin-left: 0.2rem;
        i {
          color: #b3b3b3;
        }
      }
    }
  }

  .comment-on {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
</style>
<style scoped>
  .contentDetail >>> .imgcontent {
    max-width: 100%;
    max-height: 5rem;
    margin: 0.2rem auto;
    display: block;
  }
</style>

