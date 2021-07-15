<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="icon" @click.native="goBack" />
      <span class="title">编辑标签</span>
      <span class="icon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="tag.name"
        fild-name="标签名"
        @update:value="update"
        placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <Button class="button" @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import FormItem from '../MoneyPage/FormItem.vue'
import Buttom from '../Button.vue'
import store from '@/store/index2.ts'

@Component({
  components: { FormItem, Buttom },
})
export default class EditLabel extends Vue {
  tag?: { id: string; name: string } = undefined
  created() {
    this.tag = store.findTag(this.$route.params.id)
    if (!this.tag) {
      this.$router.replace('/404')
    }
  }
  update(name: string) {
    if (this.tag) {
      store.updateTag(this.tag.id, name)
    }
  }
  remove() {
    if (this.tag) {
      if (store.removeTag(this.tag.id)) {
        window.alert('删除成功')
        this.$router.back()
      }
    }
  }
  goBack() {
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  font-size: 16px;
  padding: 16px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
  padding: 2px 0;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>
