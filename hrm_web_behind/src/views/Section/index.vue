import { Column } from 'typeorm';
import { getSections, createOneSection } from '../../utils/api';
<template>
  <div class="container">
    <a-card title="部门管理" class="card">
      <a-button slot="header" style="margin-bottom: 10px;"
      @click="createSection"
      >新建部门</a-button>
      <a-modal
      title="新建部门"
      v-model:visible="sectionVisible"
      @Ok="onOk"
      @onCancel="()=>{
        sectionVisible = false
      }"
      :confirm-loading="confirmLoading"
      okText="确认"
      cancelText="取消"
      width="600px"
      >
        <a-form
        :model="sectionFormState"
        :label-col="{ span: 5 }"
        >
          <a-form-item label="部门代号">
            <a-input v-model:value="sectionFormState.section_id" />
          </a-form-item>
          <a-form-item label="部门名称">
            <a-input v-model:value="sectionFormState.section_name" />
          </a-form-item>
          <a-form-item label="部门描述">
            <a-textarea v-model:value="sectionFormState.description" />
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea v-model:value="sectionFormState.note" />
          </a-form-item>
          <a-form-item label="部门负责人">
            <a-input v-model:value="sectionFormState.departer" />
          </a-form-item>
        </a-form>
      </a-modal>
      <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5 }"
      :scroll="{ x: 1550, y: 500 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <a-button type="primary" style="margin-right: 5px;"
            @click="editSections(record)">编辑</a-button>
            <a-popconfirm title="确认删除这条数据？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="confirmDeleteSection(record.section_id)"
            >
              <a-button type="primary" danger ghost>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
      <a-modal
      title="修改部门信息"
      v-model:visible="editSectionVisible"
      @Ok="editSectionOk"
      @onCancel="()=>{
        editSectionVisible = false
      }"
      :confirm-loading="confirmLoading"
      okText="确认"
      cancelText="取消"
      width="600px"
      >
        <a-form
        :model="newSectionFormState"
        :label-col="{ span: 5 }"
        :initialValues="editSection"
        >
          <a-form-item label="部门代号">
            <a-input v-model:value="newSectionFormState.section_id" />
          </a-form-item>
          <a-form-item label="部门名称">
            <a-input v-model:value="newSectionFormState.section_name" />
          </a-form-item>
          <a-form-item label="部门描述">
            <a-textarea v-model:value="newSectionFormState.description" />
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea v-model:value="newSectionFormState.note" />
          </a-form-item>
          <a-form-item label="部门负责人">
            <a-input v-model:value="newSectionFormState.departer" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import {
  getSections,
  createOneSection,
  updateOneSection,
  deleteSection
} from '../../utils/api.ts';
import { message } from 'ant-design-vue';


const dataSource = ref([])
const getSectionList = async () => {
  await getSections().then(res => {
    let i;
    for(i = 0;i<res.data.length;i++){
      const localSendTime = new Date(res.data[i].create_time);
      res.data[i].create_time = localSendTime.toLocaleString()
    }
    dataSource.value = res.data
  }).catch(err => {
    message.error(err)
  })
}

onMounted(() => {
  getSectionList()
})

const sectionVisible = ref(false)
const confirmLoading = ref(false)
const editSectionVisible = ref(false)
const sectionFormState:any = ref({
  section_id: '',
  section_name: '',
  create_time: '',
  description: '',
  departer: '',
  note: ''
})
const newSectionFormState:any = ref({})
const editSection:any = ref({})
const currentTimeString = ref()

const columns = [
  { title: '部门代号', dataIndex: 'section_id', key: 'section_id', fixed: 'left', width: 50, align: 'center' },
  { title: '部门名称', dataIndex: 'section_name', key: 'section_name', fixed: 'left', width: 60, align: 'center',
    filters: [],
    filterSearch: true,
    onFilter: (value:string, record:any) => record.section_name.indexOf(value) === 0
  },
  { title: '部门创建时间', dataIndex: 'create_time', key: 'create_time', width: 100, align: 'center' },
  { title: '部门描述', dataIndex: 'description', key: 'description', width: 200, align: 'center' },
  { title: '备注', dataIndex: 'note', key: 'note', width: 200, align: 'center' },
  { title: '部门负责人', dataIndex: 'departer', key: 'departer', width: 60, align: 'center', fixed: 'right',
    filterSearch:true,
    onFilter: (value:string, record:any) => record.departer.indexOf(value) === 0
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 80,
    align: 'center',
    customCell: ({ record }: { record: any; }) =>{return record}
  }
]
watch(dataSource, (newValue:any) => {
  columns[1].filters = newValue.map((data:any) => ({
    text: data.section_name,
    value: data.section_name,
  }));
});

const createSection = () => {
  sectionVisible.value = true
}
const editSections = (record:any) => {
  // console.log(record)
  editSection.value = { ...record }; // 保存当前编辑行的数据
  newSectionFormState.value = { ...record }; // 将编辑行的数据复制给表单的默认值
  editSectionVisible.value = true
}
// 新建部门
const onOk = async () => {
  // console.log(sectionFormState.value);
  confirmLoading.value = true
  sectionFormState.value.create_time = currentTimeString.value
  setTimeout(()=>{
    confirmLoading.value = false
    sectionVisible.value = false
    getSectionList()
  },1000)
  const data = await createOneSection(sectionFormState.value)
  if(data.data.msg === 'success'){
    message.success('新建部门成功')
  } else {
    message.error(data.data.msg)
  }
}
// 修改部门
const editSectionOk = async () => {
  // console.log(newSectionFormState.value);
  confirmLoading.value = true

  await updateOneSection(newSectionFormState.value)
  setTimeout(()=>{
    confirmLoading.value = false
    editSectionVisible.value = false
    getSectionList()
  },1000)
}

const confirmDeleteSection = async (section_id:string) => {
  // console.log(section_id)
  await deleteSection(section_id)
  message.success(`部门 ${section_id} 删除成功`)
  setTimeout(()=>{
    getSectionList()
  },1000)
}

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const date = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
// 当前时间
currentTimeString.value =  year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

</script>

<style scoped>
.card{
  margin: 5px 10px;
}
</style>