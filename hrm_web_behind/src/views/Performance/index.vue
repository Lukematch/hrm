<template>
  <div class="container">
    <a-select
    v-model:value="section"
    style="width: 200px;margin: 0 10px 10px 0"
    :options="options"
    placeholder="请选择部门"
    allowClear="true"
    ></a-select>
    <a-date-picker v-model:value="month" picker="month"
    placeholder="请选择月份"
    />
    <a-row>
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
    </a-row>
    <a-row>
      <a-card
      title="项目考核表"
      class=card3>
        <a-table style="width: 100%;" />
      </a-card>
    </a-row>

  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import type { Dayjs } from 'dayjs';

const month = ref<Dayjs>();
const section = ref<string>();
const options = ref([
  { value: '1', label: '业务部' },
  { value: '2', label: '开发部' },
  { value: '3', label: '运维部' },
  { value: '4', label: '生产部' },
  { value: '5', label: '测试部'},
  { value: '6', label: '财务部' },
  { value: '7', label: '人力资源部' },
  { value: '8', label: '行政部' },
  { value: '9', label: '市场部' }
])
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
    margin: 20px 0 10px 0;
    height: 100%;
    width: 100%;
  }
}
</style>