import type { Product } from "@/api/interfaces/product.interface";
import { tesloApi } from "@/api/tesloApi";
import { sleep } from "@/lib/sleep";


export const createUpdateProductAction = async (
    productLike: Partial<Product> & { files?: File[] }
): Promise<Product> => {
    await sleep(1500);

    const { id, user, images = [], files = [], ...rest } = productLike;

    const isCreating = id === 'new';

    rest.stock = Number(rest.stock || 0);
    rest.price = Number(rest.price || 0);

    // Preparar las imagenes
    if (files.length > 0) {
        const newImageNames = await uploadFiles(files);
        images.push(...newImageNames);
    }

    const imagesToSave = images.map(image => {
        if( image.includes('http') ) return image.split('/').pop() || '';
        return image;
    })

    // console.log({ files });

    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${ id }`,
        method: isCreating ? 'POST' : 'PATCH',
        data: {
            ...rest,
            images: imagesToSave,
        },
    })

    return {
        ...data,
        images: data.images.map(image => {
            if ( image.includes('http')) return image;
            return `${ import.meta.env.VITE_API_URL }/files/product/${image}`
        })
    }
};

export interface FileUpleadResponse {
    secureUrl: string;
    fileName:  string;
}

const uploadFiles = async ( files: File[] ) => {

    const upleadPromises = files.map(async file => {

        const formData = new FormData();
        formData.append('file',file);

        const {data} = await tesloApi<FileUpleadResponse>({
            url: '/files/product',
            method: 'POST',
            data: formData
        })

        return data.fileName;
    })
    const uploadedFileNames = await Promise.all(upleadPromises)
    return uploadedFileNames;
}