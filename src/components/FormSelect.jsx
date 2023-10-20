import PropTypes from 'prop-types'

function FormSelect({ label, name, list, defaultValue, size }) {
  return (
    <div>
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        defaultValue={defaultValue}
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}

FormSelect.propTypes = {
  label: PropTypes.any,
  name: PropTypes.any,
  list: PropTypes.any,
  defaultValue: PropTypes.any,
  size: PropTypes.any,
}

export default FormSelect
