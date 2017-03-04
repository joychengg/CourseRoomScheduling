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
        if (key === "Year") {
            return (parseInt(course[key]) === number);
        }
        else{
        return (course[key] === number);}
    }

    is_expr(course:any, key:string, value:string):boolean {

        if ((value[0]==="*") && (value[value.length-1] === "*")) {

            var newValue = value.substring(1,value.length-1);
            return this.checkPartial(course[key], newValue);

        }else if(value[0] === "*") {

            var newValue = value.substring(1,value.length);

            if (course[key].substring(course[key].length - value.length + 1, course[key].length) === newValue) return true;
            return false;

        }else if(value[value.length-1] === "*") {

            var newValue = value.substring(0,value.length-1);

            if (course[key].substring(0,newValue.length) === newValue) return true;
            return false;

        }else{
            return (course[key] === value);
        }
    }


    methodKey1 (input: string):string{


        if (input === 'courses_avg') {
            return 'Avg';
        } else if (input === 'courses_pass') {
            return 'Pass';
        } else if (input === 'courses_fail') {
            return 'Fail';
        } else if (input === 'courses_audit') {
            return 'Audit';
        } else if(input === 'courses_year') {
            return 'Year';
        }

    }

    methodKey2 (input: string):string{


        if (input === 'courses_dept') {
            return 'Subject';
        } else if (input === 'courses_id') {
            return 'Course';
        } else if (input === 'courses_instructor') {
            return 'Professor';
        } else if (input === 'courses_title') {
            return 'Title';
        } else if (input === 'courses_uuid') {
            return  'id';
        }


    }

    methodKey3 (input: string):string{


        if (input === 'courses_dept') {
            return 'Subject';
        } else if (input === 'courses_id') {
            return 'Course';
        } else if (input === 'courses_instructor') {
            return 'Professor';
        } else if (input === 'courses_title') {
            return 'Title';
        } else if (input === 'courses_uuid') {
            return 'id';
        }else if(input === 'courses_avg') {
            return 'Avg';
        } else if (input === 'courses_pass') {
            return 'Pass';
        } else if (input === 'courses_fail') {
            return 'Fail';
        } else if (input === 'courses_audit') {
            return 'Audit';
        } else if(input === 'courses_year') {
            return 'Year';
        }


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


        if ((input_key==="courses_audit")&&(typeof(input_value)==="number")) {
            return true;
        }else if ((input_key === "courses_avg")&&(typeof(input_value)==="number")){
            return true;

        }else if((input_key === "courses_pass")&&(typeof(input_value)==="number")){
            return true;
        }else if((input_key === "courses_fail")&&(typeof(input_value)==="number")){
            return true;
        }else if((input_key === "courses_year")&&(typeof(input_value)==="number")){
            return true;
        }
        else {

            throw new Error;
        }
    }

    checkTypeString(input_key:any, input_value:any): boolean{

        if ((input_key==="courses_dept")&&(typeof(input_value)==="string")) {
            return true;
        }else if ((input_key === "courses_id")&&(typeof(input_value)==="string")){
            return true;
        }else if((input_key === "courses_instructor")&&(typeof(input_value)==="string")){
            return true;
        }else if((input_key === "courses_title")&&(typeof(input_value)==="string")){
            return true;
        }else if((input_key === "courses_uuid")&&(typeof(input_value)==="string")){
            return true;
        }else{
            throw new Error;
        }
    }

    checkKey(key:string) {
        if ((key === "courses" )|| (key === "rooms")){

            return true;

        }else{

            return false;

        }
    }


    checkPartial(inputA:string, inputB:string):boolean{
        if( inputA.search(inputB) > -1){
            return true;
        }

        return false;
    }

    checkSection(courses:any):boolean{
        if (courses['Section']==="overall"){
            return true;
        }else{
            return false;
        }

    }



    Filter (input:any, course:any ): boolean {

        var key = Object.keys(input)[0];

        if (key === "GT") {

            var key1 = Object.keys(input.GT);

            this.checkTypeMath(key1[0], input.GT[key1[0]]);

            if(key1[0] === "courses_year"){

               if(this.checkSection(course)){

                   return (1900 > input.GT[key1[0]]);
               }else{
                   return this.gt_expr(course, this.methodKey1(key1[0]), input.GT[key1[0]]);
               }

            }
            return this.gt_expr(course, this.methodKey1(key1[0]), input.GT[key1[0]]);

        } else if (key === "LT") {

            var key1 = Object.keys(input.LT);

            this.checkTypeMath(key1[0], input.LT[key1[0]]);

            if(key1[0] === "courses_year"){

                if(this.checkSection(course)){

                    return (1900 < input.LT[key1[0]]);
                }else{
                    return this.lt_expr(course, this.methodKey1(key1[0]), input.LT[key1[0]]);
                }

            }

            return this.lt_expr(course, this.methodKey1(key1[0]), input.LT[key1[0]]);

        } else if (key === "EQ") {

            var key1 = Object.keys(input.EQ);

            this.checkTypeMath(key1[0], input.EQ[key1[0]]);

            if(key1[0] === "courses_year"){

                if(this.checkSection(course)){

                    return (input.EQ[key1[0]]===1900);
                }else{
                    return this.eq_expr(course, this.methodKey1(key1[0]), input.EQ[key1[0]]);
                }

            }
            return this.eq_expr(course, this.methodKey1(key1[0]), input.EQ[key1[0]]);

        } else if (key === "IS") {

            var key1 = Object.keys(input.IS);

            this.checkTypeString(key1[0], input.IS[key1[0]]);

            if (key1[0] === 'courses_uuid'){

                return this.is_expr(course, this.methodKey2(key1[0]), input.IS[key1[0]].toString());

            }else {
                return this.is_expr(course, this.methodKey2(key1[0]), input.IS[key1[0]]);
            }

        } else if (key === "AND") {
            var exprs = input.AND;

            for (let key of exprs) {

                if (!this.Filter(key, course)) return false;

            }
            return true;

        } else if (key === "OR") {
            var exprs = input.OR;

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
        } else{

            throw new Error;
        }
    }


    Combine(course:any, input_option:any) {

        var column = Object.keys(input_option)[0];

        var result: any = {};


        for (var i = 0; i < input_option[column].length; i++) {

            for (var c = 0; c < Object.keys(course).length; c++) {
                if ((course["Section"] === "overall") && (input_option[column][i] === "courses_year")){
                    result[input_option[column][i]] = 1900;
                }

                if (this.methodKey3(input_option[column][i]) === Object.keys(course)[c]) {
                    if (input_option[column][i] === "courses_year"){


                        result[input_option[column][i]] = parseInt(course[Object.keys(course)[c]]);
                    }
                    else{

                        result[input_option[column][i]] = course[Object.keys(course)[c]];
                    }
                }
            }}


        return result;

    }


    CombinewithApply(course:any, input_option:any) {

        var group = Object.keys(input_option)[0];

        var result: any = {};

        var finalResult: any = {};


        for (var i = 0; i < input_option[group].length; i++) {

            for (var c = 0; c < Object.keys(course).length; c++) {
                if ((course["Section"] === "overall") && (input_option[group][i] === "courses_year")){
                    result[input_option[group][i]] = 1900;
                }

                if (this.methodKey3(input_option[group][i]) === Object.keys(course)[c]) {
                    if (input_option[group][i] === "courses_year"){


                        result[input_option[group][i]] = parseInt(course[Object.keys(course)[c]]);
                    }
                    else{

                        result[input_option[group][i]] = course[Object.keys(course)[c]];
                    }
                }
            }
        }


        //result = [result1,result2...etc]
        //each result in result = {group1:value, group2:value...etc}

        for (var r of result){




        }

        var apply = Object.keys(input_option)[1];

        for (var i = 0; i < input_option[apply].length; i++) {

            var keyinApply = input_option[apply][i];

            if (Object.keys(keyinApply)[0] === "MAX"){


            }else if (Object.keys(keyinApply)[0] === "MIN"){


            }else if (Object.keys(keyinApply)[0] === "AVG"){


            }else if (Object.keys(keyinApply)[0] === "SUM"){


            }else if (Object.keys(keyinApply)[0] === "COUNT"){


            }

        }


        return result;

    }
}
