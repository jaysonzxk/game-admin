import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询支付渠道列表
export function listPayChannel(query) {
  return request({
    url: "/admin/pay/payChannel/",
    method: "get",
    params: query
  });
}

// 查询支付渠道详细
export function getPayChannel(payChannelId) {
  return request({
    url: "/admin/pay/payChannel/" + praseStrEmpty(payChannelId) + '/',
    method: "get"
  });
}

// 新增支付渠道
export function addPayChannel(data) {
  return request({
    url: "/admin/pay/payChannel/add",
    method: "post",
    data: data
  });
}


// 修改支付渠道卡信息
export function updatePayChannel(data) {
  return request({
    url: "/admin/pay/payChannel/update/",
    method: "post",
    data: data
  });
}
