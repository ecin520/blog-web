<template>
  <div class="tag">
    <p></p>
    <div class="page__container page__main">

      <div class="page__content">
        <br>
        <div class="tag-show">
          {{tag.name}}
        </div>
        <div class="tag-show-details">
          <p>
            {{tag.description}}
          </p>
        </div>

        <div>
          <mu-card v-for="(item, index) in articles" :key="index" class="pointer show-card page__post">
            <mu-card-media>
              <img @click="articleClick(item)" :src="item.showImage" class="show-image" alt=""/>
            </mu-card-media>
            <mu-card-text>
              <span @click="articleClick(item)" class="title global-hover">{{item.title}}</span>
              <span class="show-card-time">{{item.time}}</span>
              <a @click="articleClick(item)" class="show-card-generalize">
                {{item.generalize}}
              </a><br>
              <div class="show-card-tag">
                <div style="margin-top: 2px">
                  <mu-icon size="16" value="local_offer"></mu-icon>&nbsp;
                </div>
                <div @click="tagClick(i)" class="global-hover" v-for="(i, index) in item.tags">{{i.name}} {{index === item.tags.length-1 ? '' : ',&nbsp'}} </div>
              </div>
            </mu-card-text>

            <mu-card-actions>
            </mu-card-actions>
          </mu-card>
        </div>

        <div class="pagination">
          <mu-flex justify-content="center">
            <mu-pagination class="muse-pagination" @change="changePage" :page-count="5" :page-size="pageSize" raised
                           circle :total="total" :current.sync="current"></mu-pagination>
          </mu-flex>
        </div>

      </div>

      <div class="page__sidebar">
        <side-list></side-list>
      </div>

    </div>
  </div>
</template>

<script>
    import SideList from "../side/SideList";
    import {listArticlesByTagName, countArticlesByTagName, getTagByName} from "../../api/tag";
    import {countArticles, listArticles} from "../../api/article";

    export default {
        components: {SideList},
        data() {
            return {
                current: 1,
                pageSize: 12,
                total: null,
                articles: [],
                userInfo: {},
                name: this.$route.params.name,
                tag: {}
            }
        },
        methods: {
            init() {
                this.$progress.start();
                this.name = this.$route.params.name
                let that = this

                getTagByName(that.name).then(response => {
                    that.tag = response.content
                })

                countArticlesByTagName(that.name).then(response => {
                    that.total = response.content
                    listArticlesByTagName(that.current, that.pageSize, that.name).then(response => {
                        that.articles = response.content
                        this.$progress.done();
                    })
                })

            },
            scrollTop() {
                let distance = document.documentElement.scrollTop || document.body.scrollTop;
                let step = distance;
                (function jump() {
                    if (distance > 0) {
                        distance -= step;
                        window.scrollTo(0, distance);
                        setTimeout(jump, 10)
                    }
                })();
            },
            changePage() {

                this.$progress.start();
                let that = this
                countArticlesByTagName(that.name).then(response => {
                    that.total = response.content
                    listArticlesByTagName(that.current, that.pageSize, that.name).then(response => {
                        that.articles = response.content
                        this.scrollTop();
                        this.$progress.done();
                    })
                })
            },
            articleClick(item) {
                this.$router.push({name: 'Article', params: {id: item.id}})
            },
            tagClick(item) {
                this.$router.push({name: 'Tag', params: {name: item.name}})
            },
        },
        created() {
            this.init()
        },
        watch: {
            '$route'(to, from) {
                if (to.params.name !== from.params.name) {
                    this.init()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  .tag-show {
    color: $theme-widget-color;
    font-size: 2em;
  }

  .tag-show-details {
    width: 95%;
    color: #69747a;
    font-size: 1em;
  }
</style>