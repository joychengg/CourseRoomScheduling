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
        "maxSeats", "avgSeats", "countSeats"
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
            {
                "avgSeats": {
                    "AVG": "rooms_seats"
                }
            },
            {
                "countSeats": {
                    "COUNT": "rooms_seats"
                }
            }
        ]
    }
};


var ApplykeyWrong: QueryRequest = {

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
            "maxSeats", "avg_Seats", "countSeats"
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
            {
                "avg_Seats": {
                    "AVG": "rooms_seats"
                }
            },
            {
                "countSeats": {
                    "COUNT": "rooms_seats"
                }
            }
        ]
    }
};

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

var fluorineQuery: QueryRequest = {"WHERE":{"AND":[{"IS":{"courses_dept":"cpsc"}},{"IS":{"courses_id":"310"}}]},"TRANSFORMATIONS":{"GROUP":["courses_dept","courses_id"],"APPLY":[{"maxAverage":{"MAX":"courses_avg"}}]},"OPTIONS":{"COLUMNS":["maxAverage","courses_dept","courses_id"],"FORM":"TABLE"}}

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
            "IS": {
                "courses_dept": "cpsc"
            }
    },
    OPTIONS: {
        "COLUMNS": [
            "courses_secSize",
            "courses_dept",
            "courses_id"
        ],
        // "ORDER": {
        //     "dir": "DOWN",
        //     "keys": ["courses_dept"]
        // },
        "FORM": "TABLE"
    },
    // "TRANSFORMATIONS": {
    //     "GROUP": ["courses_dept", "courses_id"],
    //     "APPLY": [
    //         {
    //             "countCourses":{
    //                 "COUNT":"courses_id"}
    //         }]
    // }
};

var qs: QueryRequest = { "WHERE": { "EQ": { "courses_year": 1900 } }, "OPTIONS": { "COLUMNS": [ "courses_dept", "courses_title" ], "FORM": "TABLE" }, "TRANSFORMATIONS": { "GROUP": [ "courses_year", "courses_title", "courses_dept" ], "APPLY": [{ "avgaudits": { "AVG": "courses_audit" } }] } };



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


describe("InsightFacadeTest", function () {

    let s = new Server(4321);

    let URL = "http://localhost:4321";

    before(function () { //runs once
        Log.test('Before: ' + (<any>this).test.parent.title);

        inValidZip = Buffer.from(fs.readFileSync("./invalidJson.zip")).toString('base64');

      //  return s.start().then().catch();

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

       // return s.stop().then().catch();
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

    // it("adding rooms.zip first time --- resolve(204)", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('rooms', roomFile).then(function (value) {
    //         //Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(204);
    //     }).catch(function (err) {
    //         console.log("error" + JSON.stringify(err));
    //         expect.fail();
    //     });
    // });
    //
    // // it("apply furniture", function () {
    // //     this.timeout(10000);
    // //     return insightFacade.performQuery(applyRequest2).then(function (value) {
    // //         Log.test('Value: ' + value.code);
    // //         expect(value.code).to.equal(200);
    // //        // console.log(value.body);
    // //         //   expect(value.body).to.deep.equal(applyResult2);
    // //     }).catch(function (err) {
    // //         console.log("error" + err);
    // //         expect.fail();
    // //     });
    // // });
    //
    // it("apply with maxseat and avgseat", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(roomWithApply).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         //console.log(value.body);
    //         expect(value.code).to.equal(200);
    //         //console.log(value.body);
    //         //expect(value.body).to.deep.equal(resultForapply);
    //
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    //
    // it("apply contains _", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(ApplykeyWrong).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err.body);
    //         expect(err.code).to.equal(400);
    //     });
    // });
    //
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
    //
    // it("adding rooms.zip first time2 --- resolve(204)", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('rooms', roomFile).then(function (value) {
    //         //Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(204);
    //     }).catch(function (err) {
    //         console.log("error" + JSON.stringify(err));
    //         expect.fail();
    //     });
    // });
    //
    // it("latQuery", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(latQuery).then(function (value) {
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
    // // it("Knuth: Find all studio type rooms without some furniture.", function () {
    // //     this.timeout(10000);
    // //     return insightFacade.performQuery(knuthQuery).then(function (value) {
    // //         Log.test('Value: ' + value.code);
    // //         //console.log(value.body);
    // //         expect(value.code).to.equal(200);
    // //         //expect(knuthResult).to.deep.equal(value.body);
    // //     }).catch(function (err) {
    // //         console.log("error" + err);
    // //         expect.fail();
    // //     });
    // // });
    // //
    // // it("apply is empty but column contain maxseat - should give 400", function () {
    // //     this.timeout(10000);
    // //     return insightFacade.performQuery(testfornoApply).then(function (value) {
    // //         Log.test('Value: ' + value.code);
    // //         expect.fail();
    // //     }).catch(function (err) {
    // //         console.log("error" + err);
    // //         expect(err.code).to.equal(400);
    // //       //  console.log(err.body);
    // //     });
    // // });
    // //
    // //
    // //
    // //
    // //
    // // it("Nautilus: Should be able to find all rooms of a certain type", function () {
    // //     this.timeout(10000);
    // //     return insightFacade.performQuery(nautilusQuery).then(function (value) {
    // //         Log.test('Value: ' + value.code);
    // //         //console.log(value.body);
    // //         expect(value.code).to.equal(200);
    // //       //  expect(JSON.stringify(value.body).length).to.equal(JSON.stringify(nautilusResult).length);
    // //     }).catch(function (err) {
    // //         console.log("error" + err);
    // //         expect.fail();
    // //     });
    // // });
    // //
    // // it("deepNest", function () {
    // //     this.timeout(10000);
    // //     return insightFacade.performQuery(deepNestRequest).then(function (value) {
    // //         Log.test('Value: ' + value.code);
    // //         //console.log(value.body);
    // //         expect(value.code).to.equal(200);
    // //         //expect(JSON.stringify(value.body).length).to.equal(JSON.stringify(nautilusResult).length);
    // //     }).catch(function (err) {
    // //         console.log("error" + err);
    // //         expect.fail();
    // //     });
    // // });
    // //
    // // it("LTroomQuery", function () {
    // //     this.timeout(10000);
    // //     return insightFacade.performQuery(LTroomQuery).then(function (value) {
    // //         Log.test('Value: ' + value.code);
    // //         expect(value.code).to.equal(200);
    // //     }).catch(function (err) {
    // //         console.log("error" + err);
    // //         expect.fail();
    // //     });
    // // });
    // //
    // // it("laterStarQuery", function () {
    // //     this.timeout(10000);
    // //     return insightFacade.performQuery(laterStarQuery).then(function (value) {
    // //         Log.test('Value: ' + value.code);
    // //         expect(value.code).to.equal(200);
    // //     }).catch(function (err) {
    // //         console.log("error" + err);
    // //         expect.fail();
    // //     });
    // // });
    // //
    // // it("Helium: Filter by partial href", function () {
    // //     this.timeout(10000);
    // //     return insightFacade.performQuery(heliumQuery).then(function (value) {
    // //         Log.test('Value: ' + value.code);
    // //         //console.log(value.body);
    // //         expect(value.code).to.equal(200);
    // //        // expect(heliumResult).to.deep.equal(value.body);
    // //     }).catch(function (err) {
    // //         console.log("error" + err);
    // //         expect.fail();
    // //     });
    // // });
    //
    // it("Kleene: Find all group type rooms without some furniture", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(kleeneQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         //console.log(value.body);
    //         expect(value.code).to.equal(200);
    //         //expect(kleeneResult).to.deep.equal(value.body);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("errAND", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(errANDQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect(err.code).to.equal(400);
    //     });
    // });
    //
    // it("errOR", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(errORQuery).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect(err.code).to.equal(400);
    //     });
    // });
    //
    //
    // it("server", function () {
    //     Serv1.start();
    //     Serv1.stop();
    // });
    //
    // it("adding rooms.zip with wrong id --- resolve(400)", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('courses123', roomFile).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         console.log("error" + JSON.stringify(err));
    //         expect(err.code).to.equal(400);
    //     });
    // });
    //
    // it("adding rooms.zip with courses id --- resolve(400)", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('courses', roomFile).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //        console.log("error" + JSON.stringify(err.body));
    //         expect(err.code).to.equal(400);
    //     });
    // });
    //
    //
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
    //
    //
    // // it("cant parse file - reject 400", function () {
    // //     this.timeout(10000);
    // //     return insightFacade.addDataset('courses123', inValidZip).then(function (value) {
    // //         Log.test('Value: ' + value.code);
    // //         expect.fail();
    // //     }).catch(function (err) {
    // //         //console.log(JSON.stringify(err.body));
    // //         expect(err.code).to.equal(400);
    // //     });
    // // });
    //
    // it("add file fail- reject 400", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('courses1223', invalidFile).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         //console.log(JSON.stringify(err.body));
    //         expect(err.code).to.equal(400);
    //     });
    // });
    //
    // it("query for room", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(queryForRoom).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //         // console.log(JSON.stringify(value.body));
    //         //   expect(value.body).to.deep.equal(testResult);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    //
    // it("query for room complex", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(queryForRoomComplex).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //         // console.log(JSON.stringify(value.body));
    //         //     expect(value.body).to.deep.equal(result);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    // it("query lat lon", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(newTestwithLatlong).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect(value.code).to.equal(200);
    //        // console.log(JSON.stringify(value.body));
    //         //     expect(value.body).to.deep.equal(result);
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });
    //
    //
    // it("cant parse file(no result key) - reject 400", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('coursesNO', noResultZip).then(function (value) {
    //         //Log.test('Value: ' + value.body);
    //         expect.fail();
    //     }).catch(function (err) {
    //         expect(err.code).to.equal(400);
    //     });
    // });
    //
    //
    // it("cant parse not a zip file - reject 400", function () {
    //     this.timeout(10000);
    //     return insightFacade.addDataset('coursesDIE', wrongZip).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         expect.fail();
    //     }).catch(function (err) {
    //         // console.log(JSON.stringify(err.body));
    //         expect(err.code).to.equal(400);
    //     });
    // });
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

    // it("qs", function () {
    //     this.timeout(10000);
    //     return insightFacade.performQuery(qs).then(function (value) {
    //         Log.test('Value: ' + value.code);
    //         //console.log(value.body);
    //         expect(value.code).to.equal(200);
    //         console.log(JSON.stringify(value.body));
    //         //expect(value.body).to.deep.equal(countCourses);
    //
    //     }).catch(function (err) {
    //         console.log("error" + err);
    //         expect.fail();
    //     });
    // });

    it("fluorine", function () {
        this.timeout(10000);
        return insightFacade.performQuery(fluorineQuery).then(function (value) {
            Log.test('Value: ' + value.code);
            console.log(value.body);
            expect(value.code).to.equal(200);
            console.log(JSON.stringify(value.body));
            //expect(value.body).to.deep.equal(countCourses);

        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });


    it("section size", function () {
        this.timeout(10000);
        return insightFacade.performQuery(countCourses).then(function (value) {
            Log.test('Value: ' + value.code);
            //console.log(value.body);
            expect(value.code).to.equal(200);
            console.log(JSON.stringify(value.body));
            //expect(value.body).to.deep.equal(countCourses);

        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });

    it("apply with avg course_avg", function () {
        this.timeout(10000);
        return insightFacade.performQuery(AVGcourseGradeApply).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(200);
            //  console.log(JSON.stringify(value.body));
            // expect(value.body).to.deep.equal(AVGCourseApplyResult);
        }).catch(function (err) {
            console.log("error" + err);
            expect.fail();
        });
    });



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

    it("adding courses", function () {
        this.timeout(10000);
        return insightFacade.addDataset('rooms', roomFile).then(function (value) {
            Log.test('Value: ' + value.code);
            expect(value.code).to.equal(201);
        }).catch(function (err) {
            console.log("error" + JSON.stringify(err.body));
            expect.fail();
        });
    });


});
