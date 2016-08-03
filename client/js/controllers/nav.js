angular
  .module('web-forum')
  .controller('NavController', [
    '$scope',
    '$rootScope',
    'Person',
    'LoopBackAuth',
    NavController
  ]);

function NavController($scope, $rootScope, Person, LoopBackAuth){
    $scope.name = 'It Works!';

    $scope.logout = function() {
      Person.logout(function(res) {
        $rootScope.currentUser = null;
      }, function(err){
        LoopBackAuth.clearStorage();
        $rootScope.currentUser = null;
      });
    };

    $scope.openLoginModal = function(){
      $('.button-collapse').sideNav('hide');

      $('#LoginModal').openModal();

      $scope.submitLogin = function(){
        loginUser($scope.login);
        $('#LoginModal').closeModal();
      };
    };

    $scope.openRegisterModal = function(){
      $('.button-collapse').sideNav('hide');
      $('#RegisterModal').openModal();

      $scope.submitRegister = function(){
        if($scope.register.password !== $scope.confirm){
          return Materialize.toast('Passwords do not match', 4000);
        }

        Person.create($scope.register,
          function(response){
            Materialize.toast('Success!! Logging you in.', 4000);

            loginUser({
              email: $scope.register.email,
              password: $scope.register.password
            });

            $('#RegisterModal').closeModal();
          },
          function(error){
            Materialize.toast('You\'ve already registered dummy', 4000);
          });
      };
    };

    function loginUser(loginFields){
      Person.login(loginFields, function(response){
        LoopBackAuth.currentUserId = response.userId;
        LoopBackAuth.accessTokenId = response.id;
        LoopBackAuth.save();

        $rootScope.currentUser = response.user;
      });
    }

}
