import { Link, useRouteError } from 'react-router-dom'

function Error() {
  const error = useRouteError()
  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">{error.status}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            page {error.statusText}
          </h1>
          <p className="mt-6 text-lg leading-7">
            Sorry, we couldn't find page you're looking for.
          </p>
          <div className="mt-10">
            <Link to="/" className="btn btn-secondary">
              Go back home
            </Link>
          </div>
        </div>
      </main>
    )
  }
  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <div>{error.status}</div>
      <div>{error.statusText}</div>
      <h4 className="text-center font-bold text-4xl"> There was an error...</h4>
    </main>
  )
}

export default Error
