pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "yourdockerhubusername/portfolio-app"
    }

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker rm -f test-container || true
                docker run -d -p 8081:80 --name test-container $DOCKER_IMAGE
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                sleep 5
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
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $DOCKER_IMAGE
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker rm -f test-container || true'
        }
    }
}