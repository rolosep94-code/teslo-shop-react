import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response";


export const registerAction = async( email: string, password: string, fullname: string):Promise<AuthResponse> => {
    try {
        
        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            email: email,
            password: password,
            fullname: fullname,
        });

        console.log(data);

        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}