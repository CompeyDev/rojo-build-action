import * as core from '@actions/core';
import { exec } from 'child_process';
import { error } from '../utils/logger';
import init from '../lib/installRojo';


// const output = core.getInput("output")
// const type = core.getInput("type")

function main(output: string, type: string) {
    if (!output) {
        throw new Error("No output file provided!")
    }
    
    if (output && type) {
        exec(`./rojo build -O ${output}.${type}`, (err, stdout, stderr) => {
            if (err) {
                error("buildProject", `${err.message}`);
                throw new Error("Failed to build. Set $ACTIONS_BACKTRACE=1 to receive a backtrace.");
            }
    
            if (process.env.ACTIONS_BACKTRACE == "1") {
                error("buildProject", `Backtrace:- ${stdout} + Error:- ${stderr}`)
                throw new Error("Failed to build.");
            }
    
        })
    }
}

init().then(() => { main("test", "rbxlx"); });

