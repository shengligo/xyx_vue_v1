<template>
  <div id="readDetail">
    <div class="detailCenter">132
      <div v-if="title">
        暂无数据
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return{
      filData:'',
      title:''
    }
  },
  mounted() {
    this.getText()
  },
  methods: {
    getText() {

    }
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
  border: 1px solid #eee;
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
