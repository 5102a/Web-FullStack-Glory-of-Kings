<template>
  <div class="about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ id ? '编辑' : '新建' }}角色</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 角色下级 -->
      <el-form-item label="角色下级">
        <el-select v-model="model.children" placeholder="可选多个下级" multiple>
          <el-option v-for="role in roleCate" :key="role._id" :label="role.power+'级角色：'+role.name" :value="role._id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 角色等级 -->
      <el-form-item label="角色权限等级">
        <el-select v-model="model.power" placeholder="1级最高" clearable>
          <el-option v-for="level in powerLevel" :key="level" :label="'等级:' + level" :value="level">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 角色管理权限 -->
      <el-form-item label="管理权限">
        <el-select v-model="model.manage" placeholder="可不选,直接引用下级权限" clearable>
          <el-option v-for="power in powers" :key="power._id" :label="power.name" :value="power._id">
            <!-- 下拉菜单内嵌弹出框 -->
            <el-popover placement="right" width="400" trigger="hover">
              <el-tree :data="power.children" :default-expanded-keys="power.nodes" :default-checked-keys="power.nodes"
                node-key="name"  show-checkbox accordion ref="tree" highlight-current >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ data.name }}</span>
                  <span v-if="node.level==3">
                    读权限
                    <el-switch v-model="data.read" disabled active-color="#0af" inactive-color="#bbb"
                     >
                    </el-switch>
                    写权限
                    <el-switch v-model="data.write" disabled active-color="#0af" inactive-color="#bbb"
                     >
                    </el-switch>
                  </span>
                </span>
              </el-tree>
              <span style="float: left" slot="reference">{{ power.name }}</span>
            </el-popover>
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 角色名 -->
      <el-form-item label="角色名">
        <el-input v-model="model.name" placeholder="请输入角色名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      model: {},
      roleCate: [],
      powerLevel: [1, 2, 3],
      powers: []
    }
  },
  methods: {
    async save () {
      if (this.id) {
        await this.$http.put(`rest/roles/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/roles', this.model)
      }
      this.$router.push('/roles/list')
      this.$message.success('保存成功')
    },
    async fetch () {
      const res = await this.$http.get(`rest/roles/${this.id}`)
      this.model = res.data
    },
    // 获取角色列表
    async fetchGetRoles () {
      const res = await this.$http.get(`rest/roles`)
      this.roleCate = res.data
    },
    // 获取权限树
    async fetchGetPowers () {
      const res = await this.$http.get(`rest/powers`)
      this.powers = res.data
      // console.log(res.data);
      
    }
  },
  created () {
    this.fetchGetRoles()
    this.fetchGetPowers()
    this.id && this.fetch()
  }
}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
