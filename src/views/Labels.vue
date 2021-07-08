<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        :to="`/labels/edit/${tag.id}`"
        v-for="tag in tags"
        :key="tag.id"
      >
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import tagListModel from '../models/tagListModel'
import Button from '../components/Button.vue'

tagListModel.fetch()
@Component
export default class labels extends Vue {
  tags = tagListModel.data
  createTag() {
    const name = window.prompt('请输入标签名')
    if (name) {
      const message = tagListModel.create(name)
      if (message === 'duplicated') {
        window.alert('标签不能重复')
      } else if (message === 'success') {
        window.alert('新建标签成功')
      }
    } else {
      window.alert('标签名不能为空')
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  .tag {
    display: flex;
    min-height: 44px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    svg {
      color: #333;
      margin-right: 16px;
      width: 18px;
      height: 18px;
    }
  }
  .createTag {
    background: #2355fa;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
    &-wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
    }
  }
}
</style>
