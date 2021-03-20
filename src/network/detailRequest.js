import {request} from "network/request";

export function getDetail(type,id) {
  return request({
    url: '/detail',
    params: {
      type,
      id
    }
  })
}
