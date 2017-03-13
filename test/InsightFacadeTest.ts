/**
 * Created by joycheng on 2017-01-19.
 */
/**
 * Created by rtholmes on 2016-10-31.
 */

import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import warn from "../src/Util";
import error from "../src/Util";
import {InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";

import fs = require("fs");
import {Response} from "restify";
import chai = require('chai');
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

var zipStuff: any = null;
var inValidZip: any = null;
var wrongZip: any = null;

var invalidFile = Buffer.from(fs.readFileSync("./test.png")).toString('base64');
var roomFile = Buffer.from(fs.readFileSync("./rooms.zip")).toString('base64');
var Serv1 = new Server(8888);
var noResultZip: any = Buffer.from(fs.readFileSync("./noResultJson.zip")).toString('base64');
var insightFacade: InsightFacade = null;
var queryRequest: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var queryRequest2: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};
var queryRequest3: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};
var queryRequest4: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var queryRequest5: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};


var queryRequest6: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};


var queryRequest8: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var NitroQuery: QueryRequest = {

    WHERE: {"AND":
        [
            {
                "IS": {"rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"}
            }
            , {"IS": {"rooms_type" : "*Group*"}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_lat", "rooms_furniture", "rooms_type"
        ],

        "ORDER" : "rooms_type",

        "FORM": "TABLE"
    }

};

var roomforCover: QueryRequest = {

    WHERE: {"AND":
        [
            {
                "IS": {"rooms_furniture": "*Classroom-Fixed Tables/Movable Chairs"}
            }
            , {"IS": {"rooms_number" : "301"}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_lat", "rooms_furniture", "rooms_type"
        ],

        "ORDER" : "rooms_type",

        "FORM": "TABLE"
    }

};

var roomforCover2: QueryRequest = {

    WHERE: {"AND":
        [
            {
                "IS": {"rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"}
            }
            , {"IS": {"rooms_type" : "Small*"}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_lat", "rooms_furniture", "rooms_type"
        ],

        "ORDER" : "rooms_type",

        "FORM": "TABLE"
    }

};

var roomforcover3: QueryRequest = {

    WHERE: {"AND":
        [
            {
                "IS": {"rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"}
            }
            , {"LT": {"rooms_seats" : 80}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_lat", "rooms_furniture", "rooms_type"
        ],

        "FORM": "TABLE"
    }

};

var roomWithApply: QueryRequest = {

    WHERE: {
    "AND": [{
        "IS": {
            "rooms_furniture": "*Tables*"
        }
    }, {
        "GT": {
            "rooms_seats": 100
        }
    }]
},
    OPTIONS: {
    "COLUMNS": [
        "rooms_fullname",
        "maxSeats", "sumSeats", "countSeats"
    ],
        "ORDER": {
        "dir": "DOWN",
            "keys": ["rooms_fullname"]
    },
    "FORM": "TABLE"
},
    TRANSFORMATIONS: {
    "GROUP": ["rooms_fullname"],
        "APPLY": [{
        "maxSeats": {
            "MAX": "rooms_seats"
        }
    },
        {"sumSeats":{
            "SUM":"rooms_seats"
        }
        },
            {
                "countSeats":{
                    "COUNT":"rooms_seats"}
            }
        ]
}

};



var SumResult = {"render":"TABLE","result":[{"courses_instructor":"","totalStudents":261786},{"courses_instructor":"smulders, dave","totalStudents":1013},{"courses_instructor":"palacios, carolina","totalStudents":826},{"courses_instructor":"walker, judith","totalStudents":239},{"courses_instructor":"regmi, kapil","totalStudents":98},{"courses_instructor":"crisfield, erin","totalStudents":146},{"courses_instructor":"elfert, maren","totalStudents":33},{"courses_instructor":"chan, jennifer","totalStudents":142},{"courses_instructor":"vanwynsberghe, robert","totalStudents":118},{"courses_instructor":"bishundayal, deonarine","totalStudents":1314},{"courses_instructor":"aijazi, omer","totalStudents":36},{"courses_instructor":"palacios, carolina;sork, thomas joda","totalStudents":12},{"courses_instructor":"wilson, mary","totalStudents":39},{"courses_instructor":"butterwick, shauna;jubas, kaela","totalStudents":24},{"courses_instructor":"falk, clifford","totalStudents":365},{"courses_instructor":"alimohammadi, majid","totalStudents":2332},{"courses_instructor":"ford, donna","totalStudents":86},{"courses_instructor":"vogl, a wayne","totalStudents":62},{"courses_instructor":"krebs, claudia","totalStudents":121},{"courses_instructor":"barker, john","totalStudents":149},{"courses_instructor":"bloch, alexia","totalStudents":570},{"courses_instructor":"carrier-moisan, marie-eve","totalStudents":61},{"courses_instructor":"nitsan, tal","totalStudents":43},{"courses_instructor":"creighton, millie","totalStudents":611},{"courses_instructor":"moore, patrick","totalStudents":542},{"courses_instructor":"gessner, suzanne","totalStudents":528},{"courses_instructor":"muehlmann, shaylih","totalStudents":415},{"courses_instructor":"malone, molly","totalStudents":127},{"courses_instructor":"menzies, charles","totalStudents":358},{"courses_instructor":"solomonian, adam","totalStudents":141},{"courses_instructor":"brown, kimberly","totalStudents":34},{"courses_instructor":"small, robert","totalStudents":261},{"courses_instructor":"kamat, vinay ramnath","totalStudents":404},{"courses_instructor":"wainer, rafael","totalStudents":318},{"courses_instructor":"mckellin, william","totalStudents":326},{"courses_instructor":"condin, christopher","totalStudents":46},{"courses_instructor":"marsh, diana","totalStudents":25},{"courses_instructor":"gordon-walker, caitlin","totalStudents":38},{"courses_instructor":"levell, nicola","totalStudents":131},{"courses_instructor":"wagelie, jennifer","totalStudents":50},{"courses_instructor":"geary, david","totalStudents":25},{"courses_instructor":"shneiderman, sara","totalStudents":44},{"courses_instructor":"thobani, sitara","totalStudents":76},{"courses_instructor":"ryniker, david","totalStudents":25},{"courses_instructor":"robertson, leslie","totalStudents":153},{"courses_instructor":"miller, bruce","totalStudents":124},{"courses_instructor":"campbell, alice","totalStudents":209},{"courses_instructor":"wolowic, jennifer","totalStudents":32},{"courses_instructor":"wyndham, felice","totalStudents":67},{"courses_instructor":"pokotylo, david","totalStudents":401},{"courses_instructor":"swierenga, heidi","totalStudents":42},{"courses_instructor":"blake, thomas michael;miller, bruce","totalStudents":11},{"courses_instructor":"mckellin, william;miller, bruce","totalStudents":20},{"courses_instructor":"gordillo, gaston","totalStudents":20},{"courses_instructor":"rosenblum, daisy","totalStudents":10},{"courses_instructor":"bell, kirsten","totalStudents":10},{"courses_instructor":"jing, zhichun","totalStudents":166},{"courses_instructor":"blake, thomas michael","totalStudents":54},{"courses_instructor":"shelton, anthony","totalStudents":38},{"courses_instructor":"hilmer, martin","totalStudents":269},{"courses_instructor":"fortin, marie-claude","totalStudents":98},{"courses_instructor":"krzic, maja","totalStudents":836},{"courses_instructor":"brown, sandra","totalStudents":659},{"courses_instructor":"ellis, shona margaret","totalStudents":596},{"courses_instructor":"ellis, shona margaret;graham, sean","totalStudents":523},{"courses_instructor":"black, thomas andrew;christen, andreas","totalStudents":407},{"courses_instructor":"black, thomas andrew;stewart, iain","totalStudents":54},{"courses_instructor":"smukler, sean","totalStudents":105},{"courses_instructor":"bomke, arthur a;mcarthur, david","totalStudents":61},{"courses_instructor":"mcarthur, david;smukler, sean","totalStudents":34},{"courses_instructor":"mcarthur, david","totalStudents":204},{"courses_instructor":"lewis, delisa","totalStudents":51},{"courses_instructor":"lewis, delisa ann","totalStudents":50},{"courses_instructor":"burnett, tracy;silper, bruna","totalStudents":43},{"courses_instructor":"rajamahendran, rajadurai","totalStudents":392},{"courses_instructor":"cerri, ronaldo","totalStudents":78},{"courses_instructor":"fraser, david;von keyserlingk, marina","totalStudents":473},{"courses_instructor":"fraser, david;ormandy, elisabeth","totalStudents":17},{"courses_instructor":"ormandy, elisabeth","totalStudents":77},{"courses_instructor":"fraser, david;walker, kristen","totalStudents":20},{"courses_instructor":"fraser, david;weary, daniel","totalStudents":319},{"courses_instructor":"fraser, david","totalStudents":118},{"courses_instructor":"schuppli, catherine","totalStudents":104},{"courses_instructor":"burton, bruce a","totalStudents":20},{"courses_instructor":"justice, douglas","totalStudents":176},{"courses_instructor":"cronk, quentin charles","totalStudents":233},{"courses_instructor":"cronk, quentin charles;ellis, shona margaret","totalStudents":45},{"courses_instructor":"akhtar, yasmin","totalStudents":935},{"courses_instructor":"upadhyaya, mahesh","totalStudents":321},{"courses_instructor":"stopps, gregory j","totalStudents":50},{"courses_instructor":"chanway, christopher","totalStudents":305},{"courses_instructor":"mansfield, shawn;singh, santokh","totalStudents":213},{"courses_instructor":"mansfield, shawn;singh, santokh;upadhyaya, mahesh","totalStudents":9},{"courses_instructor":"mansfield, shawn","totalStudents":150},{"courses_instructor":"cowan, shannon","totalStudents":189},{"courses_instructor":"von keyserlingk, marina;weary, daniel","totalStudents":64},{"courses_instructor":"von keyserlingk, marina","totalStudents":19},{"courses_instructor":"makowska, inez joanna","totalStudents":17},{"courses_instructor":"brown, sandra;krzic, maja","totalStudents":127},{"courses_instructor":"bomke, arthur a","totalStudents":18},{"courses_instructor":"brown, sandra;grayston, susan;krzic, maja","totalStudents":51},{"courses_instructor":"brown, sandra;grayston, susan;novak, mike david","totalStudents":12},{"courses_instructor":"brown, sandra;mcarthur, david;novak, mike david","totalStudents":7},{"courses_instructor":"walker, kristen","totalStudents":135},{"courses_instructor":"ackerman, paige adrienne","totalStudents":182},{"courses_instructor":"kronstad, james","totalStudents":93},{"courses_instructor":"li, xin","totalStudents":108},{"courses_instructor":"castellarin, simone","totalStudents":8},{"courses_instructor":"sullivan, thomas priestlay","totalStudents":660},{"courses_instructor":"tba","totalStudents":5750},{"courses_instructor":"bennett, darin","totalStudents":23},{"courses_instructor":"mckinley, r scott","totalStudents":4},{"courses_instructor":"rushen, jeffrey","totalStudents":21},{"courses_instructor":"page, tracy","totalStudents":125},{"courses_instructor":"etmannski, tamara","totalStudents":476},{"courses_instructor":"prowse, robert","totalStudents":510},{"courses_instructor":"begg, iain","totalStudents":42},{"courses_instructor":"ellis, naoko;fernlund, goran;jaeger, carol patricia;nakane, jonathan;nazhat, yahya;nesbit, susan;ostafichuk, peter;yadav, vikramaditya;yan, joseph","totalStudents":573},{"courses_instructor":"ellis, naoko;fernlund, goran;jaeger, carol patricia;nakane, jonathan;ostafichuk, peter;yadav, vikramaditya","totalStudents":237},{"courses_instructor":"ellis, naoko;fernlund, goran;jaeger, carol patricia;nakane, jonathan;nesbit, susan;ostafichuk, peter;staub-french, sheryl;yan, joseph;yonemitsu, noboru","totalStudents":141},{"courses_instructor":"ellis, naoko;fernlund, goran;jaeger, carol patricia;nazhat, yahya;ostafichuk, peter;staub-french, sheryl;yadav, vikramaditya;yan, joseph;yonemitsu, noboru","totalStudents":171},{"courses_instructor":"ellis, naoko;fernlund, goran;jaeger, carol patricia;nakane, jonathan;ostafichuk, peter;staub-french, sheryl;yadav, vikramaditya","totalStudents":260},{"courses_instructor":"ellis, naoko;fernlund, goran;jaeger, carol patricia;nakane, jonathan;nazhat, yahya;nesbit, susan;ostafichuk, peter;staub-french, sheryl;yadav, vikramaditya;yan, joseph;yonemitsu, noboru","totalStudents":147},{"courses_instructor":"agharebparast, farshid","totalStudents":818},{"courses_instructor":"davies, paul;gelbart, michael","totalStudents":252},{"courses_instructor":"davies, paul;khosravi, hassan","totalStudents":215},{"courses_instructor":"khosravi, hassan;miller, gregor","totalStudents":309},{"courses_instructor":"berg, celina;miller, gregor","totalStudents":32},{"courses_instructor":"agharebparast, farshid;voll, kimberly","totalStudents":360},{"courses_instructor":"carter, paul martin;karim, faizal;knorr, edwin max","totalStudents":285},{"courses_instructor":"agharebparast, farshid;carter, paul martin","totalStudents":1633},{"courses_instructor":"agharebparast, farshid;eiselt, kurt","totalStudents":180},{"courses_instructor":"agharebparast, farshid;friedlander, michael","totalStudents":111},{"courses_instructor":"blazek, zeljko;knorr, edwin max","totalStudents":298},{"courses_instructor":"blazek, zeljko;carter, paul martin","totalStudents":278},{"courses_instructor":"agharebparast, farshid;knorr, edwin max","totalStudents":194},{"courses_instructor":"grant, david n;knorr, edwin max","totalStudents":323},{"courses_instructor":"agharebparast, farshid;khosravi, hassan","totalStudents":154},{"courses_instructor":"cooper, kendra;davies, paul;khosravi, hassan","totalStudents":429},{"courses_instructor":"knorr, edwin max;miller, gregor","totalStudents":164},{"courses_instructor":"cooper, kendra;miller, gregor","totalStudents":142},{"courses_instructor":"najarian, siamak","totalStudents":196},{"courses_instructor":"motavas, saloome","totalStudents":322},{"courses_instructor":"potvin, gabriel","totalStudents":216},{"courses_instructor":"derksen, ruth","totalStudents":840},{"courses_instructor":"kerr, randall","totalStudents":962},{"courses_instructor":"qi, hongxing estella","totalStudents":908},{"courses_instructor":"sanghara, hartaj","totalStudents":168},{"courses_instructor":"schoen, michael","totalStudents":904},{"courses_instructor":"kerr, randall;schoen, michael","totalStudents":57},{"courses_instructor":"qi, hongxing estella;schoen, michael","totalStudents":61},{"courses_instructor":"berndt, annette","totalStudents":939},{"courses_instructor":"teslenko, tatiana","totalStudents":789},{"courses_instructor":"altow, deborah","totalStudents":137},{"courses_instructor":"swail, brian","totalStudents":89},{"courses_instructor":"goldrick-jones, amanda","totalStudents":56},{"courses_instructor":"campbell, christopher david","totalStudents":56},{"courses_instructor":"schoen, michael;swail, brian","totalStudents":16},{"courses_instructor":"altow, deborah;schoen, michael","totalStudents":21},{"courses_instructor":"qi, hongxing estella;teslenko, tatiana","totalStudents":187},{"courses_instructor":"altow, deborah;berndt, annette;jaeger, carol patricia","totalStudents":37},{"courses_instructor":"lermitte, jan","totalStudents":86},{"courses_instructor":"rogalski, pamela","totalStudents":64},{"courses_instructor":"berndt, annette;jaeger, carol patricia;rogalski, pamela","totalStudents":33},{"courses_instructor":"bourne, michael","totalStudents":118},{"courses_instructor":"ollivier, kelly","totalStudents":27},{"courses_instructor":"ollivier, kelly;syed, abdul vali","totalStudents":30},{"courses_instructor":"mohseni, madjid;ollivier, kelly","totalStudents":12},{"courses_instructor":"paterson, carla","totalStudents":1371},{"courses_instructor":"winkelman, paul","totalStudents":307},{"courses_instructor":"kannangara, dhaneshwarie","totalStudents":575},{"courses_instructor":"hitch, michael","totalStudents":493},{"courses_instructor":"cockcroft, steven","totalStudents":646},{"courses_instructor":"poursartip, anoshiravan","totalStudents":892},{"courses_instructor":"poole, warren;poursartip, anoshiravan","totalStudents":511},{"courses_instructor":"fernlund, goran","totalStudents":854},{"courses_instructor":"xia, guangrui","totalStudents":874},{"courses_instructor":"poole, warren","totalStudents":160},{"courses_instructor":"ko, frank","totalStudents":337},{"courses_instructor":"wassink, berend","totalStudents":2972},{"courses_instructor":"reilly, carl","totalStudents":414},{"courses_instructor":"sens, allen;yedlin, matthew","totalStudents":178},{"courses_instructor":"basto da silva, rui jorge","totalStudents":906},{"courses_instructor":"mackinnon, ronald","totalStudents":1393},{"courses_instructor":"mills, dawn","totalStudents":1409},{"courses_instructor":"mills, dawn;taghipour, fariborz","totalStudents":837},{"courses_instructor":"grace, john ross","totalStudents":1118},{"courses_instructor":"dunbar, w scott","totalStudents":1979},{"courses_instructor":"altman, jonas;cubbon, paul;hodgson, antony;kruchten, philippe;simonite, james","totalStudents":75},{"courses_instructor":"kruchten, philippe","totalStudents":99},{"courses_instructor":"lawrence, peter","totalStudents":15},{"courses_instructor":"kruchten, philippe;lawrence, peter","totalStudents":30},{"courses_instructor":"hodgson, antony;kruchten, philippe","totalStudents":14},{"courses_instructor":"cubbon, paul;hodgson, antony;kruchten, philippe;simonite, james","totalStudents":50},{"courses_instructor":"cubbon, paul;etmannski, tamara;miller, david","totalStudents":82},{"courses_instructor":"cubbon, paul;hellmann, thomas","totalStudents":134},{"courses_instructor":"hellmann, thomas;sangha, pardeep;staub-french, sheryl","totalStudents":25},{"courses_instructor":"staub-french, sheryl","totalStudents":247},{"courses_instructor":"hellmann, thomas;lyons, mike","totalStudents":38},{"courses_instructor":"cubbon, paul;kruchten, philippe;miller, david","totalStudents":45},{"courses_instructor":"ghazi, bushra seemi yasmin","totalStudents":175},{"courses_instructor":"macdonald, christopher","totalStudents":305},{"courses_instructor":"millette, daniel m","totalStudents":213},{"courses_instructor":"soules, matthew","totalStudents":227},{"courses_instructor":"mckay, sherry","totalStudents":926},{"courses_instructor":"stevens, sara","totalStudents":63},{"courses_instructor":"watt, deborah","totalStudents":31},{"courses_instructor":"pechet, bill","totalStudents":290},{"courses_instructor":"johnson, gregory","totalStudents":1175},{"courses_instructor":"kim, edward sungho","totalStudents":56},{"courses_instructor":"flanders, david;satterfield, blair","totalStudents":84},{"courses_instructor":"mcdonald, ian ross","totalStudents":221},{"courses_instructor":"barton, michael;flanders, david;satterfield, blair","totalStudents":91},{"courses_instructor":"bass, john;gates, joanne;roecker, inge","totalStudents":59},{"courses_instructor":"bass, john;soules, matthew;vaughan, annabel","totalStudents":33},{"courses_instructor":"fujita, mari;pechet, bill;soules, matthew","totalStudents":30},{"courses_instructor":"bass, john;neumann, oliver;wagner, george stuart","totalStudents":37},{"courses_instructor":"bass, john;neumann, oliver;roecker, inge","totalStudents":27},{"courses_instructor":"gates, joanne;roecker, inge;satterfield, blair","totalStudents":32},{"courses_instructor":"bass, john;pechet, bill;satterfield, blair","totalStudents":35},{"courses_instructor":"gates, joanne;roecker, inge;wagner, george stuart","totalStudents":34},{"courses_instructor":"meyboom, annalisa","totalStudents":609},{"courses_instructor":"neumann, oliver","totalStudents":59},{"courses_instructor":"roecker, inge","totalStudents":225},{"courses_instructor":"robb, stephanie","totalStudents":8},{"courses_instructor":"dahmen, joseph","totalStudents":308},{"courses_instructor":"wakelin, brian;wall, john","totalStudents":44},{"courses_instructor":"fujita, mari;pechet, bill;satterfield, blair;vaughan, annabel","totalStudents":43},{"courses_instructor":"fujita, mari","totalStudents":172},{"courses_instructor":"wagner, george stuart","totalStudents":65},{"courses_instructor":"fujita, mari;neumann, oliver;patkau, patricia","totalStudents":48},{"courses_instructor":"lang, oliver;patkau, patricia;pechet, bill","totalStudents":32},{"courses_instructor":"condon, darryl","totalStudents":12},{"courses_instructor":"satterfield, blair","totalStudents":276},{"courses_instructor":"bass, john","totalStudents":224},{"courses_instructor":"robins, anthony","totalStudents":17},{"courses_instructor":"osborn, tony","totalStudents":10},{"courses_instructor":"dahmen, joseph;wagner, george stuart","totalStudents":25},{"courses_instructor":"alissa, reem","totalStudents":28},{"courses_instructor":"dieres-monplaisir, jean","totalStudents":28},{"courses_instructor":"taylor, stephen ilott","totalStudents":57},{"courses_instructor":"cole, raymond john","totalStudents":138},{"courses_instructor":"beca, bryan","totalStudents":85},{"courses_instructor":"bass, john;soules, matthew","totalStudents":37},{"courses_instructor":"bass, john;lewis, martin","totalStudents":21},{"courses_instructor":"beca, bryan;mcdonald, ian ross","totalStudents":42},{"courses_instructor":"wojtowicz, jerzy w","totalStudents":57},{"courses_instructor":"hemsworth, john","totalStudents":13},{"courses_instructor":"eidse, james;robins, anthony","totalStudents":13},{"courses_instructor":"vaughan, annabel","totalStudents":7},{"courses_instructor":"gates, joanne","totalStudents":51},{"courses_instructor":"waissbluth, nicholas","totalStudents":13},{"courses_instructor":"barton, michael","totalStudents":4},{"courses_instructor":"huemoeller, james","totalStudents":11},{"courses_instructor":"patkau, patricia","totalStudents":6},{"courses_instructor":"drohan, joyce;pattison, julian","totalStudents":6},{"courses_instructor":"herrington, susan;lewis, martin","totalStudents":11},{"courses_instructor":"lang, oliver","totalStudents":7},{"courses_instructor":"hannah-suarez, fernanda","totalStudents":10},{"courses_instructor":"ho, jacqueline;lacy, john","totalStudents":9},{"courses_instructor":"jones, d'arcy","totalStudents":10},{"courses_instructor":"bayer, rebecca","totalStudents":8},{"courses_instructor":"gates, joanne;macdonald, christopher;soules, matthew","totalStudents":44},{"courses_instructor":"lewis, martin","totalStudents":143},{"courses_instructor":"bass, john;roecker, inge;satterfield, blair","totalStudents":38},{"courses_instructor":"halverson, matthew ;mcdonald, ian ross","totalStudents":6},{"courses_instructor":"patkau, patricia;soules, matthew","totalStudents":8},{"courses_instructor":"gates, joanne;macdonald, christopher","totalStudents":52},{"courses_instructor":"dahmen, joseph;roecker, inge;soules, matthew;wagner, george stuart","totalStudents":40},{"courses_instructor":"bass, john;macdonald, christopher;soules, matthew","totalStudents":40},{"courses_instructor":"mckay, sherry;soules, matthew","totalStudents":84},{"courses_instructor":"fujita, mari;mckay, sherry","totalStudents":38},{"courses_instructor":"soules, matthew;wagner, george stuart","totalStudents":45},{"courses_instructor":"mckay, sherry;neumann, oliver","totalStudents":44},{"courses_instructor":"brock, linda dale","totalStudents":274},{"courses_instructor":"fagnan, julien","totalStudents":40},{"courses_instructor":"mikler, vladimir","totalStudents":32},{"courses_instructor":"mccarry, blair","totalStudents":42},{"courses_instructor":"wilson, cindy","totalStudents":10},{"courses_instructor":"paczkowski, nicholas","totalStudents":277},{"courses_instructor":"girling, cynthia","totalStudents":281},{"courses_instructor":"girling, cynthia;paczkowski, nicholas","totalStudents":49},{"courses_instructor":"kusno, abidin;mckay, sherry","totalStudents":33},{"courses_instructor":"condon, patrick michael","totalStudents":951},{"courses_instructor":"metcalfe, jessica","totalStudents":85},{"courses_instructor":"weston, darlene","totalStudents":322},{"courses_instructor":"martindale, andrew","totalStudents":27},{"courses_instructor":"alexander-gooding, sharon","totalStudents":38},{"courses_instructor":"bushey, jessica","totalStudents":90},{"courses_instructor":"robinson, maria","totalStudents":16},{"courses_instructor":"duranti, luciana","totalStudents":422},{"courses_instructor":"rogers, corinne","totalStudents":105},{"courses_instructor":"michetti, giovanni","totalStudents":116},{"courses_instructor":"douglas, jennifer","totalStudents":266},{"courses_instructor":"yeo, geoffrey","totalStudents":26},{"courses_instructor":"lemieux, victoria","totalStudents":247},{"courses_instructor":"evans, lois","totalStudents":28},{"courses_instructor":"dickson, terra lorraine;pecho, jennifer","totalStudents":26},{"courses_instructor":"goh, elaine","totalStudents":23},{"courses_instructor":"marini, francesca","totalStudents":36},{"courses_instructor":"casini, paola","totalStudents":16},{"courses_instructor":"stewart, kelly","totalStudents":41},{"courses_instructor":"marini, francesca;schmidlin, rick","totalStudents":13},{"courses_instructor":"absar, rafa","totalStudents":120},{"courses_instructor":"arias hernandez, richard","totalStudents":329},{"courses_instructor":"brigham, doug","totalStudents":82},{"courses_instructor":"mancuso, lara","totalStudents":4},{"courses_instructor":"kozak, greg","totalStudents":88},{"courses_instructor":"robertson, guy","totalStudents":379},{"courses_instructor":"broadley, louise","totalStudents":163},{"courses_instructor":"broadley, louise;olsen, anne","totalStudents":95},{"courses_instructor":"eastwood, terence m","totalStudents":25},{"courses_instructor":"wilson, laura","totalStudents":26},{"courses_instructor":"rennie, stuart","totalStudents":15},{"courses_instructor":"hill, rosaleen","totalStudents":151},{"courses_instructor":"sutherland, sabina","totalStudents":81},{"courses_instructor":"kopak, richard","totalStudents":613},{"courses_instructor":"smith, tai lin","totalStudents":538},{"courses_instructor":"carr, geoffrey","totalStudents":1002},{"courses_instructor":"dujakovic, maja","totalStudents":146},{"courses_instructor":"knicely guilbaut, carol","totalStudents":314},{"courses_instructor":"phillips, kimberley","totalStudents":213},{"courses_instructor":"horacek, ivana","totalStudents":104},{"courses_instructor":"monteyne, joseph","totalStudents":206},{"courses_instructor":"brown, kathryn","totalStudents":93},{"courses_instructor":"chehab, krystel","totalStudents":102},{"courses_instructor":"karabeg, jasmina","totalStudents":94},{"courses_instructor":"mansoor, jaleh","totalStudents":453},{"courses_instructor":"clark, leah","totalStudents":59},{"courses_instructor":"barenscott, dorothy","totalStudents":192},{"courses_instructor":"wood, william","totalStudents":296},{"courses_instructor":"wyma, kathleen","totalStudents":232},{"courses_instructor":"noel de tilly, ariane","totalStudents":60},{"courses_instructor":"stone, rob","totalStudents":81},{"courses_instructor":"roy, marina","totalStudents":430},{"courses_instructor":"parent, vanessa","totalStudents":54},{"courses_instructor":"tsao, hsingyuan","totalStudents":204},{"courses_instructor":"liu, april","totalStudents":41},{"courses_instructor":"bailey, c. d. alison","totalStudents":680},{"courses_instructor":"ryan, maureen","totalStudents":686},{"courses_instructor":"guilbaut, serge","totalStudents":322},{"courses_instructor":"hacker, katherine","totalStudents":32},{"courses_instructor":"hirasawa, caroline","totalStudents":23},{"courses_instructor":"soussloff, catherine","totalStudents":80},{"courses_instructor":"townsend-gault, charlotte","totalStudents":710},{"courses_instructor":"cohodas, marvin","totalStudents":31},{"courses_instructor":"lerner, jillian","totalStudents":691},{"courses_instructor":"smylitopoulos, christina","totalStudents":71},{"courses_instructor":"poon, jessica","totalStudents":76},{"courses_instructor":"diack, heather","totalStudents":156},{"courses_instructor":"o'brian, john","totalStudents":291},{"courses_instructor":"windsor-liscombe, rhodri","totalStudents":304},{"courses_instructor":"adriasola munoz, ignacio alber","totalStudents":80},{"courses_instructor":"dangeli, miquel icesis","totalStudents":74},{"courses_instructor":"wilson, bronwen","totalStudents":55},{"courses_instructor":"nicholson, luke","totalStudents":16},{"courses_instructor":"salgirli, saygin","totalStudents":6},{"courses_instructor":"carr, geoffrey;windsor-liscombe, rhodri","totalStudents":20},{"courses_instructor":"maeda, tamaki","totalStudents":9},{"courses_instructor":"cohodas, marvin;ryan, maureen","totalStudents":9},{"courses_instructor":"tba;tsao, hsingyuan","totalStudents":10},{"courses_instructor":"baker, donald leslie","totalStudents":1874},{"courses_instructor":"nosco, peter","totalStudents":1315},{"courses_instructor":"harlow, francesca","totalStudents":494},{"courses_instructor":"toleno, robban anthony john","totalStudents":110},{"courses_instructor":"lovins, christopher","totalStudents":158},{"courses_instructor":"hur, nam-lin","totalStudents":370},{"courses_instructor":"bohnet, adam","totalStudents":136},{"courses_instructor":"main, jessica","totalStudents":285},{"courses_instructor":"okawa, eiji","totalStudents":132},{"courses_instructor":"harris, ian","totalStudents":47},{"courses_instructor":"hall, nicholas","totalStudents":288},{"courses_instructor":"milutin, otillia clara","totalStudents":180},{"courses_instructor":"rusk, bruce","totalStudents":205},{"courses_instructor":"szekely, lenore","totalStudents":136},{"courses_instructor":"hunter, thomas","totalStudents":411},{"courses_instructor":"citizen, robyn","totalStudents":610},{"courses_instructor":"pieper, daniel","totalStudents":19},{"courses_instructor":"shin, eurie","totalStudents":746},{"courses_instructor":"sathaye, adheesh","totalStudents":915},{"courses_instructor":"oberoi, harjot singh","totalStudents":385},{"courses_instructor":"fujiwara, gideon","totalStudents":43},{"courses_instructor":"orihara, minami","totalStudents":52},{"courses_instructor":"benesch, oleg","totalStudents":50},{"courses_instructor":"song, jee-yeon","totalStudents":28},{"courses_instructor":"park, jeongeun","totalStudents":76},{"courses_instructor":"orbaugh, sharalyn","totalStudents":516},{"courses_instructor":"agov, avram","totalStudents":11},{"courses_instructor":"shin, leo","totalStudents":241},{"courses_instructor":"swatek, catherine","totalStudents":654},{"courses_instructor":"fulton, bruce","totalStudents":518},{"courses_instructor":"park, si nae","totalStudents":72},{"courses_instructor":"kumar, sanjay","totalStudents":138},{"courses_instructor":"rea, christopher","totalStudents":498},{"courses_instructor":"burk, stefania","totalStudents":714},{"courses_instructor":"whaley, benjamin","totalStudents":47},{"courses_instructor":"liman, anthony v.","totalStudents":169},{"courses_instructor":"hansen, kelly","totalStudents":106},{"courses_instructor":"wang, rui","totalStudents":2236},{"courses_instructor":"zur, dafna","totalStudents":46},{"courses_instructor":"hundal, sukhwant","totalStudents":636},{"courses_instructor":"murphy, anne","totalStudents":465},{"courses_instructor":"slingerland, edward","totalStudents":477},{"courses_instructor":"kreger, wayne","totalStudents":56},{"courses_instructor":"sullivan, brenton","totalStudents":42},{"courses_instructor":"chen, jinhua","totalStudents":546},{"courses_instructor":"toleno, robban","totalStudents":30},{"courses_instructor":"kang, neelu","totalStudents":36},{"courses_instructor":"shababo, guy","totalStudents":11},{"courses_instructor":"thompson, evan","totalStudents":193},{"courses_instructor":"yang, zeng","totalStudents":40},{"courses_instructor":"li, duanduan","totalStudents":519},{"courses_instructor":"djurdjevic, gordan g.d.","totalStudents":276},{"courses_instructor":"guo, wei ting","totalStudents":23},{"courses_instructor":"chiu-duke, josephine","totalStudents":1094},{"courses_instructor":"laffin, christina","totalStudents":111},{"courses_instructor":"lushchenko, alexey","totalStudents":30},{"courses_instructor":"yang, meng-hsuan","totalStudents":23},{"courses_instructor":"ng, david;sens, allen","totalStudents":449},{"courses_instructor":"kandlikar, milind","totalStudents":61},{"courses_instructor":"matthews, jaymie mark","totalStudents":1429},{"courses_instructor":"richer, harvey;samra, raminder","totalStudents":108},{"courses_instructor":"boley, aaron;strubbe, linda","totalStudents":89},{"courses_instructor":"matthews, jaymie mark;stairs, ingrid","totalStudents":107},{"courses_instructor":"van waerbeke, ludovic","totalStudents":1019},{"courses_instructor":"scott, douglas","totalStudents":146},{"courses_instructor":"hickson, paul","totalStudents":268},{"courses_instructor":"gladman, brett","totalStudents":512},{"courses_instructor":"richer, harvey","totalStudents":1016},{"courses_instructor":"heyl, jeremy","totalStudents":570},{"courses_instructor":"mcdonald, jennifer","totalStudents":88},{"courses_instructor":"zibin, james peter","totalStudents":98},{"courses_instructor":"stairs, ingrid","totalStudents":236},{"courses_instructor":"newbury, peter;stairs, ingrid","totalStudents":135},{"courses_instructor":"newbury, peter","totalStudents":236},{"courses_instructor":"halpern, mark","totalStudents":542},{"courses_instructor":"sigurdson, kris","totalStudents":335},{"courses_instructor":"hinshaw, gary","totalStudents":63},{"courses_instructor":"marsden, gaelen","totalStudents":8},{"courses_instructor":"boley, aaron;hickson, paul","totalStudents":9},{"courses_instructor":"boley, aaron","totalStudents":15},{"courses_instructor":"boley, aaron;gladman, brett","totalStudents":9},{"courses_instructor":"kiefl, robert","totalStudents":384},{"courses_instructor":"sossi, vesna","totalStudents":834},{"courses_instructor":"lehman, darrin","totalStudents":441},{"courses_instructor":"lehman, darrin;ritchie, jennifer","totalStudents":104},{"courses_instructor":"edgington, david william","totalStudents":674},{"courses_instructor":"glassman, james francis","totalStudents":1399},{"courses_instructor":"d'silva, reginald","totalStudents":484},{"courses_instructor":"gooding, richard","totalStudents":415},{"courses_instructor":"stull, roland","totalStudents":695},{"courses_instructor":"hicks, george;stull, roland","totalStudents":10},{"courses_instructor":"austin, philip","totalStudents":60},{"courses_instructor":"hsieh, william","totalStudents":57},{"courses_instructor":"balmforth, neil","totalStudents":646},{"courses_instructor":"radic, valentina","totalStudents":36},{"courses_instructor":"allen, susan elizabeth;balmforth, neil","totalStudents":13},{"courses_instructor":"li, zhiying;stull, roland","totalStudents":12},{"courses_instructor":"siuta, david","totalStudents":32},{"courses_instructor":"howard, rosemary;wong, may","totalStudents":11},{"courses_instructor":"jackson, peter","totalStudents":8},{"courses_instructor":"allen, susan elizabeth;austin, philip","totalStudents":43},{"courses_instructor":"austin, philip;reuten, christian","totalStudents":10},{"courses_instructor":"redenbach, darlene","totalStudents":495},{"courses_instructor":"richards, rachel","totalStudents":106},{"courses_instructor":"small, jeff alan","totalStudents":443},{"courses_instructor":"simmons, noreen;small, jeff alan","totalStudents":77},{"courses_instructor":"ayyad, hadeel;bacsfalvi, penelope;ciocca, valter","totalStudents":12},{"courses_instructor":"jenstad, lorienne","totalStudents":163},{"courses_instructor":"bacsfalvi, penelope;ciocca, valter","totalStudents":57},{"courses_instructor":"herdman, anthony","totalStudents":107},{"courses_instructor":"shahnaz, navid","totalStudents":95},{"courses_instructor":"shahnaz, navid;stapells, david","totalStudents":12},{"courses_instructor":"marinova-todd, stefka","totalStudents":219},{"courses_instructor":"purves, barbara","totalStudents":385},{"courses_instructor":"adelman, sharon","totalStudents":316},{"courses_instructor":"adelman, sharon;hicks, darlene","totalStudents":89},{"courses_instructor":"brown, sasha;hicks, darlene","totalStudents":37},{"courses_instructor":"bernhardt, barbara","totalStudents":203},{"courses_instructor":"adelman, sharon;macleod, elizabeth d","totalStudents":33},{"courses_instructor":"bacsfalvi, penelope","totalStudents":243},{"courses_instructor":"avery, lisa ann;ciocca, valter;rammage, linda","totalStudents":24},{"courses_instructor":"avery, lisa ann;rammage, linda","totalStudents":46},{"courses_instructor":"avery, lisa ann;rammage, linda;reynolds, cindy","totalStudents":47},{"courses_instructor":"larson, veronika;poirier, brigitte","totalStudents":25},{"courses_instructor":"noland, andrea;rammage, linda","totalStudents":30},{"courses_instructor":"duke, wendy","totalStudents":53},{"courses_instructor":"small, susan","totalStudents":142},{"courses_instructor":"dillon, lisa","totalStudents":24},{"courses_instructor":"brown, sasha","totalStudents":26},{"courses_instructor":"shahnaz, navid;small, susan","totalStudents":46},{"courses_instructor":"adelman, sharon;shahnaz, navid","totalStudents":13},{"courses_instructor":"ishida, ieda;shahnaz, navid;small, susan","totalStudents":11},{"courses_instructor":"hansen, mark;jenstad, lorienne","totalStudents":11},{"courses_instructor":"stapells, david","totalStudents":10},{"courses_instructor":"hatton, jennifer;herdman, anthony","totalStudents":11},{"courses_instructor":"pijl, sipke","totalStudents":85},{"courses_instructor":"colozzo, paola","totalStudents":264},{"courses_instructor":"johnston, judith rae","totalStudents":22},{"courses_instructor":"avery, lisa ann","totalStudents":137},{"courses_instructor":"avery, lisa ann;tba","totalStudents":24},{"courses_instructor":"adler-bock, marcy;avery, lisa ann","totalStudents":53},{"courses_instructor":"reynolds, cindy","totalStudents":68},{"courses_instructor":"marcoux, caroline;poirier, brigitte","totalStudents":24},{"courses_instructor":"marshall, tracy;parhar, reena;sinden, eavan","totalStudents":24},{"courses_instructor":"ciocca, valter","totalStudents":10},{"courses_instructor":"chase, kate","totalStudents":24},{"courses_instructor":"bernhardt, barbara;rammage, linda;small, jeff alan","totalStudents":150},{"courses_instructor":"rammage, linda;small, jeff alan","totalStudents":22},{"courses_instructor":"marinova-todd, stefka;small, jeff alan","totalStudents":102},{"courses_instructor":"small, jeff alan;tba","totalStudents":35},{"courses_instructor":"howe, tami","totalStudents":23},{"courses_instructor":"avery, lisa ann;taylor, sandra lynn","totalStudents":137},{"courses_instructor":"alisharan, steve","totalStudents":819},{"courses_instructor":"chung, tran khue","totalStudents":3960},{"courses_instructor":"begley, joy","totalStudents":1162},{"courses_instructor":"mallia, patricia","totalStudents":4273},{"courses_instructor":"sinclair, scott","totalStudents":6300},{"courses_instructor":"jackes, robert","totalStudents":4342},{"courses_instructor":"lundholm, russell","totalStudents":289},{"courses_instructor":"cheng, qiang","totalStudents":106},{"courses_instructor":"kroeker, jeff","totalStudents":2336},{"courses_instructor":"mulat, aklilu","totalStudents":216},{"courses_instructor":"lopes rogo, rafael","totalStudents":245},{"courses_instructor":"dorfmann, william","totalStudents":776},{"courses_instructor":"nice, robert","totalStudents":11},{"courses_instructor":"chamberlain, sandra","totalStudents":643},{"courses_instructor":"puterman, martin l","totalStudents":85},{"courses_instructor":"fry, mike","totalStudents":47},{"courses_instructor":"saure valenzuela, antoine","totalStudents":51},{"courses_instructor":"saure valenzuela, antoine mich","totalStudents":43},{"courses_instructor":"berkowitz, jonathan","totalStudents":4767},{"courses_instructor":"werker, gregory","totalStudents":1578},{"courses_instructor":"bornn, luke","totalStudents":85},{"courses_instructor":"zhang, zhe","totalStudents":379},{"courses_instructor":"ding, yichuan","totalStudents":270},{"courses_instructor":"griffin, dale","totalStudents":448},{"courses_instructor":"verigin, iain","totalStudents":124},{"courses_instructor":"simonite, james","totalStudents":295},{"courses_instructor":"golinsky, david gerald","totalStudents":24},{"courses_instructor":"wal van lierop","totalStudents":15},{"courses_instructor":"mackellar, richard","totalStudents":68},{"courses_instructor":"hellmann, thomas","totalStudents":97},{"courses_instructor":"lyons, mike;staub-french, sheryl;tergiman, chloe","totalStudents":22},{"courses_instructor":"hellmann, thomas;staub-french, sheryl","totalStudents":14},{"courses_instructor":"cubbon, paul","totalStudents":983},{"courses_instructor":"beech, terry","totalStudents":49},{"courses_instructor":"deretic, momcilo","totalStudents":1681},{"courses_instructor":"atwal, perdip","totalStudents":2883},{"courses_instructor":"carlson, murray","totalStudents":796},{"courses_instructor":"giammarino, ronald","totalStudents":1156},{"courses_instructor":"zeng, lulu","totalStudents":1773},{"courses_instructor":"yuill, garry","totalStudents":1067},{"courses_instructor":"ortiz molina, hernan","totalStudents":115},{"courses_instructor":"ortiz-molina, hernan","totalStudents":790},{"courses_instructor":"park, james","totalStudents":151},{"courses_instructor":"li, kai","totalStudents":1091},{"courses_instructor":"garlappi, lorenzo","totalStudents":1050},{"courses_instructor":"alimov, azizjon","totalStudents":12},{"courses_instructor":"pikulina, elena","totalStudents":320},{"courses_instructor":"fisher, adlai","totalStudents":400},{"courses_instructor":"moran-villar, pablo christian","totalStudents":274},{"courses_instructor":"bena, jan","totalStudents":719},{"courses_instructor":"lazrak, ali","totalStudents":836},{"courses_instructor":"chen, jason","totalStudents":339},{"courses_instructor":"wang, tan","totalStudents":282},{"courses_instructor":"kacperczyk, marcin","totalStudents":144},{"courses_instructor":"donaldson, r glen","totalStudents":332},{"courses_instructor":"aguerrevere, felipe","totalStudents":22},{"courses_instructor":"bhamra, harjoat","totalStudents":335},{"courses_instructor":"levi, maurice david","totalStudents":566},{"courses_instructor":"bhamra, harjoat;zeng, lulu","totalStudents":18},{"courses_instructor":"langton, nancy","totalStudents":366},{"courses_instructor":"muehlchen, elizabeth","totalStudents":515},{"courses_instructor":"gurton, tracey","totalStudents":2964},{"courses_instructor":"berdahl, jennifer","totalStudents":70},{"courses_instructor":"aquino, karl","totalStudents":1015},{"courses_instructor":"skarlicki, dan","totalStudents":1057},{"courses_instructor":"anjos, luciano","totalStudents":161},{"courses_instructor":"knight, thomas","totalStudents":520},{"courses_instructor":"kirkpatrick, karin","totalStudents":472},{"courses_instructor":"maitlis, sally","totalStudents":110},{"courses_instructor":"kelleher, angela","totalStudents":814},{"courses_instructor":"cavusoglu, hasan","totalStudents":839},{"courses_instructor":"cenfetelli, ronald timothy","totalStudents":288},{"courses_instructor":"singh, sase","totalStudents":64},{"courses_instructor":"svedic, zorana","totalStudents":114},{"courses_instructor":"cenfetelli, ronald timothy;cruickshank, ian","totalStudents":73},{"courses_instructor":"nan, ning","totalStudents":210},{"courses_instructor":"wu, chunhua","totalStudents":594},{"courses_instructor":"tan, william","totalStudents":1772},{"courses_instructor":"macguigan, niall","totalStudents":126},{"courses_instructor":"bouchard, shawn","totalStudents":58},{"courses_instructor":"milnes, kim","totalStudents":60},{"courses_instructor":"hanna, blake","totalStudents":86},{"courses_instructor":"woo, carson c","totalStudents":702},{"courses_instructor":"mcintosh, ellen jane","totalStudents":4608},{"courses_instructor":"meredith, deborah","totalStudents":2907},{"courses_instructor":"silk, timothy","totalStudents":2503},{"courses_instructor":"stone, ann","totalStudents":1438},{"courses_instructor":"white, katherine","totalStudents":206},{"courses_instructor":"putler, daniel s.","totalStudents":64},{"courses_instructor":"dahl, darren","totalStudents":149},{"courses_instructor":"qian, yi","totalStudents":244},{"courses_instructor":"hoegg, jo andrea","totalStudents":646},{"courses_instructor":"jackson, ean","totalStudents":24},{"courses_instructor":"viskovich, julio","totalStudents":163},{"courses_instructor":"low, kenton","totalStudents":304},{"courses_instructor":"zhu, juliet","totalStudents":346},{"courses_instructor":"milne, tamar","totalStudents":2261},{"courses_instructor":"silk, timothy;werker, gregory","totalStudents":228},{"courses_instructor":"mccormick, s thomas;silk, timothy","totalStudents":131},{"courses_instructor":"burke, phaedra","totalStudents":599},{"courses_instructor":"appelt, kirstin","totalStudents":305},{"courses_instructor":"atkins, derek","totalStudents":86},{"courses_instructor":"lewis, rachel","totalStudents":34},{"courses_instructor":"chen, hong","totalStudents":22},{"courses_instructor":"shechter, steven","totalStudents":390},{"courses_instructor":"skandari, mohammadreza","totalStudents":18},{"courses_instructor":"queyranne, maurice","totalStudents":229},{"courses_instructor":"lee, chulung","totalStudents":25},{"courses_instructor":"donald, william stuart","totalStudents":155},{"courses_instructor":"krishnan, harish","totalStudents":1035},{"courses_instructor":"zhang, hao","totalStudents":275},{"courses_instructor":"huh, woonghee tim","totalStudents":392},{"courses_instructor":"appelbe, trent","totalStudents":533},{"courses_instructor":"ross, thomas","totalStudents":97},{"courses_instructor":"davidoff, thomas","totalStudents":529},{"courses_instructor":"chapple, clive","totalStudents":6795},{"courses_instructor":"tergiman, chloe","totalStudents":285},{"courses_instructor":"zhang, anming","totalStudents":424},{"courses_instructor":"shrestha, ratna","totalStudents":11232},{"courses_instructor":"mccormick, s thomas","totalStudents":487},{"courses_instructor":"nagarajan, mahesh","totalStudents":222},{"courses_instructor":"culham, thomas","totalStudents":590},{"courses_instructor":"michelson, helen","totalStudents":340},{"courses_instructor":"parra perez, alvaro","totalStudents":362},{"courses_instructor":"chandra, ambarish","totalStudents":366},{"courses_instructor":"tappata, mariano","totalStudents":1082},{"courses_instructor":"brown, jennifer","totalStudents":349},{"courses_instructor":"arrata, philippe","totalStudents":150},{"courses_instructor":"raina, rajinder","totalStudents":130},{"courses_instructor":"antweiler, werner","totalStudents":592},{"courses_instructor":"vertinsky, ilan boris","totalStudents":455},{"courses_instructor":"ries, john","totalStudents":597},{"courses_instructor":"nakamura, masao","totalStudents":763},{"courses_instructor":"minns, steven","totalStudents":1251},{"courses_instructor":"wosk, larry","totalStudents":2289},{"courses_instructor":"monroe, mark","totalStudents":578},{"courses_instructor":"williams, warren","totalStudents":844},{"courses_instructor":"krisinger, michael","totalStudents":141},{"courses_instructor":"krisinger, michael;williams, warren","totalStudents":123},{"courses_instructor":"maurus, robert;williams, warren","totalStudents":439},{"courses_instructor":"read, jason","totalStudents":1134},{"courses_instructor":"maurus, robert","totalStudents":2570},{"courses_instructor":"maurus, robert;mui, alice","totalStudents":508},{"courses_instructor":"krisinger, michael;lee, justin barry;maurus, robert","totalStudents":704},{"courses_instructor":"krisinger, michael;maurus, robert","totalStudents":1043},{"courses_instructor":"brownsey, roger","totalStudents":154},{"courses_instructor":"brownsey, roger;mayor, thibault;molday, robert;numata, masayuki","totalStudents":438},{"courses_instructor":"brownsey, roger;duong van hoa, franck;mayor, thibault;numata, masayuki","totalStudents":218},{"courses_instructor":"brownsey, roger;mayor, thibault;numata, masayuki","totalStudents":122},{"courses_instructor":"brownsey, roger;duong van hoa, franck;macgillivray, ross;numata, masayuki","totalStudents":119},{"courses_instructor":"foster, leonard;gsponer, joerg;mayor, thibault;yip, calvin","totalStudents":188},{"courses_instructor":"foster, leonard;mayor, thibault","totalStudents":86},{"courses_instructor":"brumer, harry;foster, leonard;kim, hugh;yip, calvin","totalStudents":103},{"courses_instructor":"brayer, gary;mauk, grant","totalStudents":700},{"courses_instructor":"gsponer, joerg;yip, calvin","totalStudents":398},{"courses_instructor":"mcintosh, lawrence;yip, calvin","totalStudents":126},{"courses_instructor":"strynadka, natalie","totalStudents":145},{"courses_instructor":"van petegem, filip","totalStudents":304},{"courses_instructor":"kastrup, christian;macgillivray, ross;strynadka, natalie","totalStudents":118},{"courses_instructor":"strynadka, natalie;withers, stephen","totalStudents":68},{"courses_instructor":"macgillivray, ross;strynadka, natalie","totalStudents":79},{"courses_instructor":"covey, scott","totalStudents":408},{"courses_instructor":"covey, scott;van petegem, filip","totalStudents":10},{"courses_instructor":"sadowski, ivan","totalStudents":108},{"courses_instructor":"howe, leann;jan, eric;sadowski, ivan","totalStudents":623},{"courses_instructor":"jan, eric;sadowski, ivan","totalStudents":115},{"courses_instructor":"howe, leann;jan, eric","totalStudents":23},{"courses_instructor":"conibear, elizabeth;numata, masayuki;strynadka, natalie;van petegem, filip","totalStudents":162},{"courses_instructor":"foster, leonard;roberge, michel;tokuriki, nobuhiko","totalStudents":63},{"courses_instructor":"cullis, pieter;foster, leonard;roberge, michel","totalStudents":16},{"courses_instructor":"foster, leonard;roberge, michel","totalStudents":28},{"courses_instructor":"molday, robert","totalStudents":18},{"courses_instructor":"cullis, pieter;molday, robert","totalStudents":40},{"courses_instructor":"cullis, pieter;duong van hoa, franck;molday, robert","totalStudents":9},{"courses_instructor":"mcintosh, lawrence","totalStudents":787},{"courses_instructor":"foster, leonard","totalStudents":20},{"courses_instructor":"mcintosh, lawrence;van petegem, filip","totalStudents":10},{"courses_instructor":"roberge, michel","totalStudents":20},{"courses_instructor":"cullis, pieter","totalStudents":17},{"courses_instructor":"finlay, b brett","totalStudents":23},{"courses_instructor":"finlay, b brett;roberge, michel","totalStudents":9},{"courses_instructor":"finlay, b brett;hieter, philip","totalStudents":13},{"courses_instructor":"cullis, pieter;finlay, b brett","totalStudents":13},{"courses_instructor":"mackie, george","totalStudents":59},{"courses_instructor":"eltis, lindsay;molday, robert","totalStudents":11},{"courses_instructor":"jones, steven j","totalStudents":50},{"courses_instructor":"birol, inanc;brinkman, ryan;cherkasov, artem;jones, steven j;shah, sohrab","totalStudents":16},{"courses_instructor":"bryan, jennifer frazier","totalStudents":21},{"courses_instructor":"mostafavi, sara","totalStudents":39},{"courses_instructor":"cohen freue, gabriela","totalStudents":141},{"courses_instructor":"zeiler, kathryn","totalStudents":513},{"courses_instructor":"klenz, jennifer;nomme, kathy margaret","totalStudents":749},{"courses_instructor":"sun, chin","totalStudents":156},{"courses_instructor":"norman, lynn","totalStudents":207},{"courses_instructor":"singh, santokh","totalStudents":1011},{"courses_instructor":"klenz, jennifer","totalStudents":1059},{"courses_instructor":"bole, gregory michael","totalStudents":3362},{"courses_instructor":"klenz, jennifer;sun, chin","totalStudents":375},{"courses_instructor":"barker, megan;hinze, ehleen","totalStudents":175},{"courses_instructor":"kion, tracy","totalStudents":4070},{"courses_instructor":"gordon, joyce","totalStudents":251},{"courses_instructor":"benbasat, julyet","totalStudents":820},{"courses_instructor":"gaynor, erin;kion, tracy","totalStudents":478},{"courses_instructor":"smith, karen","totalStudents":3469},{"courses_instructor":"douglas, carl","totalStudents":1102},{"courses_instructor":"hinze, ehleen","totalStudents":2166},{"courses_instructor":"taylor, jared","totalStudents":508},{"courses_instructor":"bingle, wade","totalStudents":4123},{"courses_instructor":"mcginnis, rosemary","totalStudents":459},{"courses_instructor":"moussavi, maryam","totalStudents":503},{"courses_instructor":"denroche, heather","totalStudents":259},{"courses_instructor":"graves, marcia","totalStudents":1325},{"courses_instructor":"chowrira, gangamma","totalStudents":2495},{"courses_instructor":"kion, tracy;smith, karen","totalStudents":243},{"courses_instructor":"hinze, ehleen;kion, tracy","totalStudents":258},{"courses_instructor":"spiegelman, george b","totalStudents":242},{"courses_instructor":"smith, karen;spiegelman, george b","totalStudents":457},{"courses_instructor":"gaynor, erin;oliver, david","totalStudents":242},{"courses_instructor":"graves, marcia;zeiler, kathryn","totalStudents":348},{"courses_instructor":"barker, megan","totalStudents":295},{"courses_instructor":"spiegelman, george b;taylor, jared","totalStudents":273},{"courses_instructor":"kion, tracy;taylor, jared","totalStudents":238},{"courses_instructor":"gaynor, erin;tba","totalStudents":226},{"courses_instructor":"couch, brett","totalStudents":1238},{"courses_instructor":"ganders, fred r","totalStudents":198},{"courses_instructor":"blake, robert wm","totalStudents":1367},{"courses_instructor":"whitton, jeannette","totalStudents":259},{"courses_instructor":"adamson, martin","totalStudents":1372},{"courses_instructor":"leander, celeste","totalStudents":557},{"courses_instructor":"redfield, rosemary","totalStudents":463},{"courses_instructor":"goodey, wayne","totalStudents":1220},{"courses_instructor":"bradfield, gary","totalStudents":234},{"courses_instructor":"hawkes, michael","totalStudents":2431},{"courses_instructor":"kalas, pamela","totalStudents":1414},{"courses_instructor":"pollock, carol","totalStudents":2657},{"courses_instructor":"kalas, pamela;leander, celeste","totalStudents":215},{"courses_instructor":"cooke, james","totalStudents":1679},{"courses_instructor":"bole, gregory michael;cooke, james","totalStudents":218},{"courses_instructor":"parfrey, laura","totalStudents":203},{"courses_instructor":"mcdonnell, lisa","totalStudents":220},{"courses_instructor":"kalas, pamela;klenz, jennifer","totalStudents":163},{"courses_instructor":"kopp, christopher","totalStudents":295},{"courses_instructor":"jeffery, erica","totalStudents":425},{"courses_instructor":"parfrey, laura;pollock, carol","totalStudents":207},{"courses_instructor":"couch, brett;kalas, pamela","totalStudents":79},{"courses_instructor":"nomme, kathy margaret","totalStudents":212},{"courses_instructor":"bole, gregory michael;pollock, carol","totalStudents":181},{"courses_instructor":"pollock, carol;sun, chin","totalStudents":6045},{"courses_instructor":"nomme, kathy margaret;pollock, carol;sun, chin","totalStudents":2819},{"courses_instructor":"kalas, pamela;nomme, kathy margaret;sun, chin","totalStudents":544},{"courses_instructor":"couch, brett;germano, bernardita;kalas, pamela;kopp, christopher;moussavi, maryam;nomme, kathy margaret;norman, lynn;sun, chin","totalStudents":833},{"courses_instructor":"bole, gregory michael;pollock, carol;sun, chin","totalStudents":70},{"courses_instructor":"harris, robert","totalStudents":2096},{"courses_instructor":"young, robin","totalStudents":4229},{"courses_instructor":"rosenberg, ellen","totalStudents":1941},{"courses_instructor":"berger, james","totalStudents":126},{"courses_instructor":"macfadyen, leah","totalStudents":47},{"courses_instructor":"chen, liane","totalStudents":2447},{"courses_instructor":"savage, ken","totalStudents":1322},{"courses_instructor":"mazari-andersen, alicia","totalStudents":1178},{"courses_instructor":"kotur, zorica","totalStudents":22},{"courses_instructor":"bingle, wade;taylor, jared","totalStudents":412},{"courses_instructor":"richards, jeffrey;taylor, jared","totalStudents":182},{"courses_instructor":"chowrira, gangamma;taylor, jared","totalStudents":156},{"courses_instructor":"richards, jeffrey","totalStudents":323},{"courses_instructor":"jetter, reinhard;richards, jeffrey","totalStudents":1495},{"courses_instructor":"jetter, reinhard;young, robin","totalStudents":519},{"courses_instructor":"keeling, patrick john","totalStudents":82},{"courses_instructor":"keeling, patrick john;saldarriaga, juan","totalStudents":46},{"courses_instructor":"o'neill, angela","totalStudents":1399},{"courses_instructor":"millen, sandra;milsom, william","totalStudents":282},{"courses_instructor":"o'neill, angela;tetzlaff, wolfram","totalStudents":576},{"courses_instructor":"millen, sandra;tetzlaff, wolfram","totalStudents":294},{"courses_instructor":"fung, charissa;moussavi, maryam;norman, lynn","totalStudents":100},{"courses_instructor":"norman, lynn;o'neill, angela","totalStudents":61},{"courses_instructor":"millen, sandra;o'neill, angela","totalStudents":310},{"courses_instructor":"leander, brian;millen, sandra","totalStudents":392},{"courses_instructor":"leander, brian;o'neill, angela","totalStudents":857},{"courses_instructor":"o'neill, angela;sparmann, sarah","totalStudents":193},{"courses_instructor":"leander, brian","totalStudents":396},{"courses_instructor":"berbee, mary;de wreede, robert;ellis, shona margaret","totalStudents":294},{"courses_instructor":"couch, brett;ellis, shona margaret;hawkes, michael","totalStudents":82},{"courses_instructor":"berbee, mary;couch, brett;hawkes, michael","totalStudents":87},{"courses_instructor":"berbee, mary;couch, brett;de wreede, robert","totalStudents":186},{"courses_instructor":"berbee, mary;hawkes, michael","totalStudents":73},{"courses_instructor":"berbee, mary;ellis, shona margaret;martone, patrick","totalStudents":138},{"courses_instructor":"ellis, shona margaret;graham, sean;sack, fred","totalStudents":161},{"courses_instructor":"ellis, shona margaret;graham, sean;samuels, anne lacey","totalStudents":138},{"courses_instructor":"goodey, wayne;turkington, robert","totalStudents":591},{"courses_instructor":"goodey, wayne;hammill, edd","totalStudents":46},{"courses_instructor":"goodey, wayne;srivastava, diane","totalStudents":176},{"courses_instructor":"crutsinger, gregory;goodey, wayne;jankowski, jill","totalStudents":379},{"courses_instructor":"srivastava, diane","totalStudents":353},{"courses_instructor":"brodie, jedediah;goodey, wayne;tseng, michelle","totalStudents":382},{"courses_instructor":"brodie, jedediah;goodey, wayne;hansen, malin;jankowski, jill","totalStudents":342},{"courses_instructor":"klenz, jennifer;mcdonnell, lisa","totalStudents":116},{"courses_instructor":"moerman, donald;redfield, rosemary","totalStudents":328},{"courses_instructor":"berezowsky, craig m s;redfield, rosemary","totalStudents":240},{"courses_instructor":"haughn, george;klenz, jennifer","totalStudents":377},{"courses_instructor":"klenz, jennifer;moerman, donald","totalStudents":293},{"courses_instructor":"berezowsky, craig m s;mizumoto, kota","totalStudents":318},{"courses_instructor":"berezowsky, craig m s;haughn, george;klenz, jennifer","totalStudents":670},{"courses_instructor":"berezowsky, craig m s;klenz, jennifer;moerman, donald","totalStudents":300},{"courses_instructor":"berezowsky, craig m s;klenz, jennifer","totalStudents":658},{"courses_instructor":"berezowsky, craig m s;moerman, donald","totalStudents":254},{"courses_instructor":"cooke, james;singh, santokh","totalStudents":55},{"courses_instructor":"lee, jae-hyeok;schulte, patricia","totalStudents":911},{"courses_instructor":"schulte, patricia;tortell, philippe","totalStudents":1452},{"courses_instructor":"banet, amanda;singh, santokh","totalStudents":56},{"courses_instructor":"mcintyre, gordon","totalStudents":397},{"courses_instructor":"whitlock, michael","totalStudents":1555},{"courses_instructor":"marin, michael","totalStudents":2659},{"courses_instructor":"irwin, darren","totalStudents":1069},{"courses_instructor":"pennell, matthew","totalStudents":231},{"courses_instructor":"conte, gina","totalStudents":261},{"courses_instructor":"veen, thor","totalStudents":241},{"courses_instructor":"li, yue-xian","totalStudents":1123},{"courses_instructor":"otto, sarah","totalStudents":259},{"courses_instructor":"bradfield, gary;crutsinger, gregory;goodey, wayne","totalStudents":169},{"courses_instructor":"bradfield, gary;goodey, wayne;o'connor, mary","totalStudents":537},{"courses_instructor":"angert, amy;bradfield, gary;goodey, wayne;o'connor, mary","totalStudents":118},{"courses_instructor":"bradfield, gary;goodey, wayne","totalStudents":204},{"courses_instructor":"aviles, leticia","totalStudents":517},{"courses_instructor":"de wreede, robert","totalStudents":168},{"courses_instructor":"de wreede, robert;martone, patrick","totalStudents":95},{"courses_instructor":"martone, patrick","totalStudents":134},{"courses_instructor":"berbee, mary","totalStudents":236},{"courses_instructor":"dee, jaclyn;tsui, clement kin ming","totalStudents":21},{"courses_instructor":"ellis, shona margaret;ganders, fred r","totalStudents":39},{"courses_instructor":"matthews, philip","totalStudents":492},{"courses_instructor":"harley, christopher","totalStudents":216},{"courses_instructor":"gooding, rebecca","totalStudents":21},{"courses_instructor":"tetzlaff, wolfram","totalStudents":85},{"courses_instructor":"brock, hugh","totalStudents":229},{"courses_instructor":"roskams, angela jane","totalStudents":225},{"courses_instructor":"beck, samantha;tetzlaff, wolfram","totalStudents":72},{"courses_instructor":"berezowsky, craig m s","totalStudents":717},{"courses_instructor":"beatty, thomas j.;berezowsky, craig m s;grigliatti, thomas;haughn, george","totalStudents":377},{"courses_instructor":"berezowsky, craig m s;brock, hugh;haughn, george","totalStudents":1138},{"courses_instructor":"berezowsky, craig m s;zhang, yuelin","totalStudents":890},{"courses_instructor":"moerman, donald;zhang, yuelin","totalStudents":286},{"courses_instructor":"ally, dilara;whitton, jeannette","totalStudents":167},{"courses_instructor":"bole, gregory michael;keeling, naomi;whitton, jeannette","totalStudents":389},{"courses_instructor":"adams, keith;bole, gregory michael;whitton, jeannette","totalStudents":308},{"courses_instructor":"bole, gregory michael;draghi, jeremy","totalStudents":211},{"courses_instructor":"bole, gregory michael;whitton, jeannette","totalStudents":339},{"courses_instructor":"maddison, wayne;whitton, jeannette","totalStudents":167},{"courses_instructor":"weir, laura","totalStudents":42},{"courses_instructor":"keeling, naomi;whitton, jeannette","totalStudents":185},{"courses_instructor":"bole, gregory michael;weir, laura","totalStudents":263},{"courses_instructor":"warner, adam","totalStudents":32},{"courses_instructor":"chen, liane;hinze, ehleen","totalStudents":199},{"courses_instructor":"chen, liane;young, robin","totalStudents":66},{"courses_instructor":"ellis, shona margaret;zeiler, kathryn","totalStudents":26},{"courses_instructor":"cassidy, alice","totalStudents":35},{"courses_instructor":"davies, julian","totalStudents":96},{"courses_instructor":"davies, julian;kion, tracy","totalStudents":49},{"courses_instructor":"davies, julian;sibley, jennifer","totalStudents":35},{"courses_instructor":"ganders, fred r;gosline, john","totalStudents":8},{"courses_instructor":"milsom, william;tortell, philippe","totalStudents":11},{"courses_instructor":"douglas, carl;schulte, patricia","totalStudents":55},{"courses_instructor":"harley, christopher;whitton, jeannette","totalStudents":14},{"courses_instructor":"schulte, patricia;suttle, curtis","totalStudents":31},{"courses_instructor":"goheen, jacob;martone, patrick","totalStudents":13},{"courses_instructor":"chowrira, gangamma;jolliffe, peter a;mansfield, shawn;singh, santokh","totalStudents":35},{"courses_instructor":"kunst, ljerka;mansfield, shawn;singh, santokh","totalStudents":33},{"courses_instructor":"kunst, ljerka;mansfield, shawn","totalStudents":76},{"courses_instructor":"chen, jin-gui;singh, santokh;wasteneys, geoff","totalStudents":42},{"courses_instructor":"singh, santokh;wasteneys, geoff","totalStudents":93},{"courses_instructor":"sack, fred;singh, santokh","totalStudents":38},{"courses_instructor":"rosado rey, abel;singh, santokh","totalStudents":67},{"courses_instructor":"cooke, james;lacombe, agnes","totalStudents":138},{"courses_instructor":"schulte, patricia","totalStudents":199},{"courses_instructor":"lacombe, agnes","totalStudents":1897},{"courses_instructor":"altshuler, douglas","totalStudents":811},{"courses_instructor":"gardner, manuela","totalStudents":102},{"courses_instructor":"o'neill, angela;schulte, patricia","totalStudents":205},{"courses_instructor":"chen, jin-gui;wasteneys, geoff","totalStudents":222},{"courses_instructor":"hall, hardy","totalStudents":88},{"courses_instructor":"verhille, christine","totalStudents":5},{"courses_instructor":"brauner, colin;farrell, anthony","totalStudents":210},{"courses_instructor":"shehadeh, jacqueline","totalStudents":282},{"courses_instructor":"farrell, anthony;rosen, david","totalStudents":665},{"courses_instructor":"bystriansky, jason","totalStudents":63},{"courses_instructor":"farrell, anthony;meir, jessica","totalStudents":203},{"courses_instructor":"brauner, colin;bystriansky, jason","totalStudents":165},{"courses_instructor":"hammill, edd","totalStudents":31},{"courses_instructor":"trzcinski, mark","totalStudents":91},{"courses_instructor":"seneviratne, buddhakoralalage","totalStudents":18},{"courses_instructor":"angert, amy;bradfield, gary","totalStudents":63},{"courses_instructor":"lavallee, susanne","totalStudents":848},{"courses_instructor":"crutsinger, gregory","totalStudents":21},{"courses_instructor":"tseng, michelle","totalStudents":39},{"courses_instructor":"taylor, eric","totalStudents":264},{"courses_instructor":"mee, jonathan alan","totalStudents":108},{"courses_instructor":"jankowski, jill;taylor, eric","totalStudents":57},{"courses_instructor":"jankowski, jill","totalStudents":195},{"courses_instructor":"rieseberg, loren","totalStudents":72},{"courses_instructor":"hodgins, kay","totalStudents":13},{"courses_instructor":"vellend, mark","totalStudents":153},{"courses_instructor":"brodie, jedediah","totalStudents":58},{"courses_instructor":"gonzalez torres, luis","totalStudents":45},{"courses_instructor":"hansen, malin","totalStudents":51},{"courses_instructor":"maddison, wayne","totalStudents":127},{"courses_instructor":"lee, christopher","totalStudents":672},{"courses_instructor":"gow, jennifer louise","totalStudents":18},{"courses_instructor":"moreno geraldes, armando j","totalStudents":44},{"courses_instructor":"moreno geraldes, armando","totalStudents":29},{"courses_instructor":"schluter, dolph","totalStudents":167},{"courses_instructor":"vincent, amanda","totalStudents":70},{"courses_instructor":"ellis, brian;kronstad, james;li, xin","totalStudents":27},{"courses_instructor":"kronstad, james;li, xin","totalStudents":39},{"courses_instructor":"gosline, john;shadwick, robert edward","totalStudents":10},{"courses_instructor":"shadwick, robert edward","totalStudents":78},{"courses_instructor":"heath, joel","totalStudents":35},{"courses_instructor":"adams, keith","totalStudents":288},{"courses_instructor":"keeling, naomi","totalStudents":206},{"courses_instructor":"wasteneys, geoff","totalStudents":74},{"courses_instructor":"haughn, george;kunst, ljerka;li, xin","totalStudents":124},{"courses_instructor":"haughn, george;kunst, ljerka;zhang, yuelin","totalStudents":41},{"courses_instructor":"ritland, kermit","totalStudents":84},{"courses_instructor":"adams, keith;lee, jae-hyeok","totalStudents":24},{"courses_instructor":"chowrira, gangamma;lund, steven","totalStudents":25},{"courses_instructor":"lee, jae-hyeok","totalStudents":33},{"courses_instructor":"lund, steven","totalStudents":28},{"courses_instructor":"ng, david","totalStudents":228},{"courses_instructor":"fox, joanne alison","totalStudents":30},{"courses_instructor":"oser, scott","totalStudents":989},{"courses_instructor":"matsuuchi, linda","totalStudents":50},{"courses_instructor":"pante, nelly","totalStudents":154},{"courses_instructor":"abraham, ninan","totalStudents":87},{"courses_instructor":"graves, marcia;pante, nelly","totalStudents":22},{"courses_instructor":"pauly, daniel","totalStudents":214},{"courses_instructor":"berger, james;tortell, philippe","totalStudents":22},{"courses_instructor":"taylor, eric;tortell, philippe","totalStudents":28},{"courses_instructor":"moerman, donald;samuels, anne lacey","totalStudents":32},{"courses_instructor":"taylor, eric;zeiler, kathryn","totalStudents":17},{"courses_instructor":"samuels, anne lacey;taylor, eric","totalStudents":48},{"courses_instructor":"blake, robert wm;ganders, fred r","totalStudents":40},{"courses_instructor":"dhillon, rashpal singh","totalStudents":13},{"courses_instructor":"brink, deidre l.","totalStudents":83},{"courses_instructor":"brauner, colin","totalStudents":665},{"courses_instructor":"farrell, anthony","totalStudents":16},{"courses_instructor":"auld, vanessa","totalStudents":222},{"courses_instructor":"gordon, michael","totalStudents":551},{"courses_instructor":"hulme, oliver","totalStudents":169},{"courses_instructor":"close, david","totalStudents":351},{"courses_instructor":"rodela, tamara","totalStudents":87},{"courses_instructor":"gaudet, andrew;ramer, leanne","totalStudents":83},{"courses_instructor":"ramer, matthew","totalStudents":225},{"courses_instructor":"steeves, john","totalStudents":426},{"courses_instructor":"gaudet, andrew","totalStudents":44},{"courses_instructor":"cafferty, patrick;padash-barmchi, mojgan","totalStudents":36},{"courses_instructor":"gaudet, andrew;ramer, matthew","totalStudents":41},{"courses_instructor":"cafferty, patrick;westendorf, kathryn ann","totalStudents":40},{"courses_instructor":"altshuler, douglas;gordon, michael","totalStudents":56},{"courses_instructor":"bohlmann, jorg","totalStudents":246},{"courses_instructor":"viveiros, ryan","totalStudents":51},{"courses_instructor":"moerman, donald","totalStudents":24},{"courses_instructor":"mizumoto, kota","totalStudents":11},{"courses_instructor":"otto, sarah;whitlock, michael","totalStudents":8},{"courses_instructor":"berger, james;rosenberg, ellen","totalStudents":7},{"courses_instructor":"chowrira, gangamma;nomme, kathy margaret;samuels, anne lacey","totalStudents":9},{"courses_instructor":"chowrira, gangamma;samuels, anne lacey","totalStudents":6},{"courses_instructor":"berger, james;nomme, kathy margaret;samuels, anne lacey","totalStudents":8},{"courses_instructor":"birol, gulnur;rosenberg, ellen;samuels, anne lacey","totalStudents":9},{"courses_instructor":"krebs, claudia;mason, barry","totalStudents":60},{"courses_instructor":"young, j'nelle","totalStudents":44},{"courses_instructor":"chan, anthony;jaggi, bruno;milner, ruth","totalStudents":235},{"courses_instructor":"jaggi, bruno","totalStudents":166},{"courses_instructor":"cheung, karen;ma, hongshen;wilson, david","totalStudents":27},{"courses_instructor":"cheung, karen;ma, hongshen;wang, rizhi","totalStudents":14},{"courses_instructor":"ma, hongshen;wilson, david","totalStudents":14},{"courses_instructor":"van der loos, hendrik;wilson, david","totalStudents":10},{"courses_instructor":"hodgson, antony","totalStudents":31},{"courses_instructor":"wilson, david","totalStudents":31},{"courses_instructor":"chan, anthony;jaggi, bruno","totalStudents":51},{"courses_instructor":"chan, anthony","totalStudents":25},{"courses_instructor":"dumont, guy a","totalStudents":99},{"courses_instructor":"abolmaesumi, purang","totalStudents":24},{"courses_instructor":"cheung, karen;hodgson, antony","totalStudents":11},{"courses_instructor":"zhang, yuelin","totalStudents":14},{"courses_instructor":"bradfield, gary;keeling, naomi","totalStudents":14},{"courses_instructor":"graham, sean;kunst, ljerka","totalStudents":62},{"courses_instructor":"bradfield, gary;rosado rey, abel","totalStudents":31},{"courses_instructor":"rajwani, aziz","totalStudents":3721},{"courses_instructor":"norwood, peter","totalStudents":3267},{"courses_instructor":"chan, david","totalStudents":2458},{"courses_instructor":"amlani, alym","totalStudents":158},{"courses_instructor":"schulz, martin","totalStudents":885},{"courses_instructor":"broderick, george","totalStudents":546},{"courses_instructor":"robinson, sandra","totalStudents":454},{"courses_instructor":"ananthanarayana, girish","totalStudents":115},{"courses_instructor":"kon, janina","totalStudents":180},{"courses_instructor":"crawford, david robert","totalStudents":1725},{"courses_instructor":"cheung, yau man","totalStudents":2210},{"courses_instructor":"wufka, michael","totalStudents":700},{"courses_instructor":"bera, palash","totalStudents":151},{"courses_instructor":"kim, julie","totalStudents":147},{"courses_instructor":"aleem, muhammad usman","totalStudents":592},{"courses_instructor":"yee, doug","totalStudents":1642},{"courses_instructor":"wyntjes, barbara","totalStudents":411},{"courses_instructor":"bruce, robert brian","totalStudents":382},{"courses_instructor":"jeyakumar, paul","totalStudents":123},{"courses_instructor":"lee, grant","totalStudents":920},{"courses_instructor":"onufrechuk, shane","totalStudents":45},{"courses_instructor":"chong, mary","totalStudents":1916},{"courses_instructor":"mcintosh, john graham","totalStudents":106},{"courses_instructor":"delibalta, fabienne","totalStudents":213},{"courses_instructor":"cox, barbara","totalStudents":1370},{"courses_instructor":"kanhai, devin","totalStudents":168},{"courses_instructor":"parker, bryan","totalStudents":1949},{"courses_instructor":"newton, sanuel","totalStudents":45},{"courses_instructor":"campbell, chuck","totalStudents":4244},{"courses_instructor":"calder, ryan","totalStudents":427},{"courses_instructor":"lang, amy","totalStudents":22},{"courses_instructor":"simunic, dan","totalStudents":496},{"courses_instructor":"ladha, zahra","totalStudents":764},{"courses_instructor":"diehl, robin","totalStudents":585},{"courses_instructor":"ilsever, yalcin","totalStudents":214},{"courses_instructor":"james, kevin","totalStudents":237},{"courses_instructor":"moore, edwin d;osborne, salma;roskelley, calvin;yule, heather","totalStudents":7},{"courses_instructor":"haas, kurt;hammond, geoffrey lewis;kindler, pawel;osborne, salma","totalStudents":9},{"courses_instructor":"kwok, yin nam kenny","totalStudents":1505},{"courses_instructor":"baimbridge, kenneth;clee, susanne michelle;courneya, carol-ann;haas, kurt;horne, andrew;kehl, steven;kwok, yin nam kenny;mason, barry;moukhles, hakima;osborne, salma;tanentzapf, guy","totalStudents":21},{"courses_instructor":"accili, eric;clee, susanne michelle;horne, andrew;kindler, pawel;kwok, yin nam kenny;osborne, salma;tanentzapf, guy","totalStudents":21},{"courses_instructor":"osborne, salma","totalStudents":17},{"courses_instructor":"kopp, janel;loewen, christopher;moukhles, hakima;o'connor, timothy;roskelley, calvin;tanentzapf, guy;viau, victor","totalStudents":364},{"courses_instructor":"roskelley, calvin","totalStudents":1242},{"courses_instructor":"doroudi, majid","totalStudents":612},{"courses_instructor":"nabi, ivan robert;underhill, tully michael","totalStudents":120},{"courses_instructor":"courneya, carol-ann;kehl, steven;moore, edwin d;osborne, salma","totalStudents":25},{"courses_instructor":"moore, edwin d;osborne, salma","totalStudents":45},{"courses_instructor":"clee, susanne michelle;kieffer, tim;kwok, yin nam kenny;lynn, francis","totalStudents":23},{"courses_instructor":"baimbridge, kenneth;clee, susanne michelle;hammond, geoffrey lewis;hoffman, bradford;kieffer, tim;kindler, pawel;luciani, dan;verchere, bruce;viau, victor","totalStudents":41},{"courses_instructor":"baimbridge, kenneth","totalStudents":20},{"courses_instructor":"allan, douglas;baimbridge, kenneth;haas, kurt;kehl, steven","totalStudents":43},{"courses_instructor":"kehl, steven","totalStudents":19},{"courses_instructor":"allan, douglas;baimbridge, kenneth;clee, susanne michelle;haas, kurt;hammond, geoffrey lewis;johnson, james;kieffer, tim;loewen, christopher;luciani, dan;mason, barry;osborne, salma;tanentzapf, guy","totalStudents":15},{"courses_instructor":"accili, eric;allan, douglas;kieffer, tim;kurata, harley;luciani, dan;mason, barry","totalStudents":8},{"courses_instructor":"allan, douglas","totalStudents":11},{"courses_instructor":"kieffer, tim","totalStudents":55},{"courses_instructor":"james, gareth","totalStudents":655},{"courses_instructor":"watson, scott","totalStudents":7},{"courses_instructor":"wallace, keith","totalStudents":6},{"courses_instructor":"mazzi, eric","totalStudents":76},{"courses_instructor":"rogak, steven nicholas","totalStudents":437},{"courses_instructor":"prodanovic, vladan zoran","totalStudents":88},{"courses_instructor":"bi, xiaotao","totalStudents":1241},{"courses_instructor":"wilkinson, david","totalStudents":265},{"courses_instructor":"mazzi, eric;wilkinson, david","totalStudents":3},{"courses_instructor":"allan, douglas;bamji, shernaz;loewen, christopher","totalStudents":93},{"courses_instructor":"o'connor, timothy","totalStudents":35},{"courses_instructor":"loewen, christopher;nabi, ivan robert","totalStudents":46},{"courses_instructor":"haas, kurt","totalStudents":67},{"courses_instructor":"underhill, tully michael","totalStudents":86},{"courses_instructor":"clee, susanne michelle","totalStudents":17},{"courses_instructor":"tanentzapf, guy","totalStudents":25},{"courses_instructor":"johnson, james","totalStudents":29},{"courses_instructor":"eming, jutta;gassner, florian","totalStudents":46},{"courses_instructor":"gassner, florian","totalStudents":417},{"courses_instructor":"zaenker, karl a","totalStudents":193},{"courses_instructor":"frackman, kyle","totalStudents":234},{"courses_instructor":"prykhodko, dariya","totalStudents":421},{"courses_instructor":"eming, jutta","totalStudents":78},{"courses_instructor":"beringer, alison","totalStudents":173},{"courses_instructor":"salumets, thomas;schenkel, guido","totalStudents":48},{"courses_instructor":"schade, silke","totalStudents":160},{"courses_instructor":"beringer, alison;salumets, thomas","totalStudents":43},{"courses_instructor":"winthrop-young, geoffrey","totalStudents":853},{"courses_instructor":"stenberg, peter a","totalStudents":83},{"courses_instructor":"iurascu, ilinca","totalStudents":180},{"courses_instructor":"hallensleben, markus","totalStudents":241},{"courses_instructor":"lieblang, jason","totalStudents":396},{"courses_instructor":"taubeneck, steven","totalStudents":848},{"courses_instructor":"salumets, thomas","totalStudents":457},{"courses_instructor":"bunch, mads jensen","totalStudents":193},{"courses_instructor":"salumets, thomas;stenberg, peter a","totalStudents":89},{"courses_instructor":"toor, gorsharn","totalStudents":389},{"courses_instructor":"doubivko, elena  alex","totalStudents":57},{"courses_instructor":"pailer, gaby","totalStudents":79},{"courses_instructor":"karwowska, bozena;pailer, gaby","totalStudents":40},{"courses_instructor":"iurascu, ilinca;karwowska, bozena","totalStudents":15},{"courses_instructor":"feng, james jingtao","totalStudents":1268},{"courses_instructor":"martinez, mark","totalStudents":768},{"courses_instructor":"gyenge, elod lajos","totalStudents":765},{"courses_instructor":"gyenge, christina","totalStudents":685},{"courses_instructor":"posarac, dusko","totalStudents":846},{"courses_instructor":"verrett, jonathan","totalStudents":182},{"courses_instructor":"mohseni, madjid","totalStudents":810},{"courses_instructor":"englezos, peter","totalStudents":671},{"courses_instructor":"gopaluni, bhushan","totalStudents":869},{"courses_instructor":"derakhshandeh, babak","totalStudents":402},{"courses_instructor":"lam, pak sui","totalStudents":376},{"courses_instructor":"al-darbi, muhannad","totalStudents":369},{"courses_instructor":"hatzikiriakos, savvas","totalStudents":1204},{"courses_instructor":"berlinguette, curtis;kannangara, dhaneshwarie","totalStudents":227},{"courses_instructor":"kannangara, dhaneshwarie;petrell, royann jean","totalStudents":86},{"courses_instructor":"ellis, naoko","totalStudents":837},{"courses_instructor":"kwok, k ezra","totalStudents":628},{"courses_instructor":"bennington, chad","totalStudents":71},{"courses_instructor":"smith, kevin","totalStudents":592},{"courses_instructor":"behzadfar, ehsan","totalStudents":69},{"courses_instructor":"trajano, heather","totalStudents":462},{"courses_instructor":"taghipour, fariborz","totalStudents":211},{"courses_instructor":"creagh, aimee louise;kannangara, dhaneshwarie","totalStudents":402},{"courses_instructor":"lau, anthony k","totalStudents":1507},{"courses_instructor":"ellis, naoko;gopaluni, bhushan","totalStudents":82},{"courses_instructor":"gopaluni, bhushan;kannangara, dhaneshwarie","totalStudents":82},{"courses_instructor":"duff, sheldon;kannangara, dhaneshwarie","totalStudents":26},{"courses_instructor":"duff, sheldon","totalStudents":127},{"courses_instructor":"creagh, aimee louise","totalStudents":263},{"courses_instructor":"creagh, aimee louise;muttray, annette f","totalStudents":21},{"courses_instructor":"baldwin, susan;kannangara, dhaneshwarie","totalStudents":56},{"courses_instructor":"imoberdorf, gustavo eduardo","totalStudents":299},{"courses_instructor":"lim, choon jim","totalStudents":568},{"courses_instructor":"bagherzadeh hosseini, seyyed a","totalStudents":156},{"courses_instructor":"piret, james","totalStudents":288},{"courses_instructor":"sella kapu, nuwan","totalStudents":26},{"courses_instructor":"lim, choon jim;posarac, dusko","totalStudents":4},{"courses_instructor":"baldwin, susan;lim, choon jim;posarac, dusko","totalStudents":81},{"courses_instructor":"baldwin, susan","totalStudents":283},{"courses_instructor":"baldwin, susan;forbes, michael;lim, choon jim;smith, kevin","totalStudents":49},{"courses_instructor":"baldwin, susan;posarac, dusko;smith, kevin","totalStudents":86},{"courses_instructor":"yadav, vikramaditya","totalStudents":303},{"courses_instructor":"gyenge, christina;gyenge, elod lajos;petrell, royann jean","totalStudents":77},{"courses_instructor":"creagh, aimee louise;gyenge, elod lajos;kannangara, dhaneshwarie","totalStudents":58},{"courses_instructor":"gyenge, christina;lau, anthony k","totalStudents":67},{"courses_instructor":"gyenge, elod lajos;kannangara, dhaneshwarie;lau, anthony k;petrell, royann jean","totalStudents":71},{"courses_instructor":"gyenge, elod lajos;kannangara, dhaneshwarie;petrell, royann jean","totalStudents":70},{"courses_instructor":"haynes, charles","totalStudents":200},{"courses_instructor":"wilde, geoffrey","totalStudents":12},{"courses_instructor":"wachs, anthony","totalStudents":32},{"courses_instructor":"bi, xiaotao;ellis, naoko;grace, john ross;lim, choon jim;taghipour, fariborz","totalStudents":8},{"courses_instructor":"bi, xiaotao;ellis, naoko;grace, john ross;taghipour, fariborz","totalStudents":5},{"courses_instructor":"bi, xiaotao;ellis, naoko","totalStudents":2},{"courses_instructor":"mohseni, madjid;petrell, royann jean","totalStudents":9},{"courses_instructor":"gyenge, elod lajos;wilkinson, david","totalStudents":12},{"courses_instructor":"herring, f geoffrey","totalStudents":846},{"courses_instructor":"gates, derek","totalStudents":493},{"courses_instructor":"wassell, peter","totalStudents":707},{"courses_instructor":"crane, angela;herring, f geoffrey","totalStudents":213},{"courses_instructor":"herring, f geoffrey;wassell, peter","totalStudents":216},{"courses_instructor":"monga, vishakha","totalStudents":1059},{"courses_instructor":"lekhi, priya;rodriguez nunez, jose","totalStudents":465},{"courses_instructor":"lekhi, priya;wolf, michael","totalStudents":912},{"courses_instructor":"lekhi, priya;mehrkhodavandi, parisa","totalStudents":775},{"courses_instructor":"lekhi, priya","totalStudents":2269},{"courses_instructor":"addison, christopher;lekhi, priya","totalStudents":140},{"courses_instructor":"berlinguette, curtis;lekhi, priya","totalStudents":152},{"courses_instructor":"krems, roman","totalStudents":477},{"courses_instructor":"orvig, christopher e","totalStudents":851},{"courses_instructor":"lindenberg, erin","totalStudents":391},{"courses_instructor":"hudson, zachary","totalStudents":401},{"courses_instructor":"terpstra, andrea","totalStudents":184},{"courses_instructor":"legzdins, peter","totalStudents":1202},{"courses_instructor":"therrien, jeffrey","totalStudents":180},{"courses_instructor":"gates, derek;lekhi, priya;wolf, michael","totalStudents":155},{"courses_instructor":"chou, keng chang;gates, derek;krems, roman;lekhi, priya","totalStudents":191},{"courses_instructor":"gates, derek;krems, roman;lekhi, priya;maclachlan, mark","totalStudents":179},{"courses_instructor":"gates, derek;krems, roman;lekhi, priya","totalStudents":809},{"courses_instructor":"gates, derek;krems, roman;kunz, tamara;lekhi, priya","totalStudents":296},{"courses_instructor":"gates, derek;krems, roman;lekhi, priya;mcintosh, lawrence","totalStudents":171},{"courses_instructor":"kunz, tamara","totalStudents":241},{"courses_instructor":"lekhi, priya;maclachlan, mark","totalStudents":365},{"courses_instructor":"lekhi, priya;new, olivia martina","totalStudents":370},{"courses_instructor":"kunz, tamara;lekhi, priya","totalStudents":480},{"courses_instructor":"lekhi, priya;macfarlane, william andrew","totalStudents":138},{"courses_instructor":"gates, derek;lekhi, priya","totalStudents":313},{"courses_instructor":"gates, derek;lekhi, priya;thachuk, mark","totalStudents":193},{"courses_instructor":"gates, derek;lekhi, priya;stewart, jaclyn","totalStudents":195},{"courses_instructor":"gates, derek;lekhi, priya;mcintosh, lawrence","totalStudents":211},{"courses_instructor":"burtnick, leslie d;gates, derek;lekhi, priya","totalStudents":350},{"courses_instructor":"gates, derek;lekhi, priya;mehrkhodavandi, parisa","totalStudents":190},{"courses_instructor":"crane, angela;rodriguez nunez, jose","totalStudents":140},{"courses_instructor":"crane, angela;wolf, michael","totalStudents":373},{"courses_instructor":"berlinguette, curtis;crane, angela","totalStudents":197},{"courses_instructor":"crane, angela;maclachlan, mark","totalStudents":216},{"courses_instructor":"crane, angela;mehrkhodavandi, parisa","totalStudents":184},{"courses_instructor":"crane, angela","totalStudents":476},{"courses_instructor":"crane, angela;monga, vishakha","totalStudents":185},{"courses_instructor":"burnell, e elliott;lekhi, priya","totalStudents":319},{"courses_instructor":"krems, roman;lekhi, priya","totalStudents":189},{"courses_instructor":"rodriguez nunez, jose","totalStudents":768},{"courses_instructor":"berlinguette, curtis","totalStudents":188},{"courses_instructor":"maclachlan, mark","totalStudents":196},{"courses_instructor":"crane, angela;sammis, glenn","totalStudents":146},{"courses_instructor":"crane, angela;lekhi, priya;sammis, glenn;straus, suzana","totalStudents":139},{"courses_instructor":"crane, angela;lekhi, priya;schafer, laurel","totalStudents":218},{"courses_instructor":"crane, angela;lekhi, priya;ryan, katherine;straus, suzana","totalStudents":206},{"courses_instructor":"crane, angela;grant, edward;lekhi, priya;ryan, katherine","totalStudents":228},{"courses_instructor":"crane, angela;grant, edward;lekhi, priya;sammis, glenn","totalStudents":217},{"courses_instructor":"bates, gordon;crane, angela;lekhi, priya","totalStudents":203},{"courses_instructor":"bates, gordon;crane, angela;lekhi, priya;li, hongbin","totalStudents":198},{"courses_instructor":"lekhi, priya;love, jennifer ann","totalStudents":325},{"courses_instructor":"addison, christopher;lekhi, priya;love, jennifer ann;sammis, glenn","totalStudents":368},{"courses_instructor":"grant, edward;lekhi, priya;love, jennifer ann;sherman, john","totalStudents":402},{"courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;rogers, christine","totalStudents":264},{"courses_instructor":"bizzotto, dan;lekhi, priya;sammis, glenn","totalStudents":147},{"courses_instructor":"addison, christopher;lekhi, priya;ryan, katherine","totalStudents":839},{"courses_instructor":"grant, edward;kunz, tamara;lekhi, priya","totalStudents":394},{"courses_instructor":"grant, edward;lekhi, priya;sammis, glenn","totalStudents":440},{"courses_instructor":"bizzotto, dan;kunz, tamara;lekhi, priya","totalStudents":204},{"courses_instructor":"bizzotto, dan;lekhi, priya;love, jennifer ann;macfarlane, william andrew","totalStudents":147},{"courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;ruddick, john n r","totalStudents":387},{"courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;patey, grenfell;sherman, john","totalStudents":435},{"courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;stewart, jaclyn","totalStudents":372},{"courses_instructor":"lekhi, priya;love, jennifer ann;macfarlane, william andrew;monga, vishakha","totalStudents":189},{"courses_instructor":"addison, christopher","totalStudents":708},{"courses_instructor":"dake, gregory;li, hongbin","totalStudents":126},{"courses_instructor":"schafer, laurel","totalStudents":563},{"courses_instructor":"johnson, kayli","totalStudents":250},{"courses_instructor":"ryan, katherine","totalStudents":233},{"courses_instructor":"sammis, glenn","totalStudents":632},{"courses_instructor":"bates, gordon;lekhi, priya","totalStudents":417},{"courses_instructor":"lekhi, priya;sammis, glenn;straus, suzana","totalStudents":151},{"courses_instructor":"kunz, tamara;lekhi, priya;straus, suzana","totalStudents":180},{"courses_instructor":"lekhi, priya;monga, vishakha","totalStudents":119},{"courses_instructor":"johnson, kayli;lindenberg, erin","totalStudents":141},{"courses_instructor":"chou, keng chang;hein, jason","totalStudents":411},{"courses_instructor":"crane, angela;li, hongbin","totalStudents":391},{"courses_instructor":"crane, angela;wang, yan","totalStudents":91},{"courses_instructor":"burnell, e elliott","totalStudents":1043},{"courses_instructor":"wang, yan","totalStudents":2317},{"courses_instructor":"hoogendoorn, irma","totalStudents":650},{"courses_instructor":"scott, walter","totalStudents":819},{"courses_instructor":"gibson, gregory","totalStudents":58},{"courses_instructor":"ciufolini, marco","totalStudents":1872},{"courses_instructor":"dake, gregory","totalStudents":1385},{"courses_instructor":"patey, grenfell;wang, yan","totalStudents":353},{"courses_instructor":"bussiere, guillaume;wang, yan","totalStudents":391},{"courses_instructor":"chen, david;wang, yan","totalStudents":179},{"courses_instructor":"signorell, ruth","totalStudents":452},{"courses_instructor":"bussiere, guillaume;li, hongbin","totalStudents":488},{"courses_instructor":"burnell, e elliott;straus, suzana","totalStudents":1002},{"courses_instructor":"bussiere, guillaume;chen, david","totalStudents":733},{"courses_instructor":"shapiro, moshe","totalStudents":134},{"courses_instructor":"li, hongbin","totalStudents":379},{"courses_instructor":"burnell, e elliott;wang, yan","totalStudents":164},{"courses_instructor":"patey, grenfell","totalStudents":524},{"courses_instructor":"chen, david","totalStudents":394},{"courses_instructor":"bussiere, guillaume","totalStudents":185},{"courses_instructor":"kennepohl, pierre","totalStudents":314},{"courses_instructor":"algar, walter","totalStudents":323},{"courses_instructor":"blades, michael","totalStudents":743},{"courses_instructor":"stoodley, robin","totalStudents":531},{"courses_instructor":"algar, walter;rodriguez nunez, jose","totalStudents":72},{"courses_instructor":"perrin, david","totalStudents":992},{"courses_instructor":"love, jennifer ann","totalStudents":258},{"courses_instructor":"lermer, leonard","totalStudents":496},{"courses_instructor":"stewart, jaclyn","totalStudents":2196},{"courses_instructor":"dake, gregory;stewart, jaclyn","totalStudents":800},{"courses_instructor":"perrin, david;stewart, jaclyn","totalStudents":315},{"courses_instructor":"loosley, benjamin;stewart, jaclyn","totalStudents":202},{"courses_instructor":"stewart, jaclyn;withers, stephen","totalStudents":562},{"courses_instructor":"ruddick, john n r;stewart, jaclyn","totalStudents":829},{"courses_instructor":"rogers, christine;stewart, jaclyn","totalStudents":776},{"courses_instructor":"wickenden, jason","totalStudents":646},{"courses_instructor":"stewart, jaclyn;wickenden, jason","totalStudents":221},{"courses_instructor":"jetter, reinhard;stewart, jaclyn","totalStudents":159},{"courses_instructor":"herring, f geoffrey;stewart, jaclyn","totalStudents":152},{"courses_instructor":"stewart, jaclyn;tanner, martin","totalStudents":170},{"courses_instructor":"dake, gregory;tanner, martin","totalStudents":159},{"courses_instructor":"dake, gregory;perrin, david","totalStudents":340},{"courses_instructor":"zendrowski, dana","totalStudents":8486},{"courses_instructor":"wickenden, jason;zendrowski, dana","totalStudents":150},{"courses_instructor":"kunz, tamara;rogers, christine;zendrowski, dana","totalStudents":17},{"courses_instructor":"rogers, christine","totalStudents":773},{"courses_instructor":"rogers, christine;wickenden, jason","totalStudents":195},{"courses_instructor":"iyer, subramanian","totalStudents":87},{"courses_instructor":"cawthray, jacquie;monga, vishakha","totalStudents":89},{"courses_instructor":"chou, keng chang","totalStudents":320},{"courses_instructor":"overduin, sarah","totalStudents":81},{"courses_instructor":"bertram, allan","totalStudents":600},{"courses_instructor":"sherman, john","totalStudents":1142},{"courses_instructor":"tanner, martin","totalStudents":464},{"courses_instructor":"grant, edward","totalStudents":60},{"courses_instructor":"orians, kristin","totalStudents":1402},{"courses_instructor":"momose, takamasa","totalStudents":565},{"courses_instructor":"wheeler, michael","totalStudents":421},{"courses_instructor":"thachuk, mark","totalStudents":451},{"courses_instructor":"burtnick, leslie d","totalStudents":199},{"courses_instructor":"straus, suzana","totalStudents":144},{"courses_instructor":"bizzotto, dan","totalStudents":469},{"courses_instructor":"bates, josh;bussiere, guillaume;rogers, christine;stoodley, robin","totalStudents":99},{"courses_instructor":"bussiere, guillaume;rogers, christine","totalStudents":628},{"courses_instructor":"bussiere, guillaume;monga, vishakha;rogers, christine;stoodley, robin","totalStudents":868},{"courses_instructor":"bussiere, guillaume;monga, vishakha;racicot, leanne;stoodley, robin","totalStudents":182},{"courses_instructor":"bussiere, guillaume;monga, vishakha;rodriguez nunez, jose;rogers, christine;stoodley, robin","totalStudents":95},{"courses_instructor":"brumer, harry","totalStudents":221},{"courses_instructor":"kast, juergen","totalStudents":156},{"courses_instructor":"brumer, harry;jetter, reinhard","totalStudents":99},{"courses_instructor":"kast, juergen;xia, paul zhicheng","totalStudents":183},{"courses_instructor":"shapiro, evgeny","totalStudents":3},{"courses_instructor":"macfarlane, william andrew","totalStudents":116},{"courses_instructor":"patrick, brian","totalStudents":130},{"courses_instructor":"gates, derek;kizhakkedathu, jayachandran","totalStudents":25},{"courses_instructor":"fyfe, colin","totalStudents":28},{"courses_instructor":"fleming, donald","totalStudents":24},{"courses_instructor":"burke, sarah","totalStudents":499},{"courses_instructor":"wolf, michael","totalStudents":138},{"courses_instructor":"cawthray, jacquie","totalStudents":30},{"courses_instructor":"fryzuk, michael","totalStudents":60},{"courses_instructor":"bates, gordon;grant, edward","totalStudents":45},{"courses_instructor":"bates, gordon;fryzuk, michael","totalStudents":51},{"courses_instructor":"blades, michael;turner, robin","totalStudents":69},{"courses_instructor":"andersen, raymond","totalStudents":61},{"courses_instructor":"wu, xinxin","totalStudents":876},{"courses_instructor":"lu, ming zhu","totalStudents":1077},{"courses_instructor":"zheng, zhining","totalStudents":1797},{"courses_instructor":"wang, qian","totalStudents":226},{"courses_instructor":"lin, chien-ju","totalStudents":253},{"courses_instructor":"xia, wei","totalStudents":480},{"courses_instructor":"lee, an-yi","totalStudents":178},{"courses_instructor":"fan, ya-ting","totalStudents":176},{"courses_instructor":"chen, hsueh ni","totalStudents":275},{"courses_instructor":"liu, diane","totalStudents":283},{"courses_instructor":"li, tianming","totalStudents":850},{"courses_instructor":"li, duanduan;wang, tianxuan","totalStudents":22},{"courses_instructor":"chang, kuo-mei","totalStudents":66},{"courses_instructor":"kuo, yu-chi","totalStudents":184},{"courses_instructor":"cheng, maorong","totalStudents":1495},{"courses_instructor":"yang, liqiong","totalStudents":388},{"courses_instructor":"liu, xue shun","totalStudents":933},{"courses_instructor":"mou, huai-chuan","totalStudents":1567},{"courses_instructor":"zheng, ming fang","totalStudents":600},{"courses_instructor":"chen, robert s","totalStudents":2732},{"courses_instructor":"schmidt, jerry dean","totalStudents":731},{"courses_instructor":"tsiknis, georgios","totalStudents":3541},{"courses_instructor":"liu, xing","totalStudents":30},{"courses_instructor":"talebpourazad, mahsa","totalStudents":30},{"courses_instructor":"fisher, brian","totalStudents":32},{"courses_instructor":"nesbit, susan","totalStudents":1673},{"courses_instructor":"crofton, fiona","totalStudents":898},{"courses_instructor":"isaacson, michael d","totalStudents":1244},{"courses_instructor":"isaacson, michael d;johnson, gregory;staub-french, sheryl","totalStudents":256},{"courses_instructor":"berube, pierre;isaacson, michael d;johnson, gregory","totalStudents":259},{"courses_instructor":"hall, eric;isaacson, michael d;johnson, gregory","totalStudents":124},{"courses_instructor":"fannin, r jonathan","totalStudents":520},{"courses_instructor":"fannin, r jonathan;taiebat, mahdi","totalStudents":1161},{"courses_instructor":"taiebat, mahdi","totalStudents":250},{"courses_instructor":"lawrence, gregory","totalStudents":1027},{"courses_instructor":"yonemitsu, noboru","totalStudents":1639},{"courses_instructor":"laval, bernard","totalStudents":993},{"courses_instructor":"martin, violeta","totalStudents":358},{"courses_instructor":"joghataie, abdolreza","totalStudents":445},{"courses_instructor":"yang, tsung-yuan","totalStudents":876},{"courses_instructor":"elwood, kenneth john","totalStudents":954},{"courses_instructor":"vaziri, reza","totalStudents":454},{"courses_instructor":"adebar, perry erwin","totalStudents":1227},{"courses_instructor":"forghani, alireza","totalStudents":306},{"courses_instructor":"bebam zadeh, armin","totalStudents":962},{"courses_instructor":"tannert, thomas","totalStudents":855},{"courses_instructor":"stiemer, siegfried","totalStudents":716},{"courses_instructor":"froese, thomas;nelms, cheryl","totalStudents":296},{"courses_instructor":"nelms, cheryl","totalStudents":321},{"courses_instructor":"lence, barbara jean","totalStudents":570},{"courses_instructor":"vanier, dana;wahba, mohamed","totalStudents":122},{"courses_instructor":"isaacson, michael d;joghataie, abdolreza","totalStudents":133},{"courses_instructor":"naghibi, ali","totalStudents":132},{"courses_instructor":"lo, kwang victor","totalStudents":129},{"courses_instructor":"hall, eric;mavinic, donald","totalStudents":328},{"courses_instructor":"keen, patricia;lo, kwang victor;mavinic, donald","totalStudents":142},{"courses_instructor":"howie, john;wijewickreme, dharmapriya","totalStudents":506},{"courses_instructor":"amini, ali;howie, john;taiebat, mahdi","totalStudents":167},{"courses_instructor":"wijewickreme, dharmapriya","totalStudents":1069},{"courses_instructor":"millar, robert;yonemitsu, noboru","totalStudents":170},{"courses_instructor":"millar, robert","totalStudents":1209},{"courses_instructor":"martin, violeta;millar, robert","totalStudents":146},{"courses_instructor":"mcgrath, patrick","totalStudents":1334},{"courses_instructor":"pina, freddy;tannert, thomas","totalStudents":260},{"courses_instructor":"francis, ralph","totalStudents":110},{"courses_instructor":"stiemer, siegfried;tannert, thomas","totalStudents":153},{"courses_instructor":"haukaas, terje","totalStudents":1518},{"courses_instructor":"sayed, tarek","totalStudents":1083},{"courses_instructor":"zein, sany","totalStudents":139},{"courses_instructor":"navin, francis p d","totalStudents":162},{"courses_instructor":"wallace, craig","totalStudents":195},{"courses_instructor":"shapiro, bryan","totalStudents":1296},{"courses_instructor":"russell, alan david","totalStudents":432},{"courses_instructor":"isaacson, michael d;russell, alan david","totalStudents":141},{"courses_instructor":"atwater, james","totalStudents":263},{"courses_instructor":"mavinic, donald;robinson, shona;winter, joerg","totalStudents":130},{"courses_instructor":"berube, pierre;lo, kwang victor","totalStudents":410},{"courses_instructor":"berube, pierre","totalStudents":371},{"courses_instructor":"lo, kwang victor;mavinic, donald","totalStudents":239},{"courses_instructor":"hall, eric","totalStudents":85},{"courses_instructor":"li, loretta","totalStudents":258},{"courses_instructor":"chieng, sie-tan","totalStudents":279},{"courses_instructor":"hers, ian;patrick, guy;zapf-gilje, reider","totalStudents":61},{"courses_instructor":"nazhat, yahya","totalStudents":77},{"courses_instructor":"howie, john","totalStudents":915},{"courses_instructor":"sully, john","totalStudents":83},{"courses_instructor":"howie, john;nazhat, yahya","totalStudents":87},{"courses_instructor":"amini, ali","totalStudents":85},{"courses_instructor":"fannin, r jonathan;howie, john;shuttle, dawn;wijewickreme, dharmapriya","totalStudents":60},{"courses_instructor":"shawwash, ziad k","totalStudents":162},{"courses_instructor":"weijs, steven","totalStudents":73},{"courses_instructor":"zanotti, cristina","totalStudents":24},{"courses_instructor":"gupta, rishi","totalStudents":46},{"courses_instructor":"metten, andrew","totalStudents":97},{"courses_instructor":"loewen, nathan paul","totalStudents":49},{"courses_instructor":"kuan, steven","totalStudents":35},{"courses_instructor":"ventura, carlos estuardo","totalStudents":542},{"courses_instructor":"foschi, ricardo","totalStudents":136},{"courses_instructor":"gereke, thomas","totalStudents":29},{"courses_instructor":"lim, clark","totalStudents":123},{"courses_instructor":"jenkins, dr jacqueline","totalStudents":69},{"courses_instructor":"bigazzi, alexander york","totalStudents":61},{"courses_instructor":"wahba, mohamed","totalStudents":38},{"courses_instructor":"zhao, jinhua","totalStudents":103},{"courses_instructor":"bourne, michael;derksen, ruth;isaacson, michael d;li, loretta;mavinic, donald;nazhat, yahya;nesbit, susan;sanghara, hartaj","totalStudents":124},{"courses_instructor":"howie, john;johnson, gregory;lo, kwang victor;ventura, carlos estuardo","totalStudents":126},{"courses_instructor":"li, loretta;lo, kwang victor;stiemer, siegfried","totalStudents":126},{"courses_instructor":"atwater, james;howie, john;lence, barbara jean;ventura, carlos estuardo","totalStudents":108},{"courses_instructor":"lo, kwang victor;nazhat, yahya;nesbit, susan","totalStudents":131},{"courses_instructor":"chieng, sie-tan;isaacson, michael d;lence, barbara jean;ventura, carlos estuardo","totalStudents":131},{"courses_instructor":"chieng, sie-tan;stiemer, siegfried","totalStudents":281},{"courses_instructor":"chieng, sie-tan;nesbit, susan;stiemer, siegfried","totalStudents":148},{"courses_instructor":"bourne, michael;derksen, ruth;keen, patricia;lo, kwang victor;nazhat, yahya;sanghara, hartaj","totalStudents":125},{"courses_instructor":"howie, john;mavinic, donald;stiemer, siegfried","totalStudents":131},{"courses_instructor":"lence, barbara jean;lo, kwang victor;nazhat, yahya","totalStudents":131},{"courses_instructor":"atwater, james;chieng, sie-tan;stiemer, siegfried","totalStudents":142},{"courses_instructor":"vanier, dana","totalStudents":201},{"courses_instructor":"froese, thomas;vanier, dana","totalStudents":71},{"courses_instructor":"froese, thomas","totalStudents":389},{"courses_instructor":"froese, thomas;russell, alan david","totalStudents":54},{"courses_instructor":"finn, william d","totalStudents":172},{"courses_instructor":"dowling, jason","totalStudents":28},{"courses_instructor":"pina, freddy","totalStudents":5},{"courses_instructor":"russell, alan","totalStudents":57},{"courses_instructor":"dunbar, w scott;russell, alan david","totalStudents":48},{"courses_instructor":"de zoysa, garumuni sanjaya","totalStudents":10},{"courses_instructor":"froese, thomas;vanier, dana;wahba, mohamed","totalStudents":66},{"courses_instructor":"samuels, brian","totalStudents":304},{"courses_instructor":"samilski, mike","totalStudents":26},{"courses_instructor":"banthia, nemkumar","totalStudents":54},{"courses_instructor":"berube, pierre;lo, kwang victor;mavinic, donald","totalStudents":8},{"courses_instructor":"mavinic, donald","totalStudents":69},{"courses_instructor":"fannin, r jonathan;taiebat, mahdi;wijewickreme, dharmapriya","totalStudents":21},{"courses_instructor":"shuttle, dawn;wijewickreme, dharmapriya","totalStudents":6},{"courses_instructor":"howie, john;taiebat, mahdi;wijewickreme, dharmapriya","totalStudents":17},{"courses_instructor":"fannin, r jonathan;howie, john;taiebat, mahdi;wijewickreme, dharmapriya","totalStudents":20},{"courses_instructor":"li, loretta;taiebat, mahdi;wijewickreme, dharmapriya","totalStudents":33},{"courses_instructor":"mcelduff, siobhan","totalStudents":1108},{"courses_instructor":"marshall, hallie","totalStudents":369},{"courses_instructor":"kennell, nigel","totalStudents":157},{"courses_instructor":"yoon, florence","totalStudents":509},{"courses_instructor":"minard, mark antone","totalStudents":382},{"courses_instructor":"cronkite, susan-marie","totalStudents":90},{"courses_instructor":"griffin, michael","totalStudents":819},{"courses_instructor":"braund, susan","totalStudents":227},{"courses_instructor":"marshall, christopher warren","totalStudents":161},{"courses_instructor":"mcintyre, gwynaeth","totalStudents":523},{"courses_instructor":"rae, andrea lyn","totalStudents":357},{"courses_instructor":"gorrie, charmaine","totalStudents":694},{"courses_instructor":"knight, jayne","totalStudents":83},{"courses_instructor":"fisher, kevin","totalStudents":236},{"courses_instructor":"wilson, roger","totalStudents":96},{"courses_instructor":"varto, emily k","totalStudents":14},{"courses_instructor":"mccarty, matthew","totalStudents":61},{"courses_instructor":"williams, caroline","totalStudents":89},{"courses_instructor":"williams, e hector","totalStudents":54},{"courses_instructor":"bunn, robert","totalStudents":38},{"courses_instructor":"hepburn, brian","totalStudents":77},{"courses_instructor":"creese, david","totalStudents":10},{"courses_instructor":"brooks, ian","totalStudents":18},{"courses_instructor":"de angelis, franco","totalStudents":447},{"courses_instructor":"lane, christine","totalStudents":160},{"courses_instructor":"johnson, carl","totalStudents":238},{"courses_instructor":"bablitz, leanne","totalStudents":596},{"courses_instructor":"kiernan, philip","totalStudents":28},{"courses_instructor":"reid, shelley","totalStudents":4266},{"courses_instructor":"sandy, gerald n","totalStudents":346},{"courses_instructor":"williams, arden","totalStudents":51},{"courses_instructor":"mcauley, alexander","totalStudents":274},{"courses_instructor":"funke, melissa","totalStudents":63},{"courses_instructor":"clausen, bruce","totalStudents":232},{"courses_instructor":"kovacs, george","totalStudents":53},{"courses_instructor":"bekkering, denis","totalStudents":55},{"courses_instructor":"bekkering, denis;johnson, carl","totalStudents":44},{"courses_instructor":"dyer, brenda","totalStudents":311},{"courses_instructor":"johnston, dawn","totalStudents":38},{"courses_instructor":"gofton, lucy","totalStudents":88},{"courses_instructor":"rostam, hajera","totalStudents":43},{"courses_instructor":"westwood, marvin","totalStudents":294},{"courses_instructor":"amundson, norman;haney, colleen","totalStudents":15},{"courses_instructor":"amundson, norman;rostam, hajera","totalStudents":28},{"courses_instructor":"amundson, norman;sawatsky, frank","totalStudents":15},{"courses_instructor":"amundson, norman;erlebach, anne","totalStudents":30},{"courses_instructor":"amundson, norman;west, gail elizabeth","totalStudents":14},{"courses_instructor":"amundson, norman;morrison, marie","totalStudents":27},{"courses_instructor":"mccullough, lucy","totalStudents":14},{"courses_instructor":"sawatsky, frank","totalStudents":15},{"courses_instructor":"maier, kirsten","totalStudents":82},{"courses_instructor":"wiens, sandra","totalStudents":152},{"courses_instructor":"takano, yoshi","totalStudents":14},{"courses_instructor":"daniluk, judith;gofton, lucy","totalStudents":12},{"courses_instructor":"daniluk, judith;nitkin, patricia","totalStudents":13},{"courses_instructor":"daniluk, judith;wiens, sandra","totalStudents":13},{"courses_instructor":"daniluk, judith;koert, emily","totalStudents":13},{"courses_instructor":"nitkin, patricia","totalStudents":57},{"courses_instructor":"huminuik, kirby","totalStudents":13},{"courses_instructor":"cayley, mair","totalStudents":15},{"courses_instructor":"smith, barbara ann","totalStudents":15},{"courses_instructor":"chou, fred","totalStudents":12},{"courses_instructor":"mccullough, lucy;westwood, marvin","totalStudents":15},{"courses_instructor":"nitkin, patricia;westwood, marvin","totalStudents":42},{"courses_instructor":"tavormina, ezula ;westwood, marvin","totalStudents":7},{"courses_instructor":"conn, stephanie","totalStudents":25},{"courses_instructor":"motl, thomas","totalStudents":60},{"courses_instructor":"goodwill, alanaise","totalStudents":43},{"courses_instructor":"westwood, marvin;wiens, sandra","totalStudents":15},{"courses_instructor":"klubben, laura;westwood, marvin","totalStudents":29},{"courses_instructor":"koert, emily;westwood, marvin","totalStudents":13},{"courses_instructor":"daniluk, judith;polak, emily","totalStudents":12},{"courses_instructor":"daniluk, judith;klubben, laura","totalStudents":13},{"courses_instructor":"howell-jones, gail","totalStudents":14},{"courses_instructor":"shariff, aneesa","totalStudents":15},{"courses_instructor":"amundson, norman;nitkin, patricia","totalStudents":16},{"courses_instructor":"tavormina, ezula","totalStudents":11},{"courses_instructor":"outerbridge, howard jeffrey","totalStudents":27},{"courses_instructor":"zheng, lulin","totalStudents":213},{"courses_instructor":"koert, emily","totalStudents":16},{"courses_instructor":"amundson, norman","totalStudents":213},{"courses_instructor":"bruno, talino","totalStudents":597},{"courses_instructor":"parada, filomena","totalStudents":21},{"courses_instructor":"weinberg, mark","totalStudents":130},{"courses_instructor":"iaquinta, maria","totalStudents":33},{"courses_instructor":"pickerell, deirdre","totalStudents":33},{"courses_instructor":"quee, colleen p.","totalStudents":27},{"courses_instructor":"erlebach, anne","totalStudents":80},{"courses_instructor":"klubben, laura","totalStudents":83},{"courses_instructor":"amundson, norman;klubben, laura","totalStudents":41},{"courses_instructor":"yeung, paul","totalStudents":277},{"courses_instructor":"fenn, jacqui","totalStudents":35},{"courses_instructor":"patterson, pam f","totalStudents":115},{"courses_instructor":"horwitz, erika","totalStudents":841},{"courses_instructor":"farzamian, farideh","totalStudents":155},{"courses_instructor":"skrenes, shekoofeh","totalStudents":27},{"courses_instructor":"marshall, janet vaughan","totalStudents":1338},{"courses_instructor":"munteanu, mircea","totalStudents":2609},{"courses_instructor":"buchanan, marla","totalStudents":29},{"courses_instructor":"adler, michal","totalStudents":332},{"courses_instructor":"olson, trevor;westwood, marvin","totalStudents":33},{"courses_instructor":"polak, emily","totalStudents":55},{"courses_instructor":"jacquard, stillman;young, richard","totalStudents":25},{"courses_instructor":"olson, trevor","totalStudents":31},{"courses_instructor":"pattern, mark steven","totalStudents":34},{"courses_instructor":"thomson, vicky","totalStudents":208},{"courses_instructor":"swan, graeme","totalStudents":62},{"courses_instructor":"gaster, sean","totalStudents":104},{"courses_instructor":"rostad, faith","totalStudents":67},{"courses_instructor":"white, vincent","totalStudents":58},{"courses_instructor":"owens, rhea","totalStudents":9},{"courses_instructor":"smith, gillian","totalStudents":138},{"courses_instructor":"bell, deborah","totalStudents":31},{"courses_instructor":"domene, jose","totalStudents":26},{"courses_instructor":"kassan, anusha","totalStudents":67},{"courses_instructor":"jacquard, stillman","totalStudents":12},{"courses_instructor":"harrison, richard","totalStudents":13},{"courses_instructor":"ishiyama, fumio ishu","totalStudents":56},{"courses_instructor":"hirakata, pamela","totalStudents":11},{"courses_instructor":"schultz, izabela","totalStudents":81},{"courses_instructor":"miller, lynn delaine","totalStudents":148},{"courses_instructor":"elez, tatjana","totalStudents":16},{"courses_instructor":"regev, michal","totalStudents":12},{"courses_instructor":"james, susan","totalStudents":15},{"courses_instructor":"bedi, robinder","totalStudents":39},{"courses_instructor":"dadson, michael","totalStudents":22},{"courses_instructor":"jordan, sharalyn","totalStudents":49},{"courses_instructor":"cox, daniel","totalStudents":87},{"courses_instructor":"neault, roberta a","totalStudents":15},{"courses_instructor":"young, richard","totalStudents":90},{"courses_instructor":"haney, colleen","totalStudents":14},{"courses_instructor":"carter, john","totalStudents":156},{"courses_instructor":"shelley, christopher","totalStudents":594},{"courses_instructor":"flood, karen","totalStudents":42},{"courses_instructor":"haney, colleen;hawley, jody;tba","totalStudents":17},{"courses_instructor":"cousland, robert","totalStudents":355},{"courses_instructor":"gardner, gregg","totalStudents":137},{"courses_instructor":"arbel, vita daphne;braund, susan","totalStudents":8},{"courses_instructor":"pai, kit","totalStudents":32},{"courses_instructor":"sun, xia0non","totalStudents":20},{"courses_instructor":"degraaf, darren","totalStudents":900},{"courses_instructor":"skoulakis, georgios","totalStudents":312},{"courses_instructor":"arasanipalai kandhad, padmapri;bernardet, ulysses;bittner, thomas jacob","totalStudents":140},{"courses_instructor":"bittner, thomas jacob;fais, laurel;mackworth, alan","totalStudents":122},{"courses_instructor":"dechaine, rose-marie;mole, christopher","totalStudents":243},{"courses_instructor":"dechaine, rose-marie;mole, christopher;voll, kimberly","totalStudents":58},{"courses_instructor":"rensink, ronald;rullmann, hotze","totalStudents":147},{"courses_instructor":"de freitas, joao;dechaine, rose-marie;mole, christopher","totalStudents":71},{"courses_instructor":"bittner, thomas jacob;conati, cristina;fais, laurel","totalStudents":141},{"courses_instructor":"fais, laurel;mole, christopher;woodham, robert","totalStudents":101},{"courses_instructor":"bernardet, ulysses;fais, laurel;mole, christopher","totalStudents":63},{"courses_instructor":"arasanipalai kandhad, padmapri;fais, laurel;mole, christopher","totalStudents":222},{"courses_instructor":"arasanipalai kandhad, padmapri;gick, bryan;mole, christopher","totalStudents":180},{"courses_instructor":"fais, laurel;mole, christopher;vatikiotis-bateson, eric","totalStudents":69},{"courses_instructor":"bernardet, ulysses","totalStudents":35},{"courses_instructor":"danielson, peter","totalStudents":193},{"courses_instructor":"danielson, peter;de freitas, joao;mole, christopher","totalStudents":23},{"courses_instructor":"fisher, justin;rensink, ronald","totalStudents":21},{"courses_instructor":"fisher, justin;van de panne, michiel","totalStudents":21},{"courses_instructor":"danielson, peter;van de panne, michiel","totalStudents":31},{"courses_instructor":"ward, lawrence;woodham, robert","totalStudents":41},{"courses_instructor":"ward, lawrence","totalStudents":161},{"courses_instructor":"danielson, peter;poole, david","totalStudents":79},{"courses_instructor":"danielson, peter;woodham, robert","totalStudents":33},{"courses_instructor":"rensink, ronald","totalStudents":283},{"courses_instructor":"vatikiotis-bateson, eric","totalStudents":402},{"courses_instructor":"voll, kimberly","totalStudents":854},{"courses_instructor":"narayan, chandan;ward, lawrence","totalStudents":19},{"courses_instructor":"vatikiotis-bateson, eric;ward, lawrence","totalStudents":32},{"courses_instructor":"dechaine, rose-marie;ward, lawrence","totalStudents":20},{"courses_instructor":"mole, christopher;ward, lawrence","totalStudents":9},{"courses_instructor":"narayan, chandan","totalStudents":59},{"courses_instructor":"mole, christopher;narayan, chandan","totalStudents":6},{"courses_instructor":"narayan, chandan;vatikiotis-bateson, eric","totalStudents":14},{"courses_instructor":"tba;vatikiotis-bateson, eric","totalStudents":30},{"courses_instructor":"barbosa, adriano;vatikiotis-bateson, eric","totalStudents":32},{"courses_instructor":"rawcliffe, wayne","totalStudents":88},{"courses_instructor":"berrington, david arthur","totalStudents":76},{"courses_instructor":"van jaarsveld, danielle","totalStudents":108},{"courses_instructor":"yanadori, yoshio","totalStudents":83},{"courses_instructor":"seidel, marc-david","totalStudents":356},{"courses_instructor":"kelleher, angela;prowse, robert","totalStudents":27},{"courses_instructor":"lo, eiston","totalStudents":223},{"courses_instructor":"o'reilly, deborah jane","totalStudents":55},{"courses_instructor":"bentall, david","totalStudents":172},{"courses_instructor":"strike, vanessa","totalStudents":28},{"courses_instructor":"thornicroft, kenneth","totalStudents":66},{"courses_instructor":"maroney, bernard","totalStudents":551},{"courses_instructor":"cubbon, paul;jackes, robert;williamson, elaine","totalStudents":403},{"courses_instructor":"cubbon, paul;kroeker, jeff","totalStudents":1816},{"courses_instructor":"salzberg, elicia;stone, ann","totalStudents":306},{"courses_instructor":"jackes, robert;kroeker, jeff;milne, tamar","totalStudents":182},{"courses_instructor":"jackes, robert;milne, tamar","totalStudents":426},{"courses_instructor":"milne, tamar;sinclair, scott","totalStudents":203},{"courses_instructor":"gully, linda;watson, michelle","totalStudents":376},{"courses_instructor":"watson, michelle","totalStudents":948},{"courses_instructor":"gully, linda;watson, michelle tanya","totalStudents":827},{"courses_instructor":"watson, michelle tanya","totalStudents":1695},{"courses_instructor":"daniels, michael","totalStudents":129},{"courses_instructor":"granot, daniel","totalStudents":568},{"courses_instructor":"das, anupam","totalStudents":736},{"courses_instructor":"huh, woonghee tim;nagarajan, mahesh","totalStudents":54},{"courses_instructor":"cheung, yau man;saunders, adam","totalStudents":373},{"courses_instructor":"miller, david","totalStudents":313},{"courses_instructor":"graham, brian","totalStudents":4717},{"courses_instructor":"graham, brian;werker, gregory","totalStudents":418},{"courses_instructor":"huh, woonghee tim;werker, gregory","totalStudents":1443},{"courses_instructor":"graham, brian;huh, woonghee tim","totalStudents":401},{"courses_instructor":"markhvida, katsiaryna igorevna","totalStudents":114},{"courses_instructor":"berkowitz, jonathan;graystone, brian","totalStudents":111},{"courses_instructor":"berkowitz, jonathan;hasheminia, hamed","totalStudents":113},{"courses_instructor":"berkowitz, jonathan;ghement, isabella","totalStudents":54},{"courses_instructor":"berkowitz, jonathan;liang, liping","totalStudents":55},{"courses_instructor":"berkowitz, jonathan;yuen, andrew","totalStudents":56},{"courses_instructor":"berkowitz, jonathan;ryan, chris","totalStudents":63},{"courses_instructor":"berkowitz, jonathan;fowler, ellen","totalStudents":249},{"courses_instructor":"berkowitz, jonathan;werker, gregory","totalStudents":61},{"courses_instructor":"gu, jun","totalStudents":244},{"courses_instructor":"liu, feng","totalStudents":92},{"courses_instructor":"velin, ron","totalStudents":132},{"courses_instructor":"stuyt, sharka","totalStudents":105},{"courses_instructor":"bai, feng","totalStudents":49},{"courses_instructor":"houshmand, marjan","totalStudents":143},{"courses_instructor":"zhu, kejia","totalStudents":79},{"courses_instructor":"turner, roger anthony","totalStudents":131},{"courses_instructor":"sheppard, leah","totalStudents":41},{"courses_instructor":"read, michael","totalStudents":174},{"courses_instructor":"sayer, lynda anne","totalStudents":121},{"courses_instructor":"schabram, kira","totalStudents":79},{"courses_instructor":"treister, dorit","totalStudents":46},{"courses_instructor":"kay, adam","totalStudents":37},{"courses_instructor":"shao, ruodan","totalStudents":37},{"courses_instructor":"yang, shuo","totalStudents":30},{"courses_instructor":"rogo, rafael","totalStudents":1031},{"courses_instructor":"ke, yun","totalStudents":52},{"courses_instructor":"schiff, nathan","totalStudents":504},{"courses_instructor":"brander, james","totalStudents":1485},{"courses_instructor":"meyer, stephen","totalStudents":439},{"courses_instructor":"vercammen, james","totalStudents":708},{"courses_instructor":"zrill, lanny","totalStudents":1311},{"courses_instructor":"kozak rogo, juliana","totalStudents":1852},{"courses_instructor":"thiele, veikko","totalStudents":303},{"courses_instructor":"holloway, isaac","totalStudents":545},{"courses_instructor":"dubrovinsky, mati","totalStudents":75},{"courses_instructor":"dickson, jenny","totalStudents":1069},{"courses_instructor":"dunn, lea","totalStudents":58},{"courses_instructor":"wang, chen","totalStudents":55},{"courses_instructor":"gardiner, daniel f","totalStudents":723},{"courses_instructor":"park, so eun","totalStudents":287},{"courses_instructor":"swaffield, mary","totalStudents":1037},{"courses_instructor":"jiang, lai","totalStudents":523},{"courses_instructor":"zhu, ting","totalStudents":578},{"courses_instructor":"williamson, elaine","totalStudents":1177},{"courses_instructor":"vaughan, jarrett","totalStudents":57},{"courses_instructor":"chen, jack","totalStudents":181},{"courses_instructor":"dasgupta, srabana","totalStudents":396},{"courses_instructor":"stewart, cindy","totalStudents":149},{"courses_instructor":"kullmann, cornelia","totalStudents":451},{"courses_instructor":"freedman, ruth","totalStudents":2513},{"courses_instructor":"valdivieso contreras, ercos","totalStudents":259},{"courses_instructor":"boroumand-jazzi, sepand","totalStudents":635},{"courses_instructor":"freedman, ruth;graham, brian;mueller, michael","totalStudents":641},{"courses_instructor":"chen, shaojun jenny;graham, brian","totalStudents":208},{"courses_instructor":"freedman, ruth;graham, brian","totalStudents":527},{"courses_instructor":"freedman, ruth;graham, brian;kullmann, cornelia","totalStudents":87},{"courses_instructor":"lee, sanghoon","totalStudents":742},{"courses_instructor":"somerville, craig tsuriel","totalStudents":496},{"courses_instructor":"chandler, frances","totalStudents":11},{"courses_instructor":"sun, wei","totalStudents":164},{"courses_instructor":"xin, mingdi","totalStudents":136},{"courses_instructor":"papania, daniel","totalStudents":60},{"courses_instructor":"lo, kin","totalStudents":567},{"courses_instructor":"zhang, li","totalStudents":633},{"courses_instructor":"bleck, alexander","totalStudents":347},{"courses_instructor":"rao, erin","totalStudents":80},{"courses_instructor":"chen, xia","totalStudents":77},{"courses_instructor":"varey, carol ann","totalStudents":625},{"courses_instructor":"hardisty, david","totalStudents":338},{"courses_instructor":"cornil, yann","totalStudents":124},{"courses_instructor":"kristofferson, kirk jason","totalStudents":113},{"courses_instructor":"allard, thomas","totalStudents":36},{"courses_instructor":"lin, lily","totalStudents":44},{"courses_instructor":"chae, bo youn","totalStudents":40},{"courses_instructor":"shim, yoonji","totalStudents":43},{"courses_instructor":"south, cluny","totalStudents":34},{"courses_instructor":"bogershausen, johannes","totalStudents":37},{"courses_instructor":"dhar, tirtha","totalStudents":456},{"courses_instructor":"ghotbi, sina","totalStudents":284},{"courses_instructor":"medina, alejandra patricia","totalStudents":237},{"courses_instructor":"sheng, jinfei","totalStudents":78},{"courses_instructor":"simintzi, eleni","totalStudents":455},{"courses_instructor":"gregoire, vincent","totalStudents":74},{"courses_instructor":"freedman, ruth;romero, alberto","totalStudents":174},{"courses_instructor":"freedman, ruth;morales-veas, gonzalo","totalStudents":83},{"courses_instructor":"freedman, ruth;gregoire, vincent","totalStudents":102},{"courses_instructor":"freedman, ruth;newton, david","totalStudents":90},{"courses_instructor":"freedman, ruth;mueller, michael","totalStudents":38},{"courses_instructor":"freedman, ruth;shim, kyung","totalStudents":45},{"courses_instructor":"chen, shaojun jenny","totalStudents":42},{"courses_instructor":"gilbert, thomas","totalStudents":178},{"courses_instructor":"wetzel, jacob","totalStudents":162},{"courses_instructor":"xu, ting","totalStudents":41},{"courses_instructor":"freedman, ruth;wang, shubo","totalStudents":45},{"courses_instructor":"romero, alberto","totalStudents":83},{"courses_instructor":"morales-veas, gonzalo","totalStudents":158},{"courses_instructor":"novin, farid","totalStudents":158},{"courses_instructor":"baldauf, markus","totalStudents":231},{"courses_instructor":"nemati, sajjad","totalStudents":76},{"courses_instructor":"kung, howard","totalStudents":338},{"courses_instructor":"boguth, oliver","totalStudents":28},{"courses_instructor":"simutin, mike","totalStudents":38},{"courses_instructor":"martineau, charles","totalStudents":44},{"courses_instructor":"corhay, alexandre","totalStudents":82},{"courses_instructor":"favilukis, jack;pflueger, carolin","totalStudents":406},{"courses_instructor":"knesl, jiri","totalStudents":37},{"courses_instructor":"pflueger, carolin","totalStudents":157},{"courses_instructor":"kuehn, lars","totalStudents":34},{"courses_instructor":"ruf, thomas","totalStudents":37},{"courses_instructor":"jiang, haibo","totalStudents":71},{"courses_instructor":"xu, sheng-jun","totalStudents":77},{"courses_instructor":"vo, dan hieu","totalStudents":42},{"courses_instructor":"thiruchittampalam, dharini","totalStudents":70},{"courses_instructor":"beausoleil, angele","totalStudents":169},{"courses_instructor":"beausoleil, angele;quayle, moura","totalStudents":35},{"courses_instructor":"quayle, moura","totalStudents":61},{"courses_instructor":"quayle, moura;thiruchittampalam, dharini","totalStudents":22},{"courses_instructor":"pennefather, patrick;quayle, moura","totalStudents":29},{"courses_instructor":"southcott, james","totalStudents":116},{"courses_instructor":"morrell, cameron","totalStudents":1262},{"courses_instructor":"fajardo, frederick","totalStudents":616},{"courses_instructor":"kent, duncan","totalStudents":417},{"courses_instructor":"sutherland, brian","totalStudents":1008},{"courses_instructor":"furlong, carla","totalStudents":117},{"courses_instructor":"duzy, barbara","totalStudents":510},{"courses_instructor":"bowker, elizabeth","totalStudents":779},{"courses_instructor":"jones, brenda","totalStudents":249},{"courses_instructor":"soliman ibrahim, susan","totalStudents":235},{"courses_instructor":"silver sweeney, marlisse","totalStudents":292},{"courses_instructor":"oman, jessica","totalStudents":40},{"courses_instructor":"bowker, elizabeth;levine, danielle","totalStudents":47},{"courses_instructor":"salzberg, elicia","totalStudents":47},{"courses_instructor":"spencer, barbara","totalStudents":601},{"courses_instructor":"hewitt, gary","totalStudents":566},{"courses_instructor":"lindsey, charles","totalStudents":637},{"courses_instructor":"head, c keith","totalStudents":397},{"courses_instructor":"jaureguiberry, florencia","totalStudents":1299},{"courses_instructor":"yan, jing","totalStudents":172},{"courses_instructor":"pineda salazar, jose","totalStudents":239},{"courses_instructor":"nemetz, peter","totalStudents":362},{"courses_instructor":"egan, ed","totalStudents":129},{"courses_instructor":"farrell, david irwin","totalStudents":853},{"courses_instructor":"boardman, anthony","totalStudents":239},{"courses_instructor":"mollenhauer, douglas","totalStudents":231},{"courses_instructor":"graystone, brian","totalStudents":153},{"courses_instructor":"carew, stephanie barrett","totalStudents":40},{"courses_instructor":"gillen, david","totalStudents":349},{"courses_instructor":"kim, bowon","totalStudents":39},{"courses_instructor":"oum, tae hoon","totalStudents":240},{"courses_instructor":"somerville, craig tsuriel;wosk, larry","totalStudents":145},{"courses_instructor":"davidoff, thomas;somerville, craig tsuriel","totalStudents":315},{"courses_instructor":"granot, frieda","totalStudents":187},{"courses_instructor":"jaworski, michal","totalStudents":59},{"courses_instructor":"burton-jones, andrew","totalStudents":146},{"courses_instructor":"shi, duo","totalStudents":38},{"courses_instructor":"chow, garland","totalStudents":400},{"courses_instructor":"adler, nicole","totalStudents":11},{"courses_instructor":"yu, chun yan","totalStudents":36},{"courses_instructor":"basso, leonardo","totalStudents":34},{"courses_instructor":"goatham, robert","totalStudents":149},{"courses_instructor":"bharmal, shakeel","totalStudents":66},{"courses_instructor":"yeung, ira","totalStudents":131},{"courses_instructor":"mallia, patricia;sinclair, scott","totalStudents":344},{"courses_instructor":"weinberg, charles","totalStudents":197},{"courses_instructor":"bhardwaj, pradeep","totalStudents":116},{"courses_instructor":"surjanovic, ivan","totalStudents":66},{"courses_instructor":"cubbon, paul;viskovich, julio","totalStudents":80},{"courses_instructor":"zeng, michelle xiaohua","totalStudents":119},{"courses_instructor":"jiang, lan","totalStudents":52},{"courses_instructor":"liang, yitian","totalStudents":56},{"courses_instructor":"cubbon, paul;dahl, darren","totalStudents":72},{"courses_instructor":"cubbon, paul;simonite, james","totalStudents":18},{"courses_instructor":"dahl, jennifer ann","totalStudents":162},{"courses_instructor":"tatla, parmjit","totalStudents":71},{"courses_instructor":"dimitrova, milka","totalStudents":194},{"courses_instructor":"gaa, charles","totalStudents":69},{"courses_instructor":"carlson, murray;yuill, garry","totalStudents":43},{"courses_instructor":"heinkel, robert lee","totalStudents":877},{"courses_instructor":"linde, mari-ann","totalStudents":1880},{"courses_instructor":"pankratz, adam","totalStudents":84},{"courses_instructor":"du, qianqian","totalStudents":33},{"courses_instructor":"zhang, wei","totalStudents":31},{"courses_instructor":"alviarez, vanessa","totalStudents":214},{"courses_instructor":"jing, ran","totalStudents":31},{"courses_instructor":"ghement, isabella","totalStudents":73},{"courses_instructor":"essak, martha","totalStudents":27},{"courses_instructor":"benbasat, izak","totalStudents":17},{"courses_instructor":"chamberlain, sandra;lo, kin","totalStudents":7},{"courses_instructor":"dahl, darren;zhu, juliet","totalStudents":5},{"courses_instructor":"dahl, darren;griffin, dale","totalStudents":9},{"courses_instructor":"kraus, alan d","totalStudents":52},{"courses_instructor":"giammarino, ronald;heinkel, robert lee","totalStudents":48},{"courses_instructor":"gornall, will","totalStudents":11},{"courses_instructor":"carlson, murray;giammarino, ronald;heinkel, robert lee","totalStudents":13},{"courses_instructor":"winter, ralph","totalStudents":220},{"courses_instructor":"carlson, murray;fisher, adlai","totalStudents":55},{"courses_instructor":"bena, jan;ortiz molina, hernan","totalStudents":14},{"courses_instructor":"bena, jan;ortiz-molina, hernan","totalStudents":16},{"courses_instructor":"arcese, peter","totalStudents":1032},{"courses_instructor":"carroll, allan","totalStudents":682},{"courses_instructor":"coops, nicholas charles","totalStudents":687},{"courses_instructor":"wood, paul","totalStudents":465},{"courses_instructor":"harshaw, howard","totalStudents":495},{"courses_instructor":"hagerman, shannon marie","totalStudents":758},{"courses_instructor":"bulkan, janette","totalStudents":263},{"courses_instructor":"sheppard, stephen","totalStudents":462},{"courses_instructor":"burch, sarah;sheppard, stephen","totalStudents":50},{"courses_instructor":"gergel, sarah","totalStudents":135},{"courses_instructor":"meitner, michael","totalStudents":917},{"courses_instructor":"trosper, ronald","totalStudents":122},{"courses_instructor":"lyall, andrea","totalStudents":181},{"courses_instructor":"marshall, peter","totalStudents":561},{"courses_instructor":"hoberg, george","totalStudents":1208},{"courses_instructor":"aitken, sally;hinch, scott;lavallee, susanne","totalStudents":36},{"courses_instructor":"hinch, scott;lavallee, susanne","totalStudents":31},{"courses_instructor":"gergel, sarah;rhemtulla, jeanine","totalStudents":61},{"courses_instructor":"hinch, scott","totalStudents":302},{"courses_instructor":"aamodt, tor","totalStudents":300},{"courses_instructor":"gopalakrishnan, sathish","totalStudents":190},{"courses_instructor":"wilton, steven","totalStudents":264},{"courses_instructor":"calvino-fraga, jesus","totalStudents":389},{"courses_instructor":"beznosov, konstantin","totalStudents":215},{"courses_instructor":"fedorova, alexandra","totalStudents":99},{"courses_instructor":"davies, paul","totalStudents":204},{"courses_instructor":"lemieux, guy","totalStudents":32},{"courses_instructor":"lis, mieszko","totalStudents":48},{"courses_instructor":"mesbah, ali","totalStudents":113},{"courses_instructor":"ripeanu, radu","totalStudents":46},{"courses_instructor":"wiseman, kelleen","totalStudents":116},{"courses_instructor":"arefifar, seyed ali;botman, pieter;fels, s sidney;grecu, cristian sorin;kruchten, philippe;lee, terry;lusina, paul;madden, john;najarian, siamak;tang, shuo","totalStudents":215},{"courses_instructor":"kiczales, gregor","totalStudents":1843},{"courses_instructor":"allen, meghan","totalStudents":1874},{"courses_instructor":"garcia, ronald","totalStudents":437},{"courses_instructor":"aiello, william","totalStudents":416},{"courses_instructor":"carter, paul martin","totalStudents":1499},{"courses_instructor":"little, james joseph","totalStudents":638},{"courses_instructor":"mcgrenere, joanna","totalStudents":345},{"courses_instructor":"greif, chen","totalStudents":268},{"courses_instructor":"wolfman, steven","totalStudents":1752},{"courses_instructor":"berg, celina","totalStudents":175},{"courses_instructor":"eiselt, kurt","totalStudents":1490},{"courses_instructor":"cooper, kendra","totalStudents":235},{"courses_instructor":"belleville, patrice","totalStudents":3146},{"courses_instructor":"woodham, robert","totalStudents":454},{"courses_instructor":"dulat, margaret","totalStudents":92},{"courses_instructor":"gao, xi","totalStudents":145},{"courses_instructor":"tompkins, david a d","totalStudents":58},{"courses_instructor":"baniassad, elisa","totalStudents":1243},{"courses_instructor":"murphy, gail","totalStudents":441},{"courses_instructor":"beschastnikh, ivan","totalStudents":198},{"courses_instructor":"hutchinson, norman","totalStudents":835},{"courses_instructor":"feeley, michael","totalStudents":1540},{"courses_instructor":"warfield, andrew","totalStudents":137},{"courses_instructor":"goldberg, murray","totalStudents":62},{"courses_instructor":"munzner, tamara","totalStudents":493},{"courses_instructor":"darwish, mohammad mostafa","totalStudents":88},{"courses_instructor":"acton, donald","totalStudents":1756},{"courses_instructor":"hu, alan","totalStudents":757},{"courses_instructor":"khosravi, hassan","totalStudents":606},{"courses_instructor":"knorr, edwin max","totalStudents":1394},{"courses_instructor":"evans, william","totalStudents":703},{"courses_instructor":"kotthoff, lars","totalStudents":97},{"courses_instructor":"harvey, nicholas","totalStudents":201},{"courses_instructor":"sheffer, alla","totalStudents":146},{"courses_instructor":"mitchell, ian","totalStudents":442},{"courses_instructor":"ascher, uri michael","totalStudents":245},{"courses_instructor":"ascher, uri michael;greif, chen","totalStudents":92},{"courses_instructor":"rees, tyrone","totalStudents":27},{"courses_instructor":"gelbart, michael","totalStudents":64},{"courses_instructor":"lakshmanan, laks","totalStudents":676},{"courses_instructor":"ng, raymond tak-yan","totalStudents":435},{"courses_instructor":"pottinger, rachel","totalStudents":374},{"courses_instructor":"palyart-lamarche, marc","totalStudents":156},{"courses_instructor":"holmes, reid","totalStudents":264},{"courses_instructor":"wohlstadter, eric","totalStudents":434},{"courses_instructor":"ernst, neil","totalStudents":280},{"courses_instructor":"fritz, thomas","totalStudents":62},{"courses_instructor":"shepherd, david","totalStudents":166},{"courses_instructor":"de volder, kris","totalStudents":65},{"courses_instructor":"dunfield, joshua","totalStudents":105},{"courses_instructor":"poole, david","totalStudents":405},{"courses_instructor":"sagaii, sara mahboubeh","totalStudents":138},{"courses_instructor":"van de panne, michiel","totalStudents":72},{"courses_instructor":"pai, dinesh","totalStudents":112},{"courses_instructor":"bridson, robert","totalStudents":93},{"courses_instructor":"bessmeltsev, mikhail","totalStudents":65},{"courses_instructor":"heidrich, wolfgang","totalStudents":71},{"courses_instructor":"krasic, charles","totalStudents":116},{"courses_instructor":"vuong, son","totalStudents":69},{"courses_instructor":"awad, ahmed","totalStudents":74},{"courses_instructor":"meyer, irmtraud margret","totalStudents":230},{"courses_instructor":"manuch, jan","totalStudents":390},{"courses_instructor":"schroeder, jonatan","totalStudents":78},{"courses_instructor":"malka, lior","totalStudents":52},{"courses_instructor":"conati, cristina","totalStudents":561},{"courses_instructor":"carenini, giuseppe","totalStudents":550},{"courses_instructor":"leyton-brown, kevin","totalStudents":380},{"courses_instructor":"mackworth, alan","totalStudents":199},{"courses_instructor":"hutter, frank","totalStudents":74},{"courses_instructor":"schmidt, mark","totalStudents":430},{"courses_instructor":"de freitas, joao","totalStudents":359},{"courses_instructor":"doucet, arnaud","totalStudents":120},{"courses_instructor":"murphy, kevin","totalStudents":71},{"courses_instructor":"dawson, jessica","totalStudents":240},{"courses_instructor":"maclean, karon","totalStudents":489},{"courses_instructor":"dawson, jessica;maclean, karon","totalStudents":24},{"courses_instructor":"murphy-hill, emerson","totalStudents":74},{"courses_instructor":"wagner, alan","totalStudents":223},{"courses_instructor":"greenstreet, mark","totalStudents":185},{"courses_instructor":"kirkpatrick, david","totalStudents":302},{"courses_instructor":"friedman, joel","totalStudents":881},{"courses_instructor":"tung, frederick","totalStudents":112},{"courses_instructor":"luk, joseph","totalStudents":171},{"courses_instructor":"hoos, holger","totalStudents":77},{"courses_instructor":"kirkpatrick, bonnie;manuch, jan","totalStudents":16},{"courses_instructor":"booth, kellogg","totalStudents":15},{"courses_instructor":"galloway, steve","totalStudents":687},{"courses_instructor":"upfold, amber","totalStudents":1016},{"courses_instructor":"chong, kevin kim wang","totalStudents":1366},{"courses_instructor":"hussain, tariq","totalStudents":710},{"courses_instructor":"taylor, timothy","totalStudents":512},{"courses_instructor":"brown-evans, taylor","totalStudents":935},{"courses_instructor":"lee, nancy","totalStudents":585},{"courses_instructor":"warrener, sheryda","totalStudents":455},{"courses_instructor":"acheson, alison","totalStudents":274},{"courses_instructor":"de vries, margaret","totalStudents":778},{"courses_instructor":"kinch, martin","totalStudents":793},{"courses_instructor":"kinch, abigail;kinch, martin","totalStudents":239},{"courses_instructor":"leavitt, sarah","totalStudents":101},{"courses_instructor":"vigna, john","totalStudents":1107},{"courses_instructor":"leclerc, christine","totalStudents":56},{"courses_instructor":"demers, charles","totalStudents":1357},{"courses_instructor":"wong, jacqueline","totalStudents":980},{"courses_instructor":"shigematsu, tetsuro hugh","totalStudents":80},{"courses_instructor":"medved, maureen","totalStudents":44},{"courses_instructor":"del bucchia, dina","totalStudents":79},{"courses_instructor":"campbell, deborah","totalStudents":84},{"courses_instructor":"maillard, keith","totalStudents":5},{"courses_instructor":"tregebov, rhea","totalStudents":6},{"courses_instructor":"svendsen, linda jane","totalStudents":5},{"courses_instructor":"lyon, annabel","totalStudents":9},{"courses_instructor":"graefe, sara","totalStudents":4},{"courses_instructor":"schendlinger, mary","totalStudents":6},{"courses_instructor":"musgrave, susan","totalStudents":3},{"courses_instructor":"grady, albert wayne","totalStudents":4},{"courses_instructor":"gartner, zsu zsi","totalStudents":5},{"courses_instructor":"monrad, jens","totalStudents":502},{"courses_instructor":"el-adwar, lamia;emanuels, ingrid;pattanaporn, komkham","totalStudents":47},{"courses_instructor":"whitney, eli","totalStudents":78},{"courses_instructor":"brondani, mario;diewert, virginia;emanuels, ingrid;harrison, rosamund louise;nguyen, caroline;whitney, eli","totalStudents":47},{"courses_instructor":"aidelbaum, martin;aleksejuniene, jolanta;bryant, s;chanpong, brian;diewert, virginia;fogelman, mark;garcia fulle de owen, maria is;gardner, karen mary;harrison, rosamund louise;macdonald, david;mccullagh, anthony;richardson, james;ruse, n dorin;whitney, eli","totalStudents":51},{"courses_instructor":"aidelbaum, martin;garcia fulle de owen, maria is;gardner, karen mary;lowe, alan arthur;macdonald, david;mathu-muju, kavita;mccullagh, anthony;richardson, james;whitney, eli;zhang, lewei","totalStudents":57},{"courses_instructor":"haapasalo, markus","totalStudents":7},{"courses_instructor":"campbell, karen;harrison, rosamund louise;kennedy, david;mathu-muju, kavita;richman, joy marion","totalStudents":4},{"courses_instructor":"campbell, karen","totalStudents":8},{"courses_instructor":"richman, joy marion;yen, edwin h","totalStudents":8},{"courses_instructor":"bryant, s","totalStudents":8},{"courses_instructor":"wyatt, christopher","totalStudents":12},{"courses_instructor":"ruse, n dorin","totalStudents":42},{"courses_instructor":"mccullagh, anthony;wyatt, christopher","totalStudents":4},{"courses_instructor":"von bergmann, hsingchi","totalStudents":50},{"courses_instructor":"roberts, clive","totalStudents":24},{"courses_instructor":"tobias, david","totalStudents":15},{"courses_instructor":"waterfield, john douglas","totalStudents":20},{"courses_instructor":"chen, hui;pliska, benjamin;yen, edwin h","totalStudents":4},{"courses_instructor":"chen, hui;yen, edwin h","totalStudents":5},{"courses_instructor":"kennedy, david","totalStudents":4},{"courses_instructor":"pliska, benjamin;sonya, dorothy;yen, edwin h","totalStudents":5},{"courses_instructor":"kennedy, david;sonya, dorothy","totalStudents":4},{"courses_instructor":"larjava, hannu;oakley, carol","totalStudents":4},{"courses_instructor":"hakkinen, lari","totalStudents":4},{"courses_instructor":"hakkinen, lari;larjava, hannu","totalStudents":9},{"courses_instructor":"larjava, hannu;mccullagh, anthony","totalStudents":11},{"courses_instructor":"coil, jeffrey martin;haapasalo, markus;shen, ya","totalStudents":8},{"courses_instructor":"cambruzzi, john;coil, jeffrey martin;corber, ron;fraser, john gordon","totalStudents":4},{"courses_instructor":"najar, hossain","totalStudents":265},{"courses_instructor":"hatzimanolakis, penny","totalStudents":350},{"courses_instructor":"noel, geoffroy","totalStudents":43},{"courses_instructor":"kindler, pawel;roberts, clive","totalStudents":23},{"courses_instructor":"lin, diana","totalStudents":127},{"courses_instructor":"gaudet, wendy","totalStudents":21},{"courses_instructor":"mcfarlane, rae","totalStudents":456},{"courses_instructor":"bigelow-ghaname, carrie","totalStudents":48},{"courses_instructor":"shariati, batoul","totalStudents":211},{"courses_instructor":"cramer, carl","totalStudents":56},{"courses_instructor":"cramer, carl;shariati, batoul","totalStudents":26},{"courses_instructor":"enns, lisa;mcfarlane, rae","totalStudents":40},{"courses_instructor":"imai, pauline;sunell, susanne","totalStudents":17},{"courses_instructor":"brodie, arlynn;mcfarlane, rae","totalStudents":19},{"courses_instructor":"martin, lexie","totalStudents":16},{"courses_instructor":"currie, brenda","totalStudents":31},{"courses_instructor":"ghaname, eduardo","totalStudents":73},{"courses_instructor":"mccloy, deborah","totalStudents":22},{"courses_instructor":"donnelly, leeann","totalStudents":109},{"courses_instructor":"donnelly, leeann;mcfarlane, rae","totalStudents":37},{"courses_instructor":"craig, bonnie jean;imai, pauline","totalStudents":8},{"courses_instructor":"craig, bonnie jean;hatzimanolakis, penny","totalStudents":35},{"courses_instructor":"laronde, denise","totalStudents":133},{"courses_instructor":"poh, fang-yeu","totalStudents":117},{"courses_instructor":"schmitz, susan","totalStudents":7},{"courses_instructor":"imai, pauline","totalStudents":7},{"courses_instructor":"sunell, susanne","totalStudents":26},{"courses_instructor":"kanji, zul","totalStudents":41},{"courses_instructor":"white, jane","totalStudents":29},{"courses_instructor":"kim, ji eun","totalStudents":40},{"courses_instructor":"berger, iris","totalStudents":50},{"courses_instructor":"baillie, traci","totalStudents":521},{"courses_instructor":"streelasky, jodi","totalStudents":51},{"courses_instructor":"mclellan, sylvia","totalStudents":21},{"courses_instructor":"thom, marie","totalStudents":46},{"courses_instructor":"ecclestone, kathleen","totalStudents":29},{"courses_instructor":"hoven, michaelyn","totalStudents":19},{"courses_instructor":"lintott, deirdre;thom, marie","totalStudents":15},{"courses_instructor":"pighini, maria","totalStudents":307},{"courses_instructor":"el khatib, lara","totalStudents":1405},{"courses_instructor":"oldfield, judith","totalStudents":134},{"courses_instructor":"stewart, mary","totalStudents":199},{"courses_instructor":"chapman, marilyn;stewart, mary","totalStudents":22},{"courses_instructor":"ford, laurie;stewart, mary","totalStudents":28},{"courses_instructor":"graves, carolyn;reiner, ann","totalStudents":145},{"courses_instructor":"richardson, catherine","totalStudents":31},{"courses_instructor":"gateman, robert","totalStudents":16239},{"courses_instructor":"adshade, marina","totalStudents":2011},{"courses_instructor":"kong, wai-ching alfred","totalStudents":4844},{"courses_instructor":"khan, anichul","totalStudents":103},{"courses_instructor":"fu, cheryl","totalStudents":2034},{"courses_instructor":"drelichman, mauricio","totalStudents":1231},{"courses_instructor":"malhotra, nisha","totalStudents":2631},{"courses_instructor":"mcintyre, gerald","totalStudents":2347},{"courses_instructor":"kotwal, ashok","totalStudents":1735},{"courses_instructor":"sarker, subrata","totalStudents":268},{"courses_instructor":"lemche, soren q","totalStudents":4545},{"courses_instructor":"roberts, cheryl","totalStudents":208},{"courses_instructor":"deseau, stephane","totalStudents":237},{"courses_instructor":"siu, henry","totalStudents":712},{"courses_instructor":"neary, hugh","totalStudents":789},{"courses_instructor":"karagyozova, tsvetanka","totalStudents":235},{"courses_instructor":"agurto, marcos","totalStudents":294},{"courses_instructor":"vaney, michael","totalStudents":5240},{"courses_instructor":"ghosh, parikshit","totalStudents":151},{"courses_instructor":"eswaran, mukesh","totalStudents":1039},{"courses_instructor":"troncoso-valverde, cristian an","totalStudents":124},{"courses_instructor":"von wartburg, markus w","totalStudents":104},{"courses_instructor":"gallini, nancy","totalStudents":98},{"courses_instructor":"fountain, john","totalStudents":31},{"courses_instructor":"green, david","totalStudents":459},{"courses_instructor":"riddell, william","totalStudents":180},{"courses_instructor":"henrich, joseph","totalStudents":421},{"courses_instructor":"douglas, catherine","totalStudents":3180},{"courses_instructor":"akbar, mohammad","totalStudents":457},{"courses_instructor":"long, jason","totalStudents":178},{"courses_instructor":"rogall, thorsten","totalStudents":61},{"courses_instructor":"gottlieb, joshua","totalStudents":195},{"courses_instructor":"severinov, sergei","totalStudents":707},{"courses_instructor":"yilankaya, okan","totalStudents":253},{"courses_instructor":"qirjo, dhimitri","totalStudents":447},{"courses_instructor":"persitz, dotan","totalStudents":145},{"courses_instructor":"hill, andrew","totalStudents":108},{"courses_instructor":"kei, wendy wai yee","totalStudents":169},{"courses_instructor":"yedid levi, yaniv","totalStudents":709},{"courses_instructor":"newman, geoffrey","totalStudents":3945},{"courses_instructor":"perla, jesse","totalStudents":185},{"courses_instructor":"pereira, alvaro","totalStudents":367},{"courses_instructor":"trebbi, francesco","totalStudents":353},{"courses_instructor":"li, wei","totalStudents":611},{"courses_instructor":"hwang, il myoung","totalStudents":48},{"courses_instructor":"peters, michael","totalStudents":289},{"courses_instructor":"halevy, yoram","totalStudents":350},{"courses_instructor":"beaudry, paul;yedid levi, yaniv","totalStudents":134},{"courses_instructor":"gallipoli, giovanni","totalStudents":168},{"courses_instructor":"desroches, christopher","totalStudents":111},{"courses_instructor":"schabas, margaret","totalStudents":419},{"courses_instructor":"desroches, christopher;schabas, margaret","totalStudents":88},{"courses_instructor":"de vroey, michel","totalStudents":45},{"courses_instructor":"whistler, diana","totalStudents":2623},{"courses_instructor":"kasahara, hiroyuki","totalStudents":743},{"courses_instructor":"sakata, shinichi;whistler, diana","totalStudents":89},{"courses_instructor":"neary, hugh;whistler, diana","totalStudents":90},{"courses_instructor":"hoffmann, florian","totalStudents":670},{"courses_instructor":"schrimpf, paul","totalStudents":488},{"courses_instructor":"marmer, vadim","totalStudents":1002},{"courses_instructor":"sakata, shinichi","totalStudents":389},{"courses_instructor":"redish, angela","totalStudents":324},{"courses_instructor":"paterson, donald g","totalStudents":81},{"courses_instructor":"troost, wiliam","totalStudents":75},{"courses_instructor":"kryvtsov, oleksiy","totalStudents":56},{"courses_instructor":"lucke, bernd","totalStudents":108},{"courses_instructor":"bombardini, matilde","totalStudents":993},{"courses_instructor":"swiecki, tomasz","totalStudents":480},{"courses_instructor":"munro, gordon","totalStudents":1844},{"courses_instructor":"szkup, michal","totalStudents":198},{"courses_instructor":"hnatkovska, viktoriya","totalStudents":1133},{"courses_instructor":"lahiri, amartya","totalStudents":904},{"courses_instructor":"pastine, tuvana","totalStudents":111},{"courses_instructor":"copeland, brian","totalStudents":1052},{"courses_instructor":"sumaila, ussif rashid","totalStudents":116},{"courses_instructor":"gulati, sumeet","totalStudents":645},{"courses_instructor":"datta, souvik","totalStudents":94},{"courses_instructor":"lamprinakis, lampros","totalStudents":91},{"courses_instructor":"graves, jonathan","totalStudents":24},{"courses_instructor":"graves, jonathan lewis","totalStudents":9},{"courses_instructor":"celik, gorkem","totalStudents":48},{"courses_instructor":"farinha luz, vitor","totalStudents":59},{"courses_instructor":"song, kyungchul","totalStudents":335},{"courses_instructor":"francois, patrick","totalStudents":270},{"courses_instructor":"esteve-volart, berta","totalStudents":56},{"courses_instructor":"francois, patrick;kotwal, ashok","totalStudents":60},{"courses_instructor":"mccasland, jamie","totalStudents":45},{"courses_instructor":"cortes, guido","totalStudents":95},{"courses_instructor":"dunbar, geoffrey","totalStudents":110},{"courses_instructor":"song, unjy","totalStudents":175},{"courses_instructor":"ucar, sebnem","totalStudents":44},{"courses_instructor":"fortin, nicole","totalStudents":198},{"courses_instructor":"milligan, kevin","totalStudents":274},{"courses_instructor":"rehavi, michal","totalStudents":165},{"courses_instructor":"oprea, ryan","totalStudents":30},{"courses_instructor":"anderson, kristin siwan","totalStudents":92},{"courses_instructor":"halevy, yoram;li, hao","totalStudents":115},{"courses_instructor":"li, hao","totalStudents":106},{"courses_instructor":"halevy, yoram;peters, michael","totalStudents":97},{"courses_instructor":"kumar, alok","totalStudents":48},{"courses_instructor":"li, hao;li, wei","totalStudents":7},{"courses_instructor":"beaudry, paul","totalStudents":28},{"courses_instructor":"inoue, atsushi","totalStudents":43},{"courses_instructor":"devereux, michael;siu, henry","totalStudents":68},{"courses_instructor":"devereux, michael;gallipoli, giovanni","totalStudents":31},{"courses_instructor":"beaudry, paul;siu, henry","totalStudents":22},{"courses_instructor":"pastine, ivan","totalStudents":11},{"courses_instructor":"fortin, nicole;lemieux, thomas","totalStudents":14},{"courses_instructor":"chemin, matthieu","totalStudents":32},{"courses_instructor":"diewert, w erwin","totalStudents":142},{"courses_instructor":"li, hao;peters, michael","totalStudents":13},{"courses_instructor":"gallipoli, giovanni;siu, henry","totalStudents":26},{"courses_instructor":"lemieux, thomas","totalStudents":47},{"courses_instructor":"lee, karen","totalStudents":43},{"courses_instructor":"de cosson, alexander","totalStudents":549},{"courses_instructor":"robertson, helen","totalStudents":10},{"courses_instructor":"knight, joanne","totalStudents":105},{"courses_instructor":"jordan, nane","totalStudents":44},{"courses_instructor":"bakan, daniel","totalStudents":92},{"courses_instructor":"gouzouasis, peter","totalStudents":112},{"courses_instructor":"anderson, ann","totalStudents":101},{"courses_instructor":"lucus, calin","totalStudents":35},{"courses_instructor":"jeroff, debra","totalStudents":19},{"courses_instructor":"gatley, lyle daryle","totalStudents":12},{"courses_instructor":"magee, theresa","totalStudents":96},{"courses_instructor":"gauthier, james","totalStudents":16},{"courses_instructor":"lamonde, anne-marie","totalStudents":21},{"courses_instructor":"petrina, stephen","totalStudents":198},{"courses_instructor":"macdowell, paula","totalStudents":18},{"courses_instructor":"krug, don","totalStudents":101},{"courses_instructor":"nicholson, kathleen;petersen, susan","totalStudents":101},{"courses_instructor":"dezwart, mary-leah","totalStudents":168},{"courses_instructor":"johnson, jennifer","totalStudents":40},{"courses_instructor":"turnbull caton, susan","totalStudents":312},{"courses_instructor":"renwick, kerry","totalStudents":58},{"courses_instructor":"cole, peter;o'riley, patricia","totalStudents":33},{"courses_instructor":"o'riley, patricia","totalStudents":67},{"courses_instructor":"cole, peter","totalStudents":70},{"courses_instructor":"ross, eddie wayne","totalStudents":176},{"courses_instructor":"smith, mary","totalStudents":31},{"courses_instructor":"butler, joy;de cosson, alexander","totalStudents":16},{"courses_instructor":"butler, joy;clarke, anthony","totalStudents":22},{"courses_instructor":"smith, mary gale","totalStudents":63},{"courses_instructor":"beare, david","totalStudents":15},{"courses_instructor":"loutzenheiser, lisa","totalStudents":119},{"courses_instructor":"hopper, timothy;sanford, kathy","totalStudents":39},{"courses_instructor":"davis, brent","totalStudents":89},{"courses_instructor":"butler, joy;mandigo, james","totalStudents":25},{"courses_instructor":"nicol, cynthia","totalStudents":63},{"courses_instructor":"gerofsky, susan","totalStudents":31},{"courses_instructor":"adler, james douglas","totalStudents":48},{"courses_instructor":"tan, yuen sze michelle","totalStudents":6},{"courses_instructor":"milner-bolotin, marina","totalStudents":122},{"courses_instructor":"khan, samia","totalStudents":100},{"courses_instructor":"phelan, anne","totalStudents":111},{"courses_instructor":"pinar, william","totalStudents":64},{"courses_instructor":"morton, charlene","totalStudents":18},{"courses_instructor":"meyer, karen","totalStudents":38},{"courses_instructor":"robertson, joanne","totalStudents":17},{"courses_instructor":"waithman, marilynne","totalStudents":120},{"courses_instructor":"gill, hartej","totalStudents":94},{"courses_instructor":"poole, wendy","totalStudents":186},{"courses_instructor":"fallon, gerald","totalStudents":120},{"courses_instructor":"stack, michelle","totalStudents":87},{"courses_instructor":"decker, elaine","totalStudents":116},{"courses_instructor":"mazawi, andre;waithman, marilynne","totalStudents":35},{"courses_instructor":"shamsher, mohammed","totalStudents":99},{"courses_instructor":"mazawi, andre","totalStudents":90},{"courses_instructor":"butterwick, shauna","totalStudents":78},{"courses_instructor":"walter, pierre","totalStudents":211},{"courses_instructor":"marker, michael","totalStudents":237},{"courses_instructor":"gleason, mona","totalStudents":96},{"courses_instructor":"strong-boag, veronica","totalStudents":13},{"courses_instructor":"ellis, jason","totalStudents":17},{"courses_instructor":"metcalfe, amy","totalStudents":100},{"courses_instructor":"pechar, johann","totalStudents":10},{"courses_instructor":"sork, thomas joda","totalStudents":13},{"courses_instructor":"andres, lesley coral","totalStudents":102},{"courses_instructor":"pratt, daniel","totalStudents":25},{"courses_instructor":"shan, hongxia","totalStudents":60},{"courses_instructor":"butterwick, shauna;chan, jennifer","totalStudents":14},{"courses_instructor":"palacios, carolina;walker, judith","totalStudents":10},{"courses_instructor":"webb, philip","totalStudents":30},{"courses_instructor":"cardwell, steve","totalStudents":20},{"courses_instructor":"aquash, mark","totalStudents":78},{"courses_instructor":"beairsto, bruce","totalStudents":17},{"courses_instructor":"pamer, monica","totalStudents":14},{"courses_instructor":"mayo, peter","totalStudents":2},{"courses_instructor":"roman, leslie","totalStudents":43},{"courses_instructor":"andres, lesley coral;gleason, mona","totalStudents":12},{"courses_instructor":"ruitenberg, claudia","totalStudents":66},{"courses_instructor":"rubenson, kjell len","totalStudents":51},{"courses_instructor":"taylor, alison","totalStudents":16},{"courses_instructor":"kelly, deirdre","totalStudents":108},{"courses_instructor":"kelly, deirdre;metcalfe, amy","totalStudents":8},{"courses_instructor":"coulter, david;rubenson, kjell len","totalStudents":10},{"courses_instructor":"kelly, deirdre;stack, michelle","totalStudents":22},{"courses_instructor":"de oliveira andreotti, vanessa;wang, fei","totalStudents":11},{"courses_instructor":"coulter, david","totalStudents":60},{"courses_instructor":"de oliveira andreotti, vanessa","totalStudents":16},{"courses_instructor":"hern, matt","totalStudents":19},{"courses_instructor":"wang, fei","totalStudents":33},{"courses_instructor":"rocha perkerwicz, samuel","totalStudents":43},{"courses_instructor":"reid, carrie","totalStudents":22},{"courses_instructor":"point, marny","totalStudents":47},{"courses_instructor":"charlie, clinton","totalStudents":33},{"courses_instructor":"blain, karen","totalStudents":22},{"courses_instructor":"wesley, saylesh gordon michael","totalStudents":14},{"courses_instructor":"james, kedrick","totalStudents":111},{"courses_instructor":"campbell, christopher","totalStudents":28},{"courses_instructor":"opini, bathseba","totalStudents":94},{"courses_instructor":"jordan, elizabeth","totalStudents":326},{"courses_instructor":"henry, annette","totalStudents":12},{"courses_instructor":"denizot, isabelle","totalStudents":170},{"courses_instructor":"faber, shawna","totalStudents":220},{"courses_instructor":"feng, francis","totalStudents":538},{"courses_instructor":"feng, francis;petrina, stephen","totalStudents":33},{"courses_instructor":"gunderson, lee paul","totalStudents":82},{"courses_instructor":"mathison, sandra","totalStudents":328},{"courses_instructor":"scott, sandra","totalStudents":33},{"courses_instructor":"nashon, samson madera","totalStudents":69},{"courses_instructor":"fatemi, sayyed mohsen","totalStudents":35},{"courses_instructor":"anderson, david;nashon, samson madera","totalStudents":26},{"courses_instructor":"carr, wendy;denizot, isabelle","totalStudents":17},{"courses_instructor":"bartosh, oksana","totalStudents":143},{"courses_instructor":"feng, francis;o'riley, patricia","totalStudents":92},{"courses_instructor":"shi, ling","totalStudents":62},{"courses_instructor":"fulton- trofanenko, brenda","totalStudents":17},{"courses_instructor":"han, hsiao-cheng;kentel, jeanne","totalStudents":17},{"courses_instructor":"ahenakew, cash","totalStudents":48},{"courses_instructor":"morgan, tannis","totalStudents":14},{"courses_instructor":"mcintosh, lisa","totalStudents":12},{"courses_instructor":"goelman, hillel","totalStudents":41},{"courses_instructor":"anderson, david","totalStudents":14},{"courses_instructor":"adler, james douglas;scott, sandra","totalStudents":62},{"courses_instructor":"brindley, jane","totalStudents":12},{"courses_instructor":"feng, francis;scott, sandra","totalStudents":23},{"courses_instructor":"nashon, samson madera;scott, sandra","totalStudents":29},{"courses_instructor":"friedel, tracy;nashon, samson madera","totalStudents":28},{"courses_instructor":"butler, joy;robson, claire","totalStudents":22},{"courses_instructor":"cretu, edmond","totalStudents":46},{"courses_instructor":"pattabiraman, karthik","totalStudents":46},{"courses_instructor":"fels, s sidney","totalStudents":69},{"courses_instructor":"nojeh, alireza","totalStudents":42},{"courses_instructor":"cheung, karen","totalStudents":93},{"courses_instructor":"han, kevin","totalStudents":5},{"courses_instructor":"servati, peyman","totalStudents":136},{"courses_instructor":"tang, shuo","totalStudents":24},{"courses_instructor":"nasiopoulos, panos","totalStudents":76},{"courses_instructor":"coria, lino","totalStudents":12},{"courses_instructor":"rohling, robert","totalStudents":353},{"courses_instructor":"jatskevich, juri","totalStudents":171},{"courses_instructor":"chapariha, mehrdad","totalStudents":10},{"courses_instructor":"ordonez, martin","totalStudents":81},{"courses_instructor":"vaahedi, ebrahim","totalStudents":134},{"courses_instructor":"dommel, hermann","totalStudents":52},{"courses_instructor":"marti, jose","totalStudents":143},{"courses_instructor":"krishnamurthy, vikram","totalStudents":94},{"courses_instructor":"lampe, lutz","totalStudents":438},{"courses_instructor":"bhargava, vijay","totalStudents":44},{"courses_instructor":"schober, robert","totalStudents":50},{"courses_instructor":"mallick, shankhanaad","totalStudents":56},{"courses_instructor":"wong, wai-shuen vincent","totalStudents":68},{"courses_instructor":"shah mansouri, hamed","totalStudents":12},{"courses_instructor":"leung, cyril s","totalStudents":48},{"courses_instructor":"leung, victor c","totalStudents":216},{"courses_instructor":"takahata, kenichi","totalStudents":98},{"courses_instructor":"walus, konrad","totalStudents":139},{"courses_instructor":"quinton, bradley","totalStudents":2},{"courses_instructor":"saleh, resve","totalStudents":12},{"courses_instructor":"madden, john","totalStudents":78},{"courses_instructor":"chrostowski, lukas","totalStudents":46},{"courses_instructor":"chrostowski, lukas;jaeger, nicolas a","totalStudents":24},{"courses_instructor":"jaeger, nicolas a","totalStudents":156},{"courses_instructor":"sarkaria, sarbjit","totalStudents":212},{"courses_instructor":"rosales, roberto","totalStudents":15},{"courses_instructor":"lecturer, e.c.e.","totalStudents":4},{"courses_instructor":"linares, luis","totalStudents":249},{"courses_instructor":"yan, joseph","totalStudents":61},{"courses_instructor":"jaeger, carol patricia","totalStudents":198},{"courses_instructor":"yedlin, matthew","totalStudents":89},{"courses_instructor":"mahmoudzadeh ahmadi, ali","totalStudents":60},{"courses_instructor":"krishnamurthy, vikram;zamar, ruben","totalStudents":120},{"courses_instructor":"stocco, leo","totalStudents":240},{"courses_instructor":"wang, zhen","totalStudents":125},{"courses_instructor":"ozog, nathan","totalStudents":71},{"courses_instructor":"molavi, reza","totalStudents":85},{"courses_instructor":"dunford, william","totalStudents":88},{"courses_instructor":"atighechi, hamid","totalStudents":96},{"courses_instructor":"chiniforoosh, sina","totalStudents":54},{"courses_instructor":"shekhar, sudip","totalStudents":40},{"courses_instructor":"michelson, david","totalStudents":10},{"courses_instructor":"lusina, paul","totalStudents":38},{"courses_instructor":"chen, yu christine","totalStudents":48},{"courses_instructor":"henville, charles;nagpal, mukesh","totalStudents":40},{"courses_instructor":"stoeber, boris","totalStudents":336},{"courses_instructor":"fox, mikus","totalStudents":159},{"courses_instructor":"paterson, douglas d","totalStudents":57},{"courses_instructor":"villagomez, erick","totalStudents":113},{"courses_instructor":"roehr, daniel","totalStudents":314},{"courses_instructor":"barratt, tom;villagomez, erick","totalStudents":25},{"courses_instructor":"healey, courtney;sklar, christopher","totalStudents":20},{"courses_instructor":"fry, joseph;lewis, martin","totalStudents":25},{"courses_instructor":"hanks, travis","totalStudents":146},{"courses_instructor":"amaya, hanako;fry, joseph;shearer, doug;siegel, sarah","totalStudents":30},{"courses_instructor":"alissa, reem;neumann, oliver","totalStudents":26},{"courses_instructor":"kellett, ronald","totalStudents":243},{"courses_instructor":"beca, bryan;porter, edward","totalStudents":25},{"courses_instructor":"sklar, christopher","totalStudents":46},{"courses_instructor":"parras, colette","totalStudents":31},{"courses_instructor":"davidson, bryn","totalStudents":31},{"courses_instructor":"lee, tara","totalStudents":1789},{"courses_instructor":"mahon, peter","totalStudents":1534},{"courses_instructor":"antwi, phanuel","totalStudents":101},{"courses_instructor":"endo, paul","totalStudents":903},{"courses_instructor":"saunders, mary ann","totalStudents":1208},{"courses_instructor":"trainor, kimberley","totalStudents":1680},{"courses_instructor":"grafton, kathryn","totalStudents":51},{"courses_instructor":"danielson, dennis richard","totalStudents":227},{"courses_instructor":"briggs, marlene","totalStudents":312},{"courses_instructor":"severs, jeffrey","totalStudents":550},{"courses_instructor":"kroller, eva-marie","totalStudents":447},{"courses_instructor":"brown, judy","totalStudents":766},{"courses_instructor":"james, suzanne","totalStudents":1955},{"courses_instructor":"nelson-mcdermott, catherine","totalStudents":662},{"courses_instructor":"hart, r alexander","totalStudents":1214},{"courses_instructor":"baxter, gisele marie","totalStudents":1441},{"courses_instructor":"fox, lorcan francis","totalStudents":2189},{"courses_instructor":"martineau, joel","totalStudents":146},{"courses_instructor":"deer, glenn","totalStudents":782},{"courses_instructor":"robinson, leni","totalStudents":828},{"courses_instructor":"rosenblum, shelly","totalStudents":333},{"courses_instructor":"roberts, duff","totalStudents":1981},{"courses_instructor":"cooper, john","totalStudents":498},{"courses_instructor":"rouse, robert","totalStudents":637},{"courses_instructor":"zeitlin, michael","totalStudents":127},{"courses_instructor":"catron, mandy","totalStudents":1294},{"courses_instructor":"frank, adam","totalStudents":260},{"courses_instructor":"mackie, gregory","totalStudents":1028},{"courses_instructor":"paltin, judith","totalStudents":81},{"courses_instructor":"bose, sarika","totalStudents":889},{"courses_instructor":"birks, roberta","totalStudents":1109},{"courses_instructor":"jerome, gillian","totalStudents":1959},{"courses_instructor":"sutherland, julie","totalStudents":742},{"courses_instructor":"somers, emily","totalStudents":766},{"courses_instructor":"raglon, rebecca","totalStudents":342},{"courses_instructor":"grubisic, brett","totalStudents":1784},{"courses_instructor":"morgan, george macgregor","totalStudents":1752},{"courses_instructor":"potter, tiffany","totalStudents":1680},{"courses_instructor":"mcneill, laurie","totalStudents":93},{"courses_instructor":"brocklebank, lisa","totalStudents":321},{"courses_instructor":"chapman, mary megan","totalStudents":522},{"courses_instructor":"cavell, richard anthony","totalStudents":688},{"courses_instructor":"mackenzie, scott","totalStudents":809},{"courses_instructor":"rymhs, deena","totalStudents":524},{"courses_instructor":"earle, bo","totalStudents":775},{"courses_instructor":"hudson, nicholas james","totalStudents":1580},{"courses_instructor":"weir, mary lorraine","totalStudents":716},{"courses_instructor":"burgess, miranda","totalStudents":279},{"courses_instructor":"hatch, ronald","totalStudents":187},{"courses_instructor":"johnson, lee","totalStudents":152},{"courses_instructor":"grace, sherrill","totalStudents":279},{"courses_instructor":"guy-bray, stephen","totalStudents":211},{"courses_instructor":"echard, sian","totalStudents":623},{"courses_instructor":"dawson, anthony b","totalStudents":210},{"courses_instructor":"good, graham","totalStudents":135},{"courses_instructor":"hodgson, elizabeth","totalStudents":286},{"courses_instructor":"thieme, katja","totalStudents":476},{"courses_instructor":"kreisel, deanna","totalStudents":623},{"courses_instructor":"doyle, kegan","totalStudents":53},{"courses_instructor":"petrillo, larissa;paterson, carla","totalStudents":67},{"courses_instructor":"lai, larissa","totalStudents":705},{"courses_instructor":"gooch, b","totalStudents":222},{"courses_instructor":"salmon, william noel","totalStudents":331},{"courses_instructor":"mota, miguel","totalStudents":353},{"courses_instructor":"delisle, jennifer","totalStudents":301},{"courses_instructor":"costantino, manuela","totalStudents":26},{"courses_instructor":"joseph, maia","totalStudents":26},{"courses_instructor":"deggan, mark","totalStudents":27},{"courses_instructor":"hilder, jamie","totalStudents":24},{"courses_instructor":"banting, sarah","totalStudents":160},{"courses_instructor":"dick, alexander","totalStudents":794},{"courses_instructor":"nadel, ira bruce","totalStudents":366},{"courses_instructor":"moss, laura","totalStudents":430},{"courses_instructor":"johnstone, tiffany","totalStudents":292},{"courses_instructor":"nardizzi, vincent","totalStudents":271},{"courses_instructor":"delisle, jennifer;tomc, sandra","totalStudents":152},{"courses_instructor":"sen, suddhaseel","totalStudents":116},{"courses_instructor":"stewart, janice","totalStudents":309},{"courses_instructor":"diotte, mark","totalStudents":19},{"courses_instructor":"phillips, noelle","totalStudents":124},{"courses_instructor":"anger, suzy","totalStudents":507},{"courses_instructor":"badir, patricia","totalStudents":219},{"courses_instructor":"mcneilly, kevin","totalStudents":578},{"courses_instructor":"segal, judy","totalStudents":601},{"courses_instructor":"derkatch, colleen","totalStudents":25},{"courses_instructor":"stolte, tyson michael","totalStudents":326},{"courses_instructor":"parry, sarah","totalStudents":1796},{"courses_instructor":"stumm, bettina","totalStudents":127},{"courses_instructor":"fleming, tara-lynn","totalStudents":627},{"courses_instructor":"biermann, wilhelmina georgina","totalStudents":1157},{"courses_instructor":"soles, derek","totalStudents":918},{"courses_instructor":"paterson, erika","totalStudents":919},{"courses_instructor":"scholes, judith","totalStudents":217},{"courses_instructor":"stewart, fenn","totalStudents":255},{"courses_instructor":"dreher, gudrun","totalStudents":868},{"courses_instructor":"lange, maja","totalStudents":205},{"courses_instructor":"laflamme, michelle","totalStudents":150},{"courses_instructor":"kent, edward","totalStudents":130},{"courses_instructor":"patterson, katharine","totalStudents":93},{"courses_instructor":"grabovac, ivan","totalStudents":159},{"courses_instructor":"hanna, julian richmond","totalStudents":61},{"courses_instructor":"petrillo, larissa","totalStudents":35},{"courses_instructor":"parkin, christine","totalStudents":194},{"courses_instructor":"wright, claire","totalStudents":30},{"courses_instructor":"mason, travis","totalStudents":102},{"courses_instructor":"newell, jonathan","totalStudents":58},{"courses_instructor":"grafton, kathryn;stumm, bettina","totalStudents":34},{"courses_instructor":"calloway, katherine","totalStudents":196},{"courses_instructor":"brinton, laurel;vatikiotis-bateson, eric","totalStudents":46},{"courses_instructor":"sirluck, katherine","totalStudents":402},{"courses_instructor":"dalziel, pamela","totalStudents":83},{"courses_instructor":"partridge, stephen","totalStudents":400},{"courses_instructor":"gooch, jane lytton","totalStudents":201},{"courses_instructor":"staykova, julia","totalStudents":36},{"courses_instructor":"briggs, marlene;ferreira, laila","totalStudents":34},{"courses_instructor":"lupton, christina","totalStudents":92},{"courses_instructor":"ludlow, elizabeth","totalStudents":75},{"courses_instructor":"ricou, laurie","totalStudents":102},{"courses_instructor":"brown, judy;paterson, erika","totalStudents":26},{"courses_instructor":"tomc, sandra","totalStudents":107},{"courses_instructor":"merivale, patricia","totalStudents":32},{"courses_instructor":"al-kassim, dina","totalStudents":132},{"courses_instructor":"fee, margery","totalStudents":68},{"courses_instructor":"levy, e","totalStudents":237},{"courses_instructor":"arnovick, leslie katherine","totalStudents":460},{"courses_instructor":"mirante, nicole","totalStudents":36},{"courses_instructor":"denholm, julia","totalStudents":41},{"courses_instructor":"macbean, allyson","totalStudents":34},{"courses_instructor":"slemon, jane c","totalStudents":10},{"courses_instructor":"brown, judy;robinson, leni","totalStudents":15},{"courses_instructor":"paterson, erika;robinson, leni","totalStudents":30},{"courses_instructor":"husband, loren danae;segal, judy","totalStudents":27},{"courses_instructor":"graham, scott","totalStudents":101},{"courses_instructor":"hill, ian","totalStudents":118},{"courses_instructor":"bowers, fred;bowers, sarah","totalStudents":356},{"courses_instructor":"bowers, fred","totalStudents":208},{"courses_instructor":"bowers, sarah","totalStudents":7},{"courses_instructor":"de villiers, jessica","totalStudents":253},{"courses_instructor":"brinton, laurel","totalStudents":320},{"courses_instructor":"dancygier, barbara","totalStudents":600},{"courses_instructor":"wieland, gernot","totalStudents":283},{"courses_instructor":"gooding, richard;potter, tiffany","totalStudents":49},{"courses_instructor":"dollinger, stefan","totalStudents":41},{"courses_instructor":"globe, alexander","totalStudents":19},{"courses_instructor":"vessey, mark","totalStudents":12},{"courses_instructor":"wasserman, jerry","totalStudents":180},{"courses_instructor":"gunew, sneja","totalStudents":17},{"courses_instructor":"partridge, stephen;rouse, robert","totalStudents":16},{"courses_instructor":"jones, david","totalStudents":512},{"courses_instructor":"gay, colin;kotlicki, andrzej","totalStudents":60},{"courses_instructor":"waltham, christopher","totalStudents":97},{"courses_instructor":"jones, david;michal, carl","totalStudents":52},{"courses_instructor":"michal, carl;pennec, yan herve loic","totalStudents":21},{"courses_instructor":"michal, carl","totalStudents":195},{"courses_instructor":"hansen, carl;nakane, jonathan","totalStudents":108},{"courses_instructor":"nakane, jonathan;young, jeff","totalStudents":109},{"courses_instructor":"nakane, jonathan;waltham, christopher","totalStudents":206},{"courses_instructor":"jones, david;nakane, jonathan","totalStudents":108},{"courses_instructor":"nakane, jonathan","totalStudents":8},{"courses_instructor":"harris, sara;ivanochko, tara","totalStudents":235},{"courses_instructor":"harris, sara;holland, tara","totalStudents":46},{"courses_instructor":"harris, sara;steyn, douw gerbrand","totalStudents":97},{"courses_instructor":"johnson, mark;lane, erin","totalStudents":53},{"courses_instructor":"lane, erin;taylor, rebecca","totalStudents":39},{"courses_instructor":"johnson, mark;lipsen, michael","totalStudents":34},{"courses_instructor":"ivanochko, tara;johnson, mark","totalStudents":88},{"courses_instructor":"chan, kai;harris, sara","totalStudents":82},{"courses_instructor":"ivanochko, tara;steyn, douw gerbrand","totalStudents":46},{"courses_instructor":"harris, sara;johnson, mark","totalStudents":35},{"courses_instructor":"ivanochko, tara;zerriffi, hisham","totalStudents":49},{"courses_instructor":"harris, sara;lipsen, michael","totalStudents":40},{"courses_instructor":"ivanochko, tara;lipsen, michael","totalStudents":41},{"courses_instructor":"ivanochko, tara;radic, valentina","totalStudents":101},{"courses_instructor":"steyn, douw gerbrand","totalStudents":85},{"courses_instructor":"lane, erin;steyn, douw gerbrand","totalStudents":62},{"courses_instructor":"ivanochko, tara;tba","totalStudents":346},{"courses_instructor":"chan, kai;ivanochko, tara","totalStudents":83},{"courses_instructor":"christensen, villy;ivanochko, tara;radic, valentina","totalStudents":58},{"courses_instructor":"storey, stefan","totalStudents":43},{"courses_instructor":"zerriffi, hisham","totalStudents":133},{"courses_instructor":"johnson, mark","totalStudents":68},{"courses_instructor":"chan, kai","totalStudents":55},{"courses_instructor":"evans ogden, lesley;orians, kristin","totalStudents":5},{"courses_instructor":"lane, erin","totalStudents":6},{"courses_instructor":"bevier, mary lou","totalStudents":166},{"courses_instructor":"woodell, daniel","totalStudents":490},{"courses_instructor":"grimm, kurt andrew","totalStudents":502},{"courses_instructor":"hearn, elizabeth;mindell, randal","totalStudents":141},{"courses_instructor":"athaide, dileep","totalStudents":135},{"courses_instructor":"bevier, mary lou;hearn, elizabeth","totalStudents":168},{"courses_instructor":"porritt, lucy","totalStudents":858},{"courses_instructor":"gilley, brett","totalStudents":167},{"courses_instructor":"bain, amelia anne","totalStudents":657},{"courses_instructor":"hodge, kirsten;mindell, randal","totalStudents":236},{"courses_instructor":"grimm, kurt andrew;hodge, kirsten","totalStudents":188},{"courses_instructor":"porritt, lucy;sutherland, stuart","totalStudents":294},{"courses_instructor":"hearn, elizabeth;kennedy, ben","totalStudents":165},{"courses_instructor":"grimm, kurt andrew;hearn, elizabeth","totalStudents":139},{"courses_instructor":"bevier, mary lou;radic, valentina","totalStudents":189},{"courses_instructor":"dohaney, jacqueline anne","totalStudents":155},{"courses_instructor":"mindell, randal","totalStudents":1178},{"courses_instructor":"harris, sara","totalStudents":1309},{"courses_instructor":"francois, roger","totalStudents":837},{"courses_instructor":"francois, roger;pakhomov, yevhenii","totalStudents":156},{"courses_instructor":"francois, roger;taylor, rebecca","totalStudents":163},{"courses_instructor":"francois, roger;harris, sara","totalStudents":332},{"courses_instructor":"harris, sara;hodge, kirsten","totalStudents":222},{"courses_instructor":"francois, roger;steyn, douw gerbrand","totalStudents":186},{"courses_instructor":"block, stephanie;harris, sara","totalStudents":301},{"courses_instructor":"francois, roger;ver, leah may","totalStudents":323},{"courses_instructor":"francois, roger;hsieh, william","totalStudents":158},{"courses_instructor":"gilley, brett;hammer, philip;porritt, lucy;stull, roland;ver, leah may;woodell, daniel","totalStudents":579},{"courses_instructor":"gilley, brett;mindell, randal;porritt, lucy;stull, roland;sutherland, stuart;ver, leah may;woodell, daniel","totalStudents":572},{"courses_instructor":"ver, leah may;wilson, heather","totalStudents":799},{"courses_instructor":"bain, amelia anne;gilley, brett;hearn, elizabeth;stull, roland;sutherland, stuart","totalStudents":493},{"courses_instructor":"bain, amelia anne;gilley, brett;hearn, elizabeth;russell, james kelly;stull, roland;sutherland, stuart","totalStudents":588},{"courses_instructor":"ver, leah may","totalStudents":5636},{"courses_instructor":"mckinnon, mika erin isabel;ver, leah may","totalStudents":457},{"courses_instructor":"hammer, philip;woodell, daniel","totalStudents":183},{"courses_instructor":"gilley, brett;hammer, philip","totalStudents":182},{"courses_instructor":"bain, amelia anne;gilley, brett;mckinnon, mika erin isabel;stull, roland;sutherland, stuart","totalStudents":868},{"courses_instructor":"gilley, brett;porritt, lucy;stull, roland;ver, leah may;woodell, daniel","totalStudents":533},{"courses_instructor":"gilley, brett;maldonado-pareja, maria;porritt, lucy;stull, roland;woodell, daniel","totalStudents":634},{"courses_instructor":"gilley, brett;hodge, kirsten;mindell, randal;stull, roland;sutherland, stuart;ver, leah may","totalStudents":622},{"courses_instructor":"gilley, brett;hodge, kirsten;mindell, randal;russell, james kelly;stull, roland;sutherland, stuart;ver, leah may","totalStudents":569},{"courses_instructor":"longridge, louise;ver, leah may","totalStudents":823},{"courses_instructor":"gilley, brett;lipsen, michael;porritt, lucy;stull, roland;ver, leah may","totalStudents":634},{"courses_instructor":"gilley, brett;maldonado-pareja, maria;porritt, lucy;russell, james kelly;stull, roland;sutherland, stuart","totalStudents":637},{"courses_instructor":"lipsen, michael;ver, leah may","totalStudents":542},{"courses_instructor":"bevier, mary lou;eberhardt, erik;frappe-seneclauze, tom-pierre;harris, sara;stull, roland","totalStudents":463},{"courses_instructor":"bostock, michael;eberhardt, erik;frappe-seneclauze, tom-pierre;harris, sara;stull, roland","totalStudents":304},{"courses_instructor":"carazzo, guillaume;eberhardt, erik;monteux, julien;stull, roland;sutherland, stuart","totalStudents":897},{"courses_instructor":"gilley, brett;mindell, randal","totalStudents":122},{"courses_instructor":"francois, roger;mortensen, james;sutherland, stuart","totalStudents":250},{"courses_instructor":"longridge, louise","totalStudents":2673},{"courses_instructor":"francois, roger;mindell, randal;sutherland, stuart","totalStudents":360},{"courses_instructor":"mindell, randal;mortensen, james;sutherland, stuart","totalStudents":217},{"courses_instructor":"golding, martyn;mortensen, james;sherman, sarah","totalStudents":168},{"courses_instructor":"mortensen, james;sutherland, stuart","totalStudents":230},{"courses_instructor":"francois, roger;grey, melissa;mortensen, james","totalStudents":238},{"courses_instructor":"cempirek, jan;turner, david","totalStudents":558},{"courses_instructor":"turner, david","totalStudents":3247},{"courses_instructor":"dzikowski, tashia;turner, david","totalStudents":1585},{"courses_instructor":"dzikowski, tashia","totalStudents":160},{"courses_instructor":"eberhardt, erik;hollingshead, susan","totalStudents":674},{"courses_instructor":"eberhardt, erik;haque, shama emy;mindell, randal;peterson, holly","totalStudents":211},{"courses_instructor":"ameli, ali;sutherland, stuart","totalStudents":207},{"courses_instructor":"eberhardt, erik;mckinnon, mika erin isabel","totalStudents":228},{"courses_instructor":"eberhardt, erik;mayer, ulrich","totalStudents":187},{"courses_instructor":"dohaney, jacqueline anne;eberhardt, erik;sutherland, stuart","totalStudents":214},{"courses_instructor":"johnson, catherine;pawlowicz, richard","totalStudents":323},{"courses_instructor":"johnson, catherine;scheifele, benjamin","totalStudents":79},{"courses_instructor":"ferguson, james;pawlowicz, richard","totalStudents":73},{"courses_instructor":"austin, philip;johnson, catherine","totalStudents":35},{"courses_instructor":"jellinek, andrew","totalStudents":381},{"courses_instructor":"jones, francis h m","totalStudents":74},{"courses_instructor":"bostock, michael;jellinek, andrew","totalStudents":61},{"courses_instructor":"bevier, mary lou;scoates, james stewart","totalStudents":191},{"courses_instructor":"mindell, randal;scoates, james stewart","totalStudents":78},{"courses_instructor":"bevier, mary lou;van straaten, bram ivo","totalStudents":98},{"courses_instructor":"bevier, mary lou;mindell, randal;scoates, james stewart","totalStudents":97},{"courses_instructor":"bevier, mary lou;smit, matthijs","totalStudents":110},{"courses_instructor":"mills, stuart","totalStudents":84},{"courses_instructor":"scoates, james stewart;smit, matthijs","totalStudents":83},{"courses_instructor":"bevier, mary lou;dohaney, jacqueline anne","totalStudents":101},{"courses_instructor":"kopylova, maya;mindell, randal;sutherland, stuart","totalStudents":78},{"courses_instructor":"kopylova, maya;mindell, randal","totalStudents":157},{"courses_instructor":"kopylova, maya;sherman, sarah","totalStudents":70},{"courses_instructor":"kopylova, maya;sutherland, stuart","totalStudents":167},{"courses_instructor":"smith, paul laurence","totalStudents":222},{"courses_instructor":"mindell, randal;sutherland, stuart","totalStudents":295},{"courses_instructor":"longridge, louise;smith, paul laurence","totalStudents":54},{"courses_instructor":"bevier, mary lou;mindell, randal;mortensen, james;smith, paul laurence","totalStudents":64},{"courses_instructor":"lane, erin;phillips, steve;tba","totalStudents":30},{"courses_instructor":"caruthers, andrew;friedlander, elizabeth;tba","totalStudents":34},{"courses_instructor":"bevier, mary lou;harris, sara;phillips, steve;smith, paul laurence","totalStudents":63},{"courses_instructor":"bevier, mary lou;bustin, robert marc;golding, martyn;mortensen, james;smith, paul laurence","totalStudents":63},{"courses_instructor":"bevier, mary lou;mindell, randal;mortensen, james;tba","totalStudents":63},{"courses_instructor":"bevier, mary lou;bustin, robert marc;mortensen, james;simpson, kirsten anne;smith, paul laurence","totalStudents":64},{"courses_instructor":"bevier, mary lou;harris, sara;phillips, steve;rasmussen, kirsten louise","totalStudents":65},{"courses_instructor":"hollingshead, susan","totalStudents":223},{"courses_instructor":"schoof, christian","totalStudents":190},{"courses_instructor":"philpott, lydia","totalStudents":29},{"courses_instructor":"maldonado-pareja, maria;pakhomov, yevhenii","totalStudents":113},{"courses_instructor":"lipsen, michael;maldonado-pareja, maria","totalStudents":62},{"courses_instructor":"germano, bernardita","totalStudents":102},{"courses_instructor":"maldonado-pareja, maria","totalStudents":128},{"courses_instructor":"germano, bernardita;maldonado-pareja, maria;pakhomov, yevhenii","totalStudents":71},{"courses_instructor":"hodge, kirsten","totalStudents":675},{"courses_instructor":"hammer, philip","totalStudents":206},{"courses_instructor":"frappe-seneclauze, tom-pierre;hammer, philip","totalStudents":72},{"courses_instructor":"mohit, surdas","totalStudents":121},{"courses_instructor":"lamberson, michelle","totalStudents":286},{"courses_instructor":"scoates, james stewart","totalStudents":138},{"courses_instructor":"lipsen, michael","totalStudents":1804},{"courses_instructor":"brown, kristina;lipsen, michael;mcalister, jason alan","totalStudents":33},{"courses_instructor":"maldonado-pareja, maria;tortell, philippe","totalStudents":131},{"courses_instructor":"lipsen, michael;tortell, philippe","totalStudents":130},{"courses_instructor":"lipsen, michael;taylor, rebecca;tommasi, desiree","totalStudents":47},{"courses_instructor":"lipsen, michael;orians, kristin","totalStudents":97},{"courses_instructor":"lekhi, priya;lipsen, michael","totalStudents":43},{"courses_instructor":"bustin, robert marc","totalStudents":613},{"courses_instructor":"kopylova, maya","totalStudents":232},{"courses_instructor":"gilley, brett;kopylova, maya","totalStudents":38},{"courses_instructor":"dipple, gregory","totalStudents":277},{"courses_instructor":"beinlich, andreas","totalStudents":45},{"courses_instructor":"kennedy, lori","totalStudents":493},{"courses_instructor":"van straaten, bram ivo","totalStudents":64},{"courses_instructor":"sutherland, stuart","totalStudents":575},{"courses_instructor":"smith, paul laurence;sutherland, stuart","totalStudents":150},{"courses_instructor":"caruthers, andrew;sutherland, stuart","totalStudents":149},{"courses_instructor":"hickey, kenneth;hollingshead, susan;kennedy, lori;porritt, lucy;scoates, james stewart","totalStudents":37},{"courses_instructor":"hickey, kenneth;kennedy, lori;russell, james kelly;scoates, james stewart","totalStudents":28},{"courses_instructor":"haywood, jennifer crandall;hickey, kenneth;mcdougall, scott;russell, james kelly;scoates, james stewart","totalStudents":34},{"courses_instructor":"hickey, kenneth;kennedy, lori;russell, james kelly;scoates, james stewart;smit, matthijs","totalStudents":39},{"courses_instructor":"hickey, kenneth;kennedy, lori;russell, james kelly;scoates, james stewart;tba","totalStudents":21},{"courses_instructor":"gilley, brett;kennedy, lori;porritt, lucy;russell, james kelly;sherman, sarah;smit, matthijs","totalStudents":35},{"courses_instructor":"eberhardt, erik;mortensen, james;russell, james kelly;sutherland, stuart","totalStudents":23},{"courses_instructor":"bustin, robert marc;caulkins, joshua;eberhardt, erik;hickey, kenneth;kennedy, lori;russell, james kelly","totalStudents":37},{"courses_instructor":"beckie, roger","totalStudents":970},{"courses_instructor":"zawadzki, wojciech","totalStudents":158},{"courses_instructor":"mayer, ulrich","totalStudents":136},{"courses_instructor":"hungr, oldrich","totalStudents":708},{"courses_instructor":"mcdougall, scott","totalStudents":196},{"courses_instructor":"thomson, bruce","totalStudents":65},{"courses_instructor":"hickey, kenneth;scoates, james stewart","totalStudents":422},{"courses_instructor":"allan, murray","totalStudents":40},{"courses_instructor":"dipple, gregory;hickey, kenneth;mortensen, james;scoates, james stewart;tosdal, richard","totalStudents":46},{"courses_instructor":"mortensen, james","totalStudents":276},{"courses_instructor":"barnes, elspeth","totalStudents":31},{"courses_instructor":"weis, dominique","totalStudents":171},{"courses_instructor":"scoates, james stewart;weis, dominique","totalStudents":100},{"courses_instructor":"fourny, anais;harrison, lauren","totalStudents":37},{"courses_instructor":"harris, sara;jessop, david;scheifele, benjamin","totalStudents":137},{"courses_instructor":"dawe, jordan;mindell, randal","totalStudents":243},{"courses_instructor":"austin, philip;harris, sara","totalStudents":362},{"courses_instructor":"austin, philip;ivanochko, tara","totalStudents":261},{"courses_instructor":"austin, philip;harris, sara;hodge, kirsten","totalStudents":183},{"courses_instructor":"harris, sara;scheifele, benjamin","totalStudents":149},{"courses_instructor":"austin, philip;harris, sara;mayer, ulrich","totalStudents":68},{"courses_instructor":"oldenburg, douglas","totalStudents":348},{"courses_instructor":"haber, eldad","totalStudents":219},{"courses_instructor":"hearn, elizabeth","totalStudents":11},{"courses_instructor":"bostock, michael","totalStudents":205},{"courses_instructor":"herrmann, felix","totalStudents":122},{"courses_instructor":"bostock, michael;herrmann, felix","totalStudents":7},{"courses_instructor":"maldonado-pareja, maria;orians, kristin;pawlowicz, richard","totalStudents":369},{"courses_instructor":"allen, susan elizabeth;maldonado-pareja, maria;orians, kristin","totalStudents":415},{"courses_instructor":"allen, susan elizabeth;lane, erin;orians, kristin","totalStudents":232},{"courses_instructor":"lipsen, michael;maldonado-pareja, maria;orians, kristin","totalStudents":154},{"courses_instructor":"allen, susan elizabeth;francois, roger;maldonado-pareja, maria;orians, kristin","totalStudents":184},{"courses_instructor":"francois, roger;maldonado-pareja, maria;pawlowicz, richard","totalStudents":144},{"courses_instructor":"allen, susan elizabeth;francois, roger;maldonado-pareja, maria","totalStudents":300},{"courses_instructor":"allen, susan elizabeth;francois, roger;lane, erin","totalStudents":114},{"courses_instructor":"halverson, mark;lipsen, michael;maldonado-pareja, maria","totalStudents":61},{"courses_instructor":"russell, james kelly","totalStudents":255},{"courses_instructor":"kennedy, lori;tba","totalStudents":30},{"courses_instructor":"tba;woodell, daniel","totalStudents":23},{"courses_instructor":"dipple, gregory;kennedy, lori","totalStudents":26},{"courses_instructor":"baker, shaun;kennedy, lori","totalStudents":24},{"courses_instructor":"golding, martyn;smith, paul laurence","totalStudents":33},{"courses_instructor":"beckie, roger;mayer, ulrich;smith, james leslie","totalStudents":192},{"courses_instructor":"beckie, roger;mayer, ulrich","totalStudents":86},{"courses_instructor":"beckie, roger;o'neill, shane","totalStudents":53},{"courses_instructor":"mayer, ulrich;smith, james leslie","totalStudents":38},{"courses_instructor":"smith, james leslie;tba","totalStudents":122},{"courses_instructor":"smith, james leslie","totalStudents":341},{"courses_instructor":"pedretti, daniele;smith, james leslie","totalStudents":183},{"courses_instructor":"atkin, steve;mayer, ulrich","totalStudents":47},{"courses_instructor":"eberhardt, erik","totalStudents":417},{"courses_instructor":"wyllie, duncan","totalStudents":53},{"courses_instructor":"ivanochko, tara","totalStudents":181},{"courses_instructor":"barnes, elspeth;lane, erin","totalStudents":15},{"courses_instructor":"johnson, catherine","totalStudents":51},{"courses_instructor":"johnson, catherine;mohit, surdas","totalStudents":5},{"courses_instructor":"tortell, philippe","totalStudents":61},{"courses_instructor":"block, stephanie;maldonado-pareja, maria","totalStudents":11},{"courses_instructor":"maldonado-pareja, maria;pawlowicz, richard","totalStudents":20},{"courses_instructor":"pawlowicz, richard;tba","totalStudents":16},{"courses_instructor":"halverson, mark;maldonado-pareja, maria;pakhomov, yevhenii","totalStudents":19},{"courses_instructor":"block, stephanie;pakhomov, yevhenii","totalStudents":16},{"courses_instructor":"pakhomov, yevhenii","totalStudents":656},{"courses_instructor":"harris, sara;pakhomov, yevhenii","totalStudents":61},{"courses_instructor":"suttle, curtis","totalStudents":195},{"courses_instructor":"pakhomov, yevhenii;pitcher, tony","totalStudents":266},{"courses_instructor":"pawlowicz, richard","totalStudents":27},{"courses_instructor":"allen, susan elizabeth","totalStudents":9},{"courses_instructor":"groat, lee","totalStudents":70},{"courses_instructor":"gordon, terence;russell, james kelly","totalStudents":9},{"courses_instructor":"hart, craig;mortensen, james","totalStudents":41},{"courses_instructor":"mortensen, james;tba","totalStudents":15},{"courses_instructor":"mortensen, james;tosdal, richard","totalStudents":10},{"courses_instructor":"beckie, roger;mayer, ulrich;tba","totalStudents":15},{"courses_instructor":"hart, craig","totalStudents":10},{"courses_instructor":"hickey, kenneth","totalStudents":10},{"courses_instructor":"tosdal, richard","totalStudents":14},{"courses_instructor":"vadeboncoeur, jennifer","totalStudents":298},{"courses_instructor":"chartres, lynn","totalStudents":204},{"courses_instructor":"lo, chih shen","totalStudents":64},{"courses_instructor":"porath, marion","totalStudents":122},{"courses_instructor":"nicks, david","totalStudents":104},{"courses_instructor":"stockman, james","totalStudents":112},{"courses_instructor":"jamieson, janet ruth","totalStudents":67},{"courses_instructor":"romero, amber","totalStudents":121},{"courses_instructor":"curle, deirdre;jamieson, janet ruth","totalStudents":31},{"courses_instructor":"yorke, erin","totalStudents":44},{"courses_instructor":"fell, jessica","totalStudents":35},{"courses_instructor":"heikkila, mary","totalStudents":303},{"courses_instructor":"macneil, kimberley","totalStudents":45},{"courses_instructor":"grund, brandy-jean","totalStudents":27},{"courses_instructor":"mcquarrie, maureen","totalStudents":72},{"courses_instructor":"turriff, wendy","totalStudents":214},{"courses_instructor":"siegel, linda","totalStudents":33},{"courses_instructor":"dowler, judith rosemary","totalStudents":50},{"courses_instructor":"rathwell, david","totalStudents":215},{"courses_instructor":"zebehazy, kim","totalStudents":41},{"courses_instructor":"cox, elizabeth","totalStudents":448},{"courses_instructor":"wilk, diana","totalStudents":310},{"courses_instructor":"rothstein, vicki","totalStudents":174},{"courses_instructor":"kelty, jane","totalStudents":177},{"courses_instructor":"fossett, brenda","totalStudents":248},{"courses_instructor":"cox, elizabeth;reiner, ann","totalStudents":93},{"courses_instructor":"phillips, lynda","totalStudents":39},{"courses_instructor":"lee, hyekyung","totalStudents":60},{"courses_instructor":"lauridsen, kristi","totalStudents":47},{"courses_instructor":"mceachern hughes, tammy","totalStudents":63},{"courses_instructor":"mirenda, pat","totalStudents":348},{"courses_instructor":"levinson, tami","totalStudents":47},{"courses_instructor":"malone, sharon","totalStudents":96},{"courses_instructor":"ford, laurie","totalStudents":168},{"courses_instructor":"lacroix, serge","totalStudents":73},{"courses_instructor":"*baker, heather","totalStudents":16},{"courses_instructor":"cole, kenneth","totalStudents":55},{"courses_instructor":"mitchell, allison rugh","totalStudents":32},{"courses_instructor":"ford, laurie;kozey, michelle","totalStudents":11},{"courses_instructor":"white, aaron","totalStudents":209},{"courses_instructor":"ballou, jeffrey","totalStudents":13},{"courses_instructor":"amaral, deborah","totalStudents":44},{"courses_instructor":"fusaro, nicole","totalStudents":16},{"courses_instructor":"ervin, ruth","totalStudents":46},{"courses_instructor":"both, pauline;ervin, ruth","totalStudents":25},{"courses_instructor":"lucyshyn, joseph","totalStudents":276},{"courses_instructor":"smith, laurie","totalStudents":46},{"courses_instructor":"both, pauline","totalStudents":73},{"courses_instructor":"campbell, katie","totalStudents":59},{"courses_instructor":"both, pauline;romero, amber","totalStudents":36},{"courses_instructor":"both, pauline;faber, shawna","totalStudents":30},{"courses_instructor":"harrison, sheryl lynn","totalStudents":23},{"courses_instructor":"champion, kathleen","totalStudents":478},{"courses_instructor":"narang, preetinder","totalStudents":25},{"courses_instructor":"langlois, jocelyn","totalStudents":43},{"courses_instructor":"grow, laura","totalStudents":259},{"courses_instructor":"elfert, miriam","totalStudents":53},{"courses_instructor":"stock, richard","totalStudents":35},{"courses_instructor":"bopp, karen","totalStudents":33},{"courses_instructor":"tierney, robin","totalStudents":10},{"courses_instructor":"rusticus, shayna","totalStudents":150},{"courses_instructor":"ercikan, kadriye","totalStudents":99},{"courses_instructor":"zdaniuk, bozena","totalStudents":57},{"courses_instructor":"sandilands, dallie","totalStudents":22},{"courses_instructor":"kishor, nand","totalStudents":447},{"courses_instructor":"wu, amery","totalStudents":284},{"courses_instructor":"launeanu, mihaela","totalStudents":38},{"courses_instructor":"chan, eric","totalStudents":135},{"courses_instructor":"kishor, nand;launeanu, mihaela","totalStudents":32},{"courses_instructor":"arlin, marshall","totalStudents":23},{"courses_instructor":"weber, barbara","totalStudents":24},{"courses_instructor":"butler, deborah","totalStudents":20},{"courses_instructor":"darwich, lina","totalStudents":49},{"courses_instructor":"guhn, martin","totalStudents":126},{"courses_instructor":"perry, nancy","totalStudents":170},{"courses_instructor":"hymel, shelley","totalStudents":221},{"courses_instructor":"law, danielle m","totalStudents":67},{"courses_instructor":"konishi, chiaki","totalStudents":13},{"courses_instructor":"shapka, jennifer","totalStudents":169},{"courses_instructor":"marshall, sheila","totalStudents":96},{"courses_instructor":"young, tigerson","totalStudents":28},{"courses_instructor":"cannon, joanna","totalStudents":120},{"courses_instructor":"katz, jennifer","totalStudents":30},{"courses_instructor":"curle, deirdre;jordan, elizabeth","totalStudents":18},{"courses_instructor":"curle, deirdre;jordan, elizabeth;norman, nancy","totalStudents":31},{"courses_instructor":"karres, debora","totalStudents":31},{"courses_instructor":"mclaughlin, joe;russell, debra","totalStudents":19},{"courses_instructor":"russell, debra","totalStudents":28},{"courses_instructor":"mercer, sterett","totalStudents":100},{"courses_instructor":"klassen, robert","totalStudents":9},{"courses_instructor":"andreou, theresa","totalStudents":9},{"courses_instructor":"reid, gavin","totalStudents":18},{"courses_instructor":"hubley, anita","totalStudents":273},{"courses_instructor":"mcintosh, kent","totalStudents":39},{"courses_instructor":"weber, rachel","totalStudents":66},{"courses_instructor":"ainsworth, cheryl","totalStudents":8},{"courses_instructor":"amaral, deborah;ford, laurie","totalStudents":17},{"courses_instructor":"missiaen, sharon anne","totalStudents":21},{"courses_instructor":"hymel, shelley;miller, lynn delaine","totalStudents":15},{"courses_instructor":"amaral, deborah;missiaen, sharon anne","totalStudents":20},{"courses_instructor":"mckee, william","totalStudents":32},{"courses_instructor":"robinson, georgina","totalStudents":7},{"courses_instructor":"wormeli, ted","totalStudents":6},{"courses_instructor":"ford, laurie;robinson, georgina","totalStudents":26},{"courses_instructor":"jhangiani, rajiv","totalStudents":191},{"courses_instructor":"coniglio, connie","totalStudents":53},{"courses_instructor":"haverkamp, beth","totalStudents":9},{"courses_instructor":"talmy, steven","totalStudents":6},{"courses_instructor":"zumbo, bruno","totalStudents":136},{"courses_instructor":"smith, veronica","totalStudents":6},{"courses_instructor":"carey, stephen","totalStudents":137},{"courses_instructor":"cho, sunah","totalStudents":342},{"courses_instructor":"mccracken, janet","totalStudents":307},{"courses_instructor":"bryson, mary","totalStudents":126},{"courses_instructor":"janes, diane","totalStudents":536},{"courses_instructor":"miller, jeffrey","totalStudents":188},{"courses_instructor":"hauge, chelsey","totalStudents":40},{"courses_instructor":"miller, jeffrey d","totalStudents":18},{"courses_instructor":"boskic, natasha","totalStudents":18},{"courses_instructor":"alam, matiul","totalStudents":267},{"courses_instructor":"friesen, norman","totalStudents":15},{"courses_instructor":"justus, marian","totalStudents":20},{"courses_instructor":"wang, yifei","totalStudents":34},{"courses_instructor":"bullen, mark","totalStudents":146},{"courses_instructor":"bourlova, tatiana","totalStudents":102},{"courses_instructor":"mcgregor, heather","totalStudents":20},{"courses_instructor":"vogt, david","totalStudents":297},{"courses_instructor":"porter, david","totalStudents":17},{"courses_instructor":"porter, david;vogt, david","totalStudents":40},{"courses_instructor":"egan, john patrick","totalStudents":29},{"courses_instructor":"dobson, teresa","totalStudents":128},{"courses_instructor":"lamb, brian","totalStudents":39},{"courses_instructor":"van enk, anneke","totalStudents":33},{"courses_instructor":"pena alonso, ernesto","totalStudents":24},{"courses_instructor":"segnini, elisa","totalStudents":220},{"courses_instructor":"walsh, shannon","totalStudents":61},{"courses_instructor":"scholte, tom","totalStudents":152},{"courses_instructor":"hauka, david","totalStudents":96},{"courses_instructor":"talalay, rachel","totalStudents":119},{"courses_instructor":"humphries, nicholas","totalStudents":59},{"courses_instructor":"gallagher, christopher","totalStudents":184},{"courses_instructor":"bodruzic, bojan","totalStudents":98},{"courses_instructor":"spangler, bruce","totalStudents":18},{"courses_instructor":"beaver, dwayne","totalStudents":117},{"courses_instructor":"herrmann, karl","totalStudents":54},{"courses_instructor":"haworth, gwen tara","totalStudents":22},{"courses_instructor":"mcgowan, sharon","totalStudents":277},{"courses_instructor":"chiu, sidney","totalStudents":79},{"courses_instructor":"stopkewich, lynne","totalStudents":41},{"courses_instructor":"lee, karin","totalStudents":90},{"courses_instructor":"wenzek, rob","totalStudents":20},{"courses_instructor":"kerr, ian","totalStudents":53},{"courses_instructor":"arvidson, vince","totalStudents":183},{"courses_instructor":"cyr, david","totalStudents":41},{"courses_instructor":"cyr, david;stiller, murray","totalStudents":12},{"courses_instructor":"cyr, david;tba","totalStudents":21},{"courses_instructor":"lewis, jennifer","totalStudents":19},{"courses_instructor":"cyr, david;lewis, jennifer","totalStudents":14},{"courses_instructor":"spivak, refael","totalStudents":146},{"courses_instructor":"tba;talalay, rachel","totalStudents":19},{"courses_instructor":"parker, michael","totalStudents":23},{"courses_instructor":"weber, ross","totalStudents":18},{"courses_instructor":"mccall, lael","totalStudents":71},{"courses_instructor":"pauly, daniel;trites, andrew","totalStudents":31},{"courses_instructor":"martell, steve","totalStudents":19},{"courses_instructor":"mcallister, murdoch","totalStudents":6},{"courses_instructor":"cheung, wai lung;christensen, villy;close, david;mcallister, murdoch;pauly, daniel;pitcher, tony;sumaila, ussif rashid;trites, andrew;vincent, amanda","totalStudents":18},{"courses_instructor":"cheung, wai lung;christensen, villy;close, david;pauly, daniel;pitcher, tony;sumaila, ussif rashid;trites, andrew;vincent, amanda;walters, carl john","totalStudents":10},{"courses_instructor":"cheung, wai lung;christensen, villy;close, david;mcallister, murdoch;pauly, daniel;pitcher, tony;sumaila, ussif rashid;trites, andrew;vincent, amanda;walters, carl john","totalStudents":6},{"courses_instructor":"harris, mark","totalStudents":1636},{"courses_instructor":"burgess, diane","totalStudents":623},{"courses_instructor":"lester, peter","totalStudents":289},{"courses_instructor":"evans, christine","totalStudents":952},{"courses_instructor":"harris, mark;lester, peter","totalStudents":71},{"courses_instructor":"coulthard, lisa;evans, christine","totalStudents":61},{"courses_instructor":"mcilroy, brian","totalStudents":372},{"courses_instructor":"baker, michael","totalStudents":153},{"courses_instructor":"monteyne, kimberley dawn","totalStudents":68},{"courses_instructor":"coulthard, lisa","totalStudents":495},{"courses_instructor":"hayes, jack","totalStudents":38},{"courses_instructor":"mathijs, ernest","totalStudents":676},{"courses_instructor":"baltruschat, doris","totalStudents":66},{"courses_instructor":"wypkema, laurel","totalStudents":30},{"courses_instructor":"tait, richard coline","totalStudents":14},{"courses_instructor":"weatherby, maria","totalStudents":5497},{"courses_instructor":"oleksy, stacy","totalStudents":126},{"courses_instructor":"johnson, phyllis","totalStudents":781},{"courses_instructor":"martin, todd","totalStudents":952},{"courses_instructor":"wing, deanna","totalStudents":28},{"courses_instructor":"dilley, sherrie","totalStudents":85},{"courses_instructor":"bartolic, silvia","totalStudents":4418},{"courses_instructor":"ponzetti, james joseph","totalStudents":431},{"courses_instructor":"lester-smith, donna","totalStudents":74},{"courses_instructor":"cringan, john","totalStudents":489},{"courses_instructor":"hannah, ted","totalStudents":1202},{"courses_instructor":"wiebe, brandy","totalStudents":996},{"courses_instructor":"fuller, sylvia","totalStudents":69},{"courses_instructor":"campbell, fiona;grant, larry","totalStudents":60},{"courses_instructor":"turin, mark","totalStudents":36},{"courses_instructor":"campbell, jill","totalStudents":6},{"courses_instructor":"elfner, emily","totalStudents":5},{"courses_instructor":"roses labrada, jorge","totalStudents":12},{"courses_instructor":"lew, janey","totalStudents":47},{"courses_instructor":"coulthard, glen","totalStudents":49},{"courses_instructor":"gaertner, david","totalStudents":47},{"courses_instructor":"wildcat, matthew caldwell","totalStudents":22},{"courses_instructor":"hunt, sarah","totalStudents":54},{"courses_instructor":"justice, daniel","totalStudents":9},{"courses_instructor":"li-chan, eunice","totalStudents":122},{"courses_instructor":"madadi noei, azita;zawistowski, jerzy","totalStudents":34},{"courses_instructor":"ross, nancy","totalStudents":49},{"courses_instructor":"wasik, ronald","totalStudents":101},{"courses_instructor":"lu, xiaonan","totalStudents":41},{"courses_instructor":"zawistowski, jerzy","totalStudents":299},{"courses_instructor":"wang, siyun","totalStudents":41},{"courses_instructor":"madadi noei, azita;van vuuren, hendrik","totalStudents":22},{"courses_instructor":"madadi noei, azita","totalStudents":17},{"courses_instructor":"durance, timothy","totalStudents":40},{"courses_instructor":"scaman, christine","totalStudents":81},{"courses_instructor":"kovacevic, jovana","totalStudents":8},{"courses_instructor":"keeney, kristie","totalStudents":11},{"courses_instructor":"facon, michel","totalStudents":48},{"courses_instructor":"allen, kevin","totalStudents":72},{"courses_instructor":"madadi noei, azita;yaghmaee, parastoo","totalStudents":36},{"courses_instructor":"friesen, erin;madadi noei, azita","totalStudents":14},{"courses_instructor":"kitts, david","totalStudents":109},{"courses_instructor":"cliff, margaret anne","totalStudents":56},{"courses_instructor":"cliff, margaret anne;madadi noei, azita","totalStudents":28},{"courses_instructor":"bendickson, dennis","totalStudents":435},{"courses_instructor":"lyons, charles","totalStudents":890},{"courses_instructor":"alila, younes","totalStudents":799},{"courses_instructor":"varhola troya, andres","totalStudents":1420},{"courses_instructor":"nelson, harry william","totalStudents":741},{"courses_instructor":"bodolec, jacques","totalStudents":600},{"courses_instructor":"bodolec, jacques;falangola, chiara","totalStudents":29},{"courses_instructor":"bodolec, jacques;glenn, brittany;o'brien, juliet","totalStudents":29},{"courses_instructor":"bodolec, jacques;hashemi, arezou;o'brien, juliet","totalStudents":53},{"courses_instructor":"bodolec, jacques;edinger, monika;o'brien, juliet","totalStudents":51},{"courses_instructor":"miller, robert","totalStudents":1273},{"courses_instructor":"bodolec, jacques;jean, marie-gerald;o'brien, juliet","totalStudents":106},{"courses_instructor":"bodolec, jacques;o'brien, juliet;shilliday, molleen","totalStudents":66},{"courses_instructor":"o'brien, juliet","totalStudents":944},{"courses_instructor":"huberman, ben","totalStudents":222},{"courses_instructor":"trifu, marcella","totalStudents":49},{"courses_instructor":"bodolec, jacques;o'brien, juliet;uroni, cristina","totalStudents":34},{"courses_instructor":"bodolec, jacques;leplat, farah;o'brien, juliet","totalStudents":77},{"courses_instructor":"bodolec, jacques;o'brien, juliet;ruest, carl","totalStudents":51},{"courses_instructor":"phan, chantal","totalStudents":406},{"courses_instructor":"clain, heloise","totalStudents":69},{"courses_instructor":"bascou vallarino, sylvia","totalStudents":1115},{"courses_instructor":"simpson, anne","totalStudents":1346},{"courses_instructor":"o'brien, juliet;tba","totalStudents":569},{"courses_instructor":"roy, catherine","totalStudents":124},{"courses_instructor":"marpeau, anne-claire","totalStudents":144},{"courses_instructor":"bodolec, jacques;o'brien, juliet;tba","totalStudents":88},{"courses_instructor":"bodolec, jacques;o'brien, juliet;yang, wenyan","totalStudents":55},{"courses_instructor":"bodolec, jacques;fotsing fondjo, luc;o'brien, juliet","totalStudents":25},{"courses_instructor":"fotsing fondjo, luc;o'brien, juliet","totalStudents":22},{"courses_instructor":"duggan, maryse","totalStudents":261},{"courses_instructor":"o'brien, juliet;uroni, cristina","totalStudents":88},{"courses_instructor":"duggan, maryse;pouliot, rebecca","totalStudents":91},{"courses_instructor":"duggan, maryse;onate, susa","totalStudents":62},{"courses_instructor":"duggan, maryse;lushchenko, marina","totalStudents":52},{"courses_instructor":"o'hagan, michael","totalStudents":603},{"courses_instructor":"duggan, maryse;fall, moustapha","totalStudents":26},{"courses_instructor":"duggan, maryse;fotsing fondjo, luc","totalStudents":83},{"courses_instructor":"duggan, maryse;rowswell, kathryn","totalStudents":29},{"courses_instructor":"duggan, maryse;leplat, farah","totalStudents":50},{"courses_instructor":"duggan, maryse;glenn, brittany","totalStudents":30},{"courses_instructor":"duggan, maryse;romengo, margherita","totalStudents":22},{"courses_instructor":"duggan, maryse;linan, kathyrn","totalStudents":56},{"courses_instructor":"duggan, maryse;edinger, monika","totalStudents":32},{"courses_instructor":"bonilla, antonia;duggan, maryse","totalStudents":92},{"courses_instructor":"aylward, travis;duggan, maryse","totalStudents":28},{"courses_instructor":"bodolec, jacques;shilliday, molleen","totalStudents":21},{"courses_instructor":"bodolec, jacques;glenn, brittany","totalStudents":25},{"courses_instructor":"shilliday, molleen","totalStudents":39},{"courses_instructor":"hodgson, richard","totalStudents":344},{"courses_instructor":"palisse, stephanie","totalStudents":282},{"courses_instructor":"lushchenko, marina","totalStudents":51},{"courses_instructor":"caute, adeline","totalStudents":26},{"courses_instructor":"uroni, cristina","totalStudents":88},{"courses_instructor":"o'brien, juliet;yang, wenyan","totalStudents":29},{"courses_instructor":"edinger, monika;o'brien, juliet","totalStudents":31},{"courses_instructor":"o'brien, juliet;onate, susa","totalStudents":23},{"courses_instructor":"falangola, chiara;o'brien, juliet","totalStudents":13},{"courses_instructor":"duggan, maryse;shilliday, molleen","totalStudents":24},{"courses_instructor":"fotsing fondjo, luc;rouget, christine","totalStudents":26},{"courses_instructor":"moniuk. deborah;rouget, christine;simpson, anne","totalStudents":150},{"courses_instructor":"rouget, christine;rowswell, kathryn;simpson, anne","totalStudents":58},{"courses_instructor":"polanica, monica;rouget, christine;simpson, anne","totalStudents":94},{"courses_instructor":"milet, soline","totalStudents":84},{"courses_instructor":"rouget, christine;simpson, anne;uroni, cristina","totalStudents":60},{"courses_instructor":"fotsing fondjo, luc;rouget, christine;simpson, anne","totalStudents":77},{"courses_instructor":"fall, moustapha;rouget, christine;simpson, anne","totalStudents":160},{"courses_instructor":"mann, niall;rouget, christine;simpson, anne","totalStudents":34},{"courses_instructor":"rouget, christine","totalStudents":439},{"courses_instructor":"onate, susa;rouget, christine;simpson, anne","totalStudents":53},{"courses_instructor":"culbert, john","totalStudents":524},{"courses_instructor":"miller, robert;tba","totalStudents":307},{"courses_instructor":"pocard, morgane","totalStudents":116},{"courses_instructor":"o'hagan, michael;simpson, anne","totalStudents":25},{"courses_instructor":"rouget, christine;simpson, anne;tba","totalStudents":198},{"courses_instructor":"jean, marie-gerald;rouget, christine;simpson, anne","totalStudents":30},{"courses_instructor":"castonguay-belanger, joel","totalStudents":239},{"courses_instructor":"hamtaee, leila;rouget, christine;simpson, anne","totalStudents":59},{"courses_instructor":"kraus, amie;rouget, christine;simpson, anne","totalStudents":31},{"courses_instructor":"laroussi, farid","totalStudents":290},{"courses_instructor":"falangola, chiara;rouget, christine;simpson, anne","totalStudents":81},{"courses_instructor":"kraus, amie;o'hagan, michael","totalStudents":62},{"courses_instructor":"hamtaee, leila;o'hagan, michael","totalStudents":54},{"courses_instructor":"falangola, chiara;o'hagan, michael","totalStudents":54},{"courses_instructor":"jean, marie-gerald;o'hagan, michael","totalStudents":55},{"courses_instructor":"fall, moustapha;o'hagan, michael","totalStudents":60},{"courses_instructor":"o'hagan, michael;onate, susa","totalStudents":31},{"courses_instructor":"o'hagan, michael;pouliot, rebecca","totalStudents":26},{"courses_instructor":"leplat, farah;o'hagan, michael","totalStudents":61},{"courses_instructor":"fotsing fondjo, luc","totalStudents":22},{"courses_instructor":"mann, niall;o'hagan, michael","totalStudents":27},{"courses_instructor":"bascou vallarino, sylvia;edinger, monika;rouget, christine","totalStudents":33},{"courses_instructor":"bascou vallarino, sylvia;fall, moustapha;rouget, christine","totalStudents":39},{"courses_instructor":"bascou vallarino, sylvia;polanica, monica;rouget, christine","totalStudents":34},{"courses_instructor":"bascou vallarino, sylvia;fotsing fondjo, luc;rouget, christine","totalStudents":30},{"courses_instructor":"bascou vallarino, sylvia;mann, niall;rouget, christine","totalStudents":34},{"courses_instructor":"bascou vallarino, sylvia;moniuk. deborah;rouget, christine","totalStudents":34},{"courses_instructor":"bascou vallarino, sylvia;onate, susa;rouget, christine","totalStudents":27},{"courses_instructor":"tollard, laure","totalStudents":35},{"courses_instructor":"bonilla, antonia","totalStudents":30},{"courses_instructor":"edinger, monika","totalStudents":18},{"courses_instructor":"fall, moustapha;simpson, anne","totalStudents":38},{"courses_instructor":"berard, stephanie","totalStudents":81},{"courses_instructor":"rouget, christine;shilliday, molleen;simpson, anne","totalStudents":36},{"courses_instructor":"romengo, margherita;rouget, christine;simpson, anne","totalStudents":37},{"courses_instructor":"edinger, monika;o'hagan, michael","totalStudents":31},{"courses_instructor":"o'hagan, michael;shilliday, molleen","totalStudents":30},{"courses_instructor":"scott, anne","totalStudents":1190},{"courses_instructor":"onyeoziri-miller, gloria","totalStudents":351},{"courses_instructor":"godfrey, sima","totalStudents":363},{"courses_instructor":"winder, william","totalStudents":331},{"courses_instructor":"miller, robert;romengo, margherita;scott, anne","totalStudents":20},{"courses_instructor":"kamranian, somayeh","totalStudents":28},{"courses_instructor":"scott, anne;tba","totalStudents":27},{"courses_instructor":"jean, marie-gerald;miller, robert;scott, anne","totalStudents":23},{"courses_instructor":"rocheleau, alain-michel","totalStudents":580},{"courses_instructor":"tran thanh, julia","totalStudents":46},{"courses_instructor":"miller, robert;scott, anne;shilliday, molleen","totalStudents":48},{"courses_instructor":"caute, adeline;miller, robert;scott, anne","totalStudents":27},{"courses_instructor":"leplat, farah;miller, robert;scott, anne","totalStudents":24},{"courses_instructor":"cheinman, ksenia;scott, anne","totalStudents":19},{"courses_instructor":"bascou vallarino, sylvia;miller, robert;scott, anne","totalStudents":23},{"courses_instructor":"cortial, solenne;o'brien, juliet","totalStudents":22},{"courses_instructor":"cortial, solenne","totalStudents":14},{"courses_instructor":"sarkonak, ralph","totalStudents":106},{"courses_instructor":"lamontagne, andre","totalStudents":116},{"courses_instructor":"frelick, nancy","totalStudents":23},{"courses_instructor":"o'hagan, michael;scott, anne","totalStudents":96},{"courses_instructor":"curat, herve;o'hagan, michael;scott, anne","totalStudents":385},{"courses_instructor":"curat, herve;duggan, maryse;rouget, christine;scott, anne","totalStudents":92},{"courses_instructor":"o'hagan, michael;rouget, christine;scott, anne","totalStudents":247},{"courses_instructor":"o'hagan, michael;rouget, christine","totalStudents":55},{"courses_instructor":"rouget, christine;scott, anne","totalStudents":63},{"courses_instructor":"duggan, maryse;rouget, christine;scott, anne","totalStudents":80},{"courses_instructor":"miller, robert;simpson, anne","totalStudents":26},{"courses_instructor":"curat, herve","totalStudents":344},{"courses_instructor":"scott, anne;simpson, anne","totalStudents":22},{"courses_instructor":"larson, bruce","totalStudents":1095},{"courses_instructor":"galvez alcaraz, david","totalStudents":128},{"courses_instructor":"guy, robert","totalStudents":705},{"courses_instructor":"aitken, sally;guy, robert","totalStudents":183},{"courses_instructor":"simard, suzanne;tikina, anna","totalStudents":121},{"courses_instructor":"simard, suzanne","totalStudents":921},{"courses_instructor":"chanway, christopher;simard, suzanne","totalStudents":82},{"courses_instructor":"grayston, susan","totalStudents":148},{"courses_instructor":"wickman, marise","totalStudents":12},{"courses_instructor":"aitken, sally","totalStudents":623},{"courses_instructor":"ellis, simon;wang, tongli","totalStudents":154},{"courses_instructor":"daniels, lori","totalStudents":711},{"courses_instructor":"sajedi, toktam;simard, suzanne","totalStudents":123},{"courses_instructor":"ryan, teresa","totalStudents":167},{"courses_instructor":"kozak, robert antal","totalStudents":984},{"courses_instructor":"watts, susan","totalStudents":565},{"courses_instructor":"tait, david e n","totalStudents":513},{"courses_instructor":"ahmed, suborna shekhor","totalStudents":27},{"courses_instructor":"smith, gregory","totalStudents":362},{"courses_instructor":"eskelson, bianca","totalStudents":120},{"courses_instructor":"lemay, valerie","totalStudents":216},{"courses_instructor":"hajjar, reem","totalStudents":11},{"courses_instructor":"el-kassaby, yousry","totalStudents":602},{"courses_instructor":"worrall, john","totalStudents":126},{"courses_instructor":"bull, gary","totalStudents":221},{"courses_instructor":"larson, bruce;mitchell, stephen jarvis","totalStudents":314},{"courses_instructor":"carroll, allan;hamelin, richard","totalStudents":295},{"courses_instructor":"mclean, john a","totalStudents":32},{"courses_instructor":"descalzo, rolando","totalStudents":15},{"courses_instructor":"cleary, michelle","totalStudents":13},{"courses_instructor":"hamelin, richard","totalStudents":32},{"courses_instructor":"gaston, christopher","totalStudents":73},{"courses_instructor":"blackwell, bruce;mitchell, stephen jarvis","totalStudents":74},{"courses_instructor":"mitchell, stephen jarvis","totalStudents":371},{"courses_instructor":"hinch, scott;richardson, john","totalStudents":613},{"courses_instructor":"richardson, john","totalStudents":783},{"courses_instructor":"gow, elizabeth","totalStudents":146},{"courses_instructor":"drenner, stephen;furey, nathaniel","totalStudents":159},{"courses_instructor":"bull, gary;marshall, peter;nelson, john douglas","totalStudents":63},{"courses_instructor":"bull, gary;nelson, john douglas","totalStudents":91},{"courses_instructor":"bull, gary;griess, verena;marshall, peter","totalStudents":77},{"courses_instructor":"zumrawi, abdel azim","totalStudents":8},{"courses_instructor":"moreno geraldes, armando;ritland, kermit","totalStudents":3},{"courses_instructor":"innes, john","totalStudents":323},{"courses_instructor":"innes, john;tikina, anna;timko, joleen","totalStudents":43},{"courses_instructor":"nelson, john douglas","totalStudents":313},{"courses_instructor":"*ramon, ana elia;sheppard, stephen","totalStudents":8},{"courses_instructor":"aitken, sally;marshall, peter","totalStudents":20},{"courses_instructor":"carroll, allan;marshall, peter","totalStudents":25},{"courses_instructor":"timko, joleen","totalStudents":30},{"courses_instructor":"lemay, valerie;tait, david e n","totalStudents":9},{"courses_instructor":"el-lakany, hosny","totalStudents":11},{"courses_instructor":"konkin, doug","totalStudents":11},{"courses_instructor":"coops, nicholas charles;lemay, valerie;meitner, michael","totalStudents":69},{"courses_instructor":"carroll, allan;de long, deborah;hamelin, richard;larson, bruce;lyons, charles;mitchell, stephen jarvis","totalStudents":15},{"courses_instructor":"bendickson, dennis;carroll, allan;mitchell, stephen jarvis","totalStudents":34},{"courses_instructor":"de long, deborah;nelson, john douglas","totalStudents":28},{"courses_instructor":"de long, deborah;griess, verena;marshall, peter;mitchell, stephen jarvis","totalStudents":35},{"courses_instructor":"kozak, robert antal;panwar, rajat","totalStudents":177},{"courses_instructor":"lam, frank","totalStudents":286},{"courses_instructor":"moore, robert daniel;richardson, john","totalStudents":26},{"courses_instructor":"donner, simon;henry, gregory h","totalStudents":254},{"courses_instructor":"donner, simon;hamdan, khaled","totalStudents":527},{"courses_instructor":"hamdan, khaled;henry, gregory h","totalStudents":525},{"courses_instructor":"daniels, lori;donner, simon","totalStudents":337},{"courses_instructor":"bovis, michael j;powell, sonya","totalStudents":164},{"courses_instructor":"donner, simon;o, pamela","totalStudents":377},{"courses_instructor":"bovis, michael j;daniels, lori","totalStudents":183},{"courses_instructor":"chappells, heather;donner, simon","totalStudents":238},{"courses_instructor":"gaitan, carlos;o, pamela","totalStudents":395},{"courses_instructor":"bovis, michael j;henry, gregory h;tba","totalStudents":147},{"courses_instructor":"hamdan, khaled","totalStudents":184},{"courses_instructor":"gaitan, carlos","totalStudents":33},{"courses_instructor":"eaton, brett","totalStudents":1079},{"courses_instructor":"ferrer boix, carles","totalStudents":576},{"courses_instructor":"cienciala, piotr;tba","totalStudents":236},{"courses_instructor":"bovis, michael j;hassan, marwan","totalStudents":287},{"courses_instructor":"ali, khawaja faran","totalStudents":544},{"courses_instructor":"koppes, michele","totalStudents":850},{"courses_instructor":"bovis, michael j","totalStudents":191},{"courses_instructor":"hassan, marwan","totalStudents":227},{"courses_instructor":"mckendry, ian","totalStudents":606},{"courses_instructor":"mckendry, ian;van der kamp, derek","totalStudents":104},{"courses_instructor":"hamdan, khaled;mckendry, ian","totalStudents":90},{"courses_instructor":"cienciala, piotr","totalStudents":59},{"courses_instructor":"davidson, sarah","totalStudents":48},{"courses_instructor":"williams, jennifer","totalStudents":143},{"courses_instructor":"maertens, thomas","totalStudents":36},{"courses_instructor":"henry, gregory h","totalStudents":554},{"courses_instructor":"bjorkman, anne","totalStudents":37},{"courses_instructor":"aparicio, jose donato","totalStudents":705},{"courses_instructor":"cervantes larios, alejandro","totalStudents":188},{"courses_instructor":"hermansen, sally","totalStudents":330},{"courses_instructor":"walker, samuel","totalStudents":92},{"courses_instructor":"maguire, bradley david","totalStudents":97},{"courses_instructor":"christen, andreas","totalStudents":541},{"courses_instructor":"okabe, ian","totalStudents":33},{"courses_instructor":"moore, robert daniel","totalStudents":301},{"courses_instructor":"jost, georg","totalStudents":58},{"courses_instructor":"leach, jason;trubilowicz, joel william","totalStudents":55},{"courses_instructor":"frei, esther","totalStudents":45},{"courses_instructor":"slaymaker, h olav","totalStudents":28},{"courses_instructor":"eaton, brett;koppes, michele;moore, robert daniel;williams, jennifer","totalStudents":23},{"courses_instructor":"henry, gregory h;koppes, michele;moore, robert daniel","totalStudents":24},{"courses_instructor":"eaton, brett;koppes, michele;mckendry, ian","totalStudents":17},{"courses_instructor":"christen, andreas;eaton, brett;henry, gregory h;koppes, michele","totalStudents":22},{"courses_instructor":"koppes, michele;mckendry, ian;moore, robert daniel;williams, jennifer","totalStudents":21},{"courses_instructor":"eaton, brett;henry, gregory h;mckendry, ian","totalStudents":20},{"courses_instructor":"eaton, brett;henry, gregory h","totalStudents":30},{"courses_instructor":"klinkenberg, brian","totalStudents":500},{"courses_instructor":"green, arthur","totalStudents":54},{"courses_instructor":"mooney, dawn","totalStudents":482},{"courses_instructor":"mcconchie, alan","totalStudents":153},{"courses_instructor":"zandbergen, paul","totalStudents":219},{"courses_instructor":"cassidy, alison elizabeth","totalStudents":16},{"courses_instructor":"amoroso, mariano","totalStudents":16},{"courses_instructor":"henry, gregory h;koppes, michele","totalStudents":14},{"courses_instructor":"hermansen, sally;mooney, dawn","totalStudents":22},{"courses_instructor":"donner, simon;eaton, brett","totalStudents":8},{"courses_instructor":"mckendry, ian;moore, robert daniel","totalStudents":30},{"courses_instructor":"henry, gregory h;mckendry, ian","totalStudents":10},{"courses_instructor":"eaton, brett;mckendry, ian","totalStudents":14},{"courses_instructor":"evenden, matthew dominic","totalStudents":1260},{"courses_instructor":"mcphee, siobhan","totalStudents":397},{"courses_instructor":"mcphee, siobhan;pickren, graham","totalStudents":123},{"courses_instructor":"biehler, dawn;wynn, graeme","totalStudents":68},{"courses_instructor":"evenden, matthew dominic;glassman, james francis","totalStudents":534},{"courses_instructor":"barnes, trevor;ley, david frederick","totalStudents":1584},{"courses_instructor":"brownstein, david","totalStudents":508},{"courses_instructor":"barnes, trevor;lee, elizabeth","totalStudents":273},{"courses_instructor":"edgington, david william;ley, david frederick","totalStudents":273},{"courses_instructor":"brown, loch","totalStudents":1344},{"courses_instructor":"nixon, denver vale","totalStudents":467},{"courses_instructor":"kuus, merje","totalStudents":512},{"courses_instructor":"le billon, philippe","totalStudents":560},{"courses_instructor":"kuus, merje;le billon, philippe","totalStudents":51},{"courses_instructor":"wyly, elvin kirk","totalStudents":1281},{"courses_instructor":"wyly, elvin","totalStudents":229},{"courses_instructor":"frost, heather danielle","totalStudents":162},{"courses_instructor":"pendleton, brian","totalStudents":28},{"courses_instructor":"dyce, matthew","totalStudents":216},{"courses_instructor":"mackie, richard","totalStudents":109},{"courses_instructor":"grove, alan","totalStudents":53},{"courses_instructor":"thistle, john","totalStudents":277},{"courses_instructor":"owens, cameron","totalStudents":122},{"courses_instructor":"sturm, tristan","totalStudents":43},{"courses_instructor":"crowley, rory","totalStudents":97},{"courses_instructor":"bakker, karen jessica;moore, robert daniel","totalStudents":569},{"courses_instructor":"dempsey, jessica","totalStudents":169},{"courses_instructor":"blair, alec;williams, jennifer","totalStudents":212},{"courses_instructor":"kurian, mathew","totalStudents":67},{"courses_instructor":"bakker, karen jessica;ritts, max","totalStudents":178},{"courses_instructor":"moore, robert daniel;shaw, alison","totalStudents":174},{"courses_instructor":"peyton, jonathan wynne","totalStudents":100},{"courses_instructor":"yates, julian","totalStudents":126},{"courses_instructor":"stewart, howard","totalStudents":208},{"courses_instructor":"bakker, karen jessica;williams, jennifer","totalStudents":365},{"courses_instructor":"christen, andreas;hermansen, sally","totalStudents":73},{"courses_instructor":"christen, andreas;quastel, noah","totalStudents":70},{"courses_instructor":"hermansen, sally;mckendry, ian","totalStudents":77},{"courses_instructor":"brown, loch;christen, andreas","totalStudents":73},{"courses_instructor":"donner, simon","totalStudents":510},{"courses_instructor":"bruyneel, shannon","totalStudents":71},{"courses_instructor":"goehring, e. brian","totalStudents":87},{"courses_instructor":"mcclung, david","totalStudents":61},{"courses_instructor":"collard, rosemary-claire;dempsey, jessica","totalStudents":41},{"courses_instructor":"connelly, sean","totalStudents":32},{"courses_instructor":"brown, loch;green, arthur;turner, derek","totalStudents":61},{"courses_instructor":"gregory, derek john","totalStudents":891},{"courses_instructor":"attewell, wesley llewellyn","totalStudents":64},{"courses_instructor":"galois, robert","totalStudents":518},{"courses_instructor":"wynn, graeme","totalStudents":249},{"courses_instructor":"mccreary, tyler","totalStudents":207},{"courses_instructor":"barnes, trevor","totalStudents":742},{"courses_instructor":"lynch, nicholas","totalStudents":395},{"courses_instructor":"ponder, caroline sage","totalStudents":65},{"courses_instructor":"ponder, caroline sage;rosenman, emily","totalStudents":113},{"courses_instructor":"ho, elaine","totalStudents":76},{"courses_instructor":"moos, markus","totalStudents":42},{"courses_instructor":"biehler, dawn","totalStudents":64},{"courses_instructor":"shmuely, andrew","totalStudents":65},{"courses_instructor":"greenberg, charles","totalStudents":539},{"courses_instructor":"feldman, gregory","totalStudents":124},{"courses_instructor":"hiebert, daniel joseph","totalStudents":522},{"courses_instructor":"pratt, geraldine","totalStudents":271},{"courses_instructor":"prouse, valerie carolyn","totalStudents":88},{"courses_instructor":"lee, elizabeth","totalStudents":366},{"courses_instructor":"kissoon, priya","totalStudents":60},{"courses_instructor":"siemiatycki, elliot","totalStudents":184},{"courses_instructor":"temenos, cristina","totalStudents":76},{"courses_instructor":"ye, junjia","totalStudents":30},{"courses_instructor":"zhu, yushu","totalStudents":52},{"courses_instructor":"koopman, sara","totalStudents":46},{"courses_instructor":"richardson, kathrine eileen","totalStudents":95},{"courses_instructor":"peck, jamie","totalStudents":395},{"courses_instructor":"harker, chris","totalStudents":46},{"courses_instructor":"mendez-gonzalez, juan-pablo","totalStudents":75},{"courses_instructor":"cottle, paul","totalStudents":49},{"courses_instructor":"barber, lachlan b r","totalStudents":69},{"courses_instructor":"sundberg, juanita","totalStudents":720},{"courses_instructor":"ochoa, ignacio;whitney, laurel","totalStudents":37},{"courses_instructor":"parker, stuart","totalStudents":53},{"courses_instructor":"bakker, karen jessica","totalStudents":141},{"courses_instructor":"chappells, heather","totalStudents":25},{"courses_instructor":"robinson, john","totalStudents":124},{"courses_instructor":"doucette, jamie l","totalStudents":11},{"courses_instructor":"ley, david frederick","totalStudents":104},{"courses_instructor":"pottie-sherman, yolande","totalStudents":22},{"courses_instructor":"cassidy, alison","totalStudents":46},{"courses_instructor":"christensen, julia","totalStudents":56},{"courses_instructor":"le billon, philippe;peck, jamie","totalStudents":29},{"courses_instructor":"ley, david frederick;peck, jamie","totalStudents":16},{"courses_instructor":"kuus, merje;ley, david frederick","totalStudents":28},{"courses_instructor":"barnes, trevor;glassman, james francis","totalStudents":11},{"courses_instructor":"kuus, merje;peck, jamie","totalStudents":14},{"courses_instructor":"spreter von kreudenstein, chri","totalStudents":300},{"courses_instructor":"pashan, sara","totalStudents":81},{"courses_instructor":"faller, florian","totalStudents":1348},{"courses_instructor":"laszlo, eszter","totalStudents":159},{"courses_instructor":"o'brien, adelheid","totalStudents":1930},{"courses_instructor":"kumar, uma","totalStudents":906},{"courses_instructor":"hempen, daniela","totalStudents":1562},{"courses_instructor":"maslenikau, ihar","totalStudents":1591},{"courses_instructor":"ganzenmueller, petra","totalStudents":728},{"courses_instructor":"struch, gela","totalStudents":1262},{"courses_instructor":"struch, gela;tba","totalStudents":564},{"courses_instructor":"klibadze, dali;struch, gela","totalStudents":79},{"courses_instructor":"schulz, susanne","totalStudents":49},{"courses_instructor":"sanders, travis;struch, gela","totalStudents":43},{"courses_instructor":"redlich, jeremy;struch, gela","totalStudents":57},{"courses_instructor":"jones, lydia;struch, gela","totalStudents":30},{"courses_instructor":"baer, ursula;struch, gela","totalStudents":34},{"courses_instructor":"lamberti, stefanie","totalStudents":21},{"courses_instructor":"oh, ja-hae","totalStudents":94},{"courses_instructor":"schenkel, guido","totalStudents":28},{"courses_instructor":"petro, ingrid","totalStudents":23},{"courses_instructor":"schallie, charlotte","totalStudents":120},{"courses_instructor":"deppermann, birgit","totalStudents":25},{"courses_instructor":"baer, ursula","totalStudents":44},{"courses_instructor":"coordinator;jones, lydia;struch, gela","totalStudents":57},{"courses_instructor":"coordinator;klibadze, dali;struch, gela","totalStudents":50},{"courses_instructor":"coordinator;struch, gela;svanidze, tamara","totalStudents":47},{"courses_instructor":"coordinator;grunburg, michael ;struch, gela","totalStudents":19},{"courses_instructor":"coordinator;sanders, travis;struch, gela","totalStudents":21},{"courses_instructor":"coordinator;revell, stephanie;struch, gela","totalStudents":27},{"courses_instructor":"struch, gela;svanidze, tamara","totalStudents":21},{"courses_instructor":"petro, ingrid;struch, gela","totalStudents":9},{"courses_instructor":"schenkel, guido;struch, gela","totalStudents":21},{"courses_instructor":"hey, isolde","totalStudents":15},{"courses_instructor":"coordinator;redlich, jeremy;struch, gela","totalStudents":18},{"courses_instructor":"roy, catherine;struch, gela","totalStudents":29},{"courses_instructor":"rieger, caroline","totalStudents":254},{"courses_instructor":"redlich, jeremy;schade, silke","totalStudents":48},{"courses_instructor":"deschamps, bernard","totalStudents":53},{"courses_instructor":"pailer, gaby;svanidze, tamara","totalStudents":11},{"courses_instructor":"angeles, leonora","totalStudents":264},{"courses_instructor":"macintosh, lori","totalStudents":321},{"courses_instructor":"zakiuddin, almas","totalStudents":140},{"courses_instructor":"creese, gillian","totalStudents":68},{"courses_instructor":"chaudhry, ayesha","totalStudents":194},{"courses_instructor":"kojima, dai","totalStudents":61},{"courses_instructor":"hsu, raymond","totalStudents":126},{"courses_instructor":"o'brien, michelle","totalStudents":20},{"courses_instructor":"thobani, sunera","totalStudents":195},{"courses_instructor":"latimer, heather","totalStudents":118},{"courses_instructor":"rudrum, sarah","totalStudents":130},{"courses_instructor":"taylor, michael paul","totalStudents":31},{"courses_instructor":"hunt, dallas","totalStudents":32},{"courses_instructor":"cochard, renee","totalStudents":10},{"courses_instructor":"bunjun, benita","totalStudents":67},{"courses_instructor":"haines-saah, rebecca","totalStudents":32},{"courses_instructor":"douglas, delia","totalStudents":78},{"courses_instructor":"ross, becky","totalStudents":124},{"courses_instructor":"chatzivasileiou, evangelia","totalStudents":103},{"courses_instructor":"ferreira da silva, denise","totalStudents":42},{"courses_instructor":"catungal, john paul","totalStudents":98},{"courses_instructor":"snowden, kim","totalStudents":75},{"courses_instructor":"harris, leila","totalStudents":46},{"courses_instructor":"bohlmann, jorg;bryan, jennifer frazier;eltis, lindsay;foster, leonard;hallam, steven;hansen, carl;hieter, philip;kastrup, christian;kobor, michael;marra, marco;mostafavi, sara;nislow, corey;stirling, peter;tokuriki, nobuhiko","totalStudents":11},{"courses_instructor":"bohlmann, jorg;cullis, pieter;eltis, lindsay;hieter, philip;hirst, martin;marra, marco;rieseberg, loren;ryan, katherine","totalStudents":11},{"courses_instructor":"peters, kurtis","totalStudents":61},{"courses_instructor":"bumann, ernest","totalStudents":168},{"courses_instructor":"milstein, sara","totalStudents":109},{"courses_instructor":"bryant, kenneth","totalStudents":56},{"courses_instructor":"hines, naseem","totalStudents":48},{"courses_instructor":"sinha, srija","totalStudents":23},{"courses_instructor":"sindelar, arlene marie","totalStudents":940},{"courses_instructor":"gossen, david","totalStudents":1158},{"courses_instructor":"friedrichs, christopher","totalStudents":1274},{"courses_instructor":"vickers, daniel","totalStudents":698},{"courses_instructor":"roberts, frank","totalStudents":368},{"courses_instructor":"roosa, john","totalStudents":631},{"courses_instructor":"lee, steven hugh","totalStudents":971},{"courses_instructor":"peterson, glen","totalStudents":651},{"courses_instructor":"byrne, jeffrey","totalStudents":669},{"courses_instructor":"dixon, joy;tba","totalStudents":24},{"courses_instructor":"dixon, joy","totalStudents":687},{"courses_instructor":"brook, timothy","totalStudents":461},{"courses_instructor":"brain, robert","totalStudents":360},{"courses_instructor":"dixon, joy;meola, david andrew","totalStudents":40},{"courses_instructor":"dixon, joy;lloyd, naomi","totalStudents":25},{"courses_instructor":"prange, sebastian","totalStudents":268},{"courses_instructor":"nappi, carla","totalStudents":304},{"courses_instructor":"laursen, christopher","totalStudents":26},{"courses_instructor":"glassheim, eagle;loo, tina merrill","totalStudents":142},{"courses_instructor":"raibmon, paige","totalStudents":177},{"courses_instructor":"bronfman, alejandra","totalStudents":192},{"courses_instructor":"thrush, coll","totalStudents":514},{"courses_instructor":"loo, tina merrill","totalStudents":556},{"courses_instructor":"raibmon, paige;thrush, coll","totalStudents":98},{"courses_instructor":"horton, chelsea","totalStudents":76},{"courses_instructor":"davis, brandon cody","totalStudents":221},{"courses_instructor":"glassheim, eagle","totalStudents":424},{"courses_instructor":"cawley, susan;ducharme, michel","totalStudents":91},{"courses_instructor":"edwards, gail","totalStudents":189},{"courses_instructor":"ishiguro, laura","totalStudents":314},{"courses_instructor":"ducharme, michel;quiney, linda","totalStudents":60},{"courses_instructor":"loo, tina merrill;mcdonald, robert aj","totalStudents":182},{"courses_instructor":"ducharme, michel;mcdonald, robert aj","totalStudents":105},{"courses_instructor":"loo, tina merrill;myers, tamara","totalStudents":55},{"courses_instructor":"myers, tamara","totalStudents":309},{"courses_instructor":"morton, david","totalStudents":84},{"courses_instructor":"stewart, ian","totalStudents":77},{"courses_instructor":"kojevnikov, alexei","totalStudents":254},{"courses_instructor":"shapiro, adam","totalStudents":22},{"courses_instructor":"wright, katharine","totalStudents":26},{"courses_instructor":"beatty, john henry","totalStudents":141},{"courses_instructor":"trim, henry","totalStudents":14},{"courses_instructor":"richardson, alan walter","totalStudents":27},{"courses_instructor":"semczyszyn, nola","totalStudents":294},{"courses_instructor":"mayer, tara","totalStudents":226},{"courses_instructor":"mcdonald, robert aj","totalStudents":130},{"courses_instructor":"lovejoy, henry","totalStudents":64},{"courses_instructor":"macarthur, julie","totalStudents":39},{"courses_instructor":"dale, clare","totalStudents":44},{"courses_instructor":"greenberg, devorah","totalStudents":25},{"courses_instructor":"lanthier, michael","totalStudents":415},{"courses_instructor":"whitehead, cameron ean alfred","totalStudents":34},{"courses_instructor":"lloyd, naomi","totalStudents":62},{"courses_instructor":"corbett, kenneth","totalStudents":35},{"courses_instructor":"bil, geoffrey","totalStudents":38},{"courses_instructor":"silver, lara","totalStudents":305},{"courses_instructor":"ducharme, michel","totalStudents":188},{"courses_instructor":"miller, bradley","totalStudents":343},{"courses_instructor":"lennox, jeffers","totalStudents":80},{"courses_instructor":"grittner, colin","totalStudents":43},{"courses_instructor":"newell, dianne c","totalStudents":78},{"courses_instructor":"adcock, christina","totalStudents":36},{"courses_instructor":"borys, david","totalStudents":93},{"courses_instructor":"quiney, linda","totalStudents":119},{"courses_instructor":"waddell, ian","totalStudents":29},{"courses_instructor":"nellis, eric guest","totalStudents":286},{"courses_instructor":"van riemsdijk, tatiana","totalStudents":172},{"courses_instructor":"wang, jessica","totalStudents":449},{"courses_instructor":"timofiiv, vitaliy","totalStudents":790},{"courses_instructor":"paris, leslie","totalStudents":270},{"courses_instructor":"gorsuch, anne","totalStudents":87},{"courses_instructor":"denning, andrew","totalStudents":296},{"courses_instructor":"booker, courtney","totalStudents":178},{"courses_instructor":"pollard, richard matthew","totalStudents":66},{"courses_instructor":"unger, richard","totalStudents":35},{"courses_instructor":"pollard, richard","totalStudents":265},{"courses_instructor":"fudge, john","totalStudents":272},{"courses_instructor":"christopoulos, john","totalStudents":37},{"courses_instructor":"safier, neil","totalStudents":181},{"courses_instructor":"johnson, eric","totalStudents":41},{"courses_instructor":"cairns, kelly lynn","totalStudents":81},{"courses_instructor":"bolz, cedric","totalStudents":134},{"courses_instructor":"green, colin robert","totalStudents":130},{"courses_instructor":"thompson, malcolm","totalStudents":30},{"courses_instructor":"nanay, bence","totalStudents":41},{"courses_instructor":"gorsuch, anne;myers, tamara","totalStudents":70},{"courses_instructor":"sens, allen","totalStudents":1272},{"courses_instructor":"egerton, george w;gossen, david","totalStudents":65},{"courses_instructor":"egerton, george w","totalStudents":115},{"courses_instructor":"evans, heidi","totalStudents":65},{"courses_instructor":"eidelman, jay","totalStudents":278},{"courses_instructor":"meen, sharon","totalStudents":93},{"courses_instructor":"menkis, richard","totalStudents":411},{"courses_instructor":"french, william earl","totalStudents":117},{"courses_instructor":"yu, henry","totalStudents":333},{"courses_instructor":"kato, naoko","totalStudents":40},{"courses_instructor":"madokoro, laura marion","totalStudents":17},{"courses_instructor":"cheek, timothy","totalStudents":15},{"courses_instructor":"chapman, gwenneth","totalStudents":37},{"courses_instructor":"miller, william","totalStudents":3},{"courses_instructor":"reid, darlene","totalStudents":22},{"courses_instructor":"barr, susan irene","totalStudents":17},{"courses_instructor":"green, timothy john","totalStudents":7},{"courses_instructor":"derksen, ruth;qi, hongxing estella","totalStudents":37},{"courses_instructor":"dunford, william;yonemitsu, noboru","totalStudents":196},{"courses_instructor":"maijer, daan;reilly, carl","totalStudents":215},{"courses_instructor":"dance, mark","totalStudents":157},{"courses_instructor":"hall, robert;taghipour, fariborz","totalStudents":27},{"courses_instructor":"dunbar, w scott;taghipour, fariborz","totalStudents":135},{"courses_instructor":"asselin, edouard;isaacson, michael d;kirchen, patrick;mikkelsen, jon;wijewickreme, dharmapriya","totalStudents":18},{"courses_instructor":"howie, john;isaacson, michael d","totalStudents":10},{"courses_instructor":"evans, robert;kellogg, jonathan","totalStudents":27},{"courses_instructor":"evans, robert james","totalStudents":39},{"courses_instructor":"blok, hendrik;doebeli, michael walter","totalStudents":107},{"courses_instructor":"blok, hendrik;doebeli, michael walter;evans, robert james","totalStudents":29},{"courses_instructor":"blok, hendrik;evans, robert james;spiegelman, george b","totalStudents":24},{"courses_instructor":"blok, hendrik;groat, lee","totalStudents":18},{"courses_instructor":"prystajecky, natalie","totalStudents":31},{"courses_instructor":"groat, lee;macfadyen, leah","totalStudents":17},{"courses_instructor":"kellogg, jonathan","totalStudents":38},{"courses_instructor":"evans, robert;macfadyen, leah","totalStudents":33},{"courses_instructor":"blok, hendrik;hauert, christoph","totalStudents":36},{"courses_instructor":"blok, hendrik","totalStudents":14},{"courses_instructor":"barker, megan;blok, hendrik","totalStudents":24},{"courses_instructor":"ahmad, rana;virani, alice","totalStudents":39},{"courses_instructor":"ahmad, rana;ormandy, elisabeth","totalStudents":149},{"courses_instructor":"ahmad, rana","totalStudents":498},{"courses_instructor":"jacova, giorgio","totalStudents":993},{"courses_instructor":"canuto, luisa","totalStudents":732},{"courses_instructor":"zhang, gaoheng","totalStudents":28},{"courses_instructor":"dagnino, arianna","totalStudents":233},{"courses_instructor":"liscio gordon, monica","totalStudents":526},{"courses_instructor":"inglese, mario","totalStudents":182},{"courses_instructor":"schultz, anneliese","totalStudents":895},{"courses_instructor":"boccassini, daniela;falangola, chiara","totalStudents":82},{"courses_instructor":"benimeo, maria","totalStudents":106},{"courses_instructor":"jacova, giorgio;schultz, anneliese","totalStudents":47},{"courses_instructor":"dagnino, arianna;schultz, anneliese","totalStudents":21},{"courses_instructor":"longo, adele","totalStudents":35},{"courses_instructor":"benimeo, maria;lai, alberta","totalStudents":12},{"courses_instructor":"fumi, elena","totalStudents":57},{"courses_instructor":"lai, alberta","totalStudents":8},{"courses_instructor":"boccassini, daniela","totalStudents":360},{"courses_instructor":"testa, carlo","totalStudents":420},{"courses_instructor":"watai, fumiko","totalStudents":867},{"courses_instructor":"nakata, masahiko","totalStudents":1115},{"courses_instructor":"koizumi, keiko","totalStudents":1140},{"courses_instructor":"itoh, ikuko","totalStudents":417},{"courses_instructor":"fan, belen","totalStudents":911},{"courses_instructor":"ode, maki","totalStudents":629},{"courses_instructor":"hayashi, hisako","totalStudents":205},{"courses_instructor":"yonemoto, kazuhiro","totalStudents":310},{"courses_instructor":"el-khoury, masumi abe","totalStudents":289},{"courses_instructor":"kim, ihhwa","totalStudents":985},{"courses_instructor":"suzuki, michiko","totalStudents":566},{"courses_instructor":"tsuda, asami","totalStudents":447},{"courses_instructor":"kazama, misuzu","totalStudents":560},{"courses_instructor":"nishizawa, sumiko","totalStudents":195},{"courses_instructor":"sato, akiko","totalStudents":144},{"courses_instructor":"shiga, hidemi","totalStudents":58},{"courses_instructor":"trudel, kazuko","totalStudents":203},{"courses_instructor":"choi, rebecca fuk hing chau","totalStudents":243},{"courses_instructor":"mostow, joshua scott","totalStudents":141},{"courses_instructor":"kubota, ryuko","totalStudents":119},{"courses_instructor":"yoshida, kaori","totalStudents":45},{"courses_instructor":"clerici, nathen","totalStudents":16},{"courses_instructor":"ohsawa, yuki","totalStudents":15},{"courses_instructor":"burnett, daniel","totalStudents":203},{"courses_instructor":"callison, candis","totalStudents":26},{"courses_instructor":"ward, stephen","totalStudents":20},{"courses_instructor":"callison, candis;lapointe, kirk","totalStudents":177},{"courses_instructor":"fletcher, fred","totalStudents":24},{"courses_instructor":"festinger, jonathan","totalStudents":31},{"courses_instructor":"lee, insun","totalStudents":182},{"courses_instructor":"cho, youngmi","totalStudents":94},{"courses_instructor":"park, so-young","totalStudents":45},{"courses_instructor":"kim, do hee","totalStudents":68},{"courses_instructor":"son, jeong hye","totalStudents":11},{"courses_instructor":"kim, eun-seon","totalStudents":11},{"courses_instructor":"nathan, lisa","totalStudents":129},{"courses_instructor":"england, karin;justice, douglas","totalStudents":31},{"courses_instructor":"cantin, teri","totalStudents":21},{"courses_instructor":"davis, lara irene;roehr, daniel","totalStudents":33},{"courses_instructor":"de greeff, paul","totalStudents":155},{"courses_instructor":"marsh, william","totalStudents":246},{"courses_instructor":"lokman, kees","totalStudents":27},{"courses_instructor":"cox, geoffrey;lokman, kees","totalStudents":22},{"courses_instructor":"lokman, kees;long, shelley","totalStudents":13},{"courses_instructor":"herrington, susan","totalStudents":175},{"courses_instructor":"girling, cynthia;paterson, douglas d","totalStudents":21},{"courses_instructor":"moriarty, stacy teresa;schwann, alyssa","totalStudents":17},{"courses_instructor":"mooney, patrick","totalStudents":205},{"courses_instructor":"mooney, patrick;perry, richard","totalStudents":24},{"courses_instructor":"paterson, douglas d;tba","totalStudents":20},{"courses_instructor":"fox, mikus;lokman, kees","totalStudents":18},{"courses_instructor":"clarke, steven","totalStudents":14},{"courses_instructor":"fox, mikus;man-bourdon, alexandre","totalStudents":18},{"courses_instructor":"tuer, james","totalStudents":17},{"courses_instructor":"kunigk, isabel","totalStudents":37},{"courses_instructor":"mckinnon, kelty miyoshi","totalStudents":10},{"courses_instructor":"cavens, duncan","totalStudents":14},{"courses_instructor":"vaughan, don","totalStudents":26},{"courses_instructor":"umbanhowar, elizabeth","totalStudents":46},{"courses_instructor":"alborg, michele","totalStudents":38},{"courses_instructor":"fry, joseph;shearer, doug","totalStudents":11},{"courses_instructor":"porter, edward","totalStudents":12},{"courses_instructor":"schwann, alyssa","totalStudents":14},{"courses_instructor":"mclintock, gemma","totalStudents":16},{"courses_instructor":"condon, patrick michael;van duzer, leslie","totalStudents":20},{"courses_instructor":"moriarty, stacy teresa","totalStudents":33},{"courses_instructor":"dunster, katherine","totalStudents":14},{"courses_instructor":"flanders, david;sheppard, stephen","totalStudents":14},{"courses_instructor":"good, allison","totalStudents":16},{"courses_instructor":"young, margot","totalStudents":72},{"courses_instructor":"mawani, renisa","totalStudents":96},{"courses_instructor":"beasley-murray, jonathan","totalStudents":123},{"courses_instructor":"cohodas, marvin;french, william earl","totalStudents":100},{"courses_instructor":"cohodas, marvin;sundberg, juanita","totalStudents":47},{"courses_instructor":"cohodas, marvin;mandujano lopez, ruth","totalStudents":31},{"courses_instructor":"fraser, barbara","totalStudents":71},{"courses_instructor":"de grandis, filomena;french, william earl","totalStudents":53},{"courses_instructor":"beauchesne, kim","totalStudents":215},{"courses_instructor":"de grandis, filomena","totalStudents":130},{"courses_instructor":"o'hogan, cillian","totalStudents":28},{"courses_instructor":"wilson, carole","totalStudents":144},{"courses_instructor":"de groot, joanne","totalStudents":106},{"courses_instructor":"powell, gordon","totalStudents":335},{"courses_instructor":"mcpherson, keith","totalStudents":129},{"courses_instructor":"kulyk, tamzen","totalStudents":30},{"courses_instructor":"duran, lorena","totalStudents":29},{"courses_instructor":"henri, james;lee, sandra marjorie","totalStudents":69},{"courses_instructor":"cho, allan","totalStudents":81},{"courses_instructor":"letain, anne","totalStudents":318},{"courses_instructor":"lee, sandra marjorie","totalStudents":77},{"courses_instructor":"smith, lauren a","totalStudents":55},{"courses_instructor":"caldwell, john;lee, sandra marjorie","totalStudents":79},{"courses_instructor":"norrie, cathy","totalStudents":57},{"courses_instructor":"sherlock, tina","totalStudents":28},{"courses_instructor":"mueller, aaron","totalStudents":18},{"courses_instructor":"caldwell, john","totalStudents":16},{"courses_instructor":"hicks, deborah","totalStudents":24},{"courses_instructor":"singh, rajesh","totalStudents":30},{"courses_instructor":"o'brien, heather","totalStudents":247},{"courses_instructor":"freund, luanne","totalStudents":79},{"courses_instructor":"loehrlein, aaron","totalStudents":261},{"courses_instructor":"ehrensperger, florian","totalStudents":47},{"courses_instructor":"kempthorne, maryann","totalStudents":32},{"courses_instructor":"chan, may;kempthorne, maryann","totalStudents":28},{"courses_instructor":"chan, may","totalStudents":17},{"courses_instructor":"kosovac, branka","totalStudents":52},{"courses_instructor":"stephenson, mary","totalStudents":274},{"courses_instructor":"bradley, alexandra","totalStudents":152},{"courses_instructor":"saltman, judith","totalStudents":354},{"courses_instructor":"prendergast, teresa","totalStudents":8},{"courses_instructor":"taylor mcbryde, allison ruth","totalStudents":112},{"courses_instructor":"meyers, eric","totalStudents":309},{"courses_instructor":"sharkey, karen","totalStudents":24},{"courses_instructor":"aldridge, kevin","totalStudents":17},{"courses_instructor":"quigley, thomas","totalStudents":11},{"courses_instructor":"barsky, eugene;taylor, sally","totalStudents":22},{"courses_instructor":"roberts, lynda","totalStudents":25},{"courses_instructor":"petrie, carolyn;sutherland, sarah","totalStudents":22},{"courses_instructor":"giustini, dean","totalStudents":62},{"courses_instructor":"giustini, dean;rowell, greg","totalStudents":12},{"courses_instructor":"bell, colleen","totalStudents":94},{"courses_instructor":"lew, shirley","totalStudents":40},{"courses_instructor":"smith, trevor","totalStudents":7},{"courses_instructor":"copeland, lynn","totalStudents":19},{"courses_instructor":"farrell, adam","totalStudents":10},{"courses_instructor":"copeland, lynn;garnett, joyce","totalStudents":25},{"courses_instructor":"madill, kevin","totalStudents":29},{"courses_instructor":"neame, simon","totalStudents":56},{"courses_instructor":"rasmussen, edith","totalStudents":119},{"courses_instructor":"wiltschko, martina","totalStudents":1170},{"courses_instructor":"davis, henry thomas","totalStudents":947},{"courses_instructor":"kirby, susannah","totalStudents":733},{"courses_instructor":"gick, bryan","totalStudents":668},{"courses_instructor":"dechaine, rose-marie","totalStudents":373},{"courses_instructor":"rullmann, hotze","totalStudents":1231},{"courses_instructor":"fadden, lorna","totalStudents":89},{"courses_instructor":"matthewson, lisa","totalStudents":623},{"courses_instructor":"burton, strang","totalStudents":2655},{"courses_instructor":"armoskaite, solveiga","totalStudents":227},{"courses_instructor":"hansson, gunnar","totalStudents":1018},{"courses_instructor":"pulleyblank, douglas","totalStudents":533},{"courses_instructor":"hudu, fusheini","totalStudents":78},{"courses_instructor":"thompson, james","totalStudents":109},{"courses_instructor":"rochemont, michael","totalStudents":368},{"courses_instructor":"schapansky, nathalie simone","totalStudents":33},{"courses_instructor":"bliss, heather","totalStudents":49},{"courses_instructor":"stemberger, joseph","totalStudents":752},{"courses_instructor":"hudson kam, carla","totalStudents":769},{"courses_instructor":"brown, jason","totalStudents":127},{"courses_instructor":"rosen, eric","totalStudents":40},{"courses_instructor":"vander klok, jozina m","totalStudents":69},{"courses_instructor":"hall, kathleen","totalStudents":229},{"courses_instructor":"caldecott, marion","totalStudents":50},{"courses_instructor":"babel, molly","totalStudents":378},{"courses_instructor":"schellenberg, murray","totalStudents":211},{"courses_instructor":"babel, molly;vatikiotis-bateson, eric","totalStudents":46},{"courses_instructor":"fitzgerald, susan","totalStudents":83},{"courses_instructor":"stephenson, tamina","totalStudents":29},{"courses_instructor":"carden, guy","totalStudents":5},{"courses_instructor":"chauvin-payan, carole","totalStudents":22},{"courses_instructor":"glougie, jennifer","totalStudents":46},{"courses_instructor":"chavez-peon, mario ernesto","totalStudents":43},{"courses_instructor":"koskinen, paivi","totalStudents":19},{"courses_instructor":"barrie, michael","totalStudents":7},{"courses_instructor":"burton, strang;wiltschko, martina","totalStudents":12},{"courses_instructor":"kowkabi, nasrin","totalStudents":215},{"courses_instructor":"ferreira, alfredo","totalStudents":83},{"courses_instructor":"odo, dennis murphy","totalStudents":52},{"courses_instructor":"anderson, tim","totalStudents":54},{"courses_instructor":"kim, won","totalStudents":184},{"courses_instructor":"d'silva, reginald;williams, elisabeth","totalStudents":25},{"courses_instructor":"d'silva, reginald;kim, won","totalStudents":12},{"courses_instructor":"d'silva, reginald;kowkabi, nasrin","totalStudents":12},{"courses_instructor":"d'silva, reginald;heng hartse, joel thurlow","totalStudents":14},{"courses_instructor":"walsh marr, jennifer","totalStudents":45},{"courses_instructor":"gradin, christopher","totalStudents":124},{"courses_instructor":"shaw, amber","totalStudents":57},{"courses_instructor":"leveridge, aubrey","totalStudents":125},{"courses_instructor":"zappa, sandra","totalStudents":304},{"courses_instructor":"deschambault, ryan","totalStudents":460},{"courses_instructor":"heng hartse, joel thurlow","totalStudents":123},{"courses_instructor":"sohn, bong gi","totalStudents":82},{"courses_instructor":"moon, angela","totalStudents":24},{"courses_instructor":"hwag, junghyun","totalStudents":24},{"courses_instructor":"pringle, john","totalStudents":3},{"courses_instructor":"lee, caleb","totalStudents":32},{"courses_instructor":"murphy, mike","totalStudents":86},{"courses_instructor":"mahmood, fatimah","totalStudents":26},{"courses_instructor":"hellwig, cornelie emma soelie","totalStudents":35},{"courses_instructor":"kim, mi-young","totalStudents":21},{"courses_instructor":"mizuta, ai","totalStudents":23},{"courses_instructor":"meredith, kimberly","totalStudents":51},{"courses_instructor":"trottier, michael","totalStudents":12},{"courses_instructor":"riccardi, daniel","totalStudents":38},{"courses_instructor":"todd, brett","totalStudents":24},{"courses_instructor":"lei, hong","totalStudents":21},{"courses_instructor":"mcmichael, william","totalStudents":214},{"courses_instructor":"balyasnikova, natalia","totalStudents":56},{"courses_instructor":"d'silva, reginald;zappa, sandra","totalStudents":60},{"courses_instructor":"surtees, victoria","totalStudents":19},{"courses_instructor":"potts, diane","totalStudents":225},{"courses_instructor":"haseyama, koichi","totalStudents":20},{"courses_instructor":"heng hartse, joel thurlow;shi, ling","totalStudents":29},{"courses_instructor":"wong, melanie","totalStudents":52},{"courses_instructor":"armstrong, karen","totalStudents":563},{"courses_instructor":"shoemaker, kathryn","totalStudents":343},{"courses_instructor":"wilson, jennifer","totalStudents":167},{"courses_instructor":"filipenko, margot;shoemaker, kathryn","totalStudents":23},{"courses_instructor":"moffatt, lyndsay","totalStudents":26},{"courses_instructor":"delvecchio, jennifer","totalStudents":119},{"courses_instructor":"mctavish, marianne","totalStudents":31},{"courses_instructor":"haggerty, john","totalStudents":37},{"courses_instructor":"lindquist, teri mae","totalStudents":70},{"courses_instructor":"greig, linda elizabeth","totalStudents":52},{"courses_instructor":"paul, karin","totalStudents":106},{"courses_instructor":"clark, hazel;paul, karin","totalStudents":49},{"courses_instructor":"ekdahl, moira","totalStudents":71},{"courses_instructor":"helmer, sylvia","totalStudents":235},{"courses_instructor":"cervatiuc, andreea","totalStudents":18},{"courses_instructor":"bournot-trites, monique","totalStudents":155},{"courses_instructor":"anderson, jim","totalStudents":99},{"courses_instructor":"purcell-gates, victoria","totalStudents":28},{"courses_instructor":"rogers, theresa","totalStudents":22},{"courses_instructor":"li, guofang","totalStudents":10},{"courses_instructor":"duff, patricia","totalStudents":53},{"courses_instructor":"bauerschmidt, roland","totalStudents":75},{"courses_instructor":"macdonald, mark","totalStudents":191},{"courses_instructor":"ghioca, dragos","totalStudents":2154},{"courses_instructor":"bennett, michael","totalStudents":510},{"courses_instructor":"fazly, mostafa","totalStudents":153},{"courses_instructor":"liu, keqin","totalStudents":4146},{"courses_instructor":"holtzman-gazit, michal","totalStudents":85},{"courses_instructor":"pollack, paul","totalStudents":175},{"courses_instructor":"de zeeuw, frank","totalStudents":121},{"courses_instructor":"morin, matthew","totalStudents":70},{"courses_instructor":"nagata, k wayne","totalStudents":1229},{"courses_instructor":"gustafson, stephen james","totalStudents":983},{"courses_instructor":"yilmaz, ozgur","totalStudents":989},{"courses_instructor":"bennoun, steve","totalStudents":174},{"courses_instructor":"chipeniuk, karsten","totalStudents":154},{"courses_instructor":"magyar, akos","totalStudents":1422},{"courses_instructor":"masson, robert","totalStudents":140},{"courses_instructor":"steinberger, john","totalStudents":84},{"courses_instructor":"he, weiyong","totalStudents":140},{"courses_instructor":"laba, izabella","totalStudents":792},{"courses_instructor":"holroyd, alexander","totalStudents":88},{"courses_instructor":"cadman, charles","totalStudents":151},{"courses_instructor":"aguade, jaume","totalStudents":81},{"courses_instructor":"rosales, leo","totalStudents":127},{"courses_instructor":"smith, jefferey","totalStudents":309},{"courses_instructor":"gupta, rajiv","totalStudents":1867},{"courses_instructor":"silberman, lior","totalStudents":1074},{"courses_instructor":"wiedemann, emil","totalStudents":152},{"courses_instructor":"valesin, daniel","totalStudents":326},{"courses_instructor":"oyarzua, ricardo","totalStudents":91},{"courses_instructor":"yeager, elyse","totalStudents":790},{"courses_instructor":"kim, young-heon","totalStudents":646},{"courses_instructor":"rechnitzer, andrew","totalStudents":2246},{"courses_instructor":"taati, siamak","totalStudents":101},{"courses_instructor":"walls, patrick","totalStudents":903},{"courses_instructor":"leung, fok-shuen","totalStudents":933},{"courses_instructor":"liu, keqin;maclean, mark thomson;tba","totalStudents":125},{"courses_instructor":"cheng, man chuen","totalStudents":327},{"courses_instructor":"sadel, christian","totalStudents":244},{"courses_instructor":"doerksen, kevin","totalStudents":225},{"courses_instructor":"angel, omer","totalStudents":551},{"courses_instructor":"huan, tingting","totalStudents":82},{"courses_instructor":"lages wardil, lucas","totalStudents":144},{"courses_instructor":"wang, rongrong","totalStudents":98},{"courses_instructor":"blois, cindy","totalStudents":213},{"courses_instructor":"gomez, jose","totalStudents":308},{"courses_instructor":"luoto, kurt","totalStudents":268},{"courses_instructor":"moyles, iain","totalStudents":329},{"courses_instructor":"klaus, michele","totalStudents":97},{"courses_instructor":"courtiel, julien","totalStudents":100},{"courses_instructor":"koppensteiner, clemens","totalStudents":101},{"courses_instructor":"wang, qiming","totalStudents":121},{"courses_instructor":"gordon, julia yulia","totalStudents":696},{"courses_instructor":"sheshmani, artan","totalStudents":109},{"courses_instructor":"ghadermarzi, amir","totalStudents":137},{"courses_instructor":"meyerovitch, tom","totalStudents":200},{"courses_instructor":"bruni, carmen","totalStudents":136},{"courses_instructor":"khosravi, mahta","totalStudents":642},{"courses_instructor":"chan, vincent","totalStudents":142},{"courses_instructor":"moradifam, amir","totalStudents":74},{"courses_instructor":"brosnan, patrick","totalStudents":376},{"courses_instructor":"griesmer, john","totalStudents":77},{"courses_instructor":"christou, cameron","totalStudents":98},{"courses_instructor":"lamm, tobias","totalStudents":70},{"courses_instructor":"lindstrom, michael","totalStudents":315},{"courses_instructor":"hua, zheng","totalStudents":198},{"courses_instructor":"cook, brian","totalStudents":121},{"courses_instructor":"duman, ali","totalStudents":43},{"courses_instructor":"rolfsen, dale","totalStudents":450},{"courses_instructor":"rose, michael","totalStudents":149},{"courses_instructor":"burghelea, teodor","totalStudents":169},{"courses_instructor":"cai, shuang","totalStudents":121},{"courses_instructor":"akhtari, shabnam","totalStudents":59},{"courses_instructor":"macasieb, melissa","totalStudents":172},{"courses_instructor":"code, warren","totalStudents":374},{"courses_instructor":"indurskis, gabriel","totalStudents":146},{"courses_instructor":"usefi, hamid","totalStudents":114},{"courses_instructor":"martin, gregory","totalStudents":852},{"courses_instructor":"rath, balazs","totalStudents":133},{"courses_instructor":"maclean, mark thomson","totalStudents":1474},{"courses_instructor":"gonzalez, jose;maclean, mark thomson","totalStudents":217},{"courses_instructor":"hulshof, willem;maclean, mark thomson","totalStudents":173},{"courses_instructor":"desaulniers, shawn;maclean, mark thomson","totalStudents":151},{"courses_instructor":"maclean, mark thomson;wiedemann, emil","totalStudents":91},{"courses_instructor":"ganapathy, radhika;maclean, mark thomson","totalStudents":175},{"courses_instructor":"maclean, mark thomson;tba","totalStudents":351},{"courses_instructor":"feldman, joel;maclean, mark thomson","totalStudents":128},{"courses_instructor":"barry, anna","totalStudents":216},{"courses_instructor":"ye, hexi","totalStudents":235},{"courses_instructor":"devyver, baptiste","totalStudents":201},{"courses_instructor":"carchedi, david","totalStudents":74},{"courses_instructor":"desaulniers, shawn","totalStudents":828},{"courses_instructor":"nguyen, dang khoa","totalStudents":585},{"courses_instructor":"momeni, abbas","totalStudents":94},{"courses_instructor":"kitagawa, jun","totalStudents":342},{"courses_instructor":"pfeiffer, hendryk","totalStudents":493},{"courses_instructor":"macdonald, john","totalStudents":585},{"courses_instructor":"mantilla-soler, guillermo","totalStudents":265},{"courses_instructor":"karli, deniz","totalStudents":221},{"courses_instructor":"schwartz, ryan","totalStudents":63},{"courses_instructor":"hamieh, alia","totalStudents":113},{"courses_instructor":"hambrook, kyle","totalStudents":127},{"courses_instructor":"khatirinejad, mahdad","totalStudents":72},{"courses_instructor":"feldman, joel","totalStudents":528},{"courses_instructor":"fleming, balin","totalStudents":195},{"courses_instructor":"frigaard, ian","totalStudents":1167},{"courses_instructor":"cernele, shane","totalStudents":224},{"courses_instructor":"hiller, rebecca","totalStudents":73},{"courses_instructor":"hauert, christoph","totalStudents":780},{"courses_instructor":"chen, yu ting","totalStudents":67},{"courses_instructor":"coombs, daniel","totalStudents":1064},{"courses_instructor":"allard, jun","totalStudents":78},{"courses_instructor":"israel, robert b","totalStudents":1257},{"courses_instructor":"duncan, alexander","totalStudents":135},{"courses_instructor":"dubash, neville","totalStudents":85},{"courses_instructor":"pavlov, ronnie","totalStudents":496},{"courses_instructor":"horja, paul","totalStudents":80},{"courses_instructor":"cytrynbaum, eric","totalStudents":1175},{"courses_instructor":"helmuth, tyler","totalStudents":130},{"courses_instructor":"ghigliotti, giovanni","totalStudents":78},{"courses_instructor":"davila bonczos, gonzalo","totalStudents":271},{"courses_instructor":"stephan, marc","totalStudents":65},{"courses_instructor":"roustaei, ali","totalStudents":91},{"courses_instructor":"gyenge, adam","totalStudents":66},{"courses_instructor":"bade, nathaniel","totalStudents":309},{"courses_instructor":"cytrynbaum, eric;maclean, mark thomson;tba","totalStudents":46},{"courses_instructor":"nguyen, dong quan","totalStudents":278},{"courses_instructor":"maciejewski, wes","totalStudents":260},{"courses_instructor":"stykow, maxim","totalStudents":165},{"courses_instructor":"keshet, leah","totalStudents":541},{"courses_instructor":"tania, nessy","totalStudents":190},{"courses_instructor":"willoughby, mark","totalStudents":147},{"courses_instructor":"steinberg, david","totalStudents":389},{"courses_instructor":"rozada, ignacio","totalStudents":259},{"courses_instructor":"ao, weiwei","totalStudents":293},{"courses_instructor":"antolin camarena, omar","totalStudents":118},{"courses_instructor":"garaschuk, kseniya","totalStudents":255},{"courses_instructor":"li, lu","totalStudents":143},{"courses_instructor":"konrad, bernhard","totalStudents":77},{"courses_instructor":"li, dong","totalStudents":757},{"courses_instructor":"degiuli, eric","totalStudents":73},{"courses_instructor":"holmes, william","totalStudents":194},{"courses_instructor":"das, raibatak","totalStudents":171},{"courses_instructor":"hill, nicholas","totalStudents":94},{"courses_instructor":"luo, xiayo","totalStudents":92},{"courses_instructor":"borowski, peter","totalStudents":100},{"courses_instructor":"mori, yoichiro","totalStudents":99},{"courses_instructor":"hauert, christoph;tba","totalStudents":251},{"courses_instructor":"hauert, christoph;kim, young-heon","totalStudents":122},{"courses_instructor":"bruni, carmen;hauert, christoph","totalStudents":80},{"courses_instructor":"hauert, christoph;namazi, hossein","totalStudents":59},{"courses_instructor":"doebeli, michael walter","totalStudents":273},{"courses_instructor":"sibilla, nicolo","totalStudents":264},{"courses_instructor":"pinsky, tali","totalStudents":263},{"courses_instructor":"perkins, edwin","totalStudents":696},{"courses_instructor":"first, uriya","totalStudents":217},{"courses_instructor":"chau, albert","totalStudents":1754},{"courses_instructor":"thompson, william","totalStudents":135},{"courses_instructor":"bryan, jim","totalStudents":1266},{"courses_instructor":"koo, eva","totalStudents":70},{"courses_instructor":"kanazawa, atsushi","totalStudents":70},{"courses_instructor":"rose, simon","totalStudents":153},{"courses_instructor":"sitar, scott","totalStudents":69},{"courses_instructor":"dahmen, sander","totalStudents":110},{"courses_instructor":"heumann, jay","totalStudents":177},{"courses_instructor":"*mejia miranda, yuri","totalStudents":50},{"courses_instructor":"chan, ian","totalStudents":44},{"courses_instructor":"yue, pengtao","totalStudents":90},{"courses_instructor":"lamb, charles w","totalStudents":270},{"courses_instructor":"gill, hardeep","totalStudents":105},{"courses_instructor":"burda, yuri","totalStudents":302},{"courses_instructor":"ramdorai, sujatha","totalStudents":557},{"courses_instructor":"cladek, laura","totalStudents":70},{"courses_instructor":"huxol, tobias","totalStudents":96},{"courses_instructor":"pirisi, roberto","totalStudents":88},{"courses_instructor":"levy, alon","totalStudents":145},{"courses_instructor":"lee, chia ying","totalStudents":246},{"courses_instructor":"kool, martijn","totalStudents":71},{"courses_instructor":"brakocevic, miljan","totalStudents":267},{"courses_instructor":"klinzmann, robert","totalStudents":116},{"courses_instructor":"maurin, guillaume","totalStudents":146},{"courses_instructor":"garcia ramos aguilar, felipe","totalStudents":59},{"courses_instructor":"kroc, edward","totalStudents":148},{"courses_instructor":"wade, richard","totalStudents":170},{"courses_instructor":"nguyen, athena","totalStudents":199},{"courses_instructor":"pramanik, malabika","totalStudents":1021},{"courses_instructor":"kim, djun m","totalStudents":182},{"courses_instructor":"moulding, erin","totalStudents":72},{"courses_instructor":"wong, erick","totalStudents":62},{"courses_instructor":"harland, nicholas","totalStudents":218},{"courses_instructor":"ottaway, paul","totalStudents":218},{"courses_instructor":"carrasco-teja, mariana","totalStudents":71},{"courses_instructor":"staal, andrew","totalStudents":71},{"courses_instructor":"khomenko, maria","totalStudents":118},{"courses_instructor":"carazzo, guillaume","totalStudents":91},{"courses_instructor":"huang, hui","totalStudents":72},{"courses_instructor":"combariza, german","totalStudents":111},{"courses_instructor":"clarkson, james","totalStudents":139},{"courses_instructor":"raggi, miguel","totalStudents":88},{"courses_instructor":"phan, tuoc van","totalStudents":286},{"courses_instructor":"vakil, ali","totalStudents":175},{"courses_instructor":"lefebvre, jerome","totalStudents":119},{"courses_instructor":"doerksen, kevin;liu, keqin","totalStudents":287},{"courses_instructor":"feldman, joel;liu, keqin","totalStudents":107},{"courses_instructor":"liu, keqin;rath, balazs","totalStudents":69},{"courses_instructor":"liu, keqin;peskin, laura","totalStudents":70},{"courses_instructor":"levy, alon;liu, keqin","totalStudents":91},{"courses_instructor":"liu, keqin;tba","totalStudents":136},{"courses_instructor":"garcia ramos aguilar, felipe;liu, keqin","totalStudents":62},{"courses_instructor":"zhao, mingfeng","totalStudents":294},{"courses_instructor":"talpo, mattia","totalStudents":53},{"courses_instructor":"athreya, siva","totalStudents":91},{"courses_instructor":"blunk, mark","totalStudents":257},{"courses_instructor":"guigue, alexis","totalStudents":198},{"courses_instructor":"zangeneh, hamid","totalStudents":93},{"courses_instructor":"zhai, kelan","totalStudents":71},{"courses_instructor":"anstee, richard","totalStudents":821},{"courses_instructor":"wei, xiaoxi tereza","totalStudents":95},{"courses_instructor":"wong, tom","totalStudents":101},{"courses_instructor":"lo, quin wai joseph","totalStudents":425},{"courses_instructor":"leung, fok-shuen;wong, tom","totalStudents":65},{"courses_instructor":"leung, fok-shuen;sargent, pamela;wong, tom","totalStudents":80},{"courses_instructor":"leung, fok-shuen;sargent, pamela;tba","totalStudents":135},{"courses_instructor":"desaulniers, shawn;leung, fok-shuen;sargent, pamela","totalStudents":74},{"courses_instructor":"piccolo, costanza","totalStudents":391},{"courses_instructor":"kohler, david","totalStudents":129},{"courses_instructor":"karimfazli, ida","totalStudents":77},{"courses_instructor":"bluman, george w","totalStudents":463},{"courses_instructor":"zahl, joshua","totalStudents":27},{"courses_instructor":"marcus, brian harry","totalStudents":882},{"courses_instructor":"gonzalez, jose","totalStudents":244},{"courses_instructor":"li, martin","totalStudents":190},{"courses_instructor":"vatsal, vinayak","totalStudents":1109},{"courses_instructor":"wetton, brian thomas","totalStudents":1565},{"courses_instructor":"dridi, raouf","totalStudents":280},{"courses_instructor":"goldlist, amy","totalStudents":61},{"courses_instructor":"grguric, i.","totalStudents":61},{"courses_instructor":"solymosi, jozsef","totalStudents":474},{"courses_instructor":"cheng, man chuen;wetton, brian thomas","totalStudents":207},{"courses_instructor":"alba, kamran;wetton, brian thomas","totalStudents":75},{"courses_instructor":"huruguen, mathieu;wetton, brian thomas","totalStudents":77},{"courses_instructor":"dontsov, egor","totalStudents":234},{"courses_instructor":"gordeliy, lisa","totalStudents":104},{"courses_instructor":"karu, kalle","totalStudents":965},{"courses_instructor":"combet, vianney","totalStudents":87},{"courses_instructor":"reichstein, zinovy","totalStudents":414},{"courses_instructor":"abbaspour, hesam","totalStudents":93},{"courses_instructor":"meyer, aurel","totalStudents":44},{"courses_instructor":"woodford, roger","totalStudents":36},{"courses_instructor":"lukeman, ryan","totalStudents":53},{"courses_instructor":"goodman, jesse","totalStudents":38},{"courses_instructor":"lam, nguyen hoang","totalStudents":70},{"courses_instructor":"prat, alain","totalStudents":78},{"courses_instructor":"le coz, stefan","totalStudents":66},{"courses_instructor":"andres, sebastian","totalStudents":162},{"courses_instructor":"halasan, florina","totalStudents":63},{"courses_instructor":"cheek, caleb","totalStudents":46},{"courses_instructor":"culibrk, ana","totalStudents":40},{"courses_instructor":"torres-giese, enrique","totalStudents":43},{"courses_instructor":"leblanc, michael","totalStudents":46},{"courses_instructor":"dushek, omer","totalStudents":35},{"courses_instructor":"lindsay, alan","totalStudents":48},{"courses_instructor":"chhita, sunil","totalStudents":39},{"courses_instructor":"*hai, sa","totalStudents":42},{"courses_instructor":"white, shaun","totalStudents":123},{"courses_instructor":"folz, matthew","totalStudents":117},{"courses_instructor":"troupe, lee","totalStudents":98},{"courses_instructor":"davila bonczos, gonzalo;maclean, mark thomson","totalStudents":82},{"courses_instructor":"maclean, mark thomson;paton, kelly","totalStudents":69},{"courses_instructor":"anstee, richard;maclean, mark thomson","totalStudents":92},{"courses_instructor":"williams, thomas","totalStudents":436},{"courses_instructor":"ruping, henrik","totalStudents":173},{"courses_instructor":"bradshaw, zachary","totalStudents":286},{"courses_instructor":"carnovale, marc","totalStudents":98},{"courses_instructor":"paton, kelly","totalStudents":67},{"courses_instructor":"sollazzo, rhoda","totalStudents":63},{"courses_instructor":"tsai, tai-peng","totalStudents":943},{"courses_instructor":"peterson, dale","totalStudents":3333},{"courses_instructor":"jia, johnson","totalStudents":211},{"courses_instructor":"bond, matthew","totalStudents":182},{"courses_instructor":"fraser, ailana","totalStudents":999},{"courses_instructor":"seymour, brian","totalStudents":620},{"courses_instructor":"samuels, charles","totalStudents":122},{"courses_instructor":"abou salem, walid k","totalStudents":88},{"courses_instructor":"wise, jonathan","totalStudents":173},{"courses_instructor":"pirvu, traian","totalStudents":57},{"courses_instructor":"kirsch, stephane","totalStudents":60},{"courses_instructor":"treisman, zack","totalStudents":77},{"courses_instructor":"levit, anna","totalStudents":267},{"courses_instructor":"gurel-gurevich, ori","totalStudents":323},{"courses_instructor":"shen, liangming","totalStudents":108},{"courses_instructor":"adams, stefan","totalStudents":174},{"courses_instructor":"ollivier, rachel","totalStudents":209},{"courses_instructor":"roe, david","totalStudents":198},{"courses_instructor":"richmond, edward","totalStudents":294},{"courses_instructor":"krause, benjamin","totalStudents":219},{"courses_instructor":"kolokolnikov, theodore","totalStudents":227},{"courses_instructor":"vanderlei, benjamin","totalStudents":107},{"courses_instructor":"schotzau, dominik","totalStudents":540},{"courses_instructor":"ward, michael jeffrey","totalStudents":634},{"courses_instructor":"dixit, harish","totalStudents":152},{"courses_instructor":"seon, thomas","totalStudents":89},{"courses_instructor":"smith, matthew","totalStudents":65},{"courses_instructor":"cowan, craig","totalStudents":54},{"courses_instructor":"wan, andy","totalStudents":49},{"courses_instructor":"chen, jingyi","totalStudents":586},{"courses_instructor":"rahmani, mona","totalStudents":181},{"courses_instructor":"froese, richard gerd","totalStudents":1134},{"courses_instructor":"daskalakis, emmanouil","totalStudents":95},{"courses_instructor":"robert, frederic","totalStudents":68},{"courses_instructor":"gustafson, stephen james;tba","totalStudents":25},{"courses_instructor":"henriot, kevin","totalStudents":91},{"courses_instructor":"shih, chih wen","totalStudents":87},{"courses_instructor":"nec, yana","totalStudents":122},{"courses_instructor":"komjathy, julia","totalStudents":94},{"courses_instructor":"colliander, james","totalStudents":101},{"courses_instructor":"barlow, martin","totalStudents":131},{"courses_instructor":"merchant, sandra","totalStudents":25},{"courses_instructor":"nachmias, asaf","totalStudents":240},{"courses_instructor":"pettet, alexandra","totalStudents":527},{"courses_instructor":"yurasovskaya, ekaterina","totalStudents":42},{"courses_instructor":"loewen, philip","totalStudents":1718},{"courses_instructor":"souto clement, juan","totalStudents":107},{"courses_instructor":"behrend, kai","totalStudents":508},{"courses_instructor":"guan, meijiao","totalStudents":107},{"courses_instructor":"huruguen, mathieu;vatsal, vinayak","totalStudents":92},{"courses_instructor":"reichstein, zinovy;vatsal, vinayak","totalStudents":127},{"courses_instructor":"peterson, dale;vatsal, vinayak","totalStudents":120},{"courses_instructor":"huruguen, mathieu","totalStudents":108},{"courses_instructor":"cautis, sabin","totalStudents":228},{"courses_instructor":"yazdani, soroosh","totalStudents":89},{"courses_instructor":"tzou, justin","totalStudents":188},{"courses_instructor":"liu, yong","totalStudents":123},{"courses_instructor":"graham, ben","totalStudents":79},{"courses_instructor":"hewitt, ian","totalStudents":295},{"courses_instructor":"macdonald, colin","totalStudents":417},{"courses_instructor":"murugan, mathav","totalStudents":320},{"courses_instructor":"balka, richard","totalStudents":358},{"courses_instructor":"slade, gordon","totalStudents":1072},{"courses_instructor":"flowers, jeremy","totalStudents":50},{"courses_instructor":"brydges, david","totalStudents":544},{"courses_instructor":"conway, jessica","totalStudents":150},{"courses_instructor":"homsy, bud","totalStudents":468},{"courses_instructor":"ren, xiaofeng","totalStudents":139},{"courses_instructor":"hewitt, duncan","totalStudents":129},{"courses_instructor":"wei, juncheng","totalStudents":368},{"courses_instructor":"au-yeung, enrico","totalStudents":209},{"courses_instructor":"peirce, anthony","totalStudents":1117},{"courses_instructor":"simpson, david","totalStudents":105},{"courses_instructor":"mellet, antoine","totalStudents":74},{"courses_instructor":"cheviakov, alexei","totalStudents":55},{"courses_instructor":"dorodnitsyn, vladimir","totalStudents":70},{"courses_instructor":"loewen, philip;paton, kelly","totalStudents":94},{"courses_instructor":"zwiers, ian","totalStudents":136},{"courses_instructor":"wielage-burchard, kerstin","totalStudents":83},{"courses_instructor":"mansour, hassan","totalStudents":163},{"courses_instructor":"hulshof, willem","totalStudents":158},{"courses_instructor":"marchetti, domingos","totalStudents":47},{"courses_instructor":"kozdron, michael","totalStudents":81},{"courses_instructor":"fusy, eric","totalStudents":123},{"courses_instructor":"falco, pierluigi","totalStudents":71},{"courses_instructor":"timar, adam","totalStudents":56},{"courses_instructor":"kamgarpour, masoud","totalStudents":180},{"courses_instructor":"donaldson, roger","totalStudents":90},{"courses_instructor":"plan, yaniv","totalStudents":155},{"courses_instructor":"barroso de freitas, nuno","totalStudents":60},{"courses_instructor":"peskin, laura","totalStudents":50},{"courses_instructor":"khadra, anmar","totalStudents":35},{"courses_instructor":"au-yeung, enrico;laba, izabella","totalStudents":77},{"courses_instructor":"stange, kate","totalStudents":78},{"courses_instructor":"ganapathy, radhika","totalStudents":53},{"courses_instructor":"el smaily, mohammad","totalStudents":36},{"courses_instructor":"merle, mathieu","totalStudents":14},{"courses_instructor":"van willigenburg, stephanie","totalStudents":530},{"courses_instructor":"jalan, rahael","totalStudents":7},{"courses_instructor":"adler, andrew n","totalStudents":91},{"courses_instructor":"maciejewski, wes;yilmaz, ozgur","totalStudents":37},{"courses_instructor":"collins, daniel","totalStudents":5},{"courses_instructor":"adem, alejandro","totalStudents":20},{"courses_instructor":"lamoureux, michael","totalStudents":12},{"courses_instructor":"partridge, stephen;phan, chantal","totalStudents":28},{"courses_instructor":"fengler, markus;johansson, per henrik;ollivier-gooch, carl;schajer, gary","totalStudents":117},{"courses_instructor":"davy, martin;fengler, markus;okwudire, chinedum;ostafichuk, peter;purdon, alistair;schajer, gary","totalStudents":124},{"courses_instructor":"fengler, markus;green, sheldon;ollivier-gooch, carl;schajer, gary;tba","totalStudents":122},{"courses_instructor":"fengler, markus;ollivier-gooch, carl;schajer, gary","totalStudents":118},{"courses_instructor":"davy, martin;fengler, markus;ostafichuk, peter;schajer, gary","totalStudents":113},{"courses_instructor":"*khorasany, ramin;fengler, markus;ostafichuk, peter;schajer, gary","totalStudents":124},{"courses_instructor":"fengler, markus;green, sheldon;johansson, per henrik;mikkelsen, jon;ollivier-gooch, carl;schajer, gary","totalStudents":124},{"courses_instructor":"*khorasany, ramin;fengler, markus;ostafichuk, peter;schajer, gary;tba","totalStudents":132},{"courses_instructor":"cripton, peter;ollivier-gooch, carl;schajer, gary","totalStudents":246},{"courses_instructor":"asselin, edouard;croft, elizabeth;fatourechi, mehrdad;okwudire, chinedum;ostafichuk, peter;schajer, gary","totalStudents":118},{"courses_instructor":"cripton, peter;ollivier-gooch, carl;schajer, gary;tba","totalStudents":122},{"courses_instructor":"ollivier-gooch, carl","totalStudents":1473},{"courses_instructor":"croft, elizabeth;ostafichuk, peter;schajer, gary;wells, mary a.;yan, joseph","totalStudents":116},{"courses_instructor":"asselin, edouard;croft, elizabeth;fatourechi, mehrdad;ostafichuk, peter;schajer, gary","totalStudents":122},{"courses_instructor":"asselin, edouard;cripton, peter;fatourechi, mehrdad;ostafichuk, peter;schajer, gary","totalStudents":132},{"courses_instructor":"ollivier-gooch, carl;rogak, steven nicholas","totalStudents":113},{"courses_instructor":"davy, martin;ollivier-gooch, carl;ostafichuk, peter","totalStudents":125},{"courses_instructor":"bushe, william kendal;evans, robert;ollivier-gooch, carl","totalStudents":117},{"courses_instructor":"green, sheldon;ostafichuk, peter;rogak, steven nicholas","totalStudents":125},{"courses_instructor":"ollivier-gooch, carl;ostafichuk, peter;rogak, steven nicholas","totalStudents":108},{"courses_instructor":"atabaki, nima;ollivier-gooch, carl","totalStudents":121},{"courses_instructor":"evans, robert;ollivier-gooch, carl;ostafichuk, peter","totalStudents":138},{"courses_instructor":"fengler, markus;ollivier-gooch, carl;ostafichuk, peter;d'entremont, agnes","totalStudents":118},{"courses_instructor":"fengler, markus;ostafichuk, peter","totalStudents":371},{"courses_instructor":"fengler, markus;ollivier-gooch, carl;ostafichuk, peter","totalStudents":239},{"courses_instructor":"hodgson, antony;ostafichuk, peter","totalStudents":115},{"courses_instructor":"ostafichuk, peter","totalStudents":1092},{"courses_instructor":"mallakzadeh, mohammadreza","totalStudents":85},{"courses_instructor":"de silva, clarence wilfred","totalStudents":700},{"courses_instructor":"saunders, james edward","totalStudents":195},{"courses_instructor":"sassani, farrokh","totalStudents":987},{"courses_instructor":"ribarits, stephen","totalStudents":236},{"courses_instructor":"gadala, mohamed","totalStudents":408},{"courses_instructor":"mikkelsen, jon","totalStudents":1501},{"courses_instructor":"olson, james allan","totalStudents":133},{"courses_instructor":"noroozi, nader","totalStudents":113},{"courses_instructor":"mackinnon, ronald;mikkelsen, jon","totalStudents":105},{"courses_instructor":"feng, hsi-yung;van der loos, hendrik","totalStudents":318},{"courses_instructor":"van der loos, hendrik","totalStudents":157},{"courses_instructor":"cramond, pat","totalStudents":288},{"courses_instructor":"mikkelsen, jon;van der loos, hendrik","totalStudents":224},{"courses_instructor":"dunwoody, a bruce;romilly, douglas","totalStudents":239},{"courses_instructor":"clark, randal j;ribarits, stephen","totalStudents":143},{"courses_instructor":"romilly, douglas","totalStudents":802},{"courses_instructor":"kirchen, patrick","totalStudents":503},{"courses_instructor":"davy, martin","totalStudents":75},{"courses_instructor":"bushe, william kendal","totalStudents":394},{"courses_instructor":"fengler, markus;ostafichuk, peter;winkelman, paul","totalStudents":120},{"courses_instructor":"fengler, markus;kott, norbert;olson, james allan;winkelman, paul","totalStudents":117},{"courses_instructor":"dunwoody, a bruce;fengler, markus;sassani, farrokh","totalStudents":131},{"courses_instructor":"fengler, markus;tba;winkelman, paul","totalStudents":136},{"courses_instructor":"fengler, markus;green, sheldon;mikkelsen, jon","totalStudents":147},{"courses_instructor":"fengler, markus;kott, norbert;nagamune, ryozo;olson, james allan","totalStudents":112},{"courses_instructor":"fengler, markus;klaptocz, voytek;mckesson, christopher;rogak, steven nicholas","totalStudents":126},{"courses_instructor":"cramond, pat;fengler, markus;mikkelsen, jon;winkelman, paul","totalStudents":106},{"courses_instructor":"clark, randal j","totalStudents":65},{"courses_instructor":"elfring, gwynn","totalStudents":413},{"courses_instructor":"chiao, mu","totalStudents":691},{"courses_instructor":"schajer, gary","totalStudents":470},{"courses_instructor":"cripton, peter","totalStudents":312},{"courses_instructor":"anasavarapu, srikantha","totalStudents":526},{"courses_instructor":"alemi ardakani, mohammad","totalStudents":72},{"courses_instructor":"ma, hongshen","totalStudents":455},{"courses_instructor":"karim, faizal","totalStudents":114},{"courses_instructor":"beattie, william james","totalStudents":95},{"courses_instructor":"atabaki, nima","totalStudents":1583},{"courses_instructor":"evans, robert","totalStudents":109},{"courses_instructor":"grecov, dana","totalStudents":829},{"courses_instructor":"feng, hsi-yung","totalStudents":719},{"courses_instructor":"hodgson, murray","totalStudents":274},{"courses_instructor":"lu, xiaodong","totalStudents":242},{"courses_instructor":"usman, irfan-ur-rab","totalStudents":25},{"courses_instructor":"merida-donis, walter","totalStudents":647},{"courses_instructor":"hollett, mark","totalStudents":122},{"courses_instructor":"d'entremont, agnes","totalStudents":79},{"courses_instructor":"lagace, pierre-yves","totalStudents":25},{"courses_instructor":"oxland, thomas","totalStudents":150},{"courses_instructor":"jones, claire;newell, robyn","totalStudents":23},{"courses_instructor":"cripton, peter;jones, claire;newell, robyn","totalStudents":8},{"courses_instructor":"feng, hsi-yung;fengler, markus;hodgson, antony;mikkelsen, jon;van der loos, hendrik","totalStudents":129},{"courses_instructor":"atabaki, nima;dunwoody, a bruce;feng, hsi-yung;fengler, markus;ma, hongshen;van der loos, hendrik","totalStudents":25},{"courses_instructor":"atabaki, nima;chiao, mu;fengler, markus;hodgson, antony;mckesson, christopher;parsons, gregg;van der loos, hendrik;winkelman, paul","totalStudents":106},{"courses_instructor":"atabaki, nima;cramond, pat;croft, elizabeth;fengler, markus;hodgson, antony;van der loos, hendrik;winkelman, paul","totalStudents":81},{"courses_instructor":"fengler, markus;mikkelsen, jon;rogak, steven nicholas;schajer, gary;williams, wayne","totalStudents":72},{"courses_instructor":"atabaki, nima;dunwoody, a bruce;feng, hsi-yung;ma, hongshen;tba;van der loos, hendrik;williams, wayne","totalStudents":67},{"courses_instructor":"atabaki, nima;cripton, peter;fengler, markus;hodgson, antony;van der loos, hendrik","totalStudents":76},{"courses_instructor":"dunwoody, a bruce;fengler, markus;hodgson, antony;mohammadhasani khorasany, rami;mikkelsen, jon;van der loos, hendrik","totalStudents":83},{"courses_instructor":"croft, elizabeth;lu, xiaodong","totalStudents":28},{"courses_instructor":"fengler, markus;mikkelsen, jon;rogak, steven nicholas;schajer, gary","totalStudents":29},{"courses_instructor":"atabaki, nima;dunwoody, a bruce;feng, hsi-yung;fengler, markus;ma, hongshen;tba;van der loos, hendrik","totalStudents":32},{"courses_instructor":"lu, xiaodong;van der loos, hendrik","totalStudents":38},{"courses_instructor":"dunwoody, a bruce;fengler, markus;hodgson, antony;mikkelsen, jon;van der loos, hendrik","totalStudents":27},{"courses_instructor":"hodgson, antony;van der loos, hendrik","totalStudents":4},{"courses_instructor":"dunwoody, a bruce","totalStudents":43},{"courses_instructor":"haji hajikolaei, kambiz","totalStudents":129},{"courses_instructor":"tufail, muhammad","totalStudents":49},{"courses_instructor":"croft, elizabeth","totalStudents":50},{"courses_instructor":"sattar, junaed","totalStudents":25},{"courses_instructor":"oldknow, kevin","totalStudents":34},{"courses_instructor":"atsma, willem","totalStudents":25},{"courses_instructor":"nagamune, ryozo","totalStudents":838},{"courses_instructor":"narimani, mohammad","totalStudents":122},{"courses_instructor":"altintas, yusuf","totalStudents":281},{"courses_instructor":"jin, xiao liang","totalStudents":20},{"courses_instructor":"hossain, mohammad zakir","totalStudents":40},{"courses_instructor":"zaide, daniel","totalStudents":15},{"courses_instructor":"williams, wayne","totalStudents":191},{"courses_instructor":"mckesson, christopher","totalStudents":52},{"courses_instructor":"amouzgar, baher","totalStudents":46},{"courses_instructor":"mohammadhasani khorasany, rami","totalStudents":4},{"courses_instructor":"gelbart, daniel","totalStudents":207},{"courses_instructor":"gamage, lalith","totalStudents":8},{"courses_instructor":"jefferies, wilfred arthur","totalStudents":24},{"courses_instructor":"hoodless, pamela;juriloff, diana;lefebvre, louis;robinson, wendy","totalStudents":47},{"courses_instructor":"brown, carolyn janet;lefebvre, louis;robinson, wendy","totalStudents":69},{"courses_instructor":"hoodless, pamela;lefebvre, louis;van raamsdonk, catherine","totalStudents":17},{"courses_instructor":"hoodless, pamela;juriloff, diana;robinson, wendy","totalStudents":19},{"courses_instructor":"conibear, elizabeth;kay, robert;marra, marco","totalStudents":11},{"courses_instructor":"kay, robert;marra, marco;simpson, elizabeth;wilkinson, mark","totalStudents":26},{"courses_instructor":"conibear, elizabeth;simpson, elizabeth;vilarino-guell, carles","totalStudents":18},{"courses_instructor":"brown, carolyn janet;conibear, elizabeth;simpson, elizabeth;vilarino-guell, carles","totalStudents":11},{"courses_instructor":"*riddle, don;kay, robert;wilkinson, mark","totalStudents":16},{"courses_instructor":"brown, carolyn janet;conibear, elizabeth;farrer, matthew;kay, robert;simpson, elizabeth","totalStudents":14},{"courses_instructor":"conibear, elizabeth;kay, robert;simpson, elizabeth;vilarino-guell, carles","totalStudents":15},{"courses_instructor":"brown, carolyn janet;conibear, elizabeth;kay, robert","totalStudents":17},{"courses_instructor":"jiang, xiaoyan;mcnagny, kelly marshall;wasserman, wyeth","totalStudents":71},{"courses_instructor":"dunn, sandra elaine;jiang, xiaoyan;mcnagny, kelly marshall;wasserman, wyeth","totalStudents":32},{"courses_instructor":"lim, chinten james;pallen, catherine;stirling, peter;wasserman, wyeth","totalStudents":30},{"courses_instructor":"wasserman, wyeth","totalStudents":35},{"courses_instructor":"dunn, sandra elaine;jiang, xiaoyan;wasserman, wyeth","totalStudents":31},{"courses_instructor":"pallen, catherine;stirling, peter;wasserman, wyeth","totalStudents":23},{"courses_instructor":"jiang, xiaoyan;wasserman, wyeth","totalStudents":33},{"courses_instructor":"hieter, philip;jones, steven j;rose, ann","totalStudents":102},{"courses_instructor":"hieter, philip;jones, steven j","totalStudents":31},{"courses_instructor":"lorincz, matthew","totalStudents":85},{"courses_instructor":"taubert, stefan","totalStudents":109},{"courses_instructor":"morin, gregg","totalStudents":126},{"courses_instructor":"dunn, sandra elaine","totalStudents":18},{"courses_instructor":"friedman, jan marshall","totalStudents":76},{"courses_instructor":"gibson, william","totalStudents":53},{"courses_instructor":"clarke, lorne","totalStudents":20},{"courses_instructor":"ho, anita","totalStudents":154},{"courses_instructor":"virani, alice","totalStudents":87},{"courses_instructor":"sadovnick, adele","totalStudents":30},{"courses_instructor":"scott, jennifer a","totalStudents":18},{"courses_instructor":"dircks, anita","totalStudents":60},{"courses_instructor":"oh, tracey","totalStudents":34},{"courses_instructor":"duronio, vincent","totalStudents":252},{"courses_instructor":"ashe, maureen;cherkasov, artem;cox, michael;duronio, vincent;mcnagny, kelly marshall;mui, alice;pelech, steven daniel;reiner, neil;roberts, clive;rossi, fabio;sandford, andrew;sly, laura;steiner, theodore;tebbutt, scott;vallance, bruce;wang, yu tian","totalStudents":38},{"courses_instructor":"cox, michael","totalStudents":139},{"courses_instructor":"salh, bill","totalStudents":4},{"courses_instructor":"dutz, jan peter","totalStudents":4},{"courses_instructor":"ayas, najib","totalStudents":31},{"courses_instructor":"allard, michael","totalStudents":34},{"courses_instructor":"luo, honglin","totalStudents":20},{"courses_instructor":"pelech, steven daniel","totalStudents":36},{"courses_instructor":"sibley, jennifer","totalStudents":466},{"courses_instructor":"thompson, charles","totalStudents":174},{"courses_instructor":"kion, tracy;thompson, charles","totalStudents":237},{"courses_instructor":"kion, tracy;krebs, danielle;steiner, theodore","totalStudents":263},{"courses_instructor":"kion, tracy;sibley, jennifer;thompson, charles","totalStudents":233},{"courses_instructor":"abraham, ninan;finlay, b brett;sibley, jennifer","totalStudents":172},{"courses_instructor":"mohn, william","totalStudents":624},{"courses_instructor":"johnson, pauline;kion, tracy","totalStudents":705},{"courses_instructor":"gold, michael","totalStudents":273},{"courses_instructor":"horwitz, marc","totalStudents":1092},{"courses_instructor":"jean, francois;kion, tracy","totalStudents":367},{"courses_instructor":"jean, francois;krebs, danielle","totalStudents":229},{"courses_instructor":"fernandez, rachel","totalStudents":451},{"courses_instructor":"fernandez, rachel;gaynor, erin","totalStudents":106},{"courses_instructor":"benbasat, julyet;hinze, ehleen","totalStudents":335},{"courses_instructor":"kion, tracy;nomellini, john","totalStudents":84},{"courses_instructor":"beatty, john","totalStudents":647},{"courses_instructor":"nomellini, john;smith, karen","totalStudents":27},{"courses_instructor":"harder, kenneth","totalStudents":393},{"courses_instructor":"harder, kenneth;perona wright, georgia","totalStudents":77},{"courses_instructor":"hancock, robert e","totalStudents":130},{"courses_instructor":"gardy, jennifer;hallam, steven;hirst, martin","totalStudents":101},{"courses_instructor":"hirst, martin","totalStudents":130},{"courses_instructor":"fox, joanne alison;murphy, michael","totalStudents":233},{"courses_instructor":"jean, francois","totalStudents":86},{"courses_instructor":"horwitz, marc;jean, francois","totalStudents":62},{"courses_instructor":"chantler, janet k","totalStudents":85},{"courses_instructor":"gantt, soren;horwitz, marc","totalStudents":28},{"courses_instructor":"gaynor, erin;thompson, charles","totalStudents":107},{"courses_instructor":"harder, kenneth;johnson, pauline","totalStudents":120},{"courses_instructor":"johnson, pauline","totalStudents":23},{"courses_instructor":"smit, john kenneth","totalStudents":404},{"courses_instructor":"ramey, william d","totalStudents":518},{"courses_instructor":"oliver, david","totalStudents":165},{"courses_instructor":"eltis, lindsay","totalStudents":61},{"courses_instructor":"hallam, steven","totalStudents":78},{"courses_instructor":"crowe, sean","totalStudents":25},{"courses_instructor":"crowe, sean;hallam, steven","totalStudents":20},{"courses_instructor":"ramey, william d;sibley, jennifer","totalStudents":11},{"courses_instructor":"kion, tracy;ramey, william d","totalStudents":7},{"courses_instructor":"perona wright, georgia","totalStudents":14},{"courses_instructor":"teh, hung sia","totalStudents":19},{"courses_instructor":"gold, michael;perona wright, georgia;sly, laura","totalStudents":20},{"courses_instructor":"eltis, lindsay;thompson, charles","totalStudents":15},{"courses_instructor":"av-gay, yossef;manges, amee;mohn, william;thompson, charles","totalStudents":11},{"courses_instructor":"mcrae, lorna","totalStudents":65},{"courses_instructor":"lyons, jeanne","totalStudents":216},{"courses_instructor":"mattenley, andrea","totalStudents":40},{"courses_instructor":"vedam, saraswathi","totalStudents":58},{"courses_instructor":"latka, patrice","totalStudents":35},{"courses_instructor":"campbell, kim;krebs, claudia","totalStudents":20},{"courses_instructor":"mok, heidi","totalStudents":33},{"courses_instructor":"thordarson, dana","totalStudents":227},{"courses_instructor":"bayrampour basmenj, hamideh","totalStudents":20},{"courses_instructor":"pang, catherine c","totalStudents":145},{"courses_instructor":"broten, courtney;mcrae, lorna","totalStudents":20},{"courses_instructor":"campbell, kim","totalStudents":21},{"courses_instructor":"broten, courtney;campbell, allison;mcrae, lorna","totalStudents":19},{"courses_instructor":"ellis, cathryn","totalStudents":34},{"courses_instructor":"broten, courtney","totalStudents":53},{"courses_instructor":"campbell, allison","totalStudents":19},{"courses_instructor":"simmons, valerie","totalStudents":24},{"courses_instructor":"lyons, jeanne;simmons, valerie","totalStudents":18},{"courses_instructor":"kornelsen, jude;thordarson, dana","totalStudents":17},{"courses_instructor":"campbell, kim;simmons, valerie","totalStudents":10},{"courses_instructor":"campbell, allison;simmons, valerie","totalStudents":13},{"courses_instructor":"campbell, kim;tba","totalStudents":9},{"courses_instructor":"campbell, kim;vedam, saraswathi","totalStudents":24},{"courses_instructor":"ellis, cathryn;mcrae, lorna","totalStudents":12},{"courses_instructor":"holuszko, maria","totalStudents":273},{"courses_instructor":"veiga, marcello","totalStudents":737},{"courses_instructor":"scoble, malcolm","totalStudents":657},{"courses_instructor":"klein, bern;roufail, reem","totalStudents":52},{"courses_instructor":"farzanegan, akbar","totalStudents":39},{"courses_instructor":"meech, john","totalStudents":475},{"courses_instructor":"teymouri, shervin","totalStudents":155},{"courses_instructor":"handelsman, simon","totalStudents":138},{"courses_instructor":"pakalnis, rimas c","totalStudents":357},{"courses_instructor":"hughes, paul","totalStudents":156},{"courses_instructor":"elmo, davide","totalStudents":645},{"courses_instructor":"millertait, logan mitchell","totalStudents":37},{"courses_instructor":"bozorgebrahimi, enayat","totalStudents":109},{"courses_instructor":"bozorgebrahimi, enayat;hitch, michael","totalStudents":24},{"courses_instructor":"nadolski, stefan","totalStudents":121},{"courses_instructor":"gunson, aaron james","totalStudents":202},{"courses_instructor":"drozdiak, jeffrey","totalStudents":139},{"courses_instructor":"pawlik, marek","totalStudents":612},{"courses_instructor":"lopes da costa, jose","totalStudents":193},{"courses_instructor":"babaei khorzoughi, mohammad","totalStudents":238},{"courses_instructor":"hall, robert","totalStudents":491},{"courses_instructor":"chessor, edward stanley","totalStudents":25},{"courses_instructor":"arduini, andrea","totalStudents":36},{"courses_instructor":"van zyl, dirk;xavier, andre","totalStudents":127},{"courses_instructor":"van zyl, dirk","totalStudents":863},{"courses_instructor":"roufail, reem","totalStudents":84},{"courses_instructor":"klein, bern","totalStudents":196},{"courses_instructor":"lawrence, richard william","totalStudents":69},{"courses_instructor":"wilson, ward","totalStudents":54},{"courses_instructor":"elmo, davide;scoble, malcolm","totalStudents":33},{"courses_instructor":"keen, patricia","totalStudents":41},{"courses_instructor":"hall, robert;hitch, michael;pawlik, marek;van zyl, dirk","totalStudents":20},{"courses_instructor":"hitch, michael;lawrence, richard william","totalStudents":54},{"courses_instructor":"dunbar, w scott;van zyl, dirk","totalStudents":32},{"courses_instructor":"sessional lecturer","totalStudents":46},{"courses_instructor":"asselin, edouard","totalStudents":268},{"courses_instructor":"dixon, david","totalStudents":605},{"courses_instructor":"tafaghodikhajavi, leili","totalStudents":48},{"courses_instructor":"barr, peter","totalStudents":748},{"courses_instructor":"burns, alexander","totalStudents":44},{"courses_instructor":"mokmeli, mohammad","totalStudents":45},{"courses_instructor":"alfantazi, akram;mohammadi, farzad","totalStudents":45},{"courses_instructor":"alfantazi, akram","totalStudents":199},{"courses_instructor":"liu, jing","totalStudents":44},{"courses_instructor":"sinclair, chadwick","totalStudents":869},{"courses_instructor":"fazeli, fateh","totalStudents":82},{"courses_instructor":"liu, wenying","totalStudents":74},{"courses_instructor":"dixon, david;xia, guangrui","totalStudents":56},{"courses_instructor":"maalekian, mehran","totalStudents":38},{"courses_instructor":"militzer, matthias","totalStudents":351},{"courses_instructor":"alshwawreh, nidal","totalStudents":69},{"courses_instructor":"liu, chenglu","totalStudents":81},{"courses_instructor":"azizi-alizamini, hamid","totalStudents":167},{"courses_instructor":"colley, leo","totalStudents":139},{"courses_instructor":"troczynski, tom","totalStudents":662},{"courses_instructor":"oprea, george","totalStudents":42},{"courses_instructor":"oprea, george;troczynski, tom","totalStudents":34},{"courses_instructor":"mohammadi zahrani, ehsan;troczynski, tom","totalStudents":37},{"courses_instructor":"derksen, ruth;liu, wenying","totalStudents":42},{"courses_instructor":"derksen, ruth;wassink, berend","totalStudents":82},{"courses_instructor":"liu, wenying;teslenko, tatiana","totalStudents":33},{"courses_instructor":"mobuchon, christophe;poursartip, anoshiravan","totalStudents":57},{"courses_instructor":"gordnian, kamyar;mobuchon, christophe","totalStudents":86},{"courses_instructor":"karimi sharif, hamed","totalStudents":91},{"courses_instructor":"wang, rizhi","totalStudents":452},{"courses_instructor":"dreisinger, david","totalStudents":347},{"courses_instructor":"padilla perez, victor","totalStudents":38},{"courses_instructor":"alfantazi, akram;kish, joseph","totalStudents":28},{"courses_instructor":"padilla perez, victor eduardo","totalStudents":72},{"courses_instructor":"mohammadi, maysam","totalStudents":10},{"courses_instructor":"olver, oscar","totalStudents":16},{"courses_instructor":"karimi sharif, hamed;troczynski, tom","totalStudents":28},{"courses_instructor":"dreisinger, david;sinclair, chadwick;wang, rizhi","totalStudents":27},{"courses_instructor":"asselin, edouard;cockcroft, steven;dreisinger, david;sinclair, chadwick;wang, rizhi","totalStudents":31},{"courses_instructor":"ko, frank;maijer, daan;militzer, matthias;sinclair, chadwick;xia, guangrui","totalStudents":27},{"courses_instructor":"alfantazi, akram;asselin, edouard;dreisinger, david;fernlund, goran;ko, frank","totalStudents":38},{"courses_instructor":"asselin, edouard;dreisinger, david;wang, rizhi","totalStudents":36},{"courses_instructor":"alfantazi, akram;asselin, edouard;dreisinger, david;ko, frank;sinclair, chadwick","totalStudents":40},{"courses_instructor":"dreisinger, david;ko, frank;maijer, daan;sinclair, chadwick;wang, rizhi","totalStudents":52},{"courses_instructor":"fernlund, goran;ko, frank;militzer, matthias;xia, guangrui","totalStudents":28},{"courses_instructor":"asselin, edouard;barr, peter;dixon, david;militzer, matthias","totalStudents":29},{"courses_instructor":"cockcroft, steven;fernlund, goran;maijer, daan;wang, rizhi;wassink, berend","totalStudents":30},{"courses_instructor":"asselin, edouard;barr, peter;cockcroft, steven;wassink, berend;xia, guangrui","totalStudents":37},{"courses_instructor":"alfantazi, akram;asselin, edouard;dixon, david;ko, frank","totalStudents":32},{"courses_instructor":"asselin, edouard;cockcroft, steven;maijer, daan;wang, rizhi","totalStudents":38},{"courses_instructor":"asselin, edouard;cockcroft, steven;fernlund, goran;poursartip, anoshiravan","totalStudents":48},{"courses_instructor":"bahi, ardeshir;ko, frank","totalStudents":20},{"courses_instructor":"bahi, ardeshir;wan, yuqin","totalStudents":26},{"courses_instructor":"bahi, ardeshir","totalStudents":47},{"courses_instructor":"garcin, thomas","totalStudents":38},{"courses_instructor":"garcin, thomas;poole, warren","totalStudents":18},{"courses_instructor":"akhtar, ainul","totalStudents":128},{"courses_instructor":"cockcroft, steven;dreisinger, david","totalStudents":19},{"courses_instructor":"poole, warren;wassink, berend","totalStudents":34},{"courses_instructor":"cockcroft, steven;wassink, berend","totalStudents":93},{"courses_instructor":"keulen, casey;zobeiry, navid","totalStudents":70},{"courses_instructor":"forghani, alireza;zobeiry, navid","totalStudents":66},{"courses_instructor":"maijer, daan","totalStudents":11},{"courses_instructor":"militzer, matthias;sinclair, chadwick","totalStudents":5},{"courses_instructor":"roeder, john barlow","totalStudents":600},{"courses_instructor":"pritchard, robert","totalStudents":772},{"courses_instructor":"murphy, nancy","totalStudents":57},{"courses_instructor":"palmer, james","totalStudents":105},{"courses_instructor":"benjamin, william e","totalStudents":58},{"courses_instructor":"parsons, laurel","totalStudents":133},{"courses_instructor":"lind, stephanie k.;simpson, rebecca","totalStudents":52},{"courses_instructor":"morrison, kenneth j","totalStudents":131},{"courses_instructor":"cook, scott","totalStudents":109},{"courses_instructor":"konoval, michael brandon","totalStudents":1128},{"courses_instructor":"littleford, james","totalStudents":74},{"courses_instructor":"king, sharman;littleford, james","totalStudents":23},{"courses_instructor":"littleford, james;nesselroad, brian;van deursen, john","totalStudents":23},{"courses_instructor":"fisher, alexander john","totalStudents":575},{"courses_instructor":"hieb, kimberly beck","totalStudents":77},{"courses_instructor":"metzer, david","totalStudents":661},{"courses_instructor":"law, sin yan hedy","totalStudents":347},{"courses_instructor":"butler, gregory g","totalStudents":279},{"courses_instructor":"fullerton, james","totalStudents":162},{"courses_instructor":"fedoruk, brenda;nolan, julia;ramsbottom, gene;read, jesse","totalStudents":91},{"courses_instructor":"nolan, julia;ramsbottom, gene","totalStudents":40},{"courses_instructor":"fedoruk, brenda;nolan, julia;ramsbottom, gene","totalStudents":17},{"courses_instructor":"price, heather","totalStudents":77},{"courses_instructor":"hermiston, nancy jane","totalStudents":298},{"courses_instructor":"barcza, peter;hermiston, nancy jane","totalStudents":8},{"courses_instructor":"epp, richard arthur","totalStudents":393},{"courses_instructor":"chen chai, susan m.c.","totalStudents":173},{"courses_instructor":"chen chai, susan m.c.;enns, alice","totalStudents":72},{"courses_instructor":"enns, alice","totalStudents":114},{"courses_instructor":"dawson, terence","totalStudents":63},{"courses_instructor":"dawson, terence;sharon, rena","totalStudents":26},{"courses_instructor":"bergeron, david;sharon, rena","totalStudents":7},{"courses_instructor":"bortolussi, paolo;hamm, corey","totalStudents":44},{"courses_instructor":"hamm, corey;magnanensi, giorgio;wilson, eric","totalStudents":56},{"courses_instructor":"bortolussi, paolo;hamm, corey;wilson, eric","totalStudents":27},{"courses_instructor":"bortolussi, paolo;wilson, eric","totalStudents":19},{"courses_instructor":"stride, frederick","totalStudents":204},{"courses_instructor":"esson, dennis;stride, frederick","totalStudents":127},{"courses_instructor":"hoy, patricia","totalStudents":120},{"courses_instructor":"dodson, david","totalStudents":549},{"courses_instructor":"attas, robin","totalStudents":139},{"courses_instructor":"micznik, vera georgia","totalStudents":323},{"courses_instructor":"kinnear, tyler lee","totalStudents":53},{"courses_instructor":"sharon, rena","totalStudents":36},{"courses_instructor":"strum, nicole","totalStudents":58},{"courses_instructor":"boyle, antares;sawatzky, grant","totalStudents":54},{"courses_instructor":"girard, jonathan","totalStudents":195},{"courses_instructor":"read, jesse;van deursen, john","totalStudents":12},{"courses_instructor":"van deursen, john","totalStudents":102},{"courses_instructor":"chatman, stephen","totalStudents":271},{"courses_instructor":"chang bortolussi, dorothy","totalStudents":195},{"courses_instructor":"ryan, jeffrey","totalStudents":61},{"courses_instructor":"unger, christopher","totalStudents":18},{"courses_instructor":"taylor, robert","totalStudents":172},{"courses_instructor":"bennett, dwight","totalStudents":24},{"courses_instructor":"taylor, robert;van deursen, john","totalStudents":12},{"courses_instructor":"langager, graeme","totalStudents":177},{"courses_instructor":"girard, jonathan;taylor, robert","totalStudents":83},{"courses_instructor":"bennett, dwight;taylor, robert","totalStudents":25},{"courses_instructor":"hua, szu-jan;langager, graeme","totalStudents":22},{"courses_instructor":"pullan, bruce","totalStudents":19},{"courses_instructor":"hamel, keith","totalStudents":80},{"courses_instructor":"hesselink, nathan","totalStudents":331},{"courses_instructor":"harrison, klisala","totalStudents":127},{"courses_instructor":"poudrier, eve","totalStudents":14},{"courses_instructor":"kurth, richard","totalStudents":5},{"courses_instructor":"anderson, leonard","totalStudents":16},{"courses_instructor":"raftery, james","totalStudents":12},{"courses_instructor":"oostwoud, roelof","totalStudents":37},{"courses_instructor":"tenzer, michael","totalStudents":36},{"courses_instructor":"barcza, peter;sharon, rena","totalStudents":13},{"courses_instructor":"fisher, alexander john;oke, doreen","totalStudents":43},{"courses_instructor":"wilson, eric","totalStudents":5},{"courses_instructor":"hamm, corey;wilson, eric","totalStudents":10},{"courses_instructor":"isaacson, michael d;mikkelsen, jon","totalStudents":26},{"courses_instructor":"koenig, philip;poole, warren","totalStudents":14},{"courses_instructor":"stana, vitorio","totalStudents":25},{"courses_instructor":"mckesson, christopher;ostafichuk, peter","totalStudents":29},{"courses_instructor":"mckesson, christopher;mikkelsen, jon","totalStudents":25},{"courses_instructor":"koenig, philip;mckesson, christopher;mikkelsen, jon","totalStudents":11},{"courses_instructor":"cooper, elisabeth","totalStudents":421},{"courses_instructor":"hikade, thomas","totalStudents":145},{"courses_instructor":"welton, lynn","totalStudents":26},{"courses_instructor":"schneider, thomas","totalStudents":461},{"courses_instructor":"cooper, elisabeth;hikade, thomas","totalStudents":96},{"courses_instructor":"johnston, christine","totalStudents":36},{"courses_instructor":"vincent, steven","totalStudents":263},{"courses_instructor":"mcburney, sheila mary;o'flynn-magee, katherine","totalStudents":357},{"courses_instructor":"jackson, cathryn","totalStudents":216},{"courses_instructor":"affleck, frances;boschma, geertje;brown, helen jean;foster, paula;jackson, cathryn;mcburney, sheila mary;rea, gail;thorne, sally","totalStudents":118},{"courses_instructor":"boschma, geertje;brown, helen jean;camacho, sarah;jackson, cathryn;jetha, farah;mcburney, sheila mary;mislang, jonathan;phinney, alison;rea, gail;valkenier, beverley","totalStudents":118},{"courses_instructor":"jackson, cathryn;o'flynn-magee, katherine","totalStudents":119},{"courses_instructor":"baumbusch, jennifer;esson, lynne","totalStudents":356},{"courses_instructor":"segaric, cheryl","totalStudents":149},{"courses_instructor":"affleck, frances;foster, paula;jackson, cathryn;jetha, farah;mcburney, sheila mary;rea, gail;segaric, cheryl","totalStudents":119},{"courses_instructor":"jackson, cathryn;jetha, farah;mislang, jonathan;phinney, alison;rea, gail;segaric, cheryl;valkenier, beverley","totalStudents":118},{"courses_instructor":"kryworuchko, jennifer;segaric, cheryl","totalStudents":120},{"courses_instructor":"smye, victoria","totalStudents":253},{"courses_instructor":"brown, helen jean","totalStudents":367},{"courses_instructor":"varcoe, colleen","totalStudents":389},{"courses_instructor":"ratner, pamela","totalStudents":145},{"courses_instructor":"balneaves, lynda","totalStudents":422},{"courses_instructor":"kryworuchko, jennifer","totalStudents":120},{"courses_instructor":"warnock, fay","totalStudents":316},{"courses_instructor":"dewar, anne","totalStudents":441},{"courses_instructor":"rodney, patricia","totalStudents":733},{"courses_instructor":"macphee, maura","totalStudents":937},{"courses_instructor":"canam, connie joan","totalStudents":142},{"courses_instructor":"ebbehoj, catherine;hall, wendy anne","totalStudents":68},{"courses_instructor":"ebbehoj, catherine","totalStudents":418},{"courses_instructor":"ebbehoj, catherine;jetha, farah;lapinsky, julie","totalStudents":38},{"courses_instructor":"ebbehoj, catherine;jetha, farah","totalStudents":77},{"courses_instructor":"ebbehoj, catherine;hall, wendy anne;jetha, farah;lapinsky, julie","totalStudents":40},{"courses_instructor":"ebbehoj, catherine;jackson, cathryn;mcburney, sheila mary;mislang, jonathan;valkenier, beverley","totalStudents":40},{"courses_instructor":"mcpherson, gladys;tan, elsie;warnock, fay","totalStudents":38},{"courses_instructor":"valkenier, beverley","totalStudents":79},{"courses_instructor":"mcpherson, gladys","totalStudents":179},{"courses_instructor":"camacho, sarah;denison, jacqueline;dunat, tatijana;manio, trisha joyce;tan, elsie;valkenier, beverley","totalStudents":38},{"courses_instructor":"tan, elsie","totalStudents":186},{"courses_instructor":"einboden, rochelle;mcpherson, gladys;warnock, fay","totalStudents":30},{"courses_instructor":"tan, elsie;valkenier, beverley","totalStudents":41},{"courses_instructor":"howard, amanda;tan, elsie","totalStudents":40},{"courses_instructor":"pham, chandra","totalStudents":70},{"courses_instructor":"jackson, cathryn;mcburney, sheila mary;mislang, jonathan;tan, elsie;valkenier, beverley","totalStudents":40},{"courses_instructor":"camacho, sarah;dunat, tatijana;mcpherson, gladys","totalStudents":39},{"courses_instructor":"camacho, sarah;dunat, tatijana;mcpherson, gladys;valkenier, beverley","totalStudents":38},{"courses_instructor":"pham, chandra;tan, elsie","totalStudents":38},{"courses_instructor":"groening, marlee;phillips, craig","totalStudents":69},{"courses_instructor":"groening, marlee","totalStudents":357},{"courses_instructor":"groening, marlee;lawton, jennifer;wallace, patricia","totalStudents":60},{"courses_instructor":"groening, marlee;wallace, patricia","totalStudents":78},{"courses_instructor":"groening, marlee;lawton, jennifer;phillips, craig;wallace, patricia","totalStudents":38},{"courses_instructor":"groening, marlee;jackson, cathryn;mcburney, sheila mary;mislang, jonathan;valkenier, beverley","totalStudents":38},{"courses_instructor":"browning, kathryn;ochi, emily","totalStudents":39},{"courses_instructor":"ricci, joanne;saewyc, elizabeth","totalStudents":69},{"courses_instructor":"dhari, ranjit kaur;ricci, joanne","totalStudents":78},{"courses_instructor":"bungay, victoria","totalStudents":136},{"courses_instructor":"dhari, ranjit kaur;ricci, joanne;swanson, monica","totalStudents":117},{"courses_instructor":"ricci, joanne","totalStudents":121},{"courses_instructor":"dhari, ranjit kaur","totalStudents":117},{"courses_instructor":"jackson, cathryn;mcburney, sheila mary;mislang, jonathan;ricci, joanne;valkenier, beverley","totalStudents":19},{"courses_instructor":"dhari, ranjit kaur;jackson, cathryn;mcburney, sheila mary;mislang, jonathan;valkenier, beverley","totalStudents":19},{"courses_instructor":"dhari, ranjit kaur;ricci, joanne;swanson, monica;unger, connie","totalStudents":40},{"courses_instructor":"ricci, joanne;wong, sabrina","totalStudents":70},{"courses_instructor":"cunningham, margaret mui yeah;foster, paula;jackson, cathryn;simpson, margaret;taverner, tarnia","totalStudents":54},{"courses_instructor":"affleck, frances;esson, lynne;foster, paula;jackson, cathryn;marshall, helga;taverner, tarnia","totalStudents":78},{"courses_instructor":"affleck, frances;esson, lynne;foster, paula;jackson, cathryn;mann, dalbir;marshall, helga;mislang, jonathan;polyhronopoulos, nancy;taverner, tarnia","totalStudents":40},{"courses_instructor":"jackson, cathryn;taverner, tarnia","totalStudents":80},{"courses_instructor":"affleck, frances;esson, lynne;foster, paula;jackson, cathryn;mann, dalbir;mislang, jonathan;taverner, tarnia;valkenier, beverley","totalStudents":39},{"courses_instructor":"esson, lynne","totalStudents":156},{"courses_instructor":"esson, lynne;jackson, cathryn;mcburney, sheila mary;mislang, jonathan;taverner, tarnia;valkenier, beverley","totalStudents":38},{"courses_instructor":"foster, paula;jackson, cathryn;mann, dalbir;mislang, jonathan;valkenier, beverley","totalStudents":40},{"courses_instructor":"affleck, frances;esson, lynne;jackson, cathryn;mann, dalbir;marshall, helga;mislang, jonathan;taverner, tarnia;valkenier, beverley","totalStudents":38},{"courses_instructor":"esson, lynne;mann, dalbir","totalStudents":41},{"courses_instructor":"marshall, helga;taverner, tarnia","totalStudents":33},{"courses_instructor":"brown, helen jean;o'flynn-magee, katherine;smye, victoria;tan, elsie","totalStudents":354},{"courses_instructor":"ratner, pamela;varcoe, colleen","totalStudents":353},{"courses_instructor":"dahinten, susan","totalStudents":427},{"courses_instructor":"boschma, geertje","totalStudents":400},{"courses_instructor":"currie, leanne","totalStudents":241},{"courses_instructor":"affleck, frances;jackson, cathryn;marshall, helga;oliffe, john;valkenier, beverley","totalStudents":53},{"courses_instructor":"garrett, bernard mark","totalStudents":246},{"courses_instructor":"affleck, frances;esson, lynne;jackson, cathryn;mislang, jonathan;oliffe, john;rea, gail;valkenier, beverley","totalStudents":47},{"courses_instructor":"affleck, frances;oliffe, john","totalStudents":38},{"courses_instructor":"hall, wendy anne","totalStudents":139},{"courses_instructor":"hall, wendy anne;jetha, farah;segaric, cheryl","totalStudents":20},{"courses_instructor":"lynam, mary judith","totalStudents":62},{"courses_instructor":"cook, karen","totalStudents":18},{"courses_instructor":"phillips, craig","totalStudents":91},{"courses_instructor":"mcburney, sheila mary","totalStudents":84},{"courses_instructor":"baumbusch, jennifer;lynam, mary judith","totalStudents":19},{"courses_instructor":"browne, annette","totalStudents":117},{"courses_instructor":"thorne, sally","totalStudents":24},{"courses_instructor":"henderson, angela","totalStudents":14},{"courses_instructor":"balneaves, lynda;lynam, mary judith","totalStudents":22},{"courses_instructor":"phinney, alison","totalStudents":48},{"courses_instructor":"wong, sabrina","totalStudents":236},{"courses_instructor":"hewat, roberta j w","totalStudents":21},{"courses_instructor":"henczel, lisa","totalStudents":35},{"courses_instructor":"oliffe, john","totalStudents":21},{"courses_instructor":"mccuaig, fairleth","totalStudents":184},{"courses_instructor":"beatty, cheryl","totalStudents":120},{"courses_instructor":"brew, nancy","totalStudents":97},{"courses_instructor":"joachim, gloria;thomson, sharon","totalStudents":27},{"courses_instructor":"krist, jennifer","totalStudents":42},{"courses_instructor":"harding, jillian","totalStudents":28},{"courses_instructor":"krist, jennifer;mccuaig, fairleth","totalStudents":14},{"courses_instructor":"jennings,  mary lou;mccuaig, fairleth","totalStudents":14},{"courses_instructor":"burrows, marlene;harding, jillian;mccuaig, fairleth","totalStudents":15},{"courses_instructor":"harding, jillian;krist, jennifer;mccuaig, fairleth","totalStudents":99},{"courses_instructor":"burrows, marlene;mccuaig, fairleth","totalStudents":15},{"courses_instructor":"brown, helen jean;mccuaig, fairleth","totalStudents":14},{"courses_instructor":"boschma, geertje;mcpherson, gladys","totalStudents":8},{"courses_instructor":"mcpherson, gladys;taverner, tarnia","totalStudents":13},{"courses_instructor":"jillings, carol","totalStudents":39},{"courses_instructor":"mahara, star","totalStudents":9},{"courses_instructor":"macphee, maura;phinney, alison","totalStudents":21},{"courses_instructor":"saewyc, elizabeth","totalStudents":55},{"courses_instructor":"campbell, suzanne","totalStudents":12},{"courses_instructor":"jennings,  mary lou","totalStudents":13},{"courses_instructor":"burrows, marlene;harding, jillian","totalStudents":47},{"courses_instructor":"foster, jodie;krist, jennifer;mccuaig, fairleth","totalStudents":16},{"courses_instructor":"burrows, marlene;harding, jillian;krist, jennifer;mccuaig, fairleth","totalStudents":112},{"courses_instructor":"brew, nancy;henczel, lisa","totalStudents":14},{"courses_instructor":"mccuaig, fairleth;thomson, sharon","totalStudents":13},{"courses_instructor":"mccuaig, fairleth;tba","totalStudents":14},{"courses_instructor":"brew, nancy;mccuaig, fairleth","totalStudents":14},{"courses_instructor":"henderson, angela;thorne, sally","totalStudents":8},{"courses_instructor":"johnson, joy louise;rodney, patricia","totalStudents":5},{"courses_instructor":"thomson, sharon","totalStudents":14},{"courses_instructor":"burrows, marlene","totalStudents":48},{"courses_instructor":"beristain, alexander guillermo","totalStudents":25},{"courses_instructor":"leung, peter c","totalStudents":17},{"courses_instructor":"moon, young","totalStudents":7},{"courses_instructor":"rurak, danny","totalStudents":47},{"courses_instructor":"devlin, angela","totalStudents":8},{"courses_instructor":"hammond, geoffrey lewis","totalStudents":16},{"courses_instructor":"maccalman, colin","totalStudents":3},{"courses_instructor":"perks, anthony","totalStudents":44},{"courses_instructor":"janssen, patricia","totalStudents":132},{"courses_instructor":"yip, stephen","totalStudents":68},{"courses_instructor":"takei, fumio","totalStudents":17},{"courses_instructor":"weng, andrew","totalStudents":26},{"courses_instructor":"au, nicholas;bradley, amanda;keown, paul anthony;scott, mark;vercauteren, suzanne","totalStudents":22},{"courses_instructor":"xenakis, jennifer","totalStudents":138},{"courses_instructor":"park, carol","totalStudents":236},{"courses_instructor":"keller, bernd;kizhakkedathu, jayachandran;seow, chun yong;young, sean;zaph, colby","totalStudents":24},{"courses_instructor":"coulter-mackie, marion;keller, bernd;kizhakkedathu, jayachandran;seow, chun yong","totalStudents":40},{"courses_instructor":"coulter-mackie, marion;keller, bernd;kizhakkedathu, jayachandran;seow, chun yong;young, sean","totalStudents":19},{"courses_instructor":"keller, bernd","totalStudents":40},{"courses_instructor":"ong, corinne","totalStudents":24},{"courses_instructor":"bruyere, helene;gillan, tanya","totalStudents":24},{"courses_instructor":"doheny, g. james;park, carol","totalStudents":40},{"courses_instructor":"doheny, g. james;dyck, helen;park, carol;smith, brenda","totalStudents":19},{"courses_instructor":"li, juliana","totalStudents":22},{"courses_instructor":"gilks, cyril blake;haley, lawrence;luo, honglin;skinnider, brian;tba","totalStudents":24},{"courses_instructor":"gilks, cyril blake;haley, lawrence;luo, honglin;nimmo, michael;park, carol;skinnider, brian;walters, rebecca","totalStudents":59},{"courses_instructor":"gilks, cyril blake;haley, lawrence;lee, lawrence;luo, honglin;ng, tony;skinnider, brian;yip, stephen","totalStudents":23},{"courses_instructor":"gilks, cyril blake;haley, lawrence;luo, honglin;skinnider, brian","totalStudents":20},{"courses_instructor":"kizhakkedathu, jayachandran;o'kusky, john","totalStudents":67},{"courses_instructor":"o'kusky, john;walker, david","totalStudents":59},{"courses_instructor":"o'kusky, john","totalStudents":67},{"courses_instructor":"thomson, stephanie","totalStudents":45},{"courses_instructor":"dhasi, sonny;sedgwick, ted;tba;thomson, stephanie","totalStudents":40},{"courses_instructor":"dhasi, sonny;sedgwick, ted;smith, craig;thomson, stephanie","totalStudents":20},{"courses_instructor":"greene, wayne m","totalStudents":24},{"courses_instructor":"bryce, elizabeth;hsiao, william;imperial, miguel;lau, timmy;mclean, donald;morshed, muhammad;petric, martin;roscoe, diane;scott, mark;tang, patrick kwok chuen","totalStudents":24},{"courses_instructor":"bryce, elizabeth;isaac-renton, judith;lau, timmy;mclean, donald;morshed, muhammad;noble, michael allen;petric, martin;roscoe, diane;scott, mark;tang, patrick kwok chuen","totalStudents":60},{"courses_instructor":"bryce, elizabeth;hsiao, william;imperial, miguel;jassem, agata;krajden, mel;morshed, muhammad;petric, martin;prystajecky, natalie;roscoe, diane;scott, mark","totalStudents":22},{"courses_instructor":"morshed, muhammad","totalStudents":19},{"courses_instructor":"bryce, elizabeth;hsiao, william;imperial, miguel;morshed, muhammad;petric, martin;roscoe, diane;scott, mark;tang, patrick kwok chuen","totalStudents":21},{"courses_instructor":"goh, swee-han","totalStudents":24},{"courses_instructor":"nimmo, michael","totalStudents":262},{"courses_instructor":"doheny, g. james;nimmo, michael;quandt, jacqueline;walters, rebecca","totalStudents":56},{"courses_instructor":"nimmo, michael;van den elzen, peter","totalStudents":74},{"courses_instructor":"au, nicholas;bruyere, helene;carter, cedric john;coupland, robert william;mcnagny, kelly marshall;medvedev, nadejda;schubert, peter;scott, mark;skinnider, brian;vercauteren, suzanne","totalStudents":22},{"courses_instructor":"au, nicholas;broady, raewyn;bruyere, helene;carter, cedric john;coupland, robert william;mcnagny, kelly marshall;medvedev, nadejda;schubert, peter;scott, mark;serrano, katherine;vercauteren, suzanne","totalStudents":54},{"courses_instructor":"au, nicholas;bruyere, helene;carter, cedric john;conway, edward;mcnagny, kelly marshall;medvedev, nadejda;roland, kristine;schubert, peter;scott, mark;skinnider, brian;vercauteren, suzanne","totalStudents":19},{"courses_instructor":"carter, cedric john","totalStudents":21},{"courses_instructor":"coupland, robert william","totalStudents":24},{"courses_instructor":"ford, jason","totalStudents":22},{"courses_instructor":"nielsen, torsten;park, carol;xenakis, jennifer","totalStudents":53},{"courses_instructor":"bradley, amanda;godolphin, william;huynh, hanh;keller, bernd","totalStudents":23},{"courses_instructor":"bradley, amanda;godolphin, william;huynh, hanh;park, carol","totalStudents":53},{"courses_instructor":"bradley, amanda;godolphin, william;sutherland, michael","totalStudents":20},{"courses_instructor":"godolphin, william;park, carol","totalStudents":42},{"courses_instructor":"bradley, amanda;godolphin, william;huynh, hanh","totalStudents":23},{"courses_instructor":"dooley, kent;frohlich, jiri;hill, john stuart;holmes, daniel;keller, bernd;mattman, andre;monsalve, maria victoria;nimmo, michael;pudek, morris;schreiber, william;tomalty, cheryl;vallance, hilary","totalStudents":22},{"courses_instructor":"casey, brett;dooley, kent;frohlich, jiri;halstead, anne catherine;hill, john stuart;holmes, daniel;keller, bernd;mattman, andre;nimmo, michael;pudek, morris;schreiber, william;tomalty, cheryl;urquhart, nadine;vallance, hilary","totalStudents":53},{"courses_instructor":"dooley, kent;frohlich, jiri;hauff, kristin;hill, john stuart;holmes, daniel;jung, benjamin;mattman, andre;monsalve, maria victoria;palaty, jan;pudek, morris;schreiber, william;tomalty, cheryl;tucker, tracy;vallance, hilary","totalStudents":20},{"courses_instructor":"mock, thomas","totalStudents":20},{"courses_instructor":"dooley, kent;frohlich, jiri;hill, john stuart;holmes, daniel;mattman, andre;monsalve, maria victoria;nimmo, michael;pudek, morris;schreiber, william;tomalty, cheryl;vallance, hilary","totalStudents":23},{"courses_instructor":"pudek, morris","totalStudents":21},{"courses_instructor":"holmes, daniel;keown, paul anthony;li, dailin;mattman, andre;pudek, morris;purssell, roy","totalStudents":22},{"courses_instructor":"halstead, anne catherine;holmes, daniel;keown, paul anthony;li, dailin;martz, walter;mattman, andre;pudek, morris;purssell, roy","totalStudents":53},{"courses_instructor":"holmes, daniel;jung, benjamin;keown, paul anthony;li, dailin;nislow, corey;pudek, morris;purssell, roy;xenakis, jennifer","totalStudents":20},{"courses_instructor":"li, dailin","totalStudents":21},{"courses_instructor":"holmes, daniel;keown, paul anthony;li, dailin;martz, walter;mattman, andre;pudek, morris;purssell, roy","totalStudents":23},{"courses_instructor":"godolphin, william","totalStudents":21},{"courses_instructor":"bradley, amanda","totalStudents":46},{"courses_instructor":"bradley, amanda;tai, jenny","totalStudents":20},{"courses_instructor":"bradley, amanda;huynh, hanh;junker, anne kristine;magil, alexander;quandt, jacqueline","totalStudents":59},{"courses_instructor":"bradley, amanda;huynh, hanh;issa, maria;junker, anne kristine;magil, alexander;tai, joseph","totalStudents":79},{"courses_instructor":"tai, joseph","totalStudents":55},{"courses_instructor":"bradley, amanda;huynh, hanh;junker, anne kristine;magil, alexander;quandt, jacqueline;zaph, colby","totalStudents":31},{"courses_instructor":"bryce, elizabeth","totalStudents":112},{"courses_instructor":"bryce, elizabeth;roscoe, diane","totalStudents":117},{"courses_instructor":"bryce, elizabeth;roberts, frederick;roscoe, diane","totalStudents":71},{"courses_instructor":"roberts, frederick","totalStudents":35},{"courses_instructor":"al rawahi, ghada;roberts, frederick;stefanovic, aleksandra","totalStudents":26},{"courses_instructor":"henry, bonnie;naus, monika","totalStudents":71},{"courses_instructor":"naus, monika","totalStudents":58},{"courses_instructor":"naus, monika;patrick, david","totalStudents":28},{"courses_instructor":"lee, anna;myles, nickolas;quandt, jacqueline;walker, david;yip, stephen","totalStudents":17},{"courses_instructor":"quandt, jacqueline","totalStudents":20},{"courses_instructor":"bennewith, kevin;cote, helene;devlin, angela;granville, david;lockwood, william;shah, sohrab;steidl, christian;verchere, bruce;wellington, cheryl lea;weng, andrew","totalStudents":19},{"courses_instructor":"bally, marcel bertran;bennewith, kevin;cote, helene;devlin, angela;rajcan-separovic, evica;shah, sohrab;steidl, christian;verchere, bruce;wellington, cheryl lea;weng, andrew","totalStudents":19},{"courses_instructor":"cote, helene","totalStudents":77},{"courses_instructor":"cote, helene;kalloger, steve ernest;laule, cornelia;lockwood, william;wellington, cheryl lea","totalStudents":24},{"courses_instructor":"bally, marcel bertran","totalStudents":20},{"courses_instructor":"cote, helene;kalloger, steve ernest;wellington, cheryl lea","totalStudents":14},{"courses_instructor":"walker, david","totalStudents":13},{"courses_instructor":"horne, andrew","totalStudents":121},{"courses_instructor":"bernatchez, pascal;horne, andrew;leung, joanne y t;pang, catherine c;shabbits, jennifer anne;warriner, charles brian","totalStudents":55},{"courses_instructor":"bernatchez, pascal;griesdale, donald e;horne, andrew;leung, joanne y t;pang, catherine c;shabbits, jennifer anne","totalStudents":96},{"courses_instructor":"karim, sultan;pang, catherine c","totalStudents":206},{"courses_instructor":"abadi, shirin s.a.;barr, alasdair;godin, david;horne, andrew;leung, joanne y t;pang, catherine c;schwarz, stephan;wright, james","totalStudents":31},{"courses_instructor":"abadi, shirin s.a.;barr, alasdair;horne, andrew;karim, sultan;kurata, harley;pang, catherine c;schwarz, stephan;walker, michael j a;wright, james","totalStudents":37},{"courses_instructor":"fedida, david;horne, andrew;leung, joanne y t;pang, catherine c","totalStudents":22},{"courses_instructor":"fedida, david;horne, andrew;karim, sultan;pang, catherine c;walker, michael j a","totalStudents":26},{"courses_instructor":"shabbits, jennifer anne","totalStudents":579},{"courses_instructor":"abadi, shirin s.a.;hackett, tillie-louise;horne, andrew;laher, ismail;leung, joanne y t;pang, catherine c;shabbits, jennifer anne;warriner, charles brian;wright, james","totalStudents":176},{"courses_instructor":"horne, andrew;shabbits, jennifer anne","totalStudents":125},{"courses_instructor":"abadi, shirin s.a.;hackett, tillie-louise;horne, andrew;laher, ismail;leung, joanne y t;pang, catherine c;shabbits, jennifer anne","totalStudents":208},{"courses_instructor":"bhagavatula, sastry","totalStudents":176},{"courses_instructor":"ansermino, john mark;barr, alasdair;bernatchez, pascal;bhagavatula, sastry;choi, peter tsz lung;etminan, mahyar;griesdale, donald e;hackett, tillie-louise;horne, andrew;laher, ismail;preston, roanne;schwarz, stephan;warriner, charles brian;wright, james","totalStudents":20},{"courses_instructor":"ansermino, john mark;barr, alasdair;bernatchez, pascal;bhagavatula, sastry;choi, peter tsz lung;etminan, mahyar;fedida, david;griesdale, donald e;hackett, tillie-louise;horne, andrew;kurata, harley;laher, ismail;preston, roanne;schwarz, stephan;walker, michael j a;warriner, charles brian;wright, james","totalStudents":21},{"courses_instructor":"karim, sultan;pang, catherine c;walker, michael j a","totalStudents":38},{"courses_instructor":"horne, andrew;karim, sultan;kurata, harley;pang, catherine c;walker, michael j a","totalStudents":4},{"courses_instructor":"mclarnon, james gordon","totalStudents":89},{"courses_instructor":"barr, alasdair;bernatchez, pascal;horne, andrew","totalStudents":20},{"courses_instructor":"barr, alasdair;bernatchez, pascal;horne, andrew;kurata, harley;walker, michael j a","totalStudents":21},{"courses_instructor":"dormuth, colin","totalStudents":14},{"courses_instructor":"walker, michael j a","totalStudents":25},{"courses_instructor":"macleod, bernard a","totalStudents":20},{"courses_instructor":"knight, darryl","totalStudents":10},{"courses_instructor":"godin, david v","totalStudents":1},{"courses_instructor":"zolfi-sistani, fahimeh","totalStudents":226},{"courses_instructor":"brady, colleen;seto, katherine","totalStudents":810},{"courses_instructor":"brady, colleen","totalStudents":384},{"courses_instructor":"brady, colleen;chan, fong;massaro, davide;meghji, ali reza;seto, katherine","totalStudents":210},{"courses_instructor":"riggs, kenneth wayne","totalStudents":681},{"courses_instructor":"ensom, mary;riggs, kenneth wayne","totalStudents":512},{"courses_instructor":"collier, abby;ensom, mary;wong, harvey","totalStudents":234},{"courses_instructor":"wasan, kishor","totalStudents":909},{"courses_instructor":"li, shyh-dar","totalStudents":226},{"courses_instructor":"li, shyh-dar;riggs, kenneth wayne","totalStudents":219},{"courses_instructor":"hafeli, urs;letchford, kevin","totalStudents":662},{"courses_instructor":"burt, helen mary","totalStudents":307},{"courses_instructor":"letchford, kevin","totalStudents":162},{"courses_instructor":"hafeli, urs;li, shyh-dar","totalStudents":216},{"courses_instructor":"reid, ronald","totalStudents":1108},{"courses_instructor":"nislow, corey;reid, ronald","totalStudents":221},{"courses_instructor":"coughtrie, michael;nislow, corey","totalStudents":436},{"courses_instructor":"cairns, brian","totalStudents":1332},{"courses_instructor":"wong, judy","totalStudents":966},{"courses_instructor":"kumar, ujendra;wong, judy","totalStudents":448},{"courses_instructor":"mccormack, james","totalStudents":1097},{"courses_instructor":"mccormack, james;soon, judith","totalStudents":222},{"courses_instructor":"soon, judith","totalStudents":441},{"courses_instructor":"carr, roxane;lalji, fawziah","totalStudents":582},{"courses_instructor":"lalji, fawziah","totalStudents":747},{"courses_instructor":"watson, hilary","totalStudents":3811},{"courses_instructor":"leung, larry;min, jason","totalStudents":929},{"courses_instructor":"eccott, lynda;watson, hilary","totalStudents":462},{"courses_instructor":"marzban, lucy;mccormack, james","totalStudents":156},{"courses_instructor":"tran, linda","totalStudents":654},{"courses_instructor":"klassen, tara","totalStudents":1747},{"courses_instructor":"marzban, lucy","totalStudents":450},{"courses_instructor":"eccott, lynda","totalStudents":1090},{"courses_instructor":"price, ingrid;tran, linda","totalStudents":155},{"courses_instructor":"price, ingrid","totalStudents":443},{"courses_instructor":"*chai, sally;eccott, lynda","totalStudents":151},{"courses_instructor":"price, ingrid;watson, hilary","totalStudents":219},{"courses_instructor":"low, alan","totalStudents":843},{"courses_instructor":"crawford, david robert;fielding, david","totalStudents":291},{"courses_instructor":"kanji, tamiz jamal;seto, katherine","totalStudents":718},{"courses_instructor":"kanji, tamiz jamal","totalStudents":299},{"courses_instructor":"chan, fong;chauvin, vaughn;kanji, tamiz jamal;seto, katherine","totalStudents":211},{"courses_instructor":"seto, katherine","totalStudents":126},{"courses_instructor":"massaro, davide;seto, katherine","totalStudents":94},{"courses_instructor":"massaro, davide","totalStudents":120},{"courses_instructor":"lalji, fawziah;seto, katherine","totalStudents":200},{"courses_instructor":"kent, debra ann","totalStudents":260},{"courses_instructor":"ensom, mary","totalStudents":487},{"courses_instructor":"verma, arun","totalStudents":825},{"courses_instructor":"frankel, adam","totalStudents":576},{"courses_instructor":"bandiera, stelvio","totalStudents":310},{"courses_instructor":"grierson, david","totalStudents":361},{"courses_instructor":"bandiera, stelvio;chen, tim;frankel, adam","totalStudents":210},{"courses_instructor":"bandiera, stelvio;grierson, david;reid, ronald","totalStudents":555},{"courses_instructor":"cairns, brian;levine, marc;soja, peter;verma, arun","totalStudents":19},{"courses_instructor":"cairns, brian;levine, marc;soja, peter","totalStudents":42},{"courses_instructor":"cairns, brian;levine, marc;soja, peter;verma, arun;zed, peter","totalStudents":16},{"courses_instructor":"cairns, brian;verma, arun","totalStudents":17},{"courses_instructor":"macleod, kathleen;rodrigues, brian","totalStudents":785},{"courses_instructor":"macleod, kathleen","totalStudents":293},{"courses_instructor":"rodrigues, brian","totalStudents":149},{"courses_instructor":"soja, peter","totalStudents":1874},{"courses_instructor":"chang, thomas","totalStudents":84},{"courses_instructor":"loewen, peter shane;soon, judith","totalStudents":147},{"courses_instructor":"*jewesson, peter;loewen, peter shane","totalStudents":292},{"courses_instructor":"loewen, peter shane;soon, judith;zed, peter","totalStudents":208},{"courses_instructor":"loewen, peter shane","totalStudents":149},{"courses_instructor":"mccormack, james;soon, judith;zed, peter","totalStudents":220},{"courses_instructor":"levine, marc;virani, adil","totalStudents":717},{"courses_instructor":"levine, marc","totalStudents":579},{"courses_instructor":"carr, roxane;gerber, patricia","totalStudents":145},{"courses_instructor":"gerber, patricia;miller, penelope","totalStudents":442},{"courses_instructor":"carr, roxane;gerber, patricia;miller, penelope","totalStudents":420},{"courses_instructor":"carr, roxane","totalStudents":221},{"courses_instructor":"lynd, larry;marra, carlo","totalStudents":94},{"courses_instructor":"de vera, mary;harrison, mark;lynd, larry","totalStudents":20},{"courses_instructor":"cadario, barbara","totalStudents":147},{"courses_instructor":"cadario, barbara;eccott, lynda","totalStudents":216},{"courses_instructor":"marzban, lucy;soja, peter","totalStudents":150},{"courses_instructor":"klassen, tara;soja, peter","totalStudents":220},{"courses_instructor":"fischer, michelle;park, charles;verma, arun","totalStudents":210},{"courses_instructor":"min, jason;verma, arun","totalStudents":221},{"courses_instructor":"nicholl, tessa","totalStudents":935},{"courses_instructor":"meghji, ali reza;nicholl, tessa","totalStudents":121},{"courses_instructor":"leung, larry;nicholl, tessa","totalStudents":200},{"courses_instructor":"gerber, patricia","totalStudents":24},{"courses_instructor":"hafeli, urs","totalStudents":22},{"courses_instructor":"kumar, ujendra","totalStudents":9},{"courses_instructor":"hafeli, urs;kumar, ujendra","totalStudents":12},{"courses_instructor":"abaci, uygar","totalStudents":211},{"courses_instructor":"simchen, ori","totalStudents":287},{"courses_instructor":"murray, bradley","totalStudents":382},{"courses_instructor":"margolis, eric","totalStudents":941},{"courses_instructor":"edgar, scott","totalStudents":138},{"courses_instructor":"irvine, andrew","totalStudents":1044},{"courses_instructor":"johns, richard","totalStudents":133},{"courses_instructor":"fisher, johnna","totalStudents":76},{"courses_instructor":"kelleher, james","totalStudents":56},{"courses_instructor":"bergeron, vincent;irvine, andrew","totalStudents":61},{"courses_instructor":"matherne, samantha","totalStudents":98},{"courses_instructor":"boxer, karin","totalStudents":75},{"courses_instructor":"kraal, anders;russell, joseph paul","totalStudents":103},{"courses_instructor":"rosales duran, alirio de jesus","totalStudents":33},{"courses_instructor":"kraal, anders","totalStudents":105},{"courses_instructor":"thomas, brian","totalStudents":295},{"courses_instructor":"korolev, alexandre","totalStudents":1066},{"courses_instructor":"stephens, christopher","totalStudents":416},{"courses_instructor":"inkpen, andrew","totalStudents":28},{"courses_instructor":"clarke, roger;margolis, eric;viera, gerardo alberto","totalStudents":101},{"courses_instructor":"davis, taylor thiel","totalStudents":29},{"courses_instructor":"ichikawa, jonathan","totalStudents":96},{"courses_instructor":"hendricks, christina","totalStudents":348},{"courses_instructor":"lucas, michaela","totalStudents":30},{"courses_instructor":"raponi, sandra","totalStudents":54},{"courses_instructor":"tian, jie","totalStudents":38},{"courses_instructor":"deery, oisin","totalStudents":53},{"courses_instructor":"hellewell, jamie","totalStudents":125},{"courses_instructor":"lopes, dominic","totalStudents":305},{"courses_instructor":"berryman, sylvia","totalStudents":109},{"courses_instructor":"guindon, bruno","totalStudents":113},{"courses_instructor":"burkholder, leslie","totalStudents":5144},{"courses_instructor":"jackson, howard;weiss, max","totalStudents":38},{"courses_instructor":"jackson, howard","totalStudents":118},{"courses_instructor":"lukits, stefan","totalStudents":75},{"courses_instructor":"stanev, roger","totalStudents":44},{"courses_instructor":"amitani, yuichi","totalStudents":34},{"courses_instructor":"french, christopher","totalStudents":35},{"courses_instructor":"viera, gerardo alberto","totalStudents":32},{"courses_instructor":"esmaili, emma","totalStudents":34},{"courses_instructor":"yui, kousaku","totalStudents":35},{"courses_instructor":"leder, garson","totalStudents":35},{"courses_instructor":"schouls, peter","totalStudents":208},{"courses_instructor":"anderson, scott allen","totalStudents":373},{"courses_instructor":"fisher, justin","totalStudents":17},{"courses_instructor":"woods, john","totalStudents":4},{"courses_instructor":"ballarin, roberta","totalStudents":6},{"courses_instructor":"albon, simon;cairns, brian;chen, tim;collier, abby;de vera, mary;ensom, mary;frankel, adam;hafeli, urs;li, shyh-dar;lynd, larry;rodrigues, brian;seet, tony;seto, katherine;wong, judy","totalStudents":201},{"courses_instructor":"chan, fong;frankel, adam;lalji, fawziah;massaro, davide;miller, penelope;moshenko, janice lynn;park, charles;seet, tony;watson, hilary;zed, peter","totalStudents":212},{"courses_instructor":"leung, larry","totalStudents":218},{"courses_instructor":"min, jason","totalStudents":218},{"courses_instructor":"scott, alexander","totalStudents":83},{"courses_instructor":"hull, mark;scott, alexander","totalStudents":80},{"courses_instructor":"greig, alison","totalStudents":82},{"courses_instructor":"murphy, susan","totalStudents":80},{"courses_instructor":"terlicher, nadine","totalStudents":163},{"courses_instructor":"campbell, kristin;eng, janice;scott, alexander;virji-babul, naznin","totalStudents":80},{"courses_instructor":"campbell, kristin;eng, janice;hunt, michael anthony;scott, alexander;virji-babul, naznin","totalStudents":78},{"courses_instructor":"camp, patricia","totalStudents":80},{"courses_instructor":"gruenig, simone","totalStudents":159},{"courses_instructor":"rankin, anne","totalStudents":81},{"courses_instructor":"klassen, tara;sauve, karen;zwicker, jill","totalStudents":78},{"courses_instructor":"klassen, tara;sauve, karen","totalStudents":82},{"courses_instructor":"tovar, mayra","totalStudents":932},{"courses_instructor":"pavan, marcello","totalStudents":460},{"courses_instructor":"reinsberg, stefan","totalStudents":540},{"courses_instructor":"rieger, georg","totalStudents":2351},{"courses_instructor":"koster, evert;rieger, georg","totalStudents":405},{"courses_instructor":"koster, evert;pavan, marcello;rieger, georg","totalStudents":231},{"courses_instructor":"koster, evert;reinsberg, stefan;rieger, georg","totalStudents":236},{"courses_instructor":"rieger, georg;zhou, fei","totalStudents":207},{"courses_instructor":"reinsberg, stefan;rieger, georg","totalStudents":735},{"courses_instructor":"kotlicki, andrzej;rieger, georg","totalStudents":196},{"courses_instructor":"kotlicki, andrzej;zhou, fei","totalStudents":207},{"courses_instructor":"kotlicki, andrzej","totalStudents":1446},{"courses_instructor":"carolan, james;rieger, georg","totalStudents":254},{"courses_instructor":"carolan, james;rieger, georg;zhou, fei","totalStudents":224},{"courses_instructor":"carolan, james;rieger, georg;tchvialeva, lioudmila","totalStudents":256},{"courses_instructor":"pavan, marcello;rieger, georg","totalStudents":467},{"courses_instructor":"iqbal, javed","totalStudents":1642},{"courses_instructor":"milner, valery","totalStudents":1252},{"courses_instructor":"mackay, alexander","totalStudents":1252},{"courses_instructor":"rottler, joerg","totalStudents":843},{"courses_instructor":"stang, jared;strubbe, linda","totalStudents":251},{"courses_instructor":"lister, alison","totalStudents":449},{"courses_instructor":"bates, frances;iqbal, javed;milner, valery","totalStudents":223},{"courses_instructor":"bates, frances;lister, alison;milner, valery","totalStudents":212},{"courses_instructor":"bates, frances;milner, valery","totalStudents":212},{"courses_instructor":"bates, frances;mackay, alexander;milner, valery","totalStudents":147},{"courses_instructor":"bates, simon;charbonneau, arthur;ives, joss;koster, evert;kotlicki, andrzej","totalStudents":703},{"courses_instructor":"folk, joshua","totalStudents":1473},{"courses_instructor":"bates, frances","totalStudents":2099},{"courses_instructor":"eldridge, john e","totalStudents":997},{"courses_instructor":"turrell, brian g","totalStudents":523},{"courses_instructor":"rieger, georg;turrell, brian g","totalStudents":213},{"courses_instructor":"bates, simon;lister, alison;rieger, georg","totalStudents":243},{"courses_instructor":"heiner, cynthia","totalStudents":201},{"courses_instructor":"ives, joss","totalStudents":568},{"courses_instructor":"bates, simon;rottler, joerg","totalStudents":259},{"courses_instructor":"bates, frances;plotkin, steven","totalStudents":340},{"courses_instructor":"bates, frances;sossi, vesna","totalStudents":207},{"courses_instructor":"charbonneau, arthur","totalStudents":470},{"courses_instructor":"axen, david a","totalStudents":138},{"courses_instructor":"mckenna, janis","totalStudents":898},{"courses_instructor":"charbonneau, arthur;koster, evert","totalStudents":127},{"courses_instructor":"tchvialeva, lioudmila","totalStudents":174},{"courses_instructor":"stang, jared","totalStudents":450},{"courses_instructor":"rostamzadeh renani, fatemeh","totalStudents":434},{"courses_instructor":"rieger, georg;sossi, vesna","totalStudents":113},{"courses_instructor":"hoffman, jennifer","totalStudents":91},{"courses_instructor":"affleck, ian keith;bonn, douglas andrew","totalStudents":442},{"courses_instructor":"vogt, erich","totalStudents":142},{"courses_instructor":"affleck, ian keith","totalStudents":164},{"courses_instructor":"zhitnitsky, ariel","totalStudents":833},{"courses_instructor":"bonn, douglas andrew","totalStudents":538},{"courses_instructor":"bates, simon;michal, carl","totalStudents":191},{"courses_instructor":"strubbe, linda","totalStudents":92},{"courses_instructor":"witt, donald","totalStudents":570},{"courses_instructor":"mccutcheon, william","totalStudents":609},{"courses_instructor":"hasinoff, michael;witt, donald","totalStudents":51},{"courses_instructor":"hasinoff, michael","totalStudents":523},{"courses_instructor":"plotkin, steven;witt, donald","totalStudents":223},{"courses_instructor":"plotkin, steven","totalStudents":303},{"courses_instructor":"stotyn, sean","totalStudents":252},{"courses_instructor":"unruh, william","totalStudents":392},{"courses_instructor":"karczmarek, joanna","totalStudents":874},{"courses_instructor":"young, jeff","totalStudents":145},{"courses_instructor":"mcmillan, j malcolm","totalStudents":1369},{"courses_instructor":"charbonneau, arthur;mattison, thomas","totalStudents":255},{"courses_instructor":"mattison, thomas","totalStudents":530},{"courses_instructor":"mcmillan, j malcolm;semenoff, gordon walter","totalStudents":2060},{"courses_instructor":"semenoff, gordon walter","totalStudents":930},{"courses_instructor":"mattison, thomas;semenoff, gordon walter","totalStudents":264},{"courses_instructor":"mcmillan, j malcolm;semenoff, gordon walter;turrell, brian g","totalStudents":575},{"courses_instructor":"van raamsdonk, mark","totalStudents":344},{"courses_instructor":"louis-martinez, domingo","totalStudents":554},{"courses_instructor":"sorkin, evgeny","totalStudents":81},{"courses_instructor":"choptuik, matthew","totalStudents":219},{"courses_instructor":"brewer, jess","totalStudents":61},{"courses_instructor":"rozali, moshe","totalStudents":580},{"courses_instructor":"schleich, kristin","totalStudents":707},{"courses_instructor":"bryman, douglas","totalStudents":633},{"courses_instructor":"franz, marcel","totalStudents":217},{"courses_instructor":"damascelli, andrea","totalStudents":326},{"courses_instructor":"madison, kirk","totalStudents":421},{"courses_instructor":"hansen, carl","totalStudents":119},{"courses_instructor":"stamp, philip c","totalStudents":106},{"courses_instructor":"gladman, brett;louis-martinez, domingo","totalStudents":52},{"courses_instructor":"berciu, mona","totalStudents":208},{"courses_instructor":"curzon, francis l","totalStudents":35},{"courses_instructor":"tanaka, hirohisa","totalStudents":41},{"courses_instructor":"gay, colin","totalStudents":53},{"courses_instructor":"zhou, fei","totalStudents":207},{"courses_instructor":"bergman, alanah;macmillan, erin;tanguay, jesse;tchvialeva, lioudmila;thakur, yogesh;xiang, qing-san","totalStudents":28},{"courses_instructor":"mackay, alexander;tchvialeva, lioudmila;walker, matthew;xiang, qing-san","totalStudents":22},{"courses_instructor":"bjarnason, thor;kozlowski, piotr;lee, richard;mackay, alexander;tchvialeva, lioudmila;thakur, yogesh;walker, matthew","totalStudents":35},{"courses_instructor":"aldrich, john;celler, anna;duzenli, cheryl;mackay, alexander;tchvialeva, lioudmila;xiang, qing-san","totalStudents":128},{"courses_instructor":"kozlowski, piotr;mackay, alexander;tanguay, jesse;tchvialeva, lioudmila;thakur, yogesh","totalStudents":18},{"courses_instructor":"korbelik, mladen;minchinton, andrew;moiseenko, vitali;reinsberg, stefan","totalStudents":120},{"courses_instructor":"korbelik, mladen;minchinton, andrew;moiseenko, vitali;reinsberg, stefan;smith, craig","totalStudents":24},{"courses_instructor":"deslauriers, louis;madison, kirk","totalStudents":70},{"courses_instructor":"hasinoff, michael;kiefl, robert","totalStudents":28},{"courses_instructor":"iqbal, javed;kruecken, reiner","totalStudents":46},{"courses_instructor":"iqbal, javed;measday, david","totalStudents":222},{"courses_instructor":"raussendorf, robert","totalStudents":177},{"courses_instructor":"sawatzky, george albert","totalStudents":17},{"courses_instructor":"schwenk, achim","totalStudents":12},{"courses_instructor":"yen, stanley","totalStudents":11},{"courses_instructor":"bacca, sonia;yen, stanley","totalStudents":14},{"courses_instructor":"ng, john","totalStudents":5},{"courses_instructor":"morrissey, david","totalStudents":29},{"courses_instructor":"baillie, alistair","totalStudents":19},{"courses_instructor":"araujo, cynthia;baillie, alistair;beckham, wayne;zavgorodni, sergei","totalStudents":14},{"courses_instructor":"baillie, alistair;beckham, wayne","totalStudents":7},{"courses_instructor":"baillie, alistair;beckham, wayne;duzenli, cheryl;milette, marie pierre","totalStudents":4},{"courses_instructor":"spadinger, ingrid","totalStudents":22},{"courses_instructor":"duzenli, cheryl","totalStudents":20},{"courses_instructor":"duzenli, cheryl;gete, ermias;petric, martin","totalStudents":5},{"courses_instructor":"duzenli, cheryl;gete, ermias;otto, karl","totalStudents":13},{"courses_instructor":"duzenli, cheryl;moiseenko, vitali;reinsberg, stefan","totalStudents":6},{"courses_instructor":"duzenli, cheryl;popescu, tony","totalStudents":5},{"courses_instructor":"bjarnason, thor;kozlowski, piotr;tanguay, jesse","totalStudents":17},{"courses_instructor":"bjarnason, thor;kozlowski, piotr;walker, matthew","totalStudents":11},{"courses_instructor":"kozlowski, piotr;walker, matthew","totalStudents":6},{"courses_instructor":"kozlowski, piotr","totalStudents":46},{"courses_instructor":"celler, anna","totalStudents":35},{"courses_instructor":"zeng, haishan","totalStudents":37},{"courses_instructor":"mackay, alexander;schulzer, michael","totalStudents":17},{"courses_instructor":"merminga, nikolitsa","totalStudents":7},{"courses_instructor":"kruecken, reiner","totalStudents":17},{"courses_instructor":"bonn, douglas andrew;burke, sarah;damascelli, andrea;folk, joshua","totalStudents":4},{"courses_instructor":"bonn, douglas andrew;burke, sarah;damascelli, andrea;young, jeff","totalStudents":6},{"courses_instructor":"hutton, thomas","totalStudents":153},{"courses_instructor":"ugarte-urzua, magdalena","totalStudents":65},{"courses_instructor":"thomas, reena;white, james t","totalStudents":28},{"courses_instructor":"barr, victoria;church, sarah","totalStudents":61},{"courses_instructor":"leaf, michael","totalStudents":31},{"courses_instructor":"sandercock, leonie","totalStudents":34},{"courses_instructor":"hutton, thomas;leaf, michael","totalStudents":34},{"courses_instructor":"honey-roses, jordi","totalStudents":74},{"courses_instructor":"dhall, ruchir","totalStudents":12},{"courses_instructor":"senbel, maged","totalStudents":36},{"courses_instructor":"ramlo, andrew","totalStudents":34},{"courses_instructor":"chang, stephanie","totalStudents":48},{"courses_instructor":"angeles, leonora;gurstein, penelope","totalStudents":29},{"courses_instructor":"buholzer, william","totalStudents":34},{"courses_instructor":"mcdaniels, timothy","totalStudents":76},{"courses_instructor":"beasley, larry","totalStudents":92},{"courses_instructor":"wollenberg, jay","totalStudents":167},{"courses_instructor":"frank, lawrence","totalStudents":78},{"courses_instructor":"lamontagne, neal","totalStudents":19},{"courses_instructor":"sutherland, jessie","totalStudents":11},{"courses_instructor":"dorcey, anthony h j","totalStudents":39},{"courses_instructor":"erfan, aftab","totalStudents":52},{"courses_instructor":"friedmann, john;sandercock, leonie","totalStudents":11},{"courses_instructor":"friedmann, john","totalStudents":29},{"courses_instructor":"gagnon, jennifer","totalStudents":764},{"courses_instructor":"drugge, daniel","totalStudents":650},{"courses_instructor":"baum, bruce","totalStudents":658},{"courses_instructor":"arneil, barbara","totalStudents":1096},{"courses_instructor":"erickson, chris","totalStudents":4397},{"courses_instructor":"peterson, jenny","totalStudents":782},{"courses_instructor":"praud, jocelyne","totalStudents":90},{"courses_instructor":"afsahi, afsoun","totalStudents":57},{"courses_instructor":"belfry munroe, kaija","totalStudents":51},{"courses_instructor":"baier, gerald","totalStudents":2316},{"courses_instructor":"kopas, paul","totalStudents":1232},{"courses_instructor":"craigie, allan","totalStudents":1222},{"courses_instructor":"mcgovern, clare","totalStudents":100},{"courses_instructor":"loewen, peter","totalStudents":54},{"courses_instructor":"kam, christopher","totalStudents":506},{"courses_instructor":"westlake, daniel","totalStudents":52},{"courses_instructor":"banack, clark","totalStudents":41},{"courses_instructor":"jacobs, alan michael","totalStudents":593},{"courses_instructor":"bohlken, anjali","totalStudents":388},{"courses_instructor":"lore, grace","totalStudents":187},{"courses_instructor":"schwartz, elizabeth","totalStudents":56},{"courses_instructor":"goenaga orrego, agustin","totalStudents":245},{"courses_instructor":"kniazeva, olga","totalStudents":101},{"courses_instructor":"ellermann, antje","totalStudents":524},{"courses_instructor":"allen, nathan","totalStudents":144},{"courses_instructor":"boothe, katherine anne","totalStudents":277},{"courses_instructor":"nemoto, kuniaki","totalStudents":215},{"courses_instructor":"turan, serbulent","totalStudents":105},{"courses_instructor":"pemberton, sarah","totalStudents":53},{"courses_instructor":"beausoleil, emily","totalStudents":225},{"courses_instructor":"farkasch, robert","totalStudents":2599},{"courses_instructor":"chowdhury, arjun","totalStudents":746},{"courses_instructor":"feditchkina, elena","totalStudents":97},{"courses_instructor":"price, richard","totalStudents":609},{"courses_instructor":"leclerc-gagne, elise","totalStudents":45},{"courses_instructor":"poole, avery dorothy","totalStudents":65},{"courses_instructor":"fitzsimmons, scott","totalStudents":146},{"courses_instructor":"cohen, michael david","totalStudents":32},{"courses_instructor":"hecht, catherine","totalStudents":43},{"courses_instructor":"resnick, philip","totalStudents":155},{"courses_instructor":"la selva, samuel","totalStudents":346},{"courses_instructor":"huebner, kurt","totalStudents":376},{"courses_instructor":"biebricher, thomas","totalStudents":60},{"courses_instructor":"cameron, maxwell","totalStudents":358},{"courses_instructor":"tockman, jason","totalStudents":47},{"courses_instructor":"pacheco-vega, hector r","totalStudents":128},{"courses_instructor":"sundstrom, lisa","totalStudents":201},{"courses_instructor":"harrison, kathryn","totalStudents":101},{"courses_instructor":"barros leal farias, deborah","totalStudents":96},{"courses_instructor":"li, xiaojun","totalStudents":144},{"courses_instructor":"o'mahony, angela","totalStudents":225},{"courses_instructor":"owen, andrew","totalStudents":870},{"courses_instructor":"cutler, frederick","totalStudents":839},{"courses_instructor":"warren, mark","totalStudents":12},{"courses_instructor":"nyblade, ben","totalStudents":30},{"courses_instructor":"baines, erin;job, brian","totalStudents":40},{"courses_instructor":"job, brian","totalStudents":15},{"courses_instructor":"baines, erin","totalStudents":18},{"courses_instructor":"johnston, richard g","totalStudents":50},{"courses_instructor":"karwowska, bozena","totalStudents":173},{"courses_instructor":"kudzia, helena","totalStudents":16},{"courses_instructor":"barreto, jamille","totalStudents":514},{"courses_instructor":"henriques, alexandra","totalStudents":32},{"courses_instructor":"dos santos, pedro","totalStudents":16},{"courses_instructor":"santos, alessandra","totalStudents":18},{"courses_instructor":"hamilton, kevin","totalStudents":1796},{"courses_instructor":"sinnett, scott","totalStudents":244},{"courses_instructor":"rankin, catharine","totalStudents":2687},{"courses_instructor":"graf, peter","totalStudents":2439},{"courses_instructor":"souza, michael","totalStudents":5747},{"courses_instructor":"dukewich, kristie","totalStudents":1062},{"courses_instructor":"rawn, catherine","totalStudents":4310},{"courses_instructor":"fokidis, h. bobby","totalStudents":301},{"courses_instructor":"gorzalka, boris","totalStudents":861},{"courses_instructor":"lam, mark","totalStudents":650},{"courses_instructor":"fergusson, janel","totalStudents":502},{"courses_instructor":"clark, luke","totalStudents":820},{"courses_instructor":"fergusson, janel lynn","totalStudents":807},{"courses_instructor":"assanand, sunaina;souza, michael","totalStudents":230},{"courses_instructor":"wehr, paul","totalStudents":2412},{"courses_instructor":"paulhus, delroy","totalStudents":3713},{"courses_instructor":"schmader, tanya","totalStudents":2523},{"courses_instructor":"christie, stella","totalStudents":657},{"courses_instructor":"klonsky, elisha","totalStudents":2016},{"courses_instructor":"barnes, steven","totalStudents":1389},{"courses_instructor":"hewitt, paul","totalStudents":580},{"courses_instructor":"lolliot, simon","totalStudents":642},{"courses_instructor":"odic, darko","totalStudents":863},{"courses_instructor":"barnes, steven;lam, mark","totalStudents":254},{"courses_instructor":"hyman, james","totalStudents":525},{"courses_instructor":"wilson, wendy l.","totalStudents":677},{"courses_instructor":"christoff, kalina","totalStudents":203},{"courses_instructor":"vittoz, nicole marie","totalStudents":138},{"courses_instructor":"worling, david","totalStudents":176},{"courses_instructor":"perrino, andrea","totalStudents":1341},{"courses_instructor":"veale, jaimie","totalStudents":91},{"courses_instructor":"gervais, will martin","totalStudents":176},{"courses_instructor":"savalei, victoria","totalStudents":1031},{"courses_instructor":"cuttler, carrie","totalStudents":793},{"courses_instructor":"pinel, john","totalStudents":94},{"courses_instructor":"mikami, amori","totalStudents":251},{"courses_instructor":"st. onge, jennifer","totalStudents":53},{"courses_instructor":"brenner, colleen","totalStudents":342},{"courses_instructor":"brcic, jelena","totalStudents":263},{"courses_instructor":"whitwell, robert","totalStudents":88},{"courses_instructor":"marchak, kristan","totalStudents":128},{"courses_instructor":"lanthier, sophie","totalStudents":168},{"courses_instructor":"todd, rebecca","totalStudents":177},{"courses_instructor":"croft, alyssa","totalStudents":34},{"courses_instructor":"cheung, benjamin","totalStudents":86},{"courses_instructor":"blasberg, jonathan s","totalStudents":28},{"courses_instructor":"scratchley, linda","totalStudents":1593},{"courses_instructor":"wilkie, donald","totalStudents":67},{"courses_instructor":"hall, david geoffrey","totalStudents":1169},{"courses_instructor":"krigolson, olav","totalStudents":322},{"courses_instructor":"hamson, dwayne","totalStudents":838},{"courses_instructor":"chen, frances","totalStudents":332},{"courses_instructor":"biesanz, jeremy","totalStudents":338},{"courses_instructor":"christoff, kalina;gorzalka, boris","totalStudents":89},{"courses_instructor":"soma, kiran","totalStudents":74},{"courses_instructor":"newitt, christopher","totalStudents":488},{"courses_instructor":"werker, janet","totalStudents":553},{"courses_instructor":"hamlin, jane","totalStudents":936},{"courses_instructor":"foroud, afra","totalStudents":93},{"courses_instructor":"birch, susan","totalStudents":1329},{"courses_instructor":"abelev, maxim","totalStudents":334},{"courses_instructor":"ma, lili","totalStudents":353},{"courses_instructor":"weikum, whitney","totalStudents":79},{"courses_instructor":"arasanipalai kandhad, padmapri","totalStudents":191},{"courses_instructor":"wojcik, erica","totalStudents":124},{"courses_instructor":"li, vivian","totalStudents":159},{"courses_instructor":"gervain, judit","totalStudents":71},{"courses_instructor":"may, lillian","totalStudents":1126},{"courses_instructor":"zhao, wanying","totalStudents":202},{"courses_instructor":"kuhlmeier, valerie","totalStudents":171},{"courses_instructor":"bingham, brenda","totalStudents":69},{"courses_instructor":"winstanley, catharine","totalStudents":949},{"courses_instructor":"hellemans, kim","totalStudents":151},{"courses_instructor":"coury, ariane","totalStudents":312},{"courses_instructor":"christie, brian;gorzalka, boris","totalStudents":31},{"courses_instructor":"comeau, wendy","totalStudents":497},{"courses_instructor":"assanand, sunaina","totalStudents":2964},{"courses_instructor":"hanson, laura","totalStudents":46},{"courses_instructor":"lee, tiffany","totalStudents":65},{"courses_instructor":"gorzalka, boris;hanson, laura","totalStudents":43},{"courses_instructor":"heine, steven","totalStudents":3324},{"courses_instructor":"randles, daniel","totalStudents":39},{"courses_instructor":"martens, jason","totalStudents":429},{"courses_instructor":"mcnamara, rita","totalStudents":82},{"courses_instructor":"willard, aiyana","totalStudents":189},{"courses_instructor":"de longis, anita","totalStudents":3633},{"courses_instructor":"preece, melady","totalStudents":431},{"courses_instructor":"hoppmann, christiane","totalStudents":880},{"courses_instructor":"chen, edith","totalStudents":195},{"courses_instructor":"vodermaier, andrea","totalStudents":129},{"courses_instructor":"king, david","totalStudents":1211},{"courses_instructor":"pomaki, georgia","totalStudents":106},{"courses_instructor":"king, mary ann","totalStudents":1022},{"courses_instructor":"baron, andrew","totalStudents":1301},{"courses_instructor":"brosseau-liard, patricia","totalStudents":201},{"courses_instructor":"najarian, bahman","totalStudents":76},{"courses_instructor":"danielson, donald","totalStudents":220},{"courses_instructor":"frimer, jeremy","totalStudents":132},{"courses_instructor":"walker, lawrence john","totalStudents":623},{"courses_instructor":"dunlop, will","totalStudents":288},{"courses_instructor":"mcfarlane, jessica","totalStudents":409},{"courses_instructor":"assanand, sunaina;king, david","totalStudents":162},{"courses_instructor":"zhao, jiaying","totalStudents":290},{"courses_instructor":"macbeth, tannis","totalStudents":180},{"courses_instructor":"thomas, lindsey anne","totalStudents":506},{"courses_instructor":"dutton, donald","totalStudents":1678},{"courses_instructor":"desmarais, sarah","totalStudents":146},{"courses_instructor":"schooler, jonathan","totalStudents":191},{"courses_instructor":"eich, eric","totalStudents":193},{"courses_instructor":"belardetti, francesco","totalStudents":526},{"courses_instructor":"fais, laurel","totalStudents":573},{"courses_instructor":"woody, sheila","totalStudents":77},{"courses_instructor":"schaller, mark","totalStudents":429},{"courses_instructor":"hakstian, arthur","totalStudents":61},{"courses_instructor":"christie, brian","totalStudents":5},{"courses_instructor":"snyder, jason","totalStudents":107},{"courses_instructor":"hamson, dwayne;snyder, jason","totalStudents":54},{"courses_instructor":"martens, kristina","totalStudents":148},{"courses_instructor":"kingstone, alan forbes","totalStudents":179},{"courses_instructor":"enns, james","totalStudents":200},{"courses_instructor":"giaschi, deborah","totalStudents":1777},{"courses_instructor":"pai-spering, miriam","totalStudents":130},{"courses_instructor":"oruc, ipek","totalStudents":42},{"courses_instructor":"johnston, charlotte","totalStudents":439},{"courses_instructor":"linden, wolfgang","totalStudents":97},{"courses_instructor":"norenzayan, ara","totalStudents":138},{"courses_instructor":"handy, todd","totalStudents":178},{"courses_instructor":"galea, liisa ann margaret","totalStudents":306},{"courses_instructor":"duarte guterman, paula","totalStudents":42},{"courses_instructor":"brummelte, susanne","totalStudents":60},{"courses_instructor":"barha, cindy","totalStudents":33},{"courses_instructor":"wainwright, steven","totalStudents":51},{"courses_instructor":"hill, matthew","totalStudents":38},{"courses_instructor":"floresco, stanley bogdan","totalStudents":172},{"courses_instructor":"carlson, scott","totalStudents":10},{"courses_instructor":"heaven, roberta","totalStudents":4},{"courses_instructor":"wagner, john","totalStudents":8},{"courses_instructor":"klonsky, elisha;mcgee, brandy","totalStudents":5},{"courses_instructor":"mcgee, brandy","totalStudents":45},{"courses_instructor":"sochting, ingrid","totalStudents":16},{"courses_instructor":"nader, rami","totalStudents":5},{"courses_instructor":"alden, lynn","totalStudents":28},{"courses_instructor":"binning, sadhu","totalStudents":63},{"courses_instructor":"arbel, vita daphne","totalStudents":207},{"courses_instructor":"glessner, justin","totalStudents":193},{"courses_instructor":"kaplan, laura duhan","totalStudents":72},{"courses_instructor":"pearson, brook","totalStudents":111},{"courses_instructor":"nickel, gordon","totalStudents":51},{"courses_instructor":"neufeld, dietmar","totalStudents":93},{"courses_instructor":"burns, paul","totalStudents":194},{"courses_instructor":"maier, harold","totalStudents":17},{"courses_instructor":"gaertner, tara","totalStudents":101},{"courses_instructor":"dawes, diana;suto, melinda","totalStudents":10},{"courses_instructor":"campbell, kristin;nimmon, laura","totalStudents":14},{"courses_instructor":"mortenson, patricia","totalStudents":7},{"courses_instructor":"davidson, katherine","totalStudents":8},{"courses_instructor":"mortenson, william","totalStudents":13},{"courses_instructor":"davidson, katherine;mortenson, patricia","totalStudents":8},{"courses_instructor":"jongbloed, lyn","totalStudents":54},{"courses_instructor":"holsti, liisa;virji-babul, naznin","totalStudents":35},{"courses_instructor":"faulkner, clare","totalStudents":9},{"courses_instructor":"wray, eleanor","totalStudents":7},{"courses_instructor":"jelley, wilma","totalStudents":13},{"courses_instructor":"duran, leslie","totalStudents":13},{"courses_instructor":"barbic, skye","totalStudents":24},{"courses_instructor":"beach, cheryl;duran, leslie","totalStudents":11},{"courses_instructor":"erlendson, patricia","totalStudents":28},{"courses_instructor":"hurtubise, karen","totalStudents":10},{"courses_instructor":"toal-sullivan, darene","totalStudents":15},{"courses_instructor":"harris, leila;robinson, john","totalStudents":18},{"courses_instructor":"robinson, john;satterfield, theresa","totalStudents":16},{"courses_instructor":"kandlikar, milind;satterfield, theresa","totalStudents":28},{"courses_instructor":"dowlatabadi, hadi;satterfield, theresa","totalStudents":10},{"courses_instructor":"kandlikar, milind;oberg, gunilla","totalStudents":22},{"courses_instructor":"oberg, gunilla","totalStudents":9},{"courses_instructor":"dowlatabadi, hadi","totalStudents":84},{"courses_instructor":"oberg, gunilla;zerriffi, hisham","totalStudents":11},{"courses_instructor":"wittman, hannah","totalStudents":28},{"courses_instructor":"hagerman, shannon marie;satterfield, theresa","totalStudents":11},{"courses_instructor":"chan, kai;satterfield, theresa","totalStudents":17},{"courses_instructor":"harris, leila;johnson, mark","totalStudents":17},{"courses_instructor":"brown, sandra;schreier, hanspeter","totalStudents":74},{"courses_instructor":"schreier, hanspeter","totalStudents":201},{"courses_instructor":"wilson, julie","totalStudents":39},{"courses_instructor":"cohen, stewart","totalStudents":6},{"courses_instructor":"satterfield, theresa","totalStudents":14},{"courses_instructor":"ansa goicoechea, elixabete","totalStudents":168},{"courses_instructor":"backman, catherine","totalStudents":53},{"courses_instructor":"lee, michael","totalStudents":153},{"courses_instructor":"drynan, donna","totalStudents":352},{"courses_instructor":"forwell, susan","totalStudents":201},{"courses_instructor":"suto, melinda;zwicker, jill","totalStudents":52},{"courses_instructor":"holsti, liisa;suto, melinda","totalStudents":101},{"courses_instructor":"jarus, tal","totalStudents":96},{"courses_instructor":"rozanova, yulia","totalStudents":47},{"courses_instructor":"chitnev, veta","totalStudents":274},{"courses_instructor":"habajova, irina","totalStudents":124},{"courses_instructor":"wodzynski, lukasz","totalStudents":47},{"courses_instructor":"yusupova, stella","totalStudents":4},{"courses_instructor":"polissky, olena","totalStudents":120},{"courses_instructor":"petro, peter","totalStudents":455},{"courses_instructor":"bowers, katherine","totalStudents":24},{"courses_instructor":"karlstrom, lena","totalStudents":455},{"courses_instructor":"fox, joanne alison;han, andrea;waltham, christopher","totalStudents":49},{"courses_instructor":"berger, james;fox, joanne alison;han, andrea","totalStudents":64},{"courses_instructor":"fox, joanne alison;han, andrea;lim, chinten james","totalStudents":20},{"courses_instructor":"de wreede, robert;fox, joanne alison;han, andrea","totalStudents":64},{"courses_instructor":"fox, joanne alison;han, andrea","totalStudents":76},{"courses_instructor":"bole, gregory michael;fox, joanne alison;han, andrea","totalStudents":48},{"courses_instructor":"fox, joanne alison;han, andrea;knorr, edwin max","totalStudents":50},{"courses_instructor":"cheung, wai lung;fox, joanne alison;han, andrea","totalStudents":27},{"courses_instructor":"fox, joanne alison;han, andrea;harris, sara","totalStudents":24},{"courses_instructor":"fox, joanne alison;han, andrea;pai, dinesh","totalStudents":46},{"courses_instructor":"fox, joanne alison;han, andrea;steyn, douw gerbrand","totalStudents":18},{"courses_instructor":"fox, joanne alison;han, andrea;sherman, john","totalStudents":17},{"courses_instructor":"fox, joanne alison;han, andrea;oberg, gunilla","totalStudents":25},{"courses_instructor":"fox, joanne alison;han, andrea;samuels, anne lacey","totalStudents":50},{"courses_instructor":"fox, joanne alison;han, andrea;vatsal, vinayak","totalStudents":48},{"courses_instructor":"fox, joanne alison;han, andrea;ng, david","totalStudents":42},{"courses_instructor":"berger, james;steyn, douw gerbrand","totalStudents":51},{"courses_instructor":"steyn, douw gerbrand;waltham, christopher","totalStudents":25},{"courses_instructor":"murphy, michael;steyn, douw gerbrand","totalStudents":26},{"courses_instructor":"knorr, edwin max;steyn, douw gerbrand","totalStudents":53},{"courses_instructor":"bole, gregory michael;steyn, douw gerbrand","totalStudents":26},{"courses_instructor":"leander, celeste;steyn, douw gerbrand","totalStudents":56},{"courses_instructor":"cheung, wai lung;steyn, douw gerbrand","totalStudents":45},{"courses_instructor":"ives, joss;steyn, douw gerbrand","totalStudents":25},{"courses_instructor":"steyn, douw gerbrand;vatsal, vinayak","totalStudents":21},{"courses_instructor":"sherman, john;steyn, douw gerbrand","totalStudents":73},{"courses_instructor":"carolan, james;steyn, douw gerbrand","totalStudents":50},{"courses_instructor":"oberg, gunilla;steyn, douw gerbrand","totalStudents":76},{"courses_instructor":"srivastava, krishnan;steyn, douw gerbrand","totalStudents":23},{"courses_instructor":"fox, joanne alison;hoos, holger;samuels, anne lacey","totalStudents":24},{"courses_instructor":"fox, joanne alison;peacock, simon;samuels, anne lacey","totalStudents":24},{"courses_instructor":"fox, joanne alison;samuels, anne lacey","totalStudents":51},{"courses_instructor":"de wreede, robert;fox, joanne alison;samuels, anne lacey","totalStudents":21},{"courses_instructor":"berger, james;fox, joanne alison;samuels, anne lacey","totalStudents":24},{"courses_instructor":"fox, joanne alison;ng, david;samuels, anne lacey","totalStudents":23},{"courses_instructor":"fox, joanne alison;hallam, steven;samuels, anne lacey","totalStudents":23},{"courses_instructor":"matsuuchi, linda;steyn, douw gerbrand","totalStudents":18},{"courses_instructor":"rosado rey, abel;steyn, douw gerbrand","totalStudents":27},{"courses_instructor":"adamson, martin;steyn, douw gerbrand","totalStudents":25},{"courses_instructor":"steyn, douw gerbrand;welch, william","totalStudents":23},{"courses_instructor":"graves, marcia;steyn, douw gerbrand","totalStudents":22},{"courses_instructor":"plotkin, steven;steyn, douw gerbrand","totalStudents":17},{"courses_instructor":"feng, james jingtao;steyn, douw gerbrand","totalStudents":26},{"courses_instructor":"oberg, gunilla;rosado rey, abel","totalStudents":25},{"courses_instructor":"matsuuchi, linda;oberg, gunilla","totalStudents":24},{"courses_instructor":"booth, kellogg;oberg, gunilla","totalStudents":23},{"courses_instructor":"johnson, mark;oberg, gunilla","totalStudents":23},{"courses_instructor":"berger, james;oberg, gunilla","totalStudents":24},{"courses_instructor":"carolan, james;oberg, gunilla","totalStudents":23},{"courses_instructor":"oberg, gunilla;sherman, john","totalStudents":27},{"courses_instructor":"maxwell, jane","totalStudents":23},{"courses_instructor":"jandciu, eric","totalStudents":25},{"courses_instructor":"welsh, ashley","totalStudents":25},{"courses_instructor":"fox, joanne alison;welsh, ashley","totalStudents":16},{"courses_instructor":"fox, joanne alison;gaynor, erin;han, andrea","totalStudents":15},{"courses_instructor":"fox, joanne alison;han, andrea;lekhi, priya","totalStudents":26},{"courses_instructor":"fox, joanne alison;han, andrea;welch, william","totalStudents":20},{"courses_instructor":"jandciu, eric;stewart, jaclyn;stoodley, robin","totalStudents":38},{"courses_instructor":"graham, sean;jandciu, eric;stewart, jaclyn","totalStudents":23},{"courses_instructor":"burkett, craig;jandciu, eric;stewart, jaclyn","totalStudents":44},{"courses_instructor":"jandciu, eric;jetter, reinhard;stewart, jaclyn","totalStudents":82},{"courses_instructor":"jandciu, eric;stewart, jaclyn;trites, andrew","totalStudents":24},{"courses_instructor":"grant, edward;jandciu, eric;stewart, jaclyn;stoodley, robin","totalStudents":12},{"courses_instructor":"jandciu, eric;stewart, jaclyn;stoodley, robin;veen, thor","totalStudents":17},{"courses_instructor":"jandciu, eric;stewart, jaclyn;trites, andrew;veen, thor","totalStudents":32},{"courses_instructor":"dunham, bruce;jandciu, eric;trites, andrew","totalStudents":26},{"courses_instructor":"graham, sean;stoodley, robin","totalStudents":24},{"courses_instructor":"grant, edward;stoodley, robin","totalStudents":22},{"courses_instructor":"dunham, bruce;stoodley, robin","totalStudents":36},{"courses_instructor":"jetter, reinhard;stoodley, robin;trites, andrew","totalStudents":47},{"courses_instructor":"graham, sean;grant, edward","totalStudents":16},{"courses_instructor":"grant, edward;kroc, edward","totalStudents":15},{"courses_instructor":"dunham, bruce","totalStudents":479},{"courses_instructor":"jandciu, eric;stewart, jaclyn","totalStudents":18},{"courses_instructor":"dunham, bruce;jandciu, eric;steeves, john;stewart, jaclyn","totalStudents":45},{"courses_instructor":"white, james","totalStudents":1105},{"courses_instructor":"greer, kerry","totalStudents":175},{"courses_instructor":"armitage, neil","totalStudents":93},{"courses_instructor":"blackburn, carole","totalStudents":92},{"courses_instructor":"knowlton, autumn","totalStudents":40},{"courses_instructor":"gulmanelli, stefano","totalStudents":41},{"courses_instructor":"lauster, nathanael","totalStudents":362},{"courses_instructor":"lauer, sean","totalStudents":387},{"courses_instructor":"patterson, andrew","totalStudents":114},{"courses_instructor":"veenstra, gerry","totalStudents":370},{"courses_instructor":"akhmetshin, edward","totalStudents":83},{"courses_instructor":"chan, elic","totalStudents":62},{"courses_instructor":"preston, evan keith","totalStudents":140},{"courses_instructor":"hanser, amy","totalStudents":378},{"courses_instructor":"yodanis, carrie","totalStudents":252},{"courses_instructor":"hyde, zachary","totalStudents":54},{"courses_instructor":"flynn, william","totalStudents":51},{"courses_instructor":"wilkes, rima","totalStudents":153},{"courses_instructor":"ikebuchi, shelly","totalStudents":134},{"courses_instructor":"townsend, anne frances","totalStudents":87},{"courses_instructor":"currie, dawn heather","totalStudents":236},{"courses_instructor":"woodman, katherine sophia","totalStudents":26},{"courses_instructor":"walmsley, heather","totalStudents":47},{"courses_instructor":"skourtes, stephanie","totalStudents":64},{"courses_instructor":"roth, wendy","totalStudents":71},{"courses_instructor":"homewood, susan","totalStudents":117},{"courses_instructor":"sullivan, rachael","totalStudents":93},{"courses_instructor":"pentecost, debra","totalStudents":59},{"courses_instructor":"martin-matthews, anne","totalStudents":132},{"courses_instructor":"routray, sanjeev","totalStudents":45},{"courses_instructor":"fu, qiang","totalStudents":29},{"courses_instructor":"gross, neil","totalStudents":38},{"courses_instructor":"kemple, thomas","totalStudents":8},{"courses_instructor":"tindall, david","totalStudents":51},{"courses_instructor":"hirsh, charlotte","totalStudents":71},{"courses_instructor":"ghaziani, amin","totalStudents":5},{"courses_instructor":"brown, sandra;grayston, susan;krzic, maja;novak, mike david","totalStudents":3},{"courses_instructor":"lavkulich, leslie;wilson, julie","totalStudents":18},{"courses_instructor":"schreier, hanspeter;wilson, julie","totalStudents":7},{"courses_instructor":"stern, louise","totalStudents":172},{"courses_instructor":"rivkin, shelley","totalStudents":263},{"courses_instructor":"vedan, richard","totalStudents":337},{"courses_instructor":"weaver, sydney","totalStudents":63},{"courses_instructor":"kruk, edward andrew","totalStudents":428},{"courses_instructor":"kendrick, kristin","totalStudents":49},{"courses_instructor":"douglas, janet l","totalStudents":88},{"courses_instructor":"charles, grant;jones, elizabeth;mcnicoll, paule","totalStudents":177},{"courses_instructor":"charles, grant;jones, elizabeth;o'neill, brian;yan, miu chung","totalStudents":33},{"courses_instructor":"charles, grant;clark, natalie;jones, elizabeth","totalStudents":63},{"courses_instructor":"clark, natalie;jamieson, ally;jones, elizabeth","totalStudents":48},{"courses_instructor":"jones, elizabeth","totalStudents":346},{"courses_instructor":"casson, barbara","totalStudents":31},{"courses_instructor":"allison, kelly","totalStudents":95},{"courses_instructor":"medjuck, melissa","totalStudents":74},{"courses_instructor":"quinn, alyson","totalStudents":37},{"courses_instructor":"nickel, wayne","totalStudents":120},{"courses_instructor":"o'neill, brian","totalStudents":76},{"courses_instructor":"yan, miu chung","totalStudents":203},{"courses_instructor":"oliver, carolyn","totalStudents":68},{"courses_instructor":"phillips, nicholas a","totalStudents":14},{"courses_instructor":"meadows, karen;o'connor, deborah;sullivan, t richard;tester, frank;wright, margaret","totalStudents":34},{"courses_instructor":"o'neill, brian;stainton, timothy;stern, louise;tester, frank;wright, margaret","totalStudents":33},{"courses_instructor":"o'neill, brian;rockwell, jasmyne;stainton, timothy;tester, frank;wright, margaret","totalStudents":63},{"courses_instructor":"clark, natalie;o'connor, deborah;o'neill, brian;stainton, timothy;tester, frank","totalStudents":54},{"courses_instructor":"allen, helen;o'neill, brian;stainton, timothy;stern, louise;tester, frank","totalStudents":43},{"courses_instructor":"bryson, stephanie;riano-alcala, pilar","totalStudents":50},{"courses_instructor":"o'connor, deborah;o'neill, brian;stainton, timothy;tester, frank;wright, margaret","totalStudents":29},{"courses_instructor":"wai, hayne","totalStudents":65},{"courses_instructor":"dhebar, meera;quinn, alyson","totalStudents":54},{"courses_instructor":"johnson, shelly","totalStudents":317},{"courses_instructor":"stainton, timothy","totalStudents":109},{"courses_instructor":"migone, andreas","totalStudents":46},{"courses_instructor":"johnston, patricia","totalStudents":118},{"courses_instructor":"tester, frank","totalStudents":148},{"courses_instructor":"charles, grant","totalStudents":188},{"courses_instructor":"wright, margaret","totalStudents":117},{"courses_instructor":"sullivan, t richard","totalStudents":53},{"courses_instructor":"clark, natalie","totalStudents":69},{"courses_instructor":"lipov, eleanor r","totalStudents":19},{"courses_instructor":"del vecchio, rhea","totalStudents":13},{"courses_instructor":"lipov, eleanor","totalStudents":16},{"courses_instructor":"davis, simon","totalStudents":142},{"courses_instructor":"casson, barbara;choi, marcia","totalStudents":56},{"courses_instructor":"jones, elizabeth;mcnicoll, paule;riano-alcala, pilar","totalStudents":9},{"courses_instructor":"jones, elizabeth;o'neill, brian;riano-alcala, pilar","totalStudents":8},{"courses_instructor":"allison, kelly;charles, grant;clark, natalie","totalStudents":13},{"courses_instructor":"mcnicoll, paule;tba","totalStudents":16},{"courses_instructor":"mcnicoll, paule;riano-alcala, pilar;tba","totalStudents":27},{"courses_instructor":"allison, kelly;chaparro-pacheco, ricardo;clark, natalie","totalStudents":18},{"courses_instructor":"shebib, bob","totalStudents":16},{"courses_instructor":"bosma, harvey","totalStudents":14},{"courses_instructor":"peries, kathryn","totalStudents":16},{"courses_instructor":"o'connor, deborah;stainton, timothy;sullivan, t richard;tester, frank;wright, margaret","totalStudents":7},{"courses_instructor":"gill, deana","totalStudents":37},{"courses_instructor":"bryson, stephanie","totalStudents":134},{"courses_instructor":"bryson, stephanie;o'connor, deborah;stainton, timothy;sullivan, t richard;tester, frank","totalStudents":27},{"courses_instructor":"norris, william craig","totalStudents":18},{"courses_instructor":"haden, mark","totalStudents":13},{"courses_instructor":"mccarthy, natalie","totalStudents":12},{"courses_instructor":"kealy, david","totalStudents":9},{"courses_instructor":"escueta, mok","totalStudents":31},{"courses_instructor":"o'connor, deborah","totalStudents":102},{"courses_instructor":"sims gould, joan","totalStudents":5},{"courses_instructor":"dhebar, meera","totalStudents":19},{"courses_instructor":"gauvin, emma","totalStudents":17},{"courses_instructor":"mcnicoll, paule","totalStudents":63},{"courses_instructor":"lai, sylvia;marshall, janet vaughan","totalStudents":32},{"courses_instructor":"bosma, harvey;bryson, stephanie","totalStudents":12},{"courses_instructor":"bryson, stephanie;robitaille, teresa","totalStudents":16},{"courses_instructor":"davies, jonathon","totalStudents":11},{"courses_instructor":"advisor, -;bryson, stephanie;charles, grant;tester, frank","totalStudents":34},{"courses_instructor":"advisor, -","totalStudents":37},{"courses_instructor":"o'neill, brian;riano-alcala, pilar","totalStudents":6},{"courses_instructor":"riano-alcala, pilar","totalStudents":4},{"courses_instructor":"spacciante, stephanie","totalStudents":1446},{"courses_instructor":"manchon, enrique;rubio, pablo","totalStudents":93},{"courses_instructor":"orr alvarez, brianne","totalStudents":695},{"courses_instructor":"barrios, belkis;manchon, enrique","totalStudents":50},{"courses_instructor":"goundareva, irina;manchon, enrique","totalStudents":82},{"courses_instructor":"manchon, enrique;mursi, ebtisam","totalStudents":79},{"courses_instructor":"manchon, enrique;montano, maritza","totalStudents":97},{"courses_instructor":"manchon, enrique;osegueda, ximena","totalStudents":80},{"courses_instructor":"bautista, rene;manchon, enrique","totalStudents":119},{"courses_instructor":"manchon, enrique;mohamed, dooa magdy","totalStudents":76},{"courses_instructor":"izquierdo, jorge;manchon, enrique","totalStudents":178},{"courses_instructor":"manchon, enrique","totalStudents":1413},{"courses_instructor":"hillson, richard","totalStudents":321},{"courses_instructor":"alvarez-jaimes, javier;manchon, enrique","totalStudents":233},{"courses_instructor":"lara aguilar, jose;manchon, enrique","totalStudents":110},{"courses_instructor":"manchon, enrique;onate, susa","totalStudents":28},{"courses_instructor":"albarran-caselles, olga;manchon, enrique","totalStudents":143},{"courses_instructor":"alvarez, alejandro;manchon, enrique","totalStudents":97},{"courses_instructor":"escuer riera, iris","totalStudents":978},{"courses_instructor":"navarro ortega, samuel","totalStudents":283},{"courses_instructor":"fraser, barbara;manchon, enrique","totalStudents":87},{"courses_instructor":"alaiz-losada, susana","totalStudents":90},{"courses_instructor":"carbonetti, maria","totalStudents":1202},{"courses_instructor":"borges, olga;manchon, enrique","totalStudents":108},{"courses_instructor":"manchon, enrique;tba","totalStudents":891},{"courses_instructor":"manchon, enrique;rodriguez, juan carlos","totalStudents":120},{"courses_instructor":"manchon, enrique;miranda barrios, aldofina","totalStudents":151},{"courses_instructor":"manchon, enrique;orr alvarez, brianne","totalStudents":35},{"courses_instructor":"karaman chaparenco, julio omar","totalStudents":69},{"courses_instructor":"manchon, enrique;villalobos, cynthia","totalStudents":65},{"courses_instructor":"escudero, alejandra;manchon, enrique;spacciante, stephanie","totalStudents":32},{"courses_instructor":"barrios, belkis;manchon, enrique;spacciante, stephanie","totalStudents":30},{"courses_instructor":"manchon, enrique;rubio, pablo;spacciante, stephanie","totalStudents":34},{"courses_instructor":"goundareva, irina;manchon, enrique;spacciante, stephanie","totalStudents":33},{"courses_instructor":"manchon, enrique;spacciante, stephanie","totalStudents":40},{"courses_instructor":"manchon, enrique;miranda barrios, aldofina;spacciante, stephanie","totalStudents":34},{"courses_instructor":"fraser, barbara;manchon, enrique;spacciante, stephanie","totalStudents":29},{"courses_instructor":"manchon, enrique;osegueda, ximena;spacciante, stephanie","totalStudents":32},{"courses_instructor":"alvarez, alejandro;manchon, enrique;spacciante, stephanie","totalStudents":30},{"courses_instructor":"lara aguilar, jose;manchon, enrique;spacciante, stephanie","totalStudents":28},{"courses_instructor":"karaman chaparenco, julio omar;manchon, enrique","totalStudents":26},{"courses_instructor":"manchon, enrique;spacciante, stephanie;zamorano meza, jose","totalStudents":30},{"courses_instructor":"manchon, enrique;spacciante, stephanie;wubbold, manya","totalStudents":28},{"courses_instructor":"manchon, enrique;montano, maritza;spacciante, stephanie","totalStudents":28},{"courses_instructor":"grillo arbulu, maria teresa","totalStudents":21},{"courses_instructor":"alvarez-moreno, raul","totalStudents":272},{"courses_instructor":"manchon, enrique;zamorano meza, jose","totalStudents":21},{"courses_instructor":"escudero, alejandra;manchon, enrique","totalStudents":33},{"courses_instructor":"cabezas villalobos, oscar arie","totalStudents":142},{"courses_instructor":"albarran-caselles, olga;spacciante, stephanie","totalStudents":48},{"courses_instructor":"kolokatsis, kosta","totalStudents":64},{"courses_instructor":"izquierdo, jorge;spacciante, stephanie","totalStudents":31},{"courses_instructor":"rubio, pablo;spacciante, stephanie","totalStudents":52},{"courses_instructor":"spacciante, stephanie;tba","totalStudents":225},{"courses_instructor":"lara aguilar, jose;spacciante, stephanie","totalStudents":53},{"courses_instructor":"hillson, richard;manchon, enrique","totalStudents":40},{"courses_instructor":"carbonetti, maria;rubio, pablo","totalStudents":57},{"courses_instructor":"carbonetti, maria;grillo arbulu, maria teresa","totalStudents":51},{"courses_instructor":"escobar trujillo, maria adelai","totalStudents":46},{"courses_instructor":"fernandez utrera, maria soleda","totalStudents":187},{"courses_instructor":"rubio delgado, isaac","totalStudents":33},{"courses_instructor":"russel, dominique","totalStudents":39},{"courses_instructor":"hamilton, stanley","totalStudents":118},{"courses_instructor":"lee, stephen","totalStudents":164},{"courses_instructor":"morgan, steven george","totalStudents":332},{"courses_instructor":"barer, morris","totalStudents":49},{"courses_instructor":"anis, aslam","totalStudents":276},{"courses_instructor":"bryan, stirling","totalStudents":244},{"courses_instructor":"bansback, nicholas","totalStudents":162},{"courses_instructor":"gerschman, mats","totalStudents":80},{"courses_instructor":"kopec, jacek andrzej","totalStudents":171},{"courses_instructor":"richardson, chris","totalStudents":125},{"courses_instructor":"singer, joel","totalStudents":382},{"courses_instructor":"henrich, natalie","totalStudents":192},{"courses_instructor":"lovato, chris","totalStudents":188},{"courses_instructor":"wong, hubert","totalStudents":83},{"courses_instructor":"poon, brenda","totalStudents":66},{"courses_instructor":"mcleod, christopher","totalStudents":150},{"courses_instructor":"vertesi, leslie","totalStudents":104},{"courses_instructor":"krause, christina","totalStudents":107},{"courses_instructor":"sachedina, zulie","totalStudents":213},{"courses_instructor":"nikki, andrea","totalStudents":52},{"courses_instructor":"frankish, charles james","totalStudents":166},{"courses_instructor":"frankish, charles james;guhn, martin;tanimura, kanna","totalStudents":36},{"courses_instructor":"frank, erica","totalStudents":82},{"courses_instructor":"frisch, lawrence","totalStudents":41},{"courses_instructor":"craib, kevin j","totalStudents":76},{"courses_instructor":"kelson, elizabeth","totalStudents":55},{"courses_instructor":"birnbaum, david","totalStudents":49},{"courses_instructor":"kishchenko, svetlana","totalStudents":230},{"courses_instructor":"sobolev, boris","totalStudents":124},{"courses_instructor":"sutherland, jason","totalStudents":50},{"courses_instructor":"richardson, chris;sandhu, jat","totalStudents":404},{"courses_instructor":"schechter, martin;singer, joel","totalStudents":42},{"courses_instructor":"dummer, trevor","totalStudents":81},{"courses_instructor":"manges, amee","totalStudents":113},{"courses_instructor":"janjua, naveed","totalStudents":44},{"courses_instructor":"kuruthukulangare, joseph","totalStudents":28},{"courses_instructor":"koehoorn, mieke","totalStudents":218},{"courses_instructor":"buxton, jane","totalStudents":167},{"courses_instructor":"hanley, gillian","totalStudents":21},{"courses_instructor":"masse, louise","totalStudents":40},{"courses_instructor":"peacock, stuart;spinelli, john","totalStudents":33},{"courses_instructor":"regier, dean;spinelli, john","totalStudents":5},{"courses_instructor":"peacock, stuart","totalStudents":8},{"courses_instructor":"brands, ralph","totalStudents":146},{"courses_instructor":"galanis, eleni;otterstatter, michael","totalStudents":27},{"courses_instructor":"galanis, eleni;henry, bonnie;koehoorn, mieke","totalStudents":8},{"courses_instructor":"demers, paul","totalStudents":17},{"courses_instructor":"galanis, eleni;henry, bonnie","totalStudents":13},{"courses_instructor":"doyle-waters, mary;mintzes, barbara","totalStudents":65},{"courses_instructor":"fitzgerald, mark","totalStudents":40},{"courses_instructor":"doyle-waters, mary;taylor, darlene","totalStudents":22},{"courses_instructor":"mulpuri, kishore","totalStudents":6},{"courses_instructor":"pourbohloul, babak","totalStudents":19},{"courses_instructor":"spittal, patricia","totalStudents":98},{"courses_instructor":"patrick, david","totalStudents":92},{"courses_instructor":"black, charlyn;homewood, susan","totalStudents":18},{"courses_instructor":"brauer, michael","totalStudents":80},{"courses_instructor":"spiegel, jerry","totalStudents":57},{"courses_instructor":"dharamsi, shafik;spiegel, jerry","totalStudents":15},{"courses_instructor":"gully, paul;spiegel, jerry","totalStudents":9},{"courses_instructor":"kassam, rosemin","totalStudents":87},{"courses_instructor":"kassam, rosemin;ragaz, joseph","totalStudents":23},{"courses_instructor":"ragaz, joseph","totalStudents":41},{"courses_instructor":"lee, victoria","totalStudents":67},{"courses_instructor":"mcleod, christopher;mintzes, barbara","totalStudents":23},{"courses_instructor":"yassi, annalee","totalStudents":14},{"courses_instructor":"ng, brian","totalStudents":25},{"courses_instructor":"smailes, elizabeth;smith, robert","totalStudents":74},{"courses_instructor":"kazanjian, arminee","totalStudents":79},{"courses_instructor":"smith, robert","totalStudents":77},{"courses_instructor":"kazanjian, arminee;miller, john;schmidt, brian","totalStudents":15},{"courses_instructor":"mcgrail, kimberlyn;mcleod, christopher;shoveller, jean","totalStudents":40},{"courses_instructor":"shoveller, jean","totalStudents":39},{"courses_instructor":"guhn, martin;mcleod, christopher","totalStudents":6},{"courses_instructor":"mcgrail, kimberlyn;shoveller, jean","totalStudents":37},{"courses_instructor":"davidson, alan","totalStudents":16},{"courses_instructor":"davies, hugh william","totalStudents":51},{"courses_instructor":"mcgrail, kimberlyn","totalStudents":8},{"courses_instructor":"nicol, anne-marie","totalStudents":35},{"courses_instructor":"bartlett, karen hastings","totalStudents":92},{"courses_instructor":"mcleod, christopher;yassi, annalee","totalStudents":6},{"courses_instructor":"janssen, patricia;rurak, danny","totalStudents":9},{"courses_instructor":"kishchenko, svetlana;lovato, chris","totalStudents":54},{"courses_instructor":"kershaw, paul;poon, brenda","totalStudents":4},{"courses_instructor":"mitton, craig","totalStudents":71},{"courses_instructor":"oviedo-joekes, eugenia","totalStudents":20},{"courses_instructor":"babul, shelina;brussoni, mariana;pike, ian","totalStudents":36},{"courses_instructor":"astrakianakis, george","totalStudents":43},{"courses_instructor":"astrakianakis, george;davies, hugh william","totalStudents":7},{"courses_instructor":"village, judy","totalStudents":53},{"courses_instructor":"teschke, kay","totalStudents":30},{"courses_instructor":"henderson, sarah","totalStudents":23},{"courses_instructor":"yu, hoi yin eugenia","totalStudents":3638},{"courses_instructor":"salibian-barrera, matias","totalStudents":233},{"courses_instructor":"wu, lang","totalStudents":1151},{"courses_instructor":"zamar, ruben","totalStudents":465},{"courses_instructor":"burkett, craig","totalStudents":202},{"courses_instructor":"casquilho resende, camila","totalStudents":142},{"courses_instructor":"tsai, yu-ling;yu, hoi yin eugenia","totalStudents":243},{"courses_instructor":"gustafson, paul","totalStudents":293},{"courses_instructor":"yapa, gaitri","totalStudents":54},{"courses_instructor":"lim, yew wei","totalStudents":2332},{"courses_instructor":"lee, melissa","totalStudents":1333},{"courses_instructor":"tsai, yu-ling","totalStudents":126},{"courses_instructor":"joe, harry sue wah","totalStudents":581},{"courses_instructor":"leung, andy chun yin","totalStudents":62},{"courses_instructor":"erdelyi, shannon","totalStudents":70},{"courses_instructor":"lim, yew wei;yapa, gaitri","totalStudents":297},{"courses_instructor":"ushey, kevin michael","totalStudents":160},{"courses_instructor":"wu, lang;yapa, gaitri","totalStudents":109},{"courses_instructor":"dunham, bruce;gustafson, paul","totalStudents":92},{"courses_instructor":"bouchard-cote, alexandre","totalStudents":314},{"courses_instructor":"nolde, natalia","totalStudents":241},{"courses_instructor":"chen, jiahua","totalStudents":409},{"courses_instructor":"welch, william","totalStudents":717},{"courses_instructor":"petkau, a john","totalStudents":111},{"courses_instructor":"bryan, jennifer frazier;pavlidis, paul","totalStudents":53},{"courses_instructor":"bryan, jennifer frazier;cohen freue, gabriela","totalStudents":21},{"courses_instructor":"bryan, jennifer frazier;cohen freue, gabriela;pavlidis, paul","totalStudents":29},{"courses_instructor":"brant, rollin frederick","totalStudents":19},{"courses_instructor":"fairholm, david;taylor, robert;westerberg, brian","totalStudents":29},{"courses_instructor":"fairholm, david;taylor, robert","totalStudents":72},{"courses_instructor":"gardiner, robert;scholte, tom;wasserman, jerry","totalStudents":230},{"courses_instructor":"henderson, julia","totalStudents":40},{"courses_instructor":"dow, bill","totalStudents":63},{"courses_instructor":"lanki, colleen","totalStudents":62},{"courses_instructor":"harrison, nicholas","totalStudents":117},{"courses_instructor":"heatley, stephen","totalStudents":160},{"courses_instructor":"mercier, kelly-ruth","totalStudents":23},{"courses_instructor":"burnett, cathy;heatley, stephen;murphy, gayle","totalStudents":80},{"courses_instructor":"burnett, cathy;murphy, gayle","totalStudents":349},{"courses_instructor":"drover, stephen","totalStudents":31},{"courses_instructor":"mclean, jayson","totalStudents":215},{"courses_instructor":"darbellay, jennifer;eberle, robert francis;fedoruk, ronald","totalStudents":48},{"courses_instructor":"eberle, robert francis;fedoruk, ronald","totalStudents":29},{"courses_instructor":"liu, siyuan","totalStudents":349},{"courses_instructor":"everett, patricia","totalStudents":135},{"courses_instructor":"couture, selena","totalStudents":73},{"courses_instructor":"vingoe, mary","totalStudents":14},{"courses_instructor":"powers, bradley","totalStudents":122},{"courses_instructor":"malloy, stephen","totalStudents":169},{"courses_instructor":"murphy, gayle;rabinovitch, andrea","totalStudents":31},{"courses_instructor":"burnett, cathy","totalStudents":16},{"courses_instructor":"murphy, gayle","totalStudents":25},{"courses_instructor":"burnett, cathy;tba","totalStudents":38},{"courses_instructor":"firkins, jacqueline","totalStudents":215},{"courses_instructor":"reimer, christine","totalStudents":12},{"courses_instructor":"green, alison","totalStudents":41},{"courses_instructor":"matthews, karen","totalStudents":31},{"courses_instructor":"tugwell, andrew","totalStudents":72},{"courses_instructor":"horka, andy","totalStudents":45},{"courses_instructor":"pennefather, patrick","totalStudents":18},{"courses_instructor":"johnston, kirsty","totalStudents":319},{"courses_instructor":"leger, catriona;rodgers, sarah","totalStudents":21},{"courses_instructor":"rodgers, sarah","totalStudents":28},{"courses_instructor":"malloy, stephen;rodgers, sarah","totalStudents":42},{"courses_instructor":"mcgregor, chris;rodgers, sarah","totalStudents":18},{"courses_instructor":"fowler, ruth skai","totalStudents":130},{"courses_instructor":"asbeek brusse, marijka","totalStudents":94},{"courses_instructor":"eberle, robert francis","totalStudents":62},{"courses_instructor":"driscoll-bell, jean","totalStudents":59},{"courses_instructor":"heatley, stephen;mcgregor, chris","totalStudents":60},{"courses_instructor":"freeman, neil henry;heatley, stephen","totalStudents":17},{"courses_instructor":"scholte, tom;tba","totalStudents":41},{"courses_instructor":"heatley, stephen;rodgers, sarah","totalStudents":8},{"courses_instructor":"leger, catriona","totalStudents":11},{"courses_instructor":"anderson, bart;drover, stephen","totalStudents":8},{"courses_instructor":"heatley, stephen;scholte, tom","totalStudents":15},{"courses_instructor":"freeman, neil henry;leger, catriona","totalStudents":7},{"courses_instructor":"gardiner, robert","totalStudents":59},{"courses_instructor":"fedoruk, ronald","totalStudents":39},{"courses_instructor":"ditor, rachel","totalStudents":105},{"courses_instructor":"mcallister, kevin","totalStudents":14},{"courses_instructor":"mcgregor, chris","totalStudents":18},{"courses_instructor":"malloy, stephen;scholte, tom","totalStudents":15},{"courses_instructor":"beley, lisa;harrison, nicholas;tba","totalStudents":13},{"courses_instructor":"beley, lisa;harrison, nicholas;holmes, jonathan","totalStudents":22},{"courses_instructor":"beley, lisa","totalStudents":13},{"courses_instructor":"beley, lisa;burnett, cathy;tba","totalStudents":10},{"courses_instructor":"cooper, john;heatley, stephen;scholte, tom","totalStudents":2},{"courses_instructor":"hein, scot","totalStudents":29},{"courses_instructor":"luymes, donald","totalStudents":30},{"courses_instructor":"fryer, sara","totalStudents":52},{"courses_instructor":"prescott, cindy","totalStudents":13},{"courses_instructor":"tran, martino","totalStudents":12},{"courses_instructor":"lyon, katherine","totalStudents":42},{"courses_instructor":"lam, mark;landry, dana;pickren, graham","totalStudents":18},{"courses_instructor":"lam, mark;peterson, jenny;pickren, graham;rea, jaclyn","totalStudents":18},{"courses_instructor":"barnes, steven;lam, mark;pickren, graham","totalStudents":18},{"courses_instructor":"lam, mark;mcphee, siobhan;pickren, graham","totalStudents":13},{"courses_instructor":"motavas, saloome;prodanovic, vladan zoran","totalStudents":36},{"courses_instructor":"pina, manuel","totalStudents":645},{"courses_instructor":"d'onofrio, christine","totalStudents":3159},{"courses_instructor":"mccrum, phillip","totalStudents":648},{"courses_instructor":"levin, simon","totalStudents":412},{"courses_instructor":"prince, richard","totalStudents":1525},{"courses_instructor":"claxton, dana","totalStudents":552},{"courses_instructor":"lee, evan","totalStudents":19},{"courses_instructor":"peter, ryan","totalStudents":72},{"courses_instructor":"fernandez rodriguez, antonio e","totalStudents":190},{"courses_instructor":"hite, joshua","totalStudents":90},{"courses_instructor":"petrova, lux","totalStudents":19},{"courses_instructor":"zeigler, barbara","totalStudents":495},{"courses_instructor":"gu, xiong","totalStudents":503},{"courses_instructor":"cesar marin, nelly","totalStudents":16},{"courses_instructor":"fernandez rodriguez, antonio","totalStudents":16},{"courses_instructor":"grafton, frances","totalStudents":13},{"courses_instructor":"fernandez rodriguez, antonio e;mccrum, phillip","totalStudents":20},{"courses_instructor":"mackenzie, elizabeth","totalStudents":20},{"courses_instructor":"james-kretschmar, katherine","totalStudents":18},{"courses_instructor":"aitken, stephanie","totalStudents":57},{"courses_instructor":"donald, rebecca","totalStudents":87},{"courses_instructor":"jones, barrie","totalStudents":521},{"courses_instructor":"lemmens, marilou","totalStudents":20},{"courses_instructor":"tamer, damla","totalStudents":37},{"courses_instructor":"yumang, jade","totalStudents":91},{"courses_instructor":"smolinski, mikolaj","totalStudents":20},{"courses_instructor":"hawrysio, denise","totalStudents":17},{"courses_instructor":"billings, scott","totalStudents":33},{"courses_instructor":"starling, dan","totalStudents":22},{"courses_instructor":"busby, cathy","totalStudents":20},{"courses_instructor":"busby, cathy;kennedy, garry","totalStudents":40},{"courses_instructor":"mccrum, phillip;weih, jennifer","totalStudents":28},{"courses_instructor":"cohen, david;ellis, simon","totalStudents":235},{"courses_instructor":"ellis, simon","totalStudents":295},{"courses_instructor":"avramidis, stavros","totalStudents":275},{"courses_instructor":"saddler, john","totalStudents":60},{"courses_instructor":"avramidis, stavros;tannert, thomas","totalStudents":71},{"courses_instructor":"fuerst, robert","totalStudents":327},{"courses_instructor":"leung, vincent","totalStudents":123},{"courses_instructor":"sowlati, taraneh","totalStudents":397},{"courses_instructor":"renneckar, scott","totalStudents":29},{"courses_instructor":"avramidis, stavros;cool, julie","totalStudents":22},{"courses_instructor":"cohen, david","totalStudents":427},{"courses_instructor":"evans, philip david","totalStudents":130},{"courses_instructor":"fell, david","totalStudents":75},{"courses_instructor":"mcfarlane, paul","totalStudents":241},{"courses_instructor":"blyt, christian","totalStudents":20},{"courses_instructor":"vahid, saba","totalStudents":31},{"courses_instructor":"griess, verena;sowlati, taraneh","totalStudents":56},{"courses_instructor":"cool, julie","totalStudents":51},{"courses_instructor":"fuerst, robert;kozak, robert antal","totalStudents":36},{"courses_instructor":"blake, susan","totalStudents":260},{"courses_instructor":"mathes, carmen","totalStudents":293},{"courses_instructor":"kelly, patricia","totalStudents":243},{"courses_instructor":"bittner, thomas jacob","totalStudents":212},{"courses_instructor":"power, katherine","totalStudents":287},{"courses_instructor":"macwilliam, erin","totalStudents":155},{"courses_instructor":"mcalister, sean","totalStudents":224},{"courses_instructor":"wegner, diana","totalStudents":22},{"courses_instructor":"brooks, carellin","totalStudents":165},{"courses_instructor":"ferreira, laila","totalStudents":163},{"courses_instructor":"casey, anna","totalStudents":198},{"courses_instructor":"makmillen, shurli","totalStudents":81},{"courses_instructor":"landry, dana","totalStudents":14},{"courses_instructor":"rea, jaclyn","totalStudents":81},{"courses_instructor":"borkent, michael","totalStudents":83},{"courses_instructor":"el-bezre, nazih","totalStudents":95},{"courses_instructor":"savage, ken;shadwick, robert edward","totalStudents":10},{"courses_instructor":"milsom, william","totalStudents":4},{"courses_instructor":"dalziel, anne c;porteus, cosima sandra","totalStudents":11}]};


var roomforcover4: QueryRequest = {

    WHERE: {"AND":
        [
            {
                "IS": {"rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"}
            }
            , {"LT": {"rooms_seats" : "80"}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_lat", "rooms_furniture", "rooms_type"
        ],

        "FORM": "TABLE"
    }

};

var applyWithUUIDBig:QueryRequest = {
    WHERE: {}
    ,
    OPTIONS: {
        "COLUMNS": [
            "courses_uuid",
            "countCourses", "Grades"
        ],
        "ORDER": {
            "dir": "DOWN",
            "keys": ["courses_uuid"]
        },
        "FORM": "TABLE"
    },
    TRANSFORMATIONS: {
        "GROUP": ["courses_uuid"],
        "APPLY": [
            {
                "countCourses":{
                    "COUNT":"courses_id"}
            },
            {"Grades":{
                "AVG":"courses_avg"}
            }]
    }
};

var roomforcover5: QueryRequest = {

    WHERE: {"AND":
        [
            {
                "IS": {"rooms_furniture": 70}
            }
            , {"LT": {"rooms_seats" : 80}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_lat", "rooms_furniture", "rooms_type"
        ],

        "FORM": "TABLE"
    }

};

var roomforcover6: QueryRequest = {

    WHERE: {
        "wrong": [
            {
                "IS": {"rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"}
            }
            , {"LT": {"rooms_seats": 80}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_lat", "rooms_furniture", "rooms_type"
        ],

        "FORM": "TABLE"
    }
};

var roomforcover7: QueryRequest = {

    WHERE: {
        "AND":
            {
                "IS": {"rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"}
            }

    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_lat", "rooms_furniture", "rooms_type"
        ],

        "FORM": "TABLE"
    }
};

var roomforcover8: QueryRequest = {

    WHERE: {
        "OR":
            {
                "IS": {"rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"}
            }

    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_lat", "rooms_furniture", "rooms_type"
        ],

        "FORM": "TABLE"
    }
};

var roomforcover9: QueryRequest = {

    WHERE: {"AND":
        [
            {
                "IS": {"rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"}
            }
            , {"LT": {"rooms_seats" : 80}}]
    },
    OPTIONS: null

};



var NitroResult = {"render":"TABLE","result":[{"rooms_lat":49.2642,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Small Group"},{"rooms_lat":49.2642,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Small Group"},{"rooms_lat":49.26486,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26478,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26293,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26293,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26293,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26293,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26478,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26478,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26229,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26229,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26236,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26236,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26236,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26125,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26125,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26125,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26478,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26486,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26486,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26486,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26486,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26486,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26486,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26486,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26541,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26274,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26228,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26228,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26826,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26826,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26826,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26826,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26862,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"},{"rooms_lat":49.26479,"rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_type":"Tiered Large Group"}]}

var queryRequest9: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var LTRequest: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var queryRequest10: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var queryRequest22: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var queryRequest11: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var queryRequest12: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var queryRequest13: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var queryRequest14: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var queryRequest15: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var queryRequest16: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};

var queryRequest17: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};


var queryRequestNoOrder: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        FORM: "TABLE"
    }
};
var testForYear: QueryRequest = {
    WHERE: {
        "AND": [{
            "EQ": {
                "courses_year": 1900
            }
        }, {
            "IS": {
                "courses_dept": "adhe"
            }
        }]
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept", "courses_id"
        ],

        "FORM": "TABLE"
    }
}

var fluorineQuery: QueryRequest = {
    WHERE: {
        "AND":[{"IS": {
            "courses_dept": "adhe"
        }},
            {"IS":{"courses_id": "327"}}]

    },
    OPTIONS: {
        "COLUMNS": [
            "courses_id", "courses_year"
        ],

        "FORM": "TABLE"
    }
};

var testforcoverage: QueryRequest = {
    WHERE: {
        "AND":[{"IS": {
            "courses_dept": "adhe"
        }},
            {"IS":{"courses_id": "327"}}]

    },
    OPTIONS: {
        "COLUMNS": [
            "courses_title", "courses_uuid", "courses_pass", "courses_fail", "courses_audit"
        ],

        "FORM": "TABLE"
    }
};

var shortQ: QueryRequest = {
    WHERE: {
        "IS":{"courses_id": "327"}

    },
    OPTIONS: {
        "COLUMNS": [
            "courses_id", "courses_year"
        ],

        "FORM": "TABLE"
    }
};


var quantum: QueryRequest = {
    WHERE: {
        "EQ":{"courses_year": 2014}

    },
    OPTIONS: {
        "COLUMNS": [
            "courses_title", "courses_year"
        ],

        "ORDER": "courses_title",

        "FORM": "TABLE"
    }
};

var shortQ2: QueryRequest = {

    WHERE: {"GT": {"rooms_seats": 150}

    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_name", "rooms_seats"
        ],

        "FORM": "TABLE"
    }
};

var testfornoApply:QueryRequest= {
    WHERE: {},
    OPTIONS: {
    COLUMNS: [
        "rooms_furniture",
        "maxseat"
    ],
        ORDER: "rooms_furniture",
        FORM: "TABLE"
},
    TRANSFORMATIONS: {
    GROUP: ["rooms_furniture"],
        APPLY: []
}
};

var fluorineResult = {"render":"TABLE","result":[{"courses_id":"327","courses_year":2008},{"courses_id":"327","courses_year":2008},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2010},{"courses_id":"327","courses_year":2010},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2016},{"courses_id":"327","courses_year":2016},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2013},{"courses_id":"327","courses_year":2013},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2014},{"courses_id":"327","courses_year":2014},{"courses_id":"327","courses_year":2014},{"courses_id":"327","courses_year":2014},{"courses_id":"327","courses_year":2014},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2009},{"courses_id":"327","courses_year":2009},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2013},{"courses_id":"327","courses_year":2013},{"courses_id":"327","courses_year":2013},{"courses_id":"327","courses_year":2013},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2011},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2015},{"courses_id":"327","courses_year":2015},{"courses_id":"327","courses_year":2015},{"courses_id":"327","courses_year":2015},{"courses_id":"327","courses_year":2015},{"courses_id":"327","courses_year":2015},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2011},{"courses_id":"327","courses_year":2011},{"courses_id":"327","courses_year":2011},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2007},{"courses_id":"327","courses_year":2007},{"courses_id":"327","courses_year":2007},{"courses_id":"327","courses_year":2007},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2012},{"courses_id":"327","courses_year":2012},{"courses_id":"327","courses_year":2012},{"courses_id":"327","courses_year":2012},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2012},{"courses_id":"327","courses_year":2012},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2009},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2010},{"courses_id":"327","courses_year":1900},{"courses_id":"327","courses_year":2014},{"courses_id":"327","courses_year":2014},{"courses_id":"327","courses_year":1900}]}

var yearQuery: QueryRequest = {

    WHERE: {
        "AND": [{
            "GT": {
                "courses_year": 2014
            }
        },
            {"IS": {"courses_dept": "cpsc"}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept", "courses_year"
        ],

        "FORM": "TABLE"
    }

};

var yearQueryLT: QueryRequest = {

    WHERE: {
        "AND": [{
            "LT": {
                "courses_year": 2014
            }
        },
            {"IS": {"courses_dept": "cpsc"}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept", "courses_year"
        ],

        "FORM": "TABLE"
    }

};

var LTyearQuery: QueryRequest = {

    WHERE: {
        "AND": [{
            "LT": {
                "courses_year": 2014
            }
        },
            {"IS": {"courses_dept": "cpsc"}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept", "courses_year"
        ],

        "FORM": "TABLE"
    }

}

var invalidISRequest: QueryRequest = {
    WHERE: {"IS": [{"courses_dept": "cpsc"}, {"courses_instructor": "*william*"}]},
    OPTIONS: {
        "COLUMNS": ["courses_dept",
            "courses_id",
            "courses_avg"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};

var GTarrayRequest: QueryRequest = {
    WHERE: {"GT": [{"IS": {"cour_avg": 80}}]},
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_avg"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};

var LTarrayRequest: QueryRequest = {
    WHERE: {"LT": [{"IS": {"cour_avg": 80}}]},
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_avg"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};

var EQarrayRequest: QueryRequest = {
    WHERE: {"EQ": [{"IS": {"cour_avg": 80}}]},
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_avg"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};

var deepNestRequest: QueryRequest = {
    "WHERE": {
        "OR":[
            {"AND":[
                {"AND": [{
                    "NOT":{
                        "NOT":{
                            "NOT":{
                                "IS": {"rooms_shortname": "BIOL"}
                            }
                        }
                    }
                }]},
                {"EQ": {"rooms_lon":-123.25308}},
                {"IS": {"rooms_type": "Tiered Large Group" }}]},
            {"AND":[
                {"EQ": {"rooms_lat": 49.26372}},
                {"IS": {"rooms_type": "Tiered Large Group" }},
                {"IS": {"rooms_furniture": "Classroom-Fixed Tablets"}}]}]
    },
    "OPTIONS": {
        "COLUMNS": [
            "rooms_name"

        ],
        "ORDER": "rooms_name",
        "FORM": "TABLE"
    }
};


var notJsonRequest: QueryRequest = {
    WHERE: null,
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "TABLE"
    }
};


var wrongFormRequest: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: [],
        ORDER: '',
        FORM: "WRONG"
    }
};

var nullOptionsRequest: QueryRequest = {
    WHERE: {},
    OPTIONS: {
        COLUMNS: null,
        ORDER: '',
        FORM: "WRONG"
    }
};

var notArrayRequest: QueryRequest = {
    WHERE: {"NOT": [{"IS": {"courses_avg": 80}}]},
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_avg"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};

var notRequest: QueryRequest = {
    WHERE: {"NOT": {"IS": {"cour_dept": "cpsc"}}},
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_avg"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};

var coursefailRequest: QueryRequest = {
    WHERE: {
        "AND": [
            {
                "IS": {
                    "courses_id": "504"
                }
            },
            {
                "LT": {
                    "courses_fail": 80
                }
            }, {
                "IS": {
                    "courses_uuid": "504"
                }
            }]
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_avg"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};

var coverageRequest: QueryRequest = {
    WHERE: {
        "AND": [
            {
                "IS": {
                    "courses_id": "504"
                }
            },
            {
                "LT": {
                    "courses_fail": 80
                }
            }, {
                "IS": {
                    "courses_uuid": "504"
                }
            }]
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_avg",
            "courses_instructor",
            "courses_uuid",
            "courses_title",
            "courses_pass",
            "courses_fail",
            "courses_audit"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};

var emptyANDRequest: QueryRequest = {
    WHERE: {"AND": []},
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_avg"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};

var invalidISRequest: QueryRequest = {
    WHERE: {"IS": [{"courses_dept": "cpsc"}, {"courses_instructor": "*william*"}]},
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_avg"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};

var emptyORRequest: QueryRequest = {
    WHERE: {"OR": []},
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_avg"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};

var doubleNegateRequest: QueryRequest = {
    WHERE: {
        "NOT": {
            "NOT": {
                "GT": {
                    "courses_avg": 93.5
                }
            }
        }
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_avg"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};

var fireTruckRequest: QueryRequest = {
    WHERE: {
        "AND": [{
            "IS": {
                "courses_dept": "cpsc"
            }
        },
            {
                "NOT": {
                    "IS": {
                        "courses_id": "121"
                    }
                }
            }]
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id"
        ],
        "ORDER": "courses_id",
        "FORM": "TABLE"
    }
};

var applyRequest2: QueryRequest = {

    WHERE: {},
    OPTIONS: {
    COLUMNS: [
        "rooms_furniture"
    ],
        ORDER: "rooms_furniture",
        FORM: "TABLE"
},
    TRANSFORMATIONS: {
    GROUP: ["rooms_furniture"],
        APPLY: []
}

}

var applyResult2 = {
    "render": "TABLE",
    "result": [{
        "rooms_furniture": "Classroom-Fixed Tables/Fixed Chairs"
    }, {
        "rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"
    }, {
        "rooms_furniture": "Classroom-Fixed Tables/Moveable Chairs"
    }, {
        "rooms_furniture": "Classroom-Fixed Tablets"
    }, {
        "rooms_furniture": "Classroom-Hybrid Furniture"
    }, {
        "rooms_furniture": "Classroom-Learn Lab"
    }, {
        "rooms_furniture": "Classroom-Movable Tables & Chairs"
    }, {
        "rooms_furniture": "Classroom-Movable Tablets"
    }, {
        "rooms_furniture": "Classroom-Moveable Tables & Chairs"
    }, {
        "rooms_furniture": "Classroom-Moveable Tablets"
    }]
}

var errorRequest: QueryRequest = {
    WHERE: {
        "AND": [{
            "IS": {
                "courses_dept": "cpsc"
            }
        },
            {
                "NOT": {
                    "IS": {
                        "courses_id": "121"
                    }
                }
            }]
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }
};


var countCourses = {
    WHERE: {
        "AND": [{
            "IS": {
                "courses_dept": "adhe"
            }
        }, {
            "GT": {
                "courses_avg": 70
            }
        }]
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id", "countCourses"
        ],
        "ORDER": {
            "dir": "DOWN",
            "keys": ["courses_dept"]
        },
        "FORM": "TABLE"
    },
    "TRANSFORMATIONS": {
        "GROUP": ["courses_dept", "courses_id"],
        "APPLY": [
            {
                "countCourses":{
                    "COUNT":"courses_id"}
            }]
    }
};

var laterWildRequest = {
    WHERE: {
        "IS": {
            "courses_instructor": "wi*"
        }
    },
    OPTIONS: {
        "COLUMNS": ["courses_id", "courses_dept", "courses_instructor"],
        "ORDER": "courses_dept",
        "FORM": "TABLE"
    }
};

var newTestwithLatlong = {
    WHERE:{
        "OR":[
            {
                "AND":[
                    {
                        "EQ":{
                            "rooms_lat": 49.26486
                        }
                    },
                    {
                        "IS":{
                            "rooms_address":"*2053*"
                        }
                    }
                ]
            },
            {
                "IS":{
                    "rooms_shortname": 'ANGU'
                }
            }
        ]
    },
    OPTIONS:{
        "COLUMNS":[
            "rooms_name",
            "rooms_href",
            "rooms_lat",
            "rooms_fullname"
        ],
        "FORM":"TABLE"
    }
};

var bothWildRequest = {
    WHERE: {
        "IS": {
            "courses_instructor": "*william*"
        }
    },
    OPTIONS: {
        "COLUMNS": ["courses_id", "courses_dept", "courses_instructor"],
        "ORDER": "courses_dept",
        "FORM": "TABLE"
    }
};

var frontWildRequest = {
    WHERE: {
        "IS": {
            "courses_instructor": "*m"
        }
    },
    OPTIONS: {
        "COLUMNS": ["courses_id", "courses_dept", "courses_instructor"],
        "ORDER": "courses_dept",
        "FORM": "TABLE"
    }
};

var fusionRequest: QueryRequest = {
    WHERE: {
        "AND": [{
            "IS": {
                "courses_instructor": "wolfman, steve"

            }
        }, {
            "IS": {
                "courses_instructor": "nosco, peter"
            }
        }]
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_instructor"
        ],
        "ORDER": "courses_id",
        "FORM": "TABLE"
    }
};

var queryForRoom: QueryRequest = {
    WHERE: {
        "IS": {
            "rooms_name": "DMP_*"
        }
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_name"
        ],
        "ORDER": "rooms_name",
        "FORM": "TABLE"
    }
}

var quantumQuery: QueryRequest = {
    WHERE: {
        "EQ": {
            "courses_year": 2007
        }
    },

    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id",
            "courses_year"
        ],
        "ORDER": "courses_id",
        "FORM": "TABLE"
    }
}

var argonQuery: QueryRequest = {
    WHERE: {
        "IS": {
            "rooms_fullname": "Hugh Dempster Pavilion"
        }
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_name","rooms_shortname"
        ],
        "ORDER": "rooms_name",
        "FORM": "TABLE"
    }

}
var latQuery: QueryRequest = {
    WHERE: {
        "EQ": {
            "rooms_lat": 23.4
        }
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_name","rooms_lat"
        ],
        "ORDER": "rooms_name",
        "FORM": "TABLE"
    }

}

var heliumQuery: QueryRequest = {
    WHERE: {
        "IS": {
            "rooms_href": "*DMP*"
        }
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_name","rooms_href","rooms_number","rooms_fullname","rooms_type","rooms_furniture","rooms_seats","rooms_lat","rooms_address"
        ],
        "ORDER": "rooms_name",
        "FORM": "TABLE"
    }

}

var heliumResult = {"render":"TABLE","result":[{"rooms_name":"DMP_101","rooms_href":"http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-101","rooms_number":"101","rooms_fullname":"Hugh Dempster Pavilion","rooms_type":"Small Group","rooms_furniture":"Classroom-Movable Tables & Chairs","rooms_seats":40,"rooms_lat":49.26125,"rooms_address":"6245 Agronomy Road V6T 1Z4"},{"rooms_name":"DMP_110","rooms_href":"http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-110","rooms_number":"110","rooms_fullname":"Hugh Dempster Pavilion","rooms_type":"Tiered Large Group","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":120,"rooms_lat":49.26125,"rooms_address":"6245 Agronomy Road V6T 1Z4"},{"rooms_name":"DMP_201","rooms_href":"http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-201","rooms_number":"201","rooms_fullname":"Hugh Dempster Pavilion","rooms_type":"Small Group","rooms_furniture":"Classroom-Movable Tables & Chairs","rooms_seats":40,"rooms_lat":49.26125,"rooms_address":"6245 Agronomy Road V6T 1Z4"},{"rooms_name":"DMP_301","rooms_href":"http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-301","rooms_number":"301","rooms_fullname":"Hugh Dempster Pavilion","rooms_type":"Tiered Large Group","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":80,"rooms_lat":49.26125,"rooms_address":"6245 Agronomy Road V6T 1Z4"},{"rooms_name":"DMP_310","rooms_href":"http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-310","rooms_number":"310","rooms_fullname":"Hugh Dempster Pavilion","rooms_type":"Tiered Large Group","rooms_furniture":"Classroom-Fixed Tables/Movable Chairs","rooms_seats":160,"rooms_lat":49.26125,"rooms_address":"6245 Agronomy Road V6T 1Z4"}]}

var metroQuery:QueryRequest = {

    WHERE: {"GT": {"rooms_seats": 150}

    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_name", "rooms_seats"
        ],

        "FORM": "TABLE"
    }

}

var errANDQuery:QueryRequest = {

    WHERE: {"AND": {"rooms_seats": 150}

    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_name", "rooms_seats"
        ],

        "FORM": "TABLE"
    }

}

var errORQuery:QueryRequest = {

    WHERE: {"OR": {"rooms_seats": 150}

    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_name", "rooms_seats"
        ],

        "FORM": "TABLE"
    }

}

var nautilusQuery:QueryRequest = {

    WHERE: {"IS": {"rooms_type": "Small Group"}

    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_name", "rooms_type"
        ],

        "FORM": "TABLE"
    }

};
var bigApplyQuery = {
    WHERE: {}
,
    OPTIONS: {
        COLUMNS: [
            "courses_dept",
            "countCourses", "Grades"
        ],
        ORDER: {
            "dir": "DOWN",
            "keys": ["courses_dept"]
        },
        FORM: "TABLE"
    },
    TRANSFORMATIONS: {
        GROUP: ["courses_dept"],
        APPLY: [
            {
                "countCourses":{
                    "COUNT":"courses_id"}
            },
            {"Grades":{
                "AVG":"courses_avg"}
            }]
    }
};

var AVGcourseGradeApply = {
    WHERE: {
        "AND": [{
            "IS": {
                "courses_dept": "adhe"
            }
        }, {
            "GT": {
                "courses_avg": 70
            }
        }]
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_id", "countCourses", "Grades"
        ],
        "ORDER": {
            "dir": "DOWN",
            "keys": ["courses_dept"]
        },
        "FORM": "TABLE"
    },
    "TRANSFORMATIONS": {
        "GROUP": ["courses_dept", "courses_id"],
        "APPLY": [
            {
                "countCourses":{
                    "COUNT":"courses_id"}
            },
            {"Grades":{
                "AVG":"courses_avg"}
            }]
    }
};

var LTroomQuery:QueryRequest = {

    WHERE: {"AND":[
{
    "IS"
:
    {
        "rooms_type"
    :
        "*Group"
    }
}, {"LT": {"rooms_seats": 50}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_name", "rooms_type"
        ],

        "FORM": "TABLE"
    }

}

var laterStarQuery:QueryRequest = {

    WHERE: {"AND":[
        {
            "IS"
                :
                {
                    "rooms_type"
                        :
                        "S*"
                }
        }, {"IS": {"rooms_number": "G65"}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_name", "rooms_type"
        ],

        "FORM": "TABLE"
    }

}

var nautilusResult = {"render":"TABLE","result":[{"rooms_name":"WOOD_G65","rooms_type":"Small Group"},{"rooms_name":"WOOD_G57","rooms_type":"Small Group"},{"rooms_name":"WOOD_G53","rooms_type":"Small Group"},{"rooms_name":"WOOD_G41","rooms_type":"Small Group"},{"rooms_name":"WOOD_B75","rooms_type":"Small Group"},{"rooms_name":"WOOD_G66","rooms_type":"Small Group"},{"rooms_name":"WOOD_G59","rooms_type":"Small Group"},{"rooms_name":"WOOD_G55","rooms_type":"Small Group"},{"rooms_name":"WOOD_G44","rooms_type":"Small Group"},{"rooms_name":"WOOD_B79","rooms_type":"Small Group"},{"rooms_name":"SWNG_410","rooms_type":"Small Group"},{"rooms_name":"SWNG_408","rooms_type":"Small Group"},{"rooms_name":"SWNG_406","rooms_type":"Small Group"},{"rooms_name":"SWNG_310","rooms_type":"Small Group"},{"rooms_name":"SWNG_308","rooms_type":"Small Group"},{"rooms_name":"SWNG_306","rooms_type":"Small Group"},{"rooms_name":"SWNG_110","rooms_type":"Small Group"},{"rooms_name":"SWNG_108","rooms_type":"Small Group"},{"rooms_name":"SWNG_106","rooms_type":"Small Group"},{"rooms_name":"UCLL_101","rooms_type":"Small Group"},{"rooms_name":"SPPH_B138","rooms_type":"Small Group"},{"rooms_name":"SPPH_B112","rooms_type":"Small Group"},{"rooms_name":"SPPH_143","rooms_type":"Small Group"},{"rooms_name":"SPPH_B136","rooms_type":"Small Group"},{"rooms_name":"SPPH_B108","rooms_type":"Small Group"},{"rooms_name":"OSBO_203A","rooms_type":"Small Group"},{"rooms_name":"OSBO_203B","rooms_type":"Small Group"},{"rooms_name":"PCOH_1215","rooms_type":"Small Group"},{"rooms_name":"PCOH_1009","rooms_type":"Small Group"},{"rooms_name":"PCOH_1302","rooms_type":"Small Group"},{"rooms_name":"PCOH_1011","rooms_type":"Small Group"},{"rooms_name":"PCOH_1008","rooms_type":"Small Group"},{"rooms_name":"PHRM_3122","rooms_type":"Small Group"},{"rooms_name":"PHRM_3118","rooms_type":"Small Group"},{"rooms_name":"PHRM_3115","rooms_type":"Small Group"},{"rooms_name":"PHRM_3112","rooms_type":"Small Group"},{"rooms_name":"PHRM_3124","rooms_type":"Small Group"},{"rooms_name":"PHRM_3120","rooms_type":"Small Group"},{"rooms_name":"PHRM_3116","rooms_type":"Small Group"},{"rooms_name":"PHRM_3114","rooms_type":"Small Group"},{"rooms_name":"SCRF_209","rooms_type":"Small Group"},{"rooms_name":"SCRF_207","rooms_type":"Small Group"},{"rooms_name":"SCRF_205","rooms_type":"Small Group"},{"rooms_name":"SCRF_204","rooms_type":"Small Group"},{"rooms_name":"SCRF_202","rooms_type":"Small Group"},{"rooms_name":"SCRF_200","rooms_type":"Small Group"},{"rooms_name":"SCRF_1024","rooms_type":"Small Group"},{"rooms_name":"SCRF_1022","rooms_type":"Small Group"},{"rooms_name":"SCRF_1020","rooms_type":"Small Group"},{"rooms_name":"SCRF_1004","rooms_type":"Small Group"},{"rooms_name":"SCRF_210","rooms_type":"Small Group"},{"rooms_name":"SCRF_208","rooms_type":"Small Group"},{"rooms_name":"SCRF_206","rooms_type":"Small Group"},{"rooms_name":"SCRF_204A","rooms_type":"Small Group"},{"rooms_name":"SCRF_203","rooms_type":"Small Group"},{"rooms_name":"SCRF_201","rooms_type":"Small Group"},{"rooms_name":"SCRF_1328","rooms_type":"Small Group"},{"rooms_name":"SCRF_1023","rooms_type":"Small Group"},{"rooms_name":"SCRF_1021","rooms_type":"Small Group"},{"rooms_name":"SCRF_1005","rooms_type":"Small Group"},{"rooms_name":"SCRF_1003","rooms_type":"Small Group"},{"rooms_name":"MATH_202","rooms_type":"Small Group"},{"rooms_name":"MATH_225","rooms_type":"Small Group"},{"rooms_name":"MATH_102","rooms_type":"Small Group"},{"rooms_name":"MCML_360M","rooms_type":"Small Group"},{"rooms_name":"MCML_360K","rooms_type":"Small Group"},{"rooms_name":"MCML_360H","rooms_type":"Small Group"},{"rooms_name":"MCML_360F","rooms_type":"Small Group"},{"rooms_name":"MCML_360D","rooms_type":"Small Group"},{"rooms_name":"MCML_360B","rooms_type":"Small Group"},{"rooms_name":"MCML_358","rooms_type":"Small Group"},{"rooms_name":"MCML_256","rooms_type":"Small Group"},{"rooms_name":"MCML_360L","rooms_type":"Small Group"},{"rooms_name":"MCML_360J","rooms_type":"Small Group"},{"rooms_name":"MCML_360G","rooms_type":"Small Group"},{"rooms_name":"MCML_360E","rooms_type":"Small Group"},{"rooms_name":"MCML_360C","rooms_type":"Small Group"},{"rooms_name":"MCML_360A","rooms_type":"Small Group"},{"rooms_name":"MCML_260","rooms_type":"Small Group"},{"rooms_name":"MCLD_220","rooms_type":"Small Group"},{"rooms_name":"SOWK_326","rooms_type":"Small Group"},{"rooms_name":"SOWK_122","rooms_type":"Small Group"},{"rooms_name":"SOWK_324","rooms_type":"Small Group"},{"rooms_name":"IBLC_460","rooms_type":"Small Group"},{"rooms_name":"IBLC_265","rooms_type":"Small Group"},{"rooms_name":"IBLC_263","rooms_type":"Small Group"},{"rooms_name":"IBLC_195","rooms_type":"Small Group"},{"rooms_name":"IBLC_193","rooms_type":"Small Group"},{"rooms_name":"IBLC_191","rooms_type":"Small Group"},{"rooms_name":"IBLC_157","rooms_type":"Small Group"},{"rooms_name":"IBLC_461","rooms_type":"Small Group"},{"rooms_name":"IBLC_266","rooms_type":"Small Group"},{"rooms_name":"IBLC_264","rooms_type":"Small Group"},{"rooms_name":"IBLC_194","rooms_type":"Small Group"},{"rooms_name":"IBLC_192","rooms_type":"Small Group"},{"rooms_name":"IBLC_185","rooms_type":"Small Group"},{"rooms_name":"IBLC_158","rooms_type":"Small Group"},{"rooms_name":"IBLC_156","rooms_type":"Small Group"},{"rooms_name":"DMP_201","rooms_type":"Small Group"},{"rooms_name":"DMP_101","rooms_type":"Small Group"},{"rooms_name":"ANGU_339","rooms_type":"Small Group"},{"rooms_name":"ANGU_332","rooms_type":"Small Group"},{"rooms_name":"ANGU_292","rooms_type":"Small Group"},{"rooms_name":"ANGU_232","rooms_type":"Small Group"},{"rooms_name":"HENN_302","rooms_type":"Small Group"},{"rooms_name":"HENN_304","rooms_type":"Small Group"},{"rooms_name":"HENN_301","rooms_type":"Small Group"},{"rooms_name":"GEOG_214","rooms_type":"Small Group"},{"rooms_name":"GEOG_242","rooms_type":"Small Group"},{"rooms_name":"LASR_211","rooms_type":"Small Group"},{"rooms_name":"LASR_5C","rooms_type":"Small Group"},{"rooms_name":"FORW_519","rooms_type":"Small Group"},{"rooms_name":"FORW_317","rooms_type":"Small Group"},{"rooms_name":"FSC_1615","rooms_type":"Small Group"},{"rooms_name":"FSC_1611","rooms_type":"Small Group"},{"rooms_name":"FSC_1617","rooms_type":"Small Group"},{"rooms_name":"FSC_1613","rooms_type":"Small Group"},{"rooms_name":"FSC_1402","rooms_type":"Small Group"},{"rooms_name":"FSC_1002","rooms_type":"Small Group"},{"rooms_name":"FNH_320","rooms_type":"Small Group"},{"rooms_name":"FNH_20","rooms_type":"Small Group"},{"rooms_name":"FNH_30","rooms_type":"Small Group"},{"rooms_name":"CEME_1206","rooms_type":"Small Group"},{"rooms_name":"CEME_1210","rooms_type":"Small Group"},{"rooms_name":"BUCH_D325","rooms_type":"Small Group"},{"rooms_name":"BUCH_D315","rooms_type":"Small Group"},{"rooms_name":"BUCH_D313","rooms_type":"Small Group"},{"rooms_name":"BUCH_D307","rooms_type":"Small Group"},{"rooms_name":"BUCH_D304","rooms_type":"Small Group"},{"rooms_name":"BUCH_D229","rooms_type":"Small Group"},{"rooms_name":"BUCH_D214","rooms_type":"Small Group"},{"rooms_name":"BUCH_D209","rooms_type":"Small Group"},{"rooms_name":"BUCH_D205","rooms_type":"Small Group"},{"rooms_name":"BUCH_B312","rooms_type":"Small Group"},{"rooms_name":"BUCH_B307","rooms_type":"Small Group"},{"rooms_name":"BUCH_B304","rooms_type":"Small Group"},{"rooms_name":"BUCH_B302","rooms_type":"Small Group"},{"rooms_name":"BUCH_D323","rooms_type":"Small Group"},{"rooms_name":"BUCH_D319","rooms_type":"Small Group"},{"rooms_name":"BUCH_D306","rooms_type":"Small Group"},{"rooms_name":"BUCH_D228","rooms_type":"Small Group"},{"rooms_name":"BUCH_D221","rooms_type":"Small Group"},{"rooms_name":"BUCH_D216","rooms_type":"Small Group"},{"rooms_name":"BUCH_D213","rooms_type":"Small Group"},{"rooms_name":"BUCH_D207","rooms_type":"Small Group"},{"rooms_name":"BUCH_B319","rooms_type":"Small Group"},{"rooms_name":"BUCH_B316","rooms_type":"Small Group"},{"rooms_name":"BUCH_B310","rooms_type":"Small Group"},{"rooms_name":"BUCH_B308","rooms_type":"Small Group"},{"rooms_name":"BUCH_B306","rooms_type":"Small Group"},{"rooms_name":"BUCH_B216","rooms_type":"Small Group"},{"rooms_name":"BIOL_1503","rooms_type":"Small Group"},{"rooms_name":"BIOL_2519","rooms_type":"Small Group"},{"rooms_name":"AUDX_142","rooms_type":"Small Group"},{"rooms_name":"AUDX_157","rooms_type":"Small Group"},{"rooms_name":"ANSO_205","rooms_type":"Small Group"},{"rooms_name":"ANSO_202","rooms_type":"Small Group"},{"rooms_name":"ANSO_203","rooms_type":"Small Group"}]}

var argonResult = {"render":"TABLE","result":[{"rooms_name":"DMP_101","rooms_shortname":"DMP"},{"rooms_name":"DMP_110","rooms_shortname":"DMP"},{"rooms_name":"DMP_201","rooms_shortname":"DMP"},{"rooms_name":"DMP_301","rooms_shortname":"DMP"},{"rooms_name":"DMP_310","rooms_shortname":"DMP"}]}
var metroResult = {"render":"TABLE","result":[{"rooms_name":"WOOD_6","rooms_seats":181},{"rooms_name":"WOOD_2","rooms_seats":503},{"rooms_name":"SWNG_221","rooms_seats":190},{"rooms_name":"SWNG_121","rooms_seats":187},{"rooms_name":"SWNG_222","rooms_seats":190},{"rooms_name":"SWNG_122","rooms_seats":188},{"rooms_name":"WESB_100","rooms_seats":325},{"rooms_name":"SRC_220C","rooms_seats":299},{"rooms_name":"SRC_220A","rooms_seats":299},{"rooms_name":"SRC_220B","rooms_seats":299},{"rooms_name":"OSBO_A","rooms_seats":442},{"rooms_name":"PHRM_1101","rooms_seats":236},{"rooms_name":"PHRM_1201","rooms_seats":167},{"rooms_name":"SCRF_100","rooms_seats":280},{"rooms_name":"MATH_100","rooms_seats":224},{"rooms_name":"MCML_166","rooms_seats":200},{"rooms_name":"LSC_1001","rooms_seats":350},{"rooms_name":"LSC_1002","rooms_seats":350},{"rooms_name":"LSK_200","rooms_seats":205},{"rooms_name":"LSK_201","rooms_seats":183},{"rooms_name":"IBLC_182","rooms_seats":154},{"rooms_name":"DMP_310","rooms_seats":160},{"rooms_name":"ANGU_098","rooms_seats":260},{"rooms_name":"HENN_200","rooms_seats":257},{"rooms_name":"HENN_201","rooms_seats":155},{"rooms_name":"HEBB_100","rooms_seats":375},{"rooms_name":"GEOG_100","rooms_seats":225},{"rooms_name":"FRDM_153","rooms_seats":160},{"rooms_name":"FSC_1005","rooms_seats":250},{"rooms_name":"ESB_1013","rooms_seats":350},{"rooms_name":"CHEM_B150","rooms_seats":265},{"rooms_name":"CHEM_B250","rooms_seats":240},{"rooms_name":"CHBE_101","rooms_seats":200},{"rooms_name":"CIRS_1250","rooms_seats":426},{"rooms_name":"BUCH_A201","rooms_seats":181},{"rooms_name":"BUCH_A101","rooms_seats":275},{"rooms_name":"BIOL_2000","rooms_seats":228}]}

var argonQuery1: QueryRequest = {
    WHERE: {
        "IS": {
            "rooms_shortname": "DMP"
        }
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_name","rooms_shortname"
        ],
        "ORDER": "rooms_name",
        "FORM": "TABLE"
    }
}

var queryRequest20: QueryRequest = {

    WHERE: {
        "AND": [
            {"GT": {"courses_avg": 90}},
            {"GT": {"courses_avg": 90}}
        ]

    },
    OPTIONS: {
        "COLUMNS": [
            "courses_dept",
            "courses_avg"
        ],
        "ORDER": "courses_avg",
        "FORM": "TABLE"
    }

};

var queryForRoomComplex: QueryRequest = {
    WHERE: {
        "IS": {
            "rooms_address": "*Agrono*"
        }
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_address", "rooms_name"
        ],
        "FORM": "TABLE"
    }
};

var kleeneQuery: QueryRequest = {
    WHERE: {"AND":[{"NOT":{
        "IS": {
            "rooms_furniture": "*Movable Tables*"
        }}},
        {"IS":{"rooms_type": "*Group*"}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_address", "rooms_name"
        ],
        "ORDER": "rooms_name",
        "FORM": "TABLE"
    }
}

var knuthQuery: QueryRequest = {
    WHERE: {"AND":[{"NOT":{
        "IS": {
            "rooms_furniture": "*Movable Tables*"
        }}},
        {"IS":{"rooms_type": "*Studio*"}}]
    },
    OPTIONS: {
        "COLUMNS": [
            "rooms_furniture", "rooms_name"
        ],
        "ORDER": "rooms_name",
        "FORM": "TABLE"
    }
}

var knuthResult ={"render":"TABLE","result":[{"rooms_furniture":"Classroom-Learn Lab","rooms_name":"ORCH_3018"},{"rooms_furniture":"Classroom-Learn Lab","rooms_name":"ORCH_4074"},{"rooms_furniture":"Classroom-Learn Lab","rooms_name":"UCLL_109"}]}


var kleeneResult = {"render":"TABLE","result":[{"rooms_address":"2202 Main Mall","rooms_name":"AERL_120"},{"rooms_address":"2053 Main Mall","rooms_name":"ANGU_098"},{"rooms_address":"2053 Main Mall","rooms_name":"ANGU_241"},{"rooms_address":"2053 Main Mall","rooms_name":"ANGU_243"},{"rooms_address":"2053 Main Mall","rooms_name":"ANGU_343"},{"rooms_address":"2053 Main Mall","rooms_name":"ANGU_345"},{"rooms_address":"2053 Main Mall","rooms_name":"ANGU_347"},{"rooms_address":"2053 Main Mall","rooms_name":"ANGU_350"},{"rooms_address":"2053 Main Mall","rooms_name":"ANGU_354"},{"rooms_address":"6303 North West Marine Drive","rooms_name":"ANSO_203"},{"rooms_address":"6303 North West Marine Drive","rooms_name":"ANSO_205"},{"rooms_address":"6270 University Boulevard","rooms_name":"BIOL_2000"},{"rooms_address":"6270 University Boulevard","rooms_name":"BIOL_2200"},{"rooms_address":"1874 East Mall","rooms_name":"BRKX_2365"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_A101"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_A102"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_A103"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_A104"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_A201"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_B302"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_B304"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_B306"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_B307"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_B308"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_B310"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_B313"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_B315"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_B319"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_D213"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_D216"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_D217"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_D218"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_D219"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_D228"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_D304"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_D306"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_D307"},{"rooms_address":"1866 Main Mall","rooms_name":"BUCH_D313"},{"rooms_address":"6250 Applied Science Lane","rooms_name":"CEME_1202"},{"rooms_address":"2360 East Mall V6T 1Z3","rooms_name":"CHBE_101"},{"rooms_address":"2360 East Mall V6T 1Z3","rooms_name":"CHBE_102"},{"rooms_address":"2036 Main Mall","rooms_name":"CHEM_B150"},{"rooms_address":"2036 Main Mall","rooms_name":"CHEM_B250"},{"rooms_address":"2036 Main Mall","rooms_name":"CHEM_C124"},{"rooms_address":"2036 Main Mall","rooms_name":"CHEM_C126"},{"rooms_address":"2036 Main Mall","rooms_name":"CHEM_D200"},{"rooms_address":"2036 Main Mall","rooms_name":"CHEM_D300"},{"rooms_address":"2260 West Mall, V6T 1Z4","rooms_name":"CIRS_1250"},{"rooms_address":"6245 Agronomy Road V6T 1Z4","rooms_name":"DMP_110"},{"rooms_address":"6245 Agronomy Road V6T 1Z4","rooms_name":"DMP_301"},{"rooms_address":"6245 Agronomy Road V6T 1Z4","rooms_name":"DMP_310"},{"rooms_address":"2207 Main Mall","rooms_name":"ESB_1012"},{"rooms_address":"2207 Main Mall","rooms_name":"ESB_1013"},{"rooms_address":"2207 Main Mall","rooms_name":"ESB_2012"},{"rooms_address":"2205 East Mall","rooms_name":"FNH_20"},{"rooms_address":"2205 East Mall","rooms_name":"FNH_320"},{"rooms_address":"2205 East Mall","rooms_name":"FNH_60"},{"rooms_address":"2177 Wesbrook Mall V6T 1Z3","rooms_name":"FRDM_153"},{"rooms_address":"2424 Main Mall","rooms_name":"FSC_1005"},{"rooms_address":"2424 Main Mall","rooms_name":"FSC_1221"},{"rooms_address":"1984 West Mall","rooms_name":"GEOG_100"},{"rooms_address":"1984 West Mall","rooms_name":"GEOG_214"},{"rooms_address":"1984 West Mall","rooms_name":"GEOG_242"},{"rooms_address":"2045 East Mall","rooms_name":"HEBB_100"},{"rooms_address":"6224 Agricultural Road","rooms_name":"HENN_200"},{"rooms_address":"6224 Agricultural Road","rooms_name":"HENN_201"},{"rooms_address":"6224 Agricultural Road","rooms_name":"HENN_202"},{"rooms_address":"1961 East Mall V6T 1Z1","rooms_name":"IBLC_182"},{"rooms_address":"1961 East Mall V6T 1Z1","rooms_name":"IBLC_192"},{"rooms_address":"1961 East Mall V6T 1Z1","rooms_name":"IBLC_193"},{"rooms_address":"1961 East Mall V6T 1Z1","rooms_name":"IBLC_194"},{"rooms_address":"1961 East Mall V6T 1Z1","rooms_name":"IBLC_263"},{"rooms_address":"1961 East Mall V6T 1Z1","rooms_name":"IBLC_266"},{"rooms_address":"1961 East Mall V6T 1Z1","rooms_name":"IBLC_461"},{"rooms_address":"6333 Memorial Road","rooms_name":"LASR_102"},{"rooms_address":"6333 Memorial Road","rooms_name":"LASR_104"},{"rooms_address":"2350 Health Sciences Mall","rooms_name":"LSC_1001"},{"rooms_address":"2350 Health Sciences Mall","rooms_name":"LSC_1002"},{"rooms_address":"2350 Health Sciences Mall","rooms_name":"LSC_1003"},{"rooms_address":"6356 Agricultural Road","rooms_name":"LSK_200"},{"rooms_address":"6356 Agricultural Road","rooms_name":"LSK_201"},{"rooms_address":"1984 Mathematics Road","rooms_name":"MATH_100"},{"rooms_address":"1984 Mathematics Road","rooms_name":"MATH_202"},{"rooms_address":"1984 Mathematics Road","rooms_name":"MATH_225"},{"rooms_address":"1986 Mathematics Road","rooms_name":"MATX_1100"},{"rooms_address":"2356 Main Mall","rooms_name":"MCLD_202"},{"rooms_address":"2356 Main Mall","rooms_name":"MCLD_228"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_158"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_166"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_360A"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_360B"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_360C"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_360D"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_360E"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_360F"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_360G"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_360H"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_360J"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_360K"},{"rooms_address":"2357 Main Mall","rooms_name":"MCML_360L"},{"rooms_address":"6108 Thunderbird Boulevard","rooms_name":"OSBO_203B"},{"rooms_address":"6445 University Boulevard","rooms_name":"PCOH_1008"},{"rooms_address":"2405 Wesbrook Mall","rooms_name":"PHRM_1101"},{"rooms_address":"2405 Wesbrook Mall","rooms_name":"PHRM_1201"},{"rooms_address":"2125 Main Mall","rooms_name":"SCRF_100"},{"rooms_address":"2125 Main Mall","rooms_name":"SCRF_201"},{"rooms_address":"2125 Main Mall","rooms_name":"SCRF_203"},{"rooms_address":"2206 East Mall","rooms_name":"SPPH_143"},{"rooms_address":"2206 East Mall","rooms_name":"SPPH_B108"},{"rooms_address":"2175 West Mall V6T 1Z4","rooms_name":"SWNG_121"},{"rooms_address":"2175 West Mall V6T 1Z4","rooms_name":"SWNG_122"},{"rooms_address":"2175 West Mall V6T 1Z4","rooms_name":"SWNG_221"},{"rooms_address":"2175 West Mall V6T 1Z4","rooms_name":"SWNG_222"},{"rooms_address":"2175 West Mall V6T 1Z4","rooms_name":"SWNG_406"},{"rooms_address":"2175 West Mall V6T 1Z4","rooms_name":"SWNG_408"},{"rooms_address":"6174 University Boulevard","rooms_name":"WESB_100"},{"rooms_address":"6174 University Boulevard","rooms_name":"WESB_201"},{"rooms_address":"2194 Health Sciences Mall","rooms_name":"WOOD_1"},{"rooms_address":"2194 Health Sciences Mall","rooms_name":"WOOD_2"},{"rooms_address":"2194 Health Sciences Mall","rooms_name":"WOOD_3"},{"rooms_address":"2194 Health Sciences Mall","rooms_name":"WOOD_4"},{"rooms_address":"2194 Health Sciences Mall","rooms_name":"WOOD_5"},{"rooms_address":"2194 Health Sciences Mall","rooms_name":"WOOD_6"},{"rooms_address":"2194 Health Sciences Mall","rooms_name":"WOOD_B79"}]}

var resultForapply = {"render":"TABLE","result":[{"rooms_fullname":"Woodward (Instructional Resources Centre-IRC)","maxSeats":120,"sumSeats":360,"countSeats":1},{"rooms_fullname":"West Mall Swing Space","maxSeats":190,"sumSeats":755,"countSeats":3},{"rooms_fullname":"Student Recreation Centre","maxSeats":299,"sumSeats":897,"countSeats":1},{"rooms_fullname":"Robert F. Osborne Centre","maxSeats":442,"sumSeats":442,"countSeats":1},{"rooms_fullname":"Pharmaceutical Sciences Building","maxSeats":236,"sumSeats":403,"countSeats":2},{"rooms_fullname":"MacLeod","maxSeats":136,"sumSeats":259,"countSeats":2},{"rooms_fullname":"Life Sciences Centre","maxSeats":350,"sumSeats":825,"countSeats":2},{"rooms_fullname":"Leonard S. Klinck (also known as CSCI)","maxSeats":205,"sumSeats":388,"countSeats":2},{"rooms_fullname":"Irving K Barber Learning Centre","maxSeats":154,"sumSeats":266,"countSeats":2},{"rooms_fullname":"Hugh Dempster Pavilion","maxSeats":160,"sumSeats":280,"countSeats":2},{"rooms_fullname":"Henry Angus","maxSeats":260,"sumSeats":260,"countSeats":1},{"rooms_fullname":"Hebb","maxSeats":375,"sumSeats":375,"countSeats":1},{"rooms_fullname":"Friedman Building","maxSeats":160,"sumSeats":160,"countSeats":1},{"rooms_fullname":"Chemical and Biological Engineering Building","maxSeats":200,"sumSeats":200,"countSeats":1},{"rooms_fullname":"Buchanan","maxSeats":108,"sumSeats":216,"countSeats":1}]};

var resultForCountCourses = {"render":"TABLE","result":[{"courses_dept":"adhe","courses_id":"412","countCourses":1},{"courses_dept":"adhe","courses_id":"330","countCourses":1},{"courses_dept":"adhe","courses_id":"329","countCourses":1},{"courses_dept":"adhe","courses_id":"328","countCourses":1},{"courses_dept":"adhe","courses_id":"327","countCourses":1}]};

var AVGCourseApplyResult = {"render":"TABLE","result":[{"courses_dept":"adhe","courses_id":"412","countCourses":1,"Grades":81},{"courses_dept":"adhe","courses_id":"330","countCourses":1,"Grades":85.25},{"courses_dept":"adhe","courses_id":"329","countCourses":1,"Grades":83.44},{"courses_dept":"adhe","courses_id":"328","countCourses":1,"Grades":80.63},{"courses_dept":"adhe","courses_id":"327","countCourses":1,"Grades":83.05}]};

var result = {
    "render": "TABLE",
    "result": [{
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_4074"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_4068"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_4058"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_4018"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_4004"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_3074"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_3068"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_3058"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_3018"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_3004"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_1001"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_4072"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_4062"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_4052"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_4016"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_4002"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_3072"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_3062"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_3052"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_3016"
    }, {
        "rooms_address": "6363 Agronomy Road",
        "rooms_name": "ORCH_3002"
    }, {
        "rooms_address": "6245 Agronomy Road V6T 1Z4",
        "rooms_name": "DMP_310"
    }, {
        "rooms_address": "6245 Agronomy Road V6T 1Z4",
        "rooms_name": "DMP_201"
    }, {
        "rooms_address": "6245 Agronomy Road V6T 1Z4",
        "rooms_name": "DMP_101"
    }, {
        "rooms_address": "6245 Agronomy Road V6T 1Z4",
        "rooms_name": "DMP_301"
    }, {
        "rooms_address": "6245 Agronomy Road V6T 1Z4",
        "rooms_name": "DMP_110"
    }]
};



describe("InsightFacadeTest", function () {

    let s = new Server(4321);

    let URL = "http://localhost:4321";

    before(function () { //runs once
        Log.test('Before: ' + (<any>this).test.parent.title);

        inValidZip = Buffer.from(fs.readFileSync("./invalidJson.zip")).toString('base64');

        return s.start().then().catch();

    });

    beforeEach(function () {

        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        insightFacade = new InsightFacade();
        zipStuff = Buffer.from(fs.readFileSync("./courses.zip")).toString('base64');
        wrongZip = "./testfile";

        queryRequest.WHERE = {
            "GT": {
                "courses_avg": 97
            }
        };
        queryRequest.OPTIONS = {
            "COLUMNS": ["courses_dept", "courses_avg"],
            "ORDER": "courses_avg",
            "FORM": "TABLE"
        };

        queryRequestNoOrder.WHERE = {
            "GT": {
                "courses_avg": 97
            }
        };
        queryRequestNoOrder.OPTIONS = {
            "COLUMNS": ["courses_dept", "courses_avg"],
            "FORM": "TABLE"
        };

        queryRequest11.WHERE = {
            "IS": {
                "courses_title": "med, soci, cultr"
            }
        };
        queryRequest11.OPTIONS = {
            "COLUMNS": ["courses_dept", "courses_avg"],
            "ORDER": "courses_avg",
            "FORM": "TABLE"
        };

        queryRequest22.WHERE = {
            "IS": {
                "courses_instructor": "edgington, david william"
            }
        };
        queryRequest22.OPTIONS = {
            "COLUMNS": ["courses_instructor", "courses_id"],
            "ORDER": "courses_instructor",
            "FORM": "TABLE"
        };

        queryRequest14.WHERE = {
            "AND": [
                {
                    "NOT": {
                        "IS": {
                            "courses_instructor": "*mckellin*"
                        }
                    }

                },
                {
                    "IS": {
                        "courses_dept": "anth"
                    }
                }
            ]
        };
        queryRequest14.OPTIONS = {
            "COLUMNS": ["courses_dept", "courses_avg"],
            "ORDER": "courses_avg",
            "FORM": "TABLE"
        };

        queryRequest13.WHERE = {
            "IS": {
                "courses_instructor": "*william*"
            }
        };
        queryRequest13.OPTIONS = {
            "COLUMNS": ["courses_uuid", "courses_dept", "courses_instructor"],
            "ORDER": "courses_dept",
            "FORM": "TABLE"
        };

        queryRequest13.WHERE = {
            "IS": {
                "courses_instructor": "wi*"
            }
        };
        queryRequest13.OPTIONS = {
            "COLUMNS": ["courses_uuid", "courses_dept", "courses_instructor"],
            "ORDER": "courses_dept",
            "FORM": "TABLE"
        };

        queryRequest15.WHERE = {
            "IS": {
                "courses_instructor": "*david*"
            }
        };
        queryRequest15.OPTIONS = {
            "COLUMNS": ["courses_instructor", "courses_avg"],
            "ORDER": "courses_instructor",
            "FORM": "TABLE"
        };

        queryRequest16.WHERE = {
            "IS": {
                "courses_dept": "*he*"
            }
        };
        queryRequest16.OPTIONS = {
            "COLUMNS": ["courses_instructor", "courses_avg"],
            "ORDER": "courses_avg",
            "FORM": "TABLE"
        };

        queryRequest17.WHERE = {

            "NOT": {
                "IS": {
                    "courses_instructor": "*david*"
                }
            }

        };
        queryRequest17.OPTIONS = {
            "COLUMNS": ["courses_dept", "courses_avg"],
            "ORDER": "courses_avg",
            "FORM": "TABLE"
        };

        queryRequest12.WHERE = {
            "AND": [{
                "IS": {"courses_dept": "cpsc"}
            },
                {
                    "AND": [
                        {
                            "GT": {
                                "courses_avg": 70
                            }
                        },
                        {
                            "LT": {
                                "courses_avg": 80
                            }
                        }

                    ]
                }]
        };
        queryRequest12.OPTIONS = {
            "COLUMNS": ["courses_dept", "courses_avg"],
            "ORDER": "courses_avg",
            "FORM": "TABLE"
        };

        queryRequest10.WHERE = {
            "GT": {
                "courses_audit": 15
            }
        };
        queryRequest10.OPTIONS = {
            "COLUMNS": ["courses_dept", "courses_avg"],
            "ORDER": "courses_avg",
            "FORM": "TABLE"
        };

        queryRequest2.WHERE = {
            "OR": [
                {
                    "AND": [
                        {
                            "GT": {
                                "courses_avg": 90
                            }
                        },
                        {
                            "IS": {
                                "courses_dept": "adhe"
                            }
                        }
                    ]
                },
                {
                    "EQ": {
                        "courses_avg": 95
                    }
                }
            ]
        };

        queryRequest2.OPTIONS = {
            "COLUMNS": [
                "courses_dept",
                "courses_id",
                "courses_avg"
            ],
            "ORDER": "courses_id",
            "FORM": "TABLE"
        };

        queryRequest3.WHERE = {
            //check wrong "courses_something"
            "OR": [
                {
                    "AND": [
                        {
                            "GT": {
                                "courses_avg": 90
                            }
                        },
                        {
                            "IS": {
                                "courses_dept": "adhe"
                            }
                        }
                    ]
                },
                {
                    "EQ": {
                        "courses_avg": 95
                    }
                }
            ]
        };

        queryRequest3.OPTIONS = {
            "COLUMNS": ["courses_dept", "courses_avg"],
            "ORDER": "courses",
            "FORM": "TABLE"
        };

        queryRequest4.WHERE = {
            //check wrong "or, and, is, etcc"
            "OR": [
                {
                    "wrong": [
                        {
                            "wrong": {
                                "courses_avg": 90
                            }
                        },
                        {
                            "IS": {
                                "courses_dept": "adhe"
                            }
                        }
                    ]
                },
                {
                    "EQ": {
                        "courses_avg": 95
                    }
                }
            ]
        };

        queryRequest4.OPTIONS = {
            "COLUMNS": ["courses_dept", "courses_avg"],
            "ORDER": "courses_avg",
            "FORM": "TABLE"
        };

        queryRequest5.WHERE = {
            "OR": [
                {
                    "AND": [
                        {
                            "GT": {
                                "courses_avg": 90
                            }
                        },
                        {
                            "IS": {
                                "courses_dept": 10
                            }
                        }
                    ]
                },
                {
                    "EQ": {
                        "courses_avg": 95
                    }
                }
            ]
        };

        queryRequest5.OPTIONS = {
            "COLUMNS": [
                "courses_dept",
                "courses_id",
                "courses_avg"
            ],
            "ORDER": "courses_avg",
            "FORM": "TABLE"
        };

        queryRequest6.WHERE = {
            "OR": [
                {
                    "AND": [
                        {
                            "GT": {
                                "courses_invalid": 90
                            }
                        },
                        {
                            "IS": {
                                "courses_wrong": "adhe"
                            }
                        }
                    ]
                },
                {
                    "EQ": {
                        "courses_avg": 95
                    }
                }
            ]
        };

        queryRequest6.OPTIONS = {
            "COLUMNS": [
                "courses_dept",
                "courses_id",
                "courses_avg"
            ],
            "ORDER": "courses_avg",
            "FORM": "TABLE"
        };

        queryRequest8.WHERE = {
            "OR": [{
                "AND": [{
                    "GT": {
                        "wrong_avg": 97
                    }
                }, {
                    "IS": {
                        "hello_dept": "cpsc"
                    }
                }]
            },
                {
                    "LT": {
                        "cour_avg": 80
                    }
                },
                {
                    "EQ": {
                        "unit_avg": 85
                    }
                }
            ]
        };
        queryRequest8.OPTIONS = {
            "COLUMNS": ["courses_dept", "courses_avg"],
            "ORDER": "courses_avg",
            "FORM": "TABLE"
        };

        LTRequest.WHERE = {
            "OR": [{
                "AND": [
                    {
                        "LT": {
                            "courses_pass": 90
                        }
                    },
                    {
                        "IS": {
                            "courses_instructor": "Wolfman"
                        }
                    },
                    {
                        "IS": {
                            "courses_pass": 50
                        }
                    },
                    {
                        "IS": {
                            "courses_fail": 5
                        }
                    },
                    {
                        "IS": {
                            "courses_audit": 10
                        }
                    }
                ]
            },
                {
                    "EQ": {
                        "courses_audit": 1
                    }
                }
            ]
        };

        LTRequest.OPTIONS = {
            "COLUMNS": ["courses_id", "courses_avg"],
            "ORDER": "courses_avg",
            "FORM": "TABLE"
        };

    });

    after(function () {
        Log.test('After: ' + (<any>this).test.parent.title);

        return s.stop().then().catch();
    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
        insightFacade = null;
    });


    // it("delete file fail --- reject(404)", function () {
    //     this.timeout(10000);
    //     return insightFacade.removeDataset('courses').then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect(err.code).to.equal(404);
    //     });
    // });

    it("adding rooms.zip first time --- resolve(204)", function () {
        this.timeout(10000);
        return insightFacade.addDataset('rooms', roomFile).then(function (value) {
            //Log.test('Value: ' + value.code);
            expect(value.code).to.equal(204);
        }).catch(function (err) {
            console.log("error" + JSON.stringify(err));
            expect.fail();
        });
    });

    // it("apply furniture", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(applyRequest2).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //        // console.log(value.body);
    //         //   expect(value.body).to.deep.equal(applyResult2);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });

    it("apply with maxseat and avgseat", function () {
        this.timeout(10000);
        return insightFacade.performQuery(roomWithApply).then(function (value) {
            Log.test('Value: ' + value.code);
            //console.log(value.body);
            expect(value.code).to.equal(200);
            expect(value.body).to.deep.equal(resultForapply);

        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });


    // it("PUT description", function () {
    //     this.timeout(10000);
    //     fs.unlinkSync("./rooms.json");
    //     return chai.request(URL)
    //         .put('/dataset/rooms')
    //         .attach("body", fs.readFileSync("./rooms.zip"), "rooms.zip")
    //         .then(function (res: any) {
    //             Log.trace('then:');
    //             expect(res).to.have.status(204);
    //             // some assertions
    //         })
    //         .catch(function (err:any) {
    //             Log.trace('catch:'+err);
    //             // some assertions
    //             expect.fail();
    //         });
    // });
    //
    // it("POST description", function () {
    //     return chai.request(URL)
    //         .post('/query')
    //         .send(queryForRoom)
    //         .then(function (res: any) {
    //             Log.trace('then:');
    //             expect(res).to.have.status(200);
    //             // some assertions
    //         })
    //         .catch(function (err:any) {
    //             Log.trace('catch:');
    //             // some assertions
    //             expect.fail();
    //         });
    // });
    // it("DEL should remove a dataset", function () {
    //     return chai.request(URL)
    //         .del('/dataset/rooms')
    //         .then(function (res: any) {
    //             Log.trace('then:');
    //             expect(res.status).to.equal(204);
    //         })
    //         .catch(function (err:any) {
    //             Log.trace('catch:');
    //             expect.fail();
    //         });
    // });
    // it("DEL should remove a dataset2", function () {
    //     return chai.request(URL)
    //         .del('/dataset/rooms')
    //         .then(function (res: any) {
    //             Log.trace('then:');
    //             expect.fail();
    //         })
    //         .catch(function (err:any) {
    //             Log.trace('catch:');
    //             expect(err.status).to.equal(404);
    //         });
    // });

    it("adding rooms.zip first time2 --- resolve(204)", function () {
        this.timeout(10000);
        return insightFacade.addDataset('rooms', roomFile).then(function (value) {
            //Log.test('Value: ' + value.code);
            expect(value.code).to.equal(204);
        }).catch(function (err) {
            console.log("error" + JSON.stringify(err));
            expect.fail();
        });
    });

    it("latQuery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(latQuery).then(function (value) {
            Log.test('Value: ' + value.code);
            //console.log(value.body);
            expect(value.code).to.equal(200);
            //expect(value.body).to.deep.equal(argonResult);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    // it("Knuth: Find all studio type rooms without some furniture.", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(knuthQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         //console.log(value.body);
    //         expect(value.code).to.equal(200);
    //         //expect(knuthResult).to.deep.equal(value.body);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("apply is empty but column contain maxseat - should give 400", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(testfornoApply).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect(err.code).to.equal(400);
    //       //  console.log(err.body);
    //     });
    // });
    //
    //
    //
    //
    //
    // it("Nautilus: Should be able to find all rooms of a certain type", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(nautilusQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         //console.log(value.body);
    //         expect(value.code).to.equal(200);
    //       //  expect(JSON.stringify(value.body).length).to.equal(JSON.stringify(nautilusResult).length);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("deepNest", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(deepNestRequest).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         //console.log(value.body);
    //         expect(value.code).to.equal(200);
    //         //expect(JSON.stringify(value.body).length).to.equal(JSON.stringify(nautilusResult).length);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("LTroomQuery", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(LTroomQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("laterStarQuery", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(laterStarQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("Helium: Filter by partial href", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(heliumQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         //console.log(value.body);
    //         expect(value.code).to.equal(200);
    //        // expect(heliumResult).to.deep.equal(value.body);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });

    it("Kleene: Find all group type rooms without some furniture", function () {
        this.timeout(10000);
        return insightFacade.performQuery(kleeneQuery).then(function (value) {
            Log.test('Value: ' + value.code);
            //console.log(value.body);
            expect(value.code).to.equal(200);
            //expect(kleeneResult).to.deep.equal(value.body);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    it("errAND", function () {
        this.timeout(10000);
        return insightFacade.performQuery(errANDQuery).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(400);
        });
    });

    it("errOR", function () {
        this.timeout(10000);
        return insightFacade.performQuery(errORQuery).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(400);
        });
    });


    it("server", function () {
        Serv1.start();
        Serv1.stop();
    });

    it("adding rooms.zip with wrong id --- resolve(400)", function () {
        this.timeout(10000);
        return insightFacade.addDataset('courses123', roomFile).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + JSON.stringify(err));
            expect(err.code).to.equal(400);
        });
    });

    it("adding rooms.zip with courses id --- resolve(400)", function () {
        this.timeout(10000);
        return insightFacade.addDataset('courses', roomFile).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
           console.log("error" + JSON.stringify(err.body));
            expect(err.code).to.equal(400);
        });
    });


    it("delete file fail --- reject(404)", function () {
        this.timeout(10000);
        return insightFacade.removeDataset('courses').then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(404);
        });
    });


    // it("cant parse file - reject 400", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('courses123', inValidZip).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         //console.log(JSON.stringify(err.body));
    //         expect(err.code).to.equal(400);
    //     });
    // });

    it("add file fail- reject 400", function () {
        this.timeout(10000);
        return insightFacade.addDataset('courses1223', invalidFile).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            //console.log(JSON.stringify(err.body));
            expect(err.code).to.equal(400);
        });
    });

    it("query for room", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryForRoom).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            // console.log(JSON.stringify(value.body));
            //   expect(value.body).to.deep.equal(testResult);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });


    it("query for room complex", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryForRoomComplex).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            // console.log(JSON.stringify(value.body));
            //     expect(value.body).to.deep.equal(result);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    it("query lat lon", function () {
        this.timeout(10000);
        return insightFacade.performQuery(newTestwithLatlong).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
           // console.log(JSON.stringify(value.body));
            //     expect(value.body).to.deep.equal(result);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });


    it("cant parse file(no result key) - reject 400", function () {
        this.timeout(10000);
        return insightFacade.addDataset('coursesNO', noResultZip).then(function (value) {
            //Log.test('Value: ' + value.body);
            expect.fail();
        }).catch(function (err) {
            expect(err.code).to.equal(400);
        });
    });


    it("cant parse not a zip file - reject 400", function () {
        this.timeout(10000);
        return insightFacade.addDataset('coursesDIE', wrongZip).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            // console.log(JSON.stringify(err.body));
            expect(err.code).to.equal(400);
        });
    });
    //
    // it("first add of file - resolve in 204", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('courses', zipStuff).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(201);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });

    it("adding courses", function () {
        this.timeout(10000);
        return insightFacade.addDataset('courses', zipStuff).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(201);
        }).catch(function (err) {
            console.log("error" + JSON.stringify(err.body));
            expect.fail();
        });
    });
    //
    // it("apply with countCourses", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(countCourses).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         //console.log(value.body);
    //         expect(value.code).to.equal(200);
    //           // console.log(JSON.stringify(value.body));
    //         //expect(value.body).to.deep.equal(countCourses);
    //
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("apply with avg course_avg", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(AVGcourseGradeApply).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //         //  console.log(JSON.stringify(value.body));
    //         // expect(value.body).to.deep.equal(AVGCourseApplyResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });



    // it("apply with uuid big timeout try", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(applyWithUUIDBig).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //         //console.log(JSON.stringify(value.body));
    //
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });

    // it("big apply dataset - checking timeout", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(bigApplyQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //        // console.log(JSON.stringify(value.body));
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });

    // it("quantum", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(quantumQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //        //console.log(JSON.stringify(value.body));
    //         //expect(value.body).to.deep.equal(testResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("second add of file - resolve in 201", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('rooms', roomFile).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(201);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });



    it("adding wrong id - resolve in 400", function () {
        this.timeout(10000);
        return insightFacade.addDataset('rooms', zipStuff).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + JSON.stringify(err.body));
            expect(err.code).to.equal(400);
        });
    });

    it("EQ array - reject 400", function () {
        this.timeout(10000);
        return insightFacade.performQuery(EQarrayRequest).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            expect(err.code).to.equal(400);
            // console.log(err.body);
        });
    });
    it("GT array - reject 400", function () {
        this.timeout(10000);
        return insightFacade.performQuery(GTarrayRequest).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            expect(err.code).to.equal(400);
            // console.log(err.body);
        });
    });
    it("LT array - reject 400", function () {
        this.timeout(10000);
        return insightFacade.performQuery(LTarrayRequest).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            expect(err.code).to.equal(400);
            // console.log(err.body);
        });
    });

    // it("Gallium: Filter by courses year.", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(yearQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         //console.log(value.body);
    //         expect(value.code).to.equal(200);
    //         //expect(value.body).to.deep.equal(yearResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });

    it("quantum", function () {
        this.timeout(10000);
        return insightFacade.performQuery(quantum).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
           // console.log(value.body);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });



    // it("Gallium: Filter by courses year. LT", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(LTyearQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("Nitro: Should be able to find all rooms with a certain type of furniture.", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(NitroQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //        // console.log(JSON.stringify(value.body));
    //         expect(value.code).to.equal(200);
    //         //expect(value.body).to.deep.equal(NitroResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("Metro: Should be able to find rooms with more than a certain number of seats", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(metroQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //     //    console.log(JSON.stringify(value.body));
    //         expect(value.code).to.equal(200);
    //       //  expect(value.body).to.deep.equal(metroResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("Fluorine: Should be able to find the year a course is offered in", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(fluorineQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //        // console.log(JSON.stringify(value.body));
    //         expect(value.code).to.equal(200);
    //       //  expect(value.body).to.deep.equal(fluorineResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("Argon: Should be able to find rooms in a specific building", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(argonQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         //console.log(value.body);
    //         expect(value.code).to.equal(200);
    //         //expect(value.body).to.deep.equal(argonResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("Argon: Should be able to find rooms in a specific building1", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(argonQuery1).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         //console.log(value.body);
    //         expect(value.code).to.equal(200);
    //         //expect(value.body).to.deep.equal(argonResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("invalid Query( IS) - reject 400", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(invalidISRequest).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         //console.log(err.body);
    //         expect(err.code).to.equal(400);
    //
    //     });
    // });
    //
    // it("query with both *", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(bothWildRequest).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //         //expect(value.body).to.deep.equal(bothWildResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    //
    //
    // it("query with later *", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(laterWildRequest).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //
    //         // Log.test("body  " + JSON.stringify(value.body));
    //         //expect(value.body).to.deep.equal(laterWildResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });

    it("query with front *", function () {
        this.timeout(10000);
        return insightFacade.performQuery(frontWildRequest).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);

            // Log.test("body  " + JSON.stringify(value.body));
            //expect(value.body).to.deep.equal(frontWildResult);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    it("query with set instruct", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest22).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //console.log(value.body);

            //Log.test("body  " + JSON.stringify(value.body));
            //expect(value.body).to.deep.equal(resultPartial);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    it("query", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //  expect(value.body).to.deep.equal(testResult);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    it("query with LT year", function () {
        this.timeout(10000);
        return insightFacade.performQuery(yearQueryLT).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    // it("query with no order", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(queryRequestNoOrder).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //         // expect(value.body).to.deep.equal(resultNoOrder);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });


    it("query with NOT with wrong id", function () {
        this.timeout(10000);
        return insightFacade.performQuery(notRequest).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(424);
           // console.log(err.body);

        });
    });

    it("query1", function () {
        this.timeout(10000);
        return insightFacade.performQuery(coursefailRequest).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //expect(value.body).to.deep.equal(testResult);
        }).catch(function (err) {
            console.log("error" + err);

            //   console.log(err.body);
            expect.fail();
        });
    });


    it("query with audit", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest10).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            // Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    it("query with title", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest11).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            // Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    it("query with gt70 and lt80 and cpsc", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest12).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //   expect(value.body).to.deep.equal(resultFor70and80);
            //Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });


    it("query with partial names, return instructor name", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest15).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //console.log(value.body);
            // expect(value.body).to.deep.equal(resultInstruct);
            //Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    it("query with partial dept, return instructor name", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest16).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //expect(value.body).to.deep.equal(resultPatial);
            //Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    // it("query with NOT name, return dept", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(queryRequest17).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //         //expect(value.body).to.deep.equal(resultPatial);
    //         //Log.test("body  " + JSON.stringify(value.body));
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });

    it("query with not is, and is", function () {
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest14).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            // expect(value.body).to.deep.equal(result14);

            // Log.test("body  " + JSON.stringify(value.body));
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    it("query with no order str", function () {

        //actually falsey, b/c no order string also wrong keys in where
        this.timeout(10000);
        return insightFacade.performQuery(queryRequest3).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(400);
        });
    });


    // it("query with wrong courses_wrong", function () {
    //
    //     //wrong thingy
    //     this.timeout(10000);
    //     return insightFacade.performQuery(queryRequest6).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         //  Log.test('Value: ' + err.code);
    //         expect(err.code).to.equal(400);
    //     });
    // });
    //
    // it("query with wrong order", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(errorRequest).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         //  Log.test('Value: ' + err.code);
    //         expect(err.code).to.equal(400);
    //     });
    // });
    //
    // it("query with wrong AND, OR", function () {
    //
    //     this.timeout(10000);
    //     return insightFacade.performQuery(queryRequest4).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         //    Log.test('Value: ' + err.code);
    //         expect(err.code).to.equal(400);
    //     });
    // });
    //
    //
    // it("query with wrong type", function () {
    //
    //     this.timeout(10000);
    //     return insightFacade.performQuery(queryRequest5).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         // Log.test('Value: ' + err.code);
    //         expect(err.code).to.equal(400);
    //     });
    // });
    //
    // it("query with null Options", function () {
    //
    //     this.timeout(10000);
    //     return insightFacade.performQuery(nullOptionsRequest).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         // Log.test('Value: ' + err.body);
    //         expect(err.code).to.equal(400);
    //     });
    // });
    //
    //
    // it("query_ complex", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(queryRequest2).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //         //console.log(value.body);
    //         //expect(value.body).to.deep.equal(testResult_complex);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    //
    // it("query with wrong id", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(queryRequest8).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         //   console.log("error" +JSON.stringify(err.body));
    //         expect(err.code).to.equal(424);
    //     });
    // });
    //
    // it("query20", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(queryRequest20).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //     });
    // });

    it("LTquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(LTRequest).then(function (value) {
            Log.test('Value: ' + value.code);
            // console.log(value.body);
        }).catch(function (err) {
            console.log("error" + err);
        });
    });

    it("notJsonquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(notJsonRequest).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(400);
        });
    });

    it("wrongFormquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(wrongFormRequest).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(400);
        });
    });

    it("emptyORFormquery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(emptyORRequest).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(400);
        });
    });

    // it("emptyANDFormquery", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(emptyANDRequest).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect(err.code).to.equal(400);
    //     });
    // });

    it("doubleNegatequery", function () {
        this.timeout(10000);
        return insightFacade.performQuery(doubleNegateRequest).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
        }).catch(function (err) {
            console.log("error" + err);
        });
    });

    // it("fusionquery", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(fusionRequest).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //
    //         //expect(value.body).to.deep.equal(fusionResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //     });
    // });
    //
    // it("notArrayquery", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(notArrayRequest).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect(err.code).to.equal(400);
    //
    //     });
    // });
    //
    // it("fireTruckquery", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(fireTruckRequest).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //
    //         //expect(value.body).to.deep.equal(fireTruckResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //     });
    // });
    //
    // it("testing year", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(testForYear).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //         //   console.log(JSON.stringify(value.body).length);
    //         // console.log(JSON.stringify(result).length);
    //         //   expect(value.body).to.deep.equal(result);
    //         //console.log(JSON.stringify(value.body));
    //
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //     });
    // });
    //
    //
    // it("coverageQuery", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(coverageRequest).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("coverageQuery2", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(testforcoverage).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("roomCoverageQuery1", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(roomforCover).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("roomCoverageQuery2", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(roomforCover2).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("roomCoverageQuery3", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(roomforcover3).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("roomCoverageQuery4", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(roomforcover4).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect(err.code).to.equal(400);
    //
    //     });
    // });
    //
    // it("roomCoverageQuery5", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(roomforcover5).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect(err.code).to.equal(400);
    //
    //     });
    // });
    //
    // it("roomCoverageQuery6", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(roomforcover6).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect(err.code).to.equal(400);
    //
    //     });
    // });
    //
    // it("roomCoverageQuery7", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(roomforcover7).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect(err.code).to.equal(400);
    //
    //     });
    // });
    //
    // it("roomCoverageQuery8", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(roomforcover8).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect(err.code).to.equal(400);
    //
    //     });
    // });
    //
    // it("roomCoverageQuery9", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(roomforcover9).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect(err.code).to.equal(400);
    //
    //     });
    // });
    //
    // it("second add --- resolve(201)", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('courses', zipStuff).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(201);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("exists file --- resolve(201)", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('courses', zipStuff).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(201);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });

    it("add courses with rooms id - resolve in 400", function () {
        this.timeout(10000);
        return insightFacade.addDataset('rooms', zipStuff).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(400);
        });
    });

    it("delete courses dataset  success --- resolve(204)", function () {
        this.timeout(10000);
        return insightFacade.removeDataset('courses').then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(204);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    it("query when courses dataset has been removed, should throw 424", function () {
        this.timeout(10000);
        return insightFacade.performQuery(shortQ).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(424);
           // console.log(err.body);
        });
    });

    it("delete room dataset success --- resolve(204)", function () {
        this.timeout(10000);
        return insightFacade.removeDataset('rooms').then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(204);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    it("query when room dataset has been removed, should throw 424", function () {
        this.timeout(10000);
        return insightFacade.performQuery(shortQ2).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(424);
          //  console.log(err.body);
        });
    });

    // it("last add, folder exist but no file - resolve in 204", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('courses', zipStuff).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(204);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });


    it("delete file fail(invalid ID) --- reject(404)", function () {
        this.timeout(10000);
        return insightFacade.removeDataset(null).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(400);
        });
    });

    it("add file fail(invalid ID) --- reject(400)", function () {
        this.timeout(10000);
        return insightFacade.addDataset(null, zipStuff).then(function (value) {
            Log.test('Value: ' + value.code);
            expect.fail();
        }).catch(function (err) {
            console.log("error" + err);
            expect(err.code).to.equal(400);
        });
    });


});
