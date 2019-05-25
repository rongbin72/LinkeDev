import React from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import Moment from 'react-moment'
import { toast } from 'react-toastify'
import { DELETE_EXPERIENCE, MY_PROFILE } from '../../graphql/gql/profile'
import {
  DeleteExperience,
  DeleteExperienceVariables,
  MyProfile,
  MyProfile_myProfile_experience
} from '../../graphql/types'
import showAlert from '../../utils/showAlert'

interface ExperienceProps {
  experience: MyProfile_myProfile_experience[]
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const client = useApolloClient()

  /**
   * Optimistic deletion
   * UI will update (row deletion) immediately after button clicked
   *
   * @param id Experience id to be deleted
   */
  const deleteExperience = async (id: string) => {
    try {
      await client.mutate<DeleteExperience, DeleteExperienceVariables>({
        mutation: DELETE_EXPERIENCE,
        variables: {
          id
        },
        update: proxy => {
          const data = proxy.readQuery<MyProfile>({ query: MY_PROFILE })
          if (data && data.myProfile) {
            data.myProfile.experience = data.myProfile.experience.filter(
              exp => exp._id !== id
            )
            proxy.writeQuery({ query: MY_PROFILE, data })
          }
        }
      })
      showAlert('Experience Deleted', toast.TYPE.SUCCESS)
    } catch (error) {
      showAlert('Something went wrong', toast.TYPE.ERROR)
      console.error(error)
    }
  }

  const experiences = !experience ? (
    <></>
  ) : (
    experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className='hide-sm'>{exp.title}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
          {exp.to ? <Moment format='YYYY/MM/DD'>{exp.to}</Moment> : 'Now'}
        </td>
        <td>
          <button
            className='btn btn-danger'
            onClick={() => deleteExperience(exp._id)}>
            Delete
          </button>
        </td>
      </tr>
    ))
  )

  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  )
}

export default Experience
