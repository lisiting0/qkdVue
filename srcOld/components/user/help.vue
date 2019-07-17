<template>
	<div class="main jy_all_top jy_state_top">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>帮助与反馈</p>
			</div>
		</div>
		<div class="jy_block_t">
			<p class="jy_p_tit2">常见问题</p>
			<ul class="jy_aInfo_line">
				<template v-for="item,index in help">
					<router-link v-if="item.list&&item.list.length>0" tag="li" :to="{name:'QA',query:{id:item.id}}">{{item.title}}</router-link>
				</template>
				
			</ul>
		</div>
	</div>
</template>
<script>
	import Loading from '@other/loading.vue';
	import Back from '@other/back.vue';
	import help from '@js/help.js';
	export default {
	name: 'acountSecurity',
	data () {
		return {
			isloading:false,
			help,
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
		
    },
    mounted () {
		const t=this;
		$("body").addClass("gray");
    },
    methods :{
		
    }
  }
</script>

