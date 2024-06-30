import * as Yup from 'yup'

export const registerSchema = Yup.object(
    {
        username: Yup.string().min(4, "username should be at least 4 char long").required("username must required"),
        email: Yup.string().email().required("email must required"),
        password: Yup.string().min(4, "password should be at least 4 char long").required("password must required"),
        bio:Yup.string()
        
    }
)