import "./App.css";
import RoutesApp from "./components/Routes/RoutesApp";
import DoesntExist from "./components/DoestExist";
import { Switch, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/error" component={DoesntExist} />
        <Route component={RoutesApp} />
      </Switch>
    </div>
  );
}

export default App;
