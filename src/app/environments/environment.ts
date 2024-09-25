import { find } from "rxjs";
import { CreateClass } from '../utils/interfaces/simple-post';

export const environment = {
    apiUrl: 'http://localhost:3000',
    endpoints: {
        renew: '/auth/renew',
        login: '/auth/login',
        register: '/auth/register',
        findUser: '/user/find',
        findUsers: '/user/athletes',
        userCommunities: '/user/communities',
        communityInfo: '/community/info',
        worklines: '/worklines',
        createClient: '/user/athlete/createInactive',
        createAthlete: '/user/athlete/create',
        findGroups: '/groups',
        addAthleteToGroup: '/group/insertAthlete',
        createGroup: '/group/create',
        groupDifficulty: '/group/difficulties',
        warmUps: '/warmup/show',
        createWarmUp: '/warmup/create',
        warmUpsByClass: '/warmup/showByClass',
        deleteWarmUp: '/warmup/delete',
        getElements: '/elements',
        createElement: '/element/create',
        deleteElement: '/element/delete',
        getApparatus: '/apparatus/show',
        attachElement: '/element/attach',
        detachElement: '/element/detach',
        createPhysicalPreparation: '/physicalPreparation/create',
        deletePhysicalPreparation: '/physicalPreparation/delete',
        getPhysicalPreparations: '/physicalPreparation/show',
        getPhysicalPreparationsByClasses: '/physicalPreparation/showByClass',
        createClass: '/class/create',
        showClasses: '/class/show',
        showClassesByDates: '/class/showBetweenDates',
    }
}