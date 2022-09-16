//ヘルスケア情報の追加
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
  //Tokenの認証
  if (event.headers.authorization !== "mtiToken") {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Tokenが違いますログインしてください",
    });
    return response;
  }
  //日付けをdd-mm-yyyyで取得する
  let formatted_date
  var date = new Date();
  if (date.getMonth() + 1 < 10) {
    var formatDate = (date) => {
      formatted_date = String(date.getFullYear()) + String(0) + String(date.getMonth() + 1) + String(date.getDate());
      return Number(formatted_date);
    }
  }
  else {
    var formatDate = (date) => {
      formatted_date = String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDate());
      return Number(formatted_date);
    }
  }

  // TODO: リクエストボディの中身をJavaScriptオブジェクトに変換し、1つ、あるいは複数の変数に代入する
  const { userId, steps, drinks, cal } = JSON.parse(event.body)
  const healthId = formatDate(date)
  // TODO: paramに更新対象のテーブル名と更新内容を記述
  const param = {
    TableName,
    Item: {
      userId,
      healthId,
      steps,
      drinks,
      cal
    }
  };

  try {
    // dynamo.put()でDBにデータを登録
    await dynamo.put(param).promise();
    // TODO: 登録に成功した場合の処理を記載する。(status codeの設定と、response bodyの設定)
    response.statusCode = 201;

    response.body = JSON.stringify({ userId, healthId, steps, drinks, cal });
  }

  catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString()
    });
  }

  return response;
}
