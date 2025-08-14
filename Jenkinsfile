pipeline {
    agent any

    environment {
        // Using a more descriptive name for the image and container
        IMAGE_NAME = "akhildesini/hello-world"
        CONTAINER_NAME = "hello-world-staging-container"
        IMAGE_TAG = "build-${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                cleanWs()
                git branch: 'main', url: 'https://github.com/akhildesini/hello-world-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                    sh "npm install"
                
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image with tag ${IMAGE_TAG}..."
                // The '.' at the end specifies the build context is the current directory
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Deploy to Docker') {
            steps {
                script {
                    echo "Stopping old container if running..."
                    // This logic correctly stops and removes the container without failing the pipeline if it doesn't exist.
                    sh(script: "docker stop ${CONTAINER_NAME} || true", returnStatus: true)
                    sh(script: "docker rm ${CONTAINER_NAME} || true", returnStatus: true)

                    echo "Running new container on host port 8088..."
                    // CORRECTED: Mapped host port 8088 to container port 8080 as required by the project specs.
                    sh "docker run -d --name ${CONTAINER_NAME} -p 8088:8080 ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
    }

    post {
        success {
            // CORRECTED: The success message now shows the correct port.
            echo "✅ Deployment successful! App running on port 8088 with image tag ${IMAGE_TAG}."
        }
        failure {
            echo "❌ Deployment failed. Check logs."
        }
    }
}
