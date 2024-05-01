<template>
  <div class="container">
    <a-card>
      <a-tabs v-model:activeKey="activeKey" tab-position="left">
        <a-tab-pane class="tab-pane1" key="1" tab="个人信息">
          <a-card class="info">
            <a-upload class="avatar" v-model:file-list="avatarList" disabled list-type="picture-card">
            </a-upload>
            <a-card :bordered="false" class="descriptions">
              <a-descriptions bordered size="small" :column="{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }">
                <a-descriptions-item label="工号" span="1">
                  <span>
                    {{ user.e_id }}
                  </span>
                </a-descriptions-item>
                <a-descriptions-item label="姓名" span="1">
                  <span>
                    {{ user.name }}
                  </span>
                </a-descriptions-item>
                <a-descriptions-item label="年龄" span="1">
                  <span>
                    {{ user.age }}
                  </span>
                </a-descriptions-item>
                <a-descriptions-item label="性别" span="1">
                  <span>
                    {{ user.sex }}
                  </span>
                </a-descriptions-item>
                <a-descriptions-item label="所属部门" span="1">
                  <span>
                    {{ user.e_section }}
                  </span>
                </a-descriptions-item>
                <a-descriptions-item label="所属岗位" span="1">
                  <span>
                    {{ user.e_grade }}
                  </span>
                </a-descriptions-item>
                <a-descriptions-item label="员工工资" span="1">
                  <span>
                    {{ user.salary }}元/月
                  </span>
                </a-descriptions-item>
                <a-descriptions-item label="身份证信息" span="2">
                  <span>
                    {{ user.e_identification }}
                  </span>
                </a-descriptions-item>
                <a-descriptions-item label="居住地址" span="1">
                  <span>
                    {{ user.e_address }}
                  </span>
                </a-descriptions-item>
                <a-descriptions-item label="电子邮箱" span="1.5">
                  <span>
                    {{ user.e_mail }}
                  </span>
                </a-descriptions-item>
                <a-descriptions-item label="联系电话" span="1.5">
                  <span>
                    {{ user.e_phone }}
                  </span>
                </a-descriptions-item>
                <!-- <a-descriptions-item label="登陆密码">xxxx</a-descriptions-item> -->
              </a-descriptions>
            </a-card>
          </a-card>
        </a-tab-pane>
        <a-tab-pane class="tab-pane2" key="2" tab="修改信息">
          <a-card class="info">
            <a-upload class="avatar" v-model:file-list="avatarList" action="" list-type="picture-card">
              <div v-if="avatarList.length < 1">
                <plus-outlined />
                <div style="margin-top: 8px">Upload</div>
              </div>
            </a-upload>
            <span style="font-size: 12px;font-weight: 100;">*点击删除照片再上传完成修改*</span>
            <a-card :bordered="false" class="form">
              <a-form ref="userRef" :model="user" name="userInfo">
                <a-row>
                  <a-col :span="12">
                    <a-form-item name="e_id" label="工号" style="width:95%;">
                      <a-input disabled :value="user.e_id"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item name="name" label="姓名" style="width:95%;">
                      <a-input v-model:value="user.name"></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item name="age" label="年龄" style="width:95%;">
                      <a-input-number v-model:value="user.age" style="width:100%;"></a-input-number>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item name="sex" label="性别" style="width:95%;">
                      <a-radio-group style="width:100%" v-model:value="user.sex">
                        <a-radio-button value="女" style="margin-right: 10px;width: 47%;">女</a-radio-button>
                        <a-radio-button value="男" style="width: 47%;">男</a-radio-button>
                      </a-radio-group>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item name="e_section" label="所属部门" style="width:95%;">
                      <a-input disabled :value="user.e_section"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item name="e_grade" label="所属岗位" style="width:95%;">
                      <a-input disabled :value="user.e_grade"></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item name="salary" label="员工工资" style="width:95%;">
                      <a-input disabled :value="user.salary + '元/月'"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item name="e_identification" label="身份证信息" style="width:95%;">
                      <a-input v-model:value="user.e_identification"></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item name="e_address" label="居住信息" style="width:95%;">
                      <a-input v-model:value="user.e_address"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item name="e_mail" label="电子邮箱" style="width:95%;">
                      <a-input v-model:value="user.e_mail"></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item name="e_phone" label="联系电话" style="width:95%;">
                      <a-input v-model:value="user.e_phone"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                  </a-col>
                </a-row>
              </a-form>
              <a-popconfirm
              title="确认修改信息?"
              ok-text="是"
              cancel-text="否"
              @confirm="updateUser"
              >
                <a-button type="primary">
                  保存
                </a-button>
              </a-popconfirm>
              <a-button @click="resetUser" style="margin-left: 10px;">
                重置
              </a-button>
            </a-card>
          </a-card>
        </a-tab-pane>
        <a-tab-pane class="tab-pane3" key="3" tab="修改密码">
          <a-card class="info">
            <a-form ref="pwRef" :model="password" name="userInfo">
              <a-row>
                <a-col :span="12">
                  <a-form-item name="e_id" label="工号" style="width:95%;">
                    <a-input disabled :value="user.e_id"></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <a-form-item name="oldPw" label="现密码" style="width:95%;">
                    <a-input-password v-model:value="password.oldPw" placeholder="请输入当前密码"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <a-form-item name="newPw" label="新密码" style="width:95%;">
                    <a-input-password v-model:value="password.newPw" placeholder="请输入新密码"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <a-form-item name="newPw2" label="确认密码" style="width:95%;">
                    <a-input-password v-model:value="password.newPw2" placeholder="请再次输入新密码"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <a-button type="primary" @click="updatePw">
                    保存
                  </a-button>
                  <a-button @click="resetPw" style="margin-left: 10px;">
                    重置
                  </a-button>
                </a-col>
              </a-row>
            </a-form>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';

// import { employeeStore } from '@/store/employee/index.ts';
import { updateEmployee, updateEmPw } from '../../utils/api.ts';
import { notification, message } from 'ant-design-vue';
import { useRouter } from 'vue-router';


const activeKey = ref('1');

const avatarList = ref([
  {
    uid: '-1',
    name: 'lukematch.jpg',
    status: 'done',
    url: '/微信图片_20230728103352.jpg',
  }
])

// const store = employeeStore();
const router = useRouter()
const userJson:any = localStorage.getItem("user")
const userList = JSON.parse(userJson)
const user:any = ref(userList)

const password:any = ref({})
const userRef = ref()
const pwRef = ref()

// const setUserList = () => {
//   user.value = userList
// }
// onMounted(()=>{
//   setUserList()
// })

// const isForm = (form:any) => {
//   return form && typeof form.resetFields === 'function';
// };

const updateUser = async () => {
  console.log(user.value);
  await updateEmployee(user.value)
  localStorage.clear()
  router.push('/login')
  notification.success({
    message: '修改成功',
    description:
      `尊敬的 ${user.value.name}，您好！您的信息已成功修改!`,
  })
  message.info('请重新登录！')
}
const resetUser = () => {
  // console.log(userRef.value);
  userRef.value.resetFields()
}
const updatePw = async () => {
  console.log(user.value.e_id,password.value);
  console.log(await updateEmPw(user.value.e_id,password.value));
  localStorage.clear()
  router.push('/login')
  notification.success({
    message: '修改成功',
    description:
      `尊敬的 ${user.value.name}，您好！您的密码已成功修改!`,
  })
  message.info('请重新登录！')
}
const resetPw = () => {
  // console.log(pwRef.value);
  pwRef.value.resetFields()
}

// 上传图片 头像
// const handlePreview = async (file: UploadProps['fileList'][number]) => {
//   if (!file.url && !file.preview) {
//     file.preview = (await getBase64(file.originFileObj)) as string;
//   }
//   previewImage.value = file.url || file.preview;
//   previewVisible.value = true;
//   previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
// };

</script>

<style scoped>
.container {
  padding: 30px;

  /* width: 100%;
  height: 100%; */
  .tab-pane1,  .tab-pane2{
    text-align: center;

    .info {
      padding: 5px;

      .avatar {
        margin-right: 20px;
      }

      .descriptions {
        margin-top: 20px;

        span {
          color: #888;
        }
      }
    }
  }
  .tab-pane3 {
    text-align: center;
  }
}
</style>@/utils/http