<template>
  <div id="readDetail">
    <div class="detailCenter"> # 热点事件
      <h1 class="detailCenterTitle">{{ datilList.title || '-' }}</h1>
      <div class="detailCenterSortName">{{ datilList.sortName || '-'}}</div>
      <div class="detailCenterTime"> {{ datilList.createTime || '-' }} | {{ datilList.author || '-' }}</div>
      <div class="detailCenterImg">
        <img :src="datilList.faceUrl" alt="图片" v-if="datilList.faceUrl" />
        <img src="../../assets/img/1.jpg" alt="图片" v-else />
      </div>
      <div class="detailCenterContent" v-html="datilList.content"></div>
      <div v-if="datilList.title" class="noData">
        暂无数据
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return{
      detailId: 0,
      datilList:{},
    }
  },
  mounted() {
    this.getText()
  },
  created() {
    this.detailId = this.$route.query.id || ''
    this.getText()
  },
  methods: {
     async getText() {
      var params = {
        id: this.detailId,
      };
      // $ajax请求
      const url = "/essay/getEssayDetail";
      await this.$ajax
        .get(url,{ params })
        .then(res => {
          const { data } = res;
          if (data.code === "000000") {
            // this.$message.success('请求成功')
            this.datilList = data.data;
            console.log(this.datilList)
          } else {
            this.$message.error("暂无权限");
          }
        })
        .catch(() => {
          this.$message.error("网络异常");
        });
    },
  }

}
</script>
<style scoped>
#readDetail {
  width: 100%;
  height: 100%;
}
.detailCenter {
  width: 60%;
  margin: 20px auto ;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #eee;
}
.noData {
  height: 500px;
  width: 100%;
  line-height: 500px;
  text-align: center;

}
.detailCenterTitle {
  height: 40px;
  line-height: 40px;
  width: 100%;
  font-size: 25px;
  font-weight: 400;
  /* border: 1px solid pink; */
}
.detailCenterSortName {
  width: 80px;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  color: #666;
  font-weight: 400;
  border-radius: 8px;
  background-color: #f1f5f9;
  text-align: center;
}
.detailCenterTime {
  margin-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666;
  font-weight: 400;
  border-bottom: 1px solid #eee;
}
.detailCenterContent {
  margin-top: 20px;
  border-top: 1px solid #eee;
}
.detailCenterImg {
  margin: 0 auto;
  margin-top: 20px;
  width: 500px;
  height: 400px;
  /* border: 1px solid pink; */
}
img {
  width: 100%;
  height: 100%;
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
