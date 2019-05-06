import React from 'react'
import Moment from 'react-moment'
import { EducationProps } from '../../../common/types'
import { connect } from 'react-redux'
import { deleteEducation } from '../../actions/profile'

const Education: React.FC<EducationProps> = ({ education, deleteEducation }) => {
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
          <button className='btn btn-danger' onClick={() => deleteEducation(edu._id!)}>
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

export default connect(
  null,
  { deleteEducation }
)(Education)
