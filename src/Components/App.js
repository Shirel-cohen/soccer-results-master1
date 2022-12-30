
import '../css/App.css';
import {BrowserRouter,NavLink,Route, Routes} from "react-router-dom"
import LeagueTable from "./LeagueTable";
import LeagueTableLive from "./LeagueTableLive";
import '../others/index.css';
import LoginHooks from "./LoginHooks";
import LiveMatchHooks from "./LiveMatchHooks";


function App() {
    const links=[

        {to:"LiveResults", text:"  LIVE MATCHES"},
        {to:"LeagueTable", text:"LEAGUE TABLE"},
        {to:"LeagueTableLive", text:"LEAGUE LIVE "},
        {to:"/", text:"LOG-IN"},
    ]


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
                    <Route exact path={"/"} element ={<LoginHooks/>}/>
                    <Route path={"/LiveResults"} element ={<LiveMatchHooks/>}/>
                    <Route path={"/LeagueTableLive"} element = {<LeagueTableLive/>}/>
                    <Route path={"/LeagueTable"}  element={<LeagueTable/>}/>

                </Routes>
            </BrowserRouter>


        </div>
    );
}

export default App;