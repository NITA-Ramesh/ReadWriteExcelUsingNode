const Excel = require('exceljs');

const nconf = require('nconf');
const { hitGetRequest,deleteRequest } = require('./hitRequest');
const env=process.env.NODE_ENV;
if(!env)
{
    nconf.argv()
    .env()
    .file({ file: './config/dev-config.json' });
}
else{
    nconf.argv()
    .env()
    .file({ file: `./config/${env}-config.json` });
}


// getPolicies();
//deletePolicy();
async function getPolicies()
{
    let workbook = new Excel.Workbook();
    try{
        console.log(`${nconf.get("excelFileName")}`);
        const worksheet = await workbook.xlsx.readFile(`${nconf.get("excelFileName")}`);
        let ws=worksheet.getWorksheet(1);
        for(let i=1; i<ws._rows.length;i++)
        {
            console.log(ws._rows[i].values[1]);
            await hitGetRequest(ws._rows[i].values[1],ws._rows[i].values[2]).then((res)=>{
                console.log(res.data);
                ws._rows[i].getCell(4).value=JSON.stringify(res.data);
            }).catch(err=>{
                console.log("Error",err.message);
                ws._rows[i].getCell(4).value=err.message;
            })
        }
        // const allPromises=[];
        // ws.eachRow({},(row,rowNumber)=>{
        //     allPromises.push(hitGetRequest(ws._rows[i].values[1]))
        // })
        // await allPromises
        
        await workbook.xlsx.writeFile(`${nconf.get("excelFileName")}`);
        // console.log(rows);
    }
    catch(error){
        console.log(error);
    }
}
async function deletePolicy(){
    let workbook = new Excel.Workbook();
    try{
        console.log(`${nconf.get("excelFileName")}`);
        const worksheet = await workbook.xlsx.readFile(`${nconf.get("excelFileName")}`);
        let ws=worksheet.getWorksheet(1);
        for(let i=1; i<ws._rows.length;i++)
        {
            console.log(ws._rows[i].values[1]);
            await deleteRequest(ws._rows[i].values[1],ws._rows[i].values[2]).then((res)=>{
                console.log(res.data);
                ws._rows[i].getCell(5).value=JSON.stringify(res.data);
            }).catch(err=>{
                console.log("Error",err.message);
                ws._rows[i].getCell(5).value=err.message;
            })
        }
        
        await workbook.xlsx.writeFile(`${nconf.get("excelFileName")}`);
        // console.log(rows);
    }
    catch(err){
        console.log(err);
    }
}