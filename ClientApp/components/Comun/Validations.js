"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var domain_task_1 = require("domain-task");
exports.required = function (value) { return (value ? undefined : 'Este campo es requerido'); };
exports.maxLength = function (max) { return function (value) {
    return value && value.length > max ? "Ingrese menos de " + max + " caracteres" : undefined;
}; };
exports.minLength = function (min) { return function (value) {
    return value && value.length < min ? "Ingrese m\u00E1s de " + min + " caracteres" : undefined;
}; };
exports.maxValue = function (max) { return function (value) {
    return value && value > max ? "Ingrese menos de " + max : undefined;
}; };
exports.minValue = function (min) { return function (value) {
    return value && value < min ? "Ingrese un valor superior a " + min : undefined;
}; };
exports.cuitValidator = function (value) {
    var onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums && onlyNums.length == 11) {
        var caracters_1_2 = value.charAt(0) + value.charAt(1);
        if (caracters_1_2 == "20" || caracters_1_2 == "23" || caracters_1_2 == "24" || caracters_1_2 == "27" || caracters_1_2 == "30" || caracters_1_2 == "33" || caracters_1_2 == "34") {
            var count = onlyNums.charAt(0) * 5 + onlyNums.charAt(1) * 4 + onlyNums.charAt(2) * 3 + onlyNums.charAt(3) * 2 + onlyNums.charAt(4) * 7 + onlyNums.charAt(5) * 6 + onlyNums.charAt(6) * 5 + onlyNums.charAt(7) * 4 + onlyNums.charAt(8) * 3 + onlyNums.charAt(9) * 2 + onlyNums.charAt(10) * 1;
            var division = count / 11;
            if (division == Math.floor(division)) {
                return undefined;
            }
            else
                return 'CUIT/CUIL inválido o inexistente';
        }
    }
    return 'Formato de CUIT/CUIL inválido';
};
exports.dniValidator = function (value) {
    return value && ((value.length < 7) || (value.length > 8)) ? 'DNI inválido' : undefined;
};
exports.emailValidator = function (value) {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Formato de email inválido'
        : undefined;
};
exports.confirmValidator = function (comparisionValue, fielName1, fielName2) { return function (value) {
    return value && comparisionValue != value ? "Los campos " + fielName1 + " y " + fielName2 + " deben coincidir." : undefined;
}; };
exports.emailConfirm = function (values) {
    var errors = {
        emailConfirm: null,
    };
    if (values.email != values.emailConfirm) {
        errors.emailConfirm = 'Los emails ingresados deben ser iguales';
    }
    return errors;
};
//Para validar la no existencia de CUIT/CUIL
exports.asyncValidate = function (values, dispatch) {
    return new Promise(function (resolve, reject) {
        (function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp, validCuit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, domain_task_1.fetch(__APIURL + "/api/Afip/CuitExiste?cuit=" + values.cuitCuil, {
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                            })];
                        case 1:
                            resp = _a.sent();
                            return [4 /*yield*/, resp.ok];
                        case 2:
                            validCuit = _a.sent();
                            if (!validCuit) {
                                reject({ cuitCuil: 'Ya existe un proveedor registrado con ese CUIT/CUIL' });
                            }
                            else {
                                resolve();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }());
    });
};
//validaciones entre multiples campos
exports.validate = function (values) {
    var errors = {
        emailReingresado: null,
    };
    if (values.email != values.emailReingresado) {
        errors.emailReingresado = 'Los correos ingresados deben ser iguales';
    }
    return errors;
};
exports.validateRequisitos = function (values) {
    var errors = {
        otrosRequisitos: null,
    };
    if (values.otrosRequisitos == undefined || values.otrosRequisitos.length <= 0) {
        errors.otrosRequisitos = 'Debe ingresar al menos un requisito';
    }
    return errors;
};
exports.validateLogin = function (values) {
    var errors = {
        repetirPassword: null,
    };
    if (values.password != values.repetirPassword) {
        errors.repetirPassword = 'Las contraseñas ingresadas deben ser iguales';
    }
    return errors;
};
//# sourceMappingURL=Validations.js.map