import { Component, Inject, OnInit } from "@angular/core";
import { JhiHealthService } from "./health.service";
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
    selector: 'jhi-health',
    templateUrl: 'app/admin/health/health.html',
    pipes: [TranslatePipe]
})
export class JhiHealthCheckComponent implements OnInit {
    healthData:any;
    updatingHealth:boolean;
    $uibModal: any;

    constructor(@Inject('$uibModal') $uibModal, private jhiHealthService:JhiHealthService) {
        this.$uibModal = $uibModal;
    }

    ngOnInit() {
        this.refresh();
    }

    baseName(name) {
        return this.jhiHealthService.getBaseName(name);
    }

    getLabelClass(statusState) {
        if (statusState === 'UP') {
            return 'label-success';
        } else {
            return 'label-danger';
        }
    }

    refresh() {
        this.updatingHealth = true;

        this.jhiHealthService.checkHealth().subscribe(health => {
            this.healthData = this.jhiHealthService.transformHealthData(health);
            this.updatingHealth = false;
        });
    }

    showHealth(health) {
        let vm = this;
        this.$uibModal.open({
            templateUrl: 'app/admin/health/health.modal.html',
            controller: 'JhiHealthModalController',
            controllerAs: 'vm',
            size: 'lg',
            resolve: {
                currentHealth: function() {
                    return health;
                },
                baseName: function() {
                    return vm.baseName;
                },
                subSystemName: function() {
                    return vm.subSystemName;
                }

            }
        });
    }

    subSystemName(name) {
        return this.jhiHealthService.getSubSystemName(name);
    }

}