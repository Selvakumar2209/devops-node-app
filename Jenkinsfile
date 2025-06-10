pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "selvakumar2209/devops-node-app"
        DOCKER_CREDS = credentials('dockerhub-creds')
    }

    stages {
        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/devops-node-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${BUILD_NUMBER}")
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Docker image pushed: ${DOCKER_IMAGE}:${BUILD_NUMBER}"
        }
    }
}
