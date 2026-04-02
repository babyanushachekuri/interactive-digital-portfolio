pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "chekurianusha/portfolio-app"
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/babyanushachekuri/interactive-digital-portfolio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Run Container') {
            steps {
                bat '''
docker rm -f test-container || exit 0
docker run -d -p 8081:80 --name test-container %DOCKER_IMAGE%
'''
            }
        }

        stage('Test') {
            steps {
               bat '''
timeout 5
curl -f http://localhost:8081 || exit 1
'''
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat '''
echo %PASS% | docker login -u %USER% --password-stdin
docker push %DOCKER_IMAGE%
'''
                }
            }
        }
    }

    post {
        always {
            bat 'docker rm -f test-container || exit 0'
        }
    }
}