<template>
<div class="cnode-topic-page ">
    <mu-appbar :title="detail.title || ''">
        <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goBack"/>
        <mu-icon-button v-if="!detail.is_collect" icon="favorite_border" slot="right"/>
        <mu-icon-button v-if="detail.is_collect" icon="favorite" color="pink500" slot="right"/>

        <mu-icon-menu icon="more_vert" slot="right" >
            <mu-menu-item title="菜单 1"/>
            <mu-menu-item title="菜单 2"/>
            <mu-menu-item title="菜单 3"/>
            <mu-menu-item title="菜单 4"/>
            <mu-menu-item title="菜单 5"/>
        </mu-icon-menu>
    </mu-appbar>

    <div class="topic-detail content">
        <!-- 主题正文 -->
        <mu-card>
            <router-link :to="{name: 'UserInfo', params: {loginname: detail.author.loginname}}">
                <mu-card-header :title="detail.author.loginname" :subTitle="detail.create_at|dateFormat">
                    <mu-avatar :src="detail.author.avatar_url" slot="avatar"/>
                </mu-card-header>
            </router-link>
            <!-- <mu-card-title :title="detail.title" subTitle=""/> -->
            <mu-card-text>
                <div v-html="detail.content"></div>
            </mu-card-text>
            <mu-card-actions>
                <mu-icon-button icon="thumb_up"/>
                <mu-icon-button icon="reply"/>
            </mu-card-actions>
        </mu-card>

        <!-- 主题回复 -->
        <mu-card v-for="reply in detail.replies" :key="reply.id" :id="reply.id">
            <router-link :to="{name: 'UserInfo', params: {loginname: reply.author.loginname}}">
                <mu-card-header :title="reply.author.loginname" :subTitle="reply.create_at|dateFormat">
                    <mu-avatar :src="reply.author.avatar_url" slot="avatar"/>
                </mu-card-header>
            </router-link>
            <mu-card-text v-if="reply.reply_id && replies[reply.reply_id]" class="reply-text">
                <div v-html="replies[reply.reply_id].content"></div>
            </mu-card-text>
            <mu-card-text>
                <div v-html="reply.content"></div>
            </mu-card-text>
            <mu-card-actions>
                <mu-icon-button icon="thumb_up"/>
                <mu-icon-button icon="reply"/>
            </mu-card-actions>
        </mu-card>
    </div>
    <mu-back-top/>
</div>
</template>

<script>
import { getTopicDetail } from '@/api/topic'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            detail: {
                author: {},
                content: ''
            },
            replies: {},
            id: ''
        }
    },
    computed: {
        ...mapGetters(['loading', 'isLogin'])
    },
    methods: {
        getData() {
            getTopicDetail({id: this.id})
                .then(res => {
                    console.log(res)
                    this.detail = res.data
                    document.title = this.detail.title + this.$route.meta.title
                    this.detail.replies.map((reply) => {
                        this.replies[reply.id] = reply
                    })
                })
        },
        goBack() {
            history.back()
            // this.$router.go(-1)
        }
    },
    mounted() {
        this.id = this.$route.params.id
        this.getData()
        // let hash = this.$route.hash
        // if (hash) {
        //     hash = hash.split('#')[1]

        // }
        // console.log(this.$route)
    }
}
</script>

<style lang="scss"> 
.cnode-topic-page{
    .topic-detail{
        padding: 0 5px;
        .mu-card{
            margin: 10px 0;
        }
        .mu-card-header{
            padding: 10px
        }
        .mu-card-text{
            padding: 10px;
            &.reply-text {
                border-left: 5px solid #ddd;
                margin: 0 10px;
                color: #bbb;
            }
        }
    }
}
</style>
