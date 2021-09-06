<template>
  <div id="article">
    <button @click="saveEdit"> 保存</button>

    <div id="toolbar-container" class="toolbar"></div>
    <!-- <p>------ 我是分割线 ------</p> -->
    <!-- <div id="text-container" class="text"></div> -->
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
    this.getEdit()
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
    async saveEdit() {
      const edt = this.editor.txt.html()
      var data = {
        id:1,
        sortId: 1,
        title: null,
        fileUrl: null,
        faceUrl: null,
        author: "shell",
        content:edt,
        createTime: "2021-08-30T16:00:00.000+00:00",
        updateTime: "2021-08-30T16:00:00.000+00:00",
        status: 1
       }
      // $ajax请求
      const url = '/essay/updateOrInsertEssay'
      await this.$ajax.post(url, data).then(res => {
        const { data } = res
        if (data.code === '101') {
          this.$message.success('暂无权限')
        } else {
          this.$message.error('暂无权限')
        }
      }).catch(() => {
       this.$message.error('网络异常')
      })
    }
  },
   beforeDestroy() {
    // 销毁编辑器
    this.editor.destroy()
    this.editor = null

  }
};
</script>

<style scoped>
#article {
  margin-top: 100px;
  margin-bottom: 20px;
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
