/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";
import {isString} from "util";

var fs = require("fs");
var JSZip = require("jszip");

export class IInsightResponse implements InsightResponse {
    code:number;
    body:{};
    constructor(code:number, body:{}) {
        this.code = code;
        this.body = body;
    };
}

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }



    addDataset(id: string, content: string): Promise<InsightResponse> {

        var emptyResponse: InsightResponse = {
            code: 400,
            body: {"error": "empty content"}
        };


        return new Promise(function (resolve: any, reject: any) {


            if (!content) reject(emptyResponse);

            JSZip.loadAsync(content, {"base64":true})

                .then(function (zip: any) {

                    zip.forEach(function(filename:string) {

                        zip.files[filename].async("string")
                            .then (function(jsonArray:string[]) {
                                console.log(jsonArray);

                                resolve(200,{});
                            })


                    });








                        //missing try catch for empty jSon error

                        //add to data struction
                        //store to disk? using fs to put the data struction into file
                        //fild save inside the repo...? path is relative??? save it in "inside repo" "./data"
                        //save the data structure to a global variable. easier to query
                        //but if using the global variable, then need to write code in query to check if the global variable exist
                        //if it doesnt exist then we need to load it using fs
                        //console.log(i);


                })
                .catch(function (err: any) {
                    var errResponse: InsightResponse = {
                        code: 400,
                        body: {"error": err}
                    };
                    reject(errResponse);
                })

        })};



    removeDataset(id: string): Promise<InsightResponse> {
        return null;
    }

    performQuery(query: QueryRequest): Promise <InsightResponse> {
        return null;
    }
}
