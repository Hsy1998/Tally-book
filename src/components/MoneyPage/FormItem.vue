<template>
  <div>
    <label class="formItem">
      <span class="name">{{ this.fildName }}</span>
      <input
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="onValueChange($event.target.value)"
      />
    </label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class FormItem extends Vue {
  @Prop({ default: '' }) readonly value!: string

  @Prop({ required: true }) fildName!: string
  @Prop() placeholder?: string

  onValueChange(value: string) {
    this.$emit('update:value', value)
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
