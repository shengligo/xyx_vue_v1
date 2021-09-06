<template>
  <div id="question">
    <div class="bodyCenter">
      <div class="bodyright">
        <div v-for="(item, index) in results" :key="index" class="rightbox">
          <div>
            <div class="answerer">
              <span>回答者：{{ item.answerer }}</span>
              <el-button type="primary" size="mini">去回答</el-button>
            </div>
            <div class="time">{{}} 回答了：</div>
            <h2 class="title">{{ item.title }}</h2>
            <div class="answerContent">{{ item.answerContent }}</div>
          </div>
        </div>
      </div>
      <div class="bodyleft">
        <div class="leftbox">
          <div class="leftboxbutton">
            <el-button type="primary">我要回答</el-button>
            <el-button type="primary">我要提问</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
      results: [
        {
          title: "心理变态怎么办？",
          quizzer: "花开富贵",
          quizContent: "心理超级变态是不是没救了",
          quizType: null,
          status: null,
          label: null,
          answerer: "超科学",
          answerContent:
            "心理变态不是病，只要你不傻逼就行心理变态不是病，只要你不傻逼就行心理变态不是病，只要你不傻逼就行心理变态不是病，只要你不傻逼就行心理变态不是病，只要你不傻逼就行心理变态不是病，只要你不傻逼就行心理变态不是病，只要你不傻逼就行心理变态不是病，只要你不傻逼就行心理变态不是病，只要你不傻逼就行",
          likePoint: 0
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      var params = {
        pageNum:1,
          pageSize:10
      };
      // $ajax请求
      const url = "quiz/getAnswerList";
      await this.$ajax
        .get(url, {params})
        .then(res => {
          const { data } = res;
          console.log(data);
          if (data.code === "000000") {
            this.$message.success("加载完成");
            this.results =  data.data.results || []
          } else {
            this.$message.error("暂无权限");
          }
        })
        .catch(() => {
          this.$message.error("网络异常");
        });
    }
  }
};
</script>

<style scoped>
#question {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  background-color: rgb(243, 244, 245);
}
.bodyCenter {
  width: 60%;
  height: 500px;
  margin: 0 auto;
  display: flex;
  /* border: 1px solid red; */
}
.bodyright {
  /* border: 1px solid blue; */
  /* width: 40%; */
  flex: 2;
  height: 500px;
}
.bodyleft {
  /* border: 1px solid blue; */
  /* width: 20%; */
  flex: 1;
  height: 500px;
}
.rightbox {
  height: 250px;
  width: calc(100% - 60px);
  padding: 30px;
  border-radius: 20px;
  background-color: #fff;
}
.answerer {
  display: flex;
  justify-content: space-between;
  line-height: 28px;
}
.time {
  margin-top: 20px;
  font-size: 12px;
  color: #999;
}
.title {
  margin-top: 5px;
}
.answerContent {
  color: #999;
}
.leftbox {
  margin-left: 20px;
  padding: 50px 10px;
  height: 120px;
  border-radius: 20px;
  background-color: #fff;
}
.leftboxbutton {
  text-align: center;
}
.leftboxbutton button {
  width: 150px;
  height: 50px;
}
</style>
