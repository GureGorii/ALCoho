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

    //TODO: OuthからUserIdを取得
    var param = {
        TableName,
        FilterExpression: "attribute_exists(lineId)"
    };

    try {
        // dynamo.get()でDBからデータを取得
        const items = (await dynamo.scan(param).promise()).Items;

        var it = items[0];

        response.statusCode = 200;
        response.body = JSON.stringify({
            items,
        });

        const healthId = 20220915;
        
        for (let i = 0; i < items.length; i++) {
            var userId = items[i].userId
            var param = {
                TableName:"Health",
                Key: {
                    userId,
                    healthId
                }
            };
            
            var res = (await dynamo.get(param).promise()).Item;
            console.log(res);
            
            var lineId = items[0].lineId;
            
            var num_cal = res.steps * 0.04 + res.cal;
            //1本140kcalで換算
            var drink = num_cal/140;
            
            var par = {
                "to": lineId,
                "messages": [{
                    "type": "text",
                    "text": `今日も一日お疲れ様でした。\n歩いた歩数は${res.steps}歩\nその他に${res.cal}kcal消費したため\nなんと！\n🍺${drink.toFixed(1)}本分\n飲むことが出来ます！！\n🍺🍺🍺🍺乾杯🍺🍺🍺🍺`
                }]
            }
            await main(par);


        }

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
            hostname: 'api.line.me',
            port: 443,
            path: '/v2/bot/message/push',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer" + " " + "AY3jlXStHAKwWIboV6dVF7pMXRnbVVsgrvsC9SQRiKdKsl0WHCrLek0j8ivm9627+VkIsHvn1d3KTARnlYyIg/vfftvFgRBwG0gFFQ3cv8rMLo5VqoqRCEBkF6kM4cnBwblZnWa3zzz42lSmiqDx9QdB04t89/1O/w1cDnyilFU="
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
