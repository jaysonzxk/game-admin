import request from "@/utils/request";

// 查询公告列表
export function listMarquee(query) {
  return request({
    url: "/admin/system/marquee/",
    method: "get",
    params: query
  });
}

// 查询公告详细
export function getMarquee(marqueeId) {
  return request({
    url: "/admin/system/marquee/" + marqueeId + '/',
    method: "get"
  });
}

// 新增公告
export function addMarquee(data) {
  return request({
    url: "/admin/system/marquee/add/",
    method: "post",
    data: data
  });
}

// 修改公告
export function updateMarquee(data) {
  return request({
    url: "/admin/system/marquee/update/",
    method: "post",
    data: data
  });
}

// 删除公告
export function delMarquee(data) {
  return request({
    url: "/admin/system/marquee/del/",
    method: "post",
    data: data
  });
}
