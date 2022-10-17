import kleur from 'kleur';

const progressStyle = kleur.bold().inverse
const successStyle = kleur.bold().bgGreen
const errorStyle = kleur.black().bold().bgRed
const warningStyle = kleur.black().bold().bgYellow

export function warn(caller: string, log: string) {
    console.log(warningStyle(`WARNING `), " ",  `${caller} :: `, log )
}

export function error(caller: string, log: string) {
    console.log(errorStyle(`ERROR   `), " ", `${caller} :: `, log )
}

export function info(caller: string, log: string) {
    console.log(progressStyle(`INFO    `), " ", `${caller} :: `, log )
}

export function success(caller: string, log: string) {
    console.log(successStyle(`SUCCESS `), " ", `${caller} :: `, log )
}