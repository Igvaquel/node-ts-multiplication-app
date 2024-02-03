import fs from 'fs';
import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case'



describe('SaveFileUseCase', () => { 

    const customOptions = {
        fileContent    : 'custom content',
        fileDestination: "custom-outputs/file-destination",
        fileName       : "custom-table-name"
    }

    const customFilePath= `${customOptions.fileDestination}/${customOptions.fileName}.txt`

    
   
    afterEach(() => {
        //clean up
        const outputFolderExist = fs.existsSync('outputs');
        if( outputFolderExist ) fs.rmSync('outputs', { recursive: true });

        const customOutputFolderExist = fs.existsSync("custom-outputs");
        if( customOutputFolderExist ) fs.rmSync("custom-outputs", { recursive: true });
    })
    
    test('should save files with default values', () => { 
        const saveFile = new SaveFile();
        const filePath= 'outputs/table.txt'
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options);
        const fileExist = fs.existsSync(filePath );
        const fileContent = fs.readFileSync(filePath ,{ encoding: 'utf-8'});

        expect( result ).toBeTruthy();
        expect( fileExist ).toBe( true );
        expect( fileContent ).toBe(options.fileContent);
    });

    test('should save files with custom values', () => { 
        const saveFile = new SaveFile();
       

        const result = saveFile.execute(customOptions);
        const fileExist = fs.existsSync( customFilePath );
        const fileContent = fs.readFileSync(customFilePath ,{ encoding: 'utf-8'});

        expect( result ).toBeTruthy();
        expect( fileExist ).toBe( true );
        expect( fileContent ).toBe(customOptions.fileContent);;

    });

    test('should return false if directory could not be created', () => { 
        
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn( fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('error')}
        )
        const result = saveFile.execute(customOptions);
        expect( result ).toBe(false);
        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => { 
        
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn( fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is custom writing error message')}
        )
        const result = saveFile.execute({ fileContent: 'hola'});
        expect( result ).toBe(false)
        writeFileSpy.mockRestore();

    });

})
