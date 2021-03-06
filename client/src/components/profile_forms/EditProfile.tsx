import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { EditProfileProps, ProfileForm, StoreState } from '../../../common/types'
import { createProfile, getCurrentProfile } from '../../actions/profile'

const EditProfile: React.FC<EditProfileProps> = ({
  profile,
  loading,
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState<ProfileForm>({
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

  useEffect(() => {
    getCurrentProfile()
    if (profile)
      setFormData({
        company: loading || !profile.company ? '' : profile.company,
        website: loading || !profile.website ? '' : profile.website,
        location: loading || !profile.location ? '' : profile.location,
        status: loading || !profile.status ? '' : profile.status,
        skills: loading || !profile.skills ? '' : profile.skills.join(','),
        githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
        bio: loading || !profile.bio ? '' : profile.bio,
        twitter: loading || !profile.social ? '' : profile.social.twitter!,
        facebook: loading || !profile.social ? '' : profile.social.facebook!,
        linkedin: loading || !profile.social ? '' : profile.social.linkedin!,
        youtube: loading || !profile.social ? '' : profile.social.youtube!,
        instagram: loading || !profile.social ? '' : profile.social.instagram!
      })
    else console.error('profile not exist')
  }, [loading, getCurrentProfile])

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
  } = formData

  const onChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createProfile(formData, history, true)
    // could keep editing, may keep state
    // clear state
    // setFormData({
    //   company: '',
    //   website: '',
    //   location: '',
    //   status: '',
    //   skills: '',
    //   githubusername: '',
    //   bio: '',
    //   twitter: '',
    //   facebook: '',
    //   linkedin: '',
    //   youtube: '',
    //   instagram: ''
    // })
  }

  return (
    <>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Let's get some information to make your profile stand out
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
          <small className='form-text'>Give us an idea of your current status</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Could be your company or school</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Could be your own or a company website</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
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
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
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
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
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

const mapStateToProps = (state: StoreState) => ({
  profile: state.profile!.profile,
  loading: state.profile!.loading
})

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile))
