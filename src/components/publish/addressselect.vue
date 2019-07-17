<template>
  <div class="main jy_all_top jy_state_top">
    <div class="header">
      <div class="top">
        <a class="left" @click.stop="hidden"><i class="iconfont">&#xe613;</i></a><a class="right" @click="submitAddress">确定</a><p>添加地址</p>
      </div>
    </div>
    <div class="address_panel">
      <div class="address_con" @click="shAddress=true">
        <div>活动城市</div>
        <div>{{addressText==""?"请选择": addressText}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
        <group style="display: none">
          <popup-picker title="活动城市" :data="addressList" :columns="2" v-model="addressArr" ref="addressPicker" :show.sync="shAddress" :popup-style="{zIndex:1000}"></popup-picker>
        </group>
      </div>
      <div class="address_con">
        <div style="width: 100%;"><input type="text" v-model="addressDetailText" placeholder="请填写具体地点" style="font-size: 0.44rem;color: #bababa;"></div>
      </div>
      <p class="address_ex">例如：xx假日酒店2楼溪下厅</p>
    </div>
  </div>
</template>
<script>
  import {TransferDom, Group, Popup, PopupPicker, XDialog ,Datetime ,CheckIcon,InlineXSwitch } from 'vux';
  export default {
    name: 'addressselect',
    directives: {
      TransferDom
    },
    components: {
      Group,
      Popup,
      PopupPicker,
      XDialog,
      Datetime,
      CheckIcon,
      InlineXSwitch
    },
    data() {
      return {
        shAddress: false,
        addressText: '',
        addressCityId: 0,
        addressAreaId: 0,
        addressDetailText: '',
        addressList: [],
        addressArr: [],
      }
    },
    computed: {
    },
    watch:{
      addressArr(){
        if (this.$refs.addressPicker) {
          this.addressText = this.$refs.addressPicker.getNameValues();
          this.addressCityId = this.addressArr[0];
          this.addressAreaId = this.addressArr[1];
        }
      },
    },
    mounted() {
      this.getDistrict();
    },
    methods: {
      submitAddress(){
        if (!this.addressText) {
          this.$vux.toast.show({
            type: "cancel",
            text: "活动城市不能为空",
            position: "middle",
            width: "auto",
          });
          return;
        }
        if (!this.addressDetailText) {
          this.$vux.toast.show({
            type: "cancel",
            text: "具体地点不能为空",
            position: "middle",
            width: "auto",
          });
          return;
        }
        this.shAddress = false;
        this.$emit('submitAddress', this.addressAreaId, this.addressText,this.addressDetailText);
      },
      hidden(){
        this.shAddress=false
        this.$emit('hidden');
      },
      goback() {
        this.$router.go(-1);
      },
      getFullPath(path) {
        return this.$utils.getFullPath(path)
      },
      async getDistrict() {
        let listData = await this.$server.getDistrict();
        this.addressList = listData.data.data;
      },
      selStore(id,name,city){
        this.$emit('selStore', id, name, city);
      },
    }
  }
</script>
<style scoped lang="scss">
  .main {
    padding-bottom: 0;
    &:before {
      background-color: #3a3845;
    }
    .header {
      position: fixed;
      width: 100%;
      z-index: 10;
      .top {
        background-color: #3a3845;
        color: #FFF;
        font-size: 0.6rem;
        position: relative;
        i {
          font-size: 0.52rem;
        }
        a {
          position: absolute;
          padding: 3px;
        }
        .left {
          left: 0.325rem;
        }
        .right {
          right: 0.325rem;
        }
      }
    }
    .search-header{
      width: 92%;
      background-color: #ffffff;
      padding: 0.2rem 0.4rem;
      border: 1px solid #F2F2F2;
      .tjsj-title{
        text-align: center;
        span{
          font-size: 0.44rem;
          color: #333333;
          position: relative;
          &:before{
            content: '';
            width: 40px;
            height: 2px;
            background: url("../../images/store_left_line.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 7px;
            left: -54px;
          }
          &:after{
            content: '';
            width: 40px;
            height: 2px;
            background: url("../../images/store_right_line.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 7px;
            right: -54px;
          }
        }
      }
      .filter-menu{
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 0 0.1rem;
        a{
          display: inline-block;
          font-size: 0.4rem;
          color: #8f8f8f;
          text-align: center;
          &.active{
            color: #333333;
          }
          i{
            font-size: 0.4rem;
            vertical-align: middle;
          }
        }
      }
    }
    .myscoll {
      background-color: #ffffff;
      .store-items{
        display: block;
        padding: 0.4rem;
        .store-li{
          padding: 0.2rem 0 0;
          background-color: #fff;
          position: relative;
          display: flex;

          .store-image{
            display: inline-block;
            vertical-align: top;
            width: 3rem;
            height: 3rem;
            div{
              width: 100%;
              height: 100%;
              background-size: cover;
              background-repeat: no-repeat;
              border-radius: 3px;
              background-position: center top;
            }
          }
          .store_desc{
            display: inline-block;
            padding: 0 0 0 0.27rem;
            width: 7rem;
            height: auto;
            .store_title{
              font-size: 0.4rem;
              color: #313140;
              font-weight: bold;
              span{
                font-size: 0.36rem;
                float: right;
                color: #939393;
                font-weight: normal;
              }
            }
            .store_info{
              height: 1.6rem;
              p{
                margin: 0;
                font-size: 0.32rem;
                color: #abaaaf;
                line-height: 0.8rem;
              }
              p:not(.store_title) {
                &:before {
                  content: "●";
                  color: #E0E0E0;
                  font-size: 0.24rem;
                  line-height: 2;
                  vertical-align: middle;
                  display: inline-block;
                  margin-right: 0.2rem;
                }
              }
            }
            .store-last{
              font-size: 0.32rem;
              color: #abaaaf;
              line-height: 0.9rem;
              .store-action{
                float: right;
                width: 2.6rem;
                height: 0.8rem;
                line-height: 0.8rem;
                border: 1px solid #ff4200;
                font-size: 0.4rem;
                color: #ff4200;
                border-radius: 0.2rem;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>
