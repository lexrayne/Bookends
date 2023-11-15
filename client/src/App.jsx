import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/CreateBooks'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import ShowBook from './pages/ShowBook'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import Unauthorized from './pages/Unauthorized'
import AccountRecovery from './pages/AccountRecovery'
import Layout from './components/Layout'
import Missing from './components/Missing'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'

const ROLES = {
  'Admin': 6401,
  'Editor': 8170,
  'User': 3509,
  'Banned': 4444
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/users/account-recovery' element={<AccountRecovery />} />
          <Route path='/books/details/:bookID' element={<ShowBook />} />

          {/* protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} /> }>
            </Route>
            
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path='/admin' element={<Admin />} />
              <Route path='/books/create' element={<CreateBook />} />
              <Route path='/books/edit/:bookID' element={<EditBook />} />
              <Route path='/books/delete/:bookID' element={<DeleteBook />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </>
  )
}

export default App