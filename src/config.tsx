const config = {
  snackbar: {
    maxSnack: 3,
  },
  api: {
    platform: 'backoffice',
    baseUrl: import.meta.env.VITE_API_URL,
    msProcesses: {
      baseUrl: import.meta.env.VITE_MS_PROCESSES_API_URL,
    },
    msAuth: {
      baseUrl: import.meta.env.VITE_MS_AUTH_API_URL,
    },
    msProjects: {
      baseUrl: import.meta.env.VITE_MS_PROJECTS_API_URL,
    },
    msOrganization: {
      baseUrl: import.meta.env.VITE_MS_ORGANIZATION_API_URL,
    },
    msSurveys: {
      baseUrl: import.meta.env.VITE_MS_SURVEYS_API_URL,
    },
  },
}

export default config
