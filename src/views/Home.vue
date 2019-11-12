<template>

 <el-container class="app" >
  <el-card class="box-card aps">
      <div  class="clearfix">
        <img src="../assets/images//logo_index.png" alt="">
      </div>
      <el-input v-model="formData.name" size="15" placeholder="请输入手机号" ></el-input>
      <el-input v-model="formData.pasd" size="15" placeholder="请输入内容" ></el-input>
      <el-button  type="primary">登陆</el-button>
  </el-card>
</el-container>
</template>

<script>
// 主页项目启动的时候

export default {
  data () {
    return {
      formData: {
        name: '',
        pasd: ''

      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
<style lang="less">
.app{
  display: flex;
  background: url('../assets/images/login_bg.jpg') no-repeat;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content:center;
  align-items:center;

  .aps {
    background-color: #fff;
    width: 550px;
    height: 400px;
    display: flex;
    justify-content:center;
    align-items:center;
    text-align: center;

  }

  button {
    width: 100%;
  }

}

</style>
