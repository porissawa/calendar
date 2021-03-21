import Modal from 'react-modal'

import CalendarView from './pages/Calendar'

function App() {
  Modal.setAppElement(document.getElementById('root'));
  return (
    <CalendarView />
  );
}

export default App;
