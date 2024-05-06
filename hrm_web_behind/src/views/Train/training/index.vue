<template>
  <div class="container">
    <a-card
    title="培训中心"
    class="card">
    <a-table
    class="table"
    bordered
    style="height: auto; width: 100%;"
    :scroll="{ x: 1800, y: 485 }"
    :columns="columns"
    :dataSource="trainingList"
    :pagination="{ pageSize: 5}"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'train_status'">
          <span>
            <a-tag
              :key="record.train_status"
              :color="record.train_status === '培训驳回' ? 'volcano' : record.train_status === '体会待考核' ? 'geekblue' : record.train_status === '培训通过' ? 'green' : '' "
            >
              {{ record.train_status }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.key === 'operation'">
          <a-button type="primary" style="margin-right: 5px;"
          @click="moreTraining(record)">查看详情</a-button>
          <a-popconfirm title="确认通过该记录？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="confirmPassTraining(record)"
          >
            <a-button :disabled="record.train_status === '培训通过' || record.train_status === '培训驳回'" type="primary" style="margin-right: 5px;">通过</a-button>
          </a-popconfirm>
          <a-popconfirm title="确认驳回该记录？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="confirmRejectTraining(record)"
          >
            <a-button :disabled="record.train_status === '培训通过' || record.train_status === '培训驳回'" style="margin-right: 5px;">驳回</a-button>
          </a-popconfirm>
          <a-popconfirm title="确认删除这条记录？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="confirmDeleteTraining(record)"
          >
            <a-button type="primary" danger ghost>删除</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <a-modal
    title="培训详情"
    v-model:visible="moreTrainingVisible"
    width="600px"
    >
      <a-descriptions
      bordered
      :column="1"
      style="width: 100%;"
      >
        <a-descriptions-item label="编号">{{ moreTrainingList.id }}</a-descriptions-item>
        <a-descriptions-item label="培训人">{{ moreTrainingList.name }}</a-descriptions-item>
        <a-descriptions-item label="类型">{{ moreTrainingList.train_type }}</a-descriptions-item>
        <a-descriptions-item label="主题">{{ moreTrainingList.topic }}</a-descriptions-item>
        <a-descriptions-item label="培训老师">{{ moreTrainingList.train_teacher }}</a-descriptions-item>
        <a-descriptions-item label="内容">{{ moreTrainingList.train_content }}</a-descriptions-item>
        <a-descriptions-item label="备注">{{ moreTrainingList.remark }}</a-descriptions-item>
        <a-descriptions-item label="培训体会">{{ moreTrainingList.train_experience }}</a-descriptions-item>
      </a-descriptions>
      <template #footer></template>
    </a-modal>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import {
  getAllTraining,
  updateTrainingStatus,
  deleteTraining
} from '../../../utils/api.ts';
import { message } from 'ant-design-vue';

const trainingList = ref()
const moreTrainingVisible = ref(false)

const moreTrainingList = ref()


const getTrainingList = async () => {
  const { data } = await getAllTraining()
  trainingList.value = data
}
getTrainingList()

const columns = [
  { title: '编号', dataIndex: 'id', key: 'id', fixed: 'left', width: 30, align: 'center' },
  { title: '培训类型', dataIndex: 'train_type', key: 'train_type', fixed: 'left', width: 45, align: 'center',
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
  { title: '培训内容', dataIndex: 'train_content', key: 'train_content', width: 130, align: 'center' },
  { title: '备注', dataIndex: 'remark', key: 'remark', width: 80, align: 'center' },
  { title: '培训老师', dataIndex: 'train_teacher', key: 'train_teacher', width: 40, align: 'center' },
  { title: '培训体会', dataIndex: 'train_experience', key: 'train_experience', width: 120, align: 'center' },
  { title: '状态', dataIndex: 'train_status', key: 'train_status', fixed:  'right',width: 40, align: 'center'},
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 130,
    align: 'center',
    customCell: ({ record }: { record: any; }) =>{return record}
  }
]
watch(trainingList, (newValue:any) => {
  columns[2].filters = newValue.map((item:any) => ({
    text: item.topic,
    value: item.topic,
  }));
});

const moreTraining = (record: any) => {
  moreTrainingVisible.value = true
  moreTrainingList.value = record
}

const confirmPassTraining = async (record: any) => {
  let status = {
    train_status: '培训通过'
  }
  const data = await updateTrainingStatus(record.id, status)
  if(data.data.msg === 'success'){
    message.success('操作成功')
    getAllTraining()
  } else {
    message.error('操作失败')
  }
}
const confirmRejectTraining = async (record: any) => {
  let status = {
    train_status: '培训驳回'
  }
  const data = await updateTrainingStatus(record.id, status)
  if(data.data.msg === 'success'){
    message.success('操作成功')
    getAllTraining()
  } else {
    message.error('操作失败')
  }
}

const confirmDeleteTraining = async (record: any) => {
  const data = await deleteTraining(record.id)
  if(data.data.msg === 'success'){
    message.success('删除成功')
    getAllTraining()
  } else {
    message.error('删除失败')
  }
}


</script>

<style scoped>
.card{
  margin: 5px 10px;
  height: 100%;
  width: auto;
}
</style>