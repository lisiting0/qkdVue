<template>
	<div>
		<div class="comment-content" v-for="item,index in comment.comments" :key="item.id" @click.stop="showComment(parentId,item)">
			<i :style="{'background-image':'url('+$utils.getFullPath(item.user.headimgAttachmentId)+')'}"></i>
			<div class="right-content">
				<p class="username"><em>{{item.createDate}}</em>{{item.user.aliasName}} 回复 {{comment.user.aliasName}}</p>
				<p>{{item.commentsText}}</p>
			</div>
			<replayDetail v-if="item.comments" :parentId="parentId" :comment="item" @showComment="showComment"></replayDetail>
		</div>
	  
	</div>
</template>
<script>
	export default {
	name: 'replayDetail',
	props: ['comment','parentId'],
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
			this.$emit('showComment',id,item);
		}
    }
  }
</script>

