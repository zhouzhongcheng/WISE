'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtilService = function () {
    function UtilService($http) {
        _classCallCheck(this, UtilService);

        this.$http = $http;
    }

    /**
     * Generates and returns a random key of the given length if
     * specified. If length is not specified, returns a key 10
     * characters in length.
     */

    _createClass(UtilService, [{
        key: "generateKey",
        value: function generateKey(length) {
            this.CHARS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

            /* set default length if not specified */
            if (!length) {
                length = 10;
            }

            /* generate the key */
            var key = '';
            for (var a = 0; a < length; a++) {
                key += this.CHARS[Math.floor(Math.random() * (this.CHARS.length - 1))];
            }

            /* return the generated key */
            return key;
        }
    }, {
        key: "convertStringToNumber",

        /**
         * Try to convert a string to a number
         * @param str the string to convert
         * @returns a number if we were able to convert the string to a number.
         * if we couldn't convert the string to a number we will just return the string.
         */
        value: function convertStringToNumber(str) {
            var result = str;

            if (str != null && str != '' && !isNaN(Number(str))) {
                result = Number(str);
            }

            return result;
        }
    }]);

    return UtilService;
}();

UtilService.$inject = ['$http'];

exports.default = UtilService;
//# sourceMappingURL=utilService.js.map