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

    Filter (input:any, course:any ): boolean{

        var key = Object.keys(input)[0];

        if (key === "GT"){

            return this.gt_expr(course, Object.keys(input.GT[0])[0], input.GT[0][input.GT[0].key]);
        }

        if (key === "LT"){

            return this.lt_expr(course, input.LT[0].key, input.LT[0][input.LT[0].key]);
        }

        if (key === "EQ"){

            return this.eq_expr(course, input.EQ[0].key, input.EQ[0][input.EQ[0].key]);
        }

        if (key === "IS"){

            return this.is_expr(course, input.IS[0].key, input.IS[0][input.IS[0].key]);
        }

        if (key === "AND") {
            var exprs = input.AND;

            for (let key of exprs) {

                if (!this.Filter(key,course)) return false;

            }
            return true;

        }

        if (key === "OR") {
            var exprs = input.OR;

            for (let key of exprs) {

                if(this.Filter(key, course)) return true;

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

    }






}
