<template>
  <div class="container">
    <!-- <a-select
    v-model:value="section"
    style="width: 200px;margin: 0 10px 10px 0"
    :options="options"
    placeholder="请选择部门"
    allowClear="true"
    ></a-select>
    <a-date-picker v-model:value="month" picker="month"
    placeholder="请选择月份"
    /> -->
    <!-- <a-row>
      <a-col :span="12">
        <a-card title="饼图 部门已完成比例" class="card1">
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="完成项目名/未完成项目名" class=card2>
      <a-desriptions>
        <a-descriptions-item label="项目名">项目名</a-descriptions-item>
      </a-desriptions>
    </a-card>
      </a-col>
    </a-row> -->
    <a-row>
      <a-card
      title="项目考核表"
      class=card3>
        <a-table
        bordered
        style="height: auto; width: 100%;"
        :scroll="{ x: 1800, y: 400 }"
        :columns="columns"
        :dataSource="workList"
        :pagination="{ pageSize: 5}"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'job_status'">
              <span>
                <a-tag
                :key="record.job_status"
                :color="record.job_status === '驳回' ? 'volcano' : record.job_status === '待考核' ? 'geekblue' : 'green'"
                >
                  {{ record.job_status }}
                </a-tag>
              </span>
            </template>
            <template v-if="column.key === 'operation'">
              <a-popconfirm title="确认通过这条数据？"
              ok-text="确认"
              cancel-text="取消"
              @confirm="confirmPassWork(record)"
              >
                <a-button style="margin-right: 5px;" :disabled="record.job_status === '通过' || record.job_status === '驳回'" type="primary">通过</a-button>
              </a-popconfirm><a-popconfirm title="确认驳回这条数据？"
              ok-text="确认"
              cancel-text="取消"
              @confirm="confirmRejectWork(record)"
              >
                <a-button style="margin-right: 5px;" :disabled="record.job_status === '通过' || record.job_status === '驳回'">驳回</a-button>
              </a-popconfirm>
              <a-popconfirm title="确认删除这条数据？"
              ok-text="确认"
              cancel-text="取消"
              @confirm="confirmDeleteWork(record)"
              >
                <a-button type="primary" danger ghost>删除</a-button>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </a-card>
    </a-row>

  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import dayjs from 'dayjs'

// import { ref } from 'vue';
// import type { Dayjs } from 'dayjs';
import {
  getWork,
  editWork,
  deleteWork
} from '../../utils/api.ts';
import { message } from 'ant-design-vue';

// const month = ref<Dayjs>();
// const section = ref<string>();
// const options = ref([
//   { value: '1', label: '业务部' },
//   { value: '2', label: '开发部' },
//   { value: '3', label: '运维部' },
//   { value: '4', label: '生产部' },
//   { value: '5', label: '测试部'},
//   { value: '6', label: '财务部' },
//   { value: '7', label: '人力资源部' },
//   { value: '8', label: '行政部' },
//   { value: '9', label: '市场部' }
// ])

const workList = ref()

const getWorkList = async () => {
  const { data } = await getWork()
  data.forEach((item:any) => {
    item.job_time = dayjs(item.job_time).format('YYYY-MM-DD hh:mm:ss')
  })
  workList.value = data
}
getWorkList()

const columns = [
  { title: '工作项编号', dataIndex: 'id', key: 'id', fixed: 'left', width: 65, align: 'center' },
  { title: '所属部门', dataIndex: 'e_section', key: 'e_section', width: 80, align: 'center'},
  { title: '工作项名', dataIndex: 'job_name', key: 'job_name', width: 100, align: 'center'},
  { title: '工作项类型', dataIndex: 'job_type', key: 'job_type', width: 100, align: 'center',
  filters:[
    { text: '开发', value: '开发' },
    { text: '维护', value: '维护' }
  ]
  },
  { title: '工作项简述', dataIndex: 'job_descriptions', key: 'job_descriptions', width: 140, align: 'center'},
  { title: '工作项负责人', dataIndex: 'job_manager', key: 'job_manager', width: 80, align: 'center' },
  { title: '工作项完成进度(%)', dataIndex: 'job_progress', key: 'job_progress', width: 100, align: 'center' },
  { title: '工作项提交时间', dataIndex: 'job_time', key: 'job_time', width: 100, align: 'center' },
  { title: '备注', dataIndex: 'remark', key: 'remark', width: 60, align: 'center' },
  { title: '工作项考核状态', dataIndex: 'job_status', key: 'job_status', width: 90, fixed: 'right', align: 'center' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 150,
  }
]

const confirmPassWork = async (record: any) => {
  let pass = {
    job_status: '通过'
  }
  const data = await editWork(record.id, pass)
  setTimeout(()=>{
    getWorkList()
    if(data.data.msg === 'success'){
      message.success('通过成功')
    } else {
      message.error('通过失败')
    }
  }, 500)
}

const confirmRejectWork = async (record: any) => {
  let reject = {
    job_status: '驳回'
  }
  const data = await editWork(record.id, reject)
  setTimeout(()=>{
    getWorkList()
    if(data.data.msg === 'success'){
      message.success('驳回成功')
    } else {
      message.error('驳回失败')
    }
  }, 500)
}

const confirmDeleteWork = async (record: any) => {
  const data:any = await deleteWork(record.id)
  setTimeout(()=>{
    getWorkList()
    if(data.data.msg === 'success'){
      message.success('删除成功')
    } else {
      message.error('删除失败')
    }
  }, 500)
}

</script>

<style scoped>
.container{
  padding: 10px;
  .card1{
    margin: 0 10px 10px 0;
    height: 100%;
  }
  .card2{
    height: 100%;
  }
  .card3{
    margin: 0 0 10px 0;
    height: 100%;
    width: 100%;
  }
}
</style>