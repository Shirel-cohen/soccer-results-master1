
import '../css/App.css';
import {BrowserRouter,NavLink,Route, Routes} from "react-router-dom"

import LeagueTable from "./LeagueTable";
import LeagueTableLive from "./LeagueTableLive";
import Login from "./Login";
import LoginHooks from "./LoginHooks";
import '../others/index.css';
import LiveMatches from "./LiveMatches";
//import LiveMatches from "./LiveMatches";

function App() {
    const links=[
        // {to:"/", text:"home page"},
        {to:"LiveResults", text:"  LIVE MATCHES"},
        {to:"LeagueTable", text:"LEAGUE TABLE"},
        {to:"LeagueTableLive", text:"LEAGUE LIVE "},
        {to:"Login", text:"LOG-IN"},
    ]

    // const activeMenuClass=({isActive})=>(isActive ? "active-menu" : "non-active-menu");

    return (

        <div className="App">
            <BrowserRouter>
                <ul>
                    {
                        links.map((link)=>{
                            return(
                                <button className={"Buttons"}>
                                    <NavLink to={link.to}>
                                        {link.text}
                                    </NavLink>
                                </button>
                            )
                        })
                    }
                </ul>

                <Routes>
                    <Route path={"/Login"} element ={<Login/>}/>
                    <Route path={"/LiveResults"} element ={<LiveMatches/>}/>
                    <Route path={"/LeagueTableLive"} element = {<LeagueTableLive/>}/>
                    <Route path={"/LeagueTable"}  element={<LeagueTable/>}/>

                </Routes>
            </BrowserRouter>


        </div>
    );
}

export default App;