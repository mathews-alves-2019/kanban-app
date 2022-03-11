import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/" element={ <PrivateRoute /> }>
                <Route path="/" element={ <Home /> } />
                <Route path="/teste" element={ <Link to="/">home</Link> }/>
            </Route>

            <Route path="*" element={ <Navigate to="/login"/> } />
        </Routes>
    );
}