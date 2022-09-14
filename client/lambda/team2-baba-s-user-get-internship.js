//team2 api作業2全件取得
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "Article";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  
  if (event.headers.authorization !== "mtiToken") {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Tokenが違いますログインしてください",
    });
    return response;
  }
  //TODO: 取得対象のテーブル名をparamに宣言
  const param = {
    TableName,
    Limit: 50
  };

  try {
    // dynamo.scan()で全件取得
    const users = (await dynamo.scan(param).promise()).Items;

    //TODO: レスポンスボディを設定する
    response.body = JSON.stringify({ users });

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
