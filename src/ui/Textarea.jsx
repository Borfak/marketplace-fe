import React, { memo } from 'react'
import cx from 'clsx'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import Beta from 'ui/Beta'

const Textarea = ({
  label, hint, placeholder, type, id, name, className, onChange, error, value, disabled, isBeta,
}) => {
  const identifier = id || name || type
  const isError = !_isEmpty(error)

  return (
    <div className={className}>
      {label && (
        <label htmlFor={identifier} className='flex text-sm font-medium text-gray-700 dark:text-gray-200'>
          {label}
          {isBeta && (
            <div className='ml-5'>
              <Beta />
            </div>
          )}
        </label>
      )}
      <div className='mt-1 relative'>
        <textarea
          rows={4}
          name={identifier}
          id={identifier}
          className={cx('block w-full rounded-md shadow-sm border-gray-300 dark:text-gray-50 dark:placeholder-gray-400 dark:border-gray-800 dark:bg-gray-700 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm', {
            'border-red-300 text-red-900 placeholder-red-300': isError,
          })}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        {isError && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden />
          </div>
        )}
      </div>
      <p className='mt-2 text-sm text-gray-500 dark:text-gray-300 whitespace-pre-line' id={`${identifier}-optional`}>{hint}</p>
      {isError && (
        <p className='mt-2 text-sm text-red-600 dark:text-red-500' id='email-error'>{error}</p>
      )}
    </div>
  )
}

Textarea.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]).isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool,
  ]),
  name: PropTypes.string,
  disabled: PropTypes.bool,
  isBeta: PropTypes.bool,
}

Textarea.defaultProps = {
  label: '',
  hint: '',
  placeholder: '',
  onChange: () => { },
  id: '',
  type: '',
  className: '',
  error: null,
  name: '',
  disabled: false,
  isBeta: false,
}

export default memo(Textarea)
