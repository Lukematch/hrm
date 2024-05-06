<template>
  <div class="container">
    <a-card title="培训中心">
      <a-table
      class="table"
      bordered
      style="height: auto; width: 100%;"
      :scroll="{ x: 1800, y: 485 }"
      :columns="columns"
      :dataSource="trainingList"
      :pagination="false"
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
            <a-button v-if="record.train_status === '已选中'" style="margin-right: 5px;"
            @click="()=>{
              trainExperienceVisible = true
              trainExperienceState.id = record?.id
            }">添加体会</a-button>
            <a-button v-if="record.train_status === '体会待考核'" style="margin-right: 5px;"
            @click="()=>{
              trainExperienceVisible = true
              trainExperienceState.id = record.id
              trainExperienceState.train_experience = record.train_experience
            }">修改体会</a-button>
            <a-button disabled v-if="record.train_status === '培训驳回'" style="margin-right: 5px;">考核不通过</a-button>
            <a-button v-if="record.train_status === '培训通过'" style="margin-right: 5px;"
            @click="()=>{
              trainExperienceOkVisible = true
              trainExperienceOkState.id = record?.id
              trainExperienceOkState.train_experience = record?.train_experience
            }">查看体会</a-button>
            <a-popconfirm title="确认删除这条记录？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmDeleteTraining(record)"
            >
              <a-button type="primary" danger ghost>删除记录</a-button>
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
          <a-descriptions-item label="编号">{{ moreTrainingList.train_id }}</a-descriptions-item>
          <a-descriptions-item label="类型">{{ moreTrainingList.train_type }}</a-descriptions-item>
          <a-descriptions-item label="主题">{{ moreTrainingList.topic }}</a-descriptions-item>
          <a-descriptions-item label="培训老师">{{ moreTrainingList.train_teacher }}</a-descriptions-item>
          <a-descriptions-item label="内容">{{ moreTrainingList.train_content }}</a-descriptions-item>
          <a-descriptions-item label="备注">{{ moreTrainingList.remark }}</a-descriptions-item>
        </a-descriptions>
        <template #footer></template>
      </a-modal>
      <a-modal
      title="填写培训体会"
      v-model:visible="trainExperienceVisible"
      okText="提交"
      cancelText="取消"
      @Ok="trainExperienceOk"
      @onCancel="()=>{
        trainExperienceVisible = false
      }"
      :confirm-loading="confirmLoading"
      >
        <a-form
        :value="trainExperienceState"
        >
          <a-form-item name="id" label="培训编号">
            <a-input-number disabled :value="trainExperienceState.id"/>
          </a-form-item>
          <a-form-item name="trainExperience" label="培训体会">
            <a-textarea v-model:value="trainExperienceState.train_experience" :rows="4" />
          </a-form-item>
        </a-form>
      </a-modal>
      <a-modal
      title="查看培训体会"
      v-model:visible="trainExperienceOkVisible"
      >
        <a-descriptions :column="1">
          <a-descriptions-item label="培训编号">{{ trainExperienceOkState.id }}</a-descriptions-item>
          <a-descriptions-item label="培训体会">{{ trainExperienceOkState.train_experience }}</a-descriptions-item>
        </a-descriptions>
      </a-modal>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import {
  getTrainingById,
  updateExperience,
  deleteTraining
} from '@/utils/api.ts';
import { message } from 'ant-design-vue';
import { ref, watch } from 'vue';


const trainingList = ref([])

const userJson = localStorage.getItem('user');
const user = JSON.parse(userJson!);

const getTrainingList = async () => {
  const { data } = await getTrainingById(user?.e_id)
  trainingList.value = data
}
getTrainingList()


const moreTrainingList = ref()
const confirmLoading = ref(false)
const moreTrainingVisible = ref(false)
const trainExperienceVisible = ref(false)
const trainExperienceState = ref({
  id: undefined,
  train_experience: ''
})
const trainExperienceOkVisible = ref(false)
const trainExperienceOkState = ref({
  id: undefined,
  train_experience: ''
})

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
  { title: '培训内容', dataIndex: 'train_content', key: 'train_content', width: 130, align: 'center' },
  { title: '备注', dataIndex: 'remark', key: 'remark', width: 80, align: 'center' },
  { title: '培训老师', dataIndex: 'train_teacher', key: 'train_teacher', width: 40, align: 'center' },
  { title: '状态', dataIndex: 'train_status', key: 'train_status', fixed:  'right',width: 40, align: 'center'},
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
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

const trainExperienceOk = async () => {
  // console.log(trainExperienceState.value);
  confirmLoading.value = true
  let training = {
    ...trainExperienceState.value,
    train_status: '体会待考核'
  }
  const data = await updateExperience(Number(trainExperienceState.value.id), training)
  setTimeout(()=>{
    confirmLoading.value = false
    trainExperienceVisible.value = false
    if(data.data.msg === 'success'){
    message.success('提交成功')
    getTrainingList()
  } else {
    message.error('提交失败')
  }
  },2000)
}

const confirmDeleteTraining = async (record: any) => {
  const data = await deleteTraining(Number(record.id))
  if(data.data.msg === 'success'){
    message.success('删除成功')
    getTrainingList()
  } else {
    message.error('删除失败')
  }
}

</script>

<style scoped>
.container {
  padding: 30px;
}
</style>