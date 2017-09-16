# Personal Finance
The purpose of this project is to create the required components for a
personal finance system. These features include budgeting, tracking 
expenses, displaying information related to spending and saving trends 
among others.

This project is divided into numerous sub-projects, each with their own
purpose and feature set. Below are a list of each sub-project and their
purpose. For more information on each component, view the README within
each sub-project.

## Core Components
* **[Electron App](./electron-app/README.md)** - A shell to run the 
dashboard on your local system, this is the main entrypoint of the 
application for most users.

* **[Receipt OCR](./receipt-ocr/README.md)** - A stand-alone tool and 
api that can take an image of a receipt (already cropped and rotated) 
and then return a structured object containing the text and information
from the image.

## Supplemental Components
These components represent an optional set, which are not required to
run any of the core components. They can however be used to supplement
features from the core components.

* **[Infrastructure](./infrastructure/README.md)** - A set of 
  terraform scripts to setup the required infrastructure (e.g. S3).
  * *S3* - The S3 bucket is used to store input images for the 
  Receipt OCR tool.
 

