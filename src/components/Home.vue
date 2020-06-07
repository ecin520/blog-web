<template>
  <div class="home">
    <div class="navbar">
      <div @click="stepBack" class="logo">
        <mu-icon size="40" value="flash_on"></mu-icon>
      </div>
      <div class="navbar-item-style">
        <div>
          <span @click="toHome" class="navbar-item">首页</span>
          <span @click="toArchive" class="navbar-item">归档</span>
          <span @click="toAbout" class="navbar-item">关于</span>
          <span @click="toCreate" class="navbar-item">创作</span>
        </div>
      </div>
    </div>

    <transition name="content" mode="out-in">
      <router-view></router-view>
    </transition>

    <div class="footer">
      <div class="footer-content">
        <el-row>
          <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 8, offset: 0 }" :md="{ span: 8, offset: 0 }">
            <h1>网站信息</h1>
            <mu-flex>
              <mu-icon size="20" value="place"></mu-icon>
              <span style="color: #69747a;font-size: 13px;">&nbsp;Nanchang, JaingXi Province</span>
            </mu-flex>
            <br>
            <mu-flex>
              <mu-icon size="20" value="mail"></mu-icon>
              &nbsp;<span style="color: #69747a;font-size: 13px;">{{userInfo.email}}</span>
            </mu-flex>
            <br>
            <mu-flex>
              <mu-icon size="20" value="person"></mu-icon>
              &nbsp;总访问&nbsp;<a>{{views.allViews}}</a>, 日访问&nbsp;<a>{{views.dayViews}}</a>
            </mu-flex>
            <br>
            <mu-flex>
              <mu-icon size="20" value="style"></mu-icon>
              &nbsp;文章总数&nbsp;<a>{{total}}</a>
            </mu-flex>


          </el-col>

          <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 8, offset: 0 }" :md="{ span: 8, offset: 0 }">
            <h1>推荐链接🔗</h1>
            <p><a href="https://cn.vuejs.org/" target="_blank">Vue官方文档</a></p>
            <p><a href="https://flutterchina.club/" target="_blank">Flutter</a></p>
            <p><a href="https://material.io/" target="_blank">Material</a></p>
            <p><a href="http://www.pytap.com/resume" target="_blank">我的简历</a></p>
          </el-col>

          <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 8, offset: 0 }" :md="{ span: 8, offset: 0 }">
            <h1>构建工具</h1>
            <p>Vue.js</p>
            <p>SpringBoot</p>
            <p>Muse-UI</p>
            <p>Nginx</p>
          </el-col>

        </el-row>
      </div>

      <div class="footer-sign">
        <div class="footer-gird"
             style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-between">
          <div>
            <p style="margin: 10px;font-size: 12px;line-height: 40px;">
              <span class="">© 2019 · Ecin520 版权所有</span>
              <span class="">赣ICP备20002573号</span>
            </p>
          </div>
          <div>

            <a style="font-size: 2.8em;color: white;margin: 10px" href="https://github.com/ecin520/" target="_blank"
               class="icon-plus iconfont icon-github"></a>

          </div>
        </div>

      </div>
    </div>

    <transition name="plus-icon" mode="out-in">
      <i @click="scrollTop" v-if="topShow === true"
         class="back-top icon-plus iconfont icon-md-rocket"></i>
    </transition>

    <mu-dialog
        :scrollable="true"
        transition="scale"
        :lock-scroll="false"
        overlay-color="hsla(209, 100%, 56%, 0.73)"
        :overlay="true"
        :open.sync="loginVisible">
      <div>
        <mu-form :model="login" class="mu-demo-form" label-position="left" label-width="60">
          <mu-form-item prop="input" label="用户名">
            <mu-text-field v-model="login.username"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="input" label="密码">
            <mu-text-field type="password" v-model="login.password"></mu-text-field>
          </mu-form-item>
        </mu-form>
        <mu-flex justify-content="center">
          <mu-button @click="loginClick" color="green">登录</mu-button>
        </mu-flex>
      </div>
    </mu-dialog>

  </div>
</template>

<script>
    import {login, getUserById} from "../api/user";
    import {countArticles, listArticleYears} from "../api/article";
    import {getViews} from "../api/web";

    export default {
        data() {
            return {
                topShow: false,
                total: 0,
                loginVisible: false,
                userInfo: {
                    id: '',
                    username: '',
                    avatar: '',
                    email: '',
                    tel: '',
                    nickname: 'Ecin520',
                    signature: '我是一名普通的程序员，喜欢写文章和分享软件。希望你们能够喜欢我和我的软件。',
                    views: 0,

                },
                login: {
                    username: '',
                    password: ''
                },
                views: {
                    allViews: 0,
                    dayViews: 0,
                    ipNum: 0,
                    visNum: 0
                }
            }
        },
        methods: {
            init() {
                window.addEventListener("scroll", this.showIcon)

                getUserById(1000).then(response => {
                    this.userInfo = response.content
                })

                countArticles().then(response => {
                    this.total = response.content
                })

                getViews().then(response => {
                    this.views = response.content
                })

            },
            showIcon() {
                this.topShow = !!document.documentElement.scrollTop && document.documentElement.scrollTop > 200;
            },
            scrollTop() {
                let distance = document.documentElement.scrollTop || document.body.scrollTop;
                let step = distance / 20;
                (function jump() {
                    if (distance > 0) {
                        distance -= step;
                        window.scrollTo(0, distance);
                        setTimeout(jump, 10)
                    }
                })();
            },
            toHome() {
                this.$router.push({path: '/'})
            },
            stepBack() {
              this.$router.go(-1)
            },
            toArchive() {
                this.$progress.start();
                listArticleYears().then(response => {
                    let years = response.content;
                    years.sort((x, y) => {
                        return x - y
                    });
                    this.$progress.done();
                    this.$router.push({name: 'Archive', params: {name: years[0]}})
                })

            },
            toAbout() {
                this.$router.push({path: '/about'})
            },
            toCreate() {
                if (this.$store.state.token && this.$store.state.userInfo) {
                    this.$router.push({path: '/control-center'})
                } else {
                    this.loginVisible = true
                }
            },
            loginClick() {
                login(this.login.username, this.login.password).then(response => {
                    if (response.code === 200) {
                        console.log(response)
                        this.$store.dispatch("login", {
                            token: response.token,
                            userInfo: response.user
                        });
                        this.$router.push({path: '/control-center'})
                    }
                })
            }

        },
        created() {
            this.init()
        }
    }
</script>

<style scoped lang="scss">

  @media screen and (max-width: $mq-mobile) {
    .footer-gird {
      justify-content: center !important;
    }
  }

  .home {
    .navbar {
      position: fixed;
      top: 0;
      background: $theme-color;
      display: block;
      width: 100%;
      height: 60px;
      transition: height .3s;
      z-index: 999;

      .logo {
        cursor: pointer;
        float: left;
        margin: 12px;
        letter-spacing: 10px;
        color: $theme-text-color;
      }

      .logo:hover {
        color: $bar-color-hover;
      }

      .navbar-item-style {
        color: $theme-text-color;
        float: right;
        margin: 20px;
        letter-spacing: 5px;
      }

      .navbar-item {
        cursor: pointer;
      }

      .navbar-item:hover {
        color: $bar-color-hover;
      }
    }

    .footer {
      position: absolute;
      width: 100%;
      margin-bottom: 0;
      background: $bottom1-color;
      color: white;

      .footer-content {
        margin: 50px;
      }

      .footer-sign {
        border-top: 0.7px solid rgba(255, 255, 255, .1);
        position: absolute;
        margin-bottom: 0;
        background: $bottom2-color;
        width: 100%;
        box-sizing: border-box;

        .footer-sign-content {
          text-align: center;
        }
      }
    }
  }

  .back-top {
    position: fixed;
    display: block;
    width: 50px;
    height: 50px;
    /*font-size: 25px;*/
    right: 1em;
    bottom: 3em;
    text-align: center;
    /*color: #fff;*/
    transition: background .3s, opacity .3s;
    /*background: #19abd6;*/
    /*background: linear-gradient(to right,#19abd6 35%,#3ac0e8 100%);*/
    background-size: 200% auto;
    border-radius: 50%;
    cursor: pointer;
    opacity: 1;
    z-index: 100;
    color: $theme-widget-color;
    font-size: 3.5em
  }

  .plus-icon-enter-active {
    transition: opacity .5s;
  }

  .plus-icon-enter {
    opacity: 0;
  }

  .plus-icon-leave-active {
    transition: opacity .5s;
  }

  .plus-icon-leave-to {
    transform: translateY(-100%);
    transition: .5s;
    opacity: 0;
  }

  .content-enter-active {
    transition: opacity 0.3s;
  }

  .content-enter {
    opacity: 0;
  }

  .content-leave-active {
    transition: opacity 0.3s;
  }

  .content-leave-to {
    transition: 0.3s;
    opacity: 0;
  }
</style>
