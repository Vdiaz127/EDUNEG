import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/login'; 



function App() {
  const [count, setCount] = useState(0)

  // return (
  //   <>
  //      <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<PaginaInicio />} />
  //       </Routes>
  //     </BrowserRouter> 
  //   </>
  // )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Login/>
    </div>
  );
}

export default App
