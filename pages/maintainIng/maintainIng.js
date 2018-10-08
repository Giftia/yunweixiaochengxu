// pages/maintainIng/maintainIng.js
var app = getApp();
var utils = require("../../utils/utils.js")
var common = require("../common.js");
import { bleUtils } from '../../utils/bleUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length:0,
  },
  checkboxChange: function (e) {
    this.setData({
      position: e.detail.value,
    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  inuputFun: function (e) {
    this.setData({
      invoiceReceiveAddress: e.detail.value,
      length: e.detail.value.length
    });
  },
  formSubmit(e){
    console.log("00000000", e.detail.target.dataset.index)
    let bikeCode = '0700086',
      macAdd = '1E:5B:36:43:1E:CE',
      keyy = '21,97,45,44,45,77,85,71,48,70,76,99,17,88,45,43',
      password = [54, 54, 54, 54, 54, 54],
      key = new Uint8Array(keyy.split(',').map(n => +n));
    console.log(password)
    wx.showLoading({
      title: '正在关锁...',
    })
    bleUtils.canParking(bikeCode, macAdd, key, password, this, () => {
      wx.showToast({
        title: '关锁成功',
      })   
      wx.hideLoading()
      wx.redirectTo({
        url: '/pages/maintain/maintain',
      })
    }, ({
      msg
    }) => {
        console.log(msg)
        wx.hideLoading();
        bleUtils.lanya0();
        wx.showModal({
          title: '',
          content: '' + msg,
        })
      })

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