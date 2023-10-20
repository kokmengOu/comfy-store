import { useNavigation } from 'react-router-dom'
import PropTypes from 'prop-types'
function SubmitBtn({ text }) {
  const { state } = useNavigation()
  const isSubmitting = state === 'isSubmitting'
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner">sending...</span>
      ) : (
        text || 'submit'
      )}
    </button>
  )
}

SubmitBtn.propTypes = {
  text: PropTypes.string,
}

export default SubmitBtn
