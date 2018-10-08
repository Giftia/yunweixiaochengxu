
import { sendRequest} from '../pages/common.js'
import { aesjs } from '../lib/aesjs.js'
export const lockUtils = {

  str2byte( strhex) {
    if (strhex == null) {
      return null;
    }
    let len = strhex.length;
    let b = new Int8Array(len);
    for (let i = 0; i < len; i++) {
      b[i] = parseInt(strhex.substring(i, i + 1), 16);
    }
    return b;
  },
   /*
  *字符串转二进制数组
  *str (type:String )
  *@return byteArray
   */
  getKeyBuffer(str){ 
    let byteArray = new Int8Array(str.length);
    let strArray = Array.from(str);
    for (let [key,value] of strArray.entries()){
      byteArray[key] = value.charCodeAt();
    }
    return byteArray;
  },
   /*
  *生成字节随机数。范围在-128-127之间
  
  *@return byteArray
   */
  createRandomData() {
    
    let  data = new Int8Array(8);
    let result = data.map(item => {
      return RandomNumBoth(-128,127)
    })
    return result;
  },
  getPositiveValue(byte) {
    let value = byte & 0xff;
    return value;
  },
  /*
  *对字符串进行AES加密
  *sSrc (type:String )
  *sKey (type:String )
  *@return String
   */
  encrypt(sSrc, sKey){
   // console.log(sSrc, sKey)
    var aesEcb = new aesjs.ModeOfOperation.ecb(sKey);
   // console.log(aesEcb)
    return aesEcb.encrypt(sSrc)
    // let key = CryptoJS.enc.Utf8.parse(sKey);
 
    // let src = CryptoJS.enc.Utf8.parse(sSrc);
    // let encrypted = CryptoJS.AES.encrypt(src, key, {
    
    //   mode: CryptoJS.mode.ECB,
    //   padding: CryptoJS.pad.Pkcs7
    // });
    // console.log(encrypted.ciphertext.toString())
    // return encrypted.ciphertext.toString();
  },

  // 数据解密
  decrypt(sSrc, sKey ){
    var aesEcb = new aesjs.ModeOfOperation.ecb(sKey);
    var encryptedBytes = aesjs.utils.hex.toBytes(sSrc)
    return  aesEcb.decrypt(encryptedBytes);
    // var key = CryptoJS.enc.Utf8.parse(sKey);
    // var encryptedHexStr = CryptoJS.enc.Hex.parse(sSrc);
    // var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);

    // var decrypt = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
    //   mode: CryptoJS.mode.ECB,
    //   padding: CryptoJS.pad.Pkcs7
    // });
    // return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
  // encrypt2Byte(src,key){
  //      let src2String = this.byteToString(sSrc);
  //      let key2String = this.byteToString(sKey);

  //      sendRequest("/bicycle/encrypt", { src: src2String, key: key2String}, res => {

  //      }, res => {
  //        if (res.data.code === 'money_not_enough') {
  //          payTripOnline();
  //        }
  //      })
  // }
   /*
  *对字节数组进行AES加密
  *sSrc (type:byteArray )
  *sKey (type:byteArray )
  *@return byteArray
   */
  // encrypt2Byte(sSrc, sKey){
  // //  console.log([...sSrc],[...sKey])
  //   let src2String = this.byteToString(sSrc);
  //   let key2String = this.byteToString(sKey);
  //   let key = CryptoJS.enc.Utf8.parse(key2String);

  //   let src = CryptoJS.enc.Utf8.parse(src2String);
  //   let encrypted = CryptoJS.AES.encrypt(src, key, {
  //     mode: CryptoJS.mode.ECB,
  //     padding: CryptoJS.pad.Pkcs7
  //   });
  //   let strhex = encrypted.ciphertext;
    
  //   return this.hex2Byte(strhex);
  // },
    /*
  * 16进制字符串转字节数组
  *strhex (type:String )
  *@return byteArray
   */
  hex2Byte(strhex) {
    if (strhex == null) {
      return null;
    }
    let len = strhex.length;
    if (len % 2 == 1) {
      return null;
    }
    let b =new Int8Array(len / 2);
    for (let i = 0; i != len / 2; i++) {
      b[i] = parseInt(strhex.substring(i * 2, i * 2 + 2), 16);
    }
    return b;
  },
  hex2Bytes(str) {
    var pos = 0;

    var len = str.length;

    if (len % 2 != 0) {

      return null;

    }

    len /= 2;

    var hexA = new Array();

    for (var i = 0; i < len; i++) {

      var s = str.substr(pos, 2);

      var v = parseInt(s, 16);

      hexA.push(v);

      pos += 2;

    }

    return hexA;
  },
     /*
  * 字节数组转字符串
  *arr (type:Array )
  *@return String
   */
  byteToString(arr) {
    if (typeof arr === 'string') {
      return arr;
    }
    var str = '',
      _arr = arr;
    for (var i = 0; i < _arr.length; i++) {
      var one = _arr[i].toString(2),
        v = one.match(/^1+?(?=0)/);
      if (v && one.length == 8) {
        var bytesLength = v[0].length;
        var store = _arr[i].toString(2).slice(7 - bytesLength);
        for (var st = 1; st < bytesLength; st++) {
          store += _arr[st + i].toString(2).slice(2);
        }
        str += String.fromCharCode(parseInt(store, 2));
        i += bytesLength - 1;
      } else {
        str += String.fromCharCode(_arr[i]);
      }
    }
    return str;  

   
  },
     /*
  * 字节数组转16进制字符串
  *b (type:byteArray )  
  *@return hexString
   */
  byte2hex( b) {
    let hs = "";
    let stmp = "";
    for (let n = 0; n < b.length; n++) {
      stmp = parseInt((b[n] & 0XFF),16);
      if (stmp.length == 1) {
        hs = hs + "0" + stmp;
      } else {
        hs = hs + stmp;
      }
    }
    //        Log.e(TAG, hs);
    return hs.toUpperCase();
  },
  splitToByteArr( arr) {
    let len = arr.length;
    let bytesArrList = [];
    let packetCount = (len % 18 == 0) ? len / 18 : parseInt(len / 18) + 1;
    for (let i = 0; i < packetCount; i++) {
      let bytes = new Int8Array(20);
      bytes[0] = packetCount;
      bytes[1] = i;
      if (i == (packetCount - 1)) {
        
        arraycopy(arr, i * 18, bytes, 2, len % 18);
        //不足18字节填充0
        for (let j = len % 18 + 2; j < 20; j++) {
          bytes[j] = 0;
        }
      } else {
        arraycopy(arr, i * 18, bytes, 2, 18);
      }
      bytesArrList.push(bytes);
    }
    return bytesArrList;
  }
}

/*
src 被复制的数组源
srcPos 源数组要复制的起始位置
dest 目的数组
destPos 目的数组放置的起始位置
length 复制的长度
*/ 
function arraycopy(src,srcPos,dest,destPos,length){
  let spliceArray = src.slice(srcPos,parseInt(srcPos+length));
  for (let i = destPos; i <(destPos + length);i++){
    dest[i] = spliceArray[i - destPos];
  }
}
function RandomNumBoth(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}