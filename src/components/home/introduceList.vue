<template>
  <div class="main jy_all_top"> 
	<div class="header">
		<div class="top">
			<p>乾坤岛介绍</p>
		</div>
	</div>
	<dl class="jy_introduceList">
		<router-link tag="dt" :to="{name:'qkdIntroduce'}">
			<i></i>
			<div><p>乾坤岛介绍</p><p>查看<i class="iconfont">&#xe702;</i></p></div>
      <p>乾坤之岛，即乾坤岛；乃当年月老修成正果，得道飞仙之地...</p>
		</router-link>
		<dd>
			<ul class="jy_introduceList_list">
				<router-link tag="li" :to="{name:'ordinaryInvestment'}">
					<i class="jy_i_list_i1"></i>
					<p>合伙人介绍<em>对乾坤岛平台的两种类型合伙人政策进行介绍</em></p>
				</router-link>
				<router-link tag="li" :to="{name:'investment'}">
					<i class="jy_i_list_i2"></i>
					<p>区域合伙人招募<em>对乾坤岛平台的区域运营合作人的政策进行介绍，并收集意向合伙人信息</em></p>
				</router-link>
				<router-link tag="li" :to="{name:'spread'}">
					<i class="jy_i_list_i3"></i>
					<p>普通合伙人招募<em>对乾坤岛平台的普通合作人的政策进行介绍，并提供升级成为合伙人入口</em></p>
				</router-link>
				<router-link tag="li" :to="{name:'raiders'}">
					<i class="jy_i_list_i4"></i>
					<p>用户赚钱攻略<em>分享对乾坤岛用户利用乾坤岛平台赚钱的方式</em></p>
				</router-link>
				<router-link tag="li" :to="{name:'zhiyin'}">
					<i class="jy_i_list_i5"></i>
					<p>线上相亲操作指引<em>指引线上相亲会的操作步骤进行介绍</em></p>
				</router-link>
			</ul>
		</dd>
	</dl>
  </div>
</template>
<script>
  export default {
    name: 'introduceList',
    data() {
      return {
       
      }
    },
    computed: {},
    components: {},
    watch: {
    
    },
    mounted() {
      const t = this;
      
    },
    destroyed() {

    },
    methods: {
      
    }
  }
</script>
<style lang="scss" scoped>
  .main{
    width: 100%;
    min-height: 100%;
    background-color: #FFF;
    overflow: hidden;
  }
</style>
