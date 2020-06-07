<template>
  <div class="article">
    <p></p>
    <div class="page__container page__main">

      <div class="page__content">
        <br>
        <h1 class="article-title">{{article.title}}</h1>
        <mu-flex class="article-tags">
          <mu-icon size="20" value="local_offer"></mu-icon>
          <span style="font-size: 13px" v-for="(item, index) in article.tags">&nbsp;{{item.name}} {{index === article.tags.length-1 ? '' : ',&nbsp;&nbsp;'}}</span>
        </mu-flex>
        <mu-flex class="article-categories">
          <mu-icon size="20" value="class"></mu-icon>
          <span style="font-size: 13px" v-for="(item, index) in article.categories">&nbsp;{{item.name}} {{index === article.categories.length-1 ? '' : ',&nbsp;'}}</span>
        </mu-flex>
        <p class="article-time">{{article.time}}</p>
        <div v-highlight class="markdown-body article__details" v-html="showContent"></div>

        <!--            <div style="margin-top: 50px">-->
        <!--              <h3 style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 16px;padding-left: 12px;border-left: 4px solid #ec7259;font-size: 18px;font-weight: 500;height: 20px;line-height: 20px;">-->
        <!--                评论</h3>-->
        <!--              <p>-->
        <!--                <mu-divider></mu-divider>-->
        <!--              </p>-->

        <!--              <div v-for="i of 3">-->
        <!--                <div style="display: flex;">-->
        <!--                  <div>-->
        <!--                    <mu-avatar style="display: flex;flex-direction: column;" :size="40">-->
        <!--                      <img src="https://muse-ui.org/img/uicon.ac3913bf.jpg">-->
        <!--                    </mu-avatar>-->
        <!--                  </div>-->
        <!--                  <div style="display: flex;flex-direction: column;margin-left: 10px">-->
        <!--                    <span style="font-weight: bold">唐马撸</span>-->
        <!--                    <span style="color: #aca4a4">2017/05/06</span>-->
        <!--                    <div>-->
        <!--                      <p>故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。</p>-->
        <!--                    </div>-->
        <!--                    <div>-->
        <!--                      <mu-flex>-->
        <!--                        <mu-icon style="cursor: pointer" size="19" value="thumb_up"></mu-icon>&nbsp;123-->
        <!--                        <mu-icon style="margin-left: 30px;cursor: pointer" size="19" value="sms"></mu-icon>&nbsp;回复-->
        <!--                      </mu-flex>-->
        <!--                    </div>-->

        <!--                    <div style="display: flex;flex-direction: column;" v-for="i of 2">-->
        <!--                      <p></p>-->
        <!--                      <div style="display: flex;">-->
        <!--                        <mu-avatar :size="40">-->
        <!--                          <img src="https://muse-ui.org/img/uicon.ac3913bf.jpg">-->
        <!--                        </mu-avatar>-->
        <!--                        <div style="display: flex;flex-direction: column">-->
        <!--                          <span style="font-weight: bold">唐马撸</span>-->
        <!--                          <span style="color: #aca4a4">2017/05/06</span>-->
        <!--                        </div>-->
        <!--                      </div>-->
        <!--                      <div style="display: flex;flex-direction: column;margin-left: 10px">-->

        <!--                        <div>-->
        <!--                          <p><a>@唐马撸</a>山外青山楼外楼，西湖歌舞几时休。</p>-->
        <!--                        </div>-->
        <!--                        <div>-->
        <!--                          <mu-flex>-->
        <!--                            <mu-icon style="cursor: pointer" size="19" value="thumb_up"></mu-icon>&nbsp;123-->
        <!--                            <mu-icon style="margin-left: 30px;cursor: pointer" size="19" value="sms"></mu-icon>&nbsp;回复-->
        <!--                          </mu-flex>-->
        <!--                        </div>-->
        <!--                      </div>-->
        <!--                    </div>-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--                <p>-->
        <!--                  <mu-divider></mu-divider>-->
        <!--                </p>-->
        <!--              </div>-->

        <!--            </div>-->

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
                articleId: this.$route.params.id,
                article: {},
                current: 1,
                articles: [],
                userInfo: {},
                showContent: ''
            }
        },
        methods: {
            init() {

                this.$progress.start()

                this.articleId = this.$route.params.id

                getArticleById(this.articleId).then(response => {
                    this.article = response.content


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
                    this.showContent = marked(this.article.content, {sanitize: true})


                    this.$progress.done()
                })

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
    /*border-style: solid;*/
    /*border-width: 0.5px;*/
    border-color: #e0e3e7;
    /*border-radius: 7px;*/
    /*background: #333333;*/
    background: #272822;
    /*background: #2f2f2f;*/
  }

  .markdown-body > > > code {
    font-family: JetBrains;
    /*font-family: 'Droid Sans Mono';*/
    /*font-family: "Fira Code Retina";*/
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
    border-left: 4px solid rgb(66, 185, 131);
    padding: 10px 15px;
    color: rgb(119, 119, 119);
    background-color: rgba(66, 185, 131, 0.1);
  }
</style>