// import {yarg} from"../../src/plugins/yargs.plugin"

const runCommand = async( args: string[] ) => {
    process.argv = [ ...process.argv, ...args ];

    const { yarg }  = await import("../../src/plugins/yargs.plugin");
    return yarg;
}   


describe('test args.plugin.ts', () => { 

    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })
        
    test('should return default values', async() => { 

        const argv = await runCommand(['-b', '5']);
        
        expect( argv ).toEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }))
    })

    test('should return configuration with custom values', async() => { 
        const argv = await runCommand(['-b', '5','-l','5','-s','-n','custom-name','custom-dir']);
        
        expect( argv ).toEqual( expect.objectContaining({
            b: 5,
            base: 5,
            d:"outputs",
            destination:"outputs",
            l: 5,
            limit: 5,
            n:"custom-name",
            name:"custom-name",
            s: true,
            show: true,
        }))
    })
})