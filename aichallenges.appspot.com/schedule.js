/**
 * Created by tome on 4/22/2015.
 */



function Schedule(courses) {
    this.courses = courses;
}

Schedule.prototype.createOverlapArr = function () {
    var courses = this.courses;
    var arr = [];
    for (var i =0 ; i < courses.length; i += 1) {
        var overlap = [];
        overlap.push(i);
        arr.forEach(function (currentArr) {
            if (currentArr.indexOf(i) >= 0) {
                overlap.push(currentArr[0]);
            }
        });
        for (var j = i + 1; j < courses.length; j += 1) {
            if ((courses[j][1] >= courses[i][1] && courses[j][1] <= courses[i][2])
                || (courses[j][2] >= courses[i][1] && courses[j][2] <= courses[i][2])
                || (courses[j][1] < courses[i][1] && courses[j][2] > courses[i][1])) {
                overlap.push(j);

            }
        }
        arr.push(overlap);
    }
    return this.overlappingCourses = arr;
};

/*
 Helper function to remove items from array. toRemove is an array or a single string
 */
function removeFromArr (arr, toRemove) {
    var result = [];
    if (!Array.isArray(toRemove)) {
        toRemove = [].concat(toRemove);
    }
    for (var i = 0; i < arr.length; i += 1) {
        var item = arr[i];
        if (toRemove.indexOf(item) < 0) {
            result.push(item);
        }
    }
    return result;
}

// Recursion function
// TODO: Refactor - currently taking too much memory for Hard Test (250 courses)
Schedule.prototype.createAllPossibleSchedulesWithCourse = function (course) {
    var result = [];
    var courses = this.courses;
    var allOverlappingCourses = this.overlappingCourses;
    var overlappingCoursesForCourse = allOverlappingCourses[course];
    var viableOptions = [];
    // make single course schedule and push to results
    var singleCourseSchedule = [course];
    result.push(singleCourseSchedule);
    // create viable options that don't intersect with current course
    for (var i = 0; i < courses.length; i += 1) {
        if (overlappingCoursesForCourse.indexOf(i) < 0) {
            viableOptions.push(i);
        }
    }
    // initial call to createSchedule
    createSchedule(singleCourseSchedule, viableOptions);
    function createSchedule (currentSchedule, remainingOptions) {
        // base
        if (remainingOptions.length === 0) {
            return;
        } else
        { // recursion condition
            var newCourse = remainingOptions.shift();
            var newRemainingOptions = remainingOptions.slice();
            var newSchedule = currentSchedule.slice();
            var overlappingWithNewCourse = allOverlappingCourses[newCourse];
            newSchedule.push(newCourse);
            result.push(newSchedule);
            newRemainingOptions = removeFromArr(newRemainingOptions, overlappingWithNewCourse);
            createSchedule(newSchedule, newRemainingOptions);
            createSchedule(currentSchedule, remainingOptions);
        }
    }
    return result;
};

/*
    returns [max, winningSchedulesIndexes] TODO: Refactor!
 */
Schedule.prototype.determineBestOptionFromPossibleSchedules = function (possibleSchedules) {
    var courses = this.courses;
    var scores = [];
    var max = -1;
    var indexOfWinner, winningSchedule;
    //TODO: Combine both for loops into one, and maybe also third
    // create scores array
    for (var i = 0; i < possibleSchedules.length; i += 1) {
        var score = 0;
        for (var j = 0; j < possibleSchedules[i].length; j += 1) {
            var course = courses[possibleSchedules[i][j]];
            score += course[3];
        }
        scores.push(score);
    }
    // determine index of maximum
    for (var m = 0; m < scores.length; m += 1) {
        if (scores[m] > max) {
            max = scores[m];
            indexOfWinner = m;
        }
    }
    winningSchedule = possibleSchedules[indexOfWinner];
    //// transform winning schedule from array of indexes to array of NAMES
    //for (var k = 0; k < winningSchedule.length; k += 1) {
    //    winningSchedule[k] = courses[winningSchedule[k]][0];
    //}
    return [max, winningSchedule];
};

Schedule.prototype.findBestOfBest = function (arrOfMaxAndIndexes) {
    var max = -1;
    var winningScheduleIndexes;
    var winningScheduleNames = [];
    for (var i = 0; i < arrOfMaxAndIndexes.length; i += 1) {
        if (arrOfMaxAndIndexes[i][0] > max) {
            max = arrOfMaxAndIndexes[i][0];
            winningScheduleIndexes = arrOfMaxAndIndexes[i][1];
        }
    }
    for (var j = 0; j < winningScheduleIndexes.length; j += 1) {
        winningScheduleNames[j] = this.courses[winningScheduleIndexes[j]][0];
    }
    //// transform winning schedule from array of indexes to array of NAMES
    //for (var k = 0; k < winningSchedule.length; k += 1) {
    //    winningSchedule[k] = courses[winningSchedule[k]][0];
    //}
    console.log(max);
    return winningScheduleNames;
};

var testSchedule = [
    [
        "Lying With Statistics 108",
        943,
        1407,
        148
    ],
    [
        "Numbers Between 89012355 And 89012375 101",
        115,
        805,
        47
    ],
    [
        "Lojban 110",
        2232,
        2359,
        36
    ],
    [
        "Astrology 106",
        2156,
        2303,
        0
    ],
    [
        "Occult Studies 109",
        437,
        1147,
        69
    ],
    [
        "Hacking Your Grades 103",
        1807,
        2000,
        36
    ],
    [
        "Phobosophy 107",
        409,
        838,
        19
    ],
    [
        "Numbers Between 89012355 And 89012375 104",
        1054,
        1410,
        138
    ],
    [
        "Lojban 102",
        1517,
        2157,
        101
    ],
    [
        "Voluntary Detention 105",
        37,
        506,
        21
    ]
];

function run(courses) {
    var schedule = new Schedule(courses);
    var arrOfMaxesAndIndexes = [];
    schedule.createOverlapArr();
    for (var i = 0; i < courses.length; i += 1) {
        var possibleScheduleForCourse = schedule.createAllPossibleSchedulesWithCourse(i);
        var arrOfMaxesAndIndexesForCourse = schedule.determineBestOptionFromPossibleSchedules(possibleScheduleForCourse);
        arrOfMaxesAndIndexes.push(arrOfMaxesAndIndexesForCourse);
    }
    return schedule.findBestOfBest(arrOfMaxesAndIndexes);
}
console.log(run(testSchedule));


var hardtest = [
    [
        "Lying With Statistics 319",
        236,
        246,
        120
    ],
    [
        "Philosophy 293",
        2106,
        2210,
        160
    ],
    [
        "Astrology 208",
        1155,
        1235,
        70
    ],
    [
        "Astrology 186",
        1640,
        1734,
        148
    ],
    [
        "Defense Against Defense Against the Dark Arts 238",
        238,
        311,
        97
    ],
    [
        "Numbers Between Twenty and Forty 212",
        518,
        618,
        195
    ],
    [
        "Magic 131",
        230,
        256,
        53
    ],
    [
        "Chemistry 141",
        717,
        734,
        175
    ],
    [
        "Numbers Between Twenty and Forty 269",
        500,
        621,
        181
    ],
    [
        "Voluntary Detention 173",
        424,
        440,
        196
    ],
    [
        "Antisociology 128",
        520,
        602,
        142
    ],
    [
        "Biology 322",
        658,
        702,
        93
    ],
    [
        "Unreal Analysis 159",
        132,
        254,
        96
    ],
    [
        "Occult Studies 299",
        1301,
        1320,
        9
    ],
    [
        "Philosophy 170",
        1617,
        1709,
        56
    ],
    [
        "Magic: The Gathering 239",
        1154,
        1255,
        112
    ],
    [
        "Defense Against Defense Against the Dark Arts 256",
        2326,
        2356,
        180
    ],
    [
        "Lying With Statistics 331",
        2016,
        2039,
        193
    ],
    [
        "Lying With Statistics 182",
        225,
        321,
        25
    ],
    [
        "Physics 158",
        1039,
        1143,
        85
    ],
    [
        "Lying With Statistics 202",
        45,
        149,
        108
    ],
    [
        "Magic: The Gathering 252",
        937,
        1047,
        148
    ],
    [
        "Unreal Analysis 240",
        2213,
        2226,
        69
    ],
    [
        "Occult Studies 200",
        1806,
        1824,
        24
    ],
    [
        "Physics 301",
        2328,
        2333,
        91
    ],
    [
        "Esperanto 126",
        142,
        216,
        158
    ],
    [
        "Phobosophy 340",
        1533,
        1551,
        136
    ],
    [
        "Philosophy 264",
        1213,
        1242,
        62
    ],
    [
        "Phobosophy 242",
        22,
        44,
        162
    ],
    [
        "Magic: The Gathering 306",
        1402,
        1517,
        44
    ],
    [
        "Biology 114",
        1207,
        1315,
        98
    ],
    [
        "Unreal Analysis 103",
        121,
        151,
        176
    ],
    [
        "Esperanto 329",
        546,
        619,
        195
    ],
    [
        "Magic: The Gathering 307",
        21,
        133,
        187
    ],
    [
        "Hacking Your Grades 122",
        819,
        923,
        140
    ],
    [
        "Unreal Analysis 335",
        1043,
        1203,
        136
    ],
    [
        "Philosophy 188",
        2019,
        2052,
        81
    ],
    [
        "Unreal Analysis 138",
        1120,
        1207,
        23
    ],
    [
        "Phobosophy 129",
        2040,
        2048,
        53
    ],
    [
        "Numbers Between 89012355 And 89012375 283",
        2027,
        2045,
        194
    ],
    [
        "Esperanto 117",
        233,
        322,
        85
    ],
    [
        "Hacking Your Grades 241",
        1146,
        1157,
        57
    ],
    [
        "Magic 195",
        2354,
        2359,
        43
    ],
    [
        "Biology 233",
        1515,
        1632,
        35
    ],
    [
        "Hacking Your Grades 313",
        59,
        105,
        194
    ],
    [
        "Magic: The Gathering 192",
        1220,
        1313,
        1
    ],
    [
        "Phobosophy 164",
        412,
        522,
        89
    ],
    [
        "Lojban 339",
        331,
        457,
        181
    ],
    [
        "Phobosophy 210",
        1650,
        1712,
        144
    ],
    [
        "Numbers Below Twenty 157",
        7,
        25,
        130
    ],
    [
        "Voluntary Detention 151",
        359,
        418,
        69
    ],
    [
        "Magic 135",
        1012,
        1138,
        150
    ],
    [
        "Numbers Between Twenty and Forty 297",
        1350,
        1350,
        15
    ],
    [
        "Unreal Analysis 116",
        2120,
        2241,
        187
    ],
    [
        "Astrology 137",
        2010,
        2021,
        57
    ],
    [
        "Philosophy 320",
        29,
        136,
        9
    ],
    [
        "Magic: The Gathering 201",
        1440,
        1451,
        13
    ],
    [
        "Antisociology 235",
        1327,
        1336,
        117
    ],
    [
        "Numbers Below Twenty 232",
        548,
        701,
        193
    ],
    [
        "Eleventh Degree Polynomials 207",
        653,
        748,
        155
    ],
    [
        "Antisociology 203",
        728,
        822,
        183
    ],
    [
        "Numbers Below Twenty 115",
        2129,
        2202,
        156
    ],
    [
        "Antisociology 163",
        49,
        204,
        87
    ],
    [
        "Voluntary Detention 124",
        746,
        839,
        46
    ],
    [
        "Phobosophy 161",
        915,
        926,
        132
    ],
    [
        "Pro-Disestablishmentarianism 346",
        2251,
        2253,
        125
    ],
    [
        "Magic: The Gathering 107",
        932,
        1052,
        190
    ],
    [
        "Pro-Disestablishmentarianism 334",
        341,
        409,
        62
    ],
    [
        "Antisociology 314",
        1210,
        1234,
        96
    ],
    [
        "Chemistry 109",
        1551,
        1625,
        184
    ],
    [
        "Magic 280",
        1536,
        1619,
        128
    ],
    [
        "Occult Studies 285",
        33,
        108,
        106
    ],
    [
        "Lying With Statistics 279",
        1804,
        1847,
        191
    ],
    [
        "Chemistry 263",
        351,
        437,
        144
    ],
    [
        "Numbers Below Twenty 147",
        2144,
        2303,
        6
    ],
    [
        "Esperanto 260",
        1932,
        2045,
        166
    ],
    [
        "Hacking Your Grades 292",
        2340,
        2358,
        106
    ],
    [
        "Occult Studies 250",
        816,
        824,
        172
    ],
    [
        "Lojban 247",
        1755,
        1833,
        1
    ],
    [
        "Pro-Disestablishmentarianism 185",
        2031,
        2043,
        70
    ],
    [
        "Biology 281",
        1343,
        1405,
        117
    ],
    [
        "Defense Against Defense Against the Dark Arts 268",
        1125,
        1216,
        65
    ],
    [
        "Antisociology 120",
        123,
        221,
        150
    ],
    [
        "Physics 144",
        649,
        806,
        96
    ],
    [
        "Numbers Between Twenty and Forty 347",
        0,
        52,
        183
    ],
    [
        "Numbers Between Twenty and Forty 295",
        2234,
        2313,
        106
    ],
    [
        "Eleventh Degree Polynomials 302",
        1945,
        2040,
        70
    ],
    [
        "Magic: The Gathering 330",
        727,
        837,
        47
    ],
    [
        "Chemistry 222",
        1733,
        1820,
        120
    ],
    [
        "Antisociology 165",
        629,
        712,
        137
    ],
    [
        "Magic: The Gathering 341",
        204,
        223,
        184
    ],
    [
        "Numbers Between Twenty and Forty 119",
        844,
        912,
        90
    ],
    [
        "Lojban 270",
        2133,
        2205,
        125
    ],
    [
        "Defense Against Defense Against the Dark Arts 312",
        2235,
        2344,
        95
    ],
    [
        "Unreal Analysis 206",
        908,
        1028,
        23
    ],
    [
        "Physics 255",
        2251,
        2349,
        71
    ],
    [
        "Biology 258",
        903,
        905,
        71
    ],
    [
        "Eleventh Degree Polynomials 198",
        1404,
        1452,
        66
    ],
    [
        "Antisociology 162",
        736,
        859,
        157
    ],
    [
        "Numbers Between Twenty and Forty 271",
        910,
        930,
        37
    ],
    [
        "Philosophy 230",
        1713,
        1832,
        68
    ],
    [
        "Antisociology 273",
        1651,
        1745,
        185
    ],
    [
        "Biology 224",
        2257,
        2309,
        27
    ],
    [
        "Lying With Statistics 167",
        746,
        813,
        1
    ],
    [
        "Pro-Disestablishmentarianism 199",
        32,
        46,
        161
    ],
    [
        "Numbers Below Twenty 277",
        1542,
        1635,
        17
    ],
    [
        "Occult Studies 226",
        1138,
        1251,
        134
    ],
    [
        "Hacking Your Grades 166",
        932,
        1020,
        187
    ],
    [
        "Magic 228",
        1544,
        1628,
        4
    ],
    [
        "Defense Against Defense Against the Dark Arts 118",
        534,
        604,
        158
    ],
    [
        "Comparative Indonesian Linguistics 348",
        2355,
        2357,
        81
    ],
    [
        "Hacking Your Grades 102",
        945,
        1031,
        1
    ],
    [
        "Phobosophy 178",
        728,
        848,
        190
    ],
    [
        "Unreal Analysis 251",
        40,
        102,
        95
    ],
    [
        "Lojban 336",
        1155,
        1216,
        115
    ],
    [
        "Voluntary Detention 189",
        730,
        830,
        81
    ],
    [
        "Antisociology 276",
        1053,
        1057,
        6
    ],
    [
        "Magic 220",
        612,
        618,
        148
    ],
    [
        "Pro-Disestablishmentarianism 304",
        1039,
        1047,
        61
    ],
    [
        "Astrology 218",
        2234,
        2327,
        116
    ],
    [
        "Occult Studies 134",
        2118,
        2230,
        142
    ],
    [
        "Defense Against Defense Against the Dark Arts 237",
        914,
        1001,
        153
    ],
    [
        "Occult Studies 215",
        2052,
        2112,
        102
    ],
    [
        "Chemistry 278",
        1418,
        1445,
        129
    ],
    [
        "Magic: The Gathering 104",
        1434,
        1511,
        105
    ],
    [
        "Comparative Indonesian Linguistics 249",
        813,
        932,
        18
    ],
    [
        "Numbers Between Twenty and Forty 262",
        1237,
        1338,
        192
    ],
    [
        "Numbers Between 89012355 And 89012375 155",
        1719,
        1807,
        80
    ],
    [
        "Hacking Your Grades 229",
        2240,
        2351,
        143
    ],
    [
        "Astrology 113",
        1929,
        1957,
        134
    ],
    [
        "Pro-Disestablishmentarianism 136",
        244,
        345,
        100
    ],
    [
        "Antisociology 187",
        1715,
        1741,
        129
    ],
    [
        "Comparative Indonesian Linguistics 169",
        1112,
        1237,
        68
    ],
    [
        "Hacking Your Grades 246",
        1223,
        1311,
        125
    ],
    [
        "Magic: The Gathering 175",
        2126,
        2144,
        155
    ],
    [
        "Biology 130",
        1436,
        1532,
        122
    ],
    [
        "Phobosophy 300",
        647,
        708,
        14
    ],
    [
        "Numbers Between Twenty and Forty 227",
        1018,
        1036,
        53
    ],
    [
        "Eleventh Degree Polynomials 145",
        343,
        348,
        194
    ],
    [
        "Astrology 318",
        1708,
        1741,
        46
    ],
    [
        "Numbers Below Twenty 298",
        2046,
        2046,
        156
    ],
    [
        "Biology 337",
        643,
        704,
        36
    ],
    [
        "Philosophy 146",
        1943,
        1948,
        171
    ],
    [
        "Occult Studies 180",
        514,
        643,
        63
    ],
    [
        "Defense Against Defense Against the Dark Arts 324",
        1752,
        1822,
        130
    ],
    [
        "Lojban 177",
        621,
        745,
        120
    ],
    [
        "Phobosophy 211",
        1903,
        1944,
        40
    ],
    [
        "Chemistry 236",
        1226,
        1320,
        157
    ],
    [
        "Numbers Between Twenty and Forty 265",
        354,
        439,
        44
    ],
    [
        "Numbers Between 89012355 And 89012375 110",
        1729,
        1836,
        104
    ],
    [
        "Lying With Statistics 311",
        1147,
        1207,
        66
    ],
    [
        "Comparative Indonesian Linguistics 234",
        2033,
        2132,
        155
    ],
    [
        "Numbers Between 89012355 And 89012375 349",
        613,
        643,
        71
    ],
    [
        "Antisociology 259",
        2336,
        2349,
        142
    ],
    [
        "Numbers Below Twenty 316",
        511,
        558,
        5
    ],
    [
        "Astrology 194",
        942,
        1007,
        160
    ],
    [
        "Unreal Analysis 101",
        1811,
        1922,
        194
    ],
    [
        "Magic: The Gathering 315",
        200,
        314,
        110
    ],
    [
        "Esperanto 282",
        1943,
        2109,
        58
    ],
    [
        "Esperanto 190",
        1803,
        1823,
        35
    ],
    [
        "Numbers Between 89012355 And 89012375 261",
        2100,
        2220,
        89
    ],
    [
        "Philosophy 149",
        1602,
        1705,
        111
    ],
    [
        "Hacking Your Grades 328",
        1436,
        1513,
        102
    ],
    [
        "Comparative Indonesian Linguistics 152",
        1201,
        1208,
        114
    ],
    [
        "Numbers Between 89012355 And 89012375 156",
        522,
        545,
        175
    ],
    [
        "Magic 125",
        936,
        1040,
        6
    ],
    [
        "Numbers Below Twenty 254",
        1858,
        2009,
        130
    ],
    [
        "Hacking Your Grades 345",
        106,
        111,
        120
    ],
    [
        "Unreal Analysis 191",
        523,
        544,
        132
    ],
    [
        "Physics 204",
        1343,
        1410,
        155
    ],
    [
        "Numbers Below Twenty 267",
        1016,
        1033,
        194
    ],
    [
        "Philosophy 154",
        735,
        836,
        123
    ],
    [
        "Magic: The Gathering 160",
        2334,
        2354,
        46
    ],
    [
        "Philosophy 338",
        2305,
        2353,
        10
    ],
    [
        "Numbers Below Twenty 105",
        512,
        525,
        139
    ],
    [
        "Philosophy 350",
        44,
        123,
        103
    ],
    [
        "Biology 266",
        457,
        502,
        153
    ],
    [
        "Lojban 172",
        1315,
        1429,
        95
    ],
    [
        "Numbers Below Twenty 174",
        557,
        608,
        102
    ],
    [
        "Pro-Disestablishmentarianism 171",
        1543,
        1653,
        9
    ],
    [
        "Unreal Analysis 286",
        900,
        906,
        18
    ],
    [
        "Magic: The Gathering 197",
        659,
        737,
        51
    ],
    [
        "Comparative Indonesian Linguistics 214",
        41,
        106,
        10
    ],
    [
        "Numbers Between Twenty and Forty 284",
        2145,
        2242,
        99
    ],
    [
        "Magic: The Gathering 253",
        742,
        806,
        163
    ],
    [
        "Chemistry 153",
        1437,
        1546,
        14
    ],
    [
        "Eleventh Degree Polynomials 274",
        1720,
        1748,
        54
    ],
    [
        "Numbers Between 89012355 And 89012375 288",
        2221,
        2256,
        170
    ],
    [
        "Astrology 289",
        246,
        416,
        9
    ],
    [
        "Defense Against Defense Against the Dark Arts 231",
        341,
        402,
        13
    ],
    [
        "Antisociology 139",
        1519,
        1605,
        182
    ],
    [
        "Defense Against Defense Against the Dark Arts 272",
        1655,
        1752,
        187
    ],
    [
        "Phobosophy 344",
        550,
        703,
        191
    ],
    [
        "Biology 225",
        1135,
        1205,
        14
    ],
    [
        "Astrology 142",
        319,
        406,
        94
    ],
    [
        "Numbers Between Twenty and Forty 168",
        905,
        951,
        66
    ],
    [
        "Chemistry 291",
        24,
        49,
        119
    ],
    [
        "Physics 196",
        358,
        413,
        6
    ],
    [
        "Antisociology 223",
        1630,
        1714,
        118
    ],
    [
        "Hacking Your Grades 216",
        1535,
        1650,
        125
    ],
    [
        "Chemistry 296",
        608,
        724,
        157
    ],
    [
        "Antisociology 176",
        1711,
        1722,
        13
    ],
    [
        "Esperanto 305",
        1935,
        2012,
        149
    ],
    [
        "Lying With Statistics 213",
        1126,
        1141,
        59
    ],
    [
        "Antisociology 111",
        2301,
        2313,
        76
    ],
    [
        "Astrology 321",
        1838,
        1848,
        107
    ],
    [
        "Magic 121",
        2349,
        2355,
        123
    ],
    [
        "Numbers Below Twenty 106",
        947,
        1101,
        140
    ],
    [
        "Numbers Between 89012355 And 89012375 309",
        231,
        358,
        81
    ],
    [
        "Voluntary Detention 133",
        1609,
        1728,
        55
    ],
    [
        "Hacking Your Grades 303",
        248,
        346,
        54
    ],
    [
        "Magic 143",
        17,
        39,
        70
    ],
    [
        "Phobosophy 112",
        2001,
        2053,
        11
    ],
    [
        "Magic 326",
        1626,
        1742,
        133
    ],
    [
        "Magic: The Gathering 317",
        147,
        253,
        170
    ],
    [
        "Lying With Statistics 209",
        2156,
        2220,
        158
    ],
    [
        "Chemistry 308",
        2050,
        2136,
        83
    ],
    [
        "Numbers Between 89012355 And 89012375 332",
        204,
        222,
        162
    ],
    [
        "Numbers Between 89012355 And 89012375 310",
        2320,
        2327,
        29
    ],
    [
        "Chemistry 148",
        129,
        215,
        84
    ],
    [
        "Biology 294",
        1548,
        1622,
        27
    ],
    [
        "Astrology 257",
        632,
        658,
        148
    ],
    [
        "Philosophy 323",
        457,
        537,
        144
    ],
    [
        "Pro-Disestablishmentarianism 327",
        1519,
        1625,
        66
    ],
    [
        "Voluntary Detention 325",
        653,
        755,
        166
    ],
    [
        "Lojban 123",
        657,
        807,
        77
    ],
    [
        "Numbers Below Twenty 127",
        1546,
        1630,
        93
    ],
    [
        "Phobosophy 181",
        621,
        659,
        53
    ],
    [
        "Numbers Below Twenty 183",
        312,
        346,
        197
    ],
    [
        "Magic 132",
        258,
        322,
        111
    ],
    [
        "Numbers Between Twenty and Forty 343",
        656,
        803,
        149
    ],
    [
        "Magic: The Gathering 193",
        451,
        517,
        2
    ],
    [
        "Unreal Analysis 108",
        2359,
        2359,
        119
    ],
    [
        "Hacking Your Grades 217",
        1032,
        1100,
        101
    ],
    [
        "Philosophy 342",
        206,
        255,
        178
    ],
    [
        "Occult Studies 140",
        1809,
        1843,
        189
    ],
    [
        "Comparative Indonesian Linguistics 290",
        1449,
        1537,
        38
    ],
    [
        "Comparative Indonesian Linguistics 245",
        141,
        250,
        168
    ],
    [
        "Occult Studies 221",
        1153,
        1305,
        155
    ],
    [
        "Numbers Between Twenty and Forty 179",
        1329,
        1442,
        196
    ],
    [
        "Hacking Your Grades 205",
        1314,
        1325,
        84
    ],
    [
        "Comparative Indonesian Linguistics 275",
        1607,
        1657,
        2
    ],
    [
        "Biology 243",
        1804,
        1812,
        19
    ],
    [
        "Philosophy 219",
        1902,
        1903,
        189
    ],
    [
        "Physics 333",
        1529,
        1556,
        108
    ],
    [
        "Lojban 184",
        1531,
        1559,
        187
    ],
    [
        "Philosophy 150",
        1748,
        1814,
        31
    ],
    [
        "Unreal Analysis 287",
        1804,
        1815,
        167
    ],
    [
        "Hacking Your Grades 248",
        1432,
        1601,
        103
    ],
    [
        "Hacking Your Grades 244",
        1031,
        1137,
        126
    ]
];
//console.log(run(hardtest));