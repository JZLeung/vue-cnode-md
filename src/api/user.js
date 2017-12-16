import axios from '@/utils/axios'

export const Login = ({actoken}) => {
    return axios.post(
        `accesstoken`,
        {
            accesstoken: actoken
        }
    )
}
