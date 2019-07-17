<template>
  <div class="shade" v-show="showPopover" @click="$emit('close')">
    <div>
      <transition enter-active-class="slideInDown" leave-active-class="slideOutDown">
        <div v-show="showPopover" class="popover" @click.stop>
          <div>
            <p>性别</p>
            <div>
              <span @click="sex=''" :class="{active:sex==''}">不限</span>
              <span @click="sex=2" :class="{active:sex==2}">男</span>
              <span @click="sex=1" :class="{active:sex==1}">女</span>
            </div>
          </div>
		  <div>
            <p><i class="sex_icon"></i>年龄</p>
            <div>
              <span @click="ageVal=''" :class="{active:ageVal==''}">不限</span>
              <span @click="expandAge" :class="{active:ageVal==1}" class="age" style="width: 50%;">{{ageText==""?"请选择年龄段":ageText}}</span> 
              <group style="display: none">
                <popup-picker title="年龄" :data="ageList" :columns="2" v-model="ageArr" ref="agePicker" :show.sync="shAge"></popup-picker>
              </group>
            </div>
          </div>
		  <div>
            <p>地区</p>
            <div>
              <span @click="selectLocation=''" :class="{active:location==''}">不限</span>
              <span @click="showPlacePicker" :class="{active:location==1}" style="width: 50%;">{{place===''?'选择地点':place}}</span>
            </div>
            <group style="display: none">
              <popup-picker :data="areaData" :columns="2" v-model="selectArea"  @on-hide="onHide" show-name ref="placePicker" :show.sync="shPlacePicker" :popup-style="{zIndex:1000}"></popup-picker>
            </group>
          </div>
          <div>
            <p>认证</p>
            <div>
              <span @click="auth" :class="{active:withoutAuth}">不限</span>
              <span @click="authentication.idcard==1?authentication.idcard='':authentication.idcard=1" :class="{active:authentication.idcard}">身份认证</span>
              <span @click="authentication.car==1?authentication.car='':authentication.car=1" :class="{active:authentication.car}">车辆认证</span>
              <span @click="authentication.video==1?authentication.video='':authentication.video=1" :class="{active:authentication.video}">视频认证</span>
              <span @click="authentication.house==1?authentication.house='':authentication.house=1" :class="{active:authentication.house}">房产认证</span>
              <span @click="authentication.health==1?authentication.health='':authentication.health=1" :class="{active:authentication.health}">健康认证</span>
            </div>
          </div>
          <button @click="makesure">确定</button>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import {PopupPicker, Group} from 'vux'

  const COMPONENT_NAME = 'filtercpt'

  export default {
    name: COMPONENT_NAME,
    props: {
      showPopover: {
        type: Boolean,
        default: false,
      },
	  showFilter: {
		type: Boolean,
		default: false,
	  },
	  location: "",     
    },
    components: {
      PopupPicker,
      Group,
    },
    data() {
      return {
        sex: "",//性别搜索，1女2男。没有传入空的
        authentication: {//房产认证，选中为1,没有选中为空
          idcard: "",
          car: "",
          house: "",
          health: "",
          video: "",
        },
		ageVal:"",
        ageList: [],//列表
        ageArr: [],//选中的数组
        ageLVal: null,//联动显示的值
        ageRVal: null,//联动显示的值
        ageText: '',//获取值相应的文字
        shAge: false,
		
		shPlacePicker: false,
		areaData: [],
		place: '',
		//selPlace: '',
		selectLocation:'',
		selectArea:[],
      }
    },
    computed: {
      withoutAuth() {
        return this.authentication.idcard == "" && this.authentication.car == "" && this.authentication.house == "" && this.authentication.health == "" && this.authentication.video == ""
      },
    },
    watch: {
		ageArr() {
			if (this.$refs.agePicker) {
			  this.ageText = this.$refs.agePicker.getNameValues();
			  this.ageLVal = this.ageArr[0];
			  this.ageRVal = this.ageArr[1];
			  if(this.ageLVal==-1 &&  this.ageRVal==-1){
				this.ageText = "不限";
				this.ageLVal = "";
				this.ageRVal = "";
			  }else if(this.ageLVal==-1 && this.ageRVal>=19){
				this.ageText = this.ageRVal + '岁以下';
				this.ageLVal = "";
				this.ageRVal = this.ageArr[1];
			  }else if(this.ageLVal>=19 && this.ageRVal==-1) {
				this.ageText = this.ageLVal + '岁以上';
				this.ageLVal = this.ageArr[0];
				this.ageRVal = "";
			  }else if(this.ageLVal>=19 && this.ageRVal >=19) {
				this.ageText = this.ageLVal+'-'+ this.ageRVal +"岁";
				this.ageLVal = this.ageArr[0];
				this.ageRVal = this.ageArr[1];
			  }
			}
		  },
		  selectLocation(val) {
			if(val==''){
				this.place='';
				//this.selectArea=[];
			}
            this.$emit("changeLocation", val);
          },
		  place(val){
			this.$emit("changePlace", val);
		  },
		  selectArea(val) {
            if (this.$refs.placePicker) {
              this.place = this.$refs.placePicker.getNameValues();
             // let placeArr = this.place.split(' ');
              //this.selPlace = placeArr[0] + "·" + placeArr[1]
            }
          },
    },
    mounted() {
		let ageArr = [];
      for (let i = 18; i <= 60; i++) {
        if(i==18){
          ageArr.push({
            name: '不限',
            value: '-1',
            parent: '0'
          })
          for (let k=i+1;k<=60;k++) {
            ageArr.push({
              name: k + '岁',
              value:  k+"",
              parent: "-1"
            })
          }
        }else{
          ageArr.push({
            name: i + '岁',
            value: i+"",
            parent: '0'
          })
          ageArr.push({
            name: '不限',
            value: "-1",
            parent: i+""
          })
          for (let k=i+1;k<=60;k++) {
            ageArr.push({
              name: k + '岁',
              value:  k+"",
              parent: i+""
            })
          }
        }
      }
      this.ageList = ageArr;
	  this.getLocation();
    },
    methods: {
		async getLocation(){
			const t=this;
			let district = await this.$server.getDistrict();
			let areaData = district.data.data;
			t.areaData=areaData;
			try{
				let loc = await this.$store.dispatch("getMylocation");
				  if(loc.province || loc.city){
				  let proId = null;
				  let cityId = null;
				  this.placeholder= loc.province.substring(0,2) + '·' + loc.city.substring(0,2);
				  for (let i = 0; i < areaData.length; i++){
					if (loc.province.substring(0, 2).indexOf(areaData[i].name)!= -1) {
					  proId = areaData[i].value;
					  break;
					}
				  }
				  for (let j = 0; j < areaData.length; j++){
					if (loc.city.substring(0, 2).indexOf(areaData[j].name)!= -1) {
					  cityId = areaData[j].value;
					  break;
					}
				  }
				  this.location = 1;
				  this.selectArea = [proId,cityId];
				}
			}catch(e){
				console.log(e);
			}
		  },
		onHide(closeType){
			if(!closeType&&this.place==''){
				this.selectLocation='';
			}
		},
		showPlacePicker(){
			this.selectLocation=1;
			this.shPlacePicker=!this.shPlacePicker;
		  },
		expandAge(){
			this.ageVal = 1;
			this.shAge = true;
		},
      auth() {
        this.authentication.idcard = "";
        this.authentication.car = "";
        this.authentication.house = "";
        this.authentication.health = "";
        this.authentication.video = "";
      },
      makesure() {
        this.$emit('makesure', {sex:this.sex,idcard:this.authentication.idcard,car:this.authentication.car,house:this.authentication.house,health:this.authentication.health,video:this.authentication.video,minAge:this.ageLVal,maxAge:this.ageRVal,liveAreaId:this.selectLocation==''?'':this.selectArea[1],location:this.location})
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
          width: 46%;
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
