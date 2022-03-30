import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Account } from '../pages/Account';
import { Home } from '../pages/Home';
import { Squads } from '../pages/Squads';
import { Login } from '../pages/Login';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/" element={ <PrivateRoute /> }>
                <Route path="/" element={ <Home /> } />
                <Route path="/boards" element={ <Link to="/">boards</Link> }/>
                <Route path="/squad" element={ <Squads /> }/>
                <Route path="/reports" element={ <Link to="/">reports</Link> }/>
                <Route path="/account" element={ <Account /> }/>
            </Route>

            <Route path="*" element={ <Navigate to="/"/> } />
        </Routes>
    );
}