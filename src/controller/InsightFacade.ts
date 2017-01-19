/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {

       var fs = require("fs");
        var JSZip = require("jszip");

        var contentArray:any[] = [];

        var jsonObjArray:any[] = [];
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

       return new JSZip.external.Promise(function (resolve:any, reject:any) {
            fs.readFile(content, function(err:any, data:any) {
                if (err) {
                    reject({"error": err});
                }
                else {
                    resolve(data);
                }
            });
        })
            .then(function (data:any) {
            return JSZip.loadAsync(data);
        })
            .then(function(zip: any) {
                for (let i in zip) {
                    //missing try catch for empty jSon error
                    jsonObjArray.push(JSON.parse(i));
                }

                for (let key in jsonObjArray) {

                }


            })

    }

    removeDataset(id: string): Promise<InsightResponse> {
        return null;
    }

    performQuery(query: QueryRequest): Promise <InsightResponse> {
        return null;
    }
}
