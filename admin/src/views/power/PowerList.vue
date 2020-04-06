<template>
  <div class="about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="items" size="mini" stripe border>
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column label="权限名" width="200" align="center">
        <template slot-scope="scope">
          <el-tag effect="dark" :type="getStyle(scope.row.level)">{{scope.row.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column type="expand" label="权限树" width="200" align="center">
        <template slot-scope="scope">
          <el-tree :data="scope.row.children" :default-checked-keys="scope.row.nodes" show-checkbox
            :default-expanded-keys="scope.row.nodes" node-key="name" accordion ref="tree" highlight-current 
            >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="node.level==3">
                读权限
                <el-switch v-model="data.read" active-color="#0af" disabled inactive-color="#bbb"
                  @change="handleRead(data,node)">
                </el-switch>
                写权限
                <el-switch v-model="data.write" active-color="#0af" disabled inactive-color="#bbb"
                  @change="handleWrite(data,node)">
                </el-switch>
              </span>
            </span>
          </el-tree>
        </template>
      </el-table-column>
      <!-- 读权限 -->
      <!-- <el-table-column label="读权限" width="120" align="center">
        <template slot-scope="scope" v-if="scope.row.read!=null">
          <el-tag effect="dark" :type="scope.row.read?'':'info'">{{scope.row.read?'开':'关'}}</el-tag>
        </template>
      </el-table-column> -->
      <!-- 写权限 -->
      <!-- <el-table-column label="写权限" width="120" align="center">
        <template slot-scope="scope" v-if="scope.row.write!=null">
          <el-tag effect="dark" :type="scope.row.write?'':'info'">{{scope.row.write?'开':'关'}}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope" v-if="scope.row.read==null">
          <el-button type="primary" size="mini" @click="$router.push(`/powers/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="primary" size="mini" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      tagType: ['', 'warning', 'info']
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('rest/powers')
      this.items = res.data
      // console.log(res.data)
    },
    async remove (row) {
      this.$confirm(`是否确认要删除权限 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/powers/${row._id}`)
        this.$message.success('删除成功!')
        this.fetch()
      })
    },
    getStyle (level) {
      return level ? this.tagType[level - 1] : 'danger'
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style scoped>
.el-tag {
  margin-right: 10px;
}
</style>
