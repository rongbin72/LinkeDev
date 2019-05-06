import React from 'react'
import Moment from 'react-moment'
import { ExperienceProps } from '../../../common/types'
import { deleteExperience } from '../../actions/profile'
import { connect } from 'react-redux'

const Experience: React.FC<ExperienceProps> = ({ experience, deleteExperience }) => {
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
          <button className='btn btn-danger' onClick={() => deleteExperience(exp._id!)}>
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

export default connect(
  null,
  { deleteExperience }
)(Experience)
