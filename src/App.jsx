import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NoteContextProvider from "./Context/NoteContext";
import NotFound from "./components/NotFound/NotFound";

function App() {


  const routes = createHashRouter([{
    path: '', element:<ProtectedRoute>
        <Layout />
    </ProtectedRoute> , children: [
      {index: true, element: <Home />
    },
    ]
  },
  {path: '/login' , element: <Login/>},
  {path: '/register' , element: <Register/>},
  {path: '*' , element: <NotFound/>},
  ])

  return (
    <>
      <UserContextProvider>
        <NoteContextProvider>
          <RouterProvider router={routes}>
          </RouterProvider>
        </NoteContextProvider>
      </UserContextProvider>
    
    </>
  );
}

export default App;
