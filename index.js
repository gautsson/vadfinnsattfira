// Globals
var birthday;
const today = moment()

// Helper functions for finding occasions to celebrate
// ------------------------------------------------------
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
// ------------------------------------------------------

function checkForOccasion() {
    if (isBirthday(birthday, today)) {
        return "It's your birthday!"
    }

    months = isFancyMonths(birthday, today);
    days = isFancyDays(birthday, today);
    hours = isFancyHours(birthday, today);
    minutes = isFancyMinutes(birthday, today);
    seconds = isFancySeconds(birthday, today);

    if (months)
        return (months + " months")
    else if (days)
        return days + " days"
    else if (hours)
        return hours + " hours"
    else if (minutes)
        return minutes + " minutes"
    else if (seconds)
        return seconds + " seconds"
    else
        return "you have nothing to celebrate :("
}

function getResult() {
    const occasion = checkForOccasion()
    swal({
        title: "<h1>Congratulations!</h1>",
        text: "<h2>You can celebrate the fact that today you have lived for: </h2><h1 style='margin-top: 20px'>" + occasion + "!</h1>",
        confirmButtonText: "Yay!",
        html: true
    });
    // $("#answer").text("You can celebrate the fact that today you have lived for " + occasion + "!")
}

////////////

// Updates the hash in the url bar
function updateLocationHash() {
    var date = getSelectedDate();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hash = year + "-" + month + "-" + day
    window.location.hash = hash;
}

function getSelectedDate() {
    var day = parseInt($(".js-select-day").val());
    var month = parseInt($(".js-select-month").val());
    var year = parseInt($(".js-select-year").val());
    var date = new Date();
    date.setFullYear(year, month, day);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

// Set the starting date for the form
function setInitialDate() {
    var initialDate = new Date()
    initialDate.setFullYear(initialDate.getFullYear() - 20)

    if (window.location.hash.length > 1) {
        var hash = window.location.hash.substring(1).replace(/-/g, " ")
        var hashDate = new Date(hash)

        if (!isNaN(hashDate.getTime()))
            initialDate = hashDate
    }

    $(".js-select-day").val(initialDate.getDate())
    $(".js-select-month").val(initialDate.getMonth())
    $(".js-select-year").val(initialDate.getFullYear())
    birthday = moment(initialDate);
}

// Disable unavailable days when user selects a new month or year
function updateAvailableDays() {
    var day = parseInt($(".js-select-day").val());
    var month = parseInt($(".js-select-month").val());
    var year = parseInt($(".js-select-year").val());

    // Leap year check
    var leapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    $(".js-day").prop("disabled", false);
    switch (month) {
        case 1: // February
            if (leapYear) {
                $(".js-day-30, .js-day-31").prop("disabled", true);
                if (day > 29)
                    $(".js-select-day").val(29);
            } else {
                $(".js-day-29, .js-day-30, .js-day-31").prop("disabled", true);
                if (day > 28)
                    $(".js-select-day").val(28);
            }
            break;
        case 3: // April
        case 5: // June
        case 8: // September
        case 10: // November
            $(".js-day-31").prop("disabled", true);
            if (day > 30)
                $(".js-select-day").val(30);
            break;
    }
}




function setBirthdayFromHash() {
    setInitialDate()
    updateAvailableDays()
    // var date = getSelectedDate();
    // birthday = moment(date);
    // const occasion = checkForOccasion()
    // $("#answer").text(occasion)
}




function handleEvents() {
    // Enable back/forward navigation by listening to hash changes on the window.
    $(window).on("hashchange", setBirthdayFromHash)

    // On any change in the select elements
    $("select").on("change", function () {
        updateAvailableDays()
        updateLocationHash()
        var date = getSelectedDate();
        birthday = moment(date);
        $("#answer").text("")
        // const occasion = checkForOccasion()
        // $("#answer").text()
    })
}



function nextMove() {
    document.getElementById("tlt2").style.visibility = "visible";
    $('.tlt2').textillate({ in: {
            callback: function () {
                const elements = document.getElementsByClassName("last-visible")
                for (var i = 0; i < elements.length; i++)
                    elements[i].style.visibility = "visible"
            }
        },
    });
}


// Startup function
$(function () {
    setBirthdayFromHash()
    handleEvents()
    $('.tlt').textillate({ in: {
            // effect: 'fadeInRightBig',
            // sync: true,
            // delayScale: 1,
            callback: nextMove
        },
    });
})