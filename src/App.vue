<template>
  <router-view />
</template>

<script>

export default {
    name: 'app'
}
</script>

<style>
/* 此处设置为 100% 让 InfiniteScroll 能正常工作
 * https://github.com/museui/muse-ui/issues/380
 */
html, body {
    height: 100%;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
