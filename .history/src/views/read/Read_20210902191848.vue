<template>
  <div id="article">
    <div v-html="htmltext" class="centerBody"></div>

  </div>
</template>

<script>
// import ArticleLi from "../home/childComps/ArticleLi";
import E from 'wangeditor'
import qs from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

export default {
  name: "read",
  components: {
    // ArticleLi,
  },
  data() {
    return{
      editor:'',
      htmltext:'<p>用 JS 设置的内容</p><p>追加的内容</p>'
    }
  },
  mounted() {
    this.getEdits()
  },
  methods: {
    getEdit() {
      // const editor = new E('#div1')
      // 或者 const editor = new E( document.getElementById('div1') )

      //  const E = window.wangEditor
        this.editor = new E(document.getElementById('toolbar-container'))
        this.editor.create()
        this.editor.txt.html('<p>用 JS 设置的内容</p>') // 重新设置编辑器内容
        this.editor.txt.append('<p>追加的内容</p>')
        console.log(this.editor.txt.html());

    },
    async getEdits() {
      var params = {
        pageNum :1,
        pageSize :10
       }
      // $ajax请求
      const url = '/essay/getEssayList'
      await this.$ajax.get(url, {params}).then(res => {
        const { data } = res
        // console.log(res);
        if (data.code === "000000") {
          this.$message.success('请求成功')
          var text = ''
          data.data.results.forEach(item => {
            text +=item.content
          })
          this.htmltext = text
          console.log(text);
        } else {
          this.$message.error('暂无权限')
        }
      }).catch(() => {
       this.$message.error('网络异常')
      })
    }
  }
};
</script>

<style scoped>
#article {
  width: 100%;
  margin-top: 100px;
  margin-bottom: 20px;
}
.centerBody{
  width: 500px;
  margin: 0 auto;
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
