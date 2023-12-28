import request from "@/utils/request";

// 查询公告列表
export function listAnnouncement(query) {
  return request({
    url: "/admin/system/announcement/",
    method: "get",
    params: query
  });
}

// 查询公告详细
export function getAnnouncement(announcementId) {
  return request({
    url: "/admin/system/announcement/" + announcementId + '/',
    method: "get"
  });
}

// 新增公告
export function addAnnouncement(data) {
  return request({
    url: "/admin/system/announcement/add/",
    method: "post",
    data: data
  });
}

// 修改公告
export function updateAnnouncement(data) {
  return request({
    url: "/admin/system/announcement/update/",
    method: "post",
    data: data
  });
}

// 删除公告
export function delAnnouncement(data) {
  return request({
    url: "/admin/system/announcement/del/",
    method: "post",
    data: data
  });
}
