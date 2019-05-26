import React, { useState } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { UPDATE_PROFILE, MY_PROFILE } from '../../graphql/gql/profile'
import {
  ProfileInput,
  UpdateProfile,
  UpdateProfileVariables,
  MyProfile
} from '../../graphql/types'
import { History } from 'history'
import showAlert from '../../utils/showAlert'
import { toast } from 'react-toastify'

const CreateProfile: React.FC<{ history: History<any> }> = ({ history }) => {
  const [profile, setProfile] = useState<ProfileInput>({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  })

  const [dispaySocialInputs, toggleSocialInputs] = useState<boolean>(false)

  const client = useApolloClient()

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = profile

  const onChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => setProfile({ ...profile, [e.target.name]: e.target.value })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await client.mutate<UpdateProfile, UpdateProfileVariables>({
        mutation: UPDATE_PROFILE,
        variables: { profile },
        errorPolicy: 'all',
        update: proxy => {
          proxy.writeQuery<MyProfile>({
            query: MY_PROFILE,
            data: {
              myProfile: {
                __typename: 'Profile',
                status: '',
                skills: [],
                company: null,
                location: null,
                website: null,
                bio: null,
                githubusername: null,
                social: null,
                experience: [],
                education: []
              }
            }
          })
        }
      })

      if (res.errors) {
        const error = res.errors[0]
        error.extensions.exception.details.forEach((err: any) =>
          showAlert(err.msg, toast.TYPE.ERROR)
        )
      } else {
        history.push('/dashboard')
        showAlert('Profile Created', toast.TYPE.SUCCESS)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={e => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Data Scientist'>Data Scientist</option>
            <option value='Student'>Student</option>
            <option value='Instructor'>Instructor</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of your current status
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company or School'
            name='company'
            value={company!}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Could be your company or school</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website!}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location!}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>City & state (eg. Buffalo, NY)</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. Typescript, React, NodeJS)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername!}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio!}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!dispaySocialInputs)}
            type='button'
            className='btn btn-light'>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {dispaySocialInputs && (
          <>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter!}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook!}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube!}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin!}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram!}
                onChange={e => onChange(e)}
              />
            </div>
          </>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  )
}

export default withRouter(CreateProfile)
