import * as core from '@actions/core';
import { exec, ExecException } from 'child_process';
import { error, info, success } from '../utils/logger';
import init from '../lib/installRojo';
import download from 'download';
import path from 'path';


const output = core.getInput("output")
const type = core.getInput("type")

const execCallback = (stdout: string, stderr: string, err?: ExecException|null) => {
    if (err) {
        error("buildProject    ", `${err.message}`);
        throw new Error("Failed to build. Set $ACTIONS_BACKTRACE=1 to receive a backtrace.");
    }

    if (process.env.ACTIONS_BACKTRACE == "1" && err) {
        error("buildProject    ", `Backtrace:- ${stdout} + Error:- ${stderr}`)
        throw new Error("Failed to build.");
    }

    if (!err) {
        success("buildProject    ", "Successfully built!")
        process.exit(0);
    }
}

function main(output: string, type: string) {
    if (!output) {
        throw new Error("No output file provided!")
    }
    
    if (output && type) {
        if (process.platform == "win32") {
            info("buildProject    ", "Building...")
            exec(`${path.join(".", "rojo.exe")} build -o ${output}.${type}`, (err, stdout, stderr) => {
                execCallback(stdout, stderr, err);
            })
        }

        if (process.platform == "darwin" || "linux") {
            info("buildProject    ", "Building...")
            exec(`./rojo build -o ${output}.${type}`, (err, stdout, stderr) => {
                execCallback(stdout, stderr, err);
            })
        }
       
    }
}

init().then((status) => { if (status == true) { main(output, type); } });

