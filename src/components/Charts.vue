<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as echarts from 'echarts'
import { Component, Prop } from 'vue-property-decorator'
import { EChartsOption } from 'echarts'

@Component({})
export default class Charts extends Vue {
  @Prop() options?: EChartsOption
  mounted() {
    const myChart = echarts.init(this.$refs.wrapper as HTMLDivElement)
    console.log(myChart)

    myChart.setOption(this.options!)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}
</style>
