<template>
  <div class="main-top">
    <div class="header">
      <div class="top">
		<Back class="left"><i class="iconfont">取消</i></Back>
        <a class="right" @click="emit"><i class="iconfont">确定</i></a>评论
      </div>
    </div>
    <div class="comment-cls">
      <p v-if="title!=''">回复:{{title}}</p>
      <textarea v-model="value" rows="6" placeholder="评论:">

      </textarea>
      <!--<p><span>发表</span></p>-->
    </div>
  </div>
</template>
<script>
	import Back from '@other/back.vue';
  export default {
    name: 'commentOn',
    props:{
      title: {
        type: String,
        default: ''
      },
    },
    data () {
      return {
        value:'',
      }
    },
    computed: {
    },
    components: {
    },

    created (){
    },
    destroyed () {
    },
    mounted () {
    },
	components: {
	  Back,
    },
    methods :{
      emit(){
        this.$emit('childMethod',this.value);
      },
      showBigImg(e){
        if(e.target.nodeName=='IMG'){
          this._previewer=e;
          let pid = 'previewer'+e.target.dataset.id;
          this._previewer = e;
          ((this.$refs)[pid])[0].show(0)
        }
      },
      getImage(imageArr){
        return imageArr.map((item)=>{
          return {
            src:this.getFullPath(item.src)
          }
        })
      },
      getFullPath(path){
        return this.$utils.getFullPath(path);
      },
	  goback(){
        this.$router.go(-1);
      },
      onChange (val) {
        console.log('val change', val)
      },
      routerTo(link){
        console.log(link)
      },
      showFilter(){
        this.showPopover = !this.showPopover;
      },
      closePopover(val){
        this.showPopover = val;
      },
      makesure(sex,authentication){
        console.log(sex)
        console.log(authentication)
        this.showPopover = false;
      }
    }
  }
</script>
<style scoped lang="scss">
  .main-top{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color:#fff ;
    padding-top:0.75rem;
    box-sizing: border-box;
    overflow-y:scroll;
    -webkit-overflow-scrolling : touch;
    &:before{
      background-color:#3a3845 ;
      content:"";
      position:fixed;
      display:block;
      z-index:999;
      left:0;
      top:0;
      width:100%;
      height:0.75rem;
      background-size:100%;
    }
    .header{
      position: fixed;
      width: 100%;
      z-index: 150;
      background-image: none;
      background-color:#3a3845 ;
      .top{
        color:#FFF;
        font-size: 0.52rem;
        position: relative;
        i{
          font-size: 0.42rem;
        }
        a{
          position:absolute;
          padding:0 3px;
        }
        .left{
          left:0.325rem;
        }
        .right{
          right:0.325rem;
        }
      }
    }
    .comment-cls{
      p:first-child{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 0.8rem;
        line-height: 0.8rem;
      }
      margin:1.39rem 0.4rem 0;
      padding:0.2rem 0 ;
      height:8rem;
      textarea{
        box-sizing: border-box;
        padding:0.25rem;
        font-size: 0.4rem;
        background-color: #f2f2f2;
        resize: none;
        width:100%;
        outline:none;
        border: 0;
      }
      p{
        position: relative;
        span{
          position: absolute;
          right:0;
          width: 1.5rem;
          color:#c0e2c0;
          border: 1px solid #c0e2c0;
          border-radius: 5px;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
        }
      }
    }
  }
</style>

