import "./App.css";
import Routes from "./routes/Routes/Routes";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
