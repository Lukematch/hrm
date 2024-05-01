<template>
  <a-modal
  maskClosable="true"
  :open="open"
  :footer=null
  @cancel="open=false"
  >
    <a-card type="inner" hoverable style="margin-top: 20px;">
      <h3 slot="header">
      开发技术栈
        <a-button class="text" type="text">vue+antd</a-button>
      </h3>
      <a-descriptions class="descriptions" bordered
      :column="1">
        <a-descriptions-item
        :label="item.technology"
        v-for="(item, index) in technologyStack"
        :key="index"
        >{{ item.version }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </a-modal>
</template>

<script setup lang='ts'>
import { useStore } from '@/store/openModal/index.ts';
import { storeToRefs } from 'pinia'

const store = useStore()
const { open } = storeToRefs(store)
console.log(open.value);

const technologyStack = [
  { technology: 'vue', version: '^3.4.15' },
  { technology: 'typescript', version: '^5.2.2' },
  { technology: 'vite', version: '^5.1.0' },
  { technology: 'vue-router', version: '^4.2.5' },
  { technology: 'pinia', version: '^2.1.7' },
  { technology: 'ant-design-vue', version: '^4.1.2' },
  { technology: '@ant-design/icons-vue', version: '^7.0.1' },
  { technology: 'axios', version: '^1.6.7' },
]



</script>

<style scoped>
.text{
  float: right;
  padding: 3px 0;
  margin-right: 70px;

}
.text:hover{
  background-color: orange;
}
h3:hover{
  color: #16c8c8;
}

</style>