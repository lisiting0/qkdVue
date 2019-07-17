<template>
  <div class="main jy_all_top jy_state_top">
    <div class="user-div">
      <Loading v-if="isloading"></Loading>
      <div class="header">
        <div class="top">
			<router-link class="left" replace :to="{name:'registrationStaff',query:{id:datingId}}" v-if="datingId&&$route.query.showMsg"><i class="iconfont">&#xe613;</i></router-link>
			<router-link class="left" replace :to="{name:'activityDetailStatic',query:{id:actId}}" v-else-if="actId"><i class="iconfont">&#xe613;</i></router-link>
          <Back v-else class="left"><i class="iconfont">&#xe613;</i></Back>
          <a class="right" style="font-size: 0.44rem;" @click="save">保存</a>修改资料
        </div>
      </div>

      <div class="userInfo_panel">
        <div class="userInfo_title">头像</div>
        <div class="userInfo_headImg">
          <selectPhoto :cutting="true" @fileBack="fileBackAvatar">
            <span class="noUploadPhoto" v-if="!headimgAttachmentId"></span>
            <span :style="'background-image:url('+getFullPath(headimgAttachmentId)+');'" v-else></span>
          </selectPhoto>
        </div>
      </div>
      <div class="photo-cls jy_user_img_group userInfo_panel">
        <div class="userInfo_title">封面</div>
        <ul class="jy_auth_up jy_feed_img user_img">
          <draggable v-model="feedImg" @update="dragEnd" :options="{animation:500}">
            <transition-group>
              <li v-for="(item,index) in feedImg" :style="'background-image:url('+getFullPath(item)+');'" :key="item">
                <i class="iconfont" @click.stop="deleteImg(index)">&#xe67c;</i>
              </li>
            </transition-group>
          </draggable>
          <selectPhoto v-if="feedMaxImg-feedImg.length>0" :amount="$store.state.isBrowser?feedMaxImg-feedImg.length:1" @fileBack="fileBack" :cutting="true">
            <li class="noUploadPhoto"></li>
          </selectPhoto>
        </ul>
        <div class="user_img_desc">拖拽可更改顺序，共6张</div>
      </div>
      <div class="userInfo_panel">
        <div class="userInfo_title">基本资料</div>
        <div class="userInfo_con" id="n_aliasName" @click="showAliasName=true">
          <div>昵称<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{aliasName}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
        </div>
        <div class="userInfo_con" id="n_birthday" @click="emptyBirthday?visibility=true:''">
          <div>出生日期<em class="isRequired" v-if="isRequired&&emptyBirthday">(必填)</em></div>
          <div>{{birthday}}</div>
		  <div v-if="emptyBirthday"><i class="iconfont">&#xe702;</i></div>
		  <group style="display: none" v-if="initMsg">
			<datetime v-model="birthday" :start-date="startDate" :end-date="endDate" confirm-text="确定" cancel-text="取消" :show.sync="visibility" :default-selected-value="endDate"></datetime>
		  </group>
        </div>
        <div class="userInfo_con" @click="shSelfLabel=true">
          <div>个性签名</div>
          <div>{{selfLabel===''?'个性签名？':selfLabel}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
        </div>
        <div class="userInfo_con" id="n_heightVal" @click="shHeight=true">
          <div>身高<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{heightText===''?"请选择": heightText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="身高" :data="heightList" v-model="heightArr" ref="heightPicker" :show.sync="shHeight"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_educationVal" @click="shEducation=true">
          <div>学历<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{educationText===''?'请选择':educationText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="学历" :data="educationList" v-model="educationArr" ref="educationPicker" :show.sync="shEducation"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_liveCityId" @click="shLive=true">
          <div>居住地<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{liveText===''?'住在哪里？':liveText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="居住地" :data="liveList" :columns="2" v-model="liveArr" ref="livePicker" :show.sync="shLive"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" @click="shSchool=true">
          <div>毕业院校</div>
          <div>{{school===''?'你的学校？':school}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
        </div>
        <div class="userInfo_con" id="n_profession" @click="shProfession=true">
          <div>职业<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{profession===''?'你的职业？':profession}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
        </div>
      </div>
      <div class="userInfo_panel">
        <div class="userInfo_title">私密资料</div>
        <div class="userInfo_con" id="n_name" @click="shName=true">
          <div>真实姓名<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{name}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
        </div>
        <div class="userInfo_con" id="n_cityId" @click="shPlace=true">
          <div>家乡<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{place===''?'来自哪里？':place}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="家乡" :data="liveList" :columns="2" v-model="placeArr" ref="placePicker" :show.sync="shPlace"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_emotion" @click="shEmotionalState=true">
          <div>婚姻状况<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{emotionalStateText===''?'请选择':emotionalStateText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="婚姻状况" :data="emotionalStateList" v-model="emotionalStateArr" ref="emotionalStatePicker" :show.sync="shEmotionalState"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_incomeLVal" @click="shIncome=true">
          <div>月收入<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{incomeText===''?'请选择':incomeText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="月收入" :data="incomeList" v-model="incomeArr" ref="incomePicker" :show.sync="shIncome"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_smokingVal" @click="shSmoking=true">
          <div>是否吸烟<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{smokingText===''?'请选择':smokingText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="是否吸烟" :data="smokingList" v-model="smokingArr" ref="smokingPicker"
                          :show.sync="shSmoking"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_drinkVal" @click="shDrink=true">
          <div>是否喝酒<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{drinkText===''?'请选择':drinkText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="是否喝酒" :data="drinkList" v-model="drinkArr" ref="drinkPicker" :show.sync="shDrink"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" @click="shChild=true">
          <div>子女情况</div>
          <div>{{childText===''?'请选择':childText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="子女情况" :data="childList" v-model="childArr" ref="childPicker" :show.sync="shChild"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_houseVal" @click="shHouse=true">
          <div>住房情况<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{houseText===''?'请选择':houseText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="住房情况" :data="houseList" v-model="houseArr" ref="housePicker" :show.sync="shHouse"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_carVal" @click="shCar=true">
          <div>购车情况<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{carText===''?'请选择':carText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="购车情况" :data="carList" v-model="carArr" ref="carPicker" :show.sync="shCar"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" @click="shRanking=true">
          <div>家中排行</div>
          <div>{{rankingText===''?'请选择':rankingText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="家中排行" :data="rankingList" v-model="rankingArr" ref="rankingPicker" :show.sync="shRanking"></popup-picker>
          </group>
        </div>
      </div>
      <div class="userInfo_panel">
        <div class="userInfo_title">择偶意向</div>
        <div class="userInfo_con" id="n_ageLVal" @click="shAge=true">
          <div>年龄<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{ageText===''?'请选择':ageText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="年龄" :data="ageList" :columns="2" v-model="ageArr" ref="agePicker" :show.sync="shAge"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_heightReLVal" @click="shHeightRe=true">
          <div>身高<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{heightReText===''?'请选择':heightReText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="身高要求" :data="heightReList" v-model="heightReArr" ref="heightRePicker" :show.sync="shHeightRe"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_educationReVal" @click="shEducationRe=true">
          <div>学历<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{educationReText===''?'请选择':educationReText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="学历" :data="educationReList" v-model="educationReArr" ref="educationRePicker" :show.sync="shEducationRe"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_incomeReLVal" @click="shIncomeRe=true">
          <div>收入情况<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{incomeReText===''?'请选择':incomeReText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="收入情况" :data="incomeReList" :columns="2" v-model="incomeReArr" ref="incomeRePicker" :show.sync="shIncomeRe"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_smokingReVal" @click="shSmokingRe=true">
          <div>是否吸烟<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{smokingReText===''?'请选择':smokingReText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="是否吸烟" :data="smokingReList" v-model="smokingReArr" ref="smokingRePicker" :show.sync="shSmokingRe"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_drinkReVal" @click="shDrinkRe=true">
          <div>是否喝酒<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{drinkReText===''?'请选择':drinkReText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="是否喝酒" :data="drinkReList" v-model="drinkReArr" ref="drinkRePicker" :show.sync="shDrinkRe"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_houseReVal" @click="shHouseRe=true">
          <div>住房情况<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{houseReText===''?'请选择':houseReText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="住房情况" :data="houseReList" v-model="houseReArr" ref="houseRePicker" :show.sync="shHouseRe"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_carReVal" @click="shCarRe=true">
          <div>购车情况<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{carReText===''?'请选择':carReText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="购车情况" :data="carReList" v-model="carReArr" ref="carRePicker" :show.sync="shCarRe"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" @click="shChildRe=true">
          <div>子女情况</div>
          <div>{{childReText===''?'请选择':childReText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="子女情况" :data="childReList" v-model="childReArr" ref="childRePicker" :show.sync="shChildRe"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" id="n_emotionStateReVal" @click="shEmotionalStateRe=true">
          <div>婚姻状况<em class="isRequired" v-if="isRequired">(必填)</em></div>
          <div>{{emotionalStateReText===''?'请选择':emotionalStateReText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="婚姻状况" :data="emotionalStateReList" v-model="emotionalStateReArr" ref="emotionalStateRePicker" :show.sync="shEmotionalStateRe"></popup-picker>
          </group>
        </div>
        <div class="userInfo_con" @click="shLiveRe=true">
          <div>居住地</div>
          <div>{{liveReText===''?'请选择':liveReText}}</div>
          <div><i class="iconfont">&#xe702;</i></div>
          <group style="display: none" v-if="initMsg">
            <popup-picker title="居住地" :data="liveReList" :columns="2" v-model="liveReArr" ref="liveRePicker" :show.sync="shLiveRe"></popup-picker>
          </group>
        </div>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showAliasName" hide-on-blur class="dialog-input" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
          <div class="input_content">
            <p class="input_title">昵称</p>
            <div class="input_con"><input type="text" placeholder="昵称" v-model="aliasName"></input></div>
            <div class="submitButton" @click="submitData('aliasName')">确定</div>
          </div>
        </x-dialog>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="shSelfLabel" hide-on-blur class="dialog-input" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
          <div class="input_content">
            <p class="input_title">个性签名</p>
            <div class="input_con"><textarea rows="5" placeholder="个性签名" v-model="selfLabel"></textarea></div>
            <div class="submitButton" @click="shSelfLabel=false">确定</div>
          </div>
        </x-dialog>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="shSchool" hide-on-blur class="dialog-input" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
          <div class="input_content">
            <p class="input_title">毕业院校</p>
            <div class="input_con"><input type="text" placeholder="毕业院校" v-model="school"></input></div>
            <div class="submitButton" @click="shSchool=false">确定</div>
          </div>
        </x-dialog>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="shProfession" hide-on-blur class="dialog-input" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
          <div class="input_content">
            <p class="input_title">职业</p>
            <div class="input_con"><input type="text" placeholder="职业" v-model="profession"></input></div>
            <div class="submitButton" @click="shProfession=false">确定</div>
          </div>
        </x-dialog>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="shName" hide-on-blur class="dialog-input" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
          <div class="input_content">
            <p class="input_title">真实姓名</p>
            <div class="input_con"><input type="text" placeholder="真实姓名" v-model="name"></input></div>
            <div class="submitButton" @click="submitData('name')">确定</div>
          </div>
        </x-dialog>
      </div>
    </div>
	<div class="dataPerfect_msg" v-if="$route.query.showMsg&&showMsg==true" @click.stop="showMsg=false">
		<div class="dataPerfect_msg_c" @click.stop="">
			<i class="dataPerfect_msg_close" @click.stop="showMsg=false">&#xe7de;</i>
			<p class="dataPerfect_msg_tit">温馨提醒</p>
			<p class="dataPerfect_msg_p">{{$store.state.custom_config.dataPerfectMsg||'为了快速、准确地找到您好感的TA，请完善个人资料和身份证认证'}}</p>
			<ul class="dataPerfect_msg_img" v-if="$store.state.isWeixin">
				<li><img src="@/images/qcode1.png"></li>
				<li><img src="@/images/qcode2.png"></li>
				<li><img src="@/images/qcode3.png"></li>
			</ul>
		</div>
	</div>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import Vue from 'vue';
  import selectPhoto from '../plugs/selectPhoto'
  import {TransferDom, Group, Popup, PopupPicker, XDialog,AlertPlugin,Datetime  } from 'vux';
  import draggable from 'vuedraggable'
  import {ageList,heightList,incomeReList} from './modifyData.data.js';

Vue.use(AlertPlugin)
  export default {
    name: "modifyData",
    directives: {
      TransferDom
    },
    components: {
      Loading,
      Back,
      selectPhoto,
      Group,
      Popup,
      PopupPicker,
      XDialog,
	  Datetime,
      draggable,
    },
    data() {
      return {
        isloading: false,
        file: null,
        headimgAttachmentId: null,
        feedMaxImg: 6,//发布最大图片数量
        feedImg: [],//发布图片
        fileList: null,
        aliasName: null,
        showAliasName: false,
		datingId:null,
		actId:null,
        birthday: null,

        sex: null,

        selfLabel: null,
        shSelfLabel: false,

        heightList: [],
        heightArr: [],//选中的数组
        heightVal: null,//联动显示的值
        heightText: '',//获取值相应的文字
        shHeight: false,

        educationList: [[
          {name: '大专以下', value: '0'},
          {name: '大专', value: '10'},
          {name: '本科', value: '11'},
          {name: '硕士', value: '12'},
          {name: '博士', value: '13'},
          {name: '出国留学', value: '14'}
        ]],
        educationArr: [],//选中的数组
        educationVal: null,//联动显示的值
        educationText: '',//获取值相应的文字
        shEducation: false,

        liveList: [],//列表
        liveArr: [],//选中的数组
        liveCityId: null,//联动显示的值
        liveAreaId: null,//联动显示的值
        liveText: '',//获取值相应的文字
        shLive: false,

        school: null,
        shSchool: false,

        profession: null,
        shProfession: false,

        name: null,
        shName: false,

        emotionalStateList: [[
          {name: '未婚', value: '1'},
          {name: '离异', value: '2'},
          {name: '其他', value: '3'},
        ]],//列表
        emotionalStateArr: [],//选中的数组
        emotion: null,//联动显示的值
        emotionalStateText: '',//获取值相应的文字
        shEmotionalState: false,

        placeList: [],//列表
        placeArr: [],//选中的数组
        cityId: null,//联动显示的值
        areaId: null,//联动显示的值
        place: '',//获取值相应的文字
        shPlace: false,

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
        incomeArr: [],//选中的数组
        incomeLVal: null,//联动显示的值
        incomeRVal: null,//联动显示的值
        incomeText: '',//获取值相应的文字
        shIncome: false,

        smokingList: [[
          {name: '从不', value: '1'},
          {name: '偶尔抽', value: '2'},
          {name: '经常抽', value: '3'},
        ]],//列表
        smokingArr: [],//选中的数组
        smokingVal: null,//联动显示的值
        smokingText: '',//获取值相应的文字
        shSmoking: false,

        drinkList: [[
          {name: '从不', value: '1'},
          {name: '偶尔喝', value: '2'},
          {name: '经常喝', value: '3'},
        ]],//列表
        drinkArr: [],//选中的数组
        drinkVal: null,//联动显示的值
        drinkText: '',//获取值相应的文字
        shDrink: false,

        childList: [[
          {name: '无', value: '1'},
          {name: '有小孩归自已', value: '2'},
          {name: '有小孩归对方', value: '3'},
        ]],//列表
        childArr: [],//选中的数组
        childVal: null,//联动显示的值
        childText: '',//获取值相应的文字
        shChild: false,

        houseList: [[
          {name: '已购房', value: '1'},
          {name: '租房', value: '2'},
          {name: '单位宿舍', value: '3'},
          {name: '正打算购房', value: '4'},
          {name: '和家人同住', value: '5'},
        ]],//列表
        houseArr: [],//选中的数组
        houseVal: null,//联动显示的值
        houseText: '',//获取值相应的文字
        shHouse: false,

        carList: [[
          {name: '已购车', value: '1'},
          {name: '未购车', value: '2'},
          {name: '正打算购车', value: '3'},
        ]],//列表
        carArr: [],//选中的数组
        carVal: null,//联动显示的值
        carText: '',//获取值相应的文字
        shCar: false,

        rankingList: [[
          {name: '独生子女', value: '1'},
          {name: '老大', value: '2'},
          {name: '老二', value: '3'},
          {name: '老三', value: '4'},
          // {name: '老四', value: '老四'},
          // {name: '老五及更小', value: '老五及更小'},
          {name: '老幺', value: '5'},
        ]],//列表
        rankingArr: [],//选中的数组
        rankingVal: null,//联动显示的值
        rankingText: '',//获取值相应的文字
        shRanking: false,

        ageList: [],//列表
        ageArr: [],//选中的数组
        ageLVal: null,//联动显示的值
        ageRVal: null,//联动显示的值
        ageText: '',//获取值相应的文字
        shAge: false,

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
        heightReLVal: null,//联动显示的值
        heightReRVal: null,//联动显示的值
        heightReText: '',//获取值相应的文字
        shHeightRe: false,

        educationReList: [[
          {name: '不限', value: '-1'},
          {name: '大专及以上', value: '10'},
          {name: '本科及以上', value: '11'},
          {name: '硕士及以上', value: '12'},
          {name: '博士及以上', value: '13'},
        ]],
        educationReArr: [],//选中的数组
        educationReVal: null,//联动显示的值
        educationReText: '',//获取值相应的文字
        shEducationRe: false,

        incomeReList: [],//列表
        incomeReArr: [],//选中的数组
        incomeReLVal: null,//联动显示的值
        incomeReRVal: null,//联动显示的值
        incomeReText: '',//获取值相应的文字
        shIncomeRe: false,

        smokingReList: [[
          {name: '从不', value: '1'},
          {name: '偶尔抽', value: '2'},
          {name: '经常抽', value: '3'},
          {name: '无所谓', value: '-1'},
        ]],//列表
        smokingReArr: [],//选中的数组
        smokingReVal: null,//联动显示的值
        smokingReText: '',//获取值相应的文字
        shSmokingRe: false,

        drinkReList: [[
          {name: '从不', value: '1'},
          {name: '偶尔喝', value: '2'},
          {name: '经常喝', value: '3'},
          {name: '无所谓', value: '-1'},
        ]],//列表
        drinkReArr: [],//选中的数组
        drinkReVal: null,//联动显示的值
        drinkReText: '',//获取值相应的文字
        shDrinkRe: false,

        houseReList: [[
          {name: '已购房', value: '1'},
          {name: '租房', value: '2'},
          {name: '单位宿舍', value: '3'},
          {name: '正打算购房', value: '4'},
          {name: '和家人同住', value: '5'},
          {name: '无要求', value: '-1'},
        ]],//列表
        houseReArr: [],//选中的数组
        houseReVal: null,//联动显示的值
        houseReText: '',//获取值相应的文字
        shHouseRe: false,

        carReList: [[
          {name: '已购车', value: '1'},
          {name: '未购车', value: '2'},
          {name: '正打算购车', value: '3'},
          {name: '无要求', value: '-1'},
        ]],//列表
        carReArr: [],//选中的数组
        carReVal: null,//联动显示的值
        carReText: '',//获取值相应的文字
        shCarRe: false,

        emotionalStateReList: [[
          {name: '未婚', value: '1'},
          {name: '离异', value: '2'},
          {name: '其他', value: '3'},
          {name: '无要求', value: '-1'},
        ]],//列表
        emotionalStateReArr: [],//选中的数组
        emotionStateReVal: null,//联动显示的值
        emotionalStateReText: '',//获取值相应的文字
        shEmotionalStateRe: false,

        childReList: [[
          {name: '无', value: '1'},
          {name: '有小孩归自已', value: '2'},
          {name: '有小孩归对方', value: '3'},
          {name: '无要求', value: '-1'},
        ]],//列表
        childReArr: [],//选中的数组
        childReVal: null,//联动显示的值
        childReText: '',//获取值相应的文字
        shChildRe: false,

        liveReList: [],//列表
        liveReArr: [],//选中的数组
        liveReCityId: null,//联动显示的值
        liveReAreaId: null,//联动显示的值
        liveReText: '',//获取值相应的文字
        shLiveRe: false,

        userInfo: null,

        educationTextArr:{0:'大专以下',10:'大专',11:'本科',12:'硕士',13:'博士',14:'出国留学' },
        maritalStatusTextArr:{1:'未婚',2:'离异',3:'其他','-1':'无要求'},
        smokingTextArr:{1:'从不',2:'偶尔吸',3:'经常吸','-1':'无要求'},
        drinkTextArr:{1:'从不',2:'偶尔喝',3:'经常喝','-1':'无要求'},
        childTextArr:{1:'无',2:'有小孩归自已',3:'有小孩归对方','-1':'无要求'},
        houseTextArr:{1:'已购房',2:'租房',3:'单位宿舍',4:'正打算购房',5:'和家人同住','-1':'无要求'},
        carTextArr:{1:'已购车',2:'未购车',3:'正打算购车','-1':'无要求'},
        rankingTextArr:{1:'独生子女',2:'老大',3:'老二',4:'老三',5:'老幺'},
        educationReTextArr:{10:'大专及以上',11:'本科及以上',12:'硕士及以上',13:'博士及以上','-1':'无要求' },

        isRequired: true,
		//生日
		visibility:false,
		emptyBirthday:false,
		showMsg:true,
		initMsg:false,
      }
    },
    created() {

    },
    destroyed() {
    },
	activated(){
		const t=this;
		t.getData();
		t.datingId=t.$route.query.datingId;
	    t.actId=t.$route.query.id;
	},
    mounted() {
      this.getData();
      //this.isRequired = this.$route.query.isRequired;
	  this.datingId=this.$route.query.datingId;
	  this.actId=this.$route.query.id;
	  this.getDistrict();
	  /*if(this.$route.query.showMsg){
		this.$vux.alert.show({
		  title: '温馨提示',
		  content: this.$store.state.custom_config.dataPerfectMsg||'为了快速、准确地找到您好感的TA，请完善个人资料和身份证认证',
		})
	  }*/
	  /*setTimeout(()=>{//生成ageArr的(不删)
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
		  console.log(JSON.stringify(ageArr));
		  this.ageList = ageArr;
	  },200);*/

     /* document.body.ondrop = function (event) {

        event.preventDefault();
        event.stopPropagation();
      }*/
      this.$nextTick(function () {
        this.ifinit = true
      })
    },
	computed:{
      endDate(){
        let nowYear = this.$utils.format(new Date(),'yyyy')
        return (nowYear-18)+'-'+this.$utils.format(new Date(),'MM-dd');
      },
      startDate(){
        let nowYear = this.$utils.format(new Date(),'yyyy')
        return (nowYear-70)+'-'+this.$utils.format(new Date(),'MM-dd');
      },
	  },
    watch: {
      heightArr() {
        if (this.$refs.heightPicker) {
          this.heightText = this.$refs.heightPicker.getNameValues();
          this.heightVal = this.heightArr[0];
        }
      },
      educationArr() {
        if (this.$refs.educationPicker) {
          this.educationText = this.$refs.educationPicker.getNameValues();
          this.educationVal = this.educationArr[0];
        }
      },
      liveArr() {
        if (this.$refs.livePicker&&this.$refs.livePicker.getNameValues()) {
          this.liveText = this.$refs.livePicker.getNameValues();
          this.liveCityId = this.liveArr[0];
          this.liveAreaId = this.liveArr[1];
        }
      },
      emotionalStateArr() {
        if (this.$refs.emotionalStatePicker) {
          this.emotionalStateText = this.$refs.emotionalStatePicker.getNameValues();
          this.emotion = this.emotionalStateArr[0];
		  //console.log(this.emotionalStateText)
        }
      },
      placeArr() {
        if (this.$refs.placePicker&&this.$refs.placePicker.getNameValues()) {
          this.place = this.$refs.placePicker.getNameValues();
          this.cityId = this.placeArr[0];
          this.areaId = this.placeArr[1];
        }
      },
      incomeArr() {
        if (this.$refs.incomePicker) {
          this.incomeText = this.$refs.incomePicker.getNameValues();
          if(this.incomeArr[0] == '1'){
            this.incomeLVal = -1;
            this.incomeRVal = 2000;
          }else if(this.incomeArr[0] == '2'){
            this.incomeLVal = 2000;
            this.incomeRVal = 4000;
          }else if(this.incomeArr[0] == '3'){
            this.incomeLVal = 4000;
            this.incomeRVal = 6000;
          }else if(this.incomeArr[0] == '4'){
            this.incomeLVal = 6000;
            this.incomeRVal = 10000;
          }else if(this.incomeArr[0] == '5'){
            this.incomeLVal = 10000;
            this.incomeRVal = 15000;
          }else if(this.incomeArr[0] == '6'){
            this.incomeLVal = 15000;
            this.incomeRVal = 20000;
          }else if(this.incomeArr[0] == '7'){
            this.incomeLVal = 20000;
            this.incomeRVal = 25000;
          }else if(this.incomeArr[0] == '8'){
            this.incomeLVal = 50000;
            this.incomeRVal = -1;
          }
        }
      },
      smokingArr() {
        if (this.$refs.smokingPicker) {
          this.smokingText = this.$refs.smokingPicker.getNameValues();
          this.smokingVal = this.smokingArr[0];
        }
      },
      drinkArr() {
        if (this.$refs.drinkPicker) {
          this.drinkText = this.$refs.drinkPicker.getNameValues();
          this.drinkVal = this.drinkArr[0];
        }
      },
      childArr() {
        if (this.$refs.childPicker) {
          this.childText = this.$refs.childPicker.getNameValues();
          this.childVal = this.childArr[0];
        }
      },
      houseArr() {
        if (this.$refs.housePicker) {
          this.houseText = this.$refs.housePicker.getNameValues();
          this.houseVal = this.houseArr[0];
        }
      },
      carArr() {
        if (this.$refs.carPicker) {
          this.carText = this.$refs.carPicker.getNameValues();
          this.carVal = this.carArr[0];
        }
      },
      rankingArr() {
        if (this.$refs.rankingPicker) {
          this.rankingText = this.$refs.rankingPicker.getNameValues();
          this.rankingVal = this.rankingArr[0];
        }
      },
      ageArr() {
        if (this.$refs.agePicker) {
          this.ageText = this.$refs.agePicker.getNameValues();
          this.ageLVal = this.ageArr[0];
          this.ageRVal = this.ageArr[1];
          if(this.ageLVal==-1 &&  this.ageRVal==-1){
            this.ageText = "不限";
          }else if(this.ageLVal==-1 && this.ageRVal>=19){
            this.ageText = this.ageRVal + '岁以下';
          }else if(this.ageLVal>=19 && this.ageRVal==-1) {
            this.ageText = this.ageLVal + '岁以上';
          }else if(this.ageLVal>=19 && this.ageRVal >=19) {
            this.ageText = this.ageLVal+'-'+ this.ageRVal + "岁";
          }
        }
      },
      heightReArr() {
        if (this.$refs.heightRePicker) {
          this.heightReText = this.$refs.heightRePicker.getNameValues();
          if(this.heightReArr[0]==-1){
            this.heightReLVal = -1;
            this.heightReRVal = -1;
          }else{
            this.heightReLVal = this.heightReArr[0];
            this.heightReRVal = -1;
          }
        }
      },
      educationReArr() {
        if (this.$refs.educationRePicker) {
          this.educationReText = this.$refs.educationRePicker.getNameValues();
          this.educationReVal = this.educationReArr[0];
        }
      },
      incomeReArr() {
        if (this.$refs.incomeRePicker) {
          this.incomeReText = this.$refs.incomeRePicker.getNameValues();
          this.incomeReLVal = this.incomeReArr[0];
          this.incomeReRVal = this.incomeReArr[1];
          if(this.incomeReLVal== -1 &&  this.incomeReRVal==-1){
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
      smokingReArr() {
        if (this.$refs.smokingRePicker) {
          this.smokingReText = this.$refs.smokingRePicker.getNameValues();
          this.smokingReVal = this.smokingReArr[0];
        }
      },
      drinkReArr() {
        if (this.$refs.drinkRePicker) {
          this.drinkReText = this.$refs.drinkRePicker.getNameValues();
          this.drinkReVal = this.drinkReArr[0];
        }
      },
      houseReArr() {
        if (this.$refs.houseRePicker) {
          this.houseReText = this.$refs.houseRePicker.getNameValues();
          this.houseReVal = this.houseReArr[0];
        }
      },
      carReArr() {
        if (this.$refs.carRePicker) {
          this.carReText = this.$refs.carRePicker.getNameValues();
          this.carReVal = this.carReArr[0];
        }
      },
      childReArr() {
        if (this.$refs.childRePicker) {
          this.childReText = this.$refs.childRePicker.getNameValues();
          this.childReVal = this.childReArr[0];
        }
      },
      emotionalStateReArr() {
        if (this.$refs.emotionalStateRePicker) {
          this.emotionalStateReText = this.$refs.emotionalStateRePicker.getNameValues();
          this.emotionStateReVal = this.emotionalStateReArr[0];
        }
      },
      liveReArr() {
        if (this.$refs.liveRePicker&&this.$refs.liveRePicker.getNameValues()) {
          let text = this.$refs.liveRePicker.getNameValues();
          let splitTextArr =  text.split(' ');
          this.liveReCityId = this.liveReArr[0];
          this.liveReAreaId = this.liveReArr[1];
          if(this.liveReCityId== -2 &&  this.liveReAreaId==-2){
            this.liveReText = "不限";
            this.liveReCityId = -1;
            this.liveReAreaId = -1;
          }else if(this.liveReCityId>= 0 && this.liveReAreaId==-2) {
            this.liveReText = splitTextArr[0] + '范围内';
            this.liveReCityId = this.liveReArr[0];
            this.liveReAreaId = -1;
          }else if(this.liveReCityId>= 0 && this.liveReAreaId >= 0) {
            this.liveReText = splitTextArr[0]+ ' ' + splitTextArr[1];
          }
        }
      },
    },
    methods: {
		showTip(type){
			const t=this;
			let top=$("#n_"+type).offset().top-100;
			$("#n_"+type).addClass("cur");
			$("body,html").animate({"scrollTop":top},0);
		},
      linkToDetail(link, id) {
        let query = {}
      //  console.log(id)
        if (id) {
          query = {
            id: id,
            isMy: 1,
          }
        }
        this.$router.push({
          path: link,
          query
        })
      },
      getFullPath(path) {
        return this.$utils.getFullPath(path)
      },
      async fileBackAvatar(obj) {//头像
        const t = this
        if(obj.serverId){
          let result = await t.$server.wxMpMedia({
            mediaId:obj.serverId[0],
			dataSources:'modifyData'
          })
          t.headimgAttachmentId = result.data.data&&result.data.data.path;
        }else{
          t.file = obj.file[0]//提交的图片
          if (t.file) {
            let param = new FormData() //创建form对象
            param.append('file', t.file, t.file.name) //单个图片 ，多个用循环 append 添加
			param.append('dataSources','modifyData');
            let result = await t.$server.uploadPic(param);
            t.headimgAttachmentId = result.data.data.path
          } else {
            t.$vux.toast.show({
              type: "text",
              text: "图片出错",
              position: "bottom",
              width: "2rem",
            });
          }
        }
      },
      async fileBack(obj) {
        const t = this
        if(obj.serverId){
          for(let i=0;i<obj.serverId.length;i++){
            let result = await t.$server.wxMpMedia({
              mediaId:obj.serverId[i],
			  dataSources:'modifyData'
            })
            t.feedImg.push(result.data.data&&result.data.data.path);
          }
        }else{
          t.fileList = obj.file//提交的图片
          if (t.fileList) {
            for (let i = t.fileList.length; i--;) {
              let param = new FormData() //创建form对象
              param.append('file', t.fileList[i], t.fileList[i].name) //单个图片 ，多个用循环 append 添加
			  param.append('dataSources','modifyData');
              try {
                const result = await t.$server.uploadPic(param);
                t.feedImg.push(result.data.data.path);
              } catch (e) {

              }
            }

          } else {
            t.$vux.toast.show({
              type: "text",
              text: "图片出错",
              position: "bottom",
              width: "2rem",
            });
          }
        }

      },
      async getData() {
        const _this = this;
        _this.$vux.loading.show();
	//console.log(_this.$store.state.userInfo);
        _this.userInfo = _this.$store.state.userInfo;//newsResult.data.data;
        _this.headimgAttachmentId = _this.userInfo.headimgAttachmentId;
        _this.feedImg = (_this.userInfo.coverimgAttachementId && _this.userInfo.coverimgAttachementId.split(',')) || [];
        _this.aliasName = _this.userInfo.aliasName;
        _this.birthday = _this.userInfo.birthday&&_this.userInfo.birthday.substring(0, 10)||null;
		if(!_this.birthday){//生日只能填写一次
			_this.emptyBirthday=true;
		}
		//console.log(_this.userInfo)
        _this.sex = _this.userInfo.sex;
        if (_this.userInfo.userExt) {
          //基本资料（身高、学历、居住地、学校、职业）
			  if(_this.userInfo.userExt.height!=undefined){
			  _this.heightText =  _this.userInfo.userExt.height || "";
			  _this.heightVal = _this.userInfo.userExt.height;
			  _this.heightArr = [_this.userInfo.userExt.height+""];
			  }
			if(_this.userInfo.userExt.education!=undefined){
				 _this.educationText = _this.educationTextArr[_this.userInfo.userExt.education] || "";
				_this.educationVal = _this.userInfo.userExt.education;
				_this.educationArr = [_this.userInfo.userExt.education+""];
			}
          if (!_this.userInfo.userExt.liveCityName || !_this.userInfo.userExt.liveAreaName) {
            _this.liveText = "广东 广州";//设置默认值
			_this.liveCityId=20;
            _this.liveAreaId=321;
          } else {
            _this.liveText = _this.userInfo.userExt.liveCityName + " " + _this.userInfo.userExt.liveAreaName;
            _this.liveCityId=_this.userInfo.userExt.liveCityId;
            _this.liveAreaId=_this.userInfo.userExt.liveAreaId;
          }
		  _this.liveArr=[_this.liveCityId+"",_this.liveAreaId+""];
          _this.school = _this.userInfo.userExt.school;
          _this.profession = _this.userInfo.userExt.profession;
          //私密资料（真实姓名、家乡、婚姻状况、月收入、是否吸烟、是否喝酒、子女情况、住房情况、购车情况、家中排行）
          _this.name =  _this.userInfo.userName;
          //家乡
          if (!_this.userInfo.userExt.cityName && !_this.userInfo.userExt.areaName) {
            _this.place = "";
          } else {
            _this.place = _this.userInfo.userExt.cityName + " " + _this.userInfo.userExt.areaName;
            _this.cityId=_this.userInfo.userExt.cityId;
            _this.areaId=_this.userInfo.userExt.areaId;
			_this.placeArr=[_this.cityId+"",_this.areaId+""];
          }
          //婚姻状况
          if(_this.userInfo.userExt.married) {
            _this.emotionalStateText = _this.maritalStatusTextArr[_this.userInfo.userExt.married];
            _this.emotion = _this.userInfo.userExt.married;
          //  _this.emotionalStateArr = [_this.userInfo.userExt.married+""];

          }
          //月收入
          if(_this.userInfo.userExt.incomeLowerLimit && _this.userInfo.userExt.incomeUpperLimit){
            if(_this.userInfo.userExt.incomeLowerLimit>=2000 && _this.userInfo.userExt.incomeUpperLimit==-1 ){
              _this.incomeText = _this.userInfo.userExt.incomeLowerLimit + '元以上';
            }else if(_this.userInfo.userExt.incomeLowerLimit==-1 && _this.userInfo.userExt.incomeUpperLimit>=2000 ){
              _this.incomeText = _this.userInfo.userExt.incomeUpperLimit + '元以下';
            }else if(_this.userInfo.userExt.incomeLowerLimit>=2000 && _this.userInfo.userExt.incomeUpperLimit>=2000 ){
              _this.incomeText = _this.userInfo.userExt.incomeLowerLimit + '-' + _this.userInfo.userExt.incomeUpperLimit;
            }
            _this.incomeLVal = _this.userInfo.userExt.incomeLowerLimit;
            _this.incomeRVal = _this.userInfo.userExt.incomeUpperLimit;
          }
          //是否吸烟
          if(_this.userInfo.userExt.smoke) {
            _this.smokingText = _this.smokingTextArr[_this.userInfo.userExt.smoke];
            _this.smokingVal = _this.userInfo.userExt.smoke;
          }
          //是否喝酒
          if(_this.userInfo.userExt.drink) {
            _this.drinkText = _this.drinkTextArr[_this.userInfo.userExt.drink];
            _this.drinkVal = _this.userInfo.userExt.drink;
          }
          //子女情况
          if(_this.userInfo.userExt.children) {
            _this.childText = _this.childTextArr[_this.userInfo.userExt.children];
            _this.childVal = _this.userInfo.userExt.children;
          }
          //住房情况
          if(_this.userInfo.userExt.housing){
            _this.houseText = _this.houseTextArr[_this.userInfo.userExt.housing];
            _this.houseVal = _this.userInfo.userExt.housing;
          }
          //购车情况
          if(_this.userInfo.userExt.car){
            _this.carText = _this.carTextArr[_this.userInfo.userExt.car];
            _this.carVal = _this.userInfo.userExt.car;
          }
          //家中排行
          if(_this.userInfo.userExt.ranking){
            _this.rankingText = _this.rankingTextArr[_this.userInfo.userExt.ranking];
            _this.rankingVal = _this.userInfo.userExt.ranking;
          }
           //择偶意向（年龄、身高、学历、收入情况、是否吸烟、是否喝酒、住房情况、购车情况、子女情况、婚姻情况、居住地）
          if(_this.userInfo.userExt.chooseMateAgeStart && _this.userInfo.userExt.chooseMateAgeEnd){
            if(_this.userInfo.userExt.chooseMateAgeStart==-1 && _this.userInfo.userExt.chooseMateAgeEnd==-1){
              _this.ageText = "不限";
            }else if(_this.userInfo.userExt.chooseMateAgeStart==-1 && _this.userInfo.userExt.chooseMateAgeEnd>=19){
              _this.ageText = _this.userInfo.userExt.chooseMateAgeEnd + "岁以下";
            }else if(_this.userInfo.userExt.chooseMateAgeStart>=19 && _this.userInfo.userExt.chooseMateAgeEnd==-1){
              _this.ageText = _this.userInfo.userExt.chooseMateAgeStart + "岁以上";
            }else if(_this.userInfo.userExt.chooseMateAgeStart>=19 && _this.userInfo.userExt.chooseMateAgeEnd>=19){
              _this.ageText = _this.userInfo.userExt.chooseMateAgeStart + "-" + _this.userInfo.userExt.chooseMateAgeEnd+"岁";
            }
            _this.ageLVal = _this.userInfo.userExt.chooseMateAgeStart;
            _this.ageRVal = _this.userInfo.userExt.chooseMateAgeEnd;
          }
          if(_this.userInfo.userExt.chooseMateHeightLowerLimit && _this.userInfo.userExt.chooseMateHeightUpperLimit){
            if(_this.userInfo.userExt.chooseMateHeightLowerLimit==-1 && _this.userInfo.userExt.chooseMateHeightUpperLimit==-1){
              _this.heightReText = "不限";
            }else if(_this.userInfo.userExt.chooseMateHeightLowerLimit>=150 && _this.userInfo.userExt.chooseMateHeightUpperLimit==-1){
              _this.heightReText = _this.userInfo.userExt.chooseMateHeightLowerLimit + "cm以上";
            }else if(_this.userInfo.userExt.chooseMateHeightLowerLimit>=150 && _this.userInfo.userExt.chooseMateHeightUpperLimit>=150){
              _this.heightReText = _this.userInfo.userExt.chooseMateHeightLowerLimit + "-" + _this.userInfo.userExt.chooseMateHeightUpperLimit+"cm";
            }
            _this.heightReLVal = _this.userInfo.userExt.chooseMateHeightLowerLimit;
            _this.heightReRVal = _this.userInfo.userExt.chooseMateHeightUpperLimit;
          }
          //学历
          if(_this.userInfo.userExt.chooseMateEducation) {
            _this.educationReText = _this.educationReTextArr[_this.userInfo.userExt.chooseMateEducation];
            _this.educationReVal = _this.userInfo.userExt.chooseMateEducation;
          }
          if(_this.userInfo.userExt.chooseMateIncomeLowerLimit && _this.userInfo.userExt.chooseMateIncomeUpperLimit){
            if(_this.userInfo.userExt.chooseMateIncomeLowerLimit==-1 && _this.userInfo.userExt.chooseMateIncomeUpperLimit==-1){
              _this.incomeReText = "不限";
            }else if(_this.userInfo.userExt.chooseMateIncomeLowerLimit>=2000 && _this.userInfo.userExt.chooseMateIncomeUpperLimit==-1 ){
              _this.incomeReText = _this.userInfo.userExt.chooseMateIncomeLowerLimit + '元以上';
            }else if(_this.userInfo.userExt.chooseMateIncomeLowerLimit=='-1' && _this.userInfo.userExt.chooseMateIncomeUpperLimit>=2000 ){
              _this.incomeReText = _this.userInfo.userExt.chooseMateIncomeUpperLimit + '元以下';
            }else if(_this.userInfo.userExt.chooseMateIncomeLowerLimit>=2000 && _this.userInfo.userExt.chooseMateIncomeUpperLimit>=2000 ){
              _this.incomeReText = _this.userInfo.userExt.chooseMateIncomeLowerLimit + '-' + _this.userInfo.userExt.chooseMateIncomeUpperLimit;
            }
            _this.incomeReLVal = _this.userInfo.userExt.chooseMateIncomeLowerLimit;
            _this.incomeReRVal = _this.userInfo.userExt.chooseMateIncomeUpperLimit;
          }
          //是否吸烟
          if(_this.userInfo.userExt.chooseMateSmoke) {
            _this.smokingReText = _this.smokingTextArr[_this.userInfo.userExt.chooseMateSmoke];
            _this.smokingReVal = _this.userInfo.userExt.chooseMateSmoke;
          }
          //是否喝酒
          if(_this.userInfo.userExt.chooseMateDrink) {
            _this.drinkReText = _this.drinkTextArr[_this.userInfo.userExt.chooseMateDrink];
            _this.drinkReVal = _this.userInfo.userExt.chooseMateDrink;
          }
          //住房情况
          if(_this.userInfo.userExt.chooseMateHousing){
            _this.houseReText = _this.houseTextArr[_this.userInfo.userExt.chooseMateHousing];
            _this.houseReVal = _this.userInfo.userExt.chooseMateHousing;
          }
          //购车情况
          if(_this.userInfo.userExt.chooseMateCar){
            _this.carReText = _this.carTextArr[_this.userInfo.userExt.chooseMateCar];
            _this.carReVal = _this.userInfo.userExt.chooseMateCar;
          }
          //子女情况
          if(_this.userInfo.userExt.chooseMateChildren) {
            _this.childReText = _this.childTextArr[_this.userInfo.userExt.chooseMateChildren];
            _this.childReVal = _this.userInfo.userExt.chooseMateChildren;
          }
          //婚姻状况
          if(_this.userInfo.userExt.chooseMateMarried) {
            _this.emotionalStateReText = _this.maritalStatusTextArr[_this.userInfo.userExt.chooseMateMarried];
            _this.emotionStateReVal = _this.userInfo.userExt.chooseMateMarried;
          }
          //居住地

			if (!_this.userInfo.userExt.chooseMateLiveCityId &&  !_this.userInfo.userExt.chooseMateLiveAreaId) {
				_this.liveReText = "广东 广州";//设置默认值
				_this.liveReCityId=20;
				_this.liveReAreaId=321;
			} else {
				if(_this.userInfo.userExt.chooseMateLiveCityId== -1 &&  _this.userInfo.userExt.chooseMateLiveAreaId==-1){
					_this.liveReText = "不限";
					_this.liveReCityId= -2;
					_this.liveReAreaId= -2;
				}else if(_this.userInfo.userExt.chooseMateLiveCityId>= 0 && _this.userInfo.userExt.chooseMateLiveAreaId==-1) {
					_this.liveReText = _this.userInfo.userExt.chooseMateLiveCityName + '范围内';
					_this.liveReCityId=_this.userInfo.userExt.chooseMateLiveCityId;
					_this.liveReAreaId= -2;
				}else if(_this.userInfo.userExt.chooseMateLiveCityId>= 0 && _this.userInfo.userExt.chooseMateLiveAreaId >= 0) {
					_this.liveReText = _this.userInfo.userExt.chooseMateLiveCityName+ ' ' + _this.userInfo.userExt.chooseMateLiveAreaName;
					_this.liveReCityId=_this.userInfo.userExt.chooseMateLiveCityId;
					_this.liveReAreaId=_this.userInfo.userExt.chooseMateLiveAreaId;
				}else{
					_this.liveReText = "广东 广州";//设置默认值
					_this.liveReCityId=20;
					_this.liveReAreaId=321;
				}
			}
		  _this.liveReArr=[_this.liveReCityId+"",_this.liveReAreaId+""];
        }
        _this.selfLabel = _this.userInfo.selfLabel;
        _this.$vux.loading.hide();
      },
      async getDistrict() {
        const _this = this;
        let listData = await this.$server.getDistrict();
		setTimeout(()=>{
			//_this.liveList = this.$utils.deepCopy(listData.data.data);
			//_this.placeList = this.$utils.deepCopy(listData.data.data);
			//_this.liveReList = this.$utils.deepCopy(listData.data.data);
			let str=JSON.stringify(listData.data.data)
			_this.liveList = JSON.parse(str);
			//_this.placeList = JSON.parse(str);
			if(_this.$store.state.liveReList){
				_this.liveReList=_this.$store.state.liveReList;
			}else{
				let liveReList = JSON.parse(str);
				liveReList.unshift({name: '不限', value: '-2', parent: '0' });
				let city=liveReList.filter((v,i)=>{
				  return v.parent==0;
				})
				for (let i=city.length;i--;){
				 liveReList.unshift({name: '不限', value: '-2', parent: city[i].value });
				}
				_this.$store.commit("CHANGESTORE",{name:'liveReList',value:liveReList});
				_this.liveReList=liveReList;
			}
			setTimeout(()=>{
				_this.heightList=heightList;
				setTimeout(()=>{
					_this.ageList=ageList;
					setTimeout(()=>{
						_this.incomeReList=incomeReList;
						_this.initMsg=true;
					},50);
				},50);
			},50);
		},350);
      },
      submitData(name) {
        if (name == 'aliasName') {
          if (!this.aliasName) {
            this.$vux.toast.show({
              type: 'text',
              text: '昵称不能为空',
              position: 'middle',
              width: 'auto',
            })
            return false;
          }
          this.showAliasName = false;
        }
        else if (name == 'name') {
          if (!this.name) {
            this.$vux.toast.show({
              type: 'text',
              text: '真实姓名不能为空',
              position: 'middle',
              width: 'auto',
            })
            return false;
          }
          this.shName = false;
        }
      },
      dragEnd: function (evt) {
        console.log('拖动前的索引：' + evt.oldIndex);
        console.log('拖动后的索引：' + evt.newIndex);
        console.log(this.feedImg);
      },
      deleteImg(index) {
        this.feedImg.splice(index, 1);
      },
      async save() {
		const t=this;
		$(".userInfo_con.cur").removeClass("cur");
        if (!t.headimgAttachmentId) {
          t.$vux.toast.show({
            type: "cancel",
            text: "头像不能为空",
            position: "middle",
            width: "auto",
          });
          return;
        }
        if (!t.aliasName) {
          t.$vux.toast.show({
            type: "cancel",
            text: "请填写昵称",
            position: "middle",
            width: "auto",
          });
		  t.showTip("aliasName");
          return;
        }
		if(!t.birthday){
			t.$vux.toast.show({
				type: "cancel",
				text: "请选择出生日期",
				position: "middle",
				width: "auto",
			  });
			  t.showTip("birthday");
			  return;
		}  //从报名人员列表、支付跳过来的提示必填（封面、个性签名、学校、职业、子女情况、家中排行；择偶：子女情况、居住地不是必填）
        if(t.isRequired){
          if (!t.heightVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择身高",
              position: "middle",
              width: "auto",
            });
			t.showTip("heightVal");
            return;
          }
          if (!t.educationVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择学历",
              position: "middle",
              width: "auto",
            });
			t.showTip("educationVal");
            return;
          }
          if (!t.liveCityId || !t.liveAreaId) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择居住地",
              position: "middle",
              width: "auto",
            });
			t.showTip("liveCityId");
            return;
          }
		  if (!t.profession ) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请填写职业",
              position: "middle",
              width: "auto",
            });
			t.showTip("profession");
            return;
          }

          if (!t.name) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请填写真实姓名",
              position: "middle",
              width: "auto",
            });
			t.showTip("name");
            return;
          }
          if (!t.cityId || !t.areaId) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择家乡",
              position: "middle",
              width: "auto",
            });
			t.showTip("cityId");
            return;
          }
          if (!t.emotion) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择您的婚姻状况",
              position: "middle",
              width: "auto",
            });
			t.showTip("emotion");
            return;
          }
          if (!t.incomeLVal || !t.incomeRVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择您的月收入",
              position: "middle",
              width: "auto",
            });
			t.showTip("incomeLVal");
            return;
          }
          if (!t.smokingVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择是否吸烟",
              position: "middle",
              width: "auto",
            });
			t.showTip("smokingVal");
            return;
          }
          if (!t.drinkVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择是否喝酒",
              position: "middle",
              width: "auto",
            });
			t.showTip("drinkVal");
            return;
          }
          if (!t.houseVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择您的住房情况",
              position: "middle",
              width: "auto",
            });
			t.showTip("houseVal");
            return;
          }
          if (!t.carVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择您的购车情况",
              position: "middle",
              width: "auto",
            });
			t.showTip("carVal");
            return;
          }

          if (!t.ageLVal || !t.ageRVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择择偶年龄",
              position: "middle",
              width: "auto",
            });
			t.showTip("ageLVal");
            return;
          }
          if (!t.heightReLVal || !t.heightReRVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择择偶身高",
              position: "middle",
              width: "auto",
            });
			t.showTip("heightReLVal");
            return;
          }
          if (!t.educationReVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择择偶学历",
              position: "middle",
              width: "auto",
            });
			t.showTip("educationReVal");
            return;
          }
          if (!t.incomeReLVal || !t.incomeReRVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择择偶收入情况",
              position: "middle",
              width: "auto",
            });
			t.showTip("incomeReLVal");
            return;
          }
          if (!t.smokingReVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择择偶是否吸烟",
              position: "middle",
              width: "auto",
            });
			t.showTip("smokingReVal");
            return;
          }
          if (!t.drinkReVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择择偶是否喝酒",
              position: "middle",
              width: "auto",
            });
			t.showTip("drinkReVal");
            return;
          }
          if (!t.houseReVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择择偶住房情况",
              position: "middle",
              width: "auto",
            });
			t.showTip("houseReVal");
            return;
          }
          if (!t.carReVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择择偶购车情况",
              position: "middle",
              width: "auto",
            });
			t.showTip("carReVal");
            return;
          }
          if (!t.emotionStateReVal) {
            t.$vux.toast.show({
              type: "cancel",
              text: "请选择择偶婚姻情况",
              position: "middle",
              width: "auto",
            });
			t.showTip("emotionStateReVal");
            return;
          }
        }
		if(t.emptyBirthday){
			t.$vux.confirm.show({
			  content: '出生日期 '+t.birthday+' 保存后无法修改，确认保存吗？',
			  confirmText: '确定',
			  cancelText:'再想一想',
			  onCancel () {

			  },
			  async onConfirm () {
				t.subData();
			  }
			})
		}else{
			t.subData();
		}

      },
	  async subData(){
		const t=this;
		t.$vux.loading.show()
		const result = await this.$server.update_profile({
		  //基本资料（身高、学历、居住地、学校、职业）
		  aliasName: this.aliasName,
		  birthday:this.birthday,
		  img: this.headimgAttachmentId,
		  coverimgAttachementId: this.feedImg.join(","),
		  autograph: this.selfLabel,
		  height: this.heightVal,
		  education: this.educationVal,
		  liveCityId: this.liveCityId,
		  liveAreaId: this.liveAreaId,
		  school: this.school,
		  profession: this.profession,
		  //私密资料（真实姓名、家乡、婚姻状况、月收入、是否吸烟、是否喝酒、子女情况、住房情况、购车情况、家中排行）
		  userName: this.name,
		  cityId: this.cityId,
		  areaId: this.areaId,
		  married: this.emotion,
		  income:this.incomeLVal?0:'',
		  incomeLowerLimit: this.incomeLVal,
		  incomeUpperLimit: this.incomeRVal,
		  smoke: this.smokingVal,
		  drink: this.drinkVal,
		  children: this.childVal,
		  housing: this.houseVal,
		  car: this.carVal,
		  ranking: this.rankingVal,
		  //择偶意向（年龄、身高、学历、收入情况、是否吸烟、是否喝酒、住房情况、购车情况、子女情况、婚姻情况、居住地）
		  chooseMateAge:this.ageLVal?0:'',
		  chooseMateAgeStart: this.ageLVal,
		  chooseMateAgeEnd: this.ageRVal,

		  chooseMateHeight:this.heightReLVal?0:'',
		  chooseMateHeightLowerLimit: this.heightReLVal,
		  chooseMateHeightUpperLimit: this.heightReRVal,

		  chooseMateEducation: this.educationReVal,

		  chooseMateIncome:this.incomeReLVal?0:'',
		  chooseMateIncomeLowerLimit: this.incomeReLVal,
		  chooseMateIncomeUpperLimit: this.incomeReRVal,

		  chooseMateSmoke: this.smokingReVal,
		  chooseMateDrink: this.drinkReVal,
		  chooseMateHousing: this.houseReVal,
		  chooseMateCar: this.carReVal,
		  chooseMateChildren: this.childReVal,
		  chooseMateMarried: this.emotionStateReVal,
		  chooseMateLiveCityId: this.liveReCityId,
		  chooseMateLiveAreaId: this.liveReAreaId,
		});
		//console.log(JSON.stringify(result));
			this.$store.commit("LOGIN",result.data.data);
		this.feedImg = [];
		this.$vux.loading.hide()
		this.$vux.toast.show({
		  type: "success",
		  text: '修改成功',
		  position: "middle",
		  width: "auto",
		});
		if(this.datingId&&this.$route.query.showMsg){
			this.$router.replace({name:'registrationStaff',query:{id:this.datingId}});
		}else if(this.actId){
			this.$router.replace({name:'activityDetailStatic',query:{id:this.actId}});
		}else{
			setTimeout(() => {
			  this.$router.go(-1);
			}, 500)
		}
	  }
    }
  }
</script>

<style scoped>
  .test {
    border: 1px solid #ccc;
  }
	.isRequired{
		color:#fe4d67;margin-left:0.1rem;font-size:0.3rem;
	}
  .drag-item {
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin: auto;
    position: relative;
    background: #ddd;
    margin-top: 20px;
  }

  .ghostClass {
    opacity: 1;
  }

  .bottom {
    width: 200px;
    height: 50px;
    position: relative;
    background: blue;
    top: 2px;
    left: 2px;
    transition: all .5s linear;
  }
</style>
