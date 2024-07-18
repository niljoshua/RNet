import { Navbar } from "./components/Nav/Navbar"
import { UsuarioProvider } from "./Providers/dataProviders"
import { UtilsProvider } from "./Providers/utilsProvider"
import { RoutesMain } from "./routes/routes"


function App() {

  return (
    <>
    <UsuarioProvider>
      <UtilsProvider>
        <Navbar />
        <RoutesMain />
      </UtilsProvider>
    </UsuarioProvider>
    </>
  )
}

export default App
