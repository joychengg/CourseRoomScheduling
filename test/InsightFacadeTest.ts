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
var roomFile =  Buffer.from(fs.readFileSync("./rooms.zip")).toString('base64');
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

var queryRequest22: QueryRequest = {
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


var queryRequestNoOrder: QueryRequest = {
    WHERE: {},
    OPTIONS: {COLUMNS: [],
        FORM:"TABLE"
    }
};
var testForYear:QueryRequest = {

    WHERE: {
    "EQ": {
        "courses_year": 1900
    }
},
    OPTIONS: {
    "COLUMNS": [
        "courses_dept","courses_id"
    ],

        "FORM": "TABLE"

}
};

var invalidISRequest: QueryRequest = {
    WHERE: {"IS":[{"courses_dept": "cpsc"},{ "courses_instructor" : "*william*"}]},
    OPTIONS: {"COLUMNS":["courses_dept",
        "courses_id",
        "courses_avg"
    ],
        "ORDER":"courses_avg",
        "FORM":"TABLE"
    }
};

var GTarrayRequest: QueryRequest = {
    WHERE: {"GT":[{"IS":{ "cour_avg" : 80}}]},
    OPTIONS: {"COLUMNS":[
"courses_dept",
    "courses_id",
    "courses_avg"
],
"ORDER":"courses_avg",
    "FORM":"TABLE"
}
};

var LTarrayRequest: QueryRequest = {
    WHERE: {"LT":[{"IS":{ "cour_avg" : 80}}]},
    OPTIONS: {"COLUMNS":[
"courses_dept",
    "courses_id",
    "courses_avg"
],
"ORDER":"courses_avg",
    "FORM":"TABLE"
}
};

var EQarrayRequest: QueryRequest = {
    WHERE: {"EQ":[{"IS":{ "cour_avg" : 80}}]},
    OPTIONS: {"COLUMNS":[
"courses_dept",
    "courses_id",
    "courses_avg"
],
"ORDER":"courses_avg",
    "FORM":"TABLE"
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

var notArrayRequest: QueryRequest = {
    WHERE: {"NOT":[{"IS":{ "courses_avg" : 80}}]},
    OPTIONS: {"COLUMNS":[
        "courses_dept",
        "courses_id",
        "courses_avg"
    ],
        "ORDER":"courses_avg",
        "FORM":"TABLE"
    }
};

var notRequest: QueryRequest = {
    WHERE: {"NOT":{"IS":{ "cour_dept" : "cpsc"}}},
    OPTIONS: {"COLUMNS":[
        "courses_dept",
        "courses_id",
        "courses_avg"
    ],
        "ORDER":"courses_avg",
        "FORM":"TABLE"
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

var laterWildRequest = {WHERE : {
    "IS":{
        "courses_instructor":"wi*"
    }
},
    OPTIONS : {
        "COLUMNS":["courses_id","courses_dept", "courses_instructor"],
        "ORDER":"courses_dept",
        "FORM":"TABLE"
    }};

var bothWildRequest = {WHERE : {
    "IS":{
        "courses_instructor":"*william*"
    }
},
    OPTIONS : {
        "COLUMNS":["courses_id","courses_dept", "courses_instructor"],
        "ORDER":"courses_dept",
        "FORM":"TABLE"
    }};

var frontWildRequest = {WHERE : {
    "IS":{
        "courses_instructor":"*m"
    }
},
    OPTIONS : {
        "COLUMNS":["courses_id","courses_dept", "courses_instructor"],
        "ORDER":"courses_dept",
        "FORM":"TABLE"
    }};

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

};


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

        queryRequestNoOrder.WHERE = {
            "GT":{
                "courses_avg":97
            }
        };
        queryRequestNoOrder.OPTIONS = {
            "COLUMNS":["courses_dept", "courses_avg"],
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

        queryRequest22.WHERE = {
            "IS":{
                "courses_instructor":"edgington, david william"
            }
        };
        queryRequest22.OPTIONS = {
            "COLUMNS":["courses_instructor", "courses_id"],
            "ORDER":"courses_instructor",
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

        queryRequest13.WHERE = {
            "IS":{
                "courses_instructor":"wi*"
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

        queryRequest8.WHERE = {"OR":[{
            "AND": [{
                "GT": {
                    "wrong_avg": 97
                }
            }, {
                "IS": {
                    "hello_dept": "cpsc"
                }
            }]
        },
            {"LT":
                {
                    "cour_avg":80
                }
            },
            {
                "EQ":
                    {
                        "unit_avg":85
                    }
            }
        ]
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
            "COLUMNS":["courses_id", "courses_avg"],
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

    it("adding rooms.zip --- resolve(201)", function () {
        this.timeout(10000);
        return insightFacade.addDataset('rooms', roomFile).then(function(value) {
            Log.test('Value: ' + value.code);
        }).catch(function (err) {
            console.log("error" + JSON.stringify(err));
            expect.fail();
        });
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
            //console.log(JSON.stringify(err.body));
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
           // console.log(JSON.stringify(err.body));
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

    it("EQ array - reject 424", function () {
        this.timeout(10000);
        return insightFacade.performQuery(EQarrayRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            expect(err.code).to.equal(400);
           // console.log(err.body);
        });
    });
    it("GT array - reject 424", function () {
        this.timeout(10000);
        return insightFacade.performQuery(GTarrayRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            expect(err.code).to.equal(400);
           // console.log(err.body);
        });
    });
    it("LT array - reject 424", function () {
        this.timeout(10000);
        return insightFacade.performQuery(LTarrayRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            expect(err.code).to.equal(400);
           // console.log(err.body);
        });
    });

    it("invalid Query( IS) - reject 400", function () {
        this.timeout(10000);
        return insightFacade.performQuery(invalidISRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            //console.log(err.body);
            expect(err.code).to.equal(400);

        });
    });

    it("query with both *", function () {
        this.timeout(10000);
        return insightFacade.performQuery(bothWildRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //expect(value.body).to.deep.equal(bothWildResult);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });


    it("query with later *", function () {
        this.timeout(10000);
        return insightFacade.performQuery(laterWildRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);

           // Log.test("body  " + JSON.stringify(value.body));
            //expect(value.body).to.deep.equal(laterWildResult);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query with front *", function () {
        this.timeout(10000);
        return insightFacade.performQuery(frontWildRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);

           // Log.test("body  " + JSON.stringify(value.body));
            //expect(value.body).to.deep.equal(frontWildResult);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query with set instruct", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest22).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //console.log(value.body);

            //Log.test("body  " + JSON.stringify(value.body));
            //expect(value.body).to.deep.equal(resultPartial);
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
          //  expect(value.body).to.deep.equal(testResult);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query with no order", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequestNoOrder).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
           // expect(value.body).to.deep.equal(resultNoOrder);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });


    it("query with NOT with wrong id", function () {
        this.timeout(10000);
        return insightFacade.performQuery(notRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(424);

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

         //   console.log(err.body);
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
         //   expect(value.body).to.deep.equal(resultFor70and80);
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
           // expect(value.body).to.deep.equal(resultInstruct);
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
           // expect(value.body).to.deep.equal(result14);

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
          //  Log.test('Value: ' + err.code);
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
          //  Log.test('Value: ' + err.code);
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
        //    Log.test('Value: ' + err.code);
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
           // Log.test('Value: ' + err.code);
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
           // Log.test('Value: ' + err.body);
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
         //   console.log("error" +JSON.stringify(err.body));
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
           // console.log(value.body);
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

    it("notArrayquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(notArrayRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(400);

        });
    });

    it("fireTruckquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(fireTruckRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);

            //expect(value.body).to.deep.equal(fireTruckResult);
        }).catch(function (err) {
            console.log("error" + err);
        });
    });

    it("testing year", function () {
        this.timeout(10000);
        return insightFacade.performQuery(testForYear).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);

            console.log(JSON.stringify(value.body));

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
