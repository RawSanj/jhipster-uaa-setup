LogsStateConfig.$inject = ['$stateProvider'];

export function LogsStateConfig($stateProvider) {
    $stateProvider.state('logs', {
        parent: 'admin',
        url: '/logs',
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'logs.title'
        },
        views: {
            'content@': {
                template: '<jhi-logs></jhi-logs>'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('logs');
                return $translate.refresh();
            }]
        }
    });
}