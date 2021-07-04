<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="在这里添加备注" v-model="value" />
    </label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

@Component
export default class Notes extends Vue {
  value = ''
  @Watch('value')
  onValueChange(value: string) {
    this.$emit('update:value', this.value)
  }
}
</script>

<style lang="scss" scoped>
.notes {
  display: block;
  background: #f5f5f5;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>
