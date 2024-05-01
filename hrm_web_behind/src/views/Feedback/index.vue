<template>
  <div class="container">
    <a-card>
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
                <component :is="icon" style="margin-right: 8px" />
                {{ text }}
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
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';


const listData: Record<string, string>[] = [
  {
    title:'问题1',
    description:'这是一个问题描述',
    content:'这是一个问题内容',
  },
  {
    title:'问题2',
    description:'这是一个问题描述',
    content:'这是一个问题内容',
  },
  {
    title:'问题3',
    description:'这是一个问题描述',
    content:'这是一个问题内容',
  },
  {
    title:'问题4',
    description:'这是一个问题描述',
    content:'这是一个问题内容',
  },
  {
    title:'问题5',
    description:'这是一个问题描述',
    content:'这是一个问题内容',
  },
  {
    title:'问题6',
    description:'这是一个问题描述',
    content:'这是一个问题内容',
  },
];

const pagination = {
  // onChange: (page: number) => {
  //   console.log(page);
  // },
  pageSize: 3,
};
const actions: Record<string, any>[] = [
  { icon: StarOutlined, text: '11' },
  { icon: LikeOutlined, text: '11' },
  { icon: MessageOutlined, text: '1' },
];
</script>

<style scoped>
.container{
  padding: 10px;
}
</style>