<template>
  <div class="main jy_all_top" @click="open=false">
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>
        <p>活动地址</p>
      </div>
    </div>
    <div class="openMap" v-show="open">
      <a :href ="'http://apis.map.qq.com/uri/v1/marker?marker=coord:'+lon+ ',' +lat+'&name='+address+'&src=yellowpage&coordinate=gaode&callnative=1'" target="_blank">腾讯地图</a>
      <a :href ="'http://uri.amap.com/marker?position='+lon+ ',' +lat+'&name='+address+'&src=yellowpage&coordinate=gaode&callnative=1'" target="_blank">高德地图</a>
    </div>
    <div class="footer">
      <p>[位置]</p>
      <p style="font-size: 0.4rem;color: #c0c0c0;">{{detailAddress}}</p>
    </div>
  </div>
</template>
<script>
  import Back from '@other/back.vue';
  import { TransferDom, Popup, } from 'vux'

  export default {
    name: "addressMap",
    directives: {
      TransferDom
    },
    data() {
      return {
        city: null,
        address: null,
        detailAddress: null,
        open: false,
        lon: null,
        lat: null,
      }
    },
    components: {
      Back,
      Popup,
    },
    mounted()  {
      this.city = this.$route.query.city;
      this.address = this.$route.query.address;
      this.getLocationMap();
    },
    destroyed(){
      let bMap = window.api.require('bMap');
      bMap.close();
    },
    methods: {
      getLocationMap(){
        const _this = this;
        let bMap = window.api.require('bMap');
        bMap.open({
          rect: {
            x: 0,
            y: 62,
            w: api.winWidth,
            h: api.winHeight-150
          },
          zoomLevel: 15,//设置百度地图缩放等级，取值范围:3~18级
          showUserLocation: true,//是否在地图上显示用户位置
          fixedOn: api.frameName,//模块视图添加到指定 frame 的名字(只指 frame，传 window 无效)
          fixed: true
        }, function(ret, err) {
          if (ret.status) {
            console.log('地图打开成功');
          }
        });
        bMap.searchInCity({
          city: _this.city,
          keyword: _this.address,
          pageIndex: 0,
          pageCapacity: 20
        }, function(ret, err) {
          if (ret.status) {
            console.log('根据地址获取经纬度');
            console.log(JSON.stringify(ret));
            _this.lon = ret.results[0].lon;
            _this.lat = ret.results[0].lat;
           _this.detailAddress = ret.results[0].name+"（"+ret.results[0].address+"）"
            bMap.setCenter({
              coords: {
                lon: _this.lon,
                lat: _this.lat
              },
              animation: false
            });
            //添加标注
            // bMap.addAnnotations({
            //   annotations : [{
            //     id : 1,
            //     lon : _this.lon,
            //     lat : _this.lat
            //   }],
            //   icon : 'widget://',
            //   draggable : true
            // }, function(ret) {
            //   console.log('添加标注');
            //   if (ret && ret.eventType == "click") {
            //     bMap.setBubble({
            //       id: ret.id,
            //       content: {
            //         title: '位置',
            //         subTitle: _this.address,
            //         w:400
            //       },
            //       styles: {
            //         titleColor: '#000',
            //         titleSize: 14,
            //         subTitleColor: '#999',
            //         subTitleSize: 14,
            //         illusAlign: 'left'
            //       }
            //     }, function(ret) {
            //       if (ret) {
            //         alert(JSON.stringify(ret));
            //       }
            //     });
            //     bMap.popupBubble({
            //       id: ret.id
            //     });
            //   }
            // });
            bMap.addBillboard({
              id: 4,
              coords: {
                lon : _this.lon,
                lat : _this.lat
              },
              content: {
                title: '位置',
                subTitle: _this.detailAddress,
              },
              styles: {
                titleColor: '#000',
                titleSize: 14,
                subTitleColor: '#999',
                subTitleSize: 14,
                illusAlign: 'left',
              }
            }, function(ret) {
              if (ret) {
                if( _this.open){
                  _this.open = false;
                }else{
                  _this.open = true;
                }
                alert(JSON.stringify(ret));
              }
            });
          } else {
            alert("根据地址搜索出错");
          }
        });

      },
    }
  }
</script>

<style scoped lang="scss">
  .openMap{
    width:100%;height:2.2rem;position: fixed;bottom:0;left:0;z-index: 601;text-align: left;background-color: #ffffff;font-size: 0.48rem;padding: 0.2rem 0.4rem;
    a{
      display: block;
      font-size: 0.44rem;
      line-height: 1.18rem;
      color: #999999;
    }
  }
  .footer{
    width:100%;height:1.6rem;position: fixed;bottom: 0;left:0;z-index: 600;padding: 0.4rem 0.4rem;text-align: left;background-color: #ffffff;font-size: 0.48rem;
    p{
      line-height: 0.8rem;
      &:nth-of-type(1){
        font-size: 0.5rem;
        color: #000000;
        font-weight: 500;
      }
      &:nth-of-type(2){
        font-size: 0.4rem;
        color: #999999;
      }
    }
  }
</style>
