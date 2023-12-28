import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询vip卡列表
export function listUserVip(query) {
  return request({
    url: "/admin/member/userVip/",
    method: "get",
    params: query
  });
}

// 查询vip卡详细
export function getUserVip(userVipId) {
  return request({
    url: "/admin/member/userVip/" + praseStrEmpty(userVipId) + '/',
    method: "get"
  });
}

// 修改vip卡信息
export function updateUserVip(data) {
  return request({
    url: "/admin/member/userVip/update/",
    method: "post",
    data: data
  });
}