export interface User {
    fullName:{
        firstName: string;
        lastName: string;
    },
    email: string;
    password: string;
    userType: string;
}