<template>
  <div class="side-list">
    <mu-auto-complete @select="select" class="search" :data="searchContent" label="本站搜索" v-model="selectItem" open-on-focus></mu-auto-complete>
<!--    <mu-text-field class="search" placeholder="本站搜索"></mu-text-field>-->
    <div class="categories">
      <p class="categories-header title">文章分类</p>
      <div v-for="(item, index) in categories" :key="index">
        <a @click="categoryClick(item)" class="categories-item">{{item.name}}</a>
        <mu-divider></mu-divider>
      </div>
    </div>
    <div>
      <p class="tag title">标签云</p>
      <mu-chip @click="tagClick(item)" class="tag-chip" v-for="(item, index) in tags" :key="index" :color="randColor[Math.floor(Math.random()*(randColor.length))]">
        {{item.name}}
      </mu-chip>
    </div>
    <div class="recommend">
      <p class="recommend-title title">推荐文章</p>

      <div v-for="(item, index) in articles">
        <table>
          <tr>
            <td>
              <img @click="recommendClick(item)" class="recommend-image pointer" :src="item.showImage">
            </td>
            <td>
              <div class="recommend-info">
                <a @click="recommendClick(item)" class="recommend-generalize">
                  {{item.generalize}}
                </a>
                <span @click="recommendClick(item)" class="recommend-time pointer">{{item.time}}</span>
              </div>
            </td>
          </tr>
        </table>

      </div>

    </div>

  </div>
</template>

<script>
    import {listAllCategories} from "../../api/categories";
    import {listAllTags} from "../../api/tag";
    import {listRecommendArticles} from "../../api/article";
    import {selectAllValues} from "../../api/web";

    export default {
        name: "SideList",
        data() {
            return {
                searchContent: [],
                contentMap: null,
                selectItem: '',
                categories: [],
                tags: [],
                articles: [],
                randColor: [
                    'red500', 'purple500', 'pink500', 'deep Purple500', 'indigo500', 'blue500', 'lightBlue500', 'cyan500', 'teal500', 'green500', 'lightGreen500', 'lime500', 'amber500', 'yellow700', 'orange500', 'deepOrange500', 'brown500', 'blueGrey500', 'grey500'
                ]
            }
        },
        methods: {
            init() {

                listAllCategories().then(response => {
                    this.categories = response.content
                });
                listAllTags().then(response => {
                    this.tags = response.content
                });
                listRecommendArticles().then(response => {
                    this.articles = response.content
                });
                selectAllValues().then(response => {
                    
                    this.contentMap = new Map()
                    
                    let data = response.content

                    for (let i = 0; i < data.length; i++) {
                        let value = data[i].id + ' : ' + data[i].title
                        this.contentMap.set(value, data[i].id)
                        this.searchContent.push(value)
                    }

                })
            },
            select(value, item) {
                if (item !== undefined) {
                    this.$router.push({name: 'Article', params: {id: this.contentMap.get(item)}})
                }

            },
            categoryClick(item) {
                this.$router.push({name: 'Categories', params: {name: item.name}})
            },
            tagClick(item) {
                this.$router.push({name: 'Tag', params: {name: item.name}})
            },
            recommendClick(item) {
                this.$router.push({name: 'Article', params: {id: item.id}})
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped lang="scss">


  @media screen and (max-width: 768px) {
    .recommend-image {
      max-width: 110px;
    }
    .recommend-generalize {
      /*line-height: 30px;*/
    }
  }

  .side-list {
    margin: 20px;

    .search {
      width: 100%;
      color: $side-bar-color;
    }

    .categories {
      .categories-item {
        color: #666;
        line-height: 40px;
        margin-left: 17px;
        cursor: pointer;
      }

      .categories-header {
        border-left: 4px solid $side-bar-color;
        padding: 10px 15px;
        color: rgb(119, 119, 119);
        /*background-color: rgba(102, 158, 196, 0.1);*/
      }

      .categories-item:hover {
        color: $theme-widget-color;
      }
    }

    .tag {
      border-left: 4px solid $side-bar-color;
      padding: 10px 15px;
      color: rgb(119, 119, 119);
      /*background-color: rgba(102, 158, 196, 0.1);*/
    }

    .tag-chip {
      margin: 5px;
      border-radius: 4px;
    }

    .recommend {
      .recommend-title {
        border-left: 4px solid $side-bar-color;
        padding: 10px 15px;
        color: #666;
        /*background-color: rgba(102, 158, 196, 0.1);*/
      }

      .recommend-info {
        display: block;
        /*width: calc(100% - 80px);*/
        padding: 8px 10px;
        line-height: 1.3;

        .recommend-generalize {
          cursor: pointer;
          color: #666;
          width: 100%;
          font-size: 1em;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .recommend-generalize:hover {
          color: $theme-widget-color;
        }

        .recommend-time {
          font-size: 12px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }


      }

      .recommend-image {
        padding-left: 7px;
        object-fit: cover;
        /*width: 100%;*/
        position: relative;
        display: block;
        width: 80px;
        height: 50px;
        overflow: hidden;
        /*margin-bottom: 5px;*/
      }

    }
  }
</style>