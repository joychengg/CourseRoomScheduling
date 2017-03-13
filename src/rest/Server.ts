/**
 * This is the REST entry point for the project.
 * Restify is configured here.
 */

import restify = require('restify');

import Log from "../Util";
import {InsightResponse} from "../controller/IInsightFacade";
import InsightFacade from "../controller/InsightFacade";

/**
 * This configures the REST endpoints for the server.
 */
export default class Server {

    private port: number;
    private rest: restify.Server;

    constructor(port: number) {
        Log.info("Server::<init>( " + port + " )");
        this.port = port;
    }

    /**
     * Stops the server. Again returns a promise so we know when the connections have
     * actually been fully closed and the port has been released.
     *
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        Log.info('Server::close()');
        let that = this;
        return new Promise(function (fulfill) {
            that.rest.close(function () {
                fulfill(true);
            });
        });
    }

    /**
     * Starts the server. Returns a promise with a boolean value. Promises are used
     * here because starting the server takes some time and we want to know when it
     * is done (and if it worked).
     *
     * @returns {Promise<boolean>}
     */
    public start(): Promise<boolean> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                Log.info('Server::start() - start');

                var next_user_id = 0;
                var users:any = {};

                that.rest = restify.createServer({

                    name: 'insightUBC'


                });

                that.rest.use(restify.bodyParser({mapParams: true, mapFiles: true}));

                that.rest.get('/', function (req: restify.Request, res: restify.Response, next: restify.Next) {
                    res.send(200);
                    return next();
                });

                // provides the echo service
                // curl -is  http://localhost:4321/echo/myMessage
                that.rest.get('/echo/:msg', Server.echo);

                //that.rest.get("/square/:number", Server.square);

                //Other endpoints will go here

                // that.rest.post('/user', function (req, res, next) {
                //     // var user = req.params;
                //     // user.id = next_user_id++;
                //     // users[user.id] = user;
                //     // res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                //     // res.end(JSON.stringify(user));
                //
                //     res.send();
                //     return next();
                // });

                that.rest.post('/query', Server.performQ);

                that.rest.put('/dataset/:id', function (req: restify.Request, res: restify.Response, next: restify.Next) {

                    try {

                        var insigh = new InsightFacade();
                        let dataString = new Buffer(req.params.body).toString('base64');

                        insigh.addDataset(req.params.id, dataString).then(function (value: any) {

                            res.json(value.code, value.body);
                            return next();

                        }).catch(function (err:any) {
                            res.json(err.code, err.body);
                            return next();
                        });

                    }catch(err){
                        return next();
                    }

                    return next();
                });

//                that.rest.put("/dataset/:id", Server.dataset);

                that.rest.del("/dataset/:id", Server.deleteD);

//inside http, theres a server and request
//endpoints get the request and send to the specific methods (server)<--rest, routes http request to method, get the response
//and get the result and send bk to request sender


// that.get("/foo", Foo.X())  <-- get from foo and direct it to .X()
//server.dataset: calls facade dataset

//incoming request (JSON wrapped in http)
//server forwards to a endpoint
//direct to method

//logic:
//ie core logic is addDataset()
//server.Dataset()  -> server method to handle req/res

//that.server.put("/dataset/:id", server.dataset())
//"/dataset/:id" will get exactly wuts inside the parameter

                that.rest.listen(that.port, function () {
                    Log.info('Server::start() - restify listening: ' + that.rest.url);
                    fulfill(true);
                });

                that.rest.on('error', function (err: string) {
                    // catches errors in restify start; unusual syntax due to internal node not using normal exceptions here
                    Log.info('Server::start() - restify ERROR: ' + err);
                    reject(err);
                });


            } catch (err) {
                Log.error('Server::start() - ERROR: ' + err);
                reject(err);
            }
        });
    }




    // The next two methods handle the echo service.
    // These are almost certainly not the best place to put these, but are here for your reference.
    // By updating the Server.echo function pointer above, these methods can be easily moved.


    public static deleteD(req: restify.Request, res: restify.Response, next: restify.Next){

        var insigh = new InsightFacade();

        try {
            insigh.removeDataset(req.params.id).then(function (value: any) {

                res.json(value.code, value.body);
                return next();

            }).catch(function (err:any) {
                res.json(err.code, err.body);
                return next();
            });

        }catch(err){

            return next();
        }
        return  next();

    }

    public static performQ(req: restify.Request, res: restify.Response, next: restify.Next){

        var insigh = new InsightFacade();

        insigh.performQuery(req.body).then(function (value:any) {

            res.json(value.code, value.body);

        });

        return  next();

    }

    public static square(req: restify.Request, res: restify.Response, next: restify.Next){
        let number = req.params.num;
        let squared_number = number*number;

        let response_json = {"squared_number" : squared_number};

        res.json(200, response_json);  //send  the response upstream

        return next();


    }

    public static echo(req: restify.Request, res: restify.Response, next: restify.Next) {

        //performquery's query will be in the restify.request
        Log.trace('Server::echo(..) - params: ' + JSON.stringify(req.params));
        try {
            let result = Server.performEcho(req.params.msg);  // this can change to facade, like server.performQuery
            Log.info('Server::echo(..) - responding ' + result.code);
            res.json(result.code, result.body); //this is after process and take the response
        } catch (err) {
            Log.error('Server::echo(..) - responding 400');
            res.json(400, {error: err.message});
        }
        return next();
    }

    public static performEcho(msg: string): InsightResponse {
        if (typeof msg !== 'undefined' && msg !== null) {
            return {code: 200, body: {message: msg + '...' + msg}};
        } else {
            return {code: 400, body: {error: 'Message not provided'}};
        }
    }

}
