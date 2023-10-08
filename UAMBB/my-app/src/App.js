import logo from './AlabamaLogo.svg';
import './App.css';
import './apiFunctions';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bamalytics
        </p>
        <p>
          <font size="1">
            Abbie sux
          </font>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;
