<template>
<div class="main jy_all_top personal_data">
	<Loading v-if="isloading"></Loading>
	<!--<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>商城</p>
		</div>
	</div>-->
</div>
</template>
<script>

import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
export default {
	name: 'shop',
	data () {
		return {
			isloading:false,	
		}
	},
	mounted () {
		const t=this;
		t.isloading=true;
		window.api&&api.openWin({
			name: 'mobileShop',
			url: 'mobileShop.html',
			/*rect: {
				x: 0,
				y: parseFloat(document.documentElement.style.fontSize)/100*75,
				w: 'auto',
				h: 'auto'
			},*/
			//bgColor:"#fff",
			pageParam: {}
		});
		api.addEventListener({
			name: 'closeShopWin'
		}, function(ret, err) {
			t.$router.back();
		});
	},
	components: {
		//Routerlink,
		Loading,
		Back,
		//myScroller
	},
	methods: {
		
	},
	destroyed () {
		api.removeEventListener({
			name: 'closeShopWin'
		});
	}
}
</script>