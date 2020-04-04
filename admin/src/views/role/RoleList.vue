<template>
  <div class="about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="items" size="mini" border :default-sort="{prop: 'power',order:'ascending'}" stripe>
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="角色名" width="180" align="center"></el-table-column>
      <el-table-column align="center" width="180" label="权限等级" prop="power" sortable
        :sort-orders="['ascending', 'descending']">
        <template slot-scope="scope">
          <el-tag effect="plain" v-if="scope.row.power==1">{{scope.row.power}}级</el-tag>
          <el-tag effect="plain" type="warning" v-else-if="scope.row.power==2">{{scope.row.power}}级</el-tag>
          <el-tag effect="plain" type="info" v-else>{{scope.row.power}}级</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="children.name" label="上级角色" align="center"></el-table-column> -->
      <el-table-column type="expand" label="管理菜单树" width="180" align="center">
        <template slot-scope="scope">
          <el-divider content-position="left">管理树</el-divider>
          <el-row>
            <el-col :span="6">
              <el-tag effect="plain" :type="tagType[scope.row.power-1]">{{scope.row.name}}</el-tag>
              <i v-if="scope.row.children&&scope.row.children.length" class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="18" v-if="scope.row.children&&scope.row.children.length">
              <el-row v-for="child in scope.row.children" :key="child.name">
                <el-col :span="6">
                  <el-tag effect="plain" :type="tagType[child.power-1]">{{child.name}}</el-tag>
                  <i v-if="child.children&&child.children.length" class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="18" v-if="child.children&&child.children.length">
                  <el-row v-for="ch in child.children" :key="ch.name">
                    <el-col>
                      <el-tag effect="plain" :type="tagType[ch.power-1]">
                        {{ch.name}}
                      </el-tag>
                      <i v-if="ch.children&&ch.children.length" class="el-icon-caret-right"></i>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 权限树 -->
          <el-divider content-position="left">权限树</el-divider>
          <el-row>
            <el-col :span="3">
              <el-tag effect="plain" :type="tagType[scope.row.power-1]">{{scope.row.name}}</el-tag>
              <i v-if="scope.row.children&&scope.row.children.length" class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="21">
              <!-- 间接 -->
              <el-divider content-position="left">间接权限</el-divider>
              <el-row v-if="scope.row.children&&scope.row.children.length">
                <el-col v-for="child in scope.row.children" :key="child.name">
                  <el-col v-if="child.manage&&child.manage.length">
                    <el-col v-for="mge in child.manage" :key="mge.name">
                      <el-tag effect="dark" :type="tagType[mge.level-1]">{{mge.name}}</el-tag>
                    </el-col>
                  </el-col>

                  <el-col v-if="child.children&&child.children.length">
                    <el-col v-for="ch in child.children" :key="ch.name">
                      <el-row v-if="ch.manage&&ch.manage.length">
                        <el-col v-for="mge in ch.manage" :key="mge.name">
                          <el-tag effect="dark" :type="tagType[mge.level-1]">{{mge.name}}</el-tag>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-col>

                </el-col>
              </el-row>
              <!-- 直接 -->
              <el-divider content-position="left">直接权限</el-divider>
              <el-row>
                <el-row v-for="mge in scope.row.manage" :key="mge.name">
                  <el-col>
                    <el-tag effect="dark" :type="tagType[mge.level-1]">{{mge.name}}</el-tag>
                  </el-col>
                </el-row>
              </el-row>

            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="$router.push(`/roles/edit/${scope.row._id}`)">编辑</el-button>
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
      const res = await this.$http.get('rest/roles')
      this.items = res.data
      console.log(res.data)
    },
    async remove (row) {
      this.$confirm(`是否确认要删除分类 "${row.username}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/roles/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetch()
      })
    }
  },
  created () {
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
