<template>
  <div class="shade" @click="close">
    <div class="popover" @click.stop="">
      <div class="usertitle">送给<span @click.stop="selectUser?chooseUser():''">{{name}}<em v-if="selectUser" class="iconfont">&#xe607;</em></span>:<shop v-if="showShop" :tag="'i'" :giftUserId="giftUserId" :giftUserName="name" class="toshop">去商城送礼</shop><i @click="close" class="iconfont">&#xe607;</i></div>
      <div class="mycontent">
        <swiper height="6.35rem" :show-dots="false" @on-index-change="change">
          <swiper-item class="black" v-for="item,index in listpage" :key="index+1000">
            <div @touchend="touchend(v,$event)" @touchstart="touchstart($event)" @touchmove="touchmove($event)" v-for="v,num in item">
               <img :src="$utils.getFullPath(v.giftImage)"/>
              <p>{{v.giftName}}</p>
              <p>{{v.jiaobi}}乾坤币</p>
            </div>
          </swiper-item>
        </swiper>
      </div>
      <div class="footer"><img src="../../images/coin.png"/><span>{{coin}}</span><span @click="tolink">充值</span></div>
    </div>
    <transition enter-active-class="slideInLeft" leave-active-class="slideOutLeft">
      <div class="showgift" v-if="num>0">
        <div><img :src="$utils.getFullPath($store.state.userInfo.headimgAttachmentId)"/><span>{{$store.state.userInfo.aliasName}}</span><img :src="$utils.getFullPath(imgurl)"/>
        </div>
        <span><i class="iconfont">&#xe622;</i>{{num}}</span>
      </div>
    </transition>
    <div class="diot" @click.stop="">
      <span v-for="item,index in listpage" :key="index" :class="{active:activeindex==index}"></span>
    </div>
  </div>
</template>
<script>
  import { Swiper, SwiperItem } from 'vux'
  import shop from '@other/shop.vue';
  const COMPONENT_NAME = 'gift'

  export default {
    name: COMPONENT_NAME,
    props: {
      list: {
        type: Array,
        default: ()=>[]
      },
      name:{
        type:String,
      },
      showAnimate:{
        type:Boolean,
        default: false,
      },
      showShop:{
        type:Boolean,
        default: false,
      },
      giftUserId:{
        type:String,
      },
	  selectUser:{//是否可以选择用户
		type:Boolean,
        default: false,
	  }
    },
    async mounted(){
      console.log("gift mounted")
	  if(this.$store.state.userId){
		let userInfo = await this.$server.getUserInfo({userId:this.$store.state.userId});
		this.$store.commit("LOGIN",userInfo.data.data);
	  }
      
    },
    data(){
      return {
        activeindex:0,
        imgurl:'',
        num:0,
        timer:null,
        item:null,
        touchX:0,
        touchY:0,
        touchOffset:0,
      }
    },
    computed:{
      coin:function(){
        return this.$store.state.userInfo.userMoney;
      },
      listpage:function(){
        // this.list.push(...this.list)
        // this.list.push(...this.list)
        let arra=[]
        let page = Math.ceil(this.list.length/8)
        for(let i=0;i<page;i++){
          let arr=[];
          for(let j=0;j<8;j++){
            if(8*i+j==this.list.length){
              break;
            }
            arr.push(this.list[8*i+j])
          }
          arra.push(arr);
        }
        return arra;
      }
    },
    components :{
      Swiper,
      SwiperItem,
      shop,
    },
    methods:{
		chooseUser(){
			this.$emit("chooseUser",true);
		},
      touchstart(event){
        if(event.touches.length>1){
          return;
        }
        this.touchX = event.touches[0].clientX;
        this.touchY = event.touches[0].clientY;
        this.touchOffset=0;
      },
      touchmove(event){
        let offsetX = Math.abs(event.touches[0].clientX-this.touchX)
        let offsetY = Math.abs(event.touches[0].clientY-this.touchY)
        let offset = offsetX>offsetY?offsetX:offsetY;
        if(offset>this.touchOffset)this.touchOffset=offset;
      },
      touchend(item,event){
        if(event.touches.length>1){
          return;
        }
        if(this.touchOffset<10){
          this.send(item)
        }
      },
      send(item){
        if(this.showAnimate){
          if(this.timer){
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(()=>{
			      this.$emit('giftAniEnd');
            this.num = 0 ;
            clearTimeout(this.timer);
			
          },2000)
          if(this.item&&item.id!=this.item.id){
            this.num=0;
          }
          this.item = item;
          this.imgurl = item.giftImage;
          this.num = this.num + 1;
        }
        let coin = this.$store.state.userInfo.userMoney-item.jiaobi;
        if(coin<0){
          this.$vux.toast.show({
            type:"text",
            text: "乾坤币不足，请充值",
            position:"middle",
            width:"auto",
          });
        }else{
          let userInfo = this.$store.state.userInfo
          userInfo.userMoney=coin
          this.$store.commit("LOGIN",userInfo);
          this.$emit('sendGift',item)
        }
      },
      tolink(){
        this.$router.push({
          path: "/recharge"
        })
      },
      change(currentIndex){
        this.activeindex = currentIndex
      },
      close(){
        this.$emit('close')
      }
    }
  }
</script>
<style scoped lang="scss">
  @keyframes slideInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideOutLeft {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      transform: translate3d(0, -30px, 0);
      opacity: 0;
    }
  }
  .slideInLeft {
    animation-name: slideInLeft;
    animation-duration: 0.3s;
  }

  .slideOutLeft {
    animation-name: slideOutLeft;
    animation-duration: 0.5s;
  }
  .shade{
    top:0;
    width: 100%;
    height: 100%;
    position:absolute;
    z-index: 100;
  }
  .popover{
    position:absolute;
    z-index: 101;
    width: 100%;
    height: 9rem;
    bottom:0rem;
    border-radius: 0.4rem 0.4rem 0 0;
    .usertitle{
      height: 1.22rem;
      line-height: 1.22rem;
      padding:0 0.38rem;
      font-size: 0.4rem;
      color:#a3a3a3;
      position: relative;
      background-color: #FFF;
      span{
        color:#000;
        margin: 0 0.3rem;
		em{font-size:0.36rem;margin-left:0.2rem;}
      }
      .toshop{
        right: 1.2rem;
      }
      i{
        font-size: 0.4rem;
        position:absolute;
        right: 0.45rem;
      }
    }
    .footer{
      height: 1.35rem;
      line-height: 1.35rem;
      font-size: 0.43rem;
      display: flex;
      align-items: center;
      padding-left: 0.45rem;
      position: relative;
      img{
        width: 0.43rem;
        height: 0.43rem;
      }
      span:nth-of-type(1){
        color:#b2b2b2;
        margin-left: 0.2rem;
      }
      span:last-child{
        position:absolute;
        right: 0.45rem;
        height: 0.8rem;
        line-height: 0.8rem;
        padding: 0 0.4rem;
        background-color: #ffae00;
        border-radius: 0.4rem;
        color:#FFF;
      }
    }
    .mycontent{
      background-color: #FFF;
      border-bottom: 1px solid #f2f2f2;
      border-top: 1px solid #f2f2f2;
      box-sizing: border-box;
    }
  }
  .black{
    display: flex;
    flex-wrap:wrap;
    justify-content:flex-start;
    align-items: flex-start;
    background-color: #FFF;
    div{
      width: 2.1rem;
      height: 2.7rem;
      margin: 0.4rem 0.285rem 0;
      text-align: center;
      img{
        width: 1.4rem;
        height: 1.4rem;
      }
      p:nth-of-type(1){
        font-size: 0.36rem;
      }
      p:nth-of-type(2){
        font-size: 0.28rem;
        color:#b6b6b6;
      }
    }
  }
  .diot{
    position:absolute;
    width: 100%;
    z-index: 100;
    bottom: 0;
    height: 1.35rem;
    line-height: 1.35rem;
    text-align: center;
    background-color: #FFF;
    span{
      margin: 0 3px;
      display: inline-block;
      width: 12px;
      height: 12px;
      background-color: #cecece;
      border-radius: 50%;
    }
    .active{
      background-color: #8a9199;
    }
  }
  .showgift{
    position:absolute;
    top:40%;
    left:15px;
    &>div{
      position:relative;
      width: 5rem;
      height: 40px;
      border-radius: 20px;
      background-color: rgba(0,0,0,0.3);
      padding-left: 5px;
      display: inline-flex;
      align-items: center;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      span{
        margin-left: 10px;
        color: #FFF;
      }
      img:last-child{
        position:absolute;
        right: 5px;
      }
    }
    &>span{
      vertical-align: top;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      font-size: 22px;
      i{
        vertical-align: top;
        display: inline-block;
        font-size: 6px;
        font-weight: 100;
      }
    }
  }
</style>
