"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFilterFromMap = exports.addFilterToMap = exports.filterMap = exports.ALPRCamera = void 0;
var ALPRCamera_1 = require("./camera/ALPRCamera");
Object.defineProperty(exports, "ALPRCamera", { enumerable: true, get: function () { return __importDefault(ALPRCamera_1).default; } });
var filterMap_1 = require("./filtering/filterMap");
Object.defineProperty(exports, "filterMap", { enumerable: true, get: function () { return filterMap_1.filterMap; } });
Object.defineProperty(exports, "addFilterToMap", { enumerable: true, get: function () { return filterMap_1.addFilterToMap; } });
Object.defineProperty(exports, "removeFilterFromMap", { enumerable: true, get: function () { return filterMap_1.removeFilterFromMap; } });
