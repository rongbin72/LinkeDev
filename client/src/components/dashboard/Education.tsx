import React, { useState } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import Moment from 'react-moment'
import { toast } from 'react-toastify'
import { DELETE_EDUCATION, MY_PROFILE } from '../../graphql/gql/profile'
import { MyProfile, MyProfile_myProfile_education } from '../../graphql/types'
import setAlert from '../../utils/showAlert'

interface EducationProps {
  education: MyProfile_myProfile_education[]
}

const Education: React.FC<EducationProps> = ({ education }) => {
  const client = useApolloClient()
  /**
   * Optimistic deletion
   * UI will update (row deletion) immediately after button clicked
   *
   * @param id Education id to be deleted
   */
  const deleteEducation = async (id: string) => {
    try {
      await client.mutate({
        mutation: DELETE_EDUCATION,
        variables: {
          id
        },
        update: proxy => {
          const data = proxy.readQuery<MyProfile>({ query: MY_PROFILE })
          if (data && data.myProfile) {
            data.myProfile.education = data.myProfile.education.filter(
              edu => edu._id !== id
            )
            proxy.writeQuery({ query: MY_PROFILE, data })
          }
        }
      })
      setAlert('Education Deleted', toast.TYPE.SUCCESS)
    } catch (error) {
      setAlert('Something went wrong', toast.TYPE.ERROR)
      console.error(error)
      window.location.reload()
    }
  }

  const educations = !education ? (
    <></>
  ) : (
    education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className='hide-sm'>{edu.degree}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
          {edu.to ? <Moment format='YYYY/MM/DD'>{edu.to}</Moment> : 'Now'}
        </td>
        <td>
          <button
            className='btn btn-danger'
            onClick={() => deleteEducation(edu._id)}>
            Delete
          </button>
        </td>
      </tr>
    ))
  )

  return (
    <>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  )
}

export default Education
