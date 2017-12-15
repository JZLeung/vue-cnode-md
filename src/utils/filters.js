import timeago from 'timeago.js'

// const test_local_dict = (number, index, total_sec) => {
//     // number: the timeago / timein number;
//     // index: the index of array below;
//     // total_sec: total seconds between date to be formatted and today's date;
//     return [
//         ['just now', 'right now'],
//         ['%s seconds ago', 'in %s seconds'],
//         ['1 minute ago', 'in 1 minute'],
//         ['%s minutes ago', 'in %s minutes'],
//         ['1 hour ago', 'in 1 hour'],
//         ['%s hours ago', 'in %s hours'],
//         ['1 day ago', 'in 1 day'],
//         ['%s days ago', 'in %s days'],
//         ['1 week ago', 'in 1 week'],
//         ['%s weeks ago', 'in %s weeks'],
//         ['1 month ago', 'in 1 month'],
//         ['%s months ago', 'in %s months'],
//         ['1 year ago', 'in 1 year'],
//         ['%s years ago', 'in %s years']
//     ][index]
// }
// // register your locale with timeago
// timeago.register('test_local', test_local_dict)
const timeagoInstance = timeago()

const dateFormat = date => {
    return timeagoInstance.format(new Date(date), 'zh_CN')
}

export default {
    dateFormat
}
