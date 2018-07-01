"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var view_service_1 = require("./view.service");
describe('ViewService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [view_service_1.ViewService]
        });
    });
    it('should be created', testing_1.inject([view_service_1.ViewService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=view.service.spec.js.map