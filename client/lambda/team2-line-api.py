import json
import urllib.request
import os
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    lineId=json.loads(event['body'])['events'][0]["source"]['userId']
    
    for message_event in json.loads(event['body'])['events']:
        print(message_event["message"]['text'])
        text= message_event["message"]['text']
        url = f'https://igywhynkyg.execute-api.ap-northeast-1.amazonaws.com/webhook?Outh={text}&lineId={lineId}'
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'mtiToken'
            }
        body = {
            'replyToken': message_event['replyToken'],
            'messages': [
                {
                    "type": "text",
                    "text": message_event["message"]['text'],
                }
            ]
        }

        req = urllib.request.Request(url, data=json.dumps(body).encode('utf-8'), method='GET', headers=headers)
        with urllib.request.urlopen(req) as res:
            logger.info(res.read().decode("utf-8"))


    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }