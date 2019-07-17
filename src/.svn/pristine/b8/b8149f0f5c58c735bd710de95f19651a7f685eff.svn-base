<template>
	<div>
		<div class="jy_c_replay" v-for="item,index in comment.comments" :key="item.id" @click.stop="showComment(parentId,item)">
		 <span> <i>{{item.user.aliasName}}</i> 回复 <i>{{comment.user.aliasName}}</i></span>
		  <span>:{{item.content}}</span>
		  <replayComments v-if="item.comments" :parentId="parentId" :comment="item" @showComment="showComment"></replayComments>
		</div>
	</div>
</template>
<script>
	export default {
	name: 'replayComments',
	props: ['comment','parentId','parentIndex'],
	data () {
		return {

		}
	},
    components: {

    },
	destroyed () {

	},
    watch:{

    },
    mounted () {

    },
    methods :{
		showComment(id,item){
			this.$emit('showComment',id,item,this.parentIndex);
		}
    }
  }
</script>

