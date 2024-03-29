angular.module('myApp', []).
directive('myPhotos', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: function ($scope) {
      var photos = $scope.photos = [];
      $scope.select = function (photo) {
        angular.forEach(photos, function (photo) {
          photo.selected = false;
        });
        photo.selected = true;
      };
      this.addPhoto = function (photo) {
        console.log('addPhoto photo', photo);
        photos.push(photo);
        console.log('$scope.photos', $scope.photos);
      };

    },
    templateUrl: 'my_photos.html'
  }
}).
directive('myPhoto', function () {
  return {
    require: '^myPhotos',
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function (scope, elem, attrs, photosControl) {
      console.log('link...');
      photosControl.addPhoto(scope);
    },
    template: '<div ng-show="selected" ng-transclude></div>'
  }
});