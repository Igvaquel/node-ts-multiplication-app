import fs from "fs";
import { yarg } from "./plugins/yargs.plugin";


const { b:base, l:limit, s:showTable } = yarg;

let outputMessage: string = ''
for( let i = 1; i <= limit ; i++ ){
    outputMessage += `${ base } x ${ i } = ${ base * i }\n`
}

const headerMessage = `
==========================================
            Tabla del ${ base }
==========================================\n
`
const data = headerMessage + outputMessage;

if (showTable == true) {
    console.log(data);
}

const outputPath = `outputs`
fs.mkdirSync( outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, data);