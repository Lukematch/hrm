<template>
  <div class="container">
    <a-card
    class="card"
    title="培训内容">
      <a-table
      class="table"
      bordered
      style="height: auto; width: 100%;"
      :scroll="{ x: 1800, y: 485 }"
      :columns="columns"
      :dataSource="trainContentList"
      :pagination="false"
      >
        <template #bodyCell="{ index, column, record }">
          <template v-if="column.key === 'operation'">
            <a-button type="primary" style="margin-right: 5px;"
            @click="moreTrainContent(record)">查看详情</a-button>
            <a-popconfirm title="确认选中这条培训内容？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmSelectedTrainContent(record)"
            >
              <a-button :disabled="trainDisabled[index]">选中培训</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
      <a-modal
      title="培训内容详情"
      v-model:visible="moreTrainContentVisible"

      width="600px"
      >
        <a-descriptions
        bordered
        :column="1"
        style="width: 100%;"
        >
          <!-- <template #extra>
            <a-button type="primary">Edit</a-button>
          </template> -->
          <a-descriptions-item label="编号">{{ moreTrainContentList.train_id }}</a-descriptions-item>
          <a-descriptions-item label="类型">{{ moreTrainContentList.train_type }}</a-descriptions-item>
          <a-descriptions-item label="主题">{{ moreTrainContentList.topic }}</a-descriptions-item>
          <a-descriptions-item label="培训老师">{{ moreTrainContentList.train_teacher }}</a-descriptions-item>
          <a-descriptions-item label="内容">{{ moreTrainContentList.train_content }}</a-descriptions-item>
          <a-descriptions-item label="备注">{{ moreTrainContentList.remark }}</a-descriptions-item>
        </a-descriptions>
        <template #footer></template>
      </a-modal>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import {
  getTrainContent,
  createOneTraining,
  getTrainingById
} from '@/utils/api.ts'
import { message, notification } from 'ant-design-vue';

const trainContentList = ref()
const moreTrainContentVisible = ref(false)

const userJson = localStorage.getItem('user');
const user = JSON.parse(userJson!);

const trainDisabled = ref<boolean[]>([])

const getTrainContentList = async () => {
  const { data } = await getTrainContent()
  trainContentList.value = data
  const selectedData = await getTrainingById(user?.e_id)
  if (selectedData.data.length > 0) {
    trainDisabled.value = trainContentList.value.map((content:any) => {
      return selectedData.data.some((selected:any) => selected.train_id === content.train_id);
    });
  } else {
    trainDisabled.value = Array(trainContentList.value.length).fill(false);
  }
}
getTrainContentList()

const moreTrainContentList = ref()

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
    width: 60,
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

const moreTrainContent = (record: any) => {
  moreTrainContentVisible.value = true
  moreTrainContentList.value = record
}

const confirmSelectedTrainContent = async (record: any) => {
  let newTrain = {
    ...record,
    e_id: user?.e_id,
    name: user?.name,
    train_experience: '',
    //已选中、待考核、培训通过、培训驳回
    train_status: '已选中'
  }
  // console.log(newTrain);
  try{
    await createOneTraining(newTrain)
    notification.open({
    message: '选中成功',
    description:
      '请在培训中心模块继续进行培训,并提交培训体会!',
  });
  } catch (error) {
    message.error('选中失败')
  }
}
</script>

<style scoped>
.container {
  padding: 30px;
}

</style>