const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "UserInfo";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  
  //TODO: 取得対象のテーブル名をparamに宣言
  const param = {
    TableName
  };
    
  try{
    // dynamo.scan()で全件取得
    const users = (await dynamo.scan(param).promise()).Items;

    //TODO: 全ユーザのpasswordを隠蔽する処理を記述
    users?.forEach(item => delete item?.password);
    //TODO: レスポンスボディを設定する
    response.body = JSON.stringify({users});
  
  }catch(e){
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString()
    });
  }
  
  return response;
};
