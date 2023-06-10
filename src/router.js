import React from 'react'

const Index = React.lazy(() => import('./pages/index'))
const Cnn = React.lazy(() => import('./pages/cnn/index'))
const Patient = React.lazy(() => import('./pages/BenhNhan/index'))

export const PUBLIC_ROUTES = [
    {
        path: "/*",
        exact: true,
        component: Index,
    },
    {
        path: "/predict",
        exact: true,
        component: Cnn,
    },
    {
        path: "/patient",
        exact: true,
        component: Patient,
    },
]