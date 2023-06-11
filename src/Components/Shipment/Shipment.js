import React from 'react'
import { useForm } from 'react-hook-form';
import './shipment.css'
const Shipment = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className='shipment-form' onSubmit={handleSubmit(onSubmit)}>
    
      <input {...register("name", { required: true })} placeholder='Enter Your Name' />
      {errors.name && <span className='error'>This name is required</span>}

      
      <input {...register("email", { required: true })} placeholder='Enter Your Email' />
      {errors.email && <span className='error'>This email is required</span>}

      
      <input {...register("phone", { required: true })} placeholder='Enter Your phone' />
      {errors.phone && <span className='error'>This phone is required</span>}

      
      <input {...register("address", { required: true })} placeholder='Enter Your Address' />
      {errors.address && <span className='error'>This address is required</span>}
      
      <input type="submit" />
    </form>
  );
}

export default Shipment