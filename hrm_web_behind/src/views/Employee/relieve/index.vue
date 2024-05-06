<template>
  <div class="container">
    <a-card
    class="card"
    title="调换管理">
      <a-table
      bordered
      :scroll="{ x: 1800, y: 'auto' }"
      :columns="columns"
      :data-source="relieveList"
      :pagination="{ pageSize: 5 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 're_status'">
            <span>
              <a-tag
              :key="record.re_status"
              :color="record.re_status === '驳回申请' ? 'volcano' : record.re_status === '待审批' ? 'geekblue' : 'green'"
              >
                {{ record.re_status }}
              </a-tag>
            </span>
          </template>
          <template v-if="column.key === 'operation'">
            <a-popconfirm title="确认通过这条数据？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmPassRelieveApply(record)"
            >
              <a-button :disabled="record.re_status === '通过申请' || record.re_status === '驳回申请'" style="margin-right: 5px;" type="primary">通过</a-button>
            </a-popconfirm>
            <a-popconfirm title="确认驳回这条数据？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmRejectRelieveApply(record)"
            >
              <a-button :disabled="record.re_status === '通过申请' || record.re_status === '驳回申请'" style="margin-right: 5px;">驳回</a-button>
            </a-popconfirm>
            <a-popconfirm title="确认删除这条数据？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmDeleteRelieveApply(record)"
            >
              <a-button type="primary" danger ghost>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import dayjs from 'dayjs';
import {
  getRelieveApply,
  updateRelieveApply,
  deleteRelieveApply,
  updateEmployee
} from '../../../utils/api.ts';
import { message } from 'ant-design-vue';

const relieveList = ref()

const getRelieveApplyList = async () => {
  const { data } = await getRelieveApply()
  data.forEach((item:any) => {
    item.re_time = dayjs(item.re_time).format('YYYY-MM-DD hh:mm:ss')
  })
  relieveList.value = data
}
getRelieveApplyList()

const columns = [
  { title: '员工工号', dataIndex: 'e_id', key: 'e_id', fixed: 'left', width: 50, align: 'center' },
  { title: '姓名', dataIndex: 'name', key: 'name', fixed: 'left', width: 40, align: 'center'},
  { title: '所属部门', dataIndex: 'e_section', key: 'e_section', width: 100, align: 'center'},
  { title: '职位', dataIndex: 'e_grade', key: 'e_grade', width: 100, align: 'center'},
  { title: '申请调换部门', dataIndex: 're_section', key: 're_section', width: 100, align: 'center'},
  { title: '申请职位', dataIndex: 're_grade', key: 're_grade', width: 100, align: 'center'},
  { title: '申请时间', dataIndex: 're_time', key: 're_time', width: 100, align: 'center' },
  { title: '申请状态', dataIndex: 're_status', key: 're_status', width: 60, fixed: 'right', align: 'center' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 120,
  }
]

const confirmPassRelieveApply = async (record: any) => {
  let pass = {
    re_status: '通过申请'
  }
  const data = await updateRelieveApply(record.id, pass)
  setTimeout(()=>{
    getRelieveApplyList()
    if(data.data.msg === 'success'){
      message.success('通过成功')
      let newSection = {
        e_id: record.e_id,
        e_section: record.re_section,
        e_grade: record.re_grade,
      }
      updateEmployee(newSection)
    } else {
      message.error('通过失败')
    }
  }, 500)
}

const confirmRejectRelieveApply = async (record: any) => {
  let reject = {
    re_status: '驳回申请'
  }
  const data = await updateRelieveApply(record.id, reject)
  getRelieveApplyList()
  setTimeout(()=>{
    if(data.data.msg === 'success'){
      message.success('驳回成功')
    } else {
      message.error('驳回失败')
    }
  }, 500)
}

const confirmDeleteRelieveApply = async (record: any) => {
  const data:any = await deleteRelieveApply(record.id)
  setTimeout(()=>{
    getRelieveApplyList()
    if(data.data.msg === 'success'){
      message.success('删除成功')
    } else {
      message.error('删除失败')
    }
  }, 500)
}


</script>

<style scoped>
.card{
  margin: 5px 10px;
}
</style>