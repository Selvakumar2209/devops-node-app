pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "selvakumar2209/gitops-node-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        HELM_REPO = "https://github.com/Selvakumar2209/devops-helm-charts"
        HELM_DIR = "helm-node-app"
    }

    stages {
        stage('Clone NodeJS App Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/Selvakumar2209/devops-node-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'dockerhub-creds', url: 'https://index.docker.io/v1/') {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Update Helm values.yaml') {
            steps {
                script {
                                 // Clone Helm repo into a specific directory
                     sh "git clone --single-branch ${HELM_REPO} devops-helm-charts"
            
                     dir("devops-helm-charts/${HELM_DIR}") {
                            sh "sed -i 's|tag:.*|tag: \"${IMAGE_TAG}\"|' values.yaml"
        
                        withCredentials([usernamePassword(credentialsId: 'github-creds', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                            sh """
                            git config user.name "Selvakumar A (via Jenkins)"
                            git config user.email "a.selvakumar2209@gmail.com"
                            git add .
                            git commit -m "🔄 Update image tag to ${IMAGE_TAG} via Jenkins"
                            git push https://${GIT_USER}:${GIT_PASS}@github.com/Selvakumar2209/devops-helm-charts.git HEAD:main
                            """
                        }
                    }
                }
            }
       }
  }

    post {
        success {
            echo "✅ Docker image pushed and Helm chart updated: ${DOCKER_IMAGE}:${IMAGE_TAG}"
        }
    }
}
