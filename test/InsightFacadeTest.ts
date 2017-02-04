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

        var LTRequest: QueryRequest = {
            WHERE: {"OR": [{
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
                    ,
                    {
                        "IS":{
                            "invalid_audit":10
                        }
                    }
                    ,
                    {
                        "IS":{
                            "courses_invalid":10
                        }
                    }
                ]
            },
                {
                    "EQ":{
                        "courses_audit":1
                    }
                }
            ]},
            OPTIONS: {
                "COLUMNS":["courses_dept", "courses_avg"],
                "ORDER":"courses_avg",
                "FORM":"TABLE"
            }
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
          //  expect(JSON.stringify(value.body)).to.equal(JSON.stringify(testResult));
        }).catch(function (err) {
            console.log("error" +err);
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
           // Log.test("body  " + JSON.stringify(value.body));
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


    it("query_ complex", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest2).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
           // expect(JSON.stringify(value.body)).to.equal(JSON.stringify(testResult_complex));
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
            expect.fail();
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(400);
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

});
