import { createBrowserRouter } from 'react-router-dom';

import ROUTES from './RouteConfig';

import RootPage from 'pages/SharedPages/RootPage';
import HomePage from '../pages/UserAUnauthorizedPages/HomePage';
import PrivacyPolicyPage from '../pages/SharedPages/PrivacyPolicyPage';

import PreQuizPage from '../pages/UserAUnauthorizedPages/PreQuizPage';
import QuizPage from '../pages/SharedPages/QuizPage';
import SubmitSetOnePage from '../pages/SharedPages/SubmitSetOnePage';
import SubmitSetTwoPage from '../pages/SharedPages/SubmitSetTwoPage';
import PersonalValuesPage from '../pages/SharedPages/PersonalValuesPage';

import SignUpPage from '../pages/UserAUnauthorizedPages/SignUpPage';
import LoginPage from '../pages/UserAUnauthorizedPages/LoginPage';
import ProfilePage from '../pages/UserAAuthorizedPages/ProfilePage';
import PasswordResetPage from '../pages/UserAUnauthorizedPages/PasswordResetPage';

import ClimateFeedPage from '../pages/UserAAuthorizedPages/ClimateFeedPage';
import SolutionsFeedPage from '../pages/UserAAuthorizedPages/SolutionsFeedPage';
import MythFeedPage from '../pages/UserAAuthorizedPages/MythFeedPage';

import ConversationsIntroPage from '../pages/UserAAuthorizedPages/ConversationsIntroPage';
import ConversationsPage from '../pages/UserAAuthorizedPages/ConversationsPage';
import SharedValuesPage from '../pages/UserAAuthorizedPages/SharedValuesPage';
import SharedFeedPage from '../pages/UserAAuthorizedPages/SharedFeedPage';

import UserBLandingPage from '../pages/UserBPages/UserBLandingPage';
import UserBCoreValuesPage from '../pages/UserBPages/UserBCoreValuesPage';
import UserBHowCMWorksPage from '../pages/UserBPages/UserBHowCMWorksPage';
import UserBSignUpPage from '../pages/UserBPages/UserBSignUpPage';
import UserBSharedSuccessPage from '../pages/UserBPages/UserBSharedSuccessPage';
import UserBSharedImpactsPage from '../pages/UserBPages/UserBSharedImpactsPage';
import UserBSharedSolutionsPage from '../pages/UserBPages/UserBSharedSolutionsPage';
import UserBSharedValuesPage from '../pages/UserBPages/UserBSharedValuesPage';
import UserBSharedSummaryPage from '../pages/UserBPages/UserBSharedSummaryPage';
import UserBNoConsentPage from '../pages/UserBPages/UserBNoConsentPage';
import Error404Page from 'pages/SharedPages/Error404Page';

const router = createBrowserRouter([
  {
    path: '',
    element: <RootPage />,
    errorElement: <Error404Page />,
    children: [
      {
        path: ROUTES.HOME_PAGE,
        element: <HomePage />,
      },
      {
        path: `${ROUTES.PRE_QUIZ_PAGE}/conversationId?`,
        element: <PreQuizPage />,
      },
      {
        path: `${ROUTES.QUIZ_PAGE}/:conversationId?`,
        element: <QuizPage />,
      },
      {
        path: ROUTES.SUBMIT_SET_ONE_PAGE,
        element: <SubmitSetOnePage />,
      },
      {
        path: ROUTES.SUBMIT_SET_TWO_PAGE,
        element: <SubmitSetTwoPage />,
      },
      {
        path: ROUTES.PERSONAL_VALUES_PAGE,
        element: <PersonalValuesPage />,
      },
      {
        path: ROUTES.MYTHS_FEED_PAGE,
        element: <MythFeedPage />,
      },
      {
        path: ROUTES.SOLUTIONS_FEED_PAGE,
        element: <SolutionsFeedPage />,
      },
      {
        path: ROUTES.CLIMATE_FEED_PAGE,
        element: <ClimateFeedPage />,
      },
      {
        path: ROUTES.SIGN_UP_PAGE,
        element: <SignUpPage />,
      },
      {
        path: ROUTES.LOGIN_PAGE,
        element: <LoginPage />,
      },
      {
        path: ROUTES.PASSWORD_RESET_PAGE,
        element: <PasswordResetPage />,
      },
      {
        path: ROUTES.CONVERSATIONS_INTRO_PAGE,
        element: <ConversationsIntroPage />,
      },
      {
        path: ROUTES.CONVERSATIONS_PAGE,
        element: <ConversationsPage />,
      },
      {
        path: ROUTES.PRIVACY_PAGE,
        element: <PrivacyPolicyPage />,
      },
      {
        path: ROUTES.PROFILE_PAGE,
        element: <ProfilePage />,
      },
      {
        path: `${ROUTES.USERA_SHARED_FEED_PAGE}/:conversationId`,
        element: <SharedFeedPage />,
      },
      {
        path: `${ROUTES.SHARED_VALUES_PAGE}/:conversationId`,
        element: <SharedValuesPage />,
      },

      // User B pages
      {
        path: `${ROUTES.USERB_LANDING_PAGE}`,
        element: <UserBLandingPage />,
      },
      {
        path: `${ROUTES.USERB_HOW_CM_WORKS_PAGE}/:conversationId`,
        element: <UserBHowCMWorksPage />,
      },
      {
        path: `${ROUTES.USERB_CORE_VALUES_PAGE}/:conversationId`,
        element: <UserBCoreValuesPage />,
      },
      {
        path: `${ROUTES.USERB_SHARED_VALUES_PAGE}/:conversationId`,
        element: <UserBSharedValuesPage />,
      },
      {
        path: `${ROUTES.USERB_SHARED_IMPACTS_PAGE}/:conversationId`,
        element: <UserBSharedImpactsPage />,
      },
      {
        path: `${ROUTES.USERB_SHARED_SOLUTIONS_PAGE}/:conversationId`,
        element: <UserBSharedSolutionsPage />,
      },
      {
        path: `${ROUTES.USERB_SHARED_SUMMARY_PAGE}/:conversationId`,
        element: <UserBSharedSummaryPage />,
      },
      {
        path: `${ROUTES.USERB_SHARED_SUCCESS_PAGE}/:conversationId`,
        element: <UserBSharedSuccessPage />,
      },
      {
        path: `${ROUTES.USERB_SIGN_UP_PAGE}/:conversationId`,
        element: <UserBSignUpPage />,
      },
      {
        path: `${ROUTES.USERB_NO_CONSENT_PAGE}/:conversationId`,
        element: <UserBNoConsentPage />,
      },
    ]
  },
]);

export default router;
