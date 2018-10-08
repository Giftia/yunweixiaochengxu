//app.js
App({
  globalData: {
    userInfo: null,
    //url: 'https://admin.letulife.com',
    url: 'https://test-admin.letulife.com',
    bleToken: '', //蓝牙命令的TOKEN值
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.globalData.url + '/repair/login.action',
            data: {
              code: res.code
            },
            success: res => {
              if (res.statusCode != 200) {
                wx.showModal({
                  title:'提示 ',
                  content: '服务器状态码' + res.statusCode + ',请联系客服处理',
                  showCancel: false
                })
                return
              }
              if (res.data.code != null && res.data.code == 0) {//未登录
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              } else if (res.data.code != null && res.data.code == 1) {
                wx.setStorageSync("openid", res.data.openid)
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        } 
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

})