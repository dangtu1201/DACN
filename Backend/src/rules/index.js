import { rule, shield, or } from 'graphql-shield';
import { ForbiddenError, UserInputError } from 'apollo-server-express';

const isAuthenticated = rule()(async (rootValue, args, { auth, t }) => {
    if (!auth.isAuthUser()) {
        return new ForbiddenError(t('unauthenticated'));
    }
    return true;
});

const isSdkAuthenticated = rule()(async (rootValue, args, { auth, t }) => {
    if (!auth.isSdkUser()) {
        return new ForbiddenError(t('unauthenticated'));
    }
    return true;
});

const isBasicAuthenticated = rule()(
    async (rootValue, args, { basicAuthenticated, t }) => {
        if (!basicAuthenticated) {
            return new ForbiddenError(t('unauthenticated'));
        }
        return true;
    },
);

export const permissions = shield(
    {
        Query: {
            // posts: isAuthenticated,
            // likedPost: isAuthenticated,
            // userPosts: isAuthenticated,
            // postsPagination: isAuthenticated,
            // userPostsPagination: isAuthenticated,
            // getCommentOnPost: isAuthenticated,
            // getCommentOnPostPagination: isAuthenticated,
            // postDetail: isAuthenticated,
            // userPostsPaginationById: isAuthenticated,
            // filter: isAuthenticated,
            // filterPagination: isAuthenticated,
        },
        Mutation: {
            // createPost: isAuthenticated,
            // likeOrUnlike: isAuthenticated,
            // createComment: isAuthenticated,
            // hidePost: isAuthenticated,
            // showPost: isAuthenticated,
            // deletePost: isAuthenticated,
            // updatePost: isAuthenticated,
            // likeComment: isAuthenticated,
            // updatePost: isAuthenticated,
        },
    },
    {
        allowExternalErrors: true,
    },
);
