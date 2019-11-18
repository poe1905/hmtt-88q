<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="forma.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表" >
          <el-select placeholder="请选择..." v-model="forma.channel_id">
            <el-option label="所有频道" :value="null"></el-option>
            <el-option
              :label="ineam.name"
              :value="ineam.id"
              v-for="ineam in loglist"
              :key="ineam.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <div class="block">
            <el-date-picker
              v-model="matdata"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click='loglistdata(1)'>筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到 {{ listavea }} 条符合条件的内容</span>
      </div>
      <!--  使用v-loading 是使得表格加载中 会发生加载事件,  -->
      <el-table :data="articles" style="width: 100%" v-loading="loading">
        <el-table-column prop="data" label="封面" width="220">
          <template slot-scope="scope">
            <img width="50" :src="scope.row.cover.images[0]">
          </template>
        </el-table-column>
        <el-table-column prop="data" label="状态" width="120">
         <template slot-scope="scope">
            <el-tag
              :type="articleStatus[scope.row.status].type"
            >{{ articleStatus[scope.row.status].label }}</el-tag>
          </template>

        </el-table-column >
        <el-table-column label="标题" prop="title"></el-table-column>
         <el-table-column
          prop="pubdate"
          label="发布日期"
          width="210">
        </el-table-column>
        <el-table-column label="操作" prop="data">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger" @click="delse(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
    <!-- 分页器的组件, 背景颜色 和显示模块 -上一页-页码-下一页 -->
    <!-- @current-change 为当页码改变的时候会触发的时间, 这个事件是elm 内置的一个时间, 只需要定制就可以了 -->
    <!--disabled  禁用按钮,指的是动态绑定按钮, 如果获得的值为true 那么就禁用整个组件,如果获取到的值是fasle 那么就可以使用, 默认为fasle  -->
    <!-- total 指的是分页器总共会分多少的数据,自动分为10条每页 -->
  <div class="fyq">
          <el-pagination
      background
      layout="prev, pager, next"
      :total="listavea"
      @current-change="onPageChange"
      :disabled="loading"
      class="fyq">
      <!--  当表格处于加载的过程中, 那么这个分页器也处于禁用状态, 也就是一个按钮控制两个功能, 当表格也处于加载过程中, 那么分页器处于禁用状态, 如果表格夹杂完毕,那么分页器处于可用状态 -->
    </el-pagination>
  </div>
    <!-- /分页 -->
  </div>
</template>

<script>
export default {
  name: 'boc',
  created () {
    //  vue 实例加载时,请求数据,渲染页面
    this.loglistdata()
    // 发送文章了类型列表请求
    this.loglistss()
    console.log(this.articles)
  },
  data () {
    return {
      forma: {
        status: null, // 文章状态
        channel_id: null // 文章类型id
      },
      listavea: 0, // 所有的文章数量
      articles: [], // table 整个表格渲染数据使用的变量
      matdata: '', // 时间绑定变量
      articleStatus: [
        // 定义一个数组状态去,加载所有出现效果的内容
        //  之后使用 数组选择器,选定特定的数组选项, 吧数组内容 添加到插槽上面, 这样就把数据和样式 有型的绑定在一起了
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'info',
          label: '已删除'
        }
      ], // 状态定义数组
      tableData: [], //
      loglist: {}, // 为文章列表的 数组存储
      loading: true // 表格的loading 状态控制
    }
  },
  methods: {
    //  获取所有列表的 方法
    loglistdata (page = 1) {
      // const tokens = window.localStorage.getItem('token')

      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${tokens}`
        // }
        params: {
          page, // 文章的页码
          status: this.forma.status, // 文章状态
          channel_id: this.forma.channel_id, // 文章的 类型id
          begin_pubdate: this.matdata ? this.matdata[0] : null,
          end_pubdate: this.matdata ? this.matdata[1] : null

        }

      }).then(err => {
        console.log(err)
        this.articles = err.data.data.results
        // 请求所有文章列表
        this.listavea = err.data.data.total_count
      }).catch(req => {
        console.log(req + '获取列表失败')
      }).finally(() => { // 无论成功还是失败，最终都要执行
        // 停止 loading
        this.loading = false
      })
    },
    // 加载所有文章类型的方法
    loglistss () {
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
    onPageChange (index) {
      console.log(index)
      // 这个函数里面有一个变量为页码当前变化的页码
      this.loglistdata(index)
    },
    delse (abs) {
      console.log(abs)
      this.$axios({
        method: 'DELETE',
        url: `/articles/${abs}`
      }).then(req => {
        console.log(req)
      }).catch(err => {
        console.log(err, '删除失败')
      })
    }

    // 获取所有 类别的请求方法

  }
}
</script>

<style lang='less' scoped>

.fyq{
  text-align: center;
  margin:  20px 0;
}
</style>
