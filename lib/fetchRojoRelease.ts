import axios from 'axios';
import { info } from '../utils/logger';
import { RojoReleaseData } from './types/types'



export default async function main(): Promise<{ version: string, download: string, artifact_name: string, raw: RojoReleaseData }> {
    const data: RojoReleaseData = (await axios.get("https://api.github.com/repos/rojo-rbx/rojo/releases/latest")).data
    const version = data.name
    if (process.platform == "linux") {
        const url = data.assets[0].browser_download_url
        const file = data.assets[0].name

        info("fetchRojoRelease", `Fetched latest rojo release: ${version}`)
        return { version: version, download: url, artifact_name: file, raw: data }
    }


    if (process.platform == "darwin") {
        const url = data.assets[2].browser_download_url
        const file = data.assets[2].name

        info("fetchRojoRelease", `Fetched latest rojo release: ${version}`)
        return { version: version, download: url, artifact_name: file, raw: data }
    }


    if (process.platform == "win32") {
        const url = data.assets[3].browser_download_url
        const file = data.assets[3].name

        info("fetchRojoRelease", `Fetched latest rojo release: ${version}`)
        return { version: version, download: url, artifact_name: file, raw: data }
    } else {
        return { version: "UNKNOWN_PLATFORM", download: "UNKNOWN_PLATFORM", artifact_name: "UNKNOWN_PLATFORM", raw: data }
    }

}