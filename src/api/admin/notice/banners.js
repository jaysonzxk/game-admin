import request from "@/utils/request";

// 查询公告列表
export function listBanners(query) {
  return request({
    url: "/admin/system/banners",
    method: "get",
    params: query
  });
}

// 查询公告详细
export function getBanners(bannersId) {
  return request({
    url: "/admin/system/banners/" + bannersId,
    method: "get"
  });
}

// 新增公告
export function addBanners(data) {
  return request({
    url: "/admin/system/banners/add",
    method: "post",
    data: data
  });
}

// 修改公告
export function updateBanners(data) {
  return request({
    url: "/admin/system/banners/update",
    method: "post",
    data: data
  });
}

// 删除公告
export function delBanners(data) {
  return request({
    url: "/admin/system/banners/del",
    method: "post",
    data: data
  });
}
