// index.js
// 获取应用实例
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
const API = require("../../utils/request")
var amapFile = require('../../libs/amap-wx');
var QQMapWX = require('../../libs/qqmap-wx-jssdk');
var arealist = require("../../constant/area")
const app = getApp()
var qqmapsdk = new QQMapWX({
  key: 'FSLBZ-WIXKX-UXY4I-TUO64-3MNZT-UKBEX' //申请的开发者秘钥key
});
Page({
  data: {
    longitude: "",
    latitude: "",
    markers: [],
    subkey: "FSLBZ-WIXKX-UXY4I-TUO64-3MNZT-UKBEX",
    gaodeAddress: "",
    polyline: []
  },
  //跳转到选点页面(引用的插件)
  // test() {
  //   const key = 'FSLBZ-WIXKX-UXY4I-TUO64-3MNZT-UKBEX'; //使用在腾讯位置服务申请的key
  //   const referer = '我的地图'; //调用插件的app的名称
  //   const location = JSON.stringify({
  //     latitude: 32.085457,
  //     longitude: 118.919305
  //   },{
  //     latitude: 32.08544,
  //     longitude: 32.08544
  //   });
  //   const category = '生活服务,娱乐休闲';

  //   wx.navigateTo({
  //     url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
  //   });
  // },
  //通过两点经纬度计算距离（KM）  
  distance: function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137; //地球半径
    s = Math.round(s * 10000) / 10000;
    console.log("计算结果", s);
    return s;
  },
  onLoad: function (options) {
    var that = this;
    //获取用户当前的授权状态
    wx.getSetting({
      success(res) {
        //若用户没有授权地理位置
        if (!res.authSetting['scope.userLocation']) {
          //在调用需授权 API 之前，提前向用户发起授权请求
          wx.authorize({
            scope: 'scope.userLocation',
            //用户同意授权
            success() {

              // 用户已经同意小程序使用地理位置，后续调用 wx.getLocation 接口不会弹窗询问
            },
            //用户不同意授权
            fail() {
              wx.showModal({
                title: '提示',
                content: '此功能需获取位置信息，请授权',
                success: function (res) {
                  if (res.confirm == false) {
                    return false;
                  }
                  wx.openSetting({
                    success(res) {
                      //如果再次拒绝则返回页面并提示
                      if (!res.authSetting['scope.userLocation']) {
                        wx.showToast({
                          title: '此功能需获取位置信息，请重新设置',
                          duration: 3000,
                          icon: 'none'
                        })
                      } else {
                        //允许授权，调用地图
                        that.onLoad()
                      }
                    }
                  })
                }
              })
            }
          })
        } else {}
      }
    })
  },
  getLocation() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          //先不设置标记点，只显示自己位置，搜索了在设置markers
          // markers: [{
          //   iconPath: "/images/location.png",
          //   id: 0,
          //   latitude: res.result.location.lat,
          //   longitude: res.result.location.lng,
          //   width: 30,
          //   height: 30
          // }],
        })
        that.getList()
        // 调用sdk接口
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
          }
        })
      }
    })
  },
  go(){
    wx.navigateTo({
      url: '/pages/gowhere/gowhere?latitude='+this.data.latitude+'&longitude='+this.data.longitude,
    })
  },
  // 获取周围的点(2km内)
  getList: function () {
    API.aroundlist({
      latitude: this.data.latitude,
      longitude: this.data.longitude
    }).then(res => {
      var rep = JSON.parse(res)
      if (rep.code == 0) {
        var result = rep.data
        var newResult = result.map((item, index) => {
          return Object.assign(item, {
            'iconPath': '/images/location.png'
          }, {
            'id': index
          }, {
            'width': 30
          }, {
            'height': 30
          })
        })
        this.setData({
          markers: newResult
        })
      }
    })
  },
  onShow() {
    //车牌号简称替换英文方法
    var test = "晋A-1122"
    var name = test.substring(0,1)
    var now = Date.now()
    arealist.list.find(value => {
      console.log(value.jc)
      if(value.jc == name){
        name = value.sx
      }
    })
    console.log(Date.now() - now)
    this.getLocation()
    //未发布，还不能用
    API.getAccessToken().then(res => {
      var rep = JSON.parse(res)

      if(rep.code == 0){
        app.globalData.accessToken = rep.data
        var license = "晋A1221";
        var name = license.substring(0,1)
        arealist.list.find(value => {
          console.log(value.jc)
          if(value.jc == name){
            name = value.sx
          }
        })
        license = name + license.substring(1,license.length - 1)
        var params = "id="+1+"&lic="+license
        API.getWxCode({
          scene: params,
          page: "pages/appointment/appointment",
          is_hyaline: true
        }).then(res => {
          console.log(res)
        })
      }
    })
    // 封装的刚抓的根据用户参数生成小程序码的方法
    // API.getAppInfo().then(res => {
    //   var rep = JSON.parse(res)
    //   if(rep.code == 0){
    //     API.generatCode({
    //       weapp_id: rep.data.appId,
    // weapp_secret: rep.data.appSecret,
    // // 测试参数，晚点写用户预约成功后返回二维码
    // weapp_url: 'pages/appointment/appointment?userId=1&license=1'
    //     }).then(res => {
    //       console.log(res.data)
    //     })
    //   }
    // })
  }
})