import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GITHUB_REPOS } from '../../graphql/gql/profile'
import { GithubRepos, GithubReposVariables } from '../../graphql/types'
import Loading from '../layout/Loading'

const ProfileGithub: React.FC<{ userName: string }> = ({ userName }) => {
  const { loading, error, data } = useQuery<GithubRepos, GithubReposVariables>(
    GITHUB_REPOS,
    { variables: { userName } }
  )

  if (error) {
    console.error(error)
    return null
  }

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github Repos</h2>
      {loading || !data ? (
        <Loading />
      ) : (
        data.githubRepos.map(repo => (
          <div key={repo.id} className='repo card bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-light'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ProfileGithub
