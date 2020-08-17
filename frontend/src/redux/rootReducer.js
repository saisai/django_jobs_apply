import { combineReducers } from 'redux'
import thJobsDbReducer from './thJobsDb/thJobsDbReducer'
import thJobsThaiReducer from './thJobsThai/thJobsThaiReducer'
import thJobsBkkReducer from './thJobsBkk/thJobsBkkReducer'
import thJobsTopgunReducer from './thJobsTopgun/thJobsTopgunReducer'
import thJobsMonsterReducer from './thJobsMonster/thJobsMonsterReducer'
import thJobsThaiJobcomReducer from './thJobsThaiJobcom/thJobsThaiJobcomReducer'
import thJobsJobYesReducer from './thJobsJobYes/thJobsJobYesReducer'
import thJobsJobThaiWebReducer from './thJobsJobThaiWeb/thJobsJobThaiWebReducer'
import selectedReducer from './selected/selectedReducer'
import positionReducer from './position/positionReducer'
import cvfileReducer from './cvfile/cvfileReducer'
import loginReducer from './login/loginReducer'
import signupReducer from './signup/signupReducer'
import activateReducer from './activate/activateReducer'
import resetPasswordReducer from './resetPassword/resetPasswordReducer'
import resetPasswordConfirmReducer from './resetPasswordConfirm/resetPasswordConfirmReducer'


const rootReducer = combineReducers({
  thjobsdb: thJobsDbReducer,
  thjobsthai: thJobsThaiReducer,
  thjobsbkk: thJobsBkkReducer,
  thjobstopgun: thJobsTopgunReducer,
  thjobsmonster: thJobsMonsterReducer,
  thjobsthaijobcom: thJobsThaiJobcomReducer,
  thjobsjobyes: thJobsJobYesReducer,
  thjobsjobthaiweb: thJobsJobThaiWebReducer,
  selected: selectedReducer,
  position: positionReducer,
  cvfile: cvfileReducer,
  login: loginReducer,
  signup: signupReducer,
  activate: activateReducer,
  resetpassword: resetPasswordReducer,
  resetpasswordconfirm: resetPasswordConfirmReducer,
})

export default rootReducer