import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询厂商列表
export function listManufacturer(query) {
  return request({
    url: "/admin/games/gameManufacturer",
    method: "get",
    params: query
  });
}

// 查询厂商详细
export function getManufacturer(manufacturerId) {
  return request({
    url: "/admin/games/gameManufacturer/" + praseStrEmpty(manufacturerId),
    method: "get"
  });
}

// 新增厂商
export function addManufacturer(data) {
  return request({
    url: "/admin/games/gameManufacturer/add",
    method: "post",
    data: data
  });
}


// 修改厂商信息
export function updateManufacturer(data) {
  return request({
    url: "/admin/games/gameManufacturer/update",
    method: "post",
    data: data
  });
}


// 删除厂商
export function delManufacturer(data) {
    return request({
      url: "/admin/games/gameManufacturer/del",
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