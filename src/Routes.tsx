import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'; 
import { NewUser } from './components/NewUser';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { UserTask } from './pages/UserTask';

export function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/NewUser' element={<NewUser />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/UserTask' element={<UserTask />} />
                <Route path='/UserTask/:id' element={<UserTask />} />
            </Routes>
        </Router>
    )
}