<template>
  <div id="putQuestion">
    <div class="bodyCenter">
      <div class="put">发布提问</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="提问人" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="问题名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="问题详情" prop="content">
          <el-input type="textarea" :rows="10" placeholder="请输入具体描述" v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="putQuestion">立即提问</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name:'匿名',
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入问题名称', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请填写问题详情', trigger: 'blur' }
        ]
      }
    }
  },
 created() {},
 methods: {
   putQuestion(){
      this.$refs.ruleForm.validate(async valid=>{
        if(!valid) return
        var data = {
          quizzer: this.ruleForm.name || '匿名',
          title: this.ruleForm.title ||'暂无',
          quizContent: this.ruleForm.content,
      };
        const url = "quiz/addQuiz";
        await this.$ajax
          .post(url,data)
          .then(res => {
            const { data } = res;
            console.log(res);
            if (data.code === "000000") {
              this.$message.success("提交成功");
              //this.$router.push({ path: 'read'});
            } else {
              this.$message.error("暂无权限");
            }
          })
          .catch(() => {
            this.$message.error("网络异常");
          });
      })
    },
 } 
}
</script>
<style scoped>
#putQuestion {
  width: 100%;
  height: 1000px;
  padding-top: 50px;
  background-color: rgb(243, 244, 245);
}
.bodyCenter {
  width: 60%;
  height: 700px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #fff;
  /* border: 1px solid pink; */
}
.put {
  padding-top: 20px;
  margin-left: 20px;
  margin-bottom: 50px;
  font-size: 20px;
  color: #333;
  font-weight: 700;
}
.el-form-item {
  margin-bottom: 40px;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 90%;
}
.el-textarea {
    position: relative;
    display: inline-block;
    width: 90%;
    vertical-align: bottom;
    font-size: 14px;
}
.el-button {
  width: 90%;
  margin: 0 auto;
}
</style>