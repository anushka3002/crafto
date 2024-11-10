import CreateQuote from "../Components/CreateQuote"
import Homepage from "../Components/Homepage"
import Login from "../Components/Login"

const { Route, Routes } = require("react-router")

const Routers = () => {
    return <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Homepage" element={<Homepage />}></Route>
        <Route path="/CreateQuote" element={<CreateQuote />}></Route>
    </Routes>
}

export default Routers