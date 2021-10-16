import * as Yup from 'yup';

export default Yup.object({
    email: Yup.string().email("Не коректна електронна пошта!").required("Поле не може бути пустим!"),
    password: Yup.string().min(5, "Пароль має містити більше 5 символів!")
    .matches(/[a-zA-Z]/, "Поле має містити латинські літери").required("Поле не може бути пустим!")
});