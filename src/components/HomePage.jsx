import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {Outlet} from "react-router-dom";

export default function HomePage(){
    return(
        <div className="flex flex-col min-h-screen">
        <Header className="p-4 bg-gray-800 text-white">
            {/* Header Content */}
        </Header>
        
       <Outlet className="flex-grow p-4">
            {/* Main content goes here */}
        </Outlet>

      <Footer/>
    </div>
    )
}