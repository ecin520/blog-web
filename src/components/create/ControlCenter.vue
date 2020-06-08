<template>
  <div>
    <div class="navbar">
      <div @click="toHome" class="logo">
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

    <!-- 主页展示卡片 -->
    <div class="control-card">
      <div class="control-card-item">
        <mu-card style="">
          <h1 class="card-title">
            创作中心
          </h1>
          <mu-card-text>
            <div style="display: flex;justify-content: center;flex-wrap: wrap;flex-direction: row;width: 100%;">
              <div @click="showArticleAddDialog">
                <mu-flex style="margin: 20px;cursor: pointer;" justify-content="center">
                  <mu-icon size="30" color="green" value="note_add"></mu-icon>
                  <a style="color: darkgray;font-size: 1.3em;">添加文章</a>
                </mu-flex>
              </div>
              <div @click="showArticleEditDialog">
                <mu-flex style="margin: 20px;cursor: pointer;" justify-content="center">
                  <mu-icon size="30" color="green" value="edit"></mu-icon>
                  <a style="color: darkgray;font-size: 1.3em;">文章编辑</a>
                </mu-flex>
              </div>
              <div @click="showCategoriesEditVisible">
                <mu-flex style="margin: 20px;cursor: pointer;" justify-content="center">
                  <mu-icon size="30" color="green" value="attach_file"></mu-icon>
                  <a style="color: darkgray;font-size: 1.3em;">编辑分类</a>
                </mu-flex>
              </div>
              <div @click="showTagsEditVisible">
                <mu-flex style="margin: 20px;cursor: pointer;" justify-content="center">
                  <mu-icon size="30" color="green" value="local_offer"></mu-icon>
                  <a style="color: darkgray;font-size: 1.3em;">编辑标签</a>
                </mu-flex>
              </div>
              <div @click="showInfoEditVisible">
                <mu-flex style="margin: 20px;cursor: pointer;" justify-content="center">
                  <mu-icon size="30" color="green" value="face"></mu-icon>
                  <a style="color: darkgray;font-size: 1.3em;">信息编辑</a>
                </mu-flex>
              </div>
            </div>
            <br><br><br><br>
            <mu-flex justify-content="center">
              <mu-button @click="logoutClick" color="error">退出登录</mu-button>
            </mu-flex>
          </mu-card-text>
          <br>
        </mu-card>
      </div>
    </div>

    <!-- markdown编辑器Dialog -->
    <mu-dialog
        :scrollable="true"
        transition="scale"
        :lock-scroll="false"
        overlay-color="hsla(209, 100%, 56%, 0.73)"
        :overlay="true"
        :toolbars="toolbars"
        :fullscreen="true"
        :open.sync="articleAddVisible">
      <mu-appbar style="width: 100%;height: 40px;color: black;" color="white">
        <mu-flex justify-content="center">
          <mu-button @click="articleAddVisible = false" small icon>
            <mu-icon value="close" color="primary"></mu-icon>
          </mu-button>
        </mu-flex>
      </mu-appbar>
      <mu-paper style="position:absolute;height: 92%;width: 96%;margin-left: 2%;margin-right: 2%;" :z-depth="5">
        <mavon-editor
            style="height: 100%;"
            v-model="article.content"
            :toolbars="toolbars"
            @imgAdd="$imgAdd"
            ref="md"
            :ishljs="true"
            :tabSize=4
            toolbarsBackground=""
            @save="saveArticle"
            placeholder="Begin your editor..."
        />
      </mu-paper>
    </mu-dialog>

    <!-- 文章提交卡片 -->
    <mu-dialog
        :scrollable="true"
        transition="scale"
        :lock-scroll="false"
        overlay-color="hsla(209, 100%, 56%, 0.73)"
        :overlay="true"
        width="600"
        :open.sync="articleSubmitDialogVisible">
      <mu-form :model="article" class="mu-demo-form" label-position="left" label-width="80">
        <mu-form-item prop="input" label="标题">
          <mu-text-field v-model="article.title"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="input" label="展示内容">
          <mu-text-field :rows="3" multi-line v-model="article.generalize"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="input" label="展示图片">
          <mu-text-field v-model="article.showImage"></mu-text-field>
        </mu-form-item>
      </mu-form>
      <mu-flex justify-content="center">
        <mu-button @click="showArticleTagsVisible">添加标签</mu-button>&nbsp;
        <mu-button @click="showArticleCategoriesVisible">添加分类</mu-button>
      </mu-flex>
      <br><br>
      <mu-flex justify-content="center">
        <mu-switch :label-left="true" v-model="recommendSwitch" label="是否推荐"></mu-switch>
      </mu-flex>
      <br>
      <mu-flex justify-content="center">
        <mu-switch :label-left="true" v-model="timeUpdateSwitch" label="更新时间"></mu-switch>
      </mu-flex>
      <br>
      <mu-flex justify-content="center">
        <mu-button @click="submitArticleClick" color="success">提交</mu-button>
      </mu-flex>
      <br>
      <mu-dialog
          :scrollable="true"
          transition="scale"
          :lock-scroll="false"
          overlay-color="hsla(209, 100%, 56%, 0.73)"
          :overlay="true"
          width="400"
          :open.sync="articleTagsVisible">
        <span style="margin: 10px" v-for="(item, index) in showTags" :key="index">
          <mu-checkbox :value="item.name" v-model="selectedTags" :label="item.name"></mu-checkbox>
        </span>
      </mu-dialog>

      <mu-dialog
          :scrollable="true"
          transition="scale"
          :lock-scroll="false"
          overlay-color="hsla(209, 100%, 56%, 0.73)"
          :overlay="true"
          width="400"
          :open.sync="articleCategoriesVisible">
        <span style="margin: 10px" v-for="(item, index) in showCategories" :key="index">
          <mu-checkbox :value="item.name" v-model="selectedCategories" :label="item.name"></mu-checkbox>
        </span>
      </mu-dialog>

    </mu-dialog>

    <!-- 文章编辑卡片 -->
    <mu-dialog width="600"
               :scrollable="true"
               transition="scale"
               overlay-color="hsla(209, 100%, 56%, 0.73)"
               :overlay="true"
               :open.sync="articleEditVisible">
      <mu-paper :z-depth="3">
        <mu-flex justify-content="center">
          <mu-text-field style="margin: 10px" placeholder="搜索文章"></mu-text-field>
        </mu-flex>
        <mu-list>
          <div v-for="(item, index) in articles" :key="index">
            <mu-divider v-if="index === 0"></mu-divider>
            <mu-list-item :ripple="true">
              <mu-list-item-action>
                {{item.id}}
              </mu-list-item-action>
              <mu-list-item-sub-title style="width: 100%;">
                {{item.title}}
              </mu-list-item-sub-title>
              <mu-list-item-action>
                <mu-button @click="deleteArticleClick(item)" icon color="red">
                  <mu-icon value="delete"></mu-icon>
                </mu-button>
              </mu-list-item-action>
              <mu-list-item-action>
                <mu-button @click="editArticleClick(item)" icon color="primary">
                  <mu-icon value="edit"></mu-icon>
                </mu-button>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider></mu-divider>
          </div>
          <br>
          <mu-flex justify-content="center">
            <mu-pagination class="muse-pagination" @change="changePage" :page-count="3" :page-size="pageSize" raised
                           circle :total="total" :current.sync="current"></mu-pagination>
          </mu-flex>
          <br>
        </mu-list>
      </mu-paper>
      <mu-dialog width="300"
                 :scrollable="true"
                 transition="scale"
                 overlay-color="hsla(209, 100%, 56%, 0.73)"
                 :overlay="true"
                 :open.sync="deleteArticleVisible">
        <h3>确认删除？<span style="color: darkseagreen">{{selectedArticle.title}}</span></h3>
        <mu-flex justify-content="center">
          <mu-button @click="deleteArticleVisible = false">取消</mu-button>&nbsp;
          <mu-button @click="confirmDeleteArticleClick" color="red">确认</mu-button>
        </mu-flex>
      </mu-dialog>
    </mu-dialog>


    <!-- 文章分类Dialog -->
    <mu-dialog
        :scrollable="true"
        transition="scale"
        :lock-scroll="false"
        overlay-color="hsla(209, 100%, 56%, 0.73)"
        :overlay="true"
        width="600"
        :open.sync="categoriesEditVisible">
      <div>
        <p style="text-align: center">文章分类</p>
        <div style="display: flex;justify-content: center;flex-wrap: wrap;flex-direction: row;">
          <div style="margin: 9px" v-for="(item, index) in categories" :key="index"
               @click="showDetailsEditVisible('modify-category', item)">
            <a style="color: #0ea0ff;cursor: pointer;">{{item.name}}</a>
          </div>
        </div>
        <br>
        <mu-flex justify-content="center">
          <mu-button @click="showDetailsEditVisible('add-category', '')" color="primary">添加分类</mu-button>
        </mu-flex>
      </div>
    </mu-dialog>


    <!-- 标签Dialog -->
    <mu-dialog
        :scrollable="true"
        transition="scale"
        :lock-scroll="false"
        overlay-color="hsla(209, 100%, 56%, 0.73)"
        :overlay="true"
        width="600"
        :open.sync="tagsEditVisible">
      <div>
        <p style="text-align: center" class="tag">标签编辑</p>
        <div style="display: flex;justify-content: center;flex-wrap: wrap;flex-direction: row;">
          <mu-chip style="margin: 2px" @click="showDetailsEditVisible('modify-tag', item)" class="tag-chip"
                   v-for="(item, index) in tags" :key="index"
                   color="#36afdd">
            {{item.name}}
          </mu-chip>
        </div>
        <br>
        <mu-flex justify-content="center">
          <mu-button @click="showDetailsEditVisible('add-tag', '')" color="primary">添加标签</mu-button>
        </mu-flex>
      </div>
    </mu-dialog>

    <!-- 标签、分类操作Dialog -->
    <mu-dialog
        :scrollable="true"
        transition="scale"
        :lock-scroll="false"
        overlay-color="hsla(209, 100%, 56%, 0.73)"
        :overlay="true"
        :open.sync="detailsEditVisible">
      <div v-if="edit === 'modify-category'">
        <mu-text-field label="分类名称" full-width v-model="category.name"></mu-text-field>
        <mu-text-field label="分类介绍" v-model="category.description" multi-line :rows="3" full-width></mu-text-field>
        <mu-flex justify-content="center">
          <mu-button @click="deleteCategoryClick" color="red">确认删除</mu-button>&nbsp;
          <mu-button @click="modifyCategoryClick">确认修改</mu-button>
        </mu-flex>
      </div>
      <div v-if="edit === 'add-category'">
        <mu-text-field label="分类名称" full-width v-model="category.name"></mu-text-field>
        <mu-text-field label="分类介绍" v-model="category.description" multi-line :rows="3" full-width></mu-text-field>
        <mu-flex justify-content="center">
          <mu-button @click="addCategoryClick" color="success">添加</mu-button>
        </mu-flex>
      </div>
      <div v-if="edit === 'modify-tag'">
        <mu-text-field label="标签名称" full-width v-model="tag.name"></mu-text-field>
        <mu-text-field label="标签介绍" v-model="tag.description" multi-line :rows="3" full-width></mu-text-field>
        <mu-flex justify-content="center">
          <mu-button @click="deleteTagClick" color="red">确认删除</mu-button>&nbsp;
          <mu-button @click="modifyTagClick">确认修改</mu-button>
        </mu-flex>
      </div>
      <div v-if="edit === 'add-tag'">
        <mu-text-field label="标签名称" full-width v-model="tag.name"></mu-text-field>
        <mu-text-field label="标签介绍" v-model="tag.description" multi-line :rows="3" full-width></mu-text-field>
        <mu-flex justify-content="center">
          <mu-button @click="addTagClick" color="success">添加</mu-button>
        </mu-flex>
      </div>
    </mu-dialog>

    <!-- 个人信息Dialog -->
    <mu-dialog
        :scrollable="true"
        transition="scale"
        :lock-scroll="false"
        width="500"
        overlay-color="hsla(209, 100%, 56%, 0.73)"
        :overlay="true"
        :open.sync="infoEditVisible">
      <mu-form :model="userInfo" class="mu-demo-form" label-position="left" label-width="50">
        <mu-form-item prop="input" label="昵称">
          <mu-text-field v-model="userInfo.nickname"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="input" label="邮箱">
          <mu-text-field v-model="userInfo.email"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="input" label="电话">
          <mu-text-field v-model="userInfo.tel"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="input" label="签名">
          <mu-text-field :rows="3" full-width multi-line v-model="userInfo.signature"></mu-text-field>
        </mu-form-item>
      </mu-form>
      <mu-flex justify-content="center">
        <mu-button @click="modifyInfoClick" color="blue">修改</mu-button>
      </mu-flex>
    </mu-dialog>

  </div>
</template>

<script>
    import {
        insertArticle,
        listArticleYears,
        listArticles,
        countArticles,
        deleteArticleById,
        updateArticle
    } from "../../api/article";
    import {listAllTags, insertTag, updateTag, deleteTagById} from "../../api/tag";
    import {listAllCategories, insertCategories, updateCategories, deleteCategoriesById} from "../../api/categories";
    import {getUserById, updateUser} from "../../api/user";
    import {imageUpload} from "../../api/file";

    export default {
        name: "CreateCenter.vue",
        data() {
            return {
                current: 1,
                pageSize: 9,
                total: null,
                articleAddVisible: false,
                articleEditVisible: false,
                categoriesEditVisible: false,
                tagsEditVisible: false,
                detailsEditVisible: false,
                infoEditVisible: false,
                articleSubmitDialogVisible: false,
                articleTagsVisible: false,
                articleCategoriesVisible: false,
                deleteArticleVisible: false,
                edit: '',
                userInfo: {
                    id: '',
                    username: '',
                    nickname: '',
                    email: '',
                    tel: '',
                    signature: ''
                },
                tags: [],
                tag: {
                    id: '',
                    name: '',
                    description: ''
                },
                categories: [],
                category: {
                    id: '',
                    name: '',
                    description: ''
                },
                selectedTags: [],
                showTags: [],
                tagsMap: new Map(),
                selectedCategories: [],
                showCategories: [],
                categoriesMap: new Map(),
                article: {},
                articles: [],
                timeUpdateSwitch: true,
                recommendSwitch: false,
                selectedArticle: {},
                insertOrUpdate: '',
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: false, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: false, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                }
            }
        },
        methods: {
            init() {
                // this.userInfo = this.$store.getters.getUserInfo
                getUserById(1000).then(response => {
                    this.userInfo = response.content
                })
            },
            showArticleAddDialog() {
                this.insertOrUpdate = 'insert'
                this.articleAddVisible = true;
            },
            showArticleEditDialog() {

                this.$progress.start();
                let that = this

                countArticles().then(response => {
                    that.total = response.content

                    listArticles(that.current, that.pageSize).then(response => {
                        that.articles = response.content
                        this.$progress.done();
                    });

                });
                this.insertOrUpdate = 'update'
                this.articleEditVisible = true;
            },
            changePage() {
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
            showCategoriesEditVisible() {
                listAllCategories().then(response => {
                    this.categories = response.content
                })
                this.categoriesEditVisible = true
            },
            showTagsEditVisible() {
                listAllTags().then(response => {
                    this.tags = response.content
                })
                this.tagsEditVisible = true
            },
            showDetailsEditVisible(value, item) {
                this.edit = value
                switch (value) {
                    case 'modify-category':
                        this.category = item;
                        break;
                    case 'add-category':
                        this.category = {
                            id: '',
                            name: '',
                            description: ''
                        };
                        break;
                    case 'modify-tag':
                        this.tag = item;
                        break;
                    case 'add-tag':
                        this.tag = {
                            id: '',
                            name: '',
                            description: ''
                        };
                        break;

                }
                this.detailsEditVisible = true
            },
            showInfoEditVisible() {
                this.infoEditVisible = true;
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
                this.$router.push({path: '/control-center'})
            },
            logoutClick() {
                this.$store.dispatch('logout')
                this.$router.push({path: '/'})
            },
            saveArticle(value, render) {
                this.articleSubmitDialogVisible = true
            },
            submitForm() {

            },
            $imgAdd(pos, $file) {

                let formdata = new FormData();
                formdata.append('file', $file);
                imageUpload(formdata).then(response => {
                    this.$toast.success('上传成功')
                    this.$refs.md.$img2Url(pos,response.content)
                })
                // this.$axios({
                //     url: this.$store.state.host+'/fileUpload/imageUpload',
                //     method: 'post',
                //     data: formdata,
                //     headers: { 'Content-Type': 'multipart/form-data' }
                // }).then(response=>{
                //     this.$Message.info(response.data);
                //     // alert(response.data);
                //     this.$refs.md.$img2Url(pos,response.data)
                //     // $mv.$img2Url(pos,url);
                // });

            },
            addCategoryClick() {
                insertCategories(this.category).then(response => {
                    this.$toast.success(response.content);
                    this.articleAddVisible = false
                    this.detailsEditVisible = false
                    this.categoriesEditVisible = false
                })
            },
            addTagClick() {
                insertTag(this.tag).then(response => {
                    this.$toast.success(response.content);
                    this.detailsEditVisible = false
                    this.tagsEditVisible = false
                })
            },
            deleteCategoryClick() {
                deleteCategoriesById(this.category.id).then(response => {
                    this.$toast.success(response.content);
                    this.articleAddVisible = false
                    this.detailsEditVisible = false
                    this.categoriesEditVisible = false
                })
            },
            modifyCategoryClick() {
                updateCategories(this.category).then(response => {
                    this.$toast.success(response.content);
                    this.articleAddVisible = false
                    this.detailsEditVisible = false
                    this.categoriesEditVisible = false
                })
            },
            deleteTagClick() {
                deleteTagById(this.tag.id).then(response => {
                    this.$toast.success(response.content);
                    this.detailsEditVisible = false
                    this.tagsEditVisible = false
                })
            },
            modifyTagClick() {
                updateTag(this.tag).then(response => {
                    this.$toast.success(response.content);
                    this.detailsEditVisible = false
                    this.tagsEditVisible = false
                })
            },
            modifyInfoClick() {
                updateUser(this.userInfo).then(response => {
                    this.$toast.success(response.content);
                    this.infoEditVisible = false;
                })
            },
            showArticleCategoriesVisible() {
                let that = this
                listAllCategories().then(response => {
                    this.showCategories = response.content;
                    this.showCategories.forEach(element => {
                        that.categoriesMap.set(element.name, element.id);
                    })
                })
                this.articleCategoriesVisible = true
            },
            showArticleTagsVisible() {
                let that = this
                listAllTags().then(response => {
                    this.showTags = response.content;
                    this.showTags.forEach(element => {
                        that.tagsMap.set(element.name, element.id);
                    })
                })
                this.articleTagsVisible = true
            },
            submitArticleClick() {

                if (this.recommendSwitch === true) {
                    this.article.recommend = 1;
                } else {
                    this.article.recommend = 0;
                }

                if (this.timeUpdateSwitch === true) {
                    this.article.time = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                }

                this.article.creater = 1000

                let categoriesSubmit = []
                let tagsSubmit = []

                for (let i = 0; i < this.selectedCategories.length; i++) {
                    categoriesSubmit.push({
                        id: this.categoriesMap.get(this.selectedCategories[i]),
                        name: this.selectedCategories[i]
                    });
                }

                for (let i = 0; i < this.selectedTags.length; i++) {
                    tagsSubmit.push({
                        id: this.tagsMap.get(this.selectedTags[i]),
                        name: this.selectedTags[i]
                    })
                }

                let articleDTO = this.article
                articleDTO.categories = categoriesSubmit
                articleDTO.tags = tagsSubmit

                if (this.insertOrUpdate === 'insert') {
                    insertArticle(articleDTO).then(response => {
                        this.$toast.success(response.content)
                        this.articleAddVisible = false;
                        this.articleSubmitDialogVisible = false;
                        this.articleEditVisible = false;
                        this.clearInfo();
                    })
                } else if (this.insertOrUpdate === 'update') {
                    updateArticle(articleDTO).then(response => {
                        this.$toast.success(response.content)
                        this.articleAddVisible = false;
                        this.articleSubmitDialogVisible = false;
                        this.articleEditVisible = false;
                        this.clearInfo();
                    })
                }


            },
            editArticleClick(item) {

                let that = this

                listAllTags().then(response => {
                    this.showTags = response.content;
                    this.showTags.forEach(element => {
                        that.tagsMap.set(element.name, element.id);
                    })
                })

                listAllCategories().then(response => {
                    this.showCategories = response.content;
                    this.showCategories.forEach(element => {
                        that.categoriesMap.set(element.name, element.id);
                    })
                })

                this.selectedTags = []
                this.selectedCategories = []

                this.articleAddVisible = true
                this.article = item

                this.timeUpdateSwitch = true;
                if (this.article.recommend === 1) {
                    this.recommendSwitch = true;
                } else {
                    this.recommendSwitch = false;
                }


                for (let i = 0; i < item.tags.length; i++) {
                    this.selectedTags.push(item.tags[i].name)
                }

                for (let i = 0; i < item.categories.length; i++) {
                    this.selectedCategories.push(item.categories[i].name)
                }

            },
            deleteArticleClick(item) {
                this.selectedArticle = item
                this.deleteArticleVisible = true
            },
            confirmDeleteArticleClick() {
                deleteArticleById(this.selectedArticle.id).then(response => {
                    this.deleteArticleVisible = false
                    this.changePage()
                    this.$toast.success(response.content)
                })
            },
            clearInfo() {
                this.articleAddVisible = false
                this.article = {}
                this.selectedTags = []
                this.selectedCategories = []
                this.timeUpdateSwitch = true
                this.recommendSwitch = false
            }

        },
        created() {
            this.init()
        }
    }
</script>

<style scoped lang="scss">
  @media screen and (max-width: 700px) {
    .control-card {
      margin-top: 41px !important;
    }

    .control-card-item {
      margin: 0 !important;
    }
  }

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

  .control-card {
    margin-top: 70px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;

    .control-card-item {
      width: 100%;
      max-width: 700px;
      margin: 50px;

      .card-title {
        background: $theme-color;
        color: white;
        padding: 30px;
        text-align: center;
      }
    }
  }

  .v-note-wrapper.fullscreen {
    top: 60px !important
  }
</style>
