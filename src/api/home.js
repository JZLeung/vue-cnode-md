import axios from '@/utils/axios'

export const getTopicList = ({tab, page}) => {
    return axios(`topics?tab=${tab}&page=${page}`)
}
