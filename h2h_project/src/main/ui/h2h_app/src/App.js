import hrclogo from './hrclogo.svg';
import abclogo from './abclogo.svg';
import './App.css';
import TabContent from './components/TabContent';

const year = new Date().getFullYear();

function App() {
  return (
    <div className="App">
      <header>
      <img src={abclogo} className="abc-logo" alt="abclogo" />
      <img src={hrclogo} className="hrc-logo" alt="hrclogo" />
      <p className="text">Invoice List</p>
      </header>
      <div>
        <TabContent/>
      </div>
     <footer>{`Privacy Policy | © ${year} HighRadius Cooperation. All Rights Reserved`}</footer>
    </div>
  );
}

export default App;
