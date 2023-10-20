import { FormInput, SubmitBtn } from '../components'
import { Link, Form, redirect, useNavigate } from 'react-router-dom'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { loginUser } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    return await customFetch
      .post('/auth/local', data)
      .then((response) => {
        store.dispatch(loginUser(response.data))
        toast.success('logged in successfully')
        return redirect('/')
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.error?.message ||
          'please double check your credentials'

        toast.error(errorMessage)
        return null
      })
  }

function Login() {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  async function loginAsGuestUser() {
    return await customFetch
      .post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      })
      .then((response) => {
        dispatch(loginUser(response.data))
        toast.success('welcome guest user')
        return navigation('/')
      })
      .catch(() => {
        toast.error('guest user login error.please try later.')
      })
  }
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          className="button"
          type="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?{' '}
          <span>
            <Link
              to="/register"
              className="ml-2 link link-hover link-primary capitalize"
            >
              Register now!
            </Link>
          </span>
        </p>
      </Form>
    </section>
  )
}

export default Login
