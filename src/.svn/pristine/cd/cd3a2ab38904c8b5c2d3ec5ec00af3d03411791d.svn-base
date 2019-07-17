<template>
	<div :class="'main jy_act'+(' jy_act_'+tmp)">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right"><i class="iconfont">&#xe679;</i></a><p>故事没开始-竞缘活动现场（已结束）</p>
			</div>
		</div>
		<div :class="'jy_act_top'+(isActEnd?' jy_act_end':'')">
			<div class="jy_act_tx jy_act_tx_l">
				<i class="jy_act_tx_img" bgImg="@images/p4.jpg"></i>
				<span v-if="tmp=='jy'||tmp=='py'||tmp=='qy'" class="jy_act_tx_tit"><em bgImg="@images/f4.jpg"></em>风风火火dkdkd</span>
				<span v-else-if="tmp=='xy'||tmp=='zy'" class="jy_act_tx_tit"><i>320<em class="iconfont">&#xe629;</em></i><i>410<em class="iconfont">&#xe62d;</em></i></span>
			</div>
			<div class="jy_act_tx jy_act_tx_r">
				<i class="jy_act_tx_img" bgImg="@images/s8.jpg"></i>
				<span v-if="tmp=='jy'||tmp=='py'||tmp=='qy'" class="jy_act_tx_tit"><em bgImg="@images/f3.jpg"></em>风风火火dkdkd</span>
			</div>
			<div class="jy_act_t_mid ">
				<p class="jy_act_price" v-if="tmp=='jy'"><i>{{isActEnd?'最终竞价':'当前竞价'}}</i><em data-t="乾坤币">500</em></p>
				<p class="jy_act_time" v-if="tmp=='jy'">{{isActEnd?'竞缘结束':"00:29'"}}</p>
				
			</div>
			<ul class="jy_act_num">
				<li>现场<i>36人</i></li>
				<li>报名<i>24人</i></li>
				<li>旁观<i>12人</i></li>
			</ul>
			<p class="jy_act_sm">{{tmp=='jy'?'竞缘':tmp=='py'?'配缘':tmp=='qy'?'抢缘':tmp=='xy'?'选缘':tmp=='zy'?'中缘':''}}说明</p>
			<p class="jy_act_ph" @click="showPh=!showPh">
				<em>排行</em>
				<i v-if="tmp=='qy'||tmp=='xy'||tmp=='zy'">{{tmp=='qy'?'累抢':'活跃'}}：36{{tmp=='qy'?'次':''}}</i>
			</p>
		</div>
		<div class="jy_act_mid">
			<div class="jy_act_mid_con">
				<div v-if="tmp=='jy'" :class="'jy_act_jp'+(showJp?' cur':'')+(showJpPrice?' show':'')" >
					<i class="jy_act_jp_bj" @click.stop="showJp=true"></i>
					<div class="jy_act_jp_p">
						<em class="jy_act_jp_s" @click.shop="showJpPrice=!showJpPrice">{{jpPrice}}</em><i class="jy_act_add" @click.shop="addPrice">加价</i>
					</div>
					<i class="jy_act_jp_close" @click.stop="showJp=false,showJpPrice=false,isActEnd=false">&#xe622;</i>
					<ul class="jy_act_jp_list">
						<li v-for="item in [50,100,150,200]" @click.shop="jpPrice=item,showJpPrice=false">{{item}}</li>
					</ul>
				</div>
				<div v-else-if="tmp=='py'||tmp=='xy'" class="jy_act_py_time" @click="showPy=!showPy">
					<i>00:29</i>
				</div>
				<div v-else-if="tmp=='qy'" class="jy_act_qy_num" data-num="2"  @click.shop="showQy=true">
					<i>抢缘中</i>
				</div>
				<div v-else-if="tmp=='zy'" class="jy_act_zy_ing"  @click.shop="showZy=true">
					<i>抽奖中</i>
				</div>
				<dl class="jy_act_lt">
					<dt>2018-08-29 16:20:34</dt>
					<dd>
						<ul class="jy_act_lt_list">
							<li class="jy_lt_left">
								<i class="jy_lt_img" bgImg="@images/e1.jpg"><em class="jy_lt_video"></em></i>
								<div class="jy_lt_ico">
									<em class="jy_lt_ico_v"></em><em class="jy_lt_ico_c"></em>
								</div>
								<h4>看天不美<i class="jy_h_img_xin"></i></h4>
								<div class="jy_lt_msg">好啊，我可以</div>
							</li>
							<li class="jy_lt_left">
								<i class="jy_lt_img" bgImg="@images/e2.jpg"><em class="jy_lt_video"></em></i>
								<div class="jy_lt_ico">
									<em class="jy_lt_ico_v"></em><em class="jy_lt_ico_c"></em>
								</div>
								<h4>看天不美<i class="jy_h_img_xin2"></i><i class="jy_h_img_xin2"></i><i class="jy_h_img_xin2"></i></h4>
								<div class="jy_lt_msg">反正在家也没什么事情做反正在家也没什么事情做</div>
							</li>
							<li class="jy_lt_right">
								<i class="jy_lt_img" bgImg="@images/e3.jpg"><em class="jy_lt_video"></em></i>
								<div class="jy_lt_ico">
									<em class="jy_lt_ico_v"></em><em class="jy_lt_ico_c"></em>
								</div>
								<h4>看天不美<i class="jy_h_img_xin2"></i><i class="jy_h_img_xin2"></i><i class="jy_h_img_xin2"></i></h4>
								<div class="jy_lt_msg">反正在家也没什么事情做反正在家也没什么事情做</div>
							</li>
							<li class="jy_lt_left">
								<i class="jy_lt_img" bgImg="@images/e4.jpg"><em class="jy_lt_video"></em></i>
								<div class="jy_lt_ico">
									<em class="jy_lt_ico_v"></em><em class="jy_lt_ico_c"></em>
								</div>
								<h4>看天不美<i class=" jy_h_img_q"></i><i class=" jy_h_img_v3"></i><i class=" jy_h_text">群主</i></h4>
								<div class="jy_lt_msg">好啊，我可以</div>
							</li>
							<li class="jy_lt_right">
								<i class="jy_lt_img" bgImg="@images/e5.jpg"><em class="jy_lt_video"></em></i>
								<div class="jy_lt_ico">
									<em class="jy_lt_ico_v"></em><em class="jy_lt_ico_c"></em>
								</div>
								<h4>看天不美<i class="jy_h_img_xin"></i></h4>
								<div class="jy_lt_msg">好啊，我可以</div>
							</li>
						</ul>
					</dd>
				</dl>
				<dl class="jy_act_ph_list" v-if="showPh">
					<dt><i>活跃度排名</i></dt>
					<dd>
						<ul class="jy_ph_list">
							<li data-sort="1">
								<i class="jy_lt_img" bgImg="@images/e5.jpg"><em class="jy_lt_video"></em></i>
								<h4>听说过</h4>
								<div class="jy_ph_ico">
									<i class=" jy_h_img_v3"></i><i class=" jy_h_img_q"></i>
								</div>
								<em class="jy_ph_num">16</em>
							</li>
							<li data-sort="2">
								<i class="jy_lt_img" bgImg="@images/e5.jpg"><em class="jy_lt_video"></em></i>
								<h4>听说过</h4>
								<div class="jy_ph_ico">
									<i class=" jy_h_img_v3"></i><i class=" jy_h_img_q"></i>
								</div>
								<em class="jy_ph_num">16</em>
							</li>
							<li data-sort="3">
								<i class="jy_lt_img" bgImg="@images/e5.jpg"><em class="jy_lt_video"></em></i>
								<h4>听说过</h4>
								<div class="jy_ph_ico">
									<i class=" jy_h_img_v3"></i><i class=" jy_h_img_q"></i>
								</div>
								<em class="jy_ph_num">16</em>
							</li>
							<li data-sort="4">
								<i class="jy_lt_img" bgImg="@images/e5.jpg"><em class="jy_lt_video"></em></i>
								<h4>听说过</h4>
								<div class="jy_ph_ico">
									<i class=" jy_h_img_v3"></i><i class=" jy_h_img_q"></i>
								</div>
								<em class="jy_ph_num">16</em>
							</li>
							<li data-sort="5">
								<i class="jy_lt_img" bgImg="@images/e5.jpg"><em class="jy_lt_video"></em></i>
								<h4>听说过</h4>
								<div class="jy_ph_ico">
									<i class=" jy_h_img_v3"></i><i class=" jy_h_img_q"></i>
								</div>
								<em class="jy_ph_num">16</em>
							</li>
							<li data-sort="6">
								<i class="jy_lt_img" bgImg="@images/e5.jpg"><em class="jy_lt_video"></em></i>
								<h4>听说过</h4>
								<div class="jy_ph_ico">
									<i class=" jy_h_img_v3"></i><i class=" jy_h_img_q"></i>
								</div>
								<em class="jy_ph_num">16</em>
							</li>
							<li data-sort="7">
								<i class="jy_lt_img" bgImg="@images/e5.jpg"><em class="jy_lt_video"></em></i>
								<h4>听说过</h4>
								<div class="jy_ph_ico">
									<i class=" jy_h_img_v3"></i><i class=" jy_h_img_q"></i>
								</div>
								<em class="jy_ph_num">16</em>
							</li>
						</ul>
					</dd>
				</dl>
				<ul v-if="tmp=='py'&&showPy" class="jy_act_py_success">
					<li>
						<i bgImg="@images/e5.jpg"></i>
						故事没开始
					</li>
					<li>
						<i bgImg="@images/e4.jpg"></i>
						看天不美
					</li>
				</ul>
				<div v-if="tmp=='qy'&&showQy" class="jy_act_qy_start">
					<p class="jy_act_qy_t">
						<i>00:00:15</i>
						<em class="jy_act_qy_close" @click.shop="showQy=false">&#xe622;</em>
					</p>
					<i class="jy_act_qy_btn"></i>
					<p class="jy_act_qy_b">
						<i>抢缘总次数：231</i>
						<i>实时抢缘排名：2</i>
					</p>
				</div>
				<div v-if="tmp=='zy'&&showZy" class="jy_act_zy_prize">
					<p class="jy_act_qy_t">
						<i>00:00:15</i>
						<em class="jy_act_qy_close" @click.shop="showZy=false">&#xe622;</em>
					</p>
					<Prize></Prize>
					<p class="jy_act_zy_b"><i><em bgImg="@images/e4.jpg"></em>看天不美   正在抽奖.....</i></p>
				</div>
			</div>
		</div>
		<!--<div class="jy_act_comment"></div>-->
	</div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import Prize from './prize.vue';
  let fontsize = parseInt(document.documentElement.style.fontSize);
  export default {
    name: 'jy',
    data () {
		return {
			showJp:false,//展开竞拍按钮
			showJpPrice:false,//显示竞拍价格列表
			jpPrice:100,//竞拍价
			isloading:false,
			isActEnd:false,//竞价是否结束
			showPh:false,//显示排行榜
			showQy:false,//显示抢缘倒计
			showZy:false,//显示中缘抽奖
			showPy:false,//显示配缘成功
			tmp:'qy',//模版 竞缘 :'jy',配缘 :'py',抢缘 :'qy',选缘 :'xy',中缘 :'zy'
		}
    },
    computed: {
      
    },
    components: {
      Loading,
	  Prize,
	  Back,
    },
	beforeRouteLeave (to, from, next) {
      if(window.api){
        window.api.removeEventListener({
          name: 'swipedown'
        });
		 this.UIChatBox.close();
      }
     
      next();
    },
    watch:{
		showPh(val){
			console.log(val);
			if(val){
				this.$nextTick(()=>{
					this.setBgImg();
				})
			}
		},
		showPy(val){
			console.log(val);
			if(val){
				this.$nextTick(()=>{
					this.setBgImg();
				})
			}
		}
    },
    mounted () {
		const t=this;
		const id=t.$route.query.id;
		t.tmp=id==1?'xy':id==2?'qy':id==3?'jy':id==4?'zy':id==5?'py':'';
		t.$nextTick(()=>{
			this.setBgImg();
		})
		if(!window.api){
			return false;
		}
      this.UIChatBox = window.api.require('UIChatBox');
      this.UIChatBox.addEventListener({
        target: 'inputBar',
        name: 'move'
      }, (ret, err)=> {
        if (ret) {
          this.panelHeight = parseInt(ret.panelHeight)
        }
      });
      this.UIChatBox.addEventListener({
        target: 'inputBar',
        name: 'showRecord'
      }, ()=> {
        let resultList = window.api.hasPermission({
          list:['microphone']
        });
        console.log(JSON.stringify(resultList))
        if(!resultList[0].granted){
          window.api.requestPermission({
            list:['microphone']
          }, function(ret, err){
            console.log(JSON.stringify(ret))
            if(ret&&ret.list[0].granted){
              t.allowRecording=true;
            }
          });
        }else{
          t.allowRecording=true;
        }
      });
      this.UIChatBox.addEventListener({
        target: 'recordBtn',
        name: 'press'
      }, (ret, err)=> {
        if (ret) {
          if(!t.allowRecording){
            window.api.toast({
              msg: '请在手机设置中授权应用访问麦克风',
              duration: 2000,
              location: 'bottom'
            });
            return false;
          }
          // console.log('开始录音')
          window.api.startRecord({
            path: api.cacheDir+"/"+new Date().getTime()+"-"+t.$store.state.userInfo.id+".amr"
          });
          this.showVedio=true;
        }
      });
      this.UIChatBox.addEventListener({
        target: 'recordBtn',
        name: 'press_cancel'
      }, (ret, err)=> {
        if (ret) {
          // console.log('松开')
          window.api.stopRecord(function(ret, err) {
            if (ret) {
              let path = ret.path;
              let duration = ret.duration;
              console.log(JSON.stringify(ret))
            }
          });
          this.showVedio=false;
        }
      });
      this.UIChatBox.addEventListener({
        target: 'recordBtn',
        name: 'move_out'
      }, (ret, err)=> {
        if (ret) {
          // console.log('上划')
          this.showVedio=false;
        }
      });
      this.UIChatBox.addEventListener({
        target: 'inputBar',
        name: 'change'
      }, (ret, err)=> {
        if (ret) {
          console.log(!$api.getStorage('UIChatBoxHeight'))
          if(!$api.getStorage('UIChatBoxHeight')){
            console.log(this.myScrollerHeight)
            $api.setStorage('UIChatBoxHeight',ret.inputBarHeight);
            console.log(this.myScrollerHeight)
            this.myScrollerHeight = document.body.clientHeight-$(".header").height()-(0.75)*fontsize-3-ret.inputBarHeight;
            console.log(this.myScrollerHeight)
            this.$nextTick(()=>{
              this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight-this.myScrollerHeight;
              this.oldScrollHeight = this.$refs.scroll.scrollHeight;
            })
          }
          this.inputBarHeight = parseInt(ret.inputBarHeight);
        }
      });
      this.UIChatBox.open({
        placeholder: '',
        maxRows: 4,
        emotionPath: 'widget://image/emotion',
        texts: {
          recordBtn: {
            normalTitle: '按住 说话',
            activeTitle: '松开 结束'
          },
          sendBtn: {
            title: '发送'
          }
        },
        styles: {
          inputBar: {
            borderColor: '#d9d9d9',
            bgColor: '#f2f2f2'
          },
          inputBox: {
            borderColor: '#B3B3B3',
            bgColor: '#FFFFFF'
          },
          emotionBtn: {
            normalImg: 'widget://image/face.png',
          },
          extrasBtn: {
            normalImg: 'widget://image/act_gift.png'
          },
          keyboardBtn: {                      //JSON对象；键盘按钮样式
            normalImg: 'widget://image/keyboard.png'
          },
          speechBtn: {
            normalImg: 'widget://image/voice.png',
            activeImg: 'widget://image/keyboard.png'
          },
          recordBtn: {
            normalBg: '#c6c6c6',
            activeBg: '#999999',
            color: '#000',
            size: 14
          },
          indicator: {
            target: 'both',
            color: '#c4c4c4',
            activeColor: '#9e9e9e'
          },
          sendBtn: {
            titleColor: '#4cc518',
            bg: '#f2f2f2',
            activeBg: '#46a91e',
            titleSize: 14
          }
        },
        extras: {
          titleSize: 12,
          titleColor: '#a3a3a3',
          btns: [{
            title: '图片',
            normalImg: 'widget://image/photo.png',
            activeImg: 'widget://image/photo.png'
          }, {
            title: '拍照',
            normalImg: 'widget://image/camero.png',
            activeImg: 'widget://image/camero.png'
          }, {
            title: '位置',
            normalImg: 'widget://image/location.png',
            activeImg: 'widget://image/location.png'
          }]
        },
      }, function(ret, err) {
        if(ret.eventType=="send"){
          if(!ret.msg.trim()){
            return false;
          }
          _t.dataChats.push({
            id:_t.dataChats.length+1,
            icon:_t.$store.state.userInfo.icon,
            userId:_t.$store.state.userInfo.id,
            name:'小萝莉',
            message:ret.msg,
            video:null,
            img:null,
            audio:null,
            datetime:_t.$utils.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
            showTime:true,
          })
          _t.$nextTick(()=>{
            if(_t.$refs.scroll.scrollHeight>_t.myScrollerHeight){
              _t.$refs.scroll.scrollTop = _t.$refs.scroll.scrollHeight-_t.myScrollerHeight;
              _t.oldScrollHeight = _t.$refs.scroll.scrollHeight;
            }else{
              _t.marginTop = -(parseInt(_t.inputBarHeight)+parseInt(_t.panelHeight)-$api.getStorage('UIChatBoxHeight')-_t.myScrollerHeight+_t.$refs.scroll.scrollHeight)
              _t.marginTop=_t.marginTop>0?0:_t.marginTop;
            }
          })
        }else if(ret.eventType=='clickExtras'){
          console.log(JSON.stringify(ret))
          if(ret.index==0){
            _t.getImages();
          }else if(ret.index==1){
            _t.takePhotos();
          }

        }
      });
    },
    methods :{
		addPrice(){
			const t=this;
			t.showJpPrice=false;
			t.isActEnd=true;
			console.log("竞拍")
		},
		setBgImg(){
			$("a,i,em,li,div").each(function(){//加载背景图片
				const bgimg=$(this).attr("bgImg"); 
				if(bgimg){
					$(this).css({"background-image":"url("+bgimg+")"});
					$(this).attr("bgImg","");
				}
			});
		},
      async takePhotos(){
        let _t = this;
        let url = await takePhoto();
        if(!url){
          _t.dataChats.push({
            id:_t.dataChats.length+1,
            icon:_t.$store.state.userInfo.icon,
            userId:_t.$store.state.userInfo.id,
            name:'小萝莉',
            message:null,
            video:null,
            img:url,
            audio:null,
            datetime:_t.$utils.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
            showTime:true,
          })
          _t.$nextTick(()=>{
            if(_t.$refs.scroll.scrollHeight>_t.myScrollerHeight){
              _t.$refs.scroll.scrollTop = _t.$refs.scroll.scrollHeight-_t.myScrollerHeight;
              _t.oldScrollHeight = _t.$refs.scroll.scrollHeight;
            }else{
              _t.marginTop = -(parseInt(_t.inputBarHeight)+parseInt(_t.panelHeight)-$api.getStorage('UIChatBoxHeight')-_t.myScrollerHeight+_t.$refs.scroll.scrollHeight)
              _t.marginTop=_t.marginTop>0?0:_t.marginTop;
            }
          })
        }
      },
      async getImages(){
        let _t = this;
        let result = await getImage(3);
        result.list.map(item=>{
          if(!/\./.test(item.thumbPath)){
            item.thumbPath += '.jpg'
          }
          _t.dataChats.push({
            id:_t.dataChats.length+1,
            icon:_t.$store.state.userInfo.icon,
            userId:_t.$store.state.userInfo.id,
            name:'小萝莉',
            message:null,
            video:null,
            img:item.thumbPath,
            audio:null,
            datetime:_t.$utils.format(new Date(),'yyyy-MM-dd hh:mm:ss'),
            showTime:true,
          })
          _t.$nextTick(()=>{
            if(_t.$refs.scroll.scrollHeight>_t.myScrollerHeight){
              _t.$refs.scroll.scrollTop = _t.$refs.scroll.scrollHeight-_t.myScrollerHeight;
              _t.oldScrollHeight = _t.$refs.scroll.scrollHeight;
            }else{
              _t.marginTop = -(parseInt(_t.inputBarHeight)+parseInt(_t.panelHeight)-$api.getStorage('UIChatBoxHeight')-_t.myScrollerHeight+_t.$refs.scroll.scrollHeight)
              _t.marginTop=_t.marginTop>0?0:_t.marginTop;
            }
          })
        })
      },
    }
  }
</script>
<style scoped lang="scss">
  .main{
    .myscoll{
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      font-size: 0.4rem;
      .scroll-loading{
        text-align: center;
        margin-top: 10px;
        height:25px;
        line-height: 25px;
        img{
          width: 20px;
          height: 20px;
        }
      }
      .message-cls{
        margin-bottom: 0.4rem;
        &>p{
          text-align: center;
          color:#ccc;
        }
        &>div{
          display: flex;
          padding:0 0.32rem;
          &>img{
            width: 1.2rem;
            height: 1.2rem;
			border-radius:0.05rem;
          }
          &.left>div{
            margin-left: 0.32rem;
            max-width: 6.8rem;
            color:#666;
            &>div{
              position:relative;
              border: 1px solid #c4c4c4;
              border-radius: 5px;
              padding:5px;
              background-color: #FFF;
              color:#000;
              img{
                max-height: 5rem;
                max-width: 5rem;
              }
              .arrow{ position:absolute; width:10px; height:10px; left:-10px; top:5px; }
              .arrow *{ display:block; border-width:5px; position:absolute; border-style:dashed dashed dashed solid; font-size:0; line-height:0; }
              .arrow em{border-color:transparent  #cbcbcb transparent transparent;}
              .arrow span{border-color:transparent  #FFF transparent transparent; left:1.5px;}
            }
          }
          &.right{
            justify-content:flex-end;
            &>div{
              margin-right: 0.32rem;
              max-width: 6.8rem;
              color:#666;
              p{
                text-align: right;
              }
              &>div{
                position:relative;
                border: 1px solid #c4c4c4;
                border-radius: 5px;
                padding:5px;
                background-color: #9EEA6A;
                color:#000;
                img{
                  max-height: 5rem;
                  max-width: 5rem;
                }
                .arrow{ position:absolute; width:10px; height:10px; right:-10px; top:5px; }
                .arrow *{ display:block; border-width:5px; position:absolute; border-style:dashed solid dashed dashed; font-size:0; line-height:0; }
                .arrow em{border-color:transparent  transparent transparent #cbcbcb;}
                .arrow span{border-color:transparent  transparent transparent #9EEA6A; right:1.5px;}
              }
            }
          }

        }
      }

    }
    .vedio-cls{
      position: absolute;
      left: 0;
      top:0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.6);
      div{
        text-align: center;
        color: #FFF;
      }
      div:first-child{
        display: inline-block;
        margin-left: 50%;
        width: 200px;
        height: 80px;
        transform:translateX(-50%);
        margin-top: 70%;
        position:relative;
         span{
          width:5px;
          height: 5px;
          bottom:20px;
          position:absolute;
          background:#46a91e;
          -webkit-animation: bodong 0.5s infinite  ease;
        }

         span:first-child{
          left:83.5px;
          -webkit-animation-delay:.3s;
        }

         span:nth-child(2){
          left:90.5px;
          -webkit-animation-delay:.4s;

        }
         span:nth-child(3){
          left:97.5px;
          -webkit-animation-delay:.6s;
        }
         span:nth-child(4){
          left:104.5px;
          -webkit-animation-delay:.8s;
        }
         span:nth-child(5){
          left:111.5px;
          -webkit-animation-delay:1s;
        }

        @-webkit-keyframes bodong{
          0%{height:5px; }
          30%{height:15px; }
          60%{height:20px; }
          80%{height:15px; }
          100%{height:5px; }
        }
      }
    }
  }
</style>
<style scoped>
  .myscoll >>> .imgcontent{
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: middle;
  }
</style>


