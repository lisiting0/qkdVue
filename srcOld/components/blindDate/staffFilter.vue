<template>
  <div class="shade" v-show="showFilter" @click="$emit('close')">
    <div>
      <transition enter-active-class="slideInDown" leave-active-class="slideOutDown">
        <div class="filterPopover" v-show="showFilter" @click.stop>
			 <div>
            <p><i class="sex_icon"></i>性别</p>
            <div>
              <span v-for="item,index in sex" @click.stop="sexVal=index" :class="{active:sexVal==index}">{{item}}</span>
            </div>
          </div>
		  
          <div>
            <p><i class="sex_icon"></i>年龄</p>
            <div>
              <span @click="ageVal=''" :class="{active:ageVal==''}">不限</span>
              <span @click="expandAge" :class="{active:ageVal==1}" class="age">{{ageText==""?"请选择年龄段":ageText}}</span>
              <group style="display: none">
                <popup-picker title="年龄" :data="ageList" :columns="2" v-model="ageArr" ref="agePicker" :show.sync="shAge"></popup-picker>
              </group>
            </div>
          </div>
		   <div>
            <p><i class="sex_icon"></i>身高</p>
            <div>
              <span @click="heightVal=-1" :class="{active:heightVal==-1}">不限</span>
			  <span @click="shHeightRe=true" :class="{active:heightVal!=-1}" class="age">{{heightVal==-1?"请选择身高":getHeightVal(heightVal)}}</span>
			  <group style="display: none">
				<popup-picker title="身高" :data="heightReList" v-model="heightReArr" ref="heightRePicker" :show.sync="shHeightRe"></popup-picker>
			  </group>	
			  </div>
          </div>
		   <div>
            <p><i class="sex_icon"></i>收入</p>
            <div>
              <span @click="incomeVal=-1" :class="{active:incomeVal==-1}">不限</span>
              <span @click="shIncome=true" :class="{active:incomeVal!=-1}" class="age">{{incomeVal==-1?"请选择收入范围":getIncomeVal(incomeVal)}}</span>
              <group style="display: none">
				<popup-picker title="收入" :data="incomeList" v-model="incomeArr" ref="incomePicker" :show.sync="shIncome"></popup-picker>
			  </group>
            </div>
          </div>
          <div>
            <p><i class="verification_icon"></i>学历</p>
            <div>
              <span @click="educationVal=''" :class="{active:educationVal==''}">不限</span>
              <span @click="educationVal=10" :class="{active:educationVal==10}">大专及以上</span>
              <span @click="educationVal=11" :class="{active:educationVal==11}">本科及以上</span>
              <span @click="educationVal=12" :class="{active:educationVal==12}">硕士及以上</span>
              <span @click="educationVal=13" :class="{active:educationVal==13}">博士及以上</span>
            </div>
          </div>
          <button @click="filterMakesure">确定</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {PopupPicker, Group, Datetime} from 'vux'
  export default {
    name: "staffFilter",
    props: {
      showFilter: {
        type: Boolean,
        default: false,
      }
    },
    components: {
      PopupPicker,
      Group,
    },
    data() {
      return {
        ageVal:"",
        ageList: [],//列表
        ageArr: [],//选中的数组
        ageLVal: null,//联动显示的值
        ageRVal: null,//联动显示的值
        ageText: '',//获取值相应的文字
        shAge: false,
        educationVal:"",
        educationText:"",
        educationTextArr:{10:'大专及以上',11:'本科及以上',12:'硕士及以上',13:'博士及以上'},
		sex:["不限","女","男"],
		sexVal:0,
		minHeight:-1,//最小身高
		maxHeight:-1,//最大身高
		heightVal:-1,
		heightReArr:[],
		heightReList: [[
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
		shHeightRe:false,
		
		minIncome:-1,//最低收入
		maxIncome:-1,//最高收入
		incomeVal: -1,//获取值相应的文字
		incomeArr: [],//选中的数组
		incomeList: [[
          {name: '2千以下', value: '1'},
          {name: '2-4千元', value: '2'},
          {name: '4-6千元', value: '3'},
          {name: '6千-1万元', value: '4'},
          {name: '1-1.5万元', value: '5'},
          {name: '1.5-2万元', value: '6'},
          {name: '2-2.5万元', value: '7'},
          {name: '5万以上', value: '8'},
        ]],
		shIncome:false,
      }
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
	  heightVal(val){
		const t=this;
		if(val==-1){
			t.maxHeight=-1;
			t.minHeight=-1;
		}
	  },
	  heightReArr() {
		const t=this;
        if (t.$refs.heightRePicker) {
          t.heightVal=t.heightReArr[0];
          if(t.heightReArr[0]!=-1){
            t.minHeight=t.heightReArr[0];
			t.maxHeight=-1;
          }
        }
      },
	  incomeVal(val){
		const t=this;
		if(val==-1){
			t.maxIncome=-1;
			t.minIncome=-1;
		}
	  },
	  incomeArr() {
        if (this.$refs.incomePicker) {
          this.incomeVal = this.incomeArr[0];
          if(this.incomeArr[0] == '1'){
            this.minIncome = -1;
            this.maxIncome = 2000;
          }else if(this.incomeArr[0] == '2'){
            this.minIncome = 2000;
            this.maxIncome = 4000;
          }else if(this.incomeArr[0] == '3'){
            this.minIncome = 4000;
            this.maxIncome = 6000;
          }else if(this.incomeArr[0] == '4'){
            this.minIncome = 6000;
            this.maxIncome = 10000;
          }else if(this.incomeArr[0] == '5'){
            this.minIncome = 10000;
            this.maxIncome = 15000;
          }else if(this.incomeArr[0] == '6'){
            this.minIncome = 15000;
            this.maxIncome = 20000;
          }else if(this.incomeArr[0] == '7'){
            this.minIncome = 20000;
            this.maxIncome = 25000;
          }else if(this.incomeArr[0] == '8'){
            this.minIncome = 50000;
            this.maxIncome = -1;
          }
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
    },
    methods: {
		getHeightVal(height){
			const t=this;
			let heightVal=t.heightReList[0].filter(val=>{
				return val.value==height
			});	
			if(heightVal.length>0){
				return heightVal[0].name;
			}
			return "";
		},
		getIncomeVal(income){
			const t=this;
			let incomeVal=t.incomeList[0].filter(val=>{
				return val.value==income;
			});
			if(incomeVal.length>0){
				return incomeVal[0].name;
			}
			return "";
		},
      expandAge(){
        this.ageVal = 1;
        this.shAge = true;
      },
      close(){
        this.$emit('close',false)
      },
      filterMakesure() {
          this.$emit('filterMakesure', this.ageVal,this.ageLVal,this.ageRVal,this.ageText,this.educationVal,this.educationTextArr[this.educationVal],this.sexVal,this.sex[this.sexVal],this.minHeight,this.maxHeight,this.getHeightVal(this.heightVal),this.minIncome,this.maxIncome,this.getIncomeVal(this.incomeVal));
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

  //浏览器预览的css
  .jy_isBrowser{
    .shade {
      & > div {
        top: 3.13rem;
      }
    }
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
      top: 3.88rem;
      height: 100%;
      position: relative;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .filterPopover {
    background-color: #efefef;
	max-height:80%;
	overflow-x:hidden;
	overflow-y:auto;
    padding: 0 0.5rem;
    & > div {
      color: #908f92;
      padding: 0.1rem 0;
      border-bottom: 1px solid #b9b9b9;
      &:last-of-type {
        border-bottom: none;
      }
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
        span {
          font-size: 0.34rem;
          width: 23%;
          height: 0.76rem;
          line-height: 0.76rem;
          text-align: center;
          margin-bottom: 0.2rem;
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
    .age{
      width: 70%;
      height: 0.76rem;
      line-height: 0.76rem;
      text-align: center;
      &.active{
        background-color:#fff;
        border-radius: 5px;
        border: 1px solid #70c466;
        color: #70c466 !important;
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
