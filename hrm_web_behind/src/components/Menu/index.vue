<template>
  <div class="menu-wrapper">
    <div class="menu-wrapper-top"
    @click="onNotices()">
      <img v-if="!collapsed" src="/hrm.png"/>
      <h1 v-if="!collapsed">HRM-B后台</h1>
      <img class="collapsed" v-else src="/hrm.png"/>
    </div>
    <a-menu
    class="a-menu-demo"
    forceSubMenuRender
    :selectedKeys="selectedKey"

    overflowedIndicator="true"
    style="width: 100%"
    mode="inline"
    :items="items"
    @click="onClick($event)"
    />
  </div>
</template>

<script setup lang='ts'>
import { h, ref } from 'vue';
import {
  InfoCircleOutlined,
  UserOutlined,
  ProjectOutlined,
  CarryOutOutlined,
  CommentOutlined,
  TeamOutlined,
  DashboardOutlined
} from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router:any = useRouter();
const selectedKey = ref<string[]>(['notices']);

const {collapsed} = defineProps({
  collapsed:{
    type:Boolean,
    default:false
  }
})

const items = ref<MenuProps['items']>([
  {
    key: 'notices',
    icon: () => h(InfoCircleOutlined),
    label: '通告管理',
    title: '通告管理',
  },
  {
    key: 'attendance',
    icon: () => h(CarryOutOutlined),
    label: '考勤管理',
    title: '考勤管理',
  },
  {
    key: 'train',
    icon: () => h(ProjectOutlined),
    label: '培训管理',
    title: '培训管理',
    children: [
      {
        label: '培训内容',
        key: 'culture',
      },
      {
        label: '培训中心',
        key: 'training',
      },
    ],
  },
  {
    key: 'section',
    icon: () => h(TeamOutlined),
    label: '部门管理',
    title: '部门管理'
  },
  {
    key: 'employee',
    icon: () => h(UserOutlined),
    label: '员工管理',
    title: '员工管理',
    children:[
      {
        label: '员工信息',
        key: 'employee',
      },
      {
        label: '调换管理',
        key: 'relieve',
      },
      {
        label: '离职管理',
        key: 'dimission',
      }
    ]
  },
  {
    key: 'performance',
    icon: () => h(DashboardOutlined),
    label: '绩效考核',
    title: '绩效考核',
  },
  {
    key: 'feedback',
    icon: () => h(CommentOutlined),
    label: '反馈中心',
    title: '反馈中心',
  },
]);
const onClick = (e:any)=>{
  router.push('/'+e.key)
  selectedKey.value = [e.key]
}
const onNotices = ()=>{
  router.push('/notices')
  selectedKey.value = ['notices']
}

</script>

<style scoped>
.menu-wrapper {
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  border-bottom: 1px solid #dcdfe6;
  .menu-wrapper-top {
    display: flex;
    line-height: 28px;
    align-items: center;
    cursor: pointer;
    padding-bottom: 6px;
    margin-bottom: 20px;
    border-bottom: 1px #dde8ed solid;
    box-shadow: 0 1px rgba(0, 0, 0, 0.2);
    img {
      margin-left: 10px;
      margin-right: 10px;
      width: 40px;
    }
    .collapsed{
      margin-left: 20px;
      width: 45px;
    }
    h1 {
      margin-top: 10px;
      width: 100px;
      font-size: 18px;
      color: #002140;
      font-weight: 400;
    }
    h1:hover {
      color: rgb(22, 200, 200);
    }
  }
  .a-menu-demo {
    margin-top: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    /* margin: 20px 10px 10px 20px; */
  }
  .menu-warpper-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
  }
  .el-menu-demo {
    border-bottom: 0;
  }
}
</style>