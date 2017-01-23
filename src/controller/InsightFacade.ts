/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";

import QueryClassMeth from "../QueryClass/QueryClassMeth";

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
                                try {
                                    var json = JSON.parse(content[i]);
                                    // console.log(JSON.stringify(json));
                                    jsonObjArray.push(json);
                                } catch (err) {

                                    var cantparseResponse: InsightResponse = {
                                        code : 400,
                                        body : {"error": err}
                                    };
                                    reject(cantparseResponse);
                                }

                            }
                        })


                        // at this point everything should be in jsonObjArray

                        .then(function (content:any) {

                            var everythingArr: any[] = [];
                            console.log(jsonObjArray.length);
                            for (var i = 0; i < jsonObjArray.length; i++) {

                                var arrayOfCourses = jsonObjArray[i].result;   //loop through the jsonObjectList's result node and put everything into an array
                                for (var j = 0; j < arrayOfCourses.length; j++) {
                                    everythingArr.push(arrayOfCourses[j]);

                                }//loop through each result node's courses and add those to the master list
                            }
                            //everythingArr would contain allllll the courses one by one

                        // })
                        //
                        // .then(function (content:any) {
                            var fileExists = fs.exists(id);
                            var path = './tmp';

                            try {
                                //  if (!fs.exists(path)){
                                fs.mkdirSync(path);
                                // if (fileExists)
                                //     resolve(existsResponse);
                                // else
                                //     resolve(newResponse);
                                //  }


                            }catch(err){
                                console.log(err);
                            }

                            if (fileExists) {
                                resolve(existsResponse);
                            }
                            else {
                                resolve(newResponse);
                            }

                            fs.writeFileSync('./tmp/courses', JSON.stringify(everythingArr));
                        })

                            // fs.mkdir(path, function (err:any) {
                            //     if (err) {
                            //         console.log('failed to create directory', err);
                            //     } else {
                            //         fs.writeFileSync(id, JSON.stringify(everythingArr));
                            //
                            //         if (fileExists)
                            //             resolve(existsResponse);
                            //         else
                            //             resolve(newResponse);
                            //     }
                            // });


                           //var fileExists = fs.existsSync(id);
                            var outputJson: any = {};
                            console.log("output");


                            //fs.writeFileSync(id, JSON.stringify(everythingArr));

                            // need to write error for invalid ID

                            // if (fileExists)
                            //     resolve(201,existsResponse);
                            // else
                            //     resolve(204,newResponse);

                            // fs.existsSync(id, (err:any) =>{
                            //     if(!err){
                            //         fs.unlink(id);
                            //         fs.writeFileSync(id, everythingArr);
                            //         resolve(201,{});
                            //
                            //     } else{
                            //         var outputJson : any = {};
                            //         for (i=0; i <everythingArr.length ; i++){
                            //             outputJson.push(everythingArr[i]);
                            //         }
                            //         fs.writeFileSync(id, JSON.stringify(outputJson));
                            //         resolve(204,{});
                            //     }
                            // });

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

            fs.existsSync(id, (err:any) => {
                if (!err){
                    fs.unlink(id);
                    var successResponse: InsightResponse = {
                        code : 204,
                        body : {}
                    };
                    resolve(successResponse);
                }
                else {

                    var removeResponse: InsightResponse = {
                        code : 404,
                        body : {"error": err}
                    };
                    reject(removeResponse);
                }
            })

        })

    }

    performQuery(query: QueryRequest): Promise <InsightResponse> {
        //


        return null;
    }
}
