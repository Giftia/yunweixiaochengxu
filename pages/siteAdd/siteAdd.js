// pages/siteAdd/siteAdd.js
var app = getApp();
var utils = require("../../utils/utils.js")
var common = require("../common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['中国', '美国', '巴西', '日本'],
    inputtest: '',
    latitude: '',
    longitude: '',
    xinbiaoList: [],
    xinbiaocode: ''
  },
  //选择景区
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //监听input输入
  bindinputValue: function(e) {
    this.setData({
      inputtest: e.detail.value
    })
  },
  //获取坐标
  obtainzuobiao: function() {
    wx.showLoading({
      title: '获取中...',
    })
    this.animation.rotate(Math.random() * 720).step()
    this.setData({
      animation: this.animation.export()
    })
    common.getLocation((res) => {
      this.setData({
        latitude: res.latitude.toFixed(5),
        longitude: res.longitude.toFixed(5)
      })
      wx.hideLoading()
      console.log(res)
    }),({msg})=>{
      console.log(msg)
    }
  },
  //扫码添加信标
  addXinbiao: function() {
    var that = this
    wx.scanCode({
      success: function(res) {
        if (res.result) {
          let newlist = that.data.xinbiaoList
          if (res.result == that.data.xinbiaocode) {
            wx.showModal({
              content: '您已扫描过此信标！',
              showCancel: false
            })
          } else {
            newlist.push(res.result)
            that.setData({
              xinbiaocode: res.result,
              xinbiaoList: newlist
            })
          }

        } else {
          wx.showToast({
            title: '二维码错误',
          })
        }
        console.log(res.result)
      }
    })

  },
  //删除信标
  delXinbiao: function(e) {
    let index = e.currentTarget.dataset.index
    let newlist = this.data.xinbiaoList
    newlist.splice(index, 1)
    this.setData({
      xinbiaoList: newlist
    })
    console.log(index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.animation = wx.createAnimation()
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