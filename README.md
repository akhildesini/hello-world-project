# hello-world-project

CI/CD Pipeline for a Node.js Web Application

This project demonstrates a complete and robust Continuous Integration and Continuous Delivery (CI/CD) pipeline for a simple Node.js web application. The pipeline is built using a powerful combination of Jenkins, Docker, and Amazon Web Services (AWS) to automate the entire software delivery process, from code commit to live deployment.

Project Overview

The core objective of this project is to build an automated assembly line for the provided Express.js "Hello, World!" application. The pipeline is configured to:

Trigger Automatically: A git push to the main branch on GitHub instantly triggers the Jenkins pipeline.

Containerize: The application is packaged into a portable Docker image.

Integrate & Test: The pipeline builds the image and runs a verification step.

Store Artifact: The newly built image is versioned and pushed to Docker Hub as a secure artifact.

Deploy Continuously: Upon a successful build, the pipeline automatically deploys the new application version to a staging environment hosted on an AWS EC2 instance.

The final application is made available on the staging server at port 8088 as jenkins is already running at 8080.

Pipeline Architecture & Process Flow

The entire workflow is defined as code using a Jenkinsfile and follows these distinct stages:

Code Commit: A developer pushes new code to the main branch of the GitHub repository.

Jenkins Trigger: A GitHub webhook notifies the Jenkins server, which automatically starts the corresponding pipeline job.

CI Phase (Integration & Build):

Clone: Jenkins checks out the latest source code.

Build: Jenkins uses the Dockerfile to build a new Docker image. This image is tagged with the unique Jenkins build number (e.g., :1, :2) for clear versioning.

Test: A dummy test stage is executed to simulate running a test suite, ensuring the pipeline can handle quality gates.

Push: The versioned Docker image is pushed to Docker Hub, making it available for deployment.

CD Phase (Delivery & Deployment):

Connect: Jenkins establishes a secure SSH connection to the staging AWS EC2 instance.

Deploy: The script on the remote server pulls the new image from Docker Hub, stops and removes the old running container, and starts a new container from the new image.

Choice of Tools and Assumptions

CI/CD Tool: Jenkins

Reasoning: Jenkins was chosen for its unparalleled flexibility, extensive plugin ecosystem, and its status as an industry standard for building powerful, custom automation pipelines. Using the Pipeline-as-Code feature (Jenkinsfile) allows us to version control our entire CI/CD process alongside the application code, making it reproducible and transparent.

Containerization: Docker

Reasoning: Docker provides a consistent and isolated environment for the application. By containerizing the app, we eliminate the "it works on my machine" problem. The provided multi-stage Dockerfile creates a small, efficient, and secure production image by separating build-time dependencies from the final runtime environment.

Staging Environment: AWS EC2

Reasoning: Amazon Web Services is the leading cloud provider, and its EC2 service offers reliable, scalable, and secure virtual servers for hosting applications. An EC2 instance serves as a realistic and robust staging environment for this project.

Assumption: The staging environment is a Linux-based AWS EC2 instance with Docker installed. The instance's security group is configured to allow inbound traffic on port 22 (for SSH from Jenkins) and port 8080 (for public access to the web app).

Setup and Configuration Instructions

To replicate this CI/CD pipeline, the following setup is required.

Prerequisites

A running Jenkins server accessible from the internet.

The following Jenkins plugins installed: Docker Pipeline, SSH Pipeline Steps.

An AWS account with an EC2 instance configured as the staging server. Docker must be installed on the EC2 instance.

Jenkins Configuration Steps

Add Credentials: Securely store all secrets in Jenkins's credential manager (Manage Jenkins > Credentials).

Staging Server SSH Key:

Type: SSH Username with private key

Username: The SSH user for your EC2 instance (e.g., ubuntu, ec2-user).

Private Key: The private SSH key used to connect to your EC2 instance.

ID: aws-staging-ssh-key (This ID is referenced in the Jenkinsfile).

Create Jenkins Job:

Create a new Pipeline job in Jenkins.

In the Pipeline section, select Pipeline script from SCM.

SCM: Git.

Repository URL: Enter the URL of your GitHub repository.

Branch: */main.

Script Path: Jenkinsfile.

How to Run the Pipeline

The pipeline is fully automated. To trigger a new build, test, and deployment cycle:

Make any change to the application code.

Navigate to your Jenkins dashboard to monitor the pipeline's execution in real-time.

Verification

Once the pipeline completes successfully, the application will be running and accessible at:
http://<your-ec2-instance-public-ip>:8088

Deployment Strategy and Rollback Capability

Deployment Strategy: The pipeline employs a basic but effective rolling update strategy. It connects to the staging server, pulls the new image, and then stops and removes the old container before starting the new one. This ensures that the old version is cleanly replaced by the new one.

Rollback Capability: The Jenkinsfile is structured with a post block that catches the build status.

On Failure: If any stage in the pipeline fails, the failure block is executed. For this assignment, this block logs an error message.
