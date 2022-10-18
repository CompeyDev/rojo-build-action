import { info, success } from '../utils/logger';
import got from 'got';
import fs from 'fs';
import { createWriteStream } from 'fs';
import unzip from 'unzip-stream';
import fetchRojoRelease from './fetchRojoRelease';
import download from 'download';
import { exec } from 'child_process';
import path from 'path';
import * as core from '@actions/core';


export default async function main(): Promise<boolean | void> {
    const data = (await fetchRojoRelease())
    const url = data.download
    const version = data.version
    const name = data.artifact_name
    const dir = core.getInput("working-directory")

    info("installRojo     ", `Installing version ${version}...`);


    await download(url, name, { extract: true }).then(() => {
        if (process.platform == "linux") {
            exec(`mv ${name}/rojo ${dir} && rm -rf ${name}`)
            success("installRojo     ", `Installed ${name}!`)
        }

        if (process.platform == "darwin") {
            exec(`mv ${name}/rojo ${dir} && rm -rf ${name}`)
            success("installRojo     ", `Installed ${name}!`)
        }

        if (process.platform == "win32") {
            exec(`move ${path.join(".", name, "rojo.exe")} ${dir} && del /f ${path.join(".", name)}`)
            success("installRojo     ", `Installed ${name}!`)
        }

    })

    Promise.resolve(true)
    return true

}
