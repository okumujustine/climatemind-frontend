import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import ROUTES from '../../router/RouteConfig';
import PageContent from '../../components/PageContent';
import TextInput from '../../components/TextInput';
import Wrapper from '../../components/Wrapper';
import { registerSchema } from '../../helpers/validationSchemas';
import { useRegister } from '../../hooks/auth/useRegister';
import { useSession } from '../../hooks/useSession';
import { useAuth } from '../../hooks/auth/useAuth';
import { analyticsService, RegistrationPageOpenEvent } from 'services';
import { CmButton, CmTypography } from 'shared/components';

function SignUpPage() {
  const { register } = useRegister();
  const navigate = useNavigate();

  const { sessionId, quizId } = useSession();
  const { isLoggedIn } = useAuth();
  const signUpId = uuidv4();

  useEffect(() => {
    if (sessionId)
      analyticsService.postEvent(RegistrationPageOpenEvent, signUpId);
    // eslint-disable-next-line
  }, []);

  // if a logged in user is doing the quiz again they should be redirected away from this page
  if (isLoggedIn) {
    navigate(ROUTES.CLIMATE_FEED_PAGE);
  }

  // Formik used for form validation and submission
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      // Register user
      register({
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        password: values.password,
        quizId,
      });
    },
  });

  const passwordsMatch =
    formik.values.password === formik.values.confirmPassword;

  const confirmPasswordCheck = () => {
    if (!passwordsMatch) {
      return 'Passwords must match!';
    } else {
      return formik.touched.confirmPassword && formik.errors.confirmPassword;
    }
  };

  return (
    <>
      <Wrapper bgColor="rgba(138, 213, 204, 0.6)" fullHeight={true}>
        <PageContent>
          <CmTypography variant="h1">Create a Climate Mind account</CmTypography>
          <CmTypography variant="h4" style={{ margin: 0 }}>
            Save your results, see your climate topics, and start talking.
          </CmTypography>

          <form
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10em',
            }}
            onSubmit={formik.handleSubmit}
          >
            <Box py={4}>
              <TextInput
                id="firstname"
                name="firstname"
                label="First Name"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="John"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
              />

              <TextInput
                id="lastname"
                name="lastname"
                label="Last Name"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Smith"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
              />

              <TextInput
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="hello@climatemind.org"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextInput
                id="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Super Secret Password"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                type="password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm Password"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                type="password"
                error={
                  formik.touched.confirmPassword &&
                  (Boolean(formik.errors.confirmPassword) || !passwordsMatch)
                }
                helperText={
                  formik.touched.confirmPassword && confirmPasswordCheck()
                }
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '20px 0',
                }}
              >
                <CmButton
                  text="Create Account"
                  disabled={!(formik.dirty && formik.isValid && passwordsMatch)}
                  onClick={() => formik.handleSubmit}
                />
              </div>

              <Box textAlign="center">
                <CmButton
                  variant="text"
                  text="Skip"
                  onClick={() => navigate('/climate-feed')}
                />
              </Box>
            </Box>
          </form>
        </PageContent>
      </Wrapper>
    </>
  );
}

export default SignUpPage;
