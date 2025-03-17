/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthPostsImport } from './routes/_auth.posts'
import { Route as AuthPostsIdImport } from './routes/_auth.posts.$id'
import { Route as AuthPostsIdEditImport } from './routes/_auth.posts.$id.edit'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthPostsRoute = AuthPostsImport.update({
  id: '/posts',
  path: '/posts',
  getParentRoute: () => AuthRoute,
} as any)

const AuthPostsIdRoute = AuthPostsIdImport.update({
  id: '/$id',
  path: '/$id',
  getParentRoute: () => AuthPostsRoute,
} as any)

const AuthPostsIdEditRoute = AuthPostsIdEditImport.update({
  id: '/edit',
  path: '/edit',
  getParentRoute: () => AuthPostsIdRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_auth/posts': {
      id: '/_auth/posts'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof AuthPostsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/posts/$id': {
      id: '/_auth/posts/$id'
      path: '/$id'
      fullPath: '/posts/$id'
      preLoaderRoute: typeof AuthPostsIdImport
      parentRoute: typeof AuthPostsImport
    }
    '/_auth/posts/$id/edit': {
      id: '/_auth/posts/$id/edit'
      path: '/edit'
      fullPath: '/posts/$id/edit'
      preLoaderRoute: typeof AuthPostsIdEditImport
      parentRoute: typeof AuthPostsIdImport
    }
  }
}

// Create and export the route tree

interface AuthPostsIdRouteChildren {
  AuthPostsIdEditRoute: typeof AuthPostsIdEditRoute
}

const AuthPostsIdRouteChildren: AuthPostsIdRouteChildren = {
  AuthPostsIdEditRoute: AuthPostsIdEditRoute,
}

const AuthPostsIdRouteWithChildren = AuthPostsIdRoute._addFileChildren(
  AuthPostsIdRouteChildren,
)

interface AuthPostsRouteChildren {
  AuthPostsIdRoute: typeof AuthPostsIdRouteWithChildren
}

const AuthPostsRouteChildren: AuthPostsRouteChildren = {
  AuthPostsIdRoute: AuthPostsIdRouteWithChildren,
}

const AuthPostsRouteWithChildren = AuthPostsRoute._addFileChildren(
  AuthPostsRouteChildren,
)

interface AuthRouteChildren {
  AuthPostsRoute: typeof AuthPostsRouteWithChildren
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthPostsRoute: AuthPostsRouteWithChildren,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/posts': typeof AuthPostsRouteWithChildren
  '/posts/$id': typeof AuthPostsIdRouteWithChildren
  '/posts/$id/edit': typeof AuthPostsIdEditRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/posts': typeof AuthPostsRouteWithChildren
  '/posts/$id': typeof AuthPostsIdRouteWithChildren
  '/posts/$id/edit': typeof AuthPostsIdEditRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/_auth/posts': typeof AuthPostsRouteWithChildren
  '/_auth/posts/$id': typeof AuthPostsIdRouteWithChildren
  '/_auth/posts/$id/edit': typeof AuthPostsIdEditRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/login' | '/posts' | '/posts/$id' | '/posts/$id/edit'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/login' | '/posts' | '/posts/$id' | '/posts/$id/edit'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/login'
    | '/_auth/posts'
    | '/_auth/posts/$id'
    | '/_auth/posts/$id/edit'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/login"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/posts"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_auth/posts": {
      "filePath": "_auth.posts.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/posts/$id"
      ]
    },
    "/_auth/posts/$id": {
      "filePath": "_auth.posts.$id.tsx",
      "parent": "/_auth/posts",
      "children": [
        "/_auth/posts/$id/edit"
      ]
    },
    "/_auth/posts/$id/edit": {
      "filePath": "_auth.posts.$id.edit.tsx",
      "parent": "/_auth/posts/$id"
    }
  }
}
ROUTE_MANIFEST_END */
