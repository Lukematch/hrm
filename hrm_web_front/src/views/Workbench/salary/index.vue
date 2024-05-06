<template>
  <div class="container">
  <!-- <a-row class="table"> -->
    <a-date-picker
    style="height: 40px; margin-bottom: 10px"
    v-model:value="month" picker="month"
    @change="getSalaryList"
    />
    <a-card
    class="card">
      <a-descriptions v-if="!salaryRecordState.no" bordered :column="3">
        <a-descriptions-item label="员工工号">{{ salaryRecordState.e_id }}</a-descriptions-item>
          <a-descriptions-item label="所属部门-职位">{{ salaryRecordState.e_section }} - {{ salaryRecordState.e_grade }}</a-descriptions-item>
          <a-descriptions-item label="工资发放日期">{{ salaryRecordState.date }}</a-descriptions-item>
          <a-descriptions-item label="基本工资(元)">{{ salaryRecordState.base_salary }}</a-descriptions-item>
          <a-descriptions-item label="绩效工资(元)">{{ salaryRecordState.performance_salary }}</a-descriptions-item>
          <a-descriptions-item label="奖金(元)">{{ salaryRecordState.bonus }}</a-descriptions-item>
          <a-descriptions-item label="应发工资(元)">
            {{ salaryRecordState.paid_salary }} ({{ salaryRecordState.base_salary }} + {{ salaryRecordState.performance_salary }} + {{ salaryRecordState.bonus }})
          </a-descriptions-item>
          <a-descriptions-item label="罚款(元)">{{ salaryRecordState.fine }}</a-descriptions-item>
          <a-descriptions-item label="罚款原因">{{ salaryRecordState.fine_reason }}</a-descriptions-item>
          <a-descriptions-item label="实发工资(元)">
            {{ salaryRecordState.actual_salary }} ({{ salaryRecordState.paid_salary }} - {{ salaryRecordState.fine }})
          </a-descriptions-item>
      </a-descriptions>
      <a-empty v-if="salaryRecordState.no"/>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import {
  getSalaryListById
} from '../../../utils/api.ts';
import dayjs from 'dayjs';

const month = ref();
const userJson = localStorage.getItem('user');
const user = JSON.parse(userJson!);

const salaryRecordState = ref({
  e_id: undefined,
  e_section: '',
  e_grade: '',
  date: '',
  base_salary: 0,
  performance_salary: 0,
  bonus: 0,
  paid_salary: 0,
  fine: 0,
  fine_reason: '',
  actual_salary: 0,
  no: false
})

const getSalaryList = async () => {
  const { data } = await getSalaryListById(user?.e_id)
  for(let i = 0; i < data.length; i++){
    let res = data[i]
    res.date = dayjs(data.date).format('YYYY-MM')
    let selectedDate = month.value ? month.value.format('YYYY-MM') : dayjs().format('YYYY-MM')
    if (res.date !== selectedDate) {
      res = { no: true }
    }
    salaryRecordState.value = res
  }
}
getSalaryList()


</script>

<style scoped>
.container {
  /* width: 100%; */
  padding: 30px;
}

</style>