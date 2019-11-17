<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文章名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="文章内容">
        <wysiwyg v-model="form.content"  ></wysiwyg  >
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="form.cover.type">
          <el-radio :label="2">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="sftx sx1 " v-show="form.cover.type==2 " >
          <span>请选择图片</span>
          <img src="@/assets/images/default.png" alt="">
        </div>
        <div v-show="form.cover.type==3 " class="sx1" >
          <div class="sftx"  >
          <span>请选择图片</span>
          <img src="@/assets/images/default.png" alt="">
        </div>
          <div class="sftx"  >
          <span>请选择图片</span>
          <img src="@/assets/images/default.png" alt="">
        </div>
          <div class="sftx"  >
          <span>请选择图片</span>
          <img src="@/assets/images/default.png" alt="">
        </div>
        </div>

      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="form.channel_id" placeholder="请选择文章频道">
            <!-- <el-option :label="选中"></el-option> -->
            <el-option
              :label="ineam.name"
              :value="ineam.id"
              v-for="ineam in loglist"
              :key="ineam.id"
            >
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(false)">保存提交</el-button>
        <el-button @click="onSubmit(true)">保存草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'qes',
  data () {
    return {
      form: {
        title: '', // 文章名称
        content: '', // 文章内容
        channel_id: '',
        cover: {
          type: 2, // 类型编号
          images: []// 频道类别
        } // 封面数量
      },
      loglist: [],
      tuwenshulaing: []
    }
  },
  created () {
    this.loglistdata()
  },
  methods: {
    //   进入页面加载文章列表
    loglistdata () {
      // const tokens = window.localStorage.getItem('token')

      this.$axios({
        method: 'GET',
        url: '/channels'
      })
        .then(err => {
          // console.log(err)
          // this.articles = err.data.data.results
          this.loglist = err.data.data.channels
          // console.log(this.loglist)
        })
        .catch(req => {
          console.log(req + '获取文章类型失败')
        })
    },
    onSubmit (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        params: {
          draft
        },
        data: this.form
      })
        .then(err => {
          console.log(err)
          // this.articles = err.data.data.results
          // this.loglist = err.data.data.channels
          // console.log(err)
        })
        .catch(req => {
          console.log(req + '保存文章失败失败')
        })
    }
  }
}
</script>

<style lang='less' scoped>
.sx1 {
  display: flex;
    border: 1px solid #ccc;
     width: 860px;
}
.sftx {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  // height: 242px;

  img {
    width: 220px;
    height: 220px;
  }

}
</style>
