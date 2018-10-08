// pages/maintain/maintain.js
var app = getApp();
var utils = require("../../utils/utils.js")
var common = require("../common.js");
import {bleUtils} from '../../utils/bleUtils.js'



Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [{
        "code": "01",
        "text": "租车",
        "type": "未维护",
        "caozuo": "导航"
      },
      {
        "code": "02",
        "text": "空闲",
        "type": "已维护",
        "caozuo": "导航"
      },
      {
        "code": "03",
        "text": "维护",
        "type": "维护中",
        "caozuo": "导航"
      }
    ]
  },
  //跳转维护记录页
  gomaintainRecord: function() {
    wx.navigateTo({
      url: '/pages/maintainRecord/maintainRecord',
    })
  },
  //跳转找车页
  gocarseek: function() {
    wx.navigateTo({
      url: '/pages/carseek/carseek?latitude=30.25727&longitude=120.20523',
    })
  },
  //跳转维护中页
  goUnlockweihu: function() {
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        console.log(res)
        if (res.scanType == 'QR_CODE') {
          let qrCode = res.result.split("=")[1];
          if (qrCode) {
            this.setData({
              carsCode: qrCode
            })
            this.optnlook()
          } else {
            wx.showToast({
              title: '二维码错误',
            })
          }
        } 
      },
      fail: (res) => {
        wx.showToast({
          title: '二维码错误',
        })
      }
    })

  },
  optnlook:function(){
    // let lon = this.data.lon,
    //  lat = this.data.lat,
    //   qrCode = this.data.carsCode;     
    let bikeCode = '0700086',
      macAdd = '1E:5B:36:43:1E:CE', 
      keyy = '21,97,45,44,45,77,85,71,48,70,76,99,17,88,45,43',
      password= [54,54,54,54,54,54],
    key =new Uint8Array(keyy.split(',').map(n => +n));
    console.log(password)
wx.showLoading({
  title: '开锁中...',
})
    bleUtils.openLock(bikeCode, macAdd, key, password, this, () => {
wx.showToast({
  title: '开锁成功',
})
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/maintainIng/maintainIng',
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

    // common.sendRequest("/bikeRent/unlock.action", lon, lat, qrCode,(res) =>{
    //   console.log("|||||||||||||||||||||||||||||||||||||||||||||", res.data)
    //   if(res.data.data.success){
    //     let data = res.data.data,
    //       password = data.pass.split(',').map(n => +n),
    //       macAdd = data.mac,
    //       key = new Uint8Array(data.key.split(',').map(n => +n));
    //     wx.setStorageSync("password", password)
    //     wx.setStorageSync("macAdd", macAdd)
    //     wx.setStorageSync("reskey", data.key)
    //   }else{
    //     wx.showModal({
    //       title: '',
    //       content: '此车不存在',
    //     })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.getLocation(res => {
      this.setData({
        lon: res.longitude,
        lat: res.latitude
      })
      console.log(this.data.lon)
      console.log(this.data.lat)
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

  },

})