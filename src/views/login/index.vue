<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../../public/images/logo_index.png" alt />
    <el-form :model="formData" :rules="loginRules" ref="formData">
        <el-form-item prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号 "></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="formData.code"
            placeholder="请输入验证码 "
            style="width:236px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="submitForm()">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    let checkcode = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) { return callback(new Error('手机格式不对')) }
      callback()
    }
    return {
      formData: {
        mobile: '18265011656',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkcode, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      //
      // validate((valid)
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.$http.post('authorizations', this.formData).then((res) => {
            // console.log(res.data.data)
            store.setUser(res.data.data)
            this.$router.push('/')
          })
            .catch(() => {
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../../public/images/login_bg.jpg) no-repeat center/cover;
  .my-card {
    height: 350px;
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
