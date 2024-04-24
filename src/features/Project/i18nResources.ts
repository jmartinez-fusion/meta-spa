import enJSON from 'Project/locale/en.json'
import ProcessSelectionEnJSON from 'Project/features/ProcessSelection/locale/en.json'
import SprintsEnJSON from 'Project/features/Sprints/locale/en.json'
import RespondingSurveyEnJSON from 'Project/features/RespondingSurvey/locale/en.json'
import ClientUsersEnJSON from 'Project/features/ClientUsers/locale/en.json'

import SurveysEnJSON from 'Project/features/Surveys/locale/en.json'
import AnswersEnJSON from 'Project/features/Answers/locale/en.json'

import { i18nResources as i18nStructureResources } from 'Project/features/Structure/i18nResources'

export const i18nResources = {
  Project: enJSON,
  ProcessSelection: ProcessSelectionEnJSON,
  Sprints: SprintsEnJSON,
  RespondingSurvey: RespondingSurveyEnJSON,
  ClientUsers: ClientUsersEnJSON,
  Surveys: SurveysEnJSON,
  Answers: AnswersEnJSON,
  ...i18nStructureResources,
}
