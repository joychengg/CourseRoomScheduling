/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";

import QueryClassMeth from "../QueryClass/QueryClassMeth";
import {stringify} from "querystring";


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

            if (!content)
                reject(400, {"error": "empty content"});

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
                            for (var i = 0; i < content.length; i++) {

                                var json = JSON.parse(content[i]);
                                // console.log(JSON.stringify(json));
                                jsonObjArray.push(json);
                            }
                        })
                        .catch (function (err:any) {

                            var cantparseResponse: InsightResponse = {
                                code : 400,
                                body : {"error": err}
                            };
                            reject(cantparseResponse);

                        })


                        // at this point everything should be in jsonObjArray

                        .then(function (content:any) {

                            // var everythingArr: any[] = [];
                            console.log(jsonObjArray.length);
                            for (var i = 0; i < jsonObjArray.length; i++) {

                                var arrayOfCourses = jsonObjArray[i].result;   //loop through the jsonObjectList's result node and put everything into an array
                                for (var j = 0; j < arrayOfCourses.length; j++) {
                                    everythingArr.push(arrayOfCourses[j]);

                                }//loop through each result node's courses and add those to the master list
                            }
                            //everythingArr would contain allllll the courses one by one

                            var fileExists = fs.existsSync('./tmp/courses');
                            var path = './tmp';

                            try {
                                fs.mkdirSync(path);
                                // try to see if a folder can be made
                            }catch(err){
                                if (fileExists) {
                                    resolve(existsResponse);
                                }else {
                                    resolve(newResponse);
                                }
                                //if cant be made then check if file exist or not
                            }

                            if (fileExists) {
                                resolve(existsResponse);
                            }
                            else {
                                resolve(newResponse);
                            }

                            fs.writeFileSync('./tmp/courses', JSON.stringify(everythingArr));
                        });

                })

                .catch(function (err: any) {

                    var errResponse: InsightResponse = {
                        code : 400,
                        body : {"error": err}
                    };
                    reject(errResponse);

                })
        })
    }


    removeDataset(id: string): Promise<InsightResponse> {

        return new Promise(function (resolve: any, reject: any) {

            if (!id)
                reject(emptyResponse);
            var promises: Promise<string>[] = [];

            var ifExists= fs.existsSync('./tmp/courses');

            if (ifExists)
                promises.push(fs.unlink('./tmp/courses'));

            Promise.all(promises)

                .then(function (id: any) {

                    var successResponse: InsightResponse = {
                        code : 204,
                        body : {}
                    };

                    resolve(successResponse);
                })
                .catch(function (err: any)
                {
                    var removeResponse: InsightResponse = {
                        code: 404,
                        body: {"error":err}
                    };
                    resolve(removeResponse);
                })
        })


    }

    performQuery(query: QueryRequest): Promise <InsightResponse> {

        return new Promise(function (resolve:any, reject:any) {


            var arrOFCourses = [];

            var finalCourseArr = [];

            var objforQuery = new QueryClassMeth();


            if ((objforQuery.isJson(JSON.stringify(query.WHERE)) || objforQuery.isJson(JSON.stringify(query.OPTIONS))) === false) {

                var failResponse: InsightResponse = {
                    code: 400,
                    body: {}
                };
                resolve(failResponse);
            }

            if (!(fs.existsSync('./tmp/courses'))) {
                var resultResponse: InsightResponse = {
                    code: 424,
                    body: {missing: "courses"}
                };

                resolve(resultResponse);
            }


            if (everythingArr.length === 0) {
                everythingArr = fs.readFileSync('./tmp/courses');
            }


            for (var course of everythingArr) {
                try {

                    if (objforQuery.Filter(query.WHERE, course))
                        arrOFCourses.push(course);
                } catch (err) {

                    var failResponse: InsightResponse = {
                        code: 400,
                        body: err
                    };
                    resolve(failResponse);
                }
            }


            for (var course of arrOFCourses) {
                try {

                    finalCourseArr.push(objforQuery.Combine(course, query.OPTIONS));

                } catch (err) {

                    var failResponse: InsightResponse = {
                        code: 400,
                        body: err
                    };
                    resolve(failResponse);
                }
            }


            var column = Object.keys(query.OPTIONS)[0];
            var order = query.OPTIONS.ORDER;

            // console.log(query.OPTIONS.COLUMNS);
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
                    body: {}
                };
                resolve(failResponse);
            }


            finalCourseArr.sort(function(a, b) {
                var orderS = query.OPTIONS['ORDER'];

                return parseFloat(a[orderS]) - parseFloat(b[orderS]);
            });

           // console.log(finalCourseArr);
            //console.log(Object.keys(finalCourseArr)[0]);

            // if (Object.keys(finalCourseArr)[0]==="missing"){
            //     var resultResponse: InsightResponse = {
            //         code : 424,
            //         body : finalCourseArr
            //     };
            //
            //     resolve(resultResponse);
            //
            //
            // }

            var n1 = {render:'TABLE', result:{}};

            n1.result = finalCourseArr;

            var resultResponse: InsightResponse = {
                code : 200,
                body : n1
            };

            resolve(resultResponse);

        })


    }
}
