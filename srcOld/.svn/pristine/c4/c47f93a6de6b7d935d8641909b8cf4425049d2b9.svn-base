<template>
  <div @touchmove="touchmove($event)" class="shade myshade" @click="close" v-show="showPopover">
    <div class="popover">
      <div class="tag">
        <div class="arrow">
          <em></em><span></span>
        </div>
        <slot>

        </slot>
      </div>
    </div>
  </div>
</template>
<script>
  const COMPONENT_NAME = 'Popover'

  export default {
    name: COMPONENT_NAME,
    props: {
      showPopover: {
        type: Boolean,
        default: false
      }
    },
    methods:{
      close(){
        this.$emit('close', false)
      },
      touchmove(e){
        e.preventDefault();
      }
    }
  }
</script>
<style scoped>
  .shade{
    top:0;
    width: 100%;
    height: 100%;
    position:fixed;
    z-index: 100;
  }
  .popover{
    position:absolute;
    z-index: 101;
    right:0.4rem;
    top:2.3rem;
  }
  .tag{ border:1px solid #cbcbcb; position:relative; background-color:#FFF;
    box-shadow: 0 0 30px 0 #757477;
  }
  .arrow{ position:absolute; width:20px; height:20px; top:-20px; right:5px; }
  .arrow *{ display:block; border-width:10px; position:absolute; border-style:solid dashed dashed dashed; font-size:0; line-height:0; }
  .arrow em{border-color:transparent transparent #cbcbcb;}
  .arrow span{border-color:transparent transparent #FFF; top:2px;}
</style>
