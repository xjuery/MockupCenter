/// <reference path="defs/node/node.d.ts" />
/// <reference path="defs/express/express.d.ts" />
/// <reference path="defs/lodash/lodash.d.ts" />

//Application dependencies
import * as express from "express";
import * as _ from "lodash";
import {MockupccinoServer} from './MockupccinoServer';
import {Configuration} from './Configuration';
import {Logger} from './Logger';

export var App = main(process.argv);

process.on('uncaughtException',
    (err:any) => {
        if (err.errno === 'EADDRINUSE') {
            Logger.error("Port already used by an other application/service");
        } else {
            Logger.error(err);
        }
        process.exit(1);
    }
);

/**
 * The main function of mockupccino
 * @param args The arguments provided in the CLI
 */
function main(args:Array<string>) {
    //Instanciate of the express server
    var expressApp = express();

    //display the logo
    displayLogo();

    //Define which config file should be used
    var configFile:string;
    //Check if the config file is in the args
    args.forEach(
        (cfg:string, index:number) => {
            if (index === 2) {
                Logger.info("Default config file overridden by :");
                Logger.info(cfg);
                configFile = cfg;
            }
        }
    );
    //Check if the config file is the yaml one
    if (_.isNil(configFile)) {
        try {
            require('fs').accessSync('./mockupccino-config.yaml');
            configFile = './mockupccino-config.yaml';
            Logger.info("Using default YAML config file format");
        } catch (err) {
        }
    }
    //Check if the config file is the json one
    if (_.isNil(configFile)) {
        try {
            require('fs').accessSync('./mockupccino-config.json');
            configFile = './mockupccino-config.json';
            Logger.info("Using default JSON config file format");
        } catch (err) {
        }
    }


    //Parse the config file
    var config:Configuration;
    config = new Configuration(configFile);

    //Check if configuration is valid
    if (config.isValid()) {
        Logger.info("Found " + config.getEndpoints().length + " endpoints");

        var mockupccinoServer = new MockupccinoServer(config, expressApp);
        mockupccinoServer.launch();

        return expressApp;
    } else {
        Logger.error("No endpoints found..Exit");
    }
}

/**
 * Function to display the logo of Mockupccino
 */
function displayLogo() {
    //Display the logo and Mockupccino info
    console.log(" _______              __                           __");
    console.log("|   |   |.-----.----.|  |--.--.--.-----.----.----.|__|.-----.-----.");
    console.log("|       ||  _  |  __||    <|  |  |  _  |  __|  __||  ||     |  _  |");
    console.log("|  |_|__||_____|____||__|__|_____|   __|____|____||__||__|__|_____|");
    console.log("|__| Mockupccino v1.1.0          |__|");
    console.log("===================================================================");
    console.log("");
}