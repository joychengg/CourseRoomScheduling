import Log from "../Util";
import {QueryRequest} from "../controller/IInsightFacade";
import {isArray} from "util";

export default class QueryClassMeth {

    constructor() {
        Log.trace('QueryClassMeth::init()');
    }


    gt_expr (course:any, key:string, number:number):boolean {
        return (course[key] > number);
    }

    lt_expr (course:any, key:string, number:number):boolean {
        return (course[key] < number);
    }

    eq_expr (course:any, key:string, number:number):boolean {
        return (course[key] === number);
    }

    is_expr(course:any, key:string, value:string):boolean {
        return (course[key] === value);
    }

    not_expr (filter:boolean):boolean {
        return !filter;
    }

    and_expr (filter:boolean, ...filter2:boolean[]):boolean{

        for (var i = 0, fn2; fn2 = filter2[i]; i++) {
            if (!(filter && fn2)) return false;
        }

        return true;
    }

    or_expr(filter:boolean, ...filter2:boolean[]):boolean{

        if (filter) return true;

        for (var i = 0, fn2; fn2 = filter2[i]; i++) {
            if (fn2) return true;
        }

        return false;
    }

    // checkKey(input:any): boolean {
    //
    //  //   var keyOf = Object.keys(input)[0];
    //     var length = Object.keys(input).length;
    //
    //     for (var k = 0; k < length; k++) {
    //
    //         var key1 = Object.keys(input)[k];
    //
    //     if (!(key1 === ("GT" || "OR" || "AND" || "LT" || "EQ" || "IS" || "NOT"))) {
    //         return false;
    //     } else {
    //         if (isArray(input[k])) {
    //             this.checkKey(input[k]);
    //         }else{
    //             var key2 = Object.keys(input[k])[0];
    //
    //             if (!(key2==="courses_avg" || "courses_dept" ||
    //                 "courses_id" || "courses_instructor" || "courses_title" || "courses_pass" || "courses_fail"
    //                 || "courses_audit" || "courses_uuid")){
    //                 return false;
    //             }
    //
    //         }
    //     }
    // }
    //
    //     return true;
    // }

    methodKey1 (input: string):string{

        var output: string = '';

            if (input === 'courses_avg') {
                return output = 'Avg';
            } else if (input === 'courses_pass') {
                return output = 'Pass';
            } else if (input === 'courses_fail') {
                return output = 'Fail';
            } else if (input === 'courses_audit') {
                return output = 'Audit';
            }

            throw new Error ("invalid key");

    }

    methodKey2 (input: string):string{

        var output: string = '';

        if (input === 'courses_dept') {
            return output = 'Subject';
        } else if (input === 'courses_id') {
            return output = 'Course';
        } else if (input === 'courses_instructor') {
            return output = 'Professor';
        } else if (input === 'courses_title') {
            return output = 'Title';
        } else if (input === 'courses_uuid') {
            return output = 'id';
        }

        throw new Error ("invalid key");

    }

    methodKey3 (input: string):string{

        var output: string = '';

        if (input === 'courses_dept') {
            return output = 'Subject';
        } else if (input === 'courses_id') {
            return output = 'Course';
        } else if (input === 'courses_instructor') {
            return output = 'Professor';
        } else if (input === 'courses_title') {
            return output = 'Title';
        } else if (input === 'courses_uuid') {
            return output = 'id';
        }else if(input === 'courses_avg') {
            return output = 'Avg';
        } else if (input === 'courses_pass') {
            return output = 'Pass';
        } else if (input === 'courses_fail') {
            return output = 'Fail';
        } else if (input === 'courses_audit') {
            return output = 'Audit';
        }

        throw new Error ("invalid key");

    }

    isJson(str:any):boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }


    Filter (input:any, course:any ): boolean{



            var key = Object.keys(input)[0];

            if (key === "GT") {

                var key1 = Object.keys(input.GT);

                return this.gt_expr(course, this.methodKey1(key1[0]), input.GT[key1[0]]);

            }

            if (key === "LT") {
                var key1 = Object.keys(input.LT);

                return this.lt_expr(course, this.methodKey1(key1[0]), input.LT[key1[0]]);
            }

            if (key === "EQ") {
                var key1 = Object.keys(input.EQ);
                return this.eq_expr(course, this.methodKey1(key1[0]), input.EQ[key1[0]]);
            }

            if (key === "IS") {
                var key1 = Object.keys(input.IS);
                return this.is_expr(course, this.methodKey2(key1[0]), input.IS[key1[0]]);
            }

            if (key === "AND") {
                var exprs = input.AND;

                for (let key of exprs) {

                    if (!this.Filter(key, course)) return false;

                }
                return true;

            }

            if (key === "OR") {
                var exprs = input.OR;

                for (let key of exprs) {

                    if (this.Filter(key, course)) return true;

                }
                return false;

            }


            if (key === "NOT") {

                var exprs = input.NOT;

                if (this.Filter(exprs, course)) {
                    return false;
                } else {
                    return true;

                }
            }

            throw new Error ("invalid key");


    }

    Combine(course:any, input_option:any) {

            var column = Object.keys(input_option)[0];

            var order = Object.keys(input_option)[1];

            var result: any = {};

            var miss = [];


                for (var i = 0; i < input_option[column].length; i++) {

                    for (var c = 0; c < Object.keys(course).length; c++) {


                        if (this.methodKey3(input_option[column][i]) === Object.keys(course)[c]) {

                            result[input_option[column][i]] = course[Object.keys(course)[c]];
                        }

                        // }else{
                        //     miss[c] = input_option[column][i];
                        //
                        // }

                    }


                }

                return result;


        //     console.log("miss  "+miss);
        //
        // if (miss!=null) {
        //     return result;
        // }else{
        //     return miss;
        // }

    }




}
