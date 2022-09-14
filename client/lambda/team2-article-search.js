const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "Article";

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
  const end = body.end !== null ? body.end : Date.now()
  const start = body.start !== null ? body.start : 0
  const category = body.category;

  //Tokenの認証
  if (event.headers.authorization !== "mtiToken") {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Tokenが違いますログインしてください",
    });
    return response;
  }
  //TODO: 取得対象のテーブル名と検索に使うキーをparamに宣言
  //カテゴリーの有無で条件分岐する
  let param

  if (category === null) {
    param = {
      TableName,
      KeyConditionExpression: 'userId = :userId AND #DocTimestamp BETWEEN :from_time AND :to_time',
      ExpressionAttributeNames: {
        '#DocTimestamp': 'timestamp'
      },
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
      KeyConditionExpression: 'userId = :userId AND #DocTimestamp BETWEEN :from_time AND :to_time',
      ExpressionAttributeNames: {
        '#DocTimestamp': 'timestamp'
      },
      FilterExpression: "category = :category",
      ExpressionAttributeValues: {
        ':userId': userId,
        ':category': category && category,
        ':from_time': start,
        ':to_time': end,
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
