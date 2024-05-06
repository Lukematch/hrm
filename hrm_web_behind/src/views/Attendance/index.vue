<template>
  <div class="container">
    <a-row>
      <a-date-picker
      style="width: 200px;margin: 0 10px 10px 0"
      v-model:value="selectedDate" picker="month"
      placeholder="请选择月份"
      @change="handleDateChange"
      />
    </a-row>
    <a-row>
      <a-card class="card1" title="月度部门考勤 签到签退率">
        <div id="charts1" style="width: 100%;height: 300px;"></div>
      </a-card>
    </a-row>
    <a-row>
      <a-card
      class="card2"
      title="请假审批">
      <a-table
      bordered
      :columns="columns"
      :dataSource="leaveList"
      :scroll="{ x: 1800, y: 800 }"
      :pagination="{ pageSize: 5}"
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
            <a-popconfirm title="确认通过该请假申请？"
            ok-text="确认"
            cancel-text="取消"
            :confirm-loading="confirmLoading"
            @confirm="confirmPassLeave(record)"
            >
              <a-button :disabled="record.leave_status === '通过申请' || record.leave_status === '驳回申请'" type="primary" style="margin-right: 5px;">通过</a-button>
            </a-popconfirm>
            <a-popconfirm title="确认驳回该请假申请？"
            ok-text="确认"
            cancel-text="取消"
            :confirm-loading="confirmLoading"
            @confirm="confirmRejectLeave(record)"
            >
              <a-button :disabled="record.leave_status === '通过申请' || record.leave_status === '驳回申请'" style="margin-right: 5px;">驳回</a-button>
            </a-popconfirm>
            <a-popconfirm title="确认删除该请假申请？"
            ok-text="确认"
            cancel-text="取消"
            :confirm-loading="confirmLoading"
            @confirm="confirmDeleteLeaveList(record)"
            >
              <a-button type="primary" danger ghost>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
      </a-card>
    </a-row>
  </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';
import {
  getAttendanceByMonth,
  getEmployees,
  getLeaveList,
  updateLeaveList,
  deleteLeaveList
} from '../../utils/api.ts';
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

const selectedDate = ref()
const chartLoading = ref(false)
const departments = ref(['业务部', '开发部', '运维部', '生产部', '测试部', '财务部', '人力资源部', '行政部', '市场部']);
// 模拟签到率数据
const signInRates:any = ref([]);
// 模拟签退率数据
const signOutRates:any = ref([]);

const confirmLoading = ref(false)
const leaveList:any = ref([]);

// 获取请假申请数据
const getLeaveLists = async () => {
  const { data }:any = await getLeaveList();
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
  { title: '请假申请状态', dataIndex: 'leave_status', key: 'leave_status', width: 90, align: 'center', fixed: 'right' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 180,
  },
]
// 监听 leaveList 的变化，重新生成过滤器
watch(leaveList, (newValue) => {
  columns[1].filters = newValue.map((item:any) => ({
    text: item.name,
    value: item.name
  }));
});

onMounted(() => {
  initChart();
});

// 获取考勤记录
const fetchAttendanceData = async () => {
  let date = selectedDate.value;
  date = date.format('YYYY-MM');
  chartLoading.value = true;
  // 调用后端接口获取对应日期的考勤记录
  await getAttendanceByMonth(date)
    .then(response => {
      makeAttendanceData(response.data);
    })
    .catch(error => {
      message.error(`获取考勤记录失败:${error}`);
    })
    .finally(() => {
      chartLoading.value = false;
    });
}
fetchAttendanceData()
// 基础配置 Echarts
const initChart = () => {
  let chart = echarts.init(document.getElementById("charts1"));
  chart.setOption({
    tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['签到率', '签退率'],
        top: 'bottom'
      },
      xAxis: {
        type: 'category',
        data: departments.value,
        axisLabel: {
          interval: 0,
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} %'
        }
      },
      series: [
        {
          name: '签到率',
          type: 'line',
          data: signInRates.value,
          smooth: true
        },
        {
          name: '签退率',
          type: 'line',
          data: signOutRates.value,
          smooth: true
        }
      ]
  });
  window.onresize = function() {
    chart.resize();
  };
}
// 处理考勤记录数据
const makeAttendanceData = async (attendanceData:any) => {
  // 初始化部门签到次数和签退次数的映射对象
  const signInCounts:any = {};
  const signOutCounts:any = {};

  // 获取所有员工数据
  const { data } = await getEmployees();
  // 根据部门进行人数统计
  // 存储每个部门的员工数量
  const departmentEmployees:any = {};
  data.forEach((employee:any) => {
    const department = employee.e_section;
    // 如果该部门不存在，初始化为1；否则，加1
    if (!departmentEmployees[department]) {
      departmentEmployees[department] = 1;
    } else {
      departmentEmployees[department]++;
    }
  });

  // 统计每个部门的签到次数和签退次数
  attendanceData.forEach((record:any) => {
    const section = record.e_section;
    if (!signInCounts[section]) {
      signInCounts[section] = 0;
    }
    if (!signOutCounts[section]) {
      signOutCounts[section] = 0;
    }
    if (record.attendance_status === '签到') {
      signInCounts[section]++;
    } else if (record.attendance_status === '签退') {
      signOutCounts[section]++;
    }
  });
  // 计算签到率和签退率
  // 获取所有部门
  // departments.value = Object.keys(signInCounts);
  departments.value.forEach(department => {
    // 假设每月20天满勤
    const fullAttendanceDays = departmentEmployees[department] * 20;
    // 计算签到率和签退率
    const signInRate = signInCounts[department] / fullAttendanceDays;
    const signOutRate = signOutCounts[department] / fullAttendanceDays;
    signInRates.value.push(signInRate);
    signOutRates.value.push(signOutRate);
  });

  // 创建图表
  initChart();
}
// 处理日期变化事件
const handleDateChange = (value:any) => {
  selectedDate.value = value; // 更新选中的日期
  fetchAttendanceData(); // 日期变化时重新获取对应日期的考勤数据
}

// 通过请假申请
const confirmPassLeave = async (record: any) => {
  confirmLoading.value = true
  let pass = {
    leave_status: '通过申请'
  }
  const data = await updateLeaveList(record.e_id, pass)
  setTimeout(()=>{
    confirmLoading.value = false
    getLeaveLists()
    if(data.data.msg === 'success'){
      message.success('通过成功')
    } else {
      message.error('通过失败')
    }
  }, 500)
}
// 驳回请假申请
const confirmRejectLeave = async (record: any) => {
  confirmLoading.value = true
  let pass = {
    leave_status: '驳回申请'
  }
  const data = await updateLeaveList(record.e_id, pass)
  setTimeout(()=>{
    confirmLoading.value = false
    getLeaveLists()
    if(data.data.msg === 'success'){
      message.success('驳回成功')
    } else {
      message.error('驳回失败')
    }
  }, 500)
}
// 删除请假记录
const confirmDeleteLeaveList  = async (record: any) => {
  confirmLoading.value = true
  const data:any = await deleteLeaveList(record.e_id)
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
.container{
  margin: 10px 20px 20px 20px;
  .card1{
    margin-bottom: 10px;
    height: 400px;
    width: 100%;
  }
  .card2{
    width: 100%;
  }
  .table{
    width: 100%;
    height: 240px;
  }
}

</style>