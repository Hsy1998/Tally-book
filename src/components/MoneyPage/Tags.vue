<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import createTag from '@/mixins/tagHelper'

@Component
export default class Tags extends mixins(createTag) {
  get tagList() {
    return this.$store.state.tagList
  }

  created() {
    this.$store.commit('fetchTags')
  }
  selectedTags: string[] = []
  toggle(tag: string) {
    let index = this.selectedTags.indexOf(tag)
    if (index >= 0) {
      this.selectedTags.splice(index, 1)
    } else {
      this.selectedTags.push(tag)
    }
    this.$emit('update:value', this.selectedTags)
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  background: white;
  > .current {
    display: flex;
    flex-wrap: wrap;
    $bg: #d9d9d9;
    > li {
      background: $bg;
      height: 24px;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;
      line-height: 24px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 30%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
