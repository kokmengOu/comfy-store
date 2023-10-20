import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function NavLinks({ links }) {
  const { user } = useSelector((state) => state.userState)
  return (
    <>
      {links.map((link) => {
        // const {} = link === '/' ? true : false // TODO: Implement real logic for active state
        const { id, url, text } = link
        if ((url === 'checkout' || url === 'orders') && !user) return null
        return (
          <li key={id}>
            {
              <NavLink to={url} className="capitalize">
                {text}
              </NavLink>
            }
          </li>
        )
      })}
    </>
  )
}

NavLinks.propTypes = {
  links: PropTypes.array.isRequired,
}

export default NavLinks
