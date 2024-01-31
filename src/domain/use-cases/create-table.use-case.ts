export interface CreateTableUseCase {
    execute: ( options: CreateTableOptions ) => string;
}

export interface CreateTableOptions {
    base: number;
    limit: number;
}


export class CreateTable implements CreateTable{

    constructor(
        /**
         * DI - Dependency Injection
        */
    ){}

    execute({ base, limit }: CreateTableOptions ){
        let outputMessage = '';
        for( let i = 1; i <= limit ; i++ ){
            outputMessage += `${ base } x ${ i } = ${ base * i }\n`
        }
        return outputMessage;
    }

}