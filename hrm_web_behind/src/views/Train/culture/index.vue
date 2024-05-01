<template>
  <div class="container">
    <a-card
    title="培训内容"
    class="card"
    >
      <a-button slot="header" style="margin-bottom: 10px;"
      @click="createTrainContent"
      >新建培训内容</a-button>
      <a-modal
      title="新建培训内容"
      v-model:visible="trainContentVisible"
      @Ok="onOk"
      @onCancel="()=>{
        trainContentVisible = false
      }"
      :confirm-loading="confirmLoading"
      okText="确认"
      cancelText="取消"
      width="600px"
      >
        <a-form
        :model="trainContentFormState"
        :label-col="{ span: 5 }"
        >
          <a-form-item label="培训编号">
            <a-input v-model:value="trainContentFormState.train_id" />
          </a-form-item>
          <a-form-item label="培训类型">
            <a-select v-model:value="trainContentFormState.train_type" placeholder="请选择" :options="trainType"/>
          </a-form-item>
          <a-form-item label="培训主题">
            <a-textarea v-model:value="trainContentFormState.topic" />
          </a-form-item>
          <a-form-item label="培训内容">
            <a-textarea v-model:value="trainContentFormState.train_content" />
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea v-model:value="trainContentFormState.remark" />
          </a-form-item>
          <a-form-item label="培训老师">
            <a-input v-model:value="trainContentFormState.train_teacher" />
          </a-form-item>
        </a-form>
      </a-modal>
      <a-table
      class="table"
      bordered
      style="height: auto; width: 100%;"
      :scroll="{ x: 1800, y: 400 }"
      :columns="columns"
      :dataSource="trainContentList"
      :pagination="{ pageSize: 5 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <a-button type="primary" style="margin-right: 5px;"
            @click="editTrainContent(record)">编辑</a-button>
            <a-popconfirm title="确认删除这条数据？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmDeleteTrainContent(record.train_id)"
            >
              <a-button type="primary" danger ghost>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
        <a-modal
        title="修改培训内容"
        v-model:visible="editTrainContentVisible"
        @Ok="editTrainContentOk"
        @onCancel="()=>{
          editTrainContentVisible = false
        }"
        :confirm-loading="confirmLoading"
        okText="确认"
        cancelText="取消"
        width="600px"
        >
        <a-form
        :label-col="{ span: 5 }"
        :form="newTrainContentFormState"
        :initialValues="editInitTrainContent"
        >
          <a-form-item label="培训编号">
            <a-input disabled v-model:value="newTrainContentFormState.train_id" />
          </a-form-item>
          <a-form-item label="培训类型">
            <a-select v-model:value="newTrainContentFormState.train_type" placeholder="请选择" :options="trainType"/>
          </a-form-item>
          <a-form-item label="培训主题">
            <a-textarea v-model:value="newTrainContentFormState.topic" />
          </a-form-item>
          <a-form-item label="培训内容">
            <a-textarea v-model:value="newTrainContentFormState.train_content" />
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea v-model:value="newTrainContentFormState.remark" />
          </a-form-item>
          <a-form-item label="培训老师">
            <a-input v-model:value="newTrainContentFormState.train_teacher" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import {
  getTrainContent,
  createOneTrainContent,
  updateOneTrainContent,
  deleteTrainContent
} from '../../../utils/api.ts';


const trainContentVisible = ref(false)
const editTrainContentVisible = ref(false)
const confirmLoading = ref(false)

const trainContentList = ref()
const trainContentFormState:any = ref({
  train_id: '',
  train_type: '',
  topic: '',
  train_content: '',
  remark: '',
  train_teacher: ''
})
const newTrainContentFormState:any = ref()
const editInitTrainContent = ref()

const getTrainContentList = async () => {
  const { data } = await getTrainContent()
  trainContentList.value = data
}
getTrainContentList()

const trainType = [
  {label: '技术', value: '技术'},
  {label: '软技能', value: '软技能'},
  {label: '产品', value: '产品'},
  {label: '销售', value: '销售'},
  {label: '管理', value: '管理'},
  {label: '安全', value: '安全'},
  {label: '认证', value: '认证'},
  {label: '客户服务', value: '客户服务'},
  {label: '创新', value: '创新'},
  {label: '多元文化', value: '多元文化'},
]

const columns = [
  { title: '培训编号', dataIndex: 'train_id', key: 'train_id', fixed: 'left', width: 40, align: 'center' },
  { title: '培训类型', dataIndex: 'train_type', key: 'train_type', fixed: 'left', width: 40, align: 'center',
    filterSearch: true,
    filters: [
      { text: '技术', value: '技术' },
      { text: '软技能', value: '软技能' },
      { text: '产品', value: '产品' },
      { text: '销售', value: '销售' },
      { text: '管理', value: '管理' },
      { text: '安全', value: '安全' },
      { text: '认证', value: '认证' },
      { text: '客户服务', value: '客户服务' },
      { text: '创新', value: '创新' },
      { text: '多元文化', value: '多元文化' }
    ],
    onFilter: (value:string, record:any) => record.notice_topic.indexOf(value) === 0
  },
  { title: '主题', dataIndex: 'topic', key: 'topic', width: 80, align: 'center',
    filters: [],
    filterSearch: true,
    onFilter: (value:string, record:any) => record.notice_title.indexOf(value) === 0
  },
  { title: '培训内容', dataIndex: 'train_content', key: 'train_content', width: 150, align: 'center' },
  { title: '备注', dataIndex: 'remark', key: 'remark', width: 80, align: 'center' },
  { title: '培训老师', dataIndex: 'train_teacher', key: 'train_teacher', width: 40, align: 'center' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 55,
    align: 'center',
    customCell: ({ record }: { record: any; }) =>{return record}
  }
]
watch(trainContentList, (newValue:any) => {
  columns[2].filters = newValue.map((item:any) => ({
    text: item.topic,
    value: item.topic,
  }));
});

const createTrainContent = () => {
  trainContentVisible.value = true
}
const onOk = async () => {
  confirmLoading.value = true
  const data = await createOneTrainContent(trainContentFormState.value)
  setTimeout(()=>{
    confirmLoading.value = false
    trainContentVisible.value = false
    if(data.data.msg == 'success'){
      message.success('新增成功')
    } else {
      message.error('新增失败')
    }
    getTrainContentList()
  },2000)
}

const editTrainContent = async (record:any) => {
  editInitTrainContent.value = { ...record }
  newTrainContentFormState.value = { ...record }
  editTrainContentVisible.value = true
}
const editTrainContentOk = async () => {
  confirmLoading.value = true
  const data = await updateOneTrainContent(newTrainContentFormState.value.train_id, newTrainContentFormState.value)
  setTimeout(()=>{
    confirmLoading.value = false
    editTrainContentVisible.value = false
    if(data.data.msg == 'success'){
      message.success('修改成功')
    } else {
      message.error('修改失败')
    }
    getTrainContentList()
  },2000)
}

const confirmDeleteTrainContent = async (id:any) => {
  const data = await deleteTrainContent(id)
  confirmLoading.value = true
  setTimeout(()=>{
    confirmLoading.value = false
    if(data.data.msg === 'success'){
      message.success('删除成功')
    } else {
      message.error('删除失败')
    }
    getTrainContentList()
  },1000)
}

</script>

<style scoped>
.card{
  margin: 5px 10px;
  height: 100%;
  width: auto;
}
</style>