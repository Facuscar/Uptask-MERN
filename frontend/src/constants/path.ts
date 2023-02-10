type Path = {
    LOGIN: string,
    REGISTER: string,
    FORGOT_PASSWORD: string,
    CONFIRM_ACCOUNT: string,
    PROJECTS: string,
    CREATE_PROJECT: string,
    EDIT_PROJECT: string,
    NEW_COLLABORATOR: string,
};

export const PATH: Path = {
    LOGIN: '/',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    CONFIRM_ACCOUNT: '/confirm-account',
    PROJECTS: '/projects',
    CREATE_PROJECT: '/projects/create-project',
    EDIT_PROJECT: '/projects/edit-project',
    NEW_COLLABORATOR: '/projects/new-contributor',
};