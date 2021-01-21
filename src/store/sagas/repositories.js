import { call, put } from 'redux-saga/effects'
import { api } from '../../services/api'

import RepositoriesActions from '../ducks/repositories'

export function* addRepository({ repositoryName }) {
  try {
    const response = yield call(api.get, `repos/${repositoryName}`)

    yield put(RepositoriesActions.addRepositorySuccess(response.data))
  } catch(error) {
    yield put(RepositoriesActions.addRepositoryError(error.response))
  }
}