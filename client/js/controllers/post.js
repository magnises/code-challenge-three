angular
  .module('web-forum')
  .controller('PostController', [
    '$scope',
    '$routeParams',
    'Topic',
    PostController
  ]);

function PostController($scope, $routeParams, Topic){

  getTopicPosts($routeParams.id);

  function getTopicPosts(id){
    var filter = {
      id: id,
      filter: {
        include: {posts: 'person'}
      }
    };

    Topic.findById(filter)
      .$promise
      .then(function(results){
        $scope.topic = results;
      });
  }

}
