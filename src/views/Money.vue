<template>
  <Layout classPrefix="layout">
    <NumberPad />
    <Types :xxx="333" />
    <Notes />
    <Tags />
  </Layout>
</template>

<script lang="ts">
import Tags from '../components/MoneyPage/Tags.vue'
import Notes from '../components/MoneyPage/Notes.vue'
import NumberPad from '../components/MoneyPage/NumberPad.vue'
import Types from '../components/MoneyPage/Types.vue'
export default {
  name: 'Money',
  components: {
    Tags,
    Notes,
    NumberPad,
    Types,
  },
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped></style>
