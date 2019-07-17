<template>
	<div class="main">
	
	</div>
</template>
<script>

export default {
	name: 'myRedirect',
	data () {
		return {
			//isloading:false,	
		}
	},
	created() {
		const t=this;
		const redirectUrl=decodeURIComponent(t.$route.query.url);
		if(redirectUrl&&redirectUrl!='undefined'){
			window.location.href=redirectUrl;
		}else{
			t.$router.push({name:'login'});
		}
	},
	mounted () {
		const t=this;
	},
	components: {

	},
	methods: {
		
	},
	destroyed () {
		
	}
}
</script>