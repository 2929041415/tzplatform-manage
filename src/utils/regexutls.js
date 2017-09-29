const regexphone = /^1[3|4|5|7|8][0-9]{9}$/
const regexemail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

class regexutils {
  static validatephone (value) {
    return regexphone.test(value)
  }
  static validateemail (value) {
    return regexemail.test(value)
  }
}

export default regexutils
