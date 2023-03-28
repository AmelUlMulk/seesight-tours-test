import { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import CONTACT_REQUEST, {
  CONTACT_REQUEST_INTERFACE
} from '../../api/contactRequest';
const ContactMsg = () => {
  const [contactInfo, setContactInfo] = useState<Record<string, any>>({
    name: '',
    email: '',
    message: ''
  });
  const [addQuery, { data: addedQuery, loading, error }] =
    useMutation<CONTACT_REQUEST_INTERFACE>(CONTACT_REQUEST);
  useEffect(() => {
    if (addedQuery) {
      toast.success('We recieved your request we will get to you shortly');
    }
  }, [addedQuery]);
  const handleSubmit = async (values: Record<string, any>) => {
    await addQuery({
      variables: {
        name: values.name,
        email: values.email,
        message: values.message
      }
    });
  };
  return (
    <section id="contact-msg" className=" py-6">
      <div className="w-[90%] md:w-[55%] mx-auto">
        <h2 className="text-[18px] sm:text-[38px] lg:text-[48px] font-[700] text-[#333333] text-center md:text-start">
          SEND US A MESSAGE
        </h2>
        <h4 className="text-[18px] sm:text-[24px] lg:text-[32px] font-[600] text-[#333333] text-center md:text-start">
          We&apos;d love to hear from you
        </h4>
        <Formik
          initialValues={contactInfo}
          validate={values => {
            const errors: any = {};
            if (
              !/^[a-zA-Z-\s]{0,30}$/.test(values.name) ||
              values.name === ''
            ) {
              errors.name = 'Enter Valid Name';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            } else if (values.message.length < 8) {
              errors.message = 'Enter Atleast 8 Character Review';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await handleSubmit(values);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <label
                htmlFor="name"
                className="block text-[20px] sm:text-[22px] text-[#CCC6C6] mt-3"
              >
                Name
              </label>
              <Field
                id="name"
                name="name"
                className="w-full text-[16px] sm:text-[18px] bg-[#EEEEEE] p-5 rounded-[15px]"
                placeholder="Name"
                type="text"
                required
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-400"
              />
              <label
                htmlFor="email"
                className="block text-[20px] sm:text-[22px] text-[#CCC6C6] mt-3"
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                className="w-full text-[16px] sm:text-[18px] bg-[#EEEEEE] p-5 rounded-[15px]"
                placeholder="Name@gmail.com"
                type="email"
                required
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400"
              />
              <label
                htmlFor="message"
                className=" block text-[20px] sm:text-[22px] text-[#CCC6C6] mt-3"
              >
                Message
              </label>
              <Field
                id="message"
                name="message"
                as="textarea"
                className="w-full text-[16px] sm:text-[18px] bg-[#EEEEEE] p-5 rounded-[15px] h-[200px]"
                placeholder="Type your query here....."
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-400"
              />
              <div className="font-bold mt-5 ml-auto ">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-500 rounded-lg text-md sm:text-2xl lg:text-3xl text-white py-2 px-5 sm:px-10"
                >
                  Send Message
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ContactMsg;
