import {request} from "network/request";

export function getHomeMultiData() {
  return request({
    url: '/home/MultiData'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url: '/home/goods',
    params: {
      type,
      page
    }
  })
}
