<template>
 <div class="app home" >
  <el-card >
      <div  class="clearfix">
        <img src="../../assets/images//logo_index.png" alt="">
      </div>
  <el-form class="bon" :model="formData" :rules='rules' >
        <el-form-item prop='mobile'>
          <el-input placeholder="请输入手机号"  v-model="formData.mobile"></el-input>
        </el-form-item>
        <!-- 验证码的输入验证 -->
        <el-form-item prop='code'>
          <el-input style="width : 300px"   v-model="formData.code"  placeholder="验证码"></el-input>
          <el-button style=" float: right; width : 130px " plain  status-icon='true' >获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
            <el-checkbox v-model="formData.checked"></el-checkbox> &nbsp;&nbsp;&nbsp; 请同意我们的 <a> 用户协议</a> 和 <a>条款</a>
        </el-form-item>
        <el-form-item>
        <el-button type="primary"  @click="bosst111" style="width : 100%" >登陆</el-button>
        </el-form-item>
  </el-form>
  </el-card>
</div>
</template>

<script>

// 主页项目启动的时候

export default {
  data () {
    let validator = function (rule, value, callBack) {
      // rule当前规则
      // value当前表单项的值
      // callback 回调函数

      value ? callBack() : callBack(new Error('请务必同意我们的条款')) // 炫技模式
    }
    return {
      formData: {
        mobile: '13911111111',
        code: '246810',
        checked: true

      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入11位的手机号' }

        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入六位验证码' }

        ],
        checked: [{ validator }]
        //  同意处理
      }
    }
  },
  methods: {
    open1 () {
      this.$message({
        message: '请勾选用户协议框',
        type: 'warning'
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    bosst111 () {
      this.$axios({
        // 请求类型
        // 请求发送过去的时候必须对象的参数为后台请求参数为一致,如果不一致,就没救了
        method: 'post',
        data: this.formData,
        url: '/authorizations'
      }
      ).then(res => {
        console.log(res.data)
        window.localStorage.setItem('token', res.data.data.token)
        this.$router.push('/login')
      })
    }

  }

}
</script>
<style lang="less" scoped>
.home{
  display: flex;
  background: url('../../assets/images/login_bg.jpg') ;
  background-size:cover;
  width: 100%;
  height: 100vh;

  justify-content:center;
  align-items:center;
  .bon{
    width: 450px;

  }
  .clearfix{
    text-align: center;
    img {
      height: 45px;
    }
    margin: 15px 0 ;
  }
  a {
    color: red;
  }

  // .aps {
  //   background-color: #fff;
  //   width: 550px;
  //   height: 400px;
  //   display: flex;
  //   justify-content:center;
  //   align-items:center;
  //   text-align: center;

  // }

  // button {
  //   width: 100%;
  // }

}

</style>
