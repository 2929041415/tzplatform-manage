class commonutils {
  /* 获取图片尺寸 */
  static checkImgExt(img) {
    let result =true
    const filename = img.name
    const fileext = filename.substring(filename.lastIndexOf('.'), filename.length).toUpperCase()
    if(fileext!='.BMP'&&fileext!='.PNG'&&fileext!='.GIF'&&fileext!='.JPG'&&fileext!='.JPEG'){
      result=false
    }
    return result
  }

  static getrandomcolor() {
    const colorValue = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f"
    const colorArray = colorValue.split(",")
    let color = "#"
    for (var i = 0; i < 6; i++) {
      color += colorArray[Math.floor(Math.random() * 16)]
    }
    return color
  }

  static getcolor(colorlength){
    let colorargs = []
    for (let i = 0; i < colorlength; i++) {
      colorargs.push(this.getrandomcolor())
    }
    return colorargs
  }
}

export default commonutils
