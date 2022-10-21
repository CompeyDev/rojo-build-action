export interface RojoReleaseData {
    name: string,
    assets: [
            {
                browser_download_url: string, name: string
            }
        ]
}

export interface RojoReleaseFetched {
    version: string,
    download: string,
    artifact_name: string,
    raw: RojoReleaseData
}