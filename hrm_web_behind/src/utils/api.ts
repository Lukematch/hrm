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
// 查询所有培训中心提交培训体会的记录
export const getAllTraining = () => {
  return http.get({
    url: `/api/training`
  })
}
// 修改培训记录状态
export const updateTrainingStatus = (id: number, data: any) => {
  return http.patch({
    url: `/api/training/${id}/status`,
    data: data
  })
}
// 删除培训记录
export const deleteTraining = (id: number) => {
  return http.delete(`/api/training/${id}`)
}


// 获取所有工资记录
export const getSalaryRecord = () => {
  return http.get({
    url: `/api/salary`
  })
}
// 新增工资记录
export const createSalaryRecordApi = (data: any) => {
  return http.post({
    url: `/api/salary`,
    data: data
  })
}
// 删除工资记录
export const deleteSalaryRecord = (id: number) => {
  return http.delete(`/api/salary/${id}`)
}

// 获取调换岗位申请列表
export const getRelieveApply = () => {
  return http.get({
    url: `/api/relieve-apply`
  })
}
// 删除调换岗位申请
export const deleteRelieveApply = (id: number) => {
  return http.delete(`/api/relieve-apply/${id}`)
}
// 修改岗位调换申请状态
export const updateRelieveApply = (id: number, data: any) => {
  return http.patch({
    url: `/api/relieve-apply/${id}`,
    data: data
  })
}

// 获取离职申请列表
export const getDimissionApply = () => {
  return http.get({
    url: `/api/dimission-apply`
  })
}
// 删除离职申请
export const deleteDimissionApply = (id: number) => {
  return http.delete(`/api/dimission-apply/${id}`)
}
// 修改离职申请状态
export const updateDimissionApply = (id: number, data: any) => {
  return http.patch({
    url: `/api/dimission-apply/${id}`,
    data: data
  })
}

// 获取工作项列表
export const getWork = () => {
  return http.get({
    url: `/api/jobs`
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

// 获取反馈列表
export const getFeedbackList = () => {
  return http.get({
    url: `/api/feedback`
  })
}
// 按照f_id查询评论
export const getCommandById = (id: number) => {
  return http.get({
    url: `/api/command/${id}`
  })
}
// 新增评论
export const addCommand = (data: any) => {
  return http.post({
    url: `/api/command`,
    data: data
  })
}
