<template>
	<a :class="className" @click="back" v-if="!hiddenBack"><slot></slot></a>
</template>
<script>
export default {
	name: 'back',
  props:{
	  backOne:{
	    type:Boolean,
      default:false
    },
    className:null
  },
	data () {
		return {
			hiddenBack:false,
		}
	},
	mounted(){
		this.hiddenBack=this.$route.query.hiddenBack?true:false;
	},
	methods:{
		back(){
			//this.$router ? this.$router.back() : window.history.back();
			//console.log(this.$router)
            //if (window.history.length <= 1) {
			//	alert("没有返回");
            //    this.$router.push({name:'home'})
            //    return false
            //} else {
               // this.$router.back();
           // }
            //上面都没执行就说明卡在当前页不是最后一条， histroy记录数量大于1，又没有回退记录，只能返回首页，
         //如果上面都执行了 页面都跳走了，这个也就不用管了
          // console.log('111'+this.backOne)
           if(!this.backOne&&!this.$store.state.handleRoute){
             this.timeout=setTimeout(() => {
               this.$router.push({path:'/'})
             },500);
           }
		   this.$router.back();
        },
	},
	destroyed(){
		if(this.timeout)
		clearTimeout(this.timeout);
	},
	deactivated(){
		if(this.timeout)
		clearTimeout(this.timeout);
	}
}
</script>
