import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"
import type { Product } from "@/api/interfaces/product.interface";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {

    const queryClient = useQueryClient();
    
    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, //5 minutos
        // enabled: !!id
    });

    //TODO: mutación
    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            // invalidar caché
            queryClient.invalidateQueries({queryKey: ['products']});
            queryClient.invalidateQueries({queryKey: ['product', { id: product.id }]});
            // console.log('Todo salió bien', product);

            //Actualizar queryData
            queryClient.setQueryData(['products', { id: product.id }], product);
        },

    });

    //TODO: por eliminar
    // const handleSubmitForm = async (productLike: Partial<Product>) =>  {
    //     console.log({productLike});
    // };
  
    return {
        ...query,
        mutation,
    };

};
