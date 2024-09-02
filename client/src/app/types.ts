export type User = {
  email: string;
  fullName: string;
  profilePic: string;
  isBot: boolean;
  _id: string;
};

export type Chat = {
  _id: string;
  participants: User[]
};

export type Message = {
  _id: string
  chatId: string
  message: string
  sender: User,
  createdAt: string,
}



export type UserResponse = {
  message: string;
  user: User;
};

export type ChatResponse = {
  chat: Chat
  message: string
};



export interface LoginFormData {
  password: string;
  email: string;
}

export interface RegistrationFormData {
  fullName: string;
  password: string;
  email: string;
}

export interface EditMessageFormData {
  message: string;
}


export interface UpdateUserFormData {
  fullName: string,
  avatar?: File
}


