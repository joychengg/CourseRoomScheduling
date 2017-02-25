/**
 * Created by joycheng on 2017-02-15.
 */
import Log from "../Util";
import {QueryRequest} from "../controller/IInsightFacade";
import {isArray} from "util";
import {isNumber} from "util";
import {isString} from "util";
import {isNullOrUndefined} from "util";



export default class QueryClassMethRoom {

    constructor() {
        Log.trace('QueryClassMethRoom::init()');
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

        if ((value[0]==="*")&&(value.length===1)) {

            return true;

        }else if ((value[0]==="*") && (value[value.length-1] === "*")) {

            var newValue = value.substring(1,value.length-1);
            return this.checkPartial(course[key], newValue);


        }else if(value[0] === "*") {

            var newValue = value.substring(1,value.length);

            var ValueToCompare = course[key].substring(course[key].length - value.length + 1, course[key].length);

            if (ValueToCompare.toString() === newValue) return true;
            return false;

        }else if(value[value.length-1] === "*") {

            var newValue = value.substring(0,value.length-1);

            if (course[key].substring(0,newValue.length) === newValue) return true;
            return false;

        }else{
            return (course[key] === value);
        }
    }




    checkTypeMath(input_key:any, input_value:any): boolean{

        if((input_key === "rooms_lat")&&(typeof(input_value)==="number")){
            return true;
        }else if((input_key === "rooms_lon")&&(typeof(input_value)==="number")){
            return true;
        }else if((input_key === "rooms_seats")&&(typeof(input_value)==="number")){
            return true;
        }
        else {

            throw new Error;
        }
    }

    checkTypeString(input_key:any, input_value:any): boolean{

        if((input_key === "rooms_fullname") && (typeof(input_value)==="string")) {
            return true;
        }else if((input_key === "rooms_shortname") && (typeof(input_value)==="string")) {
            return true;
        }else if((input_key === "rooms_number") && (typeof(input_value)==="string")) {
            return true;
        }else if((input_key === "rooms_name") && (typeof(input_value)==="string")) {
            return true;
        }else if((input_key === "rooms_address") && (typeof(input_value)==="string")) {
            return true;
        }else if((input_key === "rooms_type") && (typeof(input_value)==="string")) {
            return true;
        }else if((input_key === "rooms_furniture") && (typeof(input_value)==="string")) {
            return true;
        }else if((input_key === "rooms_lat") && (typeof(input_value)==="number")) {
            return true;
        }else if((input_key === "rooms_lon") && (typeof(input_value)==="number")) {
            return true;
        }else if((input_key === "rooms_seats") && (typeof(input_value)==="number")) {
            return true;
        }else if((input_key === "rooms_href") && (typeof(input_value)==="string")) {
            return true;
        }else{
            throw new Error;
        }
    }


    checkPartial(inputA:string, inputB:string):boolean{
        if( inputA.search(inputB) > -1){
            return true;
        }
        return false;
    }



    Filter (input:any, room:any ): boolean {

        var key = Object.keys(input)[0];

        if (key === "GT") {

            var key1 = Object.keys(input.GT);

            this.checkTypeMath(key1[0], input.GT[key1[0]]);


            return this.gt_expr(room, key1[0], input.GT[key1[0]]);

        } else if (key === "LT") {

            var key1 = Object.keys(input.LT);

            this.checkTypeMath(key1[0], input.LT[key1[0]]);


            return this.lt_expr(room, key1[0], input.LT[key1[0]]);

        } else if (key === "EQ") {

            var key1 = Object.keys(input.EQ);

            this.checkTypeMath(key1[0], input.EQ[key1[0]]);


            return this.eq_expr(room, key1[0], input.EQ[key1[0]]);

        } else if (key === "IS") {

            var key1 = Object.keys(input.IS);

            this.checkTypeString(key1[0], input.IS[key1[0]]);

            if (key1[0]==="rooms_name"){

                var front = input.IS[key1[0]].substring( 0, input.IS[key1[0]].indexOf("_"));
                var back = input.IS[key1[0]].substring(input.IS[key1[0]].indexOf("_")+1);


                return ((this.is_expr(room, "rooms_shortname", front))&&(this.is_expr(room, "rooms_number", back)));
            }else {

                return this.is_expr(room, key1[0], input.IS[key1[0]]);
            }


        } else if (key === "AND") {
            var exprs = input.AND;

            for (let key of exprs) {

                if (!this.Filter(key, room)) return false;

            }
            return true;

        } else if (key === "OR") {
            var exprs = input.OR;

            for (let key of exprs) {

                if (this.Filter(key, room)) return true;

            }
            return false;

        } else if (key === "NOT") {

            var exprs = input.NOT;

            if (this.Filter(exprs, room)) {
                return false;
            } else {
                return true;

            }
        } else{

            throw new Error;        }
    }


    Combine(room:any, input_option:any) {

        var column = Object.keys(input_option)[0];

        var result: any = {};


        for (var i = 0; i < input_option[column].length; i++) {

            for (var c = 0; c < Object.keys(room).length; c++) {


                if (input_option[column][i] === Object.keys(room)[c]) {
                        result[input_option[column][i]] = room[Object.keys(room)[c]];
              }
            }
        }


        return result;

    }
}
