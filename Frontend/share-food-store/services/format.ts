export const formatDayTime = (dateString : string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${day}/${month}/${year}, ${hour}:${minute}`;
}

export const formatMessage = (message : string) => {
    let result = message.split(': ')[0];
    return result;
}