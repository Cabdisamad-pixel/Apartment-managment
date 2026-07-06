import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout/Layout";
import Resident from "./Pages/Resident";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div>Home</div>
      },
      {
        path: "/dashboard",
        element: <div>Dashboard</div>
      },
      {
        path :'Residents',
        element: <Resident/>
      },
      {
        path: "*",
        element: <div>Not Found</div>
      }
    ]
  }
])

const App = () => {




  return (
    <>
      <RouterProvider router={router} />
    </>
  )

}

export default App;