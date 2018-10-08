
//检查网络状态
function checkNetWorkStatus(successCallback) {
   wx.getNetworkType({
    success: function (res) {
      var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi, none, unknown
      if (networkType == "none") {
        //没有网络连接
        wx.showModal({
          title: '提示',
          content: '没有网络连接,请检查您的网络设置',
          showCancel: false,
          // success: function(res) {
          //   if (res.confirm) {
          //     //返回res.confirm为true时，表示用户点击确定按钮

          //   }
          // }
        })
      } else if (networkType == "unknown") {
        //未知的网络类型
        wx.showModal({
          title: '提示',
          content: '未知的网络类型,请检查您的网络设置',
          showCancel: false,
          // success: function(res) {
          //   if (res.confirm) {
          //     //返回res.confirm为true时，表示用户点击确定按钮

          //   }
          // }
        })
      }else {
        successCallback()
      }
    }
  })
}

  /*
  * 检查微信是否登录 
  * @param (callback) 回调函数，并带上获取到的code; 
 
  */

function wxLogin(callback) {
  wx.login({
    success: function (res) {
      console.log("ppppppppppppppppppp",res.code)
      if (res.code) {
        //存储CODE
        var code = res.code;
        var third_session = '';
        sendRequest("/repair/login.action", { code: code}, (res) => {
          let code = res.data.code;
          console.log(code)
           if (code == 1) {
            wx.setStorageSync('token', res.data.data.token);
            wx.reLaunch({
              url: '../index/index',
            })
          }else {
             console.log('xxxxx')
             wx.reLaunch({
               url: '../login/login',
             })
             return;
            callback();
          }
        
        }, (res) => {
          console.log('error',res)
        })
      } else {
        wx.showToast({
          title: '获取用户登录态失败！' + res.errMsg,
        })
        wx.hideLoading();
      }
    }
  });
}

function getLocation(successCallback,failCallback) {
  wx.getLocation({
    type: 'wgs84',
    success: function(res) {
      successCallback(res)
    },
    fail:function (res) {
      failCallback(res);
    }
  })
}





  /*
  * 发送请求
  * @param (url) 请求地址
  * @param (param) body参数
  * @param (callback) 请求成功回调函数
  * @param (failCallback) 请求失败回调函数
  */

function sendRequest(url, param, callback, failCallback){
    var app = getApp();
    var token = wx.getStorageSync("token") || '';
    var baseUrl = app.globalData.url;//获取验证码url
    var callback = callback;
    var sys = wx.getSystemInfoSync();
    header.token = token;
  
    console.log(header)
    var params = {//请求参数
      url: `${baseUrl}${url}`,
      data: param,
      header: header,
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.statusCode != 200) {  //服务返回401需要重新登录
          wx.showModal({
            title: '',
            content: '服务器异常',
          })
         } 
        //else { //请求无异常
        //   if(res.data === 401){
        //     wxLogin(() => { // 重新登录后，再发一次之前的请求
        //       sendRequest(url, param, callback, failCallback)
        //     })
        //   } else {
        //     if (typeof callback != 'undefined') callback(res);

        //   }
        // }
      
      },
      fail: function(res){
        console.log(res)
        wx.showToast({
          title: '' + res.errMsg,
          duration: 3000,
        })
        wx.hideLoading();
      }
    }
    wx.request(params);//发送请求
   
  }
  module.exports = {
    checkNetWorkStatus,
    sendRequest,
    wxLogin,
    getLocation
  }
