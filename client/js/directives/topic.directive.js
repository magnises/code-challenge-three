(function () {
  'use strict';

  angular
    .module('web-forum')
    .directive('mgTopic', mgTopic);

  /* @ngInject */
  function mgTopic(multiline) {
    var template = multiline(function(){/*
      <div class="card grey lighten-5">
        <div class="card-content grey-text text-darken-3">
          <div class="valign-wrapper">

            <div class="col s12 valign no-padding">

              <div class="col l4 m6 s12 truncate">
                {{ dm.topic.title }}
              </div>
              <div class="col l3 m3 s6 truncate">
                {{ dm.topic.person.fullname }}
              </div>
              <div class="col l2 truncate hide-on-med-and-down">
                Accusantium
              </div>
              <div class="col m3 s6 truncate">
                Oct 12th, 2015 @ 9:00pm
              </div>

            </div>
          </div>
        </div>
      </div>
    */});

    var directive = {
      restrict: 'E',
      template:  template,
      scope: {},
      bindToController: {
        topic: '='
      },
      controller: Controller,
      controllerAs: 'dm',
    };

    return directive;
  }
  
  /* @ngInject */
  function Controller($timeout) {
    var dm = this;

    
  }
})();
