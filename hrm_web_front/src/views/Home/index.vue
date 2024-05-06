<template>
  <main class="main">
  <page-header-wrapper>
  <a-card>
    <div class="card1">
    <a-row>
      <a-col :span="4" class="card-head-up-left">
        <a-avatar shape="square" fit="fill" src="/微信图片_20230728103352.jpg":size="120" alt="今天又是美好的一天！"></a-avatar>
      </a-col>
      <a-col :span="5" class="card-head-up-middle">
        <span>欢迎 {{ user?.name }} 登录前台！</span>
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
    </div>
  </a-card>
  </page-header-wrapper>
  <page-body-warapper class="page-body">
  <a-row class="container">
      <a-card  class="card2">
      <h3 slot="header">公告</h3>
      <div class="fbs" style="height: 200px; width: 100%;">
       <a-list
       :grid="{ gutter: 10, column: 1 }"
       :data-source="notices"
       :pagination="pagination"
       >
        <template #renderItem="{ item }">
          <a-list-item>
            {{ item.time }}
            <a-card
            hoverable
            :title="item.title"
            @click="onNotice(item)"
            >
              {{ item.content }}
            </a-card>
          </a-list-item>
          <a-modal
          v-model:visible="noticeVisible"
          title="公告详情"
          footer=""
          style="width: 80%;height: auto;"
          >
          <a-descriptions
          :title="noticeList.title"
          bordered
          :column="1"
          >
            <a-descriptions-item label="发布时间">{{ noticeList.time }}</a-descriptions-item>
            <a-descriptions-item label="发布人">{{ noticeList.sender }}</a-descriptions-item>
            <a-descriptions-item label="通告类型">{{ noticeList.topic }}</a-descriptions-item>
            <a-descriptions-item label="内容">{{ noticeList.content }}</a-descriptions-item>
            <a-descriptions-item label="备注">{{ noticeList.note }}</a-descriptions-item>
          </a-descriptions>
          </a-modal>
        </template>
      </a-list>
      </div>
    </a-card>
  </a-row>
  <a-row class="container">
    <!-- <Jobs /> -->
  </a-row>
  </page-body-warapper>
  </main>
  <a-back-top />
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
// import Jobs from '@/components/Jobs/index.vue'
import { Employee } from '@/types/eployee.ts';
import { getNotices } from '../../utils/api.ts';

// interface DataItem {
//   title: string;
//   description?: string;
// }
// notice list 控件
const notices: any = ref([]);
const noticeList: any = ref([]);
const noticeVisible = ref(false)
const pagination = {
  // onChange: (page: number) => {
  //   console.log(page);
  // },
  pageSize: 2,
};


const getNoticeList = async () => {
  const { data } = await getNotices()
  // console.log(data);
  // 转换datetime类型 UTC到本地时区
  let i;
  for(i = 0;i<data.length;i++){
    const localSendTime = new Date(data[i].send_time);
    data[i].send_time = localSendTime.toLocaleString()
  }
  // console.log(data);
  data.map((item:any) => {
    notices.value.push({
      title: `Notice ${item.notice_id}：${item.notice_title}`,
      time: `${item.send_time}`,
      sender: `${item.sender}`,
      topic: `${item.notice_topic}`,
      content: `${item.content}`,
      note: `${item.note}`,
    })
  })
  // console.log(notices);
}
getNoticeList()

const onNotice = (item:any) => {
  // console.log(item);
  noticeList.value = item
  noticeVisible.value = true
}


// 当前时间 卡片
const nowDate = ref("")
const nowTime = ref("")
const nowWeek = ref("")

// const user = <Employee>ref({});

const userJson = localStorage.getItem('user');
const user:Employee = JSON.parse(userJson!);

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
}
onMounted(() => {
  setInterval(getTime, 500);
 })
</script>

<style scoped>
.main {
  height: 100%;
  padding: 5px;
  .card1{
    margin: 5px 50px 5px 50px;
  .card-head-up-left {
    margin-left: 30px;
    display: flex;
    align-items: center;
  }
  .card-foot-down-left {
    margin-left: 30px;
  }
  span {
    font-size: 13px;
    font-weight: 300;
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
}
  .container {
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
  .card2 {
    /* margin: 10px; */
    padding: 5px;
    width: 90%;
    height: 480px;
  }
}
</style>