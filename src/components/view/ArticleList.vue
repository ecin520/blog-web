<template>
  <div class="article-list">
    <div class="navbar-top">
      <br><br><br><br><br>
      <p class="navbar-top-content">
        欢迎来到<span class="nickname-color">{{userInfo.nickname}}</span>的个人博客
      </p>
      <p class="navbar-under-line"></p>
      <p class="navbar-top-signature">
        {{userInfo.signature}}
      </p>
    </div>

    <div class="page__container page__main">

      <div class="page__content">

        <div>
          <mu-card v-for="(item, index) in articles" :key="index" class="pointer show-card page__post">
            <mu-card-media>
              <img @click="articleClick(item)" :src="item.showImage" class="show-image" alt=""/>
            </mu-card-media>
            <mu-card-text>
              <span @click="articleClick(item)" class="title global-hover">{{item.title}}</span>
              <span class="show-card-time">{{item.time}}</span>
              <a @click="articleClick(item)" class="show-card-generalize global-hover">
                {{item.generalize}}
              </a><br>
              <div class="show-card-tag">
                <div style="margin-top: 2px">
                  <mu-icon size="16" value="local_offer"></mu-icon>&nbsp;
                </div>
                <div @click="tagClick(i)" class="global-hover" v-for="(i, index) in item.tags">{{i.name}} {{index === item.tags.length-1 ? '' : ',&nbsp'}} </div>
              </div>
            </mu-card-text>
          </mu-card>
        </div>

        <div class="pagination">
          <mu-flex justify-content="center">
            <mu-pagination class="muse-pagination" @change="changePage" :page-count="3" :page-size="pageSize" raised
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
    import {listArticles, countArticles} from "../../api/article";
    import {getUserById} from "../../api/user";

    export default {
        components: {SideList},
        data() {
            return {
                current: 1,
                pageSize: 12,
                total: null,
                articles: [],
                userInfo: {
                    id: '',
                    username: '',
                    nickname: '',
                    email: '',
                    tel: '',
                    signature: ''
                },
            }
        },
        methods: {
            init() {
                this.$progress.start();
                let that = this

                getUserById(1000).then(response => {
                    this.userInfo = response.content
                })

                countArticles().then(response => {
                    that.total = response.content

                    listArticles(that.current, that.pageSize).then(response => {
                        that.articles = response.content
                        this.$progress.done();
                    });

                });

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
                this.scrollTop();
                this.$progress.start();
                let that = this
                countArticles().then(response => {
                    that.total = response.content
                    listArticles(that.current, that.pageSize).then(response => {
                        that.articles = response.content
                        this.$progress.done();
                    });

                });
            },
            tagClick(item) {
                this.$router.push({name: 'Tag', params: {name: item.name}})
            },
            articleClick(item) {
                this.$router.push({path: '/article', name: 'Article', params: {id: item.id}})
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped lang="scss">

</style>