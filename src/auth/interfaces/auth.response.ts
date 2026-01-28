import type { User } from "@/api/interfaces/user.interface";

// Login, Register, CheckStatus
export interface AuthResponse {
    user:  User;
    token: string;
}