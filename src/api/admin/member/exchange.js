import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询交易所列表
export function listExchange(query) {
  return request({
    url: "/admin/member/exchange/",
    method: "get",
    params: query
  });
}

// 查询交易所详细
export function getExchange(exchangeId) {
  return request({
    url: "/admin/member/exchange/" + praseStrEmpty(exchangeId) + '/',
    method: "get"
  });
}

// 新增交易所
export function addExchange(data) {
  return request({
    url: "/admin/member/exchange/add/",
    method: "post",
    data: data
  });
}


// 修改交易所信息
export function updateExchange(data) {
  return request({
    url: "/admin/member/exchange/update/",
    method: "post",
    data: data
  });
}


// 删除交易所
export function delExchange(data) {
    return request({
      url: "/admin/member/exchange/del/",
      method: "post",
      data: data
    });
  }