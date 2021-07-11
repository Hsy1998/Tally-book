<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="icon" />
      <span class="title">编辑标签</span>
      <span class="icon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem fild-name="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import tagListModel from '../../models/tagListModel'
import FormItem from '../MoneyPage/FormItem.vue'
import Buttom from '../Button.vue'

@Component({
  components: { FormItem, Buttom },
})
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id
    tagListModel.fetch()
    const tags = tagListModel.data
    const tag = tags.filter((t) => t.id === id)[0]
    if (tag) {
      console.log(tag)
    } else {
      this.$router.replace('/404')
    }
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
  button {
    background: #008c8c;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
  }
}
</style>
