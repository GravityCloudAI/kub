const moment = require('moment-timezone');

export const convertToReadableTime = (unixTimestamp) => {
    // Convert the Unix timestamp to milliseconds

    const isSeconds = unixTimestamp.toString().length <= 10;
    const dateInMilliseconds = isSeconds ? unixTimestamp * 1000 : unixTimestamp;

    // Format the date using moment-timezone to get the timezone abbreviation
    const formattedDate = moment(dateInMilliseconds).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss z');

    return formattedDate;
}

export const convertTimestampToReadableTimeWithTZ = (timestamp) => {
    // Convert the timestamp string to a Date object
    let date = new Date(timestamp);
    return convertToReadableTime(date.getTime())
}

export const convertUtcToLocal = (utcDateString) => {
    const utcDate = new Date(utcDateString);
    const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);

    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
    const seconds = String(localDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(localDate.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const calculateTimeDifference = (timestamp1, timestamp2) => {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    const diffInMilliseconds = Math.abs(date2 - date1);

    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);

    return parts.length > 0 ? parts.join(' ') : '0s';
}