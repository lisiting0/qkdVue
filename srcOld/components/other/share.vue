<template>
	<div v-transfer-dom>
      <popup v-model="showShare" height="35%" :hide-on-blur="true" style="background-color: #FFFFFF;border-top-left-radius: 0.4rem;border-top-right-radius: 0.4rem;">
        <div class="sharePopup">
          <ul>
            <li class="friends-icon"><router-link :to="{name:'home'}">好友/群组</router-link></li>
            <li class="circle-icon"><router-link :to="{name:'home'}">朋友圈</router-link></li>
            <li class="wxFriends-icon"><router-link :to="{name:'home'}">微信好友</router-link></li>
            <li class="qq-icon"><router-link :to="{name:'home'}">QQ好友</router-link></li>
            <li class="qqSpace-icon"><router-link :to="{name:'home'}">QQ空间</router-link></li>
            <li class="report-icon"><router-link :to="{name:'home'}">举报</router-link></li>
            <li class="notInterested-icon"><router-link :to="{name:'home'}">不感兴趣</router-link></li>
          </ul>
        </div>
      </popup>
    </div>
</template>
<script>
import { TransferDom,Popup} from 'vux';
export default {
	name: 'share',
	data () {
		return {
			
		}
	},
	directives: {
		TransferDom
    },
	components:{
		Popup,
	},
	props:['showShare'],
	methods:{
		
	}
}
</script>