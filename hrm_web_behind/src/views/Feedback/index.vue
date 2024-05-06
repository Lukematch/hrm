<template>
  <div class="container">
    <a-card class="card">
      <a-list
      bordered="true"
      item-layout="vertical" :pagination="pagination":data-source="listData"
      >
        <template #header>
          <div>
            <b>反馈中心</b>
          </div>
        </template>
        <template #renderItem="{ item }">
          <a-list-item key="item.title">
            <template #actions>
              <span v-for="{ icon, text } in actions" :key="icon">
                <a-button type="text"
                @click="()=>{
                  visiable = true
                  feedback = item
                }"
                >
                  <component :is="icon" style="margin-right: 8px" />
                  {{ text }}
                </a-button>
              </span>
            </template>
            <a-list-item-meta :description="item.description">
              <template #title>
                <span>{{ item.title }}</span>
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
            <a-list-item key="feedback.title">
              <a-list-item-meta :description="feedback.description">
                <template #title>
                  <span>{{ feedback.title }}</span>
                </template>
              </a-list-item-meta>
              {{ feedback.content }}
            </a-list-item>
          </template>
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
            <a-textarea style="margin-bottom: 10px; height: 100px" v-model="newComment" />
            <a-button type="primary" @click="submitComment">提交评论</a-button>
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

const visiable = ref(false);
const feedback = ref()

const listData: Record<string, string>[] = [
  {
    title: '员工培训计划',
    description: '培训计划是否需要进一步细化？',
    content: '在制定员工培训计划时，我们需要考虑到员工的实际需求和能力提升方向。您认为当前的培训计划是否覆盖了员工的需求？是否有必要进一步细化培训内容或增加培训项目？欢迎提供您的意见和建议。',
  },
  {
    title: '绩效考核标准',
    description: '绩效考核标准是否合理？',
    content: '我们的绩效考核标准是关系到员工评价和晋升的重要依据之一。您认为目前的绩效考核标准是否合理？是否有必要对绩效考核指标进行调整或优化？期待听取您的看法和建议。',
  },
  {
    title: '团队沟通机制',
    description: '团队沟通机制是否有效？',
    content: '团队沟通对于工作效率和团队凝聚力至关重要。您认为当前的团队沟通机制是否有效？是否存在沟通不畅或信息传递不及时的情况？欢迎分享您的意见和建议，帮助我们改进团队沟通效率。',
  },
  {
    title: '工作流程优化',
    description: '工作流程是否需要优化？',
    content: '工作流程的优化能够提高工作效率和质量，您认为当前的工作流程是否存在不足之处？是否有必要对工作流程进行调整或优化？欢迎提供您的意见和建议，帮助我们更好地改进工作流程。',
  },
  {
    title: '员工福利待遇',
    description: '员工福利待遇是否合理？',
    content: '员工福利待遇是吸引和留住人才的重要因素之一，您认为我们提供的员工福利待遇是否合理？是否有必要增加或调整某些福利项目？期待听取您的意见和建议，帮助我们提升员工满意度。',
  },
  {
    title: '工作环境舒适度',
    description: '工作环境舒适度如何？',
    content: '良好的工作环境能够提升员工工作效率和工作质量，您认为我们的工作环境舒适度如何？是否有必要改善或优化工作环境？欢迎分享您的意见和建议，帮助我们打造更好的工作环境。',
  },
];
const newComment = ref('');
const commandList = ref([
  {
    content: '测试',
    time: '2024-05-02 12:00:00',
  },
  {
    content: '测试2',
    time: '2024-05-04 12:00:00',
  }
])

const pagination = {
  // onChange: (page: number) => {
  //   console.log(page);
  // },
  pageSize: 3,
};
const actions: Record<string, any>[] = [
  // { icon: StarOutlined, text: '11' },
  // { icon: LikeOutlined, text: '11' },
  { icon: MessageOutlined, text: '回复' },
];

const submitComment = () => {
  if (newComment.value.trim() !== '') {
    commandList.value.push(
      { content: newComment.value, time: new Date().toLocaleString() }
    );
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