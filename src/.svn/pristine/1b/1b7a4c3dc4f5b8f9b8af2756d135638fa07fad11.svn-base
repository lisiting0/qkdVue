<template>
	<div class="main jy_task_bao"> 
		<img v-if="task.goods&&task.goods.img" class="jy_task_topImg" :src="$utils.getFullPath(task.goods.img)">
		<div class="jy_task_top_text" v-if="task.goods">
			<h3>{{task.goods.name}}</h3>
			<p>￥{{task.goods.price}}<!--<del>￥50.01</del>--></p>
		</div>
		<div class="jy_task_block" v-if="task.goods">
			<p class="jy_task_block_text"><i class="jy_task_block_r">剩余：{{task.goods.number}}</i><!--运费 ￥0.01--></p>
		</div>
		<div class="jy_task_block" v-if="task.content">
			<p class="jy_task_block_tit">活动详情</p>
			<div class="jy_task_content">
				<table cellpadding="0" cellspacing="0" class="jy_task_table">
					<tbody>
						<div class="jy_task_table_c" v-html="task.content"></div>
					</tbody> 
				</table>
			</div>
		</div>
		<div class="jy_task_bottom" v-if="task.state==0">任务已结束</div>
		<template v-else-if="task.task">
			<router-link tag="div" :to="{name:'taskWxList',query:{taskId:$route.query.taskId}}" class="jy_task_bottom" v-if="task.task.state==0">查看邀请记录,进度:{{task.task.invitationCount}}/{{task.requiredNumber}}（未完成）</router-link>
			<template v-if="taskVideo[$route.query.taskId]">
				<template v-if="task.task.state!=0">
					<a v-if="taskVideo[$route.query.taskId].type=='outlink'" class="jy_task_bottom cur" :href="taskVideo[$route.query.taskId].url">{{taskVideo[$route.query.taskId].title}}</a>
					<router-link tag="div" :to="{name:taskVideo[$route.query.taskId].url,query:taskVideo[$route.query.taskId].query||{}}" v-else class="jy_task_bottom cur" >{{taskVideo[$route.query.taskId].title}}</router-link>
				</template>
			</template>
			<template v-else>
				<div class="jy_task_bottom cur" v-if="task.task.state==1" @click.stop="showAddress=true">立即兑换</div>
				<div class="jy_task_bottom cur" v-else-if="task.task.state==2">已兑换(待发货)</div>
				<div class="jy_task_bottom cur" v-else-if="task.task.state==3">已兑换(已发货)</div>
			</template>
		</template>
		<div v-transfer-dom>
			<popup v-model="showAddress" position="top" :popup-style="{zIndex:596}" :should-scroll-top-on-show="true">
			<div class="jy_task_win">
				<label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<input type="text" placeholder="请输入姓名" v-model="realName"></label>
				<label>联系手机：<input type="text" placeholder="请输入联系手机" v-model="phone"></label>
				<label>收货地址：<input type="text" placeholder="请输入地址,包含省,市,街道,详细地址" v-model="address"></label>
				<a class="jy_task_win_btn" @click.stop="updateAddress">提交</a>
			</div>
			</popup>
		</div>
	</div>
</template>
<script>
import {Popup,TransferDom} from 'vux';
export default {
	name: 'task',
	data() {
		return {
			task:{},
			showAddress:false,
			phone:'',
			realName:'',
			address:'',
			taskVideo:{},
		}
	},
	computed: {},
	components: {
		Popup,
	},
	directives: {
		TransferDom,
	},
	watch: {

	},
	async mounted() {
		const t = this;
		$("body").addClass("lgray");
		try{
			const result = await t.$server.apiDictObject({type:"taskConfig"});
			if(result.data.data){
				t.taskVideo=JSON.parse(result.data.data.taskConfig||"{}");
			}
			await t.getTask();
		}catch(e){
			console.log("任务宝视频字典出错"+JSON.stringify(e));
			t.$vux.toast.show({
				type:"cancel",
				text:"获取任务信息失败,请刷新!",
				position:"middle",
			});
		}
	},
	destroyed() {
		$("body").removeClass("lgray");
	},
	methods: {
		async getTask(){
			const t=this;
			try{
				const result = await t.$server.getTask({
					taskId:t.$route.query.taskId,
					openid:t.$store.state.openId
					// openid:"oD0wU0oxcSgwiM32xbLM4A0r_7rE"
				});
				console.log(JSON.stringify(result));
				t.task=result.data.data;
				if(result.data.data.isAccept!=1){
					t.receiveTasks();
				}else if(result.data.data.task){
					t.realName=result.data.data.task.realName;
					t.phone=result.data.data.task.phone;
					t.address=result.data.data.task.address;
				}
			}catch(e){
				console.log(JSON.stringify(e));
			}
		},
		async receiveTasks(){
			const t=this;
			try{
				const result = await t.$server.receiveTasks({
					taskId:t.$route.query.taskId,
					openid:t.$store.state.openId
				});
				t.task=result.data.data;
			}catch(e){
				console.log(JSON.stringify(e));
			}
		},
		async updateAddress(){
			const t=this;
      if(!t.realName){
        t.$vux.toast.show({
          type:"cancel",
          text:"请输入姓名",
          position:"middle",
        })
        return false;
      }
			if(!t.phone||!t.checkPhone(t.phone)){
				t.$vux.toast.show({
					type:"cancel",
					text:"请输入正确的手机号",
					position:"middle",
				});
				return false;
			}
			if(!t.address){
				t.$vux.toast.show({
					type:"cancel",
					text:"请输入正确地址",
					position:"middle",
				})
				return false;
			}
			try{
				const result = await t.$server.updateAddress({
					id:t.task.task.id,
					openid:t.$store.state.openId,
          realName:t.realName,
					phone:t.phone,
					address:t.address
				});
				//t.task=result.data.data;
				t.showAddress=false;
				t.$vux.toast.show({
					type:"text",
					text:"提交成功",
					position:"bottom",
				});
				t.$set(t.task.task,"state",2);
			}catch(e){
				console.log(JSON.stringify(e));
			}
		},
		checkPhone(phone){//验证手机号
			const t=this;
			//return true;
			//const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			const myreg=/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
			if (!myreg.test(phone)) {
				return false;
			} else {
				return true;
			}
		}
	}
}
</script>
