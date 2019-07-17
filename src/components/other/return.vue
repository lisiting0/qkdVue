<template>
	<a :class="className" @click="back" v-if="!hiddenBack"><slot></slot></a>
</template>
<script>
export default {
	name: 'return',
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
			const t=this;
			if(t.$store.state.returnRouter){
				t.$router.replace(t.$store.state.returnRouter);
			}else {
				t.$router.replace({
					path: '/home'
				})
			}
        },
	},
	destroyed(){
		
	}
}
</script>
