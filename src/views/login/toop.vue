<template>
<el-row type="flex" class="row-bg" justify="space-between">
  <el-col :span="10"><div class="grid-content bg-purple row-1">
      <i class="el-icon-s-fold" style=" margin-right: 10px;"></i>江苏传智播客教育科技股份有限公司
      </div></el-col>

  <el-col :span="2"><div class="grid-content bg-purple rowojg">
      <img src="../../assets/images/avatar.jpg" alt="">
           <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        用户名<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
        <el-dropdown-item icon="el-icon-position">git地址</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" @click.native="outloges" divided>退出</el-dropdown-item>
        <!--   在组件上面添加事件的修饰符为 natave -->
        <!-- <el-dropdown-item icon="el-icon-switch-button" @click.native="onLogout" divided>退出</el-dropdown-item> -->
      </el-dropdown-menu>
    </el-dropdown>
      </div></el-col>
</el-row>
</template>

<script>
export default {
  methods: {
    outloges () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //  点击插件 确认信息点击插件
        window.localStorage.removeItem('token')
        //  点击之后删除token 将页面跳转 到登陆也面
        //  删除成功使用编程式 导航跳转到登陆页面
        this.$router.push('/home')

        // this.$message 是emll 插件组内容封装的一个 在方法内部掉用的一个组件
        this.$message({
          //  提示消息的 样式为成功
          type: 'success',
          // 提示的文字消息
          message: '删除成功!'
        })
      }).catch(() => {
        // 点击取消过后的消息提示
        this.$message({
          //  提示消息的类型
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }

}
</script>

<style lang='less' scoped>
.row-bg{
   display: flex;
    align-items: center;
    font-size: 18px;

    .rowojg{
        vertical-align: top;
        text-align: center;
        display: flex;
        align-items: center;
        img {
            margin-right: 15px;
        }

    }
    img {
        border-radius: 50%
    }

}
</style>
