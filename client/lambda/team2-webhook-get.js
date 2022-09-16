const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "Outh"
const http = require('http')


exports.handler = async (event, context) => {
    //レスポンスの雛形
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "" }),
    };

    const Outh = event.queryStringParameters.Outh;
    const lineId = event.queryStringParameters.lineId;

    //Tokenの認証
    if (event.headers.authorization !== "mtiToken") {
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Tokenが違いますログインしてください",
        });
        return response;
    }
    //TODO: OuthからUserIdを取得
    var param = {
        TableName,
        Key:{
            Outh
        }
    
    };

    try {
        // dynamo.get()でDBからデータを取得
        const it = (await dynamo.get(param).promise()).Item;

        const userId = it.userId;

        var param = {
            TableName,
            Item: {
                Outh,
                userId,
                lineId
            }
        };

        await dynamo.put(param).promise();

        response.statusCode = 200;
        response.body = JSON.stringify({
            userId,
            lineId,
            Outh,
            it,
            message: "登録が完了しました",
        });
        
        var par = {
            "to":lineId,
            "messages":[
                {
                    "type":"text",
                    "text":"ユーザー登録が完了しました"
                }
                ]
            }       
        
        await main(par);




    }
    catch (e) {
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "予期せぬエラーが発生しました。",
            errorDetail: e.toString()
        });
    }



    return response;
};

async function main(cnt1) {
    return new Promise((resolve, reject) => {
        
        const data = JSON.stringify(cnt1)
        
        const https = require('node:https');

        const options = {
            hostname:'api.line.me',
            port: 443,
            path: '/v2/bot/message/push',
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer" +" " +"AY3jlXStHAKwWIboV6dVF7pMXRnbVVsgrvsC9SQRiKdKsl0WHCrLek0j8ivm9627+VkIsHvn1d3KTARnlYyIg/vfftvFgRBwG0gFFQ3cv8rMLo5VqoqRCEBkF6kM4cnBwblZnWa3zzz42lSmiqDx9QdB04t89/1O/w1cDnyilFU="
            }
            
            
        };

        const req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            res.on('data', (d) => {
                process.stdout.write(d);
                resolve(d)
            });
        });
        req.write(data);

        req.on('error', (e) => {
            console.error(e);
            reject(e)
        });
        
        req.end();
    })
}
