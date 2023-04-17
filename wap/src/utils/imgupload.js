export function compress (fileObj, callback) {
  try {
    const image = new Image()
    image.src = URL.createObjectURL(fileObj)
    image.onload = function () {
      const that = this
      // 默认按比例压缩
      let w = that.width
      let h = that.height
      const scale = w / h
      w = fileObj.width || w
      h = fileObj.height || (w / scale)
      let quality = 0.7 // 默认图片质量为0.7
      // 生成canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // 创建属性节点
      const anw = document.createAttribute('width')
      anw.nodeValue = w
      const anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      ctx.drawImage(that, 0, 0, w, h)
      // 图像质量
      if (fileObj.quality && fileObj.quality <= 1 && fileObj.quality > 0) {
        quality = fileObj.quality
      }
      // quality值越小，所绘制出的图像越模糊
      const data = canvas.toDataURL('image/jpeg', quality)
      // 压缩完成执行回调
      const newFile = convertBase64UrlToBlob(data)
      callback(newFile)
    }
  } catch (e) {
    console.log('压缩失败!')
  }
}

function convertBase64UrlToBlob (urlData) {
  const bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: 'image/png' })
}
/**
 * @description 时间戳转化为年 月 日 时 分 秒
 * @method formatTime(format,num)
 * @param {string} [format='YYYY-mm-dd HH:MM:SS'] 时间格式,不填时默认使用'YYYY-mm-dd HH:MM:SS'格式,更改只需替换中间连接符号就行'YYYY年mm月dd日 HH时MM分SS秒'
 * @param {number} [num = new Date().getTime()] 时间戳,默认使用当前时间戳, new Date().getTime(); 获取当前时间戳（毫秒）
 * @example
 *  var sjc = 1472048779952; //js一般获取的时间戳是13位，PHP一般是10位
    formatTime('YYYY-mm-dd HH:MM:SS',sjc)
 */
export const formatTime = (format = '', num = new Date().getTime()) => {
  format = format || 'YYYY-mm-dd HH:MM:SS' // 第一个参数不填时，使用默认格式
  let ret, date, renum
  // 处理时间戳，js一般获取的时间戳是13位，PHP一般是10位,根据实际情况做判断处理
  if (num.toString().length == 10) {
    date = new Date(parseInt(num) * 1000)
  } else {
    date = new Date(parseInt(num))
  }
  const opt = {
    'Y': date.getFullYear().toString(), // 年
    'm': (date.getMonth() + 1).toString(), // 月
    'd': date.getDate().toString(), // 日
    'H': date.getHours().toString(), // 时
    'M': date.getMinutes().toString(), // 分
    'S': date.getSeconds().toString() // 秒
    // 目前用的是这六种符号,有其他格式化字符需求可以继续添加，值必须转化成字符串
  }
  for (var k in opt) {
    ret = new RegExp('(' + k + '+)').exec(format)
    if (ret) {
      renum = (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')) // 根据复数前面是否补零,如“mm”补零，单“m”前面不补零
      format = format.replace(ret[1], renum) // 替换
    };
  };
  return format
}
