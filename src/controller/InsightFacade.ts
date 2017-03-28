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
import {Room} from "../QueryClass/Room";
import lastIndexOf = require("core-js/fn/array/last-index-of");
import {fail} from "assert";


var fs = require("fs");

var JSZip = require("jszip");
var parse5 = require("parse5");
var http = require("http");
var parser = new parse5.SAXParser();
var publicIndex:any = 0;

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

var finalResult: InsightResponse = {
    code : 200,
    body : {}
};


var everythingArr: any[] = [];
var allRoomsArr:any[] = [];


export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {

        var jsonObjArray: any[] = [];
        var htmlArray: any[] = [];
        var tree:any = null;


        return new Promise(function (resolve: any, reject: any) {


            if(isNullOrUndefined(id) || isNullOrUndefined(content) || !content) reject(emptyResponse);


            var promises: Promise<string>[] = [];

            if (id === "rooms") {

                JSZip.loadAsync(content, {"base64": true})

                    .then(function (zip: any) {

                        //check if key is empty or zip is no key here
                        if (isNullOrUndefined(zip) || (isNullOrUndefined(zip.files))){
                            var cantparseResponse: InsightResponse = {
                                code : 400,
                                body : {"error": "Empty zip"}
                            };
                            reject(cantparseResponse);


                        }

                        var treeIndex:any = [];
                        //loop through to find dir name and then go into second loop to find if dir name is in key


                        for (let key in zip.files) {
                            if (zip.file(key) !== null && zip.files.hasOwnProperty(key))  promises.push(zip.file(key).async("string"));
                        };


                        Promise.all(promises)

                            .then(function (content: string[]) {

                                if (content.length===0){
                                    var cantparseResponse: InsightResponse = {
                                        code : 400,
                                        body : {"error": "Empty html"}
                                    };
                                    reject(cantparseResponse);


                                }

                                //this is for Irongate. when its the wrong id, then should give 400

                                try {

                                    tree = parse5.parse(content[content.length - 1]);

                                }catch(err){

                                    var wrongIDResponse: InsightResponse = {
                                        code : 400,
                                        body : {"error": "cannot parse, so wrong id"}
                                    };
                                    reject(wrongIDResponse);


                                }


                                var treeTbody = tree.childNodes[6].childNodes[3].childNodes[31].childNodes[10]
                                    .childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1].childNodes[3];

                                function loop(tree:any){

                                    for (var key = 1; key<tree.childNodes.length;key++){

                                        var temp = treeTbody.childNodes[key].childNodes[5].childNodes[1].childNodes[0].value;
                                        treeIndex.push(temp);

                                        key++;

                                    }
                                }
                                loop(treeTbody);


                                for (let i = 3; i < content.length - 1; i++) {
                                    var parsedBuilding = parse5.parse(content[i]);

                                    if (i === 75) {  // FILTERING OUT UCLL
                                        var buildingName = parsedBuilding.childNodes[6].childNodes[3].childNodes[31]
                                            .childNodes[12].childNodes[1].childNodes[3].childNodes[1]
                                            .childNodes[3].childNodes[1].childNodes[1].childNodes[1]
                                            .childNodes[1].childNodes[0].childNodes[0].value;
                                    }else {
                                        var buildingName = parsedBuilding.childNodes[6].childNodes[3].childNodes[31]
                                            .childNodes[10].childNodes[1].childNodes[3].childNodes[1]
                                            .childNodes[3].childNodes[1].childNodes[1].childNodes[1]
                                            .childNodes[1].childNodes[0].childNodes[0].value;
                                    }
                                    for (let index of treeIndex){
                                        if (buildingName === index){
                                            htmlArray.push(parsedBuilding);
                                        }
                                    }

                                }

                                //   console.log(htmlArray.length); //74 BUILDINGS

                            })

                            .catch ((err:any) => {

                                var cantparseResponse: InsightResponse = {
                                    code : 400,
                                    body : {"error": "cannot parse error in room"}
                                };
                                reject(cantparseResponse);


                            })

                            // at this point everything should be in htmlArray

                            .then(function (content:any) {

                                function request(url: any, acc:any) {
                                    return new Promise((resolve, reject) => {
                                        http.get(url, (res: any) => {
                                            const statusCode = res.statusCode;
                                            const contentType = res.headers['content-type'];

                                            let error;
                                            if (statusCode !== 200) {
                                                error = new Error(`Request Failed.\n` +
                                                    `Status Code: ${statusCode}`);
                                            } else if (!/^application\/json/.test(contentType)) {
                                                error = new Error(`Invalid content-type.\n` +
                                                    `Expected application/json but received ${contentType}`);
                                            }
                                            if (error) {
                                                console.log(error.message);
                                                // consume response data to free up memory
                                                res.resume();
                                                reject(error);
                                            }

                                            res.setEncoding('utf8');
                                            let rawData = '';
                                            res.on('data', (chunk: any) => rawData += chunk);
                                            res.on('end', () => {
                                                try {
                                                    //console.log(rawData);

                                                    let parsedData = JSON.parse(rawData);
                                                    parsedData.acc = acc;
                                                    resolve(parsedData);
                                                } catch (e) {
                                                    console.log(e.message);
                                                }

                                            });
                                        }).on('error', (e: any) => {
                                            console.log(`Got error: ${e.message}`);
                                            reject(e);
                                        });
                                    })
                                }

                                var promises2: Promise<any>[] = [];


                                for (let building of htmlArray) {

                                    allRoomsArr = [];

                                    var acc = 0;

                                    // FOR UCLL : var roomtBody = building.childNodes[6].childNodes[3].childNodes[31].childNodes[12].childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1].childNodes[3].childNodes[1].childNodes[3];

                                    if (isNullOrUndefined(building.childNodes[6].childNodes[3].childNodes[31]
                                            .childNodes[12].childNodes)) {

                                        var buildingAddress = building.childNodes[6].childNodes[3].childNodes[31]
                                            .childNodes[10].childNodes[1].childNodes[3].childNodes[1].childNodes[3]
                                            .childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value;

                                    }else{

                                        var buildingAddress = building.childNodes[6].childNodes[3].childNodes[31]
                                            .childNodes[12].childNodes[1].childNodes[3].childNodes[1].childNodes[3]
                                            .childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value;

                                    }


                                    var p = request("http://skaha.cs.ubc.ca:11316//api/v1/team21/" + buildingAddress.split(' ').join('%20'), acc)

                                        .then((body: any) => {

                                            var UCLL = false;

                                            if (!isNullOrUndefined(building.childNodes[6].childNodes[3].childNodes[31]
                                                    .childNodes[12].childNodes)) UCLL = true;

                                            if (!UCLL) {

                                                var beforeRoom = building.childNodes[6].childNodes[3].childNodes[31]
                                                    .childNodes[10].childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1];
                                            }else{

                                                var beforeRoom = building.childNodes[6].childNodes[3].childNodes[31]
                                                    .childNodes[12].childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1];

                                            }


                                            if (beforeRoom.childNodes.length > 4){

                                                if (UCLL) {  //UCLL

                                                    var roomtBody = beforeRoom.childNodes[3].childNodes[1].childNodes[3];
                                                    var buildingName = building.childNodes[6].childNodes[3].childNodes[31]
                                                        .childNodes[12].childNodes[1].childNodes[3].childNodes[1].childNodes[3]
                                                        .childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].value;

                                                    var buildingAddress = building.childNodes[6].childNodes[3].childNodes[31]
                                                        .childNodes[12].childNodes[1].childNodes[3].childNodes[1].childNodes[3]
                                                        .childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value;
                                                }else {

                                                    var roomtBody = beforeRoom.childNodes[3].childNodes[1].childNodes[3];
                                                    var buildingName = building.childNodes[6].childNodes[3].childNodes[31]
                                                        .childNodes[10].childNodes[1].childNodes[3].childNodes[1].childNodes[3]
                                                        .childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].value;

                                                    var buildingAddress = building.childNodes[6].childNodes[3].childNodes[31]
                                                        .childNodes[10].childNodes[1].childNodes[3].childNodes[1].childNodes[3]
                                                        .childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value;
                                                }

                                                for (let i = 1; i < roomtBody.childNodes.length; i++) {

                                                    var room = roomtBody.childNodes[i];
                                                    var roomURL = room.childNodes[1].childNodes[1].attrs[0].value;
                                                    var name = roomURL.substring(69,roomURL.length);
                                                    var shortname = name.substring(0,name.indexOf("-"));


                                                    var Ftemp = room.childNodes[5].childNodes[0].value;
                                                    Ftemp = Ftemp.substring(1,Ftemp.length);
                                                    Ftemp = Ftemp.trim();

                                                    var SeatTemp = room.childNodes[3].childNodes[0].value;
                                                    SeatTemp = SeatTemp.substring(1,SeatTemp.length);
                                                    SeatTemp = SeatTemp.trim();
                                                    SeatTemp = parseInt(SeatTemp);

                                                    var Typetemp = room.childNodes[7].childNodes[0].value;
                                                    Typetemp = Typetemp.substring(1,Typetemp.length);
                                                    Typetemp = Typetemp.trim();

                                                    var roomNumber = room.childNodes[1].childNodes[1].childNodes[0].value;



                                                    var tempRoom: Room = {
                                                        rooms_fullname: buildingName,
                                                        rooms_shortname: shortname,
                                                        rooms_number: roomNumber,
                                                        rooms_name: shortname + "_" + roomNumber,
                                                        rooms_address: buildingAddress,
                                                        rooms_lat: body.lat,
                                                        rooms_lon: body.lon,
                                                        rooms_seats: SeatTemp,
                                                        rooms_type: Typetemp,
                                                        rooms_furniture: Ftemp,
                                                        rooms_href: roomURL
                                                    };

                                                    //console.log("lat and lon " + tempRoom.rooms_lat + tempRoom.rooms_lon);

                                                    var parsedRoom = JSON.stringify(tempRoom);

                                                    allRoomsArr.push(parsedRoom);
                                                    i++;
                                                }

                                            }
                                        }).catch((err: any) => {

                                            var errResponse: InsightResponse = {
                                                code : 400,
                                                body : {"error": "catching room error"}
                                            };
                                            reject(errResponse);

                                        });


                                    promises2.push(p);}

                                Promise.all(promises2)

                                    .then(function (result:any) {

                                        //   console.log("length of room arr"  + allRoomsArr.length);

                                        var path = './' + id + '.json';
                                        var fileExists = fs.existsSync(path);

                                        if (fileExists) {

                                            fs.writeFileSync(path, JSON.stringify(allRoomsArr));

                                            resolve(existsResponse);

                                        } else {

                                            fs.writeFileSync(path, JSON.stringify(allRoomsArr));
                                            resolve(newResponse);
                                        }

                                    })


                            });

                    })

                    .catch(function (err: any) {

                        var errResponse: InsightResponse = {
                            code : 400,
                            body : {"error": "final catch of rooms error"}
                        };
                        reject(errResponse);

                    })

            }

            else if (id === "courses"){

                JSZip.loadAsync(content, {"base64": true})

                    .then(function (zip: any) {

                        //check if key is empty or zip is no key here
                        if (isNullOrUndefined(zip) || (isNullOrUndefined(zip.files))){
                            var cantparseResponse: InsightResponse = {
                                code : 400,
                                body : {"error": "Empty zip"}
                            };
                            reject(cantparseResponse);

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
                                    body : {"error": "Empty zip"}
                                };
                                reject(cantparseResponse);


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


                                }


                                for (var i = 0; i < content.length; i++) {

                                    var json = JSON.parse(content[i]);
                                    jsonObjArray.push(json);
                                }
                            })

                            .catch (function (err:any) {

                                var cantparseResponse: InsightResponse = {
                                    code : 400,
                                    body : {"error": "cannot parse"}
                                };
                                reject(cantparseResponse);


                            })

                            // at this point everything should be in jsonObjArray

                            .then(function (content:any) {

                                everythingArr = [];
                                for (var i = 0; i < jsonObjArray.length; i++) {

                                    if (isNullOrUndefined(jsonObjArray[i].result)){

                                        var cantparseResponse: InsightResponse = {
                                            code: 400,
                                            body: {"error": "Missing result"}
                                        };
                                        reject(cantparseResponse);

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
                            body : {"error": "general"}
                        };
                        reject(errResponse);


                    })
            }
            else{

                var wrongIDResponse: InsightResponse = {
                    code : 400,
                    body : {"error": "Wrong ID"}
                };
                reject(wrongIDResponse);

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
                        body: {"error": "path doesn't exist"}
                    };
                    reject(removeResponse);


                }else{
                    fs.unlink(path,function () {
                        var successResponse: InsightResponse = {
                            code: 204,
                            body: {"error":"unlink error"}
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
            var arrOFrooms = [];

            var finalCourseArr = [];　

            var objforQuery = new QueryClassMeth();

            var objforRoomQuery = new QueryClassMethRoom();

            var path = "";

            everythingArr = [];
            allRoomsArr = [];

            //console.log("the beginning timestamp: "+Date.now());

            if ((objforQuery.isJson(JSON.stringify(query.WHERE)) || objforQuery.isJson(JSON.stringify(query.OPTIONS))) === false) {

                var failResponse4: InsightResponse = {
                    code: 400,
                    body: {"error": "Invalid Json"}
                };
                reject(failResponse4);
            }

            if ((isNullOrUndefined(query.OPTIONS))||(isNullOrUndefined(query.WHERE))){
                var failResponse: InsightResponse = {
                    code: 400,
                    body: {"error": "missing option or where"}
                };
                reject(failResponse);


            }

            if ((query.OPTIONS.FORM !=="TABLE")||(isNullOrUndefined(query.OPTIONS.FORM))||(isNullOrUndefined(query.WHERE)
                )||(query.OPTIONS.COLUMNS.length===0) || (!isArray(query.OPTIONS.COLUMNS))){

                var failResponse: InsightResponse = {
                    code: 400,
                    body: {"error":"wrong form"}
                };
                reject(failResponse);


            }

            if (!isNullOrUndefined(query.OPTIONS.ORDER)) {

                var column = Object.keys(query.OPTIONS)[0];
                var order = query.OPTIONS.ORDER;

                var count = 0;
                if (Object.keys(query.OPTIONS.ORDER)[0] === 'dir') {
                    var keyDic = new Set(query.OPTIONS.ORDER.keys);
                    for (var i  of query.OPTIONS.COLUMNS) {
                        if (keyDic.has(i))
                            count++;
                    }

                    if (count != Object.keys(query.OPTIONS.ORDER.keys).length) {
                        var failResponse: InsightResponse = {
                            code: 400,
                            body: {"error": "order not in column"}
                        };
                        reject(failResponse);

                    }
                } else {
                    for (var i of query.OPTIONS.COLUMNS) {

                        if (i === order) {
                            count++;
                            break;
                        }
                    }

                    if (count === 0) {
                        var failResponse: InsightResponse = {
                            code: 400,
                            body: {"error": "empty options"}
                        };
                        reject(failResponse);

                    }
                }
            }
            function containsInApply(element:any, apply:any[]):boolean {
                for(let i of apply){
                    if(element === Object.keys(i)[0]){
                        return true;
                    }
                }
                return false;
            }

            var acc: any = [];

            function checkKey(input: any): any {

                var failResponse2: InsightResponse = {
                    code: 400,
                    body: {"error": "wrong key"}
                };

                var key = Object.keys(input)[0];

                if (key === "GT") {

                    var key1 = Object.keys(input.GT);


                    if (isArray(input.GT)) reject(failResponse2);
                    if (objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_"))) && key1[0].substring(0, key1[0].indexOf("_")) != path) reject(failResponse2);

                    if (!objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_")))) {
                        acc.push(key1[0].substring(0, key1[0].indexOf("_")));

                    } else {
                        path = key1[0].substring(0, key1[0].indexOf("_"));
                    }


                } else if (key === "LT") {

                    var key1 = Object.keys(input.LT);

                    if (isArray(input.LT)) reject(failResponse2);
                    if (objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_"))) && key1[0].substring(0, key1[0].indexOf("_")) != path) reject(failResponse2);

                    if (!objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_")))) {
                        acc.push(key1[0].substring(0, key1[0].indexOf("_")));
                    } else {
                        path = key1[0].substring(0, key1[0].indexOf("_"));
                    }

                } else if (key === "EQ") {

                    var key1 = Object.keys(input.EQ);

                    if (isArray(input.EQ)) reject(failResponse2);
                    if (objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_"))) && key1[0].substring(0, key1[0].indexOf("_")) != path) reject(failResponse2);


                    if (!objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_")))) {
                        acc.push(key1[0].substring(0, key1[0].indexOf("_")));
                    } else {
                        path = key1[0].substring(0, key1[0].indexOf("_"));
                    }

                } else if (key === "IS") {

                    var key1 = Object.keys(input.IS);

                   if (isArray(input.IS)) reject(failResponse2);
                   if (objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_"))) && key1[0].substring(0, key1[0].indexOf("_")) != path) reject(failResponse2);


                    if (!objforQuery.checkKey(key1[0].substring(0, key1[0].indexOf("_")))) {
                        acc.push(key1[0].substring(0, key1[0].indexOf("_")));
                    } else {
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

                    if (isArray(exprs)) reject(failResponse2);

                    checkKey(exprs);

                } else {
                    reject(failResponse2);
                }

            }

            for (let tmp of query.OPTIONS.COLUMNS){
                if (tmp.indexOf("_") > 0){
                    path = tmp.substring(0, tmp.indexOf("_"));
                    break;
                }
            }

            //console.log("here is path first" + path);

            if (path==="courses"){

                if (everythingArr.length === 0) {

                    var pathWithEnds = './' + path + '.json';
                    var fileExists = fs.existsSync(pathWithEnds);

                    if (fileExists) {
                        everythingArr = JSON.parse(fs.readFileSync(pathWithEnds, 'utf8'));
                    } else {

                        var failResponse: InsightResponse = {
                            code: 424,
                            body: {"missing": ["courses"]}
                        };
                        reject(failResponse);

                    }
                }
            }else if (path==="rooms"){

                if(allRoomsArr.length === 0) {
                    var pathWithEnds = './' + path + '.json';
                    var fileExists = fs.existsSync(pathWithEnds);

                    if (fileExists) {
                        allRoomsArr = JSON.parse(fs.readFileSync(pathWithEnds, 'utf8'));
                    } else {

                        var failResponse: InsightResponse = {
                            code: 424,
                            body: {"missing": ["rooms"]}
                        };
                        reject(failResponse);
                    }
                }

            }

            if(Object.keys(query.WHERE).length===0){
                if (path === "courses"){

                    arrOFCourses = everythingArr;

                }else if (path === "rooms"){
                    for (var room of allRoomsArr){
                        room = JSON.parse(room);
                        arrOFrooms.push(room);
                    }
                }

            }else {

                checkKey(query.WHERE);

                if (acc.length !== 0) {
                    var failllResponse: InsightResponse = {
                        code: 424,
                        body: {"missing": acc}
                    };

                    reject(failllResponse);
                    return;

                }

                //console.log("here is path "+path);

                try {
                    if (path === "courses") {
                        // console.log(JSON.stringify(everythingArr));
                        for (var course of everythingArr) {

                            if (objforQuery.Filter(query.WHERE, course) === true)
                                arrOFCourses.push(course);

                        }

                        // console.log("arry of courses" + arrOFCourses.length);
                    } else if (path === "rooms") {

                        for (var room of allRoomsArr) {

                            var room = JSON.parse(room);

                            if (objforRoomQuery.Filter(query.WHERE, room) === true)

                                arrOFrooms.push(room);
                        }


                    }
                } catch (err) {

                    var failResponse: InsightResponse = {
                        code: 400,
                        body: {"error": "not room or course"}
                    };
                    reject(failResponse);
                    return;

                }

            }

            function contains(obj:any, array:any[]) {
                //var i = array.length;
                var newSetArr = new Set(array);
                if (newSetArr.has(obj))
                    return true;
                return false;
            }
            function checkGroup(group:any):boolean{
                for (let val of group){
                    if (val.indexOf("_") < 0){
                        return false;
                    }
                }
                return true;
            }

            //console.log("array of courses" + JSON.stringify(arrOFCourses));

            if (!isNullOrUndefined(query.TRANSFORMATIONS)){

                if (isNullOrUndefined(query.TRANSFORMATIONS.GROUP) || query.TRANSFORMATIONS.GROUP.length === 0){
                    var failResponseForGroup: InsightResponse = {
                        code: 400,
                        body: {"error": "Group cannot be empty"}
                    };
                    reject(failResponseForGroup);

                }

                if(!checkGroup(query.TRANSFORMATIONS.GROUP)){
                    var failResponseForGroup1: InsightResponse = {
                        code: 400,
                        body: {"error": "Group contains invalid key"}
                    };
                    reject(failResponseForGroup1);
                }

                //  console.log("after filter, before combine timestamp: "+Date.now());

                if (query.TRANSFORMATIONS.APPLY.length === 0) {

                    for (var element of query.OPTIONS.COLUMNS) {
                        if (!objforQuery.checkPartial(element, "_")) {
                            var failResponseForApply: InsightResponse = {
                                code: 400,
                                body: {"error": element + " is not a valid key"}
                            };
                            reject(failResponseForApply);

                        }
                        if (!contains(element, query.TRANSFORMATIONS.GROUP)){
                            var failResponseNotinGroup: InsightResponse = {
                                code: 400,
                                body: {"error": "All COLUMNS keys need to be either in GROUP or in APPLY"}
                            };
                            reject(failResponseNotinGroup);
                        }
                    }
                    if (path === "courses") {

                        for (var course of arrOFCourses) {
                            finalCourseArr.push(objforQuery.Combine(course, query.TRANSFORMATIONS));
                        }
                    } else if (path === "rooms") {

                        for (var course of arrOFrooms) {
                            finalCourseArr.push(objforRoomQuery.Combine(course, query.TRANSFORMATIONS));
                        }
                    }
                }else{

                    for (var As in query.TRANSFORMATIONS.APPLY){

                        var names = Object.keys(query.TRANSFORMATIONS.APPLY[As])[0];
                        if(objforQuery.checkPartial(names,"_")===true){
                            var failResponseNotinGroup: InsightResponse = {
                                code: 400,
                                body: {"error": "Apply keys cannot contain '_'"}
                            };
                            reject(failResponseNotinGroup);

                        }

                    }

                    for (var element of query.OPTIONS.COLUMNS) {
                        if ((!contains(element, query.TRANSFORMATIONS.GROUP)) && !containsInApply(element, query.TRANSFORMATIONS.APPLY)) {
                            var failResponseNotinGroup: InsightResponse = {
                                code: 400,
                                body: {"error": "All COLUMNS keys need to be either in GROUP or in APPLY"}
                            };
                            reject(failResponseNotinGroup);
                        }
                    }

                    if (path === "courses") {

                        for (var course of arrOFCourses) {

                            finalCourseArr.push(objforQuery.CombinewithApply(course, query.TRANSFORMATIONS));
                        }

                    } else if (path === "rooms") {

                        for (var course of arrOFrooms) {

                            finalCourseArr.push(objforRoomQuery.CombinewithApply(course, query.TRANSFORMATIONS));
                        }
                    }

                }

            }else {

                if (path === "courses") {

                    for (var course of arrOFCourses) {
                        finalCourseArr.push(objforQuery.Combine(course, query.OPTIONS));
                    }
                } else if (path === "rooms") {

                    for (var course of arrOFrooms) {
                        finalCourseArr.push(objforRoomQuery.Combine(course, query.OPTIONS));
                    }
                }
            }

            function GroupLoop(resultObj:any, inputObj:any):boolean{

                //console.log("key here "+Object.keys(resultObj[inputObj["groupResult"]]));

                if (!isNullOrUndefined(resultObj[inputObj["groupResult"]])) {
                    return true;
                }
                return false;
            }

            var newObj: any = {};
            var resultArray = [];

            // console.log("before group timestamp: "+Date.now());

            if (!isNullOrUndefined(query.TRANSFORMATIONS)) {

                newObj = {};

                var lengthApply = query.TRANSFORMATIONS.APPLY.length;

                if (lengthApply !== 0) {
                    var tempSet = new Set();
                    var tempArr = [];

                    for (var e in query.TRANSFORMATIONS.APPLY) {

                        var beforeOp = Object.keys(query.TRANSFORMATIONS.APPLY[e])[0];
                        tempSet.add(beforeOp);
                        tempArr.push(beforeOp);

                    }

                    if (tempSet.size != tempArr.length){
                        var failResponse: InsightResponse = {
                            code: 400,
                            body: {"error": "duplicate apply keys"}
                        };
                        reject(failResponse);
                    }


                    for (var b = 0; b < finalCourseArr.length; b++) {

                        var obj2 = finalCourseArr[b];

                        var condition = GroupLoop(newObj,obj2);

                        if(!condition) {
                            newObj[JSON.stringify(obj2["groupResult"])]= obj2;

                            // console.log("here is newObj " + JSON.stringify(newObj));
                        }



                        for (var e in query.TRANSFORMATIONS.APPLY) {

                            var beforeOp = Object.keys(query.TRANSFORMATIONS.APPLY[e])[0];
                            var Operation = Object.keys(query.TRANSFORMATIONS.APPLY[e][beforeOp])[0];
                            var tempKey = query.TRANSFORMATIONS.APPLY[e][beforeOp][Operation];
                            var obj2Key = JSON.stringify(obj2["groupResult"]);


                            var failResponseWrongType: InsightResponse = {
                                code: 400,
                                body: {"error":"type of apply value is wrong"}
                            };

                            if ((Operation === "SUM") || (Operation === "MAX") ||(Operation === "MIN") ||(Operation === "AVG") ){
                                if (typeof(obj2[beforeOp]) !== 'number'){
                                    reject(failResponseWrongType);
                                }
                            }

                            if (!condition){
                                if (Operation === "COUNT") {


                                    newObj[obj2Key]["counter" + tempKey].push(obj2[beforeOp]);


                                }else if (Operation === "AVG") {

                                    newObj[obj2Key]["avg" + tempKey].push(obj2[beforeOp]);

                                }
                            }

                            if (condition) {



                                if (Operation === "SUM") {


                                    newObj[obj2Key][beforeOp] = newObj[obj2Key][beforeOp]+ obj2[beforeOp];

                                } else if (Operation === "MAX") {

                                    if (newObj[obj2Key][beforeOp] <= obj2[beforeOp]) {

                                        newObj[obj2Key][beforeOp] = obj2[beforeOp];
                                    }

                                } else if (Operation === "MIN") {

                                    if (newObj[obj2Key][beforeOp] >= obj2[beforeOp]) {
                                        newObj[obj2Key][beforeOp] = obj2[beforeOp];
                                    }

                                }else if (Operation === "COUNT") {

                                    //console.log("get in here");

                                    newObj[obj2Key]["counter" + tempKey].push(obj2[beforeOp]);


                                }else if (Operation === "AVG") {

                                    newObj[obj2Key]["avg" + tempKey].push(obj2[beforeOp]);

                                }

                            }

                        }



                        // console.log("after" + JSON.stringify(newObj[publicIndex]));
                    }

                    //  console.log("after group before apply for count and avg timestamp: "+Date.now());

                    var distinctArr:any;
                    for (var index in query.TRANSFORMATIONS.APPLY){
                        var beforeOp2 = Object.keys(query.TRANSFORMATIONS.APPLY[index])[0];
                        var Operation2 = Object.keys(query.TRANSFORMATIONS.APPLY[index][beforeOp2])[0];

                        var tempKey1 = query.TRANSFORMATIONS.APPLY[index][beforeOp2][Operation2];

                        if (Operation2==="COUNT"){
                            for (var ele of Object.keys(newObj)) {
                                distinctArr = [];
                                var arrayEle = newObj[ele]["counter" + tempKey1];
                                for (var innerEle of arrayEle) {

                                    if (!contains(innerEle,distinctArr)){
                                        distinctArr.push(innerEle);
                                    }

                                }
                                newObj[ele][beforeOp2] = distinctArr.length;
                            }

                        }else if(Operation2==="AVG"){

                            for (var ele2 of Object.keys(newObj)) {

                                var total = 0;

                                var arrayEle = newObj[ele2]["avg" + tempKey1];
                                //  console.log("array length for counter array "+ arrayEle.length);
                                for (var innerEle of arrayEle) {

                                    innerEle = innerEle*10;
                                    innerEle = Number(innerEle.toFixed(0));

                                    total+=innerEle;

                                }
                                newObj[ele2][beforeOp2] = Number(((total/arrayEle.length)/10).toFixed(2));
                            }

                        }

                    }

                    // console.log("the end timestamp: "+Date.now());

                    for (var insideEle of Object.keys(newObj)){

                        var columnSet = new Set(query.OPTIONS.COLUMNS);

                        for (var inKey of Object.keys(newObj[insideEle])) {

                            if (!columnSet.has(inKey)) {
                                delete newObj[insideEle][inKey];
                            }else if (inKey === 'courses_uuid'){
                                var string = newObj[insideEle][inKey].toString();
                                newObj[insideEle][inKey] = string;
                            }else if (inKey === 'courses_year'){
                                var int = parseInt(newObj[insideEle][inKey]);
                                newObj[insideEle][inKey] = int;
                            }
                        }
                        resultArray.push(newObj[insideEle]);
                    }

                } else {
                    for (var b = 0; b < finalCourseArr.length; b++) {

                        var obj2 = finalCourseArr[b];

                        if(!GroupLoop(newObj, obj2)) {

                            newObj[JSON.stringify(obj2["groupResult"])]= obj2;

                        }}
                        for (var insideEle of Object.keys(newObj)){

                            var columnSet = new Set(query.OPTIONS.COLUMNS);

                            for (var inKey of Object.keys(newObj[insideEle])) {

                                if (!columnSet.has(inKey)) {
                                    delete newObj[insideEle][inKey];
                                }else if (inKey === 'courses_uuid'){
                                    var string = newObj[insideEle][inKey].toString();
                                    newObj[insideEle][inKey] = string;
                                }else if (inKey === 'courses_year'){
                                    var int = parseInt(newObj[insideEle][inKey]);
                                    newObj[insideEle][inKey] = int;
                                }
                            }

                            resultArray.push(newObj[insideEle]);
                        }
                    }

                }


            // console.log(finalCourseArr.length);
            if (resultArray.length!==0) {
                finalCourseArr = resultArray;
            }

            // need to implement sorting the strings in apply

            if (!isNullOrUndefined(query.OPTIONS.ORDER)) {
                finalCourseArr.sort(function (a: any, b: any) {
                    var orderS = query.OPTIONS['ORDER'];

                    if (Object.keys(orderS)[0] === "dir") {

                        if (Object.keys(orderS)[1] !== "keys") {
                            var failResponseWrongKey: InsightResponse = {
                                code: 400,
                                body: {"error": "key in ORDER is wrong"}
                            };
                            reject(failResponseWrongKey);

                        }

                        var keysInOrder = orderS[Object.keys(orderS)[1]];

                        for (var i = 0; i < keysInOrder.length; i++) {

                            //console.log(orderS[Object.keys(orderS)[0]]);

                            if (orderS[Object.keys(orderS)[0]] === "UP") {

                                if (keysInOrder[i] === "courses_instructor" || keysInOrder[i] === "courses_uuid" ||
                                    keysInOrder[i] === "courses_id" || keysInOrder[i] === "courses_title" || keysInOrder[i] === "courses_dept"
                                    || keysInOrder[i] === "rooms_furniture" || keysInOrder[i] === "rooms_fullname" ||
                                    keysInOrder[i] === "rooms_shortname" || keysInOrder[i] === "rooms_number" || keysInOrder[i] === "rooms_name" ||
                                    keysInOrder[i] === "rooms_address" || keysInOrder[i] === "rooms_type" || keysInOrder[i] === "rooms_href") {
                                    var nameA = a[keysInOrder[i]].toLowerCase(), nameB = b[keysInOrder[i]].toLowerCase();
                                    if (nameA < nameB) //sort string ascending
                                        return -1;
                                    if (nameA > nameB)
                                        return 1;

                                    return 0;
                                } else {
                                    return parseFloat(a[keysInOrder[i]]) - parseFloat(b[keysInOrder[i]]);
                                }


                            } else if (orderS[Object.keys(orderS)[0]] === "DOWN") {

                                if (keysInOrder[i] === "courses_instructor" || keysInOrder[i] === "courses_uuid"
                                    || keysInOrder[i] === "courses_id" || keysInOrder[i] === "courses_title" || keysInOrder[i] === "courses_dept"
                                    || keysInOrder[i] === "rooms_furniture" || keysInOrder[i] === "rooms_fullname"
                                    || keysInOrder[i] === "rooms_shortname" || keysInOrder[i] === "rooms_number" || keysInOrder[i] === "rooms_name" ||
                                    keysInOrder[i] === "rooms_address" || keysInOrder[i] === "rooms_type" || keysInOrder[i] === "rooms_href") {
                                    var nameA = a[keysInOrder[i]].toLowerCase(), nameB = b[keysInOrder[i]].toLowerCase();
                                    if (nameA > nameB) //sort string ascending
                                        return -1;
                                    if (nameA < nameB)
                                        return 1;

                                    return 0;
                                } else {
                                    return parseFloat(b[keysInOrder[i]]) - parseFloat(a[keysInOrder[i]]);
                                }
                            } else {
                                var failResponseForDir: InsightResponse = {
                                    code: 400,
                                    body: {"error": "dir in ORDER is wrong"}
                                };
                                reject(failResponseForDir);

                            }
                        }
                    } else {

                        if (orderS === "courses_instructor" || orderS === "courses_uuid" ||
                            orderS === "courses_id" || orderS === "courses_title" || orderS === "courses_dept"
                            || orderS === "rooms_furniture" || orderS === "rooms_fullname" ||
                            orderS === "rooms_shortname" || orderS === "rooms_number" || orderS === "rooms_name" ||
                            orderS === "rooms_address" || orderS === "rooms_type" || orderS === "rooms_href") {
                            var nameA = a[orderS].toLowerCase(), nameB = b[orderS].toLowerCase();
                            if (nameA < nameB) //sort string ascending
                                return -1;
                            if (nameA > nameB)
                                return 1;

                            return 0;
                        } else {
                            return parseFloat(a[orderS]) - parseFloat(b[orderS]);
                        }
                    }
                });
            }


            for (let val of finalCourseArr){
                if (!isNullOrUndefined(val["courses_year"])){
                    var temp = parseInt(val["courses_year"]);
                    val["courses_year"] = temp;
                }

            }

            var resultThing:QueryRequest2 = {
                render:'TABLE',
                result: finalCourseArr
            };

            // console.log(resultThing.result.length);

            var finalFinal = JSON.parse(JSON.stringify(resultThing));

            finalResult.body = finalFinal;


            resolve(finalResult);
        })
    }
}