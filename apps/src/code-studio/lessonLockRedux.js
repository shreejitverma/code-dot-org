/**
 * Reducer and actions for lesson lock info. This includes the teacher panel on
 * the course overview page, and the lesson locking dialog.
 */

import $ from 'jquery';
import _ from 'lodash';
import {makeEnum} from '@cdo/apps/utils';

import {
  NO_SECTION,
  SELECT_SECTION
} from '@cdo/apps/templates/teacherDashboard/teacherSectionsRedux';

export const LockStatus = makeEnum('Locked', 'Editable', 'ReadonlyAnswers');

// Action types
const OPEN_LOCK_DIALOG = 'lessonLock/OPEN_LOCK_DIALOG';
export const CLOSE_LOCK_DIALOG = 'lessonLock/CLOSE_LOCK_DIALOG';
export const BEGIN_SAVE = 'lessonLock/BEGIN_SAVE';
export const FINISH_SAVE = 'lessonLock/FINISH_SAVE';
const AUTHORIZE_LOCKABLE = 'lessonLock/AUTHORIZE_LOCKABLE';
const SET_SECTION_LOCK_STATUS = 'lessonLock/SET_SECTION_LOCK_STATUS';

const initialState = {
  lessonsBySectionId: {},
  lockDialogStageId: null,
  // The locking info for the currently selected section/lesson
  lockStatus: [],
  saving: false,
  // whether user is allowed to see lockable lessons
  lockableAuthorized: false
};

/**
 * Stage lock reducer
 */
export default function reducer(state = initialState, action) {
  if (action.type === AUTHORIZE_LOCKABLE) {
    return Object.assign({}, state, {
      lockableAuthorized: true
    });
  }

  if (action.type === SET_SECTION_LOCK_STATUS) {
    return {
      ...state,
      lessonsBySectionId: _.mapValues(
        action.sections,
        section => section.stages
      )
    };
  }

  if (action.type === SELECT_SECTION) {
    // If we don't have any section info, it probably means we haven't loaded
    // any stage lock data in this context, and thus don't need to do anything
    // when a section gets selected
    if (Object.keys(state.lessonsBySectionId).length === 0) {
      return state;
    }

    const sectionId = action.sectionId;
    if (sectionId === NO_SECTION) {
      return {
        ...state,
        lockStatus: initialState.lockStatus
      };
    }
    if (!state.lessonsBySectionId[sectionId]) {
      throw new Error(`Unknown sectionId ${sectionId}`);
    }
    // If we have a lockStatus (i.e. from an open dialog) we need to update
    // it with the new section
    const {lockDialogStageId} = state;
    if (lockDialogStageId) {
      return {
        ...state,
        lockStatus: lockStatusForStage(
          state.lessonsBySectionId[sectionId],
          lockDialogStageId
        )
      };
    }
  }

  if (action.type === OPEN_LOCK_DIALOG) {
    const {sectionId, stageId} = action;
    return Object.assign({}, state, {
      lockDialogStageId: stageId,
      lockStatus: lockStatusForStage(
        state.lessonsBySectionId[sectionId],
        stageId
      )
    });
  }

  if (action.type === CLOSE_LOCK_DIALOG) {
    return Object.assign({}, state, {
      lockDialogStageId: null,
      lockStatus: initialState.lockStatus
    });
  }

  if (action.type === BEGIN_SAVE) {
    return Object.assign({}, state, {
      saving: true
    });
  }

  if (action.type === FINISH_SAVE) {
    const {lessonsBySectionId} = state;
    const {lockStatus: nextLockStatus, sectionId, stageId} = action;
    const nextStage = _.cloneDeep(lessonsBySectionId[sectionId][stageId]);

    // Update locked/readonly_answers in stages based on the new lockStatus provided
    // by our dialog.
    nextStage.forEach((item, index) => {
      const update = nextLockStatus[index];
      // We assume lockStatus is ordered the same as stageToUpdate. Let's
      // validate that.
      if (item.user_level_id !== update.userLevelId) {
        throw new Error('Expect user ids be the same');
      }
      item.locked = update.lockStatus === LockStatus.Locked;
      item.readonly_answers = update.lockStatus === LockStatus.ReadonlyAnswers;
    });

    const nextState = _.cloneDeep(state);
    nextState.lessonsBySectionId[sectionId][stageId] = nextStage;
    return Object.assign(nextState, {
      lockStatus: nextLockStatus,
      saving: false
    });
  }

  return state;
}

// Action creators

/**
 * Authorizes the user to be able to see lockable stages
 */
export const authorizeLockable = () => ({type: AUTHORIZE_LOCKABLE});

export const openLockDialog = (sectionId, stageId) => ({
  type: OPEN_LOCK_DIALOG,
  sectionId,
  stageId
});

export const beginSave = () => ({type: BEGIN_SAVE});
export const finishSave = (sectionId, stageId, newLockStatus) => ({
  type: FINISH_SAVE,
  sectionId,
  stageId,
  lockStatus: newLockStatus
});

/**
 * Action asynchronously dispatches a set of actions around saving our
 * lock status.
 */
const performSave = (sectionId, stageId, newLockStatus, onComplete) => {
  return (dispatch, getState) => {
    const oldLockStatus = getState().lessonLock.lockStatus;

    const saveData = newLockStatus
      .filter((item, index) => {
        // Only need to save items that changed
        return !_.isEqual(item, oldLockStatus[index]);
      })
      .map(item => ({
        user_level_data: item.userLevelData,
        locked: item.lockStatus === LockStatus.Locked,
        readonly_answers: item.lockStatus === LockStatus.ReadonlyAnswers
      }));

    if (saveData.length === 0) {
      onComplete();
      return;
    }

    dispatch(beginSave());
    $.ajax({
      type: 'POST',
      url: '/api/lock_status',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({updates: saveData})
    })
      .done(() => {
        dispatch(finishSave(sectionId, stageId, newLockStatus));
        onComplete();
      })
      .fail(err => {
        console.error(err);
        onComplete();
      });
  };
};

export const saveLockDialog = (sectionId, newLockStatus) => {
  return (dispatch, getState) => {
    const stageId = getState().lessonLock.lockDialogStageId;
    dispatch(
      performSave(sectionId, stageId, newLockStatus, () => {
        dispatch(closeLockDialog());
      })
    );
  };
};

export const lockStage = (sectionId, stageId) => {
  return (dispatch, getState) => {
    const state = getState();
    const section = state.lessonLock.lessonsBySectionId[sectionId];
    const oldLockStatus = lockStatusForStage(section, stageId);
    const newLockStatus = oldLockStatus.map(student => ({
      ...student,
      lockStatus: LockStatus.Locked
    }));
    dispatch(performSave(sectionId, stageId, newLockStatus, () => {}));
  };
};

export const closeLockDialog = () => ({
  type: CLOSE_LOCK_DIALOG
});

// Helpers
/**
 * Generate an array of lock status info for each student in th provided section
 * or an empty array if no section/students.
 * @param {object} section
 * @param {string} stageId
 * @returns {object[]}
 */
const lockStatusForStage = (section, stageId) => {
  if (section === undefined) {
    return [];
  }
  const students = section[stageId];
  return students.map(student => ({
    userLevelData: student.user_level_data,
    name: student.name,
    lockStatus: student.locked
      ? LockStatus.Locked
      : student.readonly_answers
      ? LockStatus.ReadonlyAnswers
      : LockStatus.Editable
  }));
};

/**
 * Helper that returns a mapping of stageId to whether or not it is fully locked
 * in the current section. A stage is fully locked if and only if it is locked
 * for all of the students in the section
 */
export const fullyLockedStageMapping = section => {
  if (!section) {
    return {};
  }

  return Object.keys(section).reduce((obj, stageId) => {
    const students = section[stageId];
    const fullyLocked = !students.some(student => !student.locked);
    return {
      ...obj,
      [stageId]: fullyLocked
    };
  }, {});
};

/**
 * Set the lock status for students in sections based on data from server
 */
export const setSectionLockStatus = sections => ({
  type: SET_SECTION_LOCK_STATUS,
  sections
});
