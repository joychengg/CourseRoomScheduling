/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";

import QueryClassMeth from "../QueryClass/QueryClassMeth";
import {stringify} from "querystring";
import {isNullOrUndefined} from "util";
import {QueryRequest2} from "../QueryClass/responseInterface";
import {isArray} from "util";


var fs = require("fs");
var JSZip = require("jszip");

var emptyResponse: InsightResponse = {
    code : 400,
    body : {"error": "empty content"}
};

var newResponse: InsightResponse = {
    code : 204,
    body : {}
};

var existsResponse: InsightResponse = {
    code : 201,
    body : {}
};


var everythingArr: any[] = [];


export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {

        var jsonObjArray: any[] = [];

        return new Promise(function (resolve: any, reject: any) {


            if(isNullOrUndefined(id) || isNullOrUndefined(content) || !content) reject(emptyResponse);


            var promises: Promise<string>[] = [];

            JSZip.loadAsync(content, {"base64": true})

                .then(function (zip: any) {


                    for (let key in zip.files) {

                        if (zip.file(key) !== null && zip.files.hasOwnProperty(key)) {
                            promises.push(zip.file(key).async("string"));
                        }
                    }

                    Promise.all(promises)

                        .then(function (content: string[]) {

                            if (content.length===0){
                                var cantparseResponse: InsightResponse = {
                                    code : 400,
                                    body : {Error: "Empty jSon"}
                                };
                                reject(cantparseResponse);
                                return;

                            }


                            for (var i = 0; i < content.length; i++) {

                                var json = JSON.parse(content[i]);
                                jsonObjArray.push(json);
                            }
                        })

                        .catch (function (err:any) {

                            var cantparseResponse: InsightResponse = {
                                code : 400,
                                body : {"error": err}
                            };
                            reject(cantparseResponse);
                            return;

                        })

                        // at this point everything should be in jsonObjArray

                        .then(function (content:any) {

                            everythingArr = [];
                            for (var i = 0; i < jsonObjArray.length; i++) {

                                if (isNullOrUndefined(jsonObjArray[i].result)){

                                    var cantparseResponse: InsightResponse = {
                                        code: 400,
                                        body: {Error: "Missing result"}
                                    };
                                    reject(cantparseResponse);
                                    return;
                                }

                                var arrayOfCourses = jsonObjArray[i].result;

                               // everythingArr.push(arrayOfCourses);

                                //loop through the jsonObjectList's result node and put everything into an array
                                for (var j = 0; j < arrayOfCourses.length; j++) {
                                    everythingArr.push(arrayOfCourses[j]);

                                }//loop through each result node's courses and add those to the master list
                            }
                            //everythingArr would contain allllll the courses one by one

                            var path = './'+ id+'.json';
                            var fileExists = fs.existsSync(path);

                            if (fileExists) {

                                fs.writeFileSync( path, JSON.stringify(everythingArr));

                                resolve(existsResponse);

                            }else {

                                fs.writeFileSync( path, JSON.stringify(everythingArr));
                                resolve(newResponse);
                            }

                        });

                })

                .catch(function (err: any) {

                    var errResponse: InsightResponse = {
                        code : 400,
                        body : {"error": err}
                    };
                    reject(errResponse);
                    return;

                })
        })
    }

    removeDataset(id: string): Promise<InsightResponse> {

        return new Promise(function (resolve: any, reject: any) {

            if (!id || isNullOrUndefined(id))
                reject(emptyResponse);

            var path = './'+ id+'.json';


            fs.exists(path,function (value:boolean) {
                if (!value){

                    var removeResponse: InsightResponse = {
                        code: 404,
                        body: {Error: "path doesn't exist"}
                    };
                    reject(removeResponse);
                    return;

                }else{
                    fs.unlink(path,function () {
                        var successResponse: InsightResponse = {
                            code: 204,
                            body: {}
                        };

                        resolve(successResponse);
                    });
                }
            });
        })
    }

    performQuery(query: QueryRequest): Promise <InsightResponse> {

        return new Promise(function (resolve:any, reject:any) {

            var arrOFCourses = [];

            var finalCourseArr = [];

            var objforQuery = new QueryClassMeth();

            var path = './courses.json';

            if ((objforQuery.isJson(JSON.stringify(query.WHERE)) || objforQuery.isJson(JSON.stringify(query.OPTIONS))) === false) {

                var failResponse: InsightResponse = {
                    code: 400,
                    body: {Error: "Invalid Json"}
                };
                reject(failResponse);
                return;
            }


            if ((query.OPTIONS.FORM !=="TABLE")||(isNullOrUndefined(query.OPTIONS.FORM))||(isNullOrUndefined(query.WHERE)
                )||(query.OPTIONS.COLUMNS.length===0)){

                var failResponse: InsightResponse = {
                    code: 400,
                    body: {Error}
                };
                reject(failResponse);
                return;

            }


            if (everythingArr.length === 0) {
                everythingArr = fs.readFileSync(path);
            }

            var acc:any = [];

            function checkKey(input:any):any{

                var failResponse2: InsightResponse = {
                    code: 400,
                    body: {Error}
                };

                var key = Object.keys(input)[0];

                if (key === "GT") {

                    var key1 = Object.keys(input.GT);

                    if (isArray(input.GT)) reject(failResponse2);

                    if (!objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_"))))
                        acc.push(key1[0].substring(0, key1[0].indexOf("_")));

                } else if (key === "LT") {

                    var key1 = Object.keys(input.LT);

                    if (isArray(input.LT)) reject(failResponse2);

                    if (!objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_"))))
                        acc.push(key1[0].substring(0, key1[0].indexOf("_")));

                } else if (key === "EQ") {

                    var key1 = Object.keys(input.EQ);

                    if (isArray(input.EQ)) reject(failResponse2);

                    if (!objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_"))))
                        acc.push(key1[0].substring(0, key1[0].indexOf("_")));

                } else if (key === "IS") {

                    var key1 = Object.keys(input.IS);

                    if (isArray(input.IS)) reject(failResponse2);

                    if (!objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_"))))
                        acc.push(key1[0].substring(0, key1[0].indexOf("_")));

                } else if (key === "AND") {
                    var exprs = input.AND;

                    if ((input.AND.length === 0) || (!isArray(input.AND))) reject(failResponse2);

                    for (let key of exprs) {

                        checkKey(key);

                    }

                } else if (key === "OR") {
                    var exprs = input.OR;

                    if ((input.OR.length === 0) || (!isArray(input.OR))) reject(failResponse2);

                    for (let key of exprs) {

                        checkKey(key);

                    }

                } else if (key === "NOT") {

                    var exprs = input.NOT;

                    if(isArray(exprs)) reject(failResponse2);

                        checkKey(exprs);

                }

            }

            checkKey(query.WHERE);

            if (acc.length!==0){
                var failllResponse: InsightResponse = {
                    code: 424,
                    body: {"missing":acc}
                };

                reject(failllResponse);
                return;

            }


            for (var course of everythingArr) {

                try {

                    if (objforQuery.Filter(query.WHERE, course)===true)
                        arrOFCourses.push(course);
                } catch (err) {

                        var failResponse: InsightResponse = {
                            code: 400,
                            body: err
                        };
                        reject(failResponse);
                        return;

                }
            }

            for (var course of arrOFCourses) {
                 finalCourseArr.push(objforQuery.Combine(course, query.OPTIONS));
            }

            if (!isNullOrUndefined(query.OPTIONS.ORDER)) {

            var column = Object.keys(query.OPTIONS)[0];
            var order = query.OPTIONS.ORDER;

            var count = 0;
            for (var i of query.OPTIONS.COLUMNS) {

                if (i === order) {
                    count++;
                    break;
                }
            } 
            if (count === 0) {
                var failResponse: InsightResponse = {
                    code: 400,
                    body: {Error: "empty options"}
                };
                reject(failResponse);
                return;
            }

                finalCourseArr.sort(function (a, b) {
                    var orderS = query.OPTIONS['ORDER'];

                    if (orderS === "courses_instructor" || orderS === "courses_uuid" || orderS === "courses_id" || orderS === "courses_title" || orderS === "courses_dept") {
                        var nameA = a[orderS].toLowerCase(), nameB = b[orderS].toLowerCase();
                        if (nameA < nameB) //sort string ascending
                            return -1;
                        if (nameA > nameB)
                            return 1;

                        return 0;
                    } else {
                        return parseFloat(a[orderS]) - parseFloat(b[orderS]);
                    }
                });
            }

            var resultThing:QueryRequest2 = {
                render:'TABLE',
                result: finalCourseArr

            };

            var finalFinal = JSON.parse(JSON.stringify(resultThing));

            var resultResponse: InsightResponse = {
                code : 200,
                body : finalFinal
            };
            resolve(resultResponse);
        })
    }
}
