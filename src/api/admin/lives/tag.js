import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询tag列表
export function listTag(query) {
  return request({
    url: "/admin/live/tag",
    method: "get",
    params: query
  });
}

// 查询tag详细
export function getTag(tagId) {
  return request({
    url: "/admin/live/tag/" + praseStrEmpty(tagId),
    method: "get"
  });
}

// 新增tag
export function addTag(data) {
  return request({
    url: "/admin/live/tag/add",
    method: "post",
    data: data
  });
}


// 修改tagId信息
export function updateTag(data) {
  return request({
    url: "/admin/live/tag/update",
    method: "post",
    data: data
  });
}

// 删除tag
export function delTag(data) {
    return request({
      url: "/admin/live/tag/del",
      method: "post",
      data: data
    });
  }