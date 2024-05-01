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
        tab="个人考勤"
        >
          <a-card class="info">
            <!-- <a-date-picker v-model:value="attendanceInfo.attendance_month" picker="month"/> -->
            <a-button :disabled="checkInDisabled" style="margin-right: 20px;"
            @click="handleCheckIn">签到</a-button>
            <a-button :disabled="checkOutDisabled"
            @click="handleCheckOut">签退</a-button>
            <a-calendar v-model:value="calendar"
            fullscreen="false"
            style="width:850px; height: auto;"
            >
              <template #dateCellRender="{ current }">
                <ul style="list-style: none;margin: 0;
                padding: 0;">
                  <li v-for="(item, index) in getDateCellData(current)"
                  :key="index">
                    <a-badge style="font-size: 5px;" :status="item.type" :text="item.content" />
                  </li>
                </ul>
              </template>
            </a-calendar>
          </a-card>
        </a-tab-pane>
        <a-tab-pane
        class="tab-pane1"
        key="2"
        tab="请假申请"
        >
        <a-card class="info">
          <a-button
          :disabled="leaveApplyDisabled"
          style="margin-bottom: 10px;"
          @click="attendanceApply"
          >
            新增请假申请
          </a-button>
          <a-modal
          title="请假申请"
          v-model:visible="attendanceVisible"
          @Ok="onOk"
          @onCancel="()=>{
            attendanceVisible = false
          }"
          :confirm-loading="confirmLoading"
          okText="确认"
          cancelText="取消"
          width="600px"
          >
            <a-card class="form">
              <a-form
              :model="leaveFormState"
              :label-col="{ span: 5 }"
              >
                <a-form-item name="e_id" label="工号">
                  <a-input-number disabled :value="employeeId" />
                </a-form-item>
                <a-form-item name="name" label="姓名">
                  <a-input disabled v-model:value="leaveFormState.name"></a-input>
                </a-form-item>
                <a-form-item name="e_phone" label="联系电话">
                  <a-input v-model:value="leaveFormState.e_phone"></a-input>
                </a-form-item>
                <a-form-item name="start_time" label="请假开始时间">
                  <a-date-picker v-model:value="leaveFormState.start_time" />
                </a-form-item>
                <a-form-item name="end_time" label="请假结束时间">
                  <a-date-picker v-model:value="leaveFormState.end_time" />
                </a-form-item>
                <a-form-item name="leave_day"  label="请假天数">
                  <a-input-number disabled v-model:value="leaveFormState.leave_day"></a-input-number>
                </a-form-item>
                <a-form-item name="leave_type" label="请假类型">
                  <a-select v-model:value="leaveFormState.leave_type" :options="options"></a-select>
                </a-form-item>
                <a-form-item name="leave_reason" label="请假理由">
                  <a-textarea v-model:value="leaveFormState.leave_reason"></a-textarea>
                </a-form-item>
              </a-form>
            </a-card>
          </a-modal>
          <a-table
          bordered
          :columns="columns"
          :dataSource="leaveList"
          :scroll="{ x: 1800, y: 800 }"
          :pagination="false"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'leave_status'">
                <span>
                  <a-tag
                    :key="record.leave_status"
                    :color="record.leave_status === '驳回申请' ? 'volcano' : record.leave_status === '待审批' ? 'geekblue' : 'green'"
                  >
                    {{ record.leave_status }}
                  </a-tag>
                </span>
              </template>
              <template v-if="column.key === 'operation'">
                <a-popconfirm title="确认删除请假申请？"
                ok-text="确认"
                cancel-text="取消"
                :confirm-loading="confirmLoading"
                @confirm="confirmDeleteLeaveList(record)"
                >
                  <a-button type="primary" danger ghost>删除申请</a-button>
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
import { h, ref, watch } from 'vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {
  getIdAttendance,
  getDateAttendance,
  employeeAttendance,
  createLeaveApply,
  getLeaveList,
  deleteLeaveApply
} from '../../utils/api.ts';
import { message, notification } from 'ant-design-vue';
import { SmileOutlined } from '@ant-design/icons-vue';


const activeKey = ref('1');

// 全局 签到签退按钮 变灰 控制
const checkInDisabled = ref(false);
const checkOutDisabled = ref(true);
// 全局 新增请假按钮 变灰 控制
const leaveApplyDisabled = ref(false);

const calendar = ref<Dayjs>();
const attendanceList = ref([])

const attendanceVisible = ref(false)
const confirmLoading = ref(false)

const userJson = localStorage.getItem('user');
const user = JSON.parse(userJson!);

const employeeId = ref()
const leaveList:any = ref([]);
const leaveFormState:any = ref({
  e_id: '',
  name: user.name,
  e_phone: '',
  start_time: '',
  end_time: '',
  leave_day: 0,
  leave_type: '',
  leave_reason: '',
  leave_time: '',
  leave_status: ''
})

// 获取个人考勤数据（日历）
const getIdAttendanceList = async () =>{
  const { data }:any = await getIdAttendance(user?.e_id);
  attendanceList.value = data
}
getIdAttendanceList();
// 获取请假申请数据
const getLeaveLists = async () => {
  const { data }:any = await getLeaveList(user?.e_id);
  let i;
  for(i = 0;i<data.length;i++){
    let start_time = dayjs(data[i].start_time).format('YYYY-MM-DD');
    let end_time = dayjs(data[i].end_time).format('YYYY-MM-DD');
    let leave_time = dayjs(data[i].leave_time).format('YYYY-MM-DD HH:mm:ss');
    data[i].start_time = start_time;
    data[i].end_time = end_time;
    data[i].leave_time = leave_time
  }
  leaveList.value = data
  if(leaveList.value.length > 0){
    leaveApplyDisabled.value = true
  } else {
    leaveApplyDisabled.value = false
  }
}
getLeaveLists();

const columns:any = [
  { title: '员工工号', dataIndex: 'e_id', key: 'e_id', fixed: 'left', width: 90, align: 'center' },
  { title: '姓名', dataIndex: 'name', key: 'name', fixed: 'left', width: 80, align: 'center',
    filters: [],
    filterSearch: true,
    onFilter: (value:string, record:any) => record.name.indexOf(value) === 0
  },
  { title: '联系方式', dataIndex: 'e_phone', key: 'e_phone', width: 120, align: 'center' },
  { title: '请假类型', dataIndex: 'leave_type', key: 'leave_type', width: 120, align: 'center' },
  { title: '请假开始时间', dataIndex: 'start_time', key: 'start_time', width: 120, align: 'center' },
  { title: '请假结束时间', dataIndex: 'end_time', key: 'end_time', width: 120, align: 'center' },
  { title: '请假天数', dataIndex: 'leave_day', key: 'leave_day', width: 120, align: 'center' },
  { title: '请假理由', dataIndex: 'leave_reason', key: 'leave_reason', width: 180, align: 'center' },
  { title: '请假申请提交时间', dataIndex: 'leave_time', key: 'leave_time', width: 120, align: 'center' },
  { title: '请假申请状态', dataIndex: 'leave_status', key: 'leave_status', width: 80, align: 'center', fixed: 'right' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 80,
  },
]
// 监听 leaveList 的变化，重新生成过滤器
watch(leaveList, (newValue) => {
  columns[1].filters = newValue.map((item:any) => ({
    text: item.name,
    value: item.name }));
});

let shouldIgnoreFirstChange = true;
watch(leaveFormState, (newValue) => {
  if(shouldIgnoreFirstChange){
    shouldIgnoreFirstChange = false
    return
  }
  leaveFormState.value.leave_day = dayjs(newValue.end_time).diff(dayjs(newValue.start_time), 'day') + 1
}, { deep: true })


const options = ref([
  {value: '事假', label: '事假'},
  {value: '病假', label: '病假'},
  {value: '年假', label: '年假'},
  {value: '调休', label: '调休'},
  {value: '婚假', label: '婚假'},
  {value: '产假', label: '产假'},
  {value: '丧假', label: '丧假'},
  {value: '工伤假', label: '工伤假'},
])

// 格式化日期和时间
const formatDate = (date:any) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const formatTime = (date:any) => {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const checkAttendanceExistence = async (e_id:any, date:any) => {
  try {
    const { data } = await getDateAttendance(e_id, date);

    if (data.length === 0) {
      return { existence: false, type: null }; // 当天不存在记录
    } else if (data.length === 1) {
      const type = data[0].attendance_status; // 获取记录的类型（签到或签退）
      return { existence: true, type };
    } else {
      // 当天存在签到和签退记录
      const types = data.map((record:any) => record.attendance_status);
      return { existence: true, types };
    }
  } catch (error) {
    console.error("查询考勤记录失败", error);
    return { existence: true, type: null }; // 查询失败，当作存在记录处理，但类型为空
  }
};
// 处理签到操作
const handleCheckIn = async () => {
  const currentTime = new Date();
  const date = formatDate(currentTime);

  // 检查是否存在签到记录
  const { existence, type, types } = await checkAttendanceExistence(user?.e_id,date);
  if (existence && type === '签到') {
    message.warning("今天已经完成签到，无法重复签到！");
    checkInDisabled.value = true; // 禁用签到按钮
    // 还没签退
    checkOutDisabled.value = false; // 激活签退按钮
    return;
  } else if(existence && types?.includes('签到') && types?.includes('签退')) {
    notification.open({
      message: '今天已经完成签到和签退',
      description:
        '祝您今日顺利！',
      icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
    });
    checkInDisabled.value = true; // 禁用签到按钮
    return;
  }
  // 定义签到数据
  const attendanceData = {
    e_id: user.e_id,
    name: user.name,
    e_section: user.e_section,
    attendance_time: formatTime(currentTime),
    attendance_date: date,
    attendance_status: "签到"
  };
  try {
    await employeeAttendance(attendanceData);
    checkInDisabled.value = true; // 禁用签到按钮
    setTimeout(()=>{
      message.success("签到成功！")
      checkOutDisabled.value = false; // 激活签退按钮
      getIdAttendanceList();
    },1000)
  } catch (error) {
    message.error(`签到失败,${error}`);
  }
};
// 处理签退操作
const handleCheckOut = async () => {
  const currentTime = new Date();
  const date = formatDate(currentTime);
  // 检查是否存在签到或签退记录
  const { existence, types } = await checkAttendanceExistence(user?.e_id, date);
  if (existence && types?.includes('签退')) {
    message.error("今天已经存在签退记录，无法重复签退！");
    return;
  }
  const attendanceData = {
    e_id: user.e_id,
    name: user.name,
    e_section: user.e_section,
    attendance_time: formatTime(currentTime),
    attendance_date: date,
    attendance_status: "签退"
  };

  try {
    await employeeAttendance(attendanceData);
    message.success("签退成功！")
    getIdAttendanceList();
    checkOutDisabled.value = true; // 禁用签退按钮
  } catch (error) {
    message.error(`签退失败,${error}`);
  }
};

const getDateCellData:any = (value: Dayjs) => {
  const matchedRecords = attendanceList.value.filter((item:any) => {
    const date = dayjs(item.attendance_date);
    return (
      value.year() === date.year() &&
      value.month() + 1 === date.month() + 1 &&
      value.date() === date.date()
    );
  });

  // 根据匹配的记录生成相应的数据
  return matchedRecords.map((item:any) => {
    // 将 time 字符串转换为 ISO 8601 格式的日期时间字符串
    const isoDateTime = `1970-01-01T${item.attendance_time}`;
    // 解析 ISO 8601 格式的日期时间字符串
    const parsedDateTime = dayjs(isoDateTime, 'YYYY-MM-DDTHH:mm:ss');
    // 确保解析后的日期时间对象有效
    if (!parsedDateTime.isValid()) {
      console.error("Invalid attendance_time:", item.attendance_time);
      return null;
    }
    // 格式化时间为只包含小时和分钟部分
    let time = parsedDateTime.format('HH:mm');
    if (item.attendance_status === '签到') {
      return {
        type: 'success',
        content: `${time} 签到`,
      };
    } else if (item.attendance_status === '签退') {
      return {
        type: 'processing',
        content: `${time} 签退`,
      };
    } else {
      return null;
    }
  }).filter(Boolean); // 过滤掉返回值为 null 的元素
};
// 点击新增
const attendanceApply = () =>{
  // 获取当前员工的e_id
  const e_id = user?.e_id
  // 赋值
  employeeId.value = Number(e_id)
  attendanceVisible.value = true
}
// 新增 请假申请
const onOk = async () => {
  confirmLoading.value = true
  let start_time = `${leaveFormState.value?.start_time.$y}-${leaveFormState.value?.start_time.$M+1}-${leaveFormState.value?.start_time.$D}`
  let end_time = `${leaveFormState.value?.end_time.$y}-${leaveFormState.value?.end_time.$M+1}-${leaveFormState.value?.end_time.$D}`
  let currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
  console.log(leaveFormState.value.start_time, leaveFormState.value.end_time);
  leaveFormState.value.leave_time = currentDateTime
  leaveFormState.value.leave_status = '待审批'
  leaveFormState.value.e_id = user.e_id
  let newLeaveFormState = {
    ...leaveFormState.value,
    start_time: start_time,
    end_time: end_time,
  }
  console.log(newLeaveFormState);
  const data:any = await createLeaveApply(newLeaveFormState)
  // console.log(data);
  setTimeout(()=>{
    if(data.message === 'success'){
      message.success('添加成功')
    } else {
      message.error('添加失败')
    }
    attendanceVisible.value = false
    confirmLoading.value = false
    getLeaveLists()
  }, 2000)
}
// 删除 请假申请
const confirmDeleteLeaveList = async (record:any) => {
  confirmLoading.value = true
  const data:any = await deleteLeaveApply(record.e_id)
  setTimeout(()=>{
    confirmLoading.value = false
    getLeaveLists()
    if(data.message === 'success'){
      message.success('删除成功')
    } else {
      message.error('删除失败')
    }
  }, 500)
}


</script>

<style scoped>
.container {
  padding: 30px;
  /* width: 100%;
  height: 100%; */
  .tab-pane1{
    /* text-align: center; */
    .info{
      padding: 5px;
    }
  }
  .tab-pane2{
    text-align: center;
    .info{
      padding: 5px;
      width: 80%;
    }
  }
}
</style>