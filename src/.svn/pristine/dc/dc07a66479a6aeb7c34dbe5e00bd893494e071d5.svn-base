import Vue from 'vue'
//引入外部js
import './hammer.js'


function vueTouch(el,type,binding){
  this.el = el;
  this.type = type;
  this.binding = binding;
  //直接调用
  let hammertime = new Hammer(this.el,{
    touchAction:"auto"
  });
  hammertime.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
  hammertime.on(this.type,this.binding.value);
};

const pan = Vue.directive("pan",{
  bind:function(el,binding){
    new vueTouch(el,"pan",binding);
  }
});
const swipe = Vue.directive("swipe",{
  bind:function(el,binding){
    new vueTouch(el,"swipe",binding);
  }
});
const swipeup = Vue.directive("swipeup",{
  bind:function(el,binding){
    new vueTouch(el,"swipeup",binding);
  }
});
const swipedown = Vue.directive("swipedown",{
  bind:function(el,binding){
    new vueTouch(el,"swipedown",binding);
  }
});
const swipeleft = Vue.directive("swipeleft",{
  bind:function(el,binding){
    new vueTouch(el,"swipeleft",binding);
  }
});

const swiperight = Vue.directive("swiperight",{
  bind:function(el,binding){
    new vueTouch(el,"swiperight",binding);
  }
});

//导出需要的指令
export{pan,swipe,swipeup,swipeleft,swiperight,swipedown}
