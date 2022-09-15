//ヘルスケア情報の全取得または条件による取得
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "UserInfo";

exports.handler = async (event, context) => {
  //レスポンスの雛形
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  const userId = event.queryStringParameters.userId;

  //Tokenの認証
  if (event.headers.authorization !== "mtiToken") {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Tokenが違いますログインしてください",
    });
    return response;
  }
  //TODO: 取得対象のテーブル名と検索に使うキーをparamに宣言
  const param = {
    TableName,
    Key: {
      userId
    }
  };

  try {
    // dynamo.get()でDBからデータを取得
    const userinfo = (await dynamo.get(param).promise()).Item;
    delete userinfo?.password;
    response.body = JSON.stringify(userinfo)
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
