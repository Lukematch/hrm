<template>
  <a-card hoverable class="card1">
    <h4 slot="header">饼图 所属部门已完成/该完成 比例 + Descriptions描述列表（已完成项目名+未完成项目名  包含简述）</h4>
    <div class="select" style="height: 20px; width: 100%;">
      <a-date-picker v-model:value="month" picker="month"
      placeholder="请选择月份"
      />
    </div>
    <div class="pie"
    style="height: auto;width: 45%;
    border-right: 1px #dde8ed solid;padding-right: 10px;">

    </div>
    <div class="descriptions">
      <a-descriptions title="项目名"
      style="height: auto;width: 50%;float: right;"
      bordered></a-descriptions>
  </div>
  </a-card>
</template>
  
<script setup lang='ts'>
import { ref } from 'vue'

import type { Dayjs } from 'dayjs';

const month = ref<Dayjs>();

</script>
  
<style scoped>
  .card1 {
    margin: 10px;
    height: 350px;
    width: 90%;
  }
</style>