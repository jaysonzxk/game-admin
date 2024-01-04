import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询游戏列表
export function listGame(query) {
  return request({
    url: "/admin/games/games",
    method: "get",
    params: query
  });
}

// 查询游戏详细
export function getGame(gamneId) {
  return request({
    url: "/admin/games/games/" + praseStrEmpty(gamneId),
    method: "get"
  });
}

// 新增厂商
export function addGame(data) {
  return request({
    url: "/admin/games/games/add",
    method: "post",
    data: data
  });
}


// 修改厂商信息
export function updateGame(data) {
  return request({
    url: "/admin/games/games/update",
    method: "post",
    data: data
  });
}

   // 所有分类
   export function AllCategory(){
    return request({
        url: "/admin/games/category/list",
        method: 'get'
    })
  }