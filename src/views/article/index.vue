<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="文章名称"  prop="title">
        <el-input v-model="form.title" ></el-input>
      </el-form-item>

      <el-form-item label="文章内容" prop="channel_id">
        <wysiwyg v-model="form.content"  ></wysiwyg  >
      </el-form-item>
      <el-form-item label="封面" prop="content">
        <el-radio-group v-model="form.cover.type">
          <el-radio :label="2">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="sftx sx1 " v-show="form.cover.type==2 "  @click="dialogFormVisible = true" >
          <span>请选择图片</span>
          <img  :src="imgbl" alt="" ref="vtis">
        </div>
        <div v-show="form.cover.type==3 " class="sx1" >
          <div class="sftx"  @click="dialogFormVisible = true"  >
          <span>请选择图片</span>
          <img :src="imgbl" alt="">
        </div>
          <div class="sftx"   @click="dialogFormVisible = true">
          <span>请选择图片</span>
          <img :src="imgbl" alt="">
        </div>
          <div class="sftx" @click="dialogFormVisible = true"  >
          <span>请选择图片</span>
          <img :src="imgbl" alt="">
        </div>
        </div>

      </el-form-item>

      <el-dialog title="" :visible.sync="dialogFormVisible">
         <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
           <!--  默认显示素材库 -->
            <el-tab-pane label="素材库" name="first">
              <!-- 我是上传素材库的内容 -->
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                  <el-radio-button :label="false">全部</el-radio-button>
                  <el-radio-button :label="true">收藏</el-radio-button>
                </el-radio-group >
                <!-- 这个menu 是指的打开 -->
                <div class="box1">
                  <!-- 所有图片的列表选项 --  每一个div 都是一个图片选择-->
                  <div v-for="indem in imgdatas" :key="indem.id" style="  position: relative;"    @click="vtzb(indem.id,indem.url)">
                    <img :src="indem.url" alt="" style=" width: 128px;height: 100px;">
                    <!--  v-if 是指的这个id 给她 -->
                    <img src="../../assets/images/selected.png" alt="" v-if=" indem.id == ave " style="     left: 0; z-index: 2000;  position: absolute; width: 128px;height: 100px;">
                  </div>
                </div>
              <!-- 我是上传素材库的内容 -->

            </el-tab-pane>
            <el-tab-pane label="上传照片" name="second">
              我是上传照片的内容
            </el-tab-pane>

        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="djtz">确 定</el-button>
        </div>
      </el-dialog>
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
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 5, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur' }
        ]

      },
      loglist: [],
      tuwenshulaing: [],
      dialogFormVisible: false, // 图片选择框默不弹出
      // 定义弹出框的连级tab栏
      activeName: 'first', // 默认显示素材库
      isCollapse: false, // 默认显示素材库
      imgdatas: [],
      // 定义弹出框的连级tab栏

      ave: '', // 定义图片的选中状态
      imgbl: '' // 图片选择器中的 图片地址
    }
  },
  watch: {
    isCollapse (inde) {
      this.logimg(inde)
    }
  },
  created () {
    this.loglistdata()
    this.logimg()
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
    },
    // 点击图片新增弹出图片选择框
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 发送素材图片请求
    logimg (indess = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        //
        params: {
          collect: indess,
          page: 1,
          per_page: 10
        }
      }).then(err => {
        console.log(err)
        this.imgdatas = err.data.data.results
      })
    },
    vtzb (id) {
      this.ave = id
      console.log(this.ave)
    },
    djtz (id) {
      this.dialogFormVisible = false
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
    left: 0;
    background:  url(../../assets/images/default.png) center no-repeat;
  }

}
.box1{
  display: flex;
  flex-wrap: wrap;
  div {
    margin: 10px;
  }
}
.dialog-footer {
  text-align: center;

}

//  选中状态的遮罩
.mask{
  ::before{
    content: "";
    display:  block;
    width: 100px;
    height: 100px;
    z-index: 2000;
    background: url('../../assets/images/selected.png')
}
}
</style>
