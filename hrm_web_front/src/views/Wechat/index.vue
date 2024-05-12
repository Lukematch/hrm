<template>
  <div class="container">
    <a-card class="card">
      <a-button
      style="margin-bottom: 5px;"
      @click="()=>{
        feedbackVisible = true
      }"
      >新增反馈</a-button>
      <a-modal
      v-model:visible="feedbackVisible"
      title="新增反馈"
      @Ok="onOk"
      @onCancel="()=>{
        feedbackVisible = false
      }"
      :confirm-loading="confirmLoading"
      okText="提交"
      cancelText="取消"
      style="width: 600px;height: auto;"
      >
        <a-form
        :wrapper-col="{ span: 16 }"
        :model="feedbackFormState"
        :label-col="{ span: 4 }"
        >
          <a-form-item name="f_id" label="反馈编号">
            <a-input v-model:value="feedbackFormState.f_id" />
          </a-form-item>
          <a-form-item name="title" label="标题">
            <a-input v-model:value="feedbackFormState.title" />
          </a-form-item>
          <a-form-item name="description" label="描述">
            <a-textarea v-model:value="feedbackFormState.description" />
          </a-form-item>
          <a-form-item name="content" label="内容">
            <a-textarea v-model:value="feedbackFormState.content" />
          </a-form-item>
        </a-form>
      </a-modal>

      <a-list
      bordered="true"
      item-layout="vertical" :pagination="pagination":data-source="listData"
      >
        <template #header>
          <div>
            <b>意见反馈</b>
          </div>
        </template>
        <template #renderItem="{ item }">
          <a-list-item key="item.title">
            <template #actions>
              <span v-for="{ icon, text } in actions" :key="icon">
                <a-button type="text"
                @click="onReply(item)"
                >
                  <component :is="icon" style="margin-right: 8px" />
                  {{ text }}
                </a-button>
              </span>
            </template>
            <a-list-item-meta :description="item.description">
              <template #title>
                <span>{{ item.title }}</span>
                <span style="margin-left: 10px;font-size: 12px;color: rgba(0, 0, 0, 0.45);">
                  发布于
                  <a-tooltip :title="dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')">
                    <span>{{ item.time }}</span>
                  </a-tooltip>
                </span>
              </template>
            </a-list-item-meta>
            {{ item.content }}
          </a-list-item>
        </template>
      </a-list>
      <a-modal
      style="width: 800px;height: 100%;"
      v-model:visible="visiable"
      >
        <a-list
        bordered="true"
        item-layout="vertical" :pagination="false"
        :data-source="commandList"
        >
          <template #header>
            <a-card bordered style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);">
            <a-list-item key="feedback.title">
              <a-list-item-meta :description="feedback.description">
                <template #title>
                  <span>{{ feedback.title }}</span>
                </template>
              </a-list-item-meta>
              {{ feedback.content }}
            </a-list-item>
          </a-card>
          </template>
          <a-empty v-if="commandList.length === 0" description="暂无评论"/>
          <h3 style="margin: 5px 0 0 15px">评论</h3>
          <template #renderItem="{ item }">
            <a-comment style="margin: 0 30px 0 30px;">
              <template #content>
                <p>
                  {{ item.content }}
                </p>
              </template>
              <template #datetime>
                <a-tooltip :title="dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')">
                  <span>{{ dayjs(item.time).fromNow() }}</span>
                </a-tooltip>
              </template>
            </a-comment>
          </template>
          <template #footer>
            <a-textarea style="margin-bottom: 10px; height: 100px" v-model:value="newComment" />
            <a-button type="primary" @click="submitComment()">提交评论</a-button>
          </template>
        </a-list>
        <template #footer></template>
      </a-modal>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { MessageOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import dayjs from 'dayjs';
import {
  getFeedbackList,
  addFeedback,
  getCommandById,
  addCommand
} from '@/utils/api.ts';
import { message } from 'ant-design-vue';

const confirmLoading = ref(false)
const feedbackVisible = ref(false)
const visiable = ref(false);
const feedback = ref()
const feedbackFormState = ref({
  f_id: '',
  title: '',
  description: '',
  content: '',
})

const listData = ref<any[]>([]);
const getListData = async () => {
  const { data }:any = await getFeedbackList();
  const newData = data.map((item: any) => ({
    f_id: item.f_id,
    title: item.f_title,
    description: item.description,
    content: item.content,
    time: dayjs(item.f_time).format('YYYY-MM-DD HH:mm:ss'),
  }));
  listData.value.splice(0, listData.value.length, ...newData);
};
getListData();

const newComment = ref('');
const commandList = ref<any[]>([])

const pagination = {
  pageSize: 3,
};
const actions: Record<string, any>[] = [
  { icon: MessageOutlined, text: '回复' },
];

const onOk = async () => {
  confirmLoading.value = true
  let feddbackState = {
    f_id: feedbackFormState.value.f_id,
    f_title: feedbackFormState.value.title,
    description: feedbackFormState.value.description,
    content: feedbackFormState.value.content,
    f_time: new Date().toLocaleString(),
  }
  const data = await addFeedback(feddbackState)
  setTimeout(() => {
    if(data.data.msg === 'success'){
      confirmLoading.value = false
      feedbackVisible.value = false
      message.success('新增成功！')
    } else {
      message.error('新增失败！')
      confirmLoading.value = false
    }
  }, 2000);
  getListData()
}

const onReply = async (item:any)=>{
  visiable.value = true
  feedback.value = item
  const { data }:any = await getCommandById(item.f_id)
  const newData = data.map((com: any) => ({
    f_id: com.f_id,
    com_id: com.com_id,
    content: com.com_content,
    time: dayjs(com.com_time).format('YYYY-MM-DD HH:mm:ss'),
  }));
  commandList.value.splice(0, commandList.value.length, ...newData);
}
const submitComment = async () => {
  if (newComment.value.trim() !== '') {
    let newComId;
    if (commandList.value.length !== 0) {
      let lastItem = commandList.value[commandList.value.length - 1].com_id;
      let num = parseInt(lastItem.substring(1));
      if (!isNaN(num)) {
        newComId = num + 1;
      }
    }
    let newCommentState = {
      com_id: commandList.value.length !== 0 ? `c${newComId}` : 'c1',
      f_id: feedback.value.f_id,
      com_content: newComment.value,
      com_time: new Date().toLocaleString(),
    }
    const data = await addCommand(newCommentState)
    if(data.data.msg === 'success'){
      message.success('提交成功！')
      visiable.value = false
    } else {
      message.error('提交失败！')
      visiable.value = false
    }
    newComment.value = ''; // 清空输入框
  }
};
</script>

<style scoped>
.container {
  padding: 10px;
  .card {
    margin-top: 20px
  }
}
</style>