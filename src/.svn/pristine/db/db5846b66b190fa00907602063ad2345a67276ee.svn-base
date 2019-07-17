<template>
  <div class="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back><a class="right"><i class="iconfont">&#xe679;</i></a>标签
      </div>
    </div>
    <div class="wrapper" ref="wrapper" :style="{height:myScrollerHeight+'px'}">
      <ul class="content" ref="ul">
        <div class="newLable">
          <i class="iconfont">&#xe61f;</i><span>新建标签</span>
        </div>
        <ul>
          <li class="lableList" v-for="item in lableList" :key="item.id">
            <p>{{item.title}}<span>({{item.sum}})</span></p>
            <p>{{item.member}}</p>
          </li>
        </ul>
        <div class="ulfooter">
          <span>{{lableList.length}}个标签</span>
        </div>
      </ul>
    </div>

  </div>
</template>
<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import BScroll from 'better-scroll'
  export default {
    name: 'lable',
    data () {
      return {
        myScrollerHeight:0,
        isloading:false,
        lableList:[{
          id:1,
          title:"科学城娇友",
          sum:47,
          member:"忍者神龟，芭比，高达，大脸猫，大头儿子，一休哥，阿童木，皮卡丘，悟空，阿拉蕾"
        },{
          id:2,
          title:"学习小组",
          sum:7,
          member:"忍者神龟，芭比，高达，大脸猫，大头儿子，一休哥，阿童木，皮卡丘，悟空，阿拉蕾"
        },{
          id:3,
          title:"驴友团",
          sum:13,
          member:"忍者神龟，芭比，高达，大脸猫，大头儿子，一休哥，阿童木，皮卡丘，悟空，阿拉蕾"
        },{
          id:4,
          title:"一起旅游",
          sum:37,
          member:"忍者神龟，芭比，高达，大脸猫，大头儿子，一休哥，阿童木，皮卡丘，悟空，阿拉蕾"
        },{
          id:5,
          title:"发现美食",
          sum:7,
          member:"忍者神龟，芭比，高达，大脸猫，大头儿子，一休哥，阿童木，皮卡丘，悟空，阿拉蕾"
        },{
          id:6,
          title:"宝爸宝妈交流",
          sum:72,
          member:"忍者神龟，芭比，高达，大脸猫，大头儿子，一休哥，阿童木，皮卡丘，悟空，阿拉蕾"
        },{
          id:7,
          title:"宝爸宝妈交流",
          sum:72,
          member:"忍者神龟，芭比，高达，大脸猫，大头儿子，一休哥，阿童木，皮卡丘，悟空，阿拉蕾"
        }]

      }
    },
    computed: {

    },
    mounted () {
      this.myScrollerHeight = document.body.clientHeight-$(".header").height()-$(".footer").height()-0.75*parseInt(document.documentElement.style.fontSize)-2;
      this.$nextTick(function () {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType:3,
          click:true
        })
      })
    },
    destroyed () {
    },
    components: {
      Loading,
	  Back,
    },
    methods:{
    }
  }
</script>
<style scoped lang="scss">
  .main{
    padding-bottom: 0;
    &:before{
      background-color:#3a3845 ;
    }
    .header{
      .top{
        background-color:#3a3845 ;
        color:#FFF;
        font-size: 0.52rem;
        position: relative;
        i{
          font-size: 0.52rem;
        }
        a{
          position:absolute;
          padding:3px;
        }
        .left{
          left:0.325rem;
        }
        .right{
          right:0.325rem;
        }
      }
    }
    .wrapper{
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
    }
    .content{
      padding:0 0.45rem;
      .newLable{
        color: #01a600;
        font-size: 0.48rem;
        height:1.53rem;
        line-height: 1.53rem;
        border-bottom: 1px solid #f6f6f6;
        i{
          font-size:0.48rem;
        }
      }
      .lableList{
        border-bottom: 1px solid #f6f6f6;
        height: 1.54rem;
        line-height: 0.77rem;
        p:first-child{
          font-size: 0.46rem;
          color:#000;
          font-weight: normal;
          span{
            margin-left: 0.35rem;
          }
        }
        p:last-child{
          font-size: 0.44rem;
          color:#a1a1a1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .ulfooter{
        height:1.53rem;
        line-height: 1.53rem;
        font-size:0.36rem;
        text-align: center;
        color:#a1a1a1;
      }
    }


  }
</style>
