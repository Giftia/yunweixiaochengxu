// pages/loginYan/loginYan.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 60,
    reget: false,
    code_isFocus: true, //控制input 聚焦
    code: [],
    focus_status: [],
    length: 0, //已经输入的长度
    login_btn_background: '#C0C0C0',
    btnLoading: false,
    loginFlag: false, //是否可以登录Flag 默认false
    loginBtnText: '登录'
  },
  //倒计时函数
  getCode: function(options) {
    var that = this;
    var currentTime = that.data.time
    var interval = setInterval(function() {
      currentTime--;
      that.setData({
        time: currentTime
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: "",
          currentTime: 11,
          disabled: false,
          reget: true, //改变字体样式颜色
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  /**
   * 重新获取验证码
   */
  getCaptcha: function() {
    var _this = this;
    this.setData({
      captchaFlag: false
    })
    var mobile = this.data.phoneNum.replace(/\s/g, ""); //去掉多余空格的手机号
    common.sendRequest("/repair/wxsLogin.action", {
      phone: mobile
    }, (res) => {
      if (res.data.code == 1) {

        _this.setData({
          time: '60',
          reget: false
        })
        _this.getCode(_this.data.time);
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
  //验证码输入时获取验证码
  get_code(e) {
    var that = this;
    that.setData({
      code: e.detail.value
    });
    if (that.data.code.length >= 4 && that.data.phoneNum.length >= 11) {
      this.setData({
        login_btn_background: '#50CC99',
        loginFlag: true
      })
    } else {
      this.setData({
        login_btn_background: '#C0C0C0',
        loginFlag: false
      })
    }
    if (that.data.code.length == 0) {
      that.setData({
        focus_status: "1000"
      });
    }
    if (that.data.code.length == 1) {
      that.setData({
        length: e.detail.value.length,
        focus_status: "0100"
      });
    }
    if (that.data.code.length == 2) {
      that.setData({
        length: e.detail.value.length,
        focus_status: "0010"
      });
    }
    if (that.data.code.length == 3) {
      that.setData({
        length: e.detail.value.length,
        focus_status: "0001"
      });
    }
    if (that.data.code.length == 4) {
      that.setData({
        length: e.detail.value.length
      })
      console.log(that.data.code)
      //...
    }
  },

  set_Focus() { //聚焦input
    var that = this
    that.setData({
      code_isFocus: true
    })
  },

  login: function() {
    let that = this;
    var flag = this.data.loginFlag; // 是否可以登录标志
    var mobile = this.data.phoneNum.replace(/\s/g, ""); // 去掉多余空格的手机号
    var validation = this.data.code; // 用户输入的验证码
    this.setData({
      loginFlag: !this.data.loginFlag,
      btnLoading: true,
      loginBtnText: '登录中...'
    })
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: app.globalData.url + '/repair/regist.action',
            data: {
              tel: mobile,
              telCode: validation,
              openCode: res.code,
            },
            success: (res) => {
              if (res.statusCode != 200) {
                wx.showModal({
                  title: '提示 ',
                  content: '服务器状态码' + res.statusCode + ',请联系客服处理',
                  showCancel: false
                })
                return
              }
              if (res.data.code != null && res.data.code == 0) { //未登录
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              } else if (res.data.code != null && res.data.code == 1) {
                wx.showToast({
                  title: '登录成功！',
                })
                wx.reLaunch({
                  url: '../index/index',
                })
                that.setData({
                  loginFlag: !that.data.loginFlag,
                  btnLoading: false,
                  loginBtnText: '登录'
                })
                wx.setStorageSync("openid", res.data.openid)
              }
            },
          })
        } else {
          wx.showToast({
            title: '获取用户登录态失败！'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.set_Focus()
    this.getCode()
    this.setData({
      phoneNum: options.mobile,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})