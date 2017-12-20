import axios from '@/utils/axios'

export const Login = ({actoken}) => {
    return axios.post(
        `accesstoken`,
        {
            accesstoken: actoken
        }
    )
}

export const UserInfo = ({loginname}) => {
    return axios.get(`/user/${loginname}`)
}
