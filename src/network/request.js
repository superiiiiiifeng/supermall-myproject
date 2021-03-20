import axios from 'axios'

export function request(config) {
    // 创建实例
  const instance = axios.create({
    baseURL: 'http://10.64.25.61:8888',
    timeout: 5000
  });

  // axios的拦截器
  // 拦截器作用：
  // 1.用于校验修改config中可能不符合服务器的内容
  // 2.用于发请求时在界面中显示一些内容
  // 3.用于某些网络请求(如登录)，必须携带一些特殊的信息(token令牌)，若没有则跳转到登录页面，登录成功后再继续进行网络请求
  // axios.interceptors//全局拦截
  instance.interceptors.request.use(config => { //局部拦截
    return config //拦截器放行
  }, error => {
    console.log(err)
  });//请求拦截器
  instance.interceptors.response.use(res => {
    console.log(res);
    return res.data //拦截器放行
  },err => {
    console.log(err);
  });//响应拦截器
// 发送真正的网络请求
  return instance(config) //instance实例返回的就是一个Promise对象
}
