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
        /*
         // read a zip file
         fs.readFile(content, function(err:any, data:any) {
         if (err) throw err;
         JSZip.loadAsync(data).then(function (zip:any) {
         for (let i in zip) {
         //missing try catch for empty jSon error
         jsonObjArray.push(JSON.parse(i));
         }
         // ...
         });
         });

         for (let key in jsonObjArray) {

         }*/

        return new Promise(function (resolve: any, reject: any) {


            if (!content)
                reject({"error":"empty content"});

            JSZip.loadAsync(content, {'base64':true})

                .then(function (zip: any) {

                    console.log("help");

                    for (let i in zip) {
                        //missing try catch for empty jSon error

                        //add to data struction
                        //store to disk? using fs to put the data struction into file
                        //fild save inside the repo...? path is relative??? save it in "inside repo" "./data"
                        //save the data structure to a global variable. easier to query
                        //but if using the global variable, then need to write code in query to check if the global variable exist
                        //if it doesnt exist then we need to load it using fs
                        jsonObjArray.push(JSON.parse(i));
                    }

                    for (let key in jsonObjArray) {
                        console.log(key);



                    }

                    resolve();

                })
                .catch(function (err: any) {
                    reject(err);
                })

        });

    }

    removeDataset(id: string): Promise<InsightResponse> {
        return null;
    }

    performQuery(query: QueryRequest): Promise <InsightResponse> {
        return null;
    }
}
