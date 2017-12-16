<template>
<div class="cnode-login-page">
    <mu-appbar title="登录">
        <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goBack"/>
    </mu-appbar>
    <div class="cnode-login-form">
        <p>请输入您的 AccessToken :</p>
        <mu-text-field label="AccessToken" labelFloat fullWidth v-model="form.actoken"/><br/>
        <div>
            <small>不知道如何获取 AccessToken? <a href="https://cnodejs.org/setting">点击此处复制</a></small>
        </div>
        <p style="text-align: center">
            <mu-raised-button label="登录" class="demo-raised-button" primary @click.native="submit"/>
        </p>
    </div>
    <mu-popup position="top" :overlay="false" popupClass="msg-popup-top" :open="topPopup">
        {{message}}
    </mu-popup>
</div>
</template>

<script>
import {Login} from '@/api/user'
import {mapActions} from 'vuex'
import Cookie from 'js-cookie'

export default {
    data() {
        return {
            form: {
                actoken: ''
            },
            message: '',
            topPopup: false
        }
    },
    methods: {
        ...mapActions(['setUserInfo', 'setAcToken']),
        goBack() {
            this.$router.go(-1)
        },
        showPopup(msg, success = false, delay = 1000) {
            this.message = msg
            this.topPopup = true
            setTimeout(() => {
                if (!success) {
                    this.topPopup = false
                } else {
                    this.$router.go(-1)
                }
            }, delay)
        },
        submit() {
            if (!this.form.actoken) {
                this.showPopup('请填写您的 AccessToken')
                return
            }
            Login(this.form).then(res => {
                console.log(res)
                delete res.success
                this.setAcToken(this.form.actoken)
                Cookie.set('CNode-acToken', this.form.actoken, { expires: 31 })
                this.setUserInfo(res)
                Cookie.set('CNode-userInfo', JSON.stringify(res), { expires: 31 })
                this.showPopup('登录成功', true)
            }).catch(err => {
                console.error(err)
                this.showPopup('验证失败')
            })
        }
    }
}
</script>

<style lang="scss">
.cnode-login-page{
    .cnode-login-form{
        width: 60%;
        margin: 50px auto;
    }
}
    .msg-popup-top {
        width: 100%;
        opacity: .8;
        height: 56px;
        line-height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 400px;
    }
</style>
