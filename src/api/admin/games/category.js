import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询类别列表
export function listCategory(query) {
  return request({
    url: "/admin/games/gameCategory",
    method: "get",
    params: query
  });
}

// 查询类别详细
export function getCategory(categoryId) {
  return request({
    url: "/admin/games/gameCategory/" + praseStrEmpty(categoryId),
    method: "get"
  });
}

// 新增类别
export function addCategory(data) {
  return request({
    url: "/admin/games/gameCategory/add",
    method: "post",
    data: data
  });
}


// 修改诶类别息
export function updateCategory(data) {
  return request({
    url: "/admin/games/gameCategory/update",
    method: "post",
    data: data
  });
}


// 删除类别
export function delCategory(data) {
    return request({
      url: "/admin/games/gameCategory/del",
      method: "post",
      data: data
    });
  }