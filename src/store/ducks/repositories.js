import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { markActionsOffline } from 'redux-offline-queue'

// TYPES && ACTION CREATORS

const { Types, Creators } = createActions({
  addRepositoryRequest: ['repositoryName'],
  addRepositorySuccess: ['repository'],
  addRepositoryError: ['error']
})

markActionsOffline(Creators, ['addRepositoryRequest'])

export const RepositoriesTypes = Types
export default Creators

// INITIAL STATE

export const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  errorData: []
}

// REDUCERS

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.ADD_REPOSITORY_REQUEST]: state => state.merge({ loading: true }),
  // [Types.ADD_REPOSITORY_SUCCESS]: (state, { repository }) =>
  // state.update('data', data => [...data, repository])
  [Types.ADD_REPOSITORY_REQUEST]: state => ({ ...state, loading: true }),
  [Types.ADD_REPOSITORY_SUCCESS]: (state, { repository }) => ({ ...state, data: [...state.data, repository] }),
  [Types.ADD_REPOSITORY_ERROR]: (state, { error }) => ({ ...state, error: true, errorData: [...state.errorData, error] })
})