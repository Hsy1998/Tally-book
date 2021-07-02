<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Types extends Vue {
  type = '-'
  @Prop(Number) xxx: number | undefined
  // Prop 告诉 Vue xxx 不是 data 是 prop
  // Number 告诉 Vue xxx 运行时是个Number             !运行时报错
  // xxx 属性名
  // number | undefined 就是告诉 Ts xxx 编译时的类型   !编译时报错
  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknow')
    }
    this.type = type
  }

  mounted() {
    console.log(typeof this.xxx)
    console.log(typeof this.xxx.toString())
  }
}

// export default {
//   data() {
//     return {
//       type: '-' // '-'表示支出,'+'表示收入
//     }
//   },
//   props: ['xxx'],
//   mounted() {
//     console.log(this.xxx);
//   },
//    methods: {
//       selectType(type) {
//         if (type !== '-' && type !== '+') {
//           throw new Error('type is unknow')
//         }
//         this.type = type
//       }
//     },
// }
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>
