import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询金额列表
export function listAmountConfig(query) {
  return request({
    url: "/admin/pay/amountConfig/",
    method: "get",
    params: query
  });
}

// 查询金额详细
export function getAmountConfig(amountConfigId) {
  return request({
    url: "/admin/pay/amountConfig/" + praseStrEmpty(amountConfigId) + '/',
    method: "get"
  });
}

// 新增金额
export function addAmountConfig(data) {
  return request({
    url: "/admin/pay/amountConfig/add",
    method: "post",
    data: data
  });
}


// 修改金额信息
export function updateAmountConfig(data) {
  return request({
    url: "/admin/pay/amountConfig/update",
    method: "post",
    data: data
  });
}
