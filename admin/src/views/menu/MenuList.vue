<template>
  <div class="about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="menus" size="mini" :default-sort="{prop: 'level',order:'ascending'}" stripe border>
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="菜单名称" width="180" align="center"> </el-table-column>
      <!-- <el-table-column prop="parent.name" label="上级菜单" width="150" align="center"> </el-table-column> -->

      <el-table-column type="expand" label="菜单树" width="180" align="center">
        <template slot-scope="scope" v-if="scope.row.children">
          <el-row>
            <el-col :span="8">
              <el-col >
                <el-tag effect="dark" :type="tagType[scope.row.level-1]">{{scope.row.name}}</el-tag>
                <i v-if="scope.row.children[0]" class="el-icon-caret-right"></i>
              </el-col>
            </el-col>
            <el-col :span="16">
              <el-row :class="i==0?'':'bt'" v-for="(child,i) in scope.row.children" :key="child.name">
                <el-col :span="8">
                  <el-tag effect="dark" :type="tagType[child.level-1]">{{child.name}}</el-tag>
                  <i v-if="child.children[0]" class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="16" v-if="child.children">
                  <el-row v-for="ch in child.children" :key="ch.name">
                    <el-col>
                      <el-tag effect="dark" :type="tagType[ch.level-1]">
                        {{ch.name}}
                      </el-tag>
                      <i v-if="ch.children[0]" class="el-icon-caret-right"></i>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" width="180" label="菜单等级" prop="level" sortable
        :sort-orders="['ascending', 'descending']">
        <template slot-scope="scope">
          <el-tag effect="dark" v-if="scope.row.level==1">{{scope.row.level}}级</el-tag>
          <el-tag effect="dark" type="warning" v-else-if="scope.row.level==2">{{scope.row.level}}级</el-tag>
          <el-tag effect="dark" type="info" v-else>{{scope.row.level}}级</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="$router.push(`/menus/edit/${scope.row._id}`)">编辑</el-button>
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
      menus: [],
      tagType: ['', 'warning', 'info']
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('rest/menus')
      // console.log(res.data);
      this.menus = res.data
    },
    async remove (row) {
      this.$confirm(`是否确认要删除菜单 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/menus/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetch()
      })
    }
  },
  created () {
    // console.log('created')
    this.fetch()
  }
}
</script>

<style scoped>
.el-col > .el-tag {
  margin: 5px;
}
.el-row {
  display: flex;
  align-items: center;
}
.bt {
  border-top: 1px solid #eee;
}
.el-table-column {
  text-align: center;
}
</style>
