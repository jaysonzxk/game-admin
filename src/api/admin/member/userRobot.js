import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询vip卡列表
export function listUserRobot(query) {
  return request({
    url: "/admin/member/userRobot/",
    method: "get",
    params: query
  });
}

// 查询vip卡详细
export function getUserRobot(userRobotId) {
  return request({
    url: "/admin/member/userRobot/" + praseStrEmpty(userRobotId) + '/',
    method: "get"
  });
}

// 修改vip卡信息
export function updateUserRobot(data) {
  return request({
    url: "/admin/member/userRobot/update/",
    method: "post",
    data: data
  });
}