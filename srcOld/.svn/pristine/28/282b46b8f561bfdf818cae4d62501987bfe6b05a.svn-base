<template>
  <div class="main jy_all_top publish_bd jy_state_top" key="main">
    <Loading v-if="isloading"></Loading>
    <div class="header">
      <div class="top">
        <Back class="left"><i class="iconfont">&#xe613;</i></Back>发布相亲活动
        <router-link tag="a" :to="{name:'preview',query:{id:id}}" v-if="id" class="right">预览</router-link>
      </div>
    </div>
    <div class="img_panel">
      <div class="img_con">
        <div class="title">活动海报</div>
        <div class="con">
          <selectPhoto @fileBack="fileBack">
            <span v-if="!poster">尺寸1040*300.jpg或.png格式</span>
            <span :style="'background-image:url('+getFullPath(poster)+');'" v-else></span>
          </selectPhoto>
        </div>
        <div class="next_icon"><i class="iconfont">&#xe702;</i></div>
      </div>
      <div class="img_con">
        <div class="title">活动封面</div>
        <div class="con">
          <selectPhoto @fileBack="fileBackCover">
            <span v-if="!cover">尺寸1080*636.jpg或.png格式</span>
            <span :style="'background-image:url('+getFullPath(cover)+');'" v-else></span>
          </selectPhoto>
        </div>
        <div class="next_icon"><i class="iconfont">&#xe702;</i></div>
      </div>
    </div>
    <div class="userInfo_panel">
      <div class="userInfo_title">基本资料</div>
      <div class="userInfo_con" @click="shType=true">
        <div>相亲类型</div>
        <div>{{typeText==""?"请选择线上线下": typeText}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
        <group style="display: none">
          <popup-picker title="相亲类型" :data="typeList" v-model="typeArr" ref="typePicker" :show.sync="shType"></popup-picker>
        </group>
      </div>
      <div class="userInfo_con" @click="shSpecialType=true">
        <div>专场类型</div>
        <div>{{specialTypeText==""?"请选择": specialTypeText}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
        <group style="display: none">
          <popup-picker title="专场类型" :data="specialTypeList" v-model="specialTypeArr" ref="specialTypePicker" :show.sync="shSpecialType"></popup-picker>
        </group>
      </div>
      <div class="userInfo_con" @click="shActivityTitle=true">
        <div>活动标题</div>
        <div>{{activityTitle==""?"请输入活动标题，不少于5个字": activityTitle}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
      </div>
      <div class="userInfo_con" @click="shAddressPopup=true">
        <div>活动地点</div>
        <div>{{addressText==""?"请选择": addressText}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
      </div>
      <div class="userInfo_con" @click="shStartTime=true">
        <div>活动时间</div>
        <div>{{startTime==""?"请选择": startTime}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
        <group style="display: none">
          <datetime title="活动时间" v-model="startTime" :show.sync="shStartTime" :start-date="startDate" :end-date="endDate" format="YYYY-MM-DD HH:mm" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" :minute-list='minuteList' confirm-text="完成" cancel-text="取消"></datetime>
        </group>
      </div>
      <div class="userInfo_con">
        <div>报名时间</div>
        <div style="color: #000;display: flex;justify-content: space-between;justify-items: center"><span style="color: #b1b1b1" @click="shBMStartTime=true">{{bmStartTime==""?"开始时间": bmStartTime}}</span>  至  <span style="color: #b1b1b1" @click="shBMEndTime=true">{{bmEndTime==""?"结束时间": bmEndTime}}</span></div>
        <group style="display: none">
          <datetime title="报名开始时间" v-model="bmStartTime" :show.sync="shBMStartTime" :start-date="startDate" :end-date="endDate" format="YYYY-MM-DD HH:mm" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" :minute-list='minuteList' confirm-text="完成" cancel-text="取消"></datetime>
        </group>
        <group style="display: none">
          <datetime title="报名结束时间" v-model="bmEndTime" ref="startTimePicker" :show.sync="shBMEndTime" :start-date="startDate" :end-date="endDate" format="YYYY-MM-DD HH:mm" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" :minute-list='minuteList' confirm-text="完成" cancel-text="取消"></datetime>
        </group>
      </div>
    </div>
    <div class="userInfo_panel">
      <div class="userInfo_title">报名详情</div>
      <div class="userInfo_con" @click="shTheme=true">
        <div>相亲主题</div>
        <div>{{theme==""?"请输入相亲主题，不少于5个字": theme}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
      </div>
      <div class="userInfo_con" @click="shNavigation=true">
        <div>地址导航</div>
        <div>{{navigation==""?"请填写": "信息已填写"}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
      </div>
      <div class="userInfo_con" @click="shActivityProcess=true">
        <div>活动流程</div>
        <div>{{activityProcess==""?"请填写": "信息已填写"}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
      </div>
      <div class="userInfo_con" @click="shOrganizer=true">
        <div>举办单位</div>
        <div>{{hostPartys.length>0 ?"信息已选择": "请选择"}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
      </div>
      <div class="userInfo_con" @click="shActivityTips=true">
        <div>活动提示</div>
        <div>{{activityTips==""?"请填写": "信息已填写"}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
      </div>
    </div>
    <div class="userInfo_panel" style="margin-top: 10px">
      <div class="userInfo_con" @click="shExtString7=true">
        <div>分享标题</div>
        <div>{{extString7==""?"请输入分享标题，不少于5个字": extString7}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
      </div>
      <div class="userInfo_con" @click="shExtString8=true">
        <div>分享描述</div>
        <div>{{extString8==""?"请输入分享描述，不少于5个字": extString8}}</div>
        <div><i class="iconfont">&#xe702;</i></div>
      </div>
    </div>
    <div class="userInfo_panel last_panel" style="margin-top: 10px">
      <div class="userInfo_con" @click="showExtString6()">
        <div>默认渠道</div>
        <div>男：{{extInt8}}人，{{extDouble}}元；女：{{extInt9}}人，{{extDouble2}}元</div>
        <div><i class="iconfont">&#xe702;</i></div>
      </div>
      <div v-for="v,vkey in extString6" :key="vkey" class="userInfo_con" @click="showExtString6(vkey,v)">
        <div>{{v.name}}</div>
        <div>男：{{v.boyLimit}}人，{{v.boyFee}}元；女：{{v.girlLimit}}人，{{v.girlFee}}元</div>
        <div><i class="iconfont">&#xe702;</i></div>
      </div>
      <p class="publish_bd_btn">
        <em class="ljfb" @click="save(3)">立即发布</em>
        <em class="bc" v-show="activityState!=3&&activityState!=6" @click="save(2)">保存</em>
      </p>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="shExtString7" hide-on-blur class="dialog-input" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
        <div class="input_content">
          <p class="input_title">分享标题</p>
          <div class="input_con"><input type="text" placeholder="分享标题" v-model="extString7" minlength="5"></input></div>
          <div class="submitButton" @click="submitData('extString7')">确定</div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="shExtString8" hide-on-blur class="dialog-input" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
        <div class="input_content">
          <p class="input_title">分享描述</p>
          <div class="input_con"><input type="text" placeholder="分享描述" v-model="extString8" minlength="5"></input></div>
          <div class="submitButton" @click="submitData('extString8')">确定</div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="shActivityTitle" hide-on-blur class="dialog-input" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
        <div class="input_content">
          <p class="input_title">活动标题</p>
          <div class="input_con"><input type="text" placeholder="活动标题" v-model="activityTitle" minlength="5"></input></div>
          <div class="submitButton" @click="submitData('activityTitle')">确定</div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="shNumberOfPeople" hide-on-blur class="dialog-input" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
        <div class="input_content">
          <p class="input_title">报名人数</p>
          <div class="input_con"><input type="number" placeholder="报名人数" v-model="numberOfPeople"></input></div>
          <div class="submitButton" @click="submitData('numberOfPeople')">确定</div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="shRegistrationFee" hide-on-blur class="dialog-input" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
        <div class="input_content">
          <p class="input_title">报名费用</p>
          <div class="input_con"><input type="number" placeholder="报名费用" v-model="registrationFee"></input></div>
          <div class="submitButton" @click="submitData('registrationFee')">确定</div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="shTheme" hide-on-blur class="dialog-input" :dialog-style="{'max-width': '100%', width: '100%','padding': '0.6rem 0', 'background-color': 'transparent'}">
        <div class="input_content">
          <p class="input_title">相亲主题</p>
          <div class="input_con"><textarea rows="4" placeholder="相亲主题" v-model="theme"></textarea></div>
          <div class="submitButton" @click="submitData('theme')">确定</div>
        </div>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <popup v-model="shAddressPopup" height="100%" :popup-style="{zIndex: 999}">
        <div class="shade" :hide-on-blur="true">
          <div class="main jy_all_top jy_state_top">
            <div class="header">
              <div class="top">
                <a class="left" @click.stop="shAddressPopup=false;shAddress=false"><i class="iconfont">&#xe613;</i></a><a class="right" @click="submitAddress">确定</a><p>添加地址</p>
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
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="shNavigation" height="100%"  :popup-style="{zIndex: 999,backgroundColor:'#ffffff'}">
        <div class="shade" :hide-on-blur="true">
          <div class="main jy_all_top jy_state_top">
            <div class="header">
              <div class="top">
                <a class="left" @click.stop="shNavigation=false"><i class="iconfont">&#xe613;</i></a><a class="right" @click.stop="hidePopup('navigation')">确定</a><p>地址导航</p>
              </div>
            </div>
            <div class="jy_art_content">
              <quill-editor autofocus v-model="navigation" ref="navigationEditor" :options="navigationEditorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"> </quill-editor>
            </div>
            <div class="jy_art_menu">
              <selectPhoto :cutting="false" @fileBack="navigationFileBack">
                <a class="jy_art_addImg iconfont">&#xe663;</a>
              </selectPhoto>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="shActivityProcess" height="100%" :popup-style="{zIndex: 999,backgroundColor:'#ffffff'}">
        <div class="shade" :hide-on-blur="true">
          <div class="main jy_all_top jy_state_top">
            <div class="header">
              <div class="top">
                <a class="left" @click.stop="shActivityProcess=false"><i class="iconfont">&#xe613;</i></a><a class="right" @click.stop="hidePopup('activityProcess')">确定</a><p>活动流程</p>
              </div>
            </div>
            <div class="jy_art_content">
              <quill-editor autofocus v-model="activityProcess" ref="activityProcessEditor" :options="activityProcessEditorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"> </quill-editor>
            </div>
            <div class="jy_art_menu">
              <selectPhoto :cutting="false" @fileBack="activityProcessFileBack">
                <a class="jy_art_addImg iconfont">&#xe663;</a>
              </selectPhoto>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="shOrganizer" height="100%" :popup-style="{zIndex: 999}">
        <div class="shade" :hide-on-blur="true">
          <div class="main jy_all_top jy_state_top">
            <div class="header">
              <div class="top">
                <a class="left" @click.stop="shOrganizer=false"><i class="iconfont">&#xe613;</i></a><a class="right" @click.stop="confirmSelect">确定</a><p>选择举办单位</p>
              </div>
            </div>
            <div class="organizers_container">
              <div class="organizers_panel">
                <div class="organizers">
                  <div class="left_title">主办单位</div>
                  <div class="right_text" @click="select(1)">选择主办单位</div>
                </div>
                <template v-if="organizerFrom && organizerFrom.length>0">
                  <div class="organizers" v-for="(item,index) in organizerFrom">
                    <div class="left_title">
                      <i class="logo" :style="'background-image:url('+getFullPath(item.logoUrl)+');'" v-if="item.logoUrl"></i>
                      <i class="logo" style="background-color: #d6d6d6" v-else>logo</i>
                      {{item.unitName}}
                    </div>
                    <div class="right_text action" @click="removeOrganizer(index,item.id)">移除</div>
                  </div>
                </template>
              </div>
              <div class="organizers_panel">
                <div class="organizers">
                  <div class="left_title">协办单位</div>
                  <div class="right_text" @click="select(2)">选择协办单位</div>
                </div>
                <template v-if="coOrganiserFrom && coOrganiserFrom.length>0">
                  <div class="organizers" v-for="(item,index) in coOrganiserFrom">
                    <div class="left_title">
                      <i class="logo" :style="'background-image:url('+getFullPath(item.logoUrl)+');'" v-if="item.logoUrl"></i>
                      <i class="logo" style="background-color: #d6d6d6" v-else>logo</i>
                      {{item.unitName}}
                    </div>
                    <div class="right_text action" @click="removeCoOrganizer(index,item.id)">移除</div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="shOrganizerList" height="100%" :popup-style="{zIndex: 999}">
        <div class="shade" :hide-on-blur="true">
          <div class="main jy_all_top jy_state_top">
            <div class="header">
              <div class="top">
                <a class="left" @click.stop="shOrganizerList=false"><i class="iconfont">&#xe613;</i></a><a class="right" @click.stop="confirmOranizer">确定</a><p>举办单位</p>
              </div>
            </div>
            <div class="search fixed">
              <input type="search" placeholder="搜索" v-model="searchKey" @search="search">
            </div>
            <myScroller :style="$store.state.isBrowser?'padding:2.2rem 0 0;':'padding:2.95rem 0 0;'" :infinite="infinite" :refresh="refresh" :loadRefresh="loadRefresh" :loadInfinite="loadInfinite" ref="myScroller">
              <div class="organizers_container">
                <div class="organizers_panel">
                  <template v-if="isOrganizer==1">
                    <div class="organizers" v-for="(item,index) in organizerList">
                      <div class="left_title">
                        <i class="logo" :style="'background-image:url('+getFullPath(item.logoUrl)+');'" v-if="item.logoUrl"></i>
                        <i class="logo" style="background-color: #d6d6d6" v-else>logo</i>
                        {{item.unitName}}
                      </div>
                      <div class="right_text circle">
                        <input type="checkbox" :id="'checkOranizer'+ index" v-model="checkOrganizerList" :value="index"/>
                        <label :for="'checkOranizer'+ index" ></label>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="organizers" v-for="(item,index) in organizerList">
                      <div class="left_title">
                        <i class="logo" :style="'background-image:url('+getFullPath(item.logoUrl)+');'" v-if="item.logoUrl"></i>
                        <i class="logo" style="background-color: #d6d6d6" v-else>logo</i>
                        {{item.unitName}}
                      </div>
                      <div class="right_text circle">
                        <input type="checkbox" :id="'checkCoOranizer'+ index" v-model="checkCoOrganizerList" :value="index"/>
                        <label :for="'checkCoOranizer'+ index" ></label>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </myScroller>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="shActivityTips" height="100%" :popup-style="{zIndex: 999,backgroundColor:'#ffffff'}">
        <div class="shade" :hide-on-blur="true">
          <div class="main jy_all_top jy_state_top">
            <div class="header">
              <div class="top">
                <a class="left" @click.stop="shActivityTips=false"><i class="iconfont">&#xe613;</i></a><a class="right" @click.stop="hidePopup('activityTips')">确定</a><p>活动提示</p>
              </div>
            </div>
            <div class="jy_art_content">
              <quill-editor autofocus v-model="activityTips" ref="activityTipsEditor" :options="activityTipsEditorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"> </quill-editor>
            </div>
            <div class="jy_art_menu">
              <selectPhoto :cutting="false" @fileBack="activityTipsFileBack">
                <a class="jy_art_addImg iconfont">&#xe663;</a>
              </selectPhoto>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="shExtString6" height="100%" :popup-style="{zIndex: 999}">
        <div class="shade" :hide-on-blur="true">
          <div class="main jy_all_top jy_state_top">
            <div class="header">
              <div class="top">
                <a class="left" @click.stop="shExtString6=false"><i class="iconfont">&#xe613;</i></a><a class="right" @click.stop="makeSureExtString6()">确定</a><p>{{settingExtString6.key?settingExtString6.name:'默认渠道'}}</p>
              </div>
            </div>
            <div class="jy_art_content">
              <div class="setting">
                <div>
                  <label>报名人数</label><input type="number" placeholder="请填写报名人数" v-model="settingExtString6.limit"/>
                </div>
                <p></p>
                <div>
                  <label>报名费用</label><input type="number" placeholder="请填写报名费用" v-model="settingExtString6.fee"/>
                </div>
                <p></p>
                <div>
                  <label>男士人数</label><input type="number" placeholder="请填写报名人数" v-model="settingExtString6.boyLimit"/>
                </div><p></p>
                <div>
                  <label>男士费用</label><input type="number" placeholder="请填写报名费用" v-model="settingExtString6.boyFee"/>
                </div><p></p>
                <div>
                  <label>女士人数</label><input type="number" placeholder="请填写报名人数" v-model="settingExtString6.girlLimit"/>
                </div><p></p>
                <div>
                  <label>女士费用</label><input type="number" placeholder="请填写报名费用" v-model="settingExtString6.girlFee"/>
                </div>
                <div v-if="settingExtString6.key" class="switch_div">
                  <label>是否需要渠道认证</label><inline-x-switch :value-map="['0', '1']"  v-model="settingExtString6.needVerify"></inline-x-switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import Loading from '@other/loading.vue';
  import Back from '@other/back.vue';
  import selectPhoto from '../plugs/selectPhoto'
  import {TransferDom, Group, Popup, PopupPicker, XDialog ,Datetime ,CheckIcon,InlineXSwitch } from 'vux';
  import Vue from 'vue';
  import vueQuillEditor from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import myScroller from '@other/myScroller.vue';

  Vue.use(vueQuillEditor)
  export default {
    name: "publishBlindDate",
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
      CheckIcon,
      myScroller,
      InlineXSwitch
    },
    data() {
      return {
        isloading: false,
        id: null,
        file: '',
        poster: null,//海报
        coverFile: '',
        coverFileList: null,
        cover: '',//封面
        shType:false,
        typeText: '线下',
        typeVal: '2',
        typeList: [[
          {name: '线上',value: '1'},
          {name: '线下',value: '2'},
        ]],
        typeArr: ['2'],
        lineType: {"1": "线上", "2": "线下"},

        activityState:0,//活动状态

        shExtString6:false,
        extString6:{},//报名渠道信息
        settingExtString6:{},//当前设置的渠道内容

        shExtString7:false,//分享标题
        extString7:'',

        shExtString8:false,//分享描述
        extString8:'',

        shActivityTitle:false,
        activityTitle: '',

        shNumberOfPeople: false,
        numberOfPeople: null,

        shRegistrationFee: false,
        registrationFee: null,
        extInt8:null,//男生报名人数限制
        extInt9:null,//女生报名人数限制
        extDouble:null,//男生报名费用
        extDouble2:null,//女生报名费用


        shAddressPopup:false,
        shAddress: false,
        addressText: '',
        addressCityId: 0,
        addressAreaId: 0,
        addressDetailText: '',
        addressList: [],
        addressArr: [],

        shStartTime: false,
        startTime: '',
        minuteList:['00','05','10','15','20','25','30','35','40','45','50','55'],

        shSpecialType: false,
        specialTypeText: '',
        specialTypeVal: '',
        specialTypeList: [],
        specialTypeArr: [],
        specialType:null,

        shBMStartTime: false,
        bmStartTime: '',
        shBMEndTime: false,
        bmEndTime:'',

        shTheme:false,
        theme: '',

        shNavigation: false,
        navigation: '',
        navigationImg:'',
        navigationFile: '',
        navigationEditorOption:{
          placeholder:"请输入地址导航",
          modules:{
            toolbar:[
            ]
          }
        },

        shActivityProcess: false,
        activityProcess: '',
        activityProcessImg:'',
        activityProcessFile: '',
        activityProcessEditorOption:{
          placeholder:"请输入活动流程",
          modules:{
            toolbar:[
            ]
          }
        },
        arrImg: [],

        shOrganizer: false,
        organizerFrom: [],
        hostPartys: [],
        coOrganiserFrom: [],
        shOrganizerList: false,
        assistingPartys: [],
        isOrganizer: false,
        checkOrganizerList: [],
        organizerList: [],
        checkCoOrganizerList: [],
        coOrganizerList: [],
        searchKey:null,
        //分页参数
        pageNo: 1,
        isRead: false,
        isEnd: false,
        loadRefresh:true,//下拉刷新
        loadInfinite:true, //上拉加载

        shActivityTips: false,
        activityTips: '',
        activityTipsImg:'',
        activityTipsFile: '',
        activityTipsEditorOption:{
          placeholder:"请输入活动提示",
          modules:{
            toolbar:[
            ]
          }
        },
        hostPartyList:[],
        assistingPartyList:[],
      }
    },
    created() {

    },
    destroyed() {
    },
    async mounted() {
      if(this.$route.query.id){
        this.id = this.$route.query.id;
      }
      this.getDistrict();
      this.getSpecialType();

      if( this.id){
        await this.getSpecialTypeText();
        this.getBlindDateSingle();
      }else{
        let result = await this.$server.channelList({
          page:1,
          rows:1000
        })
        let resultList=result.data.list;
        resultList.forEach(v=>{
          this.extString6[v.code]={
            name:v.name,
            fee:null,
            boyFee:null,
            girlFee:null,
            limit:null,
            boyLimit:null,
            girlLimit:null,
            needVerify:0//1是0否
          }
        })
        this.extString6=this.$utils.deepCopy(this.extString6);
      }
    },
    watch: {
      typeArr(){
        if (this.$refs.typePicker) {
          this.typeText = this.$refs.typePicker.getNameValues();
          this.typeVal = this.typeArr[0];
        }
      },
      specialTypeArr(){
        if (this.$refs.specialTypePicker) {
          this.specialTypeText = this.$refs.specialTypePicker.getNameValues();
          this.specialTypeVal = this.specialTypeArr[0];
        }
      },
      addressArr(){
        if (this.$refs.addressPicker) {
          this.addressText = this.$refs.addressPicker.getNameValues();
          this.addressCityId = this.addressArr[0];
          this.addressAreaId = this.addressArr[1];
        }
      },
    },
    computed:{
      startDate:function(){
        return this.$utils.format(new Date(),'yyyy-MM-dd');
      },
      endDate:function(){
        return this.$utils.getIntervalDate(this.$utils.format(new Date(),'yyyy-MM-dd'),90);
      },
    },
    methods: {
      makeSureExtString6(){
        if(this.settingExtString6.key){
          this.extString6[this.settingExtString6.key]=this.settingExtString6
          this.settingExtString6={};
          this.extString6=this.$utils.deepCopy(this.extString6);
        }else{
          this.numberOfPeople= this.settingExtString6.limit
          this.registrationFee= this.settingExtString6.fee
          this.extInt8=this.settingExtString6.boyLimit//男生报名人数限制
          this.extInt9=this.settingExtString6.girlLimit//女生报名人数限制
          this.extDouble=this.settingExtString6.boyFee//男生报名费用
          this.extDouble2=this.settingExtString6.girlFee//女生报名费用
        }
        this.shExtString6=false;
      },
      showExtString6(key,v){
        this.shExtString6=true;
        if(key){
          this.settingExtString6=this.$utils.deepCopy(v);
          this.settingExtString6.key=key;
        }else{
          this.settingExtString6={
            fee:this.registrationFee,
            boyFee:this.extDouble,
            girlFee:this.extDouble2,
            limit:this.numberOfPeople,
            boyLimit:this.extInt8,
            girlLimit:this.extInt9,
          }
        }
      },
      getFullPath(path) {
        return this.$utils.getFullPath(path)
      },
      async fileBack(obj) {//海报
        const t = this
        t.file = obj.file[0]//提交的图片
        if (t.file) {
          let param = new FormData() //创建form对象
          param.append('file', t.file, t.file.name) //单个图片 ，多个用循环 append 添加
          let result = await t.$server.uploadPic(param);
          t.poster = result.data.data.path
        } else {
          t.$vux.toast.show({
            type: "text",
            text: "图片出错",
            position: "bottom",
            width: "2rem",
          });
        }
      },
      async fileBackCover(obj) {//封面
        const t = this
        t.coverFile = obj.file[0]//提交的图片
        if (t.coverFile) {
          let param = new FormData() //创建form对象
          param.append('file', t.coverFile, t.coverFile.name) //单个图片 ，多个用循环 append 添加
          let result = await t.$server.uploadPic(param);
          t.cover = result.data.data.path
        } else {
          t.$vux.toast.show({
            type: "text",
            text: "图片出错",
            position: "bottom",
            width: "2rem",
          });
        }
      },
      async getDistrict() {
        let listData = await this.$server.getDistrict();
        this.addressList = listData.data.data;
      },
      async getSpecialType(){
        const t=this;
        try{
          const apiDict = await this.$server.apiDict({type:"blind_dating_special_type"});
          let item= apiDict.data.data;
          let specialType = [];
          for(let i=0;i<item.length;i++){
            specialType.push({name: item[i].label, value: item[i].value})
          }
          this.specialTypeList.push(specialType);
          if(specialType.length>0){
            this.specialTypeText=specialType[0].name
            this.specialTypeArr.push(specialType[0].value+'')
          }
        }catch(e){
          console.log(JSON.stringify(e));
        }
      },
      async getSpecialTypeText() {
        const t = this;
        try {
          const apiDict = await this.$server.apiDict({type: "blind_dating_special_type"});
          let item = apiDict.data.data;
          for (let i = 0; i < item.length; i++) {
            if (!t.specialType) {
              t.specialType = {};
            }
            t.specialType[item[i].value] = item[i].label;
          }
        } catch (e) {
          console.log(JSON.stringify(e));
        }
      },
      submitData(name) {
        if (name == 'extString7') {
          if (!this.extString7) {
            this.$vux.toast.show({
              type: 'text',
              text: '分享标题不能为空',
              position: 'middle',
              width: 'auto',
            })
            return false;
          }
          if (this.extString7.length< 5) {
            this.$vux.toast.show({
              type: 'text',
              text: '分享标题不少于5个字符',
              position: 'middle',
              width: 'auto',
            })
            return false;
          }
          this.shExtString7 = false;
        }
        if (name == 'extString8') {
          if (!this.extString8) {
            this.$vux.toast.show({
              type: 'text',
              text: '分享描述不能为空',
              position: 'middle',
              width: 'auto',
            })
            return false;
          }
          if (this.extString8.length< 5) {
            this.$vux.toast.show({
              type: 'text',
              text: '分享描述不少于5个字符',
              position: 'middle',
              width: 'auto',
            })
            return false;
          }
          this.shExtString8 = false;
        }
        if (name == 'activityTitle') {
          if (!this.activityTitle) {
            this.$vux.toast.show({
              type: 'text',
              text: '活动标题不能为空',
              position: 'middle',
              width: 'auto',
            })
            return false;
          }
          if (this.activityTitle.length< 5) {
            this.$vux.toast.show({
              type: 'text',
              text: '活动标题不少于5个字符',
              position: 'middle',
              width: 'auto',
            })
            return false;
          }
          this.shActivityTitle = false;
        }
        if (name == 'theme') {
          if (!this.theme) {
            this.$vux.toast.show({
              type: 'text',
              text: '相亲主题不能为空',
              position: 'middle',
              width: 'auto',
            })
            return false;
          }
          if (this.theme.length< 5) {
            this.$vux.toast.show({
              type: 'text',
              text: '相亲主题不少于5个字符',
              position: 'middle',
              width: 'auto',
            })
            return false;
          }
          this.shTheme = false;
        }
        else if (name == 'numberOfPeople') {
          if (!this.numberOfPeople) {
            this.$vux.toast.show({
              type: 'text',
              text: '报名人数不能为空',
              position: 'middle',
              width: 'auto',
            })
            return false;
          }
          this.shNumberOfPeople = false;
        }else if(name == 'registrationFee'){
          if (this.registrationFee<0) {
            this.$vux.toast.show({
              type: 'text',
              text: '报名费用不能小于0',
              position: 'middle',
              width: 'auto',
            })
            return false;
          }
          this.shRegistrationFee = false;
        }
      },
      focus(){
        if(window.api&&window.api.systemType == "ios")
          $(".main").addClass("focus")
      },
      blur(){
        if(window.api&&window.api.systemType == "ios")
          $(".main").removeClass("focus")
      },
      filter(en){
        if(this.registrationFee!='0'){
          this.registrationFee = this.fee.match(/[0-9]+/g)
        }
        if(!this.registrationFee)this.registrationFee = 0
        this.registrationFee = parseInt(this.registrationFee);
      },
      plusfee(){
        this.registrationFee = 10 + parseInt(this.registrationFee);
      },
      minusfee(){
        if(this.registrationFee<10){
          this.registrationFee=0
        }else{
          this.registrationFee -= 10;
        }
      },
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
        this.shAddressPopup = false;
      },
      onEditorBlur(e){
        const t=this;
        //console.log("onEditorBlur")
      },
      onEditorFocus(e){
        const t=this;
        //console.log("onEditorFocus")
      },
      onEditorChange(e){
        const t=this;
        //console.log("onEditorChange")
        //console.log(t.quillHtml)
      },
      getBase64(file,callback){
        const t=this;
        let maxWidth = 1280;
        /*if(file.size>t.$store.state.imgMaxSize){
                  // mualert.alertBox("图片不能超过800K");
                  t.$vux.toast.show({
                      type:"cancel",
                      text: t.$t('comment.maxSize'),
                      position:"middle",
                      width:"2rem",
                  });
                  return
              };  */
        let reader = new FileReader();
        reader.onload = function(event){
          let imgUrl = event.target.result;
          let img = new Image();
          img.onload = function(){
            let canvasId = 'canvasBase64Imgid',
              canvas = document.getElementById(canvasId);
            if(canvas!=null){document.body.removeChild(canvas);}
            canvas = document.createElement("canvas");
            canvas.innerHTML = 'New Canvas';
            canvas.setAttribute("id", canvasId);
            canvas.style.display='none';
            document.body.appendChild(canvas);
            canvas.width = this.width;
            canvas.height = this.height;
            let imageWidth = this.width,
              imageHeight = this.height;
            if (this.width > maxWidth){
              imageWidth = maxWidth;
              imageHeight = this.height * maxWidth/this.width;
              canvas.width = imageWidth;
              canvas.height = imageHeight;
            }
            let context = canvas.getContext('2d');
            context.clearRect(0, 0, imageWidth, imageHeight);
            context.drawImage(this, 0, 0, imageWidth, imageHeight);
            let base64 = canvas.toDataURL('image/jpeg',0.7);
            callback(base64);
            img.onload=null;
          }
          img.src = imgUrl;
        }
        reader.readAsDataURL(file);
      },
      async navigationFileBack (obj) {
        const t = this
        t.navigationFile = obj.file[0]//提交的图片
        if(t.navigationFile){
          console.log("图片大小:"+(t.file.size/1024)+"KB");
          if(t.navigationFile.size>1024*1024){  //大于1M进行再压缩
            t.getBase64(t.navigationFile,async (base64Codes)=>{
              let file=t.convertBase64UrlToBlob(base64Codes);
              let param = new FormData() //创建form对象
              param.append('file', file, t.navigationFile.name) //单个图片 ，多个用循环 append 添加
              //console.log("上传图片");
              const result = await t.$server.uploadPic(param);
              if(result.data.status==1){
                let img = '<img src="' + t.$utils.getFullPath(result.data.data.path) + '"/>';
                if(!t.ac){
                  t.navigationImg=result.data.data.path;
                }
                t.$refs.navigationEditor.quill.insertEmbed(1,'image',t.$utils.getFullPath(result.data.data.path));
              }
            });
          }else{
            let param = new FormData() //创建form对象
            param.append('file', t.navigationFile, t.navigationFile.name) //单个图片 ，多个用循环 append 添加
            //console.log("上传图片");
            const result = await t.$server.uploadPic(param);
            if(result.data.status==1){
              let img = '<img src="' + t.$utils.getFullPath(result.data.data.path) + '"/>';
              if(!t.navigationImg){
                t.navigationImg=result.data.data.path;
              }
              t.$refs.navigationEditor.quill.insertEmbed(1,'image',t.$utils.getFullPath(result.data.data.path));
            }
          }
        }else{
          t.$vux.toast.show({
            type:"text",
            text: "图片出错",
            position:"bottom",
            width:"2rem",
          });
        }
      },
      async activityProcessFileBack (obj) {
        const t = this
        t.activityProcessFile = obj.file[0]//提交的图片
        if(t.activityProcessFile){
          console.log("图片大小:"+(t.file.size/1024)+"KB");
          if(t.activityProcessFile.size>1024*1024){  //大于1M进行再压缩
            t.getBase64(t.activityProcessFile,async (base64Codes)=>{
              let file=t.convertBase64UrlToBlob(base64Codes);
              let param = new FormData() //创建form对象
              param.append('file', file, t.activityProcessFile.name) //单个图片 ，多个用循环 append 添加
              //console.log("上传图片");
              const result = await t.$server.uploadPic(param);
              if(result.data.status==1){
                let img = '<img src="' + t.$utils.getFullPath(result.data.data.path) + '"/>';
                if(!t.ac){
                  t.activityProcessImg=result.data.data.path;
                }
                t.$refs.activityProcessEditor.quill.insertEmbed(1,'image',t.$utils.getFullPath(result.data.data.path));
              }
            });
          }else{
            let param = new FormData() //创建form对象
            param.append('file', t.activityProcessFile, t.activityProcessFile.name) //单个图片 ，多个用循环 append 添加
            //console.log("上传图片");
            const result = await t.$server.uploadPic(param);
            if(result.data.status==1){
              let img = '<img src="' + t.$utils.getFullPath(result.data.data.path) + '"/>';
              if(!t.activityProcessImg){
                t.activityProcessImg=result.data.data.path;
              }
              t.$refs.activityProcessEditor.quill.insertEmbed(1,'image',t.$utils.getFullPath(result.data.data.path));
            }
          }
        }else{
          t.$vux.toast.show({
            type:"text",
            text: "图片出错",
            position:"bottom",
            width:"2rem",
          });
        }
      },
      async activityTipsFileBack (obj) {
        const t = this
        t.activityTipsFile = obj.file[0]//提交的图片
        if(t.activityTipsFile){
          console.log("图片大小:"+(t.file.size/1024)+"KB");
          if(t.activityTipsFile.size>1024*1024){  //大于1M进行再压缩
            t.getBase64(t.activityTipsFile,async (base64Codes)=>{
              let file=t.convertBase64UrlToBlob(base64Codes);
              let param = new FormData() //创建form对象
              param.append('file', file, t.activityTipsFile.name) //单个图片 ，多个用循环 append 添加
              //console.log("上传图片");
              const result = await t.$server.uploadPic(param);
              if(result.data.status==1){
                let img = '<img src="' + t.$utils.getFullPath(result.data.data.path) + '"/>';
                if(!t.ac){
                  t.activityTipsImg=result.data.data.path;
                }
                t.$refs.activityTipsEditor.quill.insertEmbed(1,'image',t.$utils.getFullPath(result.data.data.path));
              }
            });
          }else{
            let param = new FormData() //创建form对象
            param.append('file', t.activityTipsFile, t.activityTipsFile.name) //单个图片 ，多个用循环 append 添加
            //console.log("上传图片");
            const result = await t.$server.uploadPic(param);
            if(result.data.status==1){
              let img = '<img src="' + t.$utils.getFullPath(result.data.data.path) + '"/>';
              if(!t.activityTipsImg){
                t.activityTipsImg=result.data.data.path;
              }
              t.$refs.activityTipsEditor.quill.insertEmbed(1,'image',t.$utils.getFullPath(result.data.data.path));
            }
          }
        }else{
          t.$vux.toast.show({
            type:"text",
            text: "图片出错",
            position:"bottom",
            width:"2rem",
          });
        }
      },
      convertBase64UrlToBlob(urlData){
        var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
      },
      getCursorPosition(elem){//获取光标所在位置
        if(window.getSelection){
          return elem.selectionStart;
        }else if(document.selection){
          elem.focus();
          var range = document.selection.createTextRange();
          range.moveStart('character',-elem.value.length);
          return range.text.length;
        }
        return elem.value.length;
      },
      setCursorPosition(elem, position){
        if(window.getSelection){
          elem.focus();
          elem.setSelectionRange(position,position);
        }else if(document.selection){
          var range = elem.createTextRange();
          range.collapse(true);
          range.moveEnd('character',position);
          range.moveStart('character',position);
          range.select();
        }
      },
      hidePopup(ele,hide){
        const imgReg = /<img.*?(?:>|\/>)/gi;
        const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        if(ele == 'navigation'){
          const navigationArr = this.navigation.match(imgReg);
          if(navigationArr){
            this.navigationImg=navigationArr[0].match(srcReg);
            this.navigationImg=this.navigationImg[1]&&this.navigationImg[1].replace(new RegExp(this.$store.state.imageUrl, 'g'), "");
          }
          if(!this.navigation.replace(new RegExp(this.$store.state.imageUrl, 'g'), "")){
            this.$vux.toast.show({
              type: "cancel",
              text: "地址导航不能为空",
              position: "middle",
              width: "auto",
            });
            return;
          }
          this.shNavigation = false;
        }
        if(ele == 'activityProcess'){
          const activityProcessArr = this.activityProcess.match(imgReg);
          if(activityProcessArr){
            this.activityProcessImg=activityProcessArr[0].match(srcReg);
            this.activityProcessImg=this.activityProcessImg[1]&&this.activityProcessImg[1].replace(new RegExp(this.$store.state.imageUrl, 'g'), "");
          }
          if(!this.activityProcess.replace(new RegExp(this.$store.state.imageUrl, 'g'), "")){
            this.$vux.toast.show({
              type: "cancel",
              text: "活动流程不能为空",
              position: "middle",
              width: "auto",
            });
            return;
          }
          this.shActivityProcess = false;
        }
        if(ele == 'activityTips'){
          const activityTipsArr = this.activityTips.match(imgReg);
          if(activityTipsArr){
            this.activityTipsImg=activityTipsArr[0].match(srcReg);
            this.activityTipsImg=this.activityTipsImg[1]&&this.activityTipsImg[1].replace(new RegExp(this.$store.state.imageUrl, 'g'), "");
          }
          if(!this.activityTips.replace(new RegExp(this.$store.state.imageUrl, 'g'), "")){
            this.$vux.toast.show({
              type: "cancel",
              text: "活动提示不能为空",
              position: "middle",
              width: "auto",
            });
            return;
          }
          this.shActivityTips = false;
        }
      },
      // async logoFileBack(obj) {//海报
      //   const t = this
      //   t.logoFile = obj.file[0]//提交的图片
      //   if (t.logoFile) {
      //     let param = new FormData() //创建form对象
      //     param.append('file', t.logoFile, t.logoFile.name) //单个图片 ，多个用循环 append 添加
      //     let result = await t.$server.uploadPic(param);
      //     t.organizerFrom[this.index].logoPath = result.data.data.path
      //   } else {
      //     t.$vux.toast.show({
      //       type: "text",
      //       text: "图片出错",
      //       position: "bottom",
      //       width: "2rem",
      //     });
      //   }
      // },
      async getOrganizerList(searchKey,flag) {
        const _this = this;
        if (_this.isRead) {
          return false;
        }
        _this.isRead = true;
        if (_this.isRefresh || flag || _this.searchKey!=searchKey) {
          _this.pageNo = 1;
          if (flag) {
            _this.isloading = true;
          }
        }
        try {
          let data = {
            unitName: _this.searchKey,
            page: _this.pageNo,
            rows: _this.$store.state.pageSize
          };
          if (!_this.listArr || _this.isRefresh || flag || _this.searchKey!=searchKey) {
            _this.$refs.myScroller.scrollTo(1);
            _this.organizerList = [];
          }
          let result = await _this.$server.getOrganizerList(data);
          if(result.data.list){
            _this.organizerList.push(...result.data.list);
          }
          if (result.data.count <= _this.$store.state.pageSize * _this.pageNo || result.data.list.length < _this.$store.state.pageSize) {//判断是否最后一页
            _this.isEnd = true;
          } else {
            _this.isEnd = false;
            _this.$refs.myScroller.finishInfinite(false);
          }
        }catch (e) {
          console.log(e)
        }
        _this.isRead = false;
        _this.isloading = false;
        _this.isRefresh = false;
        _this.pageNo++;

        if(_this.id){
          if(_this.hostPartyList && _this.hostPartyList.length>0){
            for(let i=0;i<_this.hostPartyList.length;i++){
              for(let j=_this.organizerList.length;j--;){
                console.log(_this.organizerList[j]);
                if(_this.hostPartyList[i].id==_this.organizerList[j].id){
                  _this.checkOrganizerList.push(j)
                }
              }
            }
          }
          if(_this.assistingPartyList && _this.assistingPartyList.length>0){
            for(let i=0;i<_this.assistingPartyList.length;i++){
                for(let j=_this.organizerList.length;j--;){
                if(_this.assistingPartyList[i].id==_this.organizerList[j].id){
                  _this.checkCoOrganizerList.push(j)
                }
              }
            }
          }
        }
      },
      infinite(done) {//上拉加载(防止初始内容不满一屏会无限加载)
        const t=this;
        if(t.isEnd){
          done(true);
          return false;
        }
        console.log("加载");
        t.getOrganizerList(this.searchKey).then(()=>{
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
        t.getOrganizerList(this.searchKey).then((res)=>{
          done();
        });
      },
      search(event) {
        this.getOrganizerList(this.searchKey,true);
      },
      confirmSelect(){
        // if(this.hostPartys.length <= 0){
        //   this.$vux.toast.show({
        //     type: "text",
        //     text: "请选择主办单位",
        //     position: "bottom",
        //     width: "2rem",
        //   });
        //   return false;
        // }
        this.shOrganizer = false;
      },
      confirmOranizer() {
          if (this.isOrganizer == 1) {
            if(this.checkOrganizerList.length>0){
              this.organizerFrom = [];
              this.hostPartys = [];
              for (let k in this.checkOrganizerList){
                this.hostPartys.push(this.organizerList[this.checkOrganizerList[k]].id);
                this.organizerFrom.push({id: this.organizerList[this.checkOrganizerList[k]].id,logoUrl: this.organizerList[this.checkOrganizerList[k]].logoUrl, unitName: this.organizerList[this.checkOrganizerList[k]].unitName});//选择主办单位
              }
            }else{
              this.$vux.toast.show({
                type: "text",
                text: "请选择单位",
                position: "bottom",
                width: "2rem",
              });
              return false;
            }
          } else {
            this.coOrganiserFrom = [];
            this.assistingPartys = [];
            if(this.checkCoOrganizerList.length>0){
              for (let k in this.checkCoOrganizerList) {
                this.assistingPartys.push(this.organizerList[this.checkCoOrganizerList[k]].id);
                this.coOrganiserFrom.push({id: this.organizerList[this.checkCoOrganizerList[k]].id,logoUrl: this.organizerList[this.checkCoOrganizerList[k]].logoUrl,unitName: this.organizerList[this.checkCoOrganizerList[k]].unitName });//选择协办单位
              }
            }else{
              this.$vux.toast.show({
                type: "text",
                text: "请选择单位",
                position: "bottom",
                width: "2rem",
              });
              return false;
            }
          }
          this.shOrganizerList = false;
      },
      select(index){
        this.isOrganizer = index;
        this.shOrganizerList = true;
        const _this = this;
      },
      removeOrganizer(index,id){//移除主办单位
        this.checkOrganizerList.splice(index, 1);
        this.organizerFrom.splice(index, 1);
        if(this.hostPartys.length>0){
          for (let i in this.hostPartys){
            if(this.hostPartys[i] == id){
              this.hostPartys.splice(i, 1);
            }
          }
        }
      },
      removeCoOrganizer(index,id){//移除协办单位
        this.checkCoOrganizerList.splice(index, 1);
        this.coOrganiserFrom.splice(index, 1);
        if(this.assistingPartys.length>0){
          for (let i in this.assistingPartys){
            if(this.assistingPartys[i] == id){
              this.assistingPartys.splice(i, 1);
            }
          }
        }
      },
      async getBlindDateSingle() {
        const _this = this;
        const result = await _this.$server.blindDatingSingle({datingDetailsId: _this.id });
        let data = result.data.data;
        _this.poster = data.coverimgImages;//活动宣传图（海报）
        _this.activityState = data.state;//活动状态
        _this.cover = data.datingDetailsExt.extString;//活动缩略图（封面图）
        _this.typeText = data.datingDetailsExt.extIntName;
        _this.typeVal = data.datingDetailsExt.extInt;//相亲类型：字典组	blind_dating_line_type
        _this.typeArr = [data.datingDetailsExt.extInt+""];
        _this.activityTitle = data.datingTitle;//活动标题
        _this.numberOfPeople = data.datingDetailsExt.extInt4;//报名人数
        _this.extString6=JSON.parse(data.datingDetailsExt.extString6);//渠道报名
        _this.extString7=data.datingDetailsExt.extString7;
        _this.extString8=data.datingDetailsExt.extString8;

        _this.extInt8=data.datingDetailsExt.extInt8;//渠道报名
        _this.extInt9=data.datingDetailsExt.extInt9;//渠道报名
        _this.extDouble=data.datingDetailsExt.extDouble;//渠道报名
        _this.extDouble2=data.datingDetailsExt.extDouble2;//渠道报名

        _this.registrationFee = data.enrollFee;//报名人数
        if(data.areaName || data.cityName){
          _this.addressArr.push(data.cityId,data.areaId)
          _this.$nextTick(()=>{
            _this.addressText = data.cityName+" "+ data.areaName;
            _this.addressCityId = data.cityId;
            _this.addressAreaId = data.areaId;
          })
        }
        _this.addressDetailText = data.datingLocation;
        _this.startTime = data.activityStarttime?data.activityStarttime.substring(0,16):'';
        _this.specialTypeText = _this.specialType[data.datingDetailsExt.extInt5];
        _this.specialTypeVal = data.datingDetailsExt.extInt5;//专场类型：字典 blind_dating_special_type
        _this.specialTypeArr = [data.datingDetailsExt.extInt5+""];
        _this.bmStartTime = data.datingDetailsExt.extDatetime?data.datingDetailsExt.extDatetime.substring(0,16):"";
        _this.bmEndTime = data.datingDetailsExt.extDatetime2?data.datingDetailsExt.extDatetime2.substring(0,16):"";
        _this.theme = data.datingDesc;
        const imgReg = /<img.*?(?:>|\/>)/gi;
        const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        if (data.datingDetailsExt.extString2) {
          let content = data.datingDetailsExt.extString2;
          const arr = data.datingDetailsExt.extString2.match(imgReg);
          if (arr) {
            let arrImg = [];
            arr.forEach((v, i) => {
              const src = v.match(srcReg)[1];
              arrImg.push({
                id: i,
                src
              });
              let reg = new RegExp('<img src=\"' + src + '\"', 'g');
              content = content.replace(reg, '<img data-id="' + i + '" src="' + _this.$utils.getFullPath(src) + '"');
            });
          }
          _this.navigation = content;
        }
        if (data.datingDetailsExt.extString3) {
          let content = data.datingDetailsExt.extString3;
          const arr = data.datingDetailsExt.extString3.match(imgReg);
          if (arr) {
            let arrImg = [];
            arr.forEach((v, i) => {
              const src = v.match(srcReg)[1];
              arrImg.push({
                id: i,
                src
              });
              let reg = new RegExp('<img src=\"' + src + '\"', 'g');
              content = content.replace(reg, '<img data-id="' + i + '" src="' + _this.$utils.getFullPath(src) + '"');
            });
          }
          _this.activityProcess = content;
        }
        if (data.datingDetailsExt.extString5) {
          let content = data.datingDetailsExt.extString5;
          const arr = data.datingDetailsExt.extString5.match(imgReg);
          if (arr) {
            let arrImg = [];
            arr.forEach((v, i) => {
              const src = v.match(srcReg)[1];
              arrImg.push({
                id: i,
                src
              });
              let reg = new RegExp('<img src=\"' + src + '\"', 'g');
              content = content.replace(reg, '<img data-id="' + i + '" src="' + _this.$utils.getFullPath(src) + '"');
            });
          }
          _this.activityTips = content;
        }
        if(data.hostPartyList && data.hostPartyList.length>0){
          for(let i=0;i<data.hostPartyList.length;i++){
            _this.hostPartys.push(data.hostPartyList[i].company.id);
            _this.organizerFrom.push({id: data.hostPartyList[i].company.id,logoUrl: data.hostPartyList[i].company.logoUrl, unitName: data.hostPartyList[i].company.unitName})
          }
          _this.hostPartyList =  _this.organizerFrom
        }
        _this.assistingPartyList= data.assistingPartyList;
        if(data.assistingPartyList && data.assistingPartyList.length>0){
          for(let i=0;i<data.assistingPartyList.length;i++){
            this.assistingPartys.push(data.assistingPartyList[i].company.id);
            _this.coOrganiserFrom.push({id: data.assistingPartyList[i].company.id,logoUrl: data.assistingPartyList[i].company.logoUrl, unitName: data.assistingPartyList[i].company.unitName})
          }
          _this.assistingPartyList =  _this.coOrganiserFrom
        }
      },
      async save(state) {
        if (!this.typeVal) {
          this.$vux.toast.show({
            type: "cancel",
            text: "相亲类型不能为空",
            position: "middle",
            width: "auto",
          });
          return;
        }
        if (!this.specialTypeVal) {
          this.$vux.toast.show({
            type: "cancel",
            text: "专场类型不能为空",
            position: "middle",
            width: "auto",
          });
          return;
        }
        if (!this.theme) {
          this.$vux.toast.show({
            type: "cancel",
            text: "相亲主题不能为空",
            position: "middle",
            width: "auto",
          });
          return;
        }
        if(state==3){
          if (!this.poster) {
            this.$vux.toast.show({
              type: "cancel",
              text: "海报不能为空",
              position: "middle",
              width: "auto",
            });
            return;
          }
          if (!this.cover) {
            this.$vux.toast.show({
              type: "cancel",
              text: "封面图不能为空",
              position: "middle",
              width: "auto",
            });
            return;
          }
          if (!this.activityTitle) {
            this.$vux.toast.show({
              type: "cancel",
              text: "活动标题不能为空",
              position: "middle",
              width: "auto",
            });
            return;
          }
          if (!this.numberOfPeople) {
            this.$vux.toast.show({
              type: "cancel",
              text: "报名人数不能为空",
              position: "middle",
              width: "auto",
            });
            return;
          }
          if (!this.addressText) {
            this.$vux.toast.show({
              type: "cancel",
              text: "活动地点不能为空",
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
          if (!this.extString7) {
            this.$vux.toast.show({
              type: "cancel",
              text: "分享标题不能为空",
              position: "middle",
              width: "auto",
            });
            return;
          }
          if (!this.extString8) {
            this.$vux.toast.show({
              type: "cancel",
              text: "分享描述不能为空",
              position: "middle",
              width: "auto",
            });
            return;
          }
        }
        const imgReg = /<img.*?(?:>|\/>)/gi;
        const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        const navigationArr = this.navigation.match(imgReg);
        const activityProcessArr = this.activityProcess.match(imgReg);
        const activityTipsArr = this.activityTips.match(imgReg);
        if(navigationArr){
          this.navigationImg=navigationArr[0].match(srcReg);
          this.navigationImg=this.navigationImg[1]&&this.navigationImg[1].replace(new RegExp(this.$store.state.imageUrl, 'g'), "");
        }
        if(activityProcessArr){
          this.activityProcessImg=activityProcessArr[0].match(srcReg);
          this.activityProcessImg=this.activityProcessImg[1]&&this.activityProcessImg[1].replace(new RegExp(this.$store.state.imageUrl, 'g'), "");
        }
        if(activityTipsArr){
          this.activityTipsImg=activityTipsArr[0].match(srcReg);
          this.activityTipsImg=this.activityTipsImg[1]&&this.activityTipsImg[1].replace(new RegExp(this.$store.state.imageUrl, 'g'), "");
        }
        if(state==3){
          if (!this.navigation.replace(new RegExp(this.$store.state.imageUrl, 'g'), "")) {
            this.$vux.toast.show({
              type: "cancel",
              text: "地址导航不能为空",
              position: "middle",
              width: "auto",
            });
            return;
          }
          if (!this.activityProcess.replace(new RegExp(this.$store.state.imageUrl, 'g'), "")) {
            this.$vux.toast.show({
              type: "cancel",
              text: "活动流程不能为空",
              position: "middle",
              width: "auto",
            });
            return;
          }
          // if (this.hostPartys<=0){
          //   this.$vux.toast.show({
          //     type: "cancel",
          //     text: "举办单位不能为空",
          //     position: "middle",
          //     width: "auto",
          //   });
          //   return false;
          // }
          // if (this.assistingPartys.length<=0){
          //   this.$vux.toast.show({
          //     type: "cancel",
          //     text: "协办单位不能为空",
          //     position: "middle",
          //     width: "auto",
          //   });
          //   return false;
          // }
          if (!this.activityTips.replace(new RegExp(this.$store.state.imageUrl, 'g'), "")) {
            this.$vux.toast.show({
              type: "cancel",
              text: "活动提示不能为空",
              position: "middle",
              width: "auto",
            });
            return;
          }
        }
        let stateNum = state;
        let datingDetailsExt = {
          extInt: this.typeVal,
          extInt4: this.numberOfPeople,
          extInt5: this.specialTypeVal,
          extInt8: this.extInt8,
          extInt9: this.extInt9,
          extDouble:this.extDouble,
          extDouble2:this.extDouble2,
          extString: this.cover,
          extString2: this.navigation&&this.navigation.replace(new RegExp(this.$store.state.imageUrl, 'g'), ""),
          extString3: this.activityProcess&&this.activityProcess.replace(new RegExp(this.$store.state.imageUrl, 'g'), ""),
          extString5: this.activityTips&&this.activityTips.replace(new RegExp(this.$store.state.imageUrl, 'g'), ""),
          extString6:JSON.stringify(this.extString6),
          extString7:this.extString7,
          extString8:this.extString8,
          extDatetime: this.bmStartTime&&this.bmStartTime+ ":00",
          extDatetime2: this.bmEndTime&&this.bmEndTime+ ":59"
        };
        this.$vux.loading.show()
        let postdataobj={
          id: this.id,
          datingTitle: this.activityTitle,
          activityStarttime: this.startTime&&this.startTime+":00",//相亲开始时间
          state: stateNum,//3发布，2保存
          cityId: this.addressCityId,//城市ID
          areaId: this.addressAreaId,//区县ID
          datingLocation: this.addressDetailText,//约会地点
          enrollFee: this.registrationFee,//报名费用
          datingDesc: this.theme,//相亲主题
          coverimgImages: this.poster,//活动宣传图
          datingDetailsExt: datingDetailsExt,
          hostPartys: this.hostPartys&&this.hostPartys.join(','),
          assistingPartys: this.assistingPartys&&this.assistingPartys.join(','),
          sponsor: 0,
        }
        let result=null;
        if(this.activityState==3||this.activityState==6){
          result = await this.$server.modifyBlindDate(postdataobj);
        }else{
          result = await this.$server.publishBlindDate(postdataobj);
        }
        console.log(JSON.stringify(result))
        this.id = result.data.data.id;
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: "success",
          text: '保存成功',
          position: "middle",
          width: "auto",
        });
        if(state == 3){
          setTimeout(() => {
            this.$router.go(-1);
          }, 500)
        }else{
          this.$router.replace({
            path: 'publishBlindDate',
            query:{
              id:this.id
            }
          })
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .focus{
    &:before{
       position: absolute !important;
     }
    .header{
      position: absolute !important;
    }
  }
  .setting>div{
    display: flex;
    justify-content:space-between;
    padding: 0 0.45rem;
    height: 1.5rem;
    background-color: #FFF;
    align-items:center ;
    font-size: 0.4rem;
    input{
      font-size: 0.4rem;
      width: 3rem;
      padding: 5px 0;
      &::-moz-placeholder { color: #dddddd; }
      &::-webkit-input-placeholder { color:#dddddd; }
      &:-ms-input-placeholder { color:#dddddd; }
    }
  }
  .setting>p{
    height: 1px;
    color:#f2f2f2;
    transform: translateY(0.5);
  }
  .setting>div.switch_div{
    height: 1.54rem;
    margin-top: 0.36rem;
    label{
      font-weight: 500;
      border-left: 2px solid #ff4200;
      line-height: 1;
      padding-left: 10px;
    }
    input{
      height: 0.6rem;
      width: 1.3rem;
      padding: 0;
      border-radius: 0.3rem;
      box-sizing:content-box;
    }
    .weui-switch:before, .weui-switch-cp__box:before {
      height: 0.6rem;
      width: 1.3rem;
      border-radius: 0.3rem;
    }
    .weui-switch:after, .weui-switch-cp__box:after {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 0.3rem;
    }
  }
  .weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box{
    border-color: #ff4200;
    background-color: #ff4200;
  }
  .weui-switch:checked:after, .weui-switch-cp__input:checked ~ .weui-switch-cp__box:after {
    transform: translateX(0.7rem);
  }
</style>
