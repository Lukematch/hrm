<template>
  <div class="container">
    <a-card>
      <a-tabs
      v-model:activeKey="activeKey"
      tab-position="left"
      >
        <a-tab-pane
        class="tab-pane1"
        key="1"
        tab="调换岗位"
        >
          <a-card class="relieve">
            <a-form
            :modal="relieve"
            name="调换岗位"
            >
              <a-form-item name="e_id" label="员工工号">
                <a-input-number disabled :value="user?.e_id"/>
              </a-form-item>
              <a-form-item name="e_name" label="员工姓名">
                <a-input-number disabled :value="user?.name"/>
              </a-form-item>
              <a-form-item name="e_section" label="当前所属部门">
                <a-select style="width: 130px;" disabled :value="user?.e_section"/>
              </a-form-item>
              <a-form-item name="e_grade" label="当前职位">
                <a-select style="width: 130px;" disabled :value="user?.e_grade"/>
              </a-form-item>
              <a-form-item name="re_section" label="调换部门">
                <a-select style="width: 130px;"
                v-model:value="re_section"
                :options="employeeSectionData.map((sec:any) => ({ value: sec }))"/>
              </a-form-item>
              <a-form-item name="re_grade" label="调换岗位">
                <a-select style="width: 130px;"
                v-model:value="re_grade"
                :options="emGrade.map((gra:any) => ({ value: gra }))"/>
              </a-form-item>
            </a-form>
            <a-button
            type="primary"
            style="width: 100px;margin-left: 30px"
            @click="handleRelieve"
            :loading="confirmLoading"
            :disabled="relieveList?.length !== 0"
            >
              提交
            </a-button>
          </a-card>
          <a-card
          title="调换岗位申请详情表"
          style="margin-top: 5px"
          >
            <a-table
            bordered
            :scroll="{ x: 1500, y: 'auto' }"
            :columns="re_columns"
            :data-source="relieveList"
            :pagination="false"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 're_status'">
                  <span>
                    <a-tag
                    :key="record.re_status"
                    :color="record.re_status === '驳回申请' ? 'volcano' : record.re_status === '待审批' ? 'geekblue' : 'green'"
                    >
                      {{ record.re_status }}
                    </a-tag>
                  </span>
                </template>
                <template v-if="column.key === 'operation'">
                  <a-popconfirm title="确认删除这条数据？"
                  ok-text="确认"
                  cancel-text="取消"
                  @confirm="confirmDeleteRelieveApply(record)"
                  >
                    <a-button type="primary" danger ghost>删除</a-button>
                  </a-popconfirm>
                </template>
              </template>
            </a-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane
        class="tab-pane1"
        key="2"
        tab="离职申请"
        >
          <a-card class="dimission">
            <a-form
            :model="dimission"
            name="离职"
            >
              <a-form-item name="e_id" label="员工工号">
                <a-input-number disabled :value="user?.e_id"/>
              </a-form-item>
              <a-form-item name="e_name" label="员工姓名">
                <a-input-number disabled :value="user?.name"/>
              </a-form-item>
              <a-form-item name="e_section" label="当前所属部门">
                <a-select style="width: 130px;" disabled :value="user?.e_section"/>
              </a-form-item>
              <a-form-item name="e_grade" label="当前职位">
                <a-select style="width: 130px;" disabled :value="user?.e_grade"/>
              </a-form-item>
              <a-form-item name="e_phone" label="联系方式">
                <a-input style="width: 256px;" v-model:value="dimission.e_phone"/>
              </a-form-item>
              <a-form-item name="e_identification" label="身份证信息">
                <a-input style="width: 240px;" v-model:value="dimission.e_identification"/>
              </a-form-item>
              <a-form-item name="di_reason" label="离职原因">
                <a-textarea style="width: 252px;" v-model:value="dimission.di_reason"/>
              </a-form-item>
              <a-form-item name="remark" label="备注">
                <a-textarea style="width: 278px;" v-model:value="dimission.remark"/>
              </a-form-item>
            </a-form>
            <a-button
            type="primary"
            style="width: 100px;margin-left: 60px"
            @click="handleDimission"
            :loading="confirmLoading"
            :disabled="dimissionList?.length !== 0"
            >
              提交
            </a-button>
          </a-card>
          <a-card
          title="离职申请详情表"
          style="margin-top: 5px"
          >
            <a-table
            bordered
            :scroll="{ x: 1500, y: 'auto' }"
            :columns="di_columns"
            :data-source="dimissionList"
            :pagination="false"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'di_status'">
                  <span>
                    <a-tag
                    :key="record.di_status"
                    :color="record.di_status === '驳回申请' ? 'volcano' : record.di_status === '待审批' ? 'geekblue' : 'green'"
                    >
                      {{ record.di_status }}
                    </a-tag>
                  </span>
                </template>
                <template v-if="column.key === 'operation'">
                  <a-popconfirm title="确认删除这条数据？"
                  ok-text="确认"
                  cancel-text="取消"
                  @confirm="confirmDeleteDimissionApply(record)"
                  >
                    <a-button type="primary" danger ghost>删除</a-button>
                  </a-popconfirm>
                </template>
              </template>
            </a-table>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs';
import {
  relieveApply,
  getRelieveApplyById,
  deleteRelieveApply,
  dimissionApply,
  getDimissionApplyById,
  deleteDimissionApply
} from '../../../utils/api.ts';
import { message } from 'ant-design-vue';

const user = JSON.parse(localStorage.getItem('user')!);

const activeKey = ref('1');

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

const relieve = ref()
const dimission:any = ref({
  e_phone: undefined,
  e_identification: undefined,
  di_reason: '',
  remark: ''
})

// 调动部门职位选择框联动
// const employeeSection:any = ref(employeeSectionData[0])
// const employeeGrade:any = ref(employeegradeData[employeeSection.value][0])
const re_section:any = ref(user?.e_section);
const re_grade:any = ref(user?.e_grade)
const emGrade = computed(() => {
  return employeegradeData[re_section.value];
});
let isFirstChange = true;
watch(re_section, (val:any) => {
  if (!isFirstChange) {
    re_grade.value = employeegradeData[val][0];
  } else {
    isFirstChange = false;
  }
}, { immediate: true });

const relieveList = ref()
const dimissionList = ref()
const confirmLoading = ref(false)

const getRelieveApply = async () => {
  const { data } = await getRelieveApplyById(user?.e_id)
  data.forEach((item:any) => {
    item.re_time = dayjs(item.re_time).format('YYYY-MM-DD hh:mm:ss')
  })
  relieveList.value = data
}
getRelieveApply()
const getDimissionApply = async () => {
  const { data } = await getDimissionApplyById(user?.e_id)
  data.forEach((item:any) => {
    item.di_time = dayjs(item.di_time).format('YYYY-MM-DD hh:mm:ss')
  })
  dimissionList.value = data
}
getDimissionApply()

const re_columns = [
  { title: '员工工号', dataIndex: 'e_id', key: 'e_id', fixed: 'left', width: 50, align: 'center' },
  { title: '姓名', dataIndex: 'name', key: 'name', fixed: 'left', width: 40, align: 'center'},
  { title: '所属部门', dataIndex: 'e_section', key: 'e_section', width: 100, align: 'center'},
  { title: '职位', dataIndex: 'e_grade', key: 'e_grade', width: 100, align: 'center'},
  { title: '申请调换部门', dataIndex: 're_section', key: 're_section', width: 100, align: 'center'},
  { title: '申请职位', dataIndex: 're_grade', key: 're_grade', width: 100, align: 'center'},
  { title: '申请时间', dataIndex: 're_time', key: 're_time', width: 100, align: 'center' },
  { title: '申请状态', dataIndex: 're_status', key: 're_status', width: 80, fixed: 'right', align: 'center' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 80,
  }
]
const di_columns = [
  { title: '员工工号', dataIndex: 'e_id', key: 'e_id', fixed: 'left', width: 60, align: 'center' },
  { title: '姓名', dataIndex: 'name', key: 'name', fixed: 'left', width: 40, align: 'center'},
  { title: '所属部门', dataIndex: 'e_section', key: 'e_section', width: 80, align: 'center'},
  { title: '职位', dataIndex: 'e_grade', key: 'e_grade', width: 80, align: 'center'},
  { title: '联系方式', dataIndex: 'e_phone', key: 'e_phone', width: 80, align: 'center'},
  { title: '身份证信息', dataIndex: 'e_identification', key: 'e_identification', width: 100, align: 'center'},
  { title: '离职理由', dataIndex: 'di_reason', key: 'di_reason', width: 120, align: 'center'},
  { title: '备注', dataIndex: 'remark', key: 'remark', width: 100, align: 'center'},
  { title: '申请时间', dataIndex: 'di_time', key: 'di_time', width: 100, align: 'center' },
  { title: '申请状态', dataIndex: 'di_status', key: 'di_status', width: 80, fixed: 'right', align: 'center' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 80,
  }
]


const handleRelieve = async () => {
  let field = {
    e_id: user?.e_id,
    name: user?.name,
    e_section: user?.e_section,
    e_grade: user?.e_grade,
    re_section: re_section.value,
    re_grade: re_grade.value,
    re_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    re_status: '待审批',
  }
  const { data } = await relieveApply(field)
  confirmLoading.value = true
  if (data.msg === 'success') {
    setTimeout(()=>{
      confirmLoading.value = false
      message.success('提交成功')
      getRelieveApply()
    },500)
  } else {
    confirmLoading.value = false
    message.error('提交失败')
  }
}

const confirmDeleteRelieveApply = async (record: any) => {
  const { data } = await deleteRelieveApply(record.id)
  if (data.msg === 'success') {
    setTimeout(()=>{
      message.success('删除记录成功')
      getRelieveApply()
    },500)
  } else {
    message.error('删除记录失败')
  }
}

const handleDimission = async () => {
  if(dimission.value.e_phone === user?.e_phone && dimission.value.e_identification === user?.e_identification){
    let field = {
      ...dimission.value,
      e_id: user?.e_id,
      name: user?.name,
      e_section: user?.e_section,
      e_grade: user?.e_grade,
      di_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      di_status: '待审批',
    }
    const { data } = await dimissionApply(field)
    confirmLoading.value = true
    if (data.msg === 'success') {
      setTimeout(()=>{
        confirmLoading.value = false
        message.success('提交成功')
        getDimissionApply()
      },500)
    } else {
      confirmLoading.value = false
      message.error('提交失败')
    }
  } else {
    message.error('联系方式或身份信息不符，请确认后再次提交！')
  }
}

const confirmDeleteDimissionApply = async (record: any) => {
  const { data } = await deleteDimissionApply(record.id)
  if (data.msg === 'success') {
    setTimeout(()=>{
      message.success('删除记录成功')
      getDimissionApply()
    },500)
  } else {
    message.error('删除记录失败')
  }
}

</script>

<style scoped>
.container {
  padding: 30px;
}
</style>