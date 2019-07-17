
let common={};
common.openMap=function(lon, lat, poi){
    let args = {
        name:'map',
        // url:"/static/html/main.html",
        url:"static/html/main.html",
        pageParam:{
          lon:parseFloat(lon),
          lat:parseFloat(lat),
          poi:poi,
        },
        animation:{
            type:"movein",                //动画类型（详见动画类型常量）
            subType:"from_right",       //动画子类型（详见动画子类型常量）
            duration:300                //动画过渡时间，默认300毫秒
        }
    }
    window.api.openWin(args);
}
export default common;
