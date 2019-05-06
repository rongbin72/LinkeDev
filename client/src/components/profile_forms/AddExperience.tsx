import React, { useState } from 'react'
import { connect } from 'react-redux'
import { AddExperienceProps, Experience } from '../../../common/types'
import { addExperience } from '../../actions/profile'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const AddExperience: React.FC<AddExperienceProps> = ({ addExperience, history }) => {
  const [formData, setFormData] = useState<Experience>({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })

  const [toDateDisabled, toggleDisabled] = useState<boolean>(false)
  const { company, title, location, from, to, current, description } = formData

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addExperience(formData, history)
  }

  return (
    <>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any developer/programming positions that you have
        had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>* From Date</h4>
          <input type='date' name='from' value={from} onChange={e => onChange(e)} />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value=''
              onChange={e => {
                setFormData({ ...formData, current: !current })
                toggleDisabled(!toDateDisabled)
              }}
            />{' '}
            Current Job ?
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={e => onChange(e)}
            disabled={toDateDisabled}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols={30}
            rows={5}
            placeholder='Job Description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  )
}

export default connect(
  null,
  { addExperience }
)(withRouter(AddExperience))
