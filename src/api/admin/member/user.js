import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询用户列表
export function listUser(query) {
  return request({
    url: "/admin/member/user/",
    method: "get",
    params: query
  });
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: "/admin/member/user/details/?userId=" + praseStrEmpty(userId),
    method: "get"
  });
}

// 新增用户
export function addUser(data) {
  return request({
    url: "/admin/member/user/",
    method: "post",
    data: data
  });
}


// 用户状态修改
export function changeUserStatus(userId, status) {
  const data = {
    userId,
    status
  };
  return request({
    url: "/admin/member/user/changeStatus/",
    method: "put",
    data: data
  });
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: "/admin/member/user/profile/",
    method: "get"
  });
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: "/admin/member/user/profile/",
    method: "put",
    data: data
  });
}
