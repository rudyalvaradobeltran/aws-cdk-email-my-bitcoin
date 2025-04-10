# Email My Bitcoin

This project is an AWS CDK application that sets up an automated system to fetch the current Bitcoin price every n days/hours/minutes and send it via email using Amazon SES. The email address is securely stored and retrieved from Amazon Secrets Manager. The project deployment is automated using GitHub Actions.

## Features

- **EventBridge Rule**: Triggers a Lambda function every n seconds.
- **Lambda Function**: Calls an external API (api.coincap.io) to get the current Bitcoin price.
- **Amazon SES**: Sends the Bitcoin price via email.
- **GitHub Actions**: Automates the deployment process and saves vars securely.

## Prerequisites

- AWS CLI installed and configured
- Node.js installed
- AWS CDK installed
- GitHub account
- AWS account with permissions for EventBridge, Lambda, and SES

## Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/rudyalvaradobeltran/aws-cdk-email-my-bitcoin.git
    cd aws-cdk-email-my-bitcoin
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Set Up AWS CDK**
    ```bash
    cdk bootstrap
    ```

4. **Replace the following environment variables in the code**
   - AWS_DEFAULT_REGION
   - AWS_GITHUB_OIDC_ROLE
   - CDK_DEFAULT_ACCOUNT
   - EMAIL_RECIPIENT
   - EMAIL_SENDER
   - EMAIL_SENDER_NAME
   - SCHEDULE_RATE_IN_SECONDS

5. **Configure Amazon SES**
    - Configure the sender email on Amazon SES.

6. **Deploy the Stack**
    ```bash
    cdk deploy
    ```

7. **Set Up GitHub Actions**
    - Configure your OIDC role on your AWS account.
    - Create a new GitHub repository and push your code.
    - Add the mentioned environment variables GitHub repository:

The GitHub Actions workflow file under `.github/workflows/deploy.yaml` will handle automatic deployment to AWS on pushes to the main branch.
