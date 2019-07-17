<template>
<ul class="menu">
	<li><router-link :to="{name:'home'}" class="icon_home">首页</router-link></li>
	<li class="unreadCount"><router-link :to="{name:'friend'}" class="icon_jy">消息</router-link><badge v-show="count!=0" class="badge" :text="count"></badge></li>
	<li><router-link :to="{name:'love'}" class="icon_love">约会</router-link></li>
	<li><router-link :to="{name:'search'}" class="icon_f">发现</router-link></li>
	<li><router-link :to="{name:'user'}" class="icon_user">我的</router-link></li>
</ul>
</template>
<script>
  import { Badge } from 'vux'
  export default {
    components: {
      Badge
    },
    computed:{
      count:function(){
        return parseInt(this.$store.state.unreadCount)+parseInt(this.$store.state.webMessageStorage.unreadCount)
      }
    }
  }
</script>
<style scoped lang="scss">
.unreadCount{
  position: relative;
  .badge{
    position:absolute;
    top:3px;
    right: 10px;
  }
}
</style>
