<template>
  <div class="video">
    <h1>视频列表</h1>
    <el-table :data="items" size="mini">
      <el-table-column prop="_id" label="ID" width="230"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="img" label="封面">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" style="height:1.5rem;" />
        </template>
      </el-table-column>
      <el-table-column prop="watch" label="播放量"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push(`/videos/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="primary" size="mini" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {

      const res = await this.$http.get('rest/videos')
      // console.log(res.data);
      
      this.items = res.data

    },
    async remove(row) {
      this.$confirm(`是否确认要删除视频 "${row.title}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/videos/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetch()
      })
    }
  },
  created() {

    this.fetch()
  }
}
</script>
