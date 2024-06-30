import * as Yup from 'yup'

export const loginSchema = Yup.object(
    {
        email: Yup.string().email().required("email must required"),
        password: Yup.string().min(4, "password should be at least 4 char long").required("password must required"),
    })  
    