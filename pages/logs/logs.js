//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],

    lists: [],
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  sves:function(e){
    let idd = e.currentTarget.dataset.index
   
    let list = this.data.logs
    console.log(idd)

    list.splice(idd, 1)
    this.setData({
      logs:list
    })
  },
  addList: function () {

    var lists = this.data.lists;
    var newData = {};
    lists.push(newData);//实质是添加lists数组内容，使for循环多一次
    this.setData({
      lists: lists,
    }) 
  }
})
