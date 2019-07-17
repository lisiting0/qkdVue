import {store} from '@/store';
import router from '../routers';
export default class myUtils {
  /**
   * 判断字符串是否为空
   * @param str
   * @returns {boolean}
   */
  static isNull(str) {
    return str == null || str.length === 0 || str === '';
  }

  /**
   *
   * @desc  判断是否为身份证号
   * @param  {String|Number} str
   * @return {Boolean}
   */
  static isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  }

  /**
   *
   * @desc  深克隆  可以拷贝数组、对象、方法，缺点：不能复制不可枚举属性，如constructor，prototype等
   * @param  {object} o
   * @return {object}
   */
  static deepCopy(o) {
    if (o instanceof Array) {
      let n = [];
      for (let i = 0; i < o.length; ++i) {
        n[i] = this.deepCopy(o[i]);
      }
      return n;
    } else if (o instanceof Function) {
      let n = new Function("return " + o.toString())();
      return n
    } else if (o instanceof Object) {
      let n = {}
      for (let i in o) {
        n[i] = this.deepCopy(o[i]);
      }
      return n;
    } else {
      return o;
    }
  }

  /**
   *
   * @desc   判断是否为手机号
   * @param  {String|Number} str
   * @return {Boolean}
   */
  static isPhoneNum(str) {
    return /^(0|86|17951)?(1[3-9][0-9])[0-9]{8}$/.test(str)
  }

  static formarDistance(str,e=2) {
    let result='';
    str = parseFloat(str)
    if(str){
		let t=1;
		for(;e>0;t*=10,e--);
		for(;e<0;t/=10,e++);
		return Math.round(str/1000*t)/t+'km';//转换成km
		
     // result = str.length>3?(Math.round(str/10)/100)+'km':Math.round(str)+'m'
    }
    return result
  }

  /**
   *
   * @param date 日期对象
   * @param format 格式化目标字符串 yyyy-MM-dd hh:mm:ss
   * @returns {*}
   */
  static format(date,format){
    let o = {
      "M+" : date.getMonth()+1, //month
      "d+" : date.getDate(), //day
      "h+" : date.getHours(), //hour
      "m+" : date.getMinutes(), //minute
      "s+" : date.getSeconds(), //second
      "q+" : Math.floor((date.getMonth()+3)/3), //quarter
      "S" : date.getMilliseconds() //millisecond
    }

    if(/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(let k in o) {
      if(new RegExp("("+ k +")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
      }
    }
    return format;
  }

  static lastMonth=function(date){
    let myDate = date;
    let ary = this.toArray(myDate);
    let relativeDate = (new Date(ary[0],ary[1],1));//当前月的第一天

    //一天的毫秒数
    let millisecond = 1000 * 60 * 60 * 24;

    //返回得到上月的最后一天
    return this.toArray(new Date(relativeDate.getTime() - millisecond));
  }

  static getIntervalDate=function(date,interval){
    var baseDate=new Date(Date.parse(date.replace(/-/g,"/")));
    var baseYear=baseDate.getFullYear();
    var baseMonth=baseDate.getMonth();
    var baseDate=baseDate.getDate();
    //处理
    var newDate = new Date(baseYear,baseMonth,baseDate);
    newDate.setDate(newDate.getDate()+interval);//取得系统时间的相差日期,interval 为负数时是前几天,正数时是后几天
    var temMonth=newDate.getMonth();
    temMonth++;
    var lastMonth=temMonth >= 10?temMonth:("0"+temMonth)
    var temDate=newDate.getDate();
    var lastDate=temDate >= 10?temDate:("0"+temDate)
    //得到最终结果
    newDate = newDate.getFullYear() + "-" + lastMonth + "-" + lastDate;
    return newDate;
  }

  static formatMessageTime(datetime){
    let date = new Date(Date.parse(datetime.replace(/-/g,"/")));
    let times = Math.floor(new Date().getTime()/1000)-Math.floor(date.getTime()/1000);
    if(times<0){
      return "刚刚";
    }else if(times<60){
      return "刚刚";
    }else if(times<60*60){
      return Math.floor(times/60)+"分钟前";
    }else if(times<86400){
      return Math.floor(times/3600)+"小时前";
    }else{
      return datetime
    }
    return '';
  }

  static getMessageTimeFromNow(datetime) {
    let date2 = new Date();
    let date = new Date(Date.parse(datetime.replace(/-/g,"/")));
    let date3 = Date.parse((this.format(date2,"yyyy-MM-dd 00:00:00")).replace(/-/g,"/"));
    let times = Math.floor((date2.getTime()-date.getTime())/1000)
    let times2 = Math.floor((date2.getTime()-date3)/1000)
    let ifthisyear = false;
    if(this.format(date,"yyyy")==this.format(date2,"yyyy")){
      ifthisyear=true;
    }
    if(times<0){
      return "刚刚";
    }else if(times<60){
      return "刚刚";
    }else if(times<60*60){
      return Math.floor(times/60)+"分钟前";
    }else if(times<times2){
      return Math.floor(times/3600)+"小时前";
    }else if(times<(times2+86400)){
      return "昨天";
    }else if(times<(times2+86400*6)){
      let show_day=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
      return show_day[date.getDay()]
    }else{
      if(ifthisyear){
        return this.format(date,"MM-dd")
      }
      return this.format(date,"yyyy-MM-dd")
    }
    return '';
  }

  static getFullPath(path,size){//图片/音频等补全路径
	if(!path){//默认的头像
		return 'data:image/gif;base64,R0lGODlhLAHIAJEAAObm5vX19e/v7wAAACH5BAAHAP8ALAAAAAAsAcgAAAL/jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydn5IwAKIDpKCgAK6vl3WsraOoqaehfqSlsrEDsnULvLi/umyxts66sGLHzsSnxmjNzMqkzmLG17C73FPJ3NWm19pf1Ny90tBV7uKj7OhG3Obpru1B5Piv5uJH8vSl8vtI5vrr/PRz9//wIOIUjQYJCBCM0p/NGQIMCHNBhGLEdxx0WJ/xlxWNwIruMNkAlF1iDpb6JJFR9Ralspw2VKmDBk4lNJk0RLm9NyttjJ05lPFkHvDV1RVB7Oox6SxlvKlIPTeFFNAJ0qrGqJq1h7aR3BtWutr2DFYiQbIqzZVlDRTlC7tlRbtxHgxn1F14Pdu+7ycth7d67fBoDjCh68oPDaw4gTKDbbeAPfnpEzTJZW2fLlZpkxbObc2cJjrIxDj55aOvRnYak7rw4W2vPrXbEvnC7auvPtoLkzz6Zdm8Jvr8Eh7Hbae/Bw2MUfLCfePPHzXcnpHkcdncF15NkZTB/WXcF3WuEXjE9WPsH5Vukdr5/XXv17UfHlz6+PYLvN6ojv4/+3/91/5k3Hn27LCQjBbwXW9huCCc7m4AP63RShc6tVKOFnCzb3GYbGXbZhdJOFmB1fHr5l2IkoikVieZCpWEFXMF4w1YyyBWWjZjblqIFMLVY4IVs8dkDSkESCZKRUSCbZ45JM3njRkzpGKSWNTlYp3JVYSlDklllu5OWXVIYZQZdkPgjmmWiOqWYDZrbpnZZwAhjRj0CSZGeELs2pQJDk8WmAn+EAGgBvcwrKS57lIZoVmWYpWhuj00BamaTfwDKjpexQ+pWmFAo4y3uYhhfqfPNwqpCnvKE6jqqkVWrqpXm5CiJZtK7GaiW3KjhUrGmutOt3uS7iq0vDHhKsfwZjJWvqssUmtQ+zxb4j7bPpPNvVsXtgyyI01XILADTgduvLt+MSM+6juJibLi7pLpYKu++m8m5c9NarLify1tsJvvZy4i+8mwScbyb71qutGwfzqwnBaw3ssFgQR4zVxBQ7BUUBADs=';
	}
    if(/^http*/.test(path)){
      return path;
    }else{
		let diff=path.split(".");
		if(diff[1]&&diff[1].indexOf("!w")!=-1){
			return store.state.imageUrl+path;
		}
		if(diff[1]&&["jpg","jpeg","png"].includes(diff[1].toLowerCase())){
			if(size){
				return store.state.imageUrl+path+"!w"+size;
			}
			 return store.state.imageUrl+path+"!w720";
		}
        return store.state.imageUrl+path;
    }
  }

  static getMapImgUrl(lon,lat){
    return `http://api.map.baidu.com/staticimage/v2?ak=nYI9lRoVfsFHoA3Xw4iVI5l1nlXXPKDH&center=${lon},${lat}&width=352&height=147&zoom=18&markers=${lon},${lat}&markerStyles=s,A,0xff0000`;
  }

	static getFullPathMin(path){
		if(!path){
			return '';
		}
    if(/^http*/.test(path)){
      return path;
    }else{
		//let diff=path.split(".");
		//if(diff.length==2){
		//	 return (store.state.imageUrlMin||store.state.imageUrl)+diff[0]+"_s400."+diff[1];
		//}
      return (store.state.imageUrlMin||store.state.imageUrl)+path+"!w240";
    }
  }
  static MaxDayOfDate(date)
  {
    let myDate = date;
    let ary = this.toArray(myDate);
    let relativeDate = (new Date(ary[0],ary[1],1));
    //获得当前月份0-11
    let relativeMonth = relativeDate.getMonth();
    //获得当前年份4位年
    let relativeYear = relativeDate.getFullYear();

    //当为12月的时候年份需要加1
    //月份需要更新为0 也就是下一年的第一个月
    if (relativeMonth == 11) {
      relativeYear++;
      relativeMonth = 0;
    } else {
      //否则只是月份增加,以便求的下一月的第一天
      relativeMonth++;
    }
    //一天的毫秒数
    let millisecond = 1000 * 60 * 60 * 24;
    //下月的第一天
    let nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
    //返回得到上月的最后一天,也就是本月总天数
    return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
  }

  static toArray(date)
  {
    let myDate = date;
    let myArray = Array();
    myArray[0] = myDate.getFullYear();
    myArray[1] = myDate.getMonth();
    myArray[2] = myDate.getDate();
    myArray[3] = myDate.getHours();
    myArray[4] = myDate.getMinutes();
    myArray[5] = myDate.getSeconds();
    return myArray;
  }

  static getBase64(file, callback) {
    let maxWidth = 640;
    let reader = new FileReader();
    reader.onload = function (event) {
      let imgUrl = event.target.result;
      let img = new Image();
      img.onload = function () {
        let canvasId = 'canvasBase64Imgid',
          canvas = document.getElementById(canvasId);
        if (canvas != null) {
          document.body.removeChild(canvas);
        }
        canvas = document.createElement("canvas");
        canvas.innerHTML = 'New Canvas';
        canvas.setAttribute("id", canvasId);
        canvas.style.display = 'none';
        document.body.appendChild(canvas);
        canvas.width = this.width;
        canvas.height = this.height;
        let imageWidth = this.width,
          imageHeight = this.height;
        if (this.width > maxWidth) {
          imageWidth = maxWidth;
          imageHeight = this.height * maxWidth / this.width;
          canvas.width = imageWidth;
          canvas.height = imageHeight;
        }
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, imageWidth, imageHeight);
        context.drawImage(this, 0, 0, imageWidth, imageHeight);
        let base64 = canvas.toDataURL('image/png', 1);
        let imgbase = base64.substr(22);
        callback(imgbase);
      }
      img.src = imgUrl;
    }
    reader.readAsDataURL(file);
  }

  static moviePlay(path,videoStatus){
	  if(!window.api){
		  return false;
	  }
    let videoPlayer = api.require('videoPlayer');
    videoPlayer.open({
      rect:{
        x: 0,   //（可选项）数字类型；模块左上角的 x 坐标（相对于所属的 Window 或 Frame）；默认：0
        y: 0,   //（可选项）数字类型；模块左上角的 y 坐标（相对于所属的 Window 或 Frame）；默认：0
        w: api.winWidth, //（可选项）数字类型；模块的宽度；默认：所属的 Window 或 Frame 的宽度
        h: api.winHeight  //（可选项）数字类型；模块的高度；默认：w的3/4
      },
      path: path,
      loop:false,
      bg:"#000000",
    }, function(ret, err) {
      if(ret.status&&ret.eventType=="show"){

      }else if(ret.eventType=="playing"){

      }else if(ret.eventType=="failed"){
        api.toast({
          msg: '视频不存在',
          duration: 2000,
          location: 'bottom'
        });
        api.closeFrame({
          name: 'vedio'
        });
        videoPlayer.close();
      }else if(ret.eventType=="error"){
        api.toast({
          msg: '视频异常',
          duration: 2000,
          location: 'bottom'
        });
        api.closeFrame({
          name: 'vedio'
        });
        videoPlayer.close();
      }
    });
    videoPlayer.removeEventListener({
      name: 'play'
    });
    videoPlayer.addEventListener({
      name: 'play'
    }, function(ret, err) {
      if (ret.eventType=="playing") {
        api.sendEvent({
          name: 'showok',
          extra: {
            videoStatus: videoStatus
          }
        });
      } else if(ret.eventType=="complete") {
        api.sendEvent({
          name: 'showend',
        });
      }
    });
    let args = {
      name:'vedio',
      bgColor:'rgba(0,0,0,0)',
      url:"static/html/vedio.html",
    }
    window.api.openFrame(args);
    api.removeEventListener({
      name: 'closeWin'
    });
    api.removeEventListener({
      name: 'display'
    });
    api.addEventListener({
      name: 'closeWin'
    }, function(ret, err) {
      videoPlayer.close();
    });
    api.addEventListener({
      name: 'display'
    }, function(ret, err) {
      if(ret.value.key){
        videoPlayer.pause();
      }else{
        videoPlayer.start();
      }
    });

    return videoPlayer;
  }

  static openSuspensionWindow(datingId,title,imgurl,activeType){
    if(!window.api){
      return false;
    }
    window.api.sendEvent({
      name: 'openSuspensionWindow',
      extra: {
        url: this.getFullPath(imgurl),
        title: title,
      }
    });
    window.api.removeEventListener({
      name: 'enterAct'
    });
    window.api.addEventListener({
      name: 'enterAct'
    }, function(ret, err) {
		if(activeType==6){//相亲
			router.push({
				path: "/blindDateNew",
				query: {
					id: datingId
				}
			})
		}else{
			 router.push({
				path: "/actSceneNew",
				query: {
				  id: activeType,
				  datingId: datingId
				}
			  })	
		}
    });
  }
  static closeSuspensionWindow(){
    window.api&&window.api.sendEvent({
      name: 'closeSuspensionWindow'
    });
  }
}
