//ヘルスケア情報の全取得または条件による取得
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "Health";

exports.handler = async (event, context) => {
  //レスポンスの雛形
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  const body = JSON.parse(event.body);
  const userId = body.userId
  const end = body.end !== undefined ? body.end : 99999999
  const start = body.start !== undefined ? body.start :0
  const healthId = body.healthId;

  //Tokenの認証
  if (event.headers.authorization !== "mtiToken") {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Tokenが違いますログインしてください",
    });
    return response;
  }
  //TODO: 取得対象のテーブル名と検索に使うキーをparamに宣言
  //healthIdの有無で条件分岐する
  let param

  if (healthId === undefined) {
    param = {
      TableName,
      KeyConditionExpression: 'userId = :userId AND healthId BETWEEN :from_time AND :to_time',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':from_time': start,
        ':to_time': end,
      },
    };
  }
  else {
    param = {
      TableName,
      KeyConditionExpression: 'userId = :userId AND healthId = :healthId',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':healthId':healthId,
      },
    };
  }

  try {
    // dynamo.get()でDBからデータを取得
    const article = (await dynamo.query(param).promise()).Items;
    response.body = JSON.stringify(article)
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
