<template>
<div class="main jy_all_top jy_new_love jy_state_top jy_setsort">
	<div class="header">
		<div class="top">
			<a class="left" @click="close"><i class="iconfont">&#xe613;</i></a><a @click="makesure" class="right">确定</a><p>筛选</p>
		</div>
	</div>
	<div class="jy_setsort_list jy_setsort_list_new">
		<template v-if="keytype.sex">
		<!--<p class="jy_setsort_tit">性别</p>
		<div class="jy_setsort_ul">
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:sex==-1}" @click="sex=-1"><i>不限</i></div>
			<div class="jy_setsort_li jy_setsort_li_third " :class="{cur:sex==2}" @click="sex=2"><i>男</i></div>
			<div class="jy_setsort_li jy_setsort_li_third " :class="{cur:sex==1}" @click="sex=1"><i>女</i></div>
		</div>-->
		<div class="jy_setsort_line">
			<span>性别</span>
			<p><i @click="sex=-1" :class="{cur:sex==-1}">不限</i><i @click="sex=1" :class="{cur:sex==1}">女</i><i @click="sex=2" :class="{cur:sex==2}">男</i></p>
		</div>
		</template>
		<template v-if="keytype.place">
			<!--<p class="jy_setsort_tit">地区</p>
			<div class="jy_setsort_ul">
				<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:location==0}" @click="location=0"><i>不限</i></div>
				<div class="jy_setsort_li jy_setsort_li_two jy_setsort_li_jt" :class="{cur:location==1}" @click="showPlacePicker"><i>{{place===''?'请选择地区':place}}</i></div>
			</div>-->
			<div class="jy_setsort_select" @click="showPlacePicker">
				<span>地区</span>
				<p>{{place}}</p>
			</div>
		<!--<group style="display: none">
		  <popup-picker :data="areaData" :columns="areaColumns" v-model="selectArea" show-name ref="placePicker" :show.sync="shPlacePicker"></popup-picker>
		</group>-->
		<group style="display: none">
            <popup-picker title="地区" :data="areaData" :columns="areaColumns" v-model="selectArea" ref="placePicker" :show.sync="shPlacePicker"></popup-picker>
          </group>
		  
		</template>
		<template v-if="keytype.income">
			<!--<p class="jy_setsort_tit">收入范围</p>
			<div class="jy_setsort_ul">
				<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:income==-1}" @click="incomeReArr=[-1,-1]"><i>不限</i></div>
				<div class="jy_setsort_li jy_setsort_li_two jy_setsort_li_jt" :class="{cur:income!=-1}" @click="showIncome"><i>{{incomeReText===''?'请选择收入范围':incomeReText}}</i></div>
			</div>-->
			<div class="jy_setsort_select" @click="showIncome">
				<span>收入范围</span>
				<p>{{incomeReText}}</p>
			</div>
		<group style="display: none">
            <popup-picker title="收入范围" :data="incomeReList" :columns="2" v-model="incomeReArr" ref="incomeRePicker" :show.sync="shIncomeRe"></popup-picker>
          </group>
		</template>
		<template v-if="keytype.date">
		<p class="jy_setsort_tit">时间</p>
		<div class="jy_setsort_ul">
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:datingTime==0}" @click="datingTime=0"><i>不限</i></div>
			<div class="jy_setsort_li jy_setsort_li_two jy_setsort_li_jt" :class="{cur:datingTime==1}" @click="shStartDate=true;datingTime=1"><i>{{startDate===''?'请选择时间':startDate+'~'+endDate}}</i></div>
		</div>
    <group style="display: none">
      <datetime v-model="startDate" @on-confirm="startConfirm" :start-date="startseDate" :end-date="endseDate" year-row="{value}年" month-row="{value}月" day-row="{value}日"  :show.sync="shStartDate"></datetime>
    </group>
    <group style="display: none">
      <datetime v-model="endDate" @on-confirm="endConfirm" :start-date="startseDate" :end-date="endseDate" year-row="{value}年" month-row="{value}月" day-row="{value}日" :show.sync="shEndDate"></datetime>
    </group>
	</template>
	
		<template v-if="keytype.blindType">
		<p class="jy_setsort_tit">类型</p>
		<div class="jy_setsort_ul ">
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:specialTypeVal==''}" @click="specialTypeVal=''"><i>不限</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:specialTypeVal==1}" @click="specialTypeVal=1"><i>普通</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:specialTypeVal==2}" @click="specialTypeVal=2"><i>大龄</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:specialTypeVal==3}" @click="specialTypeVal=3"><i>硕博</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:specialTypeVal==4}" @click="specialTypeVal=4"><i>公务员</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:specialTypeVal==5}" @click="specialTypeVal=5"><i>白领</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:specialTypeVal==6}" @click="specialTypeVal=6"><i>it从业人员</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:specialTypeVal==7}" @click="specialTypeVal=7"><i>高精尖人才</i></div>
		</div>
		</template>
		 
		<template v-if="keytype.auth">
		<p class="jy_setsort_tit">认证</p>
		<div class="jy_setsort_ul ">
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:withoutAuth}" @click="auth"><i>不限</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:authentication.idcard == 1}" @click="authentication.idcard = authentication.idcard==1?0:1"><i class="jy_icon_sort">&#xe69c;</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:authentication.house == 1}" @click="authentication.house = authentication.house==1?0:1"><i class="jy_icon_sort">&#xe69e;</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:authentication.video == 1}" @click="authentication.video = authentication.video==1?0:1"><i class="jy_icon_sort">&#xe697;</i></div>
			<div class="jy_setsort_li jy_setsort_li_third" :class="{cur:authentication.car == 1}" @click="authentication.car = authentication.car==1?0:1"><i class="jy_icon_sort">&#xe69f;</i></div>
			
		</div>
		</template>
		<template v-if="keytype.edu">
		<p class="jy_setsort_tit">学历</p>
		<div class="jy_setsort_ul">
      <div v-for="item in result" class="jy_setsort_li jy_setsort_li_third" :class="{cur:education==item.value}" @click="education=item.value"><i>{{item.label}}</i></div>
		</div>
		</template>
		<template v-if="keytype.height">
			<div class="jy_setsort_select" @click="shHeightRe=true">
				<span>身高要求</span>
				<p>{{minHeight==-1?'不限':heightReText}}</p>
			</div>
			<group style="display: none">
				<popup-picker title="身高要求" :data="heightReList" v-model="heightReArr" ref="heightRePicker" :show.sync="shHeightRe"></popup-picker>
			  </group>
		</template>
		<template v-if="keytype.age">
			<div class="jy_setsort_select" @click="shAge=true">
				<span>年龄要求</span>
				<p>{{minAge==-1&&maxAge==-1?'不限':ageText}}</p>
			</div>
			<group style="display: none">
				<popup-picker title="年龄要求" :data="ageList" :columns="2" v-model="ageArr" ref="agePicker" :show.sync="shAge"></popup-picker>
			  </group>
		</template>
		<template v-if="keytype.distance">
			<!--<p class="jy_setsort_tit">距离</p>
			<div class="jy_setsort_ul">
			<div v-for="item in distanceArr" class="jy_setsort_li jy_setsort_li_third" :class="{cur:distance==item.val}" @click="distance=item.val"><i>{{item.text}}</i></div>
			</div>-->
			<div class="jy_setsort_line">
				<span>距离</span>
				<p><i v-for="item in distanceArr" :class="{cur:distance==item.val}" @click="distance=item.val">{{item.text}}</i></p>
			</div>
		</template>
	</div>
</div>
</template>
<script>
import {PopupPicker,Group,Datetime} from 'vux'
export default {
	name: 'setSort',
	props: {
      showStartDate: {
        type: Boolean,
        default: false,
      },
	  showEndDate: {
        type: Boolean,
        default: false,
      },
	  showHeightRe: {
        type: Boolean,
        default: false,
      },
	  showAge: {
        type: Boolean,
        default: false,
      },
	  placePicker: {
        type: Boolean,
        default: false,
      },
	  showIncomeRe: {
        type: Boolean,
        default: false,
      },
	  keytype:{
		type: Object,
        default: function () {
			return {}
		  },
	  },
	  areaColumns:{
		type: Number,
        default:3
	  },
	  showSex:{
		type: Number,
        default:-1
	  },
    },
	data () {
		return {
		  datingTime: 0,//1选择0不限
		  shStartDate:false,
		  shEndDate:false,
		  startDate: '',
		  endDate: '',
		  shPlacePicker:false,
		  areaData: [],
		  selectArea: [],
		  location: 0,//1选择0不限
		  place: '不限',
		  sex:-1,
		  areaId:null,
		  beginActivityStarttime:null,
		  endActivityStarttime:null,
		  authentication: {//认证信息0不需要1需要
			idcard: 0,
			car: 0,
			house: 0,
			video: 0,
		  },
		  education:-1,
		  minHeight:-1,//-1表示无要求
		  minAge:-1,//
		  maxAge:-1,//
		  result:[],//学历枚举
			income:-1,
			minIncome:0,
			maxIncome:0,
			incomeReList: [
			  {name: '不限', value: '-1', parent: 0},
			  {name: '2千元', value: '2000', parent: 0},
			  {name: '4千元', value: '4000', parent: 0},
			  {name: '6千元', value: '6000', parent: 0},
			  {name: '1万元', value: '10000', parent: 0},
			  {name: '2万元', value: '20000', parent: 0},
			  {name: '5万元', value: '50000', parent: 0},

			  {name: '不限', value: '-1', parent: '-1'},
			  {name: '2千元', value: '2000', parent: '-1'},
			  {name: '4千元', value: '4000', parent: '-1'},
			  {name: '6千元', value: '6000', parent: '-1'},
			  {name: '1万元', value: '10000', parent: '-1'},
			  {name: '2万元', value: '20000', parent: '-1'},
			  {name: '5万元', value: '50000' , parent: '-1'},

			  {name: '不限', value: '-1', parent: '2000'},
			  {name: '4千元', value: '4000', parent: '2000'},
			  {name: '6千元', value: '6000', parent: '2000'},
			  {name: '1万元', value: '10000', parent: '2000'},
			  {name: '2万元', value: '20000', parent: '2000'},
			  {name: '5万元', value: '50000' , parent: '2000'},

			  {name: '不限', value: '-1', parent: '4000'},
			  {name: '6千元', value: '6000', parent: '4000'},
			  {name: '1万元', value: '10000', parent: '4000'},
			  {name: '2万元', value: '20000', parent: '4000'},
			  {name: '5万元', value: '50000' , parent: '4000'},

			  {name: '不限', value: '-1', parent: '6000'},
			  {name: '1万元', value: '10000', parent: '6000'},
			  {name: '2万元', value: '20000', parent: '6000'},
			  {name: '5万元', value: '50000' , parent: '6000'},

			  {name: '不限', value: '-1', parent: '10000'},
			  {name: '2万元', value: '20000', parent: '10000'},
			  {name: '5万元', value: '50000' , parent: '10000'},

			  {name: '不限', value: '-1', parent: '20000'},
			  {name: '5万元', value: '50000' , parent: '20000'},

			  {name: '不限', value: '-1', parent: '50000'},
			],//列表
			
			incomeReArr: [],//选中的数组
			incomeReLVal: null,//联动显示的值
			incomeReRVal: null,//联动显示的值
			incomeReText: '不限',//获取值相应的文字
			shIncomeRe: false,
			distance:-1,
			distanceArr:[{text:"不限",val:-1},{text:"10km",val:10000},{text:"20km",val:20000},{text:"50km",val:50000}],
			specialTypeVal:'',//类型
			
			heightReList: [[
			  {name: '不限', value: '-1'},
			  {name: '150cm及以上', value: '150'},
			  {name: '155cm及以上', value: '155'},
			  {name: '160cm及以上', value: '160'},
			  {name: '165cm及以上', value: '165'},
			  {name: '170cm及以上', value: '170'},
			  {name: '175cm及以上', value: '175'},
			  {name: '180cm及以上', value: '180'},
			  {name: '185cm及以上', value: '185'},
			  {name: '190cm及以上', value: '190'},
			  {name: '195cm及以上', value: '195'},
			  {name: '200cm及以上', value: '200'},
			  {name: '205cm及以上', value: '205'},
			  {name: '210cm及以上', value: '210'},
			]],//列表
			heightReArr: [],//选中的数组
			//heightReLVal: null,//联动显示的值
			//heightReRVal: null,//联动显示的值
			heightReText: '',//获取值相应的文字
			shHeightRe: false,
			
			ageList: [],//列表
			ageArr: [],//选中的数组
			//ageLVal: null,//联动显示的值
			//ageRVal: null,//联动显示的值
			ageText: '',//获取值相应的文字
			shAge: false,
			
			//liveReList: [],//列表
			//liveReArr: [],//选中的数组
			//liveReCityId: null,//联动显示的值
			//liveReAreaId: null,//联动显示的值
			//liveReText: '',//获取值相应的文字
		}
	},
  components: {
    PopupPicker,
    Group,
    Datetime,
  },
  computed: {
    withoutAuth() {
      return this.authentication.idcard == 0 && this.authentication.car == 0 && this.authentication.house == 0 && this.authentication.video == 0
    },
	startseDate: function () {
        return this.$utils.format(new Date(), 'yyyy-MM-dd');
    },
	endseDate: function () {
        return this.$utils.getIntervalDate(this.$utils.format(new Date(), 'yyyy-MM-dd'), 90);
    },
  },
	watch:{
		showSex(val){
			this.sex=val;
		},
		incomeReArr() {
			if (this.$refs.incomeRePicker) {
			  this.incomeReText = this.$refs.incomeRePicker.getNameValues();
			  this.incomeReLVal = this.incomeReArr[0];
			  this.incomeReRVal = this.incomeReArr[1];
			  if(this.incomeReLVal== -1 &&  this.incomeReRVal==-1){
				this.income=-1;
				this.incomeReText = "不限";
			  }else if(this.incomeReLVal==-1 && this.incomeReRVal >= 2000){
				this.incomeReText = this.incomeReRVal + '元以下';
			  }else if(this.incomeReLVal>= 2000 && this.incomeReRVal==-1) {
				this.incomeReText =this.incomeReLVal + '元以上';
			  }else if(this.incomeReLVal>= 2000 && this.incomeReRVal >= 2000) {
				this.incomeReText = this.incomeReLVal+'-'+ this.incomeReRVal+"元";
			  }
			}
		  },
		shPlacePicker(val){//地区
			this.$emit("shPlacePicker",val);
		},
		shStartDate(val){//时间
			this.$emit("shStartDate",val);
		},
		shEndDate(val){//时间
			this.$emit("shEndDate",val);
		},
		shIncomeRe(val){//收入
			this.$emit("shIncomeRe",val);
		},
		shHeightRe(val){//身高
			this.$emit("shHeightRe",val);
		},
		shAge(val){//年龄
			this.$emit("shAge",val);
		},
		
		placePicker(val){
			this.shPlacePicker=val;
		},
		showStartDate(val){
			this.shStartDate=val;
		},
		showEndDate(val){
			this.shEndDate=val;
		},
		showHeightRe(val){
			this.shHeightRe=val;
		},
		showAge(val){
			this.shAge=val;
		},
		
		showIncomeRe(val){
			this.shIncomeRe=val;
		},
    /*startDate(newv){
      if(newv){
       setTimeout(()=>{
		this.shEndDate=true;
	   },350)
      }
    },
    endDate(newv){
      if(newv){
        let start = new Date(this.startDate.replace("-", "/").replace("-", "/"));
        let end = new Date(newv.replace("-", "/").replace("-", "/"));
        if (end < start) {
          this.$vux.toast.show({
            type: "text",
            text: "开始日期不能大于结束日期",
            position: "bottom",
            width: "2rem",
          });
		  this.datingTime=0;
        }
      }
    },*/
		selectArea(newv){
		  /*console.log(newv)
		  if(this.$refs.placePicker){
			this.place = this.$refs.placePicker.getNameValues();
		  }
		  this.areaId = newv[this.areaColumns-1]||null;
		  */
		  if (this.$refs.placePicker) {
			  let text = this.$refs.placePicker.getNameValues();
			  let splitTextArr =  text.split(' ');
			  let liveReCityId = newv[0];
			  let liveReAreaId = newv[1];
			  if(liveReCityId== -2 &&  liveReAreaId==-2){
				this.place = "不限";
				this.areaId = -1;
				this.location=0;
			  }else if(liveReCityId>= 0 && liveReAreaId==-2) {
				this.place = splitTextArr[0] + '范围内';
				this.areaId = liveReCityId;
				this.location=1;
			  }else if(liveReCityId>= 0 && liveReAreaId >= 0) {
				this.place = splitTextArr[0]+ ' ' + splitTextArr[1];
				this.areaId=liveReAreaId;
				this.location=1;
			  }
			}
			
			
		},
		heightReArr() {//身高要求
			if (this.$refs.heightRePicker) {
			  this.heightReText = this.$refs.heightRePicker.getNameValues();
			  if(this.heightReArr[0]==-1){
				this.minHeight = -1;
			  }else{
				this.minHeight = this.heightReArr[0];
			  }
			}
		},
		ageArr() {
			if (this.$refs.agePicker) {
			  this.ageText = this.$refs.agePicker.getNameValues();
			  this.minAge = this.ageArr[0];
			  this.maxAge = this.ageArr[1];
			  if(this.minAge==-1 &&  this.maxAge==-1){
				this.ageText = "不限";
			  }else if(this.minAge==-1 && this.maxAge>=19){
				this.ageText = this.maxAge + '岁以下';
			  }else if(this.minAge>=19 && this.maxAge==-1) {
				this.ageText = this.minAge + '岁以上';
			  }else if(this.minAge>=19 && this.maxAge >=19) {
				this.ageText = this.minAge+'-'+ this.maxAge + "岁";
			  }
			}
		},
	},
	async mounted () {
		let ageArr = [];
      for (let i = 18; i <= 60; i++) {
        if(i==18){
          ageArr.push({
            name: '不限',
            value: '-1',
            parent: '0'
          })
          ageArr.push({
            name: '不限',
            value: "-1",
            parent: "-1"
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
	  
		let result = await this.$server. enum({
		  type:'ExpEducationEnum'
		})
		this.result = result.data.data
		this.getArea();
		
	},
	destroyed () {
		
	},
	methods:{
		async getArea(){
			const t=this;
			try{
				let listData = await t.$server.getDistrict();
				let areaData = t.$utils.deepCopy(listData.data.data);
				areaData.unshift({name: '不限', value: '-2', parent: '0' });
				let city=areaData.filter((v,i)=>{
					return v.parent==0;
				})
				for (let i=city.length;i--;){
					areaData.unshift({name: '不限', value: '-2', parent: city[i].value });
				}
				t.areaData=areaData;
			}catch(e){
				console.log("获取地区出错"+JSON.stringify(e));
			}
		},
		startConfirm(){
			const t=this;
			if(t.startDate){
				setTimeout(()=>{
					this.shEndDate=true;
				},350)
			}
		},
		endConfirm(){
			const t=this;
			if(t.endDate){
				let start = new Date(t.startDate.replace("-", "/").replace("-", "/"));
				let end = new Date(t.endDate.replace("-", "/").replace("-", "/"));
				if (end < start) {
				  t.$vux.toast.show({
					type: "text",
					text: "开始日期不能大于结束日期",
					position: "bottom",
					width: "2rem",
				  });
				  t.startDate='';
				  t.endDate='';
				  t.datingTime=0;
				}
			}
		},
    showPlacePicker(){
      this.location=1;
      this.shPlacePicker=!this.shPlacePicker;
    },
	showIncome(){
		this.income=1;
		this.shIncomeRe=!this.shIncomeRe;
	},
    auth() {
      this.authentication.idcard = 0;
      this.authentication.car = 0;
      this.authentication.house = 0;
      this.authentication.video = 0;
    },
    close(){
      this.$emit('close',false)
    },
    async makesure() {
      let obj={}
      if(this.location==0?null:this.areaId){
        obj=await this.$store.dispatch('getCoordsFromName',(this.place.split(" "))[1],(this.place.split(" "))[2])
      }  
      let result={
        lat:obj.lat?obj.lat:null,
        lon:obj.lon?obj.lon:null,
        sex:this.sex,
		location:this.location,
        areaId:this.location==0?null:this.areaId,
        beginActivityStarttime:this.datingTime==0?null:this.startDate,
        endActivityStarttime:this.datingTime==0?null:this.endDate,
        authentication:this.authentication,
        education:this.education,
        minHeight:this.minHeight,
        minAge:this.minAge,
        maxAge:this.maxAge,
		minIncome:this.incomeReLVal,
		maxIncome:this.incomeReRVal,
		distance:this.distance,
		specialTypeVal:this.specialTypeVal,
		selPlace:this.place?(this.place.split(' '))[0] + "·" + (this.place.split(' '))[1]:'',
		selectArea:this.selectArea,
		datingTime:this.datingTime,
      }
      this.$emit('makesure', result)
    },
	}
}
</script>
<style lang="scss" scoped>
  .main{
    position: absolute;
    top:0;
    z-index: 410;
  }
</style>
