const { constants } = require("buffer");
const fs=require("fs")
const createList = async (req,res) => {
    const parsedData = req.body;
    fs.writeFile("api/controllers/"+parsedData["list-id"]+".json", JSON.stringify(parsedData, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
    });

    res.status(200).json(req.body);
}
const addItem=async(req,res)=>{
    const newItem = req.body;
    console.log(newItem);
    let data = fs.readFileSync('api/controllers/'+newItem["list-id"]+'.json');
    let list= JSON.parse(data);
    var newList = JSON.stringify(list['items'].push(newItem));
    fs.writeFile('api/controllers/'+newItem["list-id"]+'.json', newList, err => {
        if(err) throw err;
        console.log("New data added");
    });   
    res.status(200).json(req.body);
}



const getList = async(req,res) => {
    vapath=req.path;
    res.status(200);
}
// const getList=async(req,res)=>{
//     console.log(req);
//     let id=req.params["list-id"];
//     console.log(id);
//     // res.status(200);
// }

module.exports={createList,addItem,getList}