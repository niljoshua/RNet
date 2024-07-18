import { Navbar } from "./components/Nav/Navbar"
import { CotasProvider } from "./Providers/cotasProviders"
import { UsuarioProvider } from "./Providers/dataProviders"
import { UtilsProvider } from "./Providers/utilsProvider"
import { RoutesMain } from "./routes/routes"


function App() {

  return (
    <>
    <UsuarioProvider>
      <UtilsProvider>
      <CotasProvider>
          <Navbar />
          <RoutesMain />
        </CotasProvider>
      </UtilsProvider>
    </UsuarioProvider>
    </>
  )
}

export default App
