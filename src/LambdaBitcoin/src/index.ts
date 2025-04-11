import { Logger, injectLambdaContext } from "@aws-lambda-powertools/logger";
import { SESv2Client, SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-sesv2"
import middy from "@middy/core";
import axios from "axios";
import template from "./email/template";

const logger = new Logger({ serviceName: "lambda-bitcoin" });
let client: SESv2Client;

const lambdaHandler = async (): Promise<void> => {
  try {
    if (!client) client = new SESv2Client({});
    let senderemail: string = process.env.senderEmail!;
    let senderName: string = process.env.senderName!
    let recipientEmail: string = process.env.recipientEmail!
    const response = await axios.get(process.env.apiUrl!);
    const input: SendEmailCommandInput = {
      FromEmailAddress: `${senderName} <${senderemail}>`,
      Destination: { ToAddresses: [ recipientEmail ] },
      EmailTags: [{ Name: 'type', Value: 'bitcoin' }],
      Content: {
        Simple: {
          Subject: { Data: "Today's Bitcoin Price!" },
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: template(response.data.bitcoin.usd, senderName)
            },
            Text: { Data: 'TEST EMAIL' }
          }
        }
      }
    }
    const command = new SendEmailCommand(input);
    await client.send(command);
  } catch (err: any) {
    logger.error(err);
  }
}

const handler = middy().handler(lambdaHandler).use(injectLambdaContext(logger));

export { handler };