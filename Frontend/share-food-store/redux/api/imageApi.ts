import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';

export const imageApi = createApi({
    reducerPath: 'imageApi',
    baseQuery: customFetchBase,
    tagTypes: ['Image'],
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (credentials) => ({
                document: `mutation SingleUpload($photo: String) {
                    singleUpload(photo: $photo)
                  }
                `,
                variables: credentials
            }),
            invalidatesTags: ['Image'],
        }),
    })
});

export const { useUploadImageMutation } = imageApi;