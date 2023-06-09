import React from 'react'

const Index = React.lazy(() => import('./pages/index'))
const Cnn = React.lazy(() => import('./pages/cnn/index'))

export const PUBLIC_ROUTES = [
    {
        path: "/*",
        exact: true,
        component: Index,
    },
    {
        path: "/cnn",
        exact: true,
        component: Cnn,
    },
]