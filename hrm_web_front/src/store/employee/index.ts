import { defineStore } from 'pinia'
import { Employee, getEmployee } from '@/types/eployee';
import { getOneEmployee } from '@/utils/api.ts';


export const employeeStore = defineStore('employee', {
  state: () => {
    return {
      // user
      user: <Employee>{}
    }
  },
  actions:{
    // 获取user
    async getUserList(e_id: number) {
      // 获取员工数据
      const  data:getEmployee  = await getOneEmployee(e_id)
        if (data.message === 'success') {
          this.user = data.data[0]
          return data.data[0]
        }
    },
  }
})