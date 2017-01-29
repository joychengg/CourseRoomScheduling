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

    not_expr (filter:Function):boolean {
        return !filter;
    }

    and_expr (filter:Function, ...filter2:Function[]):boolean{

        for (var i = 0, fn2; fn2 = filter2[i]; i++) {
            if (!(filter && fn2)) return false;
        }

        return true;
    }

    or_expr(filter:Function, ...filter2:Function[]):boolean{

        if (filter) return true;

        for (var i = 0, fn2; fn2 = filter2[i]; i++) {
            if (fn2) return true;
        }

        return false;
    }



    // function traverse(o,func) {
    //     for (var i in o) {
    //         func.apply(this,[i,o[i]]);
    //         if (o[i] !== null && typeof(o[i])=="object") {
    //             //going on step down in the object tree!!
    //             traverse(o[i],func);
    //         }
    //     }
    // }

    Filter (input:any, course:any ): boolean{

        if (input.key === "GT"){

            return this.gt_expr(course, input.GT[0].key, input.GT[0][input.GT[0].key]);
        }

        if (input.key === "LT"){

            return this.lt_expr(course, input.LT[0].key, input.LT[0][input.LT[0].key]);
        }

        if (input.key === "EQ"){

            return this.eq_expr(course, input.EQ[0].key, input.EQ[0][input.EQ[0].key]);
        }

        if (input.key === "IS"){

            return this.is_expr(course, input.IS[0].key, input.IS[0][input.IS[0].key]);
        }

        if (input.key === "AND") {
            var exprs = input.AND;





        }







        return true;


    }






}
