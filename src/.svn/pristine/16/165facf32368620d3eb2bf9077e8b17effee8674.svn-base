<template>
<div>
	<Loading v-if="isloading"></Loading>
	<div class="jw_top">
		<div class="top"><a class="add"></a>娇友金屋</div>
		<p class="jw_t">乾坤币</p>
		<p class="jw_num"><i>3450</i></p>
		<ul class="jw_l">
			<li><a class="icon_cz">充值</a></li>
			<li><a class="icon_jbw">赚乾坤币</a></li>
			<li><a class="icon_jyjl">交易记录</a></li>
		</ul>
	</div>
	<ul class="jw_l jw_lg">
		<li><a class="icon_shop2">购物</a></li>
		<li><a class="icon_gift">送礼</a></li>
		<li><a class="icon_prize2">抽奖</a></li>
		<li><a class="icon_juan">换劵</a></li>
	</ul>
	<dl class="jb_list">
		<dt>乾坤币统计</dt>
		<dd>
			<ul class="jb_tj">
				<li>
					<i data-tip="枚">1500</i>
					<p>累计充值</p>
				</li>
				<li>
					<i data-tip="枚">3000</i>
					<p>推广赚取</p>
				</li>
				<li>
					<i data-tip="元">8000</i>
					<p>交友保证金</p>
				</li>
			</ul>
		</dd>
	</dl>
	<dl class="jb_list jb_list2">
		<dt><a class="jb_more"></a>娇友推荐</dt>
		<dd>
			<ul class="jb_act">
				<li>
					<a>
						<i :style="'background-image:url('+imgs.t1+');'"></i>
						<p>牛肝菌汽锅鸡云南特色</p>
					</a>
				</li>
				<li>
					<a>
						<i :style="'background-image:url('+imgs.t2+');'"></i>
						<p>透心冰凉美味冰钻奶茶</p>
					</a>
				</li>
				<li>
					<a>
						<i :style="'background-image:url('+imgs.t3+');'"></i>
						<p>新款流苏女包迷你单肩</p>
					</a>
				</li>
				<li>
					<a>
						<i :style="'background-image:url('+imgs.t4+');'"></i>
						<p>缤纷悦化妆品整套套装</p>
					</a>
				</li>
				<li>
					<a>
						<i :style="'background-image:url('+imgs.t5+');'"></i>
						<p>蓝色之恋手绘水晶项链</p>
					</a>
				</li>
			</ul>
		</dd>
	</dl>
	<Routerlink></Routerlink>
</div>
</template>
<script>
import t1 from './../images/t1.jpg';
import t2 from './../images/t2.jpg';
import t3 from './../images/t3.jpg';
import t4 from './../images/t4.jpg';
import t5 from './../images/t5.jpg';
import Routerlink from './../components/routerlink.vue';
import Loading from '@other/loading.vue';
export default {
	name: 'jyjw',
	data () {
		return {
			imgs:{t1:t1,t2:t2,t3:t3,t4:t4,t5:t5},
			isloading:false
		}
	},
	components: {
		Routerlink,
		Loading
	},
	mounted(){
		$("body").addClass("jw");
	},
	destroyed () {
		$("body").removeClass("jw");
	}
}
</script>
