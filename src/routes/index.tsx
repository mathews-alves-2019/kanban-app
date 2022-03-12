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
                <Route path="/boards" element={ <Link to="/">boards</Link> }/>
                <Route path="/squad" element={ <Link to="/">squad</Link> }/>
                <Route path="/reports" element={ <Link to="/">reports</Link> }/>
            </Route>

            <Route path="*" element={ <Navigate to="/login"/> } />
        </Routes>
    );
}