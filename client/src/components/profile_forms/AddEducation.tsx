import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { History } from 'history'
import {
  EduInput,
  AddEducation as TAddEducation,
  MyProfile
} from '../../graphql/types'
import { useApolloClient } from 'react-apollo-hooks'
import { ADD_EDUCATION, MY_PROFILE } from '../../graphql/gql/profile'
import showAlert from '../../utils/showAlert'
import { toast } from 'react-toastify'

const AddEducation: React.FC<{ history: History<any> }> = ({ history }) => {
  const [edu, setEdu] = useState<EduInput>({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })

  const [toDateDisabled, toggleDisabled] = useState(false)

  const client = useApolloClient()

  const { school, degree, fieldofstudy, from, to, current, description } = edu

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => setEdu({ ...edu, [e.target.name]: e.target.value })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await client.mutate<TAddEducation>({
        mutation: ADD_EDUCATION,
        variables: { edu },
        errorPolicy: 'all',
        update: proxy => {
          const prevData = proxy.readQuery<MyProfile>({ query: MY_PROFILE })
          if (prevData && prevData.myProfile) {
            proxy.writeQuery<MyProfile>({
              query: MY_PROFILE,
              data: {
                myProfile: {
                  ...prevData.myProfile,
                  education: [
                    {
                      __typename: 'Education',
                      _id: 'id',
                      school: school!,
                      degree: degree!,
                      from: from!,
                      to: to!,
                      current: current!,
                      description: description!
                    },
                    ...prevData.myProfile.education
                  ]
                }
              }
            })
          }
        }
      })
      if (res.errors) {
        const error = res.errors[0]
        error.extensions!.exception.details.forEach((err: any) =>
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
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any school or bootcamp that you
        have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={e => onChange(e)}
            required
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
              onChange={e => {
                setEdu({ ...edu, current: !current })
                toggleDisabled(!toDateDisabled)
              }}
            />{' '}
            Current School ?
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
            placeholder='Program Description'
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

export default withRouter(AddEducation)
