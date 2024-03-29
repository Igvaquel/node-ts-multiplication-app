
import {CreateTable} from '../../../src/domain/use-cases/create-table.use-case'

describe('CreateTableUseCase', () => { 
  
    test('should create table with default values', () => { 
        
        const createTable = new CreateTable();
        const limit = 2;

        const table = createTable.execute({ base: 2, limit: limit });
        const rows = table.split('\n').length;

        expect( createTable ).toBeInstanceOf( CreateTable );
        expect( table ).toContain( "2 x 1 = 2" );
        expect( rows ).toBe(limit);

    })

    test('should create table with custom values', () => { 

        const options = {
            base: 3,
            limit: 20
        }
        
        const createTable = new CreateTable();
        const limit = 2;

        const table = createTable.execute(options);
        const rows = table.split('\n').length;

        expect( table ).toContain( "3 x 1 = 3" );
        expect( rows ).toBe(options.limit);

    })
})