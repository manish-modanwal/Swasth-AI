import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-6 py-20 text-gray-800'>
        <h1 className='text-4xl font-bold text-blue-900'>Find by Speciality</h1>
        <p className='sm:w-1/3 text-center font-medium text-md'>
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle free
        </p> 

        <div className='flex sm:justify-center gap-6 pt-8 w-full overflow-scroll'>
            {specialityData.map((item ,index) => (
                <Link 
                  onClick={() => { scrollTo(0, 0) }} 
                  className='flex flex-col items-center text-sm cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-500'
                  key={index}
                  to={`/doctors/${item.speciality}`}
                >
                    <img className='w-24 sm:w-28 mb-3' src={item.image} alt={item.speciality} />
                    <p className='text-lg font-semibold'>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu
