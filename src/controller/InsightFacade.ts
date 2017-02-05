/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";

import QueryClassMeth from "../QueryClass/QueryClassMeth";
import {stringify} from "querystring";
import {isNullOrUndefined} from "util";
import {QueryRequest2} from "../QueryClass/responseInterface";


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

        //Buffer.from(fs.readFileSync(content)).toString('base64')

        return new Promise(function (resolve: any, reject: any) {

            // try {
            //     var inside = fs.readFileSync(content, 'base64');
            // }catch(err){
            //     var cantparseResponse: InsightResponse = {
            //         code : 400,
            //         body : {}
            //     };
            //     reject(cantparseResponse);
            //
            // }

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


                                //loop through the jsonObjectList's result node and put everything into an array
                                for (var j = 0; j < arrayOfCourses.length; j++) {
                                    everythingArr.push(arrayOfCourses[j]);

                                }//loop through each result node's courses and add those to the master list
                            }
                            //everythingArr would contain allllll the courses one by one


                            var path = './'+ id+'.json';
                            var fileExists = fs.existsSync(path);

                            fs.writeFileSync( path, JSON.stringify(everythingArr));/*
                            try {
                                //fs.mkdirSync(path);
                                // try to see if a folder can be made
                            }catch(err){
                                if (fileExists) {
                                    resolve(existsResponse);
                                }else {
                                    resolve(newResponse);
                                }
                                //if cant be made then check if file exist or not
                            }*/

                            if (fileExists) {
                                resolve(existsResponse);
                            }
                            else {
                                resolve(newResponse);
                            }

                            //fs.writeFileSync( path, JSON.stringify(everythingArr));
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

            //     var promises: Promise<string>[] = [];
            //
            //     var path = './'+ id+'.json';
            //
            //     var ifExists= fs.existsSync(path);
            //
            //     if (ifExists)
            //         promises.push(fs.unlink(path));
            //
            //     Promise.all(promises)
            //
            //         .then(function (id: any) {
            //
            //             for (var stuff of id){
            //             try {
            //
            //                 var successResponse: InsightResponse = {
            //                     code: 204,
            //                     body: {}
            //                 };
            //
            //                 resolve(successResponse);
            //
            //             }catch (err){
            //
            //                 var removeResponse: InsightResponse = {
            //                     code: 404,
            //                     body: {"error":err}
            //                 };
            //                 reject(removeResponse);
            //
            //             }
            //         }
            // })
            //         .catch(function (err: any)
            //         {
            //             var removeResponse: InsightResponse = {
            //                 code: 404,
            //                 body: {"error":err}
            //             };
            //             reject(removeResponse);
            //         })
            //
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

           // console.log("check for where part" + objforQuery.isJson(JSON.stringify(query.WHERE)));


            if ((query.OPTIONS.FORM !=="TABLE")||(isNullOrUndefined(query.OPTIONS.FORM))){

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


            for (var course of everythingArr) {
                try {

                    if (objforQuery.Filter(query.WHERE, course)===true)
                        arrOFCourses.push(course);
                } catch (err) {


                    if (err.toString() === "Error: invalid check key") {
                        var failResponse: InsightResponse = {
                            code: 424,
                            body: err
                        };
                        reject(failResponse);
                        return;

                    }else{

                        var failResponse: InsightResponse = {
                            code: 400,
                            body: err
                        };
                        reject(failResponse);
                        return;
                    }
                }
            }
            //console.log("here is the array of courses "+JSON.stringify(arrOFCourses));

            for (var course of arrOFCourses) {
                try {

                    finalCourseArr.push(objforQuery.Combine(course, query.OPTIONS));

                } catch (err) {

                    var failResponse: InsightResponse = {
                        code: 400,
                        body: err
                    };
                    reject(failResponse);
                    return;
                }
            }


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


            finalCourseArr.sort(function(a, b) {
                var orderS = query.OPTIONS['ORDER'];

                return parseFloat(a[orderS]) - parseFloat(b[orderS]);
            });


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
