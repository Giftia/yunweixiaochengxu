// pages/caroutin/caroutin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    carLength: 0,
    carsNumb: '101',
    carsCode: '',
    carsSuoCode: '',
    carState: '',
    animation: ''
  },
  //扫码
  wxScanCode: function() {
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
          } else {
            wx.showToast({
              title: '二维码错误',
            })
          }
        } else if (res.scanType == 'CODE_128') {
          let qrCode = res.result;
          if (qrCode) {
            this.setData({
              carsSuoCode: qrCode
            })
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
  // 点击绑定t添加
  caradd: function() {
    if (this.data.carsNumb && this.data.carsCode && this.data.carsSuoCode) {
      let newlist = this.data.listData
      newlist.push({
        code: this.data.carsNumb,
        text: this.data.carsCode,
        type: this.data.carState,
        caozuo: '删除',
      })
      this.setData({
        listData: newlist,
        carLength: newlist.length
      })
      wx.showToast({
        title: '绑定成功',
        success: (res) => {
          this.setData({
            carsCode: '',
            carsSuoCode: ''
          })
        }
      })
      // if (newlist) {
      //   console.log(newlist)
      //   newlist.map((v, i) => {
      //     if (v.text == this.data.carsCode) {
      //       wx.showModal({
      //         title: '',
      //         content: '您已绑定过此车',
      //       })
      //     }
      //   })
      // }
    } else {
      wx.showToast({
        title: '内容不能为空',
      })
    }


  },
  // 删除
  goDel: function(e) {
    let delIndex = e.currentTarget.dataset.index;
    let newlist = this.data.listData;
    newlist.splice(delIndex, 1)
    this.setData({
      listData: newlist,
      carLength: newlist.length
    })
    console.log("123", delIndex)
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
  rotate: function() {
    this.animation.rotate(Math.random() * 720).step()
    this.setData({
      animation: this.animation.export()
    })
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