import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from './react-router';

import Page1 from './pages/page1';
import Page2 from './pages/page2';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/react">
        <Route path="/page1/:id" component={Page1}></Route>
        <Route path="/page2/:id" component={Page2}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
