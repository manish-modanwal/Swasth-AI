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
      }
    };
    applyFilter();
  }, [speciality, doctors]);

  return (
    <div className="p-6">
      <p className="text-xl font-semibold mb-4">Browse through the doctors specialist.</p>
      
      <div className="flex gap-4 mb-6 flex-wrap text-blue-600 font-medium">
        <p>General Physician</p>
        <p>Gynecologist</p>
        <p>Dermatologist</p>
        <p>Pediatricians</p>
        <p>Neurologists</p>
        <p>Gastroenterologists</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filterDoc.map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="cursor-pointer bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2"
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
    </div>
  );
};

export default Doctors;
