angular
  .module('web-forum')
  .controller('TopicsController', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$route',
    'Topic',
    'Post',
    TopicsController
  ]);

function TopicsController($scope, $rootScope, $timeout, $route, Topic, Post){

    $scope.name = 'Topics Controller';
    var newTopicModal = $('#NewTopic');

    $scope.topics = [];

    findTopics();

    $scope.goToPost = function(postId){
      $timeout(function(){
        location.hash = '#/post/' + postId;
      });
    };

    $scope.openNewTopicModal = function(){
      newTopicModal.openModal();
    };

    $scope.createNewTopic = function(){

      $scope.topic.personId = $scope.post.personId = $rootScope.currentUser.id;

      createTopic($scope.topic)
        .then(afterCreateTopic)
        .then(findTopics);
    };

    function findTopics(){
      Topic.find({filter: {include: 'person'}}, function(result){
        $scope.topics = result;
      });
    }

    function createTopic(topic){
      return Topic.create(topic).$promise;
    }

    function afterCreateTopic(result){
      newTopicModal.closeModal();

      $scope.post.topicId = result.id;

      return createPost($scope.post);
    }

    function createPost(post){
      return Post.create(post).$promise;
    }

}
