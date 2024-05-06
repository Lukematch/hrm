<template>
  <div class="container">
    <a-card class="card" title="工资管理">
      <a-button slot="header" style="margin-bottom: 10px;"
      @click="createSalaryRecord"
      >
        新增员工工资记录
      </a-button>
      <a-modal
      title="新增员工工资记录"
      v-model:visible="salaryVisible"
      @Ok="onOk"
      @onCancel="()=>{
        salaryVisible = false
      }"
      :confirm-loading="confirmLoading"
      okText="确认"
      cancelText="取消"
      width="600px"
      >
        <a-form
        :model="salaryRecordFormState"
        :label-col="{ span: 5 }"
        >
          <a-form-item name="e_id" label="员工工号">
            <a-select
            @change="handleIdChange($event)"
            style="width: 100px"
            v-model:value="selectedId"
            >
              <a-select-option v-for="em in employeeList" :key="em.e_id" :value="em.e_id">
                {{ em.e_id }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="员工姓名">
            <a-select
            disabled
            style="width: 100px"
            v-model:value="selectedName"
            >
              <a-select-option :value="selectedName">
                {{ selectedName }}
              </a-select-option>
              <template #suffixIcon><smile-outlined class="ant-select-suffix" /></template>
            </a-select>
          </a-form-item>
          <a-form-item label="所属部门和职位">
            <a-select
            disabled
            style="width: 138px;margin-right: 10px"
            v-model:value="emSection"
            >
              <a-select-option :value="emSection">
                {{ emSection }}
              </a-select-option>
              <template #suffixIcon></template>
            </a-select>
            <a-select
            disabled
            style="width: 120px"
            v-model:value="emGrade"
            >
              <a-select-option :value="emGrade">
                {{ emGrade }}
              </a-select-option>
              <template #suffixIcon></template>
            </a-select>
          </a-form-item>
          <a-form-item name="base_salary" label="基本工资">
            <a-input-number :value="baseSalary" disabled /> 元
          </a-form-item>
          <a-form-item name="month" label="工资发放日期">
            <a-date-picker v-model:value="salaryRecordFormState.month" picker="month"/>
          </a-form-item>
          <a-form-item name="performance" label="绩效比例">
            <a-input-number v-model:value="salaryRecordFormState.performance"/> %
          </a-form-item>
          <a-form-item name="bonus" label="奖金">
            <a-input-number v-model:value="salaryRecordFormState.bonus"/> 元
          </a-form-item>
          <a-form-item name="fine" label="罚款">
            <a-input-number v-model:value="salaryRecordFormState.fine"/> 元
          </a-form-item>
          <a-form-item name="fine_reason" label="罚款原因">
            <a-textarea v-model:value="salaryRecordFormState.fine_reason"/>
          </a-form-item>
        </a-form>
      </a-modal>
      <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5 }"
      :scroll="{ x: 1500, y: 500 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <a-button type="primary" style="margin-right: 5px;"
            @click="editSalaryRecorfd(record)">查看详情</a-button>
            <a-popconfirm title="确认删除这条数据？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmDeleteRecord(record)"
            >
              <a-button type="primary" danger ghost>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
      <a-modal
      title="员工工资记录"
      v-model:visible="esalaryVisible"
      width="600px"
      >
        <a-descriptions
        :column="1"
        bordered
        >
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
        <template #footer></template>
      </a-modal>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  getSalaryRecord,
  createSalaryRecordApi,
  getEmployees,
  deleteSalaryRecord
} from '../../utils/api.ts';
import {
  SmileOutlined
} from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import { message } from 'ant-design-vue';

const confirmLoading = ref(false)
const salaryVisible = ref(false)
const esalaryVisible =ref(false)

const dataSource:any = ref([])
const salaryRecordState = ref()

const employeeList:any = ref([])
const selectedId = ref()
const selectedName = ref()
const emSection = ref()
const emGrade = ref()

const salaryRecordFormState:any = ref({
  month: dayjs(),
  base_salary: undefined,
  performance: undefined,
  bonus: undefined,
  fine: undefined,
  fine_reason: '',
})

const getSalaryRecordList = async () => {
  const { data } = await getSalaryRecord()
  data.forEach((item:any) => {
    item.date = dayjs(item.date).format('YYYY-MM')
    item.time = dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
  })
  dataSource.value = data
}
getSalaryRecordList()

const getEmployeeList = async () => {
  const { data } = await getEmployees()
  employeeList.value = data
}
getEmployeeList()

// 全局的基本工资变量
const baseSalary = ref(0);

const employeegradeData:any = {
  业务部: ['辅助技术', '初级工程师', '一级工程师', '二级工程师', '三级工程师', '中级工程师', '高级工程师', '项目经理', '主管', '部长'],
  开发部: ['辅助技术', '初级工程师', '一级工程师', '二级工程师', '三级工程师', '中级工程师', '高级工程师', '项目经理', '主管', '部长'],
  运维部: ['辅助技术', '初级工程师', '中级工程师', '高级工程师', '主管', '部长'],
  生产部: ['辅助生产', '仓库管理员', '生产测试员', '生产文员', '组长', '主管', '部长'],
  测试部: ['辅助技术', '初级工程师', '中级工程师', '高级工程师', '主管', '部长'],
  财务部: ['业务员', '会计', '一级主管', '二级主管', '三级主管', '部长'],
  人力资源部: ['人事助理', '人事专员', '一级主管', '二级主管', '三级主管', '部长'],
  行政部: ['行政助理', '行政文员', '一级主管', '二级主管', '三级主管', '副经理', '经理', '总裁'],
  市场部: ['销售专员', '市场企划', '一级主管', '二级主管', '三级主管', '部长'],
};
// 根据部门和职位计算基本工资
const calculateBaseSalary = (department:any, grade:any) => {
  // 根据部门和职位获取相应的基本工资，然后返回
  // 暂时使用简单的逻辑来模拟
  let baseSalaryValue = 0;
  switch (department) {
    case '业务部':
    case '开发部':
      switch (grade) {
        case '辅助技术':
          baseSalaryValue = 3000
          break;
        case '初级工程师':
          baseSalaryValue = 5000;
          break;
        case '一级工程师':
          baseSalaryValue = 6000;
          break;
        case '二级工程师':
          baseSalaryValue = 9000;
          break;
        case '三级工程师':
          baseSalaryValue = 11000;
          break;
        case '中级工程师':
          baseSalaryValue = 10000;
          break;
        case '高级工程师':
          baseSalaryValue = 12000;
          break;
        case '项目经理':
          baseSalaryValue = 12000;
          break;
        case '主管':
          baseSalaryValue = 15000;
          break;
        case '部长':
          baseSalaryValue = 20000;
          break;
      }
      break;
    case '运维部':
    case '测试部':
      switch (grade) {
        case '辅助技术':
          baseSalaryValue = 3000;
          break;
        case '初级工程师':
          baseSalaryValue = 5000;
          break;
        case '中级工程师':
          baseSalaryValue = 8000;
          break;
        case '高级工程师':
          baseSalaryValue = 10000;
          break;
        case '主管':
          baseSalaryValue = 12000;
          break;
        case '部长':
          baseSalaryValue = 18000;
          break;
      }
      break;
    case '生产部':
      switch (grade) {
        case '辅助生产':
          baseSalaryValue = 2000;
          break;
        case '仓库管理员':
          baseSalaryValue = 5000;
          break;
        case '生产测试员':
          baseSalaryValue = 4000;
          break;
        case '生产文员':
          baseSalaryValue = 3000;
          break;
        case '组长':
          baseSalaryValue = 6000;
          break;
        case '主管':
          baseSalaryValue = 8000;
          break;
        case '部长':
          baseSalaryValue = 10000;
          break;
      }
      break;
    case '财务部':
      switch (grade) {
        case '业务员':
          baseSalaryValue = 3000;
          break;
        case '会计':
          baseSalaryValue = 4000;
          break;
        case '一级主管':
          baseSalaryValue = 6000;
          break;
        case '二级主管':
          baseSalaryValue = 8000;
          break;
        case '三级主管':
          baseSalaryValue = 10000;
          break;
        case '部长':
          baseSalaryValue = 12000;
          break;
      }
      break;
    case '人力资源部':
      switch (grade) {
        case '人事助理':
          baseSalaryValue = 3000;
          break;
        case '人事专员':
          baseSalaryValue = 4000;
          break;
        case '一级主管':
          baseSalaryValue = 6000;
          break;
        case '二级主管':
          baseSalaryValue = 8000;
          break;
        case '三级主管':
          baseSalaryValue = 10000;
          break;
        case '部长':
          baseSalaryValue = 12000;
          break;
      }
      break;
    case '行政部':
      switch (grade) {
        case '行政助理':
          baseSalaryValue = 3000;
          break;
        case '行政文员':
          baseSalaryValue = 4000;
          break;
        case '一级主管':
          baseSalaryValue = 8000;
          break;
        case '二级主管':
          baseSalaryValue = 10000;
          break;
        case '三级主管':
          baseSalaryValue = 12000;
          break;
        case '副经理':
          baseSalaryValue = 20000;
          break;
        case '经理':
          baseSalaryValue = 25000;
          break;
        case '总裁':
          baseSalaryValue = 30000;
          break;
      }
      break;
    case '市场部':
      switch (grade) {
        case '销售专员':
          baseSalaryValue = 3000;
          break;
        case '市场企划':
          baseSalaryValue = 5000;
          break;
        case '一级主管':
          baseSalaryValue = 8000;
          break;
        case '二级主管':
          baseSalaryValue = 10000;
          break;
        case '三级主管':
          baseSalaryValue = 12000;
          break;
        case '部长':
          baseSalaryValue = 15000;
          break;
      }
      break;
    default:
      baseSalaryValue = 0;
  }
  return baseSalaryValue;
}

const handleIdChange = (value:any) => {
  // console.log(value);
  const employee = employeeList.value.find((em:any) => em.e_id === value);
  if (employee) {
    selectedName.value = employee.name;
    emSection.value = employee.e_section;
    emGrade.value = employee.e_grade;
    // 获取基本工资
    const department = employeegradeData[employee.e_section];
    if (department && department.includes(employee.e_grade)) {
      baseSalary.value = calculateBaseSalary(employee.e_section, employee.e_grade);
    } else {
      baseSalary.value = 0; // 如果部门或职位不在定义中，则设置为0
    }
  }
}

const columns = [
  { title: '编号', dataIndex: 'id', key: 'id', fixed: 'left', width: 20, align: 'center'},
  { title: '工号', dataIndex: 'e_id', key: 'e_id', fixed: 'left', width: 30, align: 'center',
    filters: [],
    filterSearch: true,
    onFilter: (value:string, record:any) => record.e_id.indexOf(value) === 0
  },
  { title: '工资年月', dataIndex: 'date', key: 'date', width: 80, align: 'center',
    filters: [],
    filterSearch: true,
    onFilter: (value:string, record:any) => record.date.indexOf(value) === 0
  },
  { title: '应发工资(元)', dataIndex: 'paid_salary', key: 'paid_salary', width: 80, align: 'center' },
  { title: '实发工资(元)', dataIndex: 'actual_salary', key: 'actual_salary', width: 80, align: 'center' },
  { title: '记录时间', dataIndex: 'time', key: 'time', width: 100, align: 'center' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 80,
    align: 'center',
    customCell: ({ record }: { record: any; }) =>{return record}
  }
]
// 监听 employeeList 的变化，重新生成过滤器
watch(dataSource, (newValue) => {
  columns[1].filters = newValue.map((item:any) => ({
    text: item.e_id,
    value: item.e_id
  }));
  columns[2].filters = newValue.map((item:any) => ({
    text: item.date,
    value: item.date
  }));
});

const createSalaryRecord = () => {
  salaryVisible.value = true
}
// 新增记录
const onOk = async () => {
  // console.log(salaryRecordFormState.value);
  confirmLoading.value = true
  let date = salaryRecordFormState.value.month
  date = date.format('YYYY-MM-DD');
  let record = {
    ...salaryRecordFormState.value,
    e_id: selectedId.value,
    e_section: emSection.value,
    e_grade: emGrade.value,
    base_salary: baseSalary.value,
    date: date,
    time: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  // console.log(record);
  const data = await createSalaryRecordApi(record)
  // console.log(data);
  setTimeout(() => {
    salaryVisible.value = false
    confirmLoading.value = false
    if(data.data.msg === 'success'){
      message.success('新增记录成功')
      getSalaryRecordList()
    } else {
      message.error('新增记录失败')
    }
  }, 2000)
}

// 查看详情
const editSalaryRecorfd = async (record: any) => {
  salaryRecordState.value = { ...record }
  esalaryVisible.value = true
}

// 删除记录
const confirmDeleteRecord = async (record: any) => {
  confirmLoading.value = true
  const data = await deleteSalaryRecord(record.id)
  setTimeout(() => {
    confirmLoading.value = false
    if(data.data.msg === 'success'){
      message.success('删除记录成功')
      getSalaryRecordList()
    } else {
      message.error('删除记录失败')
    }
  }, 500)
}
</script>

<style scope>
.card{
  margin: 5px 10px;
}
</style>