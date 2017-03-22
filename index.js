// Dependencies

const moment = require("moment");

// Days 
const birthday = moment("2011-01-05", "YYYY-MM-DD");
const today = moment()

// Functions
function isBirthday(birthday, today) {
    return birthday.date() === today.date() && birthday.month() === today.month();
}

function isFancyMonths(birthday, today) {
    const monthsSinceBirthday = today.diff(birthday, "months");
    if (monthsSinceBirthday % 10 === 0)
        return monthsSinceBirthday
    else
        return null;
}

function isFancyDays(birthday, today) {
    const daysSinceBirthday = today.diff(birthday, "days");
    if (daysSinceBirthday % 10 === 0)
        return daysSinceBirthday
    else
        return null;
}

function isFancyHours(birthday, today) {
    var startOfToday = moment(today.hours(00).minutes(00).seconds(00).milliseconds(1));
    var endOfToday = moment(today.hours(23).minutes(59).seconds(59).milliseconds(999));

    const startOfBirthday = moment(birthday.hours(00).minutes(00).seconds(00).milliseconds(1));
    const endOfBirthday = moment(birthday.hours(23).minutes(59).seconds(59).milliseconds(999));

    const maxTimeSinceBirthday = startOfToday.diff(endOfBirthday, "hours");
    const minTimeSinceBirthday = endOfToday.diff(startOfBirthday, "hours");

    for (var i = minTimeSinceBirthday; i < maxTimeSinceBirthday; i++) {
        if (i.toString().endsWith("00")) {
            return i
        }
    }
    return null;
}

function isFancyMinutes(birthday, today) {
    var startOfToday = moment(today.hours(00).minutes(00).seconds(00).milliseconds(1));
    var endOfToday = moment(today.hours(23).minutes(59).seconds(59).milliseconds(999));

    const startOfBirthday = moment(birthday.hours(00).minutes(00).seconds(00).milliseconds(1));
    const endOfBirthday = moment(birthday.hours(23).minutes(59).seconds(59).milliseconds(999));

    const minTimeSinceBirthday = startOfToday.diff(endOfBirthday, "minutes");
    const maxTimeSinceBirthday = endOfToday.diff(startOfBirthday, "minutes");

    for (var i = minTimeSinceBirthday; i < maxTimeSinceBirthday; i++) {
        if (i.toString().endsWith("00")) {
            return i
        }
    }
    return null;
}

function isFancySeconds(birthday, today) {
    var startOfToday = moment(today.hours(00).minutes(00).seconds(00).milliseconds(1));
    var endOfToday = moment(today.hours(23).minutes(59).seconds(59).milliseconds(999));

    const startOfBirthday = moment(birthday.hours(00).minutes(00).seconds(00).milliseconds(1));
    const endOfBirthday = moment(birthday.hours(23).minutes(59).seconds(59).milliseconds(999));

    const minTimeSinceBirthday = startOfToday.diff(endOfBirthday, "seconds");
    const maxTimeSinceBirthday = endOfToday.diff(startOfBirthday, "seconds");

    for (var i = minTimeSinceBirthday; i < maxTimeSinceBirthday; i++) {
        if (i.toString().endsWith("00")) {
            return i
        }
    }
    return null;
}


if (isBirthday(birthday, today)) {
    console.log("It's your birthday!")
}

months = isFancyMonths(birthday, today);
days = isFancyDays(birthday, today);
hours = isFancyHours(birthday, today);
minutes = isFancyMinutes(birthday, today);
seconds = isFancySeconds(birthday, today);

if (months)
    console.log(months + " months")
else if (days)
    console.log(days + " days")
else if (hours)
    console.log(hours + " hours")
else if (minutes)
    console.log(minutes + " minutes")
else if (seconds)
    console.log(seconds + " seconds")
else
    console.log("you have nothing to celebrate :(")