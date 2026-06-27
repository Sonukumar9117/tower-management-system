import {SCREEN_NAME} from '../constants/screenname';

export type RootStackParamList = {
  [SCREEN_NAME.USER_LOGIN]: undefined;
  [SCREEN_NAME.TICKET_DETAILS]:{
    ticketDetails:any
  };
};
