<template>
  <div class="about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="items" size="mini" stipe border>
      <el-table-column prop="_id" label="ID" width="230" ></el-table-column>
      <el-table-column prop="username" label="用户名" width="150" align="center"></el-table-column>
      <el-table-column prop="description" label="用户描述" min-width="150" align="center"></el-table-column>
      <!-- 用户拥有的角色 -->
      <el-table-column type="expand" label="扮演角色" width="150" align="center">
        <template slot-scope="scope" v-if="scope.row.role&&scope.row.role.length">
          <el-tag effect="plain" :type="tagType[ro.power-1]" v-for="ro in scope.row.role" :key="ro._id">{{ro.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
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
      items: [],
      tagType: ['', 'warning', 'info']
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/admin_users')
      this.items = res.data
      // console.log(res.data)
    },
    async remove(row) {
      this.$confirm(`是否确认要删除分类 "${row.username}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/admin_users/${row._id}`)
        this.$message.success('删除成功!')
        this.fetch()
      })
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style scoped>
.el-tag{
  margin-right:10px
}
</style>
