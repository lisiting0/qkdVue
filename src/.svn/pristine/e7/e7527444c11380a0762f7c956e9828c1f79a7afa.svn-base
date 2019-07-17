<template>
  <div class="main" @click="showpay=false">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <a class="left" @click="goback"><i class="iconfont">&#xe613;</i></a>成为普通合伙人
      </div>
    </div>
    <div class="content">
      <div class="c1">
        <div @click="select=1" :class="{select:select==1}">
          <p>礼包一</p>
          <img src="../../images/spread/new/1.png"/>
          <p>双层保温杯</p>
        </div>
        <div @click="select=2" :class="{select:select==2}">
          <p>礼包二</p>
          <img src="../../images/spread/new/2.png"/>
          <p>双层保温杯</p>
        </div>
      </div>
      <div class="c2">
        <div v-if="select==1">
          <p>礼包一</p>
          <img src="../../images/spread/new/1.png"/>
        </div>
        <div v-else>
          <p>礼包二</p>
          <img src="../../images/spread/new/2.png"/>
        </div>
      </div>
      <div class="c3">
        <p>￥ 399.00</p>
        <p>男女士真空双层茶杯韩版可爱便携保温杯</p>
        <p>购买礼包，就能获得乾坤岛普通合伙人权限，享受乾坤岛普通合伙人权益</p>
      </div>
      <div class="details">
        <img src="../../images/spread/new/1_03.jpg"/>
        <img src="../../images/spread/new/1_04.jpg"/>
        <img src="../../images/spread/new/1_05.jpg"/>
        <img src="../../images/spread/new/1_06.jpg"/>
        <img src="../../images/spread/new/1_07.jpg"/>
        <img src="../../images/spread/new/1_08.jpg"/>
        <img src="../../images/spread/new/1_09.jpg"/>
      </div>
    </div>
    <div class="c4" @click.stop="showpay=true">
      立即购买
    </div>
    <!--<button @click="pay('wxpay')">微信付款</button>-->
    <!--<button @click="pay('alipay')">支付宝付款</button>-->
    <transition enter-active-class="slideInUp" leave-active-class="slideOutUp">
      <div v-show="showpay" class="c5" @click.stop="">
        <div>
          <div class="jy_qb_block">
            <p class="jy_qb_tit">支付方式</p>
            <ul class="jy_qb_pay_list">
              <li v-for="item,index in payType" v-if="index!='alipay'||(index=='alipay'&&!$store.state.isWeixin)" :class="{cur:index==payIndex,alipay_ico:index=='alipay',wxpay_ico:index=='wxpay'}" @click="payIndex=index">{{item}}</li>
            </ul>
          </div>
          <div class="c6">
            <p>总金额:399.00</p><p @click="pay">支付</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';

  export default {
    name: 'spreadPayList',
    components: {
      Loading,
    },
    data() {
      return {
        isloading: false,
        select:1,
        payType:{wxpay:"微信支付",alipay:"支付宝支付"},
        payIndex:"wxpay",
        showpay:false,
      }
    },
    watch:{

    },
    computed: {

    },
    mounted() {

    },
    methods: {
      goback() {
        this.$router.go(-1);
      },
      async pay(){
        let t = this;
        t.isloading=true;
        try {
          let result = await this.$server.applyAgent({
            type:t.select
          })
          let oderId = result.data.data.id;
          let payIndex=t.$store.state.isWeixin?'publicWxPay':t.payIndex;
          const payResult=await this.$server.payOrder({
            oderId:oderId,
            payid:payIndex
          });
          //支付开始
          let api=window.api||"";
          if(api||t.$store.state.isWeixin){
            if(payResult.data.status==1){
              if(payIndex=='publicWxPay'){
                let onBridgeReady=()=>{
                  WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                      ...payResult.data.data
                    },
                    function(res){
                      if(res.err_msg == "get_brand_wcpay_request:ok" ){
                        t.time=5;
                        t.isloading=true;
                        let timeout=setInterval(()=>{
                          t.time--;
                          t.time=t.time<0?-1:t.time;
                          if(t.time<0){
                            t.isloading=false;
                            clearInterval(timeout);
                            t.$vux.toast.show({
                              type:"success",
                              text: '支付成功',
                              position:"middle",
                              width:"auto",
                            });
							t.$router.replace({name:"agent"});
                          }
                        },1000);
                      }else{
                        t.isloading=false;
                      }
                    });
                }
                if (typeof WeixinJSBridge == "undefined"){
                  if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                  }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                  }
                }else{
                  onBridgeReady();
                }
              }else if(payIndex=="wxpay"){
                let wxPay = api.require('wxPay');
                let wxSetting={};
                wxSetting["apiKey"]=payResult.data.data.appid;
                wxSetting["orderId"]=payResult.data.data.prepayid;
                wxSetting["mchId"]=payResult.data.data.partnerid;
                wxSetting["nonceStr"]=payResult.data.data.noncestr;
                wxSetting["timeStamp"]=payResult.data.data.timestamp;
                wxSetting["package"]=payResult.data.data.package;
                wxSetting["sign"]=payResult.data.data.sign;
                wxPay.payOrder(wxSetting, function(ret, err) {
                  if (ret.status){
                    t.time=5;
                    t.isloading=true;
                    let timeout=setInterval(()=>{
                      t.time--;
                      t.time=t.time<0?-1:t.time;
                      if(t.time<0){
                        t.isloading=false;
                        clearInterval(timeout);
                        t.$vux.toast.show({
                          type:"success",
                          text: '支付成功',
                          position:"middle",
                          width:"auto",
                        });
						t.$router.replace({name:"agent"});
                      }
                    },1000);
                  }else {
                    t.isloading=false;
                    t.$vux.toast.show({
                      type:"text",
                      text: "支付失败:"+err.code,
                      position:"bottom",
                      width:"2rem",
                    });
                  }
                });
              }else if(payIndex=="alipay"){
                let aliPayPlus = api.require('aliPayPlus');
                aliPayPlus.payOrder({
                  orderInfo: payResult.data.data
                }, function(ret, err) {
                  //alert("alipay.code:"+JSON.stringify(ret));
                  //9000：支付成功
                  //8000：正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
                  //4000：订单支付失败
                  //5000：重复请求
                  //6001：用户中途取消支付操作
                  //6002：网络连接出错
                  //6004：支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态
                  //0001：缺少商户配置信息（商户id，支付公钥，支付密钥）
                  //0002：缺少参数（subject、body、amount、tradeNO）
                  //0003：签名错误（公钥私钥错误）
                  if(ret.code==9000){//成功
                    t.time=5;
                    t.isloading=true;
                    let timeout=setInterval(()=>{
                      t.time--;
                      t.time=t.time<0?-1:t.time;
                      if(t.time<0){
                        t.isloading=false;
                        clearInterval(timeout);
                        t.$vux.toast.show({
                          type:"success",
                          text: '支付成功',
                          position:"middle",
                          width:"auto",
                        });
						t.$router.replace({name:"agent"});
                      }
                    },1000);
                  }else{
                    t.isloading=false;
                    t.$vux.toast.show({
                      type:"text",
                      text: "支付失败",
                      position:"bottom",
                      width:"2rem",
                    });
                  }
                });
              }
            }else{
              t.isloading=false;
              t.$vux.toast.show({
                type:"text",
                text: payResult.data.message,
                position:"bottom",
                width:"2rem",
              });
            }
          }else{
            t.isloading=false;
            t.$vux.toast.show({
              type:"text",
              text: "当前环境不支持该支付方式",
              position:"bottom",
              width:"2rem",
              onHide(){
                t.topay=false;
                //t.$router.replace({name:"agent"});
              }
            });
          }
          //付款完成
        }catch (e) {
          console.log(e)
          t.isloading=false;
          t.$vux.toast.show({
            type:"text",
            text: "支付失败",
            position:"bottom",
            width:"2rem",
          });
        }
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
  .main {
    width: 100%;
    height: 100%;
    overflow: scroll;
    box-sizing: border-box;
    background-color: #FFF;
    position: relative;
    padding-bottom: 0rem;
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
    .content{
      margin: 1.39rem 0 0;
      .c1{
        padding: 0.34rem 0 0 0.38rem;
        height: 3.31rem;
        div{
          box-sizing: border-box;
          display: inline-block;
          height: 3.5rem;
          border-radius: 8px;
          border: 1px solid #f2f2f2;
          margin-right: 0.32rem;
          padding: 1px;
          position: relative;
          &.select{
            background:url("../../images/spread/1.jpg");
            background-size: cover;
            background-position: center;
            border: 1px solid #ff0036;
            p:nth-of-type(2){
              color: #ff0036;
            }
          }
          p:nth-of-type(1){
            display: inline-block;
            margin-left: 0.2rem;
            color: #FFF;
            font-weight: 500;
            font-size: 0.2rem;
            border-radius: 5px 0;
            line-height: 1;
            padding: 2px 4px;
            background-color: #d8b861;
          }
          p:nth-of-type(2){
            font-weight: 500;
            font-size: 0.38rem;
            margin-left: 0.2rem;
            color: #B2B2B2;
          }
        }
        img{
          display: block;
          width: 2.5rem;
          vertical-align: middle;
          padding:0 0.2rem;
          box-sizing: border-box;
        }
      }
      .c2{
        margin-top: 0.8rem;
        div{
          width: 5.36rem;
          height: 7rem;
          margin: 0 auto;
          position:relative;
          p{
            color: #FFF;
            display: inline-block;
            font-weight: 500;
            font-size: 0.42rem;
            border-radius: 5px 0;
            margin: 10px 0;
            top:0;
            left: 0;
            line-height: 1;
            padding: 3px 8px;
            background-color: #d8b861;
          }
          img{
            width: 100%;
            vertical-align: middle;
          }
        }
      }
      .c3{
        //margin-top: 0.93rem;
        p{
          text-align: center;
          font-weight: 500;
          margin: 7px 0;
        }
        p:nth-of-type(1){
          color:#ff0036;
          font-size: 0.62rem;
        }
        p:nth-of-type(2){
          color:#000;
          font-size: 0.48rem;
        }
        p:nth-of-type(3){
          color:#B05A65;
          font-size: 0.3rem;
        }
      }
      .details{
        font-size: 0;-webkit-text-size-adjust:none;
        margin-bottom: 20px;
        img{
          outline-width:0px;
          vertical-align:top;
          width: 100%;
        }
      }
    }
    .c4{
      position: fixed;
      bottom: 0.5rem;
      width: 9.2rem;
      height: 1.42rem;
      line-height: 1.42rem;
      font-size: 0.48rem;
      background-color: #ff0036;
      color: #FFF;
      margin-left: 0.8rem;
      border-radius: 0.71rem;
      text-align: center;
      font-weight: 500;
    }
    .c5{
      border-top: 2px solid #CCCCCC;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 11rem;
      background-color: #FFF;
      z-index: 100;
      &>div{
        position:relative;
        height: 100%;
        width: 100%;
        background-color: #f2f2f2;
        .c6{
          width: 100%;
          position: absolute;
          bottom: 0;
          height: 1.42rem;
          line-height: 1.42rem;
          background-color: #fff;
          display: flex;
          p:nth-of-type(1){
            width: 6.8rem;
            padding:0 0.36rem;
            color:#f10d3b;
            font-weight: 500;
          }
          p:nth-of-type(2){
            flex-grow: 1;
            background-color: #f10d3b;
            color:#FFF;
            text-align: center;
          }
        }
      }
    }
  }
</style>
