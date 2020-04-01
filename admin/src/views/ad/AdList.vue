<template>
  <div class="about">
    <h1>广告位列表</h1>
    <el-table :data="items" size="mini">
      <el-table-column prop="_id" label="ID" width="230"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
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
      // console.log('fetchstart')
      // console.dir(this.$http)
      const res = await this.$http.get('rest/ads')
      this.items = res.data
      // console.log('fetchend')
    },
    async remove(row) {
      this.$confirm(`是否确认要删除分类 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/ads/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetch()
      })
    }
  },
  created() {
    // console.log('created')
    this.fetch()
  }
}
</script>
