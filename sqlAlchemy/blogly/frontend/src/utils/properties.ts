type actionProperties = {
  [key: string]: {
    label: string;
    class: string;
    variant: string;
    style: string;
    message: string;
  }
}

export const actionProperties: actionProperties = {
  addPost: {
    label: 'Add Post',
    class: "my-0 py-0",
    variant: "light",
    style: "marginLeft: 'auto'",
    message: "You need to be logged in to add a Post"
  },
  editPost: {
    label: 'Edit Post',
    class: "my-0 py-0",
    variant: "light",
    style: "marginLeft: 'auto'",
    message: "You need to be logged in to edit a Post"
  },
  addProject: {
    label: 'Add Project',
    class: "my-0 py-0",
    variant: "light",
    style: "marginLeft: 'auto'",
    message: "You need to be logged in to add a Project"
  },
  deletePost: {
    label: 'Delete Post',
    class: "my-0 py-0",
    variant: "light",
    style: "marginLeft: 'auto'",
    message: "You need to be logged in to delete a Post"
  },
  deleteProject: {
    label: 'Delete Project',
    class: "my-0 py-0",
    variant: "light",
    style: "marginLeft: 'auto'",
    message: "You need to be logged in to delete a Project"
  }
}