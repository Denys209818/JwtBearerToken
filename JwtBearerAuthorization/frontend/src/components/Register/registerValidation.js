import * as Yup from 'yup';

export default Yup.object({
    firstname: Yup.string().required("Поле має бути обовязковим!"),
    lastname: Yup.string().required("Поле має бути обовязковим!"),
    phone: Yup.string()
    .matches(/^(?=\+?([0-9]{2})\(?([0-9]{3})\)\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})).{18}$/, 
    'Номер введено не коректно!').required("Поле має бути обовязковим!"),
    email: Yup.string().email("Не коректна електронна пошта").required("Поле має бути обовязковим!"),
    password: Yup.string().min(5, 'Мінімальна кільскість символів 5').required("Поле має бути обовязковим!"),
    submitPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароль має співпадати!').required("Поле має бути обовязковим!")
});