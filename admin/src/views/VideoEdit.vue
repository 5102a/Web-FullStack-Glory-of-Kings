<template>
  <div class="video">
    <h1>{{ id ? '编辑' : '新建' }}视频</h1>
    <el-form label-width="150px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="播放量">
        <el-input v-model="model.watch"></el-input>
      </el-form-item>

      <el-form-item>
        选择scr或上传本地视频封面
      </el-form-item>

      <el-form-item label="视频封面src">
        <el-input v-model="model.img"></el-input>
      </el-form-item>

      <el-form-item label="视频封面" style="margin-top:0.6rem;">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="res => $set(model, 'img', res.url)"
          :headers="getAuthHeaders()"
        >
          <img v-if="model.img" :src="model.img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        选择src或上传本地视频
      </el-form-item>
      <el-form-item label="src">
        <el-input v-model="model.src"></el-input>
      </el-form-item>

      <el-form-item label="视频" style="margin-top:0.6rem;">
        <el-upload
          class="avatar-uploader"
          :action="uploadVideoUrl"
          :show-file-list="false"
          drag
          :on-success="res => $set(model, 'src', res.src)"
          :headers="getAuthHeaders()"
        >
          <video
            type="video/mp4"
            style="width:350px"
            v-if="model.src"
            :src="model.src"
            class="avatar"
            controls="true"
            readyState="3"
          />
        </el-upload>
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
  data() {
    return {
      model: {},
      categories: []
    }
  },
  methods: {
    async save() {
      // console.log(this.id);
      // console.log(this.model);
      if (this.id) {
        await this.$http.put(`rest/videos/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/videos', this.model)
      }

      this.$router.push('/videos/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/videos/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    }
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>
