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
import {AST} from "parse5";
import QueryClassMethRoom from "../QueryClass/QueryClassMethRoom";


var fs = require("fs");
var JSZip = require("jszip");
var parse5 = require("parse5");
var parser = new parse5.SAXParser();


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
        var htmlArray: any[] = [];
        var tree = null;


        return new Promise(function (resolve: any, reject: any) {


            if(isNullOrUndefined(id) || isNullOrUndefined(content) || !content) reject(emptyResponse);


            var promises: Promise<string>[] = [];

            if (id === "rooms") {

                JSZip.loadAsync(content, {"base64": true})

                    .then(function (zip: any) {

                        var indexKey = Object.keys(zip.files)[Object.keys(zip.files).length - 1];

                      //  var indexthing = Object.keys(zip.files)[];
                        //check if key is empty or zip is no key here
                        if (isNullOrUndefined(zip) || (isNullOrUndefined(zip.files))){
                            var cantparseResponse: InsightResponse = {
                                code : 400,
                                body : {Error: "Empty zip"}
                            };
                            reject(cantparseResponse);
                            return;

                        }
                        var tempIndex:any = [];

                        var treeIndex:any = [];
                        //loop through to find dir name and then go into second loop to find if dir name is in key


                  /*      for (let key in zip.files) {

                            if (key === indexKey) {
                                zip.file("index.htm")
                                    .async("string").then(function success(content:any) {

                                        tree = parse5.parse(content);


                                        var tree1=   tree.childNodes[6].childNodes[3].childNodes[31].childNodes[10]
                                            .childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1]
                                            .childNodes[3].childNodes[1].childNodes[3].childNodes[0].value;

                                        var treeTbody = tree.childNodes[6].childNodes[3].childNodes[31].childNodes[10]
                                            .childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1].childNodes[3];



                                        function loop(tree:any){

                                            for (var key = 1; key<tree.childNodes.length;key++){

                                                var temp = tree.childNodes[key].childNodes[3].childNodes[0].value;
                                                temp = temp.substring(temp.indexOf("n"),temp.length);
                                                temp = temp.trim();
                                                treeIndex.push(temp);

                                                key++;

                                            }
                                        }
                                        loop(treeTbody);

                                        console.log(treeIndex);


                                    }, function error(e:any) {



                                        // handle the error
                                    });


                            }
                            else if (zip.file(key) !== null && zip.files.hasOwnProperty(key)) {
                                for (let index of treeIndex) {

                                    var indexString = "campus/discover/buildings-and-classrooms/" + index;
                                    console.log(indexString);
                                    if (zip.file(key).name === indexString){
                                    promises.push(zip.file(key).async("string"));}
                            }}

                        }*/

                  for (let key in zip.files) {
                      if (zip.file(key) !== null && zip.files.hasOwnProperty(key))  promises.push(zip.file(key).async("string"));
                  };


                        Promise.all(promises)

                            .then(function (content: string[]) {

                                if (content.length===0){
                                    var cantparseResponse: InsightResponse = {
                                        code : 400,
                                        body : {Error: "Empty html"}
                                    };
                                    reject(cantparseResponse);
                                    return;

                                }

                                tree = parse5.parse(content[content.length -1]);


                                var treeTbody = tree.childNodes[6].childNodes[3].childNodes[31].childNodes[10]
                                    .childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1].childNodes[3];



                                function loop(tree:any){

                                    for (var key = 1; key<tree.childNodes.length;key++){

                                        var temp = tree.childNodes[key].childNodes[3].childNodes[0].value;
                                        temp = temp.substring(temp.indexOf("n"),temp.length);
                                        temp = temp.trim();
                                        treeIndex.push(temp);

                                        key++;

                                    }
                                }
                                loop(treeTbody);

                                //console.log(treeIndex);

                                var acc = 0;

                                for (let index of treeIndex) {
                                    for (let building of content){
                                        var indexString = "campus/discover/buildings-and-classrooms/" + index;
                                        //console.log(indexString);
                                        if (!isNullOrUndefined(zip.file(Object.keys(zip.files)[acc]))){
                                            var temp = zip.file(Object.keys(zip.files)[acc];
                                            //console.log(zip.file(Object.keys(zip.files)[acc]).name);
                                        if (indexString === zip.file(Object.keys(zip.files)[acc]).name) {
                                            htmlArray.push(parse5.parse(building));
                                        }
                                        }
                                        else {acc++}

                                    }

                                }


                                console.log(htmlArray);





                                for (var i = 0; i < content.length; i++) {
                                   // console.log("looking at content" + content[i]);

                                    var tempBuilding = parse5.parse(content[i]);
                                    htmlArray.push(tempBuilding);
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

                            // at this point everything should be in htmlArray

                            .then(function (content:any) {

                                everythingArr = [];
                                for (var i = 0; i < htmlArray.length; i++) {
/*
                                    if (isNullOrUndefined(htmlArray[i].result)){

                                        var cantparseResponse: InsightResponse = {
                                            code: 400,
                                            body: {Error: "Missing result"}
                                        };
                                        reject(cantparseResponse);
                                        return;
                                    }*/

                                    var arrayOfBuildings = htmlArray[i];


                                    //loop through the jsonObjectList's result node and put everything into an array
                                    for (var j = 0; j < arrayOfBuildings.length; j++) {
                                        everythingArr.push(arrayOfBuildings[j]);

                                    }//loop through each result node's courses and add those to the master list
                                }
                                //everythingArr would contain allllll the courses one by one

                                var path = './'+ id+'.html';
                                var fileExists = fs.existsSync(path);

                                if (fileExists) {

                                    fs.writeFileSync( path, everythingArr);

                                    resolve(existsResponse);

                                }else {

                                    fs.writeFileSync( path, everythingArr);
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

            }

            else{

            JSZip.loadAsync(content, {"base64": true})

                .then(function (zip: any) {

                    //check if key is empty or zip is no key here
                    if (isNullOrUndefined(zip) || (isNullOrUndefined(zip.files))){
                        var cantparseResponse: InsightResponse = {
                            code : 400,
                            body : {"error": "Empty zip"}
                        };
                        reject(cantparseResponse);
                        return;

                    }

                    var dirName:any = null;
                    //loop through to find dir name and then go into second loop to find if dir name is in key

                    for (var i = 0; i<Object.keys(zip.files).length; i++) {

                        var key = Object.keys(zip.files)[i];

                        if (zip.files[key].dir){
                            dirName = zip.files[key].name;
                            break;
                        }
                            }

                            //console.log("dir name" +dirName);

                    for (let key in zip.files) {

                        if (!key.includes(dirName)){
                            var cantparseResponse: InsightResponse = {
                                code : 400,
                                body : {"Error": "Empty zip"}
                            };
                            reject(cantparseResponse);
                            return;

                        }

                        if (zip.file(key) !== null && zip.files.hasOwnProperty(key)) {
                            promises.push(zip.file(key).async("string"));
                        }
                    }

                    Promise.all(promises)

                        .then(function (content: string[]) {

                            if (content.length===0){
                                var cantparseResponse: InsightResponse = {
                                    code : 400,
                                    body : {"error": "Empty jSon"}
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
                                        body: {"Error": "Missing result"}
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
            }})
    };

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

            var objforRoomQuery = new QueryClassMethRoom();

            var path = "";

            if ((objforQuery.isJson(JSON.stringify(query.WHERE)) || objforQuery.isJson(JSON.stringify(query.OPTIONS))) === false) {

                var failResponse: InsightResponse = {
                    code: 400,
                    body: {Error: "Invalid Json"}
                };
                reject(failResponse);
                return;
            }

            if ((isNullOrUndefined(query.OPTIONS))||(isNullOrUndefined(query.WHERE))){
                var failResponse: InsightResponse = {
                    code: 400,
                    body: {Error: "missing option or where"}
                };
                reject(failResponse);
                return;

            }

            if ((query.OPTIONS.FORM !=="TABLE")||(isNullOrUndefined(query.OPTIONS.FORM))||(isNullOrUndefined(query.WHERE)
                )||(query.OPTIONS.COLUMNS.length===0) || (!isArray(query.OPTIONS.COLUMNS))){

                var failResponse: InsightResponse = {
                    code: 400,
                    body: {Error}
                };
                reject(failResponse);
                return;

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

                    if (!objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_")))){
                        acc.push(key1[0].substring(0, key1[0].indexOf("_")));

                    }else{
                        path = key1[0].substring(0, key1[0].indexOf("_"));
                    }


                } else if (key === "LT") {

                    var key1 = Object.keys(input.LT);

                    if (isArray(input.LT)) reject(failResponse2);

                    if (!objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_")))) {
                        acc.push(key1[0].substring(0, key1[0].indexOf("_")));
                    }else{
                        path = key1[0].substring(0, key1[0].indexOf("_"));
                    }

                } else if (key === "EQ") {

                    var key1 = Object.keys(input.EQ);

                    if (isArray(input.EQ)) reject(failResponse2);

                    if (!objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_")))) {
                        acc.push(key1[0].substring(0, key1[0].indexOf("_")));
                    }else{
                        path = key1[0].substring(0, key1[0].indexOf("_"));
                    }

                } else if (key === "IS") {

                    var key1 = Object.keys(input.IS);

                    if (isArray(input.IS)) reject(failResponse2);

                    if (!objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_")))) {
                        acc.push(key1[0].substring(0, key1[0].indexOf("_")));
                    }else{
                        path = key1[0].substring(0, key1[0].indexOf("_"));
                    }

                } else if (key === "AND") {
                    var exprs = input.AND;

                    if (!isArray(input.AND)) reject(failResponse2);

                    if ((input.AND.length === 0) || (!isArray(input.AND))) reject(failResponse2);

                    for (let key of exprs) {

                        checkKey(key);

                    }

                } else if (key === "OR") {
                    var exprs = input.OR;

                    if (!isArray(input.OR)) reject(failResponse2);

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

            if (everythingArr.length === 0) { // global
                everythingArr = fs.readFileSync('./' + path + '.json');
            }

            for (var course of everythingArr) {

                try {
                    if (path==="courses") {

                        if (objforQuery.Filter(query.WHERE, course) === true)
                            arrOFCourses.push(course);
                    }
                    // }else if(path==="rooms"){
                    //
                    //     if (objforRoomQuery.Filter(query.WHERE, course) === true)
                    //         arrOFCourses.push(course);
                    // }
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
