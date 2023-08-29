import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setDifficulty } from '../Store/authSlice'
const options = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]
const schema = yup.object().shape({
  difficulty: yup.string().required(`Category is required`),
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Password must be at least 2 characters long'),
})

function Level() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const state = useSelector((state) => {
    return state.reducer.auth
  })

  const dispatch = useDispatch(setDifficulty)
  const navigate = useNavigate()
  function startGame(data) {
    dispatch(setDifficulty({ difficulty: data.difficulty, name: data.name }))
    navigate(`/game/${state.userDetails.userId}`)
  }
  return (
    <div>
      <div className="w-full  flex justify-center mt-10">
        <div className="form-container w-full md:w-1/3 ">
          <h1 className="text-centercolor-yellow text-xl lg:text-4xl">
            Enter Details
          </h1>
          <div className="form mt-5 p-2">
            <div className="mb-3">
              <label>Enter Name</label>
              <br></br>
              <input
                type="name"
                placeholder="enter name"
                className="w-full mt-2 p-1  border border-yellow-600 "
                {...register('name')}
              ></input>
              <p className="text-red-700">
                {errors.name && errors.name.message}
              </p>
            </div>
            <div className="mb-3">
              <label>Choose Difficulty</label>
              <br></br>
              <select
                {...register('difficulty')}
                name="cars"
                id="cars"
                className="w-full p-1  border border-yellow-600"
                onChange={(e) =>
                  setValue('difficulty', e.target.value, {
                    shouldValidate: true,
                  })
                }
              >
                {options.map((option, index) => {
                  return (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  )
                })}
              </select>
              {errors.difficulty && (
                <p className="text-red-700">{errors.difficulty.message}</p>
              )}
            </div>
            <div className="mt-10">
              <button
                className="bg-[#4285F4] w-full text-black p-1 md:p-2"
                onClick={handleSubmit(startGame)}
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Level
