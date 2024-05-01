import http from './http.ts'

// 查询员工表中所有员工数据
export const getEmployees = () => {
  return http.get({
    url: `/api/employee`
 })
}
// 新增员工实体
export const createOneEmployee = (data: any) => {
  return http.post({
    url: `/api/employee`,
    data: data
  })
}

// 更新员工信息
export const updateEmployee = (data: any) => {
  return http.patch({
    url: `/api/employee/${data.e_id}`,
    data
  })
}
// 更新员工密码
export const updateEmPw = (e_id: number,data: any) => {
  return http.patch({
    url: `/api/employee/${e_id}/resetpw`,
    data
  })
}
// 删除员工
export const deleteEmployee = (e_id: number) => {
  return http.delete(`/api/employee/${e_id}`)
}

// 管理员登录
export const rootLogin = (username: string, password: string) => {
  return http.post({
    url: `/api/r-login/login`,
    data: {
      username,
      password
    }
  })
}

// 获取通告列表
export const getNotices = () => {
  return http.get({
    url: `/api/notice`
  })
}
// 新建通告
export const createOneNotice = (data:any) => {
  return http.post({
    url: `/api/notice`,
    data: data
  })
}
// 修改通告
export const updateOneNotice = (data:any) => {
  return http.patch({
    url: `/api/notice/${data.notice_id}`,
    data: data
  })
}
// 删除通告
export const deleteOneNotice = (id:number) => {
  return http.delete(`/api/notice/${id}`)
}

// 获取部门列表
export const getSections = () => {
  return http.get({
    url: `/api/section`
  })
}
// 新建部门
export const createOneSection = (data:any) => {
  return http.post({
    url: `/api/section`,
    data: data
  })
}
// 修改部门
export const updateOneSection = (data:any) => {
  return http.patch({
    url: `/api/section/${data.section_id}`,
    data: data
  })
}
// 删除部门
export const deleteSection = (id:string) => {
  return http.delete(`/api/section/${id}`)
}

// 查询所有考勤情况
export const getAllAttendance = () => {
  return http.get({
    url: `/api/attendance`
  })
}
// 按照日期查询考勤情况
export const getAttendanceByDate = (date:string) => {
  return http.get({
    url: `/api/attendance/${date}/date`
  })
}
// 按照月份查询考勤情况
export const getAttendanceByMonth = (month:string) => {
  return http.get({
    url: `/api/attendance/${month}/month`
  })
}
// 按照部门查询考勤情况
export const getAttendanceBySection = (section:string) => {
  return http.get({
    url: `/api/attendance/${section}/section`
  })
}

// 获取请假申请列表
export const getLeaveList = () => {
  return http.get({
    url: `/api/leave-apply`
  })
}
// 通过、驳回请假申请
export const updateLeaveList = (id: number, data: any) => {
  return http.patch({
    url: `/api/leave-apply/${id}`,
    data: data
  })
}
// 删除请假申请
export const deleteLeaveList = (id: number) => {
  return http.delete(`/api/leave-apply/${id}`)
}

// 获取培训内容列表
export const getTrainContent = () => {
  return http.get({
    url: `/api/train-content`
  })
}
// 新增培训内容
export const createOneTrainContent = (data: any) => {
  return http.post({
    url: `/api/train-content`,
    data: data
  })
}
// 修改培训内容信息
export const updateOneTrainContent = (id: string, data: any) => {
  return http.patch({
    url: `/api/train-content/${id}`,
    data: data
  })
}
// 删除培训内容
export const deleteTrainContent = (id: string) => {
  return http.delete(`/api/train-content/${id}`)
}
