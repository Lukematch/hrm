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
// 通过工号获取培训中心列表
export const getTrainingById = (id: number) => {
  return http.get({
    url: `/api/training/${id}/e_id`
  })
}
// 员工提交培训体会
export const updateExperience = (id: number, data: any) => {
  return http.patch({
    url: `/api/training/${id}/experience`,
    data: data
  })
}
// 删除培训中心记录
export const deleteTraining = (id: number) => {
  return http.delete(`/api/training/${id}`)
}

// 按照工号获取工资列表
export const getSalaryListById = (id: number) => {
  return http.get({
    url: `/api/salary/${id}`
  })
}

// 调换岗位申请新增
export const relieveApply = (data: any) => {
  return http.post({
    url: `/api/relieve-apply`,
    data: data
  })
}
// 根据工号获取调换岗位申请列表
export const getRelieveApplyById = (id: number) => {
  return http.get({
    url: `/api/relieve-apply/${id}`
  })
}
// 删除调换岗位申请
export const deleteRelieveApply = (id: number) => {
  return http.delete(`/api/relieve-apply/${id}`)
}

// 离职申请新增
export const dimissionApply = (data: any) => {
  return http.post({
    url: `/api/dimission-apply`,
    data: data
  })
}
// 根据工号获取离职申请列表
export const getDimissionApplyById = (id: number) => {
  return http.get({
    url: `/api/dimission-apply/${id}`
  })
}
// 删除离职申请
export const deleteDimissionApply = (id: number) => {
  return http.delete(`/api/dimission-apply/${id}`)
}


// 按照工号获取工作项列表
export const getWorksById = (id: number) => {
  return http.get({
    url: `/api/jobs/${id}`
  })
}
// 新增工作项
export const addWork = (data: any) => {
  return http.post({
    url: `/api/jobs`,
    data: data
  })
}
// 编辑工作项
export const editWork = (id:number, data: any) => {
  return http.patch({
    url: `/api/jobs/${id}`,
    data: data
  })
}
// 删除工作项
export const deleteWork = (id: number) => {
  return http.delete(`/api/jobs/${id}`)
}