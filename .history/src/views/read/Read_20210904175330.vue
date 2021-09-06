<template>
  <div id="box">
    <div id="article">
      <div class="nolist" v-if="!fileList.length">
        暂无数据
      </div>
      <div
        class="list"
        v-for="(item, index) in fileList"
        :key="index"
        @click="goToUrl('ReadDetail', { id: item.id })"
      >
        <div class="list_l">
          <img :src="item.faceUrl" alt="图片" v-if="item.faceUrl" />
        </div>
        <div class="list_r">
          <div class="list_r_t">
            <span>{{ item.title }}</span>
            <span class="sortName">{{ item.sortName }}</span>
          </div>
          <div class="list_r_m">{{ item.introduce }}</div>
          <div class="list_r_b">
            {{ item.createTime.substring(0, 10) }} | {{ item.author }}
          </div>
        </div>
      </div>
      <!-- <div v-html="htmltext" class="centerBody"></div> -->
      <!-- 分页 -->
      <el-pagination
        v-if="fileList.length"
        class="common-page-pagination"
        background
        :current-page="condition.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="condition.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="toWrite">
      <el-button type="primary" @click="gotoWrite">去写文章</el-button>
    </div>
  </div>
</template>

<script>
// import ArticleLi from "../home/childComps/ArticleLi";
import E from "wangeditor";
import qs from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

export default {
  name: "read",
  components: {
    // ArticleLi,
  },
  data() {
    return {
      fileList: [],
      total: 0,
      condition: {
        pageNum: 1,
        pageSize: 5
      },
      htmltext: "<p>用 JS 设置的内容</p><p>追加的内容</p>"
    };
  },
  mounted() {
    this.getEdits();
  },
  methods: {
    goToUrl(url, query = {}) {
      if (!url) {
        this.$toast("当前模块正在开发中\n敬请期待!");
      } else {
        this.$router.push({ path: url, query });
      }
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.getEdits();
    },
    handleCurrentChange(val) {
      this.condition.pageNum = val;
      this.getEdits();
    },
    async getEdits(current) {
      if (current) {
        this.condition.pageNum = current;
      }
      var params = {
        pageNum: 1,
        pageSize: 10
      };
      // $ajax请求
      const url = "/essay/getEssayList";
      await this.$ajax
        .get(url, { params })
        .then(res => {
          const { data } = res;
          if (data.code === "000000") {
            console.log(data,'asdasd ');
            //this.$message.success('请求成功')
            this.fileList = data.data.results;
            this.total = data.data.totalRecord;
            var text = "";
            data.data.results.forEach(item => {
              text += item.content;
            });
            this.htmltext = text;
          } else {
            this.$message.error("暂无权限");
          }
        })
        .catch(() => {
          this.$message.error("网络异常");
        });
    },
    gotoWrite() {
      const adminname = window.sessionStorage.getItem('storeName') // 获取浏览器缓存值
      if(!adminname) this.$router.push({ path: 'write' }) // 页面跳转
      else {
        this.$router.push({ path: 'login' })
        this.$store.commit("ChangeActive",5);
        this.$message.error('请先登录！')
      }
    }
  }
};
</script>

<style scoped>
#box {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #eee;
  position: relative;

}

#article {
  border-radius: 5px;
  width: 50%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background: #fff;
}
.centerBody {
  width: 500px;
  margin: 0 auto;
}
.nolist{
  margin: 15px auto;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
}
.list {
  display: flex;
  width: 80%;
  height: 100px;
  padding: 10px;
  margin: 0 auto;
  /* border: 1px solid pink; */
  margin-top: 10px;
}
.list_l {
  width: 100px;
  height: 100px;
  /* border: 1px solid pink; */
}
img {
  width: 100%;
  height: 100%;
}
.list_r {
  margin-top: 10px;
  margin-left: 30px;
  width: 90%;
  height: 100px;
  /* border: 1px solid pink; */
}
.list_r_t {
  margin: 5px;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  font-weight: 700;
  /* border: 1px solid pink; */
}
.sortName {
  float: right;
  width: 80px;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  color: #666;
  font-weight: 400;
  border-radius: 8px;
  background-color: #f1f5f9;
  text-align: center;
  /* border: 1px solid pink; */
}
.list_r_m {
  margin: 0 5px 5px;
  font-size: 14px;
  color: #666;
  font-weight: 400;
}
.list_r_b {
  margin: 0 5px;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  color: #666;
  font-weight: 400;
}


.toWrite{
  display: flex;
  position: fixed;
  height: 10%;
  width: 10%;
  top: 10%;
  right: 10%;
  background-color: #fff;
  border-radius: 5px;
  align-items: center;
  justify-content: center;

}
</style>
