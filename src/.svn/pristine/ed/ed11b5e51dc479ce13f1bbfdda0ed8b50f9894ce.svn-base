<template>
<div class="main jy_all_top jy_user jy_state_top">
	<Loading v-if="isloading"></Loading>
	<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back><p>会员中心</p>
		</div>
	</div>
	<div class="jy_user_top">
		<div class="jy_user_vip">
			<div class="jy_user_t">
				<i class="jy_user_t_img" bgImg="@images/e1.jpg"></i>
				<p class="jy_user_t_name">小花故事<em class="jy_auth_vip">1</em></p>
				<p class="jy_user_t_date">有效期至: 2018-12-31</p>
				<ul class="jy_user_t_b">
					<li>2.0倍<i>成长值230</i></li>
					<li>2.0倍<i>成长值230</i></li>
				</ul>
			</div>
		</div>
	</div>
	<div class="jy_block_b">
		<p class="jy_user_xf">续费会员</p>
		<p class="jy_user_tq"><i>VIP享有8项特权</i></p>
		<ul class="jy_user_tqlist">
			<li><i>生日礼包</i><p>陪你成长生日快乐</p></li>
			<li><i>生日礼包</i><p>陪你成长生日快乐</p></li>
			<li><i>生日礼包</i><p>陪你成长生日快乐</p></li>
			<li><i>生日礼包</i><p>陪你成长生日快乐</p></li>
			<li><i>生日礼包</i><p>陪你成长生日快乐</p></li>
			<li><i>生日礼包</i><p>陪你成长生日快乐</p></li>
		</ul>
	</div>
	<div class="jy_block_b">
		<p class="jy_user_tq"><i>会员专属福利</i></p>
		<ul class="jy_user_flist">
			<li><i bgImg="@images/user_p1.jpg"></i><p>会员签到双倍奖励</p></li>
			<li><i bgImg="@images/user_p1.jpg"></i><p>会员签到双倍奖励</p></li>
		</ul>
	</div>
	<div class="jy_block_t">
		<p class="jy_user_sm"><i>常见问题</i>帮助说明：</p>
		<ul class="jy_user_smlist">
			<li>查看<a>《会员服务协议》《隐私协议》</a></li>
		</ul>
	</div>
</div>
</template>
<script>
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';

export default {
	name: 'userCenter',
	data () {
		return {
			isloading:false,
		}
	},
	mounted () {
		const t=this;
		$("body").addClass("gray");
		t.$nextTick(()=>{
			t.setBgImg();
		})
	},
	destroyed () {
		$("body").removeClass("gray");
	},
	components: {
		Loading,
		Back,
	},
	methods:{
		setBgImg(){
			$("a,i,em,li,div").each(function(){//加载背景图片
				const bgimg=$(this).attr("bgImg"); 
				if(bgimg){
					$(this).css({"background-image":"url("+bgimg+")"});
					$(this).attr("bgImg","");
				}
			});
		},
	}
}
</script>
