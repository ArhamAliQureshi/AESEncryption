"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var CryptoJS = _interopRequireWildcard(require("crypto-js"));

var _crypto = require("crypto");

var dotenv = _interopRequireWildcard(require("dotenv"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var result = dotenv.config();
var SECRET = '8080808080808080';
var encryptionType = 'aes-128-cbc';
var EtoEncryption = {
  defaultEncrypt: function defaultEncrypt(req, res, next) {
    var plainText = JSON.stringify(req.body),
        key = SECRET,
        iv = SECRET;
    var cipher = (0, _crypto.createCipheriv)(encryptionType, key, iv);
    var encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([encrypted, cipher["final"]()]);
    return {
      Data: encrypted.toString('base64') //Buffer to Hex

    };
  },
  defaultDecrypt: function defaultDecrypt(req, res, next) {
    var encryptedData = req.body.Data;
    var iv = SECRET,
        key = SECRET;
    var encryptedText = Buffer.from(encryptedData, 'base64'); //Hex to Buffer    

    var decipher = (0, _crypto.createDecipheriv)(encryptionType, key, iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher["final"]()]);
    return JSON.parse(decrypted.toString());
  }
};
var _default = EtoEncryption;
exports["default"] = _default;