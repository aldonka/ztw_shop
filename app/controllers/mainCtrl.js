/**
 * Created by Dominika on 2016-11-07.
 */
angular.module('myApp')
    .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'Product', 'Category', 'BasketService', 'InfoService', function ($scope, $rootScope, $location, $cookies, Product, Category, BasketService, InfoService) {
        $scope.title = "Sklep spożywczy";
        $scope.newProduct = {};
        $scope.basketSize = BasketService.basketSize();
        Category.get({}, function (response) {
            $scope.categories = [];
            for (var i = 0; i < response.length; i++) {
                $scope.categories.push({
                    "id": response[i].id,
                    "name": response[i].name,
                    "checked": true
                });
            }
            $scope.shownCategories = $scope.categories;
        });
        $scope.basketBtn = BasketService.noShoppingType();
        Product.get({}, function (response) {
            $scope.products = response;
        });

        $scope.isShopping = function () {
            return BasketService.ifIsShopping($scope.basketBtn);
        };

        $scope.changeCheckbox = function (index) {
            $scope.categories[index].checked = !$scope.categories[index].checked
        };

        $scope.changeBasketBtn = function () {
            $scope.basketBtn = BasketService.changeBtnType($scope.basketBtn);
        };

        $scope.addToBasket = function (index) {
            BasketService.addToBasket(index);
            $scope.basketSize = BasketService.basketSize();
        };

        $scope.basketAction = function () {
            $scope.changeBasketBtn();
            if (BasketService.ifIsShopping($scope.basketBtn)) {
                if (BasketService.basketSize() > 0)
                    $location.path('/basket');
                else{
                    $scope.info = InfoService.getError("Koszyk jest pusty.");
                    InfoService.showInfo($scope.info);
                }
            }


        };

        $scope.addProductAction = function () {
            $location.path('/add_product');
        };

        $scope.returnToShop = function () {
            $location.path('/');
        };

        $scope.addProduct = function () {
            if($scope.productForm.$valid){
                $scope.newProduct.category = getCategoryId($scope.newProduct.category);
                Product.save($scope.newProduct).$promise.then(function (response) {
                    $scope.info = InfoService.getInfo("success, added", true);
                    console.log("New product added" + response);
                    $location.path('/');
                }, function (err) {
                    $scope.info = InfoService.getInfo("error: " + err, true);
                    $location.path('/');
                });
            }else{
                $scope.info = InfoService.getError("Bład w danych z formularza.");
                InfoService.showInfo($scope.info);
            }
        };

        $scope.removeProduct = function removeProduct(id){
            Product.delete({id: id}, function () {
                $scope.info = InfoService.getSuccess("Usunięto produkt : " + id);
                InfoService.showInfo($scope.info);
                Product.get({}, function (response) {
                    $scope.products = response;
                });
            }, function () {
                $scope.info = InfoService.getError("Nie udało się usunąć produktu : " + id);
                InfoService.showInfo($scope.info);
            })
        };

        getCategoryId = function (catString) {
            for (var i = 0; i < $scope.categories.length; i++) {
                if ($scope.categories[i].name == catString) {
                    return i;
                }
            }
        }
    }]);
