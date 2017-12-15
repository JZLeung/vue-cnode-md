import axios from '@/utils/axios'

export const getTopicDetail = ({id}) => {
    return axios(`topic/${id}`)
}

export const getTopicList = ({tab, page}) => {
    return axios(`topics?tab=${tab}&page=${page}`)
}
