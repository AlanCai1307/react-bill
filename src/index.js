import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './theme.css'
import { RouterProvider} from 'react-router-dom'
import router from './router'
import sum from '@/test'
const total = sum(1, 3)

console.log(total)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);