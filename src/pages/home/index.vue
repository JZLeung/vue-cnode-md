<template>
    <div class="cnode-home-page">
        <mu-appbar :title="title">
            <mu-icon-button icon="menu" slot="left" @click.native="toggleDrawer"/>
            <!-- <mu-flat-button label="ddd" slot="right"/> -->
            <!-- <mu-icon-button icon="expand_more" slot="right"/> -->
        </mu-appbar>

        <mu-drawer :open="showDrawer" :docked="false" @close="toggleDrawer">
            <mu-appbar title="登录" v-if="!isLogin">
                <mu-flat-button label="登录" class="demo-flat-button" :to="{name: 'UserLogin'}"/>
            </mu-appbar>
            <mu-appbar :title="user.loginname" v-else>
                <mu-avatar slot="left" :src="user.avatar_url"/>
            </mu-appbar>
            <mu-list>
                <template v-for="(item, index) in menu">
                    <mu-list-item  :key="index" :title="item.title" @click="goto(item)">
                    <mu-icon 
                        :value="tab === item.to ? 'lens' : 'panorama_fish_eye'" 
                        slot="left" 
                        :size="tab === item.to ? 14 : 12" 
                        :color="tab === item.to ? 'deepPurple500' : ''" />
                    </mu-list-item>
                    <mu-divider inset/>
                </template>
            </mu-list>
        </mu-drawer>

        <mu-list ref="list">
            <template v-for="(item, index) in data" >
                <mu-list-item :title="item.title" :key="index" @click.native="gotoTopic(item.id)">
                    <mu-avatar :src="item.author.avatar_url"  slot="leftAvatar"/>
                    <span slot="describe">
                        <template v-if="item.good || item.top">
                            <mu-chip v-if="item.good" class="small-chip" backgroundColor="green400" color="white">精华</mu-chip>
                            <mu-chip v-if="item.top" class="small-chip" backgroundColor="purple500" color="white">置顶</mu-chip>
                        </template>
                        <mu-chip v-else class="small-chip">{{tabs[item.tab]}}</mu-chip>
                        {{item.author.loginname}} - 
                        {{item.create_at | dateFormat}} -
                        {{item.reply_count}} 回复 
                        <!-- - {{item.visit_count}} 次浏览 -->
                    </span>
                </mu-list-item>
                <mu-divider inset/>
            </template>
        </mu-list>
        <mu-infinite-scroll :scroller="scroller" :loading="loadMore" @load="loadMoreData" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getTopicList } from '@/api/topic'

export default {
    name: 'Home',
    data() {
        return {
            menu: [
                {
                    title: '首页',
                    icon: 'home',
                    to: ''
                },
                {
                    title: '问答',
                    icon: 'help',
                    to: 'ask'
                },
                {
                    title: '分享',
                    icon: '',
                    to: 'share'
                },
                {
                    title: '招聘',
                    icon: '',
                    to: 'job'
                },
                {
                    title: '精华',
                    icon: '',
                    to: 'good'
                }
            ],
            title: '首页',
            tab: '',
            data: [],
            page: 1,
            showDrawer: false,
            loadMore: false,
            scroller: null
        }
    },
    computed: {
        ...mapGetters(['loading', 'user', 'isLogin']),
        tabs() {
            let tabs = {}
            this.menu.map((item) => {
                if (item.to !== '') {
                    tabs[item.to] = item.title
                }
            })
            return tabs
        }
    },
    methods: {
        ...mapActions(['setLoading']),
        toggleDrawer() {
            this.showDrawer = !this.showDrawer
        },
        getData() {
            let payload = {
                tab: this.tab,
                page: this.page
            }
            getTopicList(payload).then(res => {
                console.log(res)
                this.data = this.data.concat(res.data)
                this.loadMore = false
            })
        },
        loadMoreData() {
            console.log('loadMore')
            this.loadMore = true
            this.page ++
            this.getData()
        },
        goto(item) {
            this.tab = item.to
            this.title = item.title
            this.page = 1
            this.data.splice(0, this.data.length)
            console.log(item)
            this.toggleDrawer()
            this.getData()
        },
        gotoTopic(id) {
            this.$router.push({
                name: 'Topic',
                params: {id}
            })
        }
    },
    mounted() {
        // this.scroller = this.$refs.list.$el
        this.scroller = this.$el
        console.log(this.scroller)
        console.log(this.$refs.list.$el)
        this.getData()
    }
}
</script>

<style>
.cnode-home-page{
    /* width: 256px; */
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
.small-chip{
    line-height: 1.5em;
    padding: 0 6px;
    font-size: 12px;
    /* color: #fff; */
}
</style>
