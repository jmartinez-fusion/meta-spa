export const CREATE_CLIENT = 'clients.create'
export const LIST_CLIENTS = 'clients.list'
export const LIST_INDUSTRIES = 'industries.list'
export const CREATE_PROJECT = 'projects.create'
export const DELETE_PROJECT = 'projects.delete'
export const LIST_PROJECTS = 'projects.list'
export const UPDATE_PROJECT = 'projects.update'
export const VIEW_PROJECT = 'projects.view'
export const CREATE_ROLES = 'roles.create'
export const DELETE_ROLES = 'roles.delete'
export const LIST_ROLES = 'roles.list'
export const UPDATE_ROLES = 'roles.update'
export const VIEW_ROLES = 'roles.view'
export const CREATE_FUTURE_PROCESS = 'future-processes.create'
export const FILL_FUTURE_PROCESS = 'future-processes.fill'
export const LIST_FUTURE_PROCESS = 'future-processes.list'
export const LIST_SELECTED_FUTURE_PROCESS = 'selected-future-processes.list'
export const VIEW_SELECTED_FUTURE_PROCESS = 'selected-future-processes.view'
export const CREATE_CURRENT_PROCESS = 'current-processes.create'
export const DELETE_CURRENT_PROCESS = 'current-processes.delete'
export const CLONE_CURRENT_PROCESS = 'current-processes.create'
export const UPDATE_CURRENT_PROCESS = 'current-processes.update'
export const VIEW_CURRENT_PROCESS = 'current-processes.view'
export const LIST_CURRENT_PROCESS = 'current-processes.list'
export const FILL_CURRENT_PROCESS_PRESENTATION = 'current-process-presentations.fill'
export const VIEW_CURRENT_PROCESS_PRESENTATION = 'current-process-presentations.view'
export const CHANGE_STATUS_CURRENT_PROCESS_PRESENTATION =
  'current-process-presentations.change-status'
export const RESET_CURRENT_PROCESS_PRESENTATION = 'future-process-presentations.reset'
export const FILL_FUTURE_PROCESS_PRESENTATION = 'future-process-presentations.fill'
export const VIEW_FUTURE_PROCESS_PRESENTATION = 'future-process-presentations.view'
export const CHANGE_STATUS_FUTURE_PROCESS_PRESENTATION =
  'future-process-presentations.change-status'
export const RESET_FUTURE_PROCESS_PRESENTATION = 'future-process-presentations.reset'
export const LIST_PERMISSIONS = 'permissions.list'
export const LIST_SPC = 'spc.list'
export const CREATE_USERS = 'meta-users.create'
export const DELETE_USERS = 'meta-users.delete'
export const LIST_USERS = 'meta-users.list'
export const STATUS_USERS = 'meta-users.status'
export const UPDATE_USERS = 'meta-users.update'
export const VIEW_USERS = 'meta-users.view'
export const LIST_DEPARTMENTS = 'departments.list'
export const VIEW_DEPARTMENT = 'departments.view'
export const UPLOAD_DEPARTMENTS = 'departments.upload'
export const LIST_POSITIONS = 'positions.list'
export const UPLOAD_POSITIONS = 'positions.upload'
export const LIST_SPRINTS = 'sprints.list'
export const UPDATE_SPRINTS = 'sprints.update'
export const VIEW_SPRINTS = 'sprints.view'
export const DELETE_SPRINTS = 'sprints.delete'
export const CREATE_SPRINTS = 'sprints.create'
export const LIST_PROCESS_MAPPINGS = 'process-mappings.list'
export const VIEW_PROCESS_MAPPINGS = 'process-mappings.view'
export const VIEW_INFLUENCERS = 'influencers.view'
export const UPLOAD_INFLUENCERS = 'influencers.upload'
export const UPLOAD_PROCESS_MAPPINGS = 'process-mappings.upload'
export const LIST_STAKEHOLDERS = 'stakeholders.list'
export const UPLOAD_STAKEHOLDERS = 'stakeholders.upload'
export const VIEW_STAKEHOLDERS = 'stakeholders.view'
export const CREATE_STAKEHOLDER_USER = 'stakeholders.activate-user'
export const CLIENT_USERS_DEFAULT = 'client-users.default'
export const LIST_TEXT_BLOCKS = 'text-blocks.list'
export const CREATE_TEXT_BLOCKS = 'text-blocks.create'
export const VIEW_TEXT_BLOCKS = 'text-blocks.view'
export const EDIT_TEXT_BLOCKS = 'text-blocks.view'
export const LIST_QUESTIONS_BANK = 'question-banks.list'
export const CLOSE_SURVEY = 'surveys.close'
export const CREATE_SURVEY = 'surveys.create'
export const DEADLINE_SURVEY = 'surveys.deadline-update'
export const GENERIC_UPDATE_SURVEY = 'surveys.generic-update'
export const LIST_SURVEYS = 'surveys.list'
export const PAUSE_SURVEY = 'surveys.pause'
export const CONTINUE_SURVEY = 'surveys.pause'
export const VIEW_SURVEY = 'surveys.view'
export const VIEW_PROJECT_CONFIGURATIONS = 'mail-settings.view'
export const EDIT_PROJECT_CONFIGURATIONS = 'mail-settings.set'

export const CLIENT_DEFAULT_PERMISSIONS = [
  LIST_INDUSTRIES,
  LIST_PROJECTS,
  VIEW_PROJECT,
  CREATE_FUTURE_PROCESS,
  FILL_FUTURE_PROCESS,
  LIST_FUTURE_PROCESS,
  LIST_SELECTED_FUTURE_PROCESS,
  VIEW_SELECTED_FUTURE_PROCESS,
  CREATE_CURRENT_PROCESS,
  DELETE_CURRENT_PROCESS,
  CLONE_CURRENT_PROCESS,
  UPDATE_CURRENT_PROCESS,
  VIEW_CURRENT_PROCESS,
  LIST_CURRENT_PROCESS,
  FILL_CURRENT_PROCESS_PRESENTATION,
  VIEW_CURRENT_PROCESS_PRESENTATION,
  CHANGE_STATUS_CURRENT_PROCESS_PRESENTATION,
  RESET_CURRENT_PROCESS_PRESENTATION,
  FILL_FUTURE_PROCESS_PRESENTATION,
  VIEW_FUTURE_PROCESS_PRESENTATION,
  CHANGE_STATUS_FUTURE_PROCESS_PRESENTATION,
  RESET_FUTURE_PROCESS_PRESENTATION,
  LIST_SPC,
  LIST_DEPARTMENTS,
  VIEW_DEPARTMENT,
  UPLOAD_DEPARTMENTS,
  LIST_POSITIONS,
  UPLOAD_POSITIONS,
  LIST_SPRINTS,
  UPDATE_SPRINTS,
  VIEW_SPRINTS,
  DELETE_SPRINTS,
  CREATE_SPRINTS,
  LIST_STAKEHOLDERS,
  UPLOAD_STAKEHOLDERS,
  VIEW_STAKEHOLDERS,
  CLIENT_USERS_DEFAULT,
]
