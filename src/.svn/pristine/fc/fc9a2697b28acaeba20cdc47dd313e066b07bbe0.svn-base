<template>
<div class="main jy_all_top jy_gift ">
	<Loading v-if="isloading"></Loading>
	<div class="header">
		<div class="top">
			<Back class="left"><i class="iconfont">&#xe613;</i></Back>
      <a @click="filter" class="right"><i>筛选</i></a>我的礼物
		</div>
    <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="请选择礼物类型" :data="pickerData" v-model="type"></popup-picker>
	</div>
	<dl class="jy_gift_list">
		<dt><em id="menu_bar"></em><i v-for="item,index in menu" @click.stop="tabMenu($event,index)">{{item}}</i></dt>
		<dd>
			<myScroller :style="$store.state.isBrowser?'padding:2.75rem 0 0;':'padding:3.65rem 0 0;'" :infinite="infinite" :noDataText="noDataText" :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" ref="myScroller">
			
			<!--<div class="jy_gift_s">-->
				<!--<h4>{{tabIndex==0?'收到':'送出'}}的礼物</h4>-->
				<!--<p>共{{tabIndex==0?'收到':'送出'}}{{count}}个礼物</p>-->
			<!--</div>-->
			<ul class="gift_ul"  v-if="transList">
				<template v-if="tabIndex==0">
					<li v-for="item,index in transList">
            <div>
              <i class="jy_gift_img" :style="'background-image:url('+$utils.getFullPath(item.user.headimgAttachmentId)+')'"></i>
              <div>
                <h4>{{item.user.aliasName}}<em class="jy_auth_age">
                  <i class="iconfont" v-if="item.user.sex==2">&#xe605;</i>
                  <i class="iconfont" v-else>&#xe64a;</i>
                  {{item.user.age}}</em></h4>
                <p v-if="item.type==2"><span>赠送{{item.commodityGift.commodityName}}</span>
                  <em class="shiwu">实物</em>
                </p>
                <p v-else><span>{{item.remark}}</span>
                  <em v-if="item.type==1" class="xuni">虚拟</em>
                  <em v-else class="mianfei">免费</em>
                </p>
                <span>{{item.giftTime}}</span>
              </div>
              <div v-if="item.type==2">
                <p v-if="item.commodityGift.handle==1">已收货</p>
                <p v-else-if="item.commodityGift.handle==2">已折现</p>
                <p v-else-if="item.commodityGift.handle==3">已拒绝</p>
                <p v-else>价格:{{item.commodityGift.commodityPrice}}元</p>
                <p></p>
              </div>
              <div v-else>
                <p>+{{item.receiverIncome}}元</p>
              </div>
            </div>
            <div class="button" v-if="item.type==2&&item.commodityGift.handle==0">
               <span @click="dogift(item,1)">接受</span>
               <span @click="dogift(item,2)">折现</span>
               <span @click="dogift(item,3)">拒绝</span>
            </div>
					</li>
				</template>
				<template v-else>
					<li v-for="item,index in transList">
            <div>
              <i class="jy_gift_img" :style="'background-image:url('+$utils.getFullPath(item.receiverUser.headimgAttachmentId)+')'"></i>
              <div>
                <h4>{{item.receiverUser.aliasName}}<em class="jy_auth_age">
                  <i class="iconfont" v-if="item.receiverUser.sex==2">&#xe605;</i>
                  <i class="iconfont" v-else>&#xe64a;</i>
                  {{item.receiverUser.age}}</em></h4>
                <p v-if="item.type==2"><span>赠送{{item.commodityGift.commodityName}}</span>
                  <em class="shiwu">实物</em>
                </p>
                <p v-else><span>{{item.remark}}</span>
                  <em v-if="item.type==1" class="xuni">虚拟</em>
                  <em v-else class="mianfei">免费</em>
                </p>
                <span>{{item.giftTime}}</span>
              </div>
              <div v-if="item.type==2">
                <p v-if="item.commodityGift.handle==1">已收货</p>
                <p v-else-if="item.commodityGift.handle==2">已折现</p>
                <p v-else-if="item.commodityGift.handle==3">已拒绝</p>
                <p >￥{{item.commodityGift.commodityPrice}}元</p>
                <p></p>
              </div>
              <div v-else>
                <img class="gift_g" :src="$utils.getFullPath(item.img)"></img>
              </div>
            </div>
					</li>
				</template>
			</ul>
			</myScroller>
		</dd>
	</dl>
  <div v-transfer-dom>
    <x-dialog v-model="showAddress" hide-on-blur class="dialog-chooseThemes" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
      <div class="chooseThemes">
        <p><i class="iconfont" @click.stop="showAddress=!showAddress">&#xe7de;</i><span>选择收货地址</span><span @click.stop="toNewAddress">添加新地址</span></p>
        <div class="itemindex" v-for="item in addressList" @click.stop="selectAddress=item">
          <i class="iconfont" :class="{select:item.address_id==selectAddress.address_id}">&#xe646;</i>
          <div>
            <p><i>{{item.consignee}}</i><i>{{item.mobile}}</i></p>
            <p>{{item.province_name}}{{item.city_name}}{{item.district_name}}{{item.address}}</p>
          </div>
        </div>
        <div class="arrow" @click.stop="acceptGift">确定</div>
      </div>
    </x-dialog>
  </div>
  <transition enter-active-class="slideInUp" leave-active-class="slideOutUp">
    <div class="addNewAddress" v-if="pagerouter==='newAddress'" :style="{'height':pageHeight+'px'}">
      <div>
        <div class="header">
          <div class="top">
            <Back class="left"><i class="iconfont">&#xe613;</i></Back><a @click.stop="sure" class="right">确定</a><p>添加新地址</p>
          </div>
        </div>
        <div class="addContent">
          <div><label>收货人姓名</label><input type="text" v-model="scname"/></div>
          <div><label>省</label><span @click.stop="showShengPicker=!showShengPicker">{{shengName}}</span></div>
          <div><label>市</label><span @click.stop="showShiPicker=!showShiPicker">{{shiName}}</span></div>
          <div><label>区(县)</label><span @click.stop="showQuPicker=!showQuPicker">{{quName}}</span></div>
          <div><label>详细地址</label><input type="text" v-model="scaddress" placeholder="不需填写省市区"/></div>
          <div><label>联系方式</label><input type="text" v-model="scPhone" /></div>
        </div>
        <popup-picker :popup-style="{'z-index':'7000'}" :show.sync="showShengPicker" :show-cell="false" title="请选择省" :data="shengData" v-model="shengId" ref="picker1"></popup-picker>
        <popup-picker :popup-style="{'z-index':'7000'}" :show.sync="showShiPicker" :show-cell="false" title="请选择市" :data="shiData" v-model="shiId" ref="picker2"></popup-picker>
        <popup-picker :popup-style="{'z-index':'7000'}" :show.sync="showQuPicker" :show-cell="false" title="请选择区" :data="quData" v-model="quId" ref="picker3"></popup-picker>
      </div>
    </div>
  </transition>
</div>
</template>
<script>
import Loading from '@other/loading.vue';
import Back from '@other/back.vue';
import myScroller from '@other/myScroller.vue';
import { PopupPicker,TransferDom, Popup,XDialog} from 'vux'
export default {
	name: 'gift',
	data () {
		return {
      pageHeight:0,
      pagerouter:'main',
		  showAddress:false,//选择地址相关
      addressList:[],
      selectAddress:{},
      shengId:[],
      shengName:null,
      shiId:[],
      shiName:null,
      quId:[],
      quName:null,
      showShengPicker:false,
      showShiPicker:false,
      showQuPicker:false,
      shengData:[],
      shiData:[],
      quData:[],
      scname:null,
      scaddress:null,
      scPhone:null,
      selectGift:{},


			isloading:false,
			menu:["收到","送出"],
			pageNo:1,
			transList:null,
			isRead:false,
			isEnd:false,
			count:0,
			loadRefresh:true,//下拉刷新
			loadInfinite:true, //上拉加载
			isRefresh:false,
			tabIndex:-1,
			noDataText:"",
      type:['0'],
      pickerData:[[{name:'全部',value:'0'},{name:'虚拟',value:'1'},{name:'实物',value:'2'}]],
      showPopupPicker:false,
		}
	},
  beforeRouteUpdate (to, from, next) {
    next();
    this.pagerouter = to.params.pagerouter;
  },
  directives: {
    TransferDom
  },
	components: {
		Loading,
		Back,
		myScroller,
    PopupPicker,
    Popup,
    XDialog,
	},
	watch:{
		isEnd(val){
			const t=this;
			if(val){
				t.$refs.myScroller.finishInfinite(true);
			}else{
				//t.$refs.myScroller.scrollTo(1);
				t.$refs.myScroller.finishInfinite(false);
			}
		},
		async tabIndex(val){
			const t=this;
			let result;
			let isRefresh={};
			if(t.isRefresh){
				isRefresh={isRefresh:true};
			}
			if(val==0){
				result =await t.$server.giftCount({...isRefresh});
			}else{
				result =await t.$server.myGiftCount({...isRefresh});
			}
			t.count=result.data.data;
		},
		async isRefresh(val){
			if(val){
				const t=this;
				let result;
				let isRefresh={};
				if(val){
					isRefresh={isRefresh:true};
				}
				if(val==0){
					result =await t.$server.giftCount({...isRefresh});
				}else{
					result =await t.$server.myGiftCount({...isRefresh});
				}
				t.count=result.data.data;
			}
		},
    async type(newV){
		  this.refresh();
    },
    async showAddress(newV){
		  if(newV){
		    let list = await this.$server.getAppAddressList({
          Authorization:"Bearer " + this.$store.state.Authorization,
          act:'app_address_list',
        })
        if(list.data.list)
        this.addressList = list.data.list
      }else{
        this.selectAddress={};
      }
    },
    async shengId(newv){
		  if(newv.length==0){
		    return;
      }
      if(this.$refs.picker1){
        this.shengName = this.$refs.picker1.getNameValues();
      }
      this.shiId=[];
      this.shiData=[];
      this.shiName=null;
      this.quId=[];
      this.quData=[];
      this.quName=null;
      let list = await this.$server.getRegion({
        type:"2",
        parent:newv[0],
      })
      let arr=[]
      list.data.regions.map(v=>{
        arr.push({
          name:v.region_name,
          value:v.region_id,
        })
      })
      if(arr.length>0)
        this.shiData.push(arr)
    },
    async shiId(newv){
      if(newv.length==0){
        return;
      }
      if(this.$refs.picker2){
        this.shiName = this.$refs.picker2.getNameValues();
      }
      this.quId=[];
      this.quData=[];
      this.quName=null;
      let list = await this.$server.getRegion({
        type:"3",
        parent:newv[0],
      })
      let arr=[]
      list.data.regions.map(v=>{
        arr.push({
          name:v.region_name,
          value:v.region_id,
        })
      })
      if(arr.length>0)
        this.quData.push(arr)
    },
    quId(){
      if(this.$refs.picker3){
        this.quName = this.$refs.picker3.getNameValues();
      }
    },
	},
	mounted () {
	  this.pageHeight = document.body.clientHeight;
		const t=this;
		$("body").addClass("gray");
		t.tabIndex=0;
		t.tabMenu($("#menu_bar").siblings("i").eq(0)[0],t.tabIndex);
	},
	destroyed () {
		$("body").removeClass("gray");
	},
	methods:{
    async acceptGift(){
      if(!this.selectAddress.address_id){
        this.$vux.toast.show({
          type:"text",
          text: "请选择收货地址",
          position:"middle",
          width:"auto",
        });
        return;
      }
      this.showAddress=!this.showAddress
      if(!this.selectGift.commodityGift){
        this.$vux.toast.show({
          type:"text",
          text: "当前礼物选择错误，请返回重试",
          position:"middle",
          width:"auto",
        });
        return;
      }
      this.$vux.loading.show()
      let result=await this.$server.doGift({
        act:'order_accept',
        Authorization:"Bearer " + this.$store.state.Authorization,
        orderId:this.selectGift.commodityGift.orderId,
        Id:this.selectGift.commodityGift.id,
        addressId:this.selectAddress.address_id,
      })
      this.$vux.loading.hide()
      this.refresh();
    },
    async dogift(item,type){
      this.selectGift = item;
      if(type==1){
        this.showAddress=!this.showAddress
      }else if(type==2){//折现
        this.$vux.loading.show()
        let result=await this.$server.doGift({
          act:'order_discount',
          Authorization:"Bearer " + this.$store.state.Authorization,
          orderId:item.commodityGift.orderId,
          Id:item.commodityGift.id,
        })
        this.$vux.loading.hide()
        this.refresh();
      }else{//拒收
        this.$vux.loading.show()
        let result=await this.$server.doGift({
          act:'order_refuse',
          Authorization:"Bearer " + this.$store.state.Authorization,
          orderId:item.commodityGift.orderId,
          Id:item.commodityGift.id,
        })
        this.$vux.loading.hide()
        this.refresh();
      }
    },
    async toNewAddress(){
      this.$router.push({
        path:'/gift/newAddress'
      })
      let list = await this.$server.getRegion({
        type:"1",
        parent:'1',
      })
      let arr=[]
      list.data.regions.map(v=>{
        arr.push({
          name:v.region_name,
          value:v.region_id,
        })
      })
      if(arr.length>0)
      this.shengData.push(arr)
    },
    async sure(){
      if(!this.scname){
        this.$vux.toast.show({
          type:"text",
          text: "请填写收货人",
          position:"middle",
          width:"auto",
        });
        return;
      }
      if(this.shengId.length==0){
        this.$vux.toast.show({
          type:"text",
          text: "请选择省",
          position:"middle",
          width:"auto",
        });
        return;
      }
      if(this.shiId.length==0){
        this.$vux.toast.show({
          type:"text",
          text: "请选择市",
          position:"middle",
          width:"auto",
        });
        return;
      }
      if(this.quId.length==0){
        this.$vux.toast.show({
          type:"text",
          text: "请选择区(县)",
          position:"middle",
          width:"auto",
        });
        return;
      }
      let obj={
        act:'save_address',
        Authorization:"Bearer " + this.$store.state.Authorization,
        Consignee:this.scname,
        Province:this.shengId[0],
        City:this.shiId[0],
        Address:this.scaddress,
        Mobile:this.scPhone,
        District:this.quId[0],
      }
      if(!obj.Address){
        this.$vux.toast.show({
          type:"text",
          text: "请填写详细地址",
          position:"middle",
          width:"auto",
        });
        return;
      }
      if(!obj.Mobile){
        this.$vux.toast.show({
          type:"text",
          text: "请填写联系方式",
          position:"middle",
          width:"auto",
        });
        return;
      }
      this.$vux.loading.show()
      let result=await this.$server.saveAddress(obj)
      let list = await this.$server.getAppAddressList({
        Authorization:"Bearer " + this.$store.state.Authorization,
        act:'app_address_list',
      })
      this.$vux.loading.hide()
      if(list.data.list)
        this.addressList = list.data.list

      this.$router.go(-1);
    },
    filter(){
      this.showPopupPicker = !this.showPopupPicker;
    },
		tabMenu(e,index){
			const t=this;
			if(t.isRead){
				return false;
			}
			let target=e.target||e;
			let menu_bar=document.getElementById("menu_bar");
			menu_bar.style.cssText="transform:translateX("+(target.offsetLeft+target.offsetWidth/2)+"px);"+(e.target?"transition-duration:500ms":"transition-duration:0ms");
			if(e.target&&t.tabIndex!=index){
				t.getMyRechargeList(index);
			}
		},
		async getMyRechargeList(index){
			const t=this;
			if(t.isRead){
				return false;
			}
			t.isRead=true;
			t.noDataText='正在加载...';
			if(t.isRefresh||t.tabIndex!=index){
				if(t.tabIndex!=index){//切换
					t.transList=null;
					t.isEnd=false;//必需,要不然在切换时不显示加载效果
					t.$refs.myScroller.scrollTo(1);
				}
				t.pageNo=1;
				t.tabIndex=index;		
			}
			try{
				let result;
				let isRefresh={};
				if(t.isRefresh){
					isRefresh={isRefresh:true};
				}
				if(t.tabIndex==0){
					result=await t.$server.getUserGift({
						...isRefresh,
						page:t.pageNo,
						rows:t.$store.state.pageSize,
            type:parseInt(t.type[0]),
					});
				}else{
					result=await t.$server.getUserMyGift({
						...isRefresh,
						page:t.pageNo,
						rows:t.$store.state.pageSize,
            type:parseInt(t.type[0]),
					});
				}
				if(!t.transList||t.pageNo==1){
					t.transList=[];
				}
				if(result.data.list){
					t.transList.push(...result.data.list);
				}
				//t.count=result.data.count;
				if(result.data.count<=t.$store.state.pageSize*t.pageNo||result.data.list.length<t.$store.state.pageSize){//判断是否最后一页
					t.noDataText='已加载全部数据';
					t.isEnd=true;
				}else{
					t.isEnd=false;
					t.$refs.myScroller.finishInfinite(false);
				}
				t.pageNo++;
			}catch(e){
				t.noDataText='加载异常,请重试';
				t.isEnd=true;
			}
			t.isRead=false;
			//t.isloading=false;
			t.isRefresh=false;
		},
		infinite(done) {//上拉加载(防止初始内容不满一屏会无限加载)
			const t=this;
			if(t.isEnd){
				done(true);
				return false;
			}
			if(t.isRead){//必需,要不然在切换时不显示加载效果
				return false;
			}
			console.log("加载");
			t.getMyRechargeList(t.tabIndex).then(()=>{
				if(t.isEnd){
					done(true);
				}else{
					done();
				}
			});
		},
		refresh(done) {//下拉刷新
			const t=this;
			console.log("刷新");
			t.isRefresh=true;
			t.getMyRechargeList(t.tabIndex).then((res)=>{
        done&&done();
			});
		},
	}
}
</script>
<style lang="scss" scoped>
  @keyframes slideInUp {
    from {
      transform: translate3d(0, 100%, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideOutUp {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, 100%, 0);
    }
  }
  .slideInUp {
    animation-name: slideInUp;
  }

  .slideOutUp {
    animation-name: slideOutUp;
  }
  .slideOutUp, .slideInUp {
    animation-duration: 0.3s;
  }
  .top{
    .right{
      i{
        font-size: 0.42rem;
      }
    }
  }
  .gift_ul{
    li{
      margin: 0.15rem 0;
      &>div:first-child{
        height: 2.2rem;
        display: flex;
        align-items: center;
        padding: 0 0.4rem;
        position: relative;
        background-color: #FFF;
        i{
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          background-size: cover;
          background-position:center;
        }
        &>div:nth-of-type(1){
          margin-left: 0.3rem;
          h4{
            color:#8b8b8b;
            font-size: 0.46rem;
            font-weight: 300;
            em{
              font-size: 0.28rem!important;
              i{
                font-size: 0.22rem!important;
              }
            }
          }
          p{
            font-size: 0.36rem;
            display: flex;
            align-items: center;
            span{
              display: inline-block;
              max-width: 5.5rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            em{
              margin-left: 5px;
              height: 0.36rem;
              display: inline-flex;
              align-items: center;
              border-radius: 0.18rem;
              padding: 0 0.2rem;
              font-size: 0.28rem;
              color:#FFF;
            }
            .xuni{background-color: #63843d;}
            .shiwu{background-color: #13b5b1;}
            .mianfei{background-color: #63843d;}
          }
          span{
            color:#b4b4b4;
            font-size: 0.32rem;
          }
        }
        &>div:nth-of-type(2){
          position:absolute;
          right: 0.4rem;
          p{
            text-align: right;
            color: #9a9a9a;
          }
          p:last-child{
            color: #ff7e00;
          }
          .gift_g{
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }
      &>div.button{
        background-color: #FFF;
        padding: 0 0.4rem;
        border-top: 1px solid #f2f2f2;
        text-align: right;
        height: 1.6rem;
        line-height: 1.6rem;
        font-size: 0.4rem;
        color:#FFF;
        span{
          padding: 0.25rem 0.45rem;
          background-color: #ff7e00;
          margin-left: 0.35rem;
          border-radius: 0.45rem;
        }
        span:last-child{
          background-color: #aeaeae;
        }
      }
    }
  }
  .chooseThemes{
    margin: 0 auto;
    background-color: #FFF;
    font-size: 0.48rem;
    width: 10rem;
    border-radius: 8px;
    overflow: hidden;
    &>p{
      display: flex;
      height: 1.42rem;
      line-height: 1.42rem;
      padding: 0 0.2rem;
      i{
        width: 2rem;
        text-align: left;
      }
      span:nth-of-type(1){
        flex-grow: 1;
      }
      span:last-child{
        width: 2rem;
        font-size: 0.26rem;
        text-align: right;
      }
    }
    &>div.itemindex{
      padding: 0 0.2rem;
      height: 2.17rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px #f2f2f2 solid;
      &>i{
        width: 0.81rem;
        height: 0.81rem;
        border-radius: 50%;
        border:1px solid #d9d9d9;
        color: #FFF;
        &.select{
          background-color: #8a8a8a;
        }
      }
      &>div{
        width: 7.92rem;
        text-align: left;
        color: #848484;
        p{
          font-size: 0.4rem;
          i:first-child{
            font-weight: 500;
            color: #000;
          }
          i:last-child{
            font-size: 0.36rem;
            margin-left: 0.25rem;
          }
        }
      }
    }
    &>.arrow{
      height: 1rem;
      line-height: 1rem;
      background-color: #ff7e00;
      color: #FFF;
    }
  }
  .addNewAddress{
    position: absolute;
    width: 100%;
    background-color: #fff;
    top:0;
    z-index: 6000;
    padding-top: 2.14rem;
    box-sizing: border-box;
    overflow: hidden;
    &>div{
      position:relative;
    }
    .addContent{
      padding: 0 0.4rem;
      &>div{
        padding: 0.3rem 0;
        font-size: 0.45rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f2f2f2;
        input,span{
          width: 60%;
          font-size: 0.4rem!important;
          color:#848484;
        }
      }
    }
    .vux-cell-box:not(:first-child):before{
      width: 0!important;
      height: 0!important;
      border-top: none;
    }
  }
  .jy_isBrowser{
    .addNewAddress{
      padding-top: 1.39rem;
    }
  }
</style>
