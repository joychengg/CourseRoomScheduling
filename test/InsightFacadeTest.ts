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

describe("InsightFacadeTest", function () {


    before(function () { //runs once
        Log.test('Before: ' + (<any>this).test.parent.title);
        //zipStuff = Buffer.from(fs.readFileSync("./courses.zip")).toString('base64');
        // let path = "./courses.zip";
        // zipStuff = JSON.parse(require('fs').readFileSync(path, {String}));


        // try {
        //     fs.mkdirSync(path);
        //     // try to see if a folder can be made
        // }catch(err){
        //     if (fileExists) {
        //         resolve(existsResponse);
        //     }else {
        //         resolve(newResponse);
        //     }
        //     //if cant be made then check if file exist or not
        // }
        //
        // if (fileExists) {
        //     resolve(existsResponse);
        // }
        // else {
        //     resolve(newResponse);
        // }





    });

    beforeEach(function () {

        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        insightFacade = new InsightFacade();
        zipStuff = "./courses.zip";
        //zipStuff = Buffer.from(fs.readFileSync("./courses.zip")).toString('base64');

        // var fileExists = fs.existsSync('../courses');
        // var path = './tmp';
        // fs.writeFileSync( path+'/courses', JSON.stringify(insightFacade.addDataset('courses', zipStuff)));

        //zipStuff = fs.readFileSync("./courses.zip", "base64");
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
            "OR":[
                {
                    "AND":[
                        {
                            "GT":{
                                "hello":90
                            }
                        },
                        {
                            "IS":{
                                "courses":"adhe"
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
        }).catch(function (err) {
            console.log("error" +err);
            expect(err.code).to.equal(204);
        });
    });

    it("missing query", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(424);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
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
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query with no order str", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest3).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(400);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query_ complex", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest2).then(function(value) {
            Log.test('Value: ' + JSON.stringify(value.body));
            expect(value.code).to.equal(200);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
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
        return insightFacade.addDataset('123courses', zipStuff).then(function(value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(204);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

});
