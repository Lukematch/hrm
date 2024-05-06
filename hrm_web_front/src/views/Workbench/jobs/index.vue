<template>
  <a-row class="container">
    <!-- <Jobs /> -->
  </a-row>
  <a-row class="table">
    <a-card
    title="工作项提交" class="card">
      <a-button
      style="margin-bottom: 10px;"
      @click="()=>{
        workVisible = true
      }"
      >新增工作项</a-button>
      <a-modal
      title="新建工作项"
      v-model:visible="workVisible"
      @Ok="onOk"
      @onCancel="()=>{
        workVisible = false
      }"
      :confirm-loading="confirmLoading"
      okText="确认"
      cancelText="取消"
      width="600px"
      >
        <a-form
        :model="workFormState"
        :label-col="{ span: 5 }"
        >
          <a-form-item name="job_name" label="工作项名称">
            <a-input v-model:value="workFormState.job_name" />
          </a-form-item>
          <a-form-item name="job_type" label="工作项类型">
            <a-select v-model:value="workFormState.job_type">
              <a-select-option value="开发">开发</a-select-option>
              <a-select-option value="维护">维护</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item name="job_descriptions" label="工作项简述">
            <a-textarea v-model:value="workFormState.job_descriptions" />
          </a-form-item>
          <a-form-item name="job_manager" label="负责人">
            <a-input v-model:value="workFormState.job_manager" />
          </a-form-item>
          <a-form-item name="job_progress" label="工作项完成进度">
            <a-input-number v-model:value="workFormState.job_progress" /> %
          </a-form-item>
          <a-form-item name="remark" label="备注">
            <a-textarea v-model:value="workFormState.remark" />
          </a-form-item>
        </a-form>
      </a-modal>
      <a-table
      bordered
      style="height: auto; width: 100%;"
      :scroll="{ x: 1800, y: 400 }"
      :columns="columns"
      :dataSource="workList"
      :pagination="false"
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
            <a-button type="primary" style="margin-right: 5px;"
            :disabled="record.job_status === '驳回' || record.job_status === '通过'"
            @click="()=>{
              editWorkVisible = true
              newWorkFormState = {...record}
              editWorkInit = {...record}
            }">编辑</a-button>
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
      <a-modal
      title="编辑工作项"
      v-model:visible="editWorkVisible"
      @Ok="editWorkOk"
      @onCancel="()=>{
        editWorkVisible = false
      }"
      :confirm-loading="confirmLoading"
      okText="确认"
      cancelText="取消"
      width="600px"
      >
        <a-form
        :label-col="{ span: 5 }"
        :form="newWorkFormState"
        :initialValues="editWorkInit"
        >
          <a-form-item name="job_name" label="工作项名称">
            <a-input disabled :value="newWorkFormState.job_name" />
          </a-form-item>
          <a-form-item name="job_type" label="工作项类型">
            <a-select disabled v-model:value="newWorkFormState.job_type" option="['维护','开发']"></a-select>
          </a-form-item>
          <a-form-item name="job_descriptions" label="工作项简述">
            <a-textarea v-model:value="newWorkFormState.job_descriptions" />
          </a-form-item>
          <a-form-item name="job_manager" label="负责人">
            <a-input v-model:value="newWorkFormState.job_manager" />
          </a-form-item>
          <a-form-item name="job_progress" label="工作项完成进度">
            <a-input-number v-model:value="newWorkFormState.job_progress" /> %
          </a-form-item>
          <a-form-item name="remark" label="备注">
            <a-textarea v-model:value="newWorkFormState.remark" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </a-row>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

// import Jobs from '@/components/Jobs/index.vue';
import {
  getWorksById,
  addWork,
  editWork,
  deleteWork
} from '../../../utils/api.ts';
import dayjs from 'dayjs';
import { message } from 'ant-design-vue';

const confirmLoading = ref(false)
const workVisible = ref(false);
const editWorkVisible = ref(false);

const user = JSON.parse(localStorage.getItem('user')!);

const workList = ref()
const workFormState = ref({
  job_name: '',
  job_type: '',
  job_descriptions: '',
  job_manager: '',
  job_progress: '',
  remark: ''
})
const newWorkFormState = ref()
const editWorkInit = ref()


const getWorkList = async () => {
  const { data } = await getWorksById(user?.e_id)
  data.forEach((item:any) => {
    item.job_time = dayjs(item.job_time).format('YYYY-MM-DD hh:mm:ss')
  })
  workList.value = data
}
getWorkList()

const columns:any = [
  { title: '工作项编号', dataIndex: 'id', key: 'id', fixed: 'left', width: 60, align: 'center' },
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
  { title: '工作项考核状态', dataIndex: 'job_status', key: 'job_status', width: 100, fixed: 'right', align: 'center' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 120,
  }
]

// 新建工作项
const onOk = async () => {
  confirmLoading.value = true
  let work = {
    ...workFormState.value,
    e_id: user?.e_id,
    e_section: user?.e_section,
    job_time: dayjs().format('YYYY-MM-DD hh:mm:ss'),
    job_status: '待考核'
  }
  const { data } = await addWork(work)
  if (data.msg === 'success') {
    confirmLoading.value = false
    workVisible.value = false
    message.success('新增成功！')
    getWorkList()
  } else {
    message.error('新增失败')
  }
}


// 编辑工作项
const editWorkOk = async () => {
  confirmLoading.value = true
  let newWork = {
    ...newWorkFormState.value,
    e_id: user?.e_id,
    e_section: user?.e_section,
    job_time: dayjs().format('YYYY-MM-DD hh:mm:ss'),
    job_status: '待考核'
  }
  const { data } = await editWork(newWorkFormState.value.id,newWork)
  if (data.msg === 'success') {
    confirmLoading.value = false
    editWorkVisible.value = false
    message.success('编辑成功！')
    getWorkList()
  } else {
    message.error('编辑失败')
  }
}

// 删除工作项
const confirmDeleteWork = async (record: any) => {
  const { data } = await deleteWork(record.id)
  if (data.msg === 'success') {
    message.success('删除成功！')
    getWorkList()
  } else {
    message.error('删除失败')
  }
  
}
</script>

<style scoped>

.container {
  /* width: 100%; */
  padding: 5px;
  display: flex;
  justify-content: center;
}
.table {
  padding: 20px;
  display: flex;
  justify-content: center;
  .card {
    height: 100%;
    width: 98%;
  }
}
</style>