import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  StyledForm,
  StyledLabelName,
  StyledField,
  StyledLabel,
  ErrMsg,
} from './ContactForm.styled';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(9, 'Too Short!')
    .max(9, 'Too Long!')
    .required('Required'),
});

export const ContactForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, action) => {
        onAdd(values);
        action.resetForm();
      }}
    >
      <StyledForm>
        <StyledLabel>
          <StyledLabelName>Name</StyledLabelName>
          <StyledField id="name" name="name" placeholder="Jane Derossa" />
          <ErrMsg component="div" name="name" />
        </StyledLabel>
        <StyledLabel>
          <StyledLabelName>Number</StyledLabelName>
          <StyledField id="lastName" name="number" placeholder="***-**-**" />
          <ErrMsg component="div" name="number" />
        </StyledLabel>
        <button type="submit">Add contact</button>
      </StyledForm>
    </Formik>
  );
};
