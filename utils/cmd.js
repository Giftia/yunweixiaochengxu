import { lockUtils } from './lockUtils'
const initToken = new Uint8Array([0x06, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
const initKey = new Uint8Array([32, 87, 47, 82, 54, 75, 63, 71, 48, 80, 65, 88, 17, 99, 45, 43])
const initPwd = [0x30, 0x30, 0x30, 0x30, 0x30, 0x30]

export const cmd = {
  getToken(key = initKey) {
    return lockUtils.encrypt(initToken, key)
  },
  getLockPwd(token, pwd = initPwd,key = initKey){
    const pwdArr = new Uint8Array([0x05, 0x01, 0x06, ...pwd, ...token, 0x00, 0x00, 0x00]); 
    return lockUtils.encrypt(pwdArr,key)
  },
  getLockStatus(token,key = initKey){
    const pwdArr = new Uint8Array([0x05, 0x0e, 0x01, 0x01, ...token, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
    return lockUtils.encrypt(pwdArr, key)
  },
  decryptCmd(src, key = initKey) {
    return lockUtils.decrypt(src,key);
  }
}

