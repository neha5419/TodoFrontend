import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./components/HomePage";
import DashBoard from "./pages/DashBoard";
import ForgetPass from "./pages/ForgetPass";

export default function App() {


  const isloggedin=false;

  const router=createBrowserRouter([
     {
      path:"/",
      element:<HomePage/>,
      children:[
        {
           index:true,
          element:<Home/>
        },
         {
          path:"/about",
          element:<About/>
         },{
         path:"/register",
         element:<Register/>
         },
         {
          path:"/login",
          element:<Login isloggedin={isloggedin}/>
         },{
          path:"/dashboard",
          element:<DashBoard/>
         },{
          path:"/forget",
          element:<ForgetPass/>
         }
      ]

     }
  ])
  return (
    <div>
    {/* <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1> */}
    <RouterProvider router={router}/>
    </div>
  )
}


