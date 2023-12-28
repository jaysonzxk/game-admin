import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询vip卡列表
export function listUserExchange(query) {
  return request({
    url: "/admin/member/userExchange/",
    method: "get",
    params: query
  });
}

// 查询vip卡详细
export function getUserExchange(userExchangeId) {
  return request({
    url: "/admin/member/userExchange/" + praseStrEmpty(userExchangeId) + '/',
    method: "get"
  });
}

// 修改vip卡信息
export function updateUserExchange(data) {
  return request({
    url: "/admin/member/userExchange/update/",
    method: "post",
    data: data
  });
}