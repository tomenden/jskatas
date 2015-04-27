/**
 * Created by tome on 2/26/2015.
 */
//http://www.codewars.com/kata/525f277c7103571f47000147/train/javascript

//function convertMinutesToClock(minutes) {
//    var hours = Math.floor(minutes / 60),
//        mins = minutes - (hours * 60),
//        arr = [hours, mins],
//        result = '';
//    for (i=0; i<=1; i+=1) {
//        arr[i] < 10 ? arr[i] = '0' + arr[i].toString() : arr[i] = arr[i].toString();
//    }
//    result += arr[0] + ':' + arr[1];
//    return result;
//}

//function calculateEndTime(startTime, add) {
//    var hr = Number(startTime.substring(0, 2)),
//        m = Number(startTime.substring(3)),
//        end = [];
//    if (m + add >= 60) {
//        hr += Math.floor((m + add) / 60);
//        m = (m + add) % 60;
//    } else {
//        m += add;
//    }
//    end.push(hr, m);
//    return end;
//}




function getStartTime(schedules, duration) {
    var busyTime = [],
        dayStart = 9 * 60,
        dayEnd = 19 * 60;
    for (i=0; i<schedules.length; i+=1) {
        for (j=0; j<schedules[i].length; j+=1) {
            var start = [].concat(schedules[i][j][0].split(":")),
                end = [].concat(schedules[i][j][1].split(":"));
            start = Number(start[0]) * 60 + Number(start[1]);
            end = Number(end[0]) * 60 + Number(end[1]);
            busyTime.push([start, end]);

        }
    }
    var test = null;
    for (var beginning=dayStart; beginning<=dayEnd-duration; beginning+=1) {
        var stop = beginning + duration;
        for (f=beginning; f<=stop; f+=1) {
            for (n=0; n<busyTime.length; n+=1) {
                if (f>busyTime[n][0] && f<busyTime[n][1]) {
                    test = false;
                    break;
                }

                else {
                    test = true;
                }
            }
            if (test === false) {
                break;
            }

        }
        if (test === true) {
            result = [Math.floor(beginning / 60), beginning % 60];
            for (i=0; i<2; i+=1) {
                if (result[i] < 10) {
                    result[i] = '0' + result[i].toString();
                } else {
                    result[i] = result[i].toString();
                }
            }
            return result[0] + ':' + result[1];
        }

    }
    if (!test) {
        return null;
    }
}
var schedules = [
    [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
    [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
    [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];
console.log(getStartTime(schedules, 75)); //should return 12:15

//function convertTimeToMinutes(time) {
//    var hours = Number(time.substring(0, 2));
//    var minutes = Number(time.substring(3));
//    return ((hours * 60) + minutes);
//}
//
//function getStartTime(schedules, duration) {
//    var workingMinutes = 600,
//        possible = [];
//    for(i = 0; i<schedules.length; i+=1) {
//        for (j=0; j<schedules[i].length; j+=1) {
//            var start = convertTimeToMinutes(schedules[i][j][0]),
//                end = convertTimeToMinutes(schedules[i][j][1]);
//        }
//    }
//}
//
//console.log(convertTimeToMinutes('01:59'));