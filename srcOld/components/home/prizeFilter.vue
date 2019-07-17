<template>
  <div class="shade" v-show="showPopover" @click="$emit('close')">
    <div>
      <transition enter-active-class="slideInDown" leave-active-class="slideOutDown">
        <div v-show="showPopover" class="popover" @click.stop>
          <div>
            <p>地区</p>
            <div>
              <span @click="location=''" :class="{active:location==''}">不限</span>
              <span @click="showPlacePicker" :class="{active:location==1}" style="width: 50%;">{{place===''?'选择地点':place}}</span>
            </div>
            <group style="display: none">
              <popup-picker :data="areaData" :columns="3" v-model="selectArea" show-name ref="placePicker" :show.sync="shPlacePicker"></popup-picker>
            </group>
          </div>
          <div>
            <p>约会时间</p>
            <div>
              <span @click="datingTime=''" :class="{active:datingTime==''}">不限</span>
              <div @click="datingTime=1" :class="{active:datingTime==1}" class="date_range">
                <span class="startDate" @click="shStartDate=true">{{startDate}}</span><span class="jgf">~</span><span class="endDate" @click="shEndDate=true">{{endDate}}</span>
              </div>
              <group style="display: none">
                <datetime v-model="startDate" :class="{active:datingTime==1}" @on-confirm="onConfirm" :show.sync="shStartDate"></datetime>
              </group>
              <group style="display: none">
                <datetime v-model="endDate" :class="{active:datingTime==1}" @on-confirm="onConfirm" :show.sync="shEndDate"></datetime>
              </group>
            </div>
          </div>
          <div>
            <p>性别</p>
            <div>
              <span @click="sex=''" :class="{active:sex==''}">不限</span>
              <span @click="sex=2" :class="{active:sex==2}">男</span>
              <span @click="sex=1" :class="{active:sex==1}">女</span>
            </div>
          </div>
          <div>
            <p>活动方式</p>
            <div>
              <span @click="datingThemes=''" :class="{active:datingThemes==''}">不限</span>
              <span @click="datingThemes=1" :class="{active:datingThemes==1}">旅行</span>
              <span @click="datingThemes=2" :class="{active:datingThemes==2}">吃饭</span>
              <span @click="datingThemes=3" :class="{active:datingThemes==3}">电影</span>
              <span @click="datingThemes=4" :class="{active:datingThemes==4}">唱歌</span>
              <span @click="datingThemes=5" :class="{active:datingThemes==5}">运动</span>
              <span @click="datingThemes=99" :class="{active:datingThemes==99}">其他</span>
            </div>
          </div>
          <button @click="makesure">确定</button>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import {PopupPicker, Group, Datetime} from 'vux'

  export default {
    name: 'prizeFilter',
    props: {
      showPopover: {
        type: Boolean,
        default: false,
      }
    },
    components: {
      PopupPicker,
      Group,
      Datetime,
    },
    data() {
      return {
        location: "",//1选择""不限
        shPlacePicker: false,
        areaData: [],
        selectArea: [],
        place: '',
        selPlace: '',
        datingTime: "",//1选择""不限
        shStartDate: false,
        shEndDate: false,
        startDate: this.getToday(),
        endDate: this.getToday(),
        sex: "",//性别搜索，1女2男。没有传入空的
        datingThemes: "",
      }
    },
    computed: {},
    watch: {
      selectArea() {
        if (this.$refs.placePicker) {
          this.place =  this.$refs.placePicker.getNameValues();
          let placeArr = this.place.split(' ');
          for (let i in placeArr){
            this.selPlace = placeArr[0] + " " + placeArr[2]
          }
        }
      },
    },
    mounted() {
      this.getDistrict();
    },
    methods: {
      close() {
        this.$emit('close', false)
      },
      async getDistrict() {
        let listData = await this.$server.getDistrict();
        this.areaData = listData.data.data;
      },
      showPlacePicker() {
        this.location = 1;
        this.shPlacePicker = !this.shPlacePicker;
      },
      getToday() {//获取当前月第一天
        let myDate = new Date();
        let year = myDate.getFullYear();//获取当前年
        let yue = myDate.getMonth() + 1;//获取当前月
        let ri = myDate.getDate();//获取当前日
        return year + '-' + yue + '-' + ri;
      },
      onConfirm() {
        let start = new Date(this.startDate.replace("-", "/").replace("-", "/"));
        let end = new Date(this.endDate.replace("-", "/").replace("-", "/"));
        if (end < start) {
          this.$vux.toast.show({
            type: "text",
            text: "开始日期不能大于结束日期",
            position: "bottom",
            width: "2rem",
          })
          return false;
        }
      },
      afterLeave() {

      },
      makesure() {
        this.$emit('makesure', this.sex,this.location,this.selectArea, this.datingTime, this.startDate, this.endDate, this.datingThemes,this.selPlace)
      },
    }
  }
</script>
<style scoped lang="scss">
  @keyframes slideInDown {
    from {
      transform: translate3d(0, -100%, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideOutDown {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, -100%, 0);
    }
  }

  .slideInDown {
    animation-name: slideInDown;
  }

  .slideOutDown {
    animation-name: slideOutDown;
  }

  .slideOutDown, .slideInDown {
    animation-duration: 0.3s;
  }

  .shade {
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
    overflow: hidden;
    & > div {
      overflow: hidden;
      top: 3.14rem;
      height: 100%;
      position: relative;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .popover {
    background-color: #efefef;
    padding: 0 0.5rem;
    & > div {
      color: #908f92;
      p {
        height: 1.4rem;
        line-height: 1.4rem;
        font-size: 0.36rem;
        font-weight: 500;
      }
      div {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        &:after {
          content: "";
          width: 20%;
        }
        span {
          font-size: 0.34rem;
          width: 23%;
          height: 0.76rem;
          line-height: 0.76rem;
          text-align: center;
          margin-bottom: 0.34rem;
          box-sizing: border-box;
          &.active {
            background-color: #fff;
            border-radius: 5px;
            border: 1px solid #70c466;
            color: #70c466;
          }
        }
      }
    }
    .date_range {
      width: 70%;
      height: 0.76rem;
      line-height: 0.76rem;
      text-align: center;
      &.active {
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #70c466;
        color: #70c466 !important;
      }
      span {
        &.jgf {
          width: 5%;
        }
        &.startDate {
          position: relative;
          width: 40%;
          &:after {
            content: "";
            width: 0.34rem;
            height: 0.34rem;
            background: url("../../images/calendar_icon.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 0.18rem;
            right: -0.1rem;
          }
        }
        &.endDate {
          position: relative;
          width: 40%;
          text-align: left;
          &:after {
            content: "";
            width: 0.34rem;
            height: 0.34rem;
            background: url("../../images/calendar_icon.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 0.18rem;
            right: 0.4rem;
          }
        }
      }
    }
    button {
      height: 1.13rem;
      line-height: 1.13rem;
      width: 100%;
      margin-bottom: 0.54rem;
      border: 1px solid #d4d4d4;
      color: #70c466;
      background-color: #fff;
    }
  }

</style>
