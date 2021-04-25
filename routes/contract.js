var express = require('express');

var router = express.Router();
require('dotenv').config() ;

const Web3 = require('web3');

const infuraKey = "cbf297a2ecba4a6fb808bba3f9861bb2";
var contractAddress = "0x84463565a9ebcaad8cff900cb66dae46dbc00964";

//https://ropsten.infura.io/v3/cbf297a2ecba4a6fb808bba3f9861bb2
const web3 = new Web3(new Web3.providers.HttpProvider( `https://rinkeby.infura.io/v3/${infuraKey}`));
const hello= [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
//var Con = new web3.eth.Contract(hello,contractAddress);
//const Tx = require('ethereumjs-tx');
var Tx = require('ethereumjs-tx').Transaction;
const init1=async()=>
{

    console.log("async function called ....")

    var count = await web3.eth.getTransactionCount("0xd946F28962A96C45d9Bc16F16ca50d8350296A4E",'pending');
    console.log(count);
//var abiArray = JSON.parse(fs.readFileSync('mycoin.json', 'utf-8'));
var contract = new web3.eth.Contract(hello,contractAddress);
console.log("async function called2 ....");
const accountNonce='0x'+(count+1).toString(16);
var rawTransaction = 
{
    "from": "0xd946F28962A96C45d9Bc16F16ca50d8350296A4E",
    "nonce": web3.utils.toHex(count),
     "gasPrice": "0x04e3b29200",
  //"gasPrice": "1000000",
    "gasLimit": 300000,
    "to": contractAddress,
    "value": "0x0",
  //  SimpleERC20Token()
//    "data": await contract.methods.transfer("0x38be032340C655CF40cfCa95976c157850ACFe9E", 10).encodeABI(),
    "data": await contract.methods.transferFrom("0xd946F28962A96C45d9Bc16F16ca50d8350296A4E","0x38be032340C655CF40cfCa95976c157850ACFe9E",1).encodeABI(),
    
    "chainId": 0x04
};
console.log("async function called3 ...");
var privKey = new Buffer('8d6577c01ce9adf3293a89c06ab28b7b18817920b724d869bedac732006c380f', 'hex');

console.log("async function called 4 ...");
var tx = new Tx(rawTransaction,{'chain':'rinkeby'});

console.log("async function called 5 ...");
tx.sign(privKey);
//var serializedTx = tx.serialize();

console.log("async function called 6 ...");
const serializedTx= tx.serialize().toString("hex");
const receipt = await web3.eth.sendSignedTransaction(`0x${serializedTx}`);
console.log(JSON.stringify(receipt, null, 4));
/*web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
    if (!err)
        console.log("hash",hash);
    else
        console.log(err);
});*/
console.log('done hash...');
}

router.post('/tokens', function(req, res, next) {
   
    web3.eth.getBalance(req.body.address,function(error,result){
        if(!error){
            console.log("Before transfer: " + result );
            res.json({ error: false, tokens: result });
        }else{
            console.log("Error: " + error);
        }
    });

    
});

router.post('/transfer', function(req, res, next) {
    console.log(req.body.token);
    console.log(req.body.address);

    init1();




});
module.exports = router;
















/*    console.log("manav");
    console.log(req.body.token);
    console.log(req.body.address);


    hello.transfer(req.body.address,req.body.token).call({from:add}, function(error, result) {
        console.log(result);
        console.log("Mnaa");
    res.json({msg:"transfer succes"});
    });*/