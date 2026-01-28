import type { User } from "./user.interface";

export interface Product {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       Size[];
    gender:      Gender;
    tags:        string[];
    images:      string[];
    user:        User;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'; 

export type Gender = 'kid' | 'men' | 'women' | 'unisex';

export type Email = "test1@google.com";

export type FullName = "Test One";

export type Role = "admin";
