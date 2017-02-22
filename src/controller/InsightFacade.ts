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
import {GeoResponse} from "../QueryClass/GeoResponse";


var fs = require("fs");

var JSZip = require("jszip");
var parse5 = require("parse5");
var http = require("http");
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
var allRoomsArr:any[] = [];


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

                        //check if key is empty or zip is no key here
                        if (isNullOrUndefined(zip) || (isNullOrUndefined(zip.files))){
                            var cantparseResponse: InsightResponse = {
                                code : 400,
                                body : {Error: "Empty zip"}
                            };
                            reject(cantparseResponse);
                            return;

                        }

                        var treeIndex:any = [];
                        //loop through to find dir name and then go into second loop to find if dir name is in key


                  for (let key in zip.files) {
                      if (zip.file(key) !== null && zip.files.hasOwnProperty(key))  promises.push(zip.file(key).async("string"));
                  }
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

                                //this is for Irongate. when its the wrong id, then should give 400

                                try {

                                    tree = parse5.parse(content[content.length - 1]);

                                }catch(err){

                                    var wrongIDResponse: InsightResponse = {
                                        code : 400,
                                        body : {"Error": "cannot parse, so wrong id"}
                                    };
                                    reject(wrongIDResponse);
                                    return;

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

                            .catch (function (err:any) {

                                var cantparseResponse: InsightResponse = {
                                    code : 400,
                                    body : {"error": "cannot parse error in room"}
                                };
                                reject(cantparseResponse);
                                return;

                            })

                            // at this point everything should be in htmlArray

                            .then(function (content:any) {


                                function timeout(delay:any) {
                                    return new Promise(function(resolve, reject) {
                                        setTimeout(resolve, delay);
                                    });
                                }

                                function request(url:any) {
                                        return http.get(url, (res: any) => {
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
                                                return;
                                            }

                                            res.setEncoding('utf8');
                                            let rawData = '';
                                            res.on('data', (chunk: any) => rawData += chunk);
                                            res.on('end', () => {
                                                try {
                                                    console.log("here");
                                                    let parsedData = JSON.parse(rawData);
                                                    return parsedData;
                                                    // console.log(parsedData);
                                                } catch (e) {
                                                    console.log(e.message);
                                                }
                                            });
                                        }).on('error', (e: any) => {
                                            console.log(`Got error: ${e.message}`);
                                        });
                                }
                                var result = null;

                                function callback(data:any) {
                                    result = data;
                                    console.log("here is result" + result);
                                    // all requests are done, log everything

                                }

                                function processUrl(url:any) {
                                    var finalData = '';
                                    http.get(url, function(response:any) {
                                        response.setEncoding('utf8');
                                        response.on('data', function(data:any) {
                                            finalData += data;
                                        });
                                        response.on('error', console.error);
                                        response.on('end', function() {
                                            // console.log(finalData);
                                            callback(finalData);
                                        })
                                    });
                                }

                                var addressArr:any = [];

                                function getBuilding() {

                                    for (let building of htmlArray) {

                                        if (isNullOrUndefined(building.childNodes[6].childNodes[3].childNodes[31]
                                                .childNodes[12].childNodes)) {

                                            var buildingAddress = building.childNodes[6].childNodes[3].childNodes[31]
                                                .childNodes[10].childNodes[1].childNodes[3].childNodes[1].childNodes[3]
                                                .childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value;
                                            addressArr.push(buildingAddress);

                                        } else {

                                            var buildingAddress = building.childNodes[6].childNodes[3].childNodes[31]
                                                .childNodes[12].childNodes[1].childNodes[3].childNodes[1].childNodes[3]
                                                .childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value;
                                            addressArr.push(buildingAddress);

                                        }
                                    }
                                }


                                for (let building of htmlArray) {

                                    var acc = 0;
                                    // FOR UCLL : var roomtBody = building.childNodes[6].childNodes[3].childNodes[31].childNodes[12].childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1].childNodes[3].childNodes[1].childNodes[3];

                                    if (isNullOrUndefined(building.childNodes[6].childNodes[3].childNodes[31]
                                            .childNodes[12].childNodes)) {

                                        var buildingName = building.childNodes[6].childNodes[3].childNodes[31]
                                            .childNodes[10].childNodes[1].childNodes[3].childNodes[1].childNodes[3]
                                            .childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].value;

                                        var buildingAddress = building.childNodes[6].childNodes[3].childNodes[31]
                                            .childNodes[10].childNodes[1].childNodes[3].childNodes[1].childNodes[3]
                                            .childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value;

                                        var beforeRoom = building.childNodes[6].childNodes[3].childNodes[31]
                                            .childNodes[10].childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1];
                                    }else{
                                        var buildingName = building.childNodes[6].childNodes[3].childNodes[31]
                                            .childNodes[12].childNodes[1].childNodes[3].childNodes[1].childNodes[3]
                                            .childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].value;

                                        var buildingAddress = building.childNodes[6].childNodes[3].childNodes[31]
                                            .childNodes[12].childNodes[1].childNodes[3].childNodes[1].childNodes[3]
                                            .childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].value;

                                        var beforeRoom = building.childNodes[6].childNodes[3].childNodes[31]
                                            .childNodes[12].childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1];

                                        acc++;
                                    }


                                    // var options = {
                                    //     host: 'skaha.cs.ubc.ca',
                                    //     path: '/api/v1/team21/'+buildingAddress.split(' ').join('%20'),
                                    //     port: '11316'
                                    // };

                                    var lat:number = 0;
                                    var lon:number = 0;


                                    request("http://skaha.cs.ubc.ca:11316//api/v1/team21/" + buildingAddress.split(' ').join('%20'));




                                    var promises2: Promise<string>[] = [];
                                    //
                                    // var promise = new Promise(function (resolve, reject) {
                                    //     var answer = request("http://skaha.cs.ubc.ca:11316//api/v1/team21/" + buildingAddress.split(' ').join('%20'));
                                    //     let rawData:any = null;
                                    //     let parsedData:any = null;
                                    //     answer.on('data', (chunk: any) => rawData += chunk);
                                    //     answer.on('end', () => {
                                    //         try {
                                    //             console.log("here");
                                    //             parsedData = JSON.parse(rawData);
                                    //           //  return parsedData;
                                    //             // console.log(parsedData);
                                    //         } catch (e) {
                                    //             console.log(e.message);
                                    //         }
                                    //     });
                                    //
                                    //     resolve(parsedData);
                                    //
                                    // })
                                    //
                                    // promise.then(function (result:any){
                                    //
                                    //     console.log(result);
                                    //
                                    // })



                                   // promises2.push(promise);


                                    // Promise.all(promises2)
                                    //
                                    //     .then(function (result:any) {
                                    //
                                    //             for (var shit of result) {
                                    //
                                    //                 console.log("resutl here " + shit);
                                    //             }
                                    //
                                    //             resolve(result);
                                    //
                                    //             return;
                                    //
                                    //         });


                                    // var promises2: Promise<string>[] = [];
                                    //
                                    //     // return new pending promise
                                    //     // select http or https module, depending on reqested url
                                    //     var request = http.get(options, (response: any) => {
                                    //         // handle http errors
                                    //         if (response.statusCode < 200 || response.statusCode > 299) {
                                    //             reject(new Error('Failed to load page, status code: ' + response.statusCode));
                                    //         }
                                    //         // temporary data holder
                                    //         const body: any = [];
                                    //         // on every content chunk, push it to the data array
                                    //         response.on('data', (chunk: any){
                                    //
                                    //             body.push(chunk);
                                    //         };
                                    //         )
                                    //         console.log(response);
                                    //             // we are done, resolve promise with those joined chunks
                                    //         request.on('error', (err: any) => reject(err));
                                    //         // handle connection errors of the request
                                    //         return body.join(' ');
                                    //
                                    //     });
                                    //
                                    // promises2.push(request);
                                    //
                                    //     Promise.all(promises2)
                                    //
                                    // .then(function (result:any) {
                                    //
                                    //     for (var shit of result) {
                                    //
                                    //         console.log("resutl here " + shit);
                                    //     }
                                    //
                                    //     resolve(result);
                                    //
                                    //     return;
                                    //
                                    // });


                                   /* http.get(('http://skaha.cs.ubc.ca:11316/api/v1/team21/'+buildingAddress.split(' ').join('%20')), (res:any) => {
                                        const statusCode = res.statusCode;
                                        const contentType = res.headers['content-type'];

                                        let error;
                                        if (statusCode !== 200) {
                                            error = new Error(`Request Failed.\n` +
                                                `Status Code: ${statusCode}`);
                                        } else  {
                                            console.log(res.body);
                                            lat = res.body[lat];
                                            lon = res.body[lon];
                                        }
                                        if (error) {
                                            console.log(error);
                                            // consume response data to free up memory
                                            res.resume();
                                            return;
                                        }

                                    }).on('error', (e:any) => {
                                        console.log(`Got error: ${e}`);
                                    });
*/

                                    //console.log('http://skaha.cs.ubc.ca:11316/api/v1/team21/'+buildingAddress.split(' ').join('%20'));

                                  /*  getContent('http://skaha.cs.ubc.ca:11316/api/v1/team21/'+buildingAddress.split(' ').join('%20'))

                                        .then((html) => console.log("here is html" + html))
                                        .catch((err) => console.error(err));*/

                                    // var chu = null;
                                    //
                                    //
                                    // http.get(options, function(res:any) {
                                    //     console.log("Got response: " + res.statusCode);
                                    //
                                    //     res.on("data", function(chunk:any) {
                                    //         console.log("BODY: " + chunk);
                                    //         chu = chunk;
                                    //     });
                                    // }).on('error', function(e:any) {
                                    //     console.log("Got error: " + e.message);
                                    // });
                                    //
                                    // console.log(chu);

                                    // var callback = function (response:any) {
                                    //     var str = '';
                                    //
                                    //     response.on('data', function (chunk:any) {
                                    //         str += chunk;
                                    //
                                    //     });
                                    //     response.on('end', function () {
                                    //
                                    //         var str1 = JSON.parse(str);
                                    //
                                    //         lat = str1[Object.keys(str1)[0]];
                                    //         lon = str1[Object.keys(str1)[1]];
                                    //
                                    //
                                    //     });
                                    //
                                    // };
                                    //
                                    // http.request(options, callback).end();
                                    // setTimeout(callback,300);
                                    //
                                    // timeout(300).then(callback);

                                    if (beforeRoom.childNodes.length > 4){

                                        if (acc > 0) {  //UCLL
                                            var roomtBody = building.childNodes[6].childNodes[3].childNodes[31].childNodes[12].childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1].childNodes[3].childNodes[1].childNodes[3];

                                        }else {

                                            var roomtBody = building.childNodes[6].childNodes[3].childNodes[31].childNodes[10].childNodes[1].childNodes[3].childNodes[1].childNodes[5].childNodes[1].childNodes[3].childNodes[1].childNodes[3];
                                        }



                                    for (let i = 1; i < roomtBody.childNodes.length; i++) {
                                        var room = roomtBody.childNodes[i];
                                        var roomURL = room.childNodes[1].childNodes[1].attrs[0].value;
                                        var name = roomURL.substring(69,roomURL.length);
                                        var shortname = name.substring(0,name.indexOf("-"));


                                        var Ftemp = room.childNodes[5].childNodes[0].value;
                                        Ftemp = Ftemp.substring(Ftemp.indexOf("n"),Ftemp.length);
                                        Ftemp = Ftemp.trim();

                                        var SeatTemp = room.childNodes[3].childNodes[0].value;
                                        SeatTemp = SeatTemp.substring(SeatTemp.indexOf("n"),SeatTemp.length);
                                        SeatTemp = SeatTemp.trim();
                                        SeatTemp = parseInt(SeatTemp);

                                        var Typetemp = room.childNodes[7].childNodes[0].value;
                                        Typetemp = Typetemp.substring(Typetemp.indexOf("n"),Typetemp.length);
                                        Typetemp = Typetemp.trim();

                                        var roomNumber = room.childNodes[1].childNodes[1].childNodes[0].value;



                                        var tempRoom: Room = {
                                            rooms_fullname: buildingName,
                                            rooms_shortname: shortname,
                                            rooms_number: roomNumber,
                                            rooms_name: shortname + "_" + roomNumber,
                                            rooms_address: buildingAddress,
                                            rooms_lat: lat,
                                            rooms_lon: lon,
                                            rooms_seats: SeatTemp,
                                            rooms_type: Typetemp,
                                            rooms_furniture: Ftemp,
                                            rooms_href: roomURL
                                        };


                                        //console.log("here " +tempRoom.rooms_lon);

                                        var parsedRoom = JSON.stringify(tempRoom);

                                        allRoomsArr.push(parsedRoom);
                                        i++;
                                    }}}


                                  //console.log("everything   "+everythingArr.length);


                                    //loop through the jsonObjectList's result node and put everything into an array
                                    //loop through each result node's courses and add those to the master list

                                //everythingArr would contain allllll the courses one by one

                                var path = './'+ id+'.json';
                                var fileExists = fs.existsSync(path);

                                if (fileExists) {

                                    fs.writeFileSync( path, JSON.stringify(allRoomsArr));

                                    resolve(existsResponse);

                                }else {

                                    fs.writeFileSync( path, JSON.stringify(allRoomsArr));
                                    resolve(newResponse);
                                }

                            });

                    })

                    .catch(function (err: any) {

                        var errResponse: InsightResponse = {
                            code : 400,
                            body : {"error": "final catch of rooms error"}
                        };
                        reject(errResponse);
                        return;

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
                                body : {"error": "cannot parse"}
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
                        body : {"error": "general"}
                    };
                    reject(errResponse);
                    return;

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
            var arrOFrooms = [];

            var finalCourseArr = [];

            var objforQuery = new QueryClassMeth();

            var objforRoomQuery = new QueryClassMethRoom();

            var path = "";

            if (everythingArr.length === 0  && allRoomsArr.length === 0) {

                var failResponse: InsightResponse = {
                    code: 400,
                    body: {Error: "No dataset"}
                };
                reject(failResponse);
            }

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

                var pathwithhead = './'+ path+'.json';

                var fileExists = fs.existsSync(pathwithhead);

                if (fileExists) {
                    everythingArr = fs.readFileSync(pathwithhead);
                }else{

                    var failResponse: InsightResponse = {
                        code: 400,
                        body: {"error" :"no dataset added"}
                    };
                    reject(failResponse);
                    return;

                }

            }


                try {
                    if (path==="courses") {
                        for (var course of everythingArr) {

                            if (objforQuery.Filter(query.WHERE, course) === true)
                                arrOFCourses.push(course);
                        }

                    }else if(path==="rooms"){

                        for (var room of allRoomsArr){

                        var room = JSON.parse(room);

                        if (objforRoomQuery.Filter(query.WHERE, room) === true)

                            arrOFrooms.push(room);
                    }}
                } catch (err) {

                        var failResponse: InsightResponse = {
                            code: 400,
                            body: err
                        };
                        reject(failResponse);
                        return;

                }



            if(path==="courses") {

                for (var course of arrOFCourses) {
                    finalCourseArr.push(objforQuery.Combine(course, query.OPTIONS));
                }
            }else if (path==="rooms"){

                for (var course of arrOFrooms) {
                    finalCourseArr.push(objforRoomQuery.Combine(course, query.OPTIONS));
                }
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

                    if ((orderS === "courses_instructor") || orderS === "courses_uuid" || orderS === "courses_id" || orderS === "courses_title" || orderS === "courses_dept"
                       || orderS === "rooms_furniture" ||orderS === "rooms_fullname" ||orderS === "rooms_shortname" ||orderS === "rooms_number" ||orderS === "rooms_name" ||
                        orderS === "rooms_address" ||orderS === "rooms_type" ||orderS === "rooms_href") {
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
