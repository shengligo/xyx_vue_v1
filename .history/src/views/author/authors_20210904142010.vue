<template>
  <div id="article">
    <div class="bodyCenter">
      <div class="upLoadImg">
        <el-upload
          class="avatar-uploader"
          action="http://10.1.2.85:8091/admin/upload/img"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="fileUrl" :src="fileUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="title">
        <input type="text" class="titleInput" placeholder="请输入标题" /> <br />
        <br />
        <input type="text" class="authorsInput" placeholder="请输入作者名称" />
      </div>
      <div class="saveButton">
        <el-button type="success" @click="saveEdit">保存</el-button>
      </div>
      <!--  -->
      <div id="toolbar-container" class="toolbar"></div>
    </div>
  </div>
</template>

<script>
// import ArticleLi from "../home/childComps/ArticleLi";
import E from "wangeditor";

export default {
  name: "read",
  components: {
    // ArticleLi,
  },
  data() {
    return {
      editor: "",
      htmltext: "<p>用 JS 设置的内容</p><p>追加的内容</p>",
      fileUrl: "",
      author: "",
      title: ""
    };
  },
  mounted() {
    this.getEdit();
    console.log("object");
  },
  methods: {
    getEdit() {
      //  const E = window.wangEditor
      this.editor = new E(document.getElementById("toolbar-container"));
      // 配置 server 接口地址
      this.editor.config.uploadImgServer = '/upload-img'
      this.editor.create();
      this.editor.txt.html("<p>用 JS 设置的内容</p>"); // 重新设置编辑器内容
      this.editor.txt.append("<p>追加的内容</p>");
      console.log(this.editor.txt.html());
    },
    async saveEdit() {
      const edt = this.editor.txt.html();
      var data = {
        id: 1,
        sortId: 1,
        title: this.title,
        fileUrl: this.fileUrl,
        faceUrl: null,
        author: this.author,
        content: edt,
        createTime: "2021-08-30T16:00:00.000+00:00",
        updateTime: "2021-08-30T16:00:00.000+00:00",
        status: 1
      };
      // $ajax请求
      const url = "/essay/updateOrInsertEssay";
      await this.$ajax
        .post(url, data)
        .then(res => {
          const { data } = res;
          console.log(res);
          if (data.code === "000000") {
            this.$message.success("保存成功");
          } else {
            this.$message.error("暂无权限");
          }
        })
        .catch(() => {
          this.$message.error("网络异常");
        });
    },
    beforeDestroy() {
      // 销毁编辑器
      this.editor.destroy();
      this.editor = null;
    },
    handleAvatarSuccess(res, file) {
      this.fileUrl = URL.createObjectURL(file.raw);
      this.$message.success("上传成功！");
      console.log(this.fileUrl);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>

<style scoped>
#article {
  margin-top: 100px;
  margin-bottom: 20px;
}
.bodyCenter {
  width: 50%;
  margin: 0 auto;
  border-radius: 10px;
  border: 1px solid #eee;
  background-color: #fff;
  padding: 20px;
}
.upLoadImg {
  height: 400px;
  width: 400px;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  border: 1px dashed black;

  width: 400px;
  height: 400px;
  line-height: 400px;
  text-align: center;
}
.avatar {
  width: 400px;
  height: 400px;
  display: block;
}
.title {
  margin: 20px 0;
}
.titleInput {
  padding: 0 15px;
  height: 40px;
  width: 300px;
  font-size: 25px;
}
.authorsInput {
  padding: 0 15px;
  height: 30px;
  width: 150px;
  font-size: 18px;
}
.saveButton {
  /* margin-left: 80% */
  margin-bottom:10px ;
}
/* table 样式 */
table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
table td,
table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
}

/* blockquote 样式 */
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

/* code 样式 */
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
pre code {
  display: block;
}

/* ul ol 样式 */
ul,
ol {
  margin: 10px 0 10px 20px;
}
</style>
