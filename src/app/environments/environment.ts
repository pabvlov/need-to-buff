export const environment = {
    apiUrl: '/api',
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
        makeAdmin: '/user/setRole',
        removeAdmin: '/user/unsetRole',
        planificationShow: '/planification/show',
        showTodayClasses: '/class/today',
        createPlanification: '/planification/build',
        deletePlanification: '/planification/delete',
        attachPlanificationToClasses: '/class/attachPlanifications',
        checkPresence: '/class/presence',
        createBanner: '/community/banner/upload',
        uploadImage: '/element/image/upload',
        deleteContent: '/community/banner/delete',
        createComment: '/community/comment/upload',
        changeLogoPicture: '/community/logo/upload',
    }
}