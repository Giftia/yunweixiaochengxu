import {
  nokeLock
} from './iLock.js'
import {
  ab2hex
} from './utils.js'
import {
  cmd
} from './cmd.js'
import {
  sendRequest2yb
} from '../pages/common.js'
import { byte2hex} from "../utils/lockUtils.js"
const globalData = getApp().globalData;
let bleUtils = {
  test() {
    console.log('ssss', getApp())
  },
  init(bikeCode, mac, key, password, type, page, successCb, failCb) {
    const system = wx.getSystemInfoSync(); //获取系统信息
    this.mac = mac;
    this.key = key;
    this.type = type // 1表示纯开锁，2表示获取电量和信标
    // this.isNavigateBack = isNavigateBack;
    this.password = password;
    this.successCb = successCb; // 成功回调
    this.failCb = failCb //失败回调
    this.connectedDeviceId = '';
    this.connetTimeout = 0;
    this.searchLockTimeout = 0;
    this.searchMarkerTimeout = 0
    this.power = '';
    this.bleList = [];
    this.bikeCode = bikeCode;
    this.page = page;
    this.ajaxParam = {
      code: bikeCode,
      eventType: 1, // 1开锁成功，2开锁失败，蓝牙连接不上，3开锁失败，密码错误，4.开锁失败，其他,
      electricity: '',
      phoneSystem: `${system.model}${system.system}`, //手机型号 操作系统版本
    };
    this.checkBle()
  },
  checkBle() {
    let that = this;
    wx.openBluetoothAdapter({
      success: function(res) {
        if (that.type == 1 || that.bleList.length != 0) {

          let connctedDevice = that.bleList.find(({
            advertisData
          }) => {
            return macAdd == ab2hex(advertisData).substring(4, 16).toUpperCase()
          })
          if (connctedDevice) {
            that.connectTO(connctedDevice.deviceId)
          } else {
            that.discovery()
          }
        } else {
          that.discovery()
        }
        //  wx.getConnectedBluetoothDevices({
        //    success: function (res) {
        //      let macAdd = that.mac.replace(/:/g, "").toUpperCase();
        //      let devices = res.devices;
        //      if (devices.length != 0 && devices.find(({ advertisData }) => {
        //        return macAdd == ab2hex(advertisData).substring(4, 16).toUpperCase()
        //      })){

        //      } else
        //       if (that.type == 1 || that.bleList.length != 0) {

        //        let connctedDevice = that.bleList.find(({ advertisData }) => {
        //          return macAdd == ab2hex(advertisData).substring(4, 16).toUpperCase()
        //        })
        //        if (connctedDevice) {
        //          that.connectTO(connctedDevice.deviceId)
        //        } else {
        //          that.discovery()
        //        }
        //      } else {
        //        that.discovery()
        //      }
        //    }
        //  })

        //   that.discovery();
      },
      fail(res) {
        that.failCb({
          msg: '请开启系统蓝牙'
        })
        // if (typeof fail != undefined) fail();
        // that.setData({
        //   showDialog: true
        // })
      },
      complete(res) {
        wx.onBluetoothAdapterStateChange(function(res) {
          if (res.available) {


          } else {

          }
        })
      }
      //开始搜索  
    })
  },
  discovery() {
    let that = this;
    console.log('discovery开始-------')
    wx.startBluetoothDevicesDiscovery({

      success: function(res) {
        console.log('discoverying ' + JSON.stringify(res))

        that.page.setData({
          progress: 30,
        })
        // that.lanya4()
        setTimeout(function() {
          that.getlockDevices()
        }, 6000)
      },
      fail(res) {
        console.log('lanya3---dd', JSON.stringify(res))
      }
    })

  },
  //获取锁
  getlockDevices() {
    let that = this;
    wx.getBluetoothDevices({
      success: function(res) {
        console.log('lanya3---cc', JSON.stringify(res))
        let devices = res.devices;
        if (devices.length == 0) {
          console.log('没有搜索到蓝牙设备，')
        }
        //app.globalData.searchBleList = devices
       let macAdd = that.mac.replace(/:/g, "").toUpperCase();
        console.log("macAdd..............", macAdd)
        let bleMarker, bleLock; //待匹配的信标、锁;
        for (let i = 0; i < devices.length; i++) {
          //  if (devices[i].name == 'BL-2A' || devices[i].name == 'coolqi' || devices[i].name == 'CoolQi' || devices[i].name == 'Beacon')
          if (devices[i].name == 'Letu' || devices[i].name == 'Letu_N_O' || devices[i].name == 'Letu_O' ||  devices[i].name == 'CoolQi') {
            let deviceMac = ab2hex(devices[i].advertisData).substring(4, 16).toUpperCase()
            console.log("deviceMac000000000", deviceMac)

            if (deviceMac == macAdd) {
              that.ajaxParam.electricity = `${parseInt(ab2hex(devices[i].advertisData).substring(18, 20), 16)}%`;
              console.log("that.ajaxParam.electricity33333333333", that.ajaxParam.electricity)
              bleLock = devices[i].deviceId; //成功匹配到设备 
              console.log("成功匹配到设备",bleLock)
            }

          } else if (devices[i].name == 'BTBEACON' || devices[i].name == 'Letu beacon') {
            bleMarker = ab2hex(devices[i].advertisData).substring(4);
            console.log("BTBEACON000000000", bleMarker)
          }
        }
        if (that.type == 1) {
          if (bleLock) {
            that.page.setData({
              progress: 40,
            })
            that.connectTO(bleLock);
          } else {
            that.failCb({
              msg: '未成功匹配到设备，锁连接失败！'
            });
            that.reportLockEvent({
              type: 2
            });
          }
        } else {
          console.log(bleMarker)
          console.log(bleLock)
          if (bleMarker && bleLock) {

            that.bleMarker = bleMarker;
            that.connectTO(bleLock);
          } else {
            that.failCb({
              msg: '请将车辆停至全域骑游指定还车点'
            });
            that.reportLockEvent({
              type: 2
            });
          }
        }
        that.stopDiscovery();
        //  if (bleLock) {
        //    if (that.type == 1) {
        //      that.page.setData({
        //        progress: 40,
        //      })
        //      that.connectTO(bleLock);
        //    } else {
        //      if (bleMarker) {

        //        that.bleMarker = bleMarker;
        //        that.connectTO(bleLock);
        //      } else {
        //        if (this.searchMarkerTimeout >= 1) {
        //          that.failCb({ msg: '请将车辆停至停车桩附近' });
        //          that.reportLockEvent({ type: 2 });
        //          return;
        //        } else {
        //          ++this.searchMarkerTimeout;
        //          that.discovery()
        //        }
        //      }
        //    }

        //  } else {
        //    if (this.searchLockTimeout >= 1) {
        //      that.failCb({ msg: '车锁匹配失败' });
        //      that.reportLockEvent({ type: 2 });
        //      return;
        //    } else {
        //      ++this.searchLockTimeout;
        //      that.discovery()
        //    }
        //  }





      }
    })
  },

  stopDiscovery() {
    var that = this;
    wx.stopBluetoothDevicesDiscovery({
      success: function(res) {
        // that.setData({
        //   msg: "停止搜索周边设备" + "/" + JSON.stringify(res.errMsg),
        //   sousuo: res.discovering ? "在搜索。" : "未搜索。",
        //   status: res.available ? "可用。" : "不可用。",
        // })
      }
    })
  },
  //连接设备  
  connectTO(id) {
    console.log('设备开始连接')

    var that = this;

    //  that.setData({
    //    progress: 40
    //    // msg: "已连接" + id,
    //    // msg1: "",
    //  })
    wx.createBLEConnection({
      deviceId: id,
      success: function(res) {
        console.log('设备连接成功')

        that.connectedDeviceId = id;
        that.page.setData({
          progress: 50,
        })
        //  that.setData({
        //    connectedDeviceId: id,
        //    progress: 50
        //    // msg: "已连接" + id,
        //    // msg1: "",
        //  })
        //   that.lanya6();
        let sysInfo = wx.getSystemInfoSync().system;
        //that.lanya8();
        if (sysInfo.indexOf('iOS') != -1) {
          that.getService();
        } else if (sysInfo.indexOf('Android') != -1) {
          that.writeCharacteristics();
        }

      },
      fail: function(res) {
        that.connectTimer = setTimeout(() => {
          console.log('超时重连' + JSON.stringify(res))
          that.connectTO(id);
          that.connetTimeout++;
        }, 1000)
        if (that.connetTimeout > 6) {
          clearTimeout(that.connectTimer);
          that.connectTimer = null;
          wx.showToast({
            title: '连接超时，请重新扫码',
          })
          that.failCb({
            msg: '连接超时，请重新扫码'
          })
        }
        console.log("蓝牙连接失败", JSON.stringify(res))
      },



    })
    console.log(that.connectedDeviceId);
  },
  // 获取连接设备的service服务  
  getService: function() {
    var that = this;
    wx.getBLEDeviceServices({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
      deviceId: that.connectedDeviceId,
      success: function(res) {
        console.log('device services:', JSON.stringify(res.services));
        //  that.setData({
        //    services: res.services,
        //    // msg: JSON.stringify(res.services),
        //  })
        that.getCharacteristics();
      },
      fail: function(res) {
        //  that.setData({
        //    msg1: JSON.stringify(res)
        //  })
      },
    })
  },
  //获取连接设备的所有特征值  for循环获取不到值  
  getCharacteristics: function() {
    var that = this;
    wx.getBLEDeviceCharacteristics({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
      deviceId: that.connectedDeviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
      serviceId: nokeLock.V3_SERVICE_UUID,
      success: function(res) {
        that.writeCharacteristics();
        console.log('device getBLEDeviceCharacteristics:', res.characteristics);
        // that.setData({
        //   msg: JSON.stringify(res.characteristics),
        // })
      },
      fail: function(res) {
        console.log(JSON.stringify(res))

      },
      complete: function() {
        console.log("complete");
      }
    })
  },
  //发送  
  writeCharacteristics() {
    const that = this;
    let bleToken = globalData.bleToken,
      bleKey = this.key,
      blePassword = this.password;
    console.log(bleToken, bleKey, blePassword)
    console.log("}}}}}}}}}}}}}bletolen", globalData.bleToken)

    that.page.setData({
      progress: 70,
    })
    //  const serviceId = nokeLock.V3_SERVICE_UUID;
    //  const V3_READ_UUID = nokeLock.V3_READ_UUID
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接  
      deviceId: that.connectedDeviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: nokeLock.V3_SERVICE_UUID,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      characteristicId: nokeLock.V3_READ_UUID,
      success: function(res) {
        setTimeout(() => {
          let cmdData
          if (that.type == 1) {
            cmdData = !bleToken ? cmd.getToken(bleKey) : cmd.getLockPwd(bleToken, blePassword, bleKey);

          } else {
            cmdData = !bleToken ? cmd.getToken(bleKey) : cmd.getLockStatus(bleToken, bleKey);
          }

          console.log("LLLLLLLLLLLLLLLLcmddata", cmdData)
          that.sendCmd(cmdData);
        }, 2000)

        console.log('notify通知开启', res.errMsg)

        wx.onBLECharacteristicValueChange(function(res) {

          var bytes = ab2hex(res.value);
          console.log("......................", bytes)
          // var currentCmd = that.data.currentCmd;
          var decryptCode = cmd.decryptCmd(bytes, bleKey);
          console.log(`接受到特征值变化--------`, decryptCode)   

          if (decryptCode[0] == 0x06 && decryptCode[1] == 0x02) {
            console.log('成功获得令牌--TOKEN')
            let token = [decryptCode[3], decryptCode[4], decryptCode[5], decryptCode[6]];
            console.log('成功获得令牌--TOKEN', token)
            globalData.bleToken = token;
            let cmdData = that.type == 1 ? cmd.getLockPwd(token, blePassword, bleKey) : cmd.getLockStatus(token, bleKey)
            that.sendCmd(cmdData)

          } else if (decryptCode[0] == 0x05 && decryptCode[1] == 0x02 && decryptCode[3] == 0x00) {
            console.log("", decryptCode[0])
            console.log("", decryptCode[1])
            console.log("", decryptCode[3])
            console.log('开锁100%')
            //  that.setData({
            //    progress: 100
            //    // msg: "已连接" + id,
            //    // msg1: "",
            //  })
            that.lanya0(() => {
              that.reportLockEvent({
                type: 1
              });
              that.page.setData({
                progress: 100
              })
              that.successCb();
            })

          } else if (decryptCode[0] == 0x05 && decryptCode[1] == 0x02 && decryptCode[3] == 0x01) {
            console.log("开锁失败", decryptCode[0])
            console.log("", decryptCode[1])
            console.log("", decryptCode[3])
            that.reportLockEvent({
              type: 3
            });

            that.failCb({
              msg: '开锁失败，请重新扫码'
            });
          } else if (decryptCode[0] == 0x05 && decryptCode[1] == 0x0f && decryptCode[3] == 0x01) {

            console.log("车锁关闭", decryptCode[0])
            console.log("", decryptCode[1])
            console.log("", decryptCode[3])
            that.lanya0(() => {
              that.successCb({
                bleMarker: that.bleMarker
              });
            })

          } else if (decryptCode[0] == 0x05 && decryptCode[1] == 0x0f && decryptCode[3] == 0x00) {
            console.log("车锁未关闭",decryptCode[3])
            that.failCb({
              msg: '车锁未关闭'
            });
          }
          // else if (decryptCode[0] == 0xCB && decryptCode[1] == that.currSendData[0] && decryptCode[2] == that.currSendData[1]){
          //    console.log('指令发送成功')
          //  }

        })
      }
    })


  },
  sendCmd(cmd) {
    var that = this;

    console.log('------开始写指令 ')
    //  const characteristicId = nokeLock.V3_WRITE_UUID;
    //  const serviceId = nokeLock.V3_SERVICE_UUID;
    wx.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
      deviceId: that.connectedDeviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
      serviceId: nokeLock.V3_SERVICE_UUID,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
      characteristicId: nokeLock.V3_WRITE_UUID,
      // 这里的value是ArrayBuffer类型  
      value: cmd.buffer,
      success: function(res) {
        console.log('指令写入成功------')
        //  that.setData({
        //    msg: '蓝牙调用成功' + JSON.stringify(res)
        //  });
      },
      fail: function(res) {
        that.failCb({
          msg: '指令写入失败'
        })
        console.log('指令写入失败', JSON.stringify(res))
        that.reportLockEvent({
          type: 4
        });
        //  that.setData({
        //    msg1: JSON.stringify(res)
        //  });
        //sendCmd()
      },
    })
  },
  lanya0: function(callback) {
    var that = this;
    wx.closeBluetoothAdapter({
      success: function(res) {
        //  that.setData({
        //    connectedDeviceId: "",
        //  })
        console.log("closeBluetoothAdapter",res)
        if (typeof callback != 'undefined') {
          callback()
        }
      }
    })
  },
  getBleMarker(success, fail) {
    this.discovery(() => {
      this.getMarkerDevices(success, fail)
    })

  },
  canParking(bikeCode, mac, key, password, page, successCb, failCb) {
    this.init(bikeCode, mac, key, password, 2, page, successCb, failCb)
  },
  openLock(bikeCode, mac, key, password, page, successCb, failCb) {
    this.init(bikeCode, mac, key, password, 1, page, successCb, failCb)
  },
  reportLockEvent({
    type
  }) {
    this.ajaxParam.eventType = type;
    //  sendRequest2yb('/lock/lockEvent/reportLockEvent', this.ajaxParam)

  }


}

module.exports = {
  bleUtils
}