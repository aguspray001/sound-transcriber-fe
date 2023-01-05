import ICPens from "./assets/img/ic_pens.png";
import MainApp from "./pages";

function App() {
  return (
    <div className="flex flex-col">
      <div className="w-full h-20 bg-blue-600 shadow-lg z-50 fixed flex flex-row justify-between py-4 px-4 sm:px-20 sm:h-24">
        <figure>
          <img src={ICPens} height={60} width={60} alt="logo-pens"/>
        </figure>
        <p className='text-white font-semibold pt-4 sm:pt-3'>Hyundai Recording Apps</p>
      </div>
      <div className="pt-20">
        <MainApp />
      </div>
    </div>
  );
}

export default App;
