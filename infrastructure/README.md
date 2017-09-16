# Infrastructure
This component creates all of the infrastructure that can be used with
the personal-finance tool.

The AWS Free Tier is used as much as possible with the goal to keep cost
of using this suite of tools at a minimum.

## Requirements
 * [AWS Account](https://aws.amazon.com/free/)
 * [Terraform](https://www.terraform.io/intro/getting-started/install.html)

## S3
The S3 bucket is used to store input images for OCR processing.
Images are fetched from S3 when the receipt OCR tool is run.  
