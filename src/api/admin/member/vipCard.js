import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询vip卡列表
export function listVipCard(query) {
  return request({
    url: "/admin/member/vipCard/",
    method: "get",
    params: query
  });
}

// 查询vip卡详细
export function getVipCard(vipCardId) {
  return request({
    url: "/admin/member/vipCard/" + praseStrEmpty(vipCardId) + '/',
    method: "get"
  });
}

// 新增用户
export function addVipCard(data) {
  return request({
    url: "/admin/member/vipCard/add/",
    method: "post",
    data: data
  });
}


// 修改vip卡信息
export function updateVipCard(data) {
  return request({
    url: "/admin/member/vipCard/update/",
    method: "post",
    data: data
  });
}


// 删除VIP卡
export function delVipCard(data) {
    return request({
      url: "/admin/member/vipCard/del/",
      method: "post",
      data: data
    });
  }