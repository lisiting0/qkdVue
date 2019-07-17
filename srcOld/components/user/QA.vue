<template>
	<div class="main jy_all_top jy_state_top jy_QA">
		<Loading v-if="isloading"></Loading>
		<div class="header">
			<div class="top">
				<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>帮助与反馈</p>
			</div>
		</div>
		<ul class="jy_QA_list">
			<li v-for="item in question">
				<h4>{{item.question}}</h4>
				<div class="jy_QA_answer" v-html="item.answer"></div>
			</li>
		</ul>
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
			question:[],
		}
	},
    components: {
      Loading,
	  Back,
    },
	destroyed () {
	},
    watch:{
		
    },
    mounted () {
		const t=this;
		const length=help.length;
		const id=t.$route.query.id;
		for(let i=0;i<length;i++){
			if(help[i].id==id){
				t.question=help[i].list;
				break;
			}
		}
    },
    methods :{
		
    }
  }
</script>

