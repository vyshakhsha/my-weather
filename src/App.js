
import './App.css';
import Weather from './Components/Weather.jsx';
import { Helmet } from 'react-helmet';
import favicon from './Assets/favicon.ico';

function App() {
  return (
    <div className="App">
       <Helmet>
        <link rel="icon" type="image/png" href={favicon} />
      </Helmet>
      <Weather />
    </div>
  );
}

export default App;
