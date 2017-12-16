<template>
    <div class="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
import { Login } from '@/api/user'

export default {
    name: 'app',
    methods: {
        autoLogin() {
            let actoken = Cookie.get('CNode-acToken')
            let userInfo = Cookie.get('CNode-userInfo')
            userInfo = userInfo ? JSON.parse(userInfo) : null
            if (userInfo && actoken) {
                this.$store.dispatch('setAcToken', actoken)
                this.$store.dispatch('setUserInfo', userInfo)
            } else if (actoken) {
                Login({actoken}).then(res => {
                    console.log(res)
                    delete res.success
                    this.setAcToken(actoken)
                    Cookie.set('CNode-acToken', actoken, { expires: 31 })
                    this.setUserInfo(res)
                    Cookie.set('CNode-userInfo', JSON.stringify(res), { expires: 31 })
                    // this.showPopup('登录成功', true)
                }).catch(err => {
                    console.error(err)
                    // this.showPopup('验证失败')
                })
            }
        }
    },
    mounted() {
        this.autoLogin()
    }
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
img{
    display: block;
    max-width: 100%;
}
p{
    margin: 5px 0;
}
</style>
