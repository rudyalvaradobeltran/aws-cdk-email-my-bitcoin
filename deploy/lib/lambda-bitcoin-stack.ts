import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import { join } from "path";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import {
  ManagedPolicy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";

export class LambdaBitcoinStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const role = new Role(this, "SesSenderRole", {
      roleName: "SesSenderRole",
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
    });

    role.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName("AmazonSESFullAccess")
    );

    role.addToPrincipalPolicy(
      new PolicyStatement({
        actions: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "secretsmanager:GetSecretValue"
        ],
        resources: ["*"]
      })
    );

    const lambdaBitcoin = new NodejsFunction(this, "LambdaBitcoinFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(
        __dirname,
        "..",
        "..",
        "src",
        "LambdaBitcoin",
        "build/index.js"
      ),
      tracing: Tracing.ACTIVE,
      logRetention: RetentionDays.SIX_MONTHS,
      timeout: Duration.seconds(60),
      environment: {
        senderEmail: process.env.EMAIL_SENDER!,
        senderName: process.env.EMAIL_SENDER_NAME!,
        recipientEmail: process.env.EMAIL_RECIPIENT!
      },
      role: role
    });

    new Rule(this, "rule", {
      schedule: Schedule.rate(Duration.seconds(parseInt(process.env.SCHEDULE_RATE_IN_SECONDS!))),
      targets: [new LambdaFunction(lambdaBitcoin)],
    });
  }
}
