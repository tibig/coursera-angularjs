(function () {
    'use strict';
    
    angular.module("ShoppingListCheckOff", [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    function ShoppingListCheckOffService() {
        var service = this;

        service.toBuy = [
            { name: 'aaaa',   quantity: 2  },
            { name: 'bbbbbb', quantity: 3  },
            { name: 'cccccc', quantity: 12 },
            { name: 'ddddd',  quantity: 8  },
            { name: 'eeeee',  quantity: 5  },
        ];

        service.bought = [];

        service.boughtItem = function (index) {
            var item = service.toBuy[index];
            service.toBuy.splice(index, 1);
            service.bought.push(item);
        };
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        this.items = ShoppingListCheckOffService.toBuy;
        this.boughtItem = ShoppingListCheckOffService.boughtItem;
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.items = ShoppingListCheckOffService.bought;
    }
})();
