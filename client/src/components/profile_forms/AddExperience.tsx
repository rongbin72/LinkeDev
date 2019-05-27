import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import {
  ExpInput,
  AddExperience as TAddExperience,
  MyProfile
} from '../../graphql/types'
import { History } from 'history'
import { ADD_EXPERIENCE, MY_PROFILE } from '../../graphql/gql/profile'
import { useApolloClient } from 'react-apollo-hooks'
import showAlert from '../../utils/showAlert'
import { toast } from 'react-toastify'

const AddExperience: React.FC<{ history: History<any> }> = ({ history }) => {
  const [exp, setExp] = useState<ExpInput>({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })

  const [toDateDisabled, toggleDisabled] = useState<boolean>(false)
  const client = useApolloClient()

  const { company, title, location, from, to, current, description } = exp

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => setExp({ ...exp, [e.target.name]: e.target.value })
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await client.mutate<TAddExperience>({
        mutation: ADD_EXPERIENCE,
        variables: { exp },
        errorPolicy: 'all',
        update: proxy => {
          const prevData = proxy.readQuery<MyProfile>({
            query: MY_PROFILE
          })
          if (prevData && prevData.myProfile) {
            proxy.writeQuery<MyProfile>({
              query: MY_PROFILE,
              data: {
                myProfile: {
                  ...prevData.myProfile,
                  experience: [
                    {
                      __typename: 'Experience',
                      _id: 'id',
                      company: company!,
                      title: title!,
                      from: from!,
                      to: to!,
                      current: current!,
                      description: description!
                    },
                    ...prevData.myProfile.experience
                  ]
                }
              }
            })
          }
        }
      })
      if (res.errors) {
        const error = res.errors[0]
        error.extensions.exception.details.forEach((err: any) =>
          showAlert(err.msg, toast.TYPE.ERROR)
        )
      } else {
        history.push('/dashboard')
        showAlert('Profile Updated', toast.TYPE.SUCCESS)
      }
    } catch (error) {
      showAlert('Something went wrong, try reload the page', toast.TYPE.ERROR)
      console.error(error)
    }
  }

  return (
    <>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any developer/programming
        positions that you have had in the past
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
            value={location!}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>* From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current!}
              value=''
              onChange={e => {
                setExp({ ...exp, current: !current })
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
            value={to!}
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
            value={description!}
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

export default withRouter(AddExperience)
