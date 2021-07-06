<template>
  <Layout>
    <ol class="tags">
      <li>
        <span>衣</span>
        <Icon name="right" />
      </li>
      <li>
        <span>食</span>
        <Icon name="right" />
      </li>
      <li>
        <span>住</span>
        <Icon name="right" />
      </li>
      <li>
        <span>行</span>
        <Icon name="right" />
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  li {
    display: flex;
    min-height: 44px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    svg {
      color: #333;
      margin-right: 16px;
      width: 18px;
      height: 18px;
    }
  }
}
.createTag {
  background: #2355fa;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
