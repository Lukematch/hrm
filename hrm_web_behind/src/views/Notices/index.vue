<template>
  <main class="main">
    <page-header-wrapper>
    <a-card class="carad1">
    <a-row>
      <a-col :span="4" class="card-head-up-left">
        <a-avatar shape="square" fit="fill" src="/hrm.png" :size="120" alt="今天又是美好的一天！"></a-avatar>
      </a-col>
      <a-col :span="6" class="card-head-up-middle">
        <span>欢迎 {{ superUser?.name }} 登录后台！</span>
      </a-col>
      <a-col :span="10" class="card-head-up-right">
        <a-card hoverable class="weather-box">
          <div class="box">
            <div class="box-left">
              <span class="city">长沙市</span>
              <div class="time">
                <div class="left">
                  <div class="times">{{ nowTime }}</div>
                </div>
                <div class="right">
                  <div class="week">{{ nowWeek }}</div>
                  <div class="date">{{ nowDate }}</div>
                </div>
              </div>
            </div>
            <div class="box-right">
              <!-- <img src="../assets/多云.png" alt="weatherImg"> -->
              <span class="weather">多云</span>
              <span class="temperature">12°</span>
            </div>
            <div class="climate-box">
              <a href="http://www.weather.com.cn/weather1d/101250101.shtml#input" class="more" target="__blank">查看详情</a>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-rol :span="12" class="card-foot-down-left">
        <span>今天又是美好的一天！</span>
      </a-rol>
      <a-rol :span="12" class="card-foot-down-right">
      </a-rol>
    </a-row>
  </a-card>
  </page-header-wrapper>
  <page-body-warapper class="page-body">
  <a-row class="container">
    <a-card  class="card2">
      <a-button slot="header" style="margin-bottom: 10px;"
      @click="createNotice"
      >新建公告</a-button>
      <a-modal
      title="新建公告"
      v-model:visible="noticeVisible"
      @Ok="onOk"
      @onCancel="()=>{
        noticeVisible = false
      }"
      :confirm-loading="confirmLoading"
      okText="确认"
      cancelText="取消"
      width="600px"
      >
        <a-form
        :model="noticeFormState"
        :label-col="{ span: 5 }"
        >
          <a-form-item label="公告标题">
            <a-input v-model:value="noticeFormState.notice_title" />
          </a-form-item>
          <a-form-item label="公告主题">
            <a-select v-model:value="noticeFormState.notice_topic" placeholder="请选择" :options="noticeTopic"/>
          </a-form-item>
          <a-form-item label="公告内容">
            <a-textarea v-model:value="noticeFormState.content" />
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea v-model:value="noticeFormState.note" />
          </a-form-item>
          <a-form-item label="发送人">
            <a-input v-model:value="noticeFormState.sender" />
          </a-form-item>
        </a-form>
      </a-modal>
      <div class="fbs" style="height: auto; width: 100%;">
        <a-table
        class="table"
        bordered
        style="height: auto; width: 100%;"
        :scroll="{ x: 1500, y: 400 }"
        :columns="noticeColumns"
        :dataSource="noticeList"
        :pagination="{ pageSize: 3 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
              <a-button type="primary" style="margin-right: 5px;"
              @click="editNotices(record)">编辑</a-button>
              <a-popconfirm title="确认删除这条数据？"
              ok-text="确认"
              cancel-text="取消"
              @confirm="confirmDeleteNotice(record.notice_id)"
              >
                <a-button type="primary" danger ghost>删除</a-button>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
        <a-modal
        title="修改公告"
        v-model:visible="editNoticeVisible"
        @Ok="editNoticeOk"
        @onCancel="()=>{
          editNoticeVisible = false
        }"
        :confirm-loading="confirmLoading"
        okText="确认"
        cancelText="取消"
        width="600px"
        >
          <a-form
          :label-col="{ span: 5 }"
          :form="newNoticeFormState"
          :initialValues="editNotice"
          >
            <a-form-item label="公告编号">
              <a-input-number disabled v-model:value="newNoticeFormState.notice_id"/>
            </a-form-item>
            <a-form-item label="公告标题">
              <a-input disabled v-model:value="newNoticeFormState.notice_title" />
            </a-form-item>
            <a-form-item label="公告主题">
              <a-select disabled v-model:value="newNoticeFormState.notice_topic" placeholder="请选择" :options="noticeTopic"/>
            </a-form-item>
            <a-form-item label="公告内容">
              <a-textarea v-model:value="newNoticeFormState.content" />
            </a-form-item>
            <a-form-item label="备注">
              <a-textarea v-model:value="newNoticeFormState.note" />
            </a-form-item>
            <a-form-item label="发送人">
              <a-input v-model:value="newNoticeFormState.sender" />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
      <div class="fbs" style="height: 200px; width: 100%;">
      </div>
    </a-card>
  </a-row>
  <!-- <a-row class="container">
      <a-card class="card3-1">
        <h4 slot="header">饼图 各部门员工数量比例</h4>
        <div class="fbs" style="height: 200px; width: 100%;"></div>
      </a-card>
      <a-card hoverable class="card3-2">
        <h4 slot="header">柱状图 一个月各部门完成的工作项数量</h4>
        <div class="fbs" style="height: 200px; width: 100%;">
          <span>click card -> Modal 饼图 各部门已完成/该完成 比例 + Descriptions描述列表（已完成项目名+未完成项目名  包含简述）</span>
        </div>
      </a-card>
  </a-row>
  <a-row class="container">

  </a-row> -->
  </page-body-warapper>
  </main>
  <a-back-top />
</template>

<script setup lang='ts'>
import { ref, onMounted, watch } from 'vue'
import { getNotices } from '../../utils/api.ts';
// import { notice } from './type';
import { SelectProps, message } from 'ant-design-vue';
import {
  createOneNotice,
  updateOneNotice,
  deleteOneNotice
} from '../../utils/api.ts';


const superUserJson:any = localStorage.getItem("superUser")
const superUser = JSON.parse(superUserJson)

const nowDate = ref("")
const nowTime = ref("")
const nowWeek = ref("")
const send_time = ref("")

const noticeVisible = ref(false)
const confirmLoading = ref(false)
const editNoticeVisible = ref(false)


const noticeList = ref([])

const noticeFormState:any = ref({
  notcie_id: '',
  notice_title: '',
  notice_topic: '',
  content: '',
  note: '',
  send_time: '',
  sender: ''
})
const newNoticeFormState:any = ref({})
const editNotice:any = ref({})

const noticeTopic = ref<SelectProps['options']>([
  { value: '节假日', label: '节假日' },
  { value: '公司内部事项', label: '公司内部事项' },
  { value: '会议记录', label: '会议记录' },
  { value: '财务报告', label: '财务报告' },
  { value: '部门变更', label: '部门变更' },
  { value: '岗位变更', label: '岗位变更' },
  { value: '薪资调整', label: '薪资调整' },
  { value: '风险提示', label: '风险提示' }
])
const getNoticeList = async () => {
  const { data } = await getNotices()
  // console.log(data);
  // 转换datetime类型 UTC到本地时区
  let i;
  for(i = 0;i<data.length;i++){
    const localSendTime = new Date(data[i].send_time);
    data[i].send_time = localSendTime.toLocaleString()
  }
  noticeList.value = data
}
getNoticeList()

const noticeColumns = [
  { title: '编号', dataIndex: 'notice_id', key: 'notice_id', fixed: 'left', width: 40, align: 'center' },
  { title: '标题', dataIndex: 'notice_title', key: 'notice_title', fixed: 'left', width: 100, align: 'center',
    filters: [],
    filterSearch: true,
    onFilter: (value:string, record:any) => record.notice_title.indexOf(value) === 0
  },
  { title: '主题', dataIndex: 'notice_topic', key: 'notice_topic', width: 80, align: 'center',
    filters: [
      { text: '节假日', value: '节假日' },
      { text: '公司内部事项', value: '公司内部事项' },
      { text: '会议记录', value: '会议记录' },
      { text: '财务报告', value: '财务报告' },
      { text: '部门变更', value: '部门变更' },
      { text: '岗位变更', value: '岗位变更' },
      { text: '薪资调整', value: '薪资调整' },
      { text: '风险提示', value: '风险提示' }
    ],
    onFilter: (value:string, record:any) => record.notice_topic.indexOf(value) === 0
  },
  { title: '内容', dataIndex: 'content', key: 'content', width: 150, align: 'center' },
  { title: '备注', dataIndex: 'note', key: 'note', width: 150, align: 'center' },
  { title: '发送时间', dataIndex: 'send_time', key: 'send_time', width: 150, align: 'center' },
  { title: '发送人', dataIndex: 'sender', key: 'sender', width: 80, align: 'center' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 95,
    align: 'center',
    customCell: ({ record }: { record: any; }) =>{return record}
  }
]
watch(noticeList, (newValue:any) => {
  noticeColumns[1].filters = newValue.map((item:any) => ({
    text: item.notice_title,
    value: item.notice_title,
  }));
});

const createNotice = () => {
  noticeVisible.value = true
}
const editNotices = (record:any) => {
  // console.log(record);
  editNotice.value = { ...record }; // 保存当前编辑行的数据
  newNoticeFormState.value = { ...record }; // 将编辑行的数据复制给表单的默认值
  editNoticeVisible.value = true
}
const onOk = async () => {
  confirmLoading.value = true
  setTimeout(()=>{
    noticeVisible.value = false
    confirmLoading.value = false
  }, 2000)
  // 将send_time设置到noticeFormState中
  noticeFormState.value.send_time = send_time.value
  // console.log(noticeFormState.value);
  await createOneNotice(noticeFormState.value)
  getNoticeList()
}
const editNoticeOk = async () => {
  confirmLoading.value = true
  setTimeout(()=>{
    editNoticeVisible.value = false
    confirmLoading.value = false
  }, 2000)
  // console.log(newNoticeFormState.value);
  await updateOneNotice(newNoticeFormState.value)
  getNoticeList()
}
const confirmDeleteNotice = async (id:any) => {
  await deleteOneNotice(id)
  message.success(`公告 ${id} 删除成功`)
  setTimeout(()=>{
    getNoticeList()
  },1000)
}


function getTime() {
  let yy = new Date().getFullYear();
  let mm = new Date().getMonth() + 1;
  let dd = new Date().getDate();
  let week = new Date().getDay();
  let hh = new Date().getHours();
  let mf =
    new Date().getMinutes() < 10 ?
    "0" + new Date().getMinutes() :
    new Date().getMinutes();
  let ss =
    new Date().getSeconds() < 10 ?
    "0" + new Date().getSeconds() :
    new Date().getSeconds();
  if (week == 1) {
    nowWeek.value = "周一";
  } else if (week == 2) {
    nowWeek.value = "周二";
  } else if (week == 3) {
    nowWeek.value = "周三";
  } else if (week == 4) {
    nowWeek.value = "周四";
  } else if (week == 5) {
    nowWeek.value = "周五";
  } else if (week == 6) {
    nowWeek.value = "周六";
  } else {
    nowWeek.value = "周日";
  }
  nowTime.value = hh + ":" + mf;
  nowDate.value = yy + "-" + mm + "-" + dd;
  send_time.value = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
}
onMounted(() => {
  setInterval(getTime, 500);
 })

</script>

<style scoped>
.main {
  height: 100%;
  padding: 5px;
  .card-head-up-left {
    display: flex;
    align-items: center;
    margin-left: 50px;
  }
  span {
    font-size: 13px;
    font-weight: 300;
  }
  .card-foot-down-left {
    margin-left: 50px;
  }
  .card-head-up-middle {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-left: 20px;
    span{
      font-size: 20px;
    }
  }
  .card-head-up-right {
    text-align: right;
    .box{
      @media screen and (min-width: 1000px){
        .box-left{
          flex: left;
          margin: -20px 10px 0 0;
          .city{
            /* display: flex; */
            float: left;
            margin: -25px 0 10px -15px;
            border-bottom: 2px solid;
          }
          .time{
            display: flex;
            margin: 30px 0px -60px -50px;
            .left{
              .times{
                font-size: 30px;
                margin: 10px -80px;
                /* margin-right: 60px; */
              }
            }
            .right{
              margin: 13px 0 0 48px;
              .week{
                margin-right: 20px;
                font-size: 13px;
                font-weight: 300;
              }
              .date{
                margin-left: 40px;
                font-size: 15px;
                font-weight: 300;
              }
            }
          }
        }
      }
      @media screen and (max-width: 1000px){
        .box-left{
          flex: left;
          margin: -20px 10px 0 0;
          .city{
            /* display: flex; */
            float: left;
            margin: -25px 0 10px -15px;
            border-bottom: 2px solid;
          }
          .time{
            display: flex;
            margin: 30px 0px -60px -50px;
            .left{
              .times{
                /* display: block; */
                font-size: 30px;
                margin: 10px -40px;
              }
            }
            .right{
              margin: 13px 0 0 48px;
              .week{
                margin-right: 20px;
                font-size: 13px;
                font-weight: 300;
              }
              .date{
                font-size: 15px;
                font-weight: 300;
              }
            }
          }
        }
      }
      .box-right{
        display: right;
        img {
          margin-bottom: 20px;
        }
        .temperature {
          font-size:38px;
        }
        .weather {
          /* margin-right: 100px; */
          margin-top: 20px;
          float: right;
          font-size: 16px;
        }
      }
      .climate-box{
        .more {
          float: right;
          padding: 0;
          text-decoration:none;
          color: rgb(22,200,200);
        }
        .more:hover{
          color: orange;
        }
      }
      }
  }
  .container {
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
  .card2 {
    /* margin: 10px; */
    padding: 5px;
    width: 92%;
    height: 520px;
    .fbs {
      .table {
        width: auto;
        height: auto;
      }
    }
  }
  .card3-1 {
    margin: 10px;
    height: 350px;
    width: 45%;
  }
  .card3-2 {
    margin: 10px;
    height: 350px;
    width: 45%;
  }
}
</style>