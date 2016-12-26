(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
      return {
        templateUrl: 'foundItems.html',
        scope: {
          items: '<',
          onRemove: '&'
        },
        controller: ShoppingListDirectiveController,
        controllerAs: 'list',
        bindToController: true
      };
    }

    function ShoppingListDirectiveController() {
      var list = this;

      list.isEmpty = function() {
          return list.items && list.items.length == 0;
      }
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var nidCtrl = this;

        nidCtrl.filter = function(searchTerm) {
            if (searchTerm && searchTerm.length > 0) {
            MenuSearchService.getMatchedMenuItems(searchTerm)
                .then(function(result) {
                    nidCtrl.found = result;
                });
            } else {
                nidCtrl.found = [];
            }
        }

        nidCtrl.removeItem = function(index) {
            nidCtrl.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        this.getMatchedMenuItems = function(searchTerm) {
            return $http({
                       method: "GET",
                       url: "https://davids-restaurant.herokuapp.com/menu_items.json"
                   }).then(function (result) {
                        // process result and only keep items that match
                        var foundItems = [];
                        var allItems = result.data.menu_items;
                        for (var index = 0; index < allItems.length; ++index) {
                            var item = allItems[index];
                            if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                                foundItems.push(item);
                            }
                        }

                        // return processed items
                        return foundItems;
                    });
        }
    }

})();
