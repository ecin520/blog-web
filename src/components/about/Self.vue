<template>
  <div class="article">
    <p></p>
    <div class="page__container page__main">

      <div class="page__content">
        <br>
        <h1 class="article-title">关于我</h1>

        <div v-highlight class="markdown-body article__details" v-html="showContent"></div>

      </div>

      <div class="page__sidebar">
        <side-list></side-list>
      </div>

    </div>
  </div>
</template>

<script>
    import SideList from "../side/SideList";
    import marked from 'marked'
    import 'github-markdown-css';
    import 'highlightjs-line-numbers.js'

    import {getArticleById} from "../../api/article";

    export default {
        name: "Article",
        components: {SideList},
        data() {
            return {
                article: {},
                articles: [],
                userInfo: {},
                showContent: ''
            }
        },
        methods: {
            init() {

                this.$progress.start()

                this.articleId = this.$route.params.id


                this.article = '> #### Edited by Ecin520\n' +
                    '> 个人简历地址：[http://www.pytap.com/resume](http://www.pytap.com/resume)\n' +
                    '\n' +
                    '\n' +
                    '纸上得来终觉浅，绝知此事要躬行。 — 陆游\n\n书山有路勤为径，学海无涯苦作舟。 — 韩愈\n\n折腾到死。 — 鲁迅\n' +
                    '\n' +
                    '> 推荐地址：[软件分享、破解](http://www.pytap.com/#/categories/%E8%BD%AF%E4%BB%B6%E5%88%86%E4%BA%AB%E3%80%81%E7%A0%B4%E8%A7%A3)\n' +
                    '\n' +
                    '学校：江西师范大学 \n\n 邮箱：15607942340@163.com \n\n 爱好：篮球、折腾 \n\n 目标：BAT'


                marked.setOptions({
                    renderer: new marked.Renderer(),
                    gfm: true,
                    tables: true,
                    breaks: false,
                    pedantic: false,
                    sanitize: false,
                    smartLists: true,
                    smartypants: false
                });
                this.showContent = marked(this.article, {sanitize: true})


                this.$progress.done()


            }
        },
        created() {
            this.init()
        },
        watch: {
            '$route'(to, from) {
                if (to.params.id !== from.params.id) {
                    this.init()
                }
            }
        }
    }
</script>

<style scoped lang="scss">

  .article-title {
    color: $theme-widget-color;
  }

  .article-tags {
    color: #666;
    margin-top: 8px;
  }

  .article-categories {
    color: #666;
    margin-top: 8px;
  }

  .article-time {
    color: $theme-widget-color;
  }

  .markdown-body > > > pre {
    border-style: solid;
    border-width: 0.5px;
    border-color: #e0e3e7;
    background: #2f2f2f;
  }

  .markdown-body > > > code {
    font-family: JetBrains;
    font-size: 12px;
    font-family: my-font;
  }

  .markdown-body {
    box-sizing: border-box;
    /*min-width: 200px;*/
    /*max-width: 980px;*/
    font-size: 14px;
    margin: 0 auto;
    padding: 1px;
    color: #666;
    font-family: code-font;
  }

  .markdown-body > > > blockquote {
    border-left: 4px solid rgb(66, 185, 175);
    padding: 10px 15px;
    color: rgb(119, 119, 119);
    background-color: rgba(66, 185, 131, 0.1);
  }
</style>