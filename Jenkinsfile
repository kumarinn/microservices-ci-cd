pipeline {
    agent {
        label 'windows_slave'
        }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-token')
        DOCKERHUB_USERNAME = 'kumari388'
        DOCKERHUB_REPO = 'node-ms-cicd'
       // KUBE_CONFIG = credentials('kubeconfig-credentials-id')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'git-jenkins', url: 'https://github.com/kumarinn/microservices-ci-cd.git'
            }
        }

        stage('Build and Test User Service') {
            steps {
                dir('users-service') {
                    // sh 'npm install'
                    // sh 'npm test'
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }

        stage('Build and Test Order Service') {
            steps {
                dir('order-service') {
                    // sh 'npm install'
                    // sh 'npm test'
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }

        stage('Docker Build and Push') {
            parallel {
                stage('User Service') {
                    steps {
                        dir('users-service') {
                            script {
                                dockerImage = docker.build("${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}/user-service:${env.BUILD_NUMBER}")
                                docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
                                    dockerImage.push()
                                }
                            }
                        }
                    }
                }
                stage('Order Service') {
                    steps {
                        dir('order-service') {
                            script {
                                dockerImage = docker.build("${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}/order-service:${env.BUILD_NUMBER}")
                                docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
                                    dockerImage.push()
                                }
                            }
                        }
                    }
                }
            }
        }

        // stage('Deploy to Kubernetes') {
        //     steps {
        //         withCredentials([file(credentialsId: 'kubeconfig-credentials-id', variable: 'KUBECONFIG')]) {
        //             sh 'kubectl config use-context your-cluster-context'
        //             dir('helm-charts/user-service') {
        //                 sh "helm upgrade --install user-service . --set image.repository=${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}/user-service,image.tag=${env.BUILD_NUMBER}"
        //             }
        //             dir('helm-charts/order-service') {
        //                 sh "helm upgrade --install order-service . --set image.repository=${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}/order-service,image.tag=${env.BUILD_NUMBER}"
        //             }
        //         }
        //     }
        // }
    }
}
