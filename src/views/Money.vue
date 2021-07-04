<template>
  <Layout classPrefix="layout">
    <NumberPad @update:value="onUpdateAmount" />
    <Types :value.sync="record.type" />
    <Notes @update:value="onUpdateNotes" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    {{ record }}
  </Layout>
</template>

<script lang="ts">
import Tags from '../components/MoneyPage/Tags.vue'
import Notes from '../components/MoneyPage/Notes.vue'
import NumberPad from '../components/MoneyPage/NumberPad.vue'
import Types from '../components/MoneyPage/Types.vue'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number
}
@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行', '烟酒']
  record: Record = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value)
  }
  onUpdateNotes(value: string) {
    this.record.notes = value
  }
  onUpdateTags(value: string[]) {
    this.record.tags = value
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped></style>
