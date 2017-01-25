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

describe("InsightFacadeTest", function () {

    var zipStuff: any = null;
    var insightFacade: InsightFacade = null;
    var queryRequest: QueryRequest = {
        WHERE: {},
        OPTIONS: {COLUMNS: [],
                  ORDER: '',
                  FORM:"TABLE"
        }
    };


    before(function () { //runs once
        Log.test('Before: ' + (<any>this).test.parent.title);
        zipStuff = Buffer.from(fs.readFileSync("./courses111.zip")).toString('base64');
        //zipStuff = fs.readFileSync("./courses.zip", "base64");
        queryRequest.WHERE = {
            "GT": {
                "courses_avg": 97
            }
        };
        queryRequest.OPTIONS = {
            "COLUMNS":[
                "courses_dept",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        };
    });

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        insightFacade = new InsightFacade();
    });

    after(function () {
        Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
        insightFacade = null;
    });



    it("checking what's in zip", function () {
        this.timeout(10000);
        return insightFacade.addDataset('123courses', zipStuff).then(function(value) {
            Log.test('Value: ' + value);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

    it("query", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest).then(function(value) {
            Log.test('Value: ' + value);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

});
