/**
 * The shared middleware stack used in bot.stack-build.js 
 * (between statics and routers)
 *
 * **Warning**
 * -----------
 * You can also use middleware per router, so DON'T put router specific ones here!
 *
 *
 * Possible shared middlewares
 * ---------------------------
 * cookie, session, csrf, body-parser[urlencoded, json], method-override, multiparty...
 * 
 *
 * @author Tim.Liu
 * @created 2014.05.30
 */

module.exports = function(server){

	return function(server){

		//server.use...
		//server.use...

	}

}