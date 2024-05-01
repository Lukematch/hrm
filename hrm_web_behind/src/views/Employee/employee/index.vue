<template>
  <div class="container">
    <a-card
    class="card"
    title="员工信息">
      <a-button style="margin-bottom: 10px;" @click="onAddEmployee">添加员工</a-button>
      <a-modal
      title="新增员工实体"
      v-model:visible="employeeVisible"
      @Ok="onOk"
      @onCancel="()=>{
        employeeVisible = false
      }"
      :confirm-loading="confirmLoading"
      okText="确认"
      cancelText="取消"
      width="600px"
      >
        <a-form
        :model="employeeFormState"
        :label-col="{ span: 5 }"
        >
          <a-form-item name="e_id" label="工号">
            <a-input-number disabled :value="newEmployeeId" />
          </a-form-item>
          <a-form-item name="name" label="员工姓名">
            <a-input v-model:value="employeeFormState.name" />
          </a-form-item>
          <a-form-item name="age" label="员工年龄">
            <a-input-number v-model:value="employeeFormState.age" />
          </a-form-item>
          <a-form-item name="sex" label="员工性别">
            <a-radio-group style="width:100%" v-model:value="employeeFormState.sex">
              <a-radio-button value="女" style="margin-right: 10px;width: 21%;">女</a-radio-button>
              <a-radio-button value="男" style="width: 21%;">男</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item name="e_section" label="所属部门">
            <a-select v-model:value="employeeSection" placeholder="请选择" :options="employeeSectionData.map((sec:any) => ({ value: sec }))"/>
          </a-form-item>
          <a-form-item name="e_grade" label="所属岗位">
            <a-select v-model:value="employeeGrade" placeholder="请选择" :options="emGrade.map((gra:any) => ({ value: gra }))"/>
          </a-form-item>
          <a-form-item name="salary" label="员工工资">
            <a-input-number v-model:value="employeeFormState.salary" />
          </a-form-item>
          <a-form-item name="e_identification" label="身份证信息">
            <a-input v-model:value="employeeFormState.e_identification" />
          </a-form-item>
          <a-form-item name="e_address" label="居住地址">
            <a-input v-model:value="employeeFormState.e_address" />
          </a-form-item>
          <a-form-item name="e_mail" label="电子邮箱">
            <a-input v-model:value="employeeFormState.e_mail" />
          </a-form-item>
          <a-form-item name="e_phone" label="联系电话">
            <a-input v-model:value="employeeFormState.e_phone" />
          </a-form-item>
          <a-form-item name="password" label="登录密码">
            <a-input disabled :value="e_password" />
          </a-form-item>
        </a-form>
      </a-modal>
      <a-table
      bordered
      :columns="columns"
      :dataSource="employeeList"
      :scroll="{ x: 1500, y: 800 }"
      :pagination="{ pageSize: 5 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <a-button type="primary" style="margin-right: 5px;" @click="onUpdateEmployee(record)">编辑</a-button>
            <a-popconfirm title="确认重置员工密码？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmResetPw(record)"
            >
              <a-button style="margin-right: 5px;">重置密码</a-button>
            </a-popconfirm>
            <a-popconfirm title="确认删除这条数据？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmDeleteEmployee(record)"
            >
              <a-button type="primary" danger ghost>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
      <a-modal
        title="修改员工信息"
        v-model:visible="editEmployeeVisible"
        @Ok="editEmployeeOk"
        @onCancel="()=>{
          editEmployeeVisible = false
        }"
        :confirm-loading="confirmLoading"
        okText="确认"
        cancelText="取消"
        width="600px"
        >
          <a-form
          :label-col="{ span: 5 }"
          :model="newEmployeeFormState"
          :initialValues="editEmployee"
          >
          <!-- v-model:value="newEmployeeFormState" -->
          <a-form-item name="e_id" label="工号">
            <a-input-number disabled :value="newEmployeeFormState.e_id" />
          </a-form-item>
          <a-form-item name="name" label="员工姓名">
            <a-input v-model:value="newEmployeeFormState.name" />
          </a-form-item>
          <a-form-item name="age" label="员工年龄">
            <a-input-number v-model:value="newEmployeeFormState.age" />
          </a-form-item>
          <a-form-item name="sex" label="员工性别">
            <a-radio-group style="width:100%" v-model:value="newEmployeeFormState.sex">
              <a-radio-button value="女" style="margin-right: 10px;width: 21%;">女</a-radio-button>
              <a-radio-button value="男" style="width: 21%;">男</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item name="e_section" label="所属部门">
            <a-select v-model:value="editEmployeeSection" placeholder="请选择" :options="employeeSectionData.map((sec:any) => ({ value: sec }))"/>
          </a-form-item>
          <a-form-item name="e_grade" label="所属岗位">
            <a-select v-model:value="editEmployeeGrade" placeholder="请选择" :options="editEmGrade.map((gra:any) => ({ value: gra }))"/>
          </a-form-item>
          <a-form-item name="salary" label="员工工资">
            <a-input-number v-model:value="newEmployeeFormState.salary" />
          </a-form-item>
          <a-form-item name="e_identification" label="身份证信息">
            <a-input v-model:value="newEmployeeFormState.e_identification" />
          </a-form-item>
          <a-form-item name="e_address" label="居住地址">
            <a-input v-model:value="newEmployeeFormState.e_address" />
          </a-form-item>
          <a-form-item name="e_mail" label="电子邮箱">
            <a-input v-model:value="newEmployeeFormState.e_mail" />
          </a-form-item>
          <a-form-item name="e_phone" label="联系电话">
            <a-input v-model:value="newEmployeeFormState.e_phone" />
          </a-form-item>
          </a-form>
        </a-modal>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { getEmployees } from '@/utils/api.ts';
import { computed, h, ref, watch } from 'vue';
import {
  createOneEmployee,
  deleteEmployee,
  updateEmPw,
  updateEmployee
} from '../../../utils/api.ts';
import { message, notification } from 'ant-design-vue';
import { SmileOutlined } from '@ant-design/icons-vue';

const employeeVisible = ref(false)
const confirmLoading = ref(false)
const editEmployeeVisible = ref(false)
const editEmployee = ref()

const employeeFormState:any = ref({})

const newEmployeeId = ref()
const employeeList:any = ref([])
const newEmployeeFormState:any = ref()
const e_password= ref('123456')
const getEmployeeList = async () => {
  const { data } = await getEmployees()
  // console.log(data);
  employeeList.value = data
}
getEmployeeList()


const employeeSectionData = ['业务部','开发部','运维部','生产部','测试部','财务部','人力资源部','行政部','市场部']
const employeegradeData:any = {
  业务部:['辅助技术','初级工程师','一级工程师','二级工程师','三级工程师','中级工程师','高级工程师','项目经理','主管','部长'],
  开发部:['辅助技术','初级工程师','一级工程师','二级工程师','三级工程师','中级工程师','高级工程师','项目经理','主管','部长'],
  运维部:['辅助技术','初级工程师','中级工程师','高级工程师','主管','部长'],
  生产部:['辅助生产','仓库管理员','生产测试员','生产文员','组长','主管','部长'],
  测试部:['辅助技术','初级工程师','中级工程师','高级工程师','主管','部长'],
  财务部:['业务员','会计','一级主管','二级主管','三级主管','部长'],
  人力资源部:['人事助理','人事专员','一级主管','二级主管','三级主管','部长'],
  行政部:['行政助理','行政文员','一级主管','二级主管','三级主管','副经理','经理','总裁'],
  市场部:['销售专员','市场企划','一级主管','二级主管','三级主管','部长'],
}

// 新增员工 部门职位选择框联动
const employeeSection:any = ref(employeeSectionData[0])
const employeeGrade:any = ref(employeegradeData[employeeSection.value][0])
const emGrade = computed(() => {
  return employeegradeData[employeeSection.value];
});
watch(employeeSection, (val:any) => {
  employeeGrade.value = employeegradeData[val][0];
});

// 修改员工信息 部门职位选择框联动
const editEmployeeSection:any = ref()
const editEmployeeGrade:any = ref()
const editEmGrade = computed(() => {
  return employeegradeData[editEmployeeSection.value];
});
let isFirstChange = true;
watch(editEmployeeSection, (val:any) => {
  if (!isFirstChange) {
    editEmployeeGrade.value = employeegradeData[val][0];
  } else {
    isFirstChange = false;
  }
}, { immediate: true });

const columns:any = [
  { title: '员工工号', dataIndex: 'e_id', key: 'e_id', fixed: 'left', width: 90, align: 'center' },
  { title: '姓名', dataIndex: 'name', key: 'name', fixed: 'left', width: 80, align: 'center',
    filters: [],
    filterSearch: true,
    onFilter: (value:string, record:any) => record.name.indexOf(value) === 0
  },
  { title: '年龄', dataIndex: 'age', key: 'age', width: 80, align: 'center',
    sorter: {
      compare: (a:any, b:any) => a.age - b.age
    }
  },
  { title: '性别', dataIndex: 'sex', key: 'sex', width: 80, align: 'center',
    filters: [
      { text: '男', value: '男' },
      { text: '女', value: '女' }
    ],
    onFilter: (value:string, record:any) => record.sex.indexOf(value) === 0
  },
  { title: '所属部门', dataIndex: 'e_section', key: 'e_section', width: 100, align: 'center',
    filters: [
      { text: '业务部', value: '业务部' },
      { text: '开发部', value: '开发部' },
      { text: '运维部', value: '运维部' },
      { text: '生产部', value: '生产部' },
      { text: '测试部', value: '测试部' },
      { text: '财务部', value: '财务部' },
      { text: '人力资源部', value: '人力资源部' },
      { text: '行政部', value: '行政部' },
      { text: '市场部', value: '市场部' },
    ],
    onFilter: (value:string, record:any) => record.e_section.indexOf(value) === 0
  },
  { title: '职位', dataIndex: 'e_grade', key: 'e_grade', width: 100, align: 'center'},
  { title: '工资', dataIndex: 'salary', key: 'salary', width: 100, align: 'center' },
  { title: '身份证信息', dataIndex: 'e_identification', key: 'e_identification', width: 170, align: 'center' },
  { title: '地址', dataIndex: 'e_address', key: 'e_address', width: 100, align: 'center' },
  { title: '邮箱', dataIndex: 'e_mail', key: 'e_mail', width: 150, align: 'center' },
  { title: '联系电话', dataIndex: 'e_phone', key: 'e_phone', width: 120, align: 'center' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 250,
  },
]
// 监听 employeeList 的变化，重新生成过滤器
watch(employeeList, (newValue) => {
  columns[1].filters = newValue.map((item:any) => ({
    text: item.name,
    value: item.name }));
});
// 新增员工实体
const onOk = async () => {
  confirmLoading.value = true
  setTimeout(()=>{
    employeeVisible.value = false
    confirmLoading.value = false
    getEmployeeList()
    if(data.data.msg === 'success'){
      message.success('添加成功')
    } else {
      message.error('添加失败')
    }
  }, 2000)
  // console.log(employeeFormState.value);
  // 存储e_id
  employeeFormState.value.e_id = Number(newEmployeeId.value)
  // 将员工表单中的整型数据转换为数字类型
  employeeFormState.value.age = Number(employeeFormState.value.age)
  employeeFormState.value.salary = Number(employeeFormState.value.salary)
  // 存储部门、岗位
  employeeFormState.value.e_section = employeeSection.value
  employeeFormState.value.e_grade = employeeGrade.value
  // 初始化登录密码
  employeeFormState.value.password = e_password.value
  const data = await createOneEmployee(employeeFormState.value)
}
// 修改员工信息
const editEmployeeOk = async () => {
  confirmLoading.value = true
  setTimeout(()=>{
    editEmployeeVisible.value = false
    confirmLoading.value = false
    getEmployeeList()
    if(data.data.msg === 'success'){
      message.success('修改信息成功')
    } else {
      message.error('修改信息失败')
    }
  }, 2000)
  // console.log(newEmployeeFormState.value);
  const data = await updateEmployee(newEmployeeFormState.value)
}

// 创建员工modal框
const onAddEmployee = () => {
  // 获取最后一个员工的e_id
  const lastId = employeeList.value[employeeList.value.length - 1].e_id
  // 给新员工e_id赋值
  newEmployeeId.value = Number(Number(lastId) + 1)
  // console.log(newEmployeeId.value);
  employeeVisible.value = true
}
// 修改员工modal框
const onUpdateEmployee = (record:any) => {
  editEmployee.value = { ...record }; // 保存当前编辑行的数据
  newEmployeeFormState.value = { ...record }; // 将编辑行的数据复制给表单的默认值

  editEmployeeSection.value = record.e_section
  editEmployeeGrade.value = record.e_grade

  editEmployeeVisible.value = true
}
// 重置员工密码
const confirmResetPw = async (record:any) => {
  await updateEmPw(record.e_id, { newPw: '123456'})
  notification.open({
    message: `员工 ${record.e_id} 密码重置成功`,
    description:
      '默认密码为:123456',
    icon: () => h(SmileOutlined, { style: 'color: #16c8c8' }),
  });
}
const confirmDeleteEmployee = async (record:any) => {
  await deleteEmployee(record.e_id)
  message.success(`员工 ${record.e_id} 删除成功`)
  setTimeout(()=>{
    getEmployeeList()
  },1000)
}

</script>

<style scoped>
.card{
  margin: 5px 10px;
}
</style>