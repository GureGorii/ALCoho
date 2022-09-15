const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "User";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  // TODO: リクエストボディの中身をJavaScriptオブジェクトに変換し、1つ、あるいは複数の変数に代入する
  const { userId, age, nickname, password } = JSON.parse(event.body);
  // TODO: DBに登録するための情報をparamオブジェクトとして宣言する（中身を記述）
  const param = {
    // ↓プロパティ名と変数名が同一の場合は、値の指定を省略できる。 
    TableName,  // TableName: TableNameと同じ意味
    Item: {
      userId,   // userId: userIdと同じ意味
      age,      // age: ageと同じ意味
      nickname, // nickname: nicknameと同じ意味
      password // password: passwordと同じ意味
    }
  };

  
  try{
    // dynamo.put()でDBにデータを登録
    await dynamo.put(param).promise();
    // TODO: 登録に成功した場合の処理を記載する。(status codeの設定と、response bodyの設定)
    response.statusCode = 201;
    response.body = JSON.stringify({userId, age, nickname});
  }catch(e){
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString()
    });
  }
  
  return response;
}
