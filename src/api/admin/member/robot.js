import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询机器人列表
export function listRobot(query) {
  return request({
    url: "/admin/member/robot/",
    method: "get",
    params: query
  });
}

// 查询机器人详细
export function getRobot(robotId) {
  return request({
    url: "/admin/member/robot/" + praseStrEmpty(robotId) + '/',
    method: "get"
  });
}

// 新增机器人
export function addRobot(data) {
  return request({
    url: "/admin/member/robot/add/",
    method: "post",
    data: data
  });
}


// 修改机器人信息
export function updateRobot(data) {
  return request({
    url: "/admin/member/robot/update/",
    method: "post",
    data: data
  });
}


// 删除机器人
export function delRobot(data) {
    return request({
      url: "/admin/member/robot/del/",
      method: "post",
      data: data
    });
  }