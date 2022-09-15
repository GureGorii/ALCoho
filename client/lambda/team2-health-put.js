//ヘルスケア情報の更新
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "Health";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  
  // TODO: リクエストボディの中身をJavaScriptオブジェクトに変換し、1つ、あるいは複数の変数に代入する
  const {userId,healthId,steps,drinks,cal} = JSON.parse(event.body)
  // TODO: paramに更新対象のテーブル名と更新内容を記述
  const param = {
    TableName,
    Item:{
      userId,
      healthId,
      steps,
      drinks,
      cal
    }
  };

  try{
    await dynamo.put(param).promise();
    // TODO: 更新に成功した場合の処理を記述(response bodyを設定する)
    response.body = JSON.stringify({userId, healthId,steps,drinks,cal});
  }catch(e){
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString()
    });
  }
  
  return response;
}
