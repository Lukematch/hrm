<template>
  <div class="container">
    <a-card
    class="card"
    title="离职管理">
      <a-table
      bordered
      :scroll="{ x: 1800, y: 'auto' }"
      :columns="columns"
      :data-source="dimissionList"
      :pagination="{ pageSize: 5 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'di_status'">
            <span>
              <a-tag
              :key="record.di_status"
              :color="record.di_status === '驳回申请' ? 'volcano' : record.di_status === '待审批' ? 'geekblue' : 'green'"
              >
                {{ record.di_status }}
              </a-tag>
            </span>
          </template>
          <template v-if="column.key === 'operation'">
            <a-popconfirm title="确认通过这条数据？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmPassDimissionApply(record)"
            >
              <a-button :disabled="record.di_status === '通过申请' || record.di_status === '驳回申请'" style="margin-right: 5px;" type="primary">通过</a-button>
            </a-popconfirm>
            <a-popconfirm title="确认驳回这条数据？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmRejectDimissionApply(record)"
            >
              <a-button :disabled="record.di_status === '通过申请' || record.di_status === '驳回申请'" style="margin-right: 5px;">驳回</a-button>
            </a-popconfirm>
            <a-popconfirm title="确认删除这条数据？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmDeleteDimissionApply(record)"
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
  getDimissionApply,
  updateDimissionApply,
  deleteDimissionApply,
  deleteEmployee
} from '../../../utils/api.ts';
import { message } from 'ant-design-vue';


const dimissionList = ref()

const getDimissionApplyList = async () => {
  const { data } = await getDimissionApply()
  data.forEach((item:any) => {
    item.di_time = dayjs(item.di_time).format('YYYY-MM-DD hh:mm:ss')
  })
  dimissionList.value = data
}
getDimissionApplyList()

const columns = [
  { title: '员工工号', dataIndex: 'e_id', key: 'e_id', fixed: 'left', width: 50, align: 'center' },
  { title: '姓名', dataIndex: 'name', key: 'name', fixed: 'left', width: 40, align: 'center'},
  { title: '所属部门', dataIndex: 'e_section', key: 'e_section', width: 60, align: 'center'},
  { title: '职位', dataIndex: 'e_grade', key: 'e_grade', width: 80, align: 'center'},
  { title: '联系方式', dataIndex: 'e_phone', key: 'e_phone', width: 80, align: 'center'},
  { title: '身份证信息', dataIndex: 'e_identification', key: 'e_identification', width: 100, align: 'center'},
  { title: '离职理由', dataIndex: 'di_reason', key: 'di_reason', width: 120, align: 'center'},
  { title: '备注', dataIndex: 'remark', key: 'remark', width: 100, align: 'center'},
  { title: '申请时间', dataIndex: 'di_time', key: 'di_time', width: 100, align: 'center' },
  { title: '申请状态', dataIndex: 'di_status', key: 'di_status', width: 60, fixed: 'right', align: 'center' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 120,
  }
]

const confirmPassDimissionApply = async (record: any) => {
  let pass = {
    di_status: '通过申请'
  }
  const data = await updateDimissionApply(record.id, pass)
  setTimeout(()=>{
    getDimissionApplyList()
    if(data.data.msg === 'success'){
      message.success('通过成功')
      deleteEmployee(record.e_id)
    } else {
      message.error('通过失败')
    }
  }, 500)
}

const confirmRejectDimissionApply = async (record: any) => {
  let reject = {
    di_status: '驳回申请'
  }
  const data = await updateDimissionApply(record.id, reject)
  getDimissionApplyList()
  setTimeout(()=>{
    if(data.data.msg === 'success'){
      message.success('驳回成功')
    } else {
      message.error('驳回失败')
    }
  }, 500)
}

const confirmDeleteDimissionApply = async (record: any) => {
  const data:any = await deleteDimissionApply(record.id)
  setTimeout(()=>{
    getDimissionApplyList()
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