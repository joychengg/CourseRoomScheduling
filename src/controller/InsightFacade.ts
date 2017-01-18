/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";
import {unzip} from "zlib";
import {gzip} from "zlib";

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {

        return new Promise(function (fulfill, reject) {
                var rp = require('request-promise-native');
                // TODO: implement

            /*let LOP = [];

            var zipFile = new JSZip();

            var jsZipObject = zipFile.file(content);*/

           /* for (let i of jsZipObject) {
                LOP.push(rp(i));
            }*/

            var fs = require('fs');
            var JSZip = require('jszip');

            new JSZip.external.Promise(function (resolve, reject) {

                fs.readFile(content, function (err, data) {

                    if (err){
                        reject(err);

                    }else{
                        resolve(data);
                    }

                });

            }).then(function (data) {
                return JSZip.loadAsync(data);

            });


          /*  fs.readFile(content, function (err:any, data:any) {
                if (err) throw err;
                JSZip.loadAsync(data).then(function (zip) {


                });

            })*/

           /* zipFile.loadAsync(content)
                .then*/

/*
            Promise.all(LOP)
                .then( function(urls: string[]) {

                    let jsonList = [];

                    for (let url of urls) {
                        try {
                            let jsonObject = JSON.parse(url);
                            //if (isEmpty(jsonObject)) reject('Error: No number was provided');
                            jsonList.push(jsonObject);
                        } catch (err) {
                            reject('Error: Could not parse JSON');
                        }}


            fulfill();*/
            });

    }

    removeDataset(id: string): Promise<InsightResponse> {
        return null;
    }

    performQuery(query: QueryRequest): Promise <InsightResponse> {
        return null;
    }
}
