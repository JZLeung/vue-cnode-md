<template>
<div class="user-info-page">
    <mu-appbar :title="user.loginname">
        <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goBack"/>
        <!-- <mu-flat-button label="ddd" slot="right"/> -->
        <!-- <mu-icon-button icon="expand_more" slot="right"/> -->
        <mu-icon-menu icon="more_vert" slot="right" v-if="loginuser.loginname && loginuser.loginname === user.loginname">
            <mu-menu-item title="退出登录" @click.native="logout"/>
        </mu-icon-menu>
    </mu-appbar>
    <div class="user-info-box content">
        <div class="user-avatar">
            <mu-avatar :src="user.avatar_url" :size="100"/>
        </div>
        <h2 class="user-loginname">
            {{user.loginname}}
            <small>注册于：{{user.create_at | dateFormat}}</small>
        </h2>
    </div>

    <div class="item-list">
        <mu-list>
            <mu-sub-header>TA 的主题</mu-sub-header>
            <template v-for="topic in topics" :id="topic.id" >
                <mu-list-item :title="topic.title" :key="topic.id" @click.native="gotoTopic(topic.id)">
                    <mu-avatar :src="topic.author.avatar_url" slot="leftAvatar"/>
                    <span slot="describe">
                        最后回复 - <span class="last-reply">{{topic.last_reply_at | dateFormat}}</span>
                    </span>
                </mu-list-item>
                <mu-divider inset/>
            </template>
        </mu-list>
        <!-- <mu-card v-for="topic in topics" :key="topic.id" :id="topic.id">
            <mu-card-header :title="topic.author.loginname" :subTitle="topic.last_reply_at|dateFormat">
                <mu-avatar :src="topic.author.avatar_url" slot="avatar"/>
            </mu-card-header>
        </mu-card> -->
    </div>
    <div class="item-list">
        <mu-list>
            <mu-sub-header>TA 的回复</mu-sub-header>
            <template v-for="reply in replys" :id="reply.id" >
                <mu-list-item :title="reply.title" :key="reply.id" @click.native="gotoTopic(reply.id)">
                    <mu-avatar :src="reply.author.avatar_url" slot="leftAvatar"/>
                    <span slot="describe">
                        最后回复 - <span class="last-reply">{{reply.last_reply_at | dateFormat}}</span>
                    </span>
                </mu-list-item>
                <mu-divider inset/>
            </template>
        </mu-list>
    </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {UserInfo} from '@/api/user'
import cookie from 'js-cookie'

export default {
    data() {
        return {
            user: {},
            topics: [],
            // loginname: ''
            replys: []
        }
    },
    computed: {
        ...mapGetters({
            loginuser: 'user'
        })
    },
    methods: {
        ...mapActions({
            storeLogout: 'logout'
        }),
        goBack() {
            history.back()
        },
        gotoTopic(id) {
            this.$router.push({
                name: 'Topic',
                params: {id}
            })
        },
        logout() {
            this.storeLogout()
            cookie.remove('CNode-acToken')
            cookie.remove('CNode-userInfo')
        }
    },
    mounted() {
        let loginname = this.$route.params.loginname
        document.title = loginname + document.title
        UserInfo({loginname}).then(res => {
            res = res.data
            let user = res
            this.topics = res.recent_topics
            this.replys = res.recent_replies
            delete user.recent_replies
            delete user.recent_topics
            this.user = user
        })
    }
}
</script>

<style lang="scss" scoped>
.user-info-box{
    padding: 10px 50px;
    margin: 5px auto;
    .user-avatar{
        width: 120px;
        margin: 20px auto;
    }
    .user-loginname{
        text-align: center;
        font-size: 24px;
        small{
            display: block;
            font-size: 0.5em;
            color: #999
        }
    }
    .mu-card{
        margin: 10px 0;
    }
}
</style>
