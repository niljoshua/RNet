import { Navbar } from "./components/Nav/Navbar"
import { AdminProvider } from "./Providers/adminProviders"
import { CotasProvider } from "./Providers/cotasProviders"
import { UsuarioProvider } from "./Providers/dataProviders"
import { UtilsProvider } from "./Providers/utilsProvider"
import { RoutesMain } from "./routes/routes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
    <AdminProvider>
    <UsuarioProvider>
      <UtilsProvider>
      <CotasProvider>
          <Navbar />
          <RoutesMain />
          <ToastContainer
                position="top-right"
                autoClose={1300}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition: Bounce
                />
        </CotasProvider>
      </UtilsProvider>
    </UsuarioProvider>
    </AdminProvider>
    </>
  )
}

export default App
