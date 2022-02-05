   
    const createModule = require('../lib/index');
const setInput = (name,value)=>
    process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`]= value;
 

    setInput("module_name", "module_name") 
    setInput("token", "token") 
    setInput("provider", "aws") 
    setInput("registry_name", "private") 
    setInput("organization", "infragod-test") 


test('test calling create module function', async () => {

 
});
