<template>
  <div class="main jy_all_top jy_baiduMap">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <a class="left" @click="hidden"><i class="iconfont">&#xe613;</i></a>
        <p>位置</p>
      </div>
    </div>
    <baidu-map class="baiduMap_map"
               :center="center"
               :zoom="zoom"
               :pageCapacity="100"
               :double-click-zoom="false"
               :pinch-to-zoom="true"
    >
      <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label v-if="location" :content="contentHtml" :labelStyle="{fontSize : '18px',border:'1px solid #72ACE3'}" :offset="{width: -150,height:width}"/>
      </bm-marker>
    </baidu-map>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Loading from '@other/loading.vue';
  import BaiduMap from 'vue-baidu-map'
  import Back from '@other/back.vue';
  import {store} from '../../store/index';
  import {Group, PopupPicker, TransferDom, Popup} from 'vux'

  Vue.use(BaiduMap, {
    ak: store.state.baiduKey
  })
  export default {
    name: 'chatWindowMap',//baiduMap这名字跟地图冲突
    props: ["center","location","address"],
    directives: {
      TransferDom
    },
    components: {
      Back,
      Loading,
      Group,
      PopupPicker,
      Popup
    },
    data() {
      return {
        isloading: false,
        zoom: 18,
      }
    },
    computed: {
      width(){
        let res=Math.ceil(this.address.length/16)*30+30
        return -res||0;
      },
      contentHtml(){
        let html=`<i style='display:block;width:300px;text-align:center;'>${this.location}</i><i style='display:block;width:300px;white-space: normal;'>${this.address}</i>`
        console.log()
        return html;
      },
    },
    async mounted() {
        console.log(this.center)
    },
    methods: {
      hidden(){
        this.$emit('hidden');
      },
      tilesloaded() {
        const t = this;
        if (t.map) {
          clearTimeout(t.moveTimeout);
          t.moveTimeout = setTimeout(() => {
            //t.center=t.map.getCenter();
            if (!t.notMove) {
              t.searchCenter = t.map.getCenter();
            }
          }, 50);
        }
      },
      async setCurPos() {
        const t = this;
        try {
          let location = await t.$store.dispatch("getMylocation");
          if (location.city) {
            t.notMove = false;
            /*let convertor = new t.BMap.Convertor();
                      convertor.translate([{lng :location.lon,lat :location.lat}], 1, 5, (data)=>{
                          console.log("坐标转换:"+JSON.stringify(data));
                          t.center={
                              lng :data.points[0].lng,
                              lat :data.points[0].lat,
                          }
                          t.curPos.lng=data.points[0].lng;
                          t.curPos.lat=data.points[0].lat;
                      })*/
            t.center = {
              lng: location.poiList[0].coord.lon,
              lat: location.poiList[0].coord.lat,
            }
            t.curPos = location;
            //console.log("当前位置:"+JSON.stringify(t.curPos));
            t.uid = location.poiList && location.poiList[0].uid;
          } else {
            t.$vux.toast.show({
              type: "text",
              text: "定位失败",
              position: "bottom",
              width: "2rem",
            });
          }
        } catch (e) {
          t.$vux.toast.show({
            type: "text",
            text: "定位失败",
            position: "bottom",
            width: "2rem",
          });
        }
      },
      setAdress(address) {//点击列表定位
        const t = this;
        t.notMove = true;
        t.center = address.point;
        t.uid = address.uid;
        t.$emit('address', address);
      },
      searchcomplete(LocalResult) {//location/nearby改变时触发
        const t = this;
        if (LocalResult) {
          let length = LocalResult.length;
          let addressList = [];
          if (length) {
            for (let i = 0; i < length; i++) {
              addressList.push(...LocalResult[i]["Ar"]);
            }
          } else {
            addressList.push(...LocalResult["Ar"]);
          }
          let has = {};
          let fAdress = addressList.filter((v, i) => {
            let curHas = false;
            if (has[v.uid]) {
              curHas = true;
            }
            has[v.uid] = true;
            if (t.curPos) {
              return v.type == 0 && v.title != t.curPos.poiList[0].name && !curHas;
            }
            return v.type == 0 && !curHas;
          });
          fAdress.sort((a, b) => {
            return Math.sqrt(Math.pow(Math.abs(a.point.lat - t.searchCenter.lat) * 10000, 2) + Math.pow(Math.abs(a.point.lng - t.searchCenter.lng) * 10000, 2)) - Math.sqrt(Math.pow(Math.abs(b.point.lat - t.searchCenter.lat) * 10000, 2) + Math.pow(Math.abs(b.point.lng - t.searchCenter.lng) * 10000, 2));
          });
          console.log("搜索结果列表:" + fAdress.length);
          t.addressList = fAdress;
          $(".jy_baiduMap_list").animate({"scrollTop": 0}, 0);
          t.isloading = false;
        } else {
          t.isloading = false;
        }
      },
      addZoom(flag) {//地图缩放大小
        let zoom = this.zoom;
        if (flag) {
          zoom++;
        } else {
          zoom--;
        }
        this.zoom = zoom > 19 ? 19 : zoom < 5 ? 5 : zoom;
      },
      async handler({BMap, map}) {
        const t = this;
        t.BMap = BMap;
        t.map = map;
        //t.center=t.map.getCenter();
        t.localSearch = new BMap.LocalSearch(map, {
          onSearchComplete(result) {
            //console.log("result:"+JSON.stringify(result))
            t.searchcomplete(result);
            t.geocoder.getLocation(t.searchCenter, function (res) {
              if (res) {
                t.location = res.addressComponents.city;
              }
            });
          }
        });
        t.geocoder = new BMap.Geocoder();//逆地址解析
        //map.setCenter(t.center);
      },
      dragstart(type, target, pixel, point) {
        this.notMove = false;
        this.uid = null;
      },
    },
    destroyed() {

    }
  }
</script>
<style scoped>
  .baiduMap_map{
    height: 100%;
  }
</style>
