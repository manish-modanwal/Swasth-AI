import React from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'

const TopDoctors = () => {


    const navigate = useNavigate();

    const { doctors } = React.useContext(AppContext);
  return (
    <div className="flex flex-col items-center gap-6 py-16 px-4 sm:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 text-center">Top Doctors to Book</h1>
      <p className="text-center text-gray-600 sm:w-1/2 text-sm sm:text-base">
        Discover highly-rated professionals across various specialties. Book trusted doctors near you now.
      </p>

      <div className="grid gap-8 pt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={()=> navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-2xl bg-blue-100"
            />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-green-600 font-medium">Available</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className="mt-10 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 animate-glow">
        View More Doctors
      </button>
    </div>
  )
}

export default TopDoctors
