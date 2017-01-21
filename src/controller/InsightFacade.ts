/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";

var fs = require("fs");
var JSZip = require("jszip");


export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {


        var contentArray: any[] = [];

        var jsonObjArray: any[] = [];


        return new Promise(function (resolve: any, reject: any) {

            if (!content)
                reject(400, {"error": "empty content"});

            JSZip.loadAsync(content, {"base64": true})

                .then(function (zip: any) {

                    zip.forEach(function(filename:string) {

                        zip.files[filename].async("string")

                            .then (function(content:string[]) {

                                for (var i = 0; i < content.length; i++){

                                    try {
                                        var json = JSON.parse(content[i]);
                                        jsonObjArray.push(json);
                                    }catch(err){
                                        reject(400, {"error" : "cannot parse JSON"});
                                    }
                                }

                                var everythingArr: string[] = [];

                                for (var i = 0; i < jsonObjArray.length; i++) {
                                    var arrayOfCourses = jsonObjArray[i].result;   //loop through the jsonObjectList's result node and put everything into an array

                                    for (var j = 0; j < arrayOfCourses.length; j++)
                                        everythingArr.push(arrayOfCourses[j]);    //loop through each result node's courses and add those to the master list
                                }                                               //everythingArr would contain allllll the courses one by one
                                fs.access(id, (err:any) =>{
                                    if(!err){
                                        fs.unlink(id);
                                        fs.writeFile(id, everythingArr);
                                        resolve(201,{});

                                    }else{
                                        fs.writeFile(id, everythingArr);
                                        resolve(204,{});
                                    }
                                });

                            })
                            .catch(function (err: any) {
                                reject(400, {"error":err});
                            })
                    });
                })
        })
}

            /*      // console.log("help");
             //console.log(zip);

             zip.forEach(function (file:any) {
             fs.readFile(file,function (err:any, data:any) {
             jsonObjArray.push(JSON.parse(data));

             })

             })


             /!*for (let i of zip) {
             //missing try catch for empty jSon error

             var fileName = i.name;

             var toParse =  zip.file(content).async(fileName.toString('base64'));
             //var toParse = zip.file(fileName.toString,i);

             //console.log("BEEEPEPEPEPJGPJEPJGJGJPEJ" + i);
             //add to data struction
             //store to disk? using fs to put the data struction into file
             //file save inside the repo...? path is relative??? save it in "inside repo" "./data"
             //save the data structure to a global variable. easier to query
             //but if using the global variable, then need to write code in query to check if the global variable exist
             //if it doesnt exist then we need to load it using fs

             jsonObjArray.push(JSON.parse(toParse));
             }*!/

             for (let key of jsonObjArray) {
             console.log("this is key"+key);



             }

             resolve();

             })
             .catch(function (err: any) {
             reject(err);
             })

             });

             }*/

            removeDataset(id: string): Promise<InsightResponse> {
                return null;
        }

            performQuery(query: QueryRequest): Promise <InsightResponse> {
                return null;
        }
        }
