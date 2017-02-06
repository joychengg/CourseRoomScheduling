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

var invalidFile =  Buffer.from(fs.readFileSync("./test.png")).toString('base64');
var Serv1 = new Server(8888);
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

var queryRequest15: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};

var queryRequest16: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        ORDER: '',
        FORM:"TABLE"
    }
};

var queryRequest17: QueryRequest = {
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

var invalidISRequest: QueryRequest = {
    WHERE: {"IS":[{"courses_dept": "cpsc"},{ "courses_instructor" : "*william*"}]},
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

var doubleNegateRequest: QueryRequest = {
    WHERE: {"NOT":{"NOT" : {
        "GT":{
            "courses_avg":93.5
        }
    }}},
    OPTIONS: {"COLUMNS":[
        "courses_dept",
        "courses_id",
        "courses_avg"
    ],
        "ORDER":"courses_avg",
        "FORM":"TABLE"
    }
};

var fireTruckRequest: QueryRequest = {
    WHERE: {"AND": [{"IS" : {
        "courses_dept" : "cpsc"
    }},
        {"NOT": {
        "IS" : {
            "courses_id" : "121"
        }
        }}]},
    OPTIONS: {"COLUMNS":[
        "courses_dept",
        "courses_id"
    ],
        "ORDER":"courses_id",
        "FORM":"TABLE"
    }};

var errorRequest: QueryRequest = {
    WHERE: {"AND": [{"IS" : {
        "courses_dept" : "cpsc"
    }},
        {"NOT": {
            "IS" : {
                "courses_id" : "121"
            }
        }}]},
    OPTIONS: {"COLUMNS":[
        "courses_dept",
        "courses_id"
    ],
        "ORDER":"courses_avg",
        "FORM":"TABLE"
    }};

var fireTruckResult = {"render":"TABLE","result":[{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"110"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"210"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"213"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"221"},{"courses_dept":"cpsc","courses_id":"259"},{"courses_dept":"cpsc","courses_id":"259"},{"courses_dept":"cpsc","courses_id":"259"},{"courses_dept":"cpsc","courses_id":"259"},{"courses_dept":"cpsc","courses_id":"259"},{"courses_dept":"cpsc","courses_id":"259"},{"courses_dept":"cpsc","courses_id":"259"},{"courses_dept":"cpsc","courses_id":"259"},{"courses_dept":"cpsc","courses_id":"259"},{"courses_dept":"cpsc","courses_id":"259"},{"courses_dept":"cpsc","courses_id":"261"},{"courses_dept":"cpsc","courses_id":"261"},{"courses_dept":"cpsc","courses_id":"261"},{"courses_dept":"cpsc","courses_id":"261"},{"courses_dept":"cpsc","courses_id":"261"},{"courses_dept":"cpsc","courses_id":"261"},{"courses_dept":"cpsc","courses_id":"261"},{"courses_dept":"cpsc","courses_id":"261"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"301"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"302"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"303"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"304"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"310"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"311"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"312"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"313"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"314"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"317"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"319"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"320"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"322"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"340"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"344"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"404"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"410"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"411"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"415"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"416"},{"courses_dept":"cpsc","courses_id":"418"},{"courses_dept":"cpsc","courses_id":"418"},{"courses_dept":"cpsc","courses_id":"418"},{"courses_dept":"cpsc","courses_id":"418"},{"courses_dept":"cpsc","courses_id":"418"},{"courses_dept":"cpsc","courses_id":"418"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"420"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"421"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"422"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"425"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"430"},{"courses_dept":"cpsc","courses_id":"444"},{"courses_dept":"cpsc","courses_id":"444"},{"courses_dept":"cpsc","courses_id":"444"},{"courses_dept":"cpsc","courses_id":"444"},{"courses_dept":"cpsc","courses_id":"444"},{"courses_dept":"cpsc","courses_id":"444"},{"courses_dept":"cpsc","courses_id":"444"},{"courses_dept":"cpsc","courses_id":"444"},{"courses_dept":"cpsc","courses_id":"444"},{"courses_dept":"cpsc","courses_id":"444"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"445"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"449"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"490"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"500"},{"courses_dept":"cpsc","courses_id":"501"},{"courses_dept":"cpsc","courses_id":"501"},{"courses_dept":"cpsc","courses_id":"501"},{"courses_dept":"cpsc","courses_id":"501"},{"courses_dept":"cpsc","courses_id":"501"},{"courses_dept":"cpsc","courses_id":"501"},{"courses_dept":"cpsc","courses_id":"501"},{"courses_dept":"cpsc","courses_id":"501"},{"courses_dept":"cpsc","courses_id":"501"},{"courses_dept":"cpsc","courses_id":"501"},{"courses_dept":"cpsc","courses_id":"501"},{"courses_dept":"cpsc","courses_id":"501"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"502"},{"courses_dept":"cpsc","courses_id":"503"},{"courses_dept":"cpsc","courses_id":"503"},{"courses_dept":"cpsc","courses_id":"503"},{"courses_dept":"cpsc","courses_id":"503"},{"courses_dept":"cpsc","courses_id":"503"},{"courses_dept":"cpsc","courses_id":"503"},{"courses_dept":"cpsc","courses_id":"503"},{"courses_dept":"cpsc","courses_id":"503"},{"courses_dept":"cpsc","courses_id":"503"},{"courses_dept":"cpsc","courses_id":"503"},{"courses_dept":"cpsc","courses_id":"503"},{"courses_dept":"cpsc","courses_id":"503"},{"courses_dept":"cpsc","courses_id":"507"},{"courses_dept":"cpsc","courses_id":"507"},{"courses_dept":"cpsc","courses_id":"507"},{"courses_dept":"cpsc","courses_id":"507"},{"courses_dept":"cpsc","courses_id":"507"},{"courses_dept":"cpsc","courses_id":"507"},{"courses_dept":"cpsc","courses_id":"507"},{"courses_dept":"cpsc","courses_id":"507"},{"courses_dept":"cpsc","courses_id":"507"},{"courses_dept":"cpsc","courses_id":"507"},{"courses_dept":"cpsc","courses_id":"509"},{"courses_dept":"cpsc","courses_id":"509"},{"courses_dept":"cpsc","courses_id":"509"},{"courses_dept":"cpsc","courses_id":"509"},{"courses_dept":"cpsc","courses_id":"509"},{"courses_dept":"cpsc","courses_id":"509"},{"courses_dept":"cpsc","courses_id":"509"},{"courses_dept":"cpsc","courses_id":"509"},{"courses_dept":"cpsc","courses_id":"509"},{"courses_dept":"cpsc","courses_id":"509"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"513"},{"courses_dept":"cpsc","courses_id":"515"},{"courses_dept":"cpsc","courses_id":"515"},{"courses_dept":"cpsc","courses_id":"515"},{"courses_dept":"cpsc","courses_id":"515"},{"courses_dept":"cpsc","courses_id":"515"},{"courses_dept":"cpsc","courses_id":"515"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"521"},{"courses_dept":"cpsc","courses_id":"522"},{"courses_dept":"cpsc","courses_id":"522"},{"courses_dept":"cpsc","courses_id":"522"},{"courses_dept":"cpsc","courses_id":"522"},{"courses_dept":"cpsc","courses_id":"522"},{"courses_dept":"cpsc","courses_id":"522"},{"courses_dept":"cpsc","courses_id":"522"},{"courses_dept":"cpsc","courses_id":"522"},{"courses_dept":"cpsc","courses_id":"527"},{"courses_dept":"cpsc","courses_id":"527"},{"courses_dept":"cpsc","courses_id":"527"},{"courses_dept":"cpsc","courses_id":"527"},{"courses_dept":"cpsc","courses_id":"527"},{"courses_dept":"cpsc","courses_id":"527"},{"courses_dept":"cpsc","courses_id":"527"},{"courses_dept":"cpsc","courses_id":"527"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"540"},{"courses_dept":"cpsc","courses_id":"543"},{"courses_dept":"cpsc","courses_id":"543"},{"courses_dept":"cpsc","courses_id":"543"},{"courses_dept":"cpsc","courses_id":"543"},{"courses_dept":"cpsc","courses_id":"543"},{"courses_dept":"cpsc","courses_id":"543"},{"courses_dept":"cpsc","courses_id":"543"},{"courses_dept":"cpsc","courses_id":"543"},{"courses_dept":"cpsc","courses_id":"543"},{"courses_dept":"cpsc","courses_id":"543"},{"courses_dept":"cpsc","courses_id":"543"},{"courses_dept":"cpsc","courses_id":"543"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"544"},{"courses_dept":"cpsc","courses_id":"547"},{"courses_dept":"cpsc","courses_id":"547"},{"courses_dept":"cpsc","courses_id":"547"},{"courses_dept":"cpsc","courses_id":"547"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"},{"courses_dept":"cpsc","courses_id":"589"}]};

var fusionRequest: QueryRequest = {
    WHERE: {"AND":
        [{"IS" : {
            "courses_instructor":"wolfman, steve"

                 }},{
        "IS" :{
                "courses_instructor": "nosco, peter"}
        }]
                },
    OPTIONS: {"COLUMNS":[
        "courses_dept",
        "courses_id",
        "courses_instructor"
    ],
        "ORDER":"courses_id",
        "FORM":"TABLE"
    }
};

var queryRequest20: QueryRequest = {

    WHERE:{
    "AND":[
        {"GT" : {"courses_avg":90}},
        {"GT" : {"courses_avg":90}}
    ]

},
    OPTIONS:{
    "COLUMNS":[
        "courses_dept",
        "courses_avg"
    ],
        "ORDER":"courses_avg",
        "FORM":"TABLE"
}

}

var result14 = {"render":"TABLE","result":[{"courses_dept":"anth","courses_avg":60.05},{"courses_dept":"anth","courses_avg":60.05},{"courses_dept":"anth","courses_avg":66.21},{"courses_dept":"anth","courses_avg":66.21},{"courses_dept":"anth","courses_avg":66.76},{"courses_dept":"anth","courses_avg":66.76},{"courses_dept":"anth","courses_avg":67.58},{"courses_dept":"anth","courses_avg":68.02},{"courses_dept":"anth","courses_avg":68.02},{"courses_dept":"anth","courses_avg":69.5},{"courses_dept":"anth","courses_avg":69.5},{"courses_dept":"anth","courses_avg":69.59},{"courses_dept":"anth","courses_avg":69.59},{"courses_dept":"anth","courses_avg":69.64},{"courses_dept":"anth","courses_avg":69.64},{"courses_dept":"anth","courses_avg":69.85},{"courses_dept":"anth","courses_avg":69.85},{"courses_dept":"anth","courses_avg":70},{"courses_dept":"anth","courses_avg":70},{"courses_dept":"anth","courses_avg":70.11},{"courses_dept":"anth","courses_avg":70.96},{"courses_dept":"anth","courses_avg":70.96},{"courses_dept":"anth","courses_avg":71.15},{"courses_dept":"anth","courses_avg":71.16},{"courses_dept":"anth","courses_avg":71.16},{"courses_dept":"anth","courses_avg":71.2},{"courses_dept":"anth","courses_avg":71.2},{"courses_dept":"anth","courses_avg":71.25},{"courses_dept":"anth","courses_avg":71.25},{"courses_dept":"anth","courses_avg":71.42},{"courses_dept":"anth","courses_avg":71.48},{"courses_dept":"anth","courses_avg":71.48},{"courses_dept":"anth","courses_avg":71.56},{"courses_dept":"anth","courses_avg":71.6},{"courses_dept":"anth","courses_avg":71.6},{"courses_dept":"anth","courses_avg":71.7},{"courses_dept":"anth","courses_avg":71.84},{"courses_dept":"anth","courses_avg":71.84},{"courses_dept":"anth","courses_avg":71.86},{"courses_dept":"anth","courses_avg":71.92},{"courses_dept":"anth","courses_avg":71.92},{"courses_dept":"anth","courses_avg":71.96},{"courses_dept":"anth","courses_avg":72.19},{"courses_dept":"anth","courses_avg":72.19},{"courses_dept":"anth","courses_avg":72.21},{"courses_dept":"anth","courses_avg":72.21},{"courses_dept":"anth","courses_avg":72.21},{"courses_dept":"anth","courses_avg":72.21},{"courses_dept":"anth","courses_avg":72.22},{"courses_dept":"anth","courses_avg":72.31},{"courses_dept":"anth","courses_avg":72.47},{"courses_dept":"anth","courses_avg":72.7},{"courses_dept":"anth","courses_avg":72.7},{"courses_dept":"anth","courses_avg":72.82},{"courses_dept":"anth","courses_avg":72.82},{"courses_dept":"anth","courses_avg":72.91},{"courses_dept":"anth","courses_avg":72.91},{"courses_dept":"anth","courses_avg":72.94},{"courses_dept":"anth","courses_avg":72.94},{"courses_dept":"anth","courses_avg":73.1},{"courses_dept":"anth","courses_avg":73.1},{"courses_dept":"anth","courses_avg":73.16},{"courses_dept":"anth","courses_avg":73.17},{"courses_dept":"anth","courses_avg":73.23},{"courses_dept":"anth","courses_avg":73.23},{"courses_dept":"anth","courses_avg":73.26},{"courses_dept":"anth","courses_avg":73.26},{"courses_dept":"anth","courses_avg":73.36},{"courses_dept":"anth","courses_avg":73.55},{"courses_dept":"anth","courses_avg":73.55},{"courses_dept":"anth","courses_avg":73.56},{"courses_dept":"anth","courses_avg":73.71},{"courses_dept":"anth","courses_avg":73.73},{"courses_dept":"anth","courses_avg":73.73},{"courses_dept":"anth","courses_avg":73.91},{"courses_dept":"anth","courses_avg":74},{"courses_dept":"anth","courses_avg":74},{"courses_dept":"anth","courses_avg":74.11},{"courses_dept":"anth","courses_avg":74.11},{"courses_dept":"anth","courses_avg":74.16},{"courses_dept":"anth","courses_avg":74.16},{"courses_dept":"anth","courses_avg":74.16},{"courses_dept":"anth","courses_avg":74.33},{"courses_dept":"anth","courses_avg":74.33},{"courses_dept":"anth","courses_avg":74.33},{"courses_dept":"anth","courses_avg":74.33},{"courses_dept":"anth","courses_avg":74.37},{"courses_dept":"anth","courses_avg":74.37},{"courses_dept":"anth","courses_avg":74.38},{"courses_dept":"anth","courses_avg":74.4},{"courses_dept":"anth","courses_avg":74.41},{"courses_dept":"anth","courses_avg":74.42},{"courses_dept":"anth","courses_avg":74.42},{"courses_dept":"anth","courses_avg":74.51},{"courses_dept":"anth","courses_avg":74.51},{"courses_dept":"anth","courses_avg":74.53},{"courses_dept":"anth","courses_avg":74.61},{"courses_dept":"anth","courses_avg":74.61},{"courses_dept":"anth","courses_avg":74.63},{"courses_dept":"anth","courses_avg":74.63},{"courses_dept":"anth","courses_avg":74.64},{"courses_dept":"anth","courses_avg":74.64},{"courses_dept":"anth","courses_avg":74.7},{"courses_dept":"anth","courses_avg":74.7},{"courses_dept":"anth","courses_avg":74.74},{"courses_dept":"anth","courses_avg":74.74},{"courses_dept":"anth","courses_avg":74.76},{"courses_dept":"anth","courses_avg":74.92},{"courses_dept":"anth","courses_avg":75.32},{"courses_dept":"anth","courses_avg":75.35},{"courses_dept":"anth","courses_avg":75.35},{"courses_dept":"anth","courses_avg":75.51},{"courses_dept":"anth","courses_avg":75.51},{"courses_dept":"anth","courses_avg":75.55},{"courses_dept":"anth","courses_avg":75.55},{"courses_dept":"anth","courses_avg":75.62},{"courses_dept":"anth","courses_avg":75.62},{"courses_dept":"anth","courses_avg":75.7},{"courses_dept":"anth","courses_avg":75.7},{"courses_dept":"anth","courses_avg":75.74},{"courses_dept":"anth","courses_avg":75.74},{"courses_dept":"anth","courses_avg":75.81},{"courses_dept":"anth","courses_avg":75.81},{"courses_dept":"anth","courses_avg":75.82},{"courses_dept":"anth","courses_avg":75.82},{"courses_dept":"anth","courses_avg":75.86},{"courses_dept":"anth","courses_avg":75.86},{"courses_dept":"anth","courses_avg":75.86},{"courses_dept":"anth","courses_avg":75.95},{"courses_dept":"anth","courses_avg":75.99},{"courses_dept":"anth","courses_avg":75.99},{"courses_dept":"anth","courses_avg":76},{"courses_dept":"anth","courses_avg":76},{"courses_dept":"anth","courses_avg":76.03},{"courses_dept":"anth","courses_avg":76.03},{"courses_dept":"anth","courses_avg":76.05},{"courses_dept":"anth","courses_avg":76.05},{"courses_dept":"anth","courses_avg":76.25},{"courses_dept":"anth","courses_avg":76.25},{"courses_dept":"anth","courses_avg":76.29},{"courses_dept":"anth","courses_avg":76.44},{"courses_dept":"anth","courses_avg":76.44},{"courses_dept":"anth","courses_avg":76.52},{"courses_dept":"anth","courses_avg":76.62},{"courses_dept":"anth","courses_avg":76.62},{"courses_dept":"anth","courses_avg":76.62},{"courses_dept":"anth","courses_avg":76.62},{"courses_dept":"anth","courses_avg":76.65},{"courses_dept":"anth","courses_avg":76.65},{"courses_dept":"anth","courses_avg":76.8},{"courses_dept":"anth","courses_avg":76.8},{"courses_dept":"anth","courses_avg":76.89},{"courses_dept":"anth","courses_avg":76.98},{"courses_dept":"anth","courses_avg":76.98},{"courses_dept":"anth","courses_avg":77.04},{"courses_dept":"anth","courses_avg":77.04},{"courses_dept":"anth","courses_avg":77.08},{"courses_dept":"anth","courses_avg":77.08},{"courses_dept":"anth","courses_avg":77.1},{"courses_dept":"anth","courses_avg":77.14},{"courses_dept":"anth","courses_avg":77.14},{"courses_dept":"anth","courses_avg":77.16},{"courses_dept":"anth","courses_avg":77.16},{"courses_dept":"anth","courses_avg":77.17},{"courses_dept":"anth","courses_avg":77.17},{"courses_dept":"anth","courses_avg":77.18},{"courses_dept":"anth","courses_avg":77.18},{"courses_dept":"anth","courses_avg":77.19},{"courses_dept":"anth","courses_avg":77.19},{"courses_dept":"anth","courses_avg":77.31},{"courses_dept":"anth","courses_avg":77.31},{"courses_dept":"anth","courses_avg":77.36},{"courses_dept":"anth","courses_avg":77.4},{"courses_dept":"anth","courses_avg":77.4},{"courses_dept":"anth","courses_avg":77.54},{"courses_dept":"anth","courses_avg":77.6},{"courses_dept":"anth","courses_avg":77.76},{"courses_dept":"anth","courses_avg":77.77},{"courses_dept":"anth","courses_avg":77.77},{"courses_dept":"anth","courses_avg":77.81},{"courses_dept":"anth","courses_avg":77.81},{"courses_dept":"anth","courses_avg":78.16},{"courses_dept":"anth","courses_avg":78.86},{"courses_dept":"anth","courses_avg":79},{"courses_dept":"anth","courses_avg":79.42},{"courses_dept":"anth","courses_avg":80.07},{"courses_dept":"anth","courses_avg":80.07},{"courses_dept":"anth","courses_avg":80.16},{"courses_dept":"anth","courses_avg":80.16},{"courses_dept":"anth","courses_avg":80.57},{"courses_dept":"anth","courses_avg":80.57},{"courses_dept":"anth","courses_avg":80.86},{"courses_dept":"anth","courses_avg":80.86},{"courses_dept":"anth","courses_avg":81.06},{"courses_dept":"anth","courses_avg":81.06},{"courses_dept":"anth","courses_avg":82},{"courses_dept":"anth","courses_avg":82},{"courses_dept":"anth","courses_avg":82.07},{"courses_dept":"anth","courses_avg":82.07},{"courses_dept":"anth","courses_avg":82.2},{"courses_dept":"anth","courses_avg":82.2},{"courses_dept":"anth","courses_avg":84.13},{"courses_dept":"anth","courses_avg":84.13},{"courses_dept":"anth","courses_avg":84.25},{"courses_dept":"anth","courses_avg":84.67},{"courses_dept":"anth","courses_avg":84.67},{"courses_dept":"anth","courses_avg":84.82},{"courses_dept":"anth","courses_avg":84.82},{"courses_dept":"anth","courses_avg":85},{"courses_dept":"anth","courses_avg":85},{"courses_dept":"anth","courses_avg":85.14},{"courses_dept":"anth","courses_avg":85.14},{"courses_dept":"anth","courses_avg":85.2},{"courses_dept":"anth","courses_avg":85.2},{"courses_dept":"anth","courses_avg":85.2},{"courses_dept":"anth","courses_avg":85.2},{"courses_dept":"anth","courses_avg":85.25},{"courses_dept":"anth","courses_avg":85.25},{"courses_dept":"anth","courses_avg":85.88},{"courses_dept":"anth","courses_avg":85.88},{"courses_dept":"anth","courses_avg":86.17},{"courses_dept":"anth","courses_avg":86.17},{"courses_dept":"anth","courses_avg":86.25},{"courses_dept":"anth","courses_avg":86.25},{"courses_dept":"anth","courses_avg":86.33},{"courses_dept":"anth","courses_avg":86.33},{"courses_dept":"anth","courses_avg":86.4},{"courses_dept":"anth","courses_avg":86.4},{"courses_dept":"anth","courses_avg":86.5},{"courses_dept":"anth","courses_avg":86.56},{"courses_dept":"anth","courses_avg":86.56},{"courses_dept":"anth","courses_avg":86.62},{"courses_dept":"anth","courses_avg":86.62},{"courses_dept":"anth","courses_avg":86.67},{"courses_dept":"anth","courses_avg":86.67},{"courses_dept":"anth","courses_avg":86.69},{"courses_dept":"anth","courses_avg":86.69},{"courses_dept":"anth","courses_avg":86.73},{"courses_dept":"anth","courses_avg":86.92},{"courses_dept":"anth","courses_avg":86.92},{"courses_dept":"anth","courses_avg":87.13},{"courses_dept":"anth","courses_avg":87.13},{"courses_dept":"anth","courses_avg":87.43},{"courses_dept":"anth","courses_avg":87.43},{"courses_dept":"anth","courses_avg":87.5},{"courses_dept":"anth","courses_avg":87.5},{"courses_dept":"anth","courses_avg":87.9},{"courses_dept":"anth","courses_avg":87.9},{"courses_dept":"anth","courses_avg":88},{"courses_dept":"anth","courses_avg":88.25},{"courses_dept":"anth","courses_avg":88.25},{"courses_dept":"anth","courses_avg":88.38},{"courses_dept":"anth","courses_avg":88.38},{"courses_dept":"anth","courses_avg":88.43},{"courses_dept":"anth","courses_avg":88.6},{"courses_dept":"anth","courses_avg":88.6},{"courses_dept":"anth","courses_avg":88.67},{"courses_dept":"anth","courses_avg":88.67},{"courses_dept":"anth","courses_avg":89.67},{"courses_dept":"anth","courses_avg":89.75},{"courses_dept":"anth","courses_avg":90.92},{"courses_dept":"anth","courses_avg":90.92},{"courses_dept":"anth","courses_avg":92},{"courses_dept":"anth","courses_avg":92.29},{"courses_dept":"anth","courses_avg":92.29}]};
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

var resultPartial = {"render":"TABLE","result":[{"courses_uuid":59931,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":61259,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":25208,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":59987,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":91543,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":12235,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":25220,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":60001,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":69747,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":86258,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":91555,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":69756,"courses_dept":"anth","courses_instructor":"mckellin, william;miller, bruce"},{"courses_uuid":69764,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":12229,"courses_dept":"anth","courses_instructor":"mckellin, william"},{"courses_uuid":91263,"courses_dept":"arth","courses_instructor":"wood, william"},{"courses_uuid":10958,"courses_dept":"arth","courses_instructor":"wood, william"},{"courses_uuid":91292,"courses_dept":"arth","courses_instructor":"wood, william"},{"courses_uuid":10948,"courses_dept":"arth","courses_instructor":"wood, william"},{"courses_uuid":10978,"courses_dept":"arth","courses_instructor":"wood, william"},{"courses_uuid":98082,"courses_dept":"astu","courses_instructor":"edgington, david william"},{"courses_uuid":41150,"courses_dept":"astu","courses_instructor":"edgington, david william"},{"courses_uuid":98363,"courses_dept":"astu","courses_instructor":"edgington, david william"},{"courses_uuid":51153,"courses_dept":"astu","courses_instructor":"edgington, david william"},{"courses_uuid":98364,"courses_dept":"astu","courses_instructor":"edgington, david william"},{"courses_uuid":7644,"courses_dept":"atsc","courses_instructor":"hsieh, william"},{"courses_uuid":92337,"courses_dept":"baac","courses_instructor":"dorfmann, william"},{"courses_uuid":21679,"courses_dept":"baac","courses_instructor":"dorfmann, william"},{"courses_uuid":21678,"courses_dept":"baac","courses_instructor":"dorfmann, william"},{"courses_uuid":18789,"courses_dept":"bait","courses_instructor":"tan, william"},{"courses_uuid":35259,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":46979,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":63231,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":84753,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":89184,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":7471,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":22504,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":35261,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":46981,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":63233,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":84755,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":7469,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":8751,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":22502,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":89186,"courses_dept":"bams","courses_instructor":"donald, william stuart"},{"courses_uuid":39324,"courses_dept":"bioc","courses_instructor":"williams, warren"},{"courses_uuid":91634,"courses_dept":"bioc","courses_instructor":"krisinger, michael;williams, warren"},{"courses_uuid":97247,"courses_dept":"bioc","courses_instructor":"williams, warren"},{"courses_uuid":26646,"courses_dept":"bioc","courses_instructor":"maurus, robert;williams, warren"},{"courses_uuid":32581,"courses_dept":"bioc","courses_instructor":"maurus, robert;williams, warren"},{"courses_uuid":39325,"courses_dept":"bioc","courses_instructor":"williams, warren"},{"courses_uuid":97249,"courses_dept":"bioc","courses_instructor":"maurus, robert;williams, warren"},{"courses_uuid":26644,"courses_dept":"bioc","courses_instructor":"williams, warren"},{"courses_uuid":32579,"courses_dept":"bioc","courses_instructor":"williams, warren"},{"courses_uuid":39327,"courses_dept":"bioc","courses_instructor":"maurus, robert;williams, warren"},{"courses_uuid":19685,"courses_dept":"biol","courses_instructor":"milsom, william;tortell, philippe"},{"courses_uuid":18080,"courses_dept":"biol","courses_instructor":"millen, sandra;milsom, william"},{"courses_uuid":71018,"courses_dept":"busi","courses_instructor":"tan, william"},{"courses_uuid":73504,"courses_dept":"busi","courses_instructor":"tan, william"},{"courses_uuid":26420,"courses_dept":"busi","courses_instructor":"tan, william"},{"courses_uuid":66743,"courses_dept":"busi","courses_instructor":"tan, william"},{"courses_uuid":74173,"courses_dept":"busi","courses_instructor":"tan, william"},{"courses_uuid":118,"courses_dept":"ccst","courses_instructor":"wood, william"},{"courses_uuid":20344,"courses_dept":"ccst","courses_instructor":"wood, william"},{"courses_uuid":42608,"courses_dept":"chem","courses_instructor":"macfarlane, william andrew"},{"courses_uuid":42502,"courses_dept":"chem","courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;rogers, christine"},{"courses_uuid":64757,"courses_dept":"chem","courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;ruddick, john n r"},{"courses_uuid":64758,"courses_dept":"chem","courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;ruddick, john n r"},{"courses_uuid":64759,"courses_dept":"chem","courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;patey, grenfell;sherman, john"},{"courses_uuid":64760,"courses_dept":"chem","courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;patey, grenfell;sherman, john"},{"courses_uuid":64761,"courses_dept":"chem","courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;stewart, jaclyn"},{"courses_uuid":64762,"courses_dept":"chem","courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;stewart, jaclyn"},{"courses_uuid":64763,"courses_dept":"chem","courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;monga, vishakha"},{"courses_uuid":89339,"courses_dept":"chem","courses_instructor":"macfarlane, william andrew"},{"courses_uuid":42581,"courses_dept":"chem","courses_instructor":"macfarlane, william andrew"},{"courses_uuid":54596,"courses_dept":"chem","courses_instructor":"macfarlane, william andrew"},{"courses_uuid":64845,"courses_dept":"chem","courses_instructor":"macfarlane, william andrew"},{"courses_uuid":31331,"courses_dept":"chem","courses_instructor":"macfarlane, william andrew"},{"courses_uuid":64853,"courses_dept":"chem","courses_instructor":"macfarlane, william andrew"},{"courses_uuid":54472,"courses_dept":"chem","courses_instructor":"lekhi, priya;macfarlane, william andrew"},{"courses_uuid":89359,"courses_dept":"chem","courses_instructor":"macfarlane, william andrew"},{"courses_uuid":64756,"courses_dept":"chem","courses_instructor":"bizzotto, dan;lekhi, priya;love, jennifer ann;macfarlane, william andrew"},{"courses_uuid":54619,"courses_dept":"chem","courses_instructor":"macfarlane, william andrew"},{"courses_uuid":42501,"courses_dept":"chem","courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;rogers, christine"},{"courses_uuid":70203,"courses_dept":"chem","courses_instructor":"macfarlane, william andrew"},{"courses_uuid":10810,"courses_dept":"civl","courses_instructor":"finn, william d"},{"courses_uuid":47959,"courses_dept":"civl","courses_instructor":"finn, william d"},{"courses_uuid":53331,"courses_dept":"civl","courses_instructor":"finn, william d"},{"courses_uuid":79609,"courses_dept":"civl","courses_instructor":"finn, william d"},{"courses_uuid":84881,"courses_dept":"civl","courses_instructor":"finn, william d"},{"courses_uuid":2830,"courses_dept":"civl","courses_instructor":"finn, william d"},{"courses_uuid":45098,"courses_dept":"civl","courses_instructor":"finn, william d"},{"courses_uuid":51165,"courses_dept":"clst","courses_instructor":"williams, caroline"},{"courses_uuid":92760,"courses_dept":"clst","courses_instructor":"williams, caroline"},{"courses_uuid":13361,"courses_dept":"clst","courses_instructor":"williams, arden"},{"courses_uuid":23007,"courses_dept":"clst","courses_instructor":"williams, caroline"},{"courses_uuid":26349,"courses_dept":"clst","courses_instructor":"williams, caroline"},{"courses_uuid":51038,"courses_dept":"clst","courses_instructor":"williams, e hector"},{"courses_uuid":700,"courses_dept":"comm","courses_instructor":"cubbon, paul;jackes, robert;williamson, elaine"},{"courses_uuid":57712,"courses_dept":"comm","courses_instructor":"cubbon, paul;jackes, robert;williamson, elaine"},{"courses_uuid":57713,"courses_dept":"comm","courses_instructor":"cubbon, paul;jackes, robert;williamson, elaine"},{"courses_uuid":38803,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":81480,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":57763,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":71229,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":71230,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":83660,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":83664,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":783,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":784,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":19125,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":699,"courses_dept":"comm","courses_instructor":"cubbon, paul;jackes, robert;williamson, elaine"},{"courses_uuid":43986,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":43987,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":57790,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":57791,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":71262,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":71263,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":73289,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":81532,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":83697,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":83698,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":38881,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":38882,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":38883,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":44003,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":67509,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":67510,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":67511,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":67512,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":83713,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":83714,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":822,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":823,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":38903,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":38904,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":44026,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":44027,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":57824,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":57825,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":71295,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":71296,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":81572,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":81573,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":83737,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":83738,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":96437,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":96438,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":96439,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":96440,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":971,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":44186,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":57935,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":71416,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":81766,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":83898,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":83899,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":96551,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":39142,"courses_dept":"comm","courses_instructor":"dorfmann, william"},{"courses_uuid":39149,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":81824,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":83955,"courses_dept":"comm","courses_instructor":"williamson, elaine"},{"courses_uuid":23326,"courses_dept":"comm","courses_instructor":"tan, william"},{"courses_uuid":1252,"courses_dept":"cpsc","courses_instructor":"aiello, william"},{"courses_uuid":49873,"courses_dept":"cpsc","courses_instructor":"evans, william"},{"courses_uuid":61104,"courses_dept":"cpsc","courses_instructor":"evans, william"},{"courses_uuid":62368,"courses_dept":"cpsc","courses_instructor":"evans, william"},{"courses_uuid":72343,"courses_dept":"cpsc","courses_instructor":"evans, william"},{"courses_uuid":83412,"courses_dept":"cpsc","courses_instructor":"evans, william"},{"courses_uuid":49905,"courses_dept":"cpsc","courses_instructor":"aiello, william"},{"courses_uuid":61135,"courses_dept":"cpsc","courses_instructor":"aiello, william"},{"courses_uuid":83444,"courses_dept":"cpsc","courses_instructor":"aiello, william"},{"courses_uuid":46712,"courses_dept":"cpsc","courses_instructor":"evans, william"},{"courses_uuid":62427,"courses_dept":"cpsc","courses_instructor":"evans, william"},{"courses_uuid":46760,"courses_dept":"cpsc","courses_instructor":"evans, william"},{"courses_uuid":61190,"courses_dept":"cpsc","courses_instructor":"evans, william"},{"courses_uuid":62450,"courses_dept":"cpsc","courses_instructor":"evans, william"},{"courses_uuid":72426,"courses_dept":"cpsc","courses_instructor":"evans, william"},{"courses_uuid":83493,"courses_dept":"cpsc","courses_instructor":"evans, william"},{"courses_uuid":62344,"courses_dept":"cpsc","courses_instructor":"aiello, william"},{"courses_uuid":22030,"courses_dept":"econ","courses_instructor":"riddell, william"},{"courses_uuid":91018,"courses_dept":"econ","courses_instructor":"riddell, william"},{"courses_uuid":74425,"courses_dept":"econ","courses_instructor":"riddell, william"},{"courses_uuid":78472,"courses_dept":"econ","courses_instructor":"riddell, william"},{"courses_uuid":52252,"courses_dept":"econ","courses_instructor":"riddell, william"},{"courses_uuid":52371,"courses_dept":"econ","courses_instructor":"riddell, william"},{"courses_uuid":43621,"courses_dept":"edcp","courses_instructor":"pinar, william"},{"courses_uuid":17444,"courses_dept":"edcp","courses_instructor":"pinar, william"},{"courses_uuid":64728,"courses_dept":"edcp","courses_instructor":"pinar, william"},{"courses_uuid":21738,"courses_dept":"edcp","courses_instructor":"pinar, william"},{"courses_uuid":15249,"courses_dept":"edcp","courses_instructor":"pinar, william"},{"courses_uuid":30898,"courses_dept":"elec","courses_instructor":"dunford, william"},{"courses_uuid":64276,"courses_dept":"engl","courses_instructor":"salmon, william noel"},{"courses_uuid":64287,"courses_dept":"engl","courses_instructor":"salmon, william noel"},{"courses_uuid":64292,"courses_dept":"engl","courses_instructor":"salmon, william noel"},{"courses_uuid":64298,"courses_dept":"engl","courses_instructor":"salmon, william noel"},{"courses_uuid":42757,"courses_dept":"engl","courses_instructor":"salmon, william noel"},{"courses_uuid":20772,"courses_dept":"engl","courses_instructor":"salmon, william noel"},{"courses_uuid":86308,"courses_dept":"eosc","courses_instructor":"francois, roger;hsieh, william"},{"courses_uuid":2497,"courses_dept":"eosc","courses_instructor":"hsieh, william"},{"courses_uuid":17812,"courses_dept":"eosc","courses_instructor":"hsieh, william"},{"courses_uuid":38637,"courses_dept":"eosc","courses_instructor":"hsieh, william"},{"courses_uuid":61444,"courses_dept":"epse","courses_instructor":"mckee, william"},{"courses_uuid":76321,"courses_dept":"epse","courses_instructor":"mckee, william"},{"courses_uuid":86936,"courses_dept":"epse","courses_instructor":"mckee, william"},{"courses_uuid":8668,"courses_dept":"fopr","courses_instructor":"nelson, harry william"},{"courses_uuid":45871,"courses_dept":"fopr","courses_instructor":"nelson, harry william"},{"courses_uuid":27009,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":52907,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":77661,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":81390,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":84430,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":90714,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":94306,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":94311,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":58930,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":90723,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":94326,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":52956,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":90772,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":94374,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":27085,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":59004,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":77737,"courses_dept":"fren","courses_instructor":"winder, william"},{"courses_uuid":7348,"courses_dept":"frst","courses_instructor":"nelson, harry william"},{"courses_uuid":21253,"courses_dept":"frst","courses_instructor":"nelson, harry william"},{"courses_uuid":54932,"courses_dept":"frst","courses_instructor":"nelson, harry william"},{"courses_uuid":86583,"courses_dept":"frst","courses_instructor":"nelson, harry william"},{"courses_uuid":89569,"courses_dept":"frst","courses_instructor":"nelson, harry william"},{"courses_uuid":97663,"courses_dept":"frst","courses_instructor":"nelson, harry william"},{"courses_uuid":62521,"courses_dept":"frst","courses_instructor":"nelson, harry william"},{"courses_uuid":62533,"courses_dept":"frst","courses_instructor":"nelson, harry william"},{"courses_uuid":54996,"courses_dept":"frst","courses_instructor":"nelson, harry william"},{"courses_uuid":34899,"courses_dept":"frst","courses_instructor":"nelson, harry william"},{"courses_uuid":37523,"courses_dept":"geob","courses_instructor":"williams, jennifer"},{"courses_uuid":56749,"courses_dept":"geob","courses_instructor":"williams, jennifer"},{"courses_uuid":24408,"courses_dept":"geob","courses_instructor":"eaton, brett;koppes, michele;moore, robert daniel;williams, jennifer"},{"courses_uuid":51107,"courses_dept":"geob","courses_instructor":"koppes, michele;mckendry, ian;moore, robert daniel;williams, jennifer"},{"courses_uuid":37549,"courses_dept":"geob","courses_instructor":"williams, jennifer"},{"courses_uuid":51122,"courses_dept":"geob","courses_instructor":"williams, jennifer"},{"courses_uuid":24427,"courses_dept":"geob","courses_instructor":"eaton, brett;koppes, michele;moore, robert daniel;williams, jennifer"},{"courses_uuid":24395,"courses_dept":"geob","courses_instructor":"williams, jennifer"},{"courses_uuid":65354,"courses_dept":"geob","courses_instructor":"leach, jason;trubilowicz, joel william"},{"courses_uuid":28281,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":3460,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":28548,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":28549,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":29066,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":29067,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":86988,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":97099,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":14447,"courses_dept":"geog","courses_instructor":"blair, alec;williams, jennifer"},{"courses_uuid":97091,"courses_dept":"geog","courses_instructor":"edgington, david william;ley, david frederick"},{"courses_uuid":97104,"courses_dept":"geog","courses_instructor":"bakker, karen jessica;williams, jennifer"},{"courses_uuid":14473,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":14492,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":3461,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":28597,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":3554,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":28313,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":87067,"courses_dept":"geog","courses_instructor":"edgington, david william"},{"courses_uuid":97090,"courses_dept":"geog","courses_instructor":"edgington, david william;ley, david frederick"},{"courses_uuid":86993,"courses_dept":"geog","courses_instructor":"bakker, karen jessica;williams, jennifer"},{"courses_uuid":80323,"courses_dept":"grek","courses_instructor":"williams, arden"},{"courses_uuid":29621,"courses_dept":"hist","courses_instructor":"french, william earl"},{"courses_uuid":48841,"courses_dept":"hist","courses_instructor":"french, william earl"},{"courses_uuid":79411,"courses_dept":"hist","courses_instructor":"french, william earl"},{"courses_uuid":96107,"courses_dept":"hist","courses_instructor":"french, william earl"},{"courses_uuid":79465,"courses_dept":"hist","courses_instructor":"french, william earl"},{"courses_uuid":41850,"courses_dept":"hunu","courses_instructor":"miller, william"},{"courses_uuid":43666,"courses_dept":"igen","courses_instructor":"dunford, william;yonemitsu, noboru"},{"courses_uuid":68675,"courses_dept":"igen","courses_instructor":"dunford, william;yonemitsu, noboru"},{"courses_uuid":96762,"courses_dept":"igen","courses_instructor":"dunford, william;yonemitsu, noboru"},{"courses_uuid":35682,"courses_dept":"igen","courses_instructor":"dunford, william;yonemitsu, noboru"},{"courses_uuid":24288,"courses_dept":"larc","courses_instructor":"marsh, william"},{"courses_uuid":54423,"courses_dept":"larc","courses_instructor":"marsh, william"},{"courses_uuid":23758,"courses_dept":"larc","courses_instructor":"marsh, william"},{"courses_uuid":59597,"courses_dept":"larc","courses_instructor":"marsh, william"},{"courses_uuid":97208,"courses_dept":"larc","courses_instructor":"marsh, william"},{"courses_uuid":23785,"courses_dept":"larc","courses_instructor":"marsh, william"},{"courses_uuid":24314,"courses_dept":"larc","courses_instructor":"marsh, william"},{"courses_uuid":24621,"courses_dept":"larc","courses_instructor":"marsh, william"},{"courses_uuid":54447,"courses_dept":"larc","courses_instructor":"marsh, william"},{"courses_uuid":59623,"courses_dept":"larc","courses_instructor":"marsh, william"},{"courses_uuid":97229,"courses_dept":"larc","courses_instructor":"marsh, william"},{"courses_uuid":24595,"courses_dept":"larc","courses_instructor":"marsh, william"},{"courses_uuid":46131,"courses_dept":"last","courses_instructor":"cohodas, marvin;french, william earl"},{"courses_uuid":10480,"courses_dept":"last","courses_instructor":"de grandis, filomena;french, william earl"},{"courses_uuid":46133,"courses_dept":"last","courses_instructor":"de grandis, filomena;french, william earl"},{"courses_uuid":84393,"courses_dept":"last","courses_instructor":"de grandis, filomena;french, william earl"},{"courses_uuid":10478,"courses_dept":"last","courses_instructor":"cohodas, marvin;french, william earl"},{"courses_uuid":84391,"courses_dept":"last","courses_instructor":"cohodas, marvin;french, william earl"},{"courses_uuid":78849,"courses_dept":"latn","courses_instructor":"williams, e hector"},{"courses_uuid":12058,"courses_dept":"lled","courses_instructor":"d'silva, reginald;williams, elisabeth"},{"courses_uuid":6427,"courses_dept":"lled","courses_instructor":"mcmichael, william"},{"courses_uuid":6428,"courses_dept":"lled","courses_instructor":"mcmichael, william"},{"courses_uuid":35524,"courses_dept":"lled","courses_instructor":"mcmichael, william"},{"courses_uuid":35525,"courses_dept":"lled","courses_instructor":"mcmichael, william"},{"courses_uuid":52579,"courses_dept":"lled","courses_instructor":"mcmichael, william"},{"courses_uuid":52580,"courses_dept":"lled","courses_instructor":"mcmichael, william"},{"courses_uuid":6443,"courses_dept":"lled","courses_instructor":"mcmichael, william"},{"courses_uuid":6444,"courses_dept":"lled","courses_instructor":"mcmichael, william"},{"courses_uuid":12052,"courses_dept":"lled","courses_instructor":"d'silva, reginald;williams, elisabeth"},{"courses_uuid":35541,"courses_dept":"lled","courses_instructor":"mcmichael, william"},{"courses_uuid":52595,"courses_dept":"lled","courses_instructor":"mcmichael, william"},{"courses_uuid":52596,"courses_dept":"lled","courses_instructor":"mcmichael, william"},{"courses_uuid":35540,"courses_dept":"lled","courses_instructor":"mcmichael, william"},{"courses_uuid":3771,"courses_dept":"math","courses_instructor":"holmes, william"},{"courses_uuid":3776,"courses_dept":"math","courses_instructor":"thompson, william"},{"courses_uuid":33985,"courses_dept":"math","courses_instructor":"thompson, william"},{"courses_uuid":47072,"courses_dept":"math","courses_instructor":"williams, thomas"},{"courses_uuid":34057,"courses_dept":"math","courses_instructor":"williams, thomas"},{"courses_uuid":72917,"courses_dept":"math","courses_instructor":"holmes, william"},{"courses_uuid":90121,"courses_dept":"math","courses_instructor":"williams, thomas"},{"courses_uuid":47193,"courses_dept":"math","courses_instructor":"williams, thomas"},{"courses_uuid":90186,"courses_dept":"math","courses_instructor":"williams, thomas"},{"courses_uuid":90212,"courses_dept":"math","courses_instructor":"williams, thomas"},{"courses_uuid":94423,"courses_dept":"math","courses_instructor":"williams, thomas"},{"courses_uuid":12713,"courses_dept":"mech","courses_instructor":"bushe, william kendal;evans, robert;ollivier-gooch, carl"},{"courses_uuid":77333,"courses_dept":"mech","courses_instructor":"bushe, william kendal"},{"courses_uuid":45231,"courses_dept":"mech","courses_instructor":"beattie, william james"},{"courses_uuid":9077,"courses_dept":"mech","courses_instructor":"bushe, william kendal"},{"courses_uuid":9078,"courses_dept":"mech","courses_instructor":"bushe, william kendal"},{"courses_uuid":9752,"courses_dept":"mech","courses_instructor":"bushe, william kendal"},{"courses_uuid":12782,"courses_dept":"mech","courses_instructor":"fengler, markus;mikkelsen, jon;rogak, steven nicholas;schajer, gary;williams, wayne"},{"courses_uuid":45260,"courses_dept":"mech","courses_instructor":"atabaki, nima;dunwoody, a bruce;feng, hsi-yung;ma, hongshen;tba;van der loos, hendrik;williams, wayne"},{"courses_uuid":84230,"courses_dept":"mech","courses_instructor":"bushe, william kendal"},{"courses_uuid":9798,"courses_dept":"mech","courses_instructor":"bushe, william kendal"},{"courses_uuid":49570,"courses_dept":"mech","courses_instructor":"bushe, william kendal"},{"courses_uuid":77407,"courses_dept":"mech","courses_instructor":"bushe, william kendal"},{"courses_uuid":84236,"courses_dept":"mech","courses_instructor":"bushe, william kendal"},{"courses_uuid":9802,"courses_dept":"mech","courses_instructor":"williams, wayne"},{"courses_uuid":12809,"courses_dept":"mech","courses_instructor":"williams, wayne"},{"courses_uuid":45283,"courses_dept":"mech","courses_instructor":"williams, wayne"},{"courses_uuid":77411,"courses_dept":"mech","courses_instructor":"williams, wayne"},{"courses_uuid":92033,"courses_dept":"mech","courses_instructor":"williams, wayne"},{"courses_uuid":84285,"courses_dept":"mech","courses_instructor":"bushe, william kendal"},{"courses_uuid":24477,"courses_dept":"medg","courses_instructor":"gibson, william"},{"courses_uuid":37010,"courses_dept":"medg","courses_instructor":"gibson, william"},{"courses_uuid":55343,"courses_dept":"medg","courses_instructor":"gibson, william"},{"courses_uuid":17240,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":12373,"courses_dept":"micb","courses_instructor":"mohn, william"},{"courses_uuid":62287,"courses_dept":"micb","courses_instructor":"mohn, william"},{"courses_uuid":80020,"courses_dept":"micb","courses_instructor":"mohn, william"},{"courses_uuid":93651,"courses_dept":"micb","courses_instructor":"mohn, william"},{"courses_uuid":9689,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":12408,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":17236,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":17503,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":67284,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":80056,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":9697,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":9655,"courses_dept":"micb","courses_instructor":"mohn, william"},{"courses_uuid":17471,"courses_dept":"micb","courses_instructor":"mohn, william"},{"courses_uuid":17511,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":67288,"courses_dept":"micb","courses_instructor":"ramey, william d;sibley, jennifer"},{"courses_uuid":80060,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":9701,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":12421,"courses_dept":"micb","courses_instructor":"kion, tracy;ramey, william d"},{"courses_uuid":17245,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":17516,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":93704,"courses_dept":"micb","courses_instructor":"av-gay, yossef;manges, amee;mohn, william;thompson, charles"},{"courses_uuid":12416,"courses_dept":"micb","courses_instructor":"ramey, william d"},{"courses_uuid":12584,"courses_dept":"mine","courses_instructor":"lawrence, richard william"},{"courses_uuid":1478,"courses_dept":"mine","courses_instructor":"hitch, michael;lawrence, richard william"},{"courses_uuid":12598,"courses_dept":"mine","courses_instructor":"lawrence, richard william"},{"courses_uuid":19263,"courses_dept":"musc","courses_instructor":"benjamin, william e"},{"courses_uuid":4562,"courses_dept":"path","courses_instructor":"bryce, elizabeth;hsiao, william;imperial, miguel;lau, timmy;mclean, donald;morshed, muhammad;petric, martin;roscoe, diane;scott, mark;tang, patrick kwok chuen"},{"courses_uuid":49003,"courses_dept":"path","courses_instructor":"bryce, elizabeth;hsiao, william;imperial, miguel;jassem, agata;krajden, mel;morshed, muhammad;petric, martin;prystajecky, natalie;roscoe, diane;scott, mark"},{"courses_uuid":51510,"courses_dept":"path","courses_instructor":"bryce, elizabeth;hsiao, william;imperial, miguel;morshed, muhammad;petric, martin;roscoe, diane;scott, mark;tang, patrick kwok chuen"},{"courses_uuid":4566,"courses_dept":"path","courses_instructor":"au, nicholas;bruyere, helene;carter, cedric john;coupland, robert william;mcnagny, kelly marshall;medvedev, nadejda;schubert, peter;scott, mark;skinnider, brian;vercauteren, suzanne"},{"courses_uuid":12653,"courses_dept":"path","courses_instructor":"au, nicholas;broady, raewyn;bruyere, helene;carter, cedric john;coupland, robert william;mcnagny, kelly marshall;medvedev, nadejda;schubert, peter;scott, mark;serrano, katherine;vercauteren, suzanne"},{"courses_uuid":36936,"courses_dept":"path","courses_instructor":"au, nicholas;broady, raewyn;bruyere, helene;carter, cedric john;coupland, robert william;mcnagny, kelly marshall;medvedev, nadejda;schubert, peter;scott, mark;serrano, katherine;vercauteren, suzanne"},{"courses_uuid":51514,"courses_dept":"path","courses_instructor":"coupland, robert william"},{"courses_uuid":55763,"courses_dept":"path","courses_instructor":"au, nicholas;broady, raewyn;bruyere, helene;carter, cedric john;coupland, robert william;mcnagny, kelly marshall;medvedev, nadejda;schubert, peter;scott, mark;serrano, katherine;vercauteren, suzanne"},{"courses_uuid":4570,"courses_dept":"path","courses_instructor":"bradley, amanda;godolphin, william;huynh, hanh;keller, bernd"},{"courses_uuid":12657,"courses_dept":"path","courses_instructor":"bradley, amanda;godolphin, william;huynh, hanh;park, carol"},{"courses_uuid":36940,"courses_dept":"path","courses_instructor":"bradley, amanda;godolphin, william;huynh, hanh;park, carol"},{"courses_uuid":49011,"courses_dept":"path","courses_instructor":"bradley, amanda;godolphin, william;sutherland, michael"},{"courses_uuid":50767,"courses_dept":"path","courses_instructor":"godolphin, william;park, carol"},{"courses_uuid":51518,"courses_dept":"path","courses_instructor":"bradley, amanda;godolphin, william;huynh, hanh"},{"courses_uuid":55414,"courses_dept":"path","courses_instructor":"godolphin, william;park, carol"},{"courses_uuid":55767,"courses_dept":"path","courses_instructor":"bradley, amanda;godolphin, william;huynh, hanh;park, carol"},{"courses_uuid":4572,"courses_dept":"path","courses_instructor":"dooley, kent;frohlich, jiri;hill, john stuart;holmes, daniel;keller, bernd;mattman, andre;monsalve, maria victoria;nimmo, michael;pudek, morris;schreiber, william;tomalty, cheryl;vallance, hilary"},{"courses_uuid":12659,"courses_dept":"path","courses_instructor":"casey, brett;dooley, kent;frohlich, jiri;halstead, anne catherine;hill, john stuart;holmes, daniel;keller, bernd;mattman, andre;nimmo, michael;pudek, morris;schreiber, william;tomalty, cheryl;urquhart, nadine;vallance, hilary"},{"courses_uuid":36942,"courses_dept":"path","courses_instructor":"casey, brett;dooley, kent;frohlich, jiri;halstead, anne catherine;hill, john stuart;holmes, daniel;keller, bernd;mattman, andre;nimmo, michael;pudek, morris;schreiber, william;tomalty, cheryl;urquhart, nadine;vallance, hilary"},{"courses_uuid":49013,"courses_dept":"path","courses_instructor":"dooley, kent;frohlich, jiri;hauff, kristin;hill, john stuart;holmes, daniel;jung, benjamin;mattman, andre;monsalve, maria victoria;palaty, jan;pudek, morris;schreiber, william;tomalty, cheryl;tucker, tracy;vallance, hilary"},{"courses_uuid":51520,"courses_dept":"path","courses_instructor":"dooley, kent;frohlich, jiri;hill, john stuart;holmes, daniel;mattman, andre;monsalve, maria victoria;nimmo, michael;pudek, morris;schreiber, william;tomalty, cheryl;vallance, hilary"},{"courses_uuid":55769,"courses_dept":"path","courses_instructor":"casey, brett;dooley, kent;frohlich, jiri;halstead, anne catherine;hill, john stuart;holmes, daniel;keller, bernd;mattman, andre;nimmo, michael;pudek, morris;schreiber, william;tomalty, cheryl;urquhart, nadine;vallance, hilary"},{"courses_uuid":55418,"courses_dept":"path","courses_instructor":"godolphin, william"},{"courses_uuid":49033,"courses_dept":"path","courses_instructor":"bennewith, kevin;cote, helene;devlin, angela;granville, david;lockwood, william;shah, sohrab;steidl, christian;verchere, bruce;wellington, cheryl lea;weng, andrew"},{"courses_uuid":49035,"courses_dept":"path","courses_instructor":"cote, helene;kalloger, steve ernest;laule, cornelia;lockwood, william;wellington, cheryl lea"},{"courses_uuid":49036,"courses_dept":"path","courses_instructor":"cote, helene;kalloger, steve ernest;laule, cornelia;lockwood, william;wellington, cheryl lea"},{"courses_uuid":49047,"courses_dept":"path","courses_instructor":"cote, helene;kalloger, steve ernest;laule, cornelia;lockwood, william;wellington, cheryl lea"},{"courses_uuid":460,"courses_dept":"phys","courses_instructor":"unruh, william"},{"courses_uuid":98687,"courses_dept":"phys","courses_instructor":"mccutcheon, william"},{"courses_uuid":408,"courses_dept":"phys","courses_instructor":"unruh, william"},{"courses_uuid":409,"courses_dept":"phys","courses_instructor":"unruh, william"},{"courses_uuid":410,"courses_dept":"phys","courses_instructor":"mccutcheon, william"},{"courses_uuid":411,"courses_dept":"phys","courses_instructor":"unruh, william"},{"courses_uuid":414,"courses_dept":"phys","courses_instructor":"mccutcheon, william"},{"courses_uuid":415,"courses_dept":"phys","courses_instructor":"mccutcheon, william"},{"courses_uuid":98698,"courses_dept":"phys","courses_instructor":"mccutcheon, william"},{"courses_uuid":98700,"courses_dept":"phys","courses_instructor":"mccutcheon, william"},{"courses_uuid":98708,"courses_dept":"phys","courses_instructor":"mccutcheon, william"},{"courses_uuid":50251,"courses_dept":"phys","courses_instructor":"hsieh, william"},{"courses_uuid":405,"courses_dept":"phys","courses_instructor":"mccutcheon, william"},{"courses_uuid":5978,"courses_dept":"phys","courses_instructor":"unruh, william"},{"courses_uuid":50257,"courses_dept":"phys","courses_instructor":"unruh, william"},{"courses_uuid":75328,"courses_dept":"phys","courses_instructor":"unruh, william"},{"courses_uuid":80618,"courses_dept":"phys","courses_instructor":"unruh, william"},{"courses_uuid":98757,"courses_dept":"phys","courses_instructor":"unruh, william"},{"courses_uuid":41266,"courses_dept":"phys","courses_instructor":"unruh, william"},{"courses_uuid":50283,"courses_dept":"phys","courses_instructor":"unruh, william"},{"courses_uuid":98691,"courses_dept":"phys","courses_instructor":"mccutcheon, william"},{"courses_uuid":71754,"courses_dept":"plan","courses_instructor":"buholzer, william"},{"courses_uuid":87109,"courses_dept":"rhsc","courses_instructor":"mortenson, william"},{"courses_uuid":17354,"courses_dept":"scie","courses_instructor":"steyn, douw gerbrand;welch, william"},{"courses_uuid":89419,"courses_dept":"scie","courses_instructor":"fox, joanne alison;han, andrea;welch, william"},{"courses_uuid":90413,"courses_dept":"soci","courses_instructor":"flynn, william"},{"courses_uuid":88847,"courses_dept":"sowk","courses_instructor":"norris, william craig"},{"courses_uuid":28163,"courses_dept":"spph","courses_instructor":"davies, hugh william"},{"courses_uuid":33091,"courses_dept":"spph","courses_instructor":"davies, hugh william"},{"courses_uuid":65169,"courses_dept":"spph","courses_instructor":"davies, hugh william"},{"courses_uuid":85968,"courses_dept":"spph","courses_instructor":"davies, hugh william"},{"courses_uuid":33093,"courses_dept":"spph","courses_instructor":"astrakianakis, george;davies, hugh william"},{"courses_uuid":5855,"courses_dept":"spph","courses_instructor":"davies, hugh william"},{"courses_uuid":2935,"courses_dept":"stat","courses_instructor":"welch, william"},{"courses_uuid":2936,"courses_dept":"stat","courses_instructor":"welch, william"},{"courses_uuid":43523,"courses_dept":"stat","courses_instructor":"welch, william"},{"courses_uuid":52145,"courses_dept":"stat","courses_instructor":"welch, william"},{"courses_uuid":73760,"courses_dept":"stat","courses_instructor":"welch, william"},{"courses_uuid":85813,"courses_dept":"stat","courses_instructor":"welch, william"},{"courses_uuid":85814,"courses_dept":"stat","courses_instructor":"welch, william"},{"courses_uuid":98869,"courses_dept":"stat","courses_instructor":"welch, william"},{"courses_uuid":43531,"courses_dept":"stat","courses_instructor":"welch, william"},{"courses_uuid":98875,"courses_dept":"stat","courses_instructor":"welch, william"},{"courses_uuid":81144,"courses_dept":"wrds","courses_instructor":"macwilliam, erin"},{"courses_uuid":81159,"courses_dept":"wrds","courses_instructor":"macwilliam, erin"},{"courses_uuid":81178,"courses_dept":"wrds","courses_instructor":"macwilliam, erin"},{"courses_uuid":81181,"courses_dept":"wrds","courses_instructor":"macwilliam, erin"},{"courses_uuid":81190,"courses_dept":"wrds","courses_instructor":"macwilliam, erin"},{"courses_uuid":81194,"courses_dept":"wrds","courses_instructor":"macwilliam, erin"},{"courses_uuid":37713,"courses_dept":"zool","courses_instructor":"milsom, william"}]}
var resultFor70and80 = {"render":"TABLE","result":[{"courses_dept":"cpsc","courses_avg":70.03},{"courses_dept":"cpsc","courses_avg":70.03},{"courses_dept":"cpsc","courses_avg":70.05},{"courses_dept":"cpsc","courses_avg":70.11},{"courses_dept":"cpsc","courses_avg":70.16},{"courses_dept":"cpsc","courses_avg":70.16},{"courses_dept":"cpsc","courses_avg":70.24},{"courses_dept":"cpsc","courses_avg":70.27},{"courses_dept":"cpsc","courses_avg":70.29},{"courses_dept":"cpsc","courses_avg":70.38},{"courses_dept":"cpsc","courses_avg":70.4},{"courses_dept":"cpsc","courses_avg":70.42},{"courses_dept":"cpsc","courses_avg":70.46},{"courses_dept":"cpsc","courses_avg":70.46},{"courses_dept":"cpsc","courses_avg":70.47},{"courses_dept":"cpsc","courses_avg":70.48},{"courses_dept":"cpsc","courses_avg":70.5},{"courses_dept":"cpsc","courses_avg":70.51},{"courses_dept":"cpsc","courses_avg":70.53},{"courses_dept":"cpsc","courses_avg":70.54},{"courses_dept":"cpsc","courses_avg":70.59},{"courses_dept":"cpsc","courses_avg":70.62},{"courses_dept":"cpsc","courses_avg":70.66},{"courses_dept":"cpsc","courses_avg":70.66},{"courses_dept":"cpsc","courses_avg":70.68},{"courses_dept":"cpsc","courses_avg":70.7},{"courses_dept":"cpsc","courses_avg":70.7},{"courses_dept":"cpsc","courses_avg":70.7},{"courses_dept":"cpsc","courses_avg":70.75},{"courses_dept":"cpsc","courses_avg":70.75},{"courses_dept":"cpsc","courses_avg":70.76},{"courses_dept":"cpsc","courses_avg":70.78},{"courses_dept":"cpsc","courses_avg":70.83},{"courses_dept":"cpsc","courses_avg":70.83},{"courses_dept":"cpsc","courses_avg":70.87},{"courses_dept":"cpsc","courses_avg":70.87},{"courses_dept":"cpsc","courses_avg":70.88},{"courses_dept":"cpsc","courses_avg":70.9},{"courses_dept":"cpsc","courses_avg":70.91},{"courses_dept":"cpsc","courses_avg":70.92},{"courses_dept":"cpsc","courses_avg":70.92},{"courses_dept":"cpsc","courses_avg":70.92},{"courses_dept":"cpsc","courses_avg":70.93},{"courses_dept":"cpsc","courses_avg":70.93},{"courses_dept":"cpsc","courses_avg":70.93},{"courses_dept":"cpsc","courses_avg":70.94},{"courses_dept":"cpsc","courses_avg":70.95},{"courses_dept":"cpsc","courses_avg":70.96},{"courses_dept":"cpsc","courses_avg":70.96},{"courses_dept":"cpsc","courses_avg":70.98},{"courses_dept":"cpsc","courses_avg":70.98},{"courses_dept":"cpsc","courses_avg":70.98},{"courses_dept":"cpsc","courses_avg":71},{"courses_dept":"cpsc","courses_avg":71},{"courses_dept":"cpsc","courses_avg":71.02},{"courses_dept":"cpsc","courses_avg":71.02},{"courses_dept":"cpsc","courses_avg":71.03},{"courses_dept":"cpsc","courses_avg":71.04},{"courses_dept":"cpsc","courses_avg":71.04},{"courses_dept":"cpsc","courses_avg":71.05},{"courses_dept":"cpsc","courses_avg":71.05},{"courses_dept":"cpsc","courses_avg":71.05},{"courses_dept":"cpsc","courses_avg":71.07},{"courses_dept":"cpsc","courses_avg":71.09},{"courses_dept":"cpsc","courses_avg":71.09},{"courses_dept":"cpsc","courses_avg":71.13},{"courses_dept":"cpsc","courses_avg":71.14},{"courses_dept":"cpsc","courses_avg":71.16},{"courses_dept":"cpsc","courses_avg":71.18},{"courses_dept":"cpsc","courses_avg":71.22},{"courses_dept":"cpsc","courses_avg":71.22},{"courses_dept":"cpsc","courses_avg":71.24},{"courses_dept":"cpsc","courses_avg":71.24},{"courses_dept":"cpsc","courses_avg":71.27},{"courses_dept":"cpsc","courses_avg":71.27},{"courses_dept":"cpsc","courses_avg":71.28},{"courses_dept":"cpsc","courses_avg":71.3},{"courses_dept":"cpsc","courses_avg":71.33},{"courses_dept":"cpsc","courses_avg":71.33},{"courses_dept":"cpsc","courses_avg":71.39},{"courses_dept":"cpsc","courses_avg":71.4},{"courses_dept":"cpsc","courses_avg":71.41},{"courses_dept":"cpsc","courses_avg":71.44},{"courses_dept":"cpsc","courses_avg":71.44},{"courses_dept":"cpsc","courses_avg":71.45},{"courses_dept":"cpsc","courses_avg":71.45},{"courses_dept":"cpsc","courses_avg":71.46},{"courses_dept":"cpsc","courses_avg":71.52},{"courses_dept":"cpsc","courses_avg":71.52},{"courses_dept":"cpsc","courses_avg":71.52},{"courses_dept":"cpsc","courses_avg":71.55},{"courses_dept":"cpsc","courses_avg":71.59},{"courses_dept":"cpsc","courses_avg":71.6},{"courses_dept":"cpsc","courses_avg":71.61},{"courses_dept":"cpsc","courses_avg":71.62},{"courses_dept":"cpsc","courses_avg":71.64},{"courses_dept":"cpsc","courses_avg":71.66},{"courses_dept":"cpsc","courses_avg":71.66},{"courses_dept":"cpsc","courses_avg":71.67},{"courses_dept":"cpsc","courses_avg":71.67},{"courses_dept":"cpsc","courses_avg":71.71},{"courses_dept":"cpsc","courses_avg":71.72},{"courses_dept":"cpsc","courses_avg":71.73},{"courses_dept":"cpsc","courses_avg":71.75},{"courses_dept":"cpsc","courses_avg":71.75},{"courses_dept":"cpsc","courses_avg":71.77},{"courses_dept":"cpsc","courses_avg":71.77},{"courses_dept":"cpsc","courses_avg":71.79},{"courses_dept":"cpsc","courses_avg":71.8},{"courses_dept":"cpsc","courses_avg":71.8},{"courses_dept":"cpsc","courses_avg":71.81},{"courses_dept":"cpsc","courses_avg":71.82},{"courses_dept":"cpsc","courses_avg":71.87},{"courses_dept":"cpsc","courses_avg":71.89},{"courses_dept":"cpsc","courses_avg":71.89},{"courses_dept":"cpsc","courses_avg":71.89},{"courses_dept":"cpsc","courses_avg":71.89},{"courses_dept":"cpsc","courses_avg":71.92},{"courses_dept":"cpsc","courses_avg":71.92},{"courses_dept":"cpsc","courses_avg":71.92},{"courses_dept":"cpsc","courses_avg":71.94},{"courses_dept":"cpsc","courses_avg":71.97},{"courses_dept":"cpsc","courses_avg":71.97},{"courses_dept":"cpsc","courses_avg":71.99},{"courses_dept":"cpsc","courses_avg":71.99},{"courses_dept":"cpsc","courses_avg":72},{"courses_dept":"cpsc","courses_avg":72},{"courses_dept":"cpsc","courses_avg":72},{"courses_dept":"cpsc","courses_avg":72},{"courses_dept":"cpsc","courses_avg":72.03},{"courses_dept":"cpsc","courses_avg":72.11},{"courses_dept":"cpsc","courses_avg":72.15},{"courses_dept":"cpsc","courses_avg":72.15},{"courses_dept":"cpsc","courses_avg":72.15},{"courses_dept":"cpsc","courses_avg":72.16},{"courses_dept":"cpsc","courses_avg":72.17},{"courses_dept":"cpsc","courses_avg":72.17},{"courses_dept":"cpsc","courses_avg":72.18},{"courses_dept":"cpsc","courses_avg":72.18},{"courses_dept":"cpsc","courses_avg":72.19},{"courses_dept":"cpsc","courses_avg":72.21},{"courses_dept":"cpsc","courses_avg":72.21},{"courses_dept":"cpsc","courses_avg":72.21},{"courses_dept":"cpsc","courses_avg":72.21},{"courses_dept":"cpsc","courses_avg":72.23},{"courses_dept":"cpsc","courses_avg":72.24},{"courses_dept":"cpsc","courses_avg":72.24},{"courses_dept":"cpsc","courses_avg":72.25},{"courses_dept":"cpsc","courses_avg":72.27},{"courses_dept":"cpsc","courses_avg":72.28},{"courses_dept":"cpsc","courses_avg":72.33},{"courses_dept":"cpsc","courses_avg":72.36},{"courses_dept":"cpsc","courses_avg":72.36},{"courses_dept":"cpsc","courses_avg":72.36},{"courses_dept":"cpsc","courses_avg":72.39},{"courses_dept":"cpsc","courses_avg":72.39},{"courses_dept":"cpsc","courses_avg":72.4},{"courses_dept":"cpsc","courses_avg":72.4},{"courses_dept":"cpsc","courses_avg":72.46},{"courses_dept":"cpsc","courses_avg":72.46},{"courses_dept":"cpsc","courses_avg":72.46},{"courses_dept":"cpsc","courses_avg":72.48},{"courses_dept":"cpsc","courses_avg":72.48},{"courses_dept":"cpsc","courses_avg":72.5},{"courses_dept":"cpsc","courses_avg":72.5},{"courses_dept":"cpsc","courses_avg":72.53},{"courses_dept":"cpsc","courses_avg":72.53},{"courses_dept":"cpsc","courses_avg":72.53},{"courses_dept":"cpsc","courses_avg":72.57},{"courses_dept":"cpsc","courses_avg":72.58},{"courses_dept":"cpsc","courses_avg":72.63},{"courses_dept":"cpsc","courses_avg":72.65},{"courses_dept":"cpsc","courses_avg":72.65},{"courses_dept":"cpsc","courses_avg":72.65},{"courses_dept":"cpsc","courses_avg":72.67},{"courses_dept":"cpsc","courses_avg":72.68},{"courses_dept":"cpsc","courses_avg":72.69},{"courses_dept":"cpsc","courses_avg":72.69},{"courses_dept":"cpsc","courses_avg":72.74},{"courses_dept":"cpsc","courses_avg":72.75},{"courses_dept":"cpsc","courses_avg":72.75},{"courses_dept":"cpsc","courses_avg":72.75},{"courses_dept":"cpsc","courses_avg":72.77},{"courses_dept":"cpsc","courses_avg":72.77},{"courses_dept":"cpsc","courses_avg":72.77},{"courses_dept":"cpsc","courses_avg":72.78},{"courses_dept":"cpsc","courses_avg":72.78},{"courses_dept":"cpsc","courses_avg":72.78},{"courses_dept":"cpsc","courses_avg":72.78},{"courses_dept":"cpsc","courses_avg":72.79},{"courses_dept":"cpsc","courses_avg":72.83},{"courses_dept":"cpsc","courses_avg":72.83},{"courses_dept":"cpsc","courses_avg":72.85},{"courses_dept":"cpsc","courses_avg":72.86},{"courses_dept":"cpsc","courses_avg":72.89},{"courses_dept":"cpsc","courses_avg":72.9},{"courses_dept":"cpsc","courses_avg":72.91},{"courses_dept":"cpsc","courses_avg":72.91},{"courses_dept":"cpsc","courses_avg":72.94},{"courses_dept":"cpsc","courses_avg":72.94},{"courses_dept":"cpsc","courses_avg":72.95},{"courses_dept":"cpsc","courses_avg":73},{"courses_dept":"cpsc","courses_avg":73},{"courses_dept":"cpsc","courses_avg":73},{"courses_dept":"cpsc","courses_avg":73.03},{"courses_dept":"cpsc","courses_avg":73.03},{"courses_dept":"cpsc","courses_avg":73.03},{"courses_dept":"cpsc","courses_avg":73.07},{"courses_dept":"cpsc","courses_avg":73.07},{"courses_dept":"cpsc","courses_avg":73.07},{"courses_dept":"cpsc","courses_avg":73.09},{"courses_dept":"cpsc","courses_avg":73.13},{"courses_dept":"cpsc","courses_avg":73.13},{"courses_dept":"cpsc","courses_avg":73.13},{"courses_dept":"cpsc","courses_avg":73.13},{"courses_dept":"cpsc","courses_avg":73.16},{"courses_dept":"cpsc","courses_avg":73.17},{"courses_dept":"cpsc","courses_avg":73.17},{"courses_dept":"cpsc","courses_avg":73.17},{"courses_dept":"cpsc","courses_avg":73.18},{"courses_dept":"cpsc","courses_avg":73.18},{"courses_dept":"cpsc","courses_avg":73.18},{"courses_dept":"cpsc","courses_avg":73.18},{"courses_dept":"cpsc","courses_avg":73.18},{"courses_dept":"cpsc","courses_avg":73.2},{"courses_dept":"cpsc","courses_avg":73.24},{"courses_dept":"cpsc","courses_avg":73.25},{"courses_dept":"cpsc","courses_avg":73.25},{"courses_dept":"cpsc","courses_avg":73.25},{"courses_dept":"cpsc","courses_avg":73.27},{"courses_dept":"cpsc","courses_avg":73.27},{"courses_dept":"cpsc","courses_avg":73.28},{"courses_dept":"cpsc","courses_avg":73.3},{"courses_dept":"cpsc","courses_avg":73.3},{"courses_dept":"cpsc","courses_avg":73.31},{"courses_dept":"cpsc","courses_avg":73.33},{"courses_dept":"cpsc","courses_avg":73.33},{"courses_dept":"cpsc","courses_avg":73.34},{"courses_dept":"cpsc","courses_avg":73.36},{"courses_dept":"cpsc","courses_avg":73.36},{"courses_dept":"cpsc","courses_avg":73.36},{"courses_dept":"cpsc","courses_avg":73.37},{"courses_dept":"cpsc","courses_avg":73.37},{"courses_dept":"cpsc","courses_avg":73.38},{"courses_dept":"cpsc","courses_avg":73.38},{"courses_dept":"cpsc","courses_avg":73.41},{"courses_dept":"cpsc","courses_avg":73.41},{"courses_dept":"cpsc","courses_avg":73.45},{"courses_dept":"cpsc","courses_avg":73.49},{"courses_dept":"cpsc","courses_avg":73.5},{"courses_dept":"cpsc","courses_avg":73.53},{"courses_dept":"cpsc","courses_avg":73.55},{"courses_dept":"cpsc","courses_avg":73.56},{"courses_dept":"cpsc","courses_avg":73.58},{"courses_dept":"cpsc","courses_avg":73.58},{"courses_dept":"cpsc","courses_avg":73.58},{"courses_dept":"cpsc","courses_avg":73.59},{"courses_dept":"cpsc","courses_avg":73.62},{"courses_dept":"cpsc","courses_avg":73.62},{"courses_dept":"cpsc","courses_avg":73.62},{"courses_dept":"cpsc","courses_avg":73.63},{"courses_dept":"cpsc","courses_avg":73.64},{"courses_dept":"cpsc","courses_avg":73.64},{"courses_dept":"cpsc","courses_avg":73.68},{"courses_dept":"cpsc","courses_avg":73.68},{"courses_dept":"cpsc","courses_avg":73.72},{"courses_dept":"cpsc","courses_avg":73.73},{"courses_dept":"cpsc","courses_avg":73.73},{"courses_dept":"cpsc","courses_avg":73.75},{"courses_dept":"cpsc","courses_avg":73.75},{"courses_dept":"cpsc","courses_avg":73.79},{"courses_dept":"cpsc","courses_avg":73.83},{"courses_dept":"cpsc","courses_avg":73.83},{"courses_dept":"cpsc","courses_avg":73.83},{"courses_dept":"cpsc","courses_avg":73.83},{"courses_dept":"cpsc","courses_avg":73.88},{"courses_dept":"cpsc","courses_avg":73.88},{"courses_dept":"cpsc","courses_avg":73.88},{"courses_dept":"cpsc","courses_avg":73.91},{"courses_dept":"cpsc","courses_avg":73.93},{"courses_dept":"cpsc","courses_avg":73.95},{"courses_dept":"cpsc","courses_avg":73.95},{"courses_dept":"cpsc","courses_avg":73.97},{"courses_dept":"cpsc","courses_avg":73.98},{"courses_dept":"cpsc","courses_avg":74},{"courses_dept":"cpsc","courses_avg":74},{"courses_dept":"cpsc","courses_avg":74},{"courses_dept":"cpsc","courses_avg":74.02},{"courses_dept":"cpsc","courses_avg":74.04},{"courses_dept":"cpsc","courses_avg":74.04},{"courses_dept":"cpsc","courses_avg":74.04},{"courses_dept":"cpsc","courses_avg":74.04},{"courses_dept":"cpsc","courses_avg":74.04},{"courses_dept":"cpsc","courses_avg":74.06},{"courses_dept":"cpsc","courses_avg":74.06},{"courses_dept":"cpsc","courses_avg":74.06},{"courses_dept":"cpsc","courses_avg":74.06},{"courses_dept":"cpsc","courses_avg":74.07},{"courses_dept":"cpsc","courses_avg":74.08},{"courses_dept":"cpsc","courses_avg":74.09},{"courses_dept":"cpsc","courses_avg":74.12},{"courses_dept":"cpsc","courses_avg":74.13},{"courses_dept":"cpsc","courses_avg":74.14},{"courses_dept":"cpsc","courses_avg":74.15},{"courses_dept":"cpsc","courses_avg":74.15},{"courses_dept":"cpsc","courses_avg":74.17},{"courses_dept":"cpsc","courses_avg":74.17},{"courses_dept":"cpsc","courses_avg":74.17},{"courses_dept":"cpsc","courses_avg":74.2},{"courses_dept":"cpsc","courses_avg":74.22},{"courses_dept":"cpsc","courses_avg":74.22},{"courses_dept":"cpsc","courses_avg":74.22},{"courses_dept":"cpsc","courses_avg":74.22},{"courses_dept":"cpsc","courses_avg":74.23},{"courses_dept":"cpsc","courses_avg":74.23},{"courses_dept":"cpsc","courses_avg":74.24},{"courses_dept":"cpsc","courses_avg":74.25},{"courses_dept":"cpsc","courses_avg":74.25},{"courses_dept":"cpsc","courses_avg":74.26},{"courses_dept":"cpsc","courses_avg":74.26},{"courses_dept":"cpsc","courses_avg":74.29},{"courses_dept":"cpsc","courses_avg":74.29},{"courses_dept":"cpsc","courses_avg":74.34},{"courses_dept":"cpsc","courses_avg":74.34},{"courses_dept":"cpsc","courses_avg":74.34},{"courses_dept":"cpsc","courses_avg":74.35},{"courses_dept":"cpsc","courses_avg":74.41},{"courses_dept":"cpsc","courses_avg":74.42},{"courses_dept":"cpsc","courses_avg":74.43},{"courses_dept":"cpsc","courses_avg":74.43},{"courses_dept":"cpsc","courses_avg":74.44},{"courses_dept":"cpsc","courses_avg":74.45},{"courses_dept":"cpsc","courses_avg":74.45},{"courses_dept":"cpsc","courses_avg":74.45},{"courses_dept":"cpsc","courses_avg":74.45},{"courses_dept":"cpsc","courses_avg":74.46},{"courses_dept":"cpsc","courses_avg":74.46},{"courses_dept":"cpsc","courses_avg":74.48},{"courses_dept":"cpsc","courses_avg":74.5},{"courses_dept":"cpsc","courses_avg":74.52},{"courses_dept":"cpsc","courses_avg":74.54},{"courses_dept":"cpsc","courses_avg":74.54},{"courses_dept":"cpsc","courses_avg":74.54},{"courses_dept":"cpsc","courses_avg":74.57},{"courses_dept":"cpsc","courses_avg":74.58},{"courses_dept":"cpsc","courses_avg":74.58},{"courses_dept":"cpsc","courses_avg":74.62},{"courses_dept":"cpsc","courses_avg":74.65},{"courses_dept":"cpsc","courses_avg":74.67},{"courses_dept":"cpsc","courses_avg":74.67},{"courses_dept":"cpsc","courses_avg":74.67},{"courses_dept":"cpsc","courses_avg":74.67},{"courses_dept":"cpsc","courses_avg":74.68},{"courses_dept":"cpsc","courses_avg":74.68},{"courses_dept":"cpsc","courses_avg":74.68},{"courses_dept":"cpsc","courses_avg":74.68},{"courses_dept":"cpsc","courses_avg":74.7},{"courses_dept":"cpsc","courses_avg":74.72},{"courses_dept":"cpsc","courses_avg":74.73},{"courses_dept":"cpsc","courses_avg":74.73},{"courses_dept":"cpsc","courses_avg":74.75},{"courses_dept":"cpsc","courses_avg":74.75},{"courses_dept":"cpsc","courses_avg":74.75},{"courses_dept":"cpsc","courses_avg":74.79},{"courses_dept":"cpsc","courses_avg":74.8},{"courses_dept":"cpsc","courses_avg":74.82},{"courses_dept":"cpsc","courses_avg":74.82},{"courses_dept":"cpsc","courses_avg":74.82},{"courses_dept":"cpsc","courses_avg":74.83},{"courses_dept":"cpsc","courses_avg":74.84},{"courses_dept":"cpsc","courses_avg":74.84},{"courses_dept":"cpsc","courses_avg":74.85},{"courses_dept":"cpsc","courses_avg":74.86},{"courses_dept":"cpsc","courses_avg":74.86},{"courses_dept":"cpsc","courses_avg":74.86},{"courses_dept":"cpsc","courses_avg":74.88},{"courses_dept":"cpsc","courses_avg":74.88},{"courses_dept":"cpsc","courses_avg":74.88},{"courses_dept":"cpsc","courses_avg":74.93},{"courses_dept":"cpsc","courses_avg":74.93},{"courses_dept":"cpsc","courses_avg":74.93},{"courses_dept":"cpsc","courses_avg":74.95},{"courses_dept":"cpsc","courses_avg":74.97},{"courses_dept":"cpsc","courses_avg":74.99},{"courses_dept":"cpsc","courses_avg":75},{"courses_dept":"cpsc","courses_avg":75},{"courses_dept":"cpsc","courses_avg":75},{"courses_dept":"cpsc","courses_avg":75.01},{"courses_dept":"cpsc","courses_avg":75.02},{"courses_dept":"cpsc","courses_avg":75.04},{"courses_dept":"cpsc","courses_avg":75.06},{"courses_dept":"cpsc","courses_avg":75.14},{"courses_dept":"cpsc","courses_avg":75.15},{"courses_dept":"cpsc","courses_avg":75.15},{"courses_dept":"cpsc","courses_avg":75.16},{"courses_dept":"cpsc","courses_avg":75.17},{"courses_dept":"cpsc","courses_avg":75.18},{"courses_dept":"cpsc","courses_avg":75.19},{"courses_dept":"cpsc","courses_avg":75.2},{"courses_dept":"cpsc","courses_avg":75.2},{"courses_dept":"cpsc","courses_avg":75.22},{"courses_dept":"cpsc","courses_avg":75.23},{"courses_dept":"cpsc","courses_avg":75.25},{"courses_dept":"cpsc","courses_avg":75.26},{"courses_dept":"cpsc","courses_avg":75.28},{"courses_dept":"cpsc","courses_avg":75.28},{"courses_dept":"cpsc","courses_avg":75.28},{"courses_dept":"cpsc","courses_avg":75.28},{"courses_dept":"cpsc","courses_avg":75.29},{"courses_dept":"cpsc","courses_avg":75.29},{"courses_dept":"cpsc","courses_avg":75.33},{"courses_dept":"cpsc","courses_avg":75.34},{"courses_dept":"cpsc","courses_avg":75.36},{"courses_dept":"cpsc","courses_avg":75.4},{"courses_dept":"cpsc","courses_avg":75.48},{"courses_dept":"cpsc","courses_avg":75.49},{"courses_dept":"cpsc","courses_avg":75.49},{"courses_dept":"cpsc","courses_avg":75.5},{"courses_dept":"cpsc","courses_avg":75.52},{"courses_dept":"cpsc","courses_avg":75.52},{"courses_dept":"cpsc","courses_avg":75.54},{"courses_dept":"cpsc","courses_avg":75.56},{"courses_dept":"cpsc","courses_avg":75.57},{"courses_dept":"cpsc","courses_avg":75.57},{"courses_dept":"cpsc","courses_avg":75.58},{"courses_dept":"cpsc","courses_avg":75.61},{"courses_dept":"cpsc","courses_avg":75.61},{"courses_dept":"cpsc","courses_avg":75.61},{"courses_dept":"cpsc","courses_avg":75.61},{"courses_dept":"cpsc","courses_avg":75.65},{"courses_dept":"cpsc","courses_avg":75.68},{"courses_dept":"cpsc","courses_avg":75.68},{"courses_dept":"cpsc","courses_avg":75.69},{"courses_dept":"cpsc","courses_avg":75.71},{"courses_dept":"cpsc","courses_avg":75.72},{"courses_dept":"cpsc","courses_avg":75.78},{"courses_dept":"cpsc","courses_avg":75.8},{"courses_dept":"cpsc","courses_avg":75.81},{"courses_dept":"cpsc","courses_avg":75.81},{"courses_dept":"cpsc","courses_avg":75.81},{"courses_dept":"cpsc","courses_avg":75.81},{"courses_dept":"cpsc","courses_avg":75.82},{"courses_dept":"cpsc","courses_avg":75.82},{"courses_dept":"cpsc","courses_avg":75.86},{"courses_dept":"cpsc","courses_avg":75.89},{"courses_dept":"cpsc","courses_avg":75.89},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.91},{"courses_dept":"cpsc","courses_avg":75.97},{"courses_dept":"cpsc","courses_avg":75.98},{"courses_dept":"cpsc","courses_avg":76},{"courses_dept":"cpsc","courses_avg":76},{"courses_dept":"cpsc","courses_avg":76.04},{"courses_dept":"cpsc","courses_avg":76.05},{"courses_dept":"cpsc","courses_avg":76.06},{"courses_dept":"cpsc","courses_avg":76.12},{"courses_dept":"cpsc","courses_avg":76.12},{"courses_dept":"cpsc","courses_avg":76.13},{"courses_dept":"cpsc","courses_avg":76.17},{"courses_dept":"cpsc","courses_avg":76.17},{"courses_dept":"cpsc","courses_avg":76.2},{"courses_dept":"cpsc","courses_avg":76.24},{"courses_dept":"cpsc","courses_avg":76.24},{"courses_dept":"cpsc","courses_avg":76.26},{"courses_dept":"cpsc","courses_avg":76.26},{"courses_dept":"cpsc","courses_avg":76.26},{"courses_dept":"cpsc","courses_avg":76.26},{"courses_dept":"cpsc","courses_avg":76.27},{"courses_dept":"cpsc","courses_avg":76.31},{"courses_dept":"cpsc","courses_avg":76.31},{"courses_dept":"cpsc","courses_avg":76.31},{"courses_dept":"cpsc","courses_avg":76.31},{"courses_dept":"cpsc","courses_avg":76.32},{"courses_dept":"cpsc","courses_avg":76.34},{"courses_dept":"cpsc","courses_avg":76.34},{"courses_dept":"cpsc","courses_avg":76.34},{"courses_dept":"cpsc","courses_avg":76.34},{"courses_dept":"cpsc","courses_avg":76.35},{"courses_dept":"cpsc","courses_avg":76.38},{"courses_dept":"cpsc","courses_avg":76.43},{"courses_dept":"cpsc","courses_avg":76.43},{"courses_dept":"cpsc","courses_avg":76.43},{"courses_dept":"cpsc","courses_avg":76.46},{"courses_dept":"cpsc","courses_avg":76.46},{"courses_dept":"cpsc","courses_avg":76.46},{"courses_dept":"cpsc","courses_avg":76.52},{"courses_dept":"cpsc","courses_avg":76.52},{"courses_dept":"cpsc","courses_avg":76.52},{"courses_dept":"cpsc","courses_avg":76.58},{"courses_dept":"cpsc","courses_avg":76.59},{"courses_dept":"cpsc","courses_avg":76.6},{"courses_dept":"cpsc","courses_avg":76.61},{"courses_dept":"cpsc","courses_avg":76.61},{"courses_dept":"cpsc","courses_avg":76.65},{"courses_dept":"cpsc","courses_avg":76.66},{"courses_dept":"cpsc","courses_avg":76.71},{"courses_dept":"cpsc","courses_avg":76.75},{"courses_dept":"cpsc","courses_avg":76.75},{"courses_dept":"cpsc","courses_avg":76.77},{"courses_dept":"cpsc","courses_avg":76.81},{"courses_dept":"cpsc","courses_avg":76.84},{"courses_dept":"cpsc","courses_avg":76.84},{"courses_dept":"cpsc","courses_avg":76.87},{"courses_dept":"cpsc","courses_avg":76.91},{"courses_dept":"cpsc","courses_avg":76.93},{"courses_dept":"cpsc","courses_avg":76.93},{"courses_dept":"cpsc","courses_avg":76.94},{"courses_dept":"cpsc","courses_avg":76.96},{"courses_dept":"cpsc","courses_avg":76.96},{"courses_dept":"cpsc","courses_avg":76.98},{"courses_dept":"cpsc","courses_avg":77},{"courses_dept":"cpsc","courses_avg":77},{"courses_dept":"cpsc","courses_avg":77},{"courses_dept":"cpsc","courses_avg":77.01},{"courses_dept":"cpsc","courses_avg":77.06},{"courses_dept":"cpsc","courses_avg":77.11},{"courses_dept":"cpsc","courses_avg":77.11},{"courses_dept":"cpsc","courses_avg":77.13},{"courses_dept":"cpsc","courses_avg":77.15},{"courses_dept":"cpsc","courses_avg":77.15},{"courses_dept":"cpsc","courses_avg":77.2},{"courses_dept":"cpsc","courses_avg":77.21},{"courses_dept":"cpsc","courses_avg":77.22},{"courses_dept":"cpsc","courses_avg":77.26},{"courses_dept":"cpsc","courses_avg":77.26},{"courses_dept":"cpsc","courses_avg":77.28},{"courses_dept":"cpsc","courses_avg":77.3},{"courses_dept":"cpsc","courses_avg":77.3},{"courses_dept":"cpsc","courses_avg":77.38},{"courses_dept":"cpsc","courses_avg":77.38},{"courses_dept":"cpsc","courses_avg":77.39},{"courses_dept":"cpsc","courses_avg":77.39},{"courses_dept":"cpsc","courses_avg":77.4},{"courses_dept":"cpsc","courses_avg":77.4},{"courses_dept":"cpsc","courses_avg":77.41},{"courses_dept":"cpsc","courses_avg":77.41},{"courses_dept":"cpsc","courses_avg":77.43},{"courses_dept":"cpsc","courses_avg":77.43},{"courses_dept":"cpsc","courses_avg":77.43},{"courses_dept":"cpsc","courses_avg":77.43},{"courses_dept":"cpsc","courses_avg":77.44},{"courses_dept":"cpsc","courses_avg":77.44},{"courses_dept":"cpsc","courses_avg":77.47},{"courses_dept":"cpsc","courses_avg":77.48},{"courses_dept":"cpsc","courses_avg":77.48},{"courses_dept":"cpsc","courses_avg":77.5},{"courses_dept":"cpsc","courses_avg":77.5},{"courses_dept":"cpsc","courses_avg":77.51},{"courses_dept":"cpsc","courses_avg":77.55},{"courses_dept":"cpsc","courses_avg":77.62},{"courses_dept":"cpsc","courses_avg":77.62},{"courses_dept":"cpsc","courses_avg":77.63},{"courses_dept":"cpsc","courses_avg":77.64},{"courses_dept":"cpsc","courses_avg":77.64},{"courses_dept":"cpsc","courses_avg":77.68},{"courses_dept":"cpsc","courses_avg":77.68},{"courses_dept":"cpsc","courses_avg":77.69},{"courses_dept":"cpsc","courses_avg":77.76},{"courses_dept":"cpsc","courses_avg":77.78},{"courses_dept":"cpsc","courses_avg":77.78},{"courses_dept":"cpsc","courses_avg":77.8},{"courses_dept":"cpsc","courses_avg":77.81},{"courses_dept":"cpsc","courses_avg":77.84},{"courses_dept":"cpsc","courses_avg":77.93},{"courses_dept":"cpsc","courses_avg":77.93},{"courses_dept":"cpsc","courses_avg":77.95},{"courses_dept":"cpsc","courses_avg":77.95},{"courses_dept":"cpsc","courses_avg":77.95},{"courses_dept":"cpsc","courses_avg":78.18},{"courses_dept":"cpsc","courses_avg":78.18},{"courses_dept":"cpsc","courses_avg":78.22},{"courses_dept":"cpsc","courses_avg":78.22},{"courses_dept":"cpsc","courses_avg":78.22},{"courses_dept":"cpsc","courses_avg":78.24},{"courses_dept":"cpsc","courses_avg":78.24},{"courses_dept":"cpsc","courses_avg":78.24},{"courses_dept":"cpsc","courses_avg":78.27},{"courses_dept":"cpsc","courses_avg":78.28},{"courses_dept":"cpsc","courses_avg":78.28},{"courses_dept":"cpsc","courses_avg":78.29},{"courses_dept":"cpsc","courses_avg":78.29},{"courses_dept":"cpsc","courses_avg":78.29},{"courses_dept":"cpsc","courses_avg":78.3},{"courses_dept":"cpsc","courses_avg":78.3},{"courses_dept":"cpsc","courses_avg":78.32},{"courses_dept":"cpsc","courses_avg":78.32},{"courses_dept":"cpsc","courses_avg":78.32},{"courses_dept":"cpsc","courses_avg":78.32},{"courses_dept":"cpsc","courses_avg":78.32},{"courses_dept":"cpsc","courses_avg":78.34},{"courses_dept":"cpsc","courses_avg":78.4},{"courses_dept":"cpsc","courses_avg":78.42},{"courses_dept":"cpsc","courses_avg":78.42},{"courses_dept":"cpsc","courses_avg":78.48},{"courses_dept":"cpsc","courses_avg":78.48},{"courses_dept":"cpsc","courses_avg":78.56},{"courses_dept":"cpsc","courses_avg":78.56},{"courses_dept":"cpsc","courses_avg":78.68},{"courses_dept":"cpsc","courses_avg":78.68},{"courses_dept":"cpsc","courses_avg":78.68},{"courses_dept":"cpsc","courses_avg":78.69},{"courses_dept":"cpsc","courses_avg":78.7},{"courses_dept":"cpsc","courses_avg":78.7},{"courses_dept":"cpsc","courses_avg":78.72},{"courses_dept":"cpsc","courses_avg":78.72},{"courses_dept":"cpsc","courses_avg":78.75},{"courses_dept":"cpsc","courses_avg":78.79},{"courses_dept":"cpsc","courses_avg":78.79},{"courses_dept":"cpsc","courses_avg":78.85},{"courses_dept":"cpsc","courses_avg":78.87},{"courses_dept":"cpsc","courses_avg":78.87},{"courses_dept":"cpsc","courses_avg":78.88},{"courses_dept":"cpsc","courses_avg":78.88},{"courses_dept":"cpsc","courses_avg":78.93},{"courses_dept":"cpsc","courses_avg":78.93},{"courses_dept":"cpsc","courses_avg":78.95},{"courses_dept":"cpsc","courses_avg":78.95},{"courses_dept":"cpsc","courses_avg":78.98},{"courses_dept":"cpsc","courses_avg":79},{"courses_dept":"cpsc","courses_avg":79},{"courses_dept":"cpsc","courses_avg":79},{"courses_dept":"cpsc","courses_avg":79.02},{"courses_dept":"cpsc","courses_avg":79.04},{"courses_dept":"cpsc","courses_avg":79.12},{"courses_dept":"cpsc","courses_avg":79.12},{"courses_dept":"cpsc","courses_avg":79.12},{"courses_dept":"cpsc","courses_avg":79.13},{"courses_dept":"cpsc","courses_avg":79.13},{"courses_dept":"cpsc","courses_avg":79.19},{"courses_dept":"cpsc","courses_avg":79.19},{"courses_dept":"cpsc","courses_avg":79.24},{"courses_dept":"cpsc","courses_avg":79.24},{"courses_dept":"cpsc","courses_avg":79.24},{"courses_dept":"cpsc","courses_avg":79.25},{"courses_dept":"cpsc","courses_avg":79.25},{"courses_dept":"cpsc","courses_avg":79.29},{"courses_dept":"cpsc","courses_avg":79.29},{"courses_dept":"cpsc","courses_avg":79.31},{"courses_dept":"cpsc","courses_avg":79.31},{"courses_dept":"cpsc","courses_avg":79.39},{"courses_dept":"cpsc","courses_avg":79.39},{"courses_dept":"cpsc","courses_avg":79.41},{"courses_dept":"cpsc","courses_avg":79.41},{"courses_dept":"cpsc","courses_avg":79.42},{"courses_dept":"cpsc","courses_avg":79.43},{"courses_dept":"cpsc","courses_avg":79.43},{"courses_dept":"cpsc","courses_avg":79.44},{"courses_dept":"cpsc","courses_avg":79.46},{"courses_dept":"cpsc","courses_avg":79.46},{"courses_dept":"cpsc","courses_avg":79.46},{"courses_dept":"cpsc","courses_avg":79.46},{"courses_dept":"cpsc","courses_avg":79.5},{"courses_dept":"cpsc","courses_avg":79.54},{"courses_dept":"cpsc","courses_avg":79.54},{"courses_dept":"cpsc","courses_avg":79.56},{"courses_dept":"cpsc","courses_avg":79.56},{"courses_dept":"cpsc","courses_avg":79.62},{"courses_dept":"cpsc","courses_avg":79.62},{"courses_dept":"cpsc","courses_avg":79.69},{"courses_dept":"cpsc","courses_avg":79.69},{"courses_dept":"cpsc","courses_avg":79.76},{"courses_dept":"cpsc","courses_avg":79.76},{"courses_dept":"cpsc","courses_avg":79.78},{"courses_dept":"cpsc","courses_avg":79.78},{"courses_dept":"cpsc","courses_avg":79.83},{"courses_dept":"cpsc","courses_avg":79.87},{"courses_dept":"cpsc","courses_avg":79.87},{"courses_dept":"cpsc","courses_avg":79.88},{"courses_dept":"cpsc","courses_avg":79.88},{"courses_dept":"cpsc","courses_avg":79.88},{"courses_dept":"cpsc","courses_avg":79.88},{"courses_dept":"cpsc","courses_avg":79.98},{"courses_dept":"cpsc","courses_avg":79.98}]}
var resultInstruct = {"render":"TABLE","result":[{"courses_instructor":"abadi, shirin s.a.;barr, alasdair;godin, david;horne, andrew;leung, joanne y t;pang, catherine c;schwarz, stephan;wright, james","courses_avg":86.32},{"courses_instructor":"abadi, shirin s.a.;barr, alasdair;godin, david;horne, andrew;leung, joanne y t;pang, catherine c;schwarz, stephan;wright, james","courses_avg":74.44},{"courses_instructor":"aidelbaum, martin;aleksejuniene, jolanta;bryant, s;chanpong, brian;diewert, virginia;fogelman, mark;garcia fulle de owen, maria is;gardner, karen mary;harrison, rosamund louise;macdonald, david;mccullagh, anthony;richardson, james;ruse, n dorin;whitney, eli","courses_avg":82.49},{"courses_instructor":"aidelbaum, martin;garcia fulle de owen, maria is;gardner, karen mary;lowe, alan arthur;macdonald, david;mathu-muju, kavita;mccullagh, anthony;richardson, james;whitney, eli;zhang, lewei","courses_avg":81.05},{"courses_instructor":"alfantazi, akram;asselin, edouard;dixon, david;ko, frank","courses_avg":74.53},{"courses_instructor":"alfantazi, akram;asselin, edouard;dreisinger, david;fernlund, goran;ko, frank","courses_avg":77.55},{"courses_instructor":"alfantazi, akram;asselin, edouard;dreisinger, david;ko, frank;sinclair, chadwick","courses_avg":72.38},{"courses_instructor":"anderson, david","courses_avg":87.93},{"courses_instructor":"anderson, david;nashon, samson madera","courses_avg":87.58},{"courses_instructor":"ansermino, john mark;barr, alasdair;bernatchez, pascal;bhagavatula, sastry;choi, peter tsz lung;etminan, mahyar;fedida, david;griesdale, donald e;hackett, tillie-louise;horne, andrew;kurata, harley;laher, ismail;preston, roanne;schwarz, stephan;walker, michael j a;warriner, charles brian;wright, james","courses_avg":82.76},{"courses_instructor":"assanand, sunaina;king, david","courses_avg":70.11},{"courses_instructor":"asselin, edouard;barr, peter;dixon, david;militzer, matthias","courses_avg":75.93},{"courses_instructor":"asselin, edouard;cockcroft, steven;dreisinger, david;sinclair, chadwick;wang, rizhi","courses_avg":81.03},{"courses_instructor":"asselin, edouard;dreisinger, david;wang, rizhi","courses_avg":82.53},{"courses_instructor":"axen, david a","courses_avg":69.62},{"courses_instructor":"bandiera, stelvio;grierson, david;reid, ronald","courses_avg":74.98},{"courses_instructor":"bandiera, stelvio;grierson, david;reid, ronald","courses_avg":72.93},{"courses_instructor":"bandiera, stelvio;grierson, david;reid, ronald","courses_avg":74.12},{"courses_instructor":"barnes, trevor;ley, david frederick","courses_avg":62.75},{"courses_instructor":"barnes, trevor;ley, david frederick","courses_avg":64.83},{"courses_instructor":"barnes, trevor;ley, david frederick","courses_avg":62.22},{"courses_instructor":"barnes, trevor;ley, david frederick","courses_avg":66.08},{"courses_instructor":"barnes, trevor;ley, david frederick","courses_avg":65.72},{"courses_instructor":"barnes, trevor;ley, david frederick","courses_avg":65.26},{"courses_instructor":"barnes, trevor;ley, david frederick","courses_avg":63.71},{"courses_instructor":"barnes, trevor;ley, david frederick","courses_avg":68.78},{"courses_instructor":"barnes, trevor;ley, david frederick","courses_avg":71.13},{"courses_instructor":"barnes, trevor;ley, david frederick","courses_avg":65.51},{"courses_instructor":"barnes, trevor;ley, david frederick","courses_avg":68.59},{"courses_instructor":"barnes, trevor;ley, david frederick","courses_avg":65.4},{"courses_instructor":"barton, michael;flanders, david;satterfield, blair","courses_avg":80.19},{"courses_instructor":"barton, michael;flanders, david;satterfield, blair","courses_avg":80.25},{"courses_instructor":"beare, david","courses_avg":88.67},{"courses_instructor":"bennewith, kevin;cote, helene;devlin, angela;granville, david;lockwood, william;shah, sohrab;steidl, christian;verchere, bruce;wellington, cheryl lea;weng, andrew","courses_avg":91.79},{"courses_instructor":"bentall, david","courses_avg":79.25},{"courses_instructor":"bentall, david","courses_avg":72.14},{"courses_instructor":"bentall, david","courses_avg":78.89},{"courses_instructor":"bentall, david","courses_avg":80.26},{"courses_instructor":"bentall, david","courses_avg":76.7},{"courses_instructor":"bergeron, david;sharon, rena","courses_avg":84.86},{"courses_instructor":"berrington, david arthur","courses_avg":90.46},{"courses_instructor":"berrington, david arthur","courses_avg":83.84},{"courses_instructor":"birnbaum, david","courses_avg":92.08},{"courses_instructor":"bomke, arthur a;mcarthur, david","courses_avg":76.35},{"courses_instructor":"bomke, arthur a;mcarthur, david","courses_avg":78.43},{"courses_instructor":"borys, david","courses_avg":71.17},{"courses_instructor":"borys, david","courses_avg":73.56},{"courses_instructor":"brady, colleen;chan, fong;massaro, davide;meghji, ali reza;seto, katherine","courses_avg":72.34},{"courses_instructor":"brady, colleen;chan, fong;massaro, davide;meghji, ali reza;seto, katherine","courses_avg":77.79},{"courses_instructor":"brady, colleen;chan, fong;massaro, davide;meghji, ali reza;seto, katherine","courses_avg":76.51},{"courses_instructor":"brady, colleen;chan, fong;massaro, davide;meghji, ali reza;seto, katherine","courses_avg":77.66},{"courses_instructor":"brady, colleen;chan, fong;massaro, davide;meghji, ali reza;seto, katherine","courses_avg":72.84},{"courses_instructor":"brady, colleen;chan, fong;massaro, davide;meghji, ali reza;seto, katherine","courses_avg":64.8},{"courses_instructor":"brown, sandra;grayston, susan;krzic, maja;novak, mike david","courses_avg":89.67},{"courses_instructor":"brown, sandra;grayston, susan;novak, mike david","courses_avg":72.5},{"courses_instructor":"brown, sandra;mcarthur, david;novak, mike david","courses_avg":76.43},{"courses_instructor":"brownstein, david","courses_avg":78},{"courses_instructor":"brownstein, david","courses_avg":71.76},{"courses_instructor":"brownstein, david","courses_avg":75.72},{"courses_instructor":"brownstein, david","courses_avg":77},{"courses_instructor":"brownstein, david","courses_avg":75.47},{"courses_instructor":"brownstein, david","courses_avg":77.67},{"courses_instructor":"brownstein, david","courses_avg":79.1},{"courses_instructor":"brownstein, david","courses_avg":77},{"courses_instructor":"brownstein, david","courses_avg":74.93},{"courses_instructor":"brownstein, david","courses_avg":71.33},{"courses_instructor":"brownstein, david","courses_avg":69},{"courses_instructor":"brownstein, david","courses_avg":74.25},{"courses_instructor":"brownstein, david","courses_avg":73.06},{"courses_instructor":"brownstein, david","courses_avg":77.16},{"courses_instructor":"brownstein, david","courses_avg":77.56},{"courses_instructor":"brownstein, david","courses_avg":70.22},{"courses_instructor":"brownstein, david","courses_avg":76.41},{"courses_instructor":"brownstein, david","courses_avg":76.89},{"courses_instructor":"brownstein, david","courses_avg":75.4},{"courses_instructor":"brownstein, david","courses_avg":77.25},{"courses_instructor":"brownstein, david","courses_avg":66.44},{"courses_instructor":"brownstein, david","courses_avg":78.25},{"courses_instructor":"brownstein, david","courses_avg":71.58},{"courses_instructor":"brydges, david","courses_avg":88.73},{"courses_instructor":"brydges, david","courses_avg":66.22},{"courses_instructor":"brydges, david","courses_avg":71.21},{"courses_instructor":"brydges, david","courses_avg":69.6},{"courses_instructor":"brydges, david","courses_avg":67.63},{"courses_instructor":"brydges, david","courses_avg":82},{"courses_instructor":"brydges, david","courses_avg":64.8},{"courses_instructor":"brydges, david","courses_avg":85.2},{"courses_instructor":"brydges, david","courses_avg":88.8},{"courses_instructor":"brydges, david","courses_avg":82.5},{"courses_instructor":"brydges, david","courses_avg":75.5},{"courses_instructor":"brydges, david","courses_avg":73.1},{"courses_instructor":"brydges, david","courses_avg":88.75},{"courses_instructor":"brydges, david","courses_avg":92.75},{"courses_instructor":"brydges, david","courses_avg":68.91},{"courses_instructor":"bussiere, guillaume;chen, david","courses_avg":72.4},{"courses_instructor":"bussiere, guillaume;chen, david","courses_avg":76.65},{"courses_instructor":"bussiere, guillaume;chen, david","courses_avg":73.05},{"courses_instructor":"bussiere, guillaume;chen, david","courses_avg":72.33},{"courses_instructor":"campbell, christopher david","courses_avg":71.69},{"courses_instructor":"campbell, christopher david","courses_avg":74.44},{"courses_instructor":"campbell, karen;harrison, rosamund louise;kennedy, david;mathu-muju, kavita;richman, joy marion","courses_avg":79.25},{"courses_instructor":"carchedi, david","courses_avg":67.93},{"courses_instructor":"cempirek, jan;turner, david","courses_avg":78.77},{"courses_instructor":"cempirek, jan;turner, david","courses_avg":73.09},{"courses_instructor":"cempirek, jan;turner, david","courses_avg":73.83},{"courses_instructor":"cempirek, jan;turner, david","courses_avg":67.53},{"courses_instructor":"chan, david","courses_avg":72.76},{"courses_instructor":"chan, david","courses_avg":69.93},{"courses_instructor":"chan, david","courses_avg":64.13},{"courses_instructor":"chan, david","courses_avg":75.44},{"courses_instructor":"chan, david","courses_avg":72.86},{"courses_instructor":"chan, david","courses_avg":74.28},{"courses_instructor":"chan, david","courses_avg":68.92},{"courses_instructor":"chan, david","courses_avg":72.06},{"courses_instructor":"chan, david","courses_avg":65.23},{"courses_instructor":"chan, david","courses_avg":76.49},{"courses_instructor":"chan, david","courses_avg":70.64},{"courses_instructor":"chan, david","courses_avg":73.92},{"courses_instructor":"chan, david","courses_avg":73.91},{"courses_instructor":"chan, david","courses_avg":74.54},{"courses_instructor":"chan, david","courses_avg":76.55},{"courses_instructor":"chan, david","courses_avg":76.19},{"courses_instructor":"chan, david","courses_avg":70.41},{"courses_instructor":"chan, david","courses_avg":73.28},{"courses_instructor":"chan, david","courses_avg":72.49},{"courses_instructor":"chan, david","courses_avg":68.21},{"courses_instructor":"chan, david","courses_avg":67.33},{"courses_instructor":"chan, david","courses_avg":69.32},{"courses_instructor":"chan, david","courses_avg":71.91},{"courses_instructor":"chan, david","courses_avg":75.54},{"courses_instructor":"chan, david","courses_avg":67.8},{"courses_instructor":"chan, david","courses_avg":71.63},{"courses_instructor":"chan, david","courses_avg":69.87},{"courses_instructor":"chan, david","courses_avg":74.18},{"courses_instructor":"chan, david","courses_avg":70.25},{"courses_instructor":"chan, david","courses_avg":69.79},{"courses_instructor":"chan, david","courses_avg":65.05},{"courses_instructor":"chan, david","courses_avg":69.94},{"courses_instructor":"chan, david","courses_avg":74.18},{"courses_instructor":"chan, david","courses_avg":71.56},{"courses_instructor":"chan, david","courses_avg":71.41},{"courses_instructor":"chan, david","courses_avg":68.92},{"courses_instructor":"chan, david","courses_avg":70.11},{"courses_instructor":"chan, david","courses_avg":74.89},{"courses_instructor":"chan, david","courses_avg":65.72},{"courses_instructor":"chan, david","courses_avg":70.04},{"courses_instructor":"chan, david","courses_avg":67.87},{"courses_instructor":"chan, david","courses_avg":71.12},{"courses_instructor":"chan, david","courses_avg":70.97},{"courses_instructor":"chan, david","courses_avg":71.25},{"courses_instructor":"chan, david","courses_avg":68.51},{"courses_instructor":"chan, david","courses_avg":73.35},{"courses_instructor":"chan, david","courses_avg":73.5},{"courses_instructor":"chan, david","courses_avg":73.26},{"courses_instructor":"chan, david","courses_avg":72.15},{"courses_instructor":"chan, david","courses_avg":71.85},{"courses_instructor":"chan, fong;frankel, adam;lalji, fawziah;massaro, davide;miller, penelope;moshenko, janice lynn;park, charles;seet, tony;watson, hilary;zed, peter","courses_avg":75.97},{"courses_instructor":"chen, david","courses_avg":74.92},{"courses_instructor":"chen, david","courses_avg":87.57},{"courses_instructor":"chen, david","courses_avg":92.5},{"courses_instructor":"chen, david","courses_avg":73.82},{"courses_instructor":"chen, david","courses_avg":90.43},{"courses_instructor":"chen, david","courses_avg":89.13},{"courses_instructor":"chen, david","courses_avg":66.94},{"courses_instructor":"chen, david","courses_avg":86.78},{"courses_instructor":"chen, david;wang, yan","courses_avg":76.6},{"courses_instructor":"cheung, karen;ma, hongshen;wilson, david","courses_avg":85.59},{"courses_instructor":"cheung, karen;ma, hongshen;wilson, david","courses_avg":84.1},{"courses_instructor":"cheung, wai lung;christensen, villy;close, david;mcallister, murdoch;pauly, daniel;pitcher, tony;sumaila, ussif rashid;trites, andrew;vincent, amanda","courses_avg":87.67},{"courses_instructor":"cheung, wai lung;christensen, villy;close, david;mcallister, murdoch;pauly, daniel;pitcher, tony;sumaila, ussif rashid;trites, andrew;vincent, amanda","courses_avg":86.89},{"courses_instructor":"cheung, wai lung;christensen, villy;close, david;mcallister, murdoch;pauly, daniel;pitcher, tony;sumaila, ussif rashid;trites, andrew;vincent, amanda;walters, carl john","courses_avg":85.17},{"courses_instructor":"cheung, wai lung;christensen, villy;close, david;pauly, daniel;pitcher, tony;sumaila, ussif rashid;trites, andrew;vincent, amanda;walters, carl john","courses_avg":88.5},{"courses_instructor":"close, david","courses_avg":78.08},{"courses_instructor":"close, david","courses_avg":78.58},{"courses_instructor":"close, david","courses_avg":84.27},{"courses_instructor":"close, david","courses_avg":76.33},{"courses_instructor":"close, david","courses_avg":84.85},{"courses_instructor":"cockcroft, steven;dreisinger, david","courses_avg":88.42},{"courses_instructor":"cohen, david","courses_avg":75.41},{"courses_instructor":"cohen, david","courses_avg":81.97},{"courses_instructor":"cohen, david","courses_avg":76.25},{"courses_instructor":"cohen, david","courses_avg":79.13},{"courses_instructor":"cohen, david","courses_avg":78.48},{"courses_instructor":"cohen, david","courses_avg":75.52},{"courses_instructor":"cohen, david","courses_avg":74.63},{"courses_instructor":"cohen, david;ellis, simon","courses_avg":69.92},{"courses_instructor":"cohen, david;ellis, simon","courses_avg":66.83},{"courses_instructor":"cohen, david;ellis, simon","courses_avg":70.64},{"courses_instructor":"cohen, david;ellis, simon","courses_avg":66.54},{"courses_instructor":"cohen, david;ellis, simon","courses_avg":72.94},{"courses_instructor":"cohen, david;ellis, simon","courses_avg":70.52},{"courses_instructor":"cohen, michael david","courses_avg":71.66},{"courses_instructor":"coulter, david","courses_avg":87.11},{"courses_instructor":"coulter, david","courses_avg":87.74},{"courses_instructor":"coulter, david","courses_avg":87.06},{"courses_instructor":"coulter, david;rubenson, kjell len","courses_avg":87.4},{"courses_instructor":"crawford, david robert","courses_avg":73.88},{"courses_instructor":"crawford, david robert","courses_avg":67.26},{"courses_instructor":"crawford, david robert","courses_avg":70.5},{"courses_instructor":"crawford, david robert","courses_avg":72.48},{"courses_instructor":"crawford, david robert","courses_avg":73.52},{"courses_instructor":"crawford, david robert","courses_avg":75.33},{"courses_instructor":"crawford, david robert","courses_avg":76.2},{"courses_instructor":"crawford, david robert","courses_avg":74.31},{"courses_instructor":"crawford, david robert","courses_avg":76.76},{"courses_instructor":"crawford, david robert","courses_avg":79.05},{"courses_instructor":"crawford, david robert","courses_avg":76.03},{"courses_instructor":"crawford, david robert","courses_avg":70.76},{"courses_instructor":"crawford, david robert","courses_avg":68.32},{"courses_instructor":"crawford, david robert","courses_avg":76.51},{"courses_instructor":"crawford, david robert","courses_avg":69.17},{"courses_instructor":"crawford, david robert","courses_avg":69.64},{"courses_instructor":"crawford, david robert","courses_avg":71.96},{"courses_instructor":"crawford, david robert","courses_avg":67.6},{"courses_instructor":"crawford, david robert","courses_avg":70.56},{"courses_instructor":"crawford, david robert","courses_avg":66.69},{"courses_instructor":"crawford, david robert","courses_avg":73},{"courses_instructor":"crawford, david robert","courses_avg":75.29},{"courses_instructor":"crawford, david robert","courses_avg":70.39},{"courses_instructor":"crawford, david robert","courses_avg":72.04},{"courses_instructor":"crawford, david robert","courses_avg":76.8},{"courses_instructor":"crawford, david robert","courses_avg":78.9},{"courses_instructor":"crawford, david robert","courses_avg":79.05},{"courses_instructor":"crawford, david robert","courses_avg":70.36},{"courses_instructor":"crawford, david robert;fielding, david","courses_avg":80.85},{"courses_instructor":"crawford, david robert;fielding, david","courses_avg":80.67},{"courses_instructor":"crawford, david robert;fielding, david","courses_avg":83.64},{"courses_instructor":"crawford, david robert;fielding, david","courses_avg":84.24},{"courses_instructor":"creese, david","courses_avg":65},{"courses_instructor":"cubbon, paul;etmannski, tamara;miller, david","courses_avg":82.63},{"courses_instructor":"cubbon, paul;etmannski, tamara;miller, david","courses_avg":83.24},{"courses_instructor":"cubbon, paul;kruchten, philippe;miller, david","courses_avg":81.48},{"courses_instructor":"cubbon, paul;kruchten, philippe;miller, david","courses_avg":81.08},{"courses_instructor":"cyr, david","courses_avg":79.76},{"courses_instructor":"cyr, david","courses_avg":88.33},{"courses_instructor":"cyr, david;lewis, jennifer","courses_avg":83.21},{"courses_instructor":"cyr, david;stiller, murray","courses_avg":82.92},{"courses_instructor":"cyr, david;tba","courses_avg":89.52},{"courses_instructor":"dake, gregory;perrin, david","courses_avg":56.2},{"courses_instructor":"dake, gregory;perrin, david","courses_avg":65.32},{"courses_instructor":"danielson, peter;poole, david","courses_avg":78.23},{"courses_instructor":"danielson, peter;poole, david","courses_avg":74.9},{"courses_instructor":"davidoff, thomas","courses_avg":80.82},{"courses_instructor":"davidoff, thomas","courses_avg":79.65},{"courses_instructor":"davidoff, thomas","courses_avg":82.2},{"courses_instructor":"davidoff, thomas","courses_avg":80.86},{"courses_instructor":"davidoff, thomas","courses_avg":79.23},{"courses_instructor":"davidoff, thomas","courses_avg":85.62},{"courses_instructor":"davidoff, thomas","courses_avg":81.51},{"courses_instructor":"davidoff, thomas","courses_avg":83.03},{"courses_instructor":"davidoff, thomas","courses_avg":82.59},{"courses_instructor":"davidoff, thomas","courses_avg":82.29},{"courses_instructor":"davidoff, thomas","courses_avg":84.36},{"courses_instructor":"davidoff, thomas","courses_avg":82.34},{"courses_instructor":"davidoff, thomas","courses_avg":83.45},{"courses_instructor":"davidoff, thomas;somerville, craig tsuriel","courses_avg":75.92},{"courses_instructor":"davidoff, thomas;somerville, craig tsuriel","courses_avg":72.48},{"courses_instructor":"davidoff, thomas;somerville, craig tsuriel","courses_avg":78.17},{"courses_instructor":"davidoff, thomas;somerville, craig tsuriel","courses_avg":74.54},{"courses_instructor":"davidoff, thomas;somerville, craig tsuriel","courses_avg":80.36},{"courses_instructor":"davidoff, thomas;somerville, craig tsuriel","courses_avg":75.68},{"courses_instructor":"davidoff, thomas;somerville, craig tsuriel","courses_avg":75.42},{"courses_instructor":"davidoff, thomas;somerville, craig tsuriel","courses_avg":76.33},{"courses_instructor":"davidson, alan","courses_avg":86.33},{"courses_instructor":"davidson, alan","courses_avg":82.4},{"courses_instructor":"davidson, bryn","courses_avg":79.74},{"courses_instructor":"davidson, katherine","courses_avg":88.88},{"courses_instructor":"davidson, katherine;mortenson, patricia","courses_avg":84.5},{"courses_instructor":"davidson, sarah","courses_avg":73.14},{"courses_instructor":"dixon, david","courses_avg":73.67},{"courses_instructor":"dixon, david","courses_avg":96.25},{"courses_instructor":"dixon, david","courses_avg":63.19},{"courses_instructor":"dixon, david","courses_avg":76.47},{"courses_instructor":"dixon, david","courses_avg":71.27},{"courses_instructor":"dixon, david","courses_avg":65.11},{"courses_instructor":"dixon, david","courses_avg":66.63},{"courses_instructor":"dixon, david","courses_avg":66.74},{"courses_instructor":"dixon, david","courses_avg":68.4},{"courses_instructor":"dixon, david","courses_avg":75.89},{"courses_instructor":"dixon, david","courses_avg":77.47},{"courses_instructor":"dixon, david","courses_avg":81.68},{"courses_instructor":"dixon, david","courses_avg":95},{"courses_instructor":"dixon, david","courses_avg":78.43},{"courses_instructor":"dixon, david","courses_avg":83.03},{"courses_instructor":"dixon, david","courses_avg":72.13},{"courses_instructor":"dixon, david;xia, guangrui","courses_avg":73.39},{"courses_instructor":"dixon, joy;meola, david andrew","courses_avg":72.1},{"courses_instructor":"dixon, joy;meola, david andrew","courses_avg":63.04},{"courses_instructor":"dodson, david","courses_avg":82.5},{"courses_instructor":"dodson, david","courses_avg":73.25},{"courses_instructor":"dodson, david","courses_avg":75.14},{"courses_instructor":"dodson, david","courses_avg":65.92},{"courses_instructor":"dodson, david","courses_avg":70},{"courses_instructor":"dodson, david","courses_avg":65.52},{"courses_instructor":"dodson, david","courses_avg":74.65},{"courses_instructor":"dodson, david","courses_avg":70.64},{"courses_instructor":"dodson, david","courses_avg":68.41},{"courses_instructor":"dodson, david","courses_avg":68.42},{"courses_instructor":"dodson, david","courses_avg":71.49},{"courses_instructor":"dodson, david","courses_avg":72.58},{"courses_instructor":"dodson, david","courses_avg":80.57},{"courses_instructor":"dreisinger, david","courses_avg":80.31},{"courses_instructor":"dreisinger, david","courses_avg":74.11},{"courses_instructor":"dreisinger, david","courses_avg":79},{"courses_instructor":"dreisinger, david","courses_avg":74.17},{"courses_instructor":"dreisinger, david","courses_avg":81.33},{"courses_instructor":"dreisinger, david","courses_avg":77.13},{"courses_instructor":"dreisinger, david","courses_avg":77.47},{"courses_instructor":"dreisinger, david","courses_avg":79.98},{"courses_instructor":"dreisinger, david","courses_avg":85.25},{"courses_instructor":"dreisinger, david","courses_avg":80.88},{"courses_instructor":"dreisinger, david","courses_avg":76.77},{"courses_instructor":"dreisinger, david","courses_avg":86.63},{"courses_instructor":"dreisinger, david;ko, frank;maijer, daan;sinclair, chadwick;wang, rizhi","courses_avg":79.77},{"courses_instructor":"dreisinger, david;sinclair, chadwick;wang, rizhi","courses_avg":77.59},{"courses_instructor":"dunbar, w scott;russell, alan david","courses_avg":80},{"courses_instructor":"dunbar, w scott;russell, alan david","courses_avg":72.08},{"courses_instructor":"dzikowski, tashia;turner, david","courses_avg":76.44},{"courses_instructor":"dzikowski, tashia;turner, david","courses_avg":76.32},{"courses_instructor":"dzikowski, tashia;turner, david","courses_avg":77.57},{"courses_instructor":"dzikowski, tashia;turner, david","courses_avg":71.76},{"courses_instructor":"dzikowski, tashia;turner, david","courses_avg":70.3},{"courses_instructor":"dzikowski, tashia;turner, david","courses_avg":73.77},{"courses_instructor":"dzikowski, tashia;turner, david","courses_avg":71.31},{"courses_instructor":"dzikowski, tashia;turner, david","courses_avg":72},{"courses_instructor":"edgington, david william","courses_avg":63.14},{"courses_instructor":"edgington, david william","courses_avg":67.28},{"courses_instructor":"edgington, david william","courses_avg":85.83},{"courses_instructor":"edgington, david william","courses_avg":69.92},{"courses_instructor":"edgington, david william","courses_avg":66.93},{"courses_instructor":"edgington, david william","courses_avg":66.5},{"courses_instructor":"edgington, david william","courses_avg":65.74},{"courses_instructor":"edgington, david william","courses_avg":69.38},{"courses_instructor":"edgington, david william","courses_avg":68.89},{"courses_instructor":"edgington, david william","courses_avg":67.4},{"courses_instructor":"edgington, david william","courses_avg":79.6},{"courses_instructor":"edgington, david william","courses_avg":70.83},{"courses_instructor":"edgington, david william","courses_avg":69.42},{"courses_instructor":"edgington, david william","courses_avg":68.5},{"courses_instructor":"edgington, david william","courses_avg":70.9},{"courses_instructor":"edgington, david william","courses_avg":68.6},{"courses_instructor":"edgington, david william","courses_avg":70.21},{"courses_instructor":"edgington, david william","courses_avg":72.7},{"courses_instructor":"edgington, david william","courses_avg":80.94},{"courses_instructor":"edgington, david william","courses_avg":71.32},{"courses_instructor":"edgington, david william;ley, david frederick","courses_avg":67.7},{"courses_instructor":"edgington, david william;ley, david frederick","courses_avg":68.73},{"courses_instructor":"egerton, george w;gossen, david","courses_avg":60.45},{"courses_instructor":"egerton, george w;gossen, david","courses_avg":60.7},{"courses_instructor":"egerton, george w;gossen, david","courses_avg":53.9},{"courses_instructor":"egerton, george w;gossen, david","courses_avg":64.1},{"courses_instructor":"egerton, george w;gossen, david","courses_avg":65.44},{"courses_instructor":"elmo, davide","courses_avg":74.23},{"courses_instructor":"elmo, davide","courses_avg":75.1},{"courses_instructor":"elmo, davide","courses_avg":72.17},{"courses_instructor":"elmo, davide","courses_avg":70.61},{"courses_instructor":"elmo, davide","courses_avg":73.26},{"courses_instructor":"elmo, davide","courses_avg":74.46},{"courses_instructor":"elmo, davide","courses_avg":75.33},{"courses_instructor":"elmo, davide","courses_avg":73.84},{"courses_instructor":"elmo, davide","courses_avg":74.71},{"courses_instructor":"elmo, davide","courses_avg":91.56},{"courses_instructor":"elmo, davide","courses_avg":77.85},{"courses_instructor":"elmo, davide","courses_avg":85.09},{"courses_instructor":"elmo, davide","courses_avg":80.6},{"courses_instructor":"elmo, davide","courses_avg":83},{"courses_instructor":"elmo, davide","courses_avg":84.08},{"courses_instructor":"elmo, davide;scoble, malcolm","courses_avg":83.85},{"courses_instructor":"evans, philip david","courses_avg":83.83},{"courses_instructor":"evans, philip david","courses_avg":81.5},{"courses_instructor":"evans, philip david","courses_avg":77.1},{"courses_instructor":"evans, philip david","courses_avg":75.86},{"courses_instructor":"evans, philip david","courses_avg":70.4},{"courses_instructor":"evans, philip david","courses_avg":68.54},{"courses_instructor":"fairholm, david;taylor, robert","courses_avg":78.47},{"courses_instructor":"fairholm, david;taylor, robert","courses_avg":80.64},{"courses_instructor":"fairholm, david;taylor, robert","courses_avg":75.27},{"courses_instructor":"fairholm, david;taylor, robert","courses_avg":80.69},{"courses_instructor":"fairholm, david;taylor, robert","courses_avg":79},{"courses_instructor":"fairholm, david;taylor, robert","courses_avg":77.38},{"courses_instructor":"fairholm, david;taylor, robert;westerberg, brian","courses_avg":75},{"courses_instructor":"fairholm, david;taylor, robert;westerberg, brian","courses_avg":79.38},{"courses_instructor":"fairholm, david;taylor, robert;westerberg, brian","courses_avg":71.55},{"courses_instructor":"fairholm, david;taylor, robert;westerberg, brian","courses_avg":67.43},{"courses_instructor":"farrell, anthony;rosen, david","courses_avg":67.55},{"courses_instructor":"farrell, anthony;rosen, david","courses_avg":75.97},{"courses_instructor":"farrell, anthony;rosen, david","courses_avg":73.9},{"courses_instructor":"farrell, anthony;rosen, david","courses_avg":73.22},{"courses_instructor":"farrell, david irwin","courses_avg":79.28},{"courses_instructor":"farrell, david irwin","courses_avg":78.23},{"courses_instructor":"farrell, david irwin","courses_avg":78.08},{"courses_instructor":"farrell, david irwin","courses_avg":79.78},{"courses_instructor":"farrell, david irwin","courses_avg":77.97},{"courses_instructor":"farrell, david irwin","courses_avg":78.2},{"courses_instructor":"farrell, david irwin","courses_avg":78.03},{"courses_instructor":"farrell, david irwin","courses_avg":78.85},{"courses_instructor":"farrell, david irwin","courses_avg":76.24},{"courses_instructor":"farrell, david irwin","courses_avg":77.97},{"courses_instructor":"farrell, david irwin","courses_avg":76.54},{"courses_instructor":"farrell, david irwin","courses_avg":78.16},{"courses_instructor":"farrell, david irwin","courses_avg":76.36},{"courses_instructor":"farrell, david irwin","courses_avg":76.79},{"courses_instructor":"farrell, david irwin","courses_avg":79.24},{"courses_instructor":"farrell, david irwin","courses_avg":79.77},{"courses_instructor":"farrell, david irwin","courses_avg":77.16},{"courses_instructor":"farrell, david irwin","courses_avg":78.56},{"courses_instructor":"farrell, david irwin","courses_avg":77.15},{"courses_instructor":"farrell, david irwin","courses_avg":78.07},{"courses_instructor":"farrell, david irwin","courses_avg":78.03},{"courses_instructor":"farrell, david irwin","courses_avg":76.57},{"courses_instructor":"fedida, david;horne, andrew;karim, sultan;pang, catherine c;walker, michael j a","courses_avg":77.46},{"courses_instructor":"fedida, david;horne, andrew;leung, joanne y t;pang, catherine c","courses_avg":83.68},{"courses_instructor":"fell, david","courses_avg":77.16},{"courses_instructor":"flanders, david;satterfield, blair","courses_avg":84.03},{"courses_instructor":"flanders, david;satterfield, blair","courses_avg":83.85},{"courses_instructor":"flanders, david;sheppard, stephen","courses_avg":83},{"courses_instructor":"fox, joanne alison;han, andrea;ng, david","courses_avg":70.35},{"courses_instructor":"fox, joanne alison;han, andrea;ng, david","courses_avg":74.65},{"courses_instructor":"fox, joanne alison;ng, david;samuels, anne lacey","courses_avg":74.09},{"courses_instructor":"fraser, david","courses_avg":85.93},{"courses_instructor":"fraser, david","courses_avg":84},{"courses_instructor":"fraser, david","courses_avg":74.88},{"courses_instructor":"fraser, david","courses_avg":81.27},{"courses_instructor":"fraser, david","courses_avg":84.11},{"courses_instructor":"fraser, david;ormandy, elisabeth","courses_avg":84.33},{"courses_instructor":"fraser, david;ormandy, elisabeth","courses_avg":87.6},{"courses_instructor":"fraser, david;von keyserlingk, marina","courses_avg":87.37},{"courses_instructor":"fraser, david;von keyserlingk, marina","courses_avg":84.72},{"courses_instructor":"fraser, david;von keyserlingk, marina","courses_avg":87.21},{"courses_instructor":"fraser, david;von keyserlingk, marina","courses_avg":83.22},{"courses_instructor":"fraser, david;von keyserlingk, marina","courses_avg":86.8},{"courses_instructor":"fraser, david;von keyserlingk, marina","courses_avg":83.09},{"courses_instructor":"fraser, david;von keyserlingk, marina","courses_avg":82.06},{"courses_instructor":"fraser, david;von keyserlingk, marina","courses_avg":87.37},{"courses_instructor":"fraser, david;walker, kristen","courses_avg":79.2},{"courses_instructor":"fraser, david;weary, daniel","courses_avg":82},{"courses_instructor":"fraser, david;weary, daniel","courses_avg":76.9},{"courses_instructor":"fraser, david;weary, daniel","courses_avg":83.68},{"courses_instructor":"fraser, david;weary, daniel","courses_avg":81.09},{"courses_instructor":"fraser, david;weary, daniel","courses_avg":76.09},{"courses_instructor":"fraser, david;weary, daniel","courses_avg":83.17},{"courses_instructor":"freedman, ruth;newton, david","courses_avg":68.98},{"courses_instructor":"freedman, ruth;newton, david","courses_avg":73.28},{"courses_instructor":"froese, thomas;russell, alan david","courses_avg":83},{"courses_instructor":"gaertner, david","courses_avg":76.41},{"courses_instructor":"gaertner, david","courses_avg":75.85},{"courses_instructor":"galvez alcaraz, david","courses_avg":67.5},{"courses_instructor":"gaynor, erin;oliver, david","courses_avg":70.93},{"courses_instructor":"geary, david","courses_avg":76.44},{"courses_instructor":"gillen, david","courses_avg":72.63},{"courses_instructor":"gillen, david","courses_avg":83.67},{"courses_instructor":"gillen, david","courses_avg":81.5},{"courses_instructor":"gillen, david","courses_avg":79.56},{"courses_instructor":"gillen, david","courses_avg":75},{"courses_instructor":"gillen, david","courses_avg":81.42},{"courses_instructor":"gillen, david","courses_avg":81.11},{"courses_instructor":"gillen, david","courses_avg":79.1},{"courses_instructor":"gillen, david","courses_avg":77.42},{"courses_instructor":"gillen, david","courses_avg":80.77},{"courses_instructor":"gillen, david","courses_avg":75.25},{"courses_instructor":"godin, david v","courses_avg":88},{"courses_instructor":"golinsky, david gerald","courses_avg":87.13},{"courses_instructor":"gossen, david","courses_avg":73.94},{"courses_instructor":"gossen, david","courses_avg":63.48},{"courses_instructor":"gossen, david","courses_avg":63.44},{"courses_instructor":"gossen, david","courses_avg":77},{"courses_instructor":"gossen, david","courses_avg":34},{"courses_instructor":"gossen, david","courses_avg":49.15},{"courses_instructor":"gossen, david","courses_avg":59.13},{"courses_instructor":"gossen, david","courses_avg":58.47},{"courses_instructor":"gossen, david","courses_avg":64.67},{"courses_instructor":"gossen, david","courses_avg":75.26},{"courses_instructor":"gossen, david","courses_avg":46.33},{"courses_instructor":"gossen, david","courses_avg":68.8},{"courses_instructor":"gossen, david","courses_avg":72.15},{"courses_instructor":"gossen, david","courses_avg":74.06},{"courses_instructor":"gossen, david","courses_avg":76.81},{"courses_instructor":"gossen, david","courses_avg":62.46},{"courses_instructor":"gossen, david","courses_avg":61.78},{"courses_instructor":"gossen, david","courses_avg":73.47},{"courses_instructor":"gossen, david","courses_avg":61.6},{"courses_instructor":"gossen, david","courses_avg":86},{"courses_instructor":"gossen, david","courses_avg":57.48},{"courses_instructor":"gossen, david","courses_avg":72.15},{"courses_instructor":"gossen, david","courses_avg":68.91},{"courses_instructor":"gossen, david","courses_avg":71.08},{"courses_instructor":"gossen, david","courses_avg":74.67},{"courses_instructor":"gossen, david","courses_avg":55.5},{"courses_instructor":"gossen, david","courses_avg":64.75},{"courses_instructor":"gossen, david","courses_avg":74.25},{"courses_instructor":"gossen, david","courses_avg":61.89},{"courses_instructor":"gossen, david","courses_avg":70.89},{"courses_instructor":"gossen, david","courses_avg":75.43},{"courses_instructor":"gossen, david","courses_avg":70.83},{"courses_instructor":"gossen, david","courses_avg":76.64},{"courses_instructor":"gossen, david","courses_avg":77.8},{"courses_instructor":"gossen, david","courses_avg":72.56},{"courses_instructor":"gossen, david","courses_avg":68.16},{"courses_instructor":"gossen, david","courses_avg":68.62},{"courses_instructor":"gossen, david","courses_avg":72.65},{"courses_instructor":"gossen, david","courses_avg":75.37},{"courses_instructor":"gossen, david","courses_avg":78.39},{"courses_instructor":"gossen, david","courses_avg":72.23},{"courses_instructor":"gossen, david","courses_avg":59},{"courses_instructor":"grant, david n;knorr, edwin max","courses_avg":77.2},{"courses_instructor":"grant, david n;knorr, edwin max","courses_avg":75.95},{"courses_instructor":"green, david","courses_avg":70.19},{"courses_instructor":"green, david","courses_avg":72.39},{"courses_instructor":"green, david","courses_avg":75.37},{"courses_instructor":"green, david","courses_avg":73.84},{"courses_instructor":"green, david","courses_avg":73.04},{"courses_instructor":"green, david","courses_avg":86.86},{"courses_instructor":"green, david","courses_avg":80.44},{"courses_instructor":"green, david","courses_avg":81.63},{"courses_instructor":"green, david","courses_avg":93.33},{"courses_instructor":"green, david","courses_avg":84.37},{"courses_instructor":"green, david","courses_avg":84.75},{"courses_instructor":"green, david","courses_avg":85.38},{"courses_instructor":"green, david","courses_avg":81},{"courses_instructor":"grierson, david","courses_avg":78.78},{"courses_instructor":"grierson, david","courses_avg":71.78},{"courses_instructor":"gyenge, elod lajos;wilkinson, david","courses_avg":84.67},{"courses_instructor":"hall, david geoffrey","courses_avg":70.94},{"courses_instructor":"hall, david geoffrey","courses_avg":71.17},{"courses_instructor":"hall, david geoffrey","courses_avg":69.97},{"courses_instructor":"hall, david geoffrey","courses_avg":70.93},{"courses_instructor":"hall, david geoffrey","courses_avg":71.57},{"courses_instructor":"hall, david geoffrey","courses_avg":68.03},{"courses_instructor":"hall, david geoffrey","courses_avg":69.7},{"courses_instructor":"hall, david geoffrey","courses_avg":66.4},{"courses_instructor":"hall, david geoffrey","courses_avg":68.22},{"courses_instructor":"hall, david geoffrey","courses_avg":71.24},{"courses_instructor":"hall, david geoffrey","courses_avg":72.16},{"courses_instructor":"hall, david geoffrey","courses_avg":69.75},{"courses_instructor":"hall, david geoffrey","courses_avg":70.82},{"courses_instructor":"hall, david geoffrey","courses_avg":71.4},{"courses_instructor":"hardisty, david","courses_avg":80.9},{"courses_instructor":"hardisty, david","courses_avg":75.34},{"courses_instructor":"hardisty, david","courses_avg":77.29},{"courses_instructor":"hardisty, david","courses_avg":78.84},{"courses_instructor":"hardisty, david","courses_avg":76.12},{"courses_instructor":"hardisty, david","courses_avg":78.12},{"courses_instructor":"hardisty, david","courses_avg":77},{"courses_instructor":"hardisty, david","courses_avg":76.5},{"courses_instructor":"harris, sara;jessop, david;scheifele, benjamin","courses_avg":78.69},{"courses_instructor":"hauka, david","courses_avg":79.36},{"courses_instructor":"hauka, david","courses_avg":81.74},{"courses_instructor":"iqbal, javed;measday, david","courses_avg":81.7},{"courses_instructor":"iqbal, javed;measday, david","courses_avg":76.64},{"courses_instructor":"iqbal, javed;measday, david","courses_avg":74.69},{"courses_instructor":"iqbal, javed;measday, david","courses_avg":74.32},{"courses_instructor":"iqbal, javed;measday, david","courses_avg":79.74},{"courses_instructor":"iqbal, javed;measday, david","courses_avg":74.9},{"courses_instructor":"isaacson, michael d;russell, alan david","courses_avg":71.34},{"courses_instructor":"jones, david","courses_avg":78.49},{"courses_instructor":"jones, david","courses_avg":75.72},{"courses_instructor":"jones, david","courses_avg":80.03},{"courses_instructor":"jones, david","courses_avg":82.21},{"courses_instructor":"jones, david","courses_avg":80.44},{"courses_instructor":"jones, david","courses_avg":78.74},{"courses_instructor":"jones, david","courses_avg":72.25},{"courses_instructor":"jones, david","courses_avg":80.26},{"courses_instructor":"jones, david","courses_avg":78.89},{"courses_instructor":"jones, david","courses_avg":81.32},{"courses_instructor":"jones, david","courses_avg":77.97},{"courses_instructor":"jones, david","courses_avg":79.33},{"courses_instructor":"jones, david","courses_avg":75.66},{"courses_instructor":"jones, david","courses_avg":74.69},{"courses_instructor":"jones, david;michal, carl","courses_avg":74.3},{"courses_instructor":"jones, david;michal, carl","courses_avg":71.69},{"courses_instructor":"jones, david;michal, carl","courses_avg":72.23},{"courses_instructor":"jones, david;michal, carl","courses_avg":81.44},{"courses_instructor":"jones, david;nakane, jonathan","courses_avg":82.86},{"courses_instructor":"jones, david;nakane, jonathan","courses_avg":83.73},{"courses_instructor":"kealy, david","courses_avg":94.56},{"courses_instructor":"kennedy, david","courses_avg":87.5},{"courses_instructor":"kennedy, david;sonya, dorothy","courses_avg":79.75},{"courses_instructor":"king, david","courses_avg":71.26},{"courses_instructor":"king, david","courses_avg":71.9},{"courses_instructor":"king, david","courses_avg":71.72},{"courses_instructor":"king, david","courses_avg":70.92},{"courses_instructor":"king, david","courses_avg":73.49},{"courses_instructor":"king, david","courses_avg":71.79},{"courses_instructor":"king, david","courses_avg":72.35},{"courses_instructor":"kirkpatrick, david","courses_avg":78.87},{"courses_instructor":"kirkpatrick, david","courses_avg":81.25},{"courses_instructor":"kirkpatrick, david","courses_avg":78.32},{"courses_instructor":"kirkpatrick, david","courses_avg":68.77},{"courses_instructor":"kirkpatrick, david","courses_avg":69.35},{"courses_instructor":"kirkpatrick, david","courses_avg":72.46},{"courses_instructor":"kirkpatrick, david","courses_avg":69.58},{"courses_instructor":"kirkpatrick, david","courses_avg":70.93},{"courses_instructor":"kitts, david","courses_avg":84.44},{"courses_instructor":"kitts, david","courses_avg":86.36},{"courses_instructor":"kitts, david","courses_avg":86.94},{"courses_instructor":"kitts, david","courses_avg":78.71},{"courses_instructor":"kitts, david","courses_avg":81.8},{"courses_instructor":"kitts, david","courses_avg":82.8},{"courses_instructor":"kohler, david","courses_avg":64.16},{"courses_instructor":"kohler, david","courses_avg":67.86},{"courses_instructor":"kuus, merje;ley, david frederick","courses_avg":85.63},{"courses_instructor":"kuus, merje;ley, david frederick","courses_avg":86.91},{"courses_instructor":"kuus, merje;ley, david frederick","courses_avg":85.22},{"courses_instructor":"lee, anna;myles, nickolas;quandt, jacqueline;walker, david;yip, stephen","courses_avg":85.76},{"courses_instructor":"lemay, valerie;tait, david e n","courses_avg":85.56},{"courses_instructor":"levi, maurice david","courses_avg":78.65},{"courses_instructor":"levi, maurice david","courses_avg":77.56},{"courses_instructor":"levi, maurice david","courses_avg":77.89},{"courses_instructor":"levi, maurice david","courses_avg":81.1},{"courses_instructor":"levi, maurice david","courses_avg":81.02},{"courses_instructor":"levi, maurice david","courses_avg":76.11},{"courses_instructor":"levi, maurice david","courses_avg":82.89},{"courses_instructor":"levi, maurice david","courses_avg":79.02},{"courses_instructor":"levi, maurice david","courses_avg":79.07},{"courses_instructor":"levi, maurice david","courses_avg":81.39},{"courses_instructor":"levi, maurice david","courses_avg":82.82},{"courses_instructor":"levi, maurice david","courses_avg":85},{"courses_instructor":"levi, maurice david","courses_avg":84.46},{"courses_instructor":"levi, maurice david","courses_avg":81},{"courses_instructor":"levi, maurice david","courses_avg":78.83},{"courses_instructor":"levi, maurice david","courses_avg":74.89},{"courses_instructor":"levi, maurice david","courses_avg":80.35},{"courses_instructor":"ley, david frederick","courses_avg":78.9},{"courses_instructor":"ley, david frederick","courses_avg":73},{"courses_instructor":"ley, david frederick","courses_avg":74.14},{"courses_instructor":"ley, david frederick","courses_avg":75.72},{"courses_instructor":"ley, david frederick","courses_avg":76.22},{"courses_instructor":"ley, david frederick;peck, jamie","courses_avg":84.13},{"courses_instructor":"ma, hongshen;wilson, david","courses_avg":89.5},{"courses_instructor":"maguire, bradley david","courses_avg":75.42},{"courses_instructor":"massaro, davide","courses_avg":92.66},{"courses_instructor":"massaro, davide;seto, katherine","courses_avg":91.95},{"courses_instructor":"mazzi, eric;wilkinson, david","courses_avg":81},{"courses_instructor":"mcarthur, david","courses_avg":77.41},{"courses_instructor":"mcarthur, david","courses_avg":80.81},{"courses_instructor":"mcarthur, david","courses_avg":81},{"courses_instructor":"mcarthur, david","courses_avg":78.54},{"courses_instructor":"mcarthur, david","courses_avg":80.18},{"courses_instructor":"mcarthur, david","courses_avg":78.58},{"courses_instructor":"mcarthur, david","courses_avg":73.24},{"courses_instructor":"mcarthur, david","courses_avg":79.15},{"courses_instructor":"mcarthur, david","courses_avg":80.09},{"courses_instructor":"mcarthur, david","courses_avg":78.25},{"courses_instructor":"mcarthur, david","courses_avg":79.31},{"courses_instructor":"mcarthur, david","courses_avg":79.2},{"courses_instructor":"mcarthur, david;smukler, sean","courses_avg":75.91},{"courses_instructor":"mcclung, david","courses_avg":71.79},{"courses_instructor":"metzer, david","courses_avg":71.87},{"courses_instructor":"metzer, david","courses_avg":73.1},{"courses_instructor":"metzer, david","courses_avg":71.17},{"courses_instructor":"metzer, david","courses_avg":72.63},{"courses_instructor":"metzer, david","courses_avg":78.38},{"courses_instructor":"metzer, david","courses_avg":68.1},{"courses_instructor":"metzer, david","courses_avg":69.9},{"courses_instructor":"metzer, david","courses_avg":70.93},{"courses_instructor":"metzer, david","courses_avg":70.21},{"courses_instructor":"metzer, david","courses_avg":68.53},{"courses_instructor":"metzer, david","courses_avg":68.22},{"courses_instructor":"metzer, david","courses_avg":77.35},{"courses_instructor":"metzer, david","courses_avg":77.54},{"courses_instructor":"michelson, david","courses_avg":75},{"courses_instructor":"miller, david","courses_avg":78},{"courses_instructor":"miller, david","courses_avg":75.85},{"courses_instructor":"miller, david","courses_avg":76.29},{"courses_instructor":"miller, david","courses_avg":75.73},{"courses_instructor":"miller, david","courses_avg":75},{"courses_instructor":"miller, david","courses_avg":76.22},{"courses_instructor":"miller, david","courses_avg":76.05},{"courses_instructor":"miller, david","courses_avg":77.26},{"courses_instructor":"miller, david","courses_avg":75.76},{"courses_instructor":"morrissey, david","courses_avg":88.2},{"courses_instructor":"morrissey, david","courses_avg":88.07},{"courses_instructor":"morton, david","courses_avg":76.2},{"courses_instructor":"morton, david","courses_avg":74.65},{"courses_instructor":"naus, monika;patrick, david","courses_avg":82.46},{"courses_instructor":"naus, monika;patrick, david","courses_avg":84.8},{"courses_instructor":"ng, david","courses_avg":87},{"courses_instructor":"ng, david","courses_avg":91.55},{"courses_instructor":"ng, david","courses_avg":88.37},{"courses_instructor":"ng, david","courses_avg":88.71},{"courses_instructor":"ng, david","courses_avg":87.83},{"courses_instructor":"ng, david","courses_avg":90},{"courses_instructor":"ng, david","courses_avg":89.88},{"courses_instructor":"ng, david","courses_avg":89.82},{"courses_instructor":"ng, david","courses_avg":85.8},{"courses_instructor":"ng, david","courses_avg":86.27},{"courses_instructor":"ng, david","courses_avg":87.58},{"courses_instructor":"ng, david","courses_avg":84.4},{"courses_instructor":"ng, david","courses_avg":86.5},{"courses_instructor":"ng, david","courses_avg":86.13},{"courses_instructor":"ng, david","courses_avg":87.5},{"courses_instructor":"ng, david","courses_avg":90.79},{"courses_instructor":"ng, david","courses_avg":90.71},{"courses_instructor":"ng, david","courses_avg":91},{"courses_instructor":"ng, david","courses_avg":87.75},{"courses_instructor":"ng, david;sens, allen","courses_avg":76.95},{"courses_instructor":"ng, david;sens, allen","courses_avg":77.36},{"courses_instructor":"ng, david;sens, allen","courses_avg":80.79},{"courses_instructor":"ng, david;sens, allen","courses_avg":77.84},{"courses_instructor":"ng, david;sens, allen","courses_avg":75.4},{"courses_instructor":"ng, david;sens, allen","courses_avg":77.14},{"courses_instructor":"ng, david;sens, allen","courses_avg":76.6},{"courses_instructor":"nicks, david","courses_avg":93.25},{"courses_instructor":"nicks, david","courses_avg":91.53},{"courses_instructor":"nicks, david","courses_avg":90.44},{"courses_instructor":"nicks, david","courses_avg":91.64},{"courses_instructor":"nicks, david","courses_avg":89.63},{"courses_instructor":"o'kusky, john;walker, david","courses_avg":83.5},{"courses_instructor":"o'kusky, john;walker, david","courses_avg":81.47},{"courses_instructor":"o'kusky, john;walker, david","courses_avg":84.25},{"courses_instructor":"oliver, david","courses_avg":85.61},{"courses_instructor":"oliver, david","courses_avg":91.79},{"courses_instructor":"oliver, david","courses_avg":88.98},{"courses_instructor":"oliver, david","courses_avg":86.79},{"courses_instructor":"patrick, david","courses_avg":86.33},{"courses_instructor":"patrick, david","courses_avg":87.33},{"courses_instructor":"patrick, david","courses_avg":85.92},{"courses_instructor":"patrick, david","courses_avg":87.08},{"courses_instructor":"patrick, david","courses_avg":89.33},{"courses_instructor":"patrick, david","courses_avg":85.5},{"courses_instructor":"patrick, david","courses_avg":90.77},{"courses_instructor":"perrin, david","courses_avg":69.85},{"courses_instructor":"perrin, david","courses_avg":67.31},{"courses_instructor":"perrin, david","courses_avg":66.59},{"courses_instructor":"perrin, david","courses_avg":65.93},{"courses_instructor":"perrin, david","courses_avg":68.69},{"courses_instructor":"perrin, david;stewart, jaclyn","courses_avg":60.97},{"courses_instructor":"perrin, david;stewart, jaclyn","courses_avg":61.37},{"courses_instructor":"pokotylo, david","courses_avg":73.52},{"courses_instructor":"pokotylo, david","courses_avg":60.05},{"courses_instructor":"pokotylo, david","courses_avg":69.85},{"courses_instructor":"pokotylo, david","courses_avg":74},{"courses_instructor":"pokotylo, david","courses_avg":66.76},{"courses_instructor":"pokotylo, david","courses_avg":71.2},{"courses_instructor":"pokotylo, david","courses_avg":72.62},{"courses_instructor":"pokotylo, david","courses_avg":68.14},{"courses_instructor":"pokotylo, david","courses_avg":69.59},{"courses_instructor":"pokotylo, david","courses_avg":69.64},{"courses_instructor":"pokotylo, david","courses_avg":85.2},{"courses_instructor":"pokotylo, david","courses_avg":72.29},{"courses_instructor":"pokotylo, david","courses_avg":75.92},{"courses_instructor":"pokotylo, david","courses_avg":79.36},{"courses_instructor":"pokotylo, david","courses_avg":82.2},{"courses_instructor":"pokotylo, david","courses_avg":88.38},{"courses_instructor":"poole, david","courses_avg":84},{"courses_instructor":"poole, david","courses_avg":83.39},{"courses_instructor":"poole, david","courses_avg":82.55},{"courses_instructor":"poole, david","courses_avg":75.91},{"courses_instructor":"poole, david","courses_avg":75.61},{"courses_instructor":"poole, david","courses_avg":90.71},{"courses_instructor":"poole, david","courses_avg":78.3},{"courses_instructor":"poole, david","courses_avg":75.23},{"courses_instructor":"poole, david","courses_avg":76.52},{"courses_instructor":"poole, david","courses_avg":83.32},{"courses_instructor":"porter, david","courses_avg":85.18},{"courses_instructor":"porter, david;vogt, david","courses_avg":87.89},{"courses_instructor":"porter, david;vogt, david","courses_avg":87.33},{"courses_instructor":"rathwell, david","courses_avg":89.86},{"courses_instructor":"rathwell, david","courses_avg":85.46},{"courses_instructor":"rathwell, david","courses_avg":92.49},{"courses_instructor":"rathwell, david","courses_avg":93.69},{"courses_instructor":"rathwell, david","courses_avg":88.12},{"courses_instructor":"rathwell, david","courses_avg":93.23},{"courses_instructor":"rathwell, david","courses_avg":93},{"courses_instructor":"roe, david","courses_avg":68.41},{"courses_instructor":"roe, david","courses_avg":68.53},{"courses_instructor":"russell, alan david","courses_avg":82},{"courses_instructor":"russell, alan david","courses_avg":80.67},{"courses_instructor":"russell, alan david","courses_avg":78.15},{"courses_instructor":"russell, alan david","courses_avg":80.48},{"courses_instructor":"russell, alan david","courses_avg":78.68},{"courses_instructor":"russell, alan david","courses_avg":73.3},{"courses_instructor":"russell, alan david","courses_avg":83.64},{"courses_instructor":"russell, alan david","courses_avg":84.5},{"courses_instructor":"russell, alan david","courses_avg":83.86},{"courses_instructor":"russell, alan david","courses_avg":80.82},{"courses_instructor":"russell, alan david","courses_avg":84.67},{"courses_instructor":"russell, alan david","courses_avg":80.44},{"courses_instructor":"ryniker, david","courses_avg":73.23},{"courses_instructor":"seidel, marc-david","courses_avg":83.58},{"courses_instructor":"seidel, marc-david","courses_avg":85.23},{"courses_instructor":"seidel, marc-david","courses_avg":78.6},{"courses_instructor":"seidel, marc-david","courses_avg":82.12},{"courses_instructor":"seidel, marc-david","courses_avg":77.89},{"courses_instructor":"seidel, marc-david","courses_avg":78.89},{"courses_instructor":"seidel, marc-david","courses_avg":78.89},{"courses_instructor":"seidel, marc-david","courses_avg":79.77},{"courses_instructor":"seidel, marc-david","courses_avg":74.74},{"courses_instructor":"seidel, marc-david","courses_avg":78.64},{"courses_instructor":"seidel, marc-david","courses_avg":78.25},{"courses_instructor":"seidel, marc-david","courses_avg":77.63},{"courses_instructor":"seidel, marc-david","courses_avg":81.42},{"courses_instructor":"shahnaz, navid;stapells, david","courses_avg":90},{"courses_instructor":"shepherd, david","courses_avg":74.45},{"courses_instructor":"shepherd, david","courses_avg":75.72},{"courses_instructor":"simpson, david","courses_avg":76.21},{"courses_instructor":"simpson, david","courses_avg":74.24},{"courses_instructor":"simpson, david","courses_avg":73.21},{"courses_instructor":"simpson, david","courses_avg":75.32},{"courses_instructor":"siuta, david","courses_avg":87.33},{"courses_instructor":"siuta, david","courses_avg":89},{"courses_instructor":"siuta, david","courses_avg":81.47},{"courses_instructor":"stapells, david","courses_avg":87.8},{"courses_instructor":"steinberg, david","courses_avg":75.91},{"courses_instructor":"steinberg, david","courses_avg":58.43},{"courses_instructor":"steinberg, david","courses_avg":68.76},{"courses_instructor":"steinberg, david","courses_avg":64.87},{"courses_instructor":"steinberg, david","courses_avg":68.51},{"courses_instructor":"steinberg, david","courses_avg":69.62},{"courses_instructor":"steinberg, david","courses_avg":83.18},{"courses_instructor":"tait, david e n","courses_avg":67.85},{"courses_instructor":"tait, david e n","courses_avg":72.56},{"courses_instructor":"tait, david e n","courses_avg":59.91},{"courses_instructor":"tait, david e n","courses_avg":62.98},{"courses_instructor":"tait, david e n","courses_avg":63.3},{"courses_instructor":"tait, david e n","courses_avg":67.94},{"courses_instructor":"tait, david e n","courses_avg":64.91},{"courses_instructor":"tait, david e n","courses_avg":68.78},{"courses_instructor":"tait, david e n","courses_avg":62.38},{"courses_instructor":"tait, david e n","courses_avg":67.04},{"courses_instructor":"tindall, david","courses_avg":86.67},{"courses_instructor":"tindall, david","courses_avg":85.18},{"courses_instructor":"tindall, david","courses_avg":80.38},{"courses_instructor":"tindall, david","courses_avg":87.33},{"courses_instructor":"tindall, david","courses_avg":80.6},{"courses_instructor":"tobias, david","courses_avg":82.2},{"courses_instructor":"tompkins, david a d","courses_avg":76.46},{"courses_instructor":"turner, david","courses_avg":80.08},{"courses_instructor":"turner, david","courses_avg":76.98},{"courses_instructor":"turner, david","courses_avg":82.82},{"courses_instructor":"turner, david","courses_avg":79.95},{"courses_instructor":"turner, david","courses_avg":71},{"courses_instructor":"turner, david","courses_avg":70.07},{"courses_instructor":"turner, david","courses_avg":80.05},{"courses_instructor":"turner, david","courses_avg":76.51},{"courses_instructor":"turner, david","courses_avg":80.43},{"courses_instructor":"turner, david","courses_avg":77.08},{"courses_instructor":"turner, david","courses_avg":76.65},{"courses_instructor":"turner, david","courses_avg":68.13},{"courses_instructor":"turner, david","courses_avg":74.79},{"courses_instructor":"turner, david","courses_avg":73.72},{"courses_instructor":"turner, david","courses_avg":72.74},{"courses_instructor":"turner, david","courses_avg":75.44},{"courses_instructor":"van der loos, hendrik;wilson, david","courses_avg":90.9},{"courses_instructor":"vogt, david","courses_avg":84.46},{"courses_instructor":"vogt, david","courses_avg":84.65},{"courses_instructor":"vogt, david","courses_avg":86.29},{"courses_instructor":"vogt, david","courses_avg":86.57},{"courses_instructor":"vogt, david","courses_avg":81},{"courses_instructor":"vogt, david","courses_avg":87.33},{"courses_instructor":"vogt, david","courses_avg":88.82},{"courses_instructor":"vogt, david","courses_avg":87.57},{"courses_instructor":"vogt, david","courses_avg":83.33},{"courses_instructor":"vogt, david","courses_avg":86.38},{"courses_instructor":"vogt, david","courses_avg":84.2},{"courses_instructor":"vogt, david","courses_avg":86.73},{"courses_instructor":"vogt, david","courses_avg":83.19},{"courses_instructor":"vogt, david","courses_avg":84.06},{"courses_instructor":"vogt, david","courses_avg":89.41},{"courses_instructor":"vogt, david","courses_avg":86.61},{"courses_instructor":"walker, david","courses_avg":85},{"courses_instructor":"walker, david","courses_avg":87},{"courses_instructor":"walker, david","courses_avg":90},{"courses_instructor":"walker, david","courses_avg":85},{"courses_instructor":"walker, david","courses_avg":85.33},{"courses_instructor":"wilkinson, david","courses_avg":84.67},{"courses_instructor":"wilkinson, david","courses_avg":89.88},{"courses_instructor":"wilkinson, david","courses_avg":84.57},{"courses_instructor":"wilkinson, david","courses_avg":90.45},{"courses_instructor":"wilkinson, david","courses_avg":86.85},{"courses_instructor":"wilkinson, david","courses_avg":82.6},{"courses_instructor":"wilkinson, david","courses_avg":84.4},{"courses_instructor":"wilkinson, david","courses_avg":80.83},{"courses_instructor":"wilkinson, david","courses_avg":78.45},{"courses_instructor":"wilkinson, david","courses_avg":79.45},{"courses_instructor":"wilkinson, david","courses_avg":82.3},{"courses_instructor":"wilkinson, david","courses_avg":84.38},{"courses_instructor":"wilkinson, david","courses_avg":79.5},{"courses_instructor":"wilkinson, david","courses_avg":88.47},{"courses_instructor":"wilson, david","courses_avg":89.06},{"courses_instructor":"wilson, david","courses_avg":87.07},{"courses_instructor":"worling, david","courses_avg":69.68}]}
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
            "COLUMNS":["courses_uuid","courses_dept", "courses_instructor"],
            "ORDER":"courses_dept",
            "FORM":"TABLE"
        };

        queryRequest15.WHERE = {
            "IS":{
                "courses_instructor":"*david*"
            }
        };
        queryRequest15.OPTIONS = {
            "COLUMNS":["courses_instructor", "courses_avg"],
            "ORDER":"courses_instructor",
            "FORM":"TABLE"
        };

        queryRequest16.WHERE = {
            "IS":{
                "courses_dept":"*he*"
            }
        };
        queryRequest16.OPTIONS = {
            "COLUMNS":["courses_instructor", "courses_avg"],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };

        queryRequest17.WHERE = {

            "NOT":{
                "IS":{
                    "courses_instructor":"*david*"
                }
            }

        };
        queryRequest17.OPTIONS = {
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
            "ORDER":"courses_id",
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

    it("server", function () {
        Serv1.start();
        Serv1.stop();
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
           //console.log(JSON.stringify(err.body));
            expect(err.code).to.equal(400);
        });
    });

    it("add file fail- reject 400", function () {
        this.timeout(10000);
        return insightFacade.addDataset('courses1223', invalidFile).then(function(value) {
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
            //Log.test('Value: ' + value.body);
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


    it("invalid Query( IS) - reject 400", function () {
        this.timeout(10000);
        return insightFacade.performQuery(invalidISRequest).then(function(value) {
            Log.test('Value: ' + value.body);
            expect.fail();
        }).catch(function (err) {
            expect(err.code).to.equal(400);
            console.log(err.body);
        });
    });

    it("query with partial names", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest13).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);

            //Log.test("body  " + JSON.stringify(value.body));
            expect(value.body).to.deep.equal(resultPartial);
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



    it("query with partial names, return instructor name", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest15).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //console.log(value.body);
            expect(value.body).to.deep.equal(resultInstruct);
            //Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query with partial dept, return instructor name", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest16).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //expect(value.body).to.deep.equal(resultPatial);
            //Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query with NOT name, return dept", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest17).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //expect(value.body).to.deep.equal(resultPatial);
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
            expect(value.body).to.deep.equal(result14);

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

 it("query with wrong order", function () {
 this.timeout(10000);
 return insightFacade.performQuery(errorRequest).then(function(value) {
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
            //console.log(value.body);
            //expect(value.body).to.deep.equal(testResult_complex);
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

    it("query20", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest20).then(function(value) {
            Log.test('Value: ' + value.code);
        }).catch(function (err) {
            console.log("error" +err);
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

    it("doubleNegatequery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(doubleNegateRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
        }).catch(function (err) {
            console.log("error" + err);
        });
    });

    it("fusionquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(fusionRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);

            //expect(value.body).to.deep.equal(fusionResult);
        }).catch(function (err) {
            console.log("error" + err);
        });
    });

    it("fireTruckquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(fireTruckRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);

            expect(value.body).to.deep.equal(fireTruckResult);
        }).catch(function (err) {
            console.log("error" + err);
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
