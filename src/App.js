import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  let[city,setCity]=useState('');
  let[wdetails,setWdetails] = useState();
  let[isLoading,setIsloading] = useState(false);

  let getData = (event)=>{

    setIsloading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=223b4c3024191f4f91f75ade8d049e0c&units=metric`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      if(finalRes.cod=="404"){
        setWdetails(undefined)
      }else{
        setWdetails(finalRes)
      }
      setIsloading(false)
     
    })
    event.preventDefault();
    setCity('');
  }
 
  return (
    <div className="App">
      <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
        <div className='max-w-[1320px] mx-auto'>
          <h1 className='text-[40px] font-bold py-[50px] text-white'> Simple wether App</h1>

          <form onSubmit={getData}>
            <input type='text' value={city}  onChange={(e)=>setCity(e.target.value)} className='w-[300px] h-[40px] pl-3' placeholder='City Name' /><button className='bg-[#1d4a6b] text-white font-bold p-[10px_20px]'>submit</button>
          </form>

          <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative '>

            <img src='https://loading.io/assets/img/p/articles/quality/clamp-threshold.gif' width={250} className={`absolute  ${isLoading ? '' : 'hidden'}`}/>

            {wdetails !==undefined ?
            <>
            <h3 className='font-bold text-[30px]'>{wdetails.name} <span className='bg-[yellow]'>{wdetails.sys.country}</span></h3>
            <h2 className='font-bold text-[40px]'> {wdetails.main.temp}</h2>
            <img className='m-auto' src={`http://openweathermap.org/img/w/${wdetails.weather[0].icon}.png` } />
            <p>{wdetails.weather[0].description}</p>
            </>
            :
            "No Data Found"
          }
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
