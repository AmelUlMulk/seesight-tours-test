import { gql } from '@apollo/client';

const CONTACT_REQUEST = gql`
  mutation CONTACT_REQUEST($name: String, $message: String, $email: String) {
    inserBoatnewContactMessages: insert_boatnew_contact_messages(
      objects: { name: $name, message: $message, email: $email }
    ) {
      returning {
        name
        email
        message
      }
    }
  }
`;
interface CONTACT_REQUEST_INTERFACE {
  inserBoatnewContactMessages: {
    returning: {
      name: string;
      email: string;
      message: string;
    };
  };
}
export default CONTACT_REQUEST;
export type { CONTACT_REQUEST_INTERFACE };
