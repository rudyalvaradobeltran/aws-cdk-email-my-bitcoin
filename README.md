# AWS CDK Email My Bitcoin

This project is an AWS CDK application that sets up an automated system to fetch the current Bitcoin price every n seconds and send it via email using Amazon SES. Deployment is automated with GitHub Actions.

## Features

- **EventBridge Rule**: Triggers a Lambda function every n seconds.
- **Lambda Function**: Calls an external API (api.coingecko.com) to get the current Bitcoin price.
- **Amazon SES**: Sends the Bitcoin price via email.
- **GitHub Actions**: Automates the deployment process and saves vars securely.

## Prerequisites

- AWS CLI installed and configured
- Node.js installed
- AWS CDK installed
- GitHub account
- AWS account with permissions for EventBridge, Lambda, SES and IAM roles

## Installation using Github Actions

1. **Fork the repository**

2. **Set the following environment variables in your new repository**
   - AWS_DEFAULT_REGION
   - CDK_DEFAULT_ACCOUNT
   - AWS_GITHUB_OIDC_ROLE
   - EMAIL_RECIPIENT
   - EMAIL_SENDER
   - EMAIL_SENDER_NAME
   - SCHEDULE_RATE_IN_SECONDS
   - API_URL (https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd)
    
3. **Configure your OIDC role on your AWS account**

4. **Configure Amazon SES**

5. **Clone the repository locally**

6. **Install dependencies (deploy folder)**
    ```bash
    npm install
    ```

6. **Bootstrap your project**
    ```bash
    cdk bootstrap
    ```

7. **Push any changes to the main branch to run the deploy job**

The GitHub Actions workflow file under `.github/workflows/deploy.yaml` will handle automatic deployment to AWS on pushes to the main branch.
