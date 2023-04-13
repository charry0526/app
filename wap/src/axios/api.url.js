
const ENV = process.env.NODE_ENV
export default {
  DOMAIN: 'http://localhost',
  baseURL: ENV == 'development'?'http://localhost':'http://localhost',
  // baseURL: 'http://localhost:8070',
  /* Util API */
  baseURL: 'http://localhost',
  util: {
    image: '/util/image.html' // 图片上传
  }
}
