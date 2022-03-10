import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/home" element={ <h1>teste</h1> }/>

            <Route path="*" element={ <Navigate to="/login"/> } />
        </Routes>
    );
}