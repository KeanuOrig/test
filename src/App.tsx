import DelayForm from '@components/DelayForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ToastContainer position="top-center" autoClose={5000}/>
      <DelayForm />
    </div>
  );
}

export default App;
