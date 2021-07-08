<template>
  <div>
    <label class="formItem">
      <span class="name">{{ this.fildName }}</span>
      <input type="text" :placeholder="this.placeholder" v-model="value" />
    </label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class FormItem extends Vue {
  value = ''

  @Prop({ required: true }) fildName!: string
  @Prop() placeholder?: string

  @Watch('value')
  onValueChange(value: string) {
    this.$emit('update:value', this.value)
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 16px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>
