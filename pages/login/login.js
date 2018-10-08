// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    login_btn_background: '#C0C0C0',
    isShow:false
  },
  /**
   * 手机号监控
   */
  bindKeyInput: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
    if (e.detail.value.length >= 11) {
      this.setData({
        login_btn_background: '#50CC99',
        isShow:true
      })
    } else {
      this.setData({
        login_btn_background: '#C0C0C0',
        isShow:false
      })
    }
  },
    /**
   * 清空手机号
   */
  clear: function () {
    this.setData({
      phoneNum: ''
    })
  },
  /**
   * 获取验证码
   */
  getCaptcha: function () {
    var _this = this;
    var mobile = this.data.phoneNum.replace(/\s/g, ""); //去掉多余空格的手机号
    common.sendRequest("/repair/wxsLogin.action", {
      phone: mobile
    }, (res) => {
      if (res.data.code == 1) {
        wx.showToast({
          title: '验证码获取成功',
        })
      } else {
        wx.showToast({
          title: '验证码获取失败',
          icon: 'none'
        })
      }
    })

  },
  /**
   * 登录下一步
   */
  login: function () {
    var that = this
    var num = that.data.phoneNum
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (myreg.test(num)) {
      wx.request({
        url: app.globalData.url + '/repair/wxsLogin.action',
        data:{
          tel:num
        },
        success:(res)=>{
          if(res.data.code == 2){
            wx.showModal({
              title: '',
              content: '不存在的工作人员！',
              showCancel: false,
              confirmText: '我已知晓'
            })
          } else if (res.data.code == 1){
            that.getCaptcha()
            wx.navigateTo({
              url: '/pages/loginYan/loginYan?mobile=' + this.data.phoneNum,
            })
          }else{
            wx.showModal({
              title: '',
              content: res.data.msg,
              showCancel: false,
            })
          }
        }
      })

    } else {
      wx.showModal({
        title: '',
        content: '请输入正确的手机号！',
        showCancel: false,
        confirmText: '我已知晓'
      })
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})