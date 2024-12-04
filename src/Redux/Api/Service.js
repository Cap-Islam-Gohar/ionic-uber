import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    tagTypes: ['Api', 'Cart', 'Wishlist'],
    keepUnusedDataFor: 60,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    refetchOnMountOrArgChange: false,
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ecommerce.routemisr.com/api/v1/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState()).auth.token
            if (token) {
                headers.set('token', token)
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'auth/signin/',
                method: 'POST',
                body
            }),
            transformResponse: (response) => response,
            transformErrorResponse: (error) => error.data,
        }),
        register: builder.mutation({
            query: (body) => ({
                url: 'auth/signup/',
                method: 'POST',
                body
            }),
            transformResponse: (response) => response,
            transformErrorResponse: (error) => error.data,
        }),
        products: builder.query({
            query: () => "products/",
            transformResponse: (response) => response.data,
            transformErrorResponse: (error) => error.data,
        }),
        product: builder.query({
            query: (id) => `products/${id}`,
            transformResponse: (response) => response.data,
            transformErrorResponse: (error) => error.data,      
            invalidatesTags : ['Wishlist'],      
        }),
        brands: builder.query({
            query: () => "brands/",
            transformResponse: (response) => response.data,
            transformErrorResponse: (error) => error.data,
        }),
        categories: builder.query({
            query: () => "categories/",
            transformResponse: (response) => response.data,
            transformErrorResponse: (error) => error.data,
        }),
        cart: builder.query({
            query: () => 'cart/',  
            providesTags: ['Cart'],
            transformResponse: (response) => {
                return {
                    quantity: response.numOfCartItems,
                    products: response.data.products,
                    totalPrice: response.data.totalCartPrice,
                    id: response.data._id,
                    userId: response.data.cartOwner
                }
            },
            transformErrorResponse: (error) => error.data,
        }),
        addToCart: builder.mutation({
            invalidatesTags : ['Cart'],
            query: (id) => ({
                url: `cart/`,
                method: 'POST',
                body: {
                    productId: id,
                }
            }),  
            transformResponse: (response) => {
                return {
                        message: response.message,
                        quantity: response.numOfCartItems,
                        products: response.data.products,
                        totalPrice: response.data.totalCartPrice,
                        id: response.data._id,
                        userId: response.data.cartOwner
                }
            },
            transformErrorResponse: (error) => error.data
        }),
        removeFromCart: builder.mutation({
            invalidatesTags : ['Cart'],
            query: (id) => ({
                url: `cart/${id}`,
                method: 'DELETE'
            }),  
            transformResponse: (response) => {
                return {
                    message: response.message,
                    quantity: response.numOfCartItems,
                    products: response.data.products,
                    totalPrice: response.data.totalCartPrice,
                    id: response.data._id,
                    userId: response.data.cartOwner
                }
            },
            transformErrorResponse: (error) => error.data
        }),
        wishlist: builder.query({
            query: () => 'wishlist/',  
            providesTags: ['Wishlist'],
            transformResponse: (response) => {
                return response;
                return {
                    quantity: response.numOfCartItems,
                    products: response.data.products,
                    totalPrice: response.data.totalCartPrice,
                    id: response.data._id,
                    userId: response.data.cartOwner
                }
            },
            transformErrorResponse: (error) => error.data,
        }),
        addToWishlist: builder.mutation({
            invalidatesTags : ['Wishlist'],
            query: (id) => ({
                url: `wishlist/`,
                method: 'POST',
                body: {
                    productId: id,
                }
            }),  
            transformResponse: (response) => {
                return response;
                return {
                        message: response.message,
                        quantity: response.numOfCartItems,
                        products: response.data.products,
                        totalPrice: response.data.totalCartPrice,
                        id: response.data._id,
                        userId: response.data.cartOwner
                }
            },
            transformErrorResponse: (error) => error.data
        }),
        removeFromWishlist: builder.mutation({
            invalidatesTags : ['Wishlist'],
            query: (id) => ({
                url: `wishlist/${id}`,
                method: 'DELETE'
            }),  
            transformResponse: (response) => {
                return response;
                return {
                    message: response.message,
                    quantity: response.numOfCartItems,
                    products: response.data.products,
                    totalPrice: response.data.totalCartPrice,
                    id: response.data._id,
                    userId: response.data.cartOwner
                }
            },
            transformErrorResponse: (error) => error.data
        }),
    })
});

export const { 
    useLoginMutation, 
    useRegisterMutaion,
    useProductsQuery,
    useProductQuery,
    useBrandsQuery,
    useCategoriesQuery,
    useCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
} =  api;
