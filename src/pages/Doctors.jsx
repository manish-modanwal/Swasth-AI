import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const applyFilter = () => {
      if (speciality && doctors.length > 0) {
        const filtered = doctors.filter(
          (item) => item.speciality.toLowerCase() === speciality.toLowerCase()
        );
        setFilterDoc(filtered);
      } else {
        setFilterDoc(doctors);
      }
    };
    applyFilter();
  }, [speciality, doctors]);

  return (
    <div className="p-6">
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
       <div className='flex flex-col gap-4 text-sm text-gray-600'>
        <p onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-400 rounded transition-all cursor-pointer ${speciality==="General Physician" ?"bg-indigo-100 text-black":""} `}>General Physician</p>
        <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-400 rounded transition-all cursor-pointer ${speciality==="Gynecologist" ?"bg-indigo-100 text-black":""}`}>Gynecologist</p>
        <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-400 rounded transition-all cursor-pointer ${speciality==="Dermatologist" ?"bg-indigo-100 text-black":""}`}>Dermatologist</p>
        <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-400 rounded transition-all cursor-pointer ${speciality==="Pediatricians" ?"bg-indigo-100 text-black":""}`}>Pediatricians</p> 
        <p onClick={() => speciality === 'Neurologists' ? navigate('/doctors') : navigate('/doctors/Neurologists')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-400 rounded transition-all cursor-pointer ${speciality==="Neurologists" ?"bg-indigo-100 text-black":""}`}>Neurologists</p>
        <p onClick={() => speciality === 'Gastroenterologists' ? navigate('/doctors') : navigate('/doctors/Gastroenterologists')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-400 rounded transition-all cursor-pointer ${speciality==="Gastroenterologists" ?"bg-indigo-100 text-black":""}`}>Gastroenterologists</p>
       </div>

      <div className="w-full flex justify-start flex-wrap gap-6 ">
        {filterDoc.length === 0 ? (
          <p className="text-sm text-gray-500">No doctors found.</p>
        ) : (
          filterDoc.map((item) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={item._id}
              className="w-52 h-92 cursor-pointer bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2"
            >
              <img
                src={item.image || '/default-doctor.png'}
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
          ))
        )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
