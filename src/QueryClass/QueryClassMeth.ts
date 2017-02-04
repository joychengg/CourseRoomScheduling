import Log from "../Util";
import {QueryRequest} from "../controller/IInsightFacade";
import {isArray} from "util";
import {isNumber} from "util";
import {isString} from "util";
import {isNullOrUndefined} from "util";

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


    methodKey1 (input: string):string{

        var output: string = '';

        if (!this.checkKey(input.slice(0,6))) throw new Error ("invalid check key");

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

        if (!this.checkKey(input.slice(0,6))) throw new Error ("invalid check key");

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

        if (!this.checkKey(input.slice(0,6))) throw new Error ("invalid check key");

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


    checkTypeMath(input_key:any, input_value:any): boolean{

    if (input_key===("courses_avg"||"courses_pass"||"courses_fail"||"courses_audit")&&isNumber(input_value))
        return true;
    else throw new Error;

    }

    checkTypeString(input_key:any, input_value:any): boolean{

        if (input_key===("courses_dept"||"courses_id"||"courses_instructor"||"courses_title"
            ||"courses_uuid")&&isString(input_value))
            return true;
        else throw new Error;
    }

    checkKey(key:string):boolean {
        if (key === "course") return true;

        throw new Error("invalid check key");
    }


    Filter (input:any, course:any ): boolean {

        var key = Object.keys(input)[0];

            if (key === "GT") {

                var key1 = Object.keys(input.GT);

                this.checkKey(key1[0].slice(0, 6));
                this.checkTypeMath(key1[0], input.GT[key1[0]]);

                return this.gt_expr(course, this.methodKey1(key1[0]), input.GT[key1[0]]);

            } else if (key === "LT") {

                var key1 = Object.keys(input.LT);

                this.checkKey(key1[0].slice(0, 6));
                this.checkTypeMath(key1[0], input.LT[key1[0]]);
                return this.lt_expr(course, this.methodKey1(key1[0]), input.LT[key1[0]]);

            } else if (key === "EQ") {

                var key1 = Object.keys(input.EQ);

                this.checkKey(key1[0].slice(0, 6));
                this.checkTypeMath(key1[0], input.EQ[key1[0]]);
                return this.eq_expr(course, this.methodKey1(key1[0]), input.EQ[key1[0]]);

            } else if (key === "IS") {

                var key1 = Object.keys(input.IS);

                this.checkKey(key1[0].slice(0, 6));
                this.checkTypeString(key1[0], input.IS[key1[0]]);
                return this.is_expr(course, this.methodKey2(key1[0]), input.IS[key1[0]]);

            } else if (key === "AND") {
                var exprs = input.AND;

                if (input.AND.length === 0) throw new Error;

                for (let key of exprs) {

                    if (!this.Filter(key, course)) return false;

                }
                return true;

            } else if (key === "OR") {
                var exprs = input.OR;

                if (input.OR.length === 0) throw new Error;

                for (let key of exprs) {

                    if (this.Filter(key, course)) return true;

                }
                return false;

            } else if (key === "NOT") {

                var exprs = input.NOT;

                if (this.Filter(exprs, course)) {
                    return false;
                } else {
                    return true;

                }
            } else {
                throw new Error;

            }
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

                    }


                }

                return result;


    }




}
