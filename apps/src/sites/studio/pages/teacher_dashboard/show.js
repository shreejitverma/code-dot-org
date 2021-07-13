import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
// import {Provider} from 'react-redux';
import {getStore, registerReducers} from '@cdo/apps/redux';
import manageStudents, {
  setLoginType,
  setShowSharingColumn
} from '@cdo/apps/templates/manageStudents/manageStudentsRedux';
import teacherSections, {
  setSections,
  selectSection,
  setRosterProvider,
  setValidAssignments,
  setValidGrades,
  setTextToSpeechUnitIds,
  setPreReaderUnitIds,
  setLessonExtrasUnitIds,
  setShowLockSectionField // DCDO Flag - show/hide Lock Section field
} from '@cdo/apps/templates/teacherDashboard/teacherSectionsRedux';
import sectionData, {setSection} from '@cdo/apps/redux/sectionDataRedux';
import stats from '@cdo/apps/templates/teacherDashboard/statsRedux';
import textResponses from '@cdo/apps/templates/textResponses/textResponsesRedux';
import sectionAssessments from '@cdo/apps/templates/sectionAssessments/sectionAssessmentsRedux';
import sectionProgress, {
  setShowSectionProgressDetails
} from '@cdo/apps/templates/sectionProgress/sectionProgressRedux';
import sectionStandardsProgress from '@cdo/apps/templates/sectionProgress/standards/sectionStandardsProgressRedux';
import unitSelection from '@cdo/apps/redux/unitSelectionRedux';
// import TeacherDashboard from '@cdo/apps/templates/teacherDashboard/TeacherDashboard';
import TeacherDashboardNavigation from '@cdo/apps/templates/teacherDashboard/TeacherDashboardNavigation';
import TeacherDashboardHeader from '@cdo/apps/templates/teacherDashboard/TeacherDashboardHeader';
import currentUser, {
  setCurrentUserId,
  setCurrentUserName,
  setCurrentUserHasSeenStandardsReportInfo
} from '@cdo/apps/templates/currentUserRedux';
import {setValidScripts} from '../../../../redux/unitSelectionRedux';
import locales, {setLocaleCode} from '@cdo/apps/redux/localesRedux';
import {render} from 'cdo-apollo-client';

const script = document.querySelector('script[data-dashboard]');
const scriptData = JSON.parse(script.dataset.dashboard);
const {
  section,
  sections,
  validGrades,
  validScripts,
  studentScriptIds,
  validCourses,
  currentUserId,
  hasSeenStandardsReportInfo,
  localeCode,
  textToSpeechUnitIds,
  preReaderUnitIds,
  lessonExtrasUnitIds,
  showSectionProgressDetails
} = scriptData;
// const baseUrl = `/teacher_dashboard/sections/${section.id}`;

function Wrapper({children}) {
  return (
    <React.Fragment>
      {/* <TeacherDashboardHeader /> */}
      {/* <TeacherDashboardNavigation /> */}
      {children}
    </React.Fragment>
  );
}
Wrapper.propTypes = {
  children: PropTypes.node
};

$(document).ready(function() {
  registerReducers({
    teacherSections,
    sectionData,
    manageStudents,
    sectionProgress,
    unitSelection,
    stats,
    textResponses,
    sectionAssessments,
    currentUser,
    sectionStandardsProgress,
    locales
  });
  const store = getStore();
  // TODO: (madelynkasula) remove duplication in sectionData.setSection and teacherSections.setSections
  store.dispatch(setCurrentUserId(currentUserId));
  store.dispatch(setCurrentUserName(scriptData.userName));
  store.dispatch(
    setCurrentUserHasSeenStandardsReportInfo(hasSeenStandardsReportInfo)
  );
  store.dispatch(setSection(section));
  store.dispatch(setSections(sections));
  store.dispatch(selectSection(section.id));
  store.dispatch(setRosterProvider(section.login_type));
  store.dispatch(setLoginType(section.login_type));
  store.dispatch(setValidAssignments(validCourses, validScripts));
  store.dispatch(setValidGrades(validGrades));
  store.dispatch(setLocaleCode(localeCode));
  store.dispatch(setLessonExtrasUnitIds(lessonExtrasUnitIds));
  store.dispatch(setTextToSpeechUnitIds(textToSpeechUnitIds));
  store.dispatch(setPreReaderUnitIds(preReaderUnitIds));
  store.dispatch(setShowSectionProgressDetails(showSectionProgressDetails));

  // DCDO Flag - show/hide Lock Section field
  store.dispatch(setShowLockSectionField(scriptData.showLockSectionField));

  if (!section.sharing_disabled && section.script.project_sharing) {
    store.dispatch(setShowSharingColumn(true));
  }

  store.dispatch(
    setValidScripts(validScripts, studentScriptIds, validCourses, section)
  );

  render('teacher-dashboard', store, Wrapper);

  // ReactDOM.render(
  //   // <Provider store={store}>
  //   //   <Router basename={baseUrl}>
  //   //     <Route
  //   //       path="/"
  //   //       component={props => (
  //   //         <TeacherDashboard
  //   //           {...props}
  //   //           studioUrlPrefix={scriptData.studioUrlPrefix}
  //   //           sectionId={section.id}
  //   //           sectionName={section.name}
  //   //           studentCount={section.students.length}
  //   //         />
  //   //       )}
  //   //     />
  //   //   </Router>
  //   // </Provider>,
  //   App,
  //   document.getElementById('teacher-dashboard')
  // );
});
