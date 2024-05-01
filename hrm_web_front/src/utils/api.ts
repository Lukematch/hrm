import http from './http.ts'

// 查询员工表中 指定员工的数据
export const getOneEmployee = (e_id: number) => {
  return http.get({
    url: `/api/employee/${e_id}`
    // params: {
    //   e_id: id
    // }
 })
}
// 员工登录
export const emLogin = (e_id: number, password: string) => {
  return http.post({
    url: `/api/e-login/login`,
    data: {
      e_id,
      password
    }
  })
}
// 获取通告
export const getNotices = () => {
  return http.get({
    url: `/api/notice`
  })
}
// 修改员工信息
export const updateEmployee = (data: any) => {
  return http.patch({
    url: `/api/employee/${data.e_id}`,
    data
  })
}
// 修改员工密码
export const updateEmPw = (e_id: number,data: any) => {
  return http.patch({
    url: `/api/employee/${e_id}/pw`,
    data
  })
}

// 按工号获取考勤情况
export const getIdAttendance = (id: number) => {
  return http.get({
    url: `/api/attendance/${id}/id`
  })
}
// 按照工号 日期获取考勤情况
export const getDateAttendance = (e_id: number, date: string) => {
  return http.get({
    url: `/api/attendance/${e_id}/${date}`
  })
}
// 员工考勤 签到 签退
export const employeeAttendance = (data: any) => {
  return http.post({
    url: `/api/attendance`,
    data
  })
}

// 新增请假申请实体
export const createLeaveApply = (data: any) => {
  return http.post({
    url: `/api/leave-apply`,
    data
  })
}
// 根据工号获取请假申请列表
export const getLeaveList = (id: number) => {
  return http.get({
    url: `/api/leave-apply/${id}`
  })
}
// 删除请假申请
export const deleteLeaveApply = (id: number) => {
  return http.delete(`/api/leave-apply/${id}`)
}

// 获取培训内容列表
export const getTrainContent = () => {
  return http.get({
    url: `/api/train-content`
  })
}
// 选中培训内容，插入培训中心列表
export const createOneTraining = (data: any) => {
  return http.post({
    url:  `/api/training`,
    data: data
  })
}


