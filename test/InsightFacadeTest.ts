/**
 * Created by joycheng on 2017-01-19.
 */
/**
 * Created by rtholmes on 2016-10-31.
 */

import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";

import fs = require("fs");
var zipStuff: any = null;
var inValidZip:any = null;
var wrongZip:any = null;
var noResultZip:any = Buffer.from(fs.readFileSync("./noResultJson.zip")).toString('base64');
var insightFacade: InsightFacade = null;
var queryRequest: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};

var queryRequest2: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};
var queryRequest3: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};
var queryRequest4: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};

var queryRequest5: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};


var queryRequest6: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};


var queryRequest8: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};

var queryRequest9: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};

var LTRequest: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};

var queryRequest10: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};

var queryRequest11: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};

var queryRequest12: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};

var queryRequest13: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};

var queryRequest14: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};

var notJsonRequest: QueryRequest = {
    WHERE: null,
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};


var wrongFormRequest: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"WRONG"
    }
};

var nullOptionsRequest: QueryRequest = {
    WHERE: {},
    OPTIONS:{COLUMNS:null,
        ORDER: '',
        FORM:"WRONG"
    }
};

var coursefailRequest: QueryRequest = {
    WHERE: {"AND":[
    {
        "IS":{
            "courses_id":"504"
        }
    },
    {
        "LT":{
            "courses_fail":80
        }
    },{
            "IS":{
                "courses_uuid":"504"
            }
        }]},
    OPTIONS: {"COLUMNS":[
        "courses_dept",
        "courses_id",
        "courses_avg"
    ],
        "ORDER":"courses_avg",
        "FORM":"TABLE"
    }
};

var coverageRequest: QueryRequest = {
    WHERE: {"AND":[
        {
            "IS":{
                "courses_id":"504"
            }
        },
        {
            "LT":{
                "courses_fail":80
            }
        },{
            "IS":{
                "courses_uuid":"504"
            }
        }]},
    OPTIONS: {"COLUMNS":[
        "courses_dept",
        "courses_id",
        "courses_avg",
        "courses_instructor",
        "courses_uuid",
        "courses_title",
        "courses_pass",
        "courses_fail",
        "courses_audit"
    ],
        "ORDER":"courses_avg",
        "FORM":"TABLE"
    }
};

var emptyANDRequest: QueryRequest = {
    WHERE: {"AND":[]},
    OPTIONS: {"COLUMNS":[
        "courses_dept",
        "courses_id",
        "courses_avg"
    ],
        "ORDER":"courses_avg",
        "FORM":"TABLE"
    }
};

var emptyORRequest: QueryRequest = {
    WHERE: {"OR":[]},
    OPTIONS: {"COLUMNS":[
        "courses_dept",
        "courses_id",
        "courses_avg"
    ],
        "ORDER":"courses_avg",
        "FORM":"TABLE"
    }
};

var testResult: any = { render: 'TABLE',
    result:
        [ { courses_dept: 'epse', courses_avg: 97.09 },
            { courses_dept: 'math', courses_avg: 97.09 },
            { courses_dept: 'math', courses_avg: 97.09 },
            { courses_dept: 'epse', courses_avg: 97.09 },
            { courses_dept: 'math', courses_avg: 97.25 },
            { courses_dept: 'math', courses_avg: 97.25 },
            { courses_dept: 'epse', courses_avg: 97.29 },
            { courses_dept: 'epse', courses_avg: 97.29 },
            { courses_dept: 'nurs', courses_avg: 97.33 },
            { courses_dept: 'nurs', courses_avg: 97.33 },
            { courses_dept: 'epse', courses_avg: 97.41 },
            { courses_dept: 'epse', courses_avg: 97.41 },
            { courses_dept: 'cnps', courses_avg: 97.47 },
            { courses_dept: 'cnps', courses_avg: 97.47 },
            { courses_dept: 'math', courses_avg: 97.48 },
            { courses_dept: 'math', courses_avg: 97.48 },
            { courses_dept: 'educ', courses_avg: 97.5 },
            { courses_dept: 'nurs', courses_avg: 97.53 },
            { courses_dept: 'nurs', courses_avg: 97.53 },
            { courses_dept: 'epse', courses_avg: 97.67 },
            { courses_dept: 'epse', courses_avg: 97.69 },
            { courses_dept: 'epse', courses_avg: 97.78 },
            { courses_dept: 'crwr', courses_avg: 98 },
            { courses_dept: 'crwr', courses_avg: 98 },
            { courses_dept: 'epse', courses_avg: 98.08 },
            { courses_dept: 'nurs', courses_avg: 98.21 },
            { courses_dept: 'nurs', courses_avg: 98.21 },
            { courses_dept: 'epse', courses_avg: 98.36 },
            { courses_dept: 'epse', courses_avg: 98.45 },
            { courses_dept: 'epse', courses_avg: 98.45 },
            { courses_dept: 'nurs', courses_avg: 98.5 },
            { courses_dept: 'nurs', courses_avg: 98.5 },
            { courses_dept: 'epse', courses_avg: 98.58 },
            { courses_dept: 'nurs', courses_avg: 98.58 },
            { courses_dept: 'nurs', courses_avg: 98.58 },
            { courses_dept: 'epse', courses_avg: 98.58 },
            { courses_dept: 'epse', courses_avg: 98.7 },
            { courses_dept: 'nurs', courses_avg: 98.71 },
            { courses_dept: 'nurs', courses_avg: 98.71 },
            { courses_dept: 'eece', courses_avg: 98.75 },
            { courses_dept: 'eece', courses_avg: 98.75 },
            { courses_dept: 'epse', courses_avg: 98.76 },
            { courses_dept: 'epse', courses_avg: 98.76 },
            { courses_dept: 'epse', courses_avg: 98.8 },
            { courses_dept: 'spph', courses_avg: 98.98 },
            { courses_dept: 'spph', courses_avg: 98.98 },
            { courses_dept: 'cnps', courses_avg: 99.19 },
            { courses_dept: 'math', courses_avg: 99.78 },
            { courses_dept: 'math', courses_avg: 99.78 } ] };

var testResult_complex: any = { render: 'TABLE',
    result:
        [ { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.02 },
            { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.16 },
            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.17 },
            { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.18 },
            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.5 },
            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.72 },
            { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.82 },
            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.85 },
            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.29 },
            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.48 },
            { courses_dept: 'adhe', courses_id: '329', courses_avg: 92.54 },
            { courses_dept: 'adhe', courses_id: '329', courses_avg: 93.33 },
            { courses_dept: 'rhsc', courses_id: '501', courses_avg: 95 },
            { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
            { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
            { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
            { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
            { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
            { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
            { courses_dept: 'sowk', courses_id: '570', courses_avg: 95 },
            { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
            { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
            { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
            { courses_dept: 'epse', courses_id: '606', courses_avg: 95 },
            { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
            { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
            { courses_dept: 'kin', courses_id: '499', courses_avg: 95 },
            { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
            { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
            { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
            { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
            { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
            { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
            { courses_dept: 'mtrl', courses_id: '599', courses_avg: 95 },
            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
            { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
            { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
            { courses_dept: 'obst', courses_id: '549', courses_avg: 95 },
            { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
            { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
            { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
            { courses_dept: 'adhe', courses_id: '329', courses_avg: 96.11 } ] };

var resultPatial = {"render":"TABLE","result":[{"courses_dept":"phys","courses_avg":55.25},{"courses_dept":"math","courses_avg":58.96},{"courses_dept":"mech","courses_avg":60.09},{"courses_dept":"astu","courses_avg":63.14},{"courses_dept":"math","courses_avg":63.62},{"courses_dept":"mech","courses_avg":64.08},{"courses_dept":"chem","courses_avg":64.59},{"courses_dept":"chem","courses_avg":64.77},{"courses_dept":"math","courses_avg":65.24},{"courses_dept":"astu","courses_avg":65.74},{"courses_dept":"chem","courses_avg":65.8},{"courses_dept":"scie","courses_avg":65.81},{"courses_dept":"last","courses_avg":65.9},{"courses_dept":"geog","courses_avg":66.5},{"courses_dept":"mech","courses_avg":66.84},{"courses_dept":"astu","courses_avg":66.93},{"courses_dept":"chem","courses_avg":67.23},{"courses_dept":"geog","courses_avg":67.28},{"courses_dept":"astu","courses_avg":67.4},{"courses_dept":"anth","courses_avg":67.58},{"courses_dept":"geog","courses_avg":67.7},{"courses_dept":"phys","courses_avg":67.78},{"courses_dept":"wrds","courses_avg":68},{"courses_dept":"chem","courses_avg":68.11},{"courses_dept":"stat","courses_avg":68.17},{"courses_dept":"chem","courses_avg":68.28},{"courses_dept":"fren","courses_avg":68.36},{"courses_dept":"scie","courses_avg":68.41},{"courses_dept":"geog","courses_avg":68.5},{"courses_dept":"phys","courses_avg":68.5},{"courses_dept":"geog","courses_avg":68.6},{"courses_dept":"geog","courses_avg":68.73},{"courses_dept":"math","courses_avg":68.75},{"courses_dept":"math","courses_avg":68.83},{"courses_dept":"geog","courses_avg":68.89},{"courses_dept":"stat","courses_avg":68.9},{"courses_dept":"wrds","courses_avg":69},{"courses_dept":"engl","courses_avg":69.06},{"courses_dept":"chem","courses_avg":69.12},{"courses_dept":"clst","courses_avg":69.15},{"courses_dept":"stat","courses_avg":69.23},{"courses_dept":"mech","courses_avg":69.32},{"courses_dept":"bioc","courses_avg":69.33},{"courses_dept":"astu","courses_avg":69.38},{"courses_dept":"chem","courses_avg":69.39},{"courses_dept":"geog","courses_avg":69.42},{"courses_dept":"cpsc","courses_avg":69.59},{"courses_dept":"lled","courses_avg":69.65},{"courses_dept":"econ","courses_avg":69.77},{"courses_dept":"geog","courses_avg":69.92},{"courses_dept":"clst","courses_avg":70},{"courses_dept":"fren","courses_avg":70},{"courses_dept":"bioc","courses_avg":70.07},{"courses_dept":"bioc","courses_avg":70.12},{"courses_dept":"geog","courses_avg":70.21},{"courses_dept":"bioc","courses_avg":70.27},{"courses_dept":"clst","courses_avg":70.27},{"courses_dept":"bioc","courses_avg":70.28},{"courses_dept":"math","courses_avg":70.29},{"courses_dept":"musc","courses_avg":70.31},{"courses_dept":"wrds","courses_avg":70.33},{"courses_dept":"phys","courses_avg":70.38},{"courses_dept":"busi","courses_avg":70.4},{"courses_dept":"eosc","courses_avg":70.43},{"courses_dept":"wrds","courses_avg":70.55},{"courses_dept":"math","courses_avg":70.61},{"courses_dept":"chem","courses_avg":70.68},{"courses_dept":"bioc","courses_avg":70.73},{"courses_dept":"math","courses_avg":70.8},{"courses_dept":"geog","courses_avg":70.83},{"courses_dept":"geog","courses_avg":70.9},{"courses_dept":"cpsc","courses_avg":70.9},{"courses_dept":"elec","courses_avg":70.92},{"courses_dept":"econ","courses_avg":71},{"courses_dept":"arth","courses_avg":71.03},{"courses_dept":"geog","courses_avg":71.12},{"courses_dept":"cpsc","courses_avg":71.14},{"courses_dept":"anth","courses_avg":71.15},{"courses_dept":"geob","courses_avg":71.2},{"courses_dept":"engl","courses_avg":71.23},{"courses_dept":"bioc","courses_avg":71.31},{"courses_dept":"last","courses_avg":71.32},{"courses_dept":"geog","courses_avg":71.32},{"courses_dept":"bioc","courses_avg":71.35},{"courses_dept":"chem","courses_avg":71.41},{"courses_dept":"bioc","courses_avg":71.43},{"courses_dept":"econ","courses_avg":71.48},{"courses_dept":"comm","courses_avg":71.56},{"courses_dept":"phys","courses_avg":71.61},{"courses_dept":"phys","courses_avg":71.8},{"courses_dept":"fren","courses_avg":71.85},{"courses_dept":"phys","courses_avg":72},{"courses_dept":"wrds","courses_avg":72},{"courses_dept":"chem","courses_avg":72.01},{"courses_dept":"comm","courses_avg":72.02},{"courses_dept":"fren","courses_avg":72.04},{"courses_dept":"phys","courses_avg":72.05},{"courses_dept":"comm","courses_avg":72.13},{"courses_dept":"comm","courses_avg":72.14},{"courses_dept":"stat","courses_avg":72.24},{"courses_dept":"lled","courses_avg":72.25},{"courses_dept":"mine","courses_avg":72.27},{"courses_dept":"comm","courses_avg":72.34},{"courses_dept":"chem","courses_avg":72.38},{"courses_dept":"comm","courses_avg":72.43},{"courses_dept":"wrds","courses_avg":72.5},{"courses_dept":"engl","courses_avg":72.56},{"courses_dept":"busi","courses_avg":72.64},{"courses_dept":"frst","courses_avg":72.67},{"courses_dept":"geog","courses_avg":72.7},{"courses_dept":"geob","courses_avg":72.85},{"courses_dept":"last","courses_avg":72.89},{"courses_dept":"comm","courses_avg":72.93},{"courses_dept":"comm","courses_avg":72.97},{"courses_dept":"biol","courses_avg":72.97},{"courses_dept":"comm","courses_avg":73.14},{"courses_dept":"last","courses_avg":73.22},{"courses_dept":"mine","courses_avg":73.33},{"courses_dept":"fren","courses_avg":73.33},{"courses_dept":"econ","courses_avg":73.36},{"courses_dept":"comm","courses_avg":73.4},{"courses_dept":"frst","courses_avg":73.42},{"courses_dept":"clst","courses_avg":73.45},{"courses_dept":"fren","courses_avg":73.47},{"courses_dept":"comm","courses_avg":73.54},{"courses_dept":"cpsc","courses_avg":73.64},{"courses_dept":"geob","courses_avg":73.65},{"courses_dept":"bioc","courses_avg":73.66},{"courses_dept":"fren","courses_avg":73.72},{"courses_dept":"geob","courses_avg":73.73},{"courses_dept":"anth","courses_avg":73.73},{"courses_dept":"math","courses_avg":73.8},{"courses_dept":"econ","courses_avg":73.8},{"courses_dept":"atsc","courses_avg":73.88},{"courses_dept":"phys","courses_avg":73.9},{"courses_dept":"mech","courses_avg":73.92},{"courses_dept":"fren","courses_avg":73.93},{"courses_dept":"comm","courses_avg":73.93},{"courses_dept":"cpsc","courses_avg":74},{"courses_dept":"fren","courses_avg":74},{"courses_dept":"lled","courses_avg":74},{"courses_dept":"cpsc","courses_avg":74.04},{"courses_dept":"comm","courses_avg":74.08},{"courses_dept":"phys","courses_avg":74.13},{"courses_dept":"anth","courses_avg":74.16},{"courses_dept":"stat","courses_avg":74.17},{"courses_dept":"lled","courses_avg":74.17},{"courses_dept":"phys","courses_avg":74.19},{"courses_dept":"frst","courses_avg":74.19},{"courses_dept":"cpsc","courses_avg":74.2},{"courses_dept":"fren","courses_avg":74.21},{"courses_dept":"phys","courses_avg":74.21},{"courses_dept":"phys","courses_avg":74.29},{"courses_dept":"comm","courses_avg":74.37},{"courses_dept":"comm","courses_avg":74.43},{"courses_dept":"comm","courses_avg":74.44},{"courses_dept":"clst","courses_avg":74.52},{"courses_dept":"comm","courses_avg":74.55},{"courses_dept":"mech","courses_avg":74.58},{"courses_dept":"phys","courses_avg":74.61},{"courses_dept":"comm","courses_avg":74.65},{"courses_dept":"engl","courses_avg":74.71},{"courses_dept":"anth","courses_avg":74.76},{"courses_dept":"comm","courses_avg":74.81},{"courses_dept":"stat","courses_avg":74.83},{"courses_dept":"cpsc","courses_avg":74.88},{"courses_dept":"last","courses_avg":74.92},{"courses_dept":"geob","courses_avg":74.95},{"courses_dept":"fren","courses_avg":74.96},{"courses_dept":"comm","courses_avg":74.98},{"courses_dept":"comm","courses_avg":75},{"courses_dept":"chem","courses_avg":75.06},{"courses_dept":"frst","courses_avg":75.07},{"courses_dept":"comm","courses_avg":75.11},{"courses_dept":"stat","courses_avg":75.12},{"courses_dept":"chem","courses_avg":75.13},{"courses_dept":"fren","courses_avg":75.2},{"courses_dept":"cpsc","courses_avg":75.22},{"courses_dept":"fren","courses_avg":75.27},{"courses_dept":"clst","courses_avg":75.31},{"courses_dept":"hist","courses_avg":75.31},{"courses_dept":"comm","courses_avg":75.32},{"courses_dept":"comm","courses_avg":75.33},{"courses_dept":"last","courses_avg":75.53},{"courses_dept":"geob","courses_avg":75.54},{"courses_dept":"comm","courses_avg":75.54},{"courses_dept":"anth","courses_avg":75.55},{"courses_dept":"cpsc","courses_avg":75.56},{"courses_dept":"engl","courses_avg":75.57},{"courses_dept":"comm","courses_avg":75.58},{"courses_dept":"comm","courses_avg":75.59},{"courses_dept":"arth","courses_avg":75.62},{"courses_dept":"geog","courses_avg":75.63},{"courses_dept":"phys","courses_avg":75.64},{"courses_dept":"micb","courses_avg":75.67},{"courses_dept":"phys","courses_avg":75.68},{"courses_dept":"chem","courses_avg":75.7},{"courses_dept":"chem","courses_avg":75.71},{"courses_dept":"comm","courses_avg":75.73},{"courses_dept":"comm","courses_avg":75.82},{"courses_dept":"comm","courses_avg":75.84},{"courses_dept":"soci","courses_avg":75.88},{"courses_dept":"mech","courses_avg":75.91},{"courses_dept":"comm","courses_avg":75.93},{"courses_dept":"anth","courses_avg":75.95},{"courses_dept":"comm","courses_avg":75.97},{"courses_dept":"comm","courses_avg":76},{"courses_dept":"comm","courses_avg":76.03},{"courses_dept":"comm","courses_avg":76.05},{"courses_dept":"micb","courses_avg":76.05},{"courses_dept":"cpsc","courses_avg":76.13},{"courses_dept":"comm","courses_avg":76.19},{"courses_dept":"comm","courses_avg":76.23},{"courses_dept":"frst","courses_avg":76.26},{"courses_dept":"chem","courses_avg":76.29},{"courses_dept":"phys","courses_avg":76.32},{"courses_dept":"fren","courses_avg":76.44},{"courses_dept":"micb","courses_avg":76.46},{"courses_dept":"chem","courses_avg":76.48},{"courses_dept":"comm","courses_avg":76.48},{"courses_dept":"stat","courses_avg":76.54},{"courses_dept":"comm","courses_avg":76.54},{"courses_dept":"hist","courses_avg":76.55},{"courses_dept":"comm","courses_avg":76.58},{"courses_dept":"lled","courses_avg":76.61},{"courses_dept":"phys","courses_avg":76.66},{"courses_dept":"comm","courses_avg":76.71},{"courses_dept":"comm","courses_avg":76.73},{"courses_dept":"comm","courses_avg":76.76},{"courses_dept":"lled","courses_avg":76.79},{"courses_dept":"stat","courses_avg":76.8},{"courses_dept":"comm","courses_avg":76.85},{"courses_dept":"lled","courses_avg":76.85},{"courses_dept":"arth","courses_avg":76.95},{"courses_dept":"mech","courses_avg":77.05},{"courses_dept":"comm","courses_avg":77.05},{"courses_dept":"busi","courses_avg":77.08},{"courses_dept":"frst","courses_avg":77.09},{"courses_dept":"comm","courses_avg":77.1},{"courses_dept":"comm","courses_avg":77.17},{"courses_dept":"comm","courses_avg":77.18},{"courses_dept":"micb","courses_avg":77.22},{"courses_dept":"lled","courses_avg":77.25},{"courses_dept":"path","courses_avg":77.3},{"courses_dept":"stat","courses_avg":77.31},{"courses_dept":"lled","courses_avg":77.33},{"courses_dept":"mech","courses_avg":77.37},{"courses_dept":"micb","courses_avg":77.41},{"courses_dept":"geob","courses_avg":77.43},{"courses_dept":"fren","courses_avg":77.5},{"courses_dept":"micb","courses_avg":77.52},{"courses_dept":"lled","courses_avg":77.54},{"courses_dept":"anth","courses_avg":77.54},{"courses_dept":"anth","courses_avg":77.6},{"courses_dept":"hist","courses_avg":77.63},{"courses_dept":"comm","courses_avg":77.69},{"courses_dept":"chem","courses_avg":77.74},{"courses_dept":"arth","courses_avg":77.74},{"courses_dept":"anth","courses_avg":77.76},{"courses_dept":"phys","courses_avg":77.76},{"courses_dept":"comm","courses_avg":77.77},{"courses_dept":"anth","courses_avg":77.77},{"courses_dept":"cpsc","courses_avg":77.78},{"courses_dept":"micb","courses_avg":77.79},{"courses_dept":"path","courses_avg":77.85},{"courses_dept":"comm","courses_avg":78},{"courses_dept":"fren","courses_avg":78},{"courses_dept":"micb","courses_avg":78.04},{"courses_dept":"comm","courses_avg":78.09},{"courses_dept":"path","courses_avg":78.13},{"courses_dept":"mine","courses_avg":78.13},{"courses_dept":"path","courses_avg":78.36},{"courses_dept":"comm","courses_avg":78.38},{"courses_dept":"hist","courses_avg":78.52},{"courses_dept":"comm","courses_avg":78.62},{"courses_dept":"fren","courses_avg":78.74},{"courses_dept":"path","courses_avg":78.81},{"courses_dept":"lled","courses_avg":78.86},{"courses_dept":"geob","courses_avg":78.95},{"courses_dept":"comm","courses_avg":79},{"courses_dept":"micb","courses_avg":79.01},{"courses_dept":"geog","courses_avg":79.07},{"courses_dept":"baac","courses_avg":79.08},{"courses_dept":"biol","courses_avg":79.09},{"courses_dept":"comm","courses_avg":79.11},{"courses_dept":"larc","courses_avg":79.3},{"courses_dept":"comm","courses_avg":79.4},{"courses_dept":"anth","courses_avg":79.42},{"courses_dept":"comm","courses_avg":79.45},{"courses_dept":"econ","courses_avg":79.48},{"courses_dept":"lled","courses_avg":79.5},{"courses_dept":"micb","courses_avg":79.52},{"courses_dept":"comm","courses_avg":79.53},{"courses_dept":"comm","courses_avg":79.54},{"courses_dept":"baac","courses_avg":79.57},{"courses_dept":"geog","courses_avg":79.6},{"courses_dept":"geob","courses_avg":79.72},{"courses_dept":"larc","courses_avg":79.74},{"courses_dept":"busi","courses_avg":79.88},{"courses_dept":"baac","courses_avg":79.9},{"courses_dept":"larc","courses_avg":80.2},{"courses_dept":"larc","courses_avg":80.28},{"courses_dept":"comm","courses_avg":80.32},{"courses_dept":"path","courses_avg":80.33},{"courses_dept":"lled","courses_avg":80.38},{"courses_dept":"lled","courses_avg":80.43},{"courses_dept":"arth","courses_avg":80.5},{"courses_dept":"micb","courses_avg":80.51},{"courses_dept":"larc","courses_avg":80.53},{"courses_dept":"engl","courses_avg":80.56},{"courses_dept":"mech","courses_avg":80.58},{"courses_dept":"bams","courses_avg":80.6},{"courses_dept":"path","courses_avg":80.67},{"courses_dept":"grek","courses_avg":80.71},{"courses_dept":"path","courses_avg":80.78},{"courses_dept":"frst","courses_avg":80.84},{"courses_dept":"mech","courses_avg":80.92},{"courses_dept":"igen","courses_avg":80.92},{"courses_dept":"geog","courses_avg":80.94},{"courses_dept":"frst","courses_avg":80.97},{"courses_dept":"bams","courses_avg":81},{"courses_dept":"path","courses_avg":81},{"courses_dept":"civl","courses_avg":81.19},{"courses_dept":"micb","courses_avg":81.43},{"courses_dept":"phys","courses_avg":81.44},{"courses_dept":"micb","courses_avg":81.51},{"courses_dept":"larc","courses_avg":81.58},{"courses_dept":"larc","courses_avg":81.65},{"courses_dept":"igen","courses_avg":81.66},{"courses_dept":"larc","courses_avg":81.72},{"courses_dept":"busi","courses_avg":81.82},{"courses_dept":"path","courses_avg":81.91},{"courses_dept":"bams","courses_avg":82},{"courses_dept":"comm","courses_avg":82},{"courses_dept":"phys","courses_avg":82.02},{"courses_dept":"larc","courses_avg":82.05},{"courses_dept":"bams","courses_avg":82.14},{"courses_dept":"civl","courses_avg":82.2},{"courses_dept":"igen","courses_avg":82.31},{"courses_dept":"larc","courses_avg":82.33},{"courses_dept":"micb","courses_avg":82.8},{"courses_dept":"ccst","courses_avg":82.8},{"courses_dept":"igen","courses_avg":82.81},{"courses_dept":"micb","courses_avg":82.87},{"courses_dept":"bams","courses_avg":82.88},{"courses_dept":"larc","courses_avg":82.88},{"courses_dept":"path","courses_avg":82.9},{"courses_dept":"micb","courses_avg":82.97},{"courses_dept":"hunu","courses_avg":83},{"courses_dept":"bams","courses_avg":83},{"courses_dept":"cpsc","courses_avg":83},{"courses_dept":"latn","courses_avg":83},{"courses_dept":"cpsc","courses_avg":83.17},{"courses_dept":"comm","courses_avg":83.2},{"courses_dept":"math","courses_avg":83.25},{"courses_dept":"bams","courses_avg":83.33},{"courses_dept":"larc","courses_avg":83.6},{"courses_dept":"fopr","courses_avg":83.6},{"courses_dept":"bams","courses_avg":83.77},{"courses_dept":"mech","courses_avg":83.87},{"courses_dept":"path","courses_avg":83.91},{"courses_dept":"mech","courses_avg":83.93},{"courses_dept":"mech","courses_avg":84},{"courses_dept":"path","courses_avg":84.06},{"courses_dept":"bams","courses_avg":84.07},{"courses_dept":"path","courses_avg":84.17},{"courses_dept":"anth","courses_avg":84.25},{"courses_dept":"path","courses_avg":84.27},{"courses_dept":"path","courses_avg":84.33},{"courses_dept":"comm","courses_avg":84.4},{"courses_dept":"path","courses_avg":84.43},{"courses_dept":"mech","courses_avg":84.47},{"courses_dept":"bait","courses_avg":84.54},{"courses_dept":"mech","courses_avg":84.64},{"courses_dept":"civl","courses_avg":84.67},{"courses_dept":"micb","courses_avg":84.71},{"courses_dept":"spph","courses_avg":84.83},{"courses_dept":"cpsc","courses_avg":84.85},{"courses_dept":"ccst","courses_avg":84.86},{"courses_dept":"mech","courses_avg":84.89},{"courses_dept":"path","courses_avg":84.91},{"courses_dept":"bams","courses_avg":85},{"courses_dept":"mech","courses_avg":85.03},{"courses_dept":"chem","courses_avg":85.25},{"courses_dept":"frst","courses_avg":85.56},{"courses_dept":"micb","courses_avg":85.75},{"courses_dept":"path","courses_avg":85.75},{"courses_dept":"path","courses_avg":85.76},{"courses_dept":"geog","courses_avg":85.83},{"courses_dept":"path","courses_avg":85.87},{"courses_dept":"medg","courses_avg":85.95},{"courses_dept":"epse","courses_avg":86},{"courses_dept":"path","courses_avg":86},{"courses_dept":"hist","courses_avg":86},{"courses_dept":"math","courses_avg":86},{"courses_dept":"bams","courses_avg":86.1},{"courses_dept":"cpsc","courses_avg":86.13},{"courses_dept":"mech","courses_avg":86.13},{"courses_dept":"civl","courses_avg":86.22},{"courses_dept":"cpsc","courses_avg":86.22},{"courses_dept":"zool","courses_avg":86.25},{"courses_dept":"micb","courses_avg":86.27},{"courses_dept":"bams","courses_avg":86.3},{"courses_dept":"spph","courses_avg":86.4},{"courses_dept":"chem","courses_avg":86.5},{"courses_dept":"rhsc","courses_avg":86.54},{"courses_dept":"bams","courses_avg":86.56},{"courses_dept":"plan","courses_avg":86.59},{"courses_dept":"micb","courses_avg":86.82},{"courses_dept":"bams","courses_avg":86.89},{"courses_dept":"comm","courses_avg":87.11},{"courses_dept":"civl","courses_avg":87.14},{"courses_dept":"path","courses_avg":87.32},{"courses_dept":"spph","courses_avg":87.47},{"courses_dept":"anth","courses_avg":88},{"courses_dept":"bams","courses_avg":88},{"courses_dept":"spph","courses_avg":88},{"courses_dept":"medg","courses_avg":88.14},{"courses_dept":"fopr","courses_avg":88.29},{"courses_dept":"spph","courses_avg":88.4},{"courses_dept":"sowk","courses_avg":88.56},{"courses_dept":"medg","courses_avg":88.74},{"courses_dept":"civl","courses_avg":88.74},{"courses_dept":"civl","courses_avg":88.94},{"courses_dept":"eosc","courses_avg":89},{"courses_dept":"path","courses_avg":89},{"courses_dept":"path","courses_avg":89.13},{"courses_dept":"micb","courses_avg":89.18},{"courses_dept":"spph","courses_avg":89.29},{"courses_dept":"path","courses_avg":89.33},{"courses_dept":"eosc","courses_avg":89.83},{"courses_dept":"frst","courses_avg":90.18},{"courses_dept":"edcp","courses_avg":90.25},{"courses_dept":"micb","courses_avg":90.33},{"courses_dept":"eosc","courses_avg":90.4},{"courses_dept":"path","courses_avg":91.79},{"courses_dept":"edcp","courses_avg":92},{"courses_dept":"edcp","courses_avg":92.63},{"courses_dept":"epse","courses_avg":92.71},{"courses_dept":"micb","courses_avg":93.2},{"courses_dept":"epse","courses_avg":93.67},{"courses_dept":"edcp","courses_avg":94.17},{"courses_dept":"edcp","courses_avg":94.86}]};


var resultFor70and80 = {"render":"TABLE","result":[{"courses_dept":"cpsc","courses_avg":70.03},{"courses_dept":"cpsc","courses_avg":70.03},{"courses_dept":"cpsc","courses_avg":70.05},{"courses_dept":"cpsc","courses_avg":70.11},{"courses_dept":"cpsc","courses_avg":70.16},{"courses_dept":"cpsc","courses_avg":70.16},{"courses_dept":"cpsc","courses_avg":70.24},{"courses_dept":"cpsc","courses_avg":70.27},{"courses_dept":"cpsc","courses_avg":70.29},{"courses_dept":"cpsc","courses_avg":70.38},{"courses_dept":"cpsc","courses_avg":70.4},{"courses_dept":"cpsc","courses_avg":70.42},{"courses_dept":"cpsc","courses_avg":70.46},{"courses_dept":"cpsc","courses_avg":70.46},{"courses_dept":"cpsc","courses_avg":70.47},{"courses_dept":"cpsc","courses_avg":70.48},{"courses_dept":"cpsc","courses_avg":70.5},{"courses_dept":"cpsc","courses_avg":70.51},{"courses_dept":"cpsc","courses_avg":70.53},{"courses_dept":"cpsc","courses_avg":70.54},{"courses_dept":"cpsc","courses_avg":70.59},{"courses_dept":"cpsc","courses_avg":70.62},{"courses_dept":"cpsc","courses_avg":70.66},{"courses_dept":"cpsc","courses_avg":70.66},{"courses_dept":"cpsc","courses_avg":70.68},{"courses_dept":"cpsc","courses_avg":70.7},{"courses_dept":"cpsc","courses_avg":70.7},{"courses_dept":"cpsc","courses_avg":70.7},{"courses_dept":"cpsc","courses_avg":70.75},{"courses_dept":"cpsc","courses_avg":70.75},{"courses_dept":"cpsc","courses_avg":70.76},{"courses_dept":"cpsc","courses_avg":70.78},{"courses_dept":"cpsc","courses_avg":70.83},{"courses_dept":"cpsc","courses_avg":70.83},{"courses_dept":"cpsc","courses_avg":70.87},{"courses_dept":"cpsc","courses_avg":70.87},{"courses_dept":"cpsc","courses_avg":70.88},{"courses_dept":"cpsc","courses_avg":70.9},{"courses_dept":"cpsc","courses_avg":70.91},{"courses_dept":"cpsc","courses_avg":70.92},{"courses_dept":"cpsc","courses_avg":70.92},{"courses_dept":"cpsc","courses_avg":70.92},{"courses_dept":"cpsc","courses_avg":70.93},{"courses_dept":"cpsc","courses_avg":70.93},{"courses_dept":"cpsc","courses_avg":70.93},{"courses_dept":"cpsc","courses_avg":70.94},{"courses_dept":"cpsc","courses_avg":70.95},{"courses_dept":"cpsc","courses_avg":70.96},{"courses_dept":"cpsc","courses_avg":70.96},{"courses_dept":"cpsc","courses_avg":70.98},{"courses_dept":"cpsc","courses_avg":70.98},{"courses_dept":"cpsc","courses_avg":70.98},{"courses_dept":"cpsc","courses_avg":71},{"courses_dept":"cpsc","courses_avg":71},{"courses_dept":"cpsc","courses_avg":71.02},{"courses_dept":"cpsc","courses_avg":71.02},{"courses_dept":"cpsc","courses_avg":71.03},{"courses_dept":"cpsc","courses_avg":71.04},{"courses_dept":"cpsc","courses_avg":71.04},{"courses_dept":"cpsc","courses_avg":71.05},{"courses_dept":"cpsc","courses_avg":71.05},{"courses_dept":"cpsc","courses_avg":71.05},{"courses_dept":"cpsc","courses_avg":71.07},{"courses_dept":"cpsc","courses_avg":71.09},{"courses_dept":"cpsc","courses_avg":71.09},{"courses_dept":"cpsc","courses_avg":71.13},{"courses_dept":"cpsc","courses_avg":71.14},{"courses_dept":"cpsc","courses_avg":71.16},{"courses_dept":"cpsc","courses_avg":71.18},{"courses_dept":"cpsc","courses_avg":71.22},{"courses_dept":"cpsc","courses_avg":71.22},{"courses_dept":"cpsc","courses_avg":71.24},{"courses_dept":"cpsc","courses_avg":71.24},{"courses_dept":"cpsc","courses_avg":71.27},{"courses_dept":"cpsc","courses_avg":71.27},{"courses_dept":"cpsc","courses_avg":71.28},{"courses_dept":"cpsc","courses_avg":71.3},{"courses_dept":"cpsc","courses_avg":71.33},{"courses_dept":"cpsc","courses_avg":71.33},{"courses_dept":"cpsc","courses_avg":71.39},{"courses_dept":"cpsc","courses_avg":71.4},{"courses_dept":"cpsc","courses_avg":71.41},{"courses_dept":"cpsc","courses_avg":71.44},{"courses_dept":"cpsc","courses_avg":71.44},{"courses_dept":"cpsc","courses_avg":71.45},{"courses_dept":"cpsc","courses_avg":71.45},{"courses_dept":"cpsc","courses_avg":71.46},{"courses_dept":"cpsc","courses_avg":71.52},{"courses_dept":"cpsc","courses_avg":71.52},{"courses_dept":"cpsc","courses_avg":71.52},{"courses_dept":"cpsc","courses_avg":71.55},{"courses_dept":"cpsc","courses_avg":71.59},{"courses_dept":"cpsc","courses_avg":71.6},{"courses_dept":"cpsc","courses_avg":71.61},{"courses_dept":"cpsc","courses_avg":71.62},{"courses_dept":"cpsc","courses_avg":71.64},{"courses_dept":"cpsc","courses_avg":71.66},{"courses_dept":"cpsc","courses_avg":71.66},{"courses_dept":"cpsc","courses_avg":71.67},{"courses_dept":"cpsc","courses_avg":71.67},{"courses_dept":"cpsc","courses_avg":71.71},{"courses_dept":"cpsc","courses_avg":71.72},{"courses_dept":"cpsc","courses_avg":71.73},{"courses_dept":"cpsc","courses_avg":71.75},{"courses_dept":"cpsc","courses_avg":71.75},{"courses_dept":"cpsc","courses_avg":71.77},{"courses_dept":"cpsc","courses_avg":71.77},{"courses_dept":"cpsc","courses_avg":71.79},{"courses_dept":"cpsc","courses_avg":71.8},{"courses_dept":"cpsc","courses_avg":71.8},{"courses_dept":"cpsc","courses_avg":71.81},{"courses_dept":"cpsc","courses_avg":71.82},{"courses_dept":"cpsc","courses_avg":71.87},{"courses_dept":"cpsc","courses_avg":71.89},{"courses_dept":"cpsc","courses_avg":71.89},{"courses_dept":"cpsc","courses_avg":71.89},{"courses_dept":"cpsc","courses_avg":71.89},{"courses_dept":"cpsc","courses_avg":71.92},{"courses_dept":"cpsc","courses_avg":71.92},{"courses_dept":"cpsc","courses_avg":71.92},{"courses_dept":"cpsc","courses_avg":71.94},{"courses_dept":"cpsc","courses_avg":71.97},{"courses_dept":"cpsc","courses_avg":71.97},{"courses_dept":"cpsc","courses_avg":71.99},{"courses_dept":"cpsc","courses_avg":71.99},{"courses_dept":"cpsc","courses_avg":72},{"courses_dept":"cpsc","courses_avg":72},{"courses_dept":"cpsc","courses_avg":72},{"courses_dept":"cpsc","courses_avg":72},{"courses_dept":"cpsc","courses_avg":72.03},{"courses_dept":"cpsc","courses_avg":72.11},{"courses_dept":"cpsc","courses_avg":72.15},{"courses_dept":"cpsc","courses_avg":72.15},{"courses_dept":"cpsc","courses_avg":72.15},{"courses_dept":"cpsc","courses_avg":72.16},{"courses_dept":"cpsc","courses_avg":72.17},{"courses_dept":"cpsc","courses_avg":72.17},{"courses_dept":"cpsc","courses_avg":72.18},{"courses_dept":"cpsc","courses_avg":72.18},{"courses_dept":"cpsc","courses_avg":72.19},{"courses_dept":"cpsc","courses_avg":72.21},{"courses_dept":"cpsc","courses_avg":72.21},{"courses_dept":"cpsc","courses_avg":72.21},{"courses_dept":"cpsc","courses_avg":72.21},{"courses_dept":"cpsc","courses_avg":72.23},{"courses_dept":"cpsc","courses_avg":72.24},{"courses_dept":"cpsc","courses_avg":72.24},{"courses_dept":"cpsc","courses_avg":72.25},{"courses_dept":"cpsc","courses_avg":72.27},{"courses_dept":"cpsc","courses_avg":72.28},{"courses_dept":"cpsc","courses_avg":72.33},{"courses_dept":"cpsc","courses_avg":72.36},{"courses_dept":"cpsc","courses_avg":72.36},{"courses_dept":"cpsc","courses_avg":72.36},{"courses_dept":"cpsc","courses_avg":72.39},{"courses_dept":"cpsc","courses_avg":72.39},{"courses_dept":"cpsc","courses_avg":72.4},{"courses_dept":"cpsc","courses_avg":72.4},{"courses_dept":"cpsc","courses_avg":72.46},{"courses_dept":"cpsc","courses_avg":72.46},{"courses_dept":"cpsc","courses_avg":72.46},{"courses_dept":"cpsc","courses_avg":72.48},{"courses_dept":"cpsc","courses_avg":72.48},{"courses_dept":"cpsc","courses_avg":72.5},{"courses_dept":"cpsc","courses_avg":72.5},{"courses_dept":"cpsc","courses_avg":72.53},{"courses_dept":"cpsc","courses_avg":72.53},{"courses_dept":"cpsc","courses_avg":72.53},{"courses_dept":"cpsc","courses_avg":72.57},{"courses_dept":"cpsc","courses_avg":72.58},{"courses_dept":"cpsc","courses_avg":72.63},{"courses_dept":"cpsc","courses_avg":72.65},{"courses_dept":"cpsc","courses_avg":72.65},{"courses_dept":"cpsc","courses_avg":72.65},{"courses_dept":"cpsc","courses_avg":72.67},{"courses_dept":"cpsc","courses_avg":72.68},{"courses_dept":"cpsc","courses_avg":72.69},{"courses_dept":"cpsc","courses_avg":72.69},{"courses_dept":"cpsc","courses_avg":72.74},{"courses_dept":"cpsc","courses_avg":72.75},{"courses_dept":"cpsc","courses_avg":72.75},{"courses_dept":"cpsc","courses_avg":72.75},{"courses_dept":"cpsc","courses_avg":72.77},{"courses_dept":"cpsc","courses_avg":72.77},{"courses_dept":"cpsc","courses_avg":72.77},{"courses_dept":"cpsc","courses_avg":72.78},{"courses_dept":"cpsc","courses_avg":72.78},{"courses_dept":"cpsc","courses_avg":72.78},{"courses_dept":"cpsc","courses_avg":72.78},{"courses_dept":"cpsc","courses_avg":72.79},{"courses_dept":"cpsc","courses_avg":72.83},{"courses_dept":"cpsc","courses_avg":72.83},{"courses_dept":"cpsc","courses_avg":72.85},{"courses_dept":"cpsc","courses_avg":72.86},{"courses_dept":"cpsc","courses_avg":72.89},{"courses_dept":"cpsc","courses_avg":72.9},{"courses_dept":"cpsc","courses_avg":72.91},{"courses_dept":"cpsc","courses_avg":72.91},{"courses_dept":"cpsc","courses_avg":72.94},{"courses_dept":"cpsc","courses_avg":72.94},{"courses_dept":"cpsc","courses_avg":72.95},{"courses_dept":"cpsc","courses_avg":73},{"courses_dept":"cpsc","courses_avg":73},{"courses_dept":"cpsc","courses_avg":73},{"courses_dept":"cpsc","courses_avg":73.03},{"courses_dept":"cpsc","courses_avg":73.03},{"courses_dept":"cpsc","courses_avg":73.03},{"courses_dept":"cpsc","courses_avg":73.07},{"courses_dept":"cpsc","courses_avg":73.07},{"courses_dept":"cpsc","courses_avg":73.07},{"courses_dept":"cpsc","courses_avg":73.09},{"courses_dept":"cpsc","courses_avg":73.13},{"courses_dept":"cpsc","courses_avg":73.13},{"courses_dept":"cpsc","courses_avg":73.13},{"courses_dept":"cpsc","courses_avg":73.13},{"courses_dept":"cpsc","courses_avg":73.16},{"courses_dept":"cpsc","courses_avg":73.17},{"courses_dept":"cpsc","courses_avg":73.17},{"courses_dept":"cpsc","courses_avg":73.17},{"courses_dept":"cpsc","courses_avg":73.18},{"courses_dept":"cpsc","courses_avg":73.18},{"courses_dept":"cpsc","courses_avg":73.18},{"courses_dept":"cpsc","courses_avg":73.18},{"courses_dept":"cpsc","courses_avg":73.18},{"courses_dept":"cpsc","courses_avg":73.2},{"courses_dept":"cpsc","courses_avg":73.24},{"courses_dept":"cpsc","courses_avg":73.25},{"courses_dept":"cpsc","courses_avg":73.25},{"courses_dept":"cpsc","courses_avg":73.25},{"courses_dept":"cpsc","courses_avg":73.27},{"courses_dept":"cpsc","courses_avg":73.27},{"courses_dept":"cpsc","courses_avg":73.28},{"courses_dept":"cpsc","courses_avg":73.3},{"courses_dept":"cpsc","courses_avg":73.3},{"courses_dept":"cpsc","courses_avg":73.31},{"courses_dept":"cpsc","courses_avg":73.33},{"courses_dept":"cpsc","courses_avg":73.33},{"courses_dept":"cpsc","courses_avg":73.34},{"courses_dept":"cpsc","courses_avg":73.36},{"courses_dept":"cpsc","courses_avg":73.36},{"courses_dept":"cpsc","courses_avg":73.36},{"courses_dept":"cpsc","courses_avg":73.37},{"courses_dept":"cpsc","courses_avg":73.37},{"courses_dept":"cpsc","courses_avg":73.38},{"courses_dept":"cpsc","courses_avg":73.38},{"courses_dept":"cpsc","courses_avg":73.41},{"courses_dept":"cpsc","courses_avg":73.41},{"courses_dept":"cpsc","courses_avg":73.45},{"courses_dept":"cpsc","courses_avg":73.49},{"courses_dept":"cpsc","courses_avg":73.5},{"courses_dept":"cpsc","courses_avg":73.53},{"courses_dept":"cpsc","courses_avg":73.55},{"courses_dept":"cpsc","courses_avg":73.56},{"courses_dept":"cpsc","courses_avg":73.58},{"courses_dept":"cpsc","courses_avg":73.58},{"courses_dept":"cpsc","courses_avg":73.58},{"courses_dept":"cpsc","courses_avg":73.59},{"courses_dept":"cpsc","courses_avg":73.62},{"courses_dept":"cpsc","courses_avg":73.62},{"courses_dept":"cpsc","courses_avg":73.62},{"courses_dept":"cpsc","courses_avg":73.63},{"courses_dept":"cpsc","courses_avg":73.64},{"courses_dept":"cpsc","courses_avg":73.64},{"courses_dept":"cpsc","courses_avg":73.68},{"courses_dept":"cpsc","courses_avg":73.68},{"courses_dept":"cpsc","courses_avg":73.72},{"courses_dept":"cpsc","courses_avg":73.73},{"courses_dept":"cpsc","courses_avg":73.73},{"courses_dept":"cpsc","courses_avg":73.75},{"courses_dept":"cpsc","courses_avg":73.75},{"courses_dept":"cpsc","courses_avg":73.79},{"courses_dept":"cpsc","courses_avg":73.83},{"courses_dept":"cpsc","courses_avg":73.83},{"courses_dept":"cpsc","courses_avg":73.83},{"courses_dept":"cpsc","courses_avg":73.83},{"courses_dept":"cpsc","courses_avg":73.88},{"courses_dept":"cpsc","courses_avg":73.88},{"courses_dept":"cpsc","courses_avg":73.88},{"courses_dept":"cpsc","courses_avg":73.91},{"courses_dept":"cpsc","courses_avg":73.93},{"courses_dept":"cpsc","courses_avg":73.95},{"courses_dept":"cpsc","courses_avg":73.95},{"courses_dept":"cpsc","courses_avg":73.97},{"courses_dept":"cpsc","courses_avg":73.98},{"courses_dept":"cpsc","courses_avg":74},{"courses_dept":"cpsc","courses_avg":74},{"courses_dept":"cpsc","courses_avg":74},{"courses_dept":"cpsc","courses_avg":74.02},{"courses_dept":"cpsc","courses_avg":74.04},{"courses_dept":"cpsc","courses_avg":74.04},{"courses_dept":"cpsc","courses_avg":74.04},{"courses_dept":"cpsc","courses_avg":74.04},{"courses_dept":"cpsc","courses_avg":74.04},{"courses_dept":"cpsc","courses_avg":74.06},{"courses_dept":"cpsc","courses_avg":74.06},{"courses_dept":"cpsc","courses_avg":74.06},{"courses_dept":"cpsc","courses_avg":74.06},{"courses_dept":"cpsc","courses_avg":74.07},{"courses_dept":"cpsc","courses_avg":74.08},{"courses_dept":"cpsc","courses_avg":74.09},{"courses_dept":"cpsc","courses_avg":74.12},{"courses_dept":"cpsc","courses_avg":74.13},{"courses_dept":"cpsc","courses_avg":74.14},{"courses_dept":"cpsc","courses_avg":74.15},{"courses_dept":"cpsc","courses_avg":74.15},{"courses_dept":"cpsc","courses_avg":74.17},{"courses_dept":"cpsc","courses_avg":74.17},{"courses_dept":"cpsc","courses_avg":74.17},{"courses_dept":"cpsc","courses_avg":74.2},{"courses_dept":"cpsc","courses_avg":74.22},{"courses_dept":"cpsc","courses_avg":74.22},{"courses_dept":"cpsc","courses_avg":74.22},{"courses_dept":"cpsc","courses_avg":74.22},{"courses_dept":"cpsc","courses_avg":74.23},{"courses_dept":"cpsc","courses_avg":74.23},{"courses_dept":"cpsc","courses_avg":74.24},{"courses_dept":"cpsc","courses_avg":74.25},{"courses_dept":"cpsc","courses_avg":74.25},{"courses_dept":"cpsc","courses_avg":74.26},{"courses_dept":"cpsc","courses_avg":74.26},{"courses_dept":"cpsc","courses_avg":74.29},{"courses_dept":"cpsc","courses_avg":74.29},{"courses_dept":"cpsc","courses_avg":74.34},{"courses_dept":"cpsc","courses_avg":74.34},{"courses_dept":"cpsc","courses_avg":74.34},{"courses_dept":"cpsc","courses_avg":74.35},{"courses_dept":"cpsc","courses_avg":74.41},{"courses_dept":"cpsc","courses_avg":74.42},{"courses_dept":"cpsc","courses_avg":74.43},{"courses_dept":"cpsc","courses_avg":74.43},{"courses_dept":"cpsc","courses_avg":74.44},{"courses_dept":"cpsc","courses_avg":74.45},{"courses_dept":"cpsc","courses_avg":74.45},{"courses_dept":"cpsc","courses_avg":74.45},{"courses_dept":"cpsc","courses_avg":74.45},{"courses_dept":"cpsc","courses_avg":74.46},{"courses_dept":"cpsc","courses_avg":74.46},{"courses_dept":"cpsc","courses_avg":74.48},{"courses_dept":"cpsc","courses_avg":74.5},{"courses_dept":"cpsc","courses_avg":74.52},{"courses_dept":"cpsc","courses_avg":74.54},{"courses_dept":"cpsc","courses_avg":74.54},{"courses_dept":"cpsc","courses_avg":74.54},{"courses_dept":"cpsc","courses_avg":74.57},{"courses_dept":"cpsc","courses_avg":74.58},{"courses_dept":"cpsc","courses_avg":74.58},{"courses_dept":"cpsc","courses_avg":74.62},{"courses_dept":"cpsc","courses_avg":74.65},{"courses_dept":"cpsc","courses_avg":74.67},{"courses_dept":"cpsc","courses_avg":74.67},{"courses_dept":"cpsc","courses_avg":74.67},{"courses_dept":"cpsc","courses_avg":74.67},{"courses_dept":"cpsc","courses_avg":74.68},{"courses_dept":"cpsc","courses_avg":74.68},{"courses_dept":"cpsc","courses_avg":74.68},{"courses_dept":"cpsc","courses_avg":74.68},{"courses_dept":"cpsc","courses_avg":74.7},{"courses_dept":"cpsc","courses_avg":74.72},{"courses_dept":"cpsc","courses_avg":74.73},{"courses_dept":"cpsc","courses_avg":74.73},{"courses_dept":"cpsc","courses_avg":74.75},{"courses_dept":"cpsc","courses_avg":74.75},{"courses_dept":"cpsc","courses_avg":74.75},{"courses_dept":"cpsc","courses_avg":74.79},{"courses_dept":"cpsc","courses_avg":74.8},{"courses_dept":"cpsc","courses_avg":74.82},{"courses_dept":"cpsc","courses_avg":74.82},{"courses_dept":"cpsc","courses_avg":74.82},{"courses_dept":"cpsc","courses_avg":74.83},{"courses_dept":"cpsc","courses_avg":74.84},{"courses_dept":"cpsc","courses_avg":74.84},{"courses_dept":"cpsc","courses_avg":74.85},{"courses_dept":"cpsc","courses_avg":74.86},{"courses_dept":"cpsc","courses_avg":74.86},{"courses_dept":"cpsc","courses_avg":74.86},{"courses_dept":"cpsc","courses_avg":74.88},{"courses_dept":"cpsc","courses_avg":74.88},{"courses_dept":"cpsc","courses_avg":74.88},{"courses_dept":"cpsc","courses_avg":74.93},{"courses_dept":"cpsc","courses_avg":74.93},{"courses_dept":"cpsc","courses_avg":74.93},{"courses_dept":"cpsc","courses_avg":74.95},{"courses_dept":"cpsc","courses_avg":74.97},{"courses_dept":"cpsc","courses_avg":74.99},{"courses_dept":"cpsc","courses_avg":75},{"courses_dept":"cpsc","courses_avg":75},{"courses_dept":"cpsc","courses_avg":75},{"courses_dept":"cpsc","courses_avg":75.01},{"courses_dept":"cpsc","courses_avg":75.02},{"courses_dept":"cpsc","courses_avg":75.04},{"courses_dept":"cpsc","courses_avg":75.06},{"courses_dept":"cpsc","courses_avg":75.14},{"courses_dept":"cpsc","courses_avg":75.15},{"courses_dept":"cpsc","courses_avg":75.15},{"courses_dept":"cpsc","courses_avg":75.16},{"courses_dept":"cpsc","courses_avg":75.17},{"courses_dept":"cpsc","courses_avg":75.18},{"courses_dept":"cpsc","courses_avg":75.19},{"courses_dept":"cpsc","courses_avg":75.2},{"courses_dept":"cpsc","courses_avg":75.2},{"courses_dept":"cpsc","courses_avg":75.22},{"courses_dept":"cpsc","courses_avg":75.23},{"courses_dept":"cpsc","courses_avg":75.25},{"courses_dept":"cpsc","courses_avg":75.26},{"courses_dept":"cpsc","courses_avg":75.28},{"courses_dept":"cpsc","courses_avg":75.28},{"courses_dept":"cpsc","courses_avg":75.28},{"courses_dept":"cpsc","courses_avg":75.28},{"courses_dept":"cpsc","courses_avg":75.29},{"courses_dept":"cpsc","courses_avg":75.29},{"courses_dept":"cpsc","courses_avg":75.33},{"courses_dept":"cpsc","courses_avg":75.34},{"courses_dept":"cpsc","courses_avg":75.36},{"courses_dept":"cpsc","courses_avg":75.4},{"courses_dept":"cpsc","courses_avg":75.48},{"courses_dept":"cpsc","courses_avg":75.49},{"courses_dept":"cpsc","courses_avg":75.49},{"courses_dept":"cpsc","courses_avg":75.5},{"courses_dept":"cpsc","courses_avg":75.52},{"courses_dept":"cpsc","courses_avg":75.52},{"courses_dept":"cpsc","courses_avg":75.54},{"courses_dept":"cpsc","courses_avg":75.56},{"courses_dept":"cpsc","courses_avg":75.57},{"courses_dept":"cpsc","courses_avg":75.57},{"courses_dept":"cpsc","courses_avg":75.58},{"courses_dept":"cpsc","courses_avg":75.61},{"courses_dept":"cpsc","courses_avg":75.61},{"courses_dept":"cpsc","courses_avg":75.61},{"courses_dept":"cpsc","courses_avg":75.61},{"courses_dept":"cpsc","courses_avg":75.65},{"courses_dept":"cpsc","courses_avg":75.68},{"courses_dept":"cpsc","courses_avg":75.68},{"courses_dept":"cpsc","courses_avg":75.69},{"courses_dept":"cpsc","courses_avg":75.71},{"courses_dept":"cpsc","courses_avg":75.72},{"courses_dept":"cpsc","courses_avg":75.78},{"courses_dept":"cpsc","courses_avg":75.8},{"courses_dept":"cpsc","courses_avg":75.81},{"courses_dept":"cpsc","courses_avg":75.81},{"courses_dept":"cpsc","courses_avg":75.81},{"courses_dept":"cpsc","courses_avg":75.81},{"courses_dept":"cpsc","courses_avg":75.82},{"courses_dept":"cpsc","courses_avg":75.82},{"courses_dept":"cpsc","courses_avg":75.86},{"courses_dept":"cpsc","courses_avg":75.89},{"courses_dept":"cpsc","courses_avg":75.89},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.97},{"courses_dept":"cpsc","courses_avg":75.98},{"courses_dept":"cpsc","courses_avg":76},{"courses_dept":"cpsc","courses_avg":76},{"courses_dept":"cpsc","courses_avg":76.04},{"courses_dept":"cpsc","courses_avg":76.05},{"courses_dept":"cpsc","courses_avg":76.06},{"courses_dept":"cpsc","courses_avg":76.12},{"courses_dept":"cpsc","courses_avg":76.12},{"courses_dept":"cpsc","courses_avg":76.13},{"courses_dept":"cpsc","courses_avg":76.17},{"courses_dept":"cpsc","courses_avg":76.17},{"courses_dept":"cpsc","courses_avg":76.2},{"courses_dept":"cpsc","courses_avg":76.24},{"courses_dept":"cpsc","courses_avg":76.24},{"courses_dept":"cpsc","courses_avg":76.26},{"courses_dept":"cpsc","courses_avg":76.26},{"courses_dept":"cpsc","courses_avg":76.26},{"courses_dept":"cpsc","courses_avg":76.26},{"courses_dept":"cpsc","courses_avg":76.27},{"courses_dept":"cpsc","courses_avg":76.31},{"courses_dept":"cpsc","courses_avg":76.31},{"courses_dept":"cpsc","courses_avg":76.31},{"courses_dept":"cpsc","courses_avg":76.31},{"courses_dept":"cpsc","courses_avg":76.32},{"courses_dept":"cpsc","courses_avg":76.34},{"courses_dept":"cpsc","courses_avg":76.34},{"courses_dept":"cpsc","courses_avg":76.34},{"courses_dept":"cpsc","courses_avg":76.34},{"courses_dept":"cpsc","courses_avg":76.35},{"courses_dept":"cpsc","courses_avg":76.38},{"courses_dept":"cpsc","courses_avg":76.43},{"courses_dept":"cpsc","courses_avg":76.43},{"courses_dept":"cpsc","courses_avg":76.43},{"courses_dept":"cpsc","courses_avg":76.46},{"courses_dept":"cpsc","courses_avg":76.46},{"courses_dept":"cpsc","courses_avg":76.46},{"courses_dept":"cpsc","courses_avg":76.52},{"courses_dept":"cpsc","courses_avg":76.52},{"courses_dept":"cpsc","courses_avg":76.52},{"courses_dept":"cpsc","courses_avg":76.58},{"courses_dept":"cpsc","courses_avg":76.59},{"courses_dept":"cpsc","courses_avg":76.6},{"courses_dept":"cpsc","courses_avg":76.61},{"courses_dept":"cpsc","courses_avg":76.61},{"courses_dept":"cpsc","courses_avg":76.65},{"courses_dept":"cpsc","courses_avg":76.66},{"courses_dept":"cpsc","courses_avg":76.71},{"courses_dept":"cpsc","courses_avg":76.75},{"courses_dept":"cpsc","courses_avg":76.75},{"courses_dept":"cpsc","courses_avg":76.77},{"courses_dept":"cpsc","courses_avg":76.81},{"courses_dept":"cpsc","courses_avg":76.84},{"courses_dept":"cpsc","courses_avg":76.84},{"courses_dept":"cpsc","courses_avg":76.87},{"courses_dept":"cpsc","courses_avg":76.91},{"courses_dept":"cpsc","courses_avg":76.93},{"courses_dept":"cpsc","courses_avg":76.93},{"courses_dept":"cpsc","courses_avg":76.94},{"courses_dept":"cpsc","courses_avg":76.96},{"courses_dept":"cpsc","courses_avg":76.96},{"courses_dept":"cpsc","courses_avg":76.98},{"courses_dept":"cpsc","courses_avg":77},{"courses_dept":"cpsc","courses_avg":77},{"courses_dept":"cpsc","courses_avg":77},{"courses_dept":"cpsc","courses_avg":77.01},{"courses_dept":"cpsc","courses_avg":77.06},{"courses_dept":"cpsc","courses_avg":77.11},{"courses_dept":"cpsc","courses_avg":77.11},{"courses_dept":"cpsc","courses_avg":77.13},{"courses_dept":"cpsc","courses_avg":77.15},{"courses_dept":"cpsc","courses_avg":77.15},{"courses_dept":"cpsc","courses_avg":77.2},{"courses_dept":"cpsc","courses_avg":77.21},{"courses_dept":"cpsc","courses_avg":77.22},{"courses_dept":"cpsc","courses_avg":77.26},{"courses_dept":"cpsc","courses_avg":77.26},{"courses_dept":"cpsc","courses_avg":77.28},{"courses_dept":"cpsc","courses_avg":77.3},{"courses_dept":"cpsc","courses_avg":77.3},{"courses_dept":"cpsc","courses_avg":77.38},{"courses_dept":"cpsc","courses_avg":77.38},{"courses_dept":"cpsc","courses_avg":77.39},{"courses_dept":"cpsc","courses_avg":77.39},{"courses_dept":"cpsc","courses_avg":77.4},{"courses_dept":"cpsc","courses_avg":77.4},{"courses_dept":"cpsc","courses_avg":77.41},{"courses_dept":"cpsc","courses_avg":77.41},{"courses_dept":"cpsc","courses_avg":77.43},{"courses_dept":"cpsc","courses_avg":77.43},{"courses_dept":"cpsc","courses_avg":77.43},{"courses_dept":"cpsc","courses_avg":77.43},{"courses_dept":"cpsc","courses_avg":77.44},{"courses_dept":"cpsc","courses_avg":77.44},{"courses_dept":"cpsc","courses_avg":77.47},{"courses_dept":"cpsc","courses_avg":77.48},{"courses_dept":"cpsc","courses_avg":77.48},{"courses_dept":"cpsc","courses_avg":77.5},{"courses_dept":"cpsc","courses_avg":77.5},{"courses_dept":"cpsc","courses_avg":77.51},{"courses_dept":"cpsc","courses_avg":77.55},{"courses_dept":"cpsc","courses_avg":77.62},{"courses_dept":"cpsc","courses_avg":77.62},{"courses_dept":"cpsc","courses_avg":77.63},{"courses_dept":"cpsc","courses_avg":77.64},{"courses_dept":"cpsc","courses_avg":77.64},{"courses_dept":"cpsc","courses_avg":77.68},{"courses_dept":"cpsc","courses_avg":77.68},{"courses_dept":"cpsc","courses_avg":77.69},{"courses_dept":"cpsc","courses_avg":77.76},{"courses_dept":"cpsc","courses_avg":77.78},{"courses_dept":"cpsc","courses_avg":77.78},{"courses_dept":"cpsc","courses_avg":77.8},{"courses_dept":"cpsc","courses_avg":77.81},{"courses_dept":"cpsc","courses_avg":77.84},{"courses_dept":"cpsc","courses_avg":77.93},{"courses_dept":"cpsc","courses_avg":77.93},{"courses_dept":"cpsc","courses_avg":77.95},{"courses_dept":"cpsc","courses_avg":77.95},{"courses_dept":"cpsc","courses_avg":77.95},{"courses_dept":"cpsc","courses_avg":78.18},{"courses_dept":"cpsc","courses_avg":78.18},{"courses_dept":"cpsc","courses_avg":78.22},{"courses_dept":"cpsc","courses_avg":78.22},{"courses_dept":"cpsc","courses_avg":78.22},{"courses_dept":"cpsc","courses_avg":78.24},{"courses_dept":"cpsc","courses_avg":78.24},{"courses_dept":"cpsc","courses_avg":78.24},{"courses_dept":"cpsc","courses_avg":78.27},{"courses_dept":"cpsc","courses_avg":78.28},{"courses_dept":"cpsc","courses_avg":78.28},{"courses_dept":"cpsc","courses_avg":78.29},{"courses_dept":"cpsc","courses_avg":78.29},{"courses_dept":"cpsc","courses_avg":78.29},{"courses_dept":"cpsc","courses_avg":78.3},{"courses_dept":"cpsc","courses_avg":78.3},{"courses_dept":"cpsc","courses_avg":78.32},{"courses_dept":"cpsc","courses_avg":78.32},{"courses_dept":"cpsc","courses_avg":78.32},{"courses_dept":"cpsc","courses_avg":78.32},{"courses_dept":"cpsc","courses_avg":78.32},{"courses_dept":"cpsc","courses_avg":78.34},{"courses_dept":"cpsc","courses_avg":78.4},{"courses_dept":"cpsc","courses_avg":78.42},{"courses_dept":"cpsc","courses_avg":78.42},{"courses_dept":"cpsc","courses_avg":78.48},{"courses_dept":"cpsc","courses_avg":78.48},{"courses_dept":"cpsc","courses_avg":78.56},{"courses_dept":"cpsc","courses_avg":78.56},{"courses_dept":"cpsc","courses_avg":78.68},{"courses_dept":"cpsc","courses_avg":78.68},{"courses_dept":"cpsc","courses_avg":78.68},{"courses_dept":"cpsc","courses_avg":78.69},{"courses_dept":"cpsc","courses_avg":78.7},{"courses_dept":"cpsc","courses_avg":78.7},{"courses_dept":"cpsc","courses_avg":78.72},{"courses_dept":"cpsc","courses_avg":78.72},{"courses_dept":"cpsc","courses_avg":78.75},{"courses_dept":"cpsc","courses_avg":78.79},{"courses_dept":"cpsc","courses_avg":78.79},{"courses_dept":"cpsc","courses_avg":78.85},{"courses_dept":"cpsc","courses_avg":78.87},{"courses_dept":"cpsc","courses_avg":78.87},{"courses_dept":"cpsc","courses_avg":78.88},{"courses_dept":"cpsc","courses_avg":78.88},{"courses_dept":"cpsc","courses_avg":78.93},{"courses_dept":"cpsc","courses_avg":78.93},{"courses_dept":"cpsc","courses_avg":78.95},{"courses_dept":"cpsc","courses_avg":78.95},{"courses_dept":"cpsc","courses_avg":78.98},{"courses_dept":"cpsc","courses_avg":79},{"courses_dept":"cpsc","courses_avg":79},{"courses_dept":"cpsc","courses_avg":79},{"courses_dept":"cpsc","courses_avg":79.02},{"courses_dept":"cpsc","courses_avg":79.04},{"courses_dept":"cpsc","courses_avg":79.12},{"courses_dept":"cpsc","courses_avg":79.12},{"courses_dept":"cpsc","courses_avg":79.12},{"courses_dept":"cpsc","courses_avg":79.13},{"courses_dept":"cpsc","courses_avg":79.13},{"courses_dept":"cpsc","courses_avg":79.19},{"courses_dept":"cpsc","courses_avg":79.19},{"courses_dept":"cpsc","courses_avg":79.24},{"courses_dept":"cpsc","courses_avg":79.24},{"courses_dept":"cpsc","courses_avg":79.24},{"courses_dept":"cpsc","courses_avg":79.25},{"courses_dept":"cpsc","courses_avg":79.25},{"courses_dept":"cpsc","courses_avg":79.29},{"courses_dept":"cpsc","courses_avg":79.29},{"courses_dept":"cpsc","courses_avg":79.31},{"courses_dept":"cpsc","courses_avg":79.31},{"courses_dept":"cpsc","courses_avg":79.39},{"courses_dept":"cpsc","courses_avg":79.39},{"courses_dept":"cpsc","courses_avg":79.41},{"courses_dept":"cpsc","courses_avg":79.41},{"courses_dept":"cpsc","courses_avg":79.42},{"courses_dept":"cpsc","courses_avg":79.43},{"courses_dept":"cpsc","courses_avg":79.43},{"courses_dept":"cpsc","courses_avg":79.44},{"courses_dept":"cpsc","courses_avg":79.46},{"courses_dept":"cpsc","courses_avg":79.46},{"courses_dept":"cpsc","courses_avg":79.46},{"courses_dept":"cpsc","courses_avg":79.46},{"courses_dept":"cpsc","courses_avg":79.5},{"courses_dept":"cpsc","courses_avg":79.54},{"courses_dept":"cpsc","courses_avg":79.54},{"courses_dept":"cpsc","courses_avg":79.56},{"courses_dept":"cpsc","courses_avg":79.56},{"courses_dept":"cpsc","courses_avg":79.62},{"courses_dept":"cpsc","courses_avg":79.62},{"courses_dept":"cpsc","courses_avg":79.69},{"courses_dept":"cpsc","courses_avg":79.69},{"courses_dept":"cpsc","courses_avg":79.76},{"courses_dept":"cpsc","courses_avg":79.76},{"courses_dept":"cpsc","courses_avg":79.78},{"courses_dept":"cpsc","courses_avg":79.78},{"courses_dept":"cpsc","courses_avg":79.83},{"courses_dept":"cpsc","courses_avg":79.87},{"courses_dept":"cpsc","courses_avg":79.87},{"courses_dept":"cpsc","courses_avg":79.88},{"courses_dept":"cpsc","courses_avg":79.88},{"courses_dept":"cpsc","courses_avg":79.88},{"courses_dept":"cpsc","courses_avg":79.88},{"courses_dept":"cpsc","courses_avg":79.98},{"courses_dept":"cpsc","courses_avg":79.98}]}

describe("InsightFacadeTest", function () {


    before(function () { //runs once
        Log.test('Before: ' + (<any>this).test.parent.title);

        inValidZip = Buffer.from(fs.readFileSync("./invalidJson.zip")).toString('base64');

    });

    beforeEach(function () {

        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        insightFacade = new InsightFacade();
        zipStuff = Buffer.from(fs.readFileSync("./courses.zip")).toString('base64');
        wrongZip = "./testfile";

        queryRequest.WHERE = {
            "GT":{
                "courses_avg":97
            }
        };
        queryRequest.OPTIONS = {
            "COLUMNS":["courses_dept", "courses_avg"],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };

        queryRequest11.WHERE = {
            "IS":{
                "courses_title":"med, soci, cultr"
            }
        };
        queryRequest11.OPTIONS = {
            "COLUMNS":["courses_dept", "courses_avg"],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };

        queryRequest14.WHERE = {
            "AND":[
                {
                    "NOT":
                        {
                            "IS":{
                                "courses_instructor":"*mckellin*"
                            }
                        }

                },
                {
                    "IS":{
                        "courses_dept":"anth"
                    }
                }
            ]
        };
        queryRequest14.OPTIONS = {
            "COLUMNS":["courses_dept", "courses_avg"],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };

        queryRequest13.WHERE = {
            "IS":{
                "courses_instructor":"*william*"
            }
        };
        queryRequest13.OPTIONS = {
            "COLUMNS":["courses_dept", "courses_avg"],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };
        queryRequest12.WHERE = {
            "AND":[{
                "IS":{"courses_dept":"cpsc"}},
                {"AND":[
                    {
                        "GT":{
                            "courses_avg":70
                        }
                    },
                    {
                        "LT":{
                            "courses_avg":80
                        }
                    }

                ]
                }]
        };
        queryRequest12.OPTIONS = {
            "COLUMNS":["courses_dept", "courses_avg"],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };

        queryRequest10.WHERE = {
            "GT":{
                "courses_audit":15
            }
        };
        queryRequest10.OPTIONS = {
            "COLUMNS":["courses_dept", "courses_avg"],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };

        queryRequest2.WHERE = {
            "OR":[
                {
                    "AND":[
                        {
                            "GT":{
                                "courses_avg":90
                            }
                        },
                        {
                            "IS":{
                                "courses_dept":"adhe"
                            }
                        }
                    ]
                },
                {
                    "EQ":{
                        "courses_avg":95
                    }
                }
            ]
        };

        queryRequest2.OPTIONS = {
            "COLUMNS":[
                "courses_dept",
                "courses_id",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };

        queryRequest3.WHERE = {
            //check wrong "courses_something"
            "OR":[
                {
                    "AND":[
                        {
                            "GT":{
                                "courses_avg":90
                            }
                        },
                        {
                            "IS":{
                                "courses_dept":"adhe"
                            }
                        }
                    ]
                },
                {
                    "EQ":{
                        "courses_avg":95
                    }
                }
            ]
        };

        queryRequest3.OPTIONS = {
            "COLUMNS":["courses_dept", "courses_avg"],
            "ORDER":"courses",
            "FORM":"TABLE"
        };

        queryRequest4.WHERE = {
            //check wrong "or, and, is, etcc"
            "OR":[
                {
                    "wrong":[
                        {
                            "wrong":{
                                "courses_avg":90
                            }
                        },
                        {
                            "IS":{
                                "courses_dept":"adhe"
                            }
                        }
                    ]
                },
                {
                    "EQ":{
                        "courses_avg":95
                    }
                }
            ]
        };

        queryRequest4.OPTIONS = {
            "COLUMNS":["courses_dept", "courses_avg"],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };

        queryRequest5.WHERE = {
            "OR":[
                {
                    "AND":[
                        {
                            "GT":{
                                "courses_avg":90
                            }
                        },
                        {
                            "IS":{
                                "courses_dept":10
                            }
                        }
                    ]
                },
                {
                    "EQ":{
                        "courses_avg":95
                    }
                }
            ]
        };

        queryRequest5.OPTIONS = {
            "COLUMNS":[
                "courses_dept",
                "courses_id",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };

        queryRequest6.WHERE = {
            "OR":[
                {
                    "AND":[
                        {
                            "GT":{
                                "courses_invalid":90
                            }
                        },
                        {
                            "IS":{
                                "courses_wrong":"adhe"
                            }
                        }
                    ]
                },
                {
                    "EQ":{
                        "courses_avg":95
                    }
                }
            ]
        };

        queryRequest6.OPTIONS = {
            "COLUMNS":[
                "courses_dept",
                "courses_id",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };

        queryRequest8.WHERE = {
            "GT":{
                "wrong_avg":97
            }
        };
        queryRequest8.OPTIONS = {
            "COLUMNS":["courses_dept", "courses_avg"],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };

        LTRequest.WHERE = {"OR": [{
                "AND":[
                    {
                        "LT":{
                            "courses_pass":90
                        }
                    },
                    {
                        "IS":{
                            "courses_instructor":"Wolfman"
                        }
                    },
                    {
                        "IS":{
                            "courses_pass":50
                        }
                    },
                    {
                        "IS":{
                            "courses_fail":5
                        }
                    },
                    {
                        "IS":{
                            "courses_audit":10
                        }
                    }
                ]
            },
                {
                    "EQ":{
                        "courses_audit":1
                    }
                }
            ]
        };

        LTRequest.OPTIONS ={
            "COLUMNS":["courses_dept", "courses_avg"],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };

    });

    after(function () {
        Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
        insightFacade = null;
    });


    it("delete file fail --- reject(404)", function () {
        this.timeout(10000);
        return insightFacade.removeDataset('courses').then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(404);
        });
    });



    it("cant parse file - reject 400", function () {
        this.timeout(10000);
        return insightFacade.addDataset('courses123', inValidZip).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log(JSON.stringify(err.body));
            expect(err.code).to.equal(400);
        });
    });

    it("cant parse file(no result key) - reject 400", function () {
        this.timeout(10000);
        return insightFacade.addDataset('coursesNO', noResultZip).then(function(value) {
            Log.test('Value: ' + value.body);
            expect.fail();
        }).catch(function (err) {
            expect(err.code).to.equal(400);
        });
    });

    it("cant parse not a zip file - reject 400", function () {
        this.timeout(10000);
        return insightFacade.addDataset('coursesDIE', wrongZip).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log(JSON.stringify(err.body));
            expect(err.code).to.equal(400);
        });
    });

    it("first add of file - resolve in 204", function () {
        this.timeout(10000);
        return insightFacade.addDataset('courses', zipStuff).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(204);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            expect(value.body).to.deep.equal(testResult);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });


    it("query1", function () {
        this.timeout(10000);
        return insightFacade.performQuery(coursefailRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //expect(value.body).to.deep.equal(testResult);
        }).catch(function (err) {
            console.log("error" +err);

            console.log(err.body);
            expect.fail();
        });
    });


    it("query with audit", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest10).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
           // Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query with title", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest11).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
           // Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query with gt70 and lt80 and cpsc", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest12).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            expect(value.body).to.deep.equal(resultFor70and80);
            //Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query with partial names", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest13).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            expect(value.body).to.deep.equal(resultPatial);
          //Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query with not is, and is", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest14).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
          // Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query with no order str", function () {

        //actually falsey, b/c no order string also wrong keys in where
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest3).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(400);
        });
    });



    it("query with wrong courses_wrong", function () {

        //wrong thingy
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest6).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            Log.test('Value: ' + err.code);
            expect(err.code).to.equal(400);
        });
    });

    it("query with wrong AND, OR", function () {

        this.timeout(10000);
        return insightFacade.performQuery(queryRequest4).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            Log.test('Value: ' + err.code);
            expect(err.code).to.equal(400);
        });
    });

    it("query with wrong type", function () {

        this.timeout(10000);
        return insightFacade.performQuery(queryRequest5).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            Log.test('Value: ' + err.code);
            expect(err.code).to.equal(400);
        });
    });

    it("query with null Options", function () {

        this.timeout(10000);
        return insightFacade.performQuery(nullOptionsRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            Log.test('Value: ' + err.body);
            expect(err.code).to.equal(400);
        });
    });


    it("query_ complex", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest2).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            expect(value.body).to.deep.equal(testResult_complex);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });


    it("query with wrong id", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest8).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(424);
        });
    });

    it("LTquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(LTRequest).then(function(value) {
            Log.test('Value: ' + value.code);
        }).catch(function (err) {
            console.log("error" +err);
        });
    });

    it("notJsonquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(notJsonRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(400);
        });
    });

    it("wrongFormquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(wrongFormRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(400);
        });
    });

    it("emptyORFormquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(emptyORRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(400);
        });
    });

    it("emptyANDFormquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(emptyANDRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(400);
        });
    });


    it("coverageQuery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(coverageRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
        }).catch(function (err) {
            console.log("error" +err);
        });
    });

    it("second add --- resolve(201)", function () {
        this.timeout(10000);
        return insightFacade.addDataset('courses', zipStuff).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(201);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("exists file --- resolve(201)", function () {
        this.timeout(10000);
        return insightFacade.addDataset('courses', zipStuff).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(201);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("delete file success --- resolve(204)", function () {
        this.timeout(10000);
        return insightFacade.removeDataset('courses').then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(204);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("last add, folder exist but no file - resolve in 204", function () {
        this.timeout(10000);
        return insightFacade.addDataset('courses', zipStuff).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(204);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });


    it("delete file fail(invalid ID) --- reject(404)", function () {
        this.timeout(10000);
        return insightFacade.removeDataset(null).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(400);
        });
    });

    it("add file fail(invalid ID) --- reject(400)", function () {
        this.timeout(10000);
        return insightFacade.addDataset(null, zipStuff).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(400);
        });
    });


});
