<template>
	<div class="jy_act_luck">
		<div class="jy_act_luck_c">
			<div class="jy_act_luck_ani">
				<ul id="tiger" v-if="step==1">
					<li>
						<div class="luck_ani">
							<template v-if="aniUser.length>0">
								<p v-for="item,index in aniUser">{{item.candidateSex==1?'女':item.candidateSex==2?'男':''}} {{item.ext.extInt}} 号</p>
							</template>
							<template v-else>
								<p>等待抽奖</p>
							</template>
						</div>
					</li>
				</ul>
				<ul v-else-if="step==0">
					<li>
						<div class="luck_ani">
							<p>等待抽奖</p>
						</div>
					</li>
				</ul>
				<ul v-else-if="step==2">
					<li>
						<div class="luck_ani">
							<p>{{user}}</p>
						</div>
					</li>
				</ul>
			</div>
			<i class="jy_act_luck_btn" v-if="isManage" @click.shop="toStartLuck">抽奖</i>
			<a class="jy_act_luck_close" @click.stop="close">&#xe7de;</a>
		</div>
	</div>
</template>
<script>
import Luck from '@js/luck.js'
  export default {
    name: 'luck',
	props:["luckList","isManage","startLuck","datingId"]
	,
    data () {
		return {
			luckIndex:-1,
			aniUser:[],
			playing:false,
			step:0,
			user:'',
		}
    },
    computed: {
    },
    components: {
      Luck,
    },
    watch:{
		async startLuck(val){//得到结果,转动	
			const t=this;
			console.log("初始化抽奖开始:"+val);
			if(val&&!t.playing){
				let baomingUser,luckUser;
				try{
					const result= await t.$server.blindDatingBaoming({
						datingId:t.datingId,
						rows:10000
					});
					baomingUser=result.data.list||[];
					luckUser=baomingUser.filter((v,i)=>{//已经签到了的用户
						return v.ext&&v.ext.extInt;
					});
				}catch(e){
					
				}
				if(!luckUser||luckUser.length<1){//报名人
					t.$vux.toast.show({
						type: 'cancel',
						text: "奖池为空!",
						position: 'middle',
						width: 'auto',
					});
					return false;
				}
				if(!t.luckList||t.luckList.length<1){//中奖人
					t.$vux.toast.show({
						type: 'cancel',
						text: "暂无获奖信息!",
						position: 'middle',
						width: 'auto',
					});
					return false;
				}
				t.luckList.reverse();
				let aniUser=luckUser.filter((val,ind)=>{//没抽中过的用户
					let canLuck=t.luckList.filter((v,i)=>{
						return i>0&&v==val.jiaoyouUser.id;//已经抽过了(排除第一个,因为第一个是本次中奖的)
					});
					return canLuck.length==0;//没抽过	 
				});
				
				let length=aniUser.length;
				console.log("奖池用户数:"+length);
				t.luckIndex=-1;//先还原一下
				if(length>0){
					t.user='';
					for(let i=length;i--;){
						if(aniUser[i].jiaoyouUser.id==t.luckList[0]){
							t.luckIndex=i;
							console.log(aniUser[i].jiaoyouUser.aliasName+"("+aniUser[i].ext.extInt+"号)中奖了,下标:"+i);
							t.user=(aniUser[i].candidateSex==1?'女 ':'男 ')+aniUser[i].ext.extInt+" 号";
							break;
						}
					}
					//console.log(t.user);
					t.step=1;
					t.aniUser=aniUser;
					console.log(t.aniUser);
					t.$nextTick(()=>{
						setTimeout(()=>{
							let tiger=new Luck("tiger",{//可以设置具体的参数，这里注释了，用默认的
								//lap:5,//圈数,默认5(实际会多跑1圈再跑到中奖项,老虎机不会)
								speed:Math.max(Math.min(length*500,5000),2000),//每转一格的时间(ms),默认50(老虎机时为整个动画的时间,即:transition-duration)
								//ease:"ease",//先慢后快，结束时变慢,默认ease(老虎机时为速度效果的速度曲线,即:transition-timing-function)
								type:3,//1 九宫格(元素样式会重置) 2 直 3 老虎机,默认2
								width:$(".jy_act_luck_ani").width(),//单个奖品图片的宽度 ,默认159(老虎机)
								height:$(".jy_act_luck_ani").height(),//单个奖品图片的高度 ,默认265(老虎机)
								prizeNum:length,//奖品个数,默认5(老虎机)
								callback:function(prize){//结束后的回调
									console.log("tiger中奖了"+prize);
									t.$emit("endLuck");
									t.step=2;
									t.playing=false;
									t.$emit("moveLuck",false);
								}
							});
							if(t.luckIndex>-1){
								//console.log(t.luckIndex+"tiger.playing:"+tiger.playing);
								if(!t.playing){
									tiger.getMove([t.luckIndex]);
									t.playing=true;
									t.$emit("moveLuck",true);
								}
							}
						},1000);
					});	
				}else{
					t.$vux.toast.show({
						type: 'cancel',
						text: "所有用户都已中过奖!",
						position: 'middle',
						width: 'auto',
					});
				}
			}
			
			
		}
    },
    mounted () {
		const t=this;
		//console.log("dddddddd")
		
    },
	destroyed(){
		
	},
    methods :{
		close(){
			this.$emit("closeLuck");
		},
		async toStartLuck(){
			const t=this;
			if(t.playing){
				t.$vux.toast.show({
					type: 'cancel',
					text: "正在抽奖,请稍后!",
					position: 'middle',
					width: 'auto',
				});
				return false;
			}
			t.$vux.confirm.show({
				title:"抽奖",
				content:"确定开始新一轮抽奖吗?",
				cancelText:'再想一想',
				maskZIndex:98,
				onCancel(){
					
				},
				async onConfirm(){
					try{
						const result =await t.$server.prizeUser({
							activityId:t.datingId
						})
						console.log("抽奖回调的结果:"+JSON.stringify(result));
						t.$emit("prizeResult",result.data.data);
					}catch(e){
						t.$vux.toast.show({
							type: 'cancel',
							text: e.message,
							position: 'middle',
							width: 'auto',
						});
					}
				}
			});
			
			
		},
    }
  }
</script>
