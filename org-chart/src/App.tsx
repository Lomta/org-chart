import './App.css';
import {Chart} from './components/Chart';
import { AvatarProvider } from './contexts/AvatarContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>THE AVATARS AND THEIR FRIENDS</h1>
        <AvatarProvider>
          <Chart/>
        </AvatarProvider>
      </header>
    </div>
  );
}

export default App;
