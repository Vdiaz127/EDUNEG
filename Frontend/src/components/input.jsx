/*-------------------------------------------------------------------
|  🐼 React FC Input
|
|  🦝 Todo: CREATE RE-USEABLE INPUT COMPOENT
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/

import { findInputError } from '../utils/findInputError'
import { isFormInvalid } from '../utils/isFormInvalid'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
///

export const Input = ({label, type, id, placeholder}) => {
  const { register, formState: {errors} } = useFormContext()

  const isInvalid = isFormInvalid(inputError)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex text-left">
        <label htmlFor={id} className=" capitalize">
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
        </AnimatePresence>
      </div>
      <input 
        id={id}
        type={type}
        className="w-full p-2 border rounded-lg"
        placeholder={placeholder}
        {...register(label, {
          required: "El campo es obligatorio.",
          validate: (value) => {
            if (id=="telefono" && !/^\d{3}-\d{6}$/.test(value)) {
              return "El formato debe ser 444-223123.";
            }
            return true;
          },
        })}
      />
    </div>
  )
}

const InputError = ({message}) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  )
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}


export const Select = ({label,id,items}) => {
  const { register, formState: {errors} } = useFormContext()

  const inputError = findInputError(errors, label)
  const isInvalid = isFormInvalid(inputError)

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex text-left">
        <label htmlFor={id} className=" capitalize" >
          {label}
        </label>
      </div>
      
      <select id={id} className="w-full p-2 border rounded-lg" name="label" 
        {...register(label, {
          required: {
            value: true,
            message: 'requerido',
          },
        })}
      >
        {items.map((item) => {
          return(
            <option className="block px-4 py-2 text-sm text-gray-700" value={item.value}>{item.desc}</option>
          );
        })}
        
      </select>
      
    </div>
  )
}
