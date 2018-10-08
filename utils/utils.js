function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTimeDay(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('.')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 计算行程时间
function getTimeDiff(time) {
  var h = parseInt(time / (1000 * 60 * 60));
  var m = parseInt((time % (60 * 60 * 1000)) / (1000 * 60));
  var 
  s = parseInt((time % (60 * 1000)) / 1000);
  return [h, m, s]
}

// 两位数补位
function towDigit(v) {
  return v < 10 ? '0' + v : v
}

// 计算价钱
function onPirce(time, unit_min, unit_price) {
  unit_min = Number(unit_min)
  unit_price = Number(unit_price)
  return Math.ceil(time / (1000 * 60 * unit_min)) * unit_price
}

// 身份证验证

function idReg(idCard){
  if(idCard.length == 0) return
  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子   
  var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X  
               //去掉字符串头尾空格                     
  if (idCard.length == 15) {
    return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
  } else if (idCard.length == 18) {
    var a_idCard = idCard.split("");                // 得到身份证数组   
    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }   



  /**  
   * 判断身份证号码为18位时最后的验证位是否正确  
   * @param a_idCard 身份证号码数组  
   * @return  
   */
  function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0;                             // 声明加权求和变量   
    if (a_idCard[17].toLowerCase() == 'x') {
      a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
    }
    for (var i = 0; i < 17; i++) {
      sum += Wi[i] * a_idCard[i];            // 加权求和   
    }
    var valCodePosition = sum % 11;                // 得到验证码所位置   
    if (a_idCard[17] == ValideCode[valCodePosition]) {
      return true;
    } else {
      return false;
    }
  }
  /**  
    * 验证18位数身份证号码中的生日是否是有效生日  
    * @param idCard 18位书身份证字符串  
    * @return  
    */
  function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题   
    if (temp_date.getFullYear() != parseFloat(year)
      || temp_date.getMonth() != parseFloat(month) - 1
      || temp_date.getDate() != parseFloat(day)) {
      return false;
    } else {
      return true;
    }
  }
  /**  
   * 验证15位数身份证号码中的生日是否是有效生日  
   * @param idCard15 15位书身份证字符串  
   * @return  
   */
  function isValidityBrithBy15IdCard(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
    if (temp_date.getYear() != parseFloat(year)
      || temp_date.getMonth() != parseFloat(month) - 1
      || temp_date.getDate() != parseFloat(day)) {
      return false;
    } else {
      return true;
    }
  }   
}

function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}
// 
function fixCount (arg1,arg2) {

};


module.exports = {
  formatTime: formatTime,
  formatTimeDay: formatTimeDay,
  getTimeDiff: getTimeDiff,
  towDigit: towDigit,
  onPirce: onPirce,
  idReg: idReg,
  ab2hex: ab2hex
}
