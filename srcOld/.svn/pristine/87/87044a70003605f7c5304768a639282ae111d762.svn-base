<template>
	<div class="main jy_all_top jy_state_top">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>管理员设置</p>
			</div>
		</div>
		<div class="jy_adminManage_search"><input type="search" placeholder="搜索"></div>
		<ul class="jy_adminManage_list" v-if="showList">
			<li v-for="item,index in showList" :key="item.id" :class="{cur:item.isAdmin}" v-if="item.isAdmin"><i :style="'background-image:url('+$utils.getFullPath(item.headimg)+')'"></i><p>{{item.aliasName}}</p><em @click.stop="changeIsAdmin(index)"></em></li>
		</ul>
		<ul class="jy_adminManage_list" v-if="showList">
			<li v-for="item,index in showList" :key="item.id" :class="{cur:item.isAdmin}" v-if="!item.isAdmin"><i :style="'background-image:url('+$utils.getFullPath(item.headimg)+')'"></i><p>{{item.aliasName}}</p><em @click.stop="changeIsAdmin(index)"></em></li>
		</ul>
	</div>
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
	export default {
	name: 'adminManage',
	data () {
		return {
			isloading:false,
			adminList:null,
			showList:null,
		}
	},
    components: {
      Loading,
	  Back,
    },
	destroyed () {
		$("body").removeClass("gray");
	},
    watch:{
		adminList(val){
			const t=this;
			let adminList=t.$utils.deepCopy(val);
			adminList.sort((a,b)=>{
				return b.isAdmin-a.isAdmin;
			});
			t.showList=adminList;
		},
    },
    async mounted () {
		const t=this;
		$("body").addClass("gray");
		t.getAdmin();
    },
    methods :{
		async getAdmin(){
			const t=this;
			try{
				const result= await t.$server.blindDatingGetAdmin({
					datingActivityId:t.$route.query.id,
				});	
				t.adminList=result.data.data;
			}catch(e){
				console.log(JSON.stringify(e));
			}
		},
		async changeIsAdmin(index){
			const t=this;
			let user=t.showList[index];
			if(user&&user.isAdmin){
				try{
					const result= await t.$server.blindDatingDeleteAdmin({
						datingActivityId:t.$route.query.id,
						userId:user.userId
					});	
					user.isAdmin=0;
				}catch(e){
					console.log(JSON.stringify(e));
				}
			}else{
				try{
					const result= await t.$server.blindDatingAddAdmin({
						datingActivityId:t.$route.query.id,
						userId:user.userId
					});	
					user.isAdmin=1;
				}catch(e){
					console.log(JSON.stringify(e));
				}
			}
		}
    }
  }
</script>

