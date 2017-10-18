declare var __APIURL: string;
import axios from 'axios';

export const required = value => (value ? undefined : 'Este campo es requerido')

export const maxLength = max => value =>
    value && value.length > max ? `Ingrese menos de ${max} caracteres` : undefined

export const minLength = min => value =>
    value && value.length < min ? `Ingrese más de ${min} caracteres` : undefined

export const maxValue = max => value =>
    value && value > max ? `Ingrese menos de ${max}` : undefined

export const minValue = min => value =>
    value && value < min ? `Ingrese un valor superior a ${min}` : undefined

export const cuitValidator = value => {
    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums && onlyNums.length == 11) {
        var caracters_1_2 = value.charAt(0) + value.charAt(1);
        if (caracters_1_2 == "20" || caracters_1_2 == "23" || caracters_1_2 == "24" || caracters_1_2 == "27" || caracters_1_2 == "30" || caracters_1_2 == "33" || caracters_1_2 == "34") {
            var count = onlyNums.charAt(0) * 5 + onlyNums.charAt(1) * 4 + onlyNums.charAt(2) * 3 + onlyNums.charAt(3) * 2 + onlyNums.charAt(4) * 7 + onlyNums.charAt(5) * 6 + onlyNums.charAt(6) * 5 + onlyNums.charAt(7) * 4 + onlyNums.charAt(8) * 3 + onlyNums.charAt(9) * 2 + onlyNums.charAt(10) * 1
            var division = count / 11;
            if (division == Math.floor(division)) {
                return undefined
            } else return 'CUIT/CUIL inválido o inexistente'
        }

    }
    return 'Formato de CUIT/CUIL inválido'

}

export const dniValidator = value =>
    value && ((value.length < 7) || (value.length > 8)) ? 'DNI inválido' : undefined

export const emailValidator = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Formato de email inválido'
        : undefined

export const confirmValidator = (comparisionValue, fielName1, fielName2) => (value) =>
    value && comparisionValue != value ? `Los campos ${fielName1} y ${fielName2} deben coincidir.` : undefined
    
export const emailConfirm = values => {
    const errors = {
        emailConfirm: null,
    }
    if (values.email != values.emailConfirm) {
        errors.emailConfirm = 'Los emails ingresados deben ser iguales'
    }
    return errors
}



//validaciones entre multiples campos
export const validate = values => {
    const errors = {
        emailReingresado: null,
    }
    if (values.email != values.emailReingresado) {
        errors.emailReingresado = 'Los correos ingresados deben ser iguales'
    }

    return errors
}

export const validateRequisitos = values => {
    const errors = {
        otrosRequisitos: null,
    }
    if (values.otrosRequisitos == undefined || values.otrosRequisitos.length <= 0) {
        errors.otrosRequisitos = 'Debe ingresar al menos un requisito'
    }

    return errors
}

export const validateLogin = values => {
    const errors = {
        repetirPassword: null,
    }
    if (values.password != values.repetirPassword) {
        errors.repetirPassword = 'Las contraseñas ingresadas deben ser iguales'
    }

    return errors
}
