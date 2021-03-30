const request = require("request");

//统一接口封装
const API_BASE_URL = 'http://guorui.test.utools.club';
const app = getApp()

const get = (url, data) => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    // wx.showLoading({
    //   title: "正在加载中...",
    // })
    wx.request({
      url: _url,
      method: "get",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
      success(request) {
        wx.hideLoading();
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
const postList = (url) => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    // wx.showLoading({
    //   title: "正在加载中...",
    // })
    wx.request({
      url: _url,
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        wx.hideLoading();
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
const postParams = (url, data) => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    // wx.showLoading({
    //   title: "正在加载中...",
    // })
    wx.request({
      url: _url,
      method: "POST",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        wx.hideLoading();
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
 const post = (url, data,contentType) => {
  let _url = API_BASE_URL  + url;
  switch(contentType){
    case "form" :
      var headerObj = {'content-type' : 'application/x-www-form-urlencoded'};
    break;
    case "json" : 
      var headerObj = {
        'Authorization': app.globalData.token,
        'content-type' : 'application/json'};
        
        
    break;
    default :
      var headerObj = {'content-type' : 'application/json'};
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      data     : data,
      method   : "POST",
      dataType : JSON,
      header: headerObj,
      success(request) {  
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
const put = (url, data,contentType) => {
  let _url = API_BASE_URL  + url;
  switch(contentType){
    case "form" :
      var headerObj = {'content-type' : 'application/x-www-form-urlencoded'};
    break;
    case "json" : 
      var headerObj = {
        'X-Token': app.globalData.token,
        'content-type' : 'application/json'};
    break;
    default :
      var headerObj = {'content-type' : 'application/json'};
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      data     : data,
      method   : "PUT",
      dataType : JSON,
      header: headerObj,
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
module.exports ={
  login:(data) =>{
    console.log("登录")
    return post('/user/login',data,'json') //
  }
}