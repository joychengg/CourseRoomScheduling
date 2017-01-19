/**
 * Created by joycheng on 2017-01-19.
 */
/**
 * Created by rtholmes on 2016-10-31.
 */

import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";

import fs = require("fs");

describe("InsightFacadeTest", function () {

    var zipStuff: any = null;
    var insightFacade: InsightFacade = null;


    before(function () { //runs once
        Log.test('Before: ' + (<any>this).test.parent.title);
        zipStuff = Buffer.from(fs.readFileSync("./courses.zip")).toString('base64');
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
        return insightFacade.addDataset('courses', zipStuff).then(function(value) {
            Log.test('Value: ' + value);
        }).catch(function (err) {
            console.log("error" +err);
            expect.fail();
        });
    });

});
